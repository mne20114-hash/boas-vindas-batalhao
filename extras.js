/* Editor completo (v2) — carregado do banco pelo rodapé da página, sem deploy. */
(function () {
  if (window.__x2) return; window.__x2 = 1;
  var D = document, B = D.body, W = window;
  var topo = W.top === W;
  function mk(t, a, h) { var e = D.createElement(t), k; for (k in (a || {})) e.setAttribute(k, a[k]); if (h != null) e.innerHTML = h; return e; }
  function $$(s, r) { return Array.prototype.slice.call((r || D).querySelectorAll(s)); }

  /* ================= modo celular (moldura de telefone no PC) ================= */
  if (topo && /[?&]celular/.test(location.search)) {
    var o = mk('div'); o.style.cssText = 'position:fixed;inset:0;z-index:99999;background:#1b1b1b;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px';
    var bx = mk('div', {}, '<a href="' + location.pathname + '" style="color:#fff;margin-right:14px">Sair do modo celular</a>'); bx.style.cssText = 'color:#fff;font:600 13px Montserrat,sans-serif';
    var fr = mk('iframe', { src: location.pathname + '?m=' + Date.now() });
    fr.style.cssText = 'width:390px;max-width:96vw;height:min(844px,calc(100vh - 70px));border:8px solid #000;border-radius:28px;background:#fff';
    [['Celular pequeno', 360], ['Celular', 390], ['Celular grande', 430], ['Tablet', 768]].forEach(function (w) {
      var b = mk('button', {}, w[0]); b.style.cssText = 'margin:0 3px;padding:4px 9px;border:0;background:#444;color:#fff;font:600 12px Montserrat,sans-serif;cursor:pointer';
      b.onclick = function () { fr.style.width = w[1] + 'px'; }; bx.appendChild(b);
    });
    o.appendChild(bx); o.appendChild(fr); B.appendChild(o); D.documentElement.style.overflow = 'hidden';
    return;
  }

  var FOOT = D.querySelector('[data-t=rodape]'); if (!FOOT) return;
  var MAIN = D.getElementById('pagina') || D.querySelector('main');
  var KS = '[data-t],[data-img],[data-x]';

  /* ================= configuração guardada no rodapé ================= */
  function holder() {
    var e = FOOT.querySelector('i[data-cfgx]');
    if (!e) { e = mk('i', { 'data-cfgx': '1' }); e.style.display = 'none'; FOOT.appendChild(e); }
    return e;
  }
  var cfg; try { cfg = JSON.parse(holder().textContent || '{}'); } catch (e) { cfg = {}; }
  ['add', 'del', 'sord', 'shid'].forEach(function (k) { cfg[k] = cfg[k] || []; });
  ['txt', 'st', 'stm', 'g', 'gm', 'ord', 'img', 'car'].forEach(function (k) { cfg[k] = cfg[k] || {}; });
  var dirty = false;
  function gravar() { holder().textContent = JSON.stringify(cfg); dirty = true; msg('Alterado — clique em Salvar'); }
  function msg(t) { var s = D.querySelector('#tb .st'); if (s) s.textContent = t; }
  function edit() { return B.classList.contains('edit'); }
  function K(el) { return el ? (el.dataset.t || el.dataset.img || el.dataset.x || '') : ''; }
  function byK(k) { return k ? D.querySelector('[data-t="' + k + '"],[data-img="' + k + '"],[data-x="' + k + '"]') : null; }
  var nkc = 0; function nk() { return 'x' + Date.now().toString(36) + (nkc++).toString(36) + Math.floor(Math.random() * 90 + 10); }

  /* protege os blocos técnicos do rodapé contra apagar sem querer */
  var guard = $$('style,img[onerror]', FOOT);
  FOOT.addEventListener('input', function () { guard.forEach(function (n) { if (!FOOT.contains(n)) FOOT.appendChild(n); }); holder(); gravar(); });

  /* ================= estrutura: unidades e seções ================= */
  function unit(el) { var c = el; while (c && c !== B && c.parentElement && !c.parentElement.matches('.col,.split .in,.card')) c = c.parentElement; return (c && c !== B && c.parentElement) ? c : null; }
  function uid(u) { return K(u) || K(u.querySelector(KS)); }
  function secs() { return $$(':scope > section', MAIN); }
  function secId(s) { return s.dataset.sid || K(s.querySelector(KS)); }
  function secBy(id) { return secs().filter(function (s) { return secId(s) === id; })[0]; }
  function secName(s) { var t = s.querySelector('h2,.pq,h3,p'); t = t ? t.textContent.replace(/\s+/g, ' ').trim() : ''; return t ? t.slice(0, 34) : '(seção de foto)'; }

  /* ================= estilos ================= */
  var st = mk('style');
  st.textContent =
    '#xbar{position:absolute;z-index:1002;display:none;gap:3px;background:#111;padding:3px;border-radius:3px;box-shadow:0 2px 8px rgba(0,0,0,.4);flex-wrap:wrap;max-width:420px}' +
    '#xbar button,#xmenu button{background:#333;color:#fff;border:0;padding:4px 8px;font:600 11px Montserrat,sans-serif;cursor:pointer;border-radius:2px}' +
    '#xbar button:hover,#xmenu button:hover{background:#c4a468;color:#111}#xbar button.x:hover{background:#c0392b;color:#fff}' +
    '#xmenu{display:none;flex-basis:100%;gap:3px;flex-wrap:wrap;padding-top:3px;border-top:1px solid #444}' +
    'body.edit .xcur{outline:2px solid #c4a468!important;outline-offset:3px}' +
    'body.edit .xnovo{outline:1px dashed rgba(196,164,104,.55);outline-offset:4px}' +
    '.xfoto{width:100%;aspect-ratio:16/9;background-color:#0c223a;background-size:cover;background-position:center;background-repeat:no-repeat}.xfoto[style*="background-image"]{background-color:transparent}body.edit .xfoto{cursor:pointer}' +
    '.xrow{display:flex;gap:1.5rem}.xrow>.xfoto{flex:1;min-width:0;aspect-ratio:4/3}@media(max-width:767px){.xrow{flex-direction:column;gap:1rem}}' +
    '.xvid iframe{display:block;width:100%;aspect-ratio:16/9;border:0;background:#000}.xvid.ig iframe{max-width:400px;height:640px;aspect-ratio:auto;margin:0 auto;background:#fff}' +
    'body.edit .xvid{padding:10px;background:rgba(196,164,104,.25)}' +
    '.xbw{text-align:center}.xbtn{display:inline-block;padding:14px 34px;background:#0c223a;color:#fff;text-decoration:none;font-weight:400;font-size:17px;letter-spacing:.03em}' +
    '.xsp{height:60px}body.edit .xsp{background:repeating-linear-gradient(45deg,rgba(196,164,104,.18),rgba(196,164,104,.18) 8px,transparent 8px,transparent 16px)}' +
    '.xhr{border:0;height:3px;width:120px;margin-left:auto;margin-right:auto;background:#c4a468}' +
    'main a{color:inherit}' +
    '#xfmt{flex-basis:100%;display:flex;gap:4px;flex-wrap:wrap;align-items:center;border-top:1px solid #333;padding-top:8px}' +
    '#tb #xfmt button{background:#333;color:#fff;padding:5px 9px;font:600 12px Montserrat,sans-serif;min-width:30px}#tb #xfmt button:hover{background:#c4a468;color:#111}' +
    '#xfmt i{width:1px;height:20px;background:#444;margin:0 4px}#xfmt label{font-size:11px;font-weight:400;gap:3px}' +
    '#xpan{position:fixed;z-index:998;top:0;right:0;bottom:0;width:330px;max-width:92vw;background:#181818;color:#eee;font:400 12px Montserrat,sans-serif;display:none;flex-direction:column;box-shadow:-3px 0 12px rgba(0,0,0,.5);padding-top:110px}' +
    '#xpan .tabs{display:flex}#xpan .tabs button{flex:1;background:#222;color:#bbb;border:0;padding:9px 2px;font:600 11px Montserrat,sans-serif;cursor:pointer}#xpan .tabs button.on{background:#c4a468;color:#111}' +
    '#xpan .body{flex:1;overflow:auto;padding:12px}#xpan h4{font:700 12px Montserrat,sans-serif;color:#c4a468;margin:14px 0 6px;text-transform:uppercase}#xpan h4:first-child{margin-top:0}' +
    '#xpan .row{display:flex;align-items:center;gap:4px;padding:5px 0;border-bottom:1px solid #2a2a2a}#xpan .row span{flex:1;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;cursor:pointer}' +
    '#xpan .row.off span{opacity:.4;text-decoration:line-through}' +
    '#xpan button.m,#xst button.m,#xmod button{background:#333;color:#fff;border:0;padding:4px 7px;font:600 11px Montserrat,sans-serif;cursor:pointer;border-radius:2px}#xpan button.m:hover,#xst button.m:hover{background:#c4a468;color:#111}' +
    '#xpan input,#xpan select,#xst input,#xst select,#xmod input{background:#2a2a2a;color:#fff;border:1px solid #444;padding:4px;font:400 12px Montserrat,sans-serif;width:64px}' +
    '#xpan table{width:100%;border-collapse:collapse}#xpan td,#xpan th{padding:3px 2px;text-align:left;font-weight:400}#xpan th{color:#999;font-size:10px}' +
    '#xpan p.h{color:#aaa;line-height:1.5;margin:0 0 8px;font-size:12px}' +
    '#xst{position:fixed;z-index:1003;left:12px;bottom:12px;width:300px;background:#181818;color:#eee;font:400 12px Montserrat,sans-serif;padding:12px;display:none;box-shadow:0 3px 14px rgba(0,0,0,.6);max-height:80vh;overflow:auto}' +
    '#xst label{display:flex;justify-content:space-between;align-items:center;gap:6px;margin:5px 0}#xst b{color:#c4a468}#xst input[type=color]{width:38px;height:24px;padding:0}#xst input[type=checkbox]{width:auto}' +
    '#xmod{position:fixed;inset:0;z-index:1005;background:rgba(0,0,0,.65);display:flex;align-items:center;justify-content:center}#xmod div{background:#181818;color:#eee;padding:18px;width:420px;max-width:92vw;font:400 13px Montserrat,sans-serif}' +
    '#xmod input{width:100%;margin:6px 0 12px;padding:8px}#xmod button{padding:8px 14px;margin-right:6px}#xmod button.ok{background:#c4a468;color:#111}';
  D.head.appendChild(st);
  var dyn = mk('style', { id: 'xdyn' }); D.head.appendChild(dyn);

  /* tipografia e espaçamentos globais: [chave, rótulo, seletor, propriedades, unidade] */
  var G = [
    ['h1', 'Título da capa', '.cover h1', ['font-size'], 'px'],
    ['sub', 'Subtítulo da capa', '.cover .head p', ['font-size'], 'px'],
    ['h2', 'Títulos', 'main h2', ['font-size'], 'px'],
    ['h3', 'Subtítulos', 'main h3', ['font-size'], 'px'],
    ['p', 'Texto', 'main .col p,main .in p', ['font-size'], 'px'],
    ['bq', 'Citações', 'main blockquote', ['font-size'], 'px'],
    ['cap', 'Legendas', 'main .cap', ['font-size'], 'px'],
    ['pq', 'Texto das faixas', 'main .pq', ['font-size'], 'px'],
    ['pad', 'Margem lateral %', 'main .col', ['padding-left', 'padding-right'], '%'],
    ['gap', 'Espaço entre blocos', 'main .col>*+*', ['margin-top'], 'px'],
    ['sp', 'Respiro das seções', 'main .sec.pt,main .sec.pb', ['padding-top', 'padding-bottom'], 'px'],
    ['win', 'Altura das faixas (vh)', 'main .window', ['height'], 'vh']
  ];
  var P = { al: ['text-align', ''], cor: ['color', ''], bg: ['background-color', ''], fs: ['font-size', 'px'], fw: ['font-weight', ''], lh: ['line-height', ''], mt: ['margin-top', 'px'], mb: ['margin-bottom', 'px'], pd: ['padding', 'px'], w: ['width', '%'], h: ['height', 'px'], ar: ['aspect-ratio', ''], br: ['border-radius', 'px'] };
  function sel(k) { return 'html body [data-t="' + k + '"],html body [data-img="' + k + '"],html body [data-x="' + k + '"]'; }
  function rules(o) {
    var r = '', k; for (k in o) { if (!P[k] || o[k] === '' || o[k] == null) continue; r += P[k][0] + ':' + o[k] + P[k][1] + '!important;'; if (k === 'w') r += 'margin-left:calc((100% - ' + o[k] + '%)/2)!important;margin-right:0!important;max-width:none!important;'; if (k === 'h') r += 'aspect-ratio:auto!important;'; }
    return r;
  }
  function css() {
    var a = '', m = '', pc = '', k;
    G.forEach(function (g) {
      [[cfg.g, 0], [cfg.gm, 1]].forEach(function (x) {
        var v = x[0][g[0]]; if (v === '' || v == null) return;
        var r = g[2] + '{' + g[3].map(function (p) { return p + ':' + v + g[4] + '!important'; }).join(';') + '}';
        if (x[1]) m += r; else a += r;
      });
    });
    if (cfg.g.cvs) a += '.cvs-t{animation-duration:' + (cfg.g.cvs * 3) + 's!important}';
    if (cfg.g.bg) a += 'main .sec,main .sp,main .split{background-color:' + cfg.g.bg + '!important}';
    for (k in cfg.st) {
      var r1 = rules(cfg.st[k]); if (r1) a += sel(k) + '{' + r1 + '}';
      if (cfg.st[k].hm) m += 'body:not(.edit) ' + sel(k).split(',').join(',body:not(.edit) ').replace(/html body /g, '') + '{display:none!important}';
      if (cfg.st[k].hd) pc += 'body:not(.edit) ' + sel(k).split(',').join(',body:not(.edit) ').replace(/html body /g, '') + '{display:none!important}';
    }
    for (k in cfg.stm) { var r2 = rules(cfg.stm[k]); if (r2) m += sel(k) + '{' + r2 + '}'; }
    dyn.textContent = a + '@media(max-width:767px){' + m + '}@media(min-width:768px){' + pc + '}';
    if (cfg.g.title) D.title = cfg.g.title;
  }

  /* ================= criar blocos ================= */
  function embed(u) {
    var m;
    if ((m = u.match(/(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{6,})/))) return ['https://www.youtube.com/embed/' + m[1], ''];
    if ((m = u.match(/instagram\.com\/(?:reel|p|tv)\/([\w-]+)/))) return ['https://www.instagram.com/reel/' + m[1] + '/embed/', 'ig'];
    if ((m = u.match(/vimeo\.com\/(\d+)/))) return ['https://player.vimeo.com/video/' + m[1], ''];
    return [u, ''];
  }
  function tx(tag, cls, k, def) { var e = mk(tag, { 'data-x': k, 'data-xt': '1', 'class': cls }); e.innerHTML = cfg.txt[k] != null ? cfg.txt[k] : def; return e; }
  function foto(k) { var e = mk('div', { 'class': 'xfoto', 'data-img': k, 'data-xi': '1' }); if (cfg.img[k]) e.style.backgroundImage = 'url(' + cfg.img[k] + ')'; return e; }
  function criar(n) {
    if (D.querySelector('[data-xk="' + n.k + '"]')) return true;
    var no, i;
    if (n.tipo === 'S' || n.tipo === 'W') {
      var as = n.apos === '^' ? null : secBy(n.apos); if (n.apos !== '^' && !as) return false;
      if (n.tipo === 'S') {
        no = mk('section', { 'class': 'sec pt pb', 'data-sid': n.k }); var c = mk('div', { 'class': 'col' });
        c.appendChild(tx('h2', 'rv in', n.k + 'h', 'Novo título')); c.appendChild(tx('p', 'rv in', n.k + 'p', 'Novo texto')); no.appendChild(c);
      } else {
        no = mk('section', { 'class': 'window fx', 'data-sid': n.k });
        var bg = mk('div', { 'class': 'bg', 'data-img': n.k + 'b', 'data-xi': '1' }); if (cfg.img[n.k + 'b']) bg.style.backgroundImage = 'url(' + cfg.img[n.k + 'b'] + ')';
        var pw = mk('div', { 'class': 'pqw rv sl in' }); pw.appendChild(tx('div', 'pq', n.k + 'q', 'NOVA FAIXA')); no.appendChild(bg); no.appendChild(pw);
      }
      no.setAttribute('data-xk', n.k);
      if (as) MAIN.insertBefore(no, as.nextSibling); else MAIN.insertBefore(no, secs()[0] || null);
      return true;
    }
    var anc = byK(n.apos); if (!anc) return false;
    var T = { t: ['p', 'rv in', 'Novo texto'], h: ['h2', 'rv in', 'Novo título'], h3: ['h3', 'rv in', 'Novo subtítulo'], q: ['blockquote', 'rv in', 'Nova citação'], c: ['div', 'cap', 'Nova legenda'] };
    if (T[n.tipo]) no = tx(T[n.tipo][0], T[n.tipo][1] + ' xnovo', n.k, T[n.tipo][2]);
    else if (n.tipo === 'f') { no = mk('div', { 'class': 'fig xnovo', contenteditable: 'false' }); no.appendChild(foto(n.k)); }
    else if (n.tipo === 'g') { no = mk('div', { 'class': 'xrow xnovo', contenteditable: 'false', 'data-x': n.k }); for (i = 1; i <= (n.n || 2); i++) no.appendChild(foto(n.k + '-' + i)); }
    else if (n.tipo === 'v') { var em = embed(n.url || ''); no = mk('div', { 'class': 'xvid xnovo ' + em[1], 'data-x': n.k, contenteditable: 'false' }); no.appendChild(mk('iframe', { src: em[0], loading: 'lazy', allowfullscreen: '', scrolling: 'no' })); }
    else if (n.tipo === 'b') { no = mk('div', { 'class': 'xbw xnovo', 'data-x': n.k }); var a = tx('a', 'xbtn', n.k + 't', 'Texto do botão'); a.href = n.url || '#'; a.target = '_blank'; a.rel = 'noopener'; no.appendChild(a); }
    else if (n.tipo === 'e') no = mk('div', { 'class': 'xsp xnovo', 'data-x': n.k });
    else if (n.tipo === 'd') no = mk('hr', { 'class': 'xhr xnovo', 'data-x': n.k });
    else return true;
    no.setAttribute('data-xk', n.k);
    var ref = unit(anc);
    if (ref) ref.parentNode.insertBefore(no, ref.nextSibling);
    else { /* âncora fora de coluna de texto (faixa/capa): entra no início da próxima seção de texto */
      var s = anc.closest('section,header'), c2 = null;
      while (s && !(c2 = s.querySelector('.col'))) s = s.nextElementSibling;
      if (!c2 && s == null) c2 = D.querySelector('main .col');
      if (!c2) return true; c2.insertBefore(no, c2.firstChild);
    }
    return true;
  }
  function ocultar(k, v) { var el = byK(k) || D.querySelector('[data-xk="' + k + '"]'); if (!el) return; var u = el.closest('[data-xk]') || el.closest('.fig') || el; u.style.display = v ? 'none' : ''; }

  function ordem() {
    if (cfg.sord.length) {
      var atual = secs().map(secId).filter(function (i) { return cfg.sord.indexOf(i) >= 0; }).join('|');
      var alvoO = cfg.sord.filter(function (i) { return secBy(i); }).join('|');
      var ultimo = secs().slice(-alvoO.split('|').length).map(secId).join('|');
      if (atual !== alvoO || ultimo !== alvoO) cfg.sord.forEach(function (id) { var s = secBy(id); if (s) MAIN.appendChild(s); });
    }
    secs().forEach(function (s) { s.style.display = cfg.shid.indexOf(secId(s)) >= 0 && !edit() ? 'none' : ''; s.style.opacity = cfg.shid.indexOf(secId(s)) >= 0 && edit() ? '.3' : ''; });
    var id; for (id in cfg.ord) {
      var s2 = secBy(id); if (!s2) continue; var c = s2.querySelector('.col,.in,.card'); if (!c) continue;
      var map = {}; $$(':scope > *', c).forEach(function (u) { var i = uid(u); if (i) map[i] = u; });
      var want = cfg.ord[id].filter(function (i) { return map[i]; }), have = $$(':scope > *', c).map(uid).filter(function (i) { return want.indexOf(i) >= 0; });
      var fim = $$(':scope > *', c).slice(-want.length).map(uid).join('|');
      if (have.join('|') !== want.join('|') || fim !== want.join('|')) want.forEach(function (i) { c.appendChild(map[i]); });
    }
  }
  function salvaOrdem(col) { var s = col.closest('section'); if (!s) return; cfg.ord[secId(s)] = $$(':scope > *', col).map(uid).filter(Boolean); }

  /* carrossel dentro de uma foto: cfg.car = {chaveDaFoto: {n: fotos, s: segundos, fade: 1}} */
  function carros() {
    var st = D.getElementById('xcar'); if (!st) { st = mk('style', { id: 'xcar' }); D.head.appendChild(st); }
    var a = '.sec>.col>*{position:relative}.xcar{position:relative;overflow:hidden}.xcar-t{position:absolute;inset:0;display:flex;height:100%}.xcar-t>div{flex:0 0 auto;height:100%;aspect-ratio:auto!important;background-color:#0c223a;background-size:cover;background-position:center;background-repeat:no-repeat}' +
      '.xcar-fade{-webkit-mask-image:linear-gradient(to bottom,#000 62%,transparent 100%);mask-image:linear-gradient(to bottom,#000 62%,transparent 100%)}' +
      'body.edit .xcar-t{animation:none!important}.xcar-nav{display:none}body.edit .xcar-nav{display:flex;gap:4px;position:absolute;left:50%;bottom:8px;transform:translateX(-50%);z-index:3}.xcar-nav button{width:28px;height:28px;border-radius:50%;border:1px solid #fff;background:rgba(0,0,0,.6);color:#fff;font:600 13px Montserrat,sans-serif;cursor:pointer;padding:0}.xcar-nav button.on{background:#c4a468;color:#0c223a}';
    Object.keys(cfg.car).forEach(function (k, ix) {
      var c = cfg.car[k], n = c.n || 4, seg = c.s || 3, el = byK(k); if (!el) return;
      var nm = 'xcar' + ix, kf = '@keyframes ' + nm + '{', i, p = 100 / n, mv = Math.min(p * .2, 100 * .7 / (n * seg));
      for (i = 0; i < n; i++) kf += (i * p).toFixed(3) + '%,' + ((i + 1) * p - mv).toFixed(3) + '%{transform:translateX(-' + (i * 100 / (n + 1)).toFixed(4) + '%)}';
      kf += '100%{transform:translateX(-' + (n * 100 / (n + 1)).toFixed(4) + '%)}}';
      a += kf + '.' + nm + '{width:' + ((n + 1) * 100) + '%;animation:' + nm + ' ' + (n * seg) + 's infinite ease-in-out}.' + nm + '>div{width:' + (100 / (n + 1)).toFixed(4) + '%}';
      if (el.querySelector('.xcar-t')) return;
      el.classList.add('xcar'); if (c.fade) el.classList.add('xcar-fade');
      var t = mk('div', { 'class': 'xcar-t ' + nm });
      for (i = 1; i <= n; i++) t.appendChild(mk('div', { 'data-img': k + '-c' + i, 'data-xi': '1' }));
      var d = mk('div', { 'class': 'dup', 'data-xi': '1', 'data-xdup': k + '-c1' }); t.appendChild(d);
      el.appendChild(t);
      var nav = mk('div', { 'class': 'xcar-nav', contenteditable: 'false' });
      for (i = 0; i < n; i++) nav.appendChild(mk('button', { type: 'button', 'data-i': i, title: 'Mostrar foto ' + (i + 1) }, String(i + 1)));
      nav.firstChild.className = 'on';
      nav.addEventListener('click', function (e) {
        e.stopPropagation(); e.preventDefault(); var b = e.target.closest('button'); if (!b) return;
        t.style.transform = 'translateX(-' + (b.dataset.i * 100 / (n + 1)) + '%)';
        $$('button', nav).forEach(function (x) { x.className = x === b ? 'on' : ''; });
      });
      ['mousedown', 'mouseup'].forEach(function (ev) { nav.addEventListener(ev, function (e) { e.stopPropagation(); }); });
      el.appendChild(nav);
    });
    st.textContent = a;
  }

  /* PNG com fundo transparente: o editor base converte tudo para JPEG; aqui mantemos PNG quando o arquivo escolhido tem transparência possível */
  (function () {
    var tipo = '';
    var cou = URL.createObjectURL; URL.createObjectURL = function (f) { if (f && typeof f.type === 'string' && f.type.indexOf('image/') === 0) tipo = f.type; return cou.apply(URL, arguments); };
    var orig = HTMLCanvasElement.prototype.toBlob;
    HTMLCanvasElement.prototype.toBlob = function (cb, t, q) {
      if (t === 'image/jpeg' && /png|webp|gif/.test(tipo)) {
        /* só mantém PNG se a imagem tiver mesmo partes transparentes; foto comum em PNG fica pesada demais */
        var transp = false;
        try { var px = this.getContext('2d').getImageData(0, 0, this.width, this.height).data, i; for (i = 3; i < px.length; i += 16) if (px[i] < 250) { transp = true; break; } } catch (e) { transp = true; }
        if (transp) return orig.call(this, cb, 'image/png');
      }
      return orig.call(this, cb, t, q);
    };
  })();

  /* trava de versão: se a página foi alterada no banco depois que esta aba carregou, salvar daqui apagaria essas alterações */
  (function () {
    var livre = false;
    D.addEventListener('click', function (e) {
      var sv = e.target.closest && e.target.closest('#sv'); if (!sv) return;
      if (livre) { livre = false; return; }
      if (!salvo) return;
      e.stopImmediatePropagation(); e.preventDefault();
      api('?id=eq.2&select=rev:data->>rev').then(function (r) { return r.json(); }).then(function (j) {
        var atual = String((j[0] || {}).rev || ''), meu = String(salvo.rev || '');
        if (atual === meu) { livre = true; sv.click(); return; }
        var w = D.getElementById('xrev'); if (!w) { w = mk('div', { id: 'xrev', style: 'position:fixed;inset:0;z-index:99999;background:rgba(0,0,0,.75);display:flex;align-items:center;justify-content:center;padding:20px' }); D.body.appendChild(w); }
        w.innerHTML = '<div style="background:#fff;color:#0c223a;max-width:420px;padding:22px;border-radius:8px;font:15px/1.5 Montserrat,sans-serif"><b>Esta aba está desatualizada.</b><br>A página recebeu uma atualização depois que você abriu esta aba. Para não apagar essa atualização, o salvamento foi bloqueado. Recarregue a página e refaça a alteração que estava fazendo.<div style="margin-top:14px;display:flex;gap:8px"><button id=xrev1 style="padding:8px 14px;background:#c4a468;border:0;font-weight:600;cursor:pointer">Recarregar agora</button><button id=xrev2 style="padding:8px 14px;background:#eee;border:0;cursor:pointer">Fechar</button></div></div>';
        w.style.display = 'flex';
        D.getElementById('xrev1').onclick = function () { dirty = false; location.reload(); };
        D.getElementById('xrev2').onclick = function () { w.style.display = 'none'; };
      }).catch(function () { livre = true; sv.click(); });
    }, true);
  })();

  function aplicar() {
    var resta = cfg.add.slice(), v = 0;
    while (resta.length && v++ < 30) resta = resta.filter(function (n) { return !criar(n); });
    carros();
    cfg.del.forEach(function (k) { ocultar(k, 1); });
    ordem(); css(); modo();
  }

  /* ================= banco: fotos dos blocos novos e histórico ================= */
  var KEY = W.CONFIG ? CONFIG.SUPABASE_ANON_KEY : '', URL0 = W.CONFIG ? CONFIG.SUPABASE_URL + '/rest/v1/batalhao_config' : '';
  function api(q, o) { o = o || {}; o.headers = { apikey: KEY, Authorization: 'Bearer ' + KEY, 'Content-Type': 'application/json' }; return fetch(URL0 + q, o); }
  var salvo = null;
  function semJs(d) { var c = JSON.parse(JSON.stringify(d)); delete c.js; return c; }
  function fotosDoBanco() {
    return (W.__cfgRow ? Promise.resolve(W.__cfgRow) : api('?id=eq.2&select=data').then(function (r) { return r.json(); })).then(function (j) {
      var d = (j[0] || {}).data || {}; salvo = d; var I = d.imgs || {}, Pp = d.imgpos || {};
      $$('[data-xi]').forEach(function (el) {
        var k = el.dataset.img || el.dataset.xdup, u = I[k]; if (!u) return;
        el.style.backgroundImage = 'url(' + u + ')';
        var p = Pp[k]; if (p) { el.style.backgroundSize = p.s == 100 ? 'cover' : p.s + '%'; el.style.backgroundPosition = p.x + '% ' + p.y + '%'; }
      });
    }).catch(function () { });
  }
  function backup() {
    if (!salvo) return;
    var id = Math.floor(Date.now() / 1000);
    api('', { method: 'POST', body: JSON.stringify({ id: id, data: semJs(salvo), updated_at: new Date().toISOString() }) })
      .then(function () { return api('?id=gt.1000&select=id&order=id.desc&offset=15'); }).then(function (r) { return r.json(); })
      .then(function (old) { (old || []).forEach(function (o) { api('?id=eq.' + o.id, { method: 'DELETE' }); }); }).catch(function () { });
    setTimeout(fotosDoBanco, 4000);
  }
  function restaurar(d) { if (salvo && salvo.js) d.js = salvo.js; return api('?id=eq.2', { method: 'PATCH', body: JSON.stringify({ data: d }) }).then(function () { dirty = false; location.reload(); }); }

  /* ================= desfazer ================= */
  var hist = [];
  function des(fn) { hist.push(fn); if (hist.length > 40) hist.shift(); }
  function desfazer() { var f = hist.pop(); if (f) { f(); gravar(); painel(); } else msg('Nada para desfazer'); }

  /* ================= janela de pergunta ================= */
  function ask(tit, campos, cb, okTxt) {
    var m = mk('div', { id: 'xmod' }), d = mk('div', {}, '<b>' + tit + '</b><br><br>');
    var ins = campos.map(function (c) { d.appendChild(mk('span', {}, c[0])); var i = mk('input', { value: c[1] || '', placeholder: c[2] || '' }); d.appendChild(i); return i; });
    var ok = mk('button', { 'class': 'ok' }, okTxt || 'OK'), no = mk('button', {}, 'Cancelar');
    ok.onclick = function () { m.remove(); cb(ins.map(function (i) { return i.value.trim(); })); }; no.onclick = function () { m.remove(); };
    d.appendChild(ok); d.appendChild(no); m.appendChild(d); B.appendChild(m); if (ins[0]) ins[0].focus();
  }

  /* ================= formatação de texto ================= */
  var lastR = null, cur = null;
  D.addEventListener('selectionchange', function () {
    var s = getSelection(); if (!s.rangeCount) return; var n = s.anchorNode; n = n && (n.nodeType === 1 ? n : n.parentElement);
    if (n && n.closest('[contenteditable=true]') && !n.closest('#tb,#xpan,#xst,#xmod')) { lastR = s.getRangeAt(0).cloneRange(); marca(n.closest(KS)); }
  });
  function marca(el) { if (!el || el === cur) return; if (cur) cur.classList.remove('xcur'); cur = el; cur.classList.add('xcur'); if (D.getElementById('xst').style.display === 'block') estilo(cur); }
  function volta() { if (!lastR) return false; var s = getSelection(); s.removeAllRanges(); s.addRange(lastR); return true; }
  function cmd(c, v) { if (!volta()) return; D.execCommand('styleWithCSS', false, true); D.execCommand(c, false, v == null ? null : v); toca(); }
  function toca() { var n = lastR && lastR.commonAncestorContainer; n = n && (n.nodeType === 1 ? n : n.parentElement); var h = n && n.closest('[data-xt]'); if (h) cfg.txt[h.dataset.x] = h.innerHTML; dirty = true; msg('Alterado — clique em Salvar'); }
  function fonte(passo) {
    if (!volta()) return; var r = lastR, n = r.commonAncestorContainer, host = (n.nodeType === 1 ? n : n.parentElement).closest('[contenteditable=true]'); if (!host) return;
    var lim = function (v) { return Math.min(120, Math.max(8, Math.round(v))); };
    if (r.collapsed) {
      var sp = host.querySelector(':scope > span[data-fs]');
      if (!sp) { sp = mk('span', { 'data-fs': '1' }); while (host.firstChild) sp.appendChild(host.firstChild); host.appendChild(sp); }
      sp.style.fontSize = lim((parseFloat(sp.style.fontSize) || parseFloat(getComputedStyle(host).fontSize)) + passo) + 'px';
    } else {
      var base = r.startContainer.nodeType === 1 ? r.startContainer : r.startContainer.parentElement, s2 = mk('span');
      s2.style.fontSize = lim(parseFloat(getComputedStyle(base).fontSize) + passo) + 'px'; s2.appendChild(r.extractContents()); r.insertNode(s2);
      var nr = D.createRange(); nr.selectNodeContents(s2); lastR = nr; volta();
    }
    toca();
  }
  function alinhar(v) { if (!cur) return; setSt(K(cur), 'al', v); }
  function setSt(k, p, v, mob) {
    var o = mob ? cfg.stm : cfg.st, ant = JSON.stringify(o[k] || {});
    o[k] = o[k] || {}; if (v === '' || v == null || v === false) delete o[k][p]; else o[k][p] = v;
    des(function () { o[k] = JSON.parse(ant); css(); }); css(); gravar();
  }
  function barraFmt() {
    var tb = D.getElementById('tb'); if (!tb || D.getElementById('xfmt')) return;
    var f = mk('div', { id: 'xfmt' });
    function b(t, tip, fn) { var x = mk('button', { title: tip }, t); x.onmousedown = function (e) { e.preventDefault(); }; x.onclick = fn; f.appendChild(x); return x; }
    function sep() { f.appendChild(mk('i')); }
    b('<b>N</b>', 'Negrito', function () { cmd('bold'); }); b('<i style="all:unset;font-style:italic">I</i>', 'Itálico', function () { cmd('italic'); });
    b('<u>S</u>', 'Sublinhado', function () { cmd('underline'); }); b('<s>T</s>', 'Riscado', function () { cmd('strikeThrough'); }); sep();
    b('A+', 'Aumentar fonte', function () { fonte(2); }); b('A−', 'Diminuir fonte', function () { fonte(-2); });
    [['Cor', 'foreColor', '#0c223a'], ['Marca', 'hiliteColor', '#fff3a3']].forEach(function (c) {
      var l = mk('label', {}, c[0]), i = mk('input', { type: 'color', value: c[2] }); i.oninput = function () { cmd(c[1], i.value); }; l.appendChild(i); f.appendChild(l);
    }); sep();
    b('⟸', 'Alinhar à esquerda', function () { alinhar('left'); }); b('≡', 'Centralizar', function () { alinhar('center'); });
    b('⟹', 'Alinhar à direita', function () { alinhar('right'); }); b('☰', 'Justificar', function () { alinhar('justify'); }); sep();
    b('• Lista', 'Lista com marcadores', function () { cmd('insertUnorderedList'); }); b('1. Lista', 'Lista numerada', function () { cmd('insertOrderedList'); });
    b('Link', 'Transformar o texto selecionado em link', function () {
      ask('Link do texto selecionado', [['Endereço (URL)', 'https://']], function (v) { if (!v[0]) return; cmd('createLink', v[0]); $$('main a:not([target])').forEach(function (a) { a.target = '_blank'; a.rel = 'noopener'; }); toca(); });
    });
    b('Tirar link', 'Remover link', function () { cmd('unlink'); }); b('Limpar', 'Remover formatação', function () { cmd('removeFormat'); }); sep();
    b('↶ Desfazer', 'Desfazer a última mudança de estrutura ou estilo', desfazer);
    b('Painel', 'Seções, estilo geral, histórico e ajuda', function () { var p = D.getElementById('xpan'); p.style.display = p.style.display === 'flex' ? 'none' : 'flex'; painel(); });
    b(topo ? 'Modo celular' : 'Sair do celular', 'Ver e editar como no celular', function () { W.top.location.href = location.pathname + (topo ? '?celular' : ''); });
    tb.appendChild(f);
    var rs = D.getElementById('rs'); if (rs) { rs.textContent = 'Histórico'; rs.onclick = function () { D.getElementById('xpan').style.display = 'flex'; aba = 'h'; painel(); }; }
    var old = D.getElementById('selTb'); if (old) old.remove();
    var sv = D.getElementById('sv'); if (sv) sv.addEventListener('click', function () { dirty = false; backup(); }, true);
  }

  /* ================= barra flutuante do bloco ================= */
  var bar = mk('div', { id: 'xbar' }), alvo = null;
  bar.innerHTML = '<button data-a=up title="Subir">↑</button><button data-a=dn title="Descer">↓</button><button data-a=dup>duplicar</button><button data-a=ins>+ inserir</button><button data-a=sty>estilo</button><button data-a=url>link</button><button data-a=x class=x>apagar</button>' +
    '<div id=xmenu>' + [['t', 'Texto'], ['h', 'Título'], ['h3', 'Subtítulo'], ['q', 'Citação'], ['c', 'Legenda'], ['f', 'Foto'], ['g2', '2 fotos'], ['g3', '3 fotos'], ['v', 'Vídeo'], ['b', 'Botão'], ['e', 'Espaço'], ['d', 'Linha']].map(function (x) { return '<button data-n=' + x[0] + '>' + x[1] + '</button>'; }).join('') + '</div>';
  B.appendChild(bar);
  D.addEventListener('mouseover', function (e) {
    if (!edit()) { bar.style.display = 'none'; return; }
    if (e.target.closest('#xbar,#tb,#selTb,#imgModal,#xpan,#xst,#xmod')) return;
    var el = e.target.closest(KS); if (!el || el === FOOT || el.closest('[data-t=rodape]')) return;
    if (el === alvo && bar.style.display === 'flex') return;
    alvo = el; D.getElementById('xmenu').style.display = 'none';
    bar.querySelector('[data-a=url]').style.display = el.closest('.xvid,.xbw') ? '' : 'none';
    var r = (unit(el) || el).getBoundingClientRect();
    bar.style.display = 'flex'; bar.style.left = Math.max(4, Math.min(r.left + scrollX, innerWidth - 430)) + 'px'; bar.style.top = Math.max(4, r.top + scrollY - 30) + 'px';
  });
  D.addEventListener('click', function (e) { if (edit() && e.target.closest('a.xbtn')) e.preventDefault(); var el = edit() && !e.target.closest('#xbar,#tb,#xpan,#xst,#xmod,#imgModal') && e.target.closest(KS); if (el) marca(el); }, true);

  function novo(tipo, extra) {
    var n = { k: nk(), apos: K(alvo), tipo: tipo }, x; for (x in (extra || {})) n[x] = extra[x];
    cfg.add.push(n); criar(n);
    var no = D.querySelector('[data-xk="' + n.k + '"]'); if (no && no.parentElement.matches('.col,.in,.card')) salvaOrdem(no.parentElement);
    des(function () { cfg.add = cfg.add.filter(function (y) { return y !== n; }); var e = D.querySelector('[data-xk="' + n.k + '"]'); if (e) e.remove(); });
    gravar(); modo(); return n;
  }
  bar.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b || !alvo) return; e.preventDefault(); e.stopPropagation();
    var a = b.dataset.a, t = b.dataset.n, k = K(alvo), u = unit(alvo);
    if (t) {
      D.getElementById('xmenu').style.display = 'none';
      if (t === 'v') ask('Vídeo', [['Link do YouTube, Instagram ou Vimeo', '', 'https://...']], function (v) { if (v[0]) novo('v', { url: v[0] }); });
      else if (t === 'b') ask('Botão', [['Endereço que o botão abre', 'https://']], function (v) { novo('b', { url: v[0] || '#' }); });
      else if (t === 'g2' || t === 'g3') novo('g', { n: +t[1] });
      else novo(t);
      return;
    }
    if (a === 'ins') { var m = D.getElementById('xmenu'); m.style.display = m.style.display === 'flex' ? 'none' : 'flex'; return; }
    if (a === 'sty') { marca(alvo); estilo(alvo); return; }
    if (a === 'url') {
      var xk = alvo.closest('[data-xk]'); if (!xk) return; var n = cfg.add.filter(function (y) { return y.k === xk.dataset.xk; })[0]; if (!n) return;
      ask('Alterar link', [['Endereço', n.url || '']], function (v) { n.url = v[0]; var f = xk.querySelector('iframe'), l = xk.querySelector('a'); if (f) { var em = embed(v[0]); f.src = em[0]; xk.classList.toggle('ig', em[1] === 'ig'); } if (l) l.href = v[0]; gravar(); }); return;
    }
    if (a === 'x') { cfg.del.push(k); ocultar(k, 1); des(function () { cfg.del = cfg.del.filter(function (y) { return y !== k; }); ocultar(k, 0); }); bar.style.display = 'none'; gravar(); painel(); return; }
    if (a === 'dup') {
      var tag = alvo.tagName, tp = alvo.matches('.xfoto,.fig img,.g,.bg') ? 'f' : tag === 'H2' ? 'h' : tag === 'H3' ? 'h3' : tag === 'BLOCKQUOTE' ? 'q' : alvo.matches('.cap') ? 'c' : alvo.matches('p,[data-xt]') ? 't' : null;
      if (!tp) { msg('Este bloco não pode ser duplicado'); return; }
      var nn = novo(tp), ne = byK(nn.k);
      if (tp === 'f') { var src = alvo.tagName === 'IMG' ? alvo.src : (alvo.style.backgroundImage.match(/url\(["']?(.*?)["']?\)/) || [])[1]; if (src) { cfg.img[nn.k] = src; ne.style.backgroundImage = 'url(' + src + ')'; } }
      else { cfg.txt[nn.k] = alvo.innerHTML; ne.innerHTML = alvo.innerHTML; }
      gravar(); return;
    }
    if ((a === 'up' || a === 'dn') && u) {
      var p = u.parentElement, vis = function (x, dir) { do { x = dir < 0 ? x.previousElementSibling : x.nextElementSibling; } while (x && x.style.display === 'none'); return x; };
      var o = a === 'up' ? vis(u, -1) : vis(u, 1); if (!o) return;
      var ant = $$(':scope > *', p);
      if (a === 'up') p.insertBefore(u, o); else p.insertBefore(o, u);
      salvaOrdem(p); des(function () { ant.forEach(function (x) { p.appendChild(x); }); salvaOrdem(p); }); gravar();
      var r = u.getBoundingClientRect(); bar.style.top = Math.max(4, r.top + scrollY - 30) + 'px';
    } else if (a === 'up' || a === 'dn') msg('Este bloco não se move sozinho — mova a seção pelo Painel');
  });

  /* ================= estilo do bloco ================= */
  var xs = mk('div', { id: 'xst' }); B.appendChild(xs); var mob = false;
  function estilo(el) {
    var k = K(el), o = (mob ? cfg.stm : cfg.st)[k] || {}, base = cfg.st[k] || {};
    function num(p, l, ph) { return '<label>' + l + '<input type=number data-p=' + p + ' value="' + (o[p] == null ? '' : o[p]) + '" placeholder="' + (ph || 'padrão') + '"></label>'; }
    function corI(p, l) { return '<label>' + l + '<span><input type=color data-p=' + p + ' value="' + (o[p] || '#000000') + '"> <button class=m data-clr=' + p + '>padrão</button></span></label>'; }
    xs.innerHTML = '<label><b>Estilo do bloco</b><button class=m data-fechar=1>fechar</button></label>' +
      '<label>Aplicar em<select data-esc=1 style="width:150px"><option value=0>Todos os tamanhos</option><option value=1' + (mob ? ' selected' : '') + '>Só no celular</option></select></label>' +
      '<label>Alinhamento<select data-p=al style="width:110px">' + [['', 'padrão'], ['left', 'esquerda'], ['center', 'centro'], ['right', 'direita'], ['justify', 'justificado']].map(function (x) { return '<option value="' + x[0] + '"' + (o.al === x[0] ? ' selected' : '') + '>' + x[1] + '</option>'; }).join('') + '</select></label>' +
      num('fs', 'Tamanho da fonte (px)') +
      '<label>Peso da fonte<select data-p=fw style="width:110px">' + [['', 'padrão'], ['100', 'fina'], ['300', 'leve'], ['400', 'normal'], ['700', 'negrito']].map(function (x) { return '<option value="' + x[0] + '"' + (o.fw === x[0] ? ' selected' : '') + '>' + x[1] + '</option>'; }).join('') + '</select></label>' +
      num('lh', 'Altura da linha', 'ex.: 1.5') + corI('cor', 'Cor do texto') + corI('bg', 'Cor de fundo') +
      num('mt', 'Espaço acima (px)') + num('mb', 'Espaço abaixo (px)') + num('pd', 'Espaço interno (px)') +
      num('w', 'Largura (%)', '100') + num('h', 'Altura (px)') +
      '<label>Proporção (fotos)<select data-p=ar style="width:110px">' + [['', 'padrão'], ['16/9', '16:9'], ['4/3', '4:3'], ['1/1', 'quadrada'], ['3/4', '3:4'], ['9/16', '9:16']].map(function (x) { return '<option value="' + x[0] + '"' + (o.ar === x[0] ? ' selected' : '') + '>' + x[1] + '</option>'; }).join('') + '</select></label>' +
      num('br', 'Cantos arredondados (px)') +
      '<label>Ocultar no celular<input type=checkbox data-h=hm' + (base.hm ? ' checked' : '') + '></label>' +
      '<label>Ocultar no computador<input type=checkbox data-h=hd' + (base.hd ? ' checked' : '') + '></label>' +
      '<label><span></span><button class=m data-zera=1>Voltar tudo ao padrão</button></label>';
    xs.style.display = 'block'; xs.dataset.k = k;
  }
  xs.addEventListener('input', function (e) {
    var t = e.target, k = xs.dataset.k;
    if (t.dataset.esc) { mob = t.value === '1'; estilo(byK(k)); return; }
    if (t.dataset.h) { setSt(k, t.dataset.h, t.checked ? 1 : '', false); return; }
    if (t.dataset.p) setSt(k, t.dataset.p, t.value, mob);
  });
  xs.addEventListener('click', function (e) {
    var t = e.target, k = xs.dataset.k;
    if (t.dataset.fechar) xs.style.display = 'none';
    if (t.dataset.clr) { setSt(k, t.dataset.clr, '', mob); estilo(byK(k)); }
    if (t.dataset.zera) { var a1 = JSON.stringify(cfg.st[k] || {}), a2 = JSON.stringify(cfg.stm[k] || {}); delete cfg.st[k]; delete cfg.stm[k]; des(function () { cfg.st[k] = JSON.parse(a1); cfg.stm[k] = JSON.parse(a2); css(); }); css(); gravar(); estilo(byK(k)); }
  });

  /* ================= painel lateral ================= */
  var pan = mk('div', { id: 'xpan' }), aba = 's'; B.appendChild(pan);
  function painel() {
    if (pan.style.display !== 'flex') return;
    var h = '<div class=tabs>' + [['s', 'Seções'], ['e', 'Estilo geral'], ['h', 'Histórico'], ['a', 'Ajuda']].map(function (x) { return '<button data-aba=' + x[0] + (aba === x[0] ? ' class=on' : '') + '>' + x[1] + '</button>'; }).join('') + '<button data-aba=x style="flex:0 0 34px">✕</button></div><div class=body>';
    if (aba === 's') {
      h += '<h4>Seções da página</h4><p class=h>Clique no nome para ir até a seção. Use as setas para mudar a ordem.</p><div class=row><span>Início da página</span><button class=m data-sa="^" data-st=S>+ texto</button><button class=m data-sa="^" data-st=W>+ faixa</button></div>';
      secs().forEach(function (s) {
        var id = secId(s), off = cfg.shid.indexOf(id) >= 0;
        h += '<div class="row' + (off ? ' off' : '') + '"><span data-go="' + id + '">' + secName(s) + '</span><button class=m data-su="' + id + '">↑</button><button class=m data-sd="' + id + '">↓</button><button class=m data-sh="' + id + '">' + (off ? 'mostrar' : 'ocultar') + '</button><button class=m data-sa="' + id + '" data-st=S title="Nova seção de texto abaixo">+T</button><button class=m data-sa="' + id + '" data-st=W title="Nova faixa com foto de fundo abaixo">+F</button></div>';
      });
      h += '<h4>Lixeira</h4>';
      if (!cfg.del.length) h += '<p class=h>Nenhum bloco apagado.</p>';
      cfg.del.forEach(function (k) { var el = byK(k) || D.querySelector('[data-xk="' + k + '"]'); var nome = el ? ((el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 30) || '(foto ou bloco)') : '(bloco)'; h += '<div class=row><span>' + nome + '</span><button class=m data-rest="' + k + '">restaurar</button></div>'; });
    } else if (aba === 'e') {
      h += '<h4>Tamanhos e espaços</h4><p class=h>Deixe em branco para usar o padrão. A coluna Celular vale para telas pequenas.</p><table><tr><th></th><th>Computador</th><th>Celular</th></tr>';
      G.forEach(function (g) { h += '<tr><td>' + g[1] + '</td><td><input type=number data-g="' + g[0] + '" value="' + (cfg.g[g[0]] == null ? '' : cfg.g[g[0]]) + '"></td><td><input type=number data-gm="' + g[0] + '" value="' + (cfg.gm[g[0]] == null ? '' : cfg.gm[g[0]]) + '"></td></tr>'; });
      h += '</table><h4>Outros</h4><table><tr><td>Capa: segundos por foto</td><td><input type=number data-g=cvs value="' + (cfg.g.cvs || '') + '" placeholder=3></td></tr>' +
        '<tr><td>Cor de fundo das seções</td><td><input type=color data-g=bg value="' + (cfg.g.bg || '#ffffff') + '" style="width:44px;height:26px;padding:0"> <button class=m data-gclr=bg>padrão</button></td></tr>' +
        '<tr><td>Título da aba do navegador</td><td><input data-g=title value="' + (cfg.g.title || '').replace(/"/g, '&quot;') + '" style="width:130px"></td></tr></table>' +
        '<p class=h style="margin-top:10px">Cores principais e fonte ficam na barra de cima. Para mudar um bloco só, passe o mouse nele e clique em <b>estilo</b>.</p>';
    } else if (aba === 'h') {
      h += '<h4>Versões salvas</h4><p class=h>Cada vez que você clica em Salvar, a versão anterior fica guardada aqui (as 15 últimas).</p><div id=xhl><p class=h>Carregando…</p></div>' +
        '<h4>Cópia de segurança</h4><p class=h>Baixe um arquivo com todo o conteúdo da página, ou envie um arquivo baixado antes.</p><button class=m data-bk=1>Baixar cópia</button> <button class=m data-imp=1>Enviar cópia</button>';
    } else {
      h += '<h4>Como editar</h4>' +
        '<p class=h><b>Textos:</b> clique e digite. Selecione um trecho e use a barra de cima: negrito, itálico, sublinhado, tamanho (A+ A−), cor, marca-texto, listas e link.</p>' +
        '<p class=h><b>Alinhamento:</b> clique no texto e use ⟸ ≡ ⟹ ☰.</p>' +
        '<p class=h><b>Fotos:</b> clique na foto para trocar, dar zoom e arrastar.</p>' +
        '<p class=h><b>Blocos:</b> passe o mouse sobre qualquer bloco para ver a barrinha: ↑ ↓ mudam a posição, <b>duplicar</b>, <b>+ inserir</b> (texto, título, citação, legenda, foto, 2 ou 3 fotos lado a lado, vídeo, botão, espaço, linha), <b>estilo</b> e <b>apagar</b>.</p>' +
        '<p class=h><b>Estilo do bloco:</b> fonte, cores, espaços, largura, proporção da foto, cantos, e ocultar só no celular ou só no computador. Em “Aplicar em” escolha <b>Só no celular</b> para ajustar a versão de celular sem mexer na do computador.</p>' +
        '<p class=h><b>Seções:</b> neste painel você muda a ordem, oculta e cria seções.</p>' +
        '<p class=h><b>Celular:</b> o botão Modo celular mostra a página numa moldura de telefone. Salve antes de entrar ou sair.</p>' +
        '<p class=h><b>Desfazer:</b> ↶ desfaz mudanças de estrutura e estilo; para texto use Ctrl+Z.</p>' +
        '<p class=h><b>Salvar:</b> nada fica gravado sem clicar em Salvar (ou Ctrl+S). Apagar só esconde: recupere na Lixeira ou no Histórico.</p>';
    }
    pan.innerHTML = h + '</div>';
    if (aba === 'h') versoes();
  }
  function versoes() {
    api('?id=gt.1000&select=id,updated_at&order=id.desc').then(function (r) { return r.json(); }).then(function (l) {
      var box = D.getElementById('xhl'); if (!box) return;
      box.innerHTML = (l && l.length) ? l.map(function (v) { return '<div class=row><span>' + new Date(v.id * 1000).toLocaleString('pt-BR') + '</span><button class=m data-ver=' + v.id + '>restaurar</button></div>'; }).join('') : '<p class=h>Ainda não há versões guardadas. Elas aparecem a partir do próximo Salvar.</p>';
    }).catch(function () { var box = D.getElementById('xhl'); if (box) box.innerHTML = '<p class=h>Não foi possível carregar.</p>'; });
  }
  function moveSec(id, dir) {
    var l = secs(), i = l.map(secId).indexOf(id), j = i + dir; if (i < 0 || j < 0 || j >= l.length) return;
    var ant = cfg.sord.slice(), ids = l.map(secId); ids.splice(j, 0, ids.splice(i, 1)[0]);
    cfg.sord = ids; ordem(); des(function () { cfg.sord = ant.length ? ant : l.map(secId); ordem(); cfg.sord = ant; }); gravar(); painel();
  }
  pan.addEventListener('click', function (e) {
    var t = e.target, d = t.dataset; if (!d) return;
    if (d.aba) { if (d.aba === 'x') { pan.style.display = 'none'; return; } aba = d.aba; painel(); return; }
    if (d.go) { var s = secBy(d.go); if (s) s.scrollIntoView({ behavior: 'smooth' }); return; }
    if (d.su) return moveSec(d.su, -1); if (d.sd) return moveSec(d.sd, 1);
    if (d.sh) { var i = cfg.shid.indexOf(d.sh); if (i >= 0) cfg.shid.splice(i, 1); else cfg.shid.push(d.sh); ordem(); des(function () { var j = cfg.shid.indexOf(d.sh); if (j >= 0) cfg.shid.splice(j, 1); else cfg.shid.push(d.sh); ordem(); }); gravar(); painel(); return; }
    if (d.sa) {
      var n = { k: nk(), apos: d.sa, tipo: d.st }; cfg.add.push(n); criar(n);
      if (cfg.sord.length) cfg.sord = secs().map(secId);
      des(function () { cfg.add = cfg.add.filter(function (y) { return y !== n; }); var x = D.querySelector('[data-xk="' + n.k + '"]'); if (x) x.remove(); });
      gravar(); modo(); painel(); var ns = D.querySelector('[data-xk="' + n.k + '"]'); if (ns) ns.scrollIntoView({ behavior: 'smooth', block: 'center' }); return;
    }
    if (d.rest) { cfg.del = cfg.del.filter(function (y) { return y !== d.rest; }); ocultar(d.rest, 0); gravar(); painel(); return; }
    if (d.gclr) { delete cfg.g[d.gclr]; css(); gravar(); painel(); return; }
    if (d.ver) { ask('Restaurar esta versão?', [], function () { api('?id=eq.' + d.ver + '&select=data').then(function (r) { return r.json(); }).then(function (j) { if (j[0]) restaurar(j[0].data); }); }, 'Restaurar'); return; }
    if (d.bk) { api('?id=eq.2&select=data').then(function (r) { return r.json(); }).then(function (j) { var a = mk('a', { download: 'pagina-35bi-' + new Date().toISOString().slice(0, 10) + '.json' }); a.href = URL.createObjectURL(new Blob([JSON.stringify(semJs(j[0].data))], { type: 'application/json' })); a.click(); }); return; }
    if (d.imp) { var f = mk('input', { type: 'file', accept: '.json,application/json' }); f.onchange = function () { var rd = new FileReader(); rd.onload = function () { try { var dd = JSON.parse(rd.result); if (!dd.texts) throw 0; ask('Substituir a página pelo conteúdo deste arquivo?', [], function () { restaurar(dd); }, 'Substituir'); } catch (er) { msg('Arquivo inválido'); } }; rd.readAsText(f.files[0]); }; f.click(); }
  });
  pan.addEventListener('input', function (e) {
    var d = e.target.dataset, v = e.target.value;
    if (d.g) { if (v === '') delete cfg.g[d.g]; else cfg.g[d.g] = v; css(); gravar(); }
    if (d.gm) { if (v === '') delete cfg.gm[d.gm]; else cfg.gm[d.gm] = v; css(); gravar(); }
  });

  /* ================= textos dos blocos novos, atalhos e avisos ================= */
  D.addEventListener('input', function (e) { var h = e.target.closest && e.target.closest('[data-xt]'); if (h) { cfg.txt[h.dataset.x] = h.innerHTML; gravar(); } else if (edit() && e.target.closest && e.target.closest('main')) dirty = true; });
  D.addEventListener('keydown', function (e) { if (edit() && (e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'S')) { e.preventDefault(); var sv = D.getElementById('sv'); if (sv) sv.click(); } });
  W.addEventListener('beforeunload', function (e) { if (dirty && edit()) { e.preventDefault(); e.returnValue = ''; } });

  function modo() {
    var e = edit();
    $$('[data-xt]').forEach(function (x) { x.contentEditable = e; });
    if (e) { barraFmt(); ordem(); } else { bar.style.display = 'none'; pan.style.display = 'none'; xs.style.display = 'none'; }
  }
  new MutationObserver(function () { modo(); }).observe(B, { attributes: true, attributeFilter: ['class'] });

  aplicar(); fotosDoBanco();
})();
