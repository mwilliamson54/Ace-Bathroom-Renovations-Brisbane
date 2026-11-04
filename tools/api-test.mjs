import { onRequest } from "../functions/api/quote.js";
function req(fields, method="POST"){const f=new FormData();for(const [k,v] of Object.entries(fields))f.set(k,v);return new Request("https://example.com/api/quote",{method,body:method==="POST"?f:undefined});}
const base={name:"Test User",phone:"0412 345 678",email:"test@example.com",suburb:"Chermside",message:"Bathroom quote please",consent:"yes",source:"quote-page"};
async function run(fields, env={}){const res=await onRequest({request:req(fields),env});return {status:res.status, body:await res.json()};}
const show = (label, result) => console.log(label.padEnd(34), result.status, result.body.ok, result.body.message ? result.body.message.slice(0, 60) : "");
console.log("valid unconfigured", await run(base));
console.log("missing name", await run({...base,name:""}));
console.log("honeypot bot-shaped", await run({...base,name:"",ax_hp:"spam"}));
console.log("bad phone", await run({...base,phone:"abc"}));

const resendEnv = {RESEND_API_KEY:"x",QUOTE_TO_EMAIL:"a@b.com",QUOTE_FROM_EMAIL:"c@d.com"};
const realFetch = globalThis.fetch;
const mock = (handler) => { globalThis.fetch = handler; };

// Resend-only configuration is not accepted: production requires Apps Script.
show("Resend-only configuration", await run(base, resendEnv));

// Apps Script relay accepts the enquiry.
mock(async (url) => {
  if (String(url).includes("script.google.com")) {
    return new Response(JSON.stringify({ok:true, id:"2026-10-27T00:00:00.000Z", sheet:"ok"}), {status:200,headers:{"content-type":"application/json"}});
  }
  throw new Error("unexpected url " + url);
});
show("webhook ok, no resend", await run(base, {QUOTE_WEBHOOK_URL:"https://script.google.com/macros/s/x/exec?token=t"}));

// Relay rejects (bad token): must NOT report delivered.
mock(async (url) => {
  if (String(url).includes("script.google.com")) {
    return new Response(JSON.stringify({ok:false, error:"unauthorised"}), {status:200,headers:{"content-type":"application/json"}});
  }
  throw new Error("unexpected url " + url);
});
show("webhook rejects token", await run(base, {QUOTE_WEBHOOK_URL:"https://script.google.com/macros/s/x/exec?token=wrong"}));

// Relay returns non-JSON (Slack-style "ok"): still counts as delivered.
mock(async () => new Response("ok", {status:200}));
show("webhook plain text ok", await run(base, {QUOTE_WEBHOOK_URL:"https://hooks.example.com/x"}));

// Apps Script relay down: undelivered, 502; no alternate provider is attempted.
mock(async () => new Response("boom", {status:500}));
show("both channels fail", await run(base, {...resendEnv, QUOTE_WEBHOOK_URL:"https://hooks.example.com/x"}));

// Apps Script relay works: delivered.
mock(async (url) => {
  if (String(url).includes("resend.com")) return new Response("nope", {status:500});
  return new Response(JSON.stringify({ok:true}), {status:200,headers:{"content-type":"application/json"}});
});
show("resend down, relay ok", await run(base, {...resendEnv, QUOTE_WEBHOOK_URL:"https://hooks.example.com/x"}));

globalThis.fetch = realFetch;
