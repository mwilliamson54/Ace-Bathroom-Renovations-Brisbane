import { site, images } from "../config.mjs";
import { services } from "../data/services.mjs";
import { locations } from "../data/locations.mjs";
import {
  hero,
  ctaBand,
  faqSection,
  icons,
  tel,
  mail,
  faqSchema,
  sectionHead,
} from "../lib/layout.mjs";

/* ------------------------------------------------------------------ *
 * Shared helpers
 * ------------------------------------------------------------------ */
const CTA_EARLY = `<div class="callout callout--teal">
  <p><strong>Need a straight answer now?</strong> Call <a href="${tel}">${site.phoneDisplay}</a> seven days a week, 7am–10pm. We can talk through scope, timing and budget before you book a site measure.</p>
</div>`;

function articleMeta({ date, read, topic }) {
  return `<div class="article-meta">
    <span>${icons.calendar(14)} <strong>Published</strong> ${date}</span>
    <span>${icons.clock(14)} <strong>${read}</strong> read</span>
    <span>${icons.shield(14)} <strong>Topic</strong> ${topic}</span>
    <span>${icons.check(14)} <strong>Reviewed by</strong> our Brisbane team</span>
  </div>`;
}

function toc(items) {
  return `<nav class="toc" aria-label="On this page">
    <h2>On this page</h2>
    <ol>${items.map(([id, label]) => `<li><a href="#${id}">${label}</a></li>`).join("")}</ol>
  </nav>`;
}

function sidebar(related) {
  return `<aside class="sidebar">
    <div class="sidebar-card sidebar-card--teal">
      <h3>Talk to a Brisbane builder</h3>
      <p>Call for a straight answer on scope, budget and timing. We book on-site measures across Greater Brisbane.</p>
      <a class="btn btn-white" href="${tel}">${icons.phone(17)} ${site.phoneDisplay}</a>
      <a class="btn btn-outline-white" href="/get-a-quote/">Request a quote</a>
      <p style="font-size:.76rem;margin:10px 0 0">${site.hoursLong}</p>
    </div>
    <div class="sidebar-card">
      <h3>More guides</h3>
      <ul class="sidebar-list">
        ${related.map(([label, href]) => `<li><a href="${href}">${label} ${icons.chevron(14)}</a></li>`).join("")}
      </ul>
    </div>
    <div class="sidebar-card">
      <h3>Useful pages</h3>
      <ul class="sidebar-list">
        <li><a href="/cost-guide/">Bathroom renovation cost guide ${icons.chevron(14)}</a></li>
        <li><a href="/our-process/">Our renovation process ${icons.chevron(14)}</a></li>
        <li><a href="/choosing-a-contractor/">Choosing a contractor ${icons.chevron(14)}</a></li>
        <li><a href="/warranty-and-certificates/">Warranty and certificates ${icons.chevron(14)}</a></li>
        <li><a href="/get-a-quote/">Get a free quote ${icons.chevron(14)}</a></li>
      </ul>
    </div>
  </aside>`;
}

function relatedLinks(current) {
  const all = [
    ["Bathroom renovation contracts in Queensland", "/blog/bathroom-renovation-contracts-queensland/"],
    ["How to check a QBCC licence", "/blog/how-to-check-a-qbcc-licence/"],
    ["Waterproofing compliance certificates", "/blog/waterproofing-compliance-certificates-queensland/"],
    ["Bathroom renovation timeline in Brisbane", "/blog/bathroom-renovation-timeline-brisbane/"],
  ];
  return all.filter(([, href]) => href !== current);
}

/* ------------------------------------------------------------------ *
 * Post 1 — Contracts
 * ------------------------------------------------------------------ */
const contractFaqs = [
  {
    q: "Do I need a written contract for a bathroom renovation in Queensland?",
    a: "In Queensland, domestic building work valued at $3,300 or more (including GST) generally requires a written contract that meets the requirements of the Queensland Building and Construction Commission. Because thresholds and requirements can change, confirm the current rules with the QBCC before you sign. A written contract is essential regardless of value: it records the scope, price, inclusions, exclusions, payment stages and completion terms.",
  },
  {
    q: "What deposit can a bathroom renovator ask for?",
    a: "Queensland sets limits on deposits for domestic building contracts, and the limit depends on the contract price. The QBCC publishes the current rules. Do not pay a large cash deposit before you have a signed contract, a copy of the contractor's licence details and written confirmation of insurance where it applies. Our own payment schedule is tied to progress and set out in the contract.",
  },
  {
    q: "What is a provisional sum in a renovation quote?",
    a: "A provisional sum is an allowance for work that cannot be priced precisely until the existing structure is opened up, such as repairing water-damaged framing or replacing a rotten floor. It is not a licence to charge whatever the builder likes. The contract should explain how the allowance will be adjusted, how you will be notified and how the final amount will be documented.",
  },
  {
    q: "Can the price change after the contract is signed?",
    a: "Only through a documented variation or a contractual mechanism such as a provisional sum or prime cost item. Changes should be priced, put in writing and accepted before the work proceeds. If a builder asks for more money without a written variation, stop and ask for the basis of the claim in writing.",
  },
  {
    q: "What should I do if the work is defective?",
    a: "Notify the contractor in writing with photographs and a clear description. Ask for a written response and a proposed rectification date. If the matter cannot be resolved, the QBCC has a dispute resolution process for covered work, and your contract should set out the complaints process. Keep records of every conversation, payment and variation.",
  },
  {
    q: "Does the contract need to include a completion date?",
    a: "It should state when work will start and when it is expected to finish, or how those dates will be determined. A realistic contract recognises lead times, waterproofing cure periods and approval processes. A suspiciously short programme with no allowance for those steps is a warning sign, not a bargain.",
  },
];

const contractsBody = `
${hero({
  image: images.process,
  alt: "Bathroom renovation contract and project documents on a table",
  eyebrow: "Consumer guide for Queensland homeowners",
  h1: "Bathroom renovation contracts in Queensland: what to check before you sign",
  lead:
    "A bathroom contract is not paperwork that happens after the quote. It is the document that defines what is built, what it costs, when it finishes and what happens if something goes wrong. Here is what Brisbane homeowners should expect to see — and the clauses worth questioning.",
  primary: { href: "/get-a-quote/", label: "Get a written quote" },
  secondary: { href: tel, label: `Call ${site.phoneDisplay}` },
  trust: ["QBCC licensed builder", "Written fixed scope", "Documented variations", "Local Brisbane team"],
  page: true,
})}

<section class="section">
  <div class="container">
    <div class="detail-layout">
      <article class="article-body prose">
        ${articleMeta({ date: "12 October 2026", read: "9 minute", topic: "Contracts and consumer protection" })}
        ${toc([
          ["why", "Why the contract matters more than the quote"],
          ["required", "When Queensland requires a written contract"],
          ["clauses", "The clauses to read line by line"],
          ["payments", "Deposits and progress payments"],
          ["variations", "Variations, provisional sums and prime cost items"],
          ["insurance", "Insurance and certification"],
          ["signing", "A practical pre-signing checklist"],
          ["during", "Managing the contract during construction"],
          ["redflags", "Contract red flags"],
        ])}

        <p>A bathroom renovation is one of the more complex small building projects a homeowner will commission. It combines demolition, waterproofing, plumbing, electrical work, tiling, joinery, painting and sometimes structural repair in a wet, confined space. The contract has to describe all of that clearly enough that two different people could read it and reach the same understanding of what is included.</p>
        <p>Most disputes we hear about in Brisbane do not begin with a dishonest builder. They begin with a one-page quote, an optimistic verbal promise and a homeowner who assumed that “new bathroom” meant the same thing to everyone. A proper contract removes that ambiguity before the first tile is lifted.</p>

        <h2 id="why">Why the contract matters more than the quote</h2>
        <p>A quote tells you a number. A contract tells you what that number buys, what it does not buy, how the price can change, who is responsible for approvals and what remedy exists if the result is defective. The quote may be the document you compare between builders, but the contract is the document that governs the project.</p>
        <p>For a Brisbane renovation, the contract should also reflect local conditions. Older Queenslander homes may have timber floors that need levelling, original bathrooms with degraded sheeting, or plumbing that has been altered several times. Apartments bring body corporate approvals, lift bookings and working-hour restrictions. A contract that ignores those realities is not simpler; it simply moves the risk to a later conversation.</p>
        ${CTA_EARLY}

        <h2 id="required">When Queensland requires a written contract</h2>
        <p>Queensland has specific rules for domestic building contracts. As a general guide, domestic building work valued at $3,300 or more including GST requires a written contract that complies with the requirements administered by the Queensland Building and Construction Commission. Requirements can change, so check the QBCC's current guidance rather than relying on an old blog post — including this one.</p>
        <p>Even where a written contract is not legally mandatory, you should insist on one. The cost of preparing a clear contract is trivial compared with the cost of resolving a disagreement about whether waterproofing, screeding, tapware or rubbish removal was included.</p>
        <p>Ask for the contract before you pay a deposit, not after. Read it in full. If a builder pressures you to sign on the spot or suggests that the standard QBCC contract is unnecessary because “we have never had a problem”, treat that as a reason to slow down.</p>

        <h2 id="clauses">The clauses to read line by line</h2>
        <p>A compliant contract will usually include the following information. The exact format varies, but the substance should be there.</p>
        <h3>Parties and licence details</h3>
        <p>The legal name of the contracting business, its Australian Business Number, its QBCC licence number and the name of the licensed person responsible for the work. Check that the name on the contract matches the name on the quote, the bank account and the QBCC register. A trading name alone is not enough.</p>
        <h3>Scope, plans and specifications</h3>
        <p>The contract should attach or reference the drawings, selections and specification that define the work. “Supply and install bathroom” is not a scope. A usable scope identifies demolition, disposal, substrate preparation, waterproofing, screeding, tiling areas and tile sizes, plumbing rough-in, electrical items, joinery, fixtures, painting, make-good and cleaning. It also states what the owner is supplying, if anything.</p>
        <h3>Price and inclusions</h3>
        <p>Look for a fixed contract price and a clear list of inclusions and exclusions. Check whether the price includes GST, council fees, body corporate fees, asbestos testing, engineering, temporary toilet hire, scaffolding, skip bins and final clean. Those items are common sources of later friction.</p>
        <h3>Allowances</h3>
        <p>Tile, tapware and vanity allowances should be stated as dollar amounts, not vague descriptions. If the allowance is $2,500 for tiles, you need to know whether that covers tiles only or also adhesive, trims, delivery and wastage. Ask what happens if your chosen tile costs more than the allowance.</p>
        <h3>Timeframes</h3>
        <p>The contract should state the start date, the completion date or a mechanism for determining them, and the process for extensions. Rain, humidity, product delays, body corporate restrictions and latent conditions can all affect a bathroom programme. A contract that provides for reasonable extensions is normal; one that leaves completion entirely open-ended is not.</p>
        <h3>Variations</h3>
        <p>There should be a written variation process. It should say who can request a change, how it will be priced, how long the owner has to accept it and what happens to the programme. Verbal variations are the single most common cause of end-of-project disputes.</p>
        <h3>Defects, completion and handover</h3>
        <p>The contract should define practical completion, the defects liability period, how notice is given and what documents are handed over. For a bathroom, handover should include waterproofing certification, plumbing and electrical compliance documents, care instructions and any product warranties.</p>
        <h3>Dispute resolution</h3>
        <p>Look for a process that starts with written notice and a reasonable opportunity to rectify, then moves to the QBCC or another nominated dispute body. A contract that requires you to waive your rights or litigate immediately is a warning sign.</p>

        <h2 id="payments">Deposits and progress payments</h2>
        <p>Queensland limits deposits on domestic building contracts. The limit depends on the contract price, and the QBCC publishes the current rules. The practical principle is simple: do not pay a large amount before any work has been done, and do not pay for stages that have not been reached.</p>
        <p>A progress payment schedule should be tied to identifiable milestones. A typical bathroom schedule might include a deposit on signing, a payment after strip-out and rough-in, a payment after waterproofing and screeding, a payment after tiling, and the balance at practical completion. The exact stages should reflect the contract and the project.</p>
        <p>Pay by bank transfer to the account named on the contract and keep the receipt. Be cautious about requests to pay a different company, a private account or a “cash discount” arrangement that is not documented. Those requests make it harder to prove what you paid and to pursue a remedy later.</p>
        <p>Never pay the final balance before you have inspected the work, received the certification documents and confirmed that outstanding items are complete. A builder who demands final payment before handover is asking you to give up your strongest piece of leverage.</p>

        <h2 id="variations">Variations, provisional sums and prime cost items</h2>
        <p>Three mechanisms allow a contract price to change. They are legitimate when used properly and dangerous when they are vague.</p>
        <ul>
          <li><strong>Variation:</strong> a change requested by the owner or required by a latent condition. It should be described, priced and accepted in writing before work proceeds.</li>
          <li><strong>Provisional sum:</strong> an allowance for work that cannot be accurately priced until the structure is exposed, such as floor repair or framing replacement. The contract should explain how the allowance will be adjusted.</li>
          <li><strong>Prime cost item:</strong> an allowance for a product or material that has not yet been selected, such as tiles or tapware. The contract should state the allowance and how overages are handled.</li>
        </ul>
        <p>Ask for a sample variation document before the project starts. It should show the original scope, the proposed change, the price difference, the time impact and a signature line. If a builder cannot produce one, the variation process is probably verbal.</p>
        ${CTA_EARLY}

        <h2 id="insurance">Insurance and certification</h2>
        <p>Queensland residential building work may be covered by the QBCC Home Warranty Scheme, subject to eligibility and thresholds. The contractor is responsible for taking out the required insurance and providing evidence. Ask for the certificate before work starts, not after.</p>
        <p>Separately, the contractor should hold public liability insurance and, where required, workers' compensation coverage. A certificate of currency is not a substitute for checking that the policy is current and the coverage is adequate, but it is a basic document a professional business should be able to provide.</p>
        <p>At completion, the waterproofing certificate is the document most often overlooked. It should identify the wet area, the membrane system, the standard applied, the date of application and the licensed person responsible. Keep it with the contract, the plumbing certificate and the electrical certificate. Those documents matter at resale and if you ever need to make an insurance claim.</p>

        <h2 id="signing">A practical pre-signing checklist</h2>
        <ol>
          <li>Confirm the contracting entity and QBCC licence on the register.</li>
          <li>Read the scope and look for the words “supply and install” against every major item.</li>
          <li>Check the exclusions and allowances, especially tiles, tapware, asbestos, structural repair and access.</li>
          <li>Confirm the deposit and progress payment schedule against the QBCC rules.</li>
          <li>Check the start date, completion date and extension mechanism.</li>
          <li>Ask for the variation process and a sample variation.</li>
          <li>Confirm insurance, certification and handover documents.</li>
          <li>Ask who will be on site, who supervises and who is your point of contact.</li>
          <li>Check the defects liability period and dispute process.</li>
          <li>Get the contract and all attachments in writing before paying anything.</li>
        </ol>
        <div class="callout">
          <p><strong>Useful next step:</strong> read our <a href="/choosing-a-contractor/">guide to choosing a bathroom contractor</a>, then compare the contract against our <a href="/contractor-standards/">contractor standards</a>. If anything is unclear, ask the builder to explain it in writing before you sign.</p>
        </div>

        <h2 id="during">Managing the contract during construction</h2>
        <p>Once work starts, keep a simple project file. Save the contract, plans, selections, variation approvals, payment receipts, certificates and any photographs of the work in progress. If a conversation changes something, follow it up with an email that summarises what was agreed.</p>
        <p>Inspect the work at each stage rather than waiting for the end. Look at the strip-out, the waterproofing before tiling, the tile layout and the fit-off. Ask questions early. A good builder would rather answer a question at rough-in than discover a misunderstanding at handover.</p>
        <p>If something is wrong, raise it in writing promptly and keep the tone factual. Describe the issue, the location and the outcome you are seeking. Most defects can be resolved quickly when they are documented and discussed before the next trade covers the work.</p>

        <h2 id="redflags">Contract red flags</h2>
        <ul>
          <li>No written contract, or a contract that arrives only after a deposit is requested.</li>
          <li>A price with no scope, no allowances and no exclusions.</li>
          <li>A licence number that does not match the contracting entity.</li>
          <li>A large deposit or a request for cash outside the contract.</li>
          <li>Verbal variations and “we will sort it out at the end” assurances.</li>
          <li>No start date, no completion date and no extension process.</li>
          <li>No mention of waterproofing certification or handover documents.</li>
          <li>A contract that asks you to waive your right to complain to the QBCC.</li>
        </ul>
        <p>None of these issues automatically means a builder is dishonest. They do mean the project is being managed without the documentation that protects both sides. In a wet area, where defects can be expensive and hidden, that is not a risk worth taking.</p>
        <p>If you are comparing quotes and one is dramatically cheaper, compare the contracts side by side. The difference is usually in the scope, the allowances, the supervision, the certification or the insurance — not in the builder's generosity.</p>
        <p>For a Brisbane-specific conversation about your bathroom, call <a href="${tel}">${site.phoneDisplay}</a>. We will explain how our written scope and contract work before you commit to anything.</p>
      </article>
      ${sidebar(relatedLinks("/blog/bathroom-renovation-contracts-queensland/"))}
    </div>
  </div>
</section>

${faqSection(contractFaqs, {
  title: "Bathroom contract questions",
  eyebrow: "Queensland homeowners",
  intro: "The contract questions we are asked most often before a Brisbane bathroom renovation begins.",
})}

${ctaBand({
  title: "Want a contract you can actually understand?",
  text: `Call ${site.phoneDisplay} to discuss your bathroom, or request an on-site measure and a written scope with clear inclusions, allowances and payment stages.`,
})}
`;

/* ------------------------------------------------------------------ *
 * Post 2 — QBCC licence
 * ------------------------------------------------------------------ */
const licenceFaqs = [
  {
    q: "How do I check a builder's QBCC licence in Queensland?",
    a: "Use the free licence search on the QBCC website. Search by the licence number or the licensee's name, then confirm the licence status, the licence class, the scope of work and the expiry date. Check that the name and number match the entity on your contract and quote.",
  },
  {
    q: "What does 'Builder Restricted to Kitchen, Bathroom and Laundry' mean?",
    a: "It is a QBCC licence class that permits the holder to carry out building work within a defined scope, rather than the full range of residential building work. For a bathroom renovation, ask the builder to explain exactly what the licence covers and confirm that the work you need sits within it. The QBCC register is the authoritative source.",
  },
  {
    q: "Does a QBCC licence guarantee good workmanship?",
    a: "No. A licence confirms that the contractor has met the regulatory requirements for the licence class, not that every project will be defect-free. It should be combined with a written contract, insurance checks, references, a clear scope and a process for inspecting and certifying the work.",
  },
  {
    q: "Should I check the subcontractors too?",
    a: "Yes, where the work requires a licensed trade. Plumbing, electrical work and some waterproofing and tiling work have their own licensing requirements. Ask the principal contractor how they verify the licences of the trades they engage and who is responsible for certification.",
  },
  {
    q: "What if the licence number on the quote does not match the contract?",
    a: "Do not proceed until the discrepancy is explained in writing. The licence should belong to the contracting entity, not an unrelated third party. If the builder cannot explain the relationship clearly, seek independent advice before paying a deposit.",
  },
  {
    q: "Can I check a builder's insurance and disciplinary history?",
    a: "The QBCC provides information about licensing and certain regulatory actions. Insurance is usually evidenced by a certificate of currency or a home warranty certificate. Ask for the documents that apply to your project and keep copies with your contract.",
  },
];

const licenceBody = `
${hero({
  image: images.about,
  alt: "Builder reviewing licence and project documents",
  eyebrow: "Consumer protection guide",
  h1: "How to check a QBCC licence before you hire a bathroom renovator",
  lead:
    "A licence number on a quote is a starting point, not proof. In about ten minutes you can confirm whether the business is licensed, what work it is allowed to do and whether the details match the contract in front of you. Here is the process we recommend to every Brisbane homeowner.",
  primary: { href: "/get-a-quote/", label: "Request a written quote" },
  secondary: { href: tel, label: `Call ${site.phoneDisplay}` },
  trust: ["QBCC licensed builder", "Licence details on About", "Written scope", "Local team"],
  page: true,
})}

<section class="section">
  <div class="container">
    <div class="detail-layout">
      <article class="article-body prose">
        ${articleMeta({ date: "18 October 2026", read: "8 minute", topic: "Licensing and verification" })}
        ${toc([
          ["why", "Why checking matters"],
          ["search", "How to use the QBCC licence search"],
          ["read", "How to read the result"],
          ["scope", "Licence scope and the work you need"],
          ["trades", "Subcontractors and trade licences"],
          ["beyond", "What a licence does not tell you"],
          ["questions", "Questions to ask before hiring"],
          ["records", "What to keep on file"],
        ])}

        <p>Queensland's licensing system exists because building work is technical, regulated and often difficult for a homeowner to assess while it is happening. A bathroom renovation hides most of its critical work behind tiles: waterproofing, screeding, plumbing rough-in, framing repairs and electrical connections. By the time a defect is visible, the cost of fixing it can be many times the cost of the original work.</p>
        <p>Checking a licence will not tell you whether a builder is good. It will tell you whether they are allowed to contract for the work at all, and whether the person asking for your deposit is the person the regulator has authorised.</p>

        <h2 id="why">Why checking matters</h2>
        <p>Unlicensed contracting creates practical problems that go beyond the risk of poor work. It can affect insurance, home warranty eligibility, finance and resale. If a dispute arises, the remedies available to you may be narrower. A licensed contractor also has obligations that an unlicensed operator does not, including contract requirements and regulatory accountability.</p>
        <p>Most homeowners check the licence number on the quote. Fewer check the name of the contracting entity, the scope of the licence or whether the licence is current on the day they sign. Those details are where problems often appear.</p>
        ${CTA_EARLY}

        <h2 id="search">How to use the QBCC licence search</h2>
        <p>The QBCC provides a free online licence search. You can search by licence number, business name or individual name. The exact fields and result layout can change, but the steps are consistent.</p>
        <ol>
          <li>Ask the builder for their QBCC licence number and the legal name of the contracting business.</li>
          <li>Open the QBCC licence search and enter the number. Then repeat the search using the business name.</li>
          <li>Confirm that the result matches the name on the quote, the contract and the bank account details.</li>
          <li>Check the licence status, class, scope and expiry date.</li>
          <li>Look for any conditions or restrictions attached to the licence.</li>
          <li>Save a screenshot or PDF of the result with the date you checked it.</li>
        </ol>
        <p>If the search returns a different entity, ask why. A common legitimate explanation is that the licensed builder contracts through a company or trust. The relationship should still be clear, documented and consistent across the contract and insurance documents. If it is not, do not pay a deposit until it is.</p>

        <h2 id="read">How to read the result</h2>
        <p>The licence record typically shows the licensee's name, the licence number, the licence class, the status and the expiry date. It may also show the scope of work, conditions and the nominated supervisor or licensee for the business.</p>
        <p>Check four things carefully:</p>
        <ul>
          <li><strong>Identity:</strong> does the name match the entity you are contracting with?</li>
          <li><strong>Status:</strong> is the licence current, suspended or expired?</li>
          <li><strong>Class and scope:</strong> does it cover the work you are commissioning?</li>
          <li><strong>Conditions:</strong> is there any restriction that affects your project?</li>
        </ul>
        <p>A licence that is current but does not cover the work is no better than no licence for your purposes. A licence that belongs to a different entity is a serious warning sign. A licence with conditions may still be appropriate, but you should understand what those conditions mean before signing.</p>

        <h2 id="scope">Licence scope and the work you need</h2>
        <p>Queensland uses different licence classes for different types of work. A builder licence may be unrestricted or restricted to particular categories, such as kitchen, bathroom and laundry work. Trade contractor licences cover specific trades such as plumbing, electrical work, tiling and waterproofing.</p>
        <p>For a bathroom renovation, the principal contractor should be able to explain:</p>
        <ul>
          <li>which licence they hold and what it authorises;</li>
          <li>who will supervise the work;</li>
          <li>which trades will be engaged and how their licences are verified;</li>
          <li>who will issue the waterproofing, plumbing and electrical certificates;</li>
          <li>what insurance applies to the project.</li>
        </ul>
        <p>If the answer to any of those questions is vague, ask for it in writing. A professional builder should be able to answer without hesitation. Our own licence details, including the number and scope, are published on our <a href="/about/">About page</a> so you can verify them directly on the QBCC register.</p>

        <h2 id="trades">Subcontractors and trade licences</h2>
        <p>Many bathroom renovations involve a principal contractor and several specialist trades. The principal contractor is responsible for coordinating the work and for the overall outcome, but the individual trades still need the licences that apply to their scope.</p>
        <p>Plumbing and drainage work, electrical work, and certain waterproofing and tiling work are regulated. Ask how the builder verifies each trade's licence and insurance. Ask who signs the certificate at completion. If a trade is unlicensed, the certificate may not be issued, and the problem may not surface until you sell the property or make an insurance claim.</p>
        <p>It is reasonable to ask for the names of the trades who will work on your bathroom and to check their licences yourself. A builder who resists that request is telling you something important.</p>
        ${CTA_EARLY}

        <h2 id="beyond">What a licence does not tell you</h2>
        <p>A licence is a minimum regulatory threshold. It does not measure design judgement, communication, cleanliness, programme management or attention to detail. It does not guarantee that the builder will use the best membrane system, allow proper curing time or protect your floors while the work is underway.</p>
        <p>That is why a licence check should sit alongside other checks: references from comparable projects, a written scope, a contract that complies with Queensland requirements, insurance documents, a clear variation process and a realistic programme. Read our <a href="/choosing-a-contractor/">choosing a contractor guide</a> for the full comparison process.</p>
        <p>Be equally wary of a builder who boasts about a licence but cannot explain the scope, and of one who dismisses licensing as bureaucracy. Both are signals that the commercial relationship may not be well managed.</p>

        <h2 id="questions">Questions to ask before hiring</h2>
        <ol>
          <li>What is your QBCC licence number and the legal name of your business?</li>
          <li>Does your licence cover the full scope of my bathroom renovation?</li>
          <li>Who will supervise the work, and will they be on site?</li>
          <li>Which trades will you engage, and how do you verify their licences?</li>
          <li>What insurance applies to my project, and can I see the certificate?</li>
          <li>Who issues the waterproofing certificate, and when?</li>
          <li>What is your process for variations and defects?</li>
          <li>Can I speak to a recent client with a similar bathroom?</li>
        </ol>
        <p>Ask the same questions of every builder you shortlist. The quality of the answers, and the willingness to put them in writing, is often more revealing than the price.</p>

        <h2 id="records">What to keep on file</h2>
        <p>Create a project folder, digital or physical, and keep the following together:</p>
        <ul>
          <li>the QBCC licence search result, dated;</li>
          <li>the written quote and contract, including all attachments;</li>
          <li>plans, selections and specifications;</li>
          <li>insurance certificates and home warranty documents;</li>
          <li>variation approvals and payment receipts;</li>
          <li>waterproofing, plumbing and electrical certificates;</li>
          <li>product warranties and care instructions;</li>
          <li>photographs of the work at each stage.</li>
        </ul>
        <p>If you sell the property, these documents answer questions before they are asked. If you make a claim, they establish the scope and the standard you were promised. If a dispute arises, they are the record of what was agreed.</p>
        <p>Checking a licence takes minutes. Recovering from an unlicensed or mismatched contractor can take years. For a Brisbane bathroom renovation, start with the register, then verify the contract, insurance and certification. If you would like to discuss a project, call <a href="${tel}">${site.phoneDisplay}</a>.</p>
      </article>
      ${sidebar(relatedLinks("/blog/how-to-check-a-qbcc-licence/"))}
    </div>
  </div>
</section>

${faqSection(licenceFaqs, {
  title: "QBCC licence questions",
  eyebrow: "Before you hire",
  intro: "What the register shows, what it does not, and how to verify the business you are actually hiring.",
})}

${ctaBand({
  title: "Verify first, then plan the renovation",
  text: `Call ${site.phoneDisplay} with your suburb and project type. We will explain our licensing, scope and process before you book an on-site measure.`,
})}
`;

/* ------------------------------------------------------------------ *
 * Post 3 — Waterproofing certificates
 * ------------------------------------------------------------------ */
const waterproofFaqs = [
  {
    q: "What is a waterproofing certificate for a bathroom?",
    a: "It is a document that records the waterproofing work carried out in a wet area, the membrane system used, the standard applied and the person responsible. It is evidence that the work was done and can be produced at handover, at resale or in an insurance claim. The exact form and issuer depend on the project and the regulatory requirements.",
  },
  {
    q: "Why is AS 3740 important?",
    a: "AS 3740 is the Australian standard for waterproofing of domestic wet areas. It sets out where waterproofing is required, how the substrate should be prepared, how junctions and penetrations should be treated and how the membrane should be applied and tested. A bathroom that does not follow it is more likely to leak or fail early.",
  },
  {
    q: "Should waterproofing be flood tested before tiling?",
    a: "Flood testing is a standard quality check for a prepared wet area. It involves containing water in the shower or bathroom floor for a period and checking for leaks below or around the area. It should be done before tiling and documented. The exact duration and method should follow the membrane manufacturer's instructions and the applicable standard.",
  },
  {
    q: "Who can issue a waterproofing certificate in Queensland?",
    a: "Waterproofing in Queensland may be regulated work, and the certificate should be issued by a suitably licensed person. Ask the principal contractor who will issue the certificate, what their licence is and when you will receive it. Do not accept a verbal assurance that the waterproofing is 'certified'.",
  },
  {
    q: "How long should bathroom waterproofing last?",
    a: "A correctly installed membrane system should last many years, but its life depends on substrate movement, product selection, application quality, curing, tiling, maintenance and what happens after handover. No responsible contractor should promise an indefinite life. Ask for the manufacturer's warranty terms as well as the installer's workmanship warranty.",
  },
  {
    q: "What maintenance does a waterproofed bathroom need?",
    a: "Keep the area ventilated, clean with products that suit the membrane and tiles, avoid abrasive cleaners on seals, check silicone joints periodically and repair any movement cracks or failed seals promptly. Do not drill or screw into a waterproofed floor or wall without understanding what is behind it.",
  },
];

const waterproofBody = `
${hero({
  image: images.waterproofing,
  alt: "Waterproofing membrane being applied in a Brisbane bathroom",
  eyebrow: "Wet area compliance",
  h1: "Waterproofing compliance certificates in Queensland: what they prove",
  lead:
    "Waterproofing is the part of a bathroom renovation you cannot see once the tiles go down. A certificate is not a decorative extra at handover; it is the record of who did the work, what system was used and how it was tested. Here is what Brisbane homeowners should ask for.",
  primary: { href: "/get-a-quote/", label: "Get a written quote" },
  secondary: { href: tel, label: `Call ${site.phoneDisplay}` },
  trust: ["AS 3740 waterproofing", "Flood tested", "Certificate at handover", "QBCC licensed builder"],
  page: true,
})}

<section class="section">
  <div class="container">
    <div class="detail-layout">
      <article class="article-body prose">
        ${articleMeta({ date: "22 October 2026", read: "9 minute", topic: "Waterproofing and compliance" })}
        ${toc([
          ["why", "Why waterproofing fails"],
          ["standard", "What AS 3740 requires"],
          ["process", "The waterproofing process"],
          ["test", "Flood testing before tiling"],
          ["certificate", "What a certificate should record"],
          ["redflags", "Warning signs during the build"],
          ["after", "After handover: maintenance and warranties"],
          ["apartments", "Apartments and body corporate"],
        ])}

        <p>Brisbane's climate is hard on wet areas. High humidity, intense summer rain and warm temperatures create conditions where moisture can persist behind tiles and under floors. Add a timber-framed Queenslander, decades of minor renovations and a shower that was originally installed to a much older standard, and the risk of hidden water damage rises quickly.</p>
        <p>Waterproofing is the system that keeps water where it belongs. When it is done properly, it is invisible and unremarkable. When it is done poorly, the consequences appear months or years later: bubbling paint, loose tiles, musty smells, swollen skirting, damaged framing and, in the worst cases, water entering the structure below.</p>

        <h2 id="why">Why waterproofing fails</h2>
        <p>Failures usually come from a small number of avoidable causes:</p>
        <ul>
          <li><strong>Inadequate surface preparation.</strong> Dust, loose screed, oil, silicone residue or moisture on the substrate can prevent the membrane from bonding.</li>
          <li><strong>Missed details.</strong> Corners, junctions between floor and wall, pipe penetrations, shower hob junctions and door thresholds are where leaks start. They need reinforcing and correct detailing.</li>
          <li><strong>Wrong product or application.</strong> Using an interior membrane outdoors, applying too thin, or failing to allow the required cure time between coats.</li>
          <li><strong>Tiling too soon.</strong> Trades under programme pressure can cover a membrane before it has cured, trapping solvent or damaging the film.</li>
          <li><strong>No protection after application.</strong> Subsequent trades walking on the membrane, dropping tools or dragging materials can puncture it.</li>
          <li><strong>Poor falls and drainage.</strong> Water that ponds at a shower outlet or behind a hob will eventually find a way into the structure.</li>
        </ul>
        <p>Most of these failures are process failures, not product failures. That is why the certificate and the inspection process matter: they create a record that the right steps were followed before the work was covered up.</p>
        ${CTA_EARLY}

        <h2 id="standard">What AS 3740 requires</h2>
        <p>AS 3740 is the Australian standard for waterproofing of domestic wet areas. It addresses the areas that must be waterproofed, the preparation of substrates, the treatment of joints and penetrations, the application of the membrane and the testing of the completed work.</p>
        <p>The standard does not prescribe a single product or a single brand. It sets performance and application requirements that the selected system must meet. That is why a certificate should identify the membrane system used and confirm that it was installed in accordance with the manufacturer's instructions and the standard.</p>
        <p>For a bathroom, the critical areas typically include the shower floor and walls, the floor area around the shower, the junction between the floor and walls, the wall area behind the vanity and around the bath, and any area subject to splashing or condensation. The exact extent depends on the room layout and the standard's requirements.</p>
        <p>Waterproofing is not a substitute for correct drainage, ventilation or structural repair. If the floor falls the wrong way or the substrate is moving, a membrane will eventually fail no matter how carefully it is applied. A proper scope addresses those issues before the membrane goes on.</p>

        <h2 id="process">The waterproofing process</h2>
        <p>A typical wet-area waterproofing sequence looks like this:</p>
        <ol>
          <li><strong>Strip-out and inspection.</strong> Remove the old lining, tiles and screed, then inspect the substrate and framing for water damage, rot or movement.</li>
          <li><strong>Structural and substrate repairs.</strong> Replace damaged sheeting or framing, fix loose boards and prepare a sound, clean surface.</li>
          <li><strong>Screeding and falls.</strong> Form the correct fall to the waste so water drains rather than ponds.</li>
          <li><strong>Surface preparation.</strong> Clean, prime and detail the substrate according to the membrane manufacturer's instructions.</li>
          <li><strong>Reinforcement and detailing.</strong> Treat corners, junctions, penetrations and thresholds with the specified bond breaker and reinforcement.</li>
          <li><strong>Membrane application.</strong> Apply the required number of coats at the specified thickness, allowing the correct cure time between coats.</li>
          <li><strong>Flood test.</strong> Contain water in the wet area and check for leaks before tiling.</li>
          <li><strong>Protection.</strong> Protect the membrane from damage by subsequent trades and document the completed work.</li>
        </ol>
        <p>The most common shortcut is skipping the inspection and preparation steps. A membrane applied over a damp, dusty or damaged substrate is a latent defect. It may pass a visual check and fail within a year.</p>

        <h2 id="test">Flood testing before tiling</h2>
        <p>Flood testing is a straightforward quality check: the completed waterproofed area is filled with water to a controlled depth, left for the period recommended by the manufacturer or standard, and inspected for leakage. In an upstairs bathroom, the ceiling below is also checked.</p>
        <p>The test should be documented. Ask for photographs and a record of the date, duration and result. If the test fails, the membrane must be repaired and retested before tiling. A builder who resists a flood test, or who tiles immediately after applying the membrane, is creating risk that will be expensive to unwind.</p>
        <p>Flood testing is not a substitute for correct application. It catches some defects, but it cannot detect every thin spot or poorly bonded section. The quality of the preparation and the application still matters most.</p>
        ${CTA_EARLY}

        <h2 id="certificate">What a certificate should record</h2>
        <p>A waterproofing certificate should give you enough information to understand what was done and who is accountable. Depending on the project and the regulatory requirements, it may include:</p>
        <ul>
          <li>the property address and the wet area covered;</li>
          <li>the date of application and the date of inspection;</li>
          <li>the membrane system, product name and batch information where available;</li>
          <li>the standard or manufacturer's specification applied;</li>
          <li>the licensed person or company responsible;</li>
          <li>the licence number and signature;</li>
          <li>the flood test result and any observations;</li>
          <li>the scope of the waterproofing, including areas not covered.</li>
        </ul>
        <p>Queensland uses prescribed forms for some regulated work, and the correct form depends on the circumstances. Ask the contractor which certificate will be issued and who will sign it. If the answer is “the tiler will handle it” or “we will send it later”, get the detail in writing before work starts.</p>
        <p>Keep the certificate with your contract and other handover documents. It is useful at resale, for insurance and for any future renovation. A future owner will want to know what is behind the tiles.</p>

        <h2 id="redflags">Warning signs during the build</h2>
        <ul>
          <li>Waterproofing applied over obvious water damage, loose sheeting or a dirty substrate.</li>
          <li>No reinforcing tape or bond breaker at corners and junctions.</li>
          <li>Membrane applied and tiled on the same day, with no cure time.</li>
          <li>No flood test, or a test that is not documented.</li>
          <li>Trades walking on the membrane without protection.</li>
          <li>No certificate or a certificate that does not identify the area or the installer.</li>
          <li>A price that is significantly below comparable quotes with no explanation of the waterproofing system.</li>
        </ul>
        <p>If you see any of these, raise it immediately and in writing. Once the tiles are laid, investigating a suspected defect becomes destructive and expensive.</p>

        <h2 id="after">After handover: maintenance and warranties</h2>
        <p>Waterproofing is not maintenance-free. Keep the bathroom ventilated, especially after showers. Use cleaning products that are compatible with the membrane and the tile seals. Avoid abrasive pads and harsh chemicals on silicone joints. Check the silicone around the shower, bath and vanity periodically and replace it when it fails.</p>
        <p>Do not drill into a waterproofed floor or wall without knowing what is behind it. A new towel rail or shower screen fixing can puncture a membrane if it is installed in the wrong place. If you are planning alterations, ask for the waterproofing details first.</p>
        <p>Understand the difference between the manufacturer's product warranty and the installer's workmanship warranty. The manufacturer warrants the product; the installer warrants the application. Both matter, and both should be in writing. Our <a href="/warranty-and-certificates/">warranty and certificates page</a> explains what we provide at handover.</p>

        <h2 id="apartments">Apartments and body corporate</h2>
        <p>Apartment bathrooms add another layer. Waterproofing defects can affect the lot below, and body corporate approval may be required before work starts. The scope should identify who is responsible for make-good, access, insurance and any common property. Keep the body corporate approval, the contractor's insurance and the waterproofing certificate together.</p>
        <p>If you are renovating an apartment, read our <a href="/services/apartment-body-corporate-renovation/">apartment and body corporate renovation page</a> and confirm the building's requirements before booking trades. A good waterproofing job in an apartment is also a good neighbour policy.</p>
        <p>For a Brisbane bathroom renovation with documented waterproofing, call <a href="${tel}">${site.phoneDisplay}</a>. We will explain the system, the inspection points and the certification you will receive.</p>
      </article>
      ${sidebar(relatedLinks("/blog/waterproofing-compliance-certificates-queensland/"))}
    </div>
  </div>
</section>

${faqSection(waterproofFaqs, {
  title: "Waterproofing certificate questions",
  eyebrow: "Wet area compliance",
  intro: "What is tested, what is certified and what to check before the tiles go down.",
})}

${ctaBand({
  title: "Waterproofing you can verify",
  text: `Call ${site.phoneDisplay} to discuss your bathroom, or request a written scope that sets out the waterproofing system, testing and handover documents.`,
})}
`;

/* ------------------------------------------------------------------ *
 * Post 4 — Timeline
 * ------------------------------------------------------------------ */
const timelineFaqs = [
  {
    q: "How long does a bathroom renovation take in Brisbane?",
    a: "Most full bathroom renovations take about 10 to 15 working days on site after demolition, with a total calendar time of six to twelve weeks from first call to handover. Waterproofing cure times, product lead times, approvals and hidden repairs are usually the biggest variables. A compact ensuite or laundry may be faster; a layout change or structural repair may take longer.",
  },
  {
    q: "Why does the total timeline include weeks when no work is happening?",
    a: "Because a bathroom is a sequence, not a single trade. The measure, design, selections, quoting, contract, ordering and approval stages happen before demolition. After waterproofing, the membrane needs time to cure before flood testing and tiling. Tile and fixture lead times can also affect the start date. Those periods are part of the programme, not delays invented by the builder.",
  },
  {
    q: "Can the renovation be finished faster?",
    a: "Sometimes, with careful planning and products that are in stock. But compressing cure times, tiling over a wet membrane or skipping inspections creates defects that cost more to fix later. A realistic programme is usually faster overall than a rushed one that has to be redone.",
  },
  {
    q: "Can I live in the house during the renovation?",
    a: "Usually yes if you have another bathroom or toilet. We contain dust, protect floors and clean daily. If you have only one bathroom, the period without a usable toilet needs to be planned. Discuss temporary options with your builder before work starts.",
  },
  {
    q: "What causes the biggest delays?",
    a: "Hidden water damage, asbestos, structural repairs, body corporate approvals, product lead times and client changes after orders are placed. Weather can affect external work and drying, and humidity can extend cure times. A written programme with clear decision deadlines reduces the risk.",
  },
  {
    q: "When should I choose tiles and fixtures?",
    a: "Before the contract is finalised if possible, and certainly before the order is placed. Selections affect the scope, the price and the programme. Late changes can cause rework, additional costs and delays while replacement products are sourced.",
  },
];

const timelineBody = `
${hero({
  image: images.full,
  alt: "Bathroom renovation in progress with tiling and fit-off",
  eyebrow: "Project planning",
  h1: "Bathroom renovation timeline in Brisbane: week by week",
  lead:
    "A bathroom renovation is a sequence of dependent stages. Understanding the sequence helps you plan around the disruption, make decisions on time and recognise when a delay is normal and when it is a warning sign. Here is a realistic Brisbane timeline, from first call to handover.",
  primary: { href: "/get-a-quote/", label: "Get a free quote" },
  secondary: { href: tel, label: `Call ${site.phoneDisplay}` },
  trust: ["10–15 days on site", "Realistic programme", "Weekly updates", "QBCC licensed builder"],
  page: true,
})}

<section class="section">
  <div class="container">
    <div class="detail-layout">
      <article class="article-body prose">
        ${articleMeta({ date: "25 October 2026", read: "8 minute", topic: "Planning and programme" })}
        ${toc([
          ["overview", "The short version"],
          ["before", "Before demolition"],
          ["onsite", "On site: a typical sequence"],
          ["variables", "What changes the timeline"],
          ["living", "Living at home during the work"],
          ["delay", "Normal delays versus warning signs"],
          ["plan", "How to keep the project on track"],
        ])}

        <p>The question we hear most often is simple: “How long will my bathroom take?” The honest answer is that it depends on the scope, the condition of the room and how quickly decisions are made. A standard bathroom in a sound home follows a predictable sequence. A 1970s bathroom with water damage, asbestos and a layout change does not.</p>
        <p>What you should expect from a professional builder is a programme that reflects those dependencies, not a optimistic number designed to win the job. Below is the sequence we use for Brisbane renovations, with realistic time ranges and the reasons they move.</p>

        <h2 id="overview">The short version</h2>
        <div class="table-wrap">
          <table>
            <thead><tr><th>Stage</th><th>Typical duration</th><th>What happens</th></tr></thead>
            <tbody>
              <tr><td>Enquiry and phone discussion</td><td>Same day to a few days</td><td>Scope, suburb, budget range and service availability.</td></tr>
              <tr><td>On-site measure and inspection</td><td>1–2 hours</td><td>Room measure, services, substrate, access and constraints.</td></tr>
              <tr><td>Design, selections and quote</td><td>1–3 weeks</td><td>Layout, finishes, allowances, written scope and price.</td></tr>
              <tr><td>Contract and approvals</td><td>1–3 weeks</td><td>Contract, insurance, body corporate or building approvals, orders.</td></tr>
              <tr><td>Demolition and strip-out</td><td>1–3 days</td><td>Removal, disposal and inspection of the structure.</td></tr>
              <tr><td>Rough-in and repairs</td><td>2–4 days</td><td>Plumbing, electrical, framing, sheeting and substrate repairs.</td></tr>
              <tr><td>Waterproofing and cure</td><td>2–4 days</td><td>Preparation, membrane, cure and flood test.</td></tr>
              <tr><td>Screed and tiling</td><td>3–5 days</td><td>Floor screed, wall and floor tiling, grouting.</td></tr>
              <tr><td>Fit-off and finishing</td><td>3–5 days</td><td>Vanity, tapware, shower screen, toilet, accessories, painting.</td></tr>
              <tr><td>Inspection and handover</td><td>1–2 days</td><td>Defect check, cleaning, certificates and care instructions.</td></tr>
            </tbody>
          </table>
        </div>
        <p>For a typical full bathroom, the on-site period is about 10 to 15 working days after demolition. The total calendar time from first call to handover is usually six to twelve weeks. The difference is made up of design, ordering, approvals and cure times.</p>
        ${CTA_EARLY}

        <h2 id="before">Before demolition</h2>
        <h3>1. The first conversation</h3>
        <p>A useful first call covers the suburb, the property type, the room, what you want to change and your budget range. It also identifies whether the project is a straightforward refresh or a full rebuild. We can usually tell you whether the scope is realistic and what information to prepare.</p>
        <h3>2. On-site measure and inspection</h3>
        <p>The measure is not just a tape measure exercise. We check the floor structure, wall lining, plumbing and drainage, electrical capacity, ventilation, access, parking and any signs of water damage. For apartments, we check lift access and body corporate requirements. For older homes, we look for asbestos, lead paint and previous alterations.</p>
        <h3>3. Design and selections</h3>
        <p>Layout, tile format, vanity size, shower type, tapware, lighting and storage all affect the price and programme. Making those decisions early prevents the classic delay where demolition begins and the tiles are still not chosen. If you need design help, allow time for it. If you are selecting yourself, bring photos and product links to the measure.</p>
        <h3>4. Written quote and contract</h3>
        <p>The quote should show inclusions, exclusions, allowances and provisional sums. The contract should set out the payment stages, programme, variation process and handover requirements. Read both before signing. This is also the point to confirm insurance and any approvals.</p>
        <h3>5. Orders and approvals</h3>
        <p>Tiles, tapware, vanities, shower screens and custom joinery can have lead times of days or weeks. Body corporate approvals can take longer. Ordering early protects the programme. If a product is delayed, tell your builder immediately so the sequence can be adjusted.</p>

        <h2 id="onsite">On site: a typical sequence</h2>
        <h3>Days 1–3: strip-out</h3>
        <p>The old bathroom is removed, including tiles, fixtures, vanity, shower screen and sometimes screed. Floor protection and dust control go down first. Rubbish is removed. This is when hidden problems are discovered: water damage, rotten framing, failed waterproofing, old plumbing or asbestos.</p>
        <h3>Days 3–6: rough-in and substrate</h3>
        <p>Plumbing and electrical rough-in are completed and inspected. Framing and sheeting are repaired or replaced. The substrate is prepared for waterproofing. If the layout is changing, this is the most disruptive stage because walls and floors may be opened.</p>
        <h3>Days 6–9: waterproofing and curing</h3>
        <p>The wet area is waterproofed, detailed and left to cure. A flood test is carried out before tiling. Cure time cannot be rushed without compromising the membrane. This is also when screeding and falls are checked.</p>
        <h3>Days 9–13: tiling</h3>
        <p>Wall and floor tiles are laid, set out and grouted. Tiling is the most visible stage, and it is also where layout decisions become permanent. Check the set-out, the alignment and the grout lines while the work is underway, not after the fit-off.</p>
        <h3>Days 13–17: fit-off and finishing</h3>
        <p>Vanity, basin, tapware, toilet, shower screen, mirror, accessories and lighting are installed. Painting and make-good are completed. Silicone is applied. The room is cleaned and prepared for inspection.</p>
        <h3>Handover</h3>
        <p>We walk through the finished room, check the work, demonstrate the fixtures and provide the certificates, warranties and care instructions. Any outstanding items are listed with a date for completion. Final payment is linked to this stage, not to an arbitrary calendar date.</p>
        ${CTA_EARLY}

        <h2 id="variables">What changes the timeline</h2>
        <ul>
          <li><strong>Hidden water damage.</strong> Replacing framing, sheeting or flooring adds time and cost.</li>
          <li><strong>Asbestos.</strong> Testing and removal must be done by a licensed contractor and can add several days.</li>
          <li><strong>Structural changes.</strong> Moving walls, enlarging openings or relocating the toilet can require engineering and approvals.</li>
          <li><strong>Layout changes.</strong> Relocating plumbing and drainage is slower than replacing like for like.</li>
          <li><strong>Product lead times.</strong> Imported tiles, custom vanities and specialty tapware can take weeks.</li>
          <li><strong>Body corporate approvals.</strong> Apartment projects may need building approval, lift bookings and working-hour restrictions.</li>
          <li><strong>Weather and humidity.</strong> Brisbane's summer humidity can extend curing and drying times.</li>
          <li><strong>Client changes.</strong> A late change to tiles or layout can cause rework and reordering.</li>
          <li><strong>Trade availability.</strong> Specialist trades may be booked ahead, especially in busy periods.</li>
        </ul>
        <p>A good programme identifies these risks early. It does not pretend they do not exist.</p>

        <h2 id="living">Living at home during the work</h2>
        <p>Most Brisbane homeowners stay in the house during a bathroom renovation. If you have a second bathroom or toilet, the disruption is manageable. If you do not, plan the period without a usable toilet in advance. Options include a temporary toilet, a portable unit, or arranging access to a neighbour or family member's facilities.</p>
        <p>Expect dust, noise and restricted access. Clear the hallway and nearby rooms, remove fragile items and protect furniture. Keep pets away from the work area. Ask the builder about daily clean-up, rubbish removal, parking and site security. A professional team will explain the plan before demolition, not after.</p>
        <p>If you work from home, discuss the noisy stages in advance. Demolition, tiling and fit-off have different noise profiles. A little planning makes the project much easier to live with.</p>

        <h2 id="delay">Normal delays versus warning signs</h2>
        <p>Some delays are normal: a tile shipment is late, a waterproofing membrane needs longer to cure, a body corporate approval takes another week, or hidden damage is found behind the tiles. The key is communication. You should be told as soon as the delay is known, with an explanation and a revised date.</p>
        <p>Warning signs include:</p>
        <ul>
          <li>no written programme from the start;</li>
          <li>long periods with no trades on site and no explanation;</li>
          <li>repeated requests for money ahead of the agreed stages;</li>
          <li>work being covered before inspection or waterproofing cure;</li>
          <li>a builder who avoids written variations;</li>
          <li>a completion date that keeps moving without a documented reason.</li>
        </ul>
        <p>If the programme slips, ask for a written update and a revised completion date. Keep a record of the communication. A professional builder will not resent the question.</p>

        <h2 id="plan">How to keep the project on track</h2>
        <ol>
          <li>Choose tiles, tapware and fixtures before the contract is finalised.</li>
          <li>Pay attention to lead times, especially for imported products.</li>
          <li>Make decisions within the deadlines agreed with your builder.</li>
          <li>Keep a single point of contact and consolidate questions.</li>
          <li>Inspect at each stage, especially before waterproofing is covered.</li>
          <li>Respond to variation requests promptly and in writing.</li>
          <li>Keep the site clear and accessible.</li>
          <li>Plan for the period without a bathroom.</li>
        </ol>
        <p>A realistic timeline is not a promise that nothing will go wrong. It is a plan that accounts for the things that usually do. If you would like to talk through your project and the likely programme, call <a href="${tel}">${site.phoneDisplay}</a>. We will give you a straightforward assessment before you commit.</p>
        <p>You can also compare the timeline with our <a href="/our-process/">renovation process</a>, check <a href="/cost-guide/">Brisbane bathroom costs</a> and read our <a href="/blog/bathroom-renovation-contracts-queensland/">guide to Queensland contracts</a> before signing.</p>
      </article>
      ${sidebar(relatedLinks("/blog/bathroom-renovation-timeline-brisbane/"))}
    </div>
  </div>
</section>

${faqSection(timelineFaqs, {
  title: "Bathroom timeline questions",
  eyebrow: "Planning your project",
  intro: "How long the work takes, why the calendar is longer than the build and what usually causes delays.",
})}

${ctaBand({
  title: "Plan the programme before you start",
  text: `Call ${site.phoneDisplay} to discuss your bathroom, the likely timeframe and the decisions you need to make before work begins.`,
})}
`;

/* ------------------------------------------------------------------ *
 * Blog hub
 * ------------------------------------------------------------------ */
const hubFaqs = [
  {
    q: "Who writes these guides?",
    a: "They are written by our Brisbane team from the practical issues we see on renovation sites. They are general information for Queensland homeowners, not legal, financial or engineering advice. For decisions about your specific property, speak to the relevant qualified professional and check current QBCC guidance.",
  },
  {
    q: "Can I use these guides to compare quotes?",
    a: "Yes. The contract, licensing and waterproofing guides are designed to help you ask better questions and compare scopes rather than just prices. If a quote is unclear, ask the builder to put the missing detail in writing before you sign.",
  },
  {
    q: "Do you publish client case studies?",
    a: "Only with written permission, and we do not invent project addresses or testimonials. Our gallery currently uses clearly labelled representative illustrations. As real projects are photographed and approved, they will replace the illustrations.",
  },
  {
    q: "How do I get a quote for my Brisbane bathroom?",
    a: "Call (07) 8590 6941 or use the quote request form. We will discuss the room, your budget range and timing, then arrange an on-site measure if the project is a fit. The measure and written quote are free within our standard Greater Brisbane service area.",
  },
];

const hubBody = `
${hero({
  image: images.hero,
  alt: "Brisbane bathroom renovation guide and planning resources",
  eyebrow: "Guides and articles",
  h1: "Bathroom renovation guides for Brisbane homeowners",
  lead:
    "Practical, Queensland-specific information about contracts, licensing, waterproofing and timelines. Written to help you ask better questions, compare quotes properly and avoid the expensive mistakes we see on renovation sites.",
  primary: { href: "/get-a-quote/", label: "Get a free quote" },
  secondary: { href: tel, label: `Call ${site.phoneDisplay}` },
  trust: ["QBCC licensed builder", "Local Brisbane advice", "No invented reviews", "Open 7 days"],
  page: true,
})}

<section class="section">
  <div class="container">
    ${sectionHead({
      eyebrow: "Start here",
      title: "Four guides that answer the questions before you sign",
      intro: "Each guide is written for homeowners, not tradies. Read the one that matches your stage, then call if you want a straight answer about your own project.",
      center: true,
    })}
    <div class="grid-2">
      <a class="blog-card" href="/blog/bathroom-renovation-contracts-queensland/">
        <div class="blog-card__media"><img src="${images.process}" alt="Bathroom renovation contract documents" width="800" height="450" loading="lazy"></div>
        <div class="blog-card__body">
          <p class="blog-card__meta">Contracts · 9 minute read</p>
          <h3>Bathroom renovation contracts in Queensland</h3>
          <p>Deposits, progress payments, provisional sums, variations and the clauses worth reading before you sign.</p>
          <span class="text-link">Read the guide ${icons.arrow(15)}</span>
        </div>
      </a>
      <a class="blog-card" href="/blog/how-to-check-a-qbcc-licence/">
        <div class="blog-card__media"><img src="${images.about}" alt="Checking a builder licence online" width="800" height="450" loading="lazy"></div>
        <div class="blog-card__body">
          <p class="blog-card__meta">Licensing · 8 minute read</p>
          <h3>How to check a QBCC licence</h3>
          <p>What the register shows, how to match the entity to your contract and the questions to ask every builder.</p>
          <span class="text-link">Read the guide ${icons.arrow(15)}</span>
        </div>
      </a>
      <a class="blog-card" href="/blog/waterproofing-compliance-certificates-queensland/">
        <div class="blog-card__media"><img src="${images.waterproofing}" alt="Waterproofing a bathroom wet area" width="800" height="450" loading="lazy"></div>
        <div class="blog-card__body">
          <p class="blog-card__meta">Waterproofing · 9 minute read</p>
          <h3>Waterproofing compliance certificates</h3>
          <p>AS 3740, flood testing, what a certificate should record and the warning signs before tiling.</p>
          <span class="text-link">Read the guide ${icons.arrow(15)}</span>
        </div>
      </a>
      <a class="blog-card" href="/blog/bathroom-renovation-timeline-brisbane/">
        <div class="blog-card__media"><img src="${images.full}" alt="Bathroom renovation timeline" width="800" height="450" loading="lazy"></div>
        <div class="blog-card__body">
          <p class="blog-card__meta">Planning · 8 minute read</p>
          <h3>Bathroom renovation timeline in Brisbane</h3>
          <p>A realistic week-by-week sequence, what changes the programme and how to keep decisions on track.</p>
          <span class="text-link">Read the guide ${icons.arrow(15)}</span>
        </div>
      </a>
    </div>
  </div>
</section>

<section class="section section--pale">
  <div class="container">
    <div class="split split--wide-left">
      <div class="split__body">
        <p class="eyebrow">How to use these guides</p>
        <h2>Compare the scope, not just the price</h2>
        <p class="lead">The cheapest quote is rarely the cheapest project.</p>
        <p>Bathroom quotes are difficult to compare because builders describe scope in different ways. One quote may include waterproofing, screeding, tiling and certification; another may treat them as extras. One may allow $2,000 for tiles; another may allow $5,000. One may include rubbish removal and site protection; another may leave them to you.</p>
        <p>These guides give you the vocabulary to ask what is included, what is excluded and what happens if the scope changes. Use them alongside our <a href="/cost-guide/">Brisbane bathroom renovation cost guide</a> and our <a href="/choosing-a-contractor/">contractor comparison checklist</a>.</p>
        <ul class="checklist">
          <li>${icons.check()}Ask every builder for a written scope with inclusions and exclusions.</li>
          <li>${icons.check()}Check the licence, insurance and contract before paying a deposit.</li>
          <li>${icons.check()}Confirm how waterproofing will be tested and certified.</li>
          <li>${icons.check()}Ask for a realistic programme with decision deadlines.</li>
          <li>${icons.check()}Compare allowances, not just the headline price.</li>
        </ul>
      </div>
      <div class="split__media">
        <img src="${images.hero}" alt="Completed Brisbane bathroom renovation" width="800" height="600" loading="lazy">
      </div>
    </div>
  </div>
</section>

<section class="section">
  <div class="container">
    <div class="section-head section-head--center">
      <p class="eyebrow">Keep exploring</p>
      <h2>Related services and local information</h2>
      <p class="lead">If you already know what you need, go straight to the relevant service or suburb page.</p>
    </div>
    <div class="grid-3">
      ${services.slice(0, 6).map((s) => `<a class="card card--service" href="/services/${s.slug}/">
        <div class="card__media"><img src="${s.image}" alt="${s.name} Brisbane" width="600" height="375" loading="lazy"></div>
        <div class="card__body"><h3>${s.name}</h3><p>${s.shortDescription || s.description}</p><span class="text-link">View service ${icons.arrow(15)}</span></div>
      </a>`).join("")}
    </div>
    <div class="area-list" style="margin-top:24px">
      ${locations.map((l) => `<a href="/${l.slug}/">${l.suburb}</a>`).join("")}
    </div>
  </div>
</section>

${faqSection(hubFaqs, {
  title: "About our guides",
  eyebrow: "Transparency",
  intro: "Who writes them, how to use them and how we handle project evidence.",
})}

${ctaBand({
  title: "Have a question about your bathroom?",
  text: `Call ${site.phoneDisplay} for a straight answer, or request an on-site measure and written quote. We work across Greater Brisbane.`,
})}
`;

/* ------------------------------------------------------------------ *
 * Page objects
 * ------------------------------------------------------------------ */
function articleSchema({ path, headline, description, date, image, faqs }) {
  return [
    {
      "@type": "BlogPosting",
      "@id": `${site.domain}${path}#article`,
      headline,
      description,
      image: `${site.domain}${image}`,
      datePublished: date,
      dateModified: "2026-10-26",
      inLanguage: "en-AU",
      author: { "@type": "Organization", name: site.name, url: site.domain },
      publisher: { "@id": `${site.domain}/#organization` },
      mainEntityOfPage: { "@id": `${site.domain}${path}#webpage` },
      about: ["Bathroom renovation", "Queensland", "QBCC"],
    },
    faqSchema(faqs),
  ];
}

export function renderBlogHub() {
  return {
    path: "/blog/",
    title: "Bathroom Renovation Guides Brisbane | Ace Bathrooms",
    description:
      "Brisbane bathroom renovation guides: Queensland contracts, QBCC licence checks, waterproofing certificates and realistic timelines. Call (07) 8590 6941.",
    image: images.hero,
    body: hubBody,
    crumbs: [{ name: "Guides", url: "/blog/" }],
    schema: [faqSchema(hubFaqs)],
  };
}

export function renderContractsPost() {
  return {
    path: "/blog/bathroom-renovation-contracts-queensland/",
    title: "Bathroom Renovation Contracts Queensland | Ace Bathrooms",
    description:
      "Queensland bathroom renovation contracts explained: written requirements, deposits, progress payments, variations, insurance and handover. Call (07) 8590 6941.",
    image: images.process,
    body: contractsBody,
    crumbs: [{ name: "Guides", url: "/blog/" }, { name: "Queensland Contracts", url: "/blog/bathroom-renovation-contracts-queensland/" }],
    schema: articleSchema({
      path: "/blog/bathroom-renovation-contracts-queensland/",
      headline: "Bathroom renovation contracts in Queensland: what to check before you sign",
      description: "A homeowner guide to Queensland bathroom renovation contracts, deposits, variations and handover.",
      date: "2026-10-12",
      image: images.process,
      faqs: contractFaqs,
    }),
  };
}

export function renderLicencePost() {
  return {
    path: "/blog/how-to-check-a-qbcc-licence/",
    title: "How to Check a QBCC Licence | Brisbane Homeowner Guide | Ace",
    description:
      "How to check a QBCC licence before hiring a bathroom renovator: search steps, licence scope, insurance and questions to ask. Call (07) 8590 6941.",
    image: images.about,
    body: licenceBody,
    crumbs: [{ name: "Guides", url: "/blog/" }, { name: "Check a QBCC Licence", url: "/blog/how-to-check-a-qbcc-licence/" }],
    schema: articleSchema({
      path: "/blog/how-to-check-a-qbcc-licence/",
      headline: "How to check a QBCC licence before you hire a bathroom renovator",
      description: "A step-by-step guide to verifying a Queensland builder licence and matching it to your contract.",
      date: "2026-10-18",
      image: images.about,
      faqs: licenceFaqs,
    }),
  };
}

export function renderWaterproofingPost() {
  return {
    path: "/blog/waterproofing-compliance-certificates-queensland/",
    title: "Waterproofing Certificates Queensland | Ace Bathrooms",
    description:
      "Bathroom waterproofing certificates in Queensland: AS 3740, flood testing, what a certificate records, warning signs and maintenance. Call (07) 8590 6941.",
    image: images.waterproofing,
    body: waterproofBody,
    crumbs: [{ name: "Guides", url: "/blog/" }, { name: "Waterproofing Certificates", url: "/blog/waterproofing-compliance-certificates-queensland/" }],
    schema: articleSchema({
      path: "/blog/waterproofing-compliance-certificates-queensland/",
      headline: "Waterproofing compliance certificates in Queensland: what they prove",
      description: "What Brisbane homeowners should know about AS 3740 waterproofing, flood testing and certification.",
      date: "2026-10-22",
      image: images.waterproofing,
      faqs: waterproofFaqs,
    }),
  };
}

export function renderTimelinePost() {
  return {
    path: "/blog/bathroom-renovation-timeline-brisbane/",
    title: "Bathroom Renovation Timeline Brisbane | Week by Week | Ace",
    description:
      "A realistic Brisbane bathroom renovation timeline: 10–15 days on site, 6–12 weeks total, stage-by-stage sequence and common delays. Call (07) 8590 6941.",
    image: images.full,
    body: timelineBody,
    crumbs: [{ name: "Guides", url: "/blog/" }, { name: "Renovation Timeline", url: "/blog/bathroom-renovation-timeline-brisbane/" }],
    schema: articleSchema({
      path: "/blog/bathroom-renovation-timeline-brisbane/",
      headline: "Bathroom renovation timeline in Brisbane: week by week",
      description: "A realistic stage-by-stage timeline for a Brisbane bathroom renovation, including common delays.",
      date: "2026-10-25",
      image: images.full,
      faqs: timelineFaqs,
    }),
  };
}

