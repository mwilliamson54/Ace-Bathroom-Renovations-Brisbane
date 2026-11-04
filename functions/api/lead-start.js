import { json, validUuid, parseTrackingContext, createLeadDraft } from "../_lib/tracking.js";

const MAX_BODY_BYTES = 16 * 1024;

export async function onRequest({ request, env }) {
  if (request.method !== "POST") return json({ ok:false, message:"Method not allowed." }, 405);
  const length = Number(request.headers.get("content-length") || 0);
  if (length > MAX_BODY_BYTES) return json({ ok:false, message:"Request too large." }, 413);
  let body;
  try { body = await request.json(); } catch (_) { return json({ ok:false, message:"Invalid request." }, 400); }
  if (!body || typeof body !== "object" || !validUuid(body.lead_id)) return json({ ok:false, message:"Invalid lead id." }, 400);
  const context = parseTrackingContext(body);
  if (!context.visitor_id || !context.session_id) return json({ ok:false, message:"Invalid visitor context." }, 400);
  try {
    const result = await createLeadDraft(env, body, request);
    return json({ ok:true, lead_id:result.lead_id });
  } catch (error) {
    console.error("Lead draft creation failed:", error && error.message);
    return json({ ok:false, message:"Lead tracking is temporarily unavailable." }, 503);
  }
}
