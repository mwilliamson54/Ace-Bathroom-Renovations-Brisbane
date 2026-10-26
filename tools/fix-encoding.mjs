import { readFileSync, writeFileSync } from 'node:fs';

const file = 'src/pages/blog.mjs';
let s = readFileSync(file, 'utf8');
const before = s;
s = s
  .split('\u00e2\u20ac\u201c').join('\u2013')
  .split('\u00e2\u20ac\u201d').join('\u2014')
  .split('\u00e2\u20ac\u0153').join('\u201c')
  .split('\u00e2\u20ac\u009d').join('\u201d')
  .split('\u00c2\u00b7').join('\u00b7');
writeFileSync(file, s);
console.log(s === before ? 'no change' : 'fixed mojibake');
console.log('remaining:', (s.match(/\u00e2\u20ac|\u00c2/g) || []).length);
