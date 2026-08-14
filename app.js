const $=(s,p=document)=>p.querySelector(s);
const safe=(v='')=>String(v).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));

function assetUrl(path){
  if(!path||!location.search.includes('eo_token=')) return path;
  const url=new URL(path,location.origin);for(const [k,v] of new URLSearchParams(location.search))url.searchParams.set(k,v);return url.toString();
}
async function getJSON(path,fallback){try{const r=await fetch(assetUrl(path),{cache:'no-store'});return r.ok?await r.json():fallback}catch{return fallback}}
const messageTime=value=>new Intl.DateTimeFormat('zh-CN',{year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',hour12:false}).format(new Date(value));
const isHistory=w=>w.archiveGroup==='historical'||w.type==='历史档案';
const archiveKind=w=>w.archiveMediaType||(w.mediaType==='video'?'video':(w.content||[]).length?'scans':'image');
const videoUrl=w=>w.media||(w.mediaType==='video'?w.image:'');
const defaultSections=[
  {id:'current',title:'本次作品档案',eyebrow:'CURRENT CREATION FILES'},
  {id:'historical',title:'历史档案',eyebrow:'RECOVERED LEGACY MATERIAL'},
  {id:'images',title:'图片档案',eyebrow:'IMAGE ARCHIVE'},
  {id:'photos',title:'照片档案',eyebrow:'PHOTO ARCHIVE'},
  {id:'videos',title:'视频档案',eyebrow:'VIDEO ARCHIVE'},
  {id:'art',title:'绘画档案',eyebrow:'ART ARCHIVE'}
];

async function loadMessages(){
  const list=$('#messageList');
  try{const r=await fetch(assetUrl('/api/messages'),{cache:'no-store'});if(!r.ok)throw new Error();const messages=await r.json();list.innerHTML=messages.length?messages.map(m=>`<article class="message-item"><div><strong>${safe(m.name)}</strong><time datetime="${safe(m.createdAt)}">${safe(messageTime(m.createdAt))}</time></div><p>${safe(m.message)}</p></article>`).join(''):'<p class="message-empty">还没有留言，成为第一个留下讯号的人。</p>'}catch{list.innerHTML='<p class="message-empty">留言频道暂时无法连接。</p>'}
}
function initMessages(){
  const form=$('#messageForm'),status=$('#messageStatus');
  form.addEventListener('submit',async e=>{e.preventDefault();const button=form.querySelector('button');button.disabled=true;status.textContent='发送中…';try{const body={name:$('#messageName').value.trim(),message:$('#messageText').value.trim()};const r=await fetch(assetUrl('/api/messages'),{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify(body)});const result=await r.json().catch(()=>({}));if(!r.ok)throw new Error(result.error||'发送失败');form.reset();status.textContent='留言已同步';await loadMessages()}catch(err){status.textContent=err.message||'发送失败，请稍后重试'}finally{button.disabled=false}});
  loadMessages();setInterval(loadMessages,30000);
}
function setImage(el,path,options={}){if(!path)return;const probe=new Image();probe.onload=()=>{el.style.backgroundImage=`url("${assetUrl(path)}")`;if(options.position)el.style.backgroundPosition=options.position;if(options.fit)el.style.backgroundSize=options.fit;$('.image-fallback',el)?.remove()};probe.src=assetUrl(path)}
function renderTarget(t){const timeline=(t.timeline||[]).map(x=>`<li><time>${safe(x.date)}</time><span>${safe(x.event)}</span></li>`).join('');const face=t.face||{x:50,y:40,width:36};return `<article class="target-card"><div class="target-visual" data-image="${safe(t.image)}" style="--face-x:${Number(face.x)||50};--face-y:${Number(face.y)||40};--face-w:${Number(face.width)||36}"><div class="target-placeholder"><span>NO VISUAL FEED</span></div><div class="yolo-box"><span>person ${safe(t.match||'TRACKED')}</span><i></i><b></b><em></em><u></u></div><div class="target-hud"><div><span>${safe(t.id)}</span><span>DETECTION // LIVE</span></div><div><span>OBJECT LOCKED</span><span class="match">CONF ${safe(t.match)}</span></div></div></div><div class="target-info"><span class="target-status">${safe(t.status)}</span><h3>${safe(t.name)}</h3><p class="eyebrow">${safe(t.role)}</p>${timeline?`<ol class="timeline">${timeline}</ol>`:''}</div></article>`}
function renderWork(w,i){const history=isHistory(w),kind=archiveKind(w),cover=kind==='video'?w.cover:(w.content||[])[0]||w.image,count=kind==='scans'?`${(w.content||[]).length} SCANS`:kind.toUpperCase();return `<article class="work-card archive-file${history?' historical-archive':''}${kind==='video'?' video-file':''}" tabindex="0" data-index="${i}"><div class="file-tab">${safe(w.id)} / ${safe(history?w.status||'DECRYPTED':'SEALED')}</div><div class="work-art" ${cover?`style="background-image:url('${safe(assetUrl(cover))}');background-size:cover;background-position:center"`:''}><span class="archive-stamp">${history?'DECRYPTED<br>DATA RECOVERED':'ARCHIVED<br>ACCESS LOGGED'}</span>${kind==='video'?'<span class="video-play" aria-hidden="true">▶</span>':''}</div><div class="file-index"><span>${safe(w.id)}</span><span>${safe(count)}</span></div><h3>${safe(w.title)}</h3><span class="work-type">${safe(w.type)} / ${safe(w.author)}</span></article>`}
function openViewer(w){
  const historical=isHistory(w),kind=archiveKind(w),pages=(w.content||[]).filter(Boolean);let media='';
  if(kind==='video'){const src=assetUrl(videoUrl(w)),poster=assetUrl(w.cover);media=src?`<div class="history-single"><video controls playsinline preload="metadata" ${poster?`poster="${safe(poster)}"`:''} src="${safe(src)}"></video></div>`:'<div class="history-single empty-media">VIDEO NOT UPLOADED</div>'}
  else if(kind==='image'){const src=assetUrl(w.image||pages[0]);media=src?`<div class="history-single"><img src="${safe(src)}" alt="${safe(w.title)}"></div>`:'<div class="history-single empty-media">IMAGE NOT UPLOADED</div>'}
  else{media=pages.length?`<div class="scan-pages">${pages.map((src,i)=>`<figure><span>SCAN ${String(i+1).padStart(2,'0')} / ${String(pages.length).padStart(2,'0')}</span><img src="${safe(assetUrl(src))}" alt="${safe(w.title)} 第 ${i+1} 页" loading="${i?'lazy':'eager'}"></figure>`).join('')}</div>`:'<div class="history-single empty-media">SCANS NOT UPLOADED</div>'}
  $('#viewerBody').innerHTML=`<div class="viewer-inner history-viewer${historical?' historical-viewer':''}"><header class="history-meta"><span class="eyebrow">${safe(w.id)} / ${safe(historical?w.status||'DECRYPTED':'SEALED')} / ${safe(kind.toUpperCase())}</span><h2>${safe(w.title)}</h2><span class="work-type">${safe(w.type)} / ${safe(w.author)}</span></header>${media}</div>`;
  $('#viewer').showModal();
}
async function boot(){
  const [staticSubjects,staticWorks,staticLayout,cloud]=await Promise.all([getJSON('/data/subjects.json',[]),getJSON('/data/works.json',[]),getJSON('/data/layout.json',{}),getJSON('/api/content',null)]);
  const subjects=cloud?.subjects||staticSubjects,layout=cloud?.layout||staticLayout,sections=cloud?.sections?.length?cloud.sections:defaultSections;
  const works=cloud?.works?[...cloud.works]:[...staticWorks];for(const item of staticWorks.filter(isHistory)){if(!works.some(w=>w.id===item.id))works.push(item)}
  document.body.dataset.worksMode=layout.worksMode||'rail';document.body.dataset.cardRatio=layout.cardRatio||'portrait';document.body.dataset.accent=layout.accent||'violet';document.body.dataset.heroMode=layout.heroMode||'split';
  if(layout.intro)$('.lede').textContent=layout.intro;const headline=String(layout.headline||'DAVIS\nPRIVATE NODE').split('\n');$('#heroHeadline').innerHTML=`${safe(headline[0]||'DAVIS')}<br><i>${safe(headline.slice(1).join(' ')||'PRIVATE NODE')}</i>`;
  const davis=subjects.find(x=>x.id==='OPERATOR_00');if(davis){const hero=$('#heroImage');hero.style.setProperty('--hero-overlay',String((layout.heroOverlay??35)/100));setImage(hero,davis.image,{position:`${layout.heroX??50}% ${layout.heroY??50}%`,fit:layout.heroFit||'cover'});setImage($('#profileImage'),davis.profileImage)}
  $('#targetGrid').innerHTML=subjects.filter(x=>x.id.startsWith('TARGET_')).map(renderTarget).join('');document.querySelectorAll('.target-visual[data-image]').forEach(el=>setImage(el,el.dataset.image));
  const sectionWorks=sections.map(s=>({section:s,items:works.filter(w=>(w.sectionId||(isHistory(w)?'historical':'current'))===s.id)}));
  $('#works').innerHTML=sectionWorks.map(({section,items},si)=>`<section class="works archive-section${section.id==='historical'?' history-section':''}" id="archive-${safe(section.id)}"><div class="section-head"><div><p class="eyebrow">${safe(section.eyebrow||'CLASSIFIED ARCHIVE')}</p><h2>${safe(section.title)}</h2></div><span>${items.length} FILES / SWIPE →</span></div><div class="work-track">${items.length?items.map(renderWork).join(''):'<p class="empty-archive">NO FILES ARCHIVED</p>'}</div></section>`).join('');
  document.querySelectorAll('.archive-section').forEach((lane,si)=>lane.querySelectorAll('.work-card').forEach(c=>{const open=()=>openViewer(sectionWorks[si].items[+c.dataset.index]);c.onclick=open;c.onkeydown=e=>{if(e.key==='Enter')open()}}));
}
$('.close').onclick=()=>$('#viewer').close();boot();initMessages();
