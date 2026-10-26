import { readFile, readdir, stat } from "node:fs/promises";
import path from "node:path";
const root=path.resolve("dist");
async function walk(d){const out=[];for(const e of await readdir(d,{withFileTypes:true})){const p=path.join(d,e.name);if(e.isDirectory())out.push(...await walk(p));else if(e.name.endsWith(".html"))out.push(p);}return out;}
const files=await walk(root);
let errors=[];
for(const f of files){const s=await readFile(f,"utf8");const rel=f.replace(root,"").replace(/\\/g,"/");const hrefs=[...s.matchAll(/href="([^"]+)"/g)].map(m=>m[1]);for(let h of hrefs){if(h.startsWith("http")||h.startsWith("mailto:")||h.startsWith("tel:")||h.startsWith("#")||h.startsWith("data:"))continue;h=h.split("#")[0];if(!h)continue;let target;if(h.endsWith("/"))target=path.join(root,h,"index.html");else target=path.join(root,h);try{await stat(target);}catch{errors.push(`${rel} -> ${h}`);}}const imgs=[...s.matchAll(/src="([^"]+)"/g)].map(m=>m[1]);for(const i of imgs){if(i.startsWith("http")||i.startsWith("data:"))continue;try{await stat(path.join(root,i));}catch{errors.push(`${rel} -> IMG ${i}`);}}}
console.log("Files:",files.length,"Broken:",errors.length);console.log(errors.slice(0,40).join("\n"));
