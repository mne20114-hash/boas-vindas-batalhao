/* Extensões do editor: tamanho de fonte, adicionar e apagar campos.
   Carregado do banco (tabela batalhao_js) pelo rodapé da página. */
(function () {
  if (window.__x1) return; window.__x1 = 1;
  var D = document, B = D.body;
  var FOOT = D.querySelector('[data-t=rodape]');
  if (!FOOT) return;

  /* ---------- configuração guardada dentro do rodapé (salva junto com os textos) ---------- */
  function holder() {
    var e = FOOT.querySelector('i[data-cfgx]');
    if (!e) { e = D.createElement('i'); e.setAttribute('data-cfgx', '1'); e.style.display = 'none'; FOOT.appendChild(e); }
    return e;
  }
  var cfg; try { cfg = JSON.parse(holder().textContent || '{}'); } catch (e) { cfg = {}; }
  cfg.add = cfg.add || []; cfg.del = cfg.del || []; cfg.txt = cfg.txt || {};
  function gravar() { holder().textContent = JSON.stringify(cfg); }
  function edit() { return B.classList.contains('edit'); }
  function chave(el) { return el.dataset.t || el.dataset.img || el.dataset.x || ''; }
  function acharPorChave(k) { return D.querySelector('[data-t="' + k + '"],[data-img="' + k + '"],[data-x="' + k + '"]'); }

  /* ---------- estilos ---------- */
  var st = D.createElement('style');
  st.textContent =
    '#xbar{position:absolute;z-index:1002;display:none;gap:3px;background:#111;padding:3px;border-radius:3px;box-shadow:0 2px 8px rgba(0,0,0,.4)}' +
    '#xbar button{background:#333;color:#fff;border:0;padding:4px 8px;font:600 11px Montserrat,sans-serif;cursor:pointer;border-radius:2px}' +
    '#xbar button:hover{background:#c4a468;color:#111}' +
    '#xbar button.x:hover{background:#c0392b;color:#fff}' +
    '.xnovo{outline:1px dashed rgba(196,164,104,.55);outline-offset:4px}' +
    'body:not(.edit) .xnovo{outline:0}' +
    '.xfoto{width:100%;aspect-ratio:16/9;background-color:#0c223a;background-size:cover;background-position:center;background-repeat:no-repeat;cursor:pointer}';
  D.head.appendChild(st);

  /* ---------- 1. tamanho da fonte (botões na barra do editor) ---------- */
  function fonte(passo) {
    var s = getSelection(); if (!s || !s.rangeCount) return;
    var r = s.getRangeAt(0);
    var no = r.commonAncestorContainer;
    var host = (no.nodeType === 1 ? no : no.parentElement);
    host = host && host.closest('[contenteditable=true]');
    if (!host) return;
    var lim = function (v) { return Math.min(96, Math.max(9, Math.round(v))); };
    if (r.collapsed) {                       /* sem seleção: o campo inteiro */
      var sp = host.querySelector(':scope > span[data-fs]');
      if (!sp) {
        sp = D.createElement('span'); sp.setAttribute('data-fs', '1');
        while (host.firstChild) sp.appendChild(host.firstChild);
        host.appendChild(sp);
      }
      var at = parseFloat(sp.style.fontSize) || parseFloat(getComputedStyle(host).fontSize);
      sp.style.fontSize = lim(at + passo) + 'px';
    } else {                                 /* com seleção: só o trecho */
      var base = r.startContainer.nodeType === 1 ? r.startContainer : r.startContainer.parentElement;
      var sp2 = D.createElement('span');
      sp2.style.fontSize = lim(parseFloat(getComputedStyle(base).fontSize) + passo) + 'px';
      sp2.appendChild(r.extractContents()); r.insertNode(sp2);
    }
  }
  function botoesFonte() {
    var tb = D.getElementById('tb');
    if (!tb || tb.querySelector('[data-fsbtn]')) return;
    var ref = tb.querySelector('button');
    [['A+', 2], ['A-', -2]].forEach(function (b) {
      var el = D.createElement('button');
      el.textContent = b[0]; el.setAttribute('data-fsbtn', '1');
      el.onmousedown = function (e) { e.preventDefault(); };
      el.onclick = function () { fonte(b[1]); };
      tb.insertBefore(el, ref);
    });
  }

  /* ---------- 2. barra flutuante: + texto, + foto, apagar ---------- */
  var bar = D.createElement('div'); bar.id = 'xbar';
  bar.innerHTML = '<button data-a=t>+ texto</button><button data-a=f>+ foto</button><button data-a=x class=x>apagar</button>';
  B.appendChild(bar);
  var alvo = null;

  D.addEventListener('mouseover', function (e) {
    if (!edit()) { bar.style.display = 'none'; return; }
    if (e.target.closest('#xbar,#tb,#selTb,#imgModal')) return;
    var el = e.target.closest('[data-t],[data-img],[data-x]');
    if (!el || el === FOOT) return;
    alvo = el;
    var r = (el.closest('.fig') || el).getBoundingClientRect();
    bar.style.display = 'flex';
    bar.style.left = Math.max(4, r.left + scrollX) + 'px';
    bar.style.top = Math.max(4, r.top + scrollY - 28) + 'px';
  });

  bar.addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b || !alvo) return;
    e.preventDefault(); e.stopPropagation();
    var a = b.dataset.a, k = chave(alvo);
    if (a === 'x') {
      cfg.del.push(k); apagar(k); gravar(); bar.style.display = 'none';
    } else {
      var novo = { k: 'x' + Date.now().toString(36), apos: k, tipo: a };
      cfg.add.push(novo); criar(novo); gravar(); modo();
    }
    aviso();
  });

  function aviso() {
    var s = D.querySelector('#tb .st, #tb .msg, #tb span');
    if (s) s.textContent = 'Alterado — clique em Salvar';
  }

  /* ---------- aplicar o que está guardado ---------- */
  function apagar(k) {
    var el = acharPorChave(k); if (!el) return;
    (el.closest('.fig') || el).style.display = 'none';
  }

  function criar(n) {
    var ancora = acharPorChave(n.apos); if (!ancora) return false;
    if (D.querySelector('[data-x="' + n.k + '"],[data-img="' + n.k + '"]')) return true;
    var ref = ancora.closest('.fig') || ancora, no;
    if (n.tipo === 't') {
      no = D.createElement('p');
      no.className = 'rv in xnovo';
      no.setAttribute('data-x', n.k);
      no.innerHTML = cfg.txt[n.k] || 'Novo texto';
      no.addEventListener('input', function () { cfg.txt[n.k] = no.innerHTML; gravar(); });
    } else {
      no = D.createElement('div');
      no.className = 'fig xnovo';
      no.setAttribute('contenteditable', 'false');
      no.style.marginTop = '2.5rem';
      var ph = D.createElement('div');
      ph.className = 'xfoto';
      ph.setAttribute('data-img', n.k);
      no.appendChild(ph);
    }
    ref.parentNode.insertBefore(no, ref.nextSibling);
    return true;
  }

  /* fotos novas: pega a URL salva no banco */
  function fotosSalvas() {
    var K = CONFIG.SUPABASE_ANON_KEY;
    fetch(CONFIG.SUPABASE_URL + '/rest/v1/batalhao_config?id=eq.2&select=data', { headers: { apikey: K, Authorization: 'Bearer ' + K } })
      .then(function (r) { return r.json(); })
      .then(function (j) {
        var d = (j[0] || {}).data || {}, I = d.imgs || {}, P = d.imgpos || {};
        cfg.add.forEach(function (n) {
          if (n.tipo !== 'f') return;
          var el = D.querySelector('[data-img="' + n.k + '"]'); if (!el) return;
          var u = I[n.k]; if (!u) return;
          el.style.backgroundImage = 'url(' + u + ')';
          var p = P[n.k]; if (p) { el.style.backgroundSize = p.s == 100 ? 'cover' : p.s + '%'; el.style.backgroundPosition = p.x + '% ' + p.y + '%'; }
        });
      }).catch(function () { });
  }

  function aplicar() {
    cfg.del.forEach(apagar);
    var resta = cfg.add.slice(), voltas = 0;
    while (resta.length && voltas++ < 20) resta = resta.filter(function (n) { return !criar(n); });
    fotosSalvas();
  }

  /* ---------- campos novos editáveis só no modo de edição ---------- */
  function modo() {
    var e = edit();
    D.querySelectorAll('p[data-x]').forEach(function (x) { x.contentEditable = e; });
    if (e) botoesFonte(); else bar.style.display = 'none';
  }
  new MutationObserver(modo).observe(B, { attributes: true, attributeFilter: ['class'] });

  aplicar(); modo();
})();
