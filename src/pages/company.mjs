import { site, images } from "../config.mjs";
import { services } from "../data/services.mjs";
import { locations } from "../data/locations.mjs";
import {
  hero,
  trustStrip,
  sectionHead,
  ctaBand,
  faqSection,
  mapSection,
  icons,
  tel,
  mail,
  faqSchema,
} from "../lib/layout.mjs";

function contactCard(title = "Talk to a Brisbane builder", text = "Call for a straight answer on scope, budget and timing. We book on-site measures across Greater Brisbane.") {
  return `<div class="sidebar-card sidebar-card--teal">
    <h3>${title}</h3>
    <p>${text}</p>
    <a class="btn btn-white" href="${tel}">${icons.phone(17)} ${site.phoneDisplay}</a>
    <a class="btn btn-outline-white" href="/get-a-quote/">Request a quote</a>
    <p style="font-size:.76rem;margin:10px 0 0">${site.hoursLong}</p>
  </div>`;
}

function linksCard(title, links) {
  return `<div class="sidebar-card">
    <h3>${title}</h3>
    <ul class="sidebar-list">
      ${links.map(([label, href]) => `<li><a href="${href}">${label} ${icons.chevron(14)}</a></li>`).join("")}
    </ul>
  </div>`;
}

function servicesCard() {
  return linksCard("Popular services", services.slice(0, 6).map((s) => [s.name, `/services/${s.slug}/`]));
}

function areasCard() {
  return linksCard("Service areas", [
    ...locations.slice(0, 6).map((l) => [l.suburb, `/${l.slug}/`]),
    ["All locations", "/locations/"],
  ]);
}

/* ------------------------------------------------------------------ *
 * Gallery
 * ------------------------------------------------------------------ */
const galleryFaqs = [
  {
    q: "Are the gallery images real client projects?",
    a: "Some are, when the client has given written permission. The current placeholder illustrations are clearly labelled as representative designs, not photographs of specific client homes. We do not publish invented project addresses or fake before-and-after images. As completed projects are photographed and approved, they will replace the illustrations.",
  },
  {
    q: "Can I see a project in person?",
    a: "We can sometimes arrange a site visit to a completed project with the client's permission, but it depends on their availability and privacy. More commonly, we provide referee contact details and documentation from a comparable job. Ask us when you call.",
  },
  {
    q: "Do you design the bathroom as well as build it?",
    a: "We help with practical layout, set-out, tile selection, fixture compatibility and storage planning. For architectural or interior design services, we can work with your designer or recommend one. We do not pretend that a builder's advice replaces a full design service.",
  },
  {
    q: "What styles do you renovate?",
    a: "We work across contemporary, minimalist, coastal, heritage-sensitive and accessible bathrooms. The right style depends on the home, the users and the maintenance you are comfortable with. We will show you options that suit the room rather than pushing a single look.",
  },
  {
    q: "Can you match my existing tiles or heritage features?",
    a: "Often we can source a close match or a complementary tile. Heritage details such as timber windows, cornices and architraves can be retained or reproduced. We assess what is significant and what is practical before recommending a direction.",
  },
];

const galleryItems = [
  { img: images.gallery1, cat: "bathroom", title: "Large-format family bathroom", text: "Illustrative layout: full-height rectified porcelain, wall-hung vanity and a hobless walk-in shower.", tag: "Bathroom" },
  { img: images.gallery2, cat: "ensuite", title: "Compact ensuite", text: "Illustrative layout: frameless screen, recessed niche and a floating vanity to keep the floor clear.", tag: "Ensuite" },
  { img: images.gallery3, cat: "small", title: "Small bathroom, better storage", text: "Illustrative layout: shallow wall cabinet, mirrored shaving cabinet and a compact back-to-wall toilet.", tag: "Small bathroom" },
  { img: images.gallery4, cat: "laundry", title: "Laundry with bench and storage", text: "Illustrative layout: stacked appliances, deep bench, overhead cupboards and a utility sink.", tag: "Laundry" },
  { img: images.gallery5, cat: "kitchen", title: "Kitchen with island bench", text: "Illustrative layout: handleless joinery, stone bench, integrated appliances and task lighting.", tag: "Kitchen" },
  { img: images.gallery6, cat: "accessible", title: "Accessible wet room", text: "Illustrative layout: level entry, grab rails, fold-down seat and a hand-held shower on a slider.", tag: "Accessible" },
  { img: images.full, cat: "bathroom", title: "Bath and shower combination", text: "Illustrative layout: freestanding bath, separate shower and a warm timber-look vanity.", tag: "Bathroom" },
  { img: images.ensuite, cat: "ensuite", title: "Ensuite with double vanity", text: "Illustrative layout: twin basins, backlit mirrors and a shared wet-area zone.", tag: "Ensuite" },
  { img: images.small, cat: "small", title: "Compact shower and toilet", text: "Illustrative layout: corner shower, slim vanity and full-height tiling to make the room feel taller.", tag: "Small bathroom" },
  { img: images.laundry, cat: "laundry", title: "Combined bathroom and laundry", text: "Illustrative layout: stacked washer and dryer, concealed storage and a separate wet zone.", tag: "Laundry" },
  { img: images.accessible, cat: "accessible", title: "Ageing-in-place bathroom", text: "Illustrative layout: step-free shower, reinforced walls, lever tapware and non-slip floor tiles.", tag: "Accessible" },
  { img: images.apartment, cat: "bathroom", title: "Apartment bathroom", text: "Illustrative layout: compact wall-hung suite, mechanical ventilation and a framed pivot screen.", tag: "Apartment" },
];

export function renderGallery() {
  const body = `
${hero({
  image: images.gallery1,
  alt: "Bathroom renovation inspiration from Ace Bathroom Renovations Brisbane",
  eyebrow: "Gallery and inspiration",
  h1: "Bathroom renovation gallery",
  lead:
    "Ideas for Brisbane bathrooms, ensuites, laundries and kitchens. The current images are representative illustrations, clearly labelled until client photography is approved for publication.",
  primary: { href: "/get-a-quote/", label: "Get a free quote" },
  secondary: { href: tel, label: `Call ${site.phoneDisplay}` },
  trust: ["Honest project evidence", "No fake before-and-after photos", "Brisbane-specific design", "Open 7am–10pm, 7 days"],
  card: `<p><strong>See something you like?</strong> Call <a href="${tel}">${site.phoneDisplay}</a> and we will tell you what it takes to achieve it in your room and budget.</p>`,
  page: true,
})}
${trustStrip()}

<section class="section">
  <div class="container">
    <div class="section-head section-head--center">
      <p class="eyebrow">Representative designs</p>
      <h2>Bathroom ideas for Brisbane homes</h2>
      <p class="lead">Use these layouts to start a conversation about storage, light, ventilation and maintenance. Every design is adapted to the actual room, not copied from a catalogue.</p>
    </div>
    <div class="filter-bar" role="group" aria-label="Filter gallery">
      <button class="filter-btn is-active" type="button" data-filter="all">All</button>
      <button class="filter-btn" type="button" data-filter="bathroom">Bathrooms</button>
      <button class="filter-btn" type="button" data-filter="ensuite">Ensuites</button>
      <button class="filter-btn" type="button" data-filter="small">Small bathrooms</button>
      <button class="filter-btn" type="button" data-filter="laundry">Laundries</button>
      <button class="filter-btn" type="button" data-filter="kitchen">Kitchens</button>
      <button class="filter-btn" type="button" data-filter="accessible">Accessible</button>
    </div>
    <div class="gallery-grid" id="gallery-grid">
      ${galleryItems
        .map(
          (g) => `<figure class="gallery-item" data-category="${g.cat}">
        <img src="${g.img}" alt="${g.text}" width="800" height="600" loading="lazy" decoding="async">
        <figcaption><strong>${g.title}</strong>${g.text}<br><span style="color:var(--blue-600);font-size:.72rem;letter-spacing:.06em;text-transform:uppercase">${g.tag} · illustration</span></figcaption>
      </figure>`
        )
        .join("")}
    </div>
    <p class="map-note" style="margin-top:16px">Images are representative illustrations supplied for layout and finish inspiration. They are not photographs of specific client projects. Client photography will be published only with written permission.</p>
  </div>
</section>

<section class="section section--pale">
  <div class="container">
    <div class="detail-layout">
      <div class="prose">
        <p class="eyebrow">Project evidence</p>
        <h2>What we will and will not show you</h2>
        <p>Bathroom renovation marketing is full of borrowed photos, invented addresses and five-star testimonials that cannot be verified. We do not want to add to it. Our gallery currently uses clearly labelled illustrations so you can see layout and finish ideas without being misled about whose bathroom it is.</p>
        <p>When a client agrees, we publish real photographs, the suburb, the scope, the constraints and the outcome. We do not publish a client's street address, and we do not use a photo of one project to imply work in another suburb. If you want evidence for a specific type of project, ask us and we will arrange a referee conversation or show you documentation from a comparable job.</p>
        <h2>What makes a Brisbane bathroom work</h2>
        <p>The best-looking bathroom can still fail if the ventilation is poor, the falls are wrong or the substrate was not prepared. In Brisbane's humid climate, we prioritise externally ducted exhaust, full-height tiling where appropriate, epoxy grout in wet zones and a membrane system that is tested before tiling. Aesthetics matter, but they sit on top of those fundamentals.</p>
        <h2>Design choices that age well</h2>
        <ul class="checklist">
          <li>${icons.check()}Neutral base tiles with one feature surface rather than several competing patterns</li>
          <li>${icons.check()}Wall-hung or floating vanity to keep the floor easy to clean</li>
          <li>${icons.check()}Frameless or semi-frameless shower screen with quality 10mm glass</li>
          <li>${icons.check()}Recessed storage instead of surface-mounted shelves where the wall allows</li>
          <li>${icons.check()}Layered lighting: ambient, mirror task and shower light</li>
          <li>${icons.check()}Quality tapware cartridges and accessible isolation valves</li>
          <li>${icons.check()}Non-slip floor tiles and a hobless entry where the floor structure allows</li>
          <li>${icons.check()}Externally ducted exhaust fan sized for the room volume</li>
        </ul>
        <h2>Bring your ideas to the measure</h2>
        <p>Save images, make a list of what you like and dislike, and tell us how you use the room. We will tell you what is practical, what is likely to cost more and where a cheaper alternative would perform just as well. Good design is a conversation, not a catalogue order.</p>
      </div>
      <aside class="sidebar" aria-label="Gallery links and contact">
        ${contactCard("Plan your bathroom", "Bring your inspiration to an on-site measure. We will explain what is achievable in your room and budget.")}
        ${linksCard("Related pages", [
          ["Bathroom renovation services", "/services/"],
          ["Full bathroom renovation", "/services/full-bathroom-renovation/"],
          ["Ensuite renovation", "/services/ensuite-renovation/"],
          ["Small bathroom renovation", "/services/small-bathroom-renovation/"],
          ["Cost guide", "/cost-guide/"],
        ])}
        ${areasCard()}
      </aside>
    </div>
  </div>
</section>

${faqSection(galleryFaqs, {
  title: "Gallery and project evidence questions",
  eyebrow: "Honest answers",
  intro: "What the images represent, how to see real work and how design decisions are made.",
})}

${ctaBand({
  title: "Turn an idea into a real bathroom",
  text: `Call ${site.phoneDisplay} or request an on-site measure. We will talk through the layout, finishes, budget and the practical details.`,
})}
`;

  return {
    path: "/gallery/",
    title: "Bathroom Renovation Gallery Brisbane | Ace Bathrooms",
    description:
      "Bathroom renovation ideas for Brisbane homes. Representative layouts for bathrooms, ensuites, laundries, kitchens and accessible bathrooms. Call (07) 8590 6941.",
    image: images.gallery1,
    body,
    crumbs: [{ name: "Gallery", url: "/gallery/" }],
    schema: [faqSchema(galleryFaqs)],
  };
}

/* ------------------------------------------------------------------ *
 * Reviews and referees
 * ------------------------------------------------------------------ */
const reviewFaqs = [
  {
    q: "Why don't you show star ratings or testimonials?",
    a: "We do not publish invented testimonials or self-serving review markup. When clients agree to share feedback, we publish it with permission and context. Until then, we offer referee conversations and project documentation instead of unverifiable stars.",
  },
  {
    q: "Can I speak to a previous client?",
    a: "Yes, where the client has agreed to act as a referee. We will match you with a project as close as possible to yours in scope, suburb and budget. Referee availability depends on the client's privacy and schedule.",
  },
  {
    q: "What can a referee tell me that a review cannot?",
    a: "A referee can tell you how the builder communicated, how the site was left each day, how variations were handled, whether the programme was realistic and whether problems were fixed. Those are the details that matter during a renovation and are often missing from a short online review.",
  },
  {
    q: "What documents can I inspect?",
    a: "You can ask to see our licence and insurance details, a sample contract and quote, a waterproofing certificate, and documentation from a comparable project. We will redact client information where necessary.",
  },
  {
    q: "How do you handle complaints?",
    a: "Raise the issue with your project lead first so we can inspect it and respond. If it cannot be resolved directly, the process in your contract applies, including the relevant statutory warranty and dispute-resolution pathways. We would rather fix a genuine issue than let it become a dispute.",
  },
  {
    q: "Do you offer a workmanship warranty?",
    a: "Yes. Your contract sets out the workmanship warranty, and statutory warranties also apply under Queensland law. Waterproofing, plumbing and electrical work carry their own compliance documentation and manufacturer warranties for products.",
  },
];

export function renderReviews() {
  const body = `
${hero({
  image: images.about,
  alt: "Reviews and referee policy for Ace Bathroom Renovations Brisbane",
  eyebrow: "Reviews and referees",
  h1: "Reviews, referees and honest proof",
  lead:
    "We would rather give you a real referee than a polished testimonial. Here is how we handle feedback, project evidence and the questions worth asking a past client.",
  primary: { href: "/get-a-quote/", label: "Get a free quote" },
  secondary: { href: tel, label: `Call ${site.phoneDisplay}` },
  trust: ["No invented testimonials", "Referees on request", "Documentation available", "Open 7am–10pm, 7 days"],
  card: `<p><strong>Want to speak to a past client?</strong> Call <a href="${tel}">${site.phoneDisplay}</a> and ask. We will arrange a referee where the client agrees.</p>`,
  page: true,
})}
${trustStrip()}

<section class="section">
  <div class="container">
    <div class="detail-layout">
      <div class="prose">
        <p class="eyebrow">Our policy</p>
        <h2>No fake stars, no borrowed photos</h2>
        <p>Online reviews are useful, but they are a poor substitute for a conversation with someone who has lived through a renovation. A five-star rating does not tell you how the builder handled a hidden leak, a late tile delivery or a change of mind about the vanity. We prefer to give you access to the detail.</p>
        <p>We do not publish invented testimonials, copy reviews from other businesses or add review schema markup that misrepresents our ratings. If we have not earned a public review, we will not manufacture one. When clients agree to share feedback, we publish it with their permission and enough context to be useful.</p>
        <div class="notice"><strong>Current status.</strong> We are building a public gallery of completed Brisbane projects and client feedback. Until a project is documented and approved for publication, we offer referee conversations, sample documentation and a site-specific conversation about your job.</p></div>

        <h2>What a referee can tell you</h2>
        <p>A referee has no marketing incentive to impress you. Ask them about the parts of the project that are hard to see in a photograph.</p>
        <ul class="checklist">
          <li>${icons.check()}Did the builder turn up when they said they would?</li>
          <li>${icons.check()}Was the written scope clear before work started?</li>
          <li>${icons.check()}How were variations and hidden damage handled?</li>
          <li>${icons.check()}Was the site cleaned each day and the home protected?</li>
          <li>${icons.check()}Did the programme run to schedule, and were delays explained?</li>
          <li>${icons.check()}Was the handover thorough, with certificates and care notes?</li>
          <li>${icons.check()}Has anything needed attention since completion, and how was it handled?</li>
          <li>${icons.check()}Would they use the same builder again?</li>
        </ul>

        <h2>What we can show you</h2>
        <p>Before you commit, you can ask to inspect our licence and insurance details, a sample contract and quote, a waterproofing certificate and documentation from a comparable project. We will redact personal information where required, but we will not hide the substance.</p>
        <div class="table-wrap"><table class="price-table">
          <thead><tr><th scope="col">Evidence</th><th scope="col">What it proves</th></tr></thead>
          <tbody>
            <tr><td>QBCC licence record</td><td>The licence exists and the categories match the work</td></tr>
            <tr><td>Certificate of currency</td><td>Public liability insurance is current</td></tr>
            <tr><td>Sample contract and quote</td><td>Scope, allowances, exclusions and payment stages are documented</td></tr>
            <tr><td>Waterproofing certificate</td><td>The wet area was waterproofed and inspected to the applicable standard</td></tr>
            <tr><td>Project photographs</td><td>The work was completed and the finish standard is visible</td></tr>
            <tr><td>Referee conversation</td><td>The client experience matches the promises</td></tr>
          </tbody>
        </table></div>

        <h2>How to verify any contractor's reviews</h2>
        <p>Reviews can be bought, gated or written by people who never used the business. Look for reviews that describe a specific project, a suburb and a problem that was resolved. Check whether the reviewer has other activity, whether the review is recent and whether the business responds constructively. Cross-check the business name and licence number, and ask for a referee who is not related to the reviewer.</p>
        <p>Be cautious of a perfect rating with no detail, a sudden burst of identical five-star reviews, or a business that only publishes reviews on its own website. Independent platforms and direct referees are more useful than a badge.</p>

        <h2>How we ask for feedback</h2>
        <p>At handover we ask clients whether they are willing to provide feedback, act as a referee or allow photographs. We do not offer discounts in exchange for reviews, and we do not ask clients to remove negative feedback. If someone is unhappy, we want to know why and fix it. That is more valuable than a perfect score.</p>

        <h2>If something goes wrong</h2>
        <p>Contact your project lead as soon as possible so we can inspect the issue. If it is a genuine defect, we will arrange a response under the contract and the applicable statutory warranty. If you cannot resolve it directly, your contract sets out the dispute-resolution process. We keep records of the scope, variations, inspections and certificates so the facts are available to both sides.</p>
      </div>
      <aside class="sidebar" aria-label="Review and referee links">
        ${contactCard("Ask for a referee", "We will match you with a past client from a comparable project where they have agreed to be contacted.")}
        ${linksCard("Trust and standards", [
          ["Warranty and certificates", "/warranty-and-certificates/"],
          ["Waterproofing quality", "/quality/waterproofing/"],
          ["Contractor standards", "/contractor-standards/"],
          ["Choosing a contractor", "/choosing-a-contractor/"],
          ["About our team", "/about/"],
        ])}
        ${servicesCard()}
      </aside>
    </div>
  </div>
</section>

${faqSection(reviewFaqs, {
  title: "Reviews, referees and warranty questions",
  eyebrow: "Proof and process",
  intro: "How to verify our work, what documents you can inspect and what happens if something needs attention.",
})}

${ctaBand({
  title: "Ask us for the evidence",
  text: `Call ${site.phoneDisplay} and ask for a referee, a sample contract or documentation from a comparable project. We will be straightforward about what is available.`,
})}
`;

  return {
    path: "/reviews/",
    title: "Reviews and Referees | Ace Bathroom Renovations Brisbane",
    description:
      "Our honest review policy: no invented testimonials or fake review markup. Ask for a Brisbane referee and waterproofing documentation. Call (07) 8590 6941.",
    image: images.about,
    body,
    crumbs: [{ name: "Reviews & Referees", url: "/reviews/" }],
    schema: [faqSchema(reviewFaqs)],
  };
}

/* ------------------------------------------------------------------ *
 * Our process
 * ------------------------------------------------------------------ */
const processFaqs = [
  {
    q: "How long does the whole process take?",
    a: "From first call to handover, allow six to twelve weeks for a typical bathroom. The measure and quote usually take one to two weeks, selections and lead times two to four weeks, and construction two to three weeks. Custom joinery, imported tiles or approval processes can extend the timeline.",
  },
  {
    q: "When do I need to choose tiles and fixtures?",
    a: "Before we lock in the build dates, ideally. Lead times vary, and a missing tile or vanity can stall the programme. We help you shortlist products, confirm quantities and order in time. If you change a selection after ordering, expect additional cost and delay.",
  },
  {
    q: "Do you provide a programme?",
    a: "Yes. You receive a milestone programme before demolition showing the sequence and approximate durations for strip-out, rough-in, waterproofing, tiling, fit-off and handover. We update you if a lead time or site condition changes it.",
  },
  {
    q: "Who manages the trades?",
    a: "Our project lead coordinates the licensed trades and checks the work. You do not need to book plumbers, electricians, waterproofers or tilers yourself. That coordination is part of the service.",
  },
  {
    q: "What happens if we find hidden damage?",
    a: "We stop, document it with photos, explain the options and provide a written variation with a price and time impact. Work does not proceed until you approve it. We do not surprise you with a bill at the end.",
  },
  {
    q: "What happens at handover?",
    a: "We test every tap, waste, fan and fitting with you, inspect the finishes, explain care and maintenance, and provide certificates, warranties and product information. We also arrange any final touch-ups before the job is closed.",
  },
];

export function renderProcess() {
  const body = `
${hero({
  image: images.process,
  alt: "Bathroom renovation process from measure to handover",
  eyebrow: "Our process",
  h1: "Our bathroom renovation process",
  lead:
    "A clear sequence from first call to handover, with the inspection, documentation, cure times and quality checks that a bathroom actually needs.",
  primary: { href: "/get-a-quote/", label: "Start with a quote" },
  secondary: { href: tel, label: `Call ${site.phoneDisplay}` },
  trust: ["Written scope", "Milestone programme", "One project lead", "Formal handover"],
  card: `<p><strong>Want to understand the timeline for your room?</strong> Call <a href="${tel}">${site.phoneDisplay}</a> and we will explain the sequence before you commit.</p>`,
  page: true,
})}
${trustStrip()}

<section class="section">
  <div class="container">
    <div class="detail-layout">
      <div class="prose">
        <p class="eyebrow">The sequence</p>
        <h2>Ten stages, one accountable team</h2>
        <p>Every project follows the same structure, although the duration and detail change with the room. The purpose of the process is to make decisions before they become expensive, and to protect the waterproofing and finishes once the build starts.</p>

        <h2>1. First call and brief</h2>
        <p>We ask about the property, the room, what is not working, your timing and your rough budget. This is a screening conversation, not a sales script. If the project is outside our service area, licensing or capacity, we will say so early. If it is a fit, we book an on-site measure.</p>

        <h2>2. On-site measure and inspection</h2>
        <p>We measure the room, check the substrate and moisture, inspect the plumbing, drainage and ventilation, confirm access and discuss the layout. We look for signs of past water damage, illegal work and asbestos risk. The inspection is the foundation of the quote; without it, the price is a guess.</p>

        <h2>3. Written quote and scope</h2>
        <p>You receive an itemised written quote listing demolition, substrate work, waterproofing, tiling, plumbing, electrical, joinery, fixtures, painting, waste removal and project management. Allowances and exclusions are shown. If something is genuinely unknown until demolition, it is identified as a provisional item with a clear method for pricing it.</p>

        <h2>4. Selections and product confirmation</h2>
        <p>We confirm tiles, tapware, vanity, toilet, shower screen, mirror, accessories, exhaust fan and lighting. We check compatibility, quantities, lead times and spares. Good selections are not just aesthetic; they determine whether the room functions, drains and ventilates properly.</p>

        <h2>5. Contract, approvals and insurance</h2>
        <p>Before work starts, you sign a written contract that sets out the scope, price, payment stages, programme, variation process and warranty. If body corporate, heritage or building approval is required, we prepare the information needed and confirm the conditions. If QBCC home warranty insurance applies, we arrange it before demolition.</p>

        <h2>6. Site establishment and protection</h2>
        <p>We protect floors and adjacent rooms, contain dust, set up waste removal and confirm access and parking. In apartments, we coordinate lift bookings, common-area protection and work hours. We introduce the project lead and confirm the communication routine.</p>

        <h2>7. Strip-out and rough-in</h2>
        <p>The room is stripped, and the exposed structure is inspected. Any hidden damage is photographed and priced before repair. Plumbing and electrical rough-in follow, then sheeting and substrate preparation. This is the stage where surprises appear, which is why the variation process matters.</p>

        <h2>8. Waterproofing and flood testing</h2>
        <p>The wet area is prepared, fillets and bond breakers are installed, and the membrane is applied to AS 3740. We flood test the area and document the result before tiling. No tile goes down until the membrane has cured and passed inspection.</p>

        <h2>9. Tiling, fit-off and finishing</h2>
        <p>Tiles are set out, screeded and laid with attention to falls, niches, mitres and silicone lines. After tiling, we install the vanity, tapware, toilet, shower screen, mirror, accessories, exhaust fan and lighting. Painting and make-good complete the room.</p>

        <h2>10. Handover and aftercare</h2>
        <p>We clean the site, test every fixture with you, check the falls and silicone, explain care instructions and hand over the certificates, warranties and product information. We also explain how to report an issue and what the warranty covers.</p>

        <h2>Typical timeline</h2>
        <div class="table-wrap"><table class="price-table">
          <thead><tr><th scope="col">Stage</th><th scope="col">Typical duration</th></tr></thead>
          <tbody>
            <tr><td>Call, measure and quote</td><td>1–2 weeks</td></tr>
            <tr><td>Selections and product lead times</td><td>2–4 weeks</td></tr>
            <tr><td>Strip-out and rough-in</td><td>3–5 working days</td></tr>
            <tr><td>Waterproofing and cure</td><td>2–4 working days</td></tr>
            <tr><td>Tiling and screeding</td><td>4–6 working days</td></tr>
            <tr><td>Fit-off, painting and clean</td><td>2–4 working days</td></tr>
            <tr><td>Handover</td><td>1 day</td></tr>
          </tbody>
        </table></div>
        <p style="font-size:.82rem;color:var(--muted)">Durations overlap where possible. Site conditions, product availability and approvals can change the programme.</p>

        <h2>How we communicate</h2>
        <p>You receive a single project lead and a written programme. We confirm the week ahead, tell you who is coming and when, and flag any decision we need from you. If something changes, we contact you rather than waiting for you to notice. Photos of hidden damage and waterproofing are shared before they are covered up.</p>

        <h2>How variations are handled</h2>
        <p>A variation is a change to the agreed scope, price or programme. It can come from hidden damage, a client selection change or a site condition. We document the reason, the price and the time impact, and we do not proceed until you approve it in writing. This protects both sides and keeps the final invoice predictable.</p>
      </div>
      <aside class="sidebar" aria-label="Process links and contact">
        ${contactCard("Talk through your project", "Ask us how the process applies to your room, building type and timing.")}
        ${linksCard("Related pages", [
          ["How it works", "/how-it-works/"],
          ["Choosing a contractor", "/choosing-a-contractor/"],
          ["Contractor standards", "/contractor-standards/"],
          ["Warranty and certificates", "/warranty-and-certificates/"],
          ["FAQs", "/faqs/"],
        ])}
        ${areasCard()}
      </aside>
    </div>
  </div>
</section>

${faqSection(processFaqs, {
  title: "Process and timeline questions",
  eyebrow: "What to expect",
  intro: "Timing, selections, site management, hidden damage and handover.",
})}

${ctaBand({
  title: "Start your renovation properly",
  text: `Call ${site.phoneDisplay} for a clear explanation of the process, or request an on-site measure and written quote.`,
})}
`;

  return {
    path: "/our-process/",
    title: "Our Bathroom Renovation Process Brisbane | Ace Bathrooms",
    description:
      "Our Brisbane bathroom renovation process: measure, written scope, selections, waterproofing, tiling and handover. One accountable team. Call (07) 8590 6941.",
    image: images.process,
    body,
    crumbs: [{ name: "Our Process", url: "/our-process/" }],
    schema: [faqSchema(processFaqs)],
  };
}

/* ------------------------------------------------------------------ *
 * How it works
 * ------------------------------------------------------------------ */
const howFaqs = [
  {
    q: "Do I need to move out during the renovation?",
    a: "Usually not, if you have another bathroom or toilet. We contain dust, protect floors and clean daily. If you have only one bathroom, we plan the sequence to minimise the time without a usable toilet and discuss temporary options before work starts.",
  },
  {
    q: "Can I stay in the house while the work happens?",
    a: "Yes, most clients do. The bathroom will be out of action for part of the build, and there will be noise and dust. We agree work hours, keep the site contained and tell you when the water or power will be off.",
  },
  {
    q: "What decisions do I need to make?",
    a: "You need to approve the scope and contract, choose tiles and fixtures within the allowances, confirm layout changes and approve any variation. We guide the selections and flag lead times, but the final choice is yours.",
  },
  {
    q: "How do payments work?",
    a: "Payments are linked to progress and set out in the contract. A typical schedule includes a deposit, a payment after rough-in and waterproofing, a payment after tiling, and the balance at practical completion. We do not ask for large cash payments or payments unrelated to progress.",
  },
  {
    q: "What if I change my mind after work starts?",
    a: "Tell us as early as possible. Some changes are simple; others affect ordered products, waterproofing or tiling. We will explain the cost and time impact and document the variation before proceeding. Changes after products are ordered are usually more expensive.",
  },
  {
    q: "How do I know the waterproofing is right?",
    a: "The membrane is applied to AS 3740, flood tested and documented. You receive a compliance certificate at handover. We also photograph the preparation and membrane before tiling so there is a record of what was installed.",
  },
];

export function renderHowItWorks() {
  const body = `
${hero({
  image: images.full,
  alt: "How a bathroom renovation works in Brisbane",
  eyebrow: "How it works",
  h1: "How a bathroom renovation works",
  lead:
    "What happens before, during and after the build, what we need from you and how to plan around living in the home while the work is done.",
  primary: { href: "/get-a-quote/", label: "Get a free quote" },
  secondary: { href: tel, label: `Call ${site.phoneDisplay}` },
  trust: ["Free measure", "Written scope", "Milestone programme", "Formal handover"],
  card: `<p><strong>Want the short version?</strong> Call <a href="${tel}">${site.phoneDisplay}</a>. We will explain the steps for your room in a few minutes.</p>`,
  page: true,
})}
${trustStrip()}

<section class="section">
  <div class="container">
    <div class="detail-layout">
      <div class="prose">
        <p class="eyebrow">The homeowner view</p>
        <h2>From first call to a finished bathroom</h2>
        <p>A bathroom renovation is disruptive, even when it is well run. The room is unusable for part of the time, there is noise and dust, and decisions need to be made before the build starts. Knowing the sequence makes the disruption easier to plan around.</p>

        <h2>Phase 1: Before you commit</h2>
        <p>Call us or send an enquiry. We will ask about the room, the property, your timing and your budget. If the project is a fit, we arrange an on-site measure. The measure is free within our standard service area and usually takes 45 to 60 minutes. We inspect the substrate, plumbing, drainage, ventilation and access, and we discuss what you want to change.</p>
        <p>After the measure, we prepare an itemised written quote. It sets out the scope, allowances, exclusions, payment stages and programme. You can compare it with other quotes, ask questions and adjust the scope before you sign. We do not pressure you to decide on the day.</p>

        <h2>Phase 2: Before work starts</h2>
        <p>Once you accept the quote, we confirm selections and order products. This is the stage where lead times matter. Tiles, tapware, vanities, shower screens and custom joinery can take weeks, and a missing item can stall the build. We confirm quantities and spares, check compatibility and book the delivery dates.</p>
        <p>We also confirm access, parking, waste removal and any body corporate or building requirements. If you live in an apartment, we coordinate lift bookings and common-area protection. If the home is older, we confirm the asbestos position before demolition. You sign the contract and, where applicable, arrange QBCC home warranty insurance.</p>

        <h2>Phase 3: During the build</h2>
        <p>The first days are demolition and rough-in. It is noisy and dusty, but it is also when hidden damage is found. We photograph anything unexpected and agree the repair before proceeding. Plumbing and electrical rough-in follow, then sheeting and substrate preparation.</p>
        <p>Waterproofing is applied and flood tested. This is a period when the room may look unfinished, because the membrane needs to cure before tiling. We do not rush it. Tiling follows, then fit-off, painting and cleaning. You receive a weekly update and can contact the project lead with questions.</p>

        <h2>Phase 4: Handover and aftercare</h2>
        <p>At handover we test every tap, waste, fan and fitting with you, inspect the finishes and explain how to care for the tiles, stone, tapware and shower screen. You receive the waterproofing certificate, product information, warranty details and care notes. If something needs attention after you have lived with the room, call the same number.</p>

        <h2>What we need from you</h2>
        <ul class="checklist">
          <li>${icons.check()}Access to the property during agreed hours</li>
          <li>${icons.check()}A decision-maker who can approve selections and variations</li>
          <li>${icons.check()}Prompt feedback on product choices</li>
          <li>${icons.check()}Valuables removed and children and pets kept clear</li>
          <li>${icons.check()}Body corporate or building rules provided in advance</li>
          <li>${icons.check()}A clear parking or loading arrangement where possible</li>
        </ul>

        <h2>Living at home during the work</h2>
        <p>Most clients stay in the home. If you have a second bathroom, the disruption is manageable. We contain dust with temporary barriers, protect floors and clean daily. If you have only one bathroom, we plan the sequence to minimise the period without a toilet and discuss temporary options such as a portable toilet or a neighbor's facilities.</p>
        <p>Expect noise during demolition and tiling, and expect the bathroom to be unusable for part of the build. We will tell you when the water or power needs to be off and when you can expect the room to be usable again.</p>

        <h2>How long will it take?</h2>
        <p>A typical full bathroom takes 10 to 15 working days on site after demolition, plus waterproofing cure and product lead times. Compact ensuites and laundries may take less; layout changes, structural repairs and custom joinery can extend the programme. From first call to handover, allow six to twelve weeks.</p>

        <h2>What it costs</h2>
        <p>Most full bathroom renovations in Brisbane fall between $18,000 and $45,000, with many projects in the $24,000 to $36,000 range. The final price depends on room size, layout, substrate, finishes and access. Read the <a href="/cost-guide/">cost guide</a> or use the <a href="/bathroom-renovation-cost-calculator/">calculator</a> for a planning range, then confirm it with a measure.</p>
      </div>
      <aside class="sidebar" aria-label="How it works links and contact">
        ${contactCard("Book a free measure", "We will inspect the room, explain the steps and prepare a written quote with no obligation.")}
        ${linksCard("Related pages", [
          ["Our process", "/our-process/"],
          ["Cost guide", "/cost-guide/"],
          ["Cost calculator", "/bathroom-renovation-cost-calculator/"],
          ["Choosing a contractor", "/choosing-a-contractor/"],
          ["Get a quote", "/get-a-quote/"],
        ])}
        ${servicesCard()}
      </aside>
    </div>
  </div>
</section>

${faqSection(howFaqs, {
  title: "How it works questions",
  eyebrow: "Practical answers",
  intro: "Living at home, decisions, payments, changes and waterproofing documentation.",
})}

${ctaBand({
  title: "Ready to start the process?",
  text: `Call ${site.phoneDisplay} or request a free on-site measure. We will explain what happens next and what it will cost.`,
})}
`;

  return {
    path: "/how-it-works/",
    title: "How a Bathroom Renovation Works Brisbane | Ace Bathrooms",
    description:
      "A plain-English guide to how a Brisbane bathroom renovation works: measure, quote, selections, construction, waterproofing and handover. Call (07) 8590 6941.",
    image: images.full,
    body,
    crumbs: [{ name: "How It Works", url: "/how-it-works/" }],
    schema: [faqSchema(howFaqs)],
  };
}

/* ------------------------------------------------------------------ *
 * Choosing a contractor
 * ------------------------------------------------------------------ */
const choosingFaqs = [
  {
    q: "How do I check a bathroom builder's licence in Queensland?",
    a: "Ask for the QBCC licence number and the legal business name, then search the QBCC licence register. Check that the licence is current, that the categories cover the work and that the name matches the entity you are contracting with. Our licence details are published once on the About page.",
  },
  {
    q: "What should a bathroom quote include?",
    a: "A complete quote includes demolition, disposal, substrate preparation, waterproofing, tiling, plumbing, electrical, joinery, fixtures, painting, make-good, site protection, project management, allowances, exclusions, programme and payment stages. If a major item is missing, ask why.",
  },
  {
    q: "Is the cheapest quote always the worst?",
    a: "Not always, but a suspiciously low quote usually means something is excluded or assumed. Compare scope line by line, check the waterproofing and substrate provisions, and ask what is provisional. The cheapest complete quote may be better value than the cheapest headline price.",
  },
  {
    q: "Do I need a written contract?",
    a: "Yes. Queensland domestic building work should be covered by a written contract that sets out the scope, price, payment stages, variations, completion and dispute process. Do not rely on a verbal agreement or a one-page quote.",
  },
  {
    q: "What insurance should a bathroom builder have?",
    a: "Ask for public liability insurance and, where applicable, QBCC home warranty insurance for the project. Check the certificate of currency and confirm the policy is current. If the work requires home warranty insurance, it should be arranged before work starts.",
  },
  {
    q: "What are the red flags in a bathroom quote?",
    a: "A lump sum with no scope, no waterproofing line, no allowance for substrate repair, a large cash deposit, no written contract, pressure to sign on the day, and a builder who cannot provide a licence number or referee. Take your time and ask for evidence.",
  },
];

export function renderChoosing() {
  const body = `
${hero({
  image: images.tiling,
  alt: "Choosing a bathroom renovation contractor in Brisbane",
  eyebrow: "Choosing a contractor",
  h1: "How to choose a bathroom renovation contractor",
  lead:
    "Ten checks, the questions worth asking and the red flags that appear before a bathroom goes wrong. Use this guide for any builder, including us.",
  primary: { href: "/get-a-quote/", label: "Get a free quote" },
  secondary: { href: tel, label: `Call ${site.phoneDisplay}` },
  trust: ["Licence and insurance checks", "Written contract", "Verified referees", "No pressure"],
  card: `<p><strong>Comparing builders?</strong> Call <a href="${tel}">${site.phoneDisplay}</a> and we will happily explain what to ask, even if you choose someone else.</p>`,
  page: true,
})}
${trustStrip()}

<section class="section">
  <div class="container">
    <div class="detail-layout">
      <div class="prose">
        <p class="eyebrow">Before you sign</p>
        <h2>Ten checks that prevent expensive mistakes</h2>
        <p>A bathroom renovation is a high-value, high-consequence purchase. Most failures are not caused by bad tiles; they are caused by an unclear scope, an unlicensed trade, a missing waterproofing certificate or a builder who disappears when a problem appears. These checks help you separate a professional operator from a convincing salesperson.</p>

        <h2>1. Verify the licence and the legal entity</h2>
        <p>Ask for the QBCC licence number and the legal business name, then search the QBCC register. Check that the licence is current, that the categories cover kitchen, bathroom and laundry work, and that the name matches the entity on the contract. A trading name alone is not enough. Also check whether the licence has conditions or a disciplinary history.</p>

        <h2>2. Ask for insurance evidence</h2>
        <p>Request a certificate of currency for public liability insurance and confirm the policy is current. If the project requires QBCC home warranty insurance, ask who arranges it and confirm it is in place before work starts. Do not accept a verbal assurance.</p>

        <h2>3. Insist on a written contract</h2>
        <p>The contract should set out the scope, price, payment stages, programme, variation process, completion definition, warranty and dispute resolution. It should identify the licensed entity, not just a first name and a mobile number. Read it before you sign and ask for anything unclear to be explained in writing.</p>

        <h2>4. Compare scope, not just price</h2>
        <p>Put the quotes side by side and check for demolition, disposal, substrate repair, waterproofing, screeding, tiling, plumbing, electrical, joinery, fixtures, painting, make-good and project management. A quote that excludes waterproofing is not comparable to one that includes it. Ask what is provisional and how it will be priced.</p>

        <h2>5. Ask who does the work</h2>
        <p>Some companies sell the job and subcontract everything. That is not automatically bad, but you should know who is accountable. Ask who will be on site, who manages the trades, who checks the waterproofing and who you call if something goes wrong. A single project lead with direct responsibility is a good sign.</p>

        <h2>6. Check the waterproofing approach</h2>
        <p>Ask how the wet area is prepared, what membrane system is used, whether it is applied to AS 3740, whether it is flood tested and what certificate you receive. A builder who cannot explain the waterproofing process is a risk. This is the most important hidden part of the job.</p>

        <h2>7. Ask about ventilation</h2>
        <p>Brisbane's humidity makes exhaust ventilation critical. Ask whether the fan is ducted outside, how it is sized, where the duct runs and whether the system includes a backdraft shutter. A recirculating fan or a duct that terminates in the roof space is a red flag.</p>

        <h2>8. Speak to a referee</h2>
        <p>Ask for a referee from a comparable project, not just a logo wall. Ask about communication, site cleanliness, variations, delays and whether the builder returned after handover. A genuine referee will give you a balanced account, including what could have gone better.</p>

        <h2>9. Check the programme and payment schedule</h2>
        <p>A realistic programme allows for waterproofing cure, screeding, tiling and product lead times. A payment schedule should be linked to progress, not to arbitrary dates. Be cautious of a large upfront cash deposit or a request to pay outside the contract.</p>

        <h2>10. Confirm the handover documentation</h2>
        <p>At handover you should receive the waterproofing certificate, plumbing and electrical compliance documentation, product information, warranty details and care instructions. Ask what you will receive before you sign, not after the last tile is laid.</p>

        <h2>Red flags</h2>
        <ul class="checklist">
          <li>${icons.check()}No licence number, or a number that does not match the contract</li>
          <li>${icons.check()}No written contract or a quote with no scope</li>
          <li>${icons.check()}A large cash deposit or pressure to pay before work</li>
          <li>${icons.check()}No waterproofing line item or no certificate</li>
          <li>${icons.check()}A price that is far below every other quote</li>
          <li>${icons.check()}No referee, or referees who cannot describe the project</li>
          <li>${icons.check()}Pressure to sign on the day</li>
          <li>${icons.check()}A builder who will not put promises in writing</li>
        </ul>

        <h2>Questions to ask every builder</h2>
        <p>What is your licence number and legal entity? Who manages the site? Which trades are subcontractors? How is the waterproofing tested and documented? What is included in the quote? What is provisional? How are variations priced? What is the programme? What happens if we find asbestos? What warranty do you provide? Can I speak to a recent client?</p>
        <p>A professional builder will answer these questions directly. If the answers are vague, defensive or rushed, take that as information.</p>

        <h2>How we compare</h2>
        <p>We are not the cheapest quote in every situation, and we do not try to be. We price the room we have inspected, document the scope, coordinate licensed trades and hand over the certificates. If that is the standard you want, call us. If you choose another builder, use this guide to check their work.</p>
      </div>
      <aside class="sidebar" aria-label="Choosing a contractor links">
        ${contactCard("Ask us the hard questions", "Licence, insurance, waterproofing, programme, variations and referees. We will answer directly.")}
        ${linksCard("Related pages", [
          ["Our process", "/our-process/"],
          ["Contractor standards", "/contractor-standards/"],
          ["Warranty and certificates", "/warranty-and-certificates/"],
          ["Waterproofing quality", "/quality/waterproofing/"],
          ["FAQs", "/faqs/"],
        ])}
        ${areasCard()}
      </aside>
    </div>
  </div>
</section>

${faqSection(choosingFaqs, {
  title: "Choosing a contractor questions",
  eyebrow: "Due diligence",
  intro: "Licences, insurance, quotes, contracts, red flags and referees.",
})}

${ctaBand({
  title: "Want a quote you can compare properly?",
  text: `Call ${site.phoneDisplay} for an itemised written scope, or request an on-site measure. We will show you exactly what is included.`,
})}
`;

  return {
    path: "/choosing-a-contractor/",
    title: "Choosing a Bathroom Contractor Brisbane | 10 Checks | Ace",
    description:
      "How to choose a bathroom contractor in Brisbane: licence checks, insurance, written contracts, quote comparison and red flags. Call (07) 8590 6941.",
    image: images.tiling,
    body,
    crumbs: [{ name: "Choosing a Contractor", url: "/choosing-a-contractor/" }],
    schema: [faqSchema(choosingFaqs)],
  };
}

/* ------------------------------------------------------------------ *
 * Contractor standards
 * ------------------------------------------------------------------ */
const standardsFaqs = [
  {
    q: "What standards apply to bathroom waterproofing?",
    a: "Wet-area waterproofing in Australia is governed by AS 3740, with the National Construction Code setting the broader building requirements. The membrane must be suitable for the substrate, applied by a competent waterproofer, reinforced at junctions and tested before tiling. We document the installation and provide a compliance certificate.",
  },
  {
    q: "Do you use licensed trades?",
    a: "Yes. Plumbing and electrical work is carried out by licensed trades and documented with the relevant compliance certificates. Waterproofing and tiling are performed by qualified team members with Certificate III qualifications. Building work is supervised under our QBCC licence.",
  },
  {
    q: "What tiling tolerances do you work to?",
    a: "We set out to Australian standards and manufacturer requirements, with particular attention to lippage, alignment, falls and movement joints. Large-format tiles and stone require tighter substrate preparation. We inspect the substrate before tiling and correct deviations rather than hiding them with adhesive.",
  },
  {
    q: "How do you protect the rest of the home?",
    a: "We use temporary barriers, floor protection, dust containment and daily cleaning. Waste is removed regularly, and we agree access routes and work hours before the start date. In apartments, common areas are protected and lift bookings are coordinated.",
  },
  {
    q: "What happens if a trade does not meet your standard?",
    a: "Work is inspected at each stage. If it does not meet the standard, it is corrected before the next trade proceeds. We do not cover defective work with tiles or silicone and hope it holds. The project lead is accountable for the quality of the finished job.",
  },
  {
    q: "Do you provide documentation at handover?",
    a: "Yes. You receive the waterproofing certificate, plumbing and electrical compliance documentation where applicable, product information, warranty details and care instructions. We also keep project records including photographs of concealed work.",
  },
];

export function renderStandards() {
  const body = `
${hero({
  image: images.waterproofing,
  alt: "Bathroom contractor standards and waterproofing quality",
  eyebrow: "Contractor standards",
  h1: "The standards we build to",
  lead:
    "Licensing, waterproofing, tiling, ventilation, site protection and documentation. The parts of a bathroom renovation that determine whether it lasts.",
  primary: { href: "/get-a-quote/", label: "Get a free quote" },
  secondary: { href: tel, label: `Call ${site.phoneDisplay}` },
  trust: ["AS 3740 waterproofing", "Licensed trades", "Documented handover", "Quality inspections"],
  card: `<p><strong>Ask us how we build.</strong> Call <a href="${tel}">${site.phoneDisplay}</a> for a detailed explanation of the standards and documentation for your project.</p>`,
  page: true,
})}
${trustStrip()}

<section class="section">
  <div class="container">
    <div class="detail-layout">
      <div class="prose">
        <p class="eyebrow">Our standards</p>
        <h2>Quality is a sequence, not a final inspection</h2>
        <p>A bathroom cannot be made compliant by inspecting it at the end. The critical work is concealed: the substrate, the falls, the membrane, the reinforcement at junctions, the ducting and the framing. Our standards are built around inspecting those layers before they are covered, and documenting what was installed.</p>

        <h2>Licensing and accountability</h2>
        <p>We hold a QBCC builder licence restricted to kitchen, bathroom and laundry work, with Certificate III qualifications in wall and floor tiling (CPC31320) and construction waterproofing (CPC31420). Plumbing and electrical work is performed by licensed trades. We do not ask unlicensed workers to carry out regulated work, and we do not hide subcontractors behind a trading name.</p>

        <h2>Waterproofing</h2>
        <p>Wet areas are waterproofed to AS 3740. That includes suitable substrate preparation, bond breakers, fillets at junctions, reinforcement at corners and penetrations, and a membrane system compatible with the substrate and the tile adhesive. We flood test the membrane and record the result before tiling. You receive a compliance certificate at handover.</p>

        <h2>Substrate and falls</h2>
        <p>Tiles are only as good as the substrate beneath them. We check for movement, moisture, delamination and level deviations. Shower falls are set so water drains to the waste without pooling. Where the floor structure cannot support the intended finish, we repair or adjust it before tiling rather than building up adhesive to hide the problem.</p>

        <h2>Tiling</h2>
        <p>We set out the room before laying, plan cuts to avoid slivers, and align grout lines across walls and floors where the design calls for it. Large-format tiles require flat substrates, appropriate adhesives and lippage control. We use suitable trims, movement joints and silicone at wet junctions. Grout and silicone are finished neatly and inspected at handover.</p>

        <h2>Ventilation</h2>
        <p>Every bathroom needs effective exhaust ventilation. We size the fan for the room, duct it outside, minimise bends and fit a backdraft shutter where appropriate. A fan that recirculates into the ceiling space does not remove moisture; it just moves the problem. In apartments, we work within the building's ducting and approval requirements.</p>

        <h2>Plumbing and electrical</h2>
        <p>Plumbing and electrical work is carried out by licensed trades and tested before handover. We coordinate rough-in with the tiling and waterproofing sequence so services are not cut through the membrane after it is installed. Compliance certificates are included in the handover pack.</p>

        <h2>Site protection and cleanliness</h2>
        <p>We protect floors, stairs and adjacent rooms, contain dust and remove waste regularly. The site is cleaned at the end of each working day, and the bathroom is left safe. In apartments, we protect common areas and follow the building's work hours and lift rules.</p>

        <h2>Communication and variations</h2>
        <p>You receive a project lead, a programme and a clear process for questions. Hidden damage and client changes are documented as variations with a price and time impact before work proceeds. We do not rely on verbal agreements or surprise invoices. If something is unclear, ask; we would rather explain it than have you guess.</p>

        <h2>Handover documentation</h2>
        <p>At completion you receive the waterproofing certificate, plumbing and electrical compliance documentation where applicable, product information, warranty details and care instructions. We also keep photographs of concealed work. The handover is a walkthrough, not a key swap; we test the fixtures with you and explain how to maintain the finishes.</p>

        <h2>What we expect from our trades</h2>
        <ul class="checklist">
          <li>${icons.check()}Current licence and insurance</li>
          <li>${icons.check()}Compliance with the agreed scope and programme</li>
          <li>${icons.check()}Respect for the home, neighbours and common areas</li>
          <li>${icons.check()}Clean workmanship and correct sequencing</li>
          <li>${icons.check()}Documentation of concealed work</li>
          <li>${icons.check()}Prompt reporting of defects or site issues</li>
          <li>${icons.check()}No unapproved variations or direct client payments</li>
        </ul>
      </div>
      <aside class="sidebar" aria-label="Standards links">
        ${contactCard("Ask about our standards", "We are happy to explain the waterproofing, tiling and documentation requirements for your project.")}
        ${linksCard("Related pages", [
          ["Waterproofing quality", "/quality/waterproofing/"],
          ["Warranty and certificates", "/warranty-and-certificates/"],
          ["Choosing a contractor", "/choosing-a-contractor/"],
          ["Our process", "/our-process/"],
          ["FAQs", "/faqs/"],
        ])}
        ${servicesCard()}
      </aside>
    </div>
  </div>
</section>

${faqSection(standardsFaqs, {
  title: "Standards and compliance questions",
  eyebrow: "Technical answers",
  intro: "Waterproofing, licensing, tiling tolerances, site protection and handover.",
})}

${ctaBand({
  title: "Build to a standard you can verify",
  text: `Call ${site.phoneDisplay} to discuss the standards, documentation and inspection points for your bathroom.`,
})}
`;

  return {
    path: "/contractor-standards/",
    title: "Bathroom Contractor Standards Brisbane | Ace Bathrooms",
    description:
      "Our bathroom standards: QBCC licensing, AS 3740 waterproofing, tiling tolerances, ventilation, site protection and documented handover. Call (07) 8590 6941.",
    image: images.waterproofing,
    body,
    crumbs: [{ name: "Contractor Standards", url: "/contractor-standards/" }],
    schema: [faqSchema(standardsFaqs)],
  };
}

/* ------------------------------------------------------------------ *
 * Warranty and certificates
 * ------------------------------------------------------------------ */
const warrantyFaqs = [
  {
    q: "What warranty applies to my bathroom renovation?",
    a: "Your contract sets out the workmanship warranty for the project, and statutory warranties apply under Queensland law. In general terms, Queensland statutory warranties cover structural defects for six years and six months and non-structural defects for twelve months from completion, but the specific application depends on the work and your contract. We explain the terms before you sign.",
  },
  {
    q: "What certificates will I receive?",
    a: "You receive a waterproofing compliance certificate for the wet areas, plumbing and electrical compliance documentation where applicable, and product warranty information. We also provide care instructions and keep photographs of concealed work.",
  },
  {
    q: "Does the warranty cover cracked tiles?",
    a: "It depends on the cause. A tile that cracks because of a substrate or installation defect may be covered. A tile that chips from impact, or cracks because of building movement outside the scope, may not be. We inspect the cause before deciding and explain the outcome in writing.",
  },
  {
    q: "What is not covered by the warranty?",
    a: "Typical exclusions include damage caused by misuse, impact, neglect, improper cleaning, unauthorised alterations, blocked drains caused by debris, and movement or defects in parts of the building outside the renovation scope. Manufacturer warranties are separate and vary by product.",
  },
  {
    q: "How do I make a claim?",
    a: "Call us and describe the issue. We will arrange an inspection, identify the cause and explain whether it is covered. If it is a genuine defect, we will arrange the repair. Keep your contract, certificates and records, and do not attempt a repair yourself before we inspect.",
  },
  {
    q: "Do I need to maintain the bathroom?",
    a: "Yes. Clean with products suitable for the tile, stone and tapware, keep the exhaust fan working, check silicone joints periodically and address leaks promptly. Maintenance is part of protecting the warranty and the building.",
  },
];

export function renderWarranty() {
  const body = `
${hero({
  image: images.waterproofing,
  alt: "Bathroom renovation warranty and certificates",
  eyebrow: "Warranty and certificates",
  h1: "Warranty, certificates and aftercare",
  lead:
    "What you receive at handover, what the warranty covers, what it does not, and how to get help if something needs attention.",
  primary: { href: "/get-a-quote/", label: "Get a free quote" },
  secondary: { href: tel, label: `Call ${site.phoneDisplay}` },
  trust: ["Waterproofing certificate", "Compliance documentation", "Written warranty terms", "Aftercare support"],
  card: `<p><strong>Need help after a renovation?</strong> Call <a href="${tel}">${site.phoneDisplay}</a> and describe the issue. We will arrange an inspection.</p>`,
  page: true,
})}
${trustStrip()}

<section class="section">
  <div class="container">
    <div class="detail-layout">
      <div class="prose">
        <p class="eyebrow">At handover</p>
        <h2>The documents that matter</h2>
        <p>A bathroom renovation should end with more than a clean room. You should receive evidence that the concealed work was done properly, that the regulated trades complied and that you know how to care for the finishes. These documents matter for insurance, resale and any future warranty claim.</p>
        <div class="table-wrap"><table class="price-table">
          <thead><tr><th scope="col">Document</th><th scope="col">Why you need it</th></tr></thead>
          <tbody>
            <tr><td>Waterproofing compliance certificate</td><td>Confirms the wet-area membrane system and inspection</td></tr>
            <tr><td>Plumbing compliance documentation</td><td>Confirms regulated plumbing work was completed and tested</td></tr>
            <tr><td>Electrical certificate</td><td>Confirms electrical work and safety testing</td></tr>
            <tr><td>Product warranties</td><td>Covers tapware, sanitary ware, screens, fans and other products</td></tr>
            <tr><td>Workmanship warranty</td><td>Sets out our responsibility for installation defects</td></tr>
            <tr><td>Care and maintenance guide</td><td>Helps you protect tiles, stone, tapware and silicone</td></tr>
            <tr><td>Concealed work photographs</td><td>Records the waterproofing, framing and rough-in before covering</td></tr>
          </tbody>
        </table></div>

        <h2>Statutory warranties</h2>
        <p>Queensland law provides statutory warranties for domestic building work. In general terms, structural defects are covered for six years and six months, and non-structural defects for twelve months from completion. The exact application depends on the work, the contract and the circumstances. We explain the terms that apply to your project before you sign, and we do not ask you to rely on a verbal promise.</p>

        <h2>Our workmanship warranty</h2>
        <p>Your contract sets out our workmanship warranty. It covers defects in the installation of the work we performed, subject to the terms and exclusions in the contract. If a defect appears, we inspect it, identify the cause and arrange a response. We do not use the warranty to avoid responsibility for poor work, and we do not disappear after handover.</p>

        <h2>Product warranties</h2>
        <p>Tapware, toilets, vanities, shower screens, exhaust fans, tiles and other products carry manufacturer warranties. Those warranties are separate from our workmanship warranty and vary in length and conditions. Keep your product information and receipts. If a product fails, we can help you identify the correct warranty pathway, but the manufacturer's terms apply.</p>

        <h2>What is not covered</h2>
        <p>Warranty claims are not a maintenance contract. Typical exclusions include impact damage, misuse, neglect, improper cleaning, blocked drains caused by debris, unauthorised alterations, movement in parts of the building outside the scope, and damage caused by other trades or occupants. We will explain the specific exclusions in your contract rather than hiding them in fine print.</p>

        <h2>How to make a claim</h2>
        <p>Call us as soon as you notice an issue. Describe what is happening, when it started and any photos you have. We will arrange an inspection, identify the cause and explain whether it is covered. If it is a genuine defect, we will arrange the repair. Please do not attempt a repair yourself before we inspect, because it can make the cause harder to establish.</p>

        <h2>Maintenance that protects your bathroom</h2>
        <ul class="checklist">
          <li>${icons.check()}Run the exhaust fan during and after showers until moisture clears</li>
          <li>${icons.check()}Clean tiles and stone with suitable, non-abrasive products</li>
          <li>${icons.check()}Dry tapware and shower screens to reduce water spotting</li>
          <li>${icons.check()}Check silicone joints annually and replace if they deteriorate</li>
          <li>${icons.check()}Keep drains clear of hair and debris</li>
          <li>${icons.check()}Address leaks or damp smells promptly</li>
          <li>${icons.check()}Keep a record of product names, colours and receipts</li>
        </ul>

        <h2>Resale and insurance</h2>
        <p>Keep your certificates, contract, warranty documents and product information in a safe place. They are useful when you sell, refinance or make an insurance claim. A documented bathroom renovation is easier to verify than an undocumented one, even if the finishes look the same.</p>
      </div>
      <aside class="sidebar" aria-label="Warranty links">
        ${contactCard("Warranty or aftercare question?", "Call us and describe the issue. We will arrange an inspection and explain the next step.")}
        ${linksCard("Related pages", [
          ["Waterproofing quality", "/quality/waterproofing/"],
          ["Contractor standards", "/contractor-standards/"],
          ["Our process", "/our-process/"],
          ["Choosing a contractor", "/choosing-a-contractor/"],
          ["FAQs", "/faqs/"],
        ])}
        ${servicesCard()}
      </aside>
    </div>
  </div>
</section>

${faqSection(warrantyFaqs, {
  title: "Warranty and certificate questions",
  eyebrow: "Aftercare",
  intro: "What is covered, what is excluded and how to make a claim.",
})}

${ctaBand({
  title: "Ask about warranty before you build",
  text: `Call ${site.phoneDisplay} and we will explain the warranty, certificates and handover documents for your project.`,
})}
`;

  return {
    path: "/warranty-and-certificates/",
    title: "Bathroom Renovation Warranty & Certificates Brisbane | Ace",
    description:
      "What you receive at handover: waterproofing certificate, plumbing and electrical documentation, workmanship warranty and care guide. Call (07) 8590 6941.",
    image: images.waterproofing,
    body,
    crumbs: [{ name: "Warranty & Certificates", url: "/warranty-and-certificates/" }],
    schema: [faqSchema(warrantyFaqs)],
  };
}

/* ------------------------------------------------------------------ *
 * Waterproofing quality
 * ------------------------------------------------------------------ */
const waterFaqs = [
  {
    q: "How long does bathroom waterproofing last?",
    a: "A properly installed membrane can last many years, but its life depends on the product, substrate, preparation, movement, maintenance and the tiling system above it. No membrane lasts forever if the substrate moves, the drains leak or the bathroom is not maintained. We install to AS 3740 and document the work so there is a clear record.",
  },
  {
    q: "How do I know the waterproofing was tested?",
    a: "We flood test the membrane before tiling and record the result. You receive a compliance certificate at handover, and we keep photographs of the preparation and membrane. If you are renovating with another builder, ask for the same evidence before the tiles go down.",
  },
  {
    q: "Can you waterproof over existing tiles?",
    a: "It is rarely a good idea. Waterproofing needs a suitable, stable, clean substrate with correct falls and detailing. Tiling over an existing floor can trap moisture, hide failed sheeting and create height and drainage problems. We assess the existing build-up and recommend removal where the risk is too high.",
  },
  {
    q: "What is a flood test?",
    a: "A flood test involves ponding water over the waterproofed area for a specified period to check for leaks before tiling. It is one part of the quality process, not a substitute for correct preparation and application. We document the test and the membrane installation.",
  },
  {
    q: "Why do bathrooms leak at the shower?",
    a: "Common causes include inadequate falls, failed silicone or grout, movement at junctions, penetrations that were not reinforced, membrane damage during tiling and blocked or incorrectly installed wastes. Most failures start at a detail, not in the middle of a tile field.",
  },
  {
    q: "Does a waterproofing certificate guarantee no leaks?",
    a: "No certificate can guarantee that a building will never leak. A certificate confirms that the waterproofing work was carried out and inspected to the applicable standard at the time. Maintenance, movement, later alterations and damage can still cause problems. The certificate is evidence of compliance, not an indefinite insurance policy.",
  },
];

export function renderQuality() {
  const body = `
${hero({
  image: images.waterproofing,
  alt: "Bathroom waterproofing quality and AS 3740 compliance",
  eyebrow: "Waterproofing quality",
  h1: "Bathroom waterproofing done properly",
  lead:
    "AS 3740 preparation, membrane application, flood testing and certification. The concealed work that decides whether your bathroom lasts.",
  primary: { href: "/get-a-quote/", label: "Get a free quote" },
  secondary: { href: tel, label: `Call ${site.phoneDisplay}` },
  trust: ["AS 3740 membrane systems", "Flood tested", "Certificate at handover", "Licensed waterproofer"],
  card: `<p><strong>Waterproofing question?</strong> Call <a href="${tel}">${site.phoneDisplay}</a> and we will explain how the wet area will be prepared, tested and documented.</p>`,
  page: true,
})}
${trustStrip()}

<section class="section">
  <div class="container">
    <div class="detail-layout">
      <div class="prose">
        <p class="eyebrow">The concealed layer</p>
        <h2>Why waterproofing is the most important part of the job</h2>
        <p>Tiles are the visible finish. Waterproofing is the system that protects the building from the water that gets behind them. When it fails, the damage is rarely limited to the bathroom. Water can travel into framing, ceilings, adjacent rooms and the floor structure, and the repair often costs more than the original renovation.</p>
        <p>Waterproofing is not a coat of paint applied at the end of the week. It is a system: the right substrate, the right preparation, the right membrane, the right reinforcement at every junction and penetration, correct falls, adequate cure and protection during tiling. Each step depends on the one before it.</p>

        <h2>AS 3740 and the building code</h2>
        <p>AS 3740 sets out the requirements for waterproofing wet areas in residential buildings. The National Construction Code sets the broader performance requirements. In practice, that means the shower, the area around the bath, the vanity splashback and the floor are treated according to the wet-area classification, with membranes extending to the required heights and details.</p>
        <p>We do not rely on a generic "waterproof the bathroom" line. The scope identifies the areas, the membrane system, the preparation, the flood test and the certificate. If a detail is unclear, we resolve it before tiling.</p>

        <h2>Step 1: Substrate preparation</h2>
        <p>The substrate must be sound, clean, dry and suitable for the membrane. We remove loose material, repair damaged sheeting, check for movement and fill voids. Bond breakers are installed where the membrane meets a different material, and fillets are formed at internal corners so the membrane does not bridge a sharp angle.</p>

        <h2>Step 2: Falls and drainage</h2>
        <p>Shower floors need falls to the waste so water does not pool. The fall must be formed in the substrate or screed, not created by thick adhesive under the tiles. We check the waste position, the flange and the waterproofing detail around it. A blocked or poorly sealed waste is one of the most common causes of shower leaks.</p>

        <h2>Step 3: Membrane application</h2>
        <p>We apply a membrane system compatible with the substrate and the intended finish, in accordance with the manufacturer's requirements. Corners, junctions and penetrations are reinforced with suitable bandage or fabric. The membrane is applied in the required number of coats at the required thickness, with adequate drying time between coats.</p>

        <h2>Step 4: Flood testing</h2>
        <p>Before tiling, the waterproofed area is flood tested. We inspect for leaks, record the result and photograph the membrane. If a defect is found, it is repaired and retested. Tiling does not proceed until the membrane has passed and cured.</p>

        <h2>Step 5: Protection during tiling</h2>
        <p>The membrane can be damaged by careless tiling, sharp tools, screed barrows and dropped tiles. We protect the surface, control traffic and repair any accidental damage before it is covered. The tiler and waterproofer coordinate so the detail at the shower, bath and vanity is not compromised.</p>

        <h2>Step 6: Certification and records</h2>
        <p>At handover you receive a waterproofing compliance certificate and a record of the installation. We keep photographs of the preparation and membrane so there is evidence of what was installed. That documentation is valuable for insurance, resale and any future maintenance.</p>

        <h2>Common waterproofing failures</h2>
        <ul class="checklist">
          <li>${icons.check()}Insufficient falls, causing water to pool</li>
          <li>${icons.check()}Membrane applied over a dirty, wet or unstable substrate</li>
          <li>${icons.check()}No reinforcement at corners, junctions or penetrations</li>
          <li>${icons.check()}Membrane damaged during screeding or tiling</li>
          <li>${icons.check()}Failed silicone or grout at movement junctions</li>
          <li>${icons.check()}Blocked or incorrectly installed wastes</li>
          <li>${icons.check()}Shower screen fixings that penetrate the membrane without sealing</li>
          <li>${icons.check()}No flood test or no documentation</li>
        </ul>

        <h2>What to ask any waterproofer</h2>
        <p>Ask what membrane system they use, how the substrate is prepared, how corners and penetrations are treated, whether they flood test, who inspects the work and what certificate you receive. Ask to see photographs before the tiles go down. A professional waterproofer will welcome the questions.</p>

        <h2>Maintenance after handover</h2>
        <p>Keep the exhaust fan working, clean with suitable products, check silicone joints and address leaks promptly. Do not drill into a waterproofed wall without sealing the penetration correctly. If you notice dampness, mould or a loose tile, investigate early. Small problems are cheaper to fix than structural water damage.</p>
      </div>
      <aside class="sidebar" aria-label="Waterproofing links">
        ${contactCard("Waterproofing enquiry", "Ask about AS 3740 detailing, flood testing and certification for your bathroom or laundry.")}
        ${linksCard("Related pages", [
          ["Waterproofing service", "/services/waterproofing/"],
          ["Tiling service", "/services/tiling/"],
          ["Warranty and certificates", "/warranty-and-certificates/"],
          ["Contractor standards", "/contractor-standards/"],
          ["Choosing a contractor", "/choosing-a-contractor/"],
        ])}
        ${areasCard()}
      </aside>
    </div>
  </div>
</section>

${faqSection(waterFaqs, {
  title: "Waterproofing questions",
  eyebrow: "Technical answers",
  intro: "AS 3740, flood testing, certificates, common failures and maintenance.",
})}

${ctaBand({
  title: "Get the waterproofing right",
  text: `Call ${site.phoneDisplay} to discuss the wet-area scope, membrane system and documentation for your renovation.`,
})}
`;

  return {
    path: "/quality/waterproofing/",
    title: "Bathroom Waterproofing Quality Brisbane | AS 3740 | Ace",
    description:
      "How we waterproof Brisbane bathrooms: AS 3740 preparation, membrane application, flood testing and compliance certificates. Call (07) 8590 6941.",
    image: images.waterproofing,
    body,
    crumbs: [{ name: "Waterproofing Quality", url: "/quality/waterproofing/" }],
    schema: [faqSchema(waterFaqs)],
  };
}
