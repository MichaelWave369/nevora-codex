import {createHash,createPublicKey,sign,verify,randomUUID} from "node:crypto";
import {closeSync,fsyncSync,openSync,readFileSync,renameSync,unlinkSync,writeFileSync} from "node:fs";
import {dirname,resolve} from "node:path";
import {replayLedger} from "./ledger.mjs";

const zero="0".repeat(64);
const validId=x=>typeof x==="string"&&/^[A-Za-z0-9_-]{1,40}$/.test(x);
const hex=x=>typeof x==="string"&&/^[a-f0-9]{64}$/.test(x);
const plain=x=>x!==null&&typeof x==="object"&&Object.getPrototypeOf(x)===Object.prototype;
const exact=(x,keys)=>plain(x)&&Object.keys(x).length===keys.length&&keys.every(k=>Object.hasOwn(x,k));
const roles={
  custodian:["open","receive","loss","deliver","pause","resume"],
  planner:["propose"],
  reviewer:["approve","cancel"],
  participant:["appeal"],
  arbiter:["resolve"]
};
function canonical(x){
  if(x===null||typeof x==="string"||typeof x==="boolean"||Number.isSafeInteger(x))return JSON.stringify(x);
  if(Array.isArray(x))return "["+x.map(canonical).join(",")+"]";
  if(plain(x))return "{"+Object.keys(x).sort().map(k=>JSON.stringify(k)+":"+canonical(x[k])).join(",")+"}";
  throw Error("noncanonical value");
}
const digest=x=>createHash("sha256").update(canonical(x)).digest("hex");
function policyFor(config){
  if(!exact(config,["ledgerId","actors"])||!validId(config.ledgerId)||!plain(config.actors)||!Object.keys(config.actors).length)throw Error("invalid config");
  const entries=Object.entries(config.actors).sort(([a],[b])=>a<b?-1:a>b?1:0);
  const keys=new Set(),actors=new Map(),serialized=[];
  for(const [id,entry] of entries){
    if(!validId(id)||!exact(entry,["role","publicKey"])||!Object.hasOwn(roles,entry.role)||typeof entry.publicKey!=="string")throw Error("invalid actor");
    const key=createPublicKey(entry.publicKey);
    if(key.asymmetricKeyType!=="ed25519")throw Error("Ed25519 required");
    const fingerprint=key.export({type:"spki",format:"der"}).toString("base64");
    if(keys.has(fingerprint))throw Error("shared actor key");
    keys.add(fingerprint);actors.set(id,{key,role:entry.role});serialized.push({id,role:entry.role,key:fingerprint});
  }
  return {ledgerId:config.ledgerId,actors,policyHash:digest({ledgerId:config.ledgerId,actors:serialized})};
}
const message=(policy,previous,event)=>({domain:"nevora-compassion-local-ledger-v1",ledgerId:policy.ledgerId,policyHash:policy.policyHash,previous,event});
export function signEvent(config,previous,event,privateKey){
  const policy=policyFor(config);
  if(!hex(previous)||!plain(event))throw Error("invalid event envelope");
  const signature=sign(null,Buffer.from(canonical(message(policy,previous,event))),privateKey).toString("hex");
  return {previous,event,signature};
}
export function verifySnapshot(config,snapshot,checkpoint){
  const policy=policyFor(config);
  if(!exact(snapshot,["format","ledgerId","policyHash","entries"])||snapshot.format!==1||snapshot.ledgerId!==policy.ledgerId||snapshot.policyHash!==policy.policyHash||!Array.isArray(snapshot.entries)||snapshot.entries.length>10000)throw Error("invalid snapshot or policy");
  let head=zero;
  const events=[],ids=new Set();
  for(const entry of snapshot.entries){
    if(!exact(entry,["previous","event","signature"])||entry.previous!==head||!plain(entry.event)||!validId(entry.event.id)||ids.has(entry.event.id)||typeof entry.signature!=="string"||!/^[a-f0-9]{128}$/.test(entry.signature))throw Error("invalid chain or duplicate");
    const actor=policy.actors.get(entry.event.actor);
    if(!actor||!roles[actor.role].includes(entry.event.type))throw Error("unauthorized actor role");
    if(!verify(null,Buffer.from(canonical(message(policy,head,entry.event))),actor.key,Buffer.from(entry.signature,"hex")))throw Error("invalid signature");
    events.push(entry.event);ids.add(entry.event.id);head=digest(entry);
  }
  const state=replayLedger(events);
  if(checkpoint!==undefined){
    if(!exact(checkpoint,["ledgerId","policyHash","version","head"])||checkpoint.ledgerId!==policy.ledgerId||checkpoint.policyHash!==policy.policyHash||!Number.isSafeInteger(checkpoint.version)||checkpoint.version<0||!hex(checkpoint.head))throw Error("invalid trusted checkpoint");
    if(checkpoint.version>state.version)throw Error("checkpoint rollback detected");
    const anchored=checkpoint.version===0?zero:digest(snapshot.entries[checkpoint.version-1]);
    if(anchored!==checkpoint.head)throw Error("checkpoint fork detected");
  }
  return {head,state};
}
export function makeCheckpoint(config,snapshot,previousCheckpoint){
  const {head,state}=verifySnapshot(config,snapshot,previousCheckpoint);
  return {ledgerId:snapshot.ledgerId,policyHash:snapshot.policyHash,version:state.version,head};
}
export function emptySnapshot(config){
  const p=policyFor(config);
  return {format:1,ledgerId:p.ledgerId,policyHash:p.policyHash,entries:[]};
}
export function loadLedger(file,config,checkpoint){
  let raw;
  try{raw=readFileSync(file,"utf8");}catch(e){if(e.code!=="ENOENT")throw e;throw Error("ledger missing; explicit initialization required");}
  const snapshot=JSON.parse(raw);
  return {snapshot,...verifySnapshot(config,snapshot,checkpoint)};
}
function syncDirectory(path){
  const fd=openSync(path,"r");
  try{fsyncSync(fd);}finally{closeSync(fd);}
}
function locked(file,fn){
  const lock=file+".lock";
  let fd;
  try{fd=openSync(lock,"wx",0o600);}catch(e){if(e.code==="EEXIST")throw Error("ledger locked; inspect before operator recovery");throw e;}
  try{return fn();}finally{closeSync(fd);unlinkSync(lock);syncDirectory(dirname(file));}
}
function replace(file,snapshot){
  const tmp=file+".tmp-"+randomUUID();
  let fd;
  try{
    fd=openSync(tmp,"wx",0o600);
    writeFileSync(fd,JSON.stringify(snapshot)+"\n","utf8");
    fsyncSync(fd);closeSync(fd);fd=undefined;
    renameSync(tmp,file);syncDirectory(dirname(file));
  }finally{
    if(fd!==undefined)closeSync(fd);
    try{unlinkSync(tmp);}catch(e){if(e.code!=="ENOENT")throw e;}
  }
}
export function initializeLedger(path,config){
  const file=resolve(path);
  return locked(file,()=>{
    try{readFileSync(file);throw Error("ledger already exists");}catch(e){if(e.code!=="ENOENT")throw e;}
    const snapshot=emptySnapshot(config);
    replace(file,snapshot);return verifySnapshot(config,snapshot);
  });
}
export function appendEvent(path,config,entry,checkpoint){
  const file=resolve(path);
  return locked(file,()=>{
    const {snapshot,head,state}=loadLedger(file,config,checkpoint);
    if(!plain(entry)||!plain(entry.event))throw Error("invalid envelope");
    const existing=snapshot.entries.find(x=>x.event.id===entry.event.id);
    if(existing){
      if(canonical(existing)!==canonical(entry))throw Error("conflicting event ID");
      return {head,state,duplicate:true};
    }
    if(entry.previous!==head)throw Error("stale chain head");
    const next={...snapshot,entries:[...snapshot.entries,entry]};
    const result=verifySnapshot(config,next,checkpoint);
    replace(file,next);
    return {...result,duplicate:false};
  });
}
