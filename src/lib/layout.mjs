import { site, navigation, legalPages } from "../config.mjs";
import { icons, logoMark } from "./icons.mjs";
import { allPages, directoryGroups, legal as legalPagesData } from "../data/pages.mjs";
import { services } from "../data/services.mjs";
import { regionHubs, locations } from "../data/locations.mjs";

let assets = { css: "" };
export function setAssets(a) { assets = a; }

export const esc = (v = "") =>
  String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");

export const abs = (p = "/") => `${site.domain}${p.startsWith("/") ? p : `/${p}`}`;

const tel = site.phoneHref;
const mail = site.emailHref;

export function phoneLink(cls = "", label = site.phoneDisplay, iconSize = 18) {
  return `<a class="${cls}" href="${tel}" aria-label="Call Ace Bathroom Renovations Brisbane on ${site.phoneDisplay}">${icons.phone(iconSize)}<span>${esc(label)}</span></a>`;
}

/* ------------------------------------------------------------------ *
 * Schema
 * ------------------------------------------------------------------ */
export function organizationSchema() {
  return {
    "@type": ["HomeAndConstructionBusiness", "GeneralContractor"],
    "@id": `${site.domain}/#organization`,
    name: site.name,
    alternateName: ["Ace Bathroom Renovations", "Ace Bathrooms Brisbane"],
    url: site.domain,
    logo: { "@type": "ImageObject", url: abs("/images/logo.png"), width: 512, height: 512 },
    image: abs("/images/og-image.png"),
    description:
      "QBCC licensed bathroom renovation builder serving Brisbane and Greater Brisbane. Full bathroom renovations, ensuites, laundries, kitchens, waterproofing, tiling and accessible modifications.",
    telephone: site.phoneIntl,
    email: site.email,
    currenciesAccepted: "AUD",
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.suburb,
      addressRegion: site.address.state,
      postalCode: site.address.postcode,
      addressCountry: site.address.countryCode,
    },
    geo: { "@type": "GeoCoordinates", latitude: site.address.lat, longitude: site.address.lng },
    hasMap: site.mapLink,
    areaServed: [
      { "@type": "City", name: "Brisbane" },
      ...locations.map((l) => ({ "@type": "City", name: `${l.suburb}, Queensland` })),
      ...regionHubs.map((h) => ({ "@type": "AdministrativeArea", name: h.suburb })),
    ],
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "07:00",
      closes: "22:00",
    },
    knowsAbout: services.map((s) => s.name),
    slogan: "Bathroom renovations, done properly.",
    serviceArea: { "@type": "GeoCircle", geoMidpoint: { "@type": "GeoCoordinates", latitude: site.address.lat, longitude: site.address.lng }, geoRadius: "35000" },
  };
}

export function websiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${site.domain}/#website`,
    url: site.domain,
    name: site.name,
    inLanguage: "en-AU",
    publisher: { "@id": `${site.domain}/#organization` },
  };
}

function breadcrumbTrail(path, extra = []) {
  const trail = [{ name: "Home", url: "/" }];
  if (path !== "/") {
    const found = allPages.find((p) => p.path === path);
    if (found && !extra.length) {
      if (found.group === "Services" && path !== "/services/") trail.push({ name: "Services", url: "/services/" });
      else if (found.group === "Locations" && path !== "/locations/") trail.push({ name: "Locations", url: "/locations/" });
      else if (found.group === "Guides") trail.push({ name: "Guides", url: "/blog/" });
    }
    trail.push(...extra);
  }
  return trail;
}

export function breadcrumbSchema(path, extra = []) {
  const trail = breadcrumbTrail(path, extra);
  return {
    "@type": "BreadcrumbList",
    "@id": `${abs(path)}#breadcrumb`,
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: abs(item.url),
    })),
  };
}

export function webPageSchema({ path, title, description, image }) {
  return {
    "@type": "WebPage",
    "@id": `${abs(path)}#webpage`,
    url: abs(path),
    name: title,
    description,
    isPartOf: { "@id": `${site.domain}/#website` },
    about: { "@id": `${site.domain}/#organization` },
    inLanguage: "en-AU",
    primaryImageOfPage: { "@type": "ImageObject", url: abs(image || "/images/og-image.png") },
    breadcrumb: { "@id": `${abs(path)}#breadcrumb` },
    datePublished: "2026-10-01",
    dateModified: "2026-10-26",
  };
}

export function faqSchema(faqs) {
  const plain = (value = "") =>
    String(value)
      .replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/\s+/g, " ")
      .trim();
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: plain(f.q),
      acceptedAnswer: { "@type": "Answer", text: plain(f.a) },
    })),
  };
}

export function serviceSchema(service) {
  return {
    "@type": "Service",
    "@id": `${abs(`/services/${service.slug}/`)}#service`,
    name: service.h1,
    serviceType: service.name,
    description: service.description,
    provider: { "@id": `${site.domain}/#organization` },
    areaServed: [
      { "@type": "City", name: "Brisbane" },
      ...locations.map((l) => ({ "@type": "City", name: l.suburb })),
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.name} inclusions`,
      itemListElement: service.scope.slice(0, 6).map((item) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: item.title, description: item.text },
      })),
    },
  };
}

/* ------------------------------------------------------------------ *
 * Header / footer
 * ------------------------------------------------------------------ */
function isActive(path, href) {
  if (href === "/") return path === "/";
  return path === href || path.startsWith(href);
}

function renderTopbar() {
  return `<div class="topbar">
  <div class="container topbar__inner">
    <div class="topbar__group">
      <span class="topbar__item">${icons.shield(15)}<span>QBCC licensed builder</span></span>
      <span class="topbar__sep" aria-hidden="true"></span>
      <span class="topbar__item">${icons.clock(15)}<span>${site.hoursShort}</span></span>
    </div>
    <div class="topbar__group">
      <a class="topbar__item" href="${mail}">${icons.mail(15)}<span>${site.email}</span></a>
      <span class="topbar__sep" aria-hidden="true"></span>
      <a class="topbar__item" href="${tel}">${icons.phone(15)}<strong>${site.phoneDisplay}</strong></a>
    </div>
  </div>
</div>`;
}

function renderHeader(path) {
  const [primary, ...rest] = navigation;
  const links = navigation
    .map((item) => `<a href="${item.href}"${isActive(path, item.href) ? ' aria-current="page"' : ""}>${item.label}</a>`)
    .join("");
  return `${renderTopbar()}
<header class="site-header" id="site-header">
  <div class="container header__inner">
    <a class="brand" href="/">
      ${logoMark()}
      <span class="brand__text">
        <span class="brand__name">ACE</span>
        <span class="brand__sub">BATHROOM RENOVATIONS BRISBANE</span>
      </span>
    </a>
    <nav class="nav-desktop" aria-label="Primary navigation">${links}</nav>
    <div class="header__actions">
      <a class="header__phone" href="${tel}">${icons.phone(18)} ${site.phoneDisplay}</a>
      <a class="btn btn-primary btn-sm" href="/get-a-quote/">Get a quote</a>
    </div>
    <button class="nav-toggle" id="nav-toggle" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu">
      ${icons.menu(24)}
    </button>
  </div>
</header>
${renderMobileNav(path)}`;
}

function renderMobileNav(path) {
  const topServices = services.slice(0, 6);
  const topLocations = locations.slice(0, 6);
  return `<div class="mobile-nav" id="mobile-nav" aria-hidden="true" aria-label="Mobile navigation">
  <div class="mobile-nav__top">
    <a class="brand mobile-nav__brand" href="/">
      ${logoMark()}
      <span class="brand__text"><span class="brand__name">ACE</span><span class="brand__sub">BATHROOM RENOVATIONS BRISBANE</span></span>
    </a>
    <button class="mobile-nav__close" id="nav-close" type="button" aria-label="Close menu">${icons.close(24)}</button>
  </div>
  <ul class="mobile-nav__links">
    ${navigation.map((item) => `<li><a href="${item.href}"${isActive(path, item.href) ? ' aria-current="page"' : ""}>${item.label} ${icons.chevron(16)}</a></li>`).join("")}
    <li><a href="/reviews/">Reviews ${icons.chevron(16)}</a></li>
  </ul>
  <p class="mobile-nav__label">Popular services</p>
  <ul class="mobile-nav__sub">
    ${topServices.map((s) => `<li><a href="/services/${s.slug}/">${s.name}</a></li>`).join("")}
    <li><a href="/services/">All services ${icons.chevron(14)}</a></li>
  </ul>
  <p class="mobile-nav__label">Popular areas</p>
  <ul class="mobile-nav__sub">
    ${topLocations.map((l) => `<li><a href="/${l.slug}/">${l.suburb}</a></li>`).join("")}
    <li><a href="/locations/">All locations ${icons.chevron(14)}</a></li>
  </ul>
  <div class="mobile-nav__cta">
    <a class="btn btn-primary btn-block" href="${tel}">${icons.phone(18)} Call ${site.phoneDisplay}</a>
    <a class="btn btn-outline-white btn-block" href="/get-a-quote/">Request a quote</a>
  </div>
  <p class="mobile-nav__contact">${site.hoursLong}<br><a href="${mail}">${site.email}</a></p>
</div>`;
}

function footerCol(title, pages) {
  return `<div class="footer-col">
    <h3 class="footer-heading">${title}</h3>
    <ul class="footer-links">
      ${pages.map((p) => `<li><a href="${p.path}">${esc(p.label)}</a></li>`).join("")}
    </ul>
  </div>`;
}

function renderDirectory() {
  return `<details class="footer-directory">
  <summary>Full site directory — every page</summary>
  <div class="directory-grid">
    ${directoryGroups
      .map(
        (g) => `<div class="directory-col">
        <h4>${g.name}</h4>
        <ul>${g.pages.map((p) => `<li><a href="${p.path}">${esc(p.label)}</a></li>`).join("")}</ul>
      </div>`
      )
      .join("")}
    <div class="directory-col">
      <h4>Legal</h4>
      <ul>${legalPagesData.map((p) => `<li><a href="${p.path}">${esc(p.label)}</a></li>`).join("")}</ul>
    </div>
  </div>
</details>`;
}

function renderFooter(path) {
  const isLegal = legalPages.includes(path);
  const popularServices = services.slice(0, 8);
  const popularLocations = [
    ...regionHubs.map((h) => ({ path: `/${h.slug}/`, label: h.suburb.replace("Brisbane ", "") + " hub" })),
    ...locations.slice(0, 5).map((l) => ({ path: `/${l.slug}/`, label: l.suburb })),
  ];
  const company = allPages.filter((p) => p.group === "Company" && p.path !== "/" && p.path !== "/blog/").slice(0, 8);
  const planning = allPages.filter((p) => p.group === "Planning");
  return `<footer class="site-footer" aria-label="Site footer">
  <div class="container">
    <div class="footer-top">
      <div class="footer-col footer-brand">
        <a class="brand" href="/">
          ${logoMark()}
          <span class="brand__text"><span class="brand__name">ACE</span><span class="brand__sub">BATHROOM RENOVATIONS BRISBANE</span></span>
        </a>
        <p class="footer-tagline">Bathroom renovations, done properly.</p>
        <p class="footer-desc">QBCC licensed bathroom and kitchen renovation builder. One team for design, waterproofing, tiling and fit-off across Greater Brisbane.</p>
        ${phoneLink("footer-phone", site.phoneDisplay, 17)}
        <ul class="footer-contact">
          <li>${icons.mail(15)}<a href="${mail}">${site.email}</a></li>
          <li>${icons.clock(15)}<span>${site.hoursLong}</span></li>
          <li>${icons.pin(15)}<span>Mobile service — we come to you across Greater Brisbane.</span></li>
        </ul>
      </div>
      ${footerCol("Services", [
        ...popularServices.map((s) => ({ path: `/services/${s.slug}/`, label: s.navLabel })),
        { path: "/services/", label: "All services" },
      ])}
      ${footerCol("Areas", [...popularLocations, { path: "/locations/", label: "All locations" }])}
      ${footerCol("Company & Planning", [...planning, ...company.slice(0, 6), { path: "/contact/", label: "Contact us" }])}
    </div>
    ${isLegal || path === "/404.html" ? "" : renderDirectory()}
    <div class="footer-bottom">
      <p style="margin:0">© ${new Date().getFullYear()} ${site.name}. All rights reserved.</p>
      <div class="footer-legal">
        <a href="/privacy-policy/">Privacy Policy</a>
        <a href="/terms-of-service/">Terms of Service</a>
        <a href="/warranty-and-certificates/">Warranty &amp; Certificates</a>
      </div>
    </div>
    <p class="footer-disclaimer">Ace Bathroom Renovations Brisbane is a QBCC licensed builder restricted to kitchen, bathroom and laundry work. Licence details and verification information are available on our About page. Quotes are subject to site inspection and written scope. Images on this site are representative illustrations until client project photography is published with permission.</p>
  </div>
</footer>
<div class="mobile-bar" id="mobile-bar">
  <a class="mobile-bar__call" href="${tel}">${icons.phone(17)} Call now</a>
  <a class="mobile-bar__quote" href="/get-a-quote/">${icons.quote(17)} Get a quote</a>
</div>`;
}

/* ------------------------------------------------------------------ *
 * Page shell
 * ------------------------------------------------------------------ */
export function renderPage({
  path,
  title,
  description,
  image = "/images/og-image.png",
  body,
  schema = [],
  crumbs = [],
  noBreadcrumbs = false,
  bodyClass = "",
}) {
  const graph = [
    organizationSchema(),
    websiteSchema(),
    webPageSchema({ path, title, description, image }),
    breadcrumbSchema(path, crumbs),
    ...schema,
  ];
  const canonical = abs(path);
  const ogImage = abs(image);
  const trail = breadcrumbTrail(path, crumbs);
  return `<!doctype html>
<html lang="en-AU">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${canonical}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta name="theme-color" content="#004155">
<meta name="format-detection" content="telephone=yes">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${site.name}">
<meta property="og:locale" content="en_AU">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${ogImage}">
<meta property="og:image:alt" content="${site.name} — ${esc(title)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${ogImage}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" href="/fonts/inter-400.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/jost-400.woff2" as="font" type="font/woff2" crossorigin>
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-4LT7P577ZF"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-4LT7P577ZF');
</script>
<style>${assets.css}</style>
<script type="application/ld+json">${JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c")}</script>
</head>
<body class="${bodyClass}">
<a class="skip-link" href="#main">Skip to content</a>
${renderHeader(path)}
${noBreadcrumbs ? "" : `<nav class="breadcrumbs" aria-label="Breadcrumb"><div class="container"><ol>${trail
    .map((item, i) =>
      i === trail.length - 1
        ? `<li aria-current="page">${esc(item.name)}</li>`
        : `<li><a href="${item.url}">${esc(item.name)}</a></li>`
    )
    .join("")}</ol></div></nav>`}
<main id="main">
${body}
</main>
${renderFooter(path)}
<script src="/app.js" defer></script>
</body>
</html>`;
}

/* ------------------------------------------------------------------ *
 * Reusable sections
 * ------------------------------------------------------------------ */
export function hero({
  image = "/images/hero-bathroom.webp",
  alt = "Contemporary bathroom renovation in Brisbane",
  eyebrow,
  h1,
  lead,
  primary = { href: "/get-a-quote/", label: "Get a free quote" },
  secondary = { href: tel, label: `Call ${site.phoneDisplay}` },
  trust = [],
  card = "",
  page = false,
  meta = "",
}) {
  return `<section class="hero${page ? " hero--page" : ""}">
  <img class="hero__media" src="${image}" alt="${esc(alt)}" width="1600" height="900" fetchpriority="high" decoding="sync">
  <div class="container hero__inner">
    <div class="hero__content">
      ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ""}
      <h1>${h1}</h1>
      ${lead ? `<p class="hero__lead">${lead}</p>` : ""}
      <div class="hero__actions">
        <a class="btn btn-primary btn-lg" href="${primary.href}">${primary.label}</a>
        <a class="btn btn-outline-white btn-lg" href="${secondary.href}">${primary.href === tel ? "" : icons.phone(17)}${secondary.label}</a>
      </div>
      ${meta}
      ${trust.length ? `<ul class="hero__trust">${trust.map((t) => `<li>${icons.check(16)}<span>${t}</span></li>`).join("")}</ul>` : ""}
    </div>
    ${card ? `<div class="hero__card">${card}</div>` : ""}
  </div>
</section>`;
}

export function trustStrip() {
  const points = [
    ["QBCC licensed", "Builder restricted to kitchen, bathroom and laundry"],
    ["AS 3740 waterproofing", "Certified membrane and compliance documentation"],
    ["One accountable team", "Every trade coordinated from strip-out to handover"],
    ["Fixed written scope", "Clear inclusions, allowances and variations"],
  ];
  return `<section class="trust-strip" aria-label="Why choose Ace">
  <div class="container">
    <div class="trust-strip__grid">
      ${points.map(([t, d]) => `<div class="trust-strip__item">${icons.check(19)}<div><strong>${t}</strong><span>${d}</span></div></div>`).join("")}
    </div>
  </div>
</section>`;
}

export function sectionHead({ eyebrow, title, intro, center = false }) {
  return `<div class="section-head${center ? " section-head--center" : ""}">
    ${eyebrow ? `<p class="eyebrow">${esc(eyebrow)}</p>` : ""}
    <h2>${title}</h2>
    ${intro ? `<p class="lead">${intro}</p>` : ""}
  </div>`;
}

export function ctaBand({
  title = "Ready to plan your bathroom renovation?",
  text = "Call our Brisbane team for a straightforward conversation, or send your details and we will arrange an on-site measure and written quote.",
  primary = { href: tel, label: `Call ${site.phoneDisplay}` },
  secondary = { href: "/get-a-quote/", label: "Request a quote" },
  eyebrow = "Get started",
} = {}) {
  return `<section class="cta-band" aria-label="Request a quote">
  <div class="container cta-band__inner">
    <div>
      ${eyebrow ? `<p class="eyebrow eyebrow--light">${esc(eyebrow)}</p>` : ""}
      <h2>${title}</h2>
      <p>${text}</p>
    </div>
    <div class="btn-group">
      <a class="btn btn-white btn-lg" href="${primary.href}">${primary.label}</a>
      <a class="btn btn-outline-white btn-lg" href="${secondary.href}">${secondary.label}</a>
    </div>
  </div>
</section>`;
}

export function faqSection(faqs, { title = "Frequently asked questions", eyebrow = "Practical answers", intro = "" } = {}) {
  return `<section class="section section--pale" aria-label="Frequently asked questions">
  <div class="container">
    <div class="section-head section-head--center">
      <p class="eyebrow">${esc(eyebrow)}</p>
      <h2>${title}</h2>
      ${intro ? `<p class="lead">${intro}</p>` : ""}
    </div>
    <div class="faq-list">
      ${faqs
        .map(
          (f, i) => `<details class="faq-item"${i === 0 ? " open" : ""}>
        <summary>${esc(f.q)}</summary>
        <div class="faq-answer"><p>${f.a}</p></div>
      </details>`
        )
        .join("")}
    </div>
  </div>
</section>`;
}

export function mapSection({ title = "Find us across Brisbane", eyebrow = "Service area", intro = "", query = "Brisbane QLD, Australia", note = "" }) {
  const src = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  return `<section class="section section--white" aria-label="Service area map">
  <div class="container">
    <div class="section-head section-head--center">
      <p class="eyebrow">${esc(eyebrow)}</p>
      <h2>${title}</h2>
      ${intro ? `<p class="lead">${intro}</p>` : ""}
    </div>
    <div class="map-embed">
      <iframe src="${src}" width="600" height="420" style="border:0" allowfullscreen loading="lazy" referrerpolicy="strict-origin-when-cross-origin" title="Google Map: ${esc(title)}"></iframe>
    </div>
    ${note ? `<p class="map-note">${note}</p>` : ""}
  </div>
</section>`;
}

export { icons, logoMark, tel, mail };
