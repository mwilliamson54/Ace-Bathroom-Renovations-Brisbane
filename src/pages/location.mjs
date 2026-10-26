import { site, images } from "../config.mjs";
import { services } from "../data/services.mjs";
import { locationBySlug, regionHubs } from "../data/locations.mjs";
import {
  renderPage,
  hero,
  trustStrip,
  sectionHead,
  ctaBand,
  faqSection,
  mapSection,
  icons,
  tel,
  faqSchema,
} from "../lib/layout.mjs";

const regionImage = {
  "Brisbane Northside": images.full,
  "Brisbane Southside": images.ensuite,
  "Brisbane Eastside": images.apartment,
  "Brisbane Westside": images.queenslander,
  "Inner Brisbane": images.apartment,
};

function localServiceSchema(location) {
  return {
    "@type": "Service",
    "@id": `${site.domain}/${location.slug}/#service`,
    name: `Bathroom renovations ${location.suburb}`,
    serviceType: "Bathroom renovation",
    description: location.description,
    provider: { "@id": `${site.domain}/#organization` },
    areaServed: {
      "@type": "City",
      name: location.suburb === "Brisbane Northside" || location.suburb === "Brisbane Southside" || location.suburb === "Brisbane Eastside" || location.suburb === "Brisbane Westside" || location.suburb === "Inner Brisbane"
        ? location.suburb
        : `${location.suburb}, Queensland`,
    },
  };
}

export function renderLocation(location) {
  const path = `/${location.slug}/`;
  const isHub = Boolean(location.suburbs);
  const nearby = location.nearby.map((slug) => locationBySlug[slug]).filter(Boolean);
  const image = isHub ? regionImage[location.suburb] || images.hero : regionImage[location.region] || images.hero;
  const nearbyArea = nearby.map((n) => n.suburb).join(", ");

  const body = `
${hero({
  image,
  alt: `Bathroom renovation in ${location.suburb}, Brisbane`,
  eyebrow: location.eyebrow,
  h1: location.h1,
  lead: location.description,
  primary: { href: "/get-a-quote/", label: "Get a free quote" },
  secondary: { href: tel, label: `Call ${site.phoneDisplay}` },
  trust: ["QBCC licensed builder", "Local on-site measure", "Fixed written scope", "Waterproofing certificate"],
  card: `<p><strong>Renovating in ${location.suburb}?</strong> Call <a href="${tel}">${site.phoneDisplay}</a> or book an on-site measure with our Brisbane team.</p>`,
  page: true,
  meta: `<div class="page-hero-meta">
    <span class="pill">${icons.pin(14)} ${location.suburb} ${location.postcode}</span>
    <span class="pill">${icons.clock(14)} 7am–10pm, 7 days</span>
    <span class="pill">${icons.shield(14)} QBCC licensed</span>
  </div>`,
})}
${trustStrip()}

<section class="section">
  <div class="container">
    <div class="detail-layout">
      <div class="prose">
        <p class="eyebrow">Local renovation guide</p>
        <h2>Bathroom renovations in ${location.suburb}</h2>
        ${location.intro.map((p) => `<p>${p}</p>`).join("")}

        <h2>Local history and landmarks</h2>
        ${location.history.map((p) => `<p>${p}</p>`).join("")}
        <div class="grid grid-2" style="margin:22px 0 30px">
          ${location.landmarks
            .map(
              (l) => `<article class="card">
            <div class="card__icon">${icons.pin(20)}</div>
            <h3>${l.name}</h3>
            <p>${l.text}</p>
          </article>`
            )
            .join("")}
        </div>

        <h2>Housing stock and what it means for your renovation</h2>
        ${location.housing.map((p) => `<p>${p}</p>`).join("")}

        <h2>What we see in ${location.suburb} bathrooms</h2>
        <div class="grid grid-3" style="margin:22px 0 30px">
          ${location.localNotes
            .map(
              (n, i) => `<article class="card">
            <span class="card__num">${String(i + 1).padStart(2, "0")}</span>
            <h3>${n.title}</h3>
            <p>${n.text}</p>
          </article>`
            )
            .join("")}
        </div>
        <div class="notice"><strong>A note on project evidence.</strong> We do not publish invented local addresses, fake before-and-after photos or made-up client quotes. Our completed-project gallery is published only with client permission. If you would like to see documentation or speak to a referee from a nearby project, ask us when you call and we will arrange it.</div>

        <h2>Bathroom and wet-area services in ${location.suburb}</h2>
        <p>We provide full bathroom renovations, ensuite renovations, small bathroom upgrades, laundry renovations, waterproofing, tiling, kitchen renovations and accessible modifications across ${location.suburb} and the surrounding area. Each project is scoped after an on-site inspection, with allowances and exclusions shown in writing.</p>
        <div class="grid grid-2" style="margin:22px 0 30px">
          ${services
            .slice(0, 8)
            .map(
              (s) => `<article class="card">
            <h3>${s.name}</h3>
            <p>${s.description.split(".")[0]}.</p>
            <a class="text-link" href="/services/${s.slug}/">View service ${icons.arrow(15)}</a>
          </article>`
            )
            .join("")}
        </div>

        <h2>Typical ${location.suburb} renovation costs</h2>
        <p>These planning ranges are a guide for Brisbane homes. Older properties may require substrate repair, floor levelling or drainage work that changes the final price. We confirm a fixed written quote after inspecting the room.</p>
        <div class="table-wrap"><table class="price-table">
          <thead><tr><th scope="col">Project</th><th scope="col">Indicative range</th></tr></thead>
          <tbody>
            <tr><td>Full bathroom renovation</td><td>$18,000 – $38,000</td></tr>
            <tr><td>Ensuite renovation</td><td>$15,000 – $30,000</td></tr>
            <tr><td>Small or compact bathroom</td><td>$14,000 – $26,000</td></tr>
            <tr><td>Laundry renovation</td><td>$10,000 – $24,000</td></tr>
            <tr><td>Waterproofing only</td><td>$2,500 – $4,500</td></tr>
          </tbody>
        </table></div>
        <p style="font-size:.82rem;color:var(--muted)">Indicative only. See the <a href="/cost-guide/">full cost guide</a> for a detailed breakdown of inclusions, allowances and finish levels.</p>

        <h2>How the project runs</h2>
        <p>We follow the same process in ${location.suburb} as everywhere else: inspect, document, schedule, build and hand over. You receive a milestone programme before demolition, a single project lead for questions, and a formal handover with testing and documentation.</p>
        <div class="steps" style="margin:22px 0 30px">
          <div class="step"><h3>Call and brief</h3><p>Tell us about the room, the building and your timing. We book an on-site measure.</p></div>
          <div class="step"><h3>Inspect and quote</h3><p>We check substrate, drainage, ventilation and access, then issue an itemised written quote.</p></div>
          <div class="step"><h3>Select and schedule</h3><p>Tiles, tapware and fixtures are confirmed, lead times checked and dates locked in.</p></div>
          <div class="step"><h3>Build and handover</h3><p>Strip-out, waterproofing, tiling, fit-off, testing, clean and certificates.</p></div>
        </div>

        <h2>Nearby service areas</h2>
        <p>We also renovate bathrooms in ${nearbyArea || "surrounding Brisbane suburbs"}. If your property is near a boundary, call us and we will confirm coverage.</p>
        <div class="grid grid-3" style="margin-bottom:28px">
          ${nearby
            .map(
              (n) => `<a class="location-card" href="/${n.slug}/">
            <div><strong>${n.suburb}</strong><span>${n.region}</span></div>
            ${icons.arrow(18)}
          </a>`
            )
            .join("")}
        </div>
        <p><a class="text-link" href="/locations/">View all Brisbane service areas ${icons.arrow(15)}</a></p>
      </div>

      <aside class="sidebar" aria-label="Contact and local summary">
        <div class="sidebar-card sidebar-card--teal">
          <h3>Book a ${location.suburb} measure</h3>
          <p>Call our Brisbane team or send your details. We will confirm a time to inspect the room and prepare a written quote.</p>
          <a class="btn btn-white" href="${tel}">${icons.phone(17)} ${site.phoneDisplay}</a>
          <a class="btn btn-outline-white" href="/get-a-quote/">Request a quote</a>
          <p style="font-size:.76rem;margin:10px 0 0">${site.hoursLong}</p>
        </div>
        <div class="sidebar-card">
          <h3>Local details</h3>
          <div class="quick-facts" style="grid-template-columns:1fr;margin:0">
            <div class="quick-fact"><span>Suburb</span><strong>${location.suburb}</strong></div>
            <div class="quick-fact"><span>Postcode</span><strong>${location.postcode}</strong></div>
            <div class="quick-fact"><span>Region</span><strong>${location.region}</strong></div>
            <div class="quick-fact"><span>Service</span><strong>On-site, mobile</strong></div>
          </div>
        </div>
        <div class="sidebar-card">
          <h3>Popular services</h3>
          <ul class="sidebar-list">
            ${services
              .slice(0, 6)
              .map((s) => `<li><a href="/services/${s.slug}/">${s.name} ${icons.chevron(14)}</a></li>`)
              .join("")}
          </ul>
        </div>
        <div class="sidebar-card">
          <h3>Helpful reading</h3>
          <ul class="sidebar-list">
            <li><a href="/cost-guide/">Bathroom cost guide ${icons.chevron(14)}</a></li>
            <li><a href="/our-process/">Our renovation process ${icons.chevron(14)}</a></li>
            <li><a href="/choosing-a-contractor/">Choosing a contractor ${icons.chevron(14)}</a></li>
            <li><a href="/warranty-and-certificates/">Warranty and certificates ${icons.chevron(14)}</a></li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</section>

${mapSection({
  title: `Bathroom renovations in ${location.suburb}`,
  eyebrow: "Local service area",
  intro: `Our mobile team works across ${location.suburb} and the surrounding ${location.region.replace("Brisbane ", "").toLowerCase()} area. The map shows the general service location; we come to you for the measure and the build.`,
  query: location.mapQuery,
  note: "Map location is indicative of the suburb, not a street address. Our office address is listed once on the About page.",
})}

${faqSection(location.faqs, {
  title: `${location.suburb} bathroom renovation questions`,
  eyebrow: "Local answers",
  intro: `Cost, timing, approvals and practical questions from homeowners in ${location.suburb}.`,
})}

${ctaBand({
  title: `Planning a bathroom renovation in ${location.suburb}?`,
  text: `Call ${site.phoneDisplay} to discuss your room, or request an on-site measure and fixed written quote.`,
})}
`;

  return {
    path,
    title: location.title,
    description: location.description,
    image: image.replace(".svg", ".svg"),
    body,
    crumbs: [{ name: location.suburb, url: path }],
    schema: [localServiceSchema(location), faqSchema(location.faqs)],
    wordTarget: 1200,
  };
}
