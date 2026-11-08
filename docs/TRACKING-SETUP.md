# Visitor and lead attribution setup

This feature adds pseudonymous first-party visitor/session identifiers, campaign attribution, engagement events, phone-link click records, and quote-lead draft records. A clicked Get a Quote CTA creates a draft. A valid form submission updates that same row when the visitor identity matches.

## Architecture

- Browser tracking runs in src/app.js with localStorage and sessionStorage identifiers. It does not use browser fingerprinting. The Cloudflare Pages Functions capture the visitor IP server-side from CF-Connecting-IP (or CF-Connecting-IPv6 when Cloudflare Pseudo IPv4 overwrites the former); the browser never supplies the IP.
- POST /api/track writes allowlisted events.
- POST /api/lead-start creates the draft quote record.
- POST /api/quote keeps the existing validation and Google Apps Script email relay, and adds the form data to the existing draft row.
- Supabase is accessed only by Cloudflare Pages Functions. The secret key is never included in browser JavaScript or committed to this repository.
- GA4 uses the existing Measurement ID G-4LT7P577ZF. Tracking events omit customer contact details and enquiry message contents.

## 1. Run the Supabase migration

1. Open the Supabase project and go to SQL Editor.
2. If you have not already installed the tracking schema, run supabase/migrations/20261104000100_visitor_lead_attribution.sql first.
3. Run the new additive migration supabase/migrations/20261108000200_add_visitor_ip_addresses.sql. It adds INET columns to the existing visitor, session, event, quote-lead and call-click tables without deleting existing records.
4. In Table Editor, confirm the five tables exist and that they have their IP fields: ace_visitors.last_ip_address, and ip_address on ace_sessions, ace_events, ace_quote_leads and ace_call_clicks.

All five tables have Row Level Security enabled. No anonymous or authenticated table policies are created. Do not add public read/write policies to these tables.

## 2. Cloudflare Pages variables

Open Cloudflare Dashboard → Workers & Pages → ace-bathroom-renovations-brisbane → Settings → Variables and Secrets. Add the following to both Production and Preview:

| Variable | Type | Value |
|---|---|---|
| SUPABASE_URL | Variable | Your Supabase project URL. The code accepts either the project root or a URL ending in /rest/v1/. |
| SUPABASE_SECRET_KEY | Secret / encrypted | A backend-only sb_secret_ key from Supabase Settings → API Keys. |

The code also supports the legacy SUPABASE_SERVICE_ROLE_KEY name, but the new secret-key format is preferred. A key beginning sb_publishable_ is not sufficient for these private-table writes and must not be substituted for SUPABASE_SECRET_KEY. You may keep a publishable key in Cloudflare if another client-side feature needs it; this tracker does not read it.

Do not paste the secret into GitHub, this repository, source files, or chat. It belongs only in Cloudflare's encrypted secret settings.

## 3. Google Apps Script email relay

The existing integration at integrations/google-apps-script/Code.gs is retained. Production quote delivery uses QUOTE_WEBHOOK_URL when it is configured; if it is set, the form is sent through that relay only, so the same enquiry is not emailed twice by both Apps Script and Resend.

1. Open the Apps Script project and make sure CONFIG.toEmail is the correct recipient inbox.
2. Replace CONFIG.sharedToken with a long random token. Do not leave the default CHANGE-ME value.
3. Deploy it as a Web app, executing as the account that owns the script, with access set to Anyone.
4. Copy the deployed URL ending in /exec and append ?token=YOUR_TOKEN.
5. Open the resulting URL in a browser. It should return JSON showing the ace-quote-relay service is available.
6. In Cloudflare Pages, add QUOTE_WEBHOOK_URL as an encrypted secret in both Production and Preview. Its value is the full Apps Script /exec URL including the token query string.
7. Redeploy after changing the Cloudflare variable. Test a form submission and confirm the email arrives and a row is appended to the Google Sheet.

The Apps Script URL token is a shared secret. Keep it in Cloudflare, not in browser code or GitHub source. The existing script sends the message from the Google account that owns the Apps Script deployment and keeps its Google Sheet archive.

## 4. What is captured

- First-touch and last non-direct campaign context: landing path, external referrer, UTM source/medium/campaign/term/content and available gclid, gbraid, wbraid, msclkid and fbclid values.
- Pseudonymous first-party visitor ID and a session ID that renews after 30 minutes of inactivity.
- Device category, browser family, operating-system family, screen dimensions, language and timezone.
- Coarse country code and server-derived IP address supplied by Cloudflare, where available. The IP is not accepted from browser payload fields.
- Page views, service and pricing page views, Get a Quote clicks, quote form views/starts/abandonments/errors, completed leads, phone-link clicks, scroll milestones, calculator interactions, gallery filters and FAQ opens.

URLs stored in Supabase have query strings and fragments removed. Campaign parameters are stored in separate attribution fields. Device and browser labels are best-effort categories, not definitive identity information.

## 5. Same-row quote attribution

1. A Get a Quote CTA click creates a random lead UUID and POSTs it to /api/lead-start. The lead row is initially marked draft.
2. The UUID is retained in sessionStorage while the visitor moves to the quote page.
3. The visitor's form submission sends that same UUID and visitor/session context to /api/quote.
4. The Pages Function updates the row only when both the lead UUID and visitor UUID match. It then adds the form fields and delivery status.
5. If a draft ID cannot safely be matched, the server creates a separate submission-only row rather than overwriting another visitor's record.

Draft rows that were clicked but never submitted remain visible as abandoned quote intent. Exclude status=draft when counting received enquiries or completed leads.

## 6. Verify after the deployment

1. Open the live site in a fresh browser session.
2. In Supabase Table Editor, open ace_quote_leads.
3. Click a Get a Quote CTA. Confirm that a new row appears with status=draft.
4. Submit a test enquiry. Confirm the exact same row ID now has status=submitted, the form details, and delivery_status=delivered.
5. Confirm an email arrives through Google Apps Script and the sheet archive receives the enquiry.
6. In ace_events, confirm page_view, quote_click, form_start and generate_lead events appear.
7. Click a tel: link. Confirm a call_click event and a corresponding row in ace_call_clicks.
8. In GA4 DebugView, confirm the GA4 events arrive. Mark generate_lead as a key event when ready.

The call-click record proves only that a visitor selected the phone link. It does not prove a call connected, was answered, or how long it lasted. Actual call outcomes require a call-tracking provider with call-status webhooks and a trackable number.

## 7. GA4 custom dimensions

GA4 receives event names including quote_click, call_click, generate_lead, form_start, form_abandon, service_view, pricing_view, scroll_depth, calculator_interaction, gallery_filter and faq_open. Where useful, register event-scoped custom dimensions in GA4 for button_location, form_type, page_type, scroll_percentage, filter_name and calculator_project. The GA4 user interface does not create these definitions automatically.

## 8. Privacy and retention

The privacy policy has been updated to explain GA4, first-party identifiers, visitor activity, the draft-to-submitted lead connection and the service providers involved. Review consent and privacy requirements for the locations you target before using the tracking data for advertising or profiling. Set a deliberate retention period for visitor events and enquiry records; the SQL migration does not automatically delete them.

After the form has passed validation and the Apps Script URL is configured, the browser receives HTTP 202 Accepted without waiting for Supabase, Apps Script or KV. A 202 confirms that Cloudflare accepted the submission for background processing; it does not confirm that the email has already arrived. The background job attempts the Supabase save, Apps Script relay, KV archive and final delivery-status update. Cloudflare `waitUntil()` has a finite post-response lifetime, so use a Cloudflare Queue if durable delivery and automatic retries become a requirement. Supabase write errors do not block the existing Apps Script email attempt. Never log customer names, phone numbers, email addresses, IP addresses or message bodies in Cloudflare logs. Restrict access to the Supabase tables and Google Sheet, and define an appropriate IP/enquiry retention period. The IP can be personal information when associated with contact and visitor records.