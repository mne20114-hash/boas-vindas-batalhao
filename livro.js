
/* ===== Livro com efeito de folhear (data.livro = {titulo, paginas:[urls]}) ===== */
(function () {
  var W = window, D = document;
  if (W.__livroOk) return; W.__livroOk = 1;
  var SB = 'https://nhghjpsnggwhdgfkpnyv.supabase.co', KEY = 'sb_publishable_SOwPUUbWLOE_FeptNt3x1Q_EQ7r6imL';
  var PF = 'https://cdn.jsdelivr.net/npm/page-flip@2.0.7/dist/js/page-flip.browser.js';
  var PDFJS = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/';
  var sec, flip, atual = null;

  function dados() {
    var r = W.__cfgRow && W.__cfgRow[0] && W.__cfgRow[0].data;
    return (r && r.livro) || (W.__CFG && W.__CFG.livro) || null;
  }
  function js(src) {
    return new Promise(function (ok, no) {
      var s = D.querySelector('script[src="' + src + '"]');
      if (s) { if (s.__ok) ok(); else s.addEventListener('load', ok); return; }
      s = D.createElement('script'); s.src = src; s.onload = function () { s.__ok = 1; ok(); }; s.onerror = no; D.head.appendChild(s);
    });
  }
  function alvo() { var t = D.querySelector('[data-t="t2"]'); return t ? t.closest('section') : null; }
  function posicionar() {
    var a = alvo(); if (!a || !sec) return;
    if (a.previousElementSibling !== sec) a.parentNode.insertBefore(sec, a);
  }

  var css = D.createElement('style');
  css.textContent =
    '#xlivro{background:#fff;padding:48px 16px 40px;text-align:center}' +
    '#xlivro h2{margin:0 0 22px}' +
    '#xlivro .lv-box{max-width:900px;margin:0 auto;position:relative}' +
    '#xlivro .lv-book{margin:0 auto;box-shadow:0 10px 30px rgba(0,0,0,.18)}' +
    '#xlivro .lv-nav{display:flex;align-items:center;justify-content:center;gap:16px;margin-top:16px;font:600 14px Montserrat,sans-serif;color:#0c223a}' +
    '#xlivro .lv-nav button{width:42px;height:42px;border-radius:50%;border:0;background:#0c223a;color:#fff;font-size:20px;cursor:pointer}' +
    '#xlivro .lv-nav button:disabled{opacity:.3;cursor:default}' +
    '#xlivro .lv-dica{font:12px Montserrat,sans-serif;color:#777;margin-top:8px}' +
    '#xlivro .lv-ed{display:none;margin:0 auto 18px;max-width:640px;padding:12px;border:2px dashed #c4a468;border-radius:8px;font:14px Montserrat,sans-serif;text-align:left}' +
    'body.edit #xlivro .lv-ed{display:block}' +
    '#xlivro .lv-ed input[type=text]{width:100%;padding:8px;margin:6px 0 10px;border:1px solid #ccc;border-radius:4px;font:inherit}' +
    '#xlivro .lv-ed .lv-bt{display:inline-block;padding:9px 14px;background:#c4a468;color:#0c223a;font-weight:700;border:0;border-radius:4px;cursor:pointer;margin-right:8px}' +
    '#xlivro .lv-ed .lv-st{display:block;margin-top:8px;color:#0c223a}';
  D.head.appendChild(css);

  function montar() {
    sec = D.createElement('section'); sec.id = 'xlivro';
    sec.innerHTML =
      '<div class="lv-ed"><b>Livro (folhear)</b><br>Título:<input type="text" class="lv-tit">' +
      '<label class="lv-bt">Enviar PDF<input type="file" accept="application/pdf" hidden></label>' +
      '<button type="button" class="lv-bt lv-sv">Salvar título</button>' +
      '<span class="lv-st">Salve suas outras alterações antes de enviar um PDF novo.</span></div>' +
      '<h2 class="lv-h"></h2><div class="lv-box"><div class="lv-book"></div></div>' +
      '<div class="lv-nav"><button type="button" class="lv-p" aria-label="Página anterior">‹</button><span class="lv-n"></span><button type="button" class="lv-x" aria-label="Próxima página">›</button></div>' +
      '<div class="lv-dica">Arraste o canto da página ou use as setas</div>';
    sec.querySelector('.lv-p').onclick = function () { flip && flip.flipPrev(); };
    sec.querySelector('.lv-x').onclick = function () { flip && flip.flipNext(); };
    sec.querySelector('input[type=file]').onchange = function () { if (this.files[0]) enviar(this.files[0]); this.value = ''; };
    sec.querySelector('.lv-sv').onclick = function () { gravar({ titulo: sec.querySelector('.lv-tit').value }); };
    posicionar();
    var a = alvo(); if (a) new MutationObserver(posicionar).observe(a.parentNode, { childList: true });
  }

  function contador() {
    if (!flip) return;
    var i = flip.getCurrentPageIndex(), n = flip.getPageCount();
    sec.querySelector('.lv-n').textContent = (i + 1) + ' / ' + n;
    sec.querySelector('.lv-p').disabled = i <= 0;
    sec.querySelector('.lv-x').disabled = i >= n - 1;
  }

  function desenhar(d) {
    var chave = JSON.stringify(d || null); if (chave === atual) return; atual = chave;
    var vazio = !d || !d.paginas || !d.paginas.length;
    sec.style.display = vazio && !D.body.classList.contains('edit') ? 'none' : '';
    sec.querySelector('.lv-h').textContent = (d && d.titulo) || '';
    sec.querySelector('.lv-tit').value = (d && d.titulo) || '';
    if (flip) { try { flip.destroy(); } catch (e) {} flip = null; }
    var box = sec.querySelector('.lv-box'); box.innerHTML = '<div class="lv-book"></div>';
    sec.querySelector('.lv-nav').style.display = vazio ? 'none' : '';
    sec.querySelector('.lv-dica').style.display = vazio ? 'none' : '';
    if (vazio) return;
    js(PF).then(function () {
      var im = new Image();
      im.onload = function () {
        var w = 450, h = Math.round(w * im.naturalHeight / im.naturalWidth);
        flip = new St.PageFlip(box.querySelector('.lv-book'), {
          width: w, height: h, size: 'stretch', minWidth: 240, maxWidth: 1000, minHeight: Math.round(240 * h / w), maxHeight: Math.round(1000 * h / w),
          showCover: true, usePortrait: true, mobileScrollSupport: true, maxShadowOpacity: 0.5, flippingTime: 800
        });
        flip.loadFromImages(d.paginas);
        flip.on('flip', contador); flip.on('changeOrientation', contador);
        contador();
      };
      im.src = d.paginas[0];
    });
  }

  function st(t) { sec.querySelector('.lv-st').textContent = t; }
  function h(extra) { var o = { apikey: KEY, Authorization: 'Bearer ' + KEY }; for (var k in extra) o[k] = extra[k]; return o; }

  function gravar(mudar) {
    st('Salvando…');
    return fetch(SB + '/rest/v1/batalhao_config?id=eq.2&select=data', { headers: h() }).then(function (r) { return r.json(); }).then(function (j) {
      var data = j[0].data, lv = data.livro || {};
      for (var k in mudar) lv[k] = mudar[k];
      data.livro = lv; data.rev = String(Date.now());
      return fetch(SB + '/rest/v1/batalhao_config?id=eq.2', { method: 'PATCH', headers: h({ 'Content-Type': 'application/json', Prefer: 'return=minimal' }), body: JSON.stringify({ data: data, updated_at: new Date().toISOString() }) });
    }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      st('Livro salvo. Recarregando a página…');
      setTimeout(function () { location.reload(); }, 1200);
    }).catch(function (e) { st('Erro ao salvar: ' + e.message); });
  }

  function enviar(arq) {
    st('Lendo o PDF…');
    js(PDFJS + 'pdf.min.js').then(function () {
      pdfjsLib.GlobalWorkerOptions.workerSrc = PDFJS + 'pdf.worker.min.js';
      return arq.arrayBuffer();
    }).then(function (buf) { return pdfjsLib.getDocument({ data: buf }).promise; }).then(function (pdf) {
      var base = 'livro-' + Date.now().toString(36) + '-p', urls = [], i = 0;
      function prox() {
        if (++i > pdf.numPages) return Promise.resolve();
        st('Preparando página ' + i + ' de ' + pdf.numPages + '…');
        return pdf.getPage(i).then(function (pg) {
          var v0 = pg.getViewport({ scale: 1 }), v = pg.getViewport({ scale: 1100 / v0.width });
          var c = D.createElement('canvas'); c.width = Math.round(v.width); c.height = Math.round(v.height);
          var x = c.getContext('2d'); x.fillStyle = '#fff'; x.fillRect(0, 0, c.width, c.height);
          return pg.render({ canvasContext: x, viewport: v }).promise.then(function () {
            return new Promise(function (ok) { c.toBlob(ok, 'image/jpeg', 0.82); });
          });
        }).then(function (b) {
          var nome = base + i + '.jpg';
          return fetch(SB + '/storage/v1/object/batalhao/' + nome, { method: 'POST', headers: h({ 'Content-Type': 'image/jpeg', 'x-upsert': 'true' }), body: b }).then(function (r) {
            if (!r.ok) throw new Error('envio da página ' + i + ' (HTTP ' + r.status + ')');
            urls.push(SB + '/storage/v1/object/public/batalhao/' + nome);
          });
        }).then(prox);
      }
      return prox().then(function () { return gravar({ paginas: urls }); });
    }).catch(function (e) { st('Erro: ' + e.message); });
  }

  function iniciar() {
    if (!alvo()) return setTimeout(iniciar, 300);
    if (!sec) montar();
    desenhar(dados());
    fetch(SB + '/rest/v1/batalhao_config?id=eq.2&select=livro:data->livro', { headers: h() }).then(function (r) { return r.json(); })
      .then(function (j) { if (j && j[0]) desenhar(j[0].livro); }).catch(function () {});
  }
  iniciar();
  var re = W.__xre; W.__xre = function () { if (re) re.apply(this, arguments); if (sec) desenhar(dados()); };
  new MutationObserver(function () { if (sec && atual === 'null') sec.style.display = D.body.classList.contains('edit') ? '' : 'none'; }).observe(D.body, { attributes: true, attributeFilter: ['class'] });
})();
