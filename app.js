/* Efeitos de rolagem V2 — reversíveis: animam descendo e subindo */
(function(){
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
/* grade: cada foto anima separada */
document.querySelectorAll('.grid.rv').forEach(g=>{g.classList.remove('rv');[...g.children].forEach(c=>c.classList.add('rv'))});
const fx=(sel,v)=>document.querySelectorAll(sel).forEach(e=>e.dataset.fx=v);
fx('.fig.rv,.av.rv,.grid .g.rv','zoom');
fx('blockquote.rv,.card.rv,.pq.rv,.split .txt .rv','left');
const rv=[...document.querySelectorAll('.rv')];
/* atraso em cascata entre irmãos */
const cnt=new Map();
rv.forEach(e=>{const p=e.parentElement,i=cnt.get(p)||0;cnt.set(p,i+1);e.style.setProperty('--d',Math.min(i,6)*90+'ms')});
const bar=document.createElement('div');bar.id='prog';document.body.appendChild(bar);
const cover=document.querySelector('.cover'),cbg=cover&&cover.querySelector('.bg'),head=cover&&cover.querySelector('.head'),hint=cover&&cover.querySelector('.hint');
if(cbg)cbg.addEventListener('animationend',()=>{cbg.style.animation='none';frame()});
const pars=[...document.querySelectorAll('[data-par]')];
const pageTop=el=>{let y=0;while(el){y+=el.offsetTop;el=el.offsetParent}return y};
let tick=false;
function frame(){
  tick=false;
  const y=scrollY,vh=innerHeight,edit=document.body.classList.contains('edit');
  /* leituras */
  const st=rv.map(e=>{const t=pageTop(e),h=e.offsetHeight;return t+h<=y+vh*.06?'above':(t<y+vh*.9?'in':'below')});
  const rects=pars.map(e=>e.parentElement.getBoundingClientRect());
  const max=document.documentElement.scrollHeight-vh;
  /* escritas */
  rv.forEach((e,i)=>{e.classList.toggle('in',st[i]==='in');e.classList.toggle('above',st[i]==='above')});
  bar.style.transform=`scaleX(${max>0?clamp(y/max,0,1):0})`;
  if(reduce||edit)return;
  if(cover&&y<vh*1.3){
    const p=clamp(y/vh,0,1);
    cbg.style.transform=`translate3d(0,${y*.35}px,0) scale(${1+p*.12})`;
    head.style.transform=`translate3d(0,${-y*.3}px,0)`;
    head.style.opacity=clamp(1-p*1.5,0,1);
    if(hint)hint.style.opacity=clamp(1-p*4,0,1);
  }
  pars.forEach((el,i)=>{
    const r=rects[i];if(r.bottom<-200||r.top>vh+200)return;
    const enter=clamp((vh-r.top)/(vh*.85),0,1),leave=clamp(r.bottom/(vh*.5),0,1);
    const off=(r.top+r.height/2-vh/2)*parseFloat(el.dataset.par);
    el.style.transform=`translate3d(0,${off}px,0) scale(${1+(1-enter)*.18})`;
    const par=el.parentElement;
    if(par.classList.contains('full')){
      const k=1-enter;
      par.style.clipPath=`inset(${k*8}% ${k*10}% 0 ${k*10}%)`;
      par.style.opacity=.35+.65*Math.min(enter,leave*1.5,1);
    }
  });
}
const req=()=>{if(!tick){tick=true;requestAnimationFrame(frame)}};
addEventListener('scroll',req,{passive:true});
addEventListener('resize',req);addEventListener('load',req);
frame();
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
