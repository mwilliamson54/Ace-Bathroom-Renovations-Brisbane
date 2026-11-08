const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const ALLOWED_EVENTS = new Set([
  "page_view","quote_click","quote_form_view","form_start","form_abandon",
  "form_error","generate_lead","quote_submitted","call_click","scroll_depth",
  "faq_open","calculator_interaction","gallery_filter","service_view",
  "pricing_view","cta_click"
]);

export const json = (data, status = 200) => new Response(JSON.stringify(data), {
  status,
  headers: {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "x-content-type-options": "nosniff"
  }
});

export const cleanText = (value, max = 500) =>
  String(value == null ? "" : value).replace(/[\u0000-\u001f\u007f]/g, " ").replace(/\s+/g, " ").trim().slice(0, max);

export const validUuid = (value) => UUID_RE.test(String(value || ""));

export function safeObject(value, maxLength = 5000) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  let text;
  try { text = JSON.stringify(value); } catch (_) { return {}; }
  if (text.length > maxLength) return {};
  return value;
}

function safePageUrl(value) {
  try {
    const url = new URL(String(value || ""));
    if (url.protocol !== "https:" && url.protocol !== "http:") return "";
    // Keep campaign identifiers in their dedicated attribution fields only.
    url.search = "";
    url.hash = "";
    return url.toString().slice(0, 2000);
  } catch (_) { return ""; }
}

function safeReferrer(value) {
  try {
    const url = new URL(String(value || ""));
    if (url.protocol !== "https:" && url.protocol !== "http:") return "";
    url.search = "";
    url.hash = "";
    return url.toString().slice(0, 1000);
  } catch (_) { return ""; }
}

function safeDevice(value) {
  const d = safeObject(value, 2000);
  return {
    device_type: ["desktop","mobile","tablet"].includes(d.device_type) ? d.device_type : "unknown",
    browser_name: cleanText(d.browser_name, 40),
    operating_system: cleanText(d.operating_system, 40),
    screen_width: Number.isFinite(Number(d.screen_width)) ? Math.max(0, Math.min(10000, Number(d.screen_width))) : null,
    screen_height: Number.isFinite(Number(d.screen_height)) ? Math.max(0, Math.min(10000, Number(d.screen_height))) : null,
    language: cleanText(d.language, 35),
    timezone: cleanText(d.timezone, 80)
  };
}

function safeTouch(value) {
  const t = safeObject(value, 3500);
  const clickIds = safeObject(t.click_ids, 1500);
  return {
    landing_page: cleanText(t.landing_page, 500),
    referrer: safeReferrer(t.referrer),
    referrer_domain: cleanText(t.referrer_domain, 255),
    utm_source: cleanText(t.utm_source, 200),
    utm_medium: cleanText(t.utm_medium, 200),
    utm_campaign: cleanText(t.utm_campaign, 200),
    utm_term: cleanText(t.utm_term, 200),
    utm_content: cleanText(t.utm_content, 200),
    click_ids: {
      gclid: cleanText(clickIds.gclid, 250),
      gbraid: cleanText(clickIds.gbraid, 250),
      wbraid: cleanText(clickIds.wbraid, 250),
      msclkid: cleanText(clickIds.msclkid, 250),
      fbclid: cleanText(clickIds.fbclid, 250)
    }
  };
}

function isValidIpAddress(value) {
  const ip = String(value || "").trim();
  if (!ip || ip.length > 45 || /[,\s%]/.test(ip)) return false;

  const octets = ip.split(".");
  if (octets.length === 4 && octets.every((part) => /^\d{1,3}$/.test(part) && Number(part) >= 0 && Number(part) <= 255)) {
    return true;
  }

  if (!ip.includes(":") || !/^[0-9a-f:.]+$/i.test(ip)) return false;
  try {
    // WHATWG URL parsing validates IPv6 literals, including compressed forms.
    new URL("http://[" + ip + "]/");
    return true;
  } catch (_) {
    return false;
  }
}

export function getClientIpAddress(request) {
  if (!request || !request.headers) return null;

  // Cloudflare's IPv6 header preserves the original address when Pseudo IPv4
  // is configured to overwrite CF-Connecting-IP.
  const ipv6 = request.headers.get("cf-connecting-ipv6");
  const connecting = request.headers.get("cf-connecting-ip");
  const candidate = ipv6 || connecting || "";
  return isValidIpAddress(candidate) ? candidate.trim() : null;
}

export function parseTrackingContext(value, request) {
  if (typeof value === "string") {
    try { value = JSON.parse(value); } catch (_) { value = {}; }
  }
  const c = safeObject(value, 12000);
  return {
    visitor_id: validUuid(c.visitor_id) ? c.visitor_id : null,
    session_id: validUuid(c.session_id) ? c.session_id : null,
    page_url: safePageUrl(c.page_url),
    page_path: cleanText(c.page_path, 500),
    page_title: cleanText(c.page_title, 300),
    referrer: safeReferrer(c.referrer),
    country_code: cleanText(request && request.cf && request.cf.country, 2).toUpperCase(),
    ip_address: getClientIpAddress(request),
    first_touch: safeTouch(c.first_touch),
    last_touch: safeTouch(c.last_touch),
    device: safeDevice(c.device)
  };
}

function supabaseConfig(env) {
  const rawUrl = cleanText(env && env.SUPABASE_URL, 300);
  const secretKey = String((env && env.SUPABASE_SECRET_KEY) || "").trim();
  const legacyKey = String((env && env.SUPABASE_SERVICE_ROLE_KEY) || "").trim();
  const key = secretKey || legacyKey;
  if (!rawUrl || !key) return null;
  try {
    const parsed = new URL(rawUrl);
    if (parsed.protocol !== "https:") return null;
    // Accept the project root or a REST URL ending in /rest/v1/.
    let pathname = parsed.pathname;
    while (pathname.endsWith("/")) pathname = pathname.slice(0, -1);
    if (pathname.endsWith("/rest/v1")) pathname = pathname.slice(0, -8);
    if (pathname !== "") return null;
    return { url: parsed.origin, key, legacy: !secretKey };
  } catch (_) { return null; }
}
async function db(env, table, query, options = {}) {
  const config = supabaseConfig(env);
  if (!config) throw new Error("Supabase is not configured");
  const url = config.url + "/rest/v1/" + table + (query ? "?" + query : "");
  const response = await fetch(url, {
    method: options.method || "POST",
    headers: {
      "apikey": config.key,
      ...(config.legacy ? { "authorization": "Bearer " + config.key } : {}),
      "content-type": "application/json",
      "prefer": options.prefer || "return=minimal"
    },
    body: options.body === undefined ? undefined : JSON.stringify(options.body)
  });
  if (!response.ok) {
    const detail = await response.text().catch(() => "");
    throw new Error("Supabase " + table + " returned " + response.status + ": " + detail.slice(0, 250));
  }
  if (response.status === 204) return [];
  const text = await response.text().catch(() => "");
  if (!text) return [];
  try { return JSON.parse(text); } catch (_) { return []; }
}

export async function upsertIdentity(env, context) {
  if (!context.visitor_id || !context.session_id) return;
  const now = new Date().toISOString();
  await db(env, "ace_visitors", "on_conflict=visitor_id", {
    body: {
      visitor_id: context.visitor_id,
      last_seen_at: now,
      first_touch: context.first_touch,
      last_touch: context.last_touch,
      latest_device: context.device,
      latest_country_code: context.country_code || null,
      last_ip_address: context.ip_address || null
    },
    prefer: "resolution=merge-duplicates,return=minimal"
  });
  await db(env, "ace_sessions", "on_conflict=session_id", {
    body: {
      session_id: context.session_id,
      visitor_id: context.visitor_id,
      last_seen_at: now,
      landing_page: context.page_path,
      referrer: context.referrer,
      country_code: context.country_code || null,
      ip_address: context.ip_address || null,
      attribution: context.last_touch,
      device: context.device
    },
    prefer: "resolution=merge-duplicates,return=minimal"
  });
}

export async function createLeadDraft(env, raw, request) {
  const context = parseTrackingContext(raw, request);
  const leadId = validUuid(raw.lead_id) ? raw.lead_id : null;
  if (!leadId) throw new Error("A valid lead id is required");
  await upsertIdentity(env, context);
  await db(env, "ace_quote_leads", "on_conflict=id", {
    body: {
      id: leadId,
      visitor_id: context.visitor_id,
      session_id: context.session_id,
      status: "draft",
      source: cleanText(raw.source, 60) || "website",
      form_type: cleanText(raw.form_type, 40) || "quote",
      page_url: context.page_url,
      page_path: context.page_path,
      page_title: context.page_title,
      referrer: context.referrer,
      country_code: context.country_code || null,
      ip_address: context.ip_address || null,
      first_touch: context.first_touch,
      last_touch: context.last_touch,
      device: context.device
    },
    prefer: "resolution=ignore-duplicates,return=minimal"
  });
  return { lead_id: leadId, visitor_id: context.visitor_id, session_id: context.session_id };
}

const EVENT_DATA_FIELDS = new Set([
  "form_type","form_status","button_type","button_location","button_text","link_text",
  "phone_number","scroll_percentage","question","filter_name","calculator_project",
  "lead_status","source","page_section","page_type","service_name"
]);

function safeEventData(value) {
  const input = safeObject(value, 4000);
  const out = {};
  for (const key of Object.keys(input)) {
    if (!EVENT_DATA_FIELDS.has(key)) continue;
    const v = input[key];
    if (typeof v === "number" && Number.isFinite(v)) out[key] = Math.max(-1000000, Math.min(1000000, v));
    else if (typeof v === "boolean") out[key] = v;
    else if (typeof v === "string") out[key] = cleanText(v, 250);
  }
  return out;
}

export async function recordVisitorEvent(env, raw, request) {
  const context = parseTrackingContext(raw, request);
  const eventName = cleanText(raw.event_name, 80);
  if (!ALLOWED_EVENTS.has(eventName)) throw new Error("Unsupported event name");
  await upsertIdentity(env, context);
  const eventData = safeEventData(raw.event_data);
  await db(env, "ace_events", "", {
    body: {
      visitor_id: context.visitor_id,
      session_id: context.session_id,
      event_name: eventName,
      page_url: context.page_url,
      page_path: context.page_path,
      page_title: context.page_title,
      referrer: context.referrer,
      ip_address: context.ip_address || null,
      event_data: eventData
    }
  });
  if (eventName === "call_click") {
    await db(env, "ace_call_clicks", "", {
      body: {
        visitor_id: context.visitor_id,
        session_id: context.session_id,
        phone_number: cleanText(eventData.phone_number, 40),
        page_url: context.page_url,
        page_path: context.page_path,
        source: cleanText(eventData.button_location, 80),
        ip_address: context.ip_address || null
      }
    });
  }
  return { recorded: true, event_name: eventName };
}

export async function saveSubmittedLead(env, raw, request) {
  const context = parseTrackingContext(raw.tracking_context, request);
  const suppliedLeadId = validUuid(raw.lead_id) ? raw.lead_id : null;
  // Without a visitor identity, never attach to an existing draft id.
  const leadId = context.visitor_id && suppliedLeadId ? suppliedLeadId : crypto.randomUUID();
  await upsertIdentity(env, context);

  const base = {
    id: leadId,
    visitor_id: context.visitor_id,
    session_id: context.session_id,
    status: "submitted",
    source: cleanText(raw.source, 60) || "website",
    form_type: cleanText(raw.form_type, 40) || "quote",
    page_url: context.page_url,
    page_path: context.page_path,
    page_title: context.page_title,
    referrer: context.referrer,
    country_code: context.country_code || null,
    ip_address: context.ip_address || null,
    first_touch: context.first_touch,
    last_touch: context.last_touch,
    device: context.device,
    customer_name: cleanText(raw.name, 80),
    phone: cleanText(raw.phone, 30),
    email: cleanText(raw.email, 120),
    suburb: cleanText(raw.suburb, 60),
    property_type: cleanText(raw.property, 80),
    project_type: cleanText(raw.project, 80),
    budget: cleanText(raw.budget, 80),
    timeline: cleanText(raw.timeline, 80),
    message: cleanText(raw.message, 2000),
    consent: raw.consent === true,
    submitted_at: new Date().toISOString(),
    delivery_status: "pending"
  };

  // Insert if a draft does not exist (e.g. JavaScript blocked), then update
  // by both lead id and visitor id so the same draft is enriched, not duplicated.
  await db(env, "ace_quote_leads", "on_conflict=id", {
    body: base,
    prefer: "resolution=ignore-duplicates,return=minimal"
  });

  if (context.visitor_id) {
    const rows = await db(env, "ace_quote_leads",
      "id=eq." + encodeURIComponent(leadId) + "&visitor_id=eq." + encodeURIComponent(context.visitor_id),
      { method: "PATCH", body: base, prefer: "return=representation" });
    if (Array.isArray(rows) && rows.length) return leadId;
    // An unmatched id is not overwritten. Create a fresh submission-only row.
    const fallbackId = crypto.randomUUID();
    await db(env, "ace_quote_leads", "", {
      body: Object.assign({}, base, { id: fallbackId }),
      prefer: "return=minimal"
    });
    return fallbackId;
  }

  // No first-party visitor context: keep the submission-only row created above.
  return leadId;
}

export async function updateLeadDelivery(env, leadId, visitorId, status, error, resendId) {
  if (!validUuid(leadId)) return;
  const body = {
    delivery_status: status,
    status: status === "delivered" ? "submitted" : status === "not_configured" ? "delivery_failed" : "delivery_failed",
    delivery_error: cleanText(error, 500),
    resend_id: cleanText(resendId, 120)
  };
  const filter = "id=eq." + encodeURIComponent(leadId) +
    (validUuid(visitorId) ? "&visitor_id=eq." + encodeURIComponent(visitorId) : "");
  await db(env, "ace_quote_leads", filter, {
    method: "PATCH", body, prefer: "return=minimal"
  });
}
