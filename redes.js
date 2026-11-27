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
