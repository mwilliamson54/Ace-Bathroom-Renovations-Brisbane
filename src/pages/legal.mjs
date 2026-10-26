import { site, images } from "../config.mjs";
import { services } from "../data/services.mjs";
import { locations } from "../data/locations.mjs";
import { icons, tel, mail } from "../lib/layout.mjs";

/* ------------------------------------------------------------------ *
 * Privacy policy
 * ------------------------------------------------------------------ */
const privacyBody = `
<section class="page-hero page-hero--simple">
  <div class="container container-narrow">
    <p class="eyebrow">Legal</p>
    <h1>Privacy Policy</h1>
    <p class="lead">How Ace Bathroom Renovations Brisbane collects, uses, stores and protects personal information.</p>
    <p class="page-hero__meta">Last updated: 26 October 2026</p>
  </div>
</section>

<section class="section">
  <div class="container container-narrow prose">
    <p>This policy explains how we handle personal information when you visit this website, call us, email us or ask us to quote for a renovation. We keep the policy plain because privacy should not require a law degree to understand.</p>

    <h2>Who we are</h2>
    <p>Ace Bathroom Renovations Brisbane is a QBCC licensed bathroom and kitchen renovation builder servicing Greater Brisbane. You can contact us about privacy by phone on <a href="${tel}">${site.phoneDisplay}</a> or by email at <a href="${mail}">${site.email}</a>.</p>

    <h2>What we collect</h2>
    <p>We only collect information we need to respond to your enquiry and deliver a renovation. That may include:</p>
    <ul>
      <li>your name, phone number, email address and suburb;</li>
      <li>details about your property, bathroom, budget, timing and project scope;</li>
      <li>information you choose to send us, including photographs, plans, product links and body corporate requirements;</li>
      <li>records of our conversations, quotes, contracts, variations, payments and project correspondence;</li>
      <li>basic technical information such as your browser type, device type and the pages you visit, if analytics are enabled.</li>
    </ul>
    <p>We do not ask for sensitive information such as health records, financial account details or government identifiers through this website. Please do not send that information in a quote form. If we need it later for a legitimate purpose, we will explain why and how it will be handled.</p>

    <h2>How we collect it</h2>
    <p>We collect information when you:</p>
    <ul>
      <li>call or text us;</li>
      <li>send an enquiry through the quote or contact form;</li>
      <li>email us or reply to our messages;</li>
      <li>meet us on site or communicate during a project;</li>
      <li>interact with our website, including through cookies or analytics where enabled.</li>
    </ul>
    <p>Our quote form includes a hidden anti-spam field. If that field is completed, the submission may be discarded without a response. We also use basic validation to ensure the information is usable.</p>

    <h2>Why we use it</h2>
    <p>We use personal information to:</p>
    <ul>
      <li>respond to your enquiry and arrange a site measure;</li>
      <li>prepare a quote, contract, scope of work and programme;</li>
      <li>coordinate trades, suppliers, approvals and certifications;</li>
      <li>manage payments, warranties and after-handover support;</li>
      <li>keep business records required by law;</li>
      <li>improve our website, services and customer communication;</li>
      <li>send service-related updates where you have asked for them.</li>
    </ul>
    <p>Your contact details are used to respond to your enquiry and manage your project. We do not rent contact lists or share your project details with other renovation contractors for their own marketing. If we need to involve a supplier or trade to deliver your project, we share only the information necessary for that purpose.</p>

    <h2>Disclosure to others</h2>
    <p>We may disclose information to:</p>
    <ul>
      <li>licensed trades, suppliers and consultants working on your project;</li>
      <li>our email, hosting and customer-management service providers;</li>
      <li>insurers, certifiers and regulators where required for the project;</li>
      <li>professional advisers, auditors or lawyers if necessary;</li>
      <li>government agencies or courts where required by law.</li>
    </ul>
    <p>Our website is hosted on Cloudflare Pages. Quote and contact submissions may be processed by Cloudflare and delivered to us by email or a webhook provider. Those providers handle data under their own terms and privacy policies. We choose providers that are appropriate for a small Australian building business, but we cannot control every aspect of their global infrastructure.</p>

    <h2>Overseas storage</h2>
    <p>Some service providers may store or process data outside Australia. Where that occurs, we take reasonable steps to ensure the information is handled consistently with Australian privacy expectations. By using this website or sending an enquiry, you understand that your information may be processed by providers located overseas.</p>

    <h2>How long we keep it</h2>
    <p>We keep enquiry records for as long as needed to respond and maintain a useful sales history. If you become a client, we keep contract, payment, warranty and project records for the periods required by law and for as long as needed to support warranty and insurance obligations. If you ask us to delete information and we are not legally required to keep it, we will do so within a reasonable period.</p>

    <h2>Security</h2>
    <p>We use reasonable technical and organisational measures to protect personal information, including access controls, reputable service providers and limiting access to people who need it for their work. No method of transmission or storage is completely secure. If you are concerned about sending sensitive information through the website, call us instead.</p>

    <h2>Cookies and analytics</h2>
    <p>This website may use essential cookies and, where enabled, privacy-respecting analytics to understand which pages are useful. We do not use the website to build advertising profiles of individual visitors. You can block or delete cookies in your browser settings. Blocking essential cookies may affect some site features.</p>

    <h2>Your choices and rights</h2>
    <p>You may ask us to:</p>
    <ul>
      <li>tell you what personal information we hold about you;</li>
      <li>correct information that is inaccurate or out of date;</li>
      <li>delete information we are not required to keep;</li>
      <li>stop sending you non-essential communications.</li>
    </ul>
    <p>Contact us using the details above. We may need to verify your identity before acting on a request. We will respond within a reasonable period and explain if we cannot comply with a request and why.</p>

    <h2>Complaints</h2>
    <p>If you believe we have mishandled your personal information, please contact us first so we can investigate. If you are not satisfied with our response, you may contact the Office of the Australian Information Commissioner. We will cooperate with any lawful investigation.</p>

    <h2>Changes to this policy</h2>
    <p>We may update this policy as our business, website or legal obligations change. The current version will always be published on this page with the date it was last updated. If a change materially affects how we use existing information, we will take reasonable steps to let affected people know.</p>

    <div class="callout">
      <p><strong>Questions about privacy?</strong> Call <a href="${tel}">${site.phoneDisplay}</a> or email <a href="${mail}">${site.email}</a>. We are available ${site.hoursLong.toLowerCase()}.</p>
    </div>
  </div>
</section>
`;

/* ------------------------------------------------------------------ *
 * Terms of service
 * ------------------------------------------------------------------ */
const termsBody = `
<section class="page-hero page-hero--simple">
  <div class="container container-narrow">
    <p class="eyebrow">Legal</p>
    <h1>Terms of Service</h1>
    <p class="lead">The terms that apply when you use this website and when you engage us for a renovation.</p>
    <p class="page-hero__meta">Last updated: 26 October 2026</p>
  </div>
</section>

<section class="section">
  <div class="container container-narrow prose">
    <p>These terms are general website and engagement terms. They do not replace the written contract for a renovation. If you engage us for building work, the signed contract and its attachments govern the project, including scope, price, programme, variations and dispute resolution.</p>

    <h2>About this website</h2>
    <p>This website is operated by Ace Bathroom Renovations Brisbane. It provides general information about our services, service areas, indicative costs, renovation processes and related topics. By using the site, you agree to these terms and our <a href="/privacy-policy/">Privacy Policy</a>.</p>

    <h2>Information is general only</h2>
    <p>Content on this website is general information for Queensland homeowners. It is not legal, financial, engineering, architectural or regulatory advice for your specific property. Building requirements, standards and costs change, and local conditions vary. You should obtain current advice from the relevant qualified professional and verify licensing, insurance and regulatory requirements directly with the Queensland Building and Construction Commission or another appropriate authority.</p>
    <p>Cost guides, calculator results and blog articles are planning tools, not quotes. They do not create a contract, a fixed price or an obligation on either party. A binding price only arises in a written quote and signed contract after an on-site inspection and agreed scope.</p>

    <h2>Enquiries and quotes</h2>
    <p>When you submit an enquiry, you confirm that the information you provide is accurate to the best of your knowledge and that you are authorised to enquire about the property. We may decline an enquiry, request more information or recommend another provider if the project is outside our service area or expertise.</p>
    <p>An on-site measure and written quote are provided at our discretion. We aim to provide them free within our standard Greater Brisbane service area, but we may charge for travel or unusual preparation outside that area. We will tell you before incurring any charge.</p>

    <h2>Renovation contracts</h2>
    <p>If you engage us, the project is governed by a separate written contract. That contract sets out the scope, contract price, allowances, exclusions, payment stages, programme, variation process, insurance, completion and dispute resolution. Where these website terms conflict with the signed contract, the signed contract prevails.</p>
    <p>You are responsible for providing accurate information about the property, disclosing known defects or hazards, obtaining approvals that are your responsibility, and ensuring safe access to the work area. We are responsible for the work we contract to perform and for coordinating the trades and certifications within our scope.</p>

    <h2>Variations</h2>
    <p>Changes to the scope, selections, programme or site conditions may require a written variation. We will explain the proposed change, the price difference and the time impact before the work proceeds. Verbal discussions are not a variation unless confirmed in writing under the contract.</p>

    <h2>Payments</h2>
    <p>Payment terms are set out in the contract. We do not ask for payments outside the agreed schedule. Invoices should be paid by the method stated on the invoice. If you believe an invoice is incorrect, contact us promptly so we can resolve it before the due date.</p>

    <h2>Intellectual property</h2>
    <p>The text, layout, design, graphics, code and original images on this website are owned by or licensed to Ace Bathroom Renovations Brisbane. You may view and print pages for personal, non-commercial use. You may not copy, republish, scrape, modify or use the content for commercial purposes without written permission. Short quotations with a clear link to the source may be acceptable if they are fair and accurate.</p>
    <p>Product names, trade marks and brand names mentioned on the site belong to their respective owners. References to products or suppliers do not imply endorsement beyond our own project experience.</p>

    <h2>Images and project examples</h2>
    <p>Some images on this website are representative illustrations rather than photographs of specific completed client projects. They are labelled accordingly in the gallery and relevant pages. We do not publish fabricated client testimonials, invented project addresses or fake review ratings. Where client project photography is used, it is published with permission.</p>

    <h2>Third-party links</h2>
    <p>The site may link to third-party websites, including the QBCC, suppliers, map providers and industry resources. We do not control those sites and are not responsible for their content, accuracy or availability. A link is not an endorsement of every statement on the linked site.</p>

    <h2>Website availability and accuracy</h2>
    <p>We aim to keep the website accurate and available, but we do not warrant that it will be uninterrupted, error-free or complete. Information may become outdated. We may change, suspend or remove content at any time without notice. If you rely on website information for a decision, verify it with us or the relevant authority first.</p>

    <h2>Limitation of liability</h2>
    <p>To the extent permitted by law, we are not liable for indirect or consequential loss arising from use of this website or reliance on its general information. Nothing in these terms excludes rights you have under the Australian Consumer Law or any other law that cannot be excluded. Liability for building work is governed by the signed contract and applicable law.</p>

    <h2>Privacy</h2>
    <p>Our handling of personal information is described in our <a href="/privacy-policy/">Privacy Policy</a>. By using the site, you acknowledge that policy.</p>

    <h2>Governing law</h2>
    <p>These terms are governed by the laws of Queensland, Australia. The courts of Queensland have non-exclusive jurisdiction over disputes relating to the website. Before commencing proceedings, we encourage you to contact us so we can try to resolve the matter directly.</p>

    <h2>Contact</h2>
    <p>If you have a question about these terms, call <a href="${tel}">${site.phoneDisplay}</a> or email <a href="${mail}">${site.email}</a>. We are available ${site.hoursLong.toLowerCase()}.</p>
  </div>
</section>
`;

/* ------------------------------------------------------------------ *
 * 404
 * ------------------------------------------------------------------ */
const notFoundBody = `
<section class="page-hero page-hero--simple">
  <div class="container container-narrow" style="text-align:center">
    <p class="eyebrow" style="justify-content:center">Page not found</p>
    <h1>That page has been renovated away</h1>
    <p class="lead">The page you were looking for is not here. It may have moved, or the link may be out of date. These pages will get you back on track.</p>
    <div class="btn-group" style="justify-content:center;margin-top:22px">
      <a class="btn btn-primary btn-lg" href="${tel}">${icons.phone(18)} Call ${site.phoneDisplay}</a>
      <a class="btn btn-outline btn-lg" href="/">Back to home</a>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="grid-3">
      <a class="card" href="/services/"><div class="card__icon">${icons.bath(24)}</div><h3>Bathroom services</h3><p>Full renovations, ensuites, laundries, waterproofing, tiling, accessible modifications and more.</p><span class="text-link">View services ${icons.arrow(15)}</span></a>
      <a class="card" href="/locations/"><div class="card__icon">${icons.pin(24)}</div><h3>Service areas</h3><p>Find local information for your suburb across Brisbane's northside, southside, eastside, westside and inner city.</p><span class="text-link">View locations ${icons.arrow(15)}</span></a>
      <a class="card" href="/cost-guide/"><div class="card__icon">${icons.document(24)}</div><h3>Cost guide</h3><p>Understand realistic bathroom renovation budgets, inclusions and the variables that change the price.</p><span class="text-link">Read the cost guide ${icons.arrow(15)}</span></a>
      <a class="card" href="/get-a-quote/"><div class="card__icon">${icons.quote(24)}</div><h3>Get a quote</h3><p>Send your details for an on-site measure and a written scope with clear inclusions and exclusions.</p><span class="text-link">Request a quote ${icons.arrow(15)}</span></a>
      <a class="card" href="/gallery/"><div class="card__icon">${icons.sparkle(24)}</div><h3>Gallery</h3><p>Representative bathroom, ensuite, laundry and kitchen layouts to help you plan your own renovation.</p><span class="text-link">View gallery ${icons.arrow(15)}</span></a>
      <a class="card" href="/contact/"><div class="card__icon">${icons.mail(24)}</div><h3>Contact us</h3><p>Call, email or send a message. Open seven days a week, 7am to 10pm.</p><span class="text-link">Contact us ${icons.arrow(15)}</span></a>
    </div>
    <div class="area-list" style="margin-top:32px">
      ${services.map((s) => `<a href="/services/${s.slug}/">${s.name}</a>`).join("")}
      ${locations.map((l) => `<a href="/${l.slug}/">${l.suburb}</a>`).join("")}
    </div>
  </div>
</section>

<section class="section section--pale">
  <div class="container container-narrow" style="text-align:center">
    <h2>Still can't find it?</h2>
    <p class="lead">Call <a href="${tel}">${site.phoneDisplay}</a> and we will point you to the right information or answer your question directly.</p>
    <p style="margin-bottom:0">Email <a href="${mail}">${site.email}</a> · ${site.hoursLong}</p>
  </div>
</section>
`;

/* ------------------------------------------------------------------ *
 * Page objects
 * ------------------------------------------------------------------ */
export function renderPrivacy() {
  return {
    path: "/privacy-policy/",
    title: "Privacy Policy | Ace Bathroom Renovations Brisbane",
    description:
      "How Ace Bathroom Renovations Brisbane collects, uses and protects personal information. Contact us on (07) 8590 6941 with any privacy questions.",
    image: images.about,
    body: privacyBody,
    crumbs: [{ name: "Privacy Policy", url: "/privacy-policy/" }],
    schema: [
      {
        "@type": "WebPage",
        "@id": `${site.domain}/privacy-policy/#privacy`,
        name: "Privacy Policy",
        url: `${site.domain}/privacy-policy/`,
        about: { "@id": `${site.domain}/#organization` },
        dateModified: "2026-10-26",
      },
    ],
  };
}

export function renderTerms() {
  return {
    path: "/terms-of-service/",
    title: "Terms of Service | Ace Bathroom Renovations Brisbane",
    description:
      "Terms of service for the Ace Bathroom Renovations Brisbane website, quotes and renovation engagements. Call (07) 8590 6941 with any questions.",
    image: images.process,
    body: termsBody,
    crumbs: [{ name: "Terms of Service", url: "/terms-of-service/" }],
    schema: [
      {
        "@type": "WebPage",
        "@id": `${site.domain}/terms-of-service/#terms`,
        name: "Terms of Service",
        url: `${site.domain}/terms-of-service/`,
        about: { "@id": `${site.domain}/#organization` },
        dateModified: "2026-10-26",
      },
    ],
  };
}

export function renderNotFound() {
  return {
    path: "/404.html",
    title: "Page Not Found | Ace Bathroom Renovations Brisbane",
    description:
      "The page you were looking for could not be found. Browse bathroom renovation services, locations, cost guides or call (07) 8590 6941.",
    image: images.hero,
    body: notFoundBody,
    noBreadcrumbs: true,
    schema: [],
  };
}
