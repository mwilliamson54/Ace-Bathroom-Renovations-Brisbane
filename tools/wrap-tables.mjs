import { readFile, writeFile } from "node:fs/promises";
const files=["company.mjs","hubs.mjs","location.mjs","planning.mjs","service.mjs"];
for(const f of files){const p=`src/pages/${f}`;let s=await readFile(p,"utf8");const before=(s.match(/<table class="price-table">/g)||[]).length;s=s.replace(/<table class="price-table">([\s\S]*?)<\/table>/g,(m,inner)=>`<div class="table-wrap"><table class="price-table">${inner}</table></div>`);await writeFile(p,s,"utf8");console.log(f,before);}
