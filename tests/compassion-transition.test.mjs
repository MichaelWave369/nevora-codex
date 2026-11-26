import test from "node:test";
import assert from "node:assert/strict";
import {simulateTransition,compareTransition,reconcileTransfers} from "../experiments/compassion-commons/transition.mjs";
const resource=(id="water",localReceived=6)=>({id,unit:id==="water"?"liter":"portion",openingStock:2,localReceived,reserve:2,unitCost:100,maxPurchasable:100,requests:[{id:"H1",quantity:5,tier:"essential",order:0},{id:"H2",quantity:5,tier:"essential",order:1}]});
const scenario=()=>({openingCash:1500,receivedCash:0,obligations:300,cashReserve:200,resources:[resource()]});
test("local supply reduces modeled procurement without inventing cash",()=>{
  const x=compareTransition(scenario());
  assert.equal(x.parallel.cash.procurementCost,400);assert.equal(x.external.cash.procurementCost,1000);
  assert.equal(x.procurementCostDifference,600);assert.equal(x.parallel.resources[0].distributed,10);
  assert.equal(x.external.resources[0].distributed,10);assert.equal(x.external.resources[0].excludedLocal,6);
});
test("external obligations paid before procurement",()=>{
  const x=simulateTransition({...scenario(),openingCash:200});
  assert.equal(x.cash.unpaidObligations,100);assert.equal(x.cash.procurementCost,0);
  assert.ok(x.stopReasons.includes("unpaid external obligations"));
});
test("cash reserve blocks discretionary procurement",()=>{
  const x=simulateTransition({...scenario(),openingCash:500});
  assert.equal(x.cash.closing,200);assert.equal(x.cash.procurementCost,0);
  assert.ok(x.stopReasons.includes("unmet essential needs"));
});
test("physical reserves never allocated",()=>{
  const x=simulateTransition({...scenario(),openingCash:500});
  assert.equal(x.resources[0].distributed,6);assert.equal(x.resources[0].endingStock,2);
});
test("physical reserve shortage explicitly reported",()=>{
  const x=simulateTransition({...scenario(),openingCash:500,resources:[{...resource("water",0),reserve:3}]});
  assert.equal(x.resources[0].distributed,0);assert.equal(x.resources[0].reserveShortfall,1);
});
test("essential resource gaps prioritized over optional demand",()=>{
  const optional={...resource("food",0),requests:[{id:"H1",quantity:10,tier:"optional",order:0}]};
  const x=simulateTransition({...scenario(),openingCash:1000,resources:[optional,resource("water",0)]});
  assert.equal(x.resources.find(r=>r.id==="water").purchased,5);assert.equal(x.resources.find(r=>r.id==="food").purchased,0);
});
test("supplier limit exposes remaining shortfall",()=>{
  const x=simulateTransition({...scenario(),resources:[{...resource("water",0),maxPurchasable:3}]});
  assert.equal(x.resources[0].distributed,3);assert.equal(x.resources[0].unmet,7);
});
test("invalid monetary inputs and duplicate resources reject",()=>{
  assert.throws(()=>simulateTransition({...scenario(),openingCash:-1}),/scenario/);
  assert.throws(()=>simulateTransition({...scenario(),resources:[resource(),resource()]}),/resource/);
});
test("no work scores or unreceived shipment fields admitted",()=>{
  assert.throws(()=>simulateTransition({...scenario(),resources:[{...resource(),pending:99}]}),/resource/);
  assert.throws(()=>simulateTransition({...scenario(),resources:[{...resource(),requests:[{id:"H1",quantity:1,tier:"essential",order:0,score:9}]}]}));
});
test("cash and physical conservation across 243 scenarios",()=>{
  for(let a=0;a<9;a++)for(let b=0;b<9;b++)for(const mode of ["parallel","external-only","parallel"]){
    const input={...scenario(),openingCash:a*300,resources:[resource("water",b),resource("food",b)]};
    const x=simulateTransition(input,{mode});
    assert.equal(x.cash.available,x.cash.obligationsPaid+x.cash.procurementCost+x.cash.closing);
    for(const r of x.resources)assert.equal(r.openingStock+r.localReceived+r.purchased,r.distributed+r.endingStock);
  }
});
const event=(eventId,type,units)=>({eventId,transferId:"T1",type,resource:"water",unit:"liter",from:"A",to:"B",units});
test("dispatch is in transit not received inventory",()=>{
  const [x]=reconcileTransfers([event("D","dispatch",9)]);assert.equal(x.received,0);assert.equal(x.inTransit,9);
});
test("partial receipts and losses reconcile independently",()=>{
  const [x]=reconcileTransfers([event("D","dispatch",9),event("R","receipt",4),event("L","loss",2)]);
  assert.equal(x.received,4);assert.equal(x.lost,2);assert.equal(x.inTransit,3);assert.equal(x.status,"outstanding");
});
test("identical event replay is idempotent",()=>{
  const d=event("D","dispatch",9),r=event("R","receipt",9);
  const [x]=reconcileTransfers([d,d,r,r]);assert.equal(x.received,9);assert.equal(x.inTransit,0);assert.equal(x.status,"reconciled");
});
test("conflicting replay and overreceipt rejected",()=>{
  const d=event("D","dispatch",9);
  assert.throws(()=>reconcileTransfers([d,{...d,units:8}]),/conflicting/);
  assert.throws(()=>reconcileTransfers([d,event("R","receipt",10)]),/exceeds/);
});
test("receipt without dispatch or wrong resource rejected",()=>{
  assert.throws(()=>reconcileTransfers([event("R","receipt",1)]),/missing dispatch/);
  assert.throws(()=>reconcileTransfers([event("D","dispatch",9),{...event("R","receipt",1),unit:"kg"}]),/mapping/);
});
test("second dispatch cannot create another balance for same transfer",()=>{
  assert.throws(()=>reconcileTransfers([event("D","dispatch",9),event("D2","dispatch",9)]),/duplicate dispatch/);
});
test("completed transfer cannot receive again",()=>{
  assert.throws(()=>reconcileTransfers([event("D","dispatch",9),event("R","receipt",9),event("R2","receipt",1)]),/exceeds/);
});
