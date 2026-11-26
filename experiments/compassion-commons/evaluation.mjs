import {planRound} from "./simulator.mjs";
import {planWork,planReplenishment} from "./human-potential.mjs";
import {compareTransition,reconcileTransfers} from "./transition.mjs";

const fixture=(id,quantity,tier="essential",order=0)=>({id,quantity,tier,order});
const requests=()=>Array.from({length:9},(_,i)=>fixture("H"+(i+1),2,"essential",i));
const tasks=()=>[{id:"T1",skill:"repair",minutes:30,tier:"essential"},{id:"T2",skill:"repair",minutes:30,tier:"essential"}];
const offers=()=>[{id:"V1",skills:["repair"],acceptedTasks:["T1","T2"],maxMinutes:30},{id:"V2",skills:["repair"],acceptedTasks:["T1","T2"],maxMinutes:30}];
const scenario=(localReceived,openingCash,maxPurchasable)=>({openingCash,receivedCash:0,obligations:300,cashReserve:200,resources:[{id:"water",unit:"liter",openingStock:2,localReceived,reserve:2,unitCost:100,maxPurchasable,requests:requests()}]});
const observation=(eventId,type,units)=>({eventId,transferId:"G1",type,resource:"water",unit:"liter",from:"A",to:"B",units});

// Reproducible independent component evaluations, not a unified settlement engine.
// All data is fictional; no personal or monetary worth score is computed.
export function evaluateCommons(){
  const allocations=["fcfs","equal-share","proportional"].map(policy=>{
    const x=planRound({stock:12,requests:requests()},policy);
    return {policy,delivered:x.delivered,unmet:x.metrics.essentialRequested-x.metrics.essentialMet,worstFraction:x.metrics.worstEssentialFraction,remainingStock:x.remainingStock};
  });
  const full=planWork(tasks(),offers()),withdrawn=planWork(tasks(),offers().slice(0,1));
  const before=planRound({stock:12,requests:requests()});
  const after=planRound({stock:12,requests:requests()});
  const shocks=[
    {id:"normal",input:scenario(9,2500,100)},
    {id:"supply-shock",input:scenario(0,2500,3)},
    {id:"cash-shock",input:scenario(9,200,100)}
  ].map(s=>({id:s.id,result:compareTransition(s.input)}));
  const replenishment=planReplenishment({stock:12,reserved:3,protectedReserve:3,forecastDemand:18,targetAfterDemand:3,pending:[{id:"shipment",units:9}]});
  const dispatch=observation("D","dispatch",9),receipt=observation("R","receipt",4);
  const transfers=reconcileTransfers([dispatch,receipt,receipt,observation("L","loss",2)]);
  return {status:"synthetic-evaluation-only",allocations,work:{initialMinutes:full.totals.suggestedMinutes,afterWithdrawalMinutes:withdrawn.totals.suggestedMinutes,uncoveredMinutes:withdrawn.totals.uncoveredMinutes,allocationBefore:before.allocations,allocationAfter:after.allocations},shocks,replenishment,transfers};
}
