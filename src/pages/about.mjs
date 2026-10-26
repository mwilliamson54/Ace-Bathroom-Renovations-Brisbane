import { site, images } from "../config.mjs";
import { services } from "../data/services.mjs";
import { locations } from "../data/locations.mjs";
import {
  hero,
  trustStrip,
  sectionHead,
  ctaBand,
  faqSection,
  icons,
  tel,
  mail,
  faqSchema,
} from "../lib/layout.mjs";

const aboutFaqs = [
  {
    q: "Who owns and runs Ace Bathroom Renovations Brisbane?",
    a: "Ace is run by our Brisbane team, with the same people accountable for quoting, site coordination and handover. We deliberately keep the business small enough that the person who inspects your bathroom stays involved through the build. We do not use a call centre or a network of independent sales agents.",
  },
  {
    q: "Will the team who quotes my bathroom also build it?",
    a: "Yes. The team who inspects your bathroom stays accountable through the build. We manage the trades, the waterproofing, the tiling and the documentation, so you deal with one builder from measure to handover.",
  },
  {
    q: "What areas of Brisbane do you serve?",
    a: "We work across Greater Brisbane within approximately 35 km of the CBD, including the northside, southside, eastside, westside and inner city. Our regular suburbs include Chermside, Aspley, Geebung, Coorparoo, Carindale, Morningside, Yeronga, Sunnybank Hills, Forest Lake, Indooroopilly, Toowong, The Gap and Spring Hill.",
  },
  {
    q: "Do you carry insurance?",
    a: "Yes. We carry public liability insurance and hold the licensing required for the work we perform. Certificates of currency and licence details can be provided before you sign a contract. If your project requires QBCC home warranty insurance, we will explain whether it applies and how it is arranged.",
  },
  {
    q: "Can I speak to a past client?",
    a: "Yes, where the client has agreed to act as a referee. We do not publish invented testimonials or review markup. Ask us when you call and we will arrange a conversation with a past client from a comparable project, subject to their availability and privacy.",
  },
  {
    q: "Do you provide written quotes and contracts?",
    a: "Yes. Every project receives an itemised written quote and a written contract before work starts. The scope sets out inclusions, allowances, exclusions, payment stages and the process for variations. We do not rely on verbal agreements or a one-line lump sum.",
  },
];

export function renderAbout() {
  const body = `
${hero({
  image: images.about,
  alt: "The Ace Bathroom Renovations Brisbane team on site",
  eyebrow: "About us",
  h1: "About Ace Bathroom Renovations Brisbane",
  lead:
    "A Brisbane bathroom renovation team that quotes the work, manages the trades and hands over the documentation. One accountable builder from the first inspection to the final clean.",
  primary: { href: "/get-a-quote/", label: "Get a free quote" },
  secondary: { href: tel, label: `Call ${site.phoneDisplay}` },
  trust: ["QBCC licensed builder", "Waterproofing certified", "One team, start to finish", "Open 7am–10pm, 7 days"],
  card: `<p><strong>Prefer to talk it through?</strong> Call <a href="${tel}">${site.phoneDisplay}</a> or email <a href="${mail}">${site.email}</a>. We answer seven days a week.</p>`,
  page: true,
})}
${trustStrip()}

<section class="section">
  <div class="container">
    <div class="split split--wide-left">
      <div class="split__body">
        <p class="eyebrow">Who we are</p>
        <h2>A Brisbane bathroom builder, accountable end to end</h2>
        <p class="lead">Ace is a Brisbane renovation team built around a simple idea: quote the room properly, manage the trades directly and stand behind the waterproofing.</p>
        <p>That idea has not changed. We are a bathroom and kitchen renovation builder serving Greater Brisbane. Our team inspects the property, prepares the written scope, coordinates the licensed trades, checks the work and hands over the certificates. The same team stays accountable for every stage, so the scope you sign is the room you get.</p>
        <p>We want most of our work to come from repeat clients and word of mouth. That is deliberate. A bathroom renovation is a significant purchase, and the best marketing we have is a room that still looks and performs well years later. We would rather do fewer projects properly than run a high-volume operation that treats every home as a number.</p>
        <p>Brisbane is our market, and we know how its housing behaves. The humidity, the older stock, the mix of Queenslanders and brick homes, the apartment buildings with body corporate rules and the steep blocks on the westside all affect how a bathroom should be built. We plan for those conditions before demolition, not after a problem appears.</p>
        <ul class="checklist checklist--2col">
          <li>${icons.check()}QBCC licensed builder</li>
          <li>${icons.check()}Waterproofing to AS 3740</li>
          <li>${icons.check()}Tiling and waterproofing qualifications</li>
          <li>${icons.check()}Written fixed scope</li>
          <li>${icons.check()}Licensed plumbing and electrical</li>
          <li>${icons.check()}Formal handover and certificates</li>
        </ul>
        <div class="btn-group">
          <a class="btn btn-teal" href="/our-process/">See how we work</a>
          <a class="btn btn-outline" href="/reviews/">Our review policy</a>
        </div>
      </div>
      <div class="split__media">
        <img src="${images.process}" alt="Bathroom renovation site coordination and documentation" width="900" height="675" loading="lazy" decoding="async">
        <div class="split__badge"><strong>One accountable team</strong><span>Brisbane bathrooms managed end to end, from first measure to handover.</span></div>
      </div>
    </div>
  </div>
</section>

<section class="section section--pale">
  <div class="container">
    <div class="section-head section-head--center">
      <p class="eyebrow">What we stand for</p>
      <h2>The standards behind every project</h2>
      <p class="lead">These are not slogans. They are the decisions we make when a project gets difficult, a hidden defect appears or a supplier lets us down.</p>
    </div>
    <div class="grid grid-3">
      <article class="card"><div class="card__icon">${icons.document(21)}</div><h3>Write it down</h3><p>Scope, allowances, exclusions, variations and payment stages belong in writing. A clear document protects both sides and removes the guesswork from a renovation.</p></article>
      <article class="card"><div class="card__icon">${icons.droplet(21)}</div><h3>Protect the building</h3><p>Waterproofing, falls, ventilation and substrate preparation are invisible when the job is finished. They are also the difference between a bathroom that lasts and one that leaks.</p></article>
      <article class="card"><div class="card__icon">${icons.users(21)}</div><h3>Stay accountable</h3><p>One project lead owns the schedule and the communication. If something is wrong, you have a person to call, not a queue or a generic inbox.</p></article>
      <article class="card"><div class="card__icon">${icons.handshake(21)}</div><h3>Quote honestly</h3><p>We would rather explain why a cheap quote is incomplete than win the job with a price that cannot deliver the scope. Hidden extras damage trust and budgets.</p></article>
      <article class="card"><div class="card__icon">${icons.clock(21)}</div><h3>Respect the programme</h3><p>Waterproofing needs cure time, screeds need to dry and tiles need to be laid properly. We build those realities into the schedule instead of promising an impossible finish date.</p></article>
      <article class="card"><div class="card__icon">${icons.home(21)}</div><h3>Leave it clean</h3><p>Dust containment, floor protection, daily clean-up and orderly waste removal are part of the service. You are living in the home while we work in it.</p></article>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="split split--reverse">
      <div class="split__media">
        <img src="${images.waterproofing}" alt="Waterproofing membrane being applied in a Brisbane bathroom" width="900" height="675" loading="lazy" decoding="async">
      </div>
      <div class="split__body">
        <p class="eyebrow">The team</p>
        <h2>Who you will deal with</h2>
        <p>You will not be handed between a salesperson, a call centre and a subcontractor who has never seen the quote. The same small team stays involved, with specialist licensed trades brought in for the work that requires them.</p>
        <div class="grid grid-2" style="margin-top:20px">
          <article class="card"><h3>Project lead</h3><p>Your main contact from measure to handover. Coordinates the programme, checks the work and keeps you informed.</p></article>
          <article class="card"><h3>Builder and carpenter</h3><p>Handles framing, sheeting, substrate repair, door and architrave work, and the sequencing of the site.</p></article>
          <article class="card"><h3>Waterproofer</h3><p>Prepares the wet area, applies the AS 3740 membrane system, flood tests and documents the result.</p></article>
          <article class="card"><h3>Tiler</h3><p>Sets out, screeds, lays wall and floor tiles, mitres edges and finishes the silicone and grout detail.</p></article>
          <article class="card"><h3>Licensed plumber</h3><p>Rough-in, wastes, falls, tapware, sanitary ware and compliance documentation.</p></article>
          <article class="card"><h3>Licensed electrician</h3><p>Lighting, exhaust fans, heated towel rails, power outlets and safety switch compliance.</p></article>
        </div>
        <p style="margin-top:18px">We keep the team deliberately small so the standard does not depend on which crew happens to be available. The trades we use are licensed, insured and known to us.</p>
      </div>
    </div>
  </div>
</section>

<section class="section section--teal">
  <div class="container">
    <div class="detail-layout">
      <div class="prose">
        <p class="eyebrow">Credentials</p>
        <h2>Licensing, qualifications and insurance</h2>
        <p>Bathroom renovation work involves building, waterproofing, plumbing, electrical and glazing. We hold the builder licensing required for the scope and engage licensed specialists for the regulated trades. Before you sign a contract, you should be able to verify all of it.</p>
        <div class="card" style="background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.18);margin:22px 0">
          <h3 style="color:#fff">QBCC Licence 17347609</h3>
          <p style="color:#cfe3e9">Builder Restricted to Kitchen, Bathroom and Laundry.</p>
          <p style="color:#cfe3e9">Certificate III in Wall and Floor Tiling (CPC31320)<br>Certificate III in Construction Waterproofing (CPC31420)</p>
          <a class="btn btn-white" href="${site.licence.verifyUrl}" target="_blank" rel="noopener">Verify on the QBCC licence register ${icons.arrow(15)}</a>
        </div>
        <p>We also carry public liability insurance and can provide a certificate of currency on request. If your project requires QBCC home warranty insurance, we will confirm whether it applies, explain the premium and include the process in your contract documentation.</p>
        <p>Licence and insurance checks are not paperwork for its own sake. They determine whether the work is lawful, whether you have recourse if something goes wrong and whether your insurer will respond to a claim. Ask every contractor for the same evidence.</p>
      </div>
      <div class="prose">
        <p class="eyebrow">Where we are</p>
        <h2>Office and service area</h2>
        <p>We are a mobile renovation service. The measure, the build and the handover all happen at your property. Our office address is used for business records and licence identification, not as a showroom or a drop-in address.</p>
        <address class="notice" style="font-style:normal">
          <strong>Office and licence records</strong><br>
          ${site.address.display}<br>
          Phone: <a href="${tel}">${site.phoneDisplay}</a><br>
          Email: <a href="${mail}">${site.email}</a><br>
          Hours: ${site.hoursLong}
        </address>
        <p>We work across Greater Brisbane within approximately 35 km of the CBD. Regular service areas include:</p>
        <div class="area-list" style="margin-bottom:20px">
          ${locations.map((l) => `<a href="/${l.slug}/" style="color:#cfe3e9">${l.suburb}</a>`).join("")}
        </div>
        <p>If your property is outside the standard radius or has unusual access requirements, call us and we will confirm whether we can help before booking a measure.</p>
        <p><a class="text-link" href="/locations/" style="color:#fff;border-color:rgba(255,255,255,.35)">View all service areas ${icons.arrow(15)}</a></p>
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="detail-layout">
      <div class="prose">
        <p class="eyebrow">How we choose projects</p>
        <h2>Not every enquiry becomes a job</h2>
        <p>We would rather decline a project than take it on with a scope we cannot deliver. If your budget is below what the work genuinely costs, we will explain the gap and suggest a smaller scope rather than cut corners on waterproofing or substrate preparation. If your timing is unrealistic, we will say so. If the building has a structural or approval issue outside our scope, we will tell you what needs to happen first.</p>
        <p>We also say no to work outside our licensing. We are a builder restricted to kitchen, bathroom and laundry work, and we do not pretend to be a general builder for extensions, pools or new homes. Staying inside our scope is part of how we maintain quality.</p>

        <h2>What we expect from clients</h2>
        <p>Good renovations are a partnership. We ask for clear access to the room, a decision-maker who can approve selections and variations, and prompt feedback when we need a choice. We ask that children and pets are kept clear of the work area, and that valuables are removed before demolition. In apartment buildings, we ask for the body corporate contact and any building rules before the start date.</p>
        <p>We do not ask you to manage trades, source compliance documents or chase suppliers. That is our job. We do ask you to tell us early if something has changed, because a late change is always more expensive than an early one.</p>

        <h2>Local suppliers and materials</h2>
        <p>We source tiles, tapware, sanitary ware, sheeting, membranes and joinery through established Australian suppliers. Where a client has a preferred product or designer, we work with those selections and confirm compatibility, lead times and spares before ordering. We do not lock clients into a single showroom or take undisclosed supplier commissions.</p>

        <h2>Reviews, referees and project evidence</h2>
        <p>We do not publish invented testimonials or fake review markup. When clients agree to share feedback, photos or a referee conversation, we publish or arrange it with their permission. Until a project is documented and approved for publication, we would rather show you the process and the certificates than a stock photo with an invented address. Ask us for current referees and we will connect you.</p>

        <h2>After the handover</h2>
        <p>Our involvement does not end when the last tile is cleaned. You receive care instructions, product information, certificates and warranty details. If something needs attention, call the same number you used to book the job. We will assess it, explain what is covered and arrange a response. Statutory warranties apply under Queensland law, and your contract sets out the specific terms for your project.</p>
      </div>
      <aside class="sidebar" aria-label="About page links">
        <div class="sidebar-card sidebar-card--teal">
          <h3>Talk to our team</h3>
          <p>Ask about licensing, insurance, referees or the likely scope of your bathroom. We answer seven days a week.</p>
          <a class="btn btn-white" href="${tel}">${icons.phone(17)} ${site.phoneDisplay}</a>
          <a class="btn btn-outline-white" href="${mail}">${icons.mail(17)} Email us</a>
          <p style="font-size:.76rem;margin:10px 0 0">${site.hoursLong}</p>
        </div>
        <div class="sidebar-card">
          <h3>Credentials and standards</h3>
          <ul class="sidebar-list">
            <li><a href="/warranty-and-certificates/">Warranty and certificates ${icons.chevron(14)}</a></li>
            <li><a href="/quality/waterproofing/">Waterproofing quality ${icons.chevron(14)}</a></li>
            <li><a href="/contractor-standards/">Our contractor standards ${icons.chevron(14)}</a></li>
            <li><a href="/faqs/">Frequently asked questions ${icons.chevron(14)}</a></li>
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
          <h3>Company</h3>
          <ul class="sidebar-list">
            <li><a href="/our-process/">Our process ${icons.chevron(14)}</a></li>
            <li><a href="/how-it-works/">How it works ${icons.chevron(14)}</a></li>
            <li><a href="/reviews/">Reviews and referees ${icons.chevron(14)}</a></li>
            <li><a href="/contact/">Contact us ${icons.chevron(14)}</a></li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</section>

${faqSection(aboutFaqs, {
  title: "About our team and how we work",
  eyebrow: "Straight answers",
  intro: "Licensing, referees, insurance and what it is like to work with us.",
})}

${ctaBand({
  title: "Want to talk to the builder directly?",
  text: `Call ${site.phoneDisplay} for an honest conversation about your bathroom, or send your details and we will arrange an on-site measure and written quote.`,
})}
`;

  return {
    path: "/about/",
    title: "About Ace Bathroom Renovations Brisbane | QBCC Builder",
    description:
      "Meet the Brisbane team behind Ace Bathroom Renovations. QBCC licensed, AS 3740 waterproofing and one team from measure to handover. Call (07) 8590 6941.",
    image: images.about,
    body,
    crumbs: [{ name: "About Us", url: "/about/" }],
    schema: [faqSchema(aboutFaqs)],
  };
}
