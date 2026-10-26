const s = (paths, size = 20, extra = "") =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"${extra}>${paths}</svg>`;

export const icons = {
  phone: (n = 20) => s('<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>', n),
  mail: (n = 20) => s('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>', n),
  clock: (n = 20) => s('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>', n),
  pin: (n = 20) => s('<path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>', n),
  arrow: (n = 16) => s('<path d="M5 12h14M13 6l6 6-6 6"/>', n),
  chevron: (n = 16) => s('<path d="m9 18 6-6-6-6"/>', n),
  check: (n = 18) => s('<path d="m20 6-11 11-5-5"/>', n, ' stroke-width="2.2"'),
  shield: (n = 22) => s('<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>', n),
  droplet: (n = 22) => s('<path d="M12 2.7 5.6 9.1a9 9 0 1 0 12.8 0L12 2.7z"/><path d="M9 14a3 3 0 0 0 3 3"/>', n),
  ruler: (n = 22) => s('<path d="M3 15 15 3l6 6L9 21z"/><path d="m7 11 2 2M11 7l2 2M15 15l2 2"/>', n),
  hammer: (n = 22) => s('<path d="m14 5 5 5M3 21l7.5-7.5M13 3l8 8-3 3-8-8z"/><path d="M3 21h4v-4"/>', n),
  sparkle: (n = 22) => s('<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M18.4 5.6l-2.8 2.8M8.4 15.6l-2.8 2.8"/>', n),
  home: (n = 22) => s('<path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>', n),
  building: (n = 22) => s('<rect x="4" y="2" width="16" height="20" rx="1"/><path d="M9 6h1M14 6h1M9 10h1M14 10h1M9 14h1M14 14h1M10 22v-4h4v4"/>', n),
  bath: (n = 22) => s('<path d="M3 12h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z"/><path d="M5 12V6a3 3 0 0 1 6 0M7 22l-1-3M17 22l1-3"/>', n),
  trowel: (n = 22) => s('<path d="m14 4 6 6-7 7-6-6z"/><path d="m7 11-4 9 9-4"/>', n),
  accessible: (n = 22) => s('<circle cx="12" cy="4.5" r="2"/><path d="M12 7v6h5M12 9h5M12 13l-2 8M12 13l3 3 4 1"/>', n),
  star: (n = 18) => s('<path d="m12 2 3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/>', n, ' fill="none"'),
  document: (n = 22) => s('<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h6"/>', n),
  users: (n = 22) => s('<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>', n),
  calendar: (n = 22) => s('<rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>', n),
  search: (n = 22) => s('<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>', n),
  menu: (n = 22) => s('<path d="M4 7h16M4 12h16M4 17h16"/>', n),
  close: (n = 22) => s('<path d="M6 6l12 12M18 6 6 18"/>', n),
  quote: (n = 22) => s('<path d="M4 5h16v11H8l-4 4z"/><path d="M8 9h8M8 12h5"/>', n),
  handshake: (n = 22) => s('<path d="m11 17 2 2 4-4M3 11l4-4 4 4 3-3 4 4M3 11v5a2 2 0 0 0 2 2h2M21 11v5a2 2 0 0 1-2 2h-2"/>', n),
  leaf: (n = 22) => s('<path d="M11 20A7 7 0 0 1 4 13c0-5 4-9 16-9 0 12-4 16-9 16z"/><path d="M4 21c3-8 7-11 13-13"/>', n),
};

export function logoMark(className = "brand__mark") {
  return `<svg class="${className}" viewBox="0 0 48 48" role="img" aria-hidden="true" focusable="false">
    <rect width="48" height="48" rx="3" fill="#004155"/>
    <path d="M24 8 12 38h6.6l2.3-6h6.2l2.3 6H36L24 8zm0 12.4 3.1 8.1h-6.2L24 20.4z" fill="#fff"/>
    <path d="M39 14c0 4-3 6.5-5.5 9-1.4-2.5-3.5-5-3.5-9a4.5 4.5 0 0 1 9 0z" fill="#1F99D8" opacity=".95"/>
  </svg>`;
}
