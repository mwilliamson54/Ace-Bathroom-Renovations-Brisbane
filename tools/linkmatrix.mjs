import { readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

const root = 'dist';
const pages = [];
function walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (e.name === 'index.html') {
      const rel = path.relative(root, dir).split(path.sep).join('/');
      pages.push(rel ? `/${rel}/` : '/');
    }
  }
}
walk(root);
pages.sort();
const legal = ['/privacy-policy/', '/terms-of-service/'];
const nonLegal = pages.filter((p) => !legal.includes(p));
let fail = 0;
for (const p of nonLegal) {
  const file = path.join(root, p === '/' ? 'index.html' : `${p.slice(1)}index.html`);
  const html = readFileSync(file, 'utf8');
  const missing = nonLegal.filter((q) => q !== p && !html.includes(`href="${q}"`));
  if (missing.length) {
    fail++;
    console.log(`${p} missing ${missing.length}: ${missing.slice(0, 10).join(', ')}`);
  }
  const missingLegal = legal.filter((q) => !html.includes(`href="${q}"`));
  if (missingLegal.length) console.log(`${p} missing legal: ${missingLegal.join(', ')}`);
}
console.log(`\nNon-legal pages: ${nonLegal.length}; pages with missing internal links: ${fail}`);
