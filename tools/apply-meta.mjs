import { readFileSync, writeFileSync } from 'node:fs';

const edits = [
  // Titles
  ['src/pages/about.mjs', 'About Ace Bathroom Renovations Brisbane | QBCC Licensed Builder', 'About Ace Bathroom Renovations Brisbane | QBCC Builder'],
  ['src/pages/contact.mjs', 'Contact Ace Bathroom Renovations Brisbane | Call (07) 8590 6941', 'Contact Ace Bathrooms Brisbane | Call (07) 8590 6941'],
  ['src/pages/company.mjs', 'Bathroom Renovation Gallery Brisbane | Ace Bathroom Renovations', 'Bathroom Renovation Gallery Brisbane | Ace Bathrooms'],
  ['src/pages/planning.mjs', 'Bathroom Renovation Cost Brisbane 2026 | Ace Bathroom Renovations', 'Bathroom Renovation Cost Brisbane 2026 | Ace Bathrooms'],
  ['src/pages/hubs.mjs', 'Bathroom Renovation Services Brisbane | Ace Bathroom Renovations', 'Bathroom Renovation Services Brisbane | Ace Bathrooms'],
  ['src/pages/hubs.mjs', 'Bathroom Renovation Locations Brisbane | Ace Bathroom Renovations', 'Bathroom Renovation Locations Brisbane | Ace Bathrooms'],
  ['src/pages/blog.mjs', 'Bathroom Renovation Guides Brisbane | Ace Bathroom Renovations', 'Bathroom Renovation Guides Brisbane | Ace Bathrooms'],
  ['src/pages/blog.mjs', 'Bathroom Renovation Contracts Queensland | What to Check | Ace', 'Bathroom Renovation Contracts Queensland | Ace Bathrooms'],
  ['src/data/services.mjs', 'Small Bathroom Renovation Brisbane | Compact Bathroom Specialists', 'Small Bathroom Renovation Brisbane | Ace Bathrooms'],
  ['src/data/services.mjs', 'Bathroom Waterproofing Brisbane | AS 3740 & Compliance Certificates', 'Bathroom Waterproofing Brisbane | AS 3740 & Certificates'],
  ['src/data/services.mjs', 'Accessible Bathroom Modifications Brisbane | NDIS-Friendly Design', 'Accessible Bathroom Modifications Brisbane | QBCC'],
  ['src/data/services.mjs', 'Apartment Bathroom Renovation Brisbane | Body Corporate Approvals', 'Apartment Bathroom Renovation Brisbane | Body Corporate'],
  ['src/data/services.mjs', 'Queenslander Bathroom Renovation Brisbane | Character Home Specialists', 'Queenslander Bathroom Renovation Brisbane | Ace Bathrooms'],
  ['src/data/services.mjs', 'Commercial Bathroom Renovation Brisbane | Offices, Cafes & Retail', 'Commercial Bathroom Renovation Brisbane | Ace Bathrooms'],

  // Descriptions
  ['src/pages/home.mjs',
    'Bathroom renovations Brisbane done properly. QBCC licensed builder for full bathrooms, ensuites, laundries and kitchens. Waterproofing, tiling and fit-off by one team. Call (07) 8590 6941.',
    'QBCC licensed bathroom renovations Brisbane. Full bathrooms, ensuites, laundries and kitchens, waterproofed and tiled by one team. Call (07) 8590 6941.'],
  ['src/pages/about.mjs',
    'Meet the Brisbane team behind Ace Bathroom Renovations. QBCC licensed builder, AS 3740 waterproofing and one accountable team from measure to handover. Call (07) 8590 6941.',
    'Meet the Brisbane team behind Ace Bathroom Renovations. QBCC licensed, AS 3740 waterproofing and one team from measure to handover. Call (07) 8590 6941.'],
  ['src/pages/planning.mjs',
    'Estimate your Brisbane bathroom renovation cost with our free calculator. Adjust project type, size, finish, layout and access for an indicative budget range. Call (07) 8590 6941.',
    'Estimate your Brisbane bathroom renovation cost with our calculator. Adjust project type, size, finish and access for an indicative budget. Call (07) 8590 6941.'],
  ['src/data/locations.mjs',
    'Bathroom renovations in Aspley for low-set brick homes and family houses. Full rebuilds, ensuites, waterproofing and tiling by a QBCC licensed builder. Call (07) 8590 6941.',
    'Bathroom renovations in Aspley for low-set brick family homes. Rebuilds, ensuites, waterproofing and tiling by a QBCC licensed builder. Call (07) 8590 6941.'],
  ['src/data/locations.mjs',
    'Bathroom renovations in Chermside by a QBCC licensed builder. Full rebuilds, ensuites, waterproofing and tiling for post-war and modern homes. Call (07) 8590 6941.',
    'Bathroom renovations in Chermside for post-war and modern homes. Full rebuilds, ensuites, waterproofing and tiling. QBCC licensed. Call (07) 8590 6941.'],
  ['src/data/locations.mjs',
    'Bathroom renovations in Geebung for cottages, post-war homes and townhouses. Waterproofing, tiling and full rebuilds by a QBCC licensed builder. Call (07) 8590 6941.',
    'Bathroom renovations in Geebung for cottages, post-war homes and townhouses. Waterproofing, tiling and rebuilds by a QBCC licensed builder. Call (07) 8590 6941.'],
  ['src/pages/company.mjs',
    'Our bathroom contractor standards: QBCC licensing, AS 3740 waterproofing, tiling tolerances, ventilation, site protection and documented handover. Call (07) 8590 6941.',
    'Our bathroom standards: QBCC licensing, AS 3740 waterproofing, tiling tolerances, ventilation, site protection and documented handover. Call (07) 8590 6941.'],
  ['src/pages/planning.mjs',
    'Bathroom renovation cost guide for Brisbane. Realistic 2026 ranges, budget breakdowns, hidden costs and how to compare quotes. QBCC licensed builder. Call (07) 8590 6941.',
    'Bathroom renovation costs in Brisbane: 2026 ranges, budget breakdowns, hidden costs and how to compare quotes. QBCC licensed builder. Call (07) 8590 6941.'],
  ['src/pages/faqs.mjs',
    'Answers to common Brisbane bathroom renovation questions: cost, timing, licensing, waterproofing, warranties, service areas and how to start. Call (07) 8590 6941.',
    'Answers to common Brisbane bathroom renovation questions: cost, timing, licensing, waterproofing, warranties and service areas. Call (07) 8590 6941.'],
  ['src/pages/company.mjs',
    'Bathroom renovation ideas and gallery for Brisbane homes. Representative layouts for bathrooms, ensuites, laundries, kitchens and accessible bathrooms. Call (07) 8590 6941.',
    'Bathroom renovation ideas for Brisbane homes. Representative layouts for bathrooms, ensuites, laundries, kitchens and accessible bathrooms. Call (07) 8590 6941.'],
  ['src/pages/contact.mjs',
    'Request a free bathroom renovation quote in Brisbane. On-site measure, itemised written scope and a straightforward conversation with a QBCC licensed builder. Call (07) 8590 6941.',
    'Request a free bathroom quote in Brisbane. On-site measure, itemised written scope and a conversation with a QBCC licensed builder. Call (07) 8590 6941.'],
  ['src/pages/company.mjs',
    'A plain-English guide to how a Brisbane bathroom renovation works: measure, quote, selections, construction, waterproofing, handover and aftercare. Call (07) 8590 6941.',
    'A plain-English guide to how a Brisbane bathroom renovation works: measure, quote, selections, construction, waterproofing and handover. Call (07) 8590 6941.'],
  ['src/pages/hubs.mjs',
    "Bathroom renovations across Greater Brisbane, including Chermside, Coorparoo, Yeronga, Indooroopilly, Spring Hill and surrounding suburbs. QBCC licensed builder. Call (07) 8590 6941.",
    'Bathroom renovations across Greater Brisbane, including Chermside, Coorparoo, Yeronga, Indooroopilly, Spring Hill and nearby suburbs. Call (07) 8590 6941.'],
  ['src/pages/company.mjs',
    'See our Brisbane bathroom renovation process: measure, written scope, selections, waterproofing, tiling, fit-off and handover. One accountable team. Call (07) 8590 6941.',
    'Our Brisbane bathroom renovation process: measure, written scope, selections, waterproofing, tiling and handover. One accountable team. Call (07) 8590 6941.'],
  ['src/pages/company.mjs',
    'How we waterproof Brisbane bathrooms: AS 3740 preparation, membrane application, flood testing and compliance certificates. QBCC licensed builder. Call (07) 8590 6941.',
    'How we waterproof Brisbane bathrooms: AS 3740 preparation, membrane application, flood testing and compliance certificates. Call (07) 8590 6941.'],
  ['src/pages/company.mjs',
    'Our honest review policy: no invented testimonials or fake review markup. Ask for a Brisbane referee, sample contract and waterproofing documentation. Call (07) 8590 6941.',
    'Our honest review policy: no invented testimonials or fake review markup. Ask for a Brisbane referee and waterproofing documentation. Call (07) 8590 6941.'],
  ['src/pages/hubs.mjs',
    'Explore bathroom renovation services in Brisbane: full bathrooms, ensuites, small bathrooms, laundries, kitchens, waterproofing, tiling and accessible modifications. QBCC licensed. Call (07) 8590 6941.',
    'Brisbane bathroom renovation services: bathrooms, ensuites, small rooms, laundries, kitchens, waterproofing and tiling. QBCC licensed. Call (07) 8590 6941.'],
  ['src/data/services.mjs',
    'Apartment and body corporate bathroom renovations in Brisbane. Approval documentation, quiet work practices, lift and access planning. QBCC licensed. Call (07) 8590 6941.',
    'Apartment and body corporate bathroom renovations in Brisbane. Approval documentation, quiet work practices and lift access planning. Call (07) 8590 6941.'],
  ['src/data/services.mjs',
    'Commercial bathroom renovations in Brisbane for offices, cafes, retail and small business. After-hours work, durable finishes and compliance documentation. Call (07) 8590 6941.',
    'Commercial bathroom renovations in Brisbane for offices, cafes and retail. After-hours work, durable finishes and compliance documentation. Call (07) 8590 6941.'],
  ['src/data/services.mjs',
    'Ensuite renovations in Brisbane designed for privacy, storage and low maintenance. QBCC licensed builder, full waterproofing and written fixed quotes. Call (07) 8590 6941.',
    'Ensuite renovations in Brisbane designed for privacy, storage and low maintenance. QBCC licensed, full waterproofing and fixed quotes. Call (07) 8590 6941.'],
  ['src/data/services.mjs',
    'Complete bathroom renovations in Brisbane by a QBCC licensed builder. Strip-out, waterproofing, tiling, plumbing and fit-off managed by one team. Call (07) 8590 6941.',
    'Complete bathroom renovations in Brisbane by a QBCC licensed builder. Strip-out, waterproofing, tiling, plumbing and fit-off by one team. Call (07) 8590 6941.'],
  ['src/data/services.mjs',
    'Kitchen renovations in Brisbane by a QBCC licensed builder restricted to kitchen, bathroom and laundry work. Cabinetry, stone, tiling and plumbing coordinated. Call (07) 8590 6941.',
    'Kitchen renovations in Brisbane by a QBCC licensed builder. Cabinetry, stone, tiling and plumbing coordinated from design to fit-off. Call (07) 8590 6941.'],
  ['src/data/services.mjs',
    'Laundry renovations in Brisbane with smart storage, durable wet-area finishes and coordinated plumbing. QBCC licensed builder. Call (07) 8590 6941 for a written quote.',
    'Laundry renovations in Brisbane with smart storage, durable wet-area finishes and coordinated plumbing. QBCC licensed builder. Call (07) 8590 6941.'],
  ['src/data/services.mjs',
    'Bathroom and kitchen renovations for Brisbane Queenslander homes. Respectful character detailing, timber floors, VJ walls and modern waterproofing. Call (07) 8590 6941.',
    'Bathroom and kitchen renovations for Brisbane Queenslander homes. Character detailing, VJ walls and modern waterproofing. Call (07) 8590 6941.'],
  ['src/data/services.mjs',
    'Small and compact bathroom renovations in Brisbane. Clever layouts, storage and light for 3-5 sqm rooms. QBCC licensed, fixed written quotes. Call (07) 8590 6941.',
    'Small and compact bathroom renovations in Brisbane. Clever layouts, storage and light for 3-5 sqm rooms. QBCC licensed. Call (07) 8590 6941.'],
  ['src/data/services.mjs',
    'Bathroom tiling in Brisbane by a licensed tiler with Certificate III in Wall and Floor Tiling. Large format, mitred edges, niches and waterproof-safe detailing. Call (07) 8590 6941.',
    'Bathroom tiling in Brisbane by a licensed tiler with Certificate III in Wall and Floor Tiling. Large format, mitred edges, niches. Call (07) 8590 6941.'],
  ['src/data/services.mjs',
    'Bathroom waterproofing in Brisbane to AS 3740 with compliance certificates. Licensed waterproofer, flood testing and documented application. Call (07) 8590 6941.',
    'Bathroom waterproofing in Brisbane to AS 3740, with flood testing, documented application and compliance certificates. Call (07) 8590 6941.'],
  ['src/pages/company.mjs',
    'What you receive at handover: waterproofing certificate, plumbing and electrical documentation, workmanship warranty and care guide. Brisbane QBCC licensed builder. Call (07) 8590 6941.',
    'What you receive at handover: waterproofing certificate, plumbing and electrical documentation, workmanship warranty and care guide. Call (07) 8590 6941.'],
  ['src/pages/blog.mjs',
    'Queensland bathroom renovation contracts explained: written contract requirements, deposits, progress payments, variations, insurance and handover. Call (07) 8590 6941.',
    'Queensland bathroom renovation contracts explained: written requirements, deposits, progress payments, variations, insurance and handover. Call (07) 8590 6941.'],
  ['src/pages/blog.mjs',
    'A realistic Brisbane bathroom renovation timeline: 10–15 days on site, 6–12 weeks total, stage-by-stage sequence, delays and how to keep decisions on track. Call (07) 8590 6941.',
    'A realistic Brisbane bathroom renovation timeline: 10-15 days on site, 6-12 weeks total, stage-by-stage sequence and common delays. Call (07) 8590 6941.'],
  ['src/pages/blog.mjs',
    'Practical Brisbane bathroom renovation guides: Queensland contracts, QBCC licence checks, waterproofing certificates and realistic timelines. QBCC licensed builder. Call (07) 8590 6941.',
    'Brisbane bathroom renovation guides: Queensland contracts, QBCC licence checks, waterproofing certificates and realistic timelines. Call (07) 8590 6941.'],
  ['src/pages/company.mjs',
    'How to choose a bathroom renovation contractor in Brisbane: licence checks, insurance, written contracts, quote comparison, waterproofing and red flags. Call (07) 8590 6941.',
    'How to choose a bathroom contractor in Brisbane: licence checks, insurance, written contracts, quote comparison and red flags. Call (07) 8590 6941.'],
];

const byFile = new Map();
for (const [file, from, to] of edits) {
  if (!byFile.has(file)) byFile.set(file, []);
  byFile.get(file).push([from, to]);
}
let failed = 0;
for (const [file, pairs] of byFile) {
  let text = readFileSync(file, 'utf8');
  for (const [from, to] of pairs) {
    const count = text.split(from).length - 1;
    if (count !== 1) {
      console.error(`FAIL (${count}x) in ${file}: ${from.slice(0, 70)}`);
      failed++;
      continue;
    }
    text = text.replace(from, to);
  }
  writeFileSync(file, text);
}
// Location titles: shorten brand suffix on every title line.
{
  const file = 'src/data/locations.mjs';
  let text = readFileSync(file, 'utf8');
  const before = text;
  text = text.replace(/ \| Ace Bathroom Renovations Brisbane"/g, ' | Ace Bathrooms"');
  text = text.replace(/ \| Ace Bathroom Renovations"/g, ' | Ace Bathrooms"');
  if (text === before) { console.error('FAIL location title suffix'); failed++; }
  writeFileSync(file, text);
}
console.log(failed ? `${failed} failed edits` : 'all meta edits applied');
process.exitCode = failed ? 1 : 0;
