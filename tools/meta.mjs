import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
const files = [];
async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) await walk(p);
    else if (e.name.endsWith('.html') && e.name !== 'qa-viewport.html') files.push(p);
  }
}
await walk(root);
const dec = (s) => (s || '').replace(/&#39;/g, "'").replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
const bad = [];
for (const f of files) {
  const s = await readFile(f, 'utf8');
  const title = dec((s.match(/<title>([\s\S]*?)<\/title>/) || [])[1]);
  const desc = dec((s.match(/<meta name="description" content="([^"]*)"/) || [])[1]);
  const rel = f.replace(root, '').replace(/\\/g, '/');
  if (!title || !desc) { bad.push({ rel, missing: true }); continue; }
  if (title.length > 60 || desc.length > 160) bad.push({ rel, t: title.length, d: desc.length, title, desc });
}
bad.sort((a, b) => a.rel.localeCompare(b.rel));
for (const b of bad) console.log(`${b.rel}\n  T ${b.t ?? '?'}: ${b.title ?? ''}\n  D ${b.d ?? '?'}: ${b.desc ?? ''}`);
console.log(`\n${bad.length} pages out of ${files.length}`);
