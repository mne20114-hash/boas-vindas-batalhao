/* ===== "Nos siga nas redes sociais" + Instagram (data.insta = {usuario}) ===== */
(function () {
  var W = window, D = document;
  if (W.__redesOk) return; W.__redesOk = 1;
  var SB = 'https://nhghjpsnggwhdgfkpnyv.supabase.co', KEY = 'sb_publishable_SOwPUUbWLOE_FeptNt3x1Q_EQ7r6imL';
  function h(x) { var o = { apikey: KEY, Authorization: 'Bearer ' + KEY }; for (var k in x) o[k] = x[k]; return o; }
  var IG = '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><defs><linearGradient id="xigg" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="#feda75"/><stop offset=".35" stop-color="#fa7e1e"/><stop offset=".6" stop-color="#d62976"/><stop offset=".85" stop-color="#962fbf"/><stop offset="1" stop-color="#4f5bd5"/></linearGradient></defs><rect x="2" y="2" width="20" height="20" rx="6" fill="url(#xigg)"/><circle cx="12" cy="12" r="4.3" fill="none" stroke="#fff" stroke-width="2"/><circle cx="17.3" cy="6.7" r="1.3" fill="#fff"/></svg>';
  var css = D.createElement('style');
  css.textContent =
    '#xredes{text-align:center;padding:8px 0 28px;font-family:Montserrat,sans-serif;color:#0c223a}' +
    '#xredes .rd-lema{max-width:900px;margin:16px auto 0;text-align:right;font-size:17px;font-weight:700;font-style:italic!important;color:#0c223a;box-sizing:border-box}' +
    '#xredes a.rd-ig{display:inline-flex;align-items:center;gap:8px;padding:9px 16px;border:1px solid #e1e4e8;border-radius:999px;color:#0c223a;text-decoration:none;font-size:16px;font-weight:600;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.06)}' +
    '#xredes a.rd-ig:hover{border-color:#d62976}' +
    '#xredes .rd-t{box-sizing:border-box;width:250px;aspect-ratio:1000/680;margin:0 auto 14px;padding:16px 34px 48px;overflow:hidden;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;' +
    'background:url("data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%20220%201000%20680%22%3E%3Cpath%20d%3D%22M180%20773C90%20730%2015%20650%2015%20540C15%20370%20230%20235%20497%20235C765%20235%20980%20370%20980%20540C980%20712%20765%20850%20497%20850C420%20850%20345%20840%20280%20820C220%20855%20140%20878%2050%20880C115%20870%20155%20815%20180%20773Z%22%20fill%3D%22%23fff%22%20stroke%3D%22%23111%22%20stroke-width%3D%2214%22%20stroke-linejoin%3D%22round%22%2F%3E%3C%2Fsvg%3E") center/100% 100% no-repeat;filter:drop-shadow(0 4px 8px rgba(0,0,0,.15));' +
    'font:800 17px/1.15 Montserrat,sans-serif;font-style:normal;text-transform:uppercase;letter-spacing:.2px;color:#0c223a}' +
    '@media(max-width:767px){#xredes .rd-t{width:210px;font-size:14px;padding:13px 28px 40px}}' +
    '#xredes .rd-ed{display:none;max-width:420px;margin:12px auto 0;padding:10px;border:2px dashed #c4a468;border-radius:8px;font-size:13px;text-align:left}' +
    'body.edit #xredes .rd-ed{display:block}' +
    '#xredes .rd-ed input{width:100%;box-sizing:border-box;padding:8px;margin:6px 0;border:1px solid #ccc;border-radius:4px;font:15px Montserrat,sans-serif}' +
    '#xredes .rd-ed button{padding:8px 14px;border:0;border-radius:4px;background:#c4a468;color:#0c223a;font-weight:700;cursor:pointer}';
  D.head.appendChild(css);
  var box;
  function limpa(u) { return (u || '').trim().replace(/^https?:\/\/(www\.)?instagram\.com\//i, '').replace(/^@/, '').replace(/[\/?#].*$/, ''); }
  function desenhar(u) {
    u = limpa(u);
    var a = box.querySelector('.rd-ig');
    if (u) { a.href = 'https://www.instagram.com/' + encodeURIComponent(u) + '/'; a.querySelector('span').textContent = '@' + u; a.style.display = ''; }
    else { a.removeAttribute('href'); a.querySelector('span').textContent = '@ do Instagram do batalhão'; a.style.display = D.body.classList.contains('edit') ? '' : 'none'; }
    box.querySelector('.rd-ed input').value = u ? '@' + u : '';
    box.style.display = u || D.body.classList.contains('edit') ? '' : 'none';
  }
  function montar(col) {
    box = D.createElement('div'); box.id = 'xredes'; box.setAttribute('contenteditable', 'false');
    box.innerHTML = '<p class="rd-t">Nos acompanhe nas redes sociais</p>' +
      '<a class="rd-ig" target="_blank" rel="noopener">' + IG + '<span></span></a>' +
      '<p class="rd-lema">Tropa forte que cumpre as missões</p>' +
      '<div class="rd-ed"><b>Instagram do batalhão</b><input type="text" placeholder="@usuario"><button type="button">Salvar @</button> <small>A página recarrega ao salvar.</small></div>';
    box.querySelector('.rd-ed button').onclick = function (e) {
      e.preventDefault(); var u = limpa(box.querySelector('.rd-ed input').value); this.textContent = 'Salvando…';
      fetch(SB + '/rest/v1/batalhao_config?id=eq.2&select=data', { headers: h() }).then(function (r) { return r.json(); }).then(function (j) {
        var data = j[0].data; data.insta = { usuario: u };
        return fetch(SB + '/rest/v1/batalhao_config?id=eq.2', { method: 'PATCH', headers: h({ 'Content-Type': 'application/json', Prefer: 'return=minimal' }), body: JSON.stringify({ data: data, updated_at: new Date().toISOString() }) });
      }).then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); location.reload(); }).catch(function (er) { alert('Não foi possível salvar: ' + er.message); });
    };
    col.insertBefore(box, col.firstChild);
  }
  var usuario = '';
  function iniciar() {
    var col = D.querySelector('section.upd .col'); if (!col) return setTimeout(iniciar, 300);
    montar(col); desenhar(usuario);
    fetch(SB + '/rest/v1/batalhao_config?id=eq.2&select=i:data->insta', { headers: h() }).then(function (r) { return r.json(); })
      .then(function (j) { usuario = (j && j[0] && j[0].i && j[0].i.usuario) || ''; desenhar(usuario); }).catch(function () { });
    new MutationObserver(function () { desenhar(usuario); }).observe(D.body, { attributes: true, attributeFilter: ['class'] });
  }
  iniciar();
})();

/* ===== Soldado (desenho) no espaço vazio acima de "Nos siga nas redes sociais" ===== */
(function () {
  var W = window, D = document;
  if (W.__soldOk) return; W.__soldOk = 1;
  var css = D.createElement('style');
  css.textContent =
    'section.cmd.xsold{padding-bottom:0!important;padding-top:24px!important}' +
    '#xsold{display:block;margin:0 auto;height:320px;width:auto;max-width:90%;object-fit:contain;object-position:bottom;filter:drop-shadow(0 6px 14px rgba(0,0,0,.18));opacity:0;transform:translateY(24px);transition:opacity .8s ease,transform .8s ease}' +
    '#xsold.on{opacity:1;transform:none}' +
    '@media(max-width:767px){#xsold{height:240px}}';
  D.head.appendChild(css);
  function iniciar() {
    var s = D.querySelector('section.cmd'); if (!s) return setTimeout(iniciar, 300);
    if (D.getElementById('xsold')) return;
    var im = D.createElement('img'); im.id = 'xsold'; im.alt = 'Soldado do Exército Brasileiro fazendo sinal de positivo';
    im.src = 'https://nhghjpsnggwhdgfkpnyv.supabase.co/storage/v1/object/public/batalhao/soldado-35bi.webp'; im.loading = 'lazy'; im.decoding = 'async';
    im.setAttribute('contenteditable', 'false');
    s.classList.add('xsold'); s.appendChild(im);
    if ('IntersectionObserver' in W) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { im.classList.add('on'); io.disconnect(); } }); }, { threshold: .2 });
      io.observe(im);
    } else im.classList.add('on');
  }
  iniciar();
})();

/* ===== Arrastar (modo edição): soldado, "Nos siga…" e @ do Instagram =====
   Posições ficam num <i data-xpos> dentro do rodapé e são gravadas pelo botão Salvar do editor. */
(function () {
  var W = window, D = document;
  if (W.__dragOk) return; W.__dragOk = 1;
  var ALVOS = { xsold: '#xsold', rdt: '#xredes .rd-t', rdig: '#xredes .rd-ig', lema: '#xredes .rd-lema' };
  var TEXTOS = { rdt: '#xredes .rd-t', lema: '#xredes .rd-lema' };
  var css = D.createElement('style');
  css.textContent =
    '.xarr{position:relative;z-index:6}' +
    'body.edit .xarr{cursor:move;outline:2px dashed #c4a468;outline-offset:4px;touch-action:none;user-select:none;-webkit-user-select:none}' +
    'body.edit .xarr.xarrastando{outline-color:#0c223a;opacity:.85}' +
    '.xarr-dica{display:none;text-align:center;font:12px Montserrat,sans-serif;color:#8a6d2f;margin:6px 0 0}body.edit .xarr-dica{display:block}';
  D.head.appendChild(css);
  function foot() { return D.querySelector('[data-t=rodape]'); }
  function holder() {
    var f = foot(); if (!f) return null;
    var i = f.querySelector('i[data-xpos]');
    if (!i) { i = D.createElement('i'); i.setAttribute('data-xpos', ''); i.hidden = true; i.textContent = '{}'; f.appendChild(i); }
    return i;
  }
  function ler() { var i = holder(); try { return JSON.parse((i && i.textContent) || '{}') || {}; } catch (e) { return {}; } }
  function modo() { return innerWidth < 768 ? 'cel' : 'pc'; }
  function aplicar() {
    var p = ler()[modo()] || {};
    for (var k in ALVOS) { var el = D.querySelector(ALVOS[k]); if (!el) continue; el.classList.add('xarr'); el.dataset.arr = k; var v = p[k] || [0, 0]; el.style.translate = v[0] + 'px ' + v[1] + 'px'; }
    var tm = (ler().tam || {})[modo()] || {};
    for (var q in TAM) { var e2 = D.querySelector(TAM[q].sel); if (!e2) continue; var o = tm[q] || {};
      e2.style.fontSize = o.fs ? o.fs + 'px' : ''; e2.style.width = o.w ? o.w + 'px' : ''; if (q === 'lema') e2.style.maxWidth = o.w ? 'none' : '';
      if (q === 'lema') e2.style.marginRight = o.w ? '4%' : ''; }
    mostraTam();
  }
  /* tamanho da fonte e largura do campo (modo edição) */
  var TAM = { lema: { sel: '#xredes .rd-lema', nome: 'Tropa forte…' }, rdt: { sel: '#xredes .rd-t', nome: 'Balão' } };
  function mudaTam(k, campo, passo) {
    var el = D.querySelector(TAM[k].sel); if (!el) return;
    var t = ler(), m = modo(); t.tam = t.tam || {}; t.tam[m] = t.tam[m] || {}; var o = t.tam[m][k] = t.tam[m][k] || {};
    if (campo === 'fs') o.fs = Math.max(8, Math.min(72, Math.round(parseFloat(getComputedStyle(el).fontSize)) + passo));
    else o.w = Math.max(100, Math.min(1000, Math.round(el.getBoundingClientRect().width) + passo));
    holder().textContent = JSON.stringify(t); var st = D.querySelector('#tb .st'); if (st) st.textContent = 'Alterado — clique em Salvar';
    aplicar();
  }
  function mostraTam() { for (var k in TAM) { var el = D.querySelector(TAM[k].sel), sp = D.getElementById('xtam-' + k); if (el && sp) sp.textContent = Math.round(parseFloat(getComputedStyle(el).fontSize)) + 'px · ' + Math.round(el.getBoundingClientRect().width) + 'px'; } }
  function painelTam(dica) {
    var w = D.createElement('div'); w.style.cssText = 'margin-top:8px;display:grid;gap:6px;justify-content:center';
    for (var k in TAM) (function (k) {
      var r = D.createElement('div'); r.style.cssText = 'display:flex;flex-wrap:wrap;align-items:center;gap:4px;justify-content:center;font:12px Montserrat,sans-serif;color:#0c223a';
      function b(t, fn) { var x = D.createElement('button'); x.type = 'button'; x.textContent = t; x.style.cssText = 'min-width:30px;padding:4px 8px;border:1px solid #c4a468;border-radius:4px;background:#fff;cursor:pointer;font:600 12px Montserrat,sans-serif'; x.onmousedown = function (e) { e.preventDefault(); }; x.onclick = function (e) { e.preventDefault(); e.stopPropagation(); fn(); }; r.appendChild(x); }
      var n = D.createElement('b'); n.textContent = TAM[k].nome + ':'; r.appendChild(n);
      r.appendChild(D.createTextNode(' fonte')); b('A−', function () { mudaTam(k, 'fs', -1); }); b('A+', function () { mudaTam(k, 'fs', 1); });
      r.appendChild(D.createTextNode(' largura')); b('−', function () { mudaTam(k, 'w', -20); }); b('+', function () { mudaTam(k, 'w', 20); });
      var sp = D.createElement('span'); sp.id = 'xtam-' + k; sp.style.cssText = 'color:#8a6d2f;margin-left:4px'; r.appendChild(sp);
      w.appendChild(r);
    })(k);
    dica.appendChild(w); mostraTam();
  }
  function gravar(k, v) {
    var t = ler(), m = modo(); t[m] = t[m] || {};
    if (v) t[m][k] = v; else delete t[m][k];
    holder().textContent = JSON.stringify(t);
    var s = D.querySelector('#tb .st'); if (s) s.textContent = 'Alterado — clique em Salvar';
  }
  var drag = null;
  D.addEventListener('pointerdown', function (e) {
    if (!D.body.classList.contains('edit')) return;
    var el = e.target.closest && e.target.closest('.xarr'); if (!el) return;
    var txt = el.isContentEditable;
    if (!txt) e.preventDefault();
    e.stopPropagation();
    var v = (el.style.translate || '0px 0px').split(' ').map(parseFloat);
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
    if (drag.moveu) { var v = el.style.translate.split(' ').map(parseFloat); gravar(el.dataset.arr, [v[0] || 0, v[1] || 0]); }
    drag = null;
  }
  D.addEventListener('pointerup', soltar, true); D.addEventListener('pointercancel', soltar, true);
  /* no modo edição, o link do Instagram não abre; duplo clique volta o item ao lugar original */
  D.addEventListener('click', function (e) { if (D.body.classList.contains('edit') && e.target.closest && e.target.closest('.xarr')) { if (!e.target.closest('.xarr').isContentEditable) e.preventDefault(); e.stopPropagation(); } }, true);
  D.addEventListener('dblclick', function (e) {
    if (!D.body.classList.contains('edit')) return; var el = e.target.closest && e.target.closest('.xarr'); if (!el || el.isContentEditable) return;
    e.preventDefault(); el.style.translate = '0px 0px'; gravar(el.dataset.arr, null);
  }, true);
  /* textos editáveis: guardados no mesmo <i data-xpos>, em "txt" */
  function textos() {
    var t = ler().txt || {};
    for (var k in TEXTOS) {
      var el = D.querySelector(TEXTOS[k]); if (!el) continue;
      if (t[k] != null && !el.__lido) el.innerHTML = t[k];
      el.__lido = 1;
      el.setAttribute('contenteditable', D.body.classList.contains('edit') ? 'true' : 'false');
      if (!el.__ouve) { el.__ouve = 1; el.addEventListener('input', (function (kk, ee) { return function () { var a = ler(); a.txt = a.txt || {}; a.txt[kk] = ee.innerHTML; holder().textContent = JSON.stringify(a); var s = D.querySelector('#tb .st'); if (s) s.textContent = 'Alterado — clique em Salvar'; }; })(k, el)); }
    }
  }
  new MutationObserver(textos).observe(D.body, { attributes: true, attributeFilter: ['class'] });
  var dica;
  function iniciar(n) {
    aplicar(); textos();
    var box = D.getElementById('xredes');
    if (box && !dica) { dica = D.createElement('p'); dica.className = 'xarr-dica'; dica.setAttribute('contenteditable', 'false'); dica.textContent = 'Arraste o soldado, os textos e o @ para onde quiser. Clique num texto para editar. Depois clique em Salvar. As posições do computador e do celular são separadas.'; var rz = D.createElement('button'); rz.type = 'button'; rz.textContent = '↺ Voltar tudo ao lugar original'; rz.style.cssText = 'display:block;margin:6px auto 0;padding:6px 12px;border:1px solid #c4a468;border-radius:4px;background:#fffaf0;color:#8a6d2f;cursor:pointer;font:12px Montserrat,sans-serif';
      rz.onclick = function (e) { e.preventDefault(); e.stopPropagation(); for (var k in ALVOS) { var el = D.querySelector(ALVOS[k]); if (el) el.style.translate = '0px 0px'; gravar(k, null); } var t = ler(); if (t.tam) { delete t.tam[modo()]; holder().textContent = JSON.stringify(t); } aplicar(); };
      dica.appendChild(rz); painelTam(dica); box.appendChild(dica); }
    if (n < 30 && (!D.querySelector('#xsold') || !box || !D.querySelector('#xredes .rd-lema'))) setTimeout(function () { iniciar(n + 1); }, 300);
  }
  iniciar(0);
  var t; addEventListener('resize', function () { clearTimeout(t); t = setTimeout(aplicar, 200); });
  var re = W.__xre; W.__xre = function () { if (re) re.apply(this, arguments); setTimeout(aplicar, 50); };
})();
