# Local SEO checklist compliance report

**Site:** Ace Bathroom Renovations Brisbane  
**Domain:** <https://acebathroomrenovationsbrisbane.com>  
**Audit date:** 26 October 2026  
**Scope:** the built site in `dist/`, source content in `src/`, and the quote Function in `functions/api/quote.js`. Off-site activity (Google Business Profile, citations, backlinks, live Search Console data) is called out separately.

This report maps the supplied **Local SEO topic-map checklist** (Phases 01–13) to what has actually been implemented. It is deliberately conservative: items that depend on a live deployment, historical data, third-party profiles or ongoing research are marked **Partly met** or **Not met**, not "done" because a page exists.

## Status legend

| Status | Meaning |
| --- | --- |
| **Met** | Implemented and verified in the built output, or the deliverable exists in the repository. |
| **Partly met** | The substance exists, but a required artefact, review step, live check or data source is missing. |
| **Not met** | Not implemented. Usually requires deployment, analytics, historical data or a formal research process. |
| **N/A** | Not applicable to this business or this phase of the project. Reason is recorded. |

## Summary

| Status | Count |
| --- | ---: |
| Met | 28 |
| Partly met | 20 |
| Not met | 9 |
| N/A | 10 |
| **Total** | **67** |

**What is strong:** business scope, central entity, service-area honesty, page architecture, local page depth, internal linking, technical indexing, structured data, mobile rendering, claim restraint and pre-publication QA.

**What is intentionally incomplete:** formal SERP/evidence research, demand-tool data, live Search Console/GBP work, analytics and outcome tracking, and formal claim-review registers. These are not content gaps in the site; they are process and off-site tasks that need access, time or business input.

---

## Phase 01 — Scope

| # | Task | Status | Evidence and notes |
| ---: | --- | --- | --- |
| 1 | Define business outcomes | **Partly met** | Conversion hierarchy is explicit and consistent: **call first**, quote request second. Priority offers are bathrooms, ensuites, small bathrooms, laundries and kitchens. Revenue model, margins, capacity and a formal "qualified lead" definition are not documented. |
| 2 | Write source context | **Met** | About, Services and the homepage explain what the business does, who it serves, how it earns revenue (renovation contracts, not referrals) and why it can answer the topic: QBCC licence, waterproofing and tiling certifications, direct delivery. |
| 3 | Choose central entity | **Met** | Central entity is **bathroom renovations in Brisbane**. Brand entity is **Ace Bathroom Renovations Brisbane**. Aliases are declared in schema (`Ace Bathroom Renovations`, `Ace Bathrooms Brisbane`). Scope boundaries exclude other cities and unrelated trades. |
| 4 | Define central search intent | **Met** | Governing intent: *choose, plan, quote and complete a bathroom renovation in Brisbane*. Covered by service pages, cost guide, calculator, process pages, quote page and guides. |
| 5 | Set markets and operational limits | **Met** | `en-AU`; Queensland jurisdiction; mobile/drive-to-customer business within approximately 35 km of the Brisbane CBD; 13 suburb pages and 5 region hubs; no fake branches or shopfronts. Exclusions are recorded in `docs/KEYWORD-MAP.md`. |
| 6 | Set ownership and resources | **Partly met** | The site is a self-contained static build with documented maintenance in `README.md` and `docs/DEPLOYMENT.md`. No named researcher, expert reviewer, editor, developer or analyst, and no maintenance SLA, has been agreed. |

## Phase 02 — Baseline

| # | Task | Status | Evidence and notes |
| ---: | --- | --- | --- |
| 7 | Inventory existing pages | **Met** | 53 indexable pages are registered in `src/data/pages.mjs`; the build fails if the registry and renderers disagree. Sitemap contains 53 URLs. `tools/linkmatrix.mjs` verifies internal destinations. This is a new build, so there is no legacy CMS crawl to reconcile. |
| 8 | Export search performance | **N/A** | New domain with no Search Console history. A baseline cannot be exported before launch. The first 28 days after indexing should become the baseline. |
| 9 | Validate outcome tracking | **Partly met** | Call links use `tel:+61785906941` throughout; quote/contact forms post to a working Function with validation and delivery fallbacks. No analytics, call tracking, CRM integration or qualified-lead reporting is installed. |

## Phase 03 — Research

| # | Task | Status | Evidence and notes |
| ---: | --- | --- | --- |
| 10 | Build a source sampling plan | **Partly met** | Content relies on QBCC licensing, AS 3740 waterproofing, NCC/plumbing/electrical requirements and Queensland contract rules. There is no formal P1/P2 source sample or coverage-gap register. |
| 11 | Capture reproducible evidence | **Not met** | No evidence IDs, source dates or claim-to-source log. Regulatory claims are written conservatively, but they are not individually traceable. |
| 12 | Observe SERPs by task | **Not met** | No SERP snapshots by query, device or location. Keyword targets were selected qualitatively. |
| 13 | Expand questions carefully | **Partly met** | FAQs and service FAQs answer common cost, timing, licensing, waterproofing, warranty and access questions. There is no recorded PAA/autocomplete export or originating-seed log. |
| 14 | Mine customer language | **N/A** | No historical CRM, sales calls, support tickets or approved reviews were supplied. The site deliberately does not invent customer quotes or objections. |
| 15 | Research communities and social | **N/A** | No community or social research was used. No factual claim rests on popularity or upvotes. |
| 16 | Build factual reference base | **Partly met** | Guides reference QBCC, AS 3740, Queensland contract requirements, flood testing and certification. No claim-to-source register, version pinning or named reviewer exists. |
| 17 | Analyse competitor task coverage | **Partly met** | `essentialbathrooms.com.au` was reviewed for layout, tone and conversion patterns as requested. No formal competitor gap analysis or SERP-competitor review was documented. |
| 18 | Add tool estimates | **Not met** | No Ahrefs/Semrush/Autority data. The keyword map is a qualitative targeting plan, not demand-volume evidence. |
| 19 | Check seasonality and change | **Not met** | No Trends or Search Console seasonality analysis. Renovation demand patterns are discussed generally, not measured. |

## Phase 04 — Model

| # | Task | Status | Evidence and notes |
| ---: | --- | --- | --- |
| 20 | Normalise entities and aliases | **Met** | Services and locations are canonical records in `src/data/services.mjs` and `src/data/locations.mjs`. Brand aliases are declared in schema. Each service and suburb has one stable label and URL. |
| 21 | Extract attributes and values | **Met** | Service records include scope, inclusions, constraints, price ranges, timelines and FAQs. Location records include housing stock, access issues, history and landmarks. Values are presented with units and planning caveats. |
| 22 | Extract predicates and relationships | **Partly met** | Content expresses relationships (service suits housing type, waterproofing precedes tiling, location links to service). There is no formal subject-predicate-object model. |
| 23 | Generate query templates | **Met** | Natural templates exist for `[service] + Brisbane`, `[service] + [suburb]`, `cost of [service]`, `[service] checklist`, `[suburb] bathroom renovators` and question forms. Pages were not auto-generated from every combination. |
| 24 | Classify intent and journey | **Met** | Intent is mapped per page: learn (guides/FAQs), compare (cost guide/choosing), buy/book (quote/contact), navigate (hubs/directory), solve (warranty/quality). Mixed intent is handled with a single next action per page. |
| 25 | Group by task and entity meaning | **Met** | Groups: Services, Suburbs, Regions, Planning, Company, Guides, Legal. Similar words with different tasks (e.g. cost guide vs calculator vs quote) remain separate pages. |

## Phase 05 — Decisions

| # | Task | Status | Evidence and notes |
| ---: | --- | --- | --- |
| 26 | Map existing topic owners | **Met** | One canonical URL per service and location; no duplicate page paths (the build rejects them). `docs/KEYWORD-MAP.md` records the intended owner for each target. |
| 27 | Apply query-deserves-page gates | **Partly met** | Every page has a distinct purpose and substantial original content. The rationale is documented in the keyword map, but there is no formal gate record with SERP evidence and maintenance feasibility. |
| 28 | Validate SERP similarity | **Not met** | No normalised top-result overlap analysis. |
| 29 | Resolve cannibalisation and duplication | **Partly met** | One URL per topic, canonical tags, and redirects for common variants (`/quote/`, `/contact-us/`, plural service slugs). No query-level cannibalisation analysis is possible before launch. |
| 30 | Assign core and outer sections | **Met** | Core: homepage, services, suburbs, regions, quote, contact. Outer: cost guide, calculator, process, standards, warranty, FAQs, blog. Every outer page links back to a commercial next step. |
| 31 | Define evidence and original contribution | **Partly met** | Original local history/landmark sections, Queensland-specific regulatory guidance, transparent pricing ranges and a working calculator. There are no real project case studies, before/after photos or verified review evidence yet; gallery images are labelled placeholders. |

## Phase 06 — Architecture

| # | Task | Status | Evidence and notes |
| ---: | --- | --- | --- |
| 32 | Build a semantic content network | **Met** | Hub-and-spoke structure: services hub, locations hub, blog hub, plus 11 services, 13 suburbs, 5 regions and 4 guides. Commercial, explanatory and aftercare pages are connected. |
| 33 | Write contextual bridges | **Met** | In-body links use descriptive anchors and surrounding context (e.g. waterproofing → quality page, cost guide → calculator, service → relevant suburb). The footer directory adds a complete crawlable link layer. |
| 34 | Design navigation hierarchy | **Met** | Header navigation exposes Home, About, Services, Locations, Cost Guide, Gallery, Contact. Footer directory lists every non-legal page in grouped columns. No important page depends on site search. |
| 35 | Set URL taxonomy | **Met** | Stable, concise paths: `/services/[service]/`, `/[suburb]/`, `/[region]/`, `/blog/[post]/`. Redirects cover legacy variants. No cosmetic nesting migrations. |
| 36 | Specify internal link placement | **Met** | `tools/linkmatrix.mjs` reports **0 missing links** across every pair of non-legal pages. Legal pages are linked from the footer bottom bar. |

## Phase 07 — Local

| # | Task | Status | Evidence and notes |
| ---: | --- | --- | --- |
| 37 | Validate real service coverage | **Met** | The business is explicitly mobile/drive-to-customer. No branch or shopfront is claimed. The postal address appears visually once, on About. Service area is approximately 35 km around the Brisbane CBD. Suburb pages are genuine service areas, not fake locations. |
| 38 | Decide city/service page depth | **Met** | 13 suburb pages each contain unique housing stock, local history, landmarks, access constraints, scope guidance and FAQs; all are ≥1,309 words. 5 region hubs add area-level context. No thin city permutations. |
| 39 | Add conversion and trust details | **Met** | Phone in top bar, header, hero, CTA bands, sticky mobile bar and footer. Quote forms with validation. QBCC licence, certifications, insurance, waterproofing, written scope, process, warranty and cost guidance are visible. Address and licence disclosures are limited to About. |
| 40 | Align business identity | **Partly met** | On-site NAP is consistent everywhere: name, phone, email, hours, service area. Google Business Profile, Apple Maps, Bing Places and directory citations are outside this repository and have not been created or audited. |

## Phase 08 — Ecommerce

This business sells renovation contracts, not products online. There is no catalogue, cart, checkout, SKU, stock or shipping.

| # | Task | Status | Evidence and notes |
| ---: | --- | --- | --- |
| 41 | Map catalogue into taxonomy | **N/A** | No product catalogue. Services are grouped by renovation task. |
| 42 | Decide indexable facets | **N/A** | No faceted product filtering. The gallery filter is client-side and does not create URLs. |
| 43 | Handle variants and identifiers | **N/A** | No SKUs, GTINs or product variants. |
| 44 | Handle pagination and loading | **N/A** | No product pagination or infinite scroll. |
| 45 | Plan stock and retirement lifecycle | **N/A** | No stock. Retired service pages should be redirected to the closest service, but none are retired. |
| 46 | Plan buyer and aftercare bridges | **N/A** | No product returns or shipping. Aftercare is covered by warranty/certificates content. |

## Phase 09 — Briefs

| # | Task | Status | Evidence and notes |
| ---: | --- | --- | --- |
| 47 | Define page macro context | **Met** | Each page has one H1, a unique title and description, one primary task, a defined audience, a CTA and a canonical URL. The keyword map records primary and supporting targets. |
| 48 | Sequence subtopics and answer formats | **Met** | Templates order the direct answer, scope, decision criteria, exclusions, process and next step. Tables, price ranges and the calculator are used where they help; no arbitrary word-count padding. |
| 49 | Review claims and expertise | **Partly met** | Licensing, certification and standards claims are specific and restrained. The owner is intentionally never named, so there is no public byline. No formal claim register or independent reviewer sign-off exists. |
| 50 | Check information added | **Met** | Incremental value includes unique suburb history/landmarks, housing-specific advice, Queensland contract/waterproofing guidance, transparent cost assumptions, a calculator, and a stated no-fake-review policy. |

## Phase 10 — Technical

| # | Task | Status | Evidence and notes |
| ---: | --- | --- | --- |
| 51 | Specify indexing intent per URL | **Met** | All 53 content pages are indexable with self-referencing canonicals. `robots.txt` disallows `/api/` and `/404.html`. There are no utility or duplicate pages in the sitemap. |
| 52 | Verify templates and mobile rendering | **Met** | 54 HTML files audited at 390px and 1440px with **0 horizontal overflow**. One H1 per page. 0 broken internal links. Lighthouse: 100 Accessibility, 100 Best Practices, 100 SEO on homepage, service, location, cost guide and About. |
| 53 | Prepare discovery signals | **Met** | Sitemap with 53 URLs and `lastmod`, robots with sitemap reference, complete internal directory, canonical tags, Open Graph and manifest. No filter or duplicate URLs are submitted. |
| 54 | Select structured data by page | **Met** | Uniform `@graph` on every page: `HomeAndConstructionBusiness` + `GeneralContractor`, `WebSite`, `WebPage`, `BreadcrumbList`; plus `Service` and `FAQPage` on service/location pages, `FAQPage` on FAQ-bearing pages, `WebApplication` + `Offer` on the calculator, and `ContactPage` on contact. JSON-LD validates with 0 errors and 0 warnings. |
| 55 | Validate offers and review eligibility | **Partly met** | No review or aggregate-rating markup is used, consistent with the no-fabricated-reviews policy. Calculator pricing is a planning range, visible on the page, not a fixed offer. A live Rich Results Test has not yet been run because the site is not deployed. |
| 56 | Handle language and regional editions | **N/A** | One language (`en-AU`) and one market (Greater Brisbane). No hreflang editions are appropriate. |

## Phase 11 — Prioritise

| # | Task | Status | Evidence and notes |
| ---: | --- | --- | --- |
| 57 | Score accepted topics | **Partly met** | `docs/KEYWORD-MAP.md` prioritises commercial service and location pages ahead of supporting guides, based on business value and conversion proximity. No numeric scoring model with demand evidence. |
| 58 | Set dependency-aware release order | **Met** | All core commercial pages, navigation, quote path and supporting trust pages were built as one complete release. Nothing important is orphaned or waiting on a later batch. |
| 59 | Prepare complete page briefs | **Partly met** | Service/location data records plus page templates and the keyword map act as production briefs. There are no separate per-page brief documents with source lists and review owners. |

## Phase 12 — Publish

| # | Task | Status | Evidence and notes |
| ---: | --- | --- | --- |
| 60 | Run pre-publication QA | **Met** | `npm run check` passes **12/12**: links, schema, meta limits, full link matrix, word counts, licence placement, address placement, owner-name absence, manifest, sitemap and 404. `npm run test:api` covers validation, honeypot, 503 fallback and mocked delivery. |
| 61 | Publish and update linking pages | **Partly met** | The complete build and all internal links are ready, but the site has **not yet been deployed**. Publication, live link checks and release logging remain. |
| 62 | Check discovery and canonical selection | **Not met** | Requires a live deployment plus Google Search Console and Bing Webmaster Tools inspection. |

## Phase 13 — Measure

| # | Task | Status | Evidence and notes |
| ---: | --- | --- | --- |
| 63 | Track page and cluster outcomes | **Not met** | No analytics, call tracking or CRM outcome reporting is installed. Only raw form delivery and phone links exist. |
| 64 | Investigate query-to-page shifts | **Not met** | Requires Search Console data after launch. |
| 65 | Refresh source and topic coverage | **Partly met** | A quarterly review cadence is documented in `README.md` and `docs/DEPLOYMENT.md`. There is no versioned topic map or change log yet. |
| 66 | Evaluate expansion experiments | **Not met** | No experiments have run. |
| 67 | Recheck guidance and feature support | **Partly met** | Schema and Cloudflare guidance were checked on 26 October 2026. Quarterly re-verification is recommended, but no formal reference register exists. |

---

## Evidence log

| Check | Result |
| --- | --- |
| `npm run build` | Built 53 pages + 404 |
| `npm run check` | 12/12 passed |
| Internal links | 0 broken |
| Page-to-page links (non-legal) | 0 missing |
| JSON-LD | 0 errors, 0 warnings |
| Titles / descriptions | All within 60 / 160 characters |
| Homepage word count | 2,323 |
| Service and location pages | 30 pages; shortest 1,309 words |
| Address visibility | Only on `/about/` |
| Licence visibility | Only on `/about/` (1 occurrence) |
| Owner name | Not published |
| Map embeds | Homepage + 18 location pages |
| Viewport audit | 390px and 1440px; 0 overflow |
| Lighthouse (last audit) | 100 Accessibility / 100 Best Practices / 100 SEO on five representative templates. Desktop Performance 100, FCP ~0.31–0.38s. Mobile Performance generally mid-80s–high 90s depending on local CPU load. |
| API tests | 503 fallback, 422 validation, honeypot 200, mocked delivery 200 |

## What remains before and immediately after launch

These are the honest blockers to moving the "Partly met" and "Not met" items forward:

1. **Deploy with Functions working.** Use Cloudflare Pages Git integration or Wrangler from the repository root. Dashboard drag-and-drop will not deploy `/api/quote`.
2. **Configure delivery.** Set `RESEND_API_KEY`, `QUOTE_TO_EMAIL`, `QUOTE_FROM_EMAIL` and verify the Resend domain. Test a live submission.
3. **Verify indexing.** Add Google Search Console and Bing Webmaster Tools, submit the sitemap, inspect the homepage, About, one service page and one location page.
4. **Align off-site identity.** Create or claim the Google Business Profile with the exact same name, phone, hours and service area. Do not use the postal address as a shopfront.
5. **Decide measurement.** Add privacy-appropriate analytics and, if possible, call tracking. Define a qualified lead before collecting a baseline.
6. **Replace placeholders.** Real project photography is the largest remaining trust and originality gap.
7. **Formalise research if SEO is ongoing.** Build the SERP evidence log, claim-to-source register, keyword demand data and quarterly review log described in Phases 03–05 and 13.

Until items 1–3 are complete, this report should be read as **implementation compliance**, not as evidence of rankings, traffic or leads.
