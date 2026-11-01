/**
 * Public origin for canonical URLs, Open Graph tags, schema @id values and the sitemap.
 */
const envOrigin =
  process.env.SITE_ORIGIN ||
  process.env.CUSTOM_DOMAIN ||
  process.env.SITE_URL ||
  process.env.DOMAIN ||
  process.env.PUBLIC_SITE_URL ||
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.VITE_SITE_URL;

const origin = (envOrigin || "https://acebathroomrenovationsbrisbane.com").replace(/\/+$/, "").replace(/\/$/, "");

export const site = {
  name: "Ace Bathroom Renovations Brisbane",
  shortName: "Ace Bathroom Renovations",
  legalName: "Ace Bathroom Renovations Brisbane",
  brandLine1: "ACE",
  brandLine2: "BATHROOM RENOVATIONS",
  brandLine3: "BRISBANE",
  domain: origin,
  phoneDisplay: "(07) 8590 6941",
  phoneHref: "tel:+61785906941",
  phoneIntl: "+61785906941",
  email: "AceBathroomRenovationsBrisbane@gmail.com",
  emailHref: "mailto:AceBathroomRenovationsBrisbane@gmail.com",
  hoursShort: "Open 7am–10pm, 7 days",
  hoursLong: "Monday to Sunday, 7:00am – 10:00pm",
  hoursSchema: "Mo-Su 07:00-22:00",
  address: {
    street: "63 Sedgebrook St",
    suburb: "Spring Hill",
    state: "QLD",
    postcode: "4000",
    country: "Australia",
    countryCode: "AU",
    display: "63 Sedgebrook St, Spring Hill QLD 4000, Australia",
    lat: -27.4612,
    lng: 153.0270,
  },
  licence: {
    number: "17347609",
    label: "QBCC Licence 17347609",
    verifyUrl: "https://my.qbcc.qld.gov.au/myQBCC/s/qbcc-licensee-register",
    categories: [
      "Builder Restricted to Kitchen, Bathroom and Laundry",
      "Certificate III in Wall and Floor Tiling (CPC31320)",
      "Certificate III in Construction Waterproofing (CPC31420)",
    ],
  },
  serviceRadius: "Greater Brisbane, within approximately 35 km of the Brisbane CBD",
  mapEmbed: "https://www.google.com/maps?q=Brisbane%20QLD%2C%20Australia&output=embed",
  mapLink: "https://www.google.com/maps/place/Brisbane+QLD,+Australia",
};

export const images = {
  hero: "/images/hero-bathroom.webp",
  heroAlt: "Contemporary Brisbane bathroom renovation with large-format tiling, walk-in shower and timber vanity",
  ensuite: "/images/ensuite.webp",
  small: "/images/small-bathroom.webp",
  laundry: "/images/laundry.webp",
  kitchen: "/images/kitchen.webp",
  waterproofing: "/images/waterproofing.webp",
  tiling: "/images/tiling.webp",
  accessible: "/images/accessible.webp",
  apartment: "/images/apartment.webp",
  queenslander: "/images/queenslander.webp",
  commercial: "/images/commercial.webp",
  full: "/images/full-bathroom.webp",
  about: "/images/about-team.webp",
  process: "/images/process.webp",
  gallery1: "/images/gallery-1.webp",
  gallery2: "/images/gallery-2.webp",
  gallery3: "/images/gallery-3.webp",
  gallery4: "/images/gallery-4.webp",
  gallery5: "/images/gallery-5.webp",
  gallery6: "/images/gallery-6.webp",
  og: "/images/og-image.png",
};

export const navigation = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about/" },
  { label: "Services", href: "/services/" },
  { label: "Locations", href: "/locations/" },
  { label: "Cost Guide", href: "/cost-guide/" },
  { label: "Gallery", href: "/gallery/" },
  { label: "Contact", href: "/contact/" },
];

export const legalPages = ["/privacy-policy/", "/terms-of-service/", "/404.html"];

export const trustPoints = [
  { title: "QBCC licensed", text: "Builder Restricted to Kitchen, Bathroom and Laundry." },
  { title: "Waterproofing certified", text: "AS 3740 membrane systems with compliance documentation." },
  { title: "One team, start to finish", text: "No subcontractor roulette. We manage every trade." },
  { title: "Written fixed scope", text: "Itemised quotes and variations agreed before work starts." },
];

export const serviceHighlights = [
  "Free on-site measure and written quote",
  "QBCC licensed builder and waterproofing",
  "Design help, tile selection and project management",
  "Workmanship warranty and waterproofing certificate",
];
