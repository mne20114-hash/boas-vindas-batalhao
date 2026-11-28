/* ===== Cena do soldado com balão, @ do Instagram e lema sobrepostos =====
   data.insta = {usuario}
   Posições, tamanhos e textos: <i data-xpos> dentro do rodapé (gravado pelo botão Salvar do editor):
   { pc:{chave:[x,y]}, cel:{...}, tam:{pc:{chave:{fs,w}}, cel:{...}}, txt:{rdt,lema} } */
(function () {
  var W = window, D = document;
  if (W.__redesOk) return; W.__redesOk = 1;
  var SB = 'https://nhghjpsnggwhdgfkpnyv.supabase.co', KEY = 'sb_publishable_SOwPUUbWLOE_FeptNt3x1Q_EQ7r6imL';
  var IMG = SB + '/storage/v1/object/public/batalhao/soldado-museu.webp';
  function h(x) { var o = { apikey: KEY, Authorization: 'Bearer ' + KEY }; for (var k in x) o[k] = x[k]; return o; }
  var IG = '<svg viewBox="0 0 24 24" width="1.3em" height="1.3em" aria-hidden="true"><defs><linearGradient id="xigg" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#feda75"/><stop offset=".35" stop-color="#fa7e1e"/><stop offset=".6" stop-color="#d62976"/><stop offset=".85" stop-color="#962fbf"/><stop offset="1" stop-color="#4f5bd5"/></linearGradient></defs><rect x="2" y="2" width="20" height="20" rx="6" fill="url(#xigg)"/><circle cx="12" cy="12" r="4.3" fill="none" stroke="#fff" stroke-width="2"/><circle cx="17.3" cy="6.7" r="1.3" fill="#fff"/></svg>';
  var BALAO = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 220 1000 680"><path d="M180 773C90 730 15 650 15 540C15 370 230 235 497 235C765 235 980 370 980 540C980 712 765 850 497 850C420 850 345 840 280 820C220 855 140 878 50 880C115 870 155 815 180 773Z" fill="#fff" stroke="#111" stroke-width="14" stroke-linejoin="round"/></svg>');

  var css = D.createElement('style');
  css.textContent =
    'section.cmd.xsold{padding-top:24px!important;padding-bottom:24px!important}' +
    '#xcena{position:relative;width:100%;max-width:1100px;margin:0 auto;container-type:inline-size;line-height:1.2}' +
    '#xcena>img{display:block;width:100%;height:auto;border-radius:10px;box-shadow:0 10px 30px rgba(0,0,0,.18)}' +
    '#xrd-t{position:absolute;left:54%;top:3%;box-sizing:border-box;width:25cqw;aspect-ratio:1000/680;padding:1.4cqw 3cqw 4.2cqw;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;' +
    'background:url("' + BALAO + '") center/100% 100% no-repeat;filter:drop-shadow(0 4px 8px rgba(0,0,0,.2));font:800 max(9px,1.7cqw)/1.15 Montserrat,sans-serif;text-transform:uppercase;color:#0c223a;margin:0}' +
    '#xrd-ig{position:absolute;left:56%;top:36%;display:inline-flex;align-items:center;gap:.5em;padding:.55em 1em;border-radius:999px;background:#fff;color:#0c223a;text-decoration:none;font:600 max(10px,1.5cqw) Montserrat,sans-serif;box-shadow:0 4px 14px rgba(0,0,0,.2);white-space:nowrap}' +
    '#xrd-lema{position:absolute;right:3%;bottom:5%;max-width:40cqw;margin:0;text-align:right;font:700 max(10px,2cqw)/1.2 Montserrat,sans-serif;font-style:italic!important;color:#0c223a;text-shadow:0 0 6px #fff,0 0 12px #fff}' +
    '#xlike{position:absolute;left:3%;bottom:5%;display:inline-flex;align-items:center;gap:.45em;padding:.5em .95em;border:0;border-radius:999px;background:#fff;color:#0c223a;font:700 max(11px,1.5cqw) Montserrat,sans-serif;box-shadow:0 4px 14px rgba(0,0,0,.22);cursor:pointer;-webkit-tap-highlight-color:transparent}' +
    '#xlike svg{width:1.35em;height:1.35em;transition:transform .2s}#xlike svg path{fill:none;stroke:#d62940;stroke-width:2.2}' +
    '#xlike.on svg path{fill:#e0245e;stroke:#e0245e}#xlike.pulo svg{animation:xpulo .45s ease}' +
    '@keyframes xpulo{0%{transform:scale(1)}35%{transform:scale(1.45)}70%{transform:scale(.9)}100%{transform:scale(1)}}' +
    '#xredes{display:none;text-align:center;padding:8px 0 20px;font-family:Montserrat,sans-serif;color:#0c223a}body.edit #xredes{display:block}' +
    '#xredes .rd-ed{max-width:520px;margin:0 auto;padding:10px;border:2px dashed #c4a468;border-radius:8px;font-size:13px;text-align:left;background:#fffaf0}' +
    '#xredes .rd-ed input{width:100%;box-sizing:border-box;padding:8px;margin:6px 0;border:1px solid #ccc;border-radius:4px;font:15px Montserrat,sans-serif}' +
    '#xredes .rd-ed button{padding:8px 14px;border:0;border-radius:4px;background:#c4a468;color:#0c223a;font-weight:700;cursor:pointer}' +
    '.xarr{z-index:6}' +
    'body.edit .xarr{cursor:move;outline:2px dashed #c4a468;outline-offset:3px;touch-action:none}' +
    'body.edit .xarr.xarrastando{outline-color:#0c223a;opacity:.85}' +
    /* a página termina na imagem: atualizações e rodapé ficam ocultos (aparecem no modo edição) */
    'body:not(.edit) #atualizacoes,body:not(.edit) footer.bumper{display:none!important}' +
    'body:not(.edit) #atualizacoes.xpin{display:block!important;padding-top:24px;padding-bottom:40px}' +
    'body:not(.edit) #atualizacoes.xpin .col>:not(#admin){display:none!important}' +
    'body:not(.edit) #xrd-lema{cursor:pointer}';
  D.head.appendChild(css);

  /* ---------- armazenamento no rodapé ---------- */
  function foot() { return D.querySelector('[data-t=rodape]'); }
  function holder() {
    var f = foot(); if (!f) return null;
    var i = f.querySelector('i[data-xpos]');
    if (!i) { i = D.createElement('i'); i.setAttribute('data-xpos', ''); i.hidden = true; i.textContent = '{}'; f.appendChild(i); }
    return i;
  }
  function ler() { var i = holder(); try { return JSON.parse((i && i.textContent) || '{}') || {}; } catch (e) { return {}; } }
  function escrever(t) { holder().textContent = JSON.stringify(t); var s = D.querySelector('#tb .st'); if (s) s.textContent = 'Alterado — clique em Salvar'; }
  function modo() { return innerWidth < 768 ? 'cel' : 'pc'; }
  function editando() { return D.body.classList.contains('edit'); }

  /* ---------- montagem ---------- */
  var cena, rdt, rdig, lema, like, box, usuario = '';
  function limpa(u) { return (u || '').trim().replace(/^https?:\/\/(www\.)?instagram\.com\//i, '').replace(/^@/, '').replace(/[\/?#].*$/, ''); }
  function montar(sec, col) {
    sec.classList.add('xsold');
    cena = D.createElement('div'); cena.id = 'xcena'; cena.setAttribute('contenteditable', 'false');
    cena.innerHTML = '<img alt="Soldado do Exército Brasileiro no museu do batalhão, fazendo sinal de positivo" src="' + IMG + '" decoding="async">' +
      '<p id="xrd-t">Nos acompanhe nas redes sociais</p>' +
      '<a id="xrd-ig" target="_blank" rel="noopener">' + IG + '<span></span></a>' +
      '<p id="xrd-lema">Tropa forte que cumpre as missões</p>' +
      '<button type="button" id="xlike" aria-pressed="false" aria-label="Curtir"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.3-9.2C1.4 8 3.4 4.5 7 4.5c2 0 3.6 1.2 5 3 1.4-1.8 3-3 5-3 3.6 0 5.6 3.5 4.3 6.8-1.8 4.6-9.3 9.2-9.3 9.2z"/></svg><span>Curtir</span></button>';
    sec.appendChild(cena);
    rdt = D.getElementById('xrd-t'); rdig = D.getElementById('xrd-ig'); lema = D.getElementById('xrd-lema'); like = D.getElementById('xlike'); curtidas();
    box = D.createElement('div'); box.id = 'xredes'; box.setAttribute('contenteditable', 'false');
    box.innerHTML = '<div class="rd-ed"><b>Instagram do batalhão</b><input type="text" placeholder="@usuario"><button type="button">Salvar @</button> <small>A página recarrega ao salvar.</small></div>';
    box.querySelector('button').onclick = function (e) {
      e.preventDefault(); var u = limpa(box.querySelector('input').value); this.textContent = 'Salvando…';
      fetch(SB + '/rest/v1/batalhao_config?id=eq.2&select=data', { headers: h() }).then(function (r) { return r.json(); }).then(function (j) {
        var data = j[0].data; data.insta = { usuario: u };
        return fetch(SB + '/rest/v1/batalhao_config?id=eq.2', { method: 'PATCH', headers: h({ 'Content-Type': 'application/json', Prefer: 'return=minimal' }), body: JSON.stringify({ data: data, updated_at: new Date().toISOString() }) });
      }).then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); location.reload(); }).catch(function (er) { alert('Não foi possível salvar: ' + er.message); });
    };
    col.insertBefore(box, col.firstChild);
    painel();
  }
  function desenharIg() {
    if (!rdig) return; var u = limpa(usuario);
    if (u) { rdig.href = 'https://www.instagram.com/' + encodeURIComponent(u) + '/'; rdig.querySelector('span').textContent = '@' + u; rdig.style.display = ''; }
    else { rdig.removeAttribute('href'); rdig.querySelector('span').textContent = '@ do Instagram'; rdig.style.display = editando() ? '' : 'none'; }
    var inp = box.querySelector('input'); if (D.activeElement !== inp) inp.value = u ? '@' + u : '';
  }

  /* ---------- posições, tamanhos e textos ---------- */
  var ALVOS = { cena: function () { return cena; }, rdt: function () { return rdt; }, rdig: function () { return rdig; }, lema: function () { return lema; }, like: function () { return like; } };
  var TAM = { cena: { nome: 'Imagem', fs: false }, rdt: { nome: 'Balão', fs: true }, rdig: { nome: '@ Instagram', fs: true, semW: true }, lema: { nome: 'Tropa forte…', fs: true }, like: { nome: 'Curtir', fs: true, semW: true } };
  var TEXTOS = { rdt: function () { return rdt; }, lema: function () { return lema; } };
  function aplicar() {
    if (!cena) return;
    var t = ler(), p = t[modo()] || {}, tm = (t.tam || {})[modo()] || {};
    for (var k in ALVOS) {
      var el = ALVOS[k](); el.classList.add('xarr'); el.dataset.arr = k;
      var v = p[k] || [0, 0];
      if (k === 'cena') { el.style.translate = v[0] + 'px 0px'; el.style.marginTop = v[1] + 'px'; } /* subir/descer a imagem também move o fim da página */
      else el.style.translate = v[0] + 'px ' + v[1] + 'px';
      var o = tm[k] || {};
      el.style.fontSize = o.fs ? o.fs + 'px' : '';
      el.style.width = o.w ? o.w + 'px' : '';
      if (k === 'lema' || k === 'cena') el.style.maxWidth = o.w ? 'none' : '';
    }
    mostraTam();
  }
  function textos() {
    var t = ler().txt || {};
    for (var k in TEXTOS) {
      var el = TEXTOS[k](); if (!el) continue;
      if (t[k] != null && !el.__lido) el.innerHTML = t[k];
      el.__lido = 1;
      el.setAttribute('contenteditable', editando() ? 'true' : 'false');
      if (!el.__ouve) { el.__ouve = 1; el.addEventListener('input', (function (kk, ee) { return function () { var a = ler(); a.txt = a.txt || {}; a.txt[kk] = ee.innerHTML; escrever(a); }; })(k, el)); }
    }
  }
  function gravarPos(k, v) { var t = ler(), m = modo(); t[m] = t[m] || {}; if (v) t[m][k] = v; else delete t[m][k]; escrever(t); }
  function mudaTam(k, campo, passo) {
    var el = ALVOS[k](); if (!el) return;
    var t = ler(), m = modo(); t.tam = t.tam || {}; t.tam[m] = t.tam[m] || {}; var o = t.tam[m][k] = t.tam[m][k] || {};
    if (campo === 'fs') o.fs = Math.max(8, Math.min(90, Math.round(parseFloat(getComputedStyle(el).fontSize)) + passo));
    else o.w = Math.max(60, Math.min(2000, Math.round(el.getBoundingClientRect().width) + passo));
    escrever(t); aplicar();
  }
  function mostraTam() {
    for (var k in TAM) { var el = ALVOS[k](), sp = D.getElementById('xtam-' + k); if (el && sp) sp.textContent = (TAM[k].fs ? Math.round(parseFloat(getComputedStyle(el).fontSize)) + 'px · ' : '') + Math.round(el.getBoundingClientRect().width) + 'px'; }
  }
  function painel() {
    var d = D.createElement('div'); d.style.cssText = 'max-width:620px;margin:12px auto 0;padding:10px;border:2px dashed #c4a468;border-radius:8px;background:#fffaf0;font:12px Montserrat,sans-serif;color:#0c223a';
    d.innerHTML = '<b>Imagem e textos</b><br>Arraste a imagem, o balão, o @, a frase e o botão Curtir para onde quiser. Clique num texto para editar. Depois clique em Salvar. Computador e celular são ajustados separadamente.';
    var g = D.createElement('div'); g.style.cssText = 'margin-top:8px;display:grid;gap:6px;justify-content:center';
    for (var k in TAM) (function (k) {
      var r = D.createElement('div'); r.style.cssText = 'display:flex;flex-wrap:wrap;align-items:center;gap:4px;justify-content:center';
      function b(t, fn) { var x = D.createElement('button'); x.type = 'button'; x.textContent = t; x.style.cssText = 'min-width:30px;padding:4px 8px;border:1px solid #c4a468;border-radius:4px;background:#fff;cursor:pointer;font:600 12px Montserrat,sans-serif'; x.onmousedown = function (e) { e.preventDefault(); }; x.onclick = function (e) { e.preventDefault(); e.stopPropagation(); fn(); }; r.appendChild(x); }
      var n = D.createElement('b'); n.textContent = TAM[k].nome + ':'; r.appendChild(n);
      if (TAM[k].fs) { r.appendChild(D.createTextNode(' fonte')); b('A−', function () { mudaTam(k, 'fs', -1); }); b('A+', function () { mudaTam(k, 'fs', 1); }); }
      if (!TAM[k].semW) { r.appendChild(D.createTextNode(' tamanho')); b('−', function () { mudaTam(k, 'w', -20); }); b('+', function () { mudaTam(k, 'w', 20); }); }
      var sp = D.createElement('span'); sp.id = 'xtam-' + k; sp.style.cssText = 'color:#8a6d2f;margin-left:4px'; r.appendChild(sp);
      g.appendChild(r);
    })(k);
    d.appendChild(g);
    var rz = D.createElement('button'); rz.type = 'button'; rz.textContent = '↺ Voltar tudo ao padrão (neste aparelho)';
    rz.style.cssText = 'display:block;margin:8px auto 0;padding:6px 12px;border:1px solid #c4a468;border-radius:4px;background:#fff;color:#8a6d2f;cursor:pointer;font:12px Montserrat,sans-serif';
    rz.onclick = function (e) { e.preventDefault(); e.stopPropagation(); var t = ler(), m = modo(); delete t[m]; if (t.tam) delete t.tam[m]; escrever(t); aplicar(); };
    d.appendChild(rz); box.appendChild(d);
  }

  /* ---------- curtidas (1 por aparelho) ---------- */
  function aparelho() { var id; try { id = localStorage.getItem('x35dev'); if (!id) { id = Math.random().toString(36).slice(2) + Date.now().toString(36); localStorage.setItem('x35dev', id); } } catch (e) { id = id || ('s' + Math.random().toString(36).slice(2, 12)); } return id.slice(0, 40); }
  var euCurti = false, totalCurt = 0;
  function mostraLike() {
    if (!like) return;
    like.classList.toggle('on', euCurti); like.setAttribute('aria-pressed', euCurti ? 'true' : 'false');
    like.querySelector('span').textContent = totalCurt ? totalCurt.toLocaleString('pt-BR') + (totalCurt === 1 ? ' curtida' : ' curtidas') : 'Curtir';
    like.setAttribute('aria-label', (euCurti ? 'Descurtir' : 'Curtir') + ' (' + totalCurt + ')');
  }
  function curtidas() {
    mostraLike();
    fetch(SB + '/rest/v1/rpc/batalhao_curtidas_info', { method: 'POST', headers: h({ 'Content-Type': 'application/json' }), body: JSON.stringify({ p_aparelho: aparelho() }) })
      .then(function (r) { return r.json(); }).then(function (v) { totalCurt = +v.total || 0; euCurti = !!v.eu; mostraLike(); }).catch(function () { });
    like.addEventListener('click', function (e) {
      if (editando()) return; e.preventDefault();
      euCurti = !euCurti; totalCurt = Math.max(0, totalCurt + (euCurti ? 1 : -1)); mostraLike();
      if (euCurti) { like.classList.remove('pulo'); void like.offsetWidth; like.classList.add('pulo'); }
      fetch(SB + '/rest/v1/rpc/batalhao_curtir', { method: 'POST', headers: h({ 'Content-Type': 'application/json' }), body: JSON.stringify({ p_aparelho: aparelho(), p_curtir: euCurti }) })
        .then(function (r) { return r.json(); }).then(function (n) { if (typeof n === 'number') { totalCurt = n; mostraLike(); } }).catch(function () { });
    });
  }

  /* ---------- arrastar ---------- */
  var drag = null;
  D.addEventListener('pointerdown', function (e) {
    if (!editando()) return;
    var el = e.target.closest && e.target.closest('.xarr'); if (!el) return;
    if (!el.isContentEditable) e.preventDefault();
    e.stopPropagation();
    var v = (el.style.translate || '0px 0px').split(' ').map(parseFloat);
    if (el === cena) { v[1] = parseFloat(el.style.marginTop) || 0; el.style.marginTop = '0px'; el.style.translate = (v[0] || 0) + 'px ' + v[1] + 'px'; }
    drag = { el: el, x0: e.clientX, y0: e.clientY, bx: v[0] || 0, by: v[1] || 0, moveu: false, id: e.pointerId };
  }, true);
  D.addEventListener('pointermove', function (e) {
    if (!drag) return;
    var dx = e.clientX - drag.x0, dy = e.clientY - drag.y0;
    if (!drag.moveu) {
      if (Math.abs(dx) + Math.abs(dy) < 6) return;
      drag.moveu = true; drag.el.classList.add('xarrastando');
      try { getSelection().removeAllRanges(); drag.el.blur(); drag.el.setPointerCapture(drag.id); } catch (er) { }
    }
    e.preventDefault();
    drag.el.style.translate = Math.round(drag.bx + dx) + 'px ' + Math.round(drag.by + dy) + 'px';
  }, true);
  function soltar() {
    if (!drag) return; var el = drag.el; el.classList.remove('xarrastando');
    if (drag.moveu) { var v = el.style.translate.split(' ').map(parseFloat); gravarPos(el.dataset.arr, [v[0] || 0, v[1] || 0]); }
    drag = null; if (el === cena) aplicar();
  }
  D.addEventListener('pointerup', soltar, true); D.addEventListener('pointercancel', soltar, true);
  /* clique na frase (fora do modo edição) mostra o campo da senha do administrador */
  D.addEventListener('click', function (e) {
    if (editando() || !e.target.closest || !e.target.closest('#xrd-lema')) return;
    var u = D.getElementById('atualizacoes'); if (!u) return;
    var abrir = !u.classList.contains('xpin'); u.classList.toggle('xpin', abrir);
    if (abrir) { u.scrollIntoView({ behavior: 'smooth', block: 'center' }); var p = D.getElementById('pin'); if (p) setTimeout(function () { p.focus(); }, 400); }
  });
  D.addEventListener('click', function (e) { if (editando() && e.target.closest && e.target.closest('.xarr')) { if (!e.target.closest('.xarr').isContentEditable) e.preventDefault(); e.stopPropagation(); } }, true);

  /* ---------- início ---------- */
  function iniciar() {
    var sec = D.querySelector('section.cmd'), col = D.querySelector('section.upd .col');
    if (!sec || !col) return setTimeout(iniciar, 300);
    if (D.getElementById('xcena')) return;
    montar(sec, col); textos(); aplicar(); desenharIg();
    fetch(SB + '/rest/v1/batalhao_config?id=eq.2&select=i:data->insta', { headers: h() }).then(function (r) { return r.json(); })
      .then(function (j) { usuario = (j && j[0] && j[0].i && j[0].i.usuario) || ''; desenharIg(); }).catch(function () { });
    new MutationObserver(function () { textos(); desenharIg(); mostraTam(); }).observe(D.body, { attributes: true, attributeFilter: ['class'] });
    cena.querySelector('img').addEventListener('load', mostraTam);
  }
  iniciar();
  var tr; addEventListener('resize', function () { clearTimeout(tr); tr = setTimeout(aplicar, 200); });
  var re = W.__xre; W.__xre = function () { if (re) re.apply(this, arguments); setTimeout(aplicar, 50); };
})();

/* ===== Contador de visualizações (tabela batalhao_visitas) ===== */
(function () {
  var W = window, D = document;
  if (W.__visOk) return; W.__visOk = 1;
  var SB = 'https://nhghjpsnggwhdgfkpnyv.supabase.co', KEY = 'sb_publishable_SOwPUUbWLOE_FeptNt3x1Q_EQ7r6imL';
  var H = { apikey: KEY, Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' };
  function ls(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function ss(k, v) { try { if (v === undefined) return sessionStorage.getItem(k); sessionStorage.setItem(k, v); } catch (e) { return null; } }
  /* registra 1 visualização por visita (aba aberta); não conta o administrador */
  function registrar() {
    if (ss('x35vis') || ls('x35adm') || D.body.classList.contains('edit')) return;
    ss('x35vis', '1');
    var id = ls('x35dev'); if (!id) { id = Math.random().toString(36).slice(2) + Date.now().toString(36); ls('x35dev', id); }
    fetch(SB + '/rest/v1/batalhao_visitas', { method: 'POST', headers: Object.assign({ Prefer: 'return=minimal' }, H), body: JSON.stringify({ aparelho: id.slice(0, 40), celular: innerWidth < 768 }), keepalive: true }).catch(function () { });
  }
  setTimeout(registrar, 1500);
  /* no modo edição: marca este aparelho como administrador e mostra o painel */
  var painel;
  function mostrar() {
    if (!D.body.classList.contains('edit')) { if (painel) painel.style.display = 'none'; return; }
    ls('x35adm', '1');
    var box = D.getElementById('xredes'); if (!box) return;
    if (!painel) {
      painel = D.createElement('div'); painel.setAttribute('contenteditable', 'false');
      painel.style.cssText = 'max-width:620px;margin:0 auto 12px;padding:12px;border:2px solid #0c223a;border-radius:8px;background:#fff;font:13px Montserrat,sans-serif;color:#0c223a;text-align:center';
      box.insertBefore(painel, box.firstChild);
    }
    painel.style.display = ''; painel.textContent = 'Carregando visualizações…';
    Promise.all([fetch(SB + '/rest/v1/rpc/batalhao_visitas_resumo', { method: 'POST', headers: H, body: '{}' }).then(function (r) { return r.json(); }), fetch(SB + '/rest/v1/rpc/batalhao_curtidas_info', { method: 'POST', headers: H, body: '{"p_aparelho":"admin-x"}' }).then(function (r) { return r.json(); }).catch(function () { return {}; })]).then(function (rs) { var v = rs[0]; v.curt = rs[1].total; v.curtHoje = rs[1].hoje;
      function n(x) { return Number(x || 0).toLocaleString('pt-BR'); }
      var desde = v.desde ? new Date(v.desde).toLocaleDateString('pt-BR') : 'hoje';
      painel.innerHTML = '<b style="font-size:15px">📊 Visualizações do site</b>' +
        '<div style="display:flex;flex-wrap:wrap;justify-content:center;gap:10px;margin-top:8px">' +
        [['Total', v.total], ['Hoje', v.hoje], ['Últimos 7 dias', v.semana], ['Pessoas (aparelhos)', v.aparelhos], ['Pessoas pelo celular', v.pessoas_celular], ['Pessoas pelo computador', v.pessoas_computador], ['❤ Curtidas', v.curt], ['❤ Curtidas hoje', v.curtHoje]].map(function (c) {
          return '<div style="min-width:96px;padding:8px;border-radius:6px;background:#f4f6f8"><div style="font-size:20px;font-weight:800">' + n(c[1]) + '</div><div style="font-size:11px;color:#555">' + c[0] + '</div></div>';
        }).join('') + '</div><div style="margin-top:6px;font-size:11px;color:#777">Contando desde ' + desde + '. Cada visita conta 1 vez; as suas como administrador não entram.</div>';
    }).catch(function () { painel.textContent = 'Não foi possível carregar as visualizações.'; });
  }
  new MutationObserver(mostrar).observe(D.body, { attributes: true, attributeFilter: ['class'] });
})();
