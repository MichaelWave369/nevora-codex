import test from "node:test";
import assert from "node:assert/strict";
import {replayLedger} from "../experiments/compassion-commons/ledger.mjs";

function cases(assert,replayLedger){
  const ev=(n,type,actor,data={})=>({id:"E"+n,expectedVersion:n,type,actor,...data});
  const open=ev(0,"open","custodian",{stock:12});
  const propose=ev(1,"propose","planner",{proposal:"P1",units:9});
  const approve=ev(2,"approve","reviewer",{proposal:"P1",reason:"reviewed fictional needs"});
  const deliver=ev(3,"deliver","custodian",{proposal:"P1",reason:"synthetic transfer"});
  const initial=[open,propose,approve];
  return [
    ["proposal does not consume or reserve stock",()=>{const x=replayLedger([open,propose]);assert.equal(x.stock,12);assert.equal(x.reserved,0)}],
    ["approval reserves but does not deliver",()=>{const x=replayLedger(initial);assert.equal(x.stock,12);assert.equal(x.available,3);assert.equal(x.delivered,0)}],
    ["delivery consumes once",()=>{const x=replayLedger([...initial,deliver,deliver]);assert.equal(x.stock,3);assert.equal(x.reserved,0);assert.equal(x.delivered,9);assert.equal(x.version,4)}],
    ["conflicting event ID",()=>assert.throws(()=>replayLedger([...initial,deliver,{...deliver,reason:"changed"}]))],
    ["stale event cannot overwrite stock",()=>assert.throws(()=>replayLedger([...initial,{...deliver,expectedVersion:1}]))],
    ["self approval prohibited",()=>assert.throws(()=>replayLedger([open,propose,{...approve,actor:"planner"}]))],
    ["approver cannot attest delivery",()=>assert.throws(()=>replayLedger([...initial,{...deliver,actor:"reviewer"}]))],
    ["delivery without approval rejected",()=>assert.throws(()=>replayLedger([open,propose,{...deliver,expectedVersion:2}]))],
    ["overcommit rejected",()=>{const p=ev(3,"propose","planner",{proposal:"P2",units:4});assert.throws(()=>replayLedger([...initial,p,ev(4,"approve","reviewer",{proposal:"P2",reason:"review"})]))}],
    ["cancel releases reservation",()=>{const x=replayLedger([...initial,ev(3,"cancel","reviewer",{proposal:"P1",reason:"revised need"})]);assert.equal(x.available,12);assert.equal(x.proposals[0].status,"cancelled")}],
    ["appeal freezes delivery and retains reservation",()=>{const a=ev(3,"appeal","household",{proposal:"P1",reason:"review requested"});const x=replayLedger([...initial,a]);assert.equal(x.reserved,9);assert.throws(()=>replayLedger([...initial,a,{...deliver,id:"E4",expectedVersion:4}]))}],
    ["appeal reviewer independent; cancel releases",()=>{const a=ev(3,"appeal","household",{proposal:"P1",reason:"review requested"});const r=ev(4,"resolve","arbiter",{proposal:"P1",decision:"cancel",reason:"independent review"});for(const actor of ["planner","reviewer","household"])assert.throws(()=>replayLedger([...initial,a,{...r,actor}]));assert.equal(replayLedger([...initial,a,r]).available,12)}],
    ["upheld appeal restores approved state",()=>{const a=ev(3,"appeal","household",{proposal:"P1",reason:"review requested"});const r=ev(4,"resolve","arbiter",{proposal:"P1",decision:"uphold",reason:"independent review"});assert.equal(replayLedger([...initial,a,r,{...deliver,id:"E5",expectedVersion:5}]).delivered,9)}],
    ["outage pause and observed-stock mismatch",()=>{const pause=ev(3,"pause","custodian",{reason:"network unavailable"});assert.throws(()=>replayLedger([...initial,pause,{...deliver,id:"E4",expectedVersion:4}]));assert.throws(()=>replayLedger([...initial,pause,ev(4,"resume","custodian",{observed:11,reason:"count"})]));assert.equal(replayLedger([...initial,pause,ev(4,"resume","custodian",{observed:12,reason:"count"})]).paused,false)}],
    ["physical receipt and loss reconcile",()=>{const x=replayLedger([open,ev(1,"receive","custodian",{units:4,reason:"shipment received"}),ev(2,"loss","custodian",{units:3,reason:"damaged stock"})]);assert.equal(x.stock,13);assert.equal(x.opening+x.received-x.lost-x.delivered,x.stock)}],
    ["reserved stock cannot be silently lost",()=>assert.throws(()=>replayLedger([...initial,ev(3,"loss","custodian",{units:4,reason:"damage"})]))],
    ["JSON restart replay identical",()=>assert.deepEqual(replayLedger([...initial,deliver]),replayLedger(JSON.parse(JSON.stringify([...initial,deliver]))))],
    ["unknown fields fail closed",()=>assert.throws(()=>replayLedger([open,{...propose,loyalty:100}]))],
    ["duplicate canonical key order accepted",()=>{const reversed=Object.fromEntries(Object.entries(deliver).reverse());assert.equal(replayLedger([...initial,deliver,reversed]).delivered,9)}],
    ["conservation sweep",()=>{for(let stock=0;stock<=24;stock++)for(let units=1;units<=24;units++){const o={...open,stock},p={...propose,units};if(units>stock){assert.throws(()=>replayLedger([o,p,approve]));continue}const x=replayLedger([o,p,approve,deliver,deliver]);assert.equal(x.stock,stock-units);assert.equal(x.reserved,0);assert.equal(x.delivered,units)}}]
  ];
}

for(const [name,check] of cases(assert,replayLedger)) test(name,check);
