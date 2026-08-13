import {getStore} from "@edgeone/pages-blob";
const json=(body,status=200)=>new Response(JSON.stringify(body),{status,headers:{"content-type":"application/json; charset=utf-8","cache-control":"no-store"}});
const ADMIN_HASH="6849b962960fc049afc7b2d02e30e032e154c400f079212f17b1b0be4d9bf574";
const store=()=>getStore({name:"davis-archive",consistency:"strong"});
async function authorized(request){const raw=request.headers.get("x-admin-key")||"";const digest=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(raw));const hash=[...new Uint8Array(digest)].map(x=>x.toString(16).padStart(2,"0")).join("");return hash===ADMIN_HASH}
const validType=type=>/^(image|video)\//.test(type||"");
const validId=id=>/^[a-zA-Z0-9-]+$/.test(id||"");

export async function onRequestPost({request}){
  if(!await authorized(request))return json({error:"管理密码错误"},401);
  let input;try{input=await request.json()}catch{return json({error:"上传参数不正确"},400)}
  const mode=String(input.mode||""),contentType=String(input.contentType||"").toLowerCase();
  if(!validType(contentType))return json({error:"无法识别文件格式，请选择 JPG、PNG、WEBP、MP4、MOV 或 WEBM"},400);
  if(mode==="start"){
    const size=Number(input.size||0);if(!size||size>100*1024*1024)return json({error:"文件需小于 100MB"},413);
    const uploadId=`${Date.now()}-${crypto.randomUUID().replaceAll("-","")}`;return json({uploadId,publicUrl:`/api/media/${encodeURIComponent(`multipart/${uploadId}.manifest.json`)}`});
  }
  if(mode==="complete"){
    const uploadId=String(input.uploadId||""),parts=Number(input.parts||0),size=Number(input.size||0);if(!validId(uploadId)||!parts||parts>30)return json({error:"分片参数不正确"},400);
    const manifest={contentType,size,parts,name:String(input.name||"file"),createdAt:new Date().toISOString()};await store().setJSON(`multipart/${uploadId}.manifest.json`,manifest,{cacheControl:"public, max-age=31536000"});return json({publicUrl:`/api/media/${encodeURIComponent(`multipart/${uploadId}.manifest.json`)}`});
  }
  return json({error:"未知上传操作"},400);
}

export async function onRequestPut({request}){
  if(!await authorized(request))return json({error:"管理密码错误"},401);
  const url=new URL(request.url),uploadId=url.searchParams.get("uploadId"),part=url.searchParams.get("part");
  if(uploadId||part!==null){
    if(!validId(uploadId)||!/^[0-9]{1,2}$/.test(part||""))return json({error:"分片参数不正确"},400);
    const bytes=await request.arrayBuffer();if(!bytes.byteLength||bytes.byteLength>4*1024*1024)return json({error:"分片大小不正确"},413);
    await store().set(`multipart/${uploadId}/part-${String(part).padStart(3,"0")}`,bytes,{cacheControl:"public, max-age=31536000"});return json({ok:true});
  }
  const contentType=String(request.headers.get("content-type")||"").toLowerCase();if(!validType(contentType))return json({error:"无法识别文件格式"},400);const bytes=await request.arrayBuffer();if(!bytes.byteLength)return json({error:"文件内容为空"},400);if(bytes.byteLength>4*1024*1024)return json({error:"文件过大，请使用分片上传"},413);const ext={"image/jpeg":".jpg","image/png":".png","image/webp":".webp","image/gif":".gif","video/mp4":".mp4","video/quicktime":".mov","video/webm":".webm"}[contentType]||"";const key=`uploads/${Date.now()}-${crypto.randomUUID().slice(0,8)}${ext}`;await store().set(key,bytes,{cacheControl:"public, max-age=31536000",contentType});return json({key,publicUrl:`/api/media/${encodeURIComponent(key)}`});
}
