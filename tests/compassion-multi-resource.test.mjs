import test from "node:test";
import assert from "node:assert/strict";
import {generateKeyPairSync} from "node:crypto";
import {mkdtempSync,rmSync,writeFileSync} from "node:fs";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {emptySnapshot,verifySnapshot,makeCheckpoint,signEvent,initializeLedger,loadLedger,appendEvent} from "../experiments/compassion-commons/local-ledger.mjs";
import {planCommons,proposalFromPlan} from "../experiments/compassion-commons/multi-resource.mjs";

function fixture(id="water",stock=12){
  const actors={},keys={};
  for(const role of ["custodian","planner","reviewer"]){
    const pair=generateKeyPairSync("ed25519");
    actors[role]={role,publicKey:pair.publicKey.export({type:"spki",format:"pem"})};keys[role]=pair.privateKey;
  }
  const config={ledgerId:id,actors};
  let snapshot=emptySnapshot(config);
  function advance(type,actor,data){
    const {head,state}=verifySnapshot(config,snapshot);
    const entry=signEvent(config,head,{id:"E"+state.version,actor,type,expectedVersion:state.version,...data},keys[actor]);
    snapshot={...snapshot,entries:[...snapshot.entries,entry]};verifySnapshot(config,snapshot);return snapshot;
  }
  advance("open","custodian",{stock});
  const checkpoint=makeCheckpoint(config,snapshot);
  const requests=Array.from({length:9},(_,i)=>({id:"H"+(i+1),quantity:2,tier:"essential",order:i}));
  return {config,keys,checkpoint,advance,resource:(unit="liter",reserve=0)=>({resourceId:id,unit,reserve,config,snapshot,checkpoint,requests}),snapshot:()=>snapshot};
}
test("checkpoint accepts prefix extension and rejects truncation",()=>{
  const f=fixture(),prefix=f.snapshot();
  f.advance("receive","custodian",{units:3,reason:"received"});
  const later=makeCheckpoint(f.config,f.snapshot(),f.checkpoint);
  assert.equal(verifySnapshot(f.config,f.snapshot(),f.checkpoint).state.stock,15);
  assert.throws(()=>verifySnapshot(f.config,prefix,later),/rollback/);
});
test("valid alternative branch at same version fails pinned checkpoint",()=>{
  const f=fixture(),prefix=f.snapshot(),head=verifySnapshot(f.config,prefix).head;
  const a=signEvent(f.config,head,{id:"E1",actor:"custodian",type:"receive",expectedVersion:1,units:1,reason:"A"},f.keys.custodian);
  const b=signEvent(f.config,head,{id:"E1",actor:"custodian",type:"receive",expectedVersion:1,units:2,reason:"B"},f.keys.custodian);
  const sa={...prefix,entries:[...prefix.entries,a]},sb={...prefix,entries:[...prefix.entries,b]};
  assert.throws(()=>verifySnapshot(f.config,sb,makeCheckpoint(f.config,sa)),/fork/);
});
test("wrong ledger and policy checkpoint denied",()=>{
  const f=fixture(),g=fixture("food");
  assert.throws(()=>verifySnapshot(f.config,f.snapshot(),g.checkpoint),/checkpoint/);
  assert.throws(()=>verifySnapshot(f.config,f.snapshot(),{...f.checkpoint,policyHash:"0".repeat(64)}),/checkpoint/);
});
test("load and append fail closed on rollback",t=>{
  const f=fixture(),dir=mkdtempSync(join(tmpdir(),"nevora-anchor-"));t.after(()=>rmSync(dir,{recursive:true,force:true}));
  const file=join(dir,"ledger.json");initializeLedger(file,f.config);
  const prefix=f.snapshot();
  appendEvent(file,f.config,prefix.entries[0]);
  f.advance("receive","custodian",{units:3,reason:"received"});
  const current=f.snapshot();appendEvent(file,f.config,current.entries[1],f.checkpoint);
  const later=makeCheckpoint(f.config,current);
  writeFileSync(file,JSON.stringify(prefix));
  assert.throws(()=>loadLedger(file,f.config,later),/rollback/);
  assert.throws(()=>appendEvent(file,f.config,current.entries[1],later),/rollback/);
});
test("separate units and explicit shortages; no aggregate cross-unit total",()=>{
  const a=fixture("water",12),b=fixture("food",6);
  const plan=planCommons([a.resource("liter",3),b.resource("portion")]);
  assert.equal(plan.status,"proposal-only");
  assert.equal(plan.resources[0].unit,"portion");assert.equal(plan.resources[0].plannedUnits,6);
  assert.equal(plan.resources[1].unit,"liter");assert.equal(plan.resources[1].plannedUnits,9);
  assert.equal(plan.resources[1].metrics.essentialRequested-plan.resources[1].metrics.essentialMet,9);
  assert.equal(Object.hasOwn(plan,"total"),false);
});
test("reservations and reserve both reduce planning capacity",()=>{
  const f=fixture();
  f.advance("propose","planner",{proposal:"P1",units:4});f.advance("approve","reviewer",{proposal:"P1",reason:"approved"});
  const r=planCommons([f.resource("liter",3)]).resources[0];
  assert.equal(r.stock,12);assert.equal(r.reserved,4);assert.equal(r.plannedUnits,5);
});
test("paused ledger yields no proposal",()=>{
  const f=fixture();f.advance("pause","custodian",{reason:"review"});
  const r=f.resource(),p=planCommons([r]).resources[0];
  assert.equal(p.plannedUnits,0);
  assert.throws(()=>proposalFromPlan(r,p,{round:0,policy:"proportional",eventId:"new",proposalId:"P",actor:"planner"}),/no admissible/);
});
test("reserve can exceed free stock without negative inventory",()=>{
  const f=fixture();assert.equal(planCommons([f.resource("liter",20)]).resources[0].plannedUnits,0);
});
test("duplicate resources or underlying ledgers rejected",()=>{
  const f=fixture(),r=f.resource();
  assert.throws(()=>planCommons([r,r]),/duplicate/);
  assert.throws(()=>planCommons([r,{...r,resourceId:"other"}]),/duplicate/);
});
test("missing trusted anchor rejected",()=>{
  const f=fixture();assert.throws(()=>planCommons([{...f.resource(),checkpoint:null}]),/checkpoint/);
});
test("proposal bridge produces unsigned event; signed replay still requires approval",()=>{
  const f=fixture(),r=f.resource("liter",3),record=planCommons([r]).resources[0];
  const proposal=proposalFromPlan(r,record,{round:0,policy:"proportional",eventId:"E1",proposalId:"P",actor:"planner"});
  assert.equal(proposal.event.units,9);assert.equal(Object.hasOwn(proposal,"signature"),false);
  const entry=signEvent(f.config,proposal.previous,proposal.event,f.keys.planner);
  const state=verifySnapshot(f.config,{...f.snapshot(),entries:[...f.snapshot().entries,entry]},f.checkpoint).state;
  assert.equal(state.stock,12);assert.equal(state.reserved,0);assert.equal(state.proposals[0].status,"proposed");
});
test("stale and manipulated planning records rejected",()=>{
  const f=fixture(),r=f.resource(),record=planCommons([r]).resources[0];
  const opts={round:0,policy:"proportional",eventId:"E1",proposalId:"P",actor:"planner"};
  assert.throws(()=>proposalFromPlan(r,{...record,plannedUnits:99},opts),/plan changed/);
  f.advance("receive","custodian",{units:1,reason:"received"});
  assert.throws(()=>proposalFromPlan(f.resource(),record,opts),/plan changed/);
});
test("cross-resource plan cannot be submitted against another ledger",()=>{
  const a=fixture(),b=fixture("food");
  assert.throws(()=>proposalFromPlan(b.resource(),planCommons([a.resource()]).resources[0],{round:0,policy:"proportional",eventId:"E1",proposalId:"P",actor:"planner"}),/plan changed/);
});
