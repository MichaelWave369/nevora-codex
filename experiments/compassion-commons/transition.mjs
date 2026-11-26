import {planRound} from "./simulator.mjs";
const plain=x=>x!==null&&typeof x==="object"&&Object.getPrototypeOf(x)===Object.prototype;
const exact=(x,keys)=>plain(x)&&Object.keys(x).length===keys.length&&keys.every(k=>Object.hasOwn(x,k));
const id=x=>typeof x==="string"&&/^[A-Za-z0-9_-]{1,40}$/.test(x);
const qty=x=>Number.isSafeInteger(x)&&x>=0&&x<=1000000;
const cash=x=>Number.isSafeInteger(x)&&x>=0&&x<=1000000000000;
const cmp=(a,b)=>a<b?-1:a>b?1:0;
function validate(input){
  if(!exact(input,["openingCash","receivedCash","obligations","cashReserve","resources"])||
    !["openingCash","receivedCash","obligations","cashReserve"].every(k=>cash(input[k]))||
    !Array.isArray(input.resources)||!input.resources.length||input.resources.length>100)throw Error("invalid transition scenario");
  const ids=new Set(), units=new Map();
  for(const r of input.resources){
    if(!exact(r,["id","unit","openingStock","localReceived","reserve","unitCost","maxPurchasable","requests"])||
       !id(r.id)||!id(r.unit)||ids.has(r.id)||!["openingStock","localReceived","reserve","unitCost","maxPurchasable"].every(k=>qty(r[k]))||
       r.unitCost===0||r.openingStock+r.localReceived>1000000)throw Error("invalid resource");
    ids.add(r.id);units.set(r.id,r.unit);
    planRound({stock:0,requests:r.requests,round:0});
  }
}
// Model an identical scenario under two procurement policies. Purchases are assumed
// immediately received within this fictional period; no payment or receipt is executed.
export function simulateTransition(input,{mode="parallel",round=0,policy="proportional"}={}){
  validate(input);
  if(!["parallel","external-only"].includes(mode)||!qty(round)||!["proportional","equal-share","fcfs"].includes(policy))throw Error("invalid transition policy");
  const availableCash=input.openingCash+input.receivedCash;
  const obligationsPaid=Math.min(availableCash,input.obligations);
  const unpaidObligations=input.obligations-obligationsPaid;
  let balance=availableCash-obligationsPaid;
  const records=[...input.resources].sort((a,b)=>cmp(a.id,b.id)).map(r=>{
    // External-only baseline makes local receipts unavailable to this allocation model,
    // not destroyed: they remain explicitly outside this policy's available inventory.
    const usableLocal=mode==="parallel"?r.localReceived:0;
    const excludedLocal=r.localReceived-usableLocal;
    const initial=r.openingStock+usableLocal;
    const demand=r.requests.reduce((s,x)=>s+x.quantity,0);
    const essential=r.requests.filter(x=>x.tier==="essential").reduce((s,x)=>s+x.quantity,0);
    return {r,initial,usableLocal,excludedLocal,demand,essential,purchased:0,cost:0};
  });
  // Essential gaps before all other gaps; deterministic resource-ID order is an explicit
  // baseline, not an optimal or ethically privileged cross-resource ranking.
  for(const essentialOnly of [true,false]){
    for(const x of records){
      const target=(essentialOnly?x.essential:x.demand)+x.r.reserve;
      const need=Math.max(0,target-x.initial-x.purchased);
      const affordable=Math.floor(Math.max(0,balance-input.cashReserve)/x.r.unitCost);
      const n=unpaidObligations?0:Math.min(need,affordable,x.r.maxPurchasable-x.purchased,1000000-x.initial-x.purchased);
      x.purchased+=n;x.cost+=n*x.r.unitCost;balance-=n*x.r.unitCost;
    }
  }
  const resources=records.map(x=>{
    const available=x.initial+x.purchased;
    const plan=planRound({stock:Math.max(0,available-x.r.reserve),requests:x.r.requests,round},policy);
    const endingStock=available-plan.delivered;
    return {id:x.r.id,unit:x.r.unit,openingStock:x.r.openingStock,localReceived:x.usableLocal,excludedLocal:x.excludedLocal,
      purchased:x.purchased,purchaseCost:x.cost,distributed:plan.delivered,endingStock,protectedReserve:x.r.reserve,
      reserveShortfall:Math.max(0,x.r.reserve-endingStock),unmet:plan.allocations.reduce((s,a)=>s+a.unmet,0),allocations:plan.allocations,metrics:plan.metrics};
  });
  const procurementCost=resources.reduce((s,r)=>s+r.purchaseCost,0);
  if(availableCash!==obligationsPaid+procurementCost+balance||resources.some(r=>r.openingStock+r.localReceived+r.purchased!==r.distributed+r.endingStock))throw Error("conservation failure");
  return {status:"simulation-only",mode,policy,round,cash:{available:availableCash,obligationsPaid,unpaidObligations,procurementCost,closing:balance,reserveShortfall:Math.max(0,input.cashReserve-balance)},
    resources,stopReasons:[...(unpaidObligations?["unpaid external obligations"]:[]),...(balance<input.cashReserve?["cash reserve shortfall"]:[]),...(resources.some(r=>r.reserveShortfall)?["physical reserve shortfall"]:[]),...(resources.some(r=>r.metrics.essentialMet<r.metrics.essentialRequested)?["unmet essential needs"]:[])]};
}
export function compareTransition(input,options={}){
  const parallel=simulateTransition(input,{...options,mode:"parallel"});
  const external=simulateTransition(input,{...options,mode:"external-only"});
  return {status:"simulation-only",parallel,external,procurementCostDifference:external.cash.procurementCost-parallel.cash.procurementCost,
    comparisons:parallel.resources.map((r,i)=>({id:r.id,unit:r.unit,parallelEssentialMet:r.metrics.essentialMet,externalEssentialMet:external.resources[i].metrics.essentialMet,parallelWorstFraction:r.metrics.worstEssentialFraction,externalWorstFraction:external.resources[i].metrics.worstEssentialFraction}))};
}

// Reconciliation of fictional observations, not authenticated transfer evidence.
// A transfer's physical inventory is credited only after receipt, never at dispatch.
export function reconcileTransfers(events){
  if(!Array.isArray(events)||events.length>10000)throw Error("invalid transfer log");
  const transfers=new Map(),seen=new Map();
  for(const e of events){
    if(!exact(e,["eventId","transferId","type","resource","unit","from","to","units"])||
       !["eventId","transferId","resource","unit","from","to"].every(k=>id(e[k]))||e.from===e.to||
       !qty(e.units)||e.units===0||!["dispatch","receipt","loss"].includes(e.type))throw Error("invalid transfer event");
    const fingerprint=JSON.stringify([e.transferId,e.type,e.resource,e.unit,e.from,e.to,e.units]);
    if(seen.has(e.eventId)){if(seen.get(e.eventId)!==fingerprint)throw Error("conflicting transfer event");continue;}
    let t=transfers.get(e.transferId);
    if(e.type==="dispatch"){
      if(t)throw Error("duplicate dispatch");
      t={id:e.transferId,resource:e.resource,unit:e.unit,from:e.from,to:e.to,dispatched:e.units,received:0,lost:0};
      transfers.set(t.id,t);
    }else{
      if(!t||["resource","unit","from","to"].some(k=>t[k]!==e[k]))throw Error("missing dispatch or mapping mismatch");
      if(e.units>t.dispatched-t.received-t.lost)throw Error("receipt or loss exceeds outstanding transfer");
      if(e.type==="receipt")t.received+=e.units;else t.lost+=e.units;
    }
    seen.set(e.eventId,fingerprint);
  }
  return [...transfers.values()].sort((a,b)=>cmp(a.id,b.id)).map(t=>({...t,inTransit:t.dispatched-t.received-t.lost,status:t.dispatched===t.received+t.lost?"reconciled":"outstanding"}));
}
