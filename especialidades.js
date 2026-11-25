/* ===== Lista de especialidades FuSEx (entre t13 e t14) ===== */
(function () {
  var W = window, D = document;
  if (W.__espOk) return; W.__espOk = 1;
  var L = [[1, "Acupuntura", "Intor, Nutriclin*, Fisio Saúde, Physius, Vitale"], [2, "Anatomia patológica / Citopatologia", "CEDAPI"], [3, "Alergologista e imunologista", "EMEC, NOA"], [4, "Anestesiologista", "Gastrolife, Dom Pedro*, EMEC"], [5, "Arritmologia", "EMEC, IDM Cardio"], [6, "Artroscopia", "EMEC"], [7, "Audiometria", "NOA"], [8, "Angiologia", "Gastrolife, Curative Med, EMEC, Nutriclin*, IDM Cardio, NBC, Gynetoco"], [9, "Biópsias", "CEDAPI, CEON (GBO)"], [10, "Bloqueio neuromuscular", "EMEC, Alleviare"], [11, "Bucomaxilo", "Instituto Salt*, Odontodia, EMEC"], [12, "Cardiologia", "EMEC, IDM Cardio, Nutriclin, NBC, Gynetoco"], [13, "Cardiologia pediátrica", "EMEC (maiores de 16 anos)"], [14, "Clínica da dor", "Alleviare"], [15, "Citologia oncótica", "CEDAPI"], [16, "Cirurgia geral", "Gastrolife, Curative Med, Dom Pedro*, EMEC, Nutriclin, Bambino Clínica (pediátrico)"], [17, "Cirurgia geral / Aparelho digestivo", "Gastrolife, EMEC"], [18, "Cirurgia cardiovascular", "Dom Pedro*, EMEC"], [19, "Cirurgia de cabeça e pescoço", "CEON (GBO), Dom Pedro*, EMEC, NOA, Gynetoco"], [20, "Cirurgia de mão", "EMEC"], [21, "Cirurgia vascular", "Dom Pedro*, EMEC"], [22, "Cirurgia plástica", "Curative Med, EMEC, Gynetoco"], [23, "Cirurgia de mamoplastia", "EMEC"], [24, "Cirurgia de tórax", "CEON (GBO), Dom Pedro*, EMEC"], [25, "Cirurgia bariátrica", "EMEC, Nutriclin"], [26, "Cirurgia oncológica", "EMEC, CEON (GBO)"], [27, "Coloproctologia", "Gastro Life, CEON (GBO), EMEC"], [28, "Colonoscopia", "Gastro Life, EMEC"], [29, "Clínica geral / Clínica médica", "Gastro Life, CEON (GBO), Novo Ser, EMEC, Nutriclin*, IDM Cardio, Gynetoco"], [30, "Day Hospital", "Gastro Life"], [31, "Dermatologia", "Bambino Clínica (pediátrico), Curative Med, EMEC, Nutriclin*, Gynetoco"], [32, "Ecocardiograma, eletrocardiograma, Holter, MAPA, ergo, Doppler de carótidas e vertebrais e Doppler arterial e venoso de membros inferiores", "Gastro Life, Nutriclin (exceto ecocardiograma), NBC, IDM Cardio"], [36, "Eletroneuromiografia", "OCS não informada"], [37, "Emergência adulto", "Dom Pedro*, EMEC"], [38, "Emergência pediátrica", "Hospital Bambino"], [39, "Endocrinologia", "Gastrolife, CEON (GBO), EMEC, Nutriclin"], [40, "Estudo imunoistoquímico", "CEDAPI"], [41, "Espirometria", "NBC, IDM Cardio"], [42, "Endoscopia digestiva alta", "Gastro Life, EMEC"], [43, "Ressonância magnética / Raios X / Tomografia computadorizada", "EMEC, RX Odonto (exames odontológicos)"], [44, "Fonoaudiologia / Fonoterapia", "Novo Ser, Doctor Kids*, Método*, Nutriclin, Fisio Saúde, Physius, Vivace, Vitale"], [45, "Fisioterapia", "Novo Ser, CLINTI, Intor, Nutriclin*, Fisio Saúde, Physius, Promesane, Vitale"], [46, "Gastroenterologia", "Gastro Life, Bambino Clínica (pediátrico), Dom Pedro*, EMEC, Nutriclin, Gastromed†, Gynetoco"], [47, "Gastropediatria", "Bambino Clínica"], [48, "Geriatria", "Nutriclin, EMEC"], [49, "Ginecologia", "CEON (GBO), EMEC, Nutriclin*, Gynetoco"], [50, "Hematologia", "CEON (GBO), Nutriclin, Gastro Life"], [51, "Hepatologia", "Gastro Life"], [52, "Histeroscopia cirúrgica", "EMEC"], [53, "Histerossalpingografia", "EMEC"], [54, "Home care (atendimento domiciliar)", "Assiste Vida, Cuidar Homecare (Santo Antônio de Jesus), Vital Med"], [55, "Infectologia", "EMEC"], [56, "Infiltração articular", "EMEC"], [57, "Laboratório de análises clínicas (patologia clínica)", "Labore*, Análise (exceto Ed. Sawaya), Biocenter (toda a rede), Anacli*"], [58, "Mamografia", "CEON (GBO), EMEC"], [59, "Manometria e pHmetria", "Gastro Life, EMEC"], [60, "Mastologia", "CEON (GBO), EMEC, Gynetoco"], [61, "Massoterapia", "Novo Ser*, Curative Med"], [62, "Medicina nuclear", "EMEC"], [63, "Musicoterapeuta", "Fisio Saúde, Vitale"], [64, "Neurologia", "EMEC, Nutriclin, Gynetoco"], [65, "Neuropsicologia", "Nutriclin, Fisio Saúde, Vitale"], [66, "Neuropsicopedagogia", "Nutriclin, Fisio Saúde"], [67, "Neurocirurgia", "Dom Pedro*, EMEC, Alleviare"], [68, "Neuropediatria", "OCS não informada"], [69, "Nefrologia", "Senhor do Bonfim, Dom Pedro*, Gynetoco"], [70, "Nutricionista", "Gastro Life, Bambino Clínica (pediátrico), Novo Ser*, Doctor Kids*, Curative Med, Fisio Saúde, Physius, Nutriclin, Gastromed†, Vitale"], [71, "Nutrologia", "Nutriclin"], [72, "Odontologia", "Odontodia (emergência por encaixe em horário comercial), Gomes Portugal Odontologia"], [73, "Oftalmologia", "Dom Pedro*, Clínica Vista, HCOE, CLIHON, HOLHOS*, EMEC, Clinos Hospital de Olhos (hospital-dia), Gynetoco"], [74, "Oncologia", "CEON (GBO), Dom Pedro*, EMEC, Gynetoco"], [75, "Ortopedia / Traumatologia", "Bambino Clínica (pediátrico), Dom Pedro*, EMEC, Nutriclin*, Alleviare, Gynetoco, Vitale"], [76, "Otorrinolaringologia", "Nutriclin, NOA, Hospital Otorrinos, Gynetoco"], [77, "Obstetrícia", "CEON (GBO), EMEC"], [78, "Pediatria", "Bambino Clínica, Hospital Bambino (emergência), Novo Ser*, Doctor Kids*, Nutriclin*, Gynetoco, Vitale"], [79, "Pneumologia", "EMEC"], [80, "Pilates", "CLINTI, Fisio Saúde, Novo Ser*, Physius, Instituto Salt*, Promesane, Vitale"], [81, "Polissonografia", "NOA"], [82, "Proctologia", "Gastro Life, EMEC, Gynetoco"], [83, "Psiquiatria", "Nutriclin*, Fisio Saúde, Vivace"], [84, "Psicologia", "Novo Ser*, Curative Med, Nutriclin*, Fisio Saúde, Physius, CLINTI, Vivace, Gastromed†, Elo Clínica de Psicologia e Saúde, Vitale"], [85, "Psicologia infantil", "Doctor Kids*, Método*, Curative Med, Bambino Clínica, Physius, Vivace, Elo Clínica de Psicologia e Saúde"], [86, "Psicoterapia", "Gastro Life, Bambino Clínica, Novo Ser*, Fisio Saúde"], [87, "Psicopedagogia", "Novo Ser*, Nutriclin*, Fisio Saúde, Clínica Ser*, Vitale"], [88, "Punção de mama e tireoide", "CEON (GBO), EMEC"], [89, "Quimioterapia", "CEON (GBO), EMEC"], [90, "Radiologia / Diagnóstico por imagem", "CEON (GBO), Dom Pedro*, EMEC"], [91, "Radiologia odontológica", "RX Odonto"], [92, "Radioterapia", "Dom Pedro*, EMEC"], [93, "Reumatologia", "EMEC"], [94, "RPG", "CLINTI, Fisio Saúde, Vitale"], [95, "Serviço de endoscopia digestiva e colonoscopia", "EMEC, Gastro Life, Gastromed†"], [96, "Retossigmoidoscopia", "CEON (GBO), EMEC, Gastro Life"], [97, "Terapia ocupacional", "Método*, Nutriclin, Fisio Saúde, Vitale"], [98, "Tratamento de feridas", "Curative Med"], [99, "Urologia", "CEON (GBO), EMEC, Gynetoco"], [100, "Ultrassonografia", "Gastro Life, CEON (GBO), Nutriclin*, Instituto Salt*, NBC, Gynetoco"], [101, "Ultrassonografia transretal para implante de agulhas", "Gastro Life, EMEC"]];
  var PDF = 'https://nhghjpsnggwhdgfkpnyv.supabase.co/storage/v1/object/public/batalhao/fusex-especialidades.pdf';
  var css = D.createElement('style');
  css.textContent =
    '#xesp{margin-top:var(--gap);font-family:Montserrat,sans-serif;color:#0c223a;text-align:left}' +
    '#xesp .es-hd{background:#1e4436;color:#fff;padding:14px 16px;border-radius:8px 8px 0 0}' +
    '#xesp .es-hd b{display:block;font-size:17px}#xesp .es-hd span{font-size:12px;opacity:.85}' +
    '#xesp .es-bx{border:1px solid #d9e2dc;border-top:0;border-radius:0 0 8px 8px;padding:12px}' +
    '#xesp input{width:100%;box-sizing:border-box;padding:11px 12px;border:1px solid #c9d3cc;border-radius:6px;font:15px Montserrat,sans-serif;margin-bottom:8px}' +
    '#xesp ul{list-style:none;margin:0;padding:0}' +
    '#xesp li{padding:9px 6px;border-bottom:1px solid #eef2ef;font-size:15px;line-height:1.35}' +
    '#xesp li:nth-child(odd){background:#f4f7f5}' +
    '#xesp li b{display:block;font-size:15px}#xesp li span{font-size:14px;color:#3d4b45}' +
    '#xesp .es-mais{display:block;width:100%;margin-top:10px;padding:12px;border:0;border-radius:6px;background:#0c223a;color:#fff;font:600 14px Montserrat,sans-serif;cursor:pointer}' +
    '#xesp .es-pdf{display:block;text-align:center;margin-top:10px;font-size:13px;color:#1e4436}' +
    '#xesp .es-nada{padding:12px 6px;font-size:14px;color:#777}';
  D.head.appendChild(css);
  var box, aberto = false, LIM = 8;
  function esc(s) { return s.replace(/[&<>]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]; }); }
  function norm(s) { return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, ''); }
  function lista() {
    var q = norm(box.querySelector('input').value.trim());
    var f = L.filter(function (i) { return !q || norm(i[1] + ' ' + i[2]).indexOf(q) >= 0; });
    var mostra = q || aberto ? f : f.slice(0, LIM);
    box.querySelector('ul').innerHTML = mostra.map(function (i) { return '<li><b>' + esc(i[1]) + '</b><span>' + esc(i[2]) + '</span></li>'; }).join('') || '<li class="es-nada">Nenhuma especialidade encontrada.</li>';
    var b = box.querySelector('.es-mais');
    b.style.display = q ? 'none' : '';
    b.textContent = aberto ? 'Mostrar menos' : 'Ver todas as ' + L.length + ' especialidades';
  }
  function montar() {
    box = D.createElement('div'); box.id = 'xesp'; box.setAttribute('contenteditable', 'false');
    box.innerHTML = '<div class="es-hd"><b>Especialidades e rede conveniada</b><span>FuSEx / 35º BI · Relação atualizada em 06/07/2026</span></div>' +
      '<div class="es-bx"><input type="search" placeholder="Buscar especialidade ou clínica…" aria-label="Buscar especialidade ou clínica"><ul></ul>' +
      '<button type="button" class="es-mais"></button><a class="es-pdf" href="' + PDF + '" target="_blank" rel="noopener">Abrir o PDF original</a></div>';
    box.querySelector('input').addEventListener('input', lista);
    box.querySelector('.es-mais').onclick = function () { var top = !aberto ? null : box.getBoundingClientRect().top; aberto = !aberto; lista(); if (top !== null && top < 0) box.scrollIntoView(); };
    lista();
  }
  function posicionar() {
    var a = D.querySelector('[data-t="t13"]'); if (!a || !box) return;
    if (a.nextElementSibling !== box) a.parentNode.insertBefore(box, a.nextSibling);
  }
  function iniciar() {
    var a = D.querySelector('[data-t="t13"]'); if (!a) return setTimeout(iniciar, 300);
    montar(); posicionar();
    new MutationObserver(posicionar).observe(a.parentNode, { childList: true });
  }
  iniciar();
})();
