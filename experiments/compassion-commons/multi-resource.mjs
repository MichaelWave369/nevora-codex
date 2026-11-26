import {verifySnapshot} from "./local-ledger.mjs";
import {planRound} from "./simulator.mjs";
const plain=x=>x!==null&&typeof x==="object"&&Object.getPrototypeOf(x)===Object.prototype;
const exact=(x,keys)=>plain(x)&&Object.keys(x).length===keys.length&&keys.every(k=>Object.hasOwn(x,k));
const ident=x=>typeof x==="string"&&/^[A-Za-z0-9_-]{1,40}$/.test(x);
const qty=x=>Number.isSafeInteger(x)&&x>=0&&x<=1000000;
const policies=["proportional","fcfs","equal-share"];
function checkResource(r){
  if(!exact(r,["resourceId","unit","reserve","config","snapshot","checkpoint","requests"])||!ident(r.resourceId)||!ident(r.unit)||!qty(r.reserve)||!r.checkpoint)throw Error("invalid resource or missing trusted checkpoint");
  const result=verifySnapshot(r.config,r.snapshot,r.checkpoint);
  if(!result.state.started)throw Error("unopened inventory");
  return result;
}
export function planCommons(resources,{round=0,policy="proportional"}={}){
  if(!Array.isArray(resources)||resources.length===0||resources.length>100||!qty(round)||!policies.includes(policy))throw Error("invalid commons plan");
  const ids=new Set(),ledgers=new Set();
  const results=resources.map(r=>{
    const {head,state}=checkResource(r);
    if(ids.has(r.resourceId)||ledgers.has(r.config.ledgerId))throw Error("duplicate resource or ledger");
    ids.add(r.resourceId);ledgers.add(r.config.ledgerId);
    const available=Math.max(0,state.available-r.reserve);
    const plan=planRound({stock:state.paused?0:available,requests:r.requests,round},policy);
    return {resourceId:r.resourceId,unit:r.unit,ledgerId:r.config.ledgerId,policyHash:r.snapshot.policyHash,head,version:state.version,paused:state.paused,stock:state.stock,reserved:state.reserved,protectedReserve:r.reserve,available,plannedUnits:plan.delivered,unallocatedAvailable:available-plan.delivered,allocations:plan.allocations,metrics:plan.metrics};
  }).sort((a,b)=>a.resourceId<b.resourceId?-1:a.resourceId>b.resourceId?1:0);
  return {status:"proposal-only",round,policy,resources:results};
}
// Recompute a resource's plan against the provided verified current snapshot.
// The returned event is UNSIGNED. A planner must sign it for this exact chain head.
export function proposalFromPlan(resource,record,{round,policy,eventId,proposalId,actor}){
  if(!ident(eventId)||!ident(proposalId)||!ident(actor))throw Error("invalid event identifiers");
  const actual=planCommons([resource],{round,policy}).resources[0];
  // Compare all fields, including individual allocations, not just aggregate totals.
  function normalize(x){
    if(Array.isArray(x))return x.map(normalize);
    if(plain(x))return Object.fromEntries(Object.keys(x).sort().map(k=>[k,normalize(x[k])]));
    return x;
  }
  if(!plain(record)||JSON.stringify(normalize(actual))!==JSON.stringify(normalize(record)))throw Error("plan changed; recompute against current inventory");
  if(actual.paused||actual.plannedUnits===0)throw Error("no admissible proposal");
  return {previous:actual.head,event:{id:eventId,actor,type:"propose",expectedVersion:actual.version,proposal:proposalId,units:actual.plannedUnits}};
}
