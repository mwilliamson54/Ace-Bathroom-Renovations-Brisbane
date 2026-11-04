import assert from "node:assert/strict";
import { onRequest as leadStart } from "../functions/api/lead-start.js";
import { onRequest as track } from "../functions/api/track.js";
import { onRequest as quote } from "../functions/api/quote.js";

const visitorId = "a3c8c1e2-8b29-4bb7-9d53-61f885b77010";
const sessionId = "b51b2e65-1058-4ea1-8a9e-7a8728eb7f82";
const leadId = "c4ee7188-ae3b-4d41-9b0b-8484c9fa2b7b";
const context = {
  visitor_id: visitorId,
  session_id: sessionId,
  page_url: "https://acebathroomrenovationsbrisbane.com/get-a-quote/?utm_source=google&utm_campaign=brisbane",
  page_path: "/get-a-quote/",
  page_title: "Request a bathroom renovation quote",
  referrer: "https://www.google.com/search?q=bathroom+renovation",
  first_touch: {
    landing_page: "/",
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: "brisbane-bathrooms",
    click_ids: { gclid: "sample-click-id" }
  },
  last_touch: {
    landing_page: "/get-a-quote/",
    utm_source: "google",
    utm_medium: "cpc",
    utm_campaign: "brisbane-bathrooms"
  },
  device: {
    device_type: "desktop",
    browser_name: "Chrome",
    operating_system: "Windows",
    screen_width: 1920,
    screen_height: 1080,
    language: "en-AU",
    timezone: "Australia/Brisbane"
  }
};

const calls = [];
const env = {
  SUPABASE_URL: "https://wovefwxtxxfynoqlwjfk.supabase.co/rest/v1/",
  SUPABASE_SECRET_KEY: "sb_secret_test_key",
  QUOTE_WEBHOOK_URL: "https://script.google.com/macros/s/test/exec?token=test-token"
};

const realFetch = globalThis.fetch;
const addCloudflareCountry = (request) => {
  Object.defineProperty(request, "cf", { value: { country: "AU" } });
  return request;
};
globalThis.fetch = async (input, init = {}) => {
  const url = String(input);
  const method = init.method || "GET";
  const body = init.body ? JSON.parse(init.body) : null;
  calls.push({ url, method, body, headers: init.headers || {} });

  if (url.includes("script.google.com")) {
    return new Response(JSON.stringify({ ok: true, id: "apps-script-test", sheet: "ok" }), {
      status: 200, headers: { "content-type": "application/json" }
    });
  }
  if (url.includes("supabase.co/rest/v1/")) {
    if (method === "PATCH" && url.includes("ace_quote_leads")) {
      return new Response(JSON.stringify([body]), {
        status: 200, headers: { "content-type": "application/json" }
      });
    }
    return new Response(null, { status: 204 });
  }
  throw new Error("Unexpected outbound request: " + url);
};

try {
  const requestContext = { cf: { country: "AU" } };

  const startRequest = addCloudflareCountry(new Request("https://acebathroomrenovationsbrisbane.com/api/lead-start", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      ...context,
      lead_id: leadId,
      source: "quote-cta",
      form_type: "quote"
    })
  }));
  const startResponse = await leadStart({ request: startRequest, env });
  const startBody = await startResponse.json();
  assert.equal(startResponse.status, 200);
  assert.equal(startBody.ok, true);
  assert.equal(startBody.lead_id, leadId);

  const startLeadInsert = calls.find((call) =>
    call.method === "POST" && call.url.includes("ace_quote_leads")
  );
  assert.ok(startLeadInsert, "CTA click should create the lead draft");
  assert.equal(startLeadInsert.body.id, leadId);
  assert.equal(startLeadInsert.body.status, "draft");
  assert.equal(startLeadInsert.body.country_code, "AU");
  assert.equal(startLeadInsert.headers.apikey, env.SUPABASE_SECRET_KEY);
  assert.ok(!("authorization" in startLeadInsert.headers), "opaque sb_secret key must not be used as a Bearer JWT");
  assert.ok(calls.filter((call) => call.url.includes("supabase.co")).every((call) =>
    !call.url.includes("/rest/v1/rest/v1/")
  ), "a pasted /rest/v1/ suffix must not be duplicated in REST requests");

  const eventRequest = addCloudflareCountry(new Request("https://acebathroomrenovationsbrisbane.com/api/track", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      ...context,
      event_name: "call_click",
      event_data: { button_location: "header", phone_number: "+61785906941" }
    })
  }));
  const eventResponse = await track({ request: eventRequest, env });
  assert.equal(eventResponse.status, 200);
  assert.equal((await eventResponse.json()).ok, true);
  assert.ok(calls.some((call) => call.method === "POST" && call.url.includes("ace_events") && call.body.event_name === "call_click"));
  assert.ok(calls.some((call) => call.method === "POST" && call.url.includes("ace_call_clicks")));

  const form = new FormData();
  form.set("name", "Example Visitor");
  form.set("phone", "0412 345 678");
  form.set("email", "example@example.com");
  form.set("suburb", "Chermside");
  form.set("property", "house");
  form.set("project", "full-bathroom-renovation");
  form.set("budget", "$25,000 – $35,000");
  form.set("timeline", "Within 1–3 months");
  form.set("message", "Test enquiry for tracking integration.");
  form.set("source", "quote-page");
  form.set("consent", "yes");
  form.set("lead_id", leadId);
  form.set("tracking_context", JSON.stringify(context));

  const quoteRequest = addCloudflareCountry(new Request("https://acebathroomrenovationsbrisbane.com/api/quote", {
    method: "POST",
    body: form
  }));
  const quoteResponse = await quote({ request: quoteRequest, env });
  const quoteBody = await quoteResponse.json();
  assert.equal(quoteResponse.status, 200);
  assert.equal(quoteBody.ok, true);
  assert.equal(quoteBody.lead_id, leadId);

  const leadPatches = calls.filter((call) =>
    call.method === "PATCH" && call.url.includes("ace_quote_leads")
  );
  const submittedUpdate = leadPatches.find((call) => call.body.status === "submitted");
  const deliveredUpdate = leadPatches.find((call) => call.body.delivery_status === "delivered");
  assert.ok(submittedUpdate, "form submission should update a quote lead row");
  assert.ok(deliveredUpdate, "successful Apps Script delivery should update the same lead's delivery status");
  assert.equal(new URL(submittedUpdate.url).searchParams.get("id"), "eq." + leadId);
  assert.equal(new URL(submittedUpdate.url).searchParams.get("visitor_id"), "eq." + visitorId);
  assert.equal(submittedUpdate.body.customer_name, "Example Visitor");
  assert.equal(submittedUpdate.body.country_code, "AU");
  assert.equal(deliveredUpdate.body.delivery_status, "delivered");

  const relayCalls = calls.filter((call) => call.url.includes("script.google.com"));
  assert.equal(relayCalls.length, 1, "Apps Script relay should be called once");
  assert.ok(!("leadId" in relayCalls[0].body), "lead UUID remains in Supabase and is not sent to Apps Script");
  assert.ok(!("trackingContext" in relayCalls[0].body), "visitor/session and campaign context remains in Supabase");
  assert.ok(!("tracking_context" in relayCalls[0].body), "snake-case tracking context is not sent to Apps Script");
  assert.ok(!calls.some((call) => call.url.includes("resend.com")), "Resend should not run when Apps Script is configured");

  console.log("PASS  CTA click creates a Supabase draft");
  console.log("PASS  Visitor and call-click events are stored");
  console.log("PASS  Quote submission updates the matching draft row");
  console.log("PASS  Apps Script delivery status is written to that same row");
  console.log("PASS  Google Apps Script is the sole delivery route when configured");
} finally {
  globalThis.fetch = realFetch;
}
