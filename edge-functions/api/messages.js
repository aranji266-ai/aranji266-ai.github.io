import {getStore} from "@edgeone/pages-blob";

const store=()=>getStore({name:"davis-messages",consistency:"strong"});
const json=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}});

export async function onRequestGet(){
  const s=store();
  const {blobs=[]}=await s.list({prefix:"messages/",consistency:"strong"});
  const selected=blobs.sort((a,b)=>b.key.localeCompare(a.key)).slice(0,80);
  const rows=(await Promise.all(selected.map(x=>s.get(x.key,{type:"json",consistency:"strong"})))).filter(Boolean);
  return json(rows.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt)));
}

export async function onRequestPost({request}){
  let input;
  try{ input=await request.json(); }catch{ return json({error:"留言格式不正确"},400); }
  const name=String(input.name||"").trim().replace(/\s+/g," ");
  const message=String(input.message||"").trim();
  if(!name||name.length>20) return json({error:"昵称需为 1–20 个字符"},400);
  if(!message||message.length>300) return json({error:"留言需为 1–300 个字符"},400);
  const ip=request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()||"unknown";
  const fingerprint=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(ip));
  const rateId=[...new Uint8Array(fingerprint)].slice(0,12).map(x=>x.toString(16).padStart(2,"0")).join("");
  const s=store();
  const rate=await s.get(`rate/${rateId}.json`,{type:"json",consistency:"strong"});
  if(rate&&Date.now()-Number(rate.time)<15000) return json({error:"发送太快，请稍后再试"},429);
  const createdAt=new Date().toISOString();
  const id=`${Date.now()}-${crypto.randomUUID().slice(0,8)}`;
  const row={id,name,message,createdAt};
  await s.setJSON(`messages/${id}.json`,row,{onlyIfNew:true});
  await s.setJSON(`rate/${rateId}.json`,{time:Date.now()});
  return json(row,201);
}