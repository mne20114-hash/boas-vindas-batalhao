/* ===== Foto com botões (abas): cada botão troca a foto =====
   data.abas = { "<chave da foto>": { nomes: ["Área 1", "Área 2", ...] } }
   Foto do botão 1 = chave original; botão N = chave + "-a" + N (trocadas pelo editor normal, clicando na foto) */
(function () {
  var W = window, D = document;
  if (W.__abasOk) return; W.__abasOk = 1;
  var SB = 'https://nhghjpsnggwhdgfkpnyv.supabase.co', KEY = 'sb_publishable_SOwPUUbWLOE_FeptNt3x1Q_EQ7r6imL';
  function h(x) { var o = { apikey: KEY, Authorization: 'Bearer ' + KEY }; for (var k in x) o[k] = x[k]; return o; }
  var css = D.createElement('style');
  css.textContent =
    '.xabas{display:flex;flex-wrap:wrap;justify-content:center;gap:8px;margin:14px auto 0;max-width:900px}' +
    '.xabas button{font:600 14px Montserrat,sans-serif;padding:10px 16px;border-radius:999px;border:2px solid #0c223a;background:#fff;color:#0c223a;cursor:pointer;transition:background .2s,color .2s}' +
    '.xabas button.on{background:#0c223a;color:#fff}' +
    '.xabas button.vazio{display:none}body.edit .xabas button.vazio{display:inline-block;opacity:.55;border-style:dashed}' +
    '.xabas .xab-ed{display:none;border-color:#c4a468;color:#8a6d2f;background:#fffaf0}body.edit .xabas .xab-ed{display:inline-block}' +
    '.xab-foto{transition:opacity .25s}.xab-foto.xab-troca{opacity:.15}' +
    '.xab-dica{display:none;width:100%;text-align:center;font:12px Montserrat,sans-serif;color:#8a6d2f}body.edit .xab-dica{display:block}';
  D.head.appendChild(css);

  var cfg = {}, imgs = {}, pos = {}, feitos = {};
  function dados(d) { if (!d) return; cfg = d.abas || {}; imgs = d.imgs || {}; pos = d.imgpos || {}; }
  function chave(k, i) { return i === 0 ? k : k + '-a' + (i + 1); }
  function estilo(el, key) {
    var u = imgs[key], p = pos[key];
    el.style.backgroundImage = u ? 'url(' + u + ')' : '';
    el.style.backgroundSize = p ? (p.s == 100 ? 'cover' : p.s + '%') : 'cover';
    el.style.backgroundPosition = p ? p.x + '% ' + p.y + '%' : '50% 50%';
  }
  function montar(k) {
    var foto = D.querySelector('.xfoto[data-img="' + k + '"],[data-xk="' + k + '"] [data-img]') || D.querySelector('[data-img="' + k + '"]');
    if (!foto) return false;
    var fig = foto.closest('.fig') || foto, c = cfg[k], nomes = (c && c.nomes) || [];
    if (feitos[k]) { feitos[k].bar.remove(); }
    foto.classList.add('xab-foto');
    var bar = D.createElement('div'); bar.className = 'xabas'; bar.setAttribute('contenteditable', 'false'); bar.dataset.abas = k;
    var atual = 0;
    function marcar() {
      [].forEach.call(bar.querySelectorAll('button[data-i]'), function (b) {
        var i = +b.dataset.i; b.classList.toggle('on', i === atual);
        b.classList.toggle('vazio', !imgs[chave(k, i)] && i !== atual);
      });
    }
    function ir(i) {
      if (i === atual) return;
      /* guarda o que o editor possa ter trocado na foto atual */
      var ka = chave(k, atual), m = /url\(["']?(.*?)["']?\)/.exec(foto.style.backgroundImage || '');
      if (m) imgs[ka] = m[1];
      atual = i; var kn = chave(k, i);
      foto.classList.add('xab-troca');
      setTimeout(function () { foto.dataset.img = kn; estilo(foto, kn); foto.classList.remove('xab-troca'); marcar(); }, 180);
    }
    nomes.forEach(function (n, i) {
      var b = D.createElement('button'); b.type = 'button'; b.dataset.i = i; b.textContent = n;
      b.onclick = function (e) { e.preventDefault(); e.stopPropagation(); ir(i); };
      bar.appendChild(b);
    });
    var ed = D.createElement('button'); ed.type = 'button'; ed.className = 'xab-ed'; ed.textContent = '✎ Nomes dos botões';
    ed.onclick = function (e) { e.preventDefault(); e.stopPropagation(); renomear(k, nomes); };
    bar.appendChild(ed);
    var dica = D.createElement('div'); dica.className = 'xab-dica'; dica.textContent = 'Escolha um botão e clique na foto para trocar a foto dele. Depois clique em Salvar.';
    bar.appendChild(dica);
    fig.parentNode.insertBefore(bar, fig.nextSibling);
    foto.dataset.img = k; estilo(foto, k);
    feitos[k] = { bar: bar, fig: fig };
    marcar();
    return true;
  }
  function renomear(k, nomes) {
    var v = prompt('Nomes dos botões, separados por vírgula (a ordem é a dos botões).\nSalve antes as outras alterações: a página recarrega depois.', nomes.join(', '));
    if (v == null) return;
    var novos = v.split(',').map(function (s) { return s.trim(); }).filter(Boolean); if (!novos.length) return;
    fetch(SB + '/rest/v1/batalhao_config?id=eq.2&select=data', { headers: h() }).then(function (r) { return r.json(); }).then(function (j) {
      var data = j[0].data; data.abas = data.abas || {}; data.abas[k] = { nomes: novos };
      return fetch(SB + '/rest/v1/batalhao_config?id=eq.2', { method: 'PATCH', headers: h({ 'Content-Type': 'application/json', Prefer: 'return=minimal' }), body: JSON.stringify({ data: data, updated_at: new Date().toISOString() }) });
    }).then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); location.reload(); }).catch(function (e) { alert('Não foi possível salvar: ' + e.message); });
  }
  function posicionar() { for (var k in feitos) { var f = feitos[k]; if (f.fig.isConnected && f.fig.nextElementSibling !== f.bar) f.fig.parentNode.insertBefore(f.bar, f.fig.nextSibling); } }
  function iniciar(t) {
    var falta = 0; for (var k in cfg) if (!feitos[k] && !montar(k)) falta++;
    if (falta && t < 40) setTimeout(function () { iniciar(t + 1); }, 300);
  }
  var r0 = W.__cfgRow && W.__cfgRow[0] && W.__cfgRow[0].data; dados(r0);
  fetch(SB + '/rest/v1/batalhao_config?id=eq.2&select=a:data->abas,i:data->imgs,p:data->imgpos', { headers: h() }).then(function (r) { return r.json(); })
    .then(function (j) { if (j && j[0]) { cfg = j[0].a || {}; imgs = j[0].i || {}; pos = j[0].p || {}; } feitos = (function () { for (var k in feitos) feitos[k].bar.remove(); return {}; })(); iniciar(0); }).catch(function () { iniciar(0); });
  new MutationObserver(posicionar).observe(D.querySelector('main') || D.body, { childList: true, subtree: true });
})();
