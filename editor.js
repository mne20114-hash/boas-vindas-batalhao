/* Editor na própria página: textos, imagens e cores. Salva no Supabase (ou no navegador, em demonstração). */
(function(){
const C=window.CONFIG||{};
const live=!!(C.SUPABASE_URL&&C.SUPABASE_ANON_KEY&&window.supabase);
const sb=live?supabase.createClient(C.SUPABASE_URL,C.SUPABASE_ANON_KEY):null;
const LS='site_config_demo';
let state={texts:{},imgs:{},vars:{}};

/* ids estáveis por ordem no documento */
const textEls=[...document.querySelectorAll('h1,h2,h3,p:not(.lock):not(.msg),blockquote,.cap,.pq,.bumper,.head p')]
  .filter((e,i,a)=>a.indexOf(e)===i && !e.closest('#admin,#tb,#lista'));
textEls.forEach((e,i)=>e.dataset.t='t'+i);
const imgEls=[...document.querySelectorAll('.bg,.im,.fixbg,.g,.av,.fig img')].filter(e=>!e.closest('#tb'));
imgEls.forEach((e,i)=>e.dataset.img='i'+i);

const getBg=e=>e.tagName==='IMG'?e.src:(e.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/)||[])[1];
const setImg=(e,u)=>{e.tagName==='IMG'?e.src=u:e.style.backgroundImage=`url("${u}")`};
const vars=['--navy','--gold','--cover','--ink'];

function apply(s){
  Object.entries(s.texts||{}).forEach(([k,v])=>{const e=document.querySelector(`[data-t="${k}"]`);if(e)e.innerHTML=v});
  Object.entries(s.imgs||{}).forEach(([k,v])=>{const e=document.querySelector(`[data-img="${k}"]`);if(e)setImg(e,v)});
  Object.entries(s.vars||{}).forEach(([k,v])=>document.documentElement.style.setProperty(k,v));
}
async function load(){
  try{
    if(live){const {data}=await sb.from('batalhao_config').select('data').eq('id',1).maybeSingle();if(data)state=Object.assign(state,data.data)}
    else state=Object.assign(state,JSON.parse(localStorage.getItem(LS)||'{}'));
  }catch(e){}
  apply(state);
}
async function save(){
  /* coleta textos atuais */
  textEls.forEach(e=>{state.texts[e.dataset.t]=e.innerHTML});
  if(live){
    const r=await sb.from('batalhao_config').upsert({id:1,data:state,updated_at:new Date().toISOString()});
    if(r.error)throw r.error;
  }else localStorage.setItem(LS,JSON.stringify(state));
}
/* reduz a imagem antes de guardar */
function shrink(file,max=1920){return new Promise((res,rej)=>{
  const img=new Image(),u=URL.createObjectURL(file);
  img.onload=()=>{const k=Math.min(1,max/Math.max(img.width,img.height));const c=document.createElement('canvas');c.width=img.width*k;c.height=img.height*k;c.getContext('2d').drawImage(img,0,0,c.width,c.height);c.toBlob(b=>res(b),'image/jpeg',.82)};
  img.onerror=rej;img.src=u})}
async function sendImg(file){
  const blob=await shrink(file);
  if(live){
    const p='img-'+Date.now()+'.jpg';
    const up=await sb.storage.from(C.BUCKET).upload(p,blob,{contentType:'image/jpeg'});
    if(up.error)throw up.error;
    return sb.storage.from(C.BUCKET).getPublicUrl(p).data.publicUrl;
  }
  return new Promise(r=>{const fr=new FileReader();fr.onload=()=>r(fr.result);fr.readAsDataURL(blob)});
}

/* barra de ferramentas */
function toolbar(){
  const tb=document.createElement('div');tb.id='tb';
  const cs={'--navy':'Títulos','--gold':'Destaque','--cover':'Rodapé/capa','--ink':'Texto'};
  tb.innerHTML='<span>✏️ Modo edição: clique no texto ou na imagem</span>'+
    vars.map(v=>`<label>${cs[v]}<input type="color" data-v="${v}" value="${rgb(getComputedStyle(document.documentElement).getPropertyValue(v))}"></label>`).join('')+
    '<label>Fonte<select id="fnt"><option value="Montserrat">Montserrat</option><option value="Georgia">Georgia</option><option value="Arial">Arial</option><option value="Times New Roman">Times</option></select></label>'+
    '<button id="sv">Salvar</button><button class="sec" id="rs">Restaurar</button><button class="sec" id="sair">Sair</button><span class="st" id="st"></span>';
  document.body.prepend(tb);
  tb.querySelectorAll('[data-v]').forEach(i=>i.oninput=()=>{document.documentElement.style.setProperty(i.dataset.v,i.value);state.vars[i.dataset.v]=i.value});
  $('fnt').onchange=e=>{document.body.style.fontFamily=e.target.value+',sans-serif';state.vars.font=e.target.value;document.querySelectorAll('h1,h2,h3,p,blockquote,.pq').forEach(x=>x.style.fontFamily=e.target.value+',sans-serif')};
  $('sv').onclick=async()=>{st('Salvando…');try{await save();st('Salvo ✔')}catch(e){st('Erro: '+(e.message||e))}};
  $('rs').onclick=()=>{if(confirm('Voltar ao padrão original?')){if(live)sb.from('batalhao_config').delete().eq('id',1).then(()=>location.reload());else{localStorage.removeItem(LS);location.reload()}}};
  $('sair').onclick=()=>location.reload();
}
const $=id=>document.getElementById(id);
const st=t=>{$('st').textContent=t};
function rgb(c){c=c.trim();if(c[0]==='#')return c.length===4?'#'+[...c.slice(1)].map(x=>x+x).join(''):c;return '#000000'}

window.enableEdit=function(){
  if(document.body.classList.contains('edit'))return;
  document.body.classList.add('edit');
  toolbar();
  textEls.forEach(e=>e.contentEditable='true');
  /* texto: colar sem formatação */
  document.addEventListener('paste',e=>{if(e.target.isContentEditable){e.preventDefault();document.execCommand('insertText',false,(e.clipboardData||window.clipboardData).getData('text'))}});
  /* imagem: clique para trocar */
  document.addEventListener('click',e=>{
    if(e.target.isContentEditable)return;
    const el=e.target.closest('[data-img]');if(!el||e.target.closest('#tb'))return;
    e.preventDefault();
    const f=document.createElement('input');f.type='file';f.accept='image/*';
    f.onchange=async()=>{if(!f.files[0])return;st('Enviando imagem…');try{const u=await sendImg(f.files[0]);setImg(el,u);state.imgs[el.dataset.img]=u;st('Imagem trocada — clique em Salvar')}catch(err){st('Erro: '+(err.message||err))}};
    f.click();
  },true);
  /* aplica fonte salva no seletor */
  if(state.vars&&state.vars.font)$('fnt').value=state.vars.font;
  scrollTo({top:0});
};
if(state.vars&&state.vars.font){}
const _apply=apply;
load().then(()=>{if(state.vars.font){document.body.style.fontFamily=state.vars.font+',sans-serif';document.querySelectorAll('h1,h2,h3,p,blockquote,.pq').forEach(x=>x.style.fontFamily=state.vars.font+',sans-serif')}});
})();
