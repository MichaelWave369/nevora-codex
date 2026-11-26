import {createPublicKey,createHash,sign,verify} from "node:crypto";
import {verifySnapshot} from "./local-ledger.mjs";
const plain=x=>x!==null&&typeof x==="object"&&Object.getPrototypeOf(x)===Object.prototype;
const exact=(x,keys)=>plain(x)&&Object.keys(x).length===keys.length&&keys.every(k=>Object.hasOwn(x,k));
const id=x=>typeof x==="string"&&/^[A-Za-z0-9_-]{1,40}$/.test(x);
const qty=x=>Number.isSafeInteger(x)&&x>=0&&x<=1000000;
const time=x=>Number.isSafeInteger(x)&&x>=0;
const hash=x=>typeof x==="string"&&/^[a-f0-9]{64}$/.test(x);
function canonical(x){
  if(x===null||typeof x==="string"||typeof x==="boolean"||Number.isSafeInteger(x))return JSON.stringify(x);
  if(Array.isArray(x))return "["+x.map(canonical).join(",")+"]";
  if(plain(x))return "{"+Object.keys(x).sort().map(k=>JSON.stringify(k)+":"+canonical(x[k])).join(",")+"}";
  throw Error("noncanonical value");
}
const digest=x=>createHash("sha256").update(canonical(x)).digest("hex");
const roles=["steward","reviewer"];
function registry(config){
  if(!exact(config,["federationId","communities"])||!id(config.federationId)||!plain(config.communities))throw Error("invalid federation config");
  const communities=new Map(),keys=new Set(),ledgers=new Set(),normalized=[];
  for(const [community,c] of Object.entries(config.communities).sort(([a],[b])=>a<b?-1:a>b?1:0)){
    if(!id(community)||!exact(c,["keys","resources"])||!exact(c.keys,roles)||!plain(c.resources))throw Error("invalid community");
    const members=new Map(),resources=new Map(),keyRecords=[];
    for(const role of roles){
      if(typeof c.keys[role]!=="string")throw Error("invalid key");
      const key=createPublicKey(c.keys[role]);
      if(key.asymmetricKeyType!=="ed25519")throw Error("Ed25519 required");
      const der=key.export({type:"spki",format:"der"}).toString("base64");
      if(keys.has(der))throw Error("shared federation key");
      keys.add(der);members.set(role,key);keyRecords.push({role,key:der});
    }
    for(const [resource,r] of Object.entries(c.resources).sort(([a],[b])=>a<b?-1:a>b?1:0)){
      if(!id(resource)||!exact(r,["unit","ledgerId","policyHash"])||!id(r.unit)||!id(r.ledgerId)||!hash(r.policyHash)||ledgers.has(r.ledgerId))throw Error("invalid or duplicate ledger mapping");
      ledgers.add(r.ledgerId);resources.set(resource,r);
    }
    communities.set(community,{members,resources});
    normalized.push({community,keys:keyRecords,resources:Object.fromEntries(resources)});
  }
  if(communities.size<2||communities.size>100)throw Error("invalid community count");
  return {communities,federationId:config.federationId,policyHash:digest({federationId:config.federationId,communities:normalized})};
}
function termsFor(policy,terms){
  if(!exact(terms,["id","from","to","resource","unit","units","sourceHead","destinationHead","issuedAt","expiresAt"])||!id(terms.id)||!id(terms.from)||!id(terms.to)||terms.from===terms.to||!id(terms.resource)||!id(terms.unit)||!qty(terms.units)||terms.units===0||!hash(terms.sourceHead)||!hash(terms.destinationHead)||!time(terms.issuedAt)||!time(terms.expiresAt)||terms.expiresAt<=terms.issuedAt)throw Error("invalid agreement terms");
  const source=policy.communities.get(terms.from)?.resources.get(terms.resource),destination=policy.communities.get(terms.to)?.resources.get(terms.resource);
  if(!source||!destination||source.unit!==terms.unit||destination.unit!==terms.unit)throw Error("resource/unit mapping mismatch");
  return {source,destination};
}
const payload=(policy,terms,community,role)=>({domain:"nevora-federation-agreement-v1",federationId:policy.federationId,policyHash:policy.policyHash,community,role,terms});
export function signAgreement(config,terms,community,role,privateKey){
  const p=registry(config);termsFor(p,terms);
  if(![terms.from,terms.to].includes(community)||!roles.includes(role))throw Error("invalid signer");
  return {community,role,signature:sign(null,Buffer.from(canonical(payload(p,terms,community,role))),privateKey).toString("hex")};
}
export function verifyAgreement(config,agreement,now){
  const p=registry(config);
  if(!exact(agreement,["terms","signatures"])||!time(now)||!Array.isArray(agreement.signatures)||agreement.signatures.length!==4)throw Error("four authorizations required");
  const terms=agreement.terms;const mapping=termsFor(p,terms);
  if(now<terms.issuedAt||now>=terms.expiresAt)throw Error("agreement outside validity window");
  const seen=new Set();
  for(const s of agreement.signatures){
    if(!exact(s,["community","role","signature"])||![terms.from,terms.to].includes(s.community)||!roles.includes(s.role)||typeof s.signature!=="string"||!/^[a-f0-9]{128}$/.test(s.signature))throw Error("invalid authorization");
    const label=s.community+":"+s.role;
    if(seen.has(label))throw Error("duplicate authorization");
    seen.add(label);
    if(!verify(null,Buffer.from(canonical(payload(p,terms,s.community,s.role))),p.communities.get(s.community).members.get(s.role),Buffer.from(s.signature,"hex")))throw Error("invalid agreement signature");
  }
  return {agreementHash:digest({policyHash:p.policyHash,terms}),terms,...mapping};
}
function inventory(mapping,input,head){
  if(!exact(input,["config","snapshot","checkpoint"])||!input.checkpoint||input.config?.ledgerId!==mapping.ledgerId||input.snapshot?.policyHash!==mapping.policyHash)throw Error("inventory mapping or checkpoint missing");
  const r=verifySnapshot(input.config,input.snapshot,input.checkpoint);
  if(!r.state.started||r.head!==head)throw Error("inventory head changed; renegotiate");
  if(r.state.paused)throw Error("inventory paused");
  return r;
}
// An agreement authorizes negotiation only. Local proposal and approval remain separate.
export function prepareTransfer(config,agreement,now,sourceInput,destinationInput,{eventId,actor}){
  const {terms,source,destination,agreementHash}=verifyAgreement(config,agreement,now);
  const a=inventory(source,sourceInput,terms.sourceHead);
  inventory(destination,destinationInput,terms.destinationHead);
  if(a.state.allocatable<terms.units)throw Error("insufficient stock above reserve");
  if(a.state.proposals.some(p=>p.id===terms.id))throw Error("agreement already proposed");
  if(!id(eventId)||!id(actor))throw Error("invalid event identifiers");
  return {status:"proposal-only",agreementHash,sourceLedgerId:source.ledgerId,destinationLedgerId:destination.ledgerId,previous:a.head,event:{id:eventId,actor,type:"propose",expectedVersion:a.state.version,proposal:terms.id,units:terms.units}};
}
