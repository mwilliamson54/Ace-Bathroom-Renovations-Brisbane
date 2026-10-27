import { onRequest } from "../functions/api/quote.js";
function req(fields, method="POST"){const f=new FormData();for(const [k,v] of Object.entries(fields))f.set(k,v);return new Request("https://example.com/api/quote",{method,body:method==="POST"?f:undefined});}
const base={name:"Test User",phone:"0412 345 678",email:"test@example.com",suburb:"Chermside",message:"Bathroom quote please",consent:"yes",source:"quote-page"};
async function run(fields, env={}){const res=await onRequest({request:req(fields),env});return {status:res.status, body:await res.json()};}
console.log("valid unconfigured", await run(base));
console.log("missing name", await run({...base,name:""}));
console.log("honeypot", await run({...base,ax_hp:"spam"}));
console.log("bad phone", await run({...base,phone:"abc"}));
// mock successful resend
const realFetch=globalThis.fetch; globalThis.fetch=async()=>new Response(JSON.stringify({id:"x"}),{status:200,headers:{"content-type":"application/json"}});
console.log("configured", await run(base,{RESEND_API_KEY:"x",QUOTE_TO_EMAIL:"a@b.com",QUOTE_FROM_EMAIL:"c@d.com"}));
globalThis.fetch=realFetch;
