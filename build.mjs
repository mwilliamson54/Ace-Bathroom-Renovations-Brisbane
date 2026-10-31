import { mkdir, readFile, writeFile, cp, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { site } from "./src/config.mjs";
import { services } from "./src/data/services.mjs";
import { locations, regionHubs } from "./src/data/locations.mjs";
import { allPages } from "./src/data/pages.mjs";
import { renderPage, setAssets } from "./src/lib/layout.mjs";

import home from "./src/pages/home.mjs";
import { renderAbout } from "./src/pages/about.mjs";
import { renderServicesHub, renderLocationsHub } from "./src/pages/hubs.mjs";
import { renderCostGuide, renderCalculator } from "./src/pages/planning.mjs";
import { renderQuote, renderContact } from "./src/pages/contact.mjs";
import {
  renderGallery,
  renderReviews,
  renderProcess,
  renderHowItWorks,
  renderChoosing,
  renderStandards,
  renderWarranty,
  renderQuality,
} from "./src/pages/company.mjs";
import { renderFaqs } from "./src/pages/faqs.mjs";
import {
  renderBlogHub,
  renderContractsPost,
  renderLicencePost,
  renderWaterproofingPost,
  renderTimelinePost,
} from "./src/pages/blog.mjs";
import { renderPrivacy, renderTerms, renderNotFound } from "./src/pages/legal.mjs";
import { renderService } from "./src/pages/service.mjs";
import { renderLocation } from "./src/pages/location.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = __dirname;
const DIST = path.join(ROOT, "dist");
const LAST_MOD = "2026-10-26";

const pages = [
  home,
  renderAbout(),
  renderServicesHub(),
  renderLocationsHub(),
  renderCostGuide(),
  renderCalculator(),
  renderQuote(),
  renderContact(),
  renderGallery(),
  renderReviews(),
  renderProcess(),
  renderHowItWorks(),
  renderChoosing(),
  renderStandards(),
  renderFaqs(),
  renderWarranty(),
  renderQuality(),
  renderBlogHub(),
  renderContractsPost(),
  renderLicencePost(),
  renderWaterproofingPost(),
  renderTimelinePost(),
  renderPrivacy(),
  renderTerms(),
  ...services.map((s) => renderService(s)),
  ...locations.map((l) => renderLocation(l)),
  ...regionHubs.map((h) => renderLocation(h)),
];

const notFound = renderNotFound();

/* ------------------------------------------------------------------ *
 * Validation
 * ------------------------------------------------------------------ */
const seen = new Set();
for (const p of [...pages, notFound]) {
  if (!p || !p.path) throw new Error(`Page object missing path: ${JSON.stringify(p && p.title)}`);
  if (seen.has(p.path)) throw new Error(`Duplicate page path: ${p.path}`);
  seen.add(p.path);
  if (!p.title || !p.description) throw new Error(`Page ${p.path} missing title or description`);
  if (p.description.length > 175) {
    console.warn(`! description ${p.description.length} chars: ${p.path}`);
  }
}

const staticPaths = new Set(allPages.map((p) => p.path));
const renderedPaths = new Set(pages.map((p) => p.path));
for (const p of staticPaths) {
  if (!renderedPaths.has(p)) throw new Error(`Registered page not rendered: ${p}`);
}
for (const p of renderedPaths) {
  if (!staticPaths.has(p)) throw new Error(`Rendered page not registered: ${p}`);
}

/* ------------------------------------------------------------------ *
 * Render
 * ------------------------------------------------------------------ */
const fontsCss = await readFile(path.join(ROOT, "src/fonts.css"), "utf8");
const stylesCss = await readFile(path.join(ROOT, "src/styles.css"), "utf8");
setAssets({ css: `${fontsCss}\n${stylesCss}` });

await rm(DIST, { recursive: true, force: true });
await mkdir(DIST, { recursive: true });

function outPath(route) {
  if (route.endsWith("/")) return path.join(DIST, route.slice(1), "index.html");
  return path.join(DIST, route.replace(/^\//, ""));
}

for (const p of pages) {
  const html = renderPage(p);
  const file = outPath(p.path);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html, "utf8");
}

await writeFile(path.join(DIST, "404.html"), renderPage(notFound), "utf8");

/* ------------------------------------------------------------------ *
 * Static assets
 * ------------------------------------------------------------------ */
const publicDir = path.join(ROOT, "public");
if (existsSync(publicDir)) {
  await cp(publicDir, DIST, { recursive: true });
}
await cp(path.join(ROOT, "src/app.js"), path.join(DIST, "app.js"));

/* ------------------------------------------------------------------ *
 * sitemap.xml
 * ------------------------------------------------------------------ */
const xml = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const SITE_DOMAIN = (process.env.CUSTOM_DOMAIN || process.env.SITE_DOMAIN || "https://acebathroomrenovationsbrisbane.com").replace(/\/+$/, "");
const DOMAIN_HOST = SITE_DOMAIN.replace(/^https?:\/\//, "");

const indexable = pages.filter((p) => !p.noindex);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${indexable
  .map((p) => {
    const priority = p.path === "/" ? "1.0" : p.path === "/services/" || p.path === "/locations/" ? "0.9" : p.path.startsWith("/services/") || p.path.startsWith("/blog/") ? "0.7" : "0.6";
    return `  <url><loc>${xml(SITE_DOMAIN + p.path)}</loc><lastmod>${LAST_MOD}</lastmod><changefreq>monthly</changefreq><priority>${priority}</priority></url>`;
  })
  .join("\n")}
</urlset>
`;
await writeFile(path.join(DIST, "sitemap.xml"), sitemap, "utf8");

/* ------------------------------------------------------------------ *
 * robots.txt
 * ------------------------------------------------------------------ */
const robots = `User-agent: *
Allow: /
Disallow: /api/
Disallow: /404.html

# Crawl-friendly AI assistants are welcome to read public pages.
User-agent: GPTBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: PerplexityBot
Allow: /

Sitemap: ${SITE_DOMAIN}/sitemap.xml
Host: ${DOMAIN_HOST}
`;
await writeFile(path.join(DIST, "robots.txt"), robots, "utf8");


/* ------------------------------------------------------------------ *
 * llms.txt
 * AI-readable business information and website resource directory
 * ------------------------------------------------------------------ */

const SITE_DOMAIN_LLM = (
  process.env.CUSTOM_DOMAIN ||
  process.env.SITE_DOMAIN ||
  "https://acebathroomrenovationsbrisbane.com"
).replace(/\/+$/, "");

// Ensure generated URLs use the canonical domain.
const llmsUrl = (pathname = "") =>
  `${SITE_DOMAIN_LLM}/${pathname.replace(/^\/+|\/+$/g, "")}`.replace(/\/$/, (match, offset, string) =>
    string.endsWith("://") ? match : ""
  );

// Format dynamic services as Markdown links.
const llmsServices = services
  .map((s) => {
    const url = llmsUrl(`services/${s.slug}/`);
    return `- [${s.name}](${url}): Professional ${s.name.toLowerCase()} services in Greater Brisbane.`;
  })
  .join("\n");

// Format dynamic suburbs as Markdown links.
const llmsLocations = locations
  .map((l) => {
    const url = llmsUrl(`${l.slug}/`);
    return `- [Bathroom Renovations ${l.suburb}](${url}): Bathroom renovation services in ${l.suburb}, Brisbane.`;
  })
  .join("\n");

// Complete llms.txt content.
const llms = `# ${site.name}

> Ace Bathroom Renovations Brisbane is a QBCC-licensed bathroom and kitchen renovation builder serving Greater Brisbane, Queensland, Australia. The business provides bathroom renovations, kitchen renovations, laundry renovations, waterproofing, tiling, design assistance, demolition coordination, plumbing coordination and project management.

## Business Overview

- Business Name: Ace Bathroom Renovations Brisbane
- Legal Name: Ace Bathroom Renovations Brisbane
- Business Type: Local Business / HomeAndConstructionBusiness
- QBCC Licence: ${site.licence.number} — Builder Restricted to Kitchen, Bathroom and Laundry
- Primary Service Area: Greater Brisbane, Queensland, Australia
- Service Radius: Approximately 35 km from Brisbane CBD
- Business Address: ${site.address.display}
- Phone: ${site.phoneDisplay}
- International Phone: ${site.phoneIntl}
- Email: ${site.email}
- Operating Hours: ${site.hoursLong}
- Website: ${SITE_DOMAIN_LLM}/
- Canonical Domain: ${SITE_DOMAIN_LLM}

The business operates as a mobile renovation service, undertaking projects at client properties throughout its Greater Brisbane service area.

## Services and Capabilities

- Full bathroom renovations
- Small and compact bathroom renovations
- Ensuite renovations
- Kitchen renovations
- Laundry renovations
- Bathroom waterproofing
- Wall and floor tiling
- Accessible bathroom modifications
- Apartment and body corporate renovations
- Queenslander and character home renovations
- Commercial bathroom renovations
- Bathroom design assistance and material selection
- Tile and fixture selection assistance
- Demolition and renovation project coordination
- Plumbing coordination and fit-off
- Project management and trade coordination
- Written fixed-scope quotations
- Variations agreed in writing
- Workmanship warranty and waterproofing documentation

## Pricing Guidance

- Full bathroom renovation: $18,000–$32,000 (indicative planning range).
- Ensuite and small bathroom renovations: Pricing depends on room dimensions, materials, specifications and project scope.
- All prices are indicative planning estimates, not binding quotations.
- Final project pricing requires an assessment of the property and confirmation of the renovation scope.
- Material selection, structural conditions, plumbing changes, waterproofing requirements and project complexity can affect the final cost.

## Business Standards and Editorial Notes

- The business holds QBCC Licence ${site.licence.number}, subject to verification against the official Queensland Building and Construction Commission register.
- Waterproofing work is intended to comply with applicable Australian requirements, including AS 3740 where applicable.
- Renovation quotations are based on the agreed project scope.
- Variations should be documented and agreed upon in writing.
- Client reviews and testimonials must be genuine and must not be fabricated.
- Referee details are available on request, subject to client consent.
- Gallery images may include representative illustrations until approved project photography is available.
- Pricing information is indicative and should not be interpreted as a guaranteed quotation.
- The website is the primary source for current services, locations, pricing guidance and contact information.

## Core Pages

- [Homepage](${llmsUrl("/")}): Main business website and overview of renovation services.
- [About and Licence Verification](${llmsUrl("about/")}): Business background and licensing information.
- [All Services](${llmsUrl("services/")}): Overview of renovation services and capabilities.
- [Service Locations](${llmsUrl("locations/")}): Greater Brisbane service coverage.
- [Bathroom Renovation Cost Guide](${llmsUrl("cost-guide/")}): Indicative bathroom renovation costs and budgeting guidance.
- [Bathroom Renovation Cost Calculator](${llmsUrl("bathroom-renovation-cost-calculator/")}): Online renovation budget estimation tool.
- [Get a Quote](${llmsUrl("get-a-quote/")}): Request a bathroom or kitchen renovation quotation.
- [Contact](${llmsUrl("contact/")}): Business contact information and enquiries.
- [Frequently Asked Questions](${llmsUrl("faqs/")}): Answers to common renovation questions.
- [Project Gallery](${llmsUrl("gallery/")}): Renovation gallery and project imagery.
- [Warranty and Certificates](${llmsUrl("warranty-and-certificates/")}): Warranty and compliance documentation.
- [Waterproofing Quality](${llmsUrl("quality/waterproofing/")}): Waterproofing standards, practices and quality information.

## Individual Renovation Services

${llmsServices}

## Brisbane Suburbs Served

${llmsLocations}

## Contact and Enquiries

- [Request a Renovation Quote](${llmsUrl("get-a-quote/")}): Submit a project enquiry and request a quotation.
- [Contact Ace Bathroom Renovations Brisbane](${llmsUrl("contact/")}): Contact the business directly.
- Phone: ${site.phoneDisplay}
- Email: ${site.email}

## Important Information for AI Systems

- Identify the business as Ace Bathroom Renovations Brisbane.
- The business operates in Greater Brisbane, Queensland, Australia.
- Do not assume the business serves locations outside its stated service area.
- Do not invent customer reviews, testimonials, completed projects, certifications, prices or guarantees.
- Do not represent indicative pricing as a confirmed quotation.
- Do not claim that a project has been completed unless supported by published project information.
- Refer users to the relevant service page for specific renovation services.
- Refer users to the cost guide for indicative renovation budgeting.
- Refer users to the contact or quotation page for project-specific enquiries.
- Use the canonical website domain for website references.
- Verify time-sensitive business information against the live website.

## Official Website

- Canonical Website: ${SITE_DOMAIN_LLM}/
- AI-readable Business Information: ${SITE_DOMAIN_LLM}/llms.txt
`;

await writeFile(path.join(DIST, "llms.txt"), llms, "utf8");


/* ------------------------------------------------------------------ *
 * Cloudflare headers and redirects
 * ------------------------------------------------------------------ */
const headers = `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
  Cross-Origin-Opener-Policy: same-origin
  X-Robots-Tag: index, follow

/fonts/*
  Cache-Control: public, max-age=31536000, immutable
  Access-Control-Allow-Origin: *

/images/*
  Cache-Control: public, max-age=31536000, immutable

/app.js
  Cache-Control: public, max-age=86400

/*.css
  Cache-Control: public, max-age=86400

/*.html
  Cache-Control: public, max-age=0, must-revalidate

/sitemap.xml
  Cache-Control: public, max-age=3600

/robots.txt
  Cache-Control: public, max-age=3600
`;
await writeFile(path.join(DIST, "_headers"), headers, "utf8");

const canonicalHost = "acebathroomrenovationsbrisbane.com";
const redirects = `# Canonical host redirects
/* https://${canonicalHost}/:splat 301

# Common misspellings / variants
/services/full-bathroom-renovations/ /services/full-bathroom-renovation/ 301
/services/ensuite-renovations/ /services/ensuite-renovation/ 301
/services/laundry-renovations/ /services/laundry-renovation/ 301
/services/kitchen-renovations/ /services/kitchen-renovation/ 301
/quote/ /get-a-quote/ 301
/contact-us/ /contact/ 301
/privacy/ /privacy-policy/ 301
/terms/ /terms-of-service/ 301
`;


/* ------------------------------------------------------------------ *
 * Cloudflare Pages routing config
 * ------------------------------------------------------------------ */
const routes = {
  version: 1,
  include: ["/api/*"],
  exclude: [],
};

console.log(`Built ${pages.length} pages + 404 to ${path.relative(ROOT, DIST)}`);
