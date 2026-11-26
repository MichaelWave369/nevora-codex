import test from "node:test";
import assert from "node:assert/strict";
import {generateKeyPairSync} from "node:crypto";
import {emptySnapshot,verifySnapshot,signEvent,makeCheckpoint} from "../experiments/compassion-commons/local-ledger.mjs";
import {signAgreement,verifyAgreement,prepareTransfer} from "../experiments/compassion-commons/federation.mjs";

function local(id,stock){
  const actors={},keys={};
  for(const role of ["custodian","planner","reviewer"]){
    const pair=generateKeyPairSync("ed25519");
    actors[role]={role,publicKey:pair.publicKey.export({type:"spki",format:"pem"})};keys[role]=pair.privateKey;
  }
  const config={ledgerId:id,actors};let snapshot=emptySnapshot(config);
  const add=(type,actor,data)=>{
    const {head,state}=verifySnapshot(config,snapshot);
    const event={id:"E"+state.version,actor,type,expectedVersion:state.version,...data};
    const entry=signEvent(config,head,event,keys[actor]);
    const next={...snapshot,entries:[...snapshot.entries,entry]};verifySnapshot(config,next);snapshot=next;
  };
  add("open","custodian",{stock});
  return {config,keys,add,input:()=>({config,snapshot,checkpoint:makeCheckpoint(config,snapshot)}),head:()=>verifySnapshot(config,snapshot).head,state:()=>verifySnapshot(config,snapshot).state};
}
function fixture(units=5){
  const a=local("A-water",12),b=local("B-water",2);
  a.add("reserve","reviewer",{target:3,reason:"buffer"});
  const communities={},keys={};
  for(const [name,l] of [["A",a],["B",b]]){
    const publicKeys={};keys[name]={};
    for(const role of ["steward","reviewer"]){
      const pair=generateKeyPairSync("ed25519");publicKeys[role]=pair.publicKey.export({type:"spki",format:"pem"});keys[name][role]=pair.privateKey;
    }
    communities[name]={keys:publicKeys,resources:{water:{unit:"liter",ledgerId:l.config.ledgerId,policyHash:l.input().snapshot.policyHash}}};
  }
  const config={federationId:"F1",communities},terms={id:"G1",from:"A",to:"B",resource:"water",unit:"liter",units,sourceHead:a.head(),destinationHead:b.head(),issuedAt:100,expiresAt:200};
  const agreement={terms,signatures:["A","B"].flatMap(c=>["steward","reviewer"].map(r=>signAgreement(config,terms,c,r,keys[c][r])))};
  const prep=(ag=agreement,now=150)=>prepareTransfer(config,ag,now,a.input(),b.input(),{eventId:"transfer-proposal",actor:"planner"});
  return {a,b,config,terms,agreement,keys,prep};
}
test("four independent configured signatures required",()=>{
  const f=fixture();assert.equal(verifyAgreement(f.config,f.agreement,150).terms.units,5);
  assert.throws(()=>verifyAgreement(f.config,{...f.agreement,signatures:f.agreement.signatures.slice(0,3)},150),/four/);
});
test("duplicate signer cannot satisfy quorum",()=>{
  const f=fixture(),s=f.agreement.signatures;
  assert.throws(()=>verifyAgreement(f.config,{...f.agreement,signatures:[s[0],s[0],s[2],s[3]]},150),/duplicate/);
});
test("tampering with signed quantity fails",()=>{
  const f=fixture();assert.throws(()=>verifyAgreement(f.config,{...f.agreement,terms:{...f.terms,units:6}},150),/signature/);
});
test("wrong signer key fails",()=>{
  const f=fixture(),s=signAgreement(f.config,f.terms,"A","reviewer",f.keys.A.steward);
  assert.throws(()=>verifyAgreement(f.config,{...f.agreement,signatures:[f.agreement.signatures[0],s,...f.agreement.signatures.slice(2)]},150),/signature/);
});
test("expiry and future issuance fail closed",()=>{
  const f=fixture();for(const now of [99,200,201])assert.throws(()=>verifyAgreement(f.config,f.agreement,now),/validity/);
});
test("shared federation keys rejected",()=>{
  const f=fixture(),c=structuredClone(f.config);c.communities.B.keys.reviewer=c.communities.A.keys.reviewer;
  assert.throws(()=>verifyAgreement(c,f.agreement,150),/shared federation key/);
});
test("cross-federation replay rejected",()=>{
  const f=fixture();assert.throws(()=>verifyAgreement({...f.config,federationId:"F2"},f.agreement,150),/signature/);
});
test("resource units and ledger mapping pinned",()=>{
  const f=fixture();
  assert.throws(()=>verifyAgreement(f.config,{...f.agreement,terms:{...f.terms,unit:"kg"}},150),/mapping/);
  const c=structuredClone(f.config);c.communities.B.resources.water.ledgerId=c.communities.A.resources.water.ledgerId;
  assert.throws(()=>verifyAgreement(c,f.agreement,150),/duplicate ledger/);
});
test("agreement cannot create stock or reservations",()=>{
  const f=fixture(),p=f.prep();assert.equal(p.status,"proposal-only");assert.equal(p.event.units,5);
  assert.equal(f.a.state().stock,12);assert.equal(f.b.state().stock,2);assert.equal(f.a.state().reserved,0);
  assert.equal(Object.hasOwn(p,"signature"),false);
});
test("local signature and approval remain necessary",()=>{
  const f=fixture(),p=f.prep(),input=f.a.input();
  const e=signEvent(input.config,p.previous,p.event,f.a.keys.planner);
  const state=verifySnapshot(input.config,{...input.snapshot,entries:[...input.snapshot.entries,e]},input.checkpoint).state;
  assert.equal(state.proposals[0].status,"proposed");assert.equal(state.reserved,0);assert.equal(state.stock,12);
});
test("signed local reserve cannot be bypassed by agreement",()=>{
  const f=fixture(10);assert.throws(()=>f.prep(),/above reserve/);
});
test("changed source or destination heads require renegotiation",()=>{
  const f=fixture();f.a.add("receive","custodian",{units:1,reason:"fictional"});
  assert.throws(()=>f.prep(),/head changed/);
  const g=fixture();g.b.add("receive","custodian",{units:1,reason:"fictional"});
  assert.throws(()=>g.prep(),/head changed/);
});
test("swapped inventory and missing checkpoint rejected",()=>{
  const f=fixture();
  assert.throws(()=>prepareTransfer(f.config,f.agreement,150,f.b.input(),f.a.input(),{eventId:"X",actor:"planner"}),/mapping/);
  assert.throws(()=>prepareTransfer(f.config,f.agreement,150,{...f.a.input(),checkpoint:null},f.b.input(),{eventId:"X",actor:"planner"}),/checkpoint/);
});
test("paused source cannot prepare a newly signed agreement",()=>{
  const f=fixture();f.a.add("pause","custodian",{reason:"inspect"});
  const terms={...f.terms,sourceHead:f.a.head()};
  const ag={terms,signatures:["A","B"].flatMap(c=>["steward","reviewer"].map(r=>signAgreement(f.config,terms,c,r,f.keys[c][r])))};
  assert.throws(()=>f.prep(ag),/paused/);
});
