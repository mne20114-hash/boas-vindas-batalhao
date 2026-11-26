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
    '.xmapa{position:relative;width:100%;line-height:0;border-radius:6px;overflow:hidden;box-shadow:0 8px 24px rgba(0,0,0,.18)}.xmapa img{width:100%;height:auto;display:block}' +
    '.xmapa svg{position:absolute;inset:0;width:100%;height:100%}' +
    '.xmapa polygon{opacity:0;transition:opacity .35s;stroke-width:3;vector-effect:non-scaling-stroke;stroke-linejoin:round}' +
    '.xmapa polygon.on{opacity:1;animation:xneon 1.6s ease-in-out infinite alternate}' +
    '@keyframes xneon{from{stroke-width:2.5}to{stroke-width:4.5}}' +
    '.xmapa .xdraw{opacity:1;fill:rgba(255,255,255,.25);stroke:#fff;stroke-dasharray:6 4}' +
    'body.edit .xmapa.desenhando{cursor:crosshair}' +
    '.xabas button .dot{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:7px;vertical-align:middle;box-shadow:0 0 6px currentColor}' +
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
    if (feitos[k]) { feitos[k].bar.remove(); if (feitos[k].mapa) feitos[k].mapa.remove(); }
    if (c && c.mapa) return montarMapa(k, foto, fig, c);
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
  var NEON = ['#39ff14', '#00e5ff', '#ff2bd6', '#ffe600', '#ff6a00', '#b026ff'];
  function rgba(hex, a) { var n = parseInt(hex.slice(1), 16); return 'rgba(' + (n >> 16) + ',' + (n >> 8 & 255) + ',' + (n & 255) + ',' + a + ')'; }
  function salvarAbas(k, c) {
    return fetch(SB + '/rest/v1/batalhao_config?id=eq.2&select=data', { headers: h() }).then(function (r) { return r.json(); }).then(function (j) {
      var data = j[0].data; data.abas = data.abas || {}; data.abas[k] = c;
      return fetch(SB + '/rest/v1/batalhao_config?id=eq.2', { method: 'PATCH', headers: h({ 'Content-Type': 'application/json', Prefer: 'return=minimal' }), body: JSON.stringify({ data: data, updated_at: new Date().toISOString() }) });
    }).then(function (r) { if (!r.ok) throw new Error('HTTP ' + r.status); location.reload(); }).catch(function (e) { alert('Não foi possível salvar: ' + e.message); });
  }
  function montarMapa(k, foto, fig, c) {
    var areas = c.areas || [];
    foto.style.display = 'none';
    var mapa = D.createElement('div'); mapa.className = 'xmapa'; mapa.setAttribute('contenteditable', 'false');
    var NS = 'http://www.w3.org/2000/svg';
    mapa.innerHTML = '<img alt="Vista aérea do batalhão" src="' + c.mapa.img + '" loading="lazy">';
    var svg = D.createElementNS(NS, 'svg'); svg.setAttribute('viewBox', '0 0 100 100'); svg.setAttribute('preserveAspectRatio', 'none'); mapa.appendChild(svg);
    var polys = areas.map(function (a, i) {
      var cor = a.cor || NEON[i % NEON.length], pg = D.createElementNS(NS, 'polygon');
      pg.setAttribute('points', (a.pts || []).map(function (p) { return p[0] + ',' + p[1]; }).join(' '));
      pg.style.stroke = cor; pg.style.fill = rgba(cor, .28); pg.style.filter = 'drop-shadow(0 0 4px ' + cor + ') drop-shadow(0 0 10px ' + cor + ')';
      svg.appendChild(pg); return pg;
    });
    var bar = D.createElement('div'); bar.className = 'xabas'; bar.setAttribute('contenteditable', 'false');
    var atual = -1;
    function sel(i) {
      atual = atual === i ? -1 : i;
      polys.forEach(function (p, j) { p.classList.toggle('on', j === atual); });
      [].forEach.call(bar.querySelectorAll('button[data-i]'), function (b) { b.classList.toggle('on', +b.dataset.i === atual); });
    }
    areas.forEach(function (a, i) {
      var cor = a.cor || NEON[i % NEON.length], b = D.createElement('button'); b.type = 'button'; b.dataset.i = i;
      b.innerHTML = '<span class="dot" style="background:' + cor + ';color:' + cor + '"></span>'; b.appendChild(D.createTextNode(a.nome));
      b.onclick = function (e) { e.preventDefault(); e.stopPropagation(); sel(i); };
      bar.appendChild(b);
    });
    /* ferramentas do modo edição */
    function ferr(txt, fn) { var b = D.createElement('button'); b.type = 'button'; b.className = 'xab-ed'; b.textContent = txt; b.onclick = function (e) { e.preventDefault(); e.stopPropagation(); fn(); }; bar.appendChild(b); return b; }
    ferr('✎ Nomes dos botões', function () {
      var v = prompt('Nomes das áreas, separados por vírgula (a ordem é a dos botões).\nSalve antes as outras alterações: a página recarrega depois.', areas.map(function (a) { return a.nome; }).join(', '));
      if (v == null) return; var n = v.split(',').map(function (x) { return x.trim(); }).filter(Boolean); if (!n.length) return;
      c.areas = n.map(function (nome, i) { var a = areas[i] || { pts: [] }; return { nome: nome, cor: a.cor || NEON[i % NEON.length], pts: a.pts || [] }; });
      salvarAbas(k, c);
    });
    var pts = [], temp = null, bDes, bOk, bNo;
    function fim() { pts = []; if (temp) temp.remove(); temp = null; mapa.classList.remove('desenhando'); bDes.style.display = ''; bOk.style.display = bNo.style.display = 'none'; }
    bDes = ferr('✏️ Desenhar a área do botão selecionado', function () {
      if (atual < 0) { alert('Primeiro clique no botão da área que vai desenhar.'); return; }
      pts = []; mapa.classList.add('desenhando'); polys[atual].classList.remove('on');
      temp = D.createElementNS(NS, 'polygon'); temp.setAttribute('class', 'xdraw'); svg.appendChild(temp);
      bDes.style.display = 'none'; bOk.style.display = bNo.style.display = ''; dica.textContent = 'Clique na foto, ponto por ponto, em volta da área "' + areas[atual].nome + '". Depois clique em Concluir.';
    });
    bOk = ferr('✔ Concluir desenho', function () {
      if (pts.length < 3) { alert('Marque pelo menos 3 pontos.'); return; }
      c.areas[atual].pts = pts.map(function (p) { return [Math.round(p[0] * 100) / 100, Math.round(p[1] * 100) / 100]; }); salvarAbas(k, c);
    });
    bNo = ferr('✖ Cancelar', function () { fim(); sel(atual); dica.textContent = textoDica; });
    bOk.style.display = bNo.style.display = 'none';
    mapa.addEventListener('click', function (e) {
      if (!mapa.classList.contains('desenhando')) return; e.preventDefault(); e.stopPropagation();
      var r = mapa.getBoundingClientRect(); pts.push([(e.clientX - r.left) / r.width * 100, (e.clientY - r.top) / r.height * 100]);
      temp.setAttribute('points', pts.map(function (p) { return p[0] + ',' + p[1]; }).join(' '));
    }, true);
    var textoDica = 'Para corrigir uma área: clique no botão dela e depois em "Desenhar". Para outra foto aérea, mande para o Claude.';
    var dica = D.createElement('div'); dica.className = 'xab-dica'; dica.textContent = textoDica; bar.appendChild(dica);
    fig.parentNode.insertBefore(mapa, fig.nextSibling); mapa.parentNode.insertBefore(bar, mapa.nextSibling);
    feitos[k] = { bar: bar, fig: fig, mapa: mapa };
    if (areas.length) sel(0);
    return true;
  }
  function posicionar() { for (var k in feitos) { var f = feitos[k], ult = f.fig; if (!f.fig.isConnected) continue; if (f.mapa) { if (ult.nextElementSibling !== f.mapa) ult.parentNode.insertBefore(f.mapa, ult.nextSibling); ult = f.mapa; } if (ult.nextElementSibling !== f.bar) ult.parentNode.insertBefore(f.bar, ult.nextSibling); } }
  function iniciar(t) {
    var falta = 0; for (var k in cfg) if (!feitos[k] && !montar(k)) falta++;
    if (falta && t < 40) setTimeout(function () { iniciar(t + 1); }, 300);
  }
  var r0 = W.__cfgRow && W.__cfgRow[0] && W.__cfgRow[0].data; dados(r0);
  fetch(SB + '/rest/v1/batalhao_config?id=eq.2&select=a:data->abas,i:data->imgs,p:data->imgpos', { headers: h() }).then(function (r) { return r.json(); })
    .then(function (j) { if (j && j[0]) { cfg = j[0].a || {}; imgs = j[0].i || {}; pos = j[0].p || {}; } feitos = (function () { for (var k in feitos) { feitos[k].bar.remove(); if (feitos[k].mapa) feitos[k].mapa.remove(); } return {}; })(); iniciar(0); }).catch(function () { iniciar(0); });
  new MutationObserver(posicionar).observe(D.querySelector('main') || D.body, { childList: true, subtree: true });
})();
