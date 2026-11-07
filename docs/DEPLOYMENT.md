# Deployment guide

This site is built for **Cloudflare Pages** with a single Pages Function at `functions/api/quote.js`.

- **Build command:** `npm run build`
- **Build output directory:** `dist`
- **Functions directory:** `functions/` at the repository root
- **Node version:** 20 or newer

> **Critical:** The Cloudflare dashboard's **drag-and-drop Direct Upload does not compile a `functions/` folder**. Use **Git integration** (recommended) or the **Wrangler CLI** from the repository root. If you drag `dist/` into the dashboard, the site will load but `/api/quote` will return 404 and both forms will fail.

---

## 1. Before you deploy

1. Run the local checks:

   ```sh
   npm run build
   npm run check
   npm run test:api
   ```

2. Confirm the production domain in `src/config.mjs` is `https://acebathroomrenovationsbrisbane.com`.
3. Replace placeholder images if real photography is available (see `README.md`).
4. Decide how quote enquiries should be delivered:
   - **Email via Resend** (recommended), and/or
   - **JSON webhook** to Slack, Notion, Zapier or a CRM.
5. Have access to:
   - the Cloudflare account that will host the site;
   - the Git repository;
   - the domain registrar or Cloudflare DNS;
   - the destination inbox (`AceBathroomRenovationsBrisbane@gmail.com`);
   - a Resend account and a verified sending domain.

---

## 2. Option A - Pages Git integration (new projects)

Git integration gives automatic production deploys on push and preview URLs for branches. It also compiles Pages Functions correctly.

### 2.1 Push the repository

```sh
git add .
git commit -m "Build Ace Bathroom Renovations Brisbane site"
git push origin main
```

`dist/` is intentionally ignored. Cloudflare builds it on every deployment.

### 2.2 Create the Pages project

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Go to **Workers & Pages → Create application → Pages → Connect to Git**.
3. Authorise Cloudflare for your Git provider and select the repository.
4. Use these build settings:

   | Setting | Value |
   | --- | --- |
   | Project name | `ace-bathroom-renovations-brisbane` |
   | Production branch | `main` |
   | Framework preset | `None` |
   | Build command | `npm run build` |
   | Build output directory | `dist` |
   | Root directory | `/` (repository root) |

5. Add an environment variable if the build image does not default to a recent Node version:

   | Variable | Value |
   | --- | --- |
   | `NODE_VERSION` | `20` |

6. Select **Save and Deploy**.

The first deployment will be available at `https://ace-bathroom-renovations-brisbane.pages.dev`. The `functions/` folder is detected automatically because it sits at the repository root, not inside `dist/`.

### 2.3 Configure the Google Apps Script relay

In **Workers & Pages → your project → Settings → Variables and Secrets**, add this as an encrypted secret in **both Production and Preview**:

| Variable | Type | Required | Value |
| --- | --- | --- | --- |
| `QUOTE_WEBHOOK_URL` | Secret | Yes | The deployed Google Apps Script `/exec` URL with its shared token in the query string. |

The destination inbox, sender identity and Google Sheet are configured in `integrations/google-apps-script/Code.gs`, not in Cloudflare. Google Apps Script sends the email from the Google account that owns the deployment and appends a backup row to its Sheet.

**Apps Script is the only quote-email route.** The Pages Function does not send through Resend and does not fall back to another mail provider if the relay is missing or unavailable. If the secret is missing, the form returns HTTP 503. If the relay returns an error or rejects the token, the form returns HTTP 502 rather than showing a false success message.

After adding or changing the secret, redeploy (or use **Retry deployment**) so the Function picks it up.

### 2.4 Set up the Apps Script relay

Follow section 3.8 below. Verify that the Apps Script URL answers with the expected service JSON before setting it as the Cloudflare secret.

### 2.5 Connect the custom domain

1. In the Pages project, open **Custom domains**.
2. Add `acebathroomrenovationsbrisbane.com`.
3. Add `www.acebathroomrenovationsbrisbane.com` as well. The generated `_redirects` file contains:

   ```text
   https://www.acebathroomrenovationsbrisbane.com/* https://acebathroomrenovationsbrisbane.com/:splat 301!
   ```

   Both hostnames must resolve to the Pages project for that rule to run.
4. If the domain is on Cloudflare DNS, Pages creates the required records automatically. If DNS is elsewhere, point the apex at the Pages project as instructed and use a CNAME for `www`.
5. Set SSL/TLS mode to **Full (strict)** and enable **Always Use HTTPS**.
6. Confirm:
   - `https://acebathroomrenovationsbrisbane.com/` returns 200;
   - `https://www.acebathroomrenovationsbrisbane.com/` returns 301 to the apex;
   - there is one canonical host only.

### 2.6 Verify the deployment

Run these from a terminal:

```sh
# Homepage responds
curl -I https://acebathroomrenovationsbrisbane.com/

# Function is reachable and rejects GET
curl -i https://acebathroomrenovationsbrisbane.com/api/quote

# Sitemap and robots
curl -I https://acebathroomrenovationsbrisbane.com/sitemap.xml
curl -I https://acebathroomrenovationsbrisbane.com/robots.txt
```

Then submit a real test through the quote form and confirm:

- the browser shows the success message;
- the email arrives at `QUOTE_TO_EMAIL`;
- replying to the email addresses the enquirer;
- a second test with `ax_hp` filled in and the rest of the form valid is delivered and flagged `[check honeypot]`; filled in with an invalid form it is silently accepted and does **not** send an email.

Delete test enquiries from the inbox after verification.

---

## 3. Option B - Wrangler CLI and GitHub Actions (current setup)

Use this if you are deploying from a local machine or a CI runner rather than Git integration.

### 3.1 Install and log in

```sh
npx wrangler login
```

### 3.2 Create the project (first time only)

```sh
npx wrangler pages project create ace-bathroom-renovations-brisbane
```

Choose `main` as the production branch.

### 3.3 Build and deploy

Run this **from the repository root**, not from inside `dist/`:

```sh
npm run build
npx wrangler pages deploy dist --project-name ace-bathroom-renovations-brisbane --branch main
```

Wrangler uploads the `functions/` folder that exists in the current working directory. Deploying from a different directory, or uploading only `dist/` via the dashboard, leaves the Function behind.

### 3.4 Deploying before the domain is attached

Canonical tags, Open Graph URLs, schema `@id` values, `sitemap.xml` and `robots.txt` come from
`site.domain`, which defaults to `https://acebathroomrenovationsbrisbane.com`. While the site is
only served from `*.pages.dev`, build with `SITE_ORIGIN` set to that host so search engines are
not pointed at a domain that does not resolve yet:

```sh
# PowerShell
$env:SITE_ORIGIN="https://ace-bathroom-renovations-brisbane.pages.dev"; npm run build
npx wrangler pages deploy dist --project-name ace-bathroom-renovations-brisbane --branch main

# macOS / Linux
SITE_ORIGIN="https://ace-bathroom-renovations-brisbane.pages.dev" npm run build
npx wrangler pages deploy dist --project-name ace-bathroom-renovations-brisbane --branch main
```

The generated `_redirects` also omits the `www` → apex rule for `*.pages.dev` builds. After the
custom domain is live, rebuild **without** `SITE_ORIGIN` and redeploy so canonicals return to the
production domain.

### 3.5 Automatic deploys on push (configured)

`.github/workflows/deploy.yml` builds, runs the 12-point QA gate and deploys to Cloudflare Pages
on every push to `main` (and on manual dispatch). A failed check blocks the deploy.

| GitHub setting | Kind | Value |
| --- | --- | --- |
| `CLOUDFLARE_API_TOKEN` | Secret | API token with **Cloudflare Pages: Edit**. |
| `CLOUDFLARE_ACCOUNT_ID` | Secret | `060afa736b0beb6094785bec49b76053` |
| `SITE_ORIGIN` | Variable | The host currently serving the site, e.g. `https://ace-bathroom-renovations-brisbane.pages.dev`. Delete it once the custom domain is attached. |

A normal release is therefore just:

```sh
git add -A
git commit -m "Update content"
git push origin main
```

Token requirements:

- **Cloudflare Pages: Edit** on the account that owns the project, and no other permission is needed.
- **No Client IP Address Filtering.** GitHub-hosted runners use dynamic egress addresses, so a
  filtered token fails with `Authentication error [code: 10000]` even though
  `user/tokens/verify` reports the token as valid and active. The workflow's
  *Check deploy credentials* step catches this before Wrangler runs.
- The token must be scoped to the same account as `CLOUDFLARE_ACCOUNT_ID`.

**Why GitHub Actions instead of Pages Git integration?** The Pages project was created by Direct
Upload, and Cloudflare does not allow a Direct Upload project to be converted to a Git-connected
one (`You cannot update the source object in a Direct Uploads project`). Converting would mean
installing the Cloudflare Pages GitHub App from the dashboard and creating a second, Git-connected
project, then moving the custom domain across. Actions deploys to the existing project, so no
project migration is needed.

### 3.6 Preview deployments

```sh
npx wrangler pages deploy dist --project-name ace-bathroom-renovations-brisbane --branch preview
```

### 3.7 Set the Apps Script secret

Set `QUOTE_WEBHOOK_URL` as an encrypted Pages secret for both Production and Preview:

```sh
npx wrangler pages secret put QUOTE_WEBHOOK_URL --project-name ace-bathroom-renovations-brisbane
```

Paste the full Apps Script Web App URL ending in `/exec?token=…` when prompted. Do not commit this URL or its token to GitHub.

### 3.8 Gmail relay (Google Apps Script)

The deployed script in `integrations/google-apps-script/Code.gs` is the **required and only production quote-email route**. It runs in the business's Google account, sends the enquiry email from that account, and appends a backup row to a Google Sheet.

Setup:

1. Open <https://script.google.com> and create a project named `Ace quote relay`.
2. Replace the editor contents with the repository's `integrations/google-apps-script/Code.gs` and save.
3. In `CONFIG.toEmail`, confirm the destination inbox is correct.
4. Replace `CONFIG.sharedToken` with a long random token. Do not leave the default `CHANGE-ME` value.
5. **Deploy → New deployment → Web app**. Set *Execute as* to **Me** and *Who has access* to **Anyone**.
6. Copy the Web App URL ending in `/exec` and append `?token=YOUR_TOKEN`.
7. Open that URL in a browser. It should return `{"ok":true,"service":"ace-quote-relay"}`.
8. Add the full URL to Cloudflare Pages as the encrypted `QUOTE_WEBHOOK_URL` secret in both Production and Preview.
9. Redeploy and submit a test enquiry. Confirm the email arrives and the Google Sheet receives a new row.

The script verifies the token before processing the request. It emails first and then archives the enquiry; if the Sheet fails, it reports the Sheet failure while preserving the email. The Cloudflare Function treats a response of `{"ok":false}` as a failed delivery.

**Delivery rules:** Apps Script is the only configured delivery path. Resend is not attempted as a second provider or fallback. A missing relay returns 503; a relay rejection or outage returns 502, with a phone/email fallback shown to the visitor.

Names, phone numbers and message bodies are deliberately not written to the Cloudflare Worker log stream. They are held in the quote record, the Google Sheet and the delivered email. Do not log or expose the Apps Script token.

### 3.9 Diagnosing a missing enquiry

Read the KV archive rather than guessing. Every submission is stored with its outcome:

```sh
# list archived submissions (most recent last)
curl -s -H "Authorization: Bearer $CF_TOKEN" \
  "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT/storage/kv/namespaces/$KV_ID/keys?limit=100"

# read one
curl -s -H "Authorization: Bearer $CF_TOKEN" \
  "https://api.cloudflare.com/client/v4/accounts/$CF_ACCOUNT/storage/kv/namespaces/$KV_ID/values/$KEY"
```

| `outcome` | Meaning |
| --- | --- |
| `delivered` | A channel accepted it. `resendId` identifies the message in the Resend dashboard. |
| `invalid` | Failed validation; `error` names the field. |
| `blocked_honeypot` | Honeypot filled *and* the form was otherwise invalid; silently accepted. |
| `undelivered` | No channel accepted it; `deliveryError` holds the provider's reason. |
| `not_configured` | No delivery channel env vars are set. |
| `unreadable_body` | The request body was not valid form data. |

The record also carries `ua`, `referer` and `country`, which is enough to tell a visitor's browser
from a scripted test. If a visitor reports a missing email and no record exists, the request never
reached the Function and the cause is client-side (JavaScript error, stale cached page, or a form
posted from a preview server such as `localhost:4173`, which has no Function).

---

## 4. What gets deployed

| Path | Purpose |
| --- | --- |
| `dist/*.html` | 53 indexable pages and `404.html`, all with inlined CSS. |
| `dist/app.js` | Progressive enhancement: navigation, calculator, gallery filter, AJAX forms. |
| `dist/fonts/*.woff2` | Self-hosted Inter and Jost. Immutable cache for one year. |
| `dist/images/*` | Placeholder SVGs, logo, favicons and Open Graph image. |
| `dist/sitemap.xml` | 53 canonical URLs with `lastmod`. |
| `dist/robots.txt` | Crawl rules and sitemap location. |
| `dist/llms.txt` | Plain-language business and page summary for AI assistants. |
| `dist/site.webmanifest` | Installable icon metadata. |
| `dist/_headers` | Security headers and cache policy. |
| `dist/_redirects` | `www` → apex and common legacy paths. |
| `dist/_routes.json` | Invokes Functions only for `/api/*`. |
| `functions/api/quote.js` | Quote/contact endpoint; updates the matching draft lead after submission. |\n| `functions/api/lead-start.js` | Creates a quote lead draft on CTA click or form start. |\n| `functions/api/track.js` | Records allowlisted browser events. |\n| `functions/_lib/tracking.js` | Server-only Supabase access and sanitisation. |

The site has no browser-side database client or client-side router. Google Analytics 4 is configured in rendered pages. Form submissions continue to be delivered through the configured email/webhook route. When Supabase tracking is configured, visitor activity and quote lead records are written by the server-side Pages Functions. See docs/TRACKING-SETUP.md.

---

## 5. Post-launch checklist

### Hosting and security

- [ ] Apex and `www` both resolve; `www` redirects permanently to the apex.
- [ ] HTTPS works with a valid certificate; **Always Use HTTPS** is on.
- [ ] `_headers` is applied (check `x-content-type-options`, `referrer-policy`).
- [ ] `/api/quote` GET returns 405; POST validation works.
- [ ] Form delivery is confirmed end to end.
- [ ] Environment variables exist in **both** Production and Preview.
- [ ] No secrets are present in the repository or client-side JavaScript.

### SEO and indexing

- [ ] `https://acebathroomrenovationsbrisbane.com/sitemap.xml` loads and lists 53 URLs.
- [ ] `robots.txt` loads and references the sitemap.
- [ ] Canonicals use the apex host on every page.
- [ ] Add the domain to **Google Search Console** and **Bing Webmaster Tools**; verify by DNS TXT record.
- [ ] Submit `sitemap.xml` in both tools.
- [ ] Use **URL Inspection** on the homepage, About, one service page and one location page.
- [ ] Run the [Rich Results Test](https://search.google.com/test/rich-results) on the homepage, a service page and a location page. The graph should be valid with no errors.
- [ ] Confirm the Google Map embed loads on the homepage and all 18 location pages.
- [ ] Create or claim the **Google Business Profile** and make the NAP match the site exactly.

### Content and trust

- [ ] Replace representative SVG images with real project photography where possible.
- [ ] Re-check the address appears visually only on About.
- [ ] Re-check the QBCC licence number and verification link appear only on About.
- [ ] Confirm the owner/founder is not named anywhere.
- [ ] Confirm no fabricated reviews, ratings, founding dates or payment methods have been added.
- [ ] Confirm cost ranges and calculator assumptions still match current pricing.

### Performance

- [ ] Run Lighthouse on mobile for the homepage, a service page, a location page and the cost guide. Target 90+ Performance and 100 Accessibility/Best Practices/SEO.
- [ ] Confirm styling appears with the HTML (CSS is inlined; there should be no unstyled flash).
- [ ] Check the homepage on a real phone over mobile data.
- [ ] Test the sticky mobile call bar, mobile menu and calculator on iOS Safari and Android Chrome.

### Measurement

- [ ] Verify GA4 Measurement ID G-4LT7P577ZF in DebugView and confirm generate_lead is marked as a key event when ready.\n- [ ] Complete the Supabase and Apps Script setup in docs/TRACKING-SETUP.md. Test that a CTA-created draft is updated in place on form submission.\n- [ ] Review consent/privacy requirements and set a retention schedule for visitor and enquiry records.
- [ ] Record call and quote enquiry volumes from launch week as the baseline.
- [ ] Review Search Console queries after 28 days and update `docs/KEYWORD-MAP.md` if the intended page is not winning.

---

## 6. Rollback

1. Open **Workers & Pages → your project → Deployments**.
2. Find the last known-good production deployment.
3. Use the menu to **Rollback** to that deployment.
4. Confirm the homepage and `/api/quote` still behave correctly.

Environment variables are project-level, not deployment-level. If a bad variable caused the incident, fix the variable and redeploy rather than only rolling back code.

For Wrangler deployments, redeploy the previous commit:

```sh
git checkout <previous-commit>
npm run build
npx wrangler pages deploy dist --project-name ace-bathroom-renovations-brisbane --branch main
```

---

## 7. Troubleshooting

| Symptom | Likely cause | Fix |
| --- | --- | --- |
| Site loads but form returns 404 | Functions were not deployed (dashboard drag-and-drop, or Wrangler run outside the repo root). | Use Git integration, or run `npx wrangler pages deploy dist` from the repository root. Confirm `functions/api/quote.js` exists in the repo. |
| Form returns 503 with phone/email fallback | `QUOTE_WEBHOOK_URL` is missing. | Set the Apps Script Web App URL and token as the encrypted `QUOTE_WEBHOOK_URL` secret in the current environment, then redeploy. |
| Form returns 502 | Apps Script rejected the shared token, hit a mail quota, or failed to send. | Check the Apps Script deployment, `CONFIG.sharedToken`, `CONFIG.toEmail`, and Apps Script execution logs. |
| Email goes to spam | SPF/DKIM/DMARC incomplete, or a new domain. | Complete Resend DNS verification, send from the verified domain, warm up gradually. |
| `www` does not redirect | `www` is not attached to the Pages project. | Add `www` as a custom domain; keep the `_redirects` rule. |
| Stale HTML after deploy | Browser or intermediary cache. | HTML is `max-age=0, must-revalidate`; hard-refresh. Check you are on the latest deployment. |
| Form says **"Thank you."** (short) or **"The online form is not connected right now."** while the production site works | The page is being served from an **old deployment hostname** such as `https://6aa37902.ace-bathroom-renovations-brisbane.pages.dev`. Cloudflare Pages keeps every deployment on its own hostname, and each keeps the Function code and environment variables it was deployed with, so the form posts to that old Function. The form action is a relative path, so it always goes to whichever hostname loaded the page. | Use `https://ace-bathroom-renovations-brisbane.pages.dev` only. Since v1.2 the page shows a red banner and refuses to submit on any hostname that differs from its canonical URL. Delete superseded deployments so their hostnames stop resolving. |
| Wrong Node version during build | Build image default. | Set `NODE_VERSION=20` (or newer) in environment variables. |
| Build fails on page registry | A page was added to `src/data/pages.mjs` but not rendered, or vice versa. | The error names the path. Add/remove the renderer in `build.mjs`. |
| Build warns about a long description | Meta description over 175 characters. | Trim it; `npm run check` enforces 160. |

Function logs are available in the dashboard under **Workers & Pages → your project → Functions → Logs** (real-time) and in the deployment's build log for build-time errors.

---

## 8. Ongoing maintenance

- **Monthly:** check form delivery, review Search Console coverage, confirm the phone number and hours are current.
- **Quarterly:** review cost ranges, QBCC and standards references, and the schema graph; refresh any outdated guidance.
- **When regulations change:** update the affected service, FAQ or guide pages, then rebuild and redeploy.
- **When real photography arrives:** replace placeholders, update alt text, and remove the "representative illustration" wording from the gallery.
- **Before any new page:** add it to `src/data/pages.mjs` and `build.mjs`, give it a unique primary keyword in `docs/KEYWORD-MAP.md`, and run `npm run check`.
