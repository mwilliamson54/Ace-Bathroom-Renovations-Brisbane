import { services } from "./services.mjs";
import { locations, regionHubs } from "./locations.mjs";

export const staticPages = [
  { path: "/", label: "Home", group: "Company", title: "Bathroom Renovations Brisbane" },
  { path: "/about/", label: "About Us", group: "Company", title: "About Ace Bathroom Renovations" },
  { path: "/services/", label: "All Services", group: "Services", title: "Bathroom Renovation Services" },
  { path: "/locations/", label: "All Locations", group: "Locations", title: "Service Areas" },
  { path: "/cost-guide/", label: "Cost Guide", group: "Planning", title: "Bathroom Renovation Cost Guide" },
  { path: "/bathroom-renovation-cost-calculator/", label: "Cost Calculator", group: "Planning", title: "Cost Calculator" },
  { path: "/get-a-quote/", label: "Get a Quote", group: "Planning", title: "Request a Quote" },
  { path: "/contact/", label: "Contact", group: "Company", title: "Contact Us" },
  { path: "/gallery/", label: "Gallery", group: "Company", title: "Renovation Gallery" },
  { path: "/reviews/", label: "Reviews & Referees", group: "Company", title: "Reviews and Referees" },
  { path: "/our-process/", label: "Our Process", group: "Company", title: "Our Renovation Process" },
  { path: "/how-it-works/", label: "How It Works", group: "Company", title: "How It Works" },
  { path: "/choosing-a-contractor/", label: "Choosing a Contractor", group: "Company", title: "Choosing a Contractor" },
  { path: "/contractor-standards/", label: "Contractor Standards", group: "Company", title: "Our Standards" },
  { path: "/faqs/", label: "FAQs", group: "Company", title: "Frequently Asked Questions" },
  { path: "/warranty-and-certificates/", label: "Warranty & Certificates", group: "Company", title: "Warranty and Certificates" },
  { path: "/quality/waterproofing/", label: "Waterproofing Quality", group: "Company", title: "Waterproofing Quality" },
  { path: "/blog/", label: "Guides & Articles", group: "Company", title: "Renovation Guides" },
  { path: "/blog/bathroom-renovation-contracts-queensland/", label: "Queensland Contracts", group: "Guides", title: "Bathroom Renovation Contracts" },
  { path: "/blog/how-to-check-a-qbcc-licence/", label: "Check a QBCC Licence", group: "Guides", title: "How to Check a QBCC Licence" },
  { path: "/blog/waterproofing-compliance-certificates-queensland/", label: "Waterproofing Certificates", group: "Guides", title: "Waterproofing Certificates" },
  { path: "/blog/bathroom-renovation-timeline-brisbane/", label: "Renovation Timeline", group: "Guides", title: "Bathroom Renovation Timeline" },
  { path: "/privacy-policy/", label: "Privacy Policy", group: "Legal", title: "Privacy Policy" },
  { path: "/terms-of-service/", label: "Terms of Service", group: "Legal", title: "Terms of Service" },
];

export const servicePages = services.map((s) => ({
  path: `/services/${s.slug}/`,
  label: s.name,
  group: "Services",
  title: s.h1,
}));

export const locationPages = [
  ...locations.map((l) => ({
    path: `/${l.slug}/`,
    label: l.suburb,
    group: "Locations",
    title: l.h1,
    suburb: true,
  })),
  ...regionHubs.map((l) => ({
    path: `/${l.slug}/`,
    label: l.suburb.replace("Brisbane ", ""),
    group: "Locations",
    title: l.h1,
    region: true,
  })),
];

export const allPages = [...staticPages, ...servicePages, ...locationPages];

export const directoryGroups = [
  { name: "Services", pages: allPages.filter((p) => p.group === "Services") },
  { name: "Suburbs", pages: allPages.filter((p) => p.suburb) },
  { name: "Regions", pages: allPages.filter((p) => p.region) },
  { name: "Planning", pages: allPages.filter((p) => p.group === "Planning") },
  { name: "Company", pages: allPages.filter((p) => p.group === "Company" && p.path !== "/") },
  { name: "Guides", pages: allPages.filter((p) => p.group === "Guides") },
];

export const legal = allPages.filter((p) => p.group === "Legal");

export const pageByPath = Object.fromEntries(allPages.map((p) => [p.path, p]));
