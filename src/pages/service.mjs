import { site, images } from "../config.mjs";
import { services } from "../data/services.mjs";
import { locations } from "../data/locations.mjs";
import {
  renderPage,
  hero,
  trustStrip,
  sectionHead,
  ctaBand,
  faqSection,
  icons,
  tel,
  serviceSchema,
  faqSchema,
} from "../lib/layout.mjs";

export function renderService(service) {
  const path = `/services/${service.slug}/`;
  const related = service.related.map((slug) => services.find((s) => s.slug === slug)).filter(Boolean);
  const quickFacts = service.quickFacts
    .map((f) => `<div class="quick-fact"><span>${f.label}</span><strong>${f.value}</strong></div>`)
    .join("");

  const sidebar = `<aside class="sidebar" aria-label="Service summary and contact">
    <div class="sidebar-card sidebar-card--teal">
      <h3>Talk to a Brisbane builder</h3>
      <p>Call for a straight answer on scope, budget and timing. We book on-site measures across Greater Brisbane.</p>
      <a class="btn btn-white" href="${tel}">${icons.phone(17)} ${site.phoneDisplay}</a>
      <a class="btn btn-outline-white" href="/get-a-quote/">Request a quote</a>
      <p style="font-size:.76rem;margin:10px 0 0">${site.hoursLong}</p>
    </div>
    <div class="sidebar-card">
      <h3>At a glance</h3>
      <div class="quick-facts" style="grid-template-columns:1fr;margin:0">${quickFacts}</div>
    </div>
    <div class="sidebar-card">
      <h3>Related services</h3>
      <ul class="sidebar-list">
        ${related.map((r) => `<li><a href="/services/${r.slug}/">${r.name} ${icons.chevron(14)}</a></li>`).join("")}
      </ul>
    </div>
    <div class="sidebar-card">
      <h3>Where we work</h3>
      <ul class="sidebar-list">
        ${locations.slice(0, 6).map((l) => `<li><a href="/${l.slug}/">${l.suburb} ${icons.chevron(14)}</a></li>`).join("")}
        <li><a href="/locations/">All Brisbane locations ${icons.chevron(14)}</a></li>
      </ul>
    </div>
  </aside>`;

  const body = `
${hero({
  image: service.image,
  alt: service.imageAlt,
  eyebrow: service.eyebrow,
  h1: service.h1,
  lead: service.description,
  primary: { href: "/get-a-quote/", label: "Get a free quote" },
  secondary: { href: tel, label: `Call ${site.phoneDisplay}` },
  trust: ["QBCC licensed builder", "Fixed written scope", "Waterproofing certificate", "One accountable team"],
  card: `<p><strong>${service.name} across Brisbane.</strong> Call <a href="${tel}">${site.phoneDisplay}</a> or request an on-site measure and written quote.</p>`,
  page: true,
})}
${trustStrip()}

<section class="section">
  <div class="container">
    <div class="detail-layout">
      <div>
        <div class="prose">
          <p class="eyebrow">${service.eyebrow}</p>
          <h2>${service.name} in Brisbane, scoped properly</h2>
          <div class="quick-facts">${quickFacts}</div>
          ${service.intro.map((p) => `<p>${p}</p>`).join("")}

          <h2>What is included in our ${service.name.toLowerCase()} scope</h2>
          <p>Every project is different, but the following scope is the foundation we price and manage. Your written quote confirms exactly what applies to your room, including any exclusions and provisional allowances.</p>
          <div class="grid grid-2" style="margin:22px 0 30px">
            ${service.scope
              .map(
                (item, i) => `<article class="card">
              <span class="card__num">${String(i + 1).padStart(2, "0")}</span>
              <h3>${item.title}</h3>
              <p>${item.text}</p>
            </article>`
              )
              .join("")}
          </div>

          <h2>How we approach ${service.name.toLowerCase()}</h2>
          ${service.approach
            .map(
              (a) => `<h3>${a.h}</h3>
            <p>${a.p}</p>`
            )
            .join("")}

          <h2>${service.name} cost guide</h2>
          <p>${service.cost.intro}</p>
          <div class="table-wrap"><table class="price-table">
            <thead><tr><th scope="col">Scope</th><th scope="col">Indicative range</th></tr></thead>
            <tbody>
              ${service.cost.rows.map((r) => `<tr><td>${r.item}</td><td>${r.range}</td></tr>`).join("")}
            </tbody>
          </table></div>
          <p style="font-size:.82rem;color:var(--muted)">${service.cost.note} For a fuller breakdown, read our <a href="/cost-guide/">Brisbane bathroom renovation cost guide</a> or use the <a href="/bathroom-renovation-cost-calculator/">cost calculator</a>.</p>

          <h2>Our ${service.name.toLowerCase()} process</h2>
          <p>One project lead manages the sequence, checks each trade's work and keeps you informed. The programme is agreed before demolition so you know when to expect each stage.</p>
          <div class="steps" style="margin:22px 0 30px">
            ${service.process
              .map(
                (step) => `<div class="step"><h3>${step.title}</h3><p>${step.text}</p></div>`
              )
              .join("")}
          </div>

          <h2>Why homeowners choose our team</h2>
          <p>We are the builder. The team who quotes your project is accountable for the waterproofing, tiling, trade coordination and handover. That direct responsibility is why our scope can be specific and our programme realistic.</p>
          <ul class="checklist">
            <li>${icons.check()}QBCC licensed for kitchen, bathroom and laundry work, with Certificate III qualifications in tiling and waterproofing.</li>
            <li>${icons.check()}AS 3740 waterproofing with flood testing and a compliance certificate.</li>
            <li>${icons.check()}Externally ducted ventilation and moisture-aware detailing for Brisbane's climate.</li>
            <li>${icons.check()}Written variations, agreed before the work proceeds.</li>
            <li>${icons.check()}A formal handover with testing, care instructions and documentation.</li>
          </ul>
          <p>If you are comparing quotes, read our guide to <a href="/choosing-a-contractor/">choosing a bathroom contractor</a> and our <a href="/contractor-standards/">contractor standards</a> so you know what to ask.</p>

          <h2>${service.name} across Brisbane</h2>
          <p>We work across Greater Brisbane, including the northside, southside, eastside, westside and inner city. Local housing conditions affect the scope: older Queenslanders may need floor levelling and substrate repair, while apartments need body corporate approval and careful access planning.</p>
          <div class="area-list" style="margin-bottom:28px">
            ${locations.map((l) => `<a href="/${l.slug}/">${l.suburb}</a>`).join("")}
          </div>
          <p>Not sure which page applies to you? Call us with your suburb and we will point you to the right local information and confirm service availability.</p>
        </div>
      </div>
      ${sidebar}
    </div>
  </div>
</section>

${faqSection(service.faqs, {
  title: `${service.name} questions`,
  eyebrow: "Practical answers",
  intro: `The questions Brisbane homeowners ask most often about ${service.name.toLowerCase()}, costs and timing.`,
})}

${ctaBand({
  title: `Ready to price your ${service.name.toLowerCase()}?`,
  text: `Call ${site.phoneDisplay} for a straightforward conversation, or send your details and we will arrange an on-site measure and written quote.`,
})}
`;

  return {
    path,
    title: service.title,
    description: service.description,
    image: service.image.replace(".svg", ".svg"),
    body,
    crumbs: [{ name: service.name, url: path }],
    schema: [serviceSchema(service), faqSchema(service.faqs)],
  };
}
