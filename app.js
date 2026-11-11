/* Efeitos de rolagem no padrão do original: fundos fixos, surgimento suave (ida e volta) */
(function(){
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const rv=[...document.querySelectorAll('.rv')];
if('IntersectionObserver' in window&&!reduce){
  const io=new IntersectionObserver(es=>es.forEach(e=>e.target.classList.toggle('in',e.isIntersecting)),{rootMargin:'0px 0px -8% 0px',threshold:.01});
  rv.forEach(e=>io.observe(e));
}else rv.forEach(e=>e.classList.add('in'));
const cover=document.querySelector('.cover'),head=cover&&cover.querySelector('.head');
const card=document.querySelector('.cardsec'),cbg=card&&card.querySelector('.bg');
let tick=false;
function frame(){
  tick=false;
  if(reduce||document.body.classList.contains('edit'))return;
  const y=scrollY,vh=innerHeight;
  if(head&&y<vh*1.2){const p=clamp(y/vh,0,1);head.style.transform=`translate3d(0,${-y*.25}px,0)`;head.style.opacity=clamp(1-p*1.6,0,1)}
  if(cbg){const r=card.getBoundingClientRect();if(r.bottom>0&&r.top<vh){const p=clamp((vh-r.top)/(r.height+vh),0,1);cbg.style.transform=`scale(${1+p*.2})`}}
}
const req=()=>{if(!tick){tick=true;requestAnimationFrame(frame)}};
addEventListener('scroll',req,{passive:true});addEventListener('resize',req);frame();
/* ampliar foto ao clicar (fora do modo edição) */
const lb=document.getElementById('lb');
if(lb){
  document.addEventListener('click',e=>{
    if(document.body.classList.contains('edit'))return;
    if(!lb.hidden){lb.hidden=true;return}
    const t=e.target.closest('.fig img,.g');if(!t)return;
    const us=t.tagName==='IMG'?[t.currentSrc||t.src]:[...getComputedStyle(t).backgroundImage.matchAll(/url\(["']?(.*?)["']?\)/g)].map(m=>m[1]);
    if(us.length){const im=lb.firstElementChild;im.onerror=()=>{if(us.length>1){us.shift();im.src=us[0]}};im.src=us[0];lb.hidden=false}
  });
  addEventListener('keydown',e=>{if(e.key==='Escape')lb.hidden=true});
}
})();

/* Atualizações (Supabase, ou modo demonstração) */
const C=window.CONFIG||{};
const live=!!(C.SUPABASE_URL&&C.SUPABASE_ANON_KEY&&window.supabase);
const sb=live?supabase.createClient(C.SUPABASE_URL,C.SUPABASE_ANON_KEY):null;
const $=id=>document.getElementById(id);
const fmt=d=>new Date(d).toLocaleDateString('pt-BR');
const KEY='atualizacoes_demo';

async function carregar(){
  let itens=[];
  if(live){
    const {data,error}=await sb.from('batalhao_atualizacoes').select('*').order('created_at',{ascending:false});
    if(!error)itens=data||[];
  }else{
    try{itens=JSON.parse(localStorage.getItem(KEY)||'[]')}catch(e){}
  }
  $('lista').innerHTML=itens.length?itens.map(i=>
    `<li><span><a href="${i.arquivo_url||'#'}" target="_blank" rel="noopener">${esc(i.titulo)}</a><br><small>${esc(i.nome_arquivo||'')}</small></span><small>${fmt(i.created_at)}</small></li>`
  ).join(''):'<li><span>Nenhuma atualização ainda.</span></li>';
  if(!live)$('msg').textContent='Modo demonstração: envios ficam só neste navegador. Configure o Supabase em config.js.';
}
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

$('entrar').onclick=()=>{
  if($('pin').value===C.PIN_ADMIN){$('pinBox').hidden=true;$('envio').hidden=false;$('msg').textContent='';window.enableEdit&&window.enableEdit()}
  else $('msg').textContent='PIN incorreto.';
};
$('enviar').onclick=async()=>{
  const titulo=$('titulo').value.trim(),f=$('arquivo').files[0];
  if(!titulo||!f){$('msg').textContent='Informe o título e escolha um arquivo.';return}
  $('msg').textContent='Enviando…';
  try{
    if(live){
      const path=Date.now()+'-'+f.name.replace(/[^\w.\-]/g,'_');
      const up=await sb.storage.from(C.BUCKET).upload(path,f);
      if(up.error)throw up.error;
      const url=sb.storage.from(C.BUCKET).getPublicUrl(path).data.publicUrl;
      const ins=await sb.from('batalhao_atualizacoes').insert({titulo,nome_arquivo:f.name,arquivo_url:url});
      if(ins.error)throw ins.error;
    }else{
      if(f.size>1.5*1024*1024)throw new Error('Na demonstração o limite é 1,5 MB.');
      const url=await new Promise(r=>{const fr=new FileReader();fr.onload=()=>r(fr.result);fr.readAsDataURL(f)});
      const l=JSON.parse(localStorage.getItem(KEY)||'[]');
      l.unshift({titulo,nome_arquivo:f.name,arquivo_url:url,created_at:new Date().toISOString()});
      localStorage.setItem(KEY,JSON.stringify(l));
    }
    $('titulo').value='';$('arquivo').value='';$('msg').textContent='Atualização enviada!';
    carregar();
  }catch(e){$('msg').textContent='Erro: '+(e.message||e)}
};
carregar();
