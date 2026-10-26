import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
const root="dist";
async function walk(d){const out=[];for(const e of await readdir(d,{withFileTypes:true})){const p=path.join(d,e.name);if(e.isDirectory())out.push(...await walk(p));else if(e.name.endsWith(".html"))out.push(p);}return out;}
const files=await walk(root);
for(const f of files){let s=await readFile(f,"utf8");let m=s.match(/<main[^>]*>([\s\S]*?)<\/main>/i);let main=m?m[1]:s;let text=main.replace(/<script[\s\S]*?<\/script>/gi," ").replace(/<style[\s\S]*?<\/style>/gi," ").replace(/<[^>]+>/g," ").replace(/&[a-z#0-9]+;/gi," ").replace(/\s+/g," ").trim();const words=text.split(" ").filter(Boolean).length;console.log(String(words).padStart(5),f.replace(/\\/g,"/").replace("dist/","/"));}
