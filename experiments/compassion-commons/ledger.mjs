export function replayLedger(events){
  const fail=m=>{throw Error(m)};
  const integer=n=>Number.isSafeInteger(n)&&n>=0&&n<=1000000;
  const ident=x=>typeof x==="string"&&/^[A-Za-z0-9_-]{1,40}$/.test(x);
  const reason=x=>typeof x==="string"&&x.length>0&&x.length<=160;
  const canonical=x=>Array.isArray(x)?"["+x.map(canonical).join(",")+"]":x!==null&&typeof x==="object"?"{"+Object.keys(x).sort().map(k=>JSON.stringify(k)+":"+canonical(x[k])).join(",")+"}":JSON.stringify(x);
  const schemas={
    open:["stock"],receive:["units","reason"],loss:["units","reason"],
    propose:["proposal","units"],approve:["proposal","reason"],deliver:["proposal","reason"],
    cancel:["proposal","reason"],appeal:["proposal","reason"],resolve:["proposal","decision","reason"],
    pause:["reason"],resume:["observed","reason"]
  };
  if(!Array.isArray(events)||events.length>10000)fail("invalid event log");
  let stock=0,opening=0,received=0,lost=0,delivered=0,reserved=0,version=0,paused=false,started=false;
  const proposals=new Map(),seen=new Map();
  for(const e of events){
    if(!e||Object.getPrototypeOf(e)!==Object.prototype||!ident(e.id)||!ident(e.actor)||!Object.hasOwn(schemas,e.type)||!integer(e.expectedVersion))fail("invalid event");
    const fields=["id","actor","type","expectedVersion",...schemas[e.type]];
    if(Object.keys(e).length!==fields.length||fields.some(k=>!Object.hasOwn(e,k)))fail("unknown or missing event field");
    if(Object.hasOwn(e,"reason")&&!reason(e.reason))fail("invalid reason");
    if(Object.hasOwn(e,"proposal")&&!ident(e.proposal))fail("invalid proposal ID");
    if(Object.hasOwn(e,"units")&&(!integer(e.units)||e.units===0))fail("invalid units");
    if(Object.hasOwn(e,"stock")&&!integer(e.stock))fail("invalid stock");
    if(Object.hasOwn(e,"observed")&&!integer(e.observed))fail("invalid observation");
    if(Object.hasOwn(e,"decision")&&!["uphold","cancel"].includes(e.decision))fail("invalid appeal decision");
    const fingerprint=canonical(e);
    if(seen.has(e.id)){
      if(seen.get(e.id)!==fingerprint)fail("conflicting event ID");
      continue;
    }
    if(e.expectedVersion!==version)fail("stale event version");
    if(!started&&e.type!=="open")fail("ledger not opened");
    if(started&&e.type==="open")fail("ledger already opened");
    const p=proposals.get(e.proposal);
    switch(e.type){
      case "open":stock=opening=e.stock;started=true;break;
      case "receive":if(stock+e.units>1000000)fail("stock limit");stock+=e.units;received+=e.units;break;
      case "loss":if(e.units>stock-reserved)fail("loss exceeds unreserved stock; cancel or reconcile reservations first");stock-=e.units;lost+=e.units;break;
      case "propose":
        if(paused||p)fail("paused or duplicate proposal");
        proposals.set(e.proposal,{id:e.proposal,units:e.units,proposer:e.actor,approver:null,appellant:null,status:"proposed"});break;
      case "approve":
        if(paused||!p||p.status!=="proposed"||p.proposer===e.actor||p.units>stock-reserved)fail("approval denied");
        p.approver=e.actor;p.status="approved";reserved+=p.units;break;
      case "deliver":
        if(paused||!p||p.status!=="approved"||e.actor===p.proposer||e.actor===p.approver)fail("delivery denied");
        stock-=p.units;reserved-=p.units;delivered+=p.units;p.status="delivered";break;
      case "cancel":
        if(!p||!["proposed","approved"].includes(p.status)||e.actor===p.proposer)fail("cancellation denied");
        if(p.status==="approved")reserved-=p.units;p.status="cancelled";break;
      case "appeal":
        if(!p||!["proposed","approved"].includes(p.status))fail("appeal denied");
        p.previousStatus=p.status;p.appellant=e.actor;p.status="appealed";break;
      case "resolve":
        if(!p||p.status!=="appealed"||[p.proposer,p.approver,p.appellant].includes(e.actor))fail("independent review required");
        if(e.decision==="cancel"){if(p.previousStatus==="approved")reserved-=p.units;p.status="cancelled";}
        else p.status=p.previousStatus;
        delete p.previousStatus;p.appellant=null;break;
      case "pause":if(paused)fail("already paused");paused=true;break;
      case "resume":if(!paused||e.observed!==stock)fail("physical stock mismatch or not paused");paused=false;break;
    }
    if(stock!==opening+received-lost-delivered||stock<0||reserved<0||reserved>stock)fail("conservation failure");
    const held=[...proposals.values()].filter(x=>x.status==="approved"||(x.status==="appealed"&&x.previousStatus==="approved")).reduce((s,x)=>s+x.units,0);
    if(held!==reserved)fail("reservation reconciliation failure");
    version++;seen.set(e.id,fingerprint);
  }
  return {started,version,paused,stock,reserved,available:stock-reserved,opening,received,lost,delivered,proposals:[...proposals.values()].sort((a,b)=>a.id<b.id?-1:a.id>b.id?1:0)};
}
