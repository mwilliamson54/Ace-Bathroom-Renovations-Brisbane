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
 * ------------------------------------------------------------------ */
const llms = `# ${site.name}

> QBCC licensed bathroom and kitchen renovation builder serving Greater Brisbane, Queensland, Australia. One team for design, demolition, waterproofing, tiling, plumbing coordination and fit-off.

## Contact
- Phone: ${site.phoneDisplay} (${site.phoneIntl})
- Email: ${site.email}
- Hours: ${site.hoursLong}
- Service area: ${site.serviceRadius}
- Mobile service: we work at client properties across Greater Brisbane; site visits by appointment
- Licence: QBCC Licence ${site.licence.number} — Builder Restricted to Kitchen, Bathroom and Laundry. Verification details are published on ${site.domain}/about/.

## Core pages
- Home: ${site.domain}/
- About and licence verification: ${site.domain}/about/
- Services: ${site.domain}/services/
- Locations: ${site.domain}/locations/
- Cost guide: ${site.domain}/cost-guide/
- Cost calculator: ${site.domain}/bathroom-renovation-cost-calculator/
- Quote request: ${site.domain}/get-a-quote/
- Contact: ${site.domain}/contact/
- FAQs: ${site.domain}/faqs/
- Warranty and certificates: ${site.domain}/warranty-and-certificates/
- Waterproofing quality: ${site.domain}/quality/waterproofing/

## Services
${services.map((s) => `- ${s.name}: ${site.domain}/services/${s.slug}/`).join("\n")}

## Suburbs served
${locations.map((l) => `- ${l.suburb}: ${site.domain}/${l.slug}/`).join("\n")}

## Editorial notes
- Cost figures are indicative planning ranges, not quotes.
- Client reviews are not fabricated. Referee details are available on request.
- Gallery images are representative illustrations until client photography is approved.
- The business is mobile and works at client properties; the postal address is published on the About page.
`;
await writeFile(path.join(DIST, "llms.txt"), llms, "utf8");

/* ------------------------------------------------------------------ *
 * Manifest
 * ------------------------------------------------------------------ */
const manifest = {
  name: site.name,
  short_name: "Ace Bathrooms",
  description: "QBCC licensed bathroom renovations across Greater Brisbane.",
  start_url: "/",
  display: "standalone",
  background_color: "#F3F9FF",
  theme_color: "#004155",
  lang: "en-AU",
  icons: [
    { src: "/favicon-32.png", sizes: "32x32", type: "image/png" },
    { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
    { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    { src: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
  ],
};
await writeFile(path.join(DIST, "site.webmanifest"), JSON.stringify(manifest, null, 2), "utf8");

/* ------------------------------------------------------------------ *
 * Cloudflare headers and redirects
 * ------------------------------------------------------------------ */
const headers = `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=()
  Cross-Origin-Opener-Policy: same-origin

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

const canonicalHost = site.domain.replace(/^https:\/\//, "");
const wwwRedirect = canonicalHost.endsWith(".pages.dev")
  ? "# www -> apex redirect is generated once the production domain is attached"
  : `https://www.${canonicalHost}/* https://${canonicalHost}/:splat 301!`;

const redirects = `# Canonical host and common legacy paths
${wwwRedirect}

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
await writeFile(path.join(DIST, "_redirects"), redirects, "utf8");

/* ------------------------------------------------------------------ *
 * Cloudflare Pages routing config
 * ------------------------------------------------------------------ */
const routes = {
  version: 1,
  include: ["/api/*"],
  exclude: [],
};
await writeFile(path.join(DIST, "_routes.json"), JSON.stringify(routes, null, 2), "utf8");

console.log(`Built ${pages.length} pages + 404 to ${path.relative(ROOT, DIST)}`);
