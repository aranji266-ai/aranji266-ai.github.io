import {getStore} from "@edgeone/pages-blob";
const store=()=>getStore({name:"davis-archive",consistency:"strong"});
const json=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}});
const ADMIN_HASH="6849b962960fc049afc7b2d02e30e032e154c400f079212f17b1b0be4d9bf574";
async function authorized(request){const raw=request.headers.get("x-admin-key")||"";const digest=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(raw));const hash=[...new Uint8Array(digest)].map(x=>x.toString(16).padStart(2,"0")).join("");return hash===ADMIN_HASH}
export async function onRequestGet(){const saved=await store().get("content/site.json",{type:"json",consistency:"strong"});return json(saved||null)}
export async function onRequestPost({request}){if(!await authorized(request))return json({error:"管理密码错误"},401);const data=await request.json();if(!data||!Array.isArray(data.works)||!Array.isArray(data.subjects)||!data.layout)return json({error:"内容格式不正确"},400);await store().setJSON("content/site.json",data);return json({ok:true})}
