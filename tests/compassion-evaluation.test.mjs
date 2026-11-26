import test from "node:test";
import assert from "node:assert/strict";
import {evaluateCommons} from "../experiments/compassion-commons/evaluation.mjs";

test("integrated report reproducible and explicitly synthetic",()=>{
  const a=evaluateCommons();assert.deepEqual(a,evaluateCommons());assert.equal(a.status,"synthetic-evaluation-only");
});
test("equal throughput can conceal unequal access",()=>{
  const x=evaluateCommons().allocations;
  assert.ok(x.every(r=>r.delivered===12&&r.unmet===6&&r.remainingStock===0));
  assert.equal(x.find(r=>r.policy==="fcfs").worstFraction,0);
  assert.equal(x.find(r=>r.policy==="proportional").worstFraction,0.5);
});
test("withdrawn volunteer reduces coverage, not allocation eligibility",()=>{
  const x=evaluateCommons().work;assert.equal(x.initialMinutes,60);assert.equal(x.afterWithdrawalMinutes,30);
  assert.equal(x.uncoveredMinutes,30);assert.deepEqual(x.allocationBefore,x.allocationAfter);
});
test("normal scenario compares procurement at same fulfillment",()=>{
  const x=evaluateCommons().shocks.find(s=>s.id==="normal").result;
  assert.equal(x.parallel.resources[0].distributed,18);assert.equal(x.external.resources[0].distributed,18);
  assert.equal(x.procurementCostDifference,900);
});
test("supply shock explicitly exposes unmet needs",()=>{
  const x=evaluateCommons().shocks.find(s=>s.id==="supply-shock").result.parallel;
  assert.equal(x.resources[0].distributed,3);assert.equal(x.resources[0].unmet,15);
  assert.ok(x.stopReasons.includes("unmet essential needs"));
});
test("cash shock exposes unpaid obligations without fictitious purchases",()=>{
  const x=evaluateCommons().shocks.find(s=>s.id==="cash-shock").result.parallel;
  assert.equal(x.cash.unpaidObligations,100);assert.equal(x.cash.procurementCost,0);
  assert.ok(x.stopReasons.includes("unpaid external obligations"));assert.ok(x.stopReasons.includes("cash reserve shortfall"));
});
test("pending shipment cannot conceal current inventory shortage",()=>{
  const x=evaluateCommons().replenishment;assert.equal(x.physicalStock,12);assert.equal(x.allocatableNow,6);
  assert.equal(x.pendingUnits,9);assert.equal(x.grossGap,12);assert.equal(x.conditionalAdditionalRequest,3);
});
test("duplicate partial receipt never increases received amount",()=>{
  const [x]=evaluateCommons().transfers;assert.equal(x.dispatched,9);assert.equal(x.received,4);assert.equal(x.lost,2);assert.equal(x.inTransit,3);assert.equal(x.status,"outstanding");
});
test("cash and resource conservation across integrated scenarios",()=>{
  for(const {result} of evaluateCommons().shocks)for(const x of [result.parallel,result.external]){
    assert.equal(x.cash.available,x.cash.obligationsPaid+x.cash.procurementCost+x.cash.closing);
    for(const r of x.resources)assert.equal(r.openingStock+r.localReceived+r.purchased,r.distributed+r.endingStock);
  }
});
