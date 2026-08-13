const $ = (s, p=document) => p.querySelector(s);
const safe = (v='') => String(v).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));

async function getData(path, fallback){ try { const r = await fetch(path); return r.ok ? await r.json() : fallback; } catch { return fallback; } }

function setImage(el, path, options = {}){
  if(!path) return;
  const probe = new Image();
  probe.onload = () => {
    el.style.backgroundImage = `url("${path}")`;
    if(options.position) el.style.backgroundPosition = options.position;
    if(options.fit) el.style.backgroundSize = options.fit;
    const f=$('.image-fallback',el); if(f) f.remove();
  };
  probe.src = path;
}

function renderTarget(t){
  const timeline = (t.timeline||[]).map(x=>`<li><time>${safe(x.date)}</time><span>${safe(x.event)}</span></li>`).join('');
  const face=t.face||{x:50,y:40,width:36};
  return `<article class="target-card"><div class="target-visual" data-image="${safe(t.image)}" style="--face-x:${Number(face.x)||50};--face-y:${Number(face.y)||40};--face-w:${Number(face.width)||36}"><div class="target-placeholder"><span>NO VISUAL FEED</span></div><div class="yolo-box"><span>person ${safe(t.match||'TRACKED')}</span><i></i><b></b><em></em><u></u></div><div class="target-hud"><div><span>${safe(t.id)}</span><span>DETECTION // LIVE</span></div><div><span>OBJECT LOCKED</span><span class="match">CONF ${safe(t.match)}</span></div></div></div><div class="target-info"><span class="target-status">${safe(t.status)}</span><h3>${safe(t.name)}</h3><p class="eyebrow">${safe(t.role)}</p>${timeline?`<ol class="timeline">${timeline}</ol>`:''}</div></article>`;
}

function renderWork(w, i){
  return `<article class="work-card archive-file" tabindex="0" data-index="${i}"><div class="file-tab">${safe(w.id)} / SEALED</div><div class="work-art" ${w.image?`style="background-image:url('${safe(w.image)}');background-size:cover;background-position:center"`:''}><span class="archive-stamp">ARCHIVED<br>ACCESS LOGGED</span></div><div class="file-index"><span>${safe(w.id)}</span><span>CLASSIFIED</span></div><h3>${safe(w.title)}</h3><span class="work-type">${safe(w.type)} / ${safe(w.author)}</span></article>`;
}

async function boot(){
  const subjects=await getData('/data/subjects.json',[]);
  const works=await getData('/data/works.json',[]);
  const layout=await getData('/data/layout.json',{});
  document.body.dataset.worksMode=layout.worksMode||'rail';
  document.body.dataset.cardRatio=layout.cardRatio||'portrait';
  document.body.dataset.accent=layout.accent||'violet';
  document.body.dataset.heroMode=layout.heroMode||'split';
  if(layout.intro) $('.lede').textContent=layout.intro;
  const headline=String(layout.headline||'DAVIS\nPRIVATE NODE').split('\n');
  $('#heroHeadline').innerHTML=`${safe(headline[0]||'DAVIS')}<br><i>${safe(headline.slice(1).join(' ')||'PRIVATE NODE')}</i>`;
  const davis=subjects.find(x=>x.id==='OPERATOR_00');
  if(davis){
    const hero=$('#heroImage');
    hero.style.setProperty('--hero-overlay',String((layout.heroOverlay??35)/100));
    setImage(hero,davis.image,{position:`${layout.heroX??50}% ${layout.heroY??50}%`,fit:layout.heroFit||'cover'});
    setImage($('#profileImage'),davis.profileImage);
  }
  $('#targetGrid').innerHTML=subjects.filter(x=>x.id.startsWith('TARGET_')).map(renderTarget).join('');
  document.querySelectorAll('.target-visual[data-image]').forEach(el=>setImage(el,el.dataset.image));
  $('#workTrack').innerHTML=works.map(renderWork).join('');
  const openViewer=i=>{const w=works[i];const media=w.mediaType==='video'&&w.image?`<div class="viewer-art"><video controls playsinline src="${safe(w.image)}"></video></div>`:`<div class="viewer-art" ${w.image?`style="background-image:url('${safe(w.image)}');background-size:contain;background-repeat:no-repeat;background-position:center"`:''}><span>${safe(w.id)} / SEALED FILE</span></div>`;$('#viewerBody').innerHTML=`<div class="viewer-inner">${media}<div class="viewer-copy"><span class="eyebrow">${safe(w.id)} / CLASSIFIED / ${safe(w.type)}</span><h2>${safe(w.title)}</h2><span class="work-type">ARCHIVED BY: ${safe(w.author)}</span></div></div>`;$('#viewer').showModal()};
  document.querySelectorAll('.work-card').forEach(c=>{c.onclick=()=>openViewer(+c.dataset.index);c.onkeydown=e=>{if(e.key==='Enter')openViewer(+c.dataset.index)}});
}

$('.close').onclick=()=>$('#viewer').close();
boot();
