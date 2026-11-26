export function planRound(input, policy="proportional"){
  if(!input||typeof input!=="object"||Array.isArray(input))throw Error("invalid input");
  const {stock,requests,round=0}=input;
  const integer=(x)=>Number.isSafeInteger(x)&&x>=0&&x<=1000000;
  if(!integer(stock)||!integer(round)||!Array.isArray(requests)||requests.length>1000||!["proportional","fcfs","equal-share"].includes(policy))throw Error("invalid round");
  const tiers=["essential","routine","optional"], seen=new Set();
  const ids=requests.map((r)=>{
    if(!r||Object.keys(r).some(k=>!["id","quantity","tier","order"].includes(k))||typeof r.id!=="string"||!/^[A-Za-z0-9_-]{1,40}$/.test(r.id)||seen.has(r.id)||!integer(r.quantity)||!tiers.includes(r.tier)||!integer(r.order))throw Error("invalid or duplicate request");
    seen.add(r.id);return {id:r.id,quantity:r.quantity,tier:r.tier,order:r.order,allocated:0};
  }).sort((a,b)=>a.id<b.id?-1:a.id>b.id?1:0);
  let remaining=stock;
  for(const tier of tiers){
    const g=ids.filter(x=>x.tier===tier&&x.quantity>0);
    if(!g.length)continue;
    const total=g.reduce((s,x)=>s+x.quantity,0), budget=Math.min(total,remaining);
    const offset=round%g.length;
    const rotated=g.slice(offset).concat(g.slice(0,offset));
    const rank=new Map(rotated.map((x,i)=>[x.id,i]));
    if(policy==="fcfs"){
      let left=budget;
      for(const x of [...g].sort((a,b)=>a.order-b.order||rank.get(a.id)-rank.get(b.id))){
        x.allocated=Math.min(left,x.quantity);left-=x.allocated;
      }
    }else if(policy==="equal-share"){
      let left=budget;
      while(left){
        const eligible=rotated.filter(x=>x.allocated<x.quantity);
        const step=Math.max(1,Math.floor(left/eligible.length));
        for(const x of eligible){
          const n=Math.min(step,left,x.quantity-x.allocated);
          x.allocated+=n;left-=n;if(!left)break;
        }
      }
    }else{
      for(const x of g)x.allocated=Math.floor(budget*x.quantity/total);
      let left=budget-g.reduce((s,x)=>s+x.allocated,0);
      const sorted=[...g].sort((a,b)=>(budget*b.quantity%total)-(budget*a.quantity%total)||rank.get(a.id)-rank.get(b.id));
      for(const x of sorted){if(!left)break;if(x.allocated<x.quantity){x.allocated++;left--;}}
      if(left)throw Error("allocation reconciliation error");
    }
    remaining-=budget;
  }
  const allocations=ids.map(x=>({id:x.id,tier:x.tier,requested:x.quantity,allocated:x.allocated,unmet:x.quantity-x.allocated}));
  const delivered=allocations.reduce((s,x)=>s+x.allocated,0);
  if(stock!==delivered+remaining||allocations.some(x=>x.unmet<0))throw Error("stock conservation error");
  const essential=allocations.filter(x=>x.tier==="essential"&&x.requested>0);
  const requested=essential.reduce((s,x)=>s+x.requested,0);
  const met=essential.reduce((s,x)=>s+x.allocated,0);
  return {status:"proposal-only",policy,round,openingStock:stock,remainingStock:remaining,delivered,allocations,metrics:{essentialRequested:requested,essentialMet:met,essentialFulfillment:requested?met/requested:null,worstEssentialFraction:essential.length?Math.min(...essential.map(x=>x.allocated/x.requested)):null}};
}

export function proposeTask(task,offers){
  if(!task||typeof task.skill!=="string"||!Array.isArray(offers))throw Error("invalid task");
  const candidates=offers.filter(o=>o&&o.skill===task.skill&&o.qualified===true&&o.available===true&&o.accepted===true).map(o=>o.id);
  if(candidates.some(id=>typeof id!=="string"||!id)||new Set(candidates).size!==candidates.length)throw Error("invalid offers");
  return {status:candidates.length?"human-review-required":"uncovered",candidates:candidates.sort()};
}
