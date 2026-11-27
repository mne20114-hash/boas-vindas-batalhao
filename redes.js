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
    '#xredes .rd-t{font-size:20px;font-weight:700;margin:0 0 12px;letter-spacing:.2px}' +
    '#xredes a.rd-ig{display:inline-flex;align-items:center;gap:8px;padding:9px 16px;border:1px solid #e1e4e8;border-radius:999px;color:#0c223a;text-decoration:none;font-size:16px;font-weight:600;background:#fff;box-shadow:0 2px 8px rgba(0,0,0,.06)}' +
    '#xredes a.rd-ig:hover{border-color:#d62976}' +
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
    box.innerHTML = '<p class="rd-t">Nos siga nas redes sociais</p>' +
      '<a class="rd-ig" target="_blank" rel="noopener">' + IG + '<span></span></a>' +
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
  var ALVOS = { xsold: '#xsold', rdt: '#xredes .rd-t', rdig: '#xredes .rd-ig' };
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
    e.preventDefault(); e.stopPropagation();
    var v = (el.style.translate || '0px 0px').split(' ').map(parseFloat);
    drag = { el: el, x0: e.clientX, y0: e.clientY, bx: v[0] || 0, by: v[1] || 0, moveu: false };
    el.classList.add('xarrastando'); try { el.setPointerCapture(e.pointerId); } catch (er) { }
  }, true);
  D.addEventListener('pointermove', function (e) {
    if (!drag) return; e.preventDefault();
    var dx = e.clientX - drag.x0, dy = e.clientY - drag.y0; if (Math.abs(dx) + Math.abs(dy) > 3) drag.moveu = true;
    drag.el.style.translate = Math.round(drag.bx + dx) + 'px ' + Math.round(drag.by + dy) + 'px';
  }, true);
  function soltar() {
    if (!drag) return; var el = drag.el; el.classList.remove('xarrastando');
    if (drag.moveu) { var v = el.style.translate.split(' ').map(parseFloat); gravar(el.dataset.arr, [v[0] || 0, v[1] || 0]); }
    drag = null;
  }
  D.addEventListener('pointerup', soltar, true); D.addEventListener('pointercancel', soltar, true);
  /* no modo edição, o link do Instagram não abre; duplo clique volta o item ao lugar original */
  D.addEventListener('click', function (e) { if (D.body.classList.contains('edit') && e.target.closest && e.target.closest('.xarr')) { e.preventDefault(); e.stopPropagation(); } }, true);
  D.addEventListener('dblclick', function (e) {
    if (!D.body.classList.contains('edit')) return; var el = e.target.closest && e.target.closest('.xarr'); if (!el) return;
    e.preventDefault(); el.style.translate = '0px 0px'; gravar(el.dataset.arr, null);
  }, true);
  var dica;
  function iniciar(n) {
    aplicar();
    var box = D.getElementById('xredes');
    if (box && !dica) { dica = D.createElement('p'); dica.className = 'xarr-dica'; dica.setAttribute('contenteditable', 'false'); dica.textContent = 'Arraste o soldado, o título e o @ para onde quiser (duplo clique volta ao lugar). Depois clique em Salvar. As posições do computador e do celular são separadas.'; box.appendChild(dica); }
    if (n < 30 && (!D.querySelector('#xsold') || !box)) setTimeout(function () { iniciar(n + 1); }, 300);
  }
  iniciar(0);
  var t; addEventListener('resize', function () { clearTimeout(t); t = setTimeout(aplicar, 200); });
  var re = W.__xre; W.__xre = function () { if (re) re.apply(this, arguments); setTimeout(aplicar, 50); };
})();
