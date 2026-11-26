import test from "node:test";
import assert from "node:assert/strict";
import {generateKeyPairSync} from "node:crypto";
import {replayLedger} from "../experiments/compassion-commons/ledger.mjs";
import {emptySnapshot,verifySnapshot,signEvent,makeCheckpoint} from "../experiments/compassion-commons/local-ledger.mjs";
import {planCommons} from "../experiments/compassion-commons/multi-resource.mjs";
import {planWork,planReplenishment} from "../experiments/compassion-commons/human-potential.mjs";
const ev=(n,type,actor,data={})=>({id:"E"+n,expectedVersion:n,type,actor,...data});
const open=ev(0,"open","custodian",{stock:12});
const reserve=ev(1,"reserve","reviewer",{target:3,reason:"protect buffer"});
const propose=(n,units)=>ev(n,"propose","planner",{proposal:"P",units});
const approve=n=>ev(n,"approve","reviewer",{proposal:"P",reason:"reviewed"});
const deliver=n=>ev(n,"deliver","custodian",{proposal:"P",reason:"fictional"});
test("reserve limits direct ledger approvals",()=>{
  assert.throws(()=>replayLedger([open,reserve,propose(2,10),approve(3)]),/approval denied/);
  const x=replayLedger([open,reserve,propose(2,9),approve(3),deliver(4)]);
  assert.equal(x.stock,3);assert.equal(x.allocatable,0);assert.equal(x.protectedReserve,3);
});
test("actual loss is recorded even when reserve target cannot be met",()=>{
  const x=replayLedger([open,reserve,ev(2,"loss","custodian",{units:10,reason:"damage"})]);
  assert.equal(x.stock,2);assert.equal(x.allocatable,0);
});
test("loss-induced reserve shortage blocks delivery",()=>{
  const log=[open,reserve,propose(2,9),approve(3),ev(4,"loss","custodian",{units:1,reason:"damage"})];
  assert.throws(()=>replayLedger([...log,deliver(5)]),/delivery denied/);
  assert.equal(replayLedger(log).reserved,9);
});
test("reserve increase cannot override existing commitments",()=>{
  assert.throws(()=>replayLedger([open,propose(1,10),approve(2),ev(3,"reserve","reviewer",{target:3,reason:"change"})]),/conflicts/);
});
test("paused reserve lowering denied; reviewed release after resume",()=>{
  const log=[open,reserve,ev(2,"pause","custodian",{reason:"inspect"})];
  assert.throws(()=>replayLedger([...log,ev(3,"reserve","reviewer",{target:0,reason:"release"})]),/paused/);
  const x=replayLedger([...log,ev(3,"resume","custodian",{observed:12,reason:"count"}),ev(4,"reserve","reviewer",{target:0,reason:"release"})]);
  assert.equal(x.allocatable,12);
});
function signedFixture(){
  const actors={},keys={};for(const role of ["custodian","planner","reviewer"]){const pair=generateKeyPairSync("ed25519");actors[role]={role,publicKey:pair.publicKey.export({type:"spki",format:"pem"})};keys[role]=pair.privateKey;}
  const config={ledgerId:"water",actors};let snapshot=emptySnapshot(config);
  const add=(type,actor,data)=>{const {head,state}=verifySnapshot(config,snapshot);const entry=signEvent(config,head,ev(state.version,type,actor,data),keys[actor]);const next={...snapshot,entries:[...snapshot.entries,entry]};verifySnapshot(config,next);snapshot=next;};
  add("open","custodian",{stock:12});
  return {config,add,snapshot:()=>snapshot};
}
test("only reviewer role may sign reserve policy change",()=>{
  const f=signedFixture();
  assert.throws(()=>f.add("reserve","planner",{target:3,reason:"change"}),/unauthorized/);
  assert.throws(()=>f.add("reserve","custodian",{target:3,reason:"change"}),/unauthorized/);
  f.add("reserve","reviewer",{target:3,reason:"change"});
  assert.equal(verifySnapshot(f.config,f.snapshot()).state.protectedReserve,3);
});
test("planner cannot reduce signed reserve or double-count it",()=>{
  const f=signedFixture();f.add("reserve","reviewer",{target:3,reason:"buffer"});
  const snapshot=f.snapshot(),r={resourceId:"water",unit:"liter",reserve:1,config:f.config,snapshot,checkpoint:makeCheckpoint(f.config,snapshot),requests:[{id:"H1",quantity:12,tier:"essential",order:0}]};
  assert.equal(planCommons([r]).resources[0].plannedUnits,9);
  assert.equal(planCommons([{...r,reserve:3}]).resources[0].plannedUnits,9);
  assert.equal(planCommons([{...r,reserve:5}]).resources[0].plannedUnits,7);
});
const task=(id,minutes=30,tier="essential",skill="repair")=>({id,minutes,tier,skill});
const offer=(id,maxMinutes,acceptedTasks,skills=["repair"])=>({id,maxMinutes,acceptedTasks,skills});
test("specific consent and skill required",()=>{
  const x=planWork([task("T")],[offer("A",60,[]),offer("B",60,["T"],["cook"])]);
  assert.equal(x.assigned.length,0);assert.equal(x.uncovered.length,1);
});
test("zero hours and capacity limits respected",()=>{
  const x=planWork([task("T1"),task("T2")],[offer("A",0,["T1","T2"]),offer("B",30,["T1","T2"])]);
  assert.equal(x.assigned.length,1);assert.equal(x.assigned[0].offerId,"B");assert.equal(x.totals.uncoveredMinutes,30);
});
test("essential tasks prioritized before optional work",()=>{
  const x=planWork([task("A",30,"optional"),task("Z")],[offer("A",30,["A","Z"])]);
  assert.equal(x.assigned[0].taskId,"Z");
});
test("balanced utilization and rotation deterministic",()=>{
  const tasks=[task("T1"),task("T2")],offers=[offer("A",60,["T1","T2"]),offer("B",60,["T1","T2"])];
  const x=planWork(tasks,offers);assert.deepEqual(x,planWork([...tasks].reverse(),[...offers].reverse()));
  assert.deepEqual(x.assigned.map(a=>a.offerId),["A","B"]);
  assert.equal(planWork(tasks,offers,{round:1}).assigned[0].offerId,"B");
});
test("refusal changes work coverage not resource allocation",()=>{
  const before=replayLedger([open,reserve]);
  assert.equal(planWork([task("T")],[offer("A",60,[])]).assigned.length,0);
  assert.deepEqual(replayLedger([open,reserve]),before);
});
test("reject hidden contribution scores and duplicate task IDs",()=>{
  assert.throws(()=>planWork([task("T")],[{...offer("A",30,["T"]),score:99}]),/offer/);
  assert.throws(()=>planWork([task("T"),task("T")],[]),/task/);
});
test("uncovered tasks never imply compulsory assignment",()=>{
  const x=planWork([task("T")],[]);assert.equal(x.status,"proposal-only");assert.equal(x.totals.uncoveredMinutes,30);
});
const replenishment={stock:12,reserved:2,protectedReserve:3,forecastDemand:15,targetAfterDemand:4,pending:[{id:"shipment",units:5}]};
test("pending arrivals never become allocatable stock",()=>{
  const x=planReplenishment(replenishment);assert.equal(x.physicalStock,12);assert.equal(x.allocatableNow,7);assert.equal(x.grossGap,9);assert.equal(x.conditionalAdditionalRequest,4);
});
test("no arrivals scenario preserves explicit shortage",()=>{
  const x=planReplenishment({...replenishment,pending:[]});assert.equal(x.unmetIfNoArrivals,9);assert.equal(x.conditionalAdditionalRequest,9);
});
test("duplicate shipments and impossible reservations reject",()=>{
  assert.throws(()=>planReplenishment({...replenishment,pending:[...replenishment.pending,...replenishment.pending]}),/shipment/);
  assert.throws(()=>planReplenishment({...replenishment,reserved:13}),/input/);
});
test("work coverage sweep preserves consent and total minutes",()=>{
  for(let cap=0;cap<=90;cap+=3)for(let round=0;round<3;round++){
    const tasks=[task("T1"),task("T2"),task("T3")],offers=[offer("A",cap,["T1","T2"]),offer("B",cap,["T2","T3"])];
    const x=planWork(tasks,offers,{round});assert.equal(x.totals.suggestedMinutes+x.totals.uncoveredMinutes,90);
    for(const o of offers){const assigned=x.assigned.filter(a=>a.offerId===o.id);assert.ok(assigned.reduce((s,a)=>s+a.minutes,0)<=cap);assert.ok(assigned.every(a=>o.acceptedTasks.includes(a.taskId)));}
  }
});
