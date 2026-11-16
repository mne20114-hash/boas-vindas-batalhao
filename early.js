/* Aplica o conteúdo embutido (window.__CFG) assim que o HTML é lido, antes de qualquer script externo. */
(function(){var s=window.__CFG;if(!s)return;var D=document,k,e,v;
function q(a,k){try{return D.querySelector('['+a+'="'+k+'"]')}catch(x){return null}}
for(k in (s.texts||{})){e=q('data-t',k);v=s.texts[k];if(e){e.innerHTML=v;e.__v=v}}
for(k in (s.imgs||{})){e=q('data-img',k);if(e){if(e.tagName==='IMG')e.src=s.imgs[k];else e.style.backgroundImage='url("'+s.imgs[k]+'")'}}
for(k in (s.imgpos||{})){e=q('data-img',k);v=s.imgpos[k];if(e&&e.tagName!=='IMG'&&v){e.style.backgroundSize=v.s===100?'cover':v.s+'%';e.style.backgroundPosition=v.x+'% '+v.y+'%'}}
for(k in (s.vars||{}))D.documentElement.style.setProperty(k,s.vars[k]);
/* mesma mudança de ordem que o carregador do rodapé faz (seção do batalhão em primeiro), feita já aqui para os blocos do editor avançado caírem no lugar certo */
if(/__mv/.test((s.texts||{}).rodape||'')&&!window.__mv){window.__mv=1;try{var S=q('data-t','t42').closest('section'),W=S.previousElementSibling,F=q('data-t','t2').closest('section');F.parentNode.insertBefore(W,F);F.parentNode.insertBefore(S,F)}catch(x){}}
})();
