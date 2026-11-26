const plain=x=>x!==null&&typeof x==="object"&&Object.getPrototypeOf(x)===Object.prototype;
const exact=(x,keys)=>plain(x)&&Object.keys(x).length===keys.length&&keys.every(k=>Object.hasOwn(x,k));
const id=x=>typeof x==="string"&&/^[A-Za-z0-9_-]{1,40}$/.test(x);
const qty=x=>Number.isSafeInteger(x)&&x>=0&&x<=1000000;
const cmp=(a,b)=>a<b?-1:a>b?1:0;
const uniqueIds=a=>Array.isArray(a)&&a.length<=1000&&a.every(id)&&new Set(a).size===a.length;
const tiers=["essential","routine","optional"];

// Synthetic suggestions only. Explicit task-specific willingness and declared skills are necessary.
export function planWork(tasks,offers,{round=0}={}){
  if(!Array.isArray(tasks)||tasks.length>1000||!Array.isArray(offers)||offers.length>1000||!qty(round))throw Error("invalid workload input");
  const taskIds=new Set(),offerIds=new Set();
  for(const t of tasks){
    if(!exact(t,["id","skill","minutes","tier"])||!id(t.id)||!id(t.skill)||!qty(t.minutes)||t.minutes===0||!tiers.includes(t.tier)||taskIds.has(t.id))throw Error("invalid or duplicate task");
    taskIds.add(t.id);
  }
  const remaining=new Map();
  for(const o of offers){
    if(!exact(o,["id","skills","acceptedTasks","maxMinutes"])||!id(o.id)||offerIds.has(o.id)||!uniqueIds(o.skills)||!uniqueIds(o.acceptedTasks)||o.acceptedTasks.some(t=>!taskIds.has(t))||!qty(o.maxMinutes))throw Error("invalid or duplicate offer");
    offerIds.add(o.id);remaining.set(o.id,o.maxMinutes);
  }
  const roster=[...offers].sort((a,b)=>cmp(a.id,b.id));
  const offset=roster.length?round%roster.length:0;
  const rank=new Map(roster.slice(offset).concat(roster.slice(0,offset)).map((o,i)=>[o.id,i]));
  const assigned=[],uncovered=[];
  for(const t of [...tasks].sort((a,b)=>tiers.indexOf(a.tier)-tiers.indexOf(b.tier)||cmp(a.id,b.id))){
    const eligible=roster.filter(o=>o.skills.includes(t.skill)&&o.acceptedTasks.includes(t.id)&&remaining.get(o.id)>=t.minutes);
    eligible.sort((a,b)=>{
      const aUsed=a.maxMinutes-remaining.get(a.id), bUsed=b.maxMinutes-remaining.get(b.id);
      return aUsed*b.maxMinutes-bUsed*a.maxMinutes||rank.get(a.id)-rank.get(b.id);
    });
    if(!eligible.length){uncovered.push({taskId:t.id,minutes:t.minutes,tier:t.tier,reason:"no consenting qualified capacity"});continue;}
    const o=eligible[0];remaining.set(o.id,remaining.get(o.id)-t.minutes);
    assigned.push({taskId:t.id,offerId:o.id,minutes:t.minutes,status:"suggestion-reconfirm-consent"});
  }
  return {status:"proposal-only",assigned,uncovered,totals:{requestedMinutes:tasks.reduce((s,t)=>s+t.minutes,0),suggestedMinutes:assigned.reduce((s,t)=>s+t.minutes,0),uncoveredMinutes:uncovered.reduce((s,t)=>s+t.minutes,0)}};
}

// Forecast only: pending shipments are never counted as physical inventory.
export function planReplenishment(input){
  if(!exact(input,["stock","reserved","protectedReserve","forecastDemand","targetAfterDemand","pending"])||
     !["stock","reserved","protectedReserve","forecastDemand","targetAfterDemand"].every(k=>qty(input[k]))||
     input.reserved>input.stock||!Array.isArray(input.pending)||input.pending.length>1000)throw Error("invalid replenishment input");
  const seen=new Set();
  let pendingUnits=0;
  for(const p of input.pending){
    if(!exact(p,["id","units"])||!id(p.id)||!qty(p.units)||p.units===0||seen.has(p.id))throw Error("invalid or duplicate shipment");
    seen.add(p.id);pendingUnits+=p.units;
  }
  const free=input.stock-input.reserved;
  const required=input.forecastDemand+Math.max(input.protectedReserve,input.targetAfterDemand);
  const grossGap=Math.max(0,required-free);
  return {status:"forecast-only",physicalStock:input.stock,allocatableNow:Math.max(0,free-input.protectedReserve),pendingUnits,grossGap,conditionalAdditionalRequest:Math.max(0,grossGap-pendingUnits),unmetIfNoArrivals:grossGap};
}
