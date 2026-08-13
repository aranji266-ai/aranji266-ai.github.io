const json=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}});
const ADMIN_HASH="6849b962960fc049afc7b2d02e30e032e154c400f079212f17b1b0be4d9bf574";
async function authorized(request){const raw=request.headers.get("x-admin-key")||"";const digest=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(raw));const hash=[...new Uint8Array(digest)].map(x=>x.toString(16).padStart(2,"0")).join("");return hash===ADMIN_HASH}
export async function onRequestPost({request}){return await authorized(request)?json({ok:true}):json({error:"管理密码错误"},401)}
