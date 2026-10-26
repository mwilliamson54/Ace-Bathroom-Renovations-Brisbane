import { site, images } from "../config.mjs";
import { services } from "../data/services.mjs";
import { locations } from "../data/locations.mjs";
import {
  hero,
  trustStrip,
  ctaBand,
  faqSection,
  icons,
  tel,
  mail,
  faqSchema,
} from "../lib/layout.mjs";

const faqs = [
  {
    q: "How much does a bathroom renovation cost in Brisbane?",
    a: "Most full bathroom renovations in Brisbane range from $18,000 to $45,000, with many projects between $24,000 and $36,000. Small bathrooms, ensuites and laundries can cost less, while layout changes, premium finishes, structural repairs and apartment access can push the price higher. Read our <a href=\"/cost-guide/\">bathroom renovation cost guide</a> for a detailed breakdown.",
  },
  {
    q: "Is your quote fixed?",
    a: "We provide a fixed price for the work that can be defined after inspection, and transparent provisional allowances for conditions that cannot be confirmed until demolition. If a provisional item changes, we document it, explain the options and agree the variation in writing before proceeding.",
  },
  {
    q: "What is included in a bathroom renovation quote?",
    a: "A complete quote includes demolition, disposal, substrate preparation, waterproofing, screeding, tiling, plumbing, electrical, joinery, fixtures, painting, make-good, site protection, project management, allowances, exclusions and payment stages. If you are comparing quotes, check each of these line by line.",
  },
  {
    q: "Can I pay in stages?",
    a: "Yes. Payments are linked to progress and set out in your contract. A typical schedule includes a deposit, a progress payment after rough-in and waterproofing, a payment after tiling, and the balance at practical completion. We do not ask for large cash payments or payments unrelated to progress.",
  },
  {
    q: "Do you charge for a quote or site visit?",
    a: "No. The on-site measure and written quote are free within our standard Greater Brisbane service area. There is no obligation to proceed. If a property is outside the normal radius or requires unusual access arrangements, we will explain any additional cost before booking.",
  },
  {
    q: "How long does a bathroom renovation take?",
    a: "A typical full bathroom takes 10 to 15 working days on site after demolition. Waterproofing cure and product lead times add to the calendar time. From first call to handover, allow six to twelve weeks. Layout changes, structural repairs and custom joinery can extend the programme.",
  },
  {
    q: "Can I stay in my home during the renovation?",
    a: "Usually yes, if you have another bathroom or toilet. We contain dust, protect floors and clean daily. If you have only one bathroom, we plan the sequence to minimise the period without a usable toilet and discuss temporary options before work starts.",
  },
  {
    q: "Do you work weekends?",
    a: "We take calls and enquiries seven days a week. Construction work is scheduled within agreed hours and in line with body corporate or local requirements. Weekend site work is considered case by case, not promised by default.",
  },
  {
    q: "What causes delays in a bathroom renovation?",
    a: "The most common causes are product lead times, hidden water damage, asbestos, structural repairs, approval delays and client changes after products are ordered. A realistic programme allows for these risks. We update you as soon as a delay is known rather than waiting for the deadline.",
  },
  {
    q: "Do I need architectural plans?",
    a: "Usually not for a like-for-like bathroom renovation. If you are moving walls, changing the building envelope or working in a heritage or apartment building, plans or approval documentation may be required. We will tell you what applies after inspecting the property.",
  },
  {
    q: "Can you change the layout of my bathroom?",
    a: "Often yes. Relocating a toilet, vanity or shower depends on joist direction, waste fall, stack access and floor structure. We assess those constraints during the site inspection and price the plumbing and structural work as part of the written scope. Not every layout is feasible, and we will tell you if it is not.",
  },
  {
    q: "Do you handle body corporate approvals?",
    a: "We provide the scope and methodology information needed for your application and work within the building's rules. The approval itself is issued to the owner or body corporate. We coordinate lift bookings, common-area protection and work hours once approval is in place.",
  },
  {
    q: "Do you supply tiles and fixtures?",
    a: "We can supply through our trade suppliers or work with your selections. Either way, we confirm quantities, lead times, compatibility and spares before ordering. We do not lock you into a single showroom or take undisclosed supplier commissions.",
  },
  {
    q: "Can I supply my own tiles or tapware?",
    a: "Yes, provided the products are suitable, available and compliant. You carry the risk of lead times, damage, shortages and warranty claims on client-supplied items. We confirm quantities and compatibility before ordering and explain any installation implications.",
  },
  {
    q: "What happens if you find asbestos?",
    a: "If asbestos is suspected, we stop work, arrange testing and use a licensed removal contractor before the renovation continues. Removal is a legitimate variation, not a hidden extra. Homes built before the late 1980s carry the highest risk, particularly in sheeting, adhesives and lagging.",
  },
  {
    q: "Who manages the trades?",
    a: "Our project lead coordinates the licensed trades and checks the work. You do not need to book plumbers, electricians, waterproofers or tilers yourself. That coordination is part of the service and part of what makes the programme realistic.",
  },
  {
    q: "Do you provide a waterproofing certificate?",
    a: "Yes. Wet-area waterproofing is applied to AS 3740, flood tested and documented. You receive a compliance certificate at handover, along with photographs of the concealed work and care instructions.",
  },
  {
    q: "What waterproofing standard do you use?",
    a: "We work to AS 3740 for wet-area waterproofing, with the National Construction Code setting the broader building requirements. The membrane system is selected for the substrate and finish, reinforced at junctions and penetrations, and tested before tiling.",
  },
  {
    q: "How long does waterproofing last?",
    a: "A properly installed membrane can last many years, but its life depends on the product, substrate, preparation, movement, maintenance and the tiling system above it. No membrane lasts forever if the substrate moves, a drain leaks or the bathroom is not maintained.",
  },
  {
    q: "What warranty do you provide?",
    a: "Your contract sets out the workmanship warranty, and statutory warranties apply under Queensland law. In general terms, structural defects are covered for six years and six months and non-structural defects for twelve months from completion. Product warranties are separate and vary by manufacturer.",
  },
  {
    q: "How do I make a warranty claim?",
    a: "Call us and describe the issue. We will arrange an inspection, identify the cause and explain whether it is covered. If it is a genuine defect, we will arrange the repair. Please do not attempt a repair yourself before we inspect.",
  },
  {
    q: "What areas of Brisbane do you cover?",
    a: "We cover Greater Brisbane within approximately 35 km of the CBD, including the northside, southside, eastside, westside and inner city. Regular areas include Chermside, Aspley, Geebung, Coorparoo, Carindale, Morningside, Yeronga, Sunnybank Hills, Forest Lake, Indooroopilly, Toowong, The Gap and Spring Hill.",
  },
  {
    q: "Do you charge extra for travel?",
    a: "There is no separate travel surcharge within our standard Greater Brisbane service area. If a property is outside the normal radius or requires special access arrangements, we explain any additional cost before booking.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. We hold a QBCC builder licence restricted to kitchen, bathroom and laundry work, with Certificate III qualifications in wall and floor tiling (CPC31320) and construction waterproofing (CPC31420). We carry public liability insurance and can provide a certificate of currency. Licence details are published once on the <a href=\"/about/\">About page</a>.",
  },
  {
    q: "Do you take on small jobs?",
    a: "We take on waterproofing, tiling and smaller bathroom upgrades when they fit our schedule and can be done properly. Call us with the scope and we will tell you honestly whether it is a good fit. We do not pretend a small job is a full renovation to inflate the price.",
  },
  {
    q: "Do you renovate commercial bathrooms?",
    a: "Yes. We renovate bathrooms in offices, cafes, retail spaces and other commercial premises, subject to access, after-hours requirements and compliance. Read the <a href=\"/services/commercial-bathroom-renovation/\">commercial bathroom service page</a> or call to discuss the scope.",
  },
  {
    q: "Will the team who quotes my bathroom also do the work?",
    a: "Yes. The team who inspects your bathroom is accountable for the waterproofing, tiling, trade coordination and handover. You deal with one builder from start to finish.",
  },
  {
    q: "Can I speak to a past client?",
    a: "Yes, where the client has agreed to act as a referee. Ask us when you call and we will arrange a conversation with a past client from a comparable project, subject to their availability and privacy. Read our <a href=\"/reviews/\">review and referee policy</a>.",
  },
  {
    q: "What happens if I am not happy with the work?",
    a: "Tell your project lead as soon as possible so we can inspect the issue. If it is a genuine defect, we will arrange a response under the contract and the applicable warranty. If it cannot be resolved directly, the dispute-resolution process in your contract applies.",
  },
  {
    q: "How do I start?",
    a: "Call us on (07) 8590 6941 or <a href=\"/get-a-quote/\">request a quote</a>. Tell us the room, the property, your suburb, your timing and your rough budget. If it is a fit, we will arrange a free on-site measure and prepare a written quote.",
  },
];

export function renderFaqs() {
  const body = `
${hero({
  image: images.hero,
  alt: "Frequently asked questions about Brisbane bathroom renovations",
  eyebrow: "Frequently asked questions",
  h1: "Bathroom renovation FAQs",
  lead:
    "Thirty straight answers about cost, timing, licensing, waterproofing, warranties, service areas and what it is like to renovate with our team.",
  primary: { href: "/get-a-quote/", label: "Get a free quote" },
  secondary: { href: tel, label: `Call ${site.phoneDisplay}` },
  trust: ["Open 7am–10pm, 7 days", "QBCC licensed builder", "Free on-site measure", "Written fixed scope"],
  card: `<p><strong>Question not answered here?</strong> Call <a href="${tel}">${site.phoneDisplay}</a> or email <a href="${mail}">${site.email}</a>. We will give you a direct answer.</p>`,
  page: true,
})}
${trustStrip()}

<section class="section">
  <div class="container container-narrow">
    <div class="prose" style="text-align:center;margin-bottom:10px">
      <p class="eyebrow" style="justify-content:center">Start here</p>
      <h2>The questions homeowners actually ask</h2>
      <p class="lead">We have grouped the answers by topic. If you are comparing builders, read the licensing, quote and warranty sections first. If you are ready to plan, start with cost and timing.</p>
    </div>
  </div>
</section>

${faqSection(faqs, {
  title: "Bathroom renovation questions, answered",
  eyebrow: "Cost, timing, licensing and process",
  intro: "Everything we are asked most often, in plain English. Call us if your question is not here.",
})}

<section class="section">
  <div class="container">
    <div class="detail-layout">
      <div class="prose">
        <p class="eyebrow">Before you call</p>
        <h2>How to get a useful answer quickly</h2>
        <p>The more context you can give us, the more useful the first conversation will be. Tell us the suburb, the property type, the room or rooms you want to renovate, what is not working and your rough budget and timing. A photo of the room helps, but it is not essential.</p>
        <p>If you are still researching, that is fine. We would rather answer your questions now than have you sign something you do not understand. There is no obligation to book a measure, and no pressure to proceed.</p>
        <h2>Still comparing builders?</h2>
        <p>Use our <a href="/choosing-a-contractor/">guide to choosing a bathroom contractor</a> to check licences, insurance, contracts, waterproofing and referees. It is written to help you evaluate any builder, including us. If a quote looks unusually cheap, read the scope carefully and ask what is excluded.</p>
        <h2>Ready to plan?</h2>
        <p>Call <a href="${tel}">${site.phoneDisplay}</a> or <a href="/get-a-quote/">request a quote</a>. We will talk through the room and, if it is a fit, arrange a free on-site measure. You will receive a written scope you can compare properly.</p>
      </div>
      <aside class="sidebar" aria-label="FAQ help">
        <div class="sidebar-card sidebar-card--teal">
          <h3>Ask a direct question</h3>
          <p>Call our Brisbane team seven days a week, 7am to 10pm.</p>
          <a class="btn btn-white" href="${tel}">${icons.phone(17)} ${site.phoneDisplay}</a>
          <a class="btn btn-outline-white" href="${mail}">${icons.mail(17)} Email us</a>
          <p style="font-size:.76rem;margin:10px 0 0">${site.hoursLong}</p>
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
          <h3>Service areas</h3>
          <ul class="sidebar-list">
            ${locations.slice(0, 6).map((l) => `<li><a href="/${l.slug}/">${l.suburb} ${icons.chevron(14)}</a></li>`).join("")}
            <li><a href="/locations/">All locations ${icons.chevron(14)}</a></li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</section>

${ctaBand({
  title: "Have a question we have not answered?",
  text: `Call ${site.phoneDisplay} or send a message. We will give you a straight answer, even if the answer is that we are not the right builder for the job.`,
})}
`;

  return {
    path: "/faqs/",
    title: "Bathroom Renovation FAQs Brisbane | Ace Bathroom Renovations",
    description:
      "Answers to common Brisbane bathroom renovation questions: cost, timing, licensing, waterproofing, warranties and service areas. Call (07) 8590 6941.",
    image: images.hero,
    body,
    crumbs: [{ name: "FAQs", url: "/faqs/" }],
    schema: [faqSchema(faqs)],
  };
}
