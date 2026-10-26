import { site, images } from "../config.mjs";
import { services } from "../data/services.mjs";
import { locations, regionHubs } from "../data/locations.mjs";
import {
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

const serviceFaqs = [
  {
    q: "What bathroom renovation services do you offer in Brisbane?",
    a: "We renovate full bathrooms, small bathrooms, ensuites, laundries and kitchens. We also provide bathroom waterproofing, wall and floor tiling, accessible bathroom modifications, apartment and body corporate renovations, Queenslander renovations and commercial bathroom fit-outs. Every service is delivered by our own project team with licensed trades.",
  },
  {
    q: "Do you handle waterproofing and tiling yourselves?",
    a: "Yes. Waterproofing and tiling are core parts of our scope, not optional extras passed to another company. Wet-area membranes are applied to AS 3740, flood tested and documented. Tiling is set out, screeded and finished by qualified tilers, with Certificate III wall and floor tiling (CPC31320) held by our team.",
  },
  {
    q: "Can you renovate a bathroom and laundry at the same time?",
    a: "Yes. Combining a bathroom and laundry renovation often saves mobilisation, plumbing and delivery costs because the team is already on site. We stage the work so you keep a usable toilet and laundry where possible, and confirm the sequence in your written programme.",
  },
  {
    q: "Do you provide a fixed written quote?",
    a: "We provide an itemised written quote after an on-site inspection. It lists the scope, allowances, exclusions, payment stages and provisional items. If hidden damage is found after demolition, we document it, explain the options and agree any variation in writing before proceeding.",
  },
  {
    q: "How do I choose between a full and a small bathroom renovation?",
    a: "A full renovation replaces the room back to framing and rebuilds the waterproofing, tiling, plumbing and fit-off. A small bathroom renovation may retain the existing layout and some services while replacing finishes and fixtures. The right choice depends on the age and condition of the room, not just its size. We assess both options during the site measure.",
  },
  {
    q: "Do you work in apartments and townhouses?",
    a: "Yes. We work with owners, tenants and body corporate managers across Brisbane. We provide scope and methodology information for approval, protect common areas, coordinate lift and parking access and work within agreed building hours.",
  },
];

export function renderServicesHub() {
  const body = `
${hero({
  image: images.full,
  alt: "Bathroom renovation services in Brisbane by Ace Bathroom Renovations",
  eyebrow: "Bathroom renovation services",
  h1: "Bathroom renovation services in Brisbane",
  lead:
    "Full bathrooms, ensuites, laundries, kitchens, waterproofing, tiling and accessible modifications. One QBCC licensed team manages the scope, trades, documentation and handover.",
  primary: { href: "/get-a-quote/", label: "Get a free quote" },
  secondary: { href: tel, label: `Call ${site.phoneDisplay}` },
  trust: ["QBCC licensed builder", "AS 3740 waterproofing", "Fixed written scope", "Open 7am–10pm, 7 days"],
  card: `<p><strong>Not sure which service you need?</strong> Call <a href="${tel}">${site.phoneDisplay}</a> and describe the room. We will tell you what the work involves and book an on-site measure.</p>`,
  page: true,
})}
${trustStrip()}

<section class="section">
  <div class="container">
    <div class="section-head section-head--center">
      <p class="eyebrow">What we do</p>
      <h2>One builder for the whole wet-area package</h2>
      <p class="lead">A bathroom renovation is not one trade. It is demolition, carpentry, plumbing, electrical, waterproofing, tiling, joinery, glazing and painting, sequenced so each stage protects the next. We coordinate the entire package rather than handing you a list of separate contractors.</p>
    </div>
    <div class="grid grid-3">
      ${services
        .map(
          (s) => `<article class="card card--service">
        <div class="card__media"><img src="${s.image}" alt="${s.imageAlt}" width="640" height="400" loading="lazy" decoding="async"></div>
        <div class="card__body">
          <h3>${s.name}</h3>
          <p>${s.description.split(".")[0]}.</p>
          <p style="font-size:.78rem;color:var(--muted);margin-top:8px">From ${s.priceFrom}</p>
          <a class="text-link" href="/services/${s.slug}/">View service ${icons.arrow(15)}</a>
        </div>
      </article>`
        )
        .join("")}
    </div>
  </div>
</section>

<section class="section section--pale">
  <div class="container">
    <div class="detail-layout">
      <div class="prose">
        <p class="eyebrow">Choosing the right scope</p>
        <h2>Which bathroom renovation is right for your home?</h2>
        <p>The name on the service page matters less than the condition of your room. A bathroom that is 20 years old, has a leaking shower and original sheeting needs a different scope from a room that was renovated five years ago but has tired finishes. We inspect the substrate, drainage, ventilation and waterproofing before recommending a direction.</p>
        <p>A <a href="/services/full-bathroom-renovation/">full bathroom renovation</a> is the right choice when the room is being stripped back, the layout is changing or the waterproofing has reached the end of its life. It includes new sheeting, membrane, tiling, plumbing and fit-off. It is the most common scope for Brisbane homes built before the 1990s.</p>
        <p>A <a href="/services/small-bathroom-renovation/">small bathroom renovation</a> suits compact rooms where the layout works but the finishes, fixtures and waterproofing need renewal. We use wall-hung vanities, recessed storage, frameless screens and careful set-out to make the room feel larger without moving walls.</p>
        <p>An <a href="/services/ensuite-renovation/">ensuite renovation</a> is usually a more private, lower-traffic project. The scope often focuses on storage, lighting, ventilation and a comfortable shower. Because ensuites are often internal rooms, mechanical ventilation and moisture control matter even more than in a main bathroom.</p>
        <p>A <a href="/services/laundry-renovation/">laundry renovation</a> has to balance appliance space, storage, bench area and wet-area compliance. If the laundry adjoins a bathroom or kitchen, renovating them together can reduce disruption and trade mobilisation costs.</p>
        <p>Not every project is a full rebuild. <a href="/services/waterproofing/">Waterproofing</a> and <a href="/services/tiling/">tiling</a> can be scoped as standalone remedial work when the underlying structure is sound. We test and document the existing conditions first so the repair addresses the cause, not just the visible symptom.</p>

        <h2>What every service includes</h2>
        <p>Regardless of the service, the same standards apply. You receive a written scope before work starts, a named project contact, a programme with cure times allowed, protection for the rest of your home, and a handover with testing and documentation. We do not use a low headline price to win the job and then recover margin through unexplained variations.</p>
        <ul class="checklist checklist--2col">
          <li>${icons.check()}Site inspection and moisture check</li>
          <li>${icons.check()}Itemised written quote</li>
          <li>${icons.check()}Licensed plumbing and electrical</li>
          <li>${icons.check()}AS 3740 waterproofing</li>
          <li>${icons.check()}Waterproofing compliance certificate</li>
          <li>${icons.check()}Written variations before work</li>
          <li>${icons.check()}Site protection and daily clean</li>
          <li>${icons.check()}Formal handover and care notes</li>
        </ul>

        <h2>What we do not do</h2>
        <p>The team who answers your call is the team accountable for the build. We manage the trades, waterproofing, tiling and documentation ourselves, so the scope and programme reflect the actual work. You deal with one builder from measure to handover, not a chain of separate trades.</p>
        <p>We also do not promise a bathroom in five days. Waterproofing needs cure time, screeds need to dry and tiles need to be laid properly. A programme that ignores those realities is a marketing promise, not a construction schedule.</p>

        <h2>Where we work</h2>
        <p>We renovate across Greater Brisbane, including the northside, southside, eastside, westside and inner city. Our regular service areas include Chermside, Aspley, Geebung, Coorparoo, Carindale, Morningside, Yeronga, Sunnybank Hills, Forest Lake, Indooroopilly, Toowong, The Gap and Spring Hill.</p>
        <div class="area-list" style="margin-bottom:28px">
          ${locations.map((l) => `<a href="/${l.slug}/">Bathroom renovations ${l.suburb}</a>`).join("")}
        </div>
        <p>Each local page includes housing notes, landmarks and the practical issues we see in that area. If your suburb is not listed, call us and we will confirm coverage.</p>

        <h2>How the project runs</h2>
        <div class="steps" style="margin:22px 0 30px">
          <div class="step"><h3>Call and brief</h3><p>Tell us the room, the building and your timing. We book an on-site measure.</p></div>
          <div class="step"><h3>Inspect and quote</h3><p>We check substrate, drainage, ventilation and access, then issue an itemised written quote.</p></div>
          <div class="step"><h3>Select and schedule</h3><p>Tiles, tapware, fixtures and joinery are confirmed, lead times checked and dates locked in.</p></div>
          <div class="step"><h3>Build and hand over</h3><p>Strip-out, rough-in, waterproofing, tiling, fit-off, testing and documentation.</p></div>
        </div>

        <h2>Cost planning by service</h2>
        <p>These ranges are a guide for Brisbane homes and include the core wet-area works. They are not a substitute for a site-specific quote. Finish level, layout changes, access and the condition of the substrate can move a project significantly within or beyond these bands.</p>
        <div class="table-wrap"><table class="price-table">
          <thead><tr><th scope="col">Service</th><th scope="col">Typical planning range</th></tr></thead>
          <tbody>
            <tr><td>Full bathroom renovation</td><td>$18,000 – $45,000</td></tr>
            <tr><td>Small bathroom renovation</td><td>$14,000 – $28,000</td></tr>
            <tr><td>Ensuite renovation</td><td>$15,000 – $32,000</td></tr>
            <tr><td>Laundry renovation</td><td>$10,000 – $24,000</td></tr>
            <tr><td>Kitchen renovation</td><td>$20,000 – $55,000</td></tr>
            <tr><td>Bathroom waterproofing only</td><td>$2,500 – $4,500</td></tr>
            <tr><td>Tiling only</td><td>$4,000 – $12,000</td></tr>
            <tr><td>Accessible bathroom modifications</td><td>$12,000 – $30,000</td></tr>
          </tbody>
        </table></div>
        <p style="font-size:.82rem;color:var(--muted)">Read the <a href="/cost-guide/">full Brisbane bathroom renovation cost guide</a>, use the <a href="/bathroom-renovation-cost-calculator/">cost calculator</a> or call us for a scope-specific conversation.</p>
      </div>
      <aside class="sidebar" aria-label="Contact and service links">
        <div class="sidebar-card sidebar-card--teal">
          <h3>Talk to a Brisbane builder</h3>
          <p>Describe the room and we will explain the likely scope, the approvals involved and the next step. No call-centre screening.</p>
          <a class="btn btn-white" href="${tel}">${icons.phone(17)} ${site.phoneDisplay}</a>
          <a class="btn btn-outline-white" href="/get-a-quote/">Request a quote</a>
          <p style="font-size:.76rem;margin:10px 0 0">${site.hoursLong}</p>
        </div>
        <div class="sidebar-card">
          <h3>Popular services</h3>
          <ul class="sidebar-list">
            ${services
              .slice(0, 8)
              .map((s) => `<li><a href="/services/${s.slug}/">${s.name} ${icons.chevron(14)}</a></li>`)
              .join("")}
          </ul>
        </div>
        <div class="sidebar-card">
          <h3>Planning tools</h3>
          <ul class="sidebar-list">
            <li><a href="/cost-guide/">Bathroom cost guide ${icons.chevron(14)}</a></li>
            <li><a href="/bathroom-renovation-cost-calculator/">Cost calculator ${icons.chevron(14)}</a></li>
            <li><a href="/how-it-works/">How it works ${icons.chevron(14)}</a></li>
            <li><a href="/choosing-a-contractor/">Choosing a contractor ${icons.chevron(14)}</a></li>
          </ul>
        </div>
        <div class="sidebar-card">
          <h3>Service areas</h3>
          <ul class="sidebar-list">
            ${regionHubs
              .map((h) => `<li><a href="/${h.slug}/">${h.suburb.replace("Brisbane ", "")} ${icons.chevron(14)}</a></li>`)
              .join("")}
            <li><a href="/locations/">All Brisbane locations ${icons.chevron(14)}</a></li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</section>

${faqSection(serviceFaqs, {
  title: "Bathroom service questions",
  eyebrow: "Practical answers",
  intro: "What Brisbane homeowners ask about scope, licensing, waterproofing and choosing the right renovation.",
})}

${ctaBand({
  title: "Which service fits your bathroom?",
  text: `Call ${site.phoneDisplay} and describe the room. We will give you a straight answer on scope, budget and timing, then arrange an on-site measure if it is a fit.`,
})}
`;

  return {
    path: "/services/",
    title: "Bathroom Renovation Services Brisbane | Ace Bathrooms",
    description:
      "Brisbane bathroom renovation services: bathrooms, ensuites, small rooms, laundries, kitchens, waterproofing and tiling. QBCC licensed. Call (07) 8590 6941.",
    image: images.full,
    body,
    crumbs: [{ name: "Services", url: "/services/" }],
    schema: [faqSchema(serviceFaqs)],
  };
}

const locationFaqs = [
  {
    q: "Do you cover my Brisbane suburb?",
    a: "We work across Greater Brisbane within approximately 35 km of the CBD, including the northside, southside, eastside, westside and inner city. If your suburb is not listed, call us with the postcode and we will confirm availability before booking a measure.",
  },
  {
    q: "Are you a local Brisbane builder?",
    a: "Yes. We are a Brisbane builder. The team who inspects your bathroom is accountable for the waterproofing, tiling, trade coordination and handover.",
  },
  {
    q: "Do you have an office I can visit?",
    a: "Our office address is listed once on the About page for identification and licence records. We are a mobile service and carry out the measure and build at your property, so visits are by appointment rather than drop-in.",
  },
  {
    q: "Do local housing types affect the renovation cost?",
    a: "Yes. Older Queenslanders may need floor levelling, substrate repair and careful plumbing upgrades. Apartments need body corporate approval, lift access and protection of common areas. Homes on steep sites may need additional access planning. We assess these factors during the site inspection and price them in the written scope.",
  },
  {
    q: "Do you charge extra to travel to my area?",
    a: "There is no separate travel surcharge for our standard Greater Brisbane service area. If a property is outside the normal radius or requires special access arrangements, we explain any additional cost before you commit.",
  },
  {
    q: "Can you renovate a bathroom in an apartment building?",
    a: "Yes. We regularly work in apartment buildings and can provide scope and methodology information for body corporate approval. We protect common areas, coordinate lift bookings and work within agreed building hours.",
  },
];

const regionImage = {
  "Brisbane Northside": images.full,
  "Brisbane Southside": images.ensuite,
  "Brisbane Eastside": images.apartment,
  "Brisbane Westside": images.queenslander,
  "Inner Brisbane": images.apartment,
};

export function renderLocationsHub() {
  const body = `
${hero({
  image: images.hero,
  alt: "Bathroom renovations across Greater Brisbane",
  eyebrow: "Service areas",
  h1: "Bathroom renovations across Greater Brisbane",
  lead:
    "From the northside to the southside, eastside, westside and inner city, we renovate bathrooms in the housing types Brisbane actually has — Queenslanders, brick homes, townhouses and apartments.",
  primary: { href: "/get-a-quote/", label: "Get a free quote" },
  secondary: { href: tel, label: `Call ${site.phoneDisplay}` },
  trust: ["Mobile service", "Local on-site measure", "QBCC licensed builder", "Open 7am–10pm, 7 days"],
  card: `<p><strong>Not sure if we cover your area?</strong> Call <a href="${tel}">${site.phoneDisplay}</a> with your suburb and postcode. We will confirm coverage before booking.</p>`,
  page: true,
})}
${trustStrip()}

<section class="section">
  <div class="container">
    <div class="section-head section-head--center">
      <p class="eyebrow">Where we work</p>
      <h2>Local renovation guides for Brisbane suburbs</h2>
      <p class="lead">Brisbane is not one housing market. A Queenslander in The Gap, a brick-and-tile family home in Sunnybank Hills and an apartment in Spring Hill each bring different structural, access and approval issues. Choose your area for local housing notes, landmarks and the practical considerations we plan for.</p>
    </div>
    <div class="grid grid-3">
      ${regionHubs
        .map(
          (h) => `<a class="location-card" href="/${h.slug}/">
        <div><strong>${h.suburb.replace("Brisbane ", "")}</strong><span>${h.suburbs.slice(0, 5).join(" · ")}</span></div>
        ${icons.arrow(18)}
      </a>`
        )
        .join("")}
    </div>
  </div>
</section>

<section class="section section--pale">
  <div class="container">
    <div class="section-head section-head--split">
      <div>
        <p class="eyebrow">Suburb guides</p>
        <h2>Bathroom renovations by suburb</h2>
        <p class="lead">Each guide covers the local housing stock, heritage and access considerations, nearby landmarks and the questions homeowners ask most often.</p>
      </div>
      <a class="btn btn-outline" href="/services/">Explore services ${icons.arrow(16)}</a>
    </div>
    <div class="grid grid-2">
      ${locations
        .map(
          (l) => `<a class="location-card" href="/${l.slug}/">
        <div><strong>Bathroom renovations ${l.suburb}</strong><span>${l.postcode} · ${l.region}</span></div>
        ${icons.arrow(18)}
      </a>`
        )
        .join("")}
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="detail-layout">
      <div class="prose">
        <p class="eyebrow">Local knowledge</p>
        <h2>How Brisbane's housing affects your renovation</h2>
        <p>The same bathroom scope can cost different amounts in different parts of Brisbane because the building beneath the tiles is different. We plan for the housing type before we price the work, not after demolition reveals a surprise.</p>

        <h3>Northside: Chermside, Aspley and Geebung</h3>
        <p>The northside has a large stock of post-war brick and tile homes, interwar cottages and newer townhouses. Bathrooms in these homes often have original sheeting, undersized exhaust fans and plumbing that has been extended over several renovations. Family bathrooms tend to be larger, which creates more tiling and waterproofing area but also more opportunity to improve storage and layout.</p>

        <h3>Southside: Yeronga, Sunnybank Hills and Forest Lake</h3>
        <p>The southside spans some of Brisbane's oldest riverside suburbs and large planned estates. In older homes, we frequently find movement, floor level changes and drainage that needs upgrading. In newer estates, the issues are more likely to be builder-grade finishes, poor ventilation and waterproofing detailing that has not aged well. Apartment and townhouse projects also require body corporate coordination.</p>

        <h3>Eastside: Coorparoo, Carindale and Morningside</h3>
        <p>Eastside housing includes Queenslanders, character cottages, post-war homes and contemporary townhouses. Renovations often involve protecting character features while improving light, ventilation and storage. Sloping blocks and tight side access can affect delivery and waste removal, so we plan those logistics before the start date.</p>

        <h3>Westside: Indooroopilly, Toowong and The Gap</h3>
        <p>The westside combines riverfront apartments, established family homes and leafy hillside properties. Steep sites, retaining walls and narrow streets can make access difficult. Older homes may have suspended timber floors, which affects tiling substrate, waterproofing and waste planning. We inspect the floor structure before committing to a layout.</p>

        <h3>Inner Brisbane: Spring Hill and surrounds</h3>
        <p>Inner-city bathrooms are often compact and built within heritage or apartment constraints. We work with body corporate requirements, heritage considerations, limited parking and shared service shafts. Careful set-out, wall-hung fixtures and recessed storage make the most of small rooms without compromising compliance.</p>

        <h2>What every local project includes</h2>
        <p>Local knowledge changes the planning, not the standard. Every project receives a site measure, an itemised written scope, licensed plumbing and electrical work, AS 3740 waterproofing, a compliance certificate, a site protection plan and a formal handover. The phone number and email are the same across every suburb because the same team does the work.</p>

        <h2>Service radius and availability</h2>
        <p>Our standard service area is Greater Brisbane, within approximately 35 km of the Brisbane CBD. We regularly work across the north, south, east and west, including the suburbs listed on this page. If you are near the edge of the radius, call us and we will confirm before booking. We do not claim branches we do not have, and we do not publish fake local addresses.</p>

        <h2>What to have ready when you call</h2>
        <ul class="checklist">
          <li>${icons.check()}Your suburb and postcode</li>
          <li>${icons.check()}The type of property — house, townhouse or apartment</li>
          <li>${icons.check()}Whether the bathroom is upstairs, downstairs or on a slab</li>
          <li>${icons.check()}What is not working — leaks, mould, layout, storage or age</li>
          <li>${icons.check()}Your rough budget and preferred timing</li>
          <li>${icons.check()}Any body corporate or heritage approval requirements</li>
        </ul>
        <p>You do not need plans, selections or a finished design to call. A short conversation is usually enough to work out whether a site measure is the right next step.</p>

        <h2>Nearby areas and related reading</h2>
        <p>If you are comparing locations, the <a href="/cost-guide/">Brisbane bathroom renovation cost guide</a> explains how site conditions affect price, while <a href="/how-it-works/">how it works</a> sets out the sequence from first call to handover. For apartment projects, read the <a href="/services/apartment-body-corporate-renovation/">apartment and body corporate service page</a>.</p>
      </div>
      <aside class="sidebar" aria-label="Contact and location links">
        <div class="sidebar-card sidebar-card--teal">
          <h3>Book a local measure</h3>
          <p>Tell us your suburb and property type. We will confirm coverage and arrange a time to inspect the room.</p>
          <a class="btn btn-white" href="${tel}">${icons.phone(17)} ${site.phoneDisplay}</a>
          <a class="btn btn-outline-white" href="/get-a-quote/">Request a quote</a>
          <p style="font-size:.76rem;margin:10px 0 0">${site.hoursLong}</p>
        </div>
        <div class="sidebar-card">
          <h3>Regional hubs</h3>
          <ul class="sidebar-list">
            ${regionHubs
              .map((h) => `<li><a href="/${h.slug}/">${h.suburb.replace("Brisbane ", "")} ${icons.chevron(14)}</a></li>`)
              .join("")}
          </ul>
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
          <h3>Planning</h3>
          <ul class="sidebar-list">
            <li><a href="/cost-guide/">Cost guide ${icons.chevron(14)}</a></li>
            <li><a href="/bathroom-renovation-cost-calculator/">Cost calculator ${icons.chevron(14)}</a></li>
            <li><a href="/our-process/">Our process ${icons.chevron(14)}</a></li>
            <li><a href="/faqs/">FAQs ${icons.chevron(14)}</a></li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</section>

${mapSection({
  title: "Greater Brisbane service area",
  eyebrow: "Coverage map",
  intro: "Our mobile team works across Greater Brisbane, from the outer north and south to the inner city. The map is indicative of the service area, not a street address.",
  query: "Brisbane QLD, Australia",
  note: "We come to you for the measure and the build. Office and licence details are listed once on the About page.",
})}

${faqSection(locationFaqs, {
  title: "Service area questions",
  eyebrow: "Local answers",
  intro: "Coverage, local housing, approvals and what to expect when you call.",
})}

${ctaBand({
  title: "Renovating in your part of Brisbane?",
  text: `Call ${site.phoneDisplay} with your suburb and property type. We will confirm coverage, discuss the likely scope and book an on-site measure.`,
})}
`;

  return {
    path: "/locations/",
    title: "Bathroom Renovation Locations Brisbane | Ace Bathrooms",
    description:
      "Bathroom renovations across Greater Brisbane, including Chermside, Coorparoo, Yeronga, Indooroopilly, Spring Hill and nearby suburbs. Call (07) 8590 6941.",
    image: images.hero,
    body,
    crumbs: [{ name: "Locations", url: "/locations/" }],
    schema: [faqSchema(locationFaqs)],
  };
}
