import fs from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const pages = [];
function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.name === 'index.html') {
      const rel = path.relative(dist, dir).split(path.sep).join('/');
      pages.push(rel ? `/${rel}/` : '/');
    }
  }
}
walk(dist);
pages.sort();

const widths = (process.argv[2] || '390,1440').split(',').map(Number);
const rows = pages.map((p, i) => `
  <section>
    <h2>${p} — <span id="s${i}">pending</span></h2>
    ${widths.map((w) => `<iframe data-page="${p}" data-w="${w}" src="${p}" width="${w}" height="900" loading="eager"></iframe>`).join('\n')}
  </section>`).join('\n');

const html = `<!doctype html><html><head><meta charset="utf-8"><title>QA viewport</title>
<style>body{font:12px monospace;margin:0}section{margin:0;padding:4px}iframe{display:block;border:1px solid #ccc;max-width:none}h2{font-size:11px;margin:2px 0}</style>
</head><body>${rows}
<script>
window.qa = () => [...document.querySelectorAll('iframe')].map(f => {
  try {
    const d = f.contentDocument;
    if (!d || !d.documentElement) return {page:f.dataset.page,w:+f.dataset.w,error:'not loaded'};
    const de = d.documentElement;
    const items = [];
    for (const el of d.querySelectorAll('body *')) {
      const r = el.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) continue;
      if (r.right > de.clientWidth + 1 || r.left < -1) {
        items.push({tag: el.tagName.toLowerCase(), cls: String(el.className||'').slice(0,60), id: el.id||'', left: Math.round(r.left), right: Math.round(r.right), text: (el.textContent||'').trim().slice(0,45)});
      }
    }
    return {page:f.dataset.page,w:+f.dataset.w,clientWidth:de.clientWidth,scrollWidth:de.scrollWidth,overflow:de.scrollWidth-de.clientWidth,items:items.slice(0,6)};
  } catch(e) { return {page:f.dataset.page,w:+f.dataset.w,error:String(e)}; }
});
<\/script></body></html>`;
fs.writeFileSync(path.join(dist, 'qa-viewport.html'), html);
console.log(`wrote dist/qa-viewport.html with ${pages.length} pages x ${widths.length} widths`);
