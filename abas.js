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
    '.xmapa{background:#0c223a}.xm-cena{position:relative}.xm-cam{position:absolute;left:0;top:0;width:100%;height:100%;display:none;pointer-events:none}' +
    
    '.xm-rev{position:absolute;inset:0;background:#0c223a;opacity:0;transform:translate3d(0,0,0) scale(1.12);transition:opacity .7s ease,transform 2.4s cubic-bezier(.2,.6,.2,1);pointer-events:none;overflow:hidden;-webkit-backface-visibility:hidden;backface-visibility:hidden}' +
    '.xm-rev img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}' +
    '.xmapa.revelado .xm-rev{opacity:1;transform:translate3d(0,0,0) scale(1)}' +
    '.xm-rev::after{z-index:1;content:"";position:absolute;inset:0;background:radial-gradient(ellipse at center,transparent 55%,rgba(0,0,0,.45))}' +
    '.xm-tit{position:absolute;left:0;right:0;bottom:0;padding:28px 16px 14px;line-height:1.2;color:#fff;font:700 18px Montserrat,sans-serif;text-shadow:0 2px 8px rgba(0,0,0,.6);background:linear-gradient(transparent,rgba(0,0,0,.55));opacity:0;transform:translateY(10px);transition:opacity .6s .35s,transform .6s .35s;pointer-events:none}' +
    '.xmapa.revelado .xm-tit{opacity:1;transform:none}' +
    '.xm-volta{position:absolute;top:10px;left:10px;line-height:1;padding:8px 12px;border:0;border-radius:999px;background:rgba(12,34,58,.8);color:#fff;font:600 13px Montserrat,sans-serif;cursor:pointer;opacity:0;pointer-events:none;transition:opacity .4s .3s}' +
    '.xmapa.revelado .xm-volta{opacity:1;pointer-events:auto}' +
    '.xmapa svg{display:none}body.edit .xmapa svg{display:block}.xmapa polygon{display:none}body.edit .xmapa polygon{display:block;opacity:.9;fill:rgba(196,164,104,.25);stroke:#c4a468;stroke-dasharray:5 4;animation:none}' +
    '.xab-mini{width:44px;height:34px;object-fit:cover;border-radius:4px}' +
    '.xabas .xab-file{display:inline-block;padding:7px 11px;font:600 13px Montserrat,sans-serif;border:1px solid #0c223a;border-radius:999px;cursor:pointer;background:#fff}' +
    '.xmapa polygon{opacity:0;transition:opacity .35s;stroke-width:3;vector-effect:non-scaling-stroke;stroke-linejoin:round}' +
    '.xmapa polygon.on{opacity:1;animation:xneon 1.6s ease-in-out infinite alternate}' +
    '@keyframes xneon{from{stroke-width:2.5}to{stroke-width:4.5}}' +
    '.xmapa .xdraw{opacity:1;fill:rgba(255,255,255,.25);stroke:#fff;stroke-dasharray:6 4}' +
    'body.edit .xmapa.desenhando{cursor:crosshair}' +
    '.xabas button .dot{display:inline-block;width:10px;height:10px;border-radius:50%;margin-right:7px;vertical-align:middle;box-shadow:0 0 6px currentColor}' +
    '.xab-pan{display:none;width:100%;margin-top:10px;padding:12px;border:2px dashed #c4a468;border-radius:8px;background:#fffaf0;font:13px Montserrat,sans-serif;color:#0c223a;text-align:left}body.edit .xab-pan{display:block}' +
    '.xab-pan span{color:#8a6d2f;font-size:12px}.xab-row{display:flex;flex-wrap:wrap;align-items:center;gap:6px;margin-top:8px}' +
    '.xab-row input[type=text]{flex:1;min-width:120px;padding:7px 9px;border:1px solid #ccc;border-radius:4px;font:14px Montserrat,sans-serif}' +
    '.xab-row input[type=color]{width:40px;height:34px;padding:0;border:1px solid #ccc;border-radius:4px;background:#fff}' +
    '.xabas .xab-row button{padding:7px 11px;font-size:13px;border-width:1px}.xabas .xab-row button.xab-salvar{background:#c4a468;border-color:#c4a468;color:#0c223a}' +
    '.xab-msg{margin-top:8px;color:#8a6d2f}' +
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
  /* envia uma foto (reduzida) para o storage e devolve o endereço público */
  function enviarFoto(file) {
    return new Promise(function (ok, no) {
      var im = new Image(), u = URL.createObjectURL(file);
      im.onload = function () {
        var f = Math.min(1, 1920 / Math.max(im.width, im.height)), cv = D.createElement('canvas');
        cv.width = Math.round(im.width * f); cv.height = Math.round(im.height * f); cv.getContext('2d').drawImage(im, 0, 0, cv.width, cv.height);
        HTMLCanvasElement.prototype.toBlob.call(cv, ok, 'image/jpeg', 0.85);
      };
      im.onerror = no; im.src = u;
    }).then(function (b) {
      var nome = 'area-' + Date.now().toString(36) + '.jpg';
      return fetch(SB + '/storage/v1/object/batalhao/' + nome, { method: 'POST', headers: h({ 'Content-Type': 'image/jpeg', 'x-upsert': 'true' }), body: b }).then(function (r) {
        if (!r.ok) throw new Error('envio da foto (HTTP ' + r.status + ')');
        return SB + '/storage/v1/object/public/batalhao/' + nome;
      });
    });
  }
  function montarMapa(k, foto, fig, c) {
    c.areas = c.areas || [];
    foto.style.display = 'none';
    var NS = 'http://www.w3.org/2000/svg';
    var mapa = D.createElement('div'); mapa.className = 'xmapa'; mapa.setAttribute('contenteditable', 'false');
    var cena = D.createElement('div'); cena.className = 'xm-cena';
    cena.innerHTML = '<img alt="Vista aérea do batalhão" src="' + c.mapa.img + '">';
    var svg = D.createElementNS(NS, 'svg'); svg.setAttribute('viewBox', '0 0 100 100'); svg.setAttribute('preserveAspectRatio', 'none'); cena.appendChild(svg);
    mapa.appendChild(cena);
    /* câmera: a aproximação é desenhada num canvas do tamanho do quadro (leve no celular) */
    var cam = D.createElement('canvas'); cam.className = 'xm-cam'; mapa.appendChild(cam);
    var aImg = cena.querySelector('img'), cur = null, anim = 0;
    function cheio() { return { x: 0, y: 0, w: aImg.naturalWidth, h: aImg.naturalHeight }; }
    function pinta(r) {
      var dpr = Math.min(2, W.devicePixelRatio || 1), cw = Math.round(cena.offsetWidth * dpr), ch = Math.round(cena.offsetHeight * dpr);
      if (cam.width !== cw || cam.height !== ch) { cam.width = cw; cam.height = ch; }
      var g = cam.getContext('2d'); g.imageSmoothingQuality = 'high'; g.drawImage(aImg, r.x, r.y, r.w, r.h, 0, 0, cw, ch);
    }
    function voar(alvoR, ms, fim) {
      cancelAnimationFrame(anim);
      if (!aImg.complete || !aImg.naturalWidth) { aImg.addEventListener('load', function () { voar(alvoR, ms, fim); }, { once: true }); return; }
      var de = cur || cheio(), t0 = performance.now(); cam.style.display = 'block';
      function passo(t) {
        var k = Math.min(1, (t - t0) / ms), e = k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
        var r = { x: de.x + (alvoR.x - de.x) * e, y: de.y + (alvoR.y - de.y) * e, w: de.w + (alvoR.w - de.w) * e, h: de.h + (alvoR.h - de.h) * e };
        pinta(r); cur = r;
        if (k < 1) anim = requestAnimationFrame(passo); else if (fim) fim();
      }
      anim = requestAnimationFrame(passo);
    }
    function semCamera() { cancelAnimationFrame(anim); cur = null; cam.style.display = 'none'; }
    var rev = D.createElement('div'); rev.className = 'xm-rev'; var revImg = D.createElement('img'); revImg.alt = ''; revImg.decoding = 'async'; rev.appendChild(revImg); mapa.appendChild(rev);
    var cache = {};
    function carregar(u) { if (!u) return Promise.resolve(); if (!cache[u]) { var im = new Image(); im.decoding = 'async'; cache[u] = new Promise(function (ok) { im.onload = im.onerror = function () { (im.decode ? im.decode() : Promise.resolve()).then(ok, ok); }; im.src = u; }); } return cache[u]; }
    setTimeout(function () { c.areas.forEach(function (a) { if (a.foto) { var im = new Image(); im.src = a.foto; } }); }, 1500);
    var tit = D.createElement('div'); tit.className = 'xm-tit'; mapa.appendChild(tit);
    var volta = D.createElement('button'); volta.type = 'button'; volta.className = 'xm-volta'; volta.textContent = '← Vista aérea'; mapa.appendChild(volta);
    var bar = D.createElement('div'); bar.className = 'xabas'; bar.setAttribute('contenteditable', 'false');
    var botoes = D.createElement('div'); botoes.style.cssText = 'display:contents'; bar.appendChild(botoes);
    var pan = D.createElement('div'); pan.className = 'xab-pan'; bar.appendChild(pan);
    var atual = -1, polys = [], desenho = -1, pts = [], temp = null, timers = [];
    function limpaT() { timers.forEach(clearTimeout); timers = []; }
    function depois(ms, fn) { timers.push(setTimeout(fn, ms)); }
    function alvo(a) {
      var p = a.pts || []; if (!p.length) return cheio();
      var x0 = 100, y0 = 100, x1 = 0, y1 = 0;
      p.forEach(function (q) { x0 = Math.min(x0, q[0]); y0 = Math.min(y0, q[1]); x1 = Math.max(x1, q[0]); y1 = Math.max(y1, q[1]); });
      var maxZ = innerWidth < 768 ? 2.6 : 4.5;
      var sc = Math.max(1.5, Math.min(maxZ, 0.85 * Math.min(100 / Math.max(x1 - x0, 1), 100 / Math.max(y1 - y0, 1))));
      var cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
      var tx = Math.max((1 - sc) * 100, Math.min(0, 50 - sc * cx)), ty = Math.max((1 - sc) * 100, Math.min(0, 50 - sc * cy));
      var nw = aImg.naturalWidth, nh = aImg.naturalHeight;
      return { x: -tx / 100 * nw / sc, y: -ty / 100 * nh / sc, w: nw / sc, h: nh / sc };
    }
    function mostrar(i) {
      limpaT(); var a = c.areas[i], vez = {}; mostrar.vez = vez;
      var jaAberto = mapa.classList.contains('revelado');
      mapa.classList.remove('revelado');
      var pronto = carregar(a.foto);
      depois(jaAberto ? 450 : 0, function () {
        var fimZoom = new Promise(function (ok) { voar(alvo(a), 1300, ok); });
        Promise.all([pronto, fimZoom]).then(function () {
          if (mostrar.vez !== vez) return;
          tit.textContent = a.nome || '';
          if (!a.foto) return;
          revImg.src = a.foto;
          requestAnimationFrame(function () { requestAnimationFrame(function () { if (mostrar.vez === vez) mapa.classList.add('revelado'); }); });
        });
      });
    }
    function aerea() {
      limpaT(); mostrar.vez = null; mapa.classList.remove('revelado');
      depois(450, function () { if (cur) voar(cheio(), 1000, semCamera); });
    }
    volta.onclick = function (e) { e.preventDefault(); e.stopPropagation(); sel(-1, true); };
    function sel(i, forcar) {
      atual = (!forcar && atual === i) ? -1 : i;
      [].forEach.call(botoes.children, function (b, j) { b.classList.toggle('on', j === atual); });
      polys.forEach(function (p, j) { p.classList.toggle('on', j === atual); });
      if (atual < 0) aerea(); else mostrar(atual);
    }
    function desenhar() {
      polys.forEach(function (p) { p.remove(); }); polys = []; botoes.innerHTML = '';
      c.areas.forEach(function (a, i) {
        var pg = D.createElementNS(NS, 'polygon'); pg.setAttribute('points', (a.pts || []).map(function (p) { return p[0] + ',' + p[1]; }).join(' '));
        svg.insertBefore(pg, temp); polys.push(pg);
        var b = D.createElement('button'); b.type = 'button'; b.dataset.i = i; b.textContent = a.nome || 'Sem nome';
        if (!a.foto) b.classList.add('vazio');
        b.onclick = function (e) { e.preventDefault(); e.stopPropagation(); sel(i); };
        botoes.appendChild(b);
      });
      [].forEach.call(botoes.children, function (b, j) { b.classList.toggle('on', j === atual); });
    }
    function painel() {
      pan.innerHTML = '<b>Áreas da foto aérea</b> <span>(só aparece no modo edição)</span>';
      c.areas.forEach(function (a, i) {
        var row = D.createElement('div'); row.className = 'xab-row';
        var ni = D.createElement('input'); ni.type = 'text'; ni.value = a.nome || ''; ni.placeholder = 'Nome do botão';
        ni.oninput = function () { a.nome = ni.value; desenhar(); };
        var bd = D.createElement('button'); bd.type = 'button'; bd.textContent = (a.pts && a.pts.length) ? '✏️ Remarcar área' : '✏️ Marcar área';
        bd.onclick = function (e) { e.preventDefault(); e.stopPropagation(); comecar(i); };
        var lf = D.createElement('label'); lf.className = 'xab-file'; lf.textContent = a.foto ? '🖼 Trocar foto' : '🖼 Escolher foto';
        var fi = D.createElement('input'); fi.type = 'file'; fi.accept = 'image/*'; fi.hidden = true; lf.appendChild(fi);
        fi.onchange = function () {
          if (!fi.files[0]) return; lf.firstChild.textContent = 'Enviando…';
          enviarFoto(fi.files[0]).then(function (u) { a.foto = u; desenhar(); painel(); sel(i, true); }).catch(function (er) { alert('Erro: ' + er.message); painel(); });
        };
        var ver = D.createElement('button'); ver.type = 'button'; ver.textContent = '▶ Testar';
        ver.onclick = function (e) { e.preventDefault(); e.stopPropagation(); sel(i, true); mapa.scrollIntoView({ behavior: 'smooth', block: 'center' }); };
        var bx = D.createElement('button'); bx.type = 'button'; bx.textContent = '🗑'; bx.title = 'Excluir este botão';
        bx.onclick = function (e) { e.preventDefault(); e.stopPropagation(); if (!confirm('Excluir o botão "' + (a.nome || 'Sem nome') + '"?')) return; c.areas.splice(i, 1); atual = -1; aerea(); desenhar(); painel(); };
        if (a.foto) { var mini = D.createElement('img'); mini.src = a.foto; mini.className = 'xab-mini'; row.appendChild(mini); }
        row.appendChild(ni); row.appendChild(bd); row.appendChild(lf); row.appendChild(ver); row.appendChild(bx); pan.appendChild(row);
      });
      var acoes = D.createElement('div'); acoes.className = 'xab-row';
      var bn = D.createElement('button'); bn.type = 'button'; bn.textContent = '+ Novo botão';
      bn.onclick = function (e) { e.preventDefault(); e.stopPropagation(); c.areas.push({ nome: 'Nova área', pts: [] }); desenhar(); painel(); comecar(c.areas.length - 1); };
      var bs = D.createElement('button'); bs.type = 'button'; bs.className = 'xab-salvar'; bs.textContent = '💾 Salvar botões';
      bs.onclick = function (e) { e.preventDefault(); e.stopPropagation(); if (desenho >= 0) { alert('Conclua ou cancele a marcação antes de salvar.'); return; } bs.textContent = 'Salvando…'; salvarAbas(k, c); };
      acoes.appendChild(bn); acoes.appendChild(bs); pan.appendChild(acoes);
      var aviso = D.createElement('div'); aviso.className = 'xab-msg';
      aviso.textContent = desenho >= 0 ? 'Clique na foto aérea, ponto por ponto, em volta da área "' + (c.areas[desenho].nome || '') + '". A câmera vai se aproximar dessa região.' : 'Salve antes as outras alterações da página: ao salvar os botões, a página recarrega.';
      pan.appendChild(aviso);
      if (desenho >= 0) {
        var r2 = D.createElement('div'); r2.className = 'xab-row';
        var ok = D.createElement('button'); ok.type = 'button'; ok.className = 'xab-salvar'; ok.textContent = '✔ Concluir marcação';
        ok.onclick = function (e) { e.preventDefault(); e.stopPropagation(); if (pts.length < 3) { alert('Marque pelo menos 3 pontos.'); return; } c.areas[desenho].pts = pts.map(function (p) { return [Math.round(p[0] * 100) / 100, Math.round(p[1] * 100) / 100]; }); parar(); };
        var un = D.createElement('button'); un.type = 'button'; un.textContent = '↶ Desfazer ponto';
        un.onclick = function (e) { e.preventDefault(); e.stopPropagation(); pts.pop(); traco(); };
        var no = D.createElement('button'); no.type = 'button'; no.textContent = '✖ Cancelar';
        no.onclick = function (e) { e.preventDefault(); e.stopPropagation(); parar(); };
        r2.appendChild(ok); r2.appendChild(un); r2.appendChild(no); pan.appendChild(r2);
      }
    }
    function traco() { if (temp) temp.setAttribute('points', pts.map(function (p) { return p[0] + ',' + p[1]; }).join(' ')); }
    function comecar(i) {
      parar(true); atual = -1; limpaT(); mapa.classList.remove('revelado'); semCamera(); [].forEach.call(botoes.children, function (b) { b.classList.remove('on'); });
      desenho = i; pts = [];
      temp = D.createElementNS(NS, 'polygon'); temp.setAttribute('class', 'xdraw'); svg.appendChild(temp);
      mapa.classList.add('desenhando'); painel(); mapa.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    function parar(semPainel) { desenho = -1; pts = []; if (temp) temp.remove(); temp = null; mapa.classList.remove('desenhando'); desenhar(); if (!semPainel) painel(); }
    mapa.addEventListener('click', function (e) {
      if (desenho < 0 || e.target === volta) return; e.preventDefault(); e.stopPropagation();
      var r = mapa.getBoundingClientRect(); pts.push([(e.clientX - r.left) / r.width * 100, (e.clientY - r.top) / r.height * 100]); traco();
    }, true);
    fig.parentNode.insertBefore(mapa, fig.nextSibling); mapa.parentNode.insertBefore(bar, mapa.nextSibling);
    feitos[k] = { bar: bar, fig: fig, mapa: mapa };
    desenhar(); painel();
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
