// Gera a pasta dist/ com o conteúdo atual do banco embutido no index.html (fotos e textos aparecem na hora).
// Se o banco não responder, publica o site sem embutir (funciona como antes, buscando o conteúdo ao abrir).
import fs from 'node:fs';
const OUT = 'dist';
fs.rmSync(OUT, { recursive: true, force: true }); fs.mkdirSync(OUT);
for (const f of ['index.html', 'style.css', 'app.js', 'editor.js', 'config.js', 'extras.js', 'img']) if (fs.existsSync(f)) fs.cpSync(f, `${OUT}/${f}`, { recursive: true });
let html = fs.readFileSync('index.html', 'utf8');
const conf = fs.readFileSync('config.js', 'utf8');
const url = (conf.match(/SUPABASE_URL\s*:\s*["']([^"']+)/) || [])[1], key = (conf.match(/SUPABASE_ANON_KEY\s*:\s*["']([^"']+)/) || [])[1];
let data = null;
try {
  if (process.env.CFG_FILE) data = JSON.parse(fs.readFileSync(process.env.CFG_FILE, 'utf8'));
  else {
    const r = await fetch(`${url}/rest/v1/batalhao_config?id=eq.2&select=data`, { headers: { apikey: key, Authorization: `Bearer ${key}` } });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    data = ((await r.json())[0] || {}).data || null;
  }
} catch (e) { console.warn('Aviso: não foi possível ler o banco; publicando sem conteúdo embutido.', e.message); }
if (data) {
  const esc = s => s.replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
  const attr = s => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;');
  const early = fs.readFileSync('early.js', 'utf8').replace(/<\/script/gi, '<\\/script');
  // __ldx=1 desliga o carregador antigo do rodapé: o código do editor avançado já vai embutido em __CFG.js
  const bake = `<script>window.__CFG=${esc(JSON.stringify(data))};try{var __c=JSON.parse(localStorage.getItem('x35cfg')||'null');if(__c&&Number(__c.rev||0)>Number(window.__CFG.rev||0))window.__CFG=__c}catch(e){}window.__ldx=1;window.__cfgRow=[{data:window.__CFG}];</script>\n<script>${early}</script>`;
  let pre = '';
  const imgs = data.imgs || {};
  if (imgs.i0) pre += `<link rel="preload" as="image" href="${attr(imgs.i0)}" fetchpriority="high">\n`;
  if (url) pre += `<link rel="preconnect" href="${attr(url)}">\n`;
  if (data.icon) pre += `<link rel="icon" type="image/png" href="${attr(data.icon)}">\n<link rel="apple-touch-icon" href="${attr(data.icon)}">\n<meta property="og:image" content="${attr(data.icon)}">\n`;
  html = html.replace('<!--BAKE-->', () => bake).replace('<!--PRELOAD-->', () => pre);
  console.log('Conteúdo embutido:', Object.keys(data.texts || {}).length, 'textos,', Object.keys(imgs).length, 'imagens.');
}
fs.writeFileSync(`${OUT}/index.html`, html);
