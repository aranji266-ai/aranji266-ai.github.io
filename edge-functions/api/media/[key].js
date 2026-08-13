import {getStore} from "@edgeone/pages-blob";
const mime=key=>key.endsWith(".png")?"image/png":key.endsWith(".webp")?"image/webp":key.endsWith(".gif")?"image/gif":key.endsWith(".mp4")?"video/mp4":key.endsWith(".webm")?"video/webm":"image/jpeg";
export async function onRequestGet({params}){const key=decodeURIComponent(params.key),blob=await getStore("davis-archive").get(key,{type:"blob"});if(!blob)return new Response("Not found",{status:404});return new Response(blob,{headers:{"content-type":blob.type||mime(key),"cache-control":"public, max-age=31536000, immutable"}})}
