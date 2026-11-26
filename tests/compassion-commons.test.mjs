import test from "node:test";
import assert from "node:assert/strict";
import {planRound,proposeTask} from "../experiments/compassion-commons/simulator.mjs";

function runChecks(assert,planRound,proposeTask){
  const sample=Array.from({length:9},(_,i)=>({id:`H0${i+1}`,quantity:2,tier:"essential",order:i}));
  const run=(stock,round=0,policy="proportional",requests=sample)=>planRound({stock,requests,round},policy);
  const checks=[
    ["full supply",()=>{assert.equal(run(20).delivered,18);assert.equal(run(20).remainingStock,2)}],
    ["shortage 18/12",()=>{const r=run(12);assert.equal(r.delivered,12);assert.equal(r.metrics.essentialRequested-r.metrics.essentialMet,6);assert.equal(r.metrics.worstEssentialFraction,0.5)}],
    ["zero supply",()=>{assert.equal(run(0).delivered,0);assert.equal(run(0).metrics.worstEssentialFraction,0)}],
    ["rotation",()=>{assert.equal(run(12,0).allocations[0].allocated,2);assert.equal(run(12,3).allocations[0].allocated,1)}],
    ["input order independent",()=>assert.deepEqual(run(12),run(12,0,"proportional",[...sample].reverse()))],
    ["duplicate rejection",()=>assert.throws(()=>run(12,0,"proportional",[sample[0],sample[0]]))],
    ["invalid quantity and stock",()=>{assert.throws(()=>run(-1));assert.throws(()=>run(12,0,"proportional",[{...sample[0],quantity:1.5}]))}],
    ["priority",()=>{const r=run(1,0,"proportional",[{...sample[0],tier:"optional"},sample[1]]);assert.equal(r.allocations[0].allocated,0);assert.equal(r.allocations[1].allocated,1)}],
    ["no loyalty or productivity fields",()=>{assert.throws(()=>run(12,0,"proportional",[{...sample[0],loyalty:99}]));assert.throws(()=>run(12,0,"proportional",[{...sample[0],workCredits:99}]))}],
    ["consent independent of goods",()=>{const before=run(12);assert.equal(proposeTask({skill:"repair"},[{id:"H01",skill:"repair",qualified:true,available:true,accepted:false}]).status,"uncovered");assert.deepEqual(run(12),before)}],
    ["qualified consent required",()=>{assert.equal(proposeTask({skill:"repair"},[{id:"H01",skill:"repair",qualified:false,available:true,accepted:true}]).status,"uncovered");assert.deepEqual(proposeTask({skill:"repair"},[{id:"H02",skill:"repair",qualified:true,available:true,accepted:true}]),{status:"human-review-required",candidates:["H02"]})}],
    ["baseline comparison",()=>{assert.equal(run(12,0,"fcfs").metrics.worstEssentialFraction,0);assert.equal(run(12,0,"equal-share").metrics.worstEssentialFraction,0.5)}],
    ["empty demand",()=>{assert.equal(run(3,0,"proportional",[]).metrics.essentialFulfillment,null);assert.equal(run(3,0,"proportional",[]).remainingStock,3)}],
    ["exhaustive small stock sweep",()=>{for(const policy of ["proportional","fcfs","equal-share"])for(let stock=0;stock<=25;stock++)for(let round=0;round<9;round++){const r=run(stock,round,policy);assert.equal(r.delivered+r.remainingStock,stock);assert.equal(r.delivered,Math.min(stock,18));assert.equal(r.status,"proposal-only");assert.equal(r.allocations.every(x=>x.allocated>=0&&x.allocated<=x.requested),true)}}],
    ["unequal requests conservation",()=>{const req=sample.map((x,i)=>({...x,quantity:i+1}));for(let stock=0;stock<=45;stock++){const r=run(stock,2,"proportional",req);assert.equal(r.delivered,stock);assert.equal(r.allocations.every(x=>x.unmet>=0),true)}}]
  ];
  return checks;
}

for(const [name,check] of runChecks(assert,planRound,proposeTask)) test(name,check);
