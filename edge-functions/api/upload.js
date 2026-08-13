import {getStore} from "@edgeone/pages-blob";
const json=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}});
const safe=s=>s.normalize("NFKD").replace(/[^a-zA-Z0-9._-]/g,"-").replace(/-+/g,"-").slice(-90)||"file";
const ADMIN_HASH="6849b962960fc049afc7b2d02e30e032e154c400f079212f17b1b0be4d9bf574";
async function authorized(request){const raw=request.headers.get("x-admin-key")||"";const digest=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(raw));const hash=[...new Uint8Array(digest)].map(x=>x.toString(16).padStart(2,"0")).join("");return hash===ADMIN_HASH}
export async function onRequestPost({request}){
  if(!await authorized(request))return json({error:"管理密码错误"},401);
  let input;try{input=await request.json()}catch{return json({error:"上传参数不正确"},400)}
  const name=String(input.name||"file"),contentType=String(input.contentType||"").toLowerCase();
  if(!/^(image|video)\//.test(contentType))return json({error:"只支持图片或视频"},400);
  const ext=(name.match(/\.[a-zA-Z0-9]{1,8}$/)||[])[0]||({"image/jpeg":".jpg","image/png":".png","image/webp":".webp","video/mp4":".mp4","video/quicktime":".mov"}[contentType]||"");
  const key=`uploads/${Date.now()}-${crypto.randomUUID().slice(0,8)}-${safe(name.replace(/\.[^.]+$/,"")||"file")}${ext.toLowerCase()}`;
  try{const signed=await getStore("davis-archive").createUploadUrl(key,{expireSeconds:1800,contentType});return json({...signed,publicUrl:`/api/media/${encodeURIComponent(key)}`})}catch{return json({error:"上传通道暂时不可用，请重试"},503)}
}
export async function onRequestPut({request}){
  if(!await authorized(request))return json({error:"管理密码错误"},401);
  const contentType=String(request.headers.get("content-type")||"").toLowerCase();
  if(!/^(image|video)\//.test(contentType))return json({error:"只支持图片或视频"},400);
  const length=Number(request.headers.get("content-length")||0);if(length>8*1024*1024)return json({error:"文件过大，请使用大文件通道"},413);
  const ext={"image/jpeg":".jpg","image/png":".png","image/webp":".webp","image/gif":".gif","video/mp4":".mp4","video/quicktime":".mov","video/webm":".webm"}[contentType]||"";
  const key=`uploads/${Date.now()}-${crypto.randomUUID().slice(0,8)}${ext}`;
  try{const bytes=await request.arrayBuffer();if(!bytes.byteLength)return json({error:"文件内容为空"},400);if(bytes.byteLength>8*1024*1024)return json({error:"文件过大，请使用大文件通道"},413);await getStore({name:"davis-archive",consistency:"strong"}).set(key,bytes,{cacheControl:"public, max-age=31536000",contentType});return json({key,publicUrl:`/api/media/${encodeURIComponent(key)}`})}catch{return json({error:"图片保存失败，请重试"},503)}
}
