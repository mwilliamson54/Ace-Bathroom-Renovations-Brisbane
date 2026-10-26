import { site, images } from "../config.mjs";
import { services } from "../data/services.mjs";
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

const quoteFaqs = [
  {
    q: "Is the quote really free?",
    a: "Yes. We provide a free on-site measure and written quote for bathroom, ensuite, laundry and kitchen projects within our Greater Brisbane service area. There is no obligation to proceed and no charge for the initial conversation.",
  },
  {
    q: "What happens after I submit the form?",
    a: "We review your details and call you, usually within one business day and often sooner. We will ask about the room, the property, your timing and your budget, then arrange an on-site measure if the project looks like a fit. If we are not the right builder, we will tell you.",
  },
  {
    q: "What should I have ready for the measure?",
    a: "Have a rough idea of your budget and timing, any photos or plans, and the body corporate or heritage details if applicable. You do not need final tile or tapware selections. The measure is about understanding the room and the scope, not pressuring you into choices.",
  },
  {
    q: "Do you charge for travel or site visits?",
    a: "There is no separate travel charge within our standard Greater Brisbane service area. If a property is outside the normal radius or requires special access arrangements, we will explain any additional cost before booking.",
  },
  {
    q: "Can I get a quote without an on-site visit?",
    a: "We can give you a planning range over the phone, but we do not issue a fixed written quote without inspecting the room. Bathroom pricing depends on substrate condition, drainage, ventilation, access and measured quantities. A remote guess is not a quote.",
  },
  {
    q: "Will you pressure me to sign on the day?",
    a: "No. We send the written quote after the measure so you can read it properly and compare it with other quotes. We are happy to answer questions, adjust the scope or explain the allowances. The decision is yours.",
  },
];

const budgetOptions = [
  "Under $15,000",
  "$15,000 – $25,000",
  "$25,000 – $35,000",
  "$35,000 – $50,000",
  "$50,000+",
  "Not sure yet",
];

const timelineOptions = [
  "As soon as possible",
  "Within 1–3 months",
  "Within 3–6 months",
  "6–12 months",
  "Just researching",
];

function quoteForm(source = "quote-page") {
  return `<form class="form-card" id="quote-form" action="/api/quote" method="post" novalidate>
    <input type="hidden" name="source" value="${source}">
    <div class="hp-field" aria-hidden="true">
      <label for="company-website">Company website</label>
      <input type="text" id="company-website" name="company_website" tabindex="-1" autocomplete="off">
    </div>
    <div class="form-grid form-grid--2">
      <div class="field">
        <label for="quote-name">Your name <span class="req">*</span></label>
        <input type="text" id="quote-name" name="name" autocomplete="name" required maxlength="80" placeholder="First and last name">
      </div>
      <div class="field">
        <label for="quote-phone">Phone <span class="req">*</span></label>
        <input type="tel" id="quote-phone" name="phone" autocomplete="tel" required maxlength="30" placeholder="04XX XXX XXX">
        <span class="field__hint">We will call you to discuss the project.</span>
      </div>
      <div class="field">
        <label for="quote-email">Email</label>
        <input type="email" id="quote-email" name="email" autocomplete="email" maxlength="120" placeholder="you@example.com">
      </div>
      <div class="field">
        <label for="quote-suburb">Suburb <span class="req">*</span></label>
        <input type="text" id="quote-suburb" name="suburb" autocomplete="address-level2" required maxlength="60" placeholder="e.g. Chermside">
      </div>
      <div class="field">
        <label for="quote-property">Property type</label>
        <select id="quote-property" name="property">
          <option value="house">House</option>
          <option value="townhouse">Townhouse</option>
          <option value="apartment">Apartment</option>
          <option value="duplex">Duplex or unit</option>
          <option value="commercial">Commercial</option>
        </select>
      </div>
      <div class="field">
        <label for="quote-project">Project type</label>
        <select id="quote-project" name="project">
          ${services.map((s) => `<option value="${s.slug}">${s.name}</option>`).join("")}
          <option value="multiple">More than one room</option>
          <option value="not-sure">Not sure yet</option>
        </select>
      </div>
      <div class="field">
        <label for="quote-budget">Approximate budget</label>
        <select id="quote-budget" name="budget">
          ${budgetOptions.map((b) => `<option value="${b}">${b}</option>`).join("")}
        </select>
      </div>
      <div class="field">
        <label for="quote-timeline">Preferred timing</label>
        <select id="quote-timeline" name="timeline">
          ${timelineOptions.map((t) => `<option value="${t}">${t}</option>`).join("")}
        </select>
      </div>
      <div class="field field--full">
        <label for="quote-message">Tell us about the room</label>
        <textarea id="quote-message" name="message" maxlength="2000" placeholder="Room size, what is not working, layout changes, access notes, body corporate or heritage requirements."></textarea>
      </div>
      <div class="field field--full">
        <label class="form-consent">
          <input type="checkbox" name="consent" value="yes" required>
          <span>I agree to be contacted about this enquiry and have read the <a href="/privacy-policy/">Privacy Policy</a>. <span class="req">*</span></span>
        </label>
      </div>
    </div>
    <div class="btn-group" style="margin-top:18px">
      <button class="btn btn-primary btn-lg" type="submit">Request my quote</button>
      <a class="btn btn-outline btn-lg" href="${tel}">${icons.phone(17)} Call instead</a>
    </div>
    <div class="form-status" id="quote-status" role="status" aria-live="polite"></div>
    <p class="calc-note" style="margin-top:14px">We use your details only to respond to this enquiry. Your information stays with our team and is never shared for marketing.</p>
  </form>`;
}

export function renderQuote() {
  const body = `
${hero({
  image: images.full,
  alt: "Request a bathroom renovation quote in Brisbane",
  eyebrow: "Get a quote",
  h1: "Request a bathroom renovation quote",
  lead:
    "Tell us about the room and we will call to discuss the scope, budget and timing before arranging a free on-site measure. No call centre, no lead selling, no pressure.",
  primary: { href: tel, label: `Call ${site.phoneDisplay}` },
  secondary: { href: "#quote-form", label: "Send your details" },
  trust: ["Free on-site measure", "Written itemised quote", "QBCC licensed builder", "Open 7am–10pm, 7 days"],
  card: `<p><strong>Need an answer now?</strong> Call <a href="${tel}">${site.phoneDisplay}</a>. We answer seven days a week, 7am to 10pm.</p>`,
  page: true,
})}
${trustStrip()}

<section class="section">
  <div class="container">
    <div class="contact-panel">
      <div>
        <p class="eyebrow">Talk to a builder</p>
        <h2>Start with a conversation, not a sales pitch</h2>
        <p class="lead">A bathroom renovation is a big decision. You should be able to ask about scope, cost, timing and licensing before you invite anyone into your home.</p>
        <p>Call us and you will speak with our Brisbane team, not a call centre or a sales agency. We will ask about the room, the property and what you want to change. If the project is a fit, we book an on-site measure and prepare a written quote. If it is not, we will tell you honestly and point you in a better direction where we can.</p>
        <div class="contact-methods">
          <div class="contact-method">${icons.phone(22)}<div><strong>Call</strong><a href="${tel}">${site.phoneDisplay}</a></div></div>
          <div class="contact-method">${icons.mail(22)}<div><strong>Email</strong><a href="${mail}">${site.email}</a></div></div>
          <div class="contact-method">${icons.clock(22)}<div><strong>Hours</strong><span>${site.hoursLong}</span></div></div>
          <div class="contact-method">${icons.pin(22)}<div><strong>Service area</strong><span>Greater Brisbane, within approximately 35 km of the CBD</span></div></div>
        </div>
        <div class="notice" style="margin-top:18px"><strong>What happens next.</strong> We review your enquiry, call you to discuss the room and arrange a time to inspect it. The measure usually takes 45–60 minutes. You receive a written quote after we have checked the substrate, plumbing, ventilation and access.</div>
      </div>
      <div>
        ${quoteForm("quote-page")}
      </div>
    </div>
  </div>
</section>

<section class="section section--pale">
  <div class="container">
    <div class="section-head section-head--center">
      <p class="eyebrow">What to expect</p>
      <h2>From enquiry to written quote</h2>
      <p class="lead">A clear, four-step process with no obligation to proceed.</p>
    </div>
    <div class="steps steps--4">
      <div class="step"><h3>1. Call or send details</h3><p>Tell us the room, property type, suburb, timing and rough budget. We will ask a few practical questions.</p></div>
      <div class="step"><h3>2. On-site measure</h3><p>We inspect the substrate, drainage, ventilation, access and existing services, and measure the room.</p></div>
      <div class="step"><h3>3. Written quote</h3><p>You receive an itemised quote with scope, allowances, exclusions, programme and payment stages.</p></div>
      <div class="step"><h3>4. Decide in your time</h3><p>Ask questions, compare quotes and adjust the scope. We do not pressure you to sign on the day.</p></div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="detail-layout">
      <div class="prose">
        <p class="eyebrow">Before you enquire</p>
        <h2>Helpful information for a more accurate quote</h2>
        <p>You do not need to have everything decided before you call, but a little preparation helps us give you a more useful conversation. The most important details are the property type, the age of the bathroom, whether the layout is changing and whether there are building or body corporate rules that affect the work.</p>
        <ul class="checklist">
          <li>${icons.check()}Your suburb and postcode</li>
          <li>${icons.check()}House, townhouse or apartment</li>
          <li>${icons.check()}The room or rooms you want to renovate</li>
          <li>${icons.check()}What is not working — leaks, mould, storage, layout or age</li>
          <li>${icons.check()}Whether you want to keep the existing layout</li>
          <li>${icons.check()}Your rough budget and preferred timing</li>
          <li>${icons.check()}Body corporate, heritage or building approval requirements</li>
          <li>${icons.check()}Any photos, plans or product selections you already have</li>
        </ul>
        <h2>Why we ask about budget</h2>
        <p>Budget is not a trap. It helps us recommend a scope that can actually deliver what you want. If your budget is $20,000 and your wish list requires $35,000 of work, we would rather discuss the gap early than design a quote you cannot accept. We can often suggest a staged approach, a smaller scope or a different finish level that gets closer to your goal.</p>
        <h2>What we will not do</h2>
        <p>We will not sell your enquiry to other contractors, add you to a marketing list you did not ask for, or pressure you into a same-day decision. We will not issue a fake fixed price without inspecting the room, and we will not hide provisional items in the fine print. If we cannot help, we will say so.</p>
      </div>
      <aside class="sidebar" aria-label="Quote help">
        <div class="sidebar-card sidebar-card--teal">
          <h3>Prefer to call?</h3>
          <p>Talk to our Brisbane team seven days a week, 7am to 10pm.</p>
          <a class="btn btn-white" href="${tel}">${icons.phone(17)} ${site.phoneDisplay}</a>
          <a class="btn btn-outline-white" href="${mail}">${icons.mail(17)} Email us</a>
          <p style="font-size:.76rem;margin:10px 0 0">${site.hoursLong}</p>
        </div>
        <div class="sidebar-card">
          <h3>Helpful reading</h3>
          <ul class="sidebar-list">
            <li><a href="/cost-guide/">Bathroom cost guide ${icons.chevron(14)}</a></li>
            <li><a href="/how-it-works/">How it works ${icons.chevron(14)}</a></li>
            <li><a href="/our-process/">Our process ${icons.chevron(14)}</a></li>
            <li><a href="/choosing-a-contractor/">Choosing a contractor ${icons.chevron(14)}</a></li>
            <li><a href="/warranty-and-certificates/">Warranty and certificates ${icons.chevron(14)}</a></li>
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
      </aside>
    </div>
  </div>
</section>

${faqSection(quoteFaqs, {
  title: "Quote and measure questions",
  eyebrow: "Before you send",
  intro: "What the quote includes, what happens after you enquire and how we handle your details.",
})}

${ctaBand({
  title: "Would you rather just call?",
  text: `Speak with our Brisbane team on ${site.phoneDisplay}, seven days a week. We will give you a straight answer on scope, budget and the next step.`,
  primary: { href: tel, label: `Call ${site.phoneDisplay}` },
  secondary: { href: mail, label: "Email us" },
})}
`;

  return {
    path: "/get-a-quote/",
    title: "Get a Bathroom Renovation Quote Brisbane | Ace Bathrooms",
    description:
      "Request a free bathroom quote in Brisbane. On-site measure, itemised written scope and a conversation with a QBCC licensed builder. Call (07) 8590 6941.",
    image: images.full,
    body,
    crumbs: [{ name: "Get a Quote", url: "/get-a-quote/" }],
    schema: [
      faqSchema(quoteFaqs),
      {
        "@type": "ContactPage",
        "@id": `${site.domain}/get-a-quote/#contactpage`,
        name: "Request a bathroom renovation quote",
        url: `${site.domain}/get-a-quote/`,
        about: { "@id": `${site.domain}/#organization` },
      },
    ],
  };
}

const contactFaqs = [
  {
    q: "What is the best way to contact you?",
    a: "Call during opening hours for the fastest response. We answer seven days a week, 7am to 10pm. If you prefer to write, email us or use the contact form and we will reply as soon as we can, usually within one business day.",
  },
  {
    q: "Where are you based?",
    a: "We are an inner-Brisbane based mobile renovation service. Our office address is listed once on the About page for business records and licence identification. We come to your property for the measure, the build and the handover.",
  },
  {
    q: "Do you work on weekends?",
    a: "We take calls and enquiries seven days a week. Construction work is scheduled within agreed hours and in line with body corporate or local requirements. Weekend site work is considered case by case.",
  },
  {
    q: "How quickly will you respond?",
    a: "Calls are answered during opening hours. Form and email enquiries are usually reviewed within one business day. If your matter is urgent, call us rather than relying on the form.",
  },
  {
    q: "Can I visit your office?",
    a: "Our office is used for business records rather than as a showroom, and visits are by appointment only. The best way to discuss a project is to call us or book an on-site measure at your property.",
  },
  {
    q: "Do you take on small jobs?",
    a: "We take on waterproofing, tiling and smaller bathroom upgrades when they fit our schedule and can be done properly. Call us with the scope and we will tell you honestly whether it is a good fit.",
  },
];

export function renderContact() {
  const body = `
${hero({
  image: images.apartment,
  alt: "Contact Ace Bathroom Renovations Brisbane",
  eyebrow: "Contact us",
  h1: "Contact Ace Bathroom Renovations Brisbane",
  lead:
    "Call, email or send a message. We answer seven days a week and will give you a straightforward answer about scope, budget and timing.",
  primary: { href: tel, label: `Call ${site.phoneDisplay}` },
  secondary: { href: "#contact-form", label: "Send a message" },
  trust: ["Open 7am–10pm, 7 days", "Brisbane mobile service", "QBCC licensed builder", "Free on-site measure"],
  card: `<p><strong>Call now:</strong> <a href="${tel}">${site.phoneDisplay}</a><br><strong>Email:</strong> <a href="${mail}">${site.email}</a></p>`,
  page: true,
})}
${trustStrip()}

<section class="section">
  <div class="container">
    <div class="contact-panel">
      <div>
        <p class="eyebrow">Talk to us</p>
        <h2>One number, one team, seven days</h2>
        <p class="lead">The fastest way to get an answer is to call. If you cannot talk now, send a message and we will come back to you.</p>
        <div class="contact-methods">
          <div class="contact-method">${icons.phone(22)}<div><strong>Phone</strong><a href="${tel}">${site.phoneDisplay}</a></div></div>
          <div class="contact-method">${icons.mail(22)}<div><strong>Email</strong><a href="${mail}">${site.email}</a></div></div>
          <div class="contact-method">${icons.clock(22)}<div><strong>Hours</strong><span>${site.hoursLong}</span></div></div>
          <div class="contact-method">${icons.pin(22)}<div><strong>Service area</strong><span>Greater Brisbane, within approximately 35 km of the CBD</span></div></div>
        </div>
        <div class="notice" style="margin-top:18px"><strong>Mobile service.</strong> We come to you for the measure and the build. Our office address is used for business records and licence identification, and is listed once on the <a href="/about/">About page</a>. We do not run a drop-in showroom.</div>
        <h2 style="margin-top:34px">What to expect when you call</h2>
        <p>We will ask about the room, the property, your timing and your budget. You do not need plans or final selections. If the project is a fit, we book an on-site measure and prepare a written quote. If it is not, we will tell you and, where possible, point you in a better direction.</p>
        <p>We do not use a call centre, sell your enquiry or pass you to another contractor. The person who answers is part of the team accountable for the work.</p>
      </div>
      <div>
        <form class="form-card" id="contact-form" action="/api/quote" method="post" novalidate>
          <input type="hidden" name="source" value="contact-page">
          <div class="hp-field" aria-hidden="true">
            <label for="contact-website">Company website</label>
            <input type="text" id="contact-website" name="company_website" tabindex="-1" autocomplete="off">
          </div>
          <div class="form-grid form-grid--2">
            <div class="field">
              <label for="contact-name">Your name <span class="req">*</span></label>
              <input type="text" id="contact-name" name="name" autocomplete="name" required maxlength="80">
            </div>
            <div class="field">
              <label for="contact-phone">Phone <span class="req">*</span></label>
              <input type="tel" id="contact-phone" name="phone" autocomplete="tel" required maxlength="30">
            </div>
            <div class="field">
              <label for="contact-email">Email</label>
              <input type="email" id="contact-email" name="email" autocomplete="email" maxlength="120">
            </div>
            <div class="field">
              <label for="contact-suburb">Suburb</label>
              <input type="text" id="contact-suburb" name="suburb" autocomplete="address-level2" maxlength="60">
            </div>
            <div class="field field--full">
              <label for="contact-message">Message <span class="req">*</span></label>
              <textarea id="contact-message" name="message" required maxlength="2000" placeholder="How can we help?"></textarea>
            </div>
            <div class="field field--full">
              <label class="form-consent">
                <input type="checkbox" name="consent" value="yes" required>
                <span>I agree to be contacted about this enquiry and have read the <a href="/privacy-policy/">Privacy Policy</a>. <span class="req">*</span></span>
              </label>
            </div>
          </div>
          <div class="btn-group" style="margin-top:18px">
            <button class="btn btn-primary btn-lg" type="submit">Send message</button>
            <a class="btn btn-outline btn-lg" href="${tel}">${icons.phone(17)} Call now</a>
          </div>
          <div class="form-status" id="quote-status" role="status" aria-live="polite"></div>
          <p class="calc-note" style="margin-top:14px">We use your details only to respond to this enquiry and do not share them with other contractors.</p>
        </form>
      </div>
    </div>
  </div>
</section>

${mapSection({
  title: "Brisbane service area",
  eyebrow: "Where we work",
  intro: "We are a mobile service covering Greater Brisbane. Use the map to confirm the general area, then call us with your suburb and postcode.",
  query: "Brisbane QLD, Australia",
  note: "Map location is indicative of the service area. Our office address is listed once on the About page.",
})}

${faqSection(contactFaqs, {
  title: "Contact questions",
  eyebrow: "Getting in touch",
  intro: "Response times, opening hours, service area and how to reach the right person.",
})}

${ctaBand({
  title: "Need to talk it through?",
  text: `Call ${site.phoneDisplay} seven days a week, 7am to 10pm. We will give you a straight answer and, if it is a fit, arrange an on-site measure.`,
})}
`;

  return {
    path: "/contact/",
    title: "Contact Ace Bathrooms Brisbane | Call (07) 8590 6941",
    description:
      "Contact Ace Bathroom Renovations Brisbane. Call (07) 8590 6941, email us or send a message. Open 7am–10pm, seven days. Mobile service across Greater Brisbane.",
    image: images.apartment,
    body,
    crumbs: [{ name: "Contact", url: "/contact/" }],
    schema: [
      faqSchema(contactFaqs),
      {
        "@type": "ContactPage",
        "@id": `${site.domain}/contact/#contactpage`,
        name: "Contact Ace Bathroom Renovations Brisbane",
        url: `${site.domain}/contact/`,
        about: { "@id": `${site.domain}/#organization` },
      },
    ],
  };
}
