import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
const root=path.resolve("dist");
async function walk(d){const out=[];for(const e of await readdir(d,{withFileTypes:true})){const p=path.join(d,e.name);if(e.isDirectory())out.push(...await walk(p));else if(e.name.endsWith(".html"))out.push(p);}return out;}
const files=await walk(root);
let errors=[],warnings=[];
for(const f of files){const s=await readFile(f,"utf8");const rel=f.replace(root,"").replace(/\\/g,"/");const m=s.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);if(!m){errors.push(`${rel}: no JSON-LD`);continue;}let j;try{j=JSON.parse(m[1]);}catch(e){errors.push(`${rel}: invalid JSON-LD ${e.message}`);continue;}if(!j["@graph"]||!Array.isArray(j["@graph"]))errors.push(`${rel}: no @graph`);const types=j["@graph"].map(x=>x["@type"]).flat();for(const t of ["HomeAndConstructionBusiness","GeneralContractor","WebSite","WebPage","BreadcrumbList"])if(!types.includes(t))errors.push(`${rel}: missing ${t}`);const h1=(s.match(/<h1[\s>]/g)||[]).length;if(h1!==1)errors.push(`${rel}: h1 count ${h1}`);const can=(s.match(/rel="canonical" href="([^"]+)"/)||[])[1];if(!can)errors.push(`${rel}: no canonical`);const title=(s.match(/<title>([\s\S]*?)<\/title>/)||[])[1];if(!title||title.length>65)warnings.push(`${rel}: title ${title?.length}`);}
console.log("Pages:",files.length,"Errors:",errors.length,"Warnings:",warnings.length);console.log(errors.slice(0,50).join("\n"));console.log("--- warnings ---");console.log(warnings.slice(0,50).join("\n"));
