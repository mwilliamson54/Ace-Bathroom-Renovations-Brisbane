import { site, trustPoints, images } from "../config.mjs";
import { services } from "../data/services.mjs";
import { locations, regionHubs } from "../data/locations.mjs";
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
  mail,
} from "../lib/layout.mjs";

const homeFaqs = [
  {
    q: "How much does a bathroom renovation cost in Brisbane?",
    a: "Most full bathroom renovations in Brisbane fall between $18,000 and $45,000, depending on room size, layout changes, substrate condition and the finishes you choose. Compact ensuites and laundries generally cost less. We inspect the room before quoting and provide a fixed written price with allowances and exclusions shown. Our <a href=\"/cost-guide/\">Brisbane bathroom renovation cost guide</a> sets out the full breakdown.",
  },
  {
    q: "How long does a bathroom renovation take?",
    a: "A standard full bathroom takes about 10–15 working days on site after demolition. A compact ensuite or laundry may take 8–12 days, while layout changes, structural repairs or custom joinery can extend the programme to 3–4 weeks. Tile and fixture lead times also affect the start date. You receive a milestone schedule before work begins.",
  },
  {
    q: "Are you a licensed bathroom renovator in Brisbane?",
    a: "Yes. We hold a QBCC builder licence restricted to kitchen, bathroom and laundry work, along with Certificate III qualifications in wall and floor tiling (CPC31320) and construction waterproofing (CPC31420). Licence details are published once on our <a href=\"/about/\">About page</a>, where you can verify them on the QBCC register.",
  },
  {
    q: "Do you provide a waterproofing certificate?",
    a: "Yes. Wet-area waterproofing is applied to AS 3740 by a licensed waterproofer, flood tested before tiling and documented with a compliance certificate at handover. This matters for insurance, resale and any future warranty claim.",
  },
  {
    q: "Can I stay in my home during the renovation?",
    a: "Yes, if you have another bathroom or toilet. We contain dust, protect floors and clean daily. For single-bathroom homes, we plan the sequence to minimise the period without a usable toilet and discuss temporary options before work starts.",
  },
  {
    q: "Do you renovate apartments and townhouses?",
    a: "Yes. We work with owners, tenants and body corporate managers across Brisbane. We provide scope and methodology information for approval, protect common areas, coordinate lift access and work within agreed building hours.",
  },
  {
    q: "Can you change the layout of my bathroom?",
    a: "Often yes. Relocating a toilet, vanity or shower depends on joist direction, waste fall and stack access. We assess those constraints during the site inspection and price the plumbing and structural work as part of the written scope rather than as an unknown extra.",
  },
  {
    q: "What areas of Brisbane do you cover?",
    a: "We cover Greater Brisbane, including the northside, southside, eastside, westside and inner city. Regular service areas include Chermside, Aspley, Geebung, Coorparoo, Carindale, Morningside, Yeronga, Sunnybank Hills, Forest Lake, Indooroopilly, Toowong, The Gap and Spring Hill.",
  },
];

const homeBody = `
${hero({
  image: images.hero,
  alt: images.heroAlt,
  eyebrow: "Brisbane's bathroom renovation team",
  h1: "Bathroom renovations Brisbane homeowners can trust",
  lead:
    "Full bathrooms, ensuites and laundries rebuilt by a QBCC licensed builder. One team manages demolition, waterproofing, tiling, plumbing and fit-off — with a fixed written scope and a realistic programme.",
  primary: { href: "/get-a-quote/", label: "Get a free quote" },
  secondary: { href: tel, label: `Call ${site.phoneDisplay}` },
  trust: ["QBCC licensed builder", "AS 3740 waterproofing", "Fixed written quote", "Open 7am–10pm, 7 days"],
  card: `<p><strong>Talk to a builder, not a call centre.</strong> Call <a href="${tel}">${site.phoneDisplay}</a> or <a href="${mail}">email us</a> for an on-site measure and written quote.</p>`,
})}
${trustStrip()}

<section class="section" aria-label="Bathroom renovation services in Brisbane">
  <div class="container">
    <div class="split split--wide-left">
      <div class="split__body">
        <p class="eyebrow">Bathroom renovations, done properly</p>
        <h2>A Brisbane bathroom builder that owns the whole job</h2>
        <p class="lead">One builder. One team. One point of accountability.</p>
        <p>We are the builder. That means the team who inspects your bathroom is the team accountable for the waterproofing, the tiling, the plumbing coordination and the final handover. You get one written scope, one programme and one point of contact from the first phone call to the day the room is ready to use.</p>
        <p>Brisbane bathrooms have particular demands. The humidity punishes poor ventilation. Many homes were built before modern waterproofing standards, and plenty have had three decades of minor updates layered over original sheeting. We plan for those realities: moisture checks, substrate repairs, correct falls, externally ducted exhaust fans and a membrane system that is tested before a single tile goes down.</p>
        <p>Whether you are renovating a family bathroom in Chermside, reworking an ensuite in Coorparoo or modernising an apartment bathroom in Spring Hill, the standard is the same. A bathroom should be safe, easy to clean, comfortable to use and still look right in ten years.</p>
        <ul class="checklist checklist--2col">
          <li>${icons.check()}Full strip-out and rebuild</li>
          <li>${icons.check()}Waterproofing with certificate</li>
          <li>${icons.check()}Wall and floor tiling</li>
          <li>${icons.check()}Plumbing and electrical coordination</li>
          <li>${icons.check()}Vanity, screen and fixture installation</li>
          <li>${icons.check()}Make-good, clean and handover</li>
        </ul>
        <div class="btn-group">
          <a class="btn btn-teal" href="/services/">Explore our services</a>
          <a class="btn btn-outline" href="/about/">Meet the team</a>
        </div>
      </div>
      <div class="split__media split__media--offset">
        <img src="${images.full}" alt="Completed Brisbane bathroom with walk-in shower and large-format porcelain tiles" width="900" height="675" loading="lazy" decoding="async">
        <div class="split__badge"><strong>AS 3740</strong><span>Waterproofing to the Australian standard, with compliance documentation.</span></div>
      </div>
    </div>
  </div>
</section>

<section class="section section--pale" aria-label="Our bathroom renovation services">
  <div class="container">
    <div class="section-head section-head--split">
      <div>
        <p class="eyebrow">What we renovate</p>
        <h2>Bathroom renovation services across Brisbane</h2>
        <p class="lead">From a compact ensuite to a full family bathroom, a laundry or a kitchen, every project is scoped, waterproofed and finished by one accountable team.</p>
      </div>
      <a class="btn btn-outline" href="/services/">All services ${icons.arrow(16)}</a>
    </div>
    <div class="grid grid-3">
      ${services
        .slice(0, 6)
        .map(
          (s) => `<article class="card card--service">
        <div class="card__media"><img src="${s.image}" alt="${s.imageAlt}" width="640" height="400" loading="lazy" decoding="async"></div>
        <div class="card__body">
          <h3>${s.name}</h3>
          <p>${s.description.split(".")[0]}.</p>
          <a class="text-link" href="/services/${s.slug}/">View service ${icons.arrow(15)}</a>
        </div>
      </article>`
        )
        .join("")}
    </div>
    <div class="grid grid-3" style="margin-top:18px">
      ${services
        .slice(6)
        .map(
          (s) => `<article class="card">
        <div class="card__icon">${icons.bath(21)}</div>
        <h3>${s.name}</h3>
        <p>${s.description.split(".")[0]}.</p>
        <a class="text-link" href="/services/${s.slug}/">View ${s.name} ${icons.arrow(15)}</a>
      </article>`
        )
        .join("")}
    </div>
  </div>
</section>

<section class="section" aria-label="Why Brisbane homeowners choose Ace">
  <div class="container">
    <div class="section-head section-head--center">
      <p class="eyebrow">Why homeowners call us</p>
      <h2>What a well-run bathroom renovation should feel like</h2>
      <p class="lead">Most complaints about bathroom renovators are not about tiles. They are about uncertainty: unclear scope, surprise costs, trades who do not turn up and problems that appear months later. We built our process around removing that uncertainty.</p>
    </div>
    <div class="grid grid-3">
      <article class="card card--number"><span class="card__num">01</span><h3>A scope you can actually read</h3><p>Your quote lists demolition, sheeting, waterproofing, tiling, plumbing, electrical, fixtures and make-good, with allowances and exclusions shown. No vague lump sum, no "to be confirmed" line that becomes a variation later.</p></article>
      <article class="card card--number"><span class="card__num">02</span><h3>One accountable team</h3><p>We coordinate the trades rather than handing you a list of phone numbers. Our project lead manages the schedule, checks the work and keeps you informed about who is on site and what happens next.</p></article>
      <article class="card card--number"><span class="card__num">03</span><h3>Waterproofing treated seriously</h3><p>The membrane is applied to AS 3740, reinforced at every junction, flood tested and photographed before tiling. You receive a compliance certificate at handover, not a verbal assurance.</p></article>
      <article class="card card--number"><span class="card__num">04</span><h3>Ventilation that suits Brisbane</h3><p>Exhaust fans are sized for the room and ducted outside, not into the ceiling space. It is one of the least glamorous parts of a renovation and one of the most important for controlling condensation and mould.</p></article>
      <article class="card card--number"><span class="card__num">05</span><h3>A realistic programme</h3><p>We allow proper cure times, order materials before demolition and tell you when lead times affect the start date. A quick promise that ignores waterproofing cure time is not a favour.</p></article>
      <article class="card card--number"><span class="card__num">06</span><h3>A proper handover</h3><p>We test every tap, waste and fan with you, inspect the finishes, explain care instructions and provide your documentation. The job is not finished until you have had the chance to check it properly.</p></article>
    </div>
  </div>
</section>

<section class="section section--teal" aria-label="Our renovation process">
  <div class="container">
    <div class="split">
      <div class="split__body">
        <p class="eyebrow">How it works</p>
        <h2>A clear path from first call to handover</h2>
        <p>You do not need to have selections made or a design finished before you call. We start with the room, your budget and how you want to use it. From there we measure, test, document and price the work before anything is ordered.</p>
        <p>If a layout will not drain properly, if the floor structure needs repair, or if asbestos is present, we tell you early. Discovering those issues during demolition is how budgets blow out. Our process is designed to find them while there is still time to make a sensible decision.</p>
        <div class="btn-group">
          <a class="btn btn-white" href="/our-process/">See the full process</a>
          <a class="btn btn-outline-white" href="/get-a-quote/">Book a measure</a>
        </div>
      </div>
      <div>
        <div class="steps" style="gap:12px">
          <div class="step"><h3>Call and brief</h3><p>Tell us the room, your timing and what is not working. We book an on-site measure.</p></div>
          <div class="step"><h3>Inspect and measure</h3><p>We check substrate, drainage, ventilation and access, then prepare an itemised written quote.</p></div>
          <div class="step"><h3>Select and schedule</h3><p>Tiles, tapware and fixtures are confirmed, lead times checked and build dates locked in.</p></div>
          <div class="step"><h3>Build and handover</h3><p>Strip-out, rough-in, waterproofing, tiling, fit-off, testing, clean and documentation.</p></div>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section" aria-label="Bathroom renovation costs">
  <div class="container">
    <div class="section-head section-head--center">
      <p class="eyebrow">Budget planning</p>
      <h2>What does a bathroom renovation cost in Brisbane?</h2>
      <p class="lead">Every room is different, but these planning bands reflect the scope and finish level of typical Brisbane projects. They are a starting point, not a quote.</p>
    </div>
    <div class="price-bands">
      <article class="price-band"><span class="price-band__tier">Essential</span><h3>Cosmetic refresh</h3><div class="price-band__price">$12,000 – $18,000</div><p>Existing layout retained. Strip-out, waterproofing, standard porcelain tiles, new vanity and a semi-frameless screen.</p></article>
      <article class="price-band price-band--featured"><span class="price-band__tier">Most common</span><h3>Full renovation</h3><div class="price-band__price">$18,000 – $32,000</div><p>Full rebuild, minor plumbing adjustments, large-format tiles, wall-hung vanity and a frameless shower screen.</p></article>
      <article class="price-band"><span class="price-band__tier">Custom</span><h3>Layout and joinery</h3><div class="price-band__price">$32,000 – $45,000</div><p>Reconfigured wet area, custom vanity, feature tiling, premium tapware and recessed storage.</p></article>
      <article class="price-band"><span class="price-band__tier">Luxury</span><h3>Architectural fit-out</h3><div class="price-band__price">$45,000+</div><p>Structural changes, freestanding bath, imported stone, underfloor heating and bespoke joinery.</p></article>
    </div>
    <p class="map-note" style="text-align:center;margin-top:16px">Indicative planning ranges. Final pricing depends on site access, substrate condition, tile selection and documented scope. <a href="/cost-guide/">Read the full cost guide</a> or try the <a href="/bathroom-renovation-cost-calculator/">cost calculator</a>.</p>
    <div class="btn-group" style="justify-content:center;margin-top:18px">
      <a class="btn btn-primary" href="/get-a-quote/">Get a fixed written quote</a>
      <a class="btn btn-outline" href="${tel}">${icons.phone(17)} Call ${site.phoneDisplay}</a>
    </div>
  </div>
</section>

<section class="section section--sand" aria-label="Why a written scope matters">
  <div class="container">
    <div class="split split--reverse">
      <div class="split__media">
        <img src="${images.tiling}" alt="Tiler setting out large-format bathroom tiles with levelling clips" width="900" height="675" loading="lazy" decoding="async">
      </div>
      <div class="split__body">
        <p class="eyebrow">The details that matter</p>
        <h2>Cheap quotes usually leave something out</h2>
        <p>Bathroom quotes are easy to make look competitive if the scope is incomplete. A low price may exclude waterproofing, screeding, waste removal, exhaust ducting, shower screens, tapware or painting. It may also assume the substrate is sound when nobody has checked.</p>
        <p>We quote the room we have inspected. If the floor needs levelling, the wall sheeting needs replacement or the shower waste needs to move, that is in the scope. If something genuinely cannot be known until demolition, we set a transparent provisional allowance and agree how it will be priced.</p>
        <p>This is also why we do not promise a "bathroom in five days". Waterproofing needs cure time, screeds need to dry and tiles need to be laid properly. A realistic programme protects the result.</p>
        <ul class="checklist">
          <li>${icons.check()}Itemised scope with allowances and exclusions</li>
          <li>${icons.check()}Site inspection before pricing, not after</li>
          <li>${icons.check()}Variations agreed in writing before work proceeds</li>
        </ul>
        <a class="text-link" href="/choosing-a-contractor/">How to choose a bathroom renovator ${icons.arrow(15)}</a>
      </div>
    </div>
  </div>
</section>

<section class="section" aria-label="Bathroom renovation ideas and gallery">
  <div class="container">
    <div class="section-head section-head--split">
      <div>
        <p class="eyebrow">Design and finishes</p>
        <h2>Bathroom renovation ideas for Brisbane homes</h2>
        <p class="lead">Good bathrooms are planned around light, storage, ventilation and easy cleaning. These are the choices that make the biggest difference in a subtropical climate.</p>
      </div>
      <a class="btn btn-outline" href="/gallery/">View the gallery ${icons.arrow(16)}</a>
    </div>
    <div class="grid grid-3">
      <article class="card"><div class="card__icon">${icons.ruler(21)}</div><h3>Large-format porcelain</h3><p>Fewer grout lines, a calmer surface and easier cleaning. Rectified porcelain works well on walls and floors when the substrate is properly prepared.</p></article>
      <article class="card"><div class="card__icon">${icons.droplet(21)}</div><h3>Frameless walk-in showers</h3><p>10mm toughened glass and a hobless entry make a compact room feel larger. Correct fall and waterproofing detail are essential.</p></article>
      <article class="card"><div class="card__icon">${icons.sparkle(21)}</div><h3>Layered lighting</h3><p>Warm ambient light, mirror task lighting and a separate shower light make the room usable at night without a stark overhead glare.</p></article>
      <article class="card"><div class="card__icon">${icons.home(21)}</div><h3>Wall-hung storage</h3><p>A wall-hung vanity and recessed shaving cabinet free up floor space and make cleaning easier, particularly in smaller bathrooms.</p></article>
      <article class="card"><div class="card__icon">${icons.leaf(21)}</div><h3>Ventilation first</h3><p>An externally ducted exhaust fan sized for the room is more valuable than a decorative finish. It protects the building and your health.</p></article>
      <article class="card"><div class="card__icon">${icons.hammer(21)}</div><h3>Practical tapware</h3><p>Quality cartridges, accessible isolation valves and finishes that suit Brisbane water make maintenance easier years later.</p></article>
    </div>
  </div>
</section>

<section class="section section--pale" aria-label="Service areas">
  <div class="container">
    <div class="section-head section-head--split">
      <div>
        <p class="eyebrow">Where we work</p>
        <h2>Bathroom renovations across Greater Brisbane</h2>
        <p class="lead">We work from the inner city to the north, south, east and west. Choose your area for local housing notes, landmarks and project considerations.</p>
      </div>
      <a class="btn btn-outline" href="/locations/">All locations ${icons.arrow(16)}</a>
    </div>
    <div class="grid grid-3">
      ${regionHubs
        .map(
          (h) => `<a class="location-card" href="/${h.slug}/">
        <div><strong>${h.suburb.replace("Brisbane ", "")}</strong><span>${h.suburbs.slice(0, 4).join(" · ")}</span></div>
        ${icons.arrow(18)}
      </a>`
        )
        .join("")}
      ${locations
        .slice(0, 4)
        .map(
          (l) => `<a class="location-card" href="/${l.slug}/">
        <div><strong>${l.suburb}</strong><span>${l.postcode} · ${l.region}</span></div>
        ${icons.arrow(18)}
      </a>`
        )
        .join("")}
    </div>
    <div class="area-list" style="margin-top:22px">
      ${locations.map((l) => `<a href="/${l.slug}/">Bathroom renovations ${l.suburb}</a>`).join("")}
    </div>
  </div>
</section>

${mapSection({
  title: "Bathroom renovation services across Brisbane",
  eyebrow: "Service coverage",
  intro: "From Chermside and Aspley in the north to Sunnybank Hills and Forest Lake in the south, and from Carindale in the east to Indooroopilly and The Gap in the west.",
  query: "Brisbane QLD, Australia",
  note: "We are a mobile service and come to you. Our office address is listed once on the About page for identification and licence verification.",
})}

<section class="section section--white" aria-label="Reviews and referees">
  <div class="container">
    <div class="split">
      <div class="split__body">
        <p class="eyebrow">Honest proof</p>
        <h2>Ask for local referees, not just stars</h2>
        <p>Online reviews are useful, but a bathroom renovation is a significant purchase and a five-star rating cannot tell you how a builder handled a hidden leak or a delayed tile delivery. We are happy to provide referees from completed Brisbane projects and to walk you through the documentation from a recent job.</p>
        <p>We do not publish invented testimonials or review schema markup. When clients agree to share their feedback and photos, we publish them with permission. Until then, ask us directly and we will connect you with a past client.</p>
        <div class="btn-group">
          <a class="btn btn-teal" href="/reviews/">Our review policy</a>
          <a class="btn btn-outline" href="/contact/">Request a referee</a>
        </div>
      </div>
      <div class="review-placeholder">
        ${icons.star(30)}
        <h3>Real feedback, published with permission</h3>
        <p>We are building a public gallery of completed Brisbane renovations and client feedback. No stock testimonials, no fabricated ratings. Call us for current referees and project documentation.</p>
      </div>
    </div>
  </div>
</section>

${faqSection(homeFaqs, {
  title: "Bathroom renovation questions, answered",
  eyebrow: "Before you call",
  intro: "The questions Brisbane homeowners ask us most often about cost, timing, licensing, waterproofing and living at home during the work.",
})}

<section class="section section--white" aria-label="Final call to action">
  <div class="container container-narrow" style="text-align:center">
    <p class="eyebrow" style="justify-content:center">One conversation is enough to start</p>
    <h2>Planning a bathroom renovation in Brisbane?</h2>
    <p class="lead">Call our team for a straight answer about scope, budget and timing. If we are not the right fit, we will tell you. If we are, we will arrange an on-site measure and put everything in writing.</p>
    <div class="btn-group" style="justify-content:center">
      <a class="btn btn-primary btn-lg" href="${tel}">${icons.phone(18)} Call ${site.phoneDisplay}</a>
      <a class="btn btn-outline btn-lg" href="/get-a-quote/">Request a quote</a>
    </div>
    <p style="font-size:.82rem;color:var(--muted);margin-top:16px">${site.hoursLong} · ${site.email}</p>
  </div>
</section>
`;

export default {
  path: "/",
  title: "Bathroom Renovations Brisbane | Ace Bathroom Renovations",
  description:
    "QBCC licensed bathroom renovations Brisbane. Full bathrooms, ensuites, laundries and kitchens, waterproofed and tiled by one team. Call (07) 8590 6941.",
  image: images.og,
  body: homeBody,
  schema: [{
    "@type": "FAQPage",
    "@id": `${site.domain}/#faq`,
    mainEntity: homeFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a.replace(/<[^>]+>/g, "") },
    })),
  }],
  noBreadcrumbs: true,
};
