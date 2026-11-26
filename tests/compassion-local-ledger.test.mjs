import test from "node:test";
import assert from "node:assert/strict";
import {generateKeyPairSync} from "node:crypto";
import {mkdtempSync,readFileSync,writeFileSync,unlinkSync,rmSync} from "node:fs";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {spawnSync} from "node:child_process";
import {initializeLedger,loadLedger,appendEvent,signEvent,verifySnapshot} from "../experiments/compassion-commons/local-ledger.mjs";

function fixture(t){
  const dir=mkdtempSync(join(tmpdir(),"nevora-local-"));
  t.after(()=>rmSync(dir,{recursive:true,force:true}));
  const file=join(dir,"ledger.json"),actors={},privateKeys={};
  for(const role of ["custodian","planner","reviewer","participant","arbiter"]){
    const {publicKey,privateKey}=generateKeyPairSync("ed25519");
    actors[role]={role,publicKey:publicKey.export({type:"spki",format:"pem"})};
    privateKeys[role]=privateKey;
  }
  const config={ledgerId:"synthetic",actors};
  initializeLedger(file,config);
  const make=(type,actor,data={},head=loadLedger(file,config).head,version=loadLedger(file,config).state.version,id="E"+version)=>signEvent(config,head,{id,expectedVersion:version,type,actor,...data},privateKeys[actor]);
  const add=(...args)=>appendEvent(file,config,make(...args));
  return {dir,file,config,privateKeys,make,add,read:()=>loadLedger(file,config)};
}
test("explicit initialization; missing file never interpreted as empty",t=>{
  const f=fixture(t);
  assert.throws(()=>initializeLedger(f.file,f.config),/already exists/);
  assert.throws(()=>loadLedger(join(f.dir,"missing"),f.config),/missing/);
});
test("signed local workflow survives fresh load",t=>{
  const f=fixture(t);
  f.add("open","custodian",{stock:12});f.add("propose","planner",{proposal:"P1",units:9});
  f.add("approve","reviewer",{proposal:"P1",reason:"reviewed"});
  assert.equal(f.read().state.reserved,9);
  f.add("deliver","custodian",{proposal:"P1",reason:"fictional"});
  assert.equal(f.read().state.stock,3);assert.equal(f.read().state.delivered,9);
});
test("retry identical signed delivery cannot duplicate consumption",t=>{
  const f=fixture(t);
  f.add("open","custodian",{stock:12});f.add("propose","planner",{proposal:"P1",units:9});
  f.add("approve","reviewer",{proposal:"P1",reason:"reviewed"});
  const e=f.make("deliver","custodian",{proposal:"P1",reason:"fictional"});
  appendEvent(f.file,f.config,e);
  assert.equal(appendEvent(f.file,f.config,e).duplicate,true);
  assert.equal(f.read().state.delivered,9);assert.equal(f.read().snapshot.entries.length,4);
});
test("role denial leaves committed snapshot unchanged",t=>{
  const f=fixture(t),before=readFileSync(f.file,"utf8");
  assert.throws(()=>f.add("open","planner",{stock:12}),/unauthorized/);
  assert.equal(readFileSync(f.file,"utf8"),before);
});
test("forged actor rejected even with valid signature from another key",t=>{
  const f=fixture(t);
  const e=signEvent(f.config,f.read().head,{id:"E0",expectedVersion:0,type:"open",actor:"custodian",stock:12},f.privateKeys.planner);
  assert.throws(()=>appendEvent(f.file,f.config,e),/signature/);
  assert.equal(f.read().state.version,0);
});
test("payload modification invalidates signature",t=>{
  const f=fixture(t),e=f.make("open","custodian",{stock:12});
  e.event.stock=99;
  assert.throws(()=>appendEvent(f.file,f.config,e),/signature/);
});
test("stale competing signed event rejected",t=>{
  const f=fixture(t);
  const e=f.make("open","custodian",{stock:12});
  f.add("open","custodian",{stock:10});
  assert.throws(()=>appendEvent(f.file,f.config,{...e,event:{...e.event,id:"other"}}),/stale chain/);
  assert.equal(f.read().state.stock,10);
});
test("shared public key and changed role policy rejected",t=>{
  const f=fixture(t),changed=structuredClone(f.config);
  changed.actors.planner.publicKey=changed.actors.custodian.publicKey;
  assert.throws(()=>f.read()&&loadLedger(f.file,changed),/shared actor key/);
  const other=structuredClone(f.config);other.actors.planner.role="reviewer";
  assert.throws(()=>loadLedger(f.file,other),/policy/);
});
test("cross-ledger replay rejected",t=>{
  const f=fixture(t);
  const e=f.make("open","custodian",{stock:12});
  const other={...f.config,ledgerId:"other"},file=join(f.dir,"other.json");
  initializeLedger(file,other);
  assert.throws(()=>appendEvent(file,other,e),/signature/);
});
test("tampered stored chain rejected on load",t=>{
  const f=fixture(t);f.add("open","custodian",{stock:12});
  const snapshot=f.read().snapshot;snapshot.entries[0].event.stock=13;
  writeFileSync(f.file,JSON.stringify(snapshot));
  assert.throws(()=>f.read(),/signature/);
});
test("malformed snapshot fails closed",t=>{
  const f=fixture(t);writeFileSync(f.file,"{broken");
  assert.throws(()=>f.read());
  assert.throws(()=>f.add("open","custodian",{stock:12}));
  assert.equal(readFileSync(f.file,"utf8"),"{broken");
});
test("fresh Node process replays committed file",t=>{
  const f=fixture(t);f.add("open","custodian",{stock:12});
  const config=join(f.dir,"config.json");writeFileSync(config,JSON.stringify(f.config));
  const module=new URL("../experiments/compassion-commons/local-ledger.mjs",import.meta.url).href;
  const result=spawnSync(process.execPath,["--input-type=module","-e","import {readFileSync} from 'node:fs'; import {loadLedger} from "+JSON.stringify(module)+"; console.log(loadLedger(process.argv[1],JSON.parse(readFileSync(process.argv[2],'utf8'))).state.stock);",f.file,config],{encoding:"utf8"});
  assert.equal(result.status,0,result.stderr);assert.equal(result.stdout.trim(),"12");
});
test("abandoned lock and temporary file fail closed; manual inspected recovery",t=>{
  const f=fixture(t);f.add("open","custodian",{stock:12});
  const result=spawnSync(process.execPath,["-e","const fs=require('node:fs'); fs.writeFileSync(process.argv[1]+'.lock','',{flag:'wx'}); fs.writeFileSync(process.argv[1]+'.tmp-abandoned','partial'); process.exit(77);",f.file],{encoding:"utf8"});
  assert.equal(result.status,77);
  assert.throws(()=>f.add("receive","custodian",{units:2,reason:"fictional"}),/locked/);
  assert.equal(f.read().state.stock,12);
  unlinkSync(f.file+".tmp-abandoned");unlinkSync(f.file+".lock");
  assert.equal(f.add("receive","custodian",{units:2,reason:"fictional"}).state.stock,14);
});
test("chain truncation limitation explicitly observable",t=>{
  const f=fixture(t);f.add("open","custodian",{stock:12});
  const prefix=f.read().snapshot,head=f.read().head;
  f.add("receive","custodian",{units:2,reason:"fictional"});
  assert.notEqual(f.read().head,head);
  assert.equal(verifySnapshot(f.config,prefix).head,head);
});
