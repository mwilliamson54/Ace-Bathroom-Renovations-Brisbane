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
  faqSchema,
} from "../lib/layout.mjs";

const costFaqs = [
  {
    q: "How much does a bathroom renovation cost in Brisbane?",
    a: "A typical full bathroom renovation in Brisbane ranges from about $18,000 to $45,000, with most projects landing between $24,000 and $36,000. Compact ensuites and small bathrooms generally start lower, while layout changes, premium finishes, structural repairs and apartment access can push the price higher. The only reliable number comes from an on-site inspection and a written scope.",
  },
  {
    q: "Why is there such a big difference between bathroom quotes?",
    a: "Quotes differ because the scope differs. One price may exclude waterproofing, screeding, waste removal, exhaust ducting, shower screens, tapware, painting or make-good. Another may assume the substrate is sound without inspecting it. Compare the inclusions line by line, not just the total. A low price with missing items is not a lower price; it is an incomplete scope.",
  },
  {
    q: "What is usually excluded from a bathroom renovation quote?",
    a: "Common exclusions include asbestos testing and removal, structural repairs, major plumbing relocations, body corporate fees, building approvals, temporary bathroom hire, custom joinery beyond the allowance, premium tile and tapware upgrades, and landscaping or external make-good. A good quote lists these clearly rather than leaving them to become surprise variations.",
  },
  {
    q: "How much should I keep as a contingency?",
    a: "For an older Brisbane home, we recommend keeping 10 to 15 percent of the contract value as a contingency. Bathrooms hide water damage, failed sheeting and illegal past work. A contingency is not a slush fund; it is a buffer for genuine hidden conditions that could not be identified before demolition.",
  },
  {
    q: "Is a cheap bathroom renovation worth it?",
    a: "Only if the scope is complete and the waterproofing is done properly. A cheap renovation that skips membrane preparation, uses inadequate ventilation or tiles over a failed substrate will cost more to fix later. Focus on value: a clear scope, licensed trades, tested waterproofing and a realistic programme. Those are the parts you cannot see but will live with every day.",
  },
  {
    q: "Do you offer fixed-price quotes?",
    a: "Yes, wherever the scope can be defined. We provide an itemised fixed price for the known work and transparent provisional allowances for conditions that cannot be confirmed until demolition. If a provisional item changes, we document it, explain the options and agree the variation in writing before proceeding.",
  },
  {
    q: "How do payment stages work?",
    a: "Payments are linked to progress, not to arbitrary dates. A typical schedule includes a deposit, a progress payment after rough-in and waterproofing, a payment after tiling, and the balance at practical completion. The exact schedule is set out in your contract and complies with Queensland requirements for domestic building work.",
  },
  {
    q: "Can I save money by supplying my own tiles or fixtures?",
    a: "Sometimes. We are happy to work with client-supplied products, provided they are suitable, available and compliant. You carry the risk of lead times, damage, shortages and warranty claims on those items. We confirm quantities, spares and compatibility before ordering, and we do not inflate trade prices to recover a margin.",
  },
];

export function renderCostGuide() {
  const body = `
${hero({
  image: images.tiling,
  alt: "Bathroom renovation cost planning with tiles and fixtures",
  eyebrow: "Bathroom renovation cost guide",
  h1: "Bathroom renovation cost in Brisbane",
  lead:
    "Realistic planning ranges, the factors that move the price and the questions to ask before you compare quotes. No low headline number, no hidden allowances.",
  primary: { href: "/get-a-quote/", label: "Get a free quote" },
  secondary: { href: tel, label: `Call ${site.phoneDisplay}` },
  trust: ["Itemised written quotes", "Fixed scope where possible", "QBCC licensed builder", "Open 7am–10pm, 7 days"],
  card: `<p><strong>Want a number for your room?</strong> Call <a href="${tel}">${site.phoneDisplay}</a> or book an on-site measure. We will explain what drives the cost before you commit.</p>`,
  page: true,
})}
${trustStrip()}

<section class="section">
  <div class="container">
    <div class="detail-layout">
      <div class="prose">
        <p class="eyebrow">The honest starting point</p>
        <h2>What bathroom renovations actually cost in Brisbane</h2>
        <p>Bathroom renovation pricing is not a single number. It is the sum of demolition, substrate repair, plumbing, electrical, waterproofing, tiling, joinery, glazing, fixtures, painting and project management. Two bathrooms of the same size can differ by tens of thousands of dollars because one retains the layout and the other moves the toilet, replaces the floor structure and upgrades every finish.</p>
        <p>The ranges below are planning guides for Brisbane homes. They assume a licensed builder, a written scope, AS 3740 waterproofing and a normal level of site access. They are not quotes, and they are not a promise that your project will fall inside the band. A site inspection is the only way to price the room you actually have.</p>

        <div class="table-wrap"><table class="price-table">
          <thead><tr><th scope="col">Project type</th><th scope="col">Typical planning range</th></tr></thead>
          <tbody>
            <tr><td>Full bathroom renovation, existing layout</td><td>$18,000 – $30,000</td></tr>
            <tr><td>Full bathroom with layout changes</td><td>$28,000 – $45,000</td></tr>
            <tr><td>Small or compact bathroom renovation</td><td>$14,000 – $26,000</td></tr>
            <tr><td>Ensuite renovation</td><td>$15,000 – $32,000</td></tr>
            <tr><td>Laundry renovation</td><td>$10,000 – $24,000</td></tr>
            <tr><td>Kitchen renovation</td><td>$20,000 – $55,000</td></tr>
            <tr><td>Bathroom waterproofing only</td><td>$2,500 – $4,500</td></tr>
            <tr><td>Tiling only, bathroom</td><td>$4,000 – $12,000</td></tr>
            <tr><td>Accessible bathroom modifications</td><td>$12,000 – $30,000</td></tr>
            <tr><td>Apartment bathroom with body corporate</td><td>$17,000 – $40,000</td></tr>
          </tbody>
        </table></div>
        <p style="font-size:.82rem;color:var(--muted)">Indicative ranges only. Read the assumptions below and use the <a href="/bathroom-renovation-cost-calculator/">cost calculator</a> for an interactive estimate.</p>

        <h2>What drives the price</h2>
        <h3>1. Room size and tiling area</h3>
        <p>Tiling area is often more important than floor area. A small bathroom with full-height wall tiles, a shower niche and a mitred feature wall can involve more tiling than a larger room with a standard splashback. Waterproofing area, screeding, adhesive and labour all scale with the surfaces being prepared and finished.</p>

        <h3>2. Layout changes</h3>
        <p>Keeping the toilet, shower and vanity in their existing positions is the single biggest cost saver. Moving a waste or supply line depends on joist direction, fall, stack access and whether the floor is timber or slab. A layout change can add plumbing, carpentry, waterproofing and tiling work, and it may require building approval or body corporate consent.</p>

        <h3>3. Substrate and hidden damage</h3>
        <p>Older Brisbane bathrooms frequently hide water damage. Failed sheeting, rotting studs, compromised floor boards, illegal past work and undersized exhaust ducting are common. We cannot see all of it until the room is opened, which is why a provisional allowance is more honest than a fixed price that ignores the risk. We photograph the damage and agree the repair before proceeding.</p>

        <h3>4. Finish level</h3>
        <p>Entry-level porcelain, a framed screen and a standard vanity cost far less than large-format rectified tiles, a frameless screen, stone tops, wall-hung joinery, brushed nickel tapware and niche lighting. The labour to install premium finishes is often higher because tolerances are tighter and the details take longer.</p>

        <h3>5. Plumbing and electrical scope</h3>
        <p>A like-for-like replacement of tapware and fixtures is straightforward. New circuits, heated towel rails, underfloor heating, exhaust ducting through a roof space, three-in-one bathroom units and relocated lighting add design, labour and compliance work. Electrical and plumbing must be completed by licensed trades and documented.</p>

        <h3>6. Access and building type</h3>
        <p>Ground-floor homes with a driveway are the simplest. Apartments add body corporate approvals, lift bookings, protection of common areas, parking permits and restricted work hours. Queenslanders on steep blocks may need extra staging, waste removal planning and structural investigation. These costs are real and should be visible in the quote.</p>

        <h3>7. Ventilation</h3>
        <p>Brisbane's humidity makes ventilation a functional requirement, not an optional extra. An externally ducted exhaust fan sized for the room, with a quality backdraft shutter and a clean duct run, costs more than a ceiling-mounted recirculating unit. It also protects the building from condensation and mould, which is far more expensive to remediate later.</p>

        <h3>8. Programme and lead times</h3>
        <p>Tiles, tapware, vanities, screens and custom joinery can have lead times of several weeks. If a project is rushed, the wrong product may be substituted or the programme may stall. We confirm lead times before demolition and build realistic cure times into the schedule. A fast programme that ignores waterproofing cure is not a saving.</p>

        <h2>How the budget is typically distributed</h2>
        <p>The exact split depends on the scope, but a full bathroom renovation generally follows a pattern. This is a useful sanity check when a quote looks unusually low in one area and unusually high in another.</p>
        <div class="table-wrap"><table class="price-table">
          <thead><tr><th scope="col">Cost category</th><th scope="col">Share of budget</th><th scope="col">What it covers</th></tr></thead>
          <tbody>
            <tr><td>Labour and project management</td><td>30–40%</td><td>Site coordination, carpentry, supervision, scheduling and quality checks</td></tr>
            <tr><td>Tiling and screeding</td><td>15–20%</td><td>Substrate preparation, screed, wall and floor tiles, grout and silicone</td></tr>
            <tr><td>Waterproofing</td><td>4–7%</td><td>Membrane, preparation, flood testing and certification</td></tr>
            <tr><td>Plumbing and electrical</td><td>10–15%</td><td>Rough-in, fit-off, exhaust, lighting and compliance certificates</td></tr>
            <tr><td>Joinery and fixtures</td><td>15–25%</td><td>Vanity, tapware, toilet, shower, screen, mirror and accessories</td></tr>
            <tr><td>Demolition and waste</td><td>3–6%</td><td>Strip-out, protection, skip hire and disposal</td></tr>
            <tr><td>Contingency</td><td>10–15%</td><td>Hidden damage, provisional items and client changes</td></tr>
          </tbody>
        </table></div>

        <h2>Essential, mid-range and premium</h2>
        <div class="price-bands" style="margin:22px 0 30px">
          <article class="price-band"><span class="price-band__tier">Essential</span><h3>Sound and simple</h3><div class="price-band__price">$18,000 – $24,000</div><p>Existing layout, standard porcelain tiles, framed or semi-frameless screen, entry-level vanity and tapware. The priority is waterproofing and function.</p></article>
          <article class="price-band price-band--featured"><span class="price-band__tier">Mid-range</span><h3>Most common</h3><div class="price-band__price">$24,000 – $36,000</div><p>Full rebuild, minor plumbing moves, large-format tiles, wall-hung vanity, frameless screen and better ventilation.</p></article>
          <article class="price-band"><span class="price-band__tier">Premium</span><h3>Custom detail</h3><div class="price-band__price">$36,000 – $50,000</div><p>Reconfigured layout, custom joinery, stone tops, feature tiling, niche lighting and premium tapware.</p></article>
          <article class="price-band"><span class="price-band__tier">Luxury</span><h3>Architectural</h3><div class="price-band__price">$50,000+</div><p>Structural change, freestanding bath, imported stone, underfloor heating, smart systems and bespoke detailing.</p></article>
        </div>

        <h2>Hidden costs to plan for</h2>
        <ul class="checklist">
          <li>${icons.check()}<strong>Asbestos.</strong> Homes built before the late 1980s may contain asbestos in sheeting, adhesives or lagging. Testing and licensed removal are separate costs.</li>
          <li>${icons.check()}<strong>Water damage and rot.</strong> Replacing studs, floor sheeting or framing is additional work that cannot be confirmed until strip-out.</li>
          <li>${icons.check()}<strong>Illegal or non-compliant past work.</strong> Previous DIY plumbing, electrical or waterproofing may need to be corrected before the new work can proceed.</li>
          <li>${icons.check()}<strong>Body corporate and building approvals.</strong> Fees, reports, lift bookings and work-hour restrictions apply in many apartment buildings.</li>
          <li>${icons.check()}<strong>Temporary bathroom arrangements.</strong> If you have only one bathroom, you may need a temporary toilet, gym membership or alternative arrangement.</li>
          <li>${icons.check()}<strong>Product upgrades.</strong> Changing tile, tapware or vanity selections after the contract is signed can add cost and delay.</li>
          <li>${icons.check()}<strong>Make-good beyond the room.</strong> Painting, architraves, ceiling repairs and flooring outside the bathroom may be affected by the work.</li>
        </ul>

        <h2>How to compare bathroom quotes</h2>
        <p>Do not compare totals in isolation. Put the quotes side by side and check whether each one includes the same scope. A quote that is $5,000 cheaper may simply exclude waterproofing, screeding, the shower screen or waste removal. Those items still have to be paid for, usually after you have committed.</p>
        <div class="table-wrap"><table class="price-table">
          <thead><tr><th scope="col">Check</th><th scope="col">What a complete quote shows</th></tr></thead>
          <tbody>
            <tr><td>Demolition and disposal</td><td>Protection, strip-out, skip hire and tip fees</td></tr>
            <tr><td>Substrate</td><td>Inspection findings, sheeting replacement and provisional allowances</td></tr>
            <tr><td>Waterproofing</td><td>AS 3740 system, flood test and certificate</td></tr>
            <tr><td>Tiling</td><td>Areas, tile supply or allowance, screed, grout and silicone</td></tr>
            <tr><td>Plumbing and electrical</td><td>Rough-in, fit-off, exhaust, lighting and certificates</td></tr>
            <tr><td>Fixtures</td><td>Vanity, tapware, toilet, screen, mirror and accessories, or clear allowances</td></tr>
            <tr><td>Painting and make-good</td><td>Ceiling, cornice, doors, architraves and patch work</td></tr>
            <tr><td>Programme and payment</td><td>Start date, milestones, cure times and progress payment schedule</td></tr>
            <tr><td>Variations</td><td>How hidden damage and client changes are priced and approved</td></tr>
            <tr><td>Warranty</td><td>Workmanship terms, statutory warranties and certificate handover</td></tr>
          </tbody>
        </table></div>

        <h2>Where to save and where not to</h2>
        <p>You can save by retaining the layout, choosing standard-size tiles, buying a quality off-the-shelf vanity, limiting niche and feature work, and renovating the bathroom and laundry together to reduce mobilisation. You can also save by supplying your own fixtures if you accept the lead-time and warranty risk.</p>
        <p>Do not save on waterproofing, substrate preparation, ventilation, plumbing and electrical compliance, or the quality of the shower screen and tapware cartridges. These are the parts that cause failures, insurance disputes and repeat work. A cheap membrane or an undersized fan is not a bargain.</p>

        <h2>Payment, contracts and consumer protection</h2>
        <p>Queensland domestic building work is governed by a written contract that sets out the scope, price, payment stages, variations and completion process. We do not ask for large cash deposits or payments unrelated to progress. If your project requires QBCC home warranty insurance, we will explain whether it applies and how it is arranged before work starts.</p>
        <p>Read the contract before you sign it. Check the licence name and number, the scope, the allowances, the exclusions and the process for resolving a dispute. A professional builder will not rush you through this step.</p>

        <h2>Get a quote for your actual room</h2>
        <p>The ranges on this page are useful for planning, but they cannot account for the condition of your substrate, the access to your property or the finishes you have in mind. An on-site measure takes about an hour and gives you a written scope you can compare properly. Call us or request a quote and we will arrange a time.</p>
      </div>

      <aside class="sidebar" aria-label="Cost guide summary and contact">
        <div class="sidebar-card sidebar-card--teal">
          <h3>Get a room-specific quote</h3>
          <p>Call for a straightforward conversation about budget, scope and timing. We book on-site measures across Greater Brisbane.</p>
          <a class="btn btn-white" href="${tel}">${icons.phone(17)} ${site.phoneDisplay}</a>
          <a class="btn btn-outline-white" href="/get-a-quote/">Request a quote</a>
          <p style="font-size:.76rem;margin:10px 0 0">${site.hoursLong}</p>
        </div>
        <div class="sidebar-card">
          <h3>Quick ranges</h3>
          <div class="quick-facts" style="grid-template-columns:1fr;margin:0">
            <div class="quick-fact"><span>Full bathroom</span><strong>$18k – $45k</strong></div>
            <div class="quick-fact"><span>Small bathroom</span><strong>$14k – $26k</strong></div>
            <div class="quick-fact"><span>Ensuite</span><strong>$15k – $32k</strong></div>
            <div class="quick-fact"><span>Laundry</span><strong>$10k – $24k</strong></div>
            <div class="quick-fact"><span>Waterproofing</span><strong>$2.5k – $4.5k</strong></div>
          </div>
        </div>
        <div class="sidebar-card">
          <h3>Planning tools</h3>
          <ul class="sidebar-list">
            <li><a href="/bathroom-renovation-cost-calculator/">Cost calculator ${icons.chevron(14)}</a></li>
            <li><a href="/choosing-a-contractor/">Choosing a contractor ${icons.chevron(14)}</a></li>
            <li><a href="/how-it-works/">How it works ${icons.chevron(14)}</a></li>
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

${faqSection(costFaqs, {
  title: "Bathroom renovation cost questions",
  eyebrow: "Budget answers",
  intro: "What Brisbane homeowners ask about quotes, inclusions, contingencies and payments.",
})}

${ctaBand({
  title: "Get a written quote for your bathroom",
  text: `Call ${site.phoneDisplay} for a scope-specific conversation, or request an on-site measure and itemised written quote.`,
})}
`;

  return {
    path: "/cost-guide/",
    title: "Bathroom Renovation Cost Brisbane 2026 | Ace Bathrooms",
    description:
      "Bathroom renovation costs in Brisbane: 2026 ranges, budget breakdowns, hidden costs and how to compare quotes. QBCC licensed builder. Call (07) 8590 6941.",
    image: images.tiling,
    body,
    crumbs: [{ name: "Cost Guide", url: "/cost-guide/" }],
    schema: [faqSchema(costFaqs)],
  };
}

const calcFaqs = [
  {
    q: "How accurate is the bathroom cost calculator?",
    a: "The calculator gives a planning range based on typical Brisbane projects, not a quote. It cannot see the condition of your substrate, the exact tiling area, the access to your property or the products you will choose. Use it to set a budget and prepare questions, then confirm the number with an on-site measure.",
  },
  {
    q: "Why does the calculator ask about layout changes?",
    a: "Moving a toilet, shower or vanity usually requires plumbing alterations, waterproofing changes and additional tiling. It can also affect floor structure and building approvals. Layout changes are one of the largest variables in a bathroom budget, so we ask about them separately.",
  },
  {
    q: "Does the calculator include tiles and fixtures?",
    a: "It assumes a standard allowance for tiles, tapware, a vanity, a toilet, a shower screen and accessories. Premium products, imported stone, custom joinery and smart fixtures can exceed that allowance. Your written quote will show exactly what is included and what is a client selection.",
  },
  {
    q: "What if my bathroom has asbestos?",
    a: "The calculator includes an optional asbestos allowance, but the actual cost depends on testing, the type of material and the removal method. If asbestos is suspected, we stop work, arrange testing and use a licensed removal contractor before the renovation continues.",
  },
  {
    q: "Can I use the estimate to compare builders?",
    a: "You can use it to understand the likely range, but do not compare a calculator estimate to a builder's quote. Compare written quotes line by line, with the same scope, allowances and exclusions. Ask each builder to explain what is provisional and what is fixed.",
  },
];

export function renderCalculator() {
  const body = `
${hero({
  image: images.small,
  alt: "Bathroom renovation cost calculator for Brisbane homes",
  eyebrow: "Cost calculator",
  h1: "Bathroom renovation cost calculator",
  lead:
    "Adjust the project type, size, finish level and site conditions to see an indicative Brisbane budget range. Then use it to prepare for a proper on-site quote.",
  primary: { href: "#calculator", label: "Estimate my budget" },
  secondary: { href: tel, label: `Call ${site.phoneDisplay}` },
  trust: ["Free to use", "No obligation", "Brisbane-specific ranges", "Open 7am–10pm, 7 days"],
  card: `<p><strong>Prefer a human answer?</strong> Call <a href="${tel}">${site.phoneDisplay}</a>. We will talk through the room and explain what the range means.</p>`,
  page: true,
})}
${trustStrip()}

<section class="section" id="calculator">
  <div class="container">
    <div class="section-head section-head--center">
      <p class="eyebrow">Build a planning range</p>
      <h2>Estimate your bathroom renovation budget</h2>
      <p class="lead">This tool uses the same planning logic as our cost guide. It is designed to be honest about the variables, not to produce a falsely precise number.</p>
    </div>
    <div class="detail-layout">
      <div>
        <form class="form-card" id="cost-calculator" novalidate>
          <div class="form-grid form-grid--2">
            <div class="field">
              <label for="calc-project">Project type</label>
              <select id="calc-project" name="project">
                <option value="full">Full bathroom renovation</option>
                <option value="small">Small or compact bathroom</option>
                <option value="ensuite">Ensuite renovation</option>
                <option value="laundry">Laundry renovation</option>
                <option value="kitchen">Kitchen renovation</option>
                <option value="waterproofing">Waterproofing only</option>
                <option value="tiling">Tiling only</option>
                <option value="accessible">Accessible bathroom modifications</option>
              </select>
            </div>
            <div class="field">
              <label for="calc-size">Room size</label>
              <select id="calc-size" name="size">
                <option value="compact">Compact — under 4 m²</option>
                <option value="standard" selected>Standard — 4 to 7 m²</option>
                <option value="large">Large — over 7 m²</option>
              </select>
            </div>
            <div class="field">
              <label for="calc-finish">Finish level</label>
              <select id="calc-finish" name="finish">
                <option value="essential">Essential — practical, standard finishes</option>
                <option value="mid" selected>Mid-range — most common</option>
                <option value="premium">Premium — custom detail</option>
              </select>
            </div>
            <div class="field">
              <label for="calc-layout">Layout</label>
              <select id="calc-layout" name="layout">
                <option value="keep" selected>Keep the existing layout</option>
                <option value="change">Move plumbing or change the layout</option>
              </select>
            </div>
            <div class="field">
              <label for="calc-access">Site access</label>
              <select id="calc-access" name="access">
                <option value="standard" selected>Standard house access</option>
                <option value="apartment">Apartment or body corporate</option>
                <option value="difficult">Difficult access or steep site</option>
              </select>
            </div>
            <div class="field">
              <label for="calc-scope">Additional scope</label>
              <select id="calc-scope" name="scope">
                <option value="none" selected>None</option>
                <option value="asbestos">Possible asbestos removal</option>
                <option value="structural">Structural or substrate repair</option>
                <option value="heating">Underfloor heating</option>
                <option value="joinery">Custom joinery</option>
              </select>
            </div>
          </div>
          <div class="btn-group" style="margin-top:18px">
            <button class="btn btn-primary btn-lg" type="submit">Calculate my range</button>
            <button class="btn btn-outline btn-lg" type="reset" id="calc-reset">Reset</button>
          </div>
          <div class="calc-result" id="calc-result" aria-live="polite">
            <span class="calc-result__label">Indicative planning range</span>
            <span class="calc-result__amount" id="calc-amount">$18,000 – $38,000</span>
            <span class="calc-note" id="calc-detail">Full bathroom, standard size, mid-range finish, existing layout, standard access.</span>
          </div>
          <p class="calc-note">This estimate is a planning guide only. It is not a quote and does not create a contract. Final pricing depends on the site inspection, measured quantities, product selections and documented scope.</p>
        </form>
      </div>
      <aside class="sidebar" aria-label="Calculator help and contact">
        <div class="sidebar-card sidebar-card--teal">
          <h3>Turn the range into a quote</h3>
          <p>Call us with the estimate and your suburb. We will explain what is realistic for your room and book a measure.</p>
          <a class="btn btn-white" href="${tel}">${icons.phone(17)} ${site.phoneDisplay}</a>
          <a class="btn btn-outline-white" href="/get-a-quote/">Request a quote</a>
          <p style="font-size:.76rem;margin:10px 0 0">${site.hoursLong}</p>
        </div>
        <div class="sidebar-card">
          <h3>What is included</h3>
          <ul class="sidebar-list">
            <li>Strip-out and disposal</li>
            <li>Substrate preparation</li>
            <li>AS 3740 waterproofing</li>
            <li>Tiling and screeding</li>
            <li>Licensed plumbing and electrical</li>
            <li>Vanity, tapware and fit-off</li>
            <li>Painting and make-good</li>
            <li>Certificate and handover</li>
          </ul>
        </div>
        <div class="sidebar-card">
          <h3>What can change it</h3>
          <ul class="sidebar-list">
            <li>Hidden water damage</li>
            <li>Asbestos</li>
            <li>Structural repairs</li>
            <li>Premium product selections</li>
            <li>Apartment approvals</li>
            <li>Difficult site access</li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</section>

<section class="section section--pale">
  <div class="container">
    <div class="detail-layout">
      <div class="prose">
        <p class="eyebrow">How to use the result</p>
        <h2>From estimate to informed quote</h2>
        <p>The calculator is a starting point. It helps you understand the order of magnitude and the variables that matter. It cannot tell you whether your floor is sound, whether the waterproofing has failed or whether the layout you want will drain properly. Those questions need a site inspection.</p>
        <p>When we visit, we measure the room, check the substrate and moisture, inspect the plumbing and ventilation, confirm access and discuss the finishes you like. From that information we prepare an itemised written quote. The quote will show what is fixed, what is provisional and what is excluded. That is a far more useful document than a calculator range.</p>
        <h2>Assumptions behind the calculator</h2>
        <p>The base ranges assume a Brisbane bathroom with standard access, a licensed builder, AS 3740 waterproofing, standard porcelain tiles, a vanity, a toilet, a shower screen, tapware and accessories. They include demolition, disposal, substrate preparation at a normal level, plumbing and electrical fit-off, painting and make-good. They exclude major structural work, asbestos removal, body corporate fees, building approvals, temporary bathroom hire and premium product upgrades unless you select the relevant option.</p>
        <div class="table-wrap"><table class="price-table">
          <thead><tr><th scope="col">Included</th><th scope="col">Excluded or optional</th></tr></thead>
          <tbody>
            <tr><td>Strip-out, protection and waste removal</td><td>Asbestos testing and licensed removal</td></tr>
            <tr><td>Standard substrate repair</td><td>Major structural or floor replacement</td></tr>
            <tr><td>AS 3740 waterproofing and certificate</td><td>Body corporate fees and approvals</td></tr>
            <tr><td>Wall and floor tiling to standard areas</td><td>Imported or premium feature tiles</td></tr>
            <tr><td>Plumbing and electrical fit-off</td><td>New circuits or major relocations</td></tr>
            <tr><td>Standard vanity, tapware, toilet and screen</td><td>Custom joinery and smart fixtures</td></tr>
            <tr><td>Externally ducted exhaust fan</td><td>Ducted air conditioning or skylights</td></tr>
            <tr><td>Painting and make-good within the room</td><td>Work outside the bathroom footprint</td></tr>
          </tbody>
        </table></div>
        <h2>Why the range is wide</h2>
        <p>A range is honest because a bathroom is a concealed construction site. Until the tiles come off, nobody knows whether the sheeting is sound, whether the framing has rotted or whether the previous waterproofing was compliant. A builder who gives you a single fixed number without inspecting the room is either guessing or planning to recover the difference later. We would rather explain the variables now.</p>
        <h2>Next step</h2>
        <p>Call us with your estimate, your suburb and any photos you have. We will tell you whether the number looks realistic for the scope and arrange an on-site measure if you want to proceed. There is no obligation and no pressure to sign on the day.</p>
      </div>
      <aside class="sidebar" aria-label="Related planning pages">
        <div class="sidebar-card">
          <h3>Related planning</h3>
          <ul class="sidebar-list">
            <li><a href="/cost-guide/">Full cost guide ${icons.chevron(14)}</a></li>
            <li><a href="/how-it-works/">How it works ${icons.chevron(14)}</a></li>
            <li><a href="/choosing-a-contractor/">Choosing a contractor ${icons.chevron(14)}</a></li>
            <li><a href="/get-a-quote/">Request a quote ${icons.chevron(14)}</a></li>
          </ul>
        </div>
        <div class="sidebar-card">
          <h3>Browse services</h3>
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

${faqSection(calcFaqs, {
  title: "Cost calculator questions",
  eyebrow: "How it works",
  intro: "What the estimate includes, what it cannot know and how to turn it into a real quote.",
})}

${ctaBand({
  title: "Ready for a real number?",
  text: `Call ${site.phoneDisplay} and we will talk through your room, your budget and the likely scope before arranging an on-site measure.`,
})}
`;

  return {
    path: "/bathroom-renovation-cost-calculator/",
    title: "Bathroom Renovation Cost Calculator Brisbane | Ace Bathrooms",
    description:
      "Estimate your Brisbane bathroom renovation cost with our calculator. Adjust project type, size, finish and access for an indicative budget. Call (07) 8590 6941.",
    image: images.small,
    body,
    crumbs: [{ name: "Cost Calculator", url: "/bathroom-renovation-cost-calculator/" }],
    schema: [
      faqSchema(calcFaqs),
      {
        "@type": "WebApplication",
        "@id": `${site.domain}/bathroom-renovation-cost-calculator/#app`,
        name: "Bathroom Renovation Cost Calculator Brisbane",
        url: `${site.domain}/bathroom-renovation-cost-calculator/`,
        applicationCategory: "BusinessApplication",
        operatingSystem: "All",
        browserRequirements: "Requires JavaScript",
        offers: { "@type": "Offer", price: "0", priceCurrency: "AUD" },
        provider: { "@id": `${site.domain}/#organization` },
      },
    ],
  };
}
