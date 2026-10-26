import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const OUT = path.join(process.cwd(), "public", "images");
await mkdir(OUT, { recursive: true });

const palettes = {
  teal: { wall: "#e7f1f4", wall2: "#d6e7ec", floor: "#cfdde2", cabinet: "#0b5568", stone: "#f7fbfc", accent: "#1f99d8", metal: "#b9c7cb", plant: "#4f8c6b" },
  sand: { wall: "#f4eee7", wall2: "#e9dfd3", floor: "#d9cbbd", cabinet: "#8b6a4e", stone: "#fbf8f4", accent: "#1f99d8", metal: "#c4b7a8", plant: "#5d8a63" },
  slate: { wall: "#e6eaec", wall2: "#d3dadd", floor: "#b9c3c7", cabinet: "#263b44", stone: "#f8fafb", accent: "#1f99d8", metal: "#aab8bd", plant: "#4f8c6b" },
  blue: { wall: "#e4eff7", wall2: "#d1e4f0", floor: "#c6d6df", cabinet: "#174b66", stone: "#f7fbfd", accent: "#1f99d8", metal: "#b4c6ce", plant: "#4c8a72" },
  warm: { wall: "#f2ece6", wall2: "#e6dcd0", floor: "#d6c9bb", cabinet: "#24525e", stone: "#fbf9f5", accent: "#d9a86c", metal: "#c7b9a9", plant: "#5a8a60" },
};

const defs = (p, id) => `<defs>
  <linearGradient id="wall-${id}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${p.wall2}"/><stop offset="1" stop-color="${p.wall}"/>
  </linearGradient>
  <linearGradient id="floor-${id}" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${p.floor}"/><stop offset="1" stop-color="#b8c8ce"/>
  </linearGradient>
  <linearGradient id="glass-${id}" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="#ffffff" stop-opacity=".48"/><stop offset="1" stop-color="#dff2f8" stop-opacity=".15"/>
  </linearGradient>
  <linearGradient id="sky-${id}" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#bfe3f2"/><stop offset="1" stop-color="#eef7f7"/>
  </linearGradient>
  <linearGradient id="stone-${id}" x1="0" y1="0" x2="1" y2="1">
    <stop offset="0" stop-color="${p.stone}"/><stop offset="1" stop-color="#e9f0f2"/>
  </linearGradient>
  <filter id="shadow-${id}" x="-30%" y="-30%" width="160%" height="160%">
    <feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="#0d3b47" flood-opacity=".16"/>
  </filter>
  <filter id="soft-${id}" x="-40%" y="-40%" width="180%" height="180%">
    <feGaussianBlur stdDeviation="22"/>
  </filter>
  <pattern id="tile-${id}" width="120" height="76" patternUnits="userSpaceOnUse">
    <rect width="120" height="76" fill="none"/>
    <path d="M0 0H120M0 76H120M0 0V76M120 0V76" stroke="#5f8894" stroke-opacity=".16" stroke-width="2"/>
  </pattern>
</defs>`;

function plant(x, y, scale = 1, p) {
  return `<g transform="translate(${x} ${y}) scale(${scale})">
    <ellipse cx="0" cy="112" rx="66" ry="12" fill="#123a45" opacity=".10"/>
    <path d="M-42 46h84l-10 64a16 16 0 0 1-16 14h-32a16 16 0 0 1-16-14z" fill="#d8c3ad"/>
    <path d="M-42 46h84l-3 20h-78z" fill="#c7ae95"/>
    <path d="M0 46C-8-6-30-36-54-48c2 34 18 70 46 94z" fill="${p.plant}"/>
    <path d="M2 48C8-2 30-42 58-52c0 38-20 76-50 100z" fill="#6aa07a"/>
    <path d="M-2 44C-22 8-46-4-64 2c18 26 40 44 60 54z" fill="#3f7656"/>
    <path d="M4 50C24 16 50 10 68 18c-14 24-36 40-62 50z" fill="#588f69"/>
  </g>`;
}

function vanity(x, y, w, p, id, opts = {}) {
  const double = opts.double;
  return `<g filter="url(#shadow-${id})">
    <rect x="${x}" y="${y}" width="${w}" height="150" rx="6" fill="${p.cabinet}"/>
    <rect x="${x + 12}" y="${y + 16}" width="${w - 24}" height="2" fill="#ffffff" opacity=".18"/>
    <line x1="${x + w / 2}" y1="${y + 16}" x2="${x + w / 2}" y2="${y + 134}" stroke="#ffffff" stroke-opacity=".14" stroke-width="2"/>
    <rect x="${x - 8}" y="${y - 18}" width="${w + 16}" height="24" rx="4" fill="url(#stone-${id})"/>
    <rect x="${x - 8}" y="${y + 4}" width="${w + 16}" height="8" fill="#9bb4bd" opacity=".35"/>
    <ellipse cx="${double ? x + w * 0.28 : x + w / 2}" cy="${y - 18}" rx="58" ry="15" fill="#ffffff"/>
    <ellipse cx="${double ? x + w * 0.28 : x + w / 2}" cy="${y - 21}" rx="46" ry="9" fill="#dfe9ec"/>
    <path d="M${double ? x + w * 0.28 : x + w / 2} ${y - 70}v34c0 10 8 14 18 14" stroke="${p.metal}" stroke-width="8" fill="none" stroke-linecap="round"/>
    ${double ? `<ellipse cx="${x + w * 0.72}" cy="${y - 18}" rx="58" ry="15" fill="#ffffff"/><ellipse cx="${x + w * 0.72}" cy="${y - 21}" rx="46" ry="9" fill="#dfe9ec"/><path d="M${x + w * 0.72} ${y - 70}v34c0 10 8 14 18 14" stroke="${p.metal}" stroke-width="8" fill="none" stroke-linecap="round"/>` : ""}
    <rect x="${x + w / 2 - 1}" y="${y + 36}" width="2" height="74" fill="#ffffff" opacity=".12"/>
  </g>`;
}

function mirror(cx, cy, r, p, id) {
  return `<g>
    <circle cx="${cx}" cy="${cy}" r="${r + 12}" fill="#ffffff" opacity=".38" filter="url(#soft-${id})"/>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="#dceef5" stroke="#ffffff" stroke-width="8"/>
    <circle cx="${cx}" cy="${cy}" r="${r - 14}" fill="none" stroke="#ffffff" stroke-opacity=".5" stroke-width="2"/>
    <path d="M${cx - r * 0.5} ${cy + r * 0.2}a${r * 0.55} ${r * 0.55} 0 0 1 ${r * 0.75} -${r * 0.45}" stroke="#ffffff" stroke-width="7" fill="none" opacity=".6" stroke-linecap="round"/>
  </g>`;
}

function shower(x, y, w, h, p, id, opts = {}) {
  return `<g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="4" fill="url(#glass-${id})" stroke="#ffffff" stroke-opacity=".85" stroke-width="5"/>
    <rect x="${x + 10}" y="${y + 10}" width="${w - 20}" height="${h - 20}" fill="none" stroke="#c7e0e8" stroke-opacity=".5" stroke-width="2"/>
    <line x1="${x + w - 4}" y1="${y + 4}" x2="${x + w - 4}" y2="${y + h}" stroke="#8fa9b2" stroke-width="7"/>
    <rect x="${x + w / 2 - 8}" y="${y - 54}" width="16" height="54" fill="${p.metal}"/>
    <rect x="${x + w / 2 - 74}" y="${y - 62}" width="148" height="14" rx="7" fill="${p.metal}"/>
    <circle cx="${x + w / 2}" cy="${y + 150}" r="13" fill="${p.metal}"/>
    <rect x="${x + w / 2 - 44}" y="${y + 240}" width="88" height="18" rx="9" fill="${p.metal}" opacity=".85"/>
    ${opts.niche ? `<rect x="${x + 24}" y="${y + 70}" width="86" height="112" rx="3" fill="#c7dde5" stroke="#ffffff" stroke-width="4"/><rect x="${x + 32}" y="${y + 78}" width="70" height="10" rx="4" fill="#ffffff" opacity=".45"/><rect x="${x + 32}" y="${y + 98}" width="44" height="10" rx="4" fill="#ffffff" opacity=".3"/>` : ""}
    ${opts.bench ? `<rect x="${x + w - 130}" y="${y + h - 118}" width="104" height="18" rx="6" fill="${p.stone}"/><rect x="${x + w - 122}" y="${y + h - 100}" width="12" height="100" fill="${p.metal}"/>` : ""}
    ${opts.rails ? `<path d="M${x + 24} ${y + 220}h120" stroke="#c9a24a" stroke-width="12" stroke-linecap="round"/><path d="M${x + 24} ${y + 220}v-100" stroke="#c9a24a" stroke-width="12" stroke-linecap="round"/>` : ""}
  </g>`;
}

function bath(x, y, w, p, id) {
  return `<g filter="url(#shadow-${id})">
    <path d="M${x} ${y}h${w}a38 38 0 0 1 38 38v54a64 64 0 0 1-64 64h-${w - 128}a64 64 0 0 1-64-64v-54a38 38 0 0 1 38-38z" fill="#ffffff"/>
    <path d="M${x + 26} ${y + 18}h${w - 52}v58a42 42 0 0 1-42 42h-${w - 136}a42 42 0 0 1-42-42z" fill="#bcdce8"/>
    <path d="M${x + 44} ${y + 26}h${w - 88}" stroke="#ffffff" stroke-width="8" opacity=".65" stroke-linecap="round"/>
    <rect x="${x + w - 40}" y="${y - 70}" width="10" height="84" rx="5" fill="${p.metal}"/>
    <path d="M${x + w - 36} ${y - 70}c42 0 58 20 58 42" stroke="${p.metal}" stroke-width="9" fill="none" stroke-linecap="round"/>
    <ellipse cx="${x + w / 2}" cy="${y + 178}" rx="${w * 0.4}" ry="14" fill="#0d3b47" opacity=".12"/>
  </g>`;
}

function windowBox(x, y, w, h, p, id, city = false) {
  return `<g>
    <rect x="${x - 14}" y="${y - 14}" width="${w + 28}" height="${h + 28}" rx="5" fill="#ffffff" opacity=".9"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="url(#sky-${id})"/>
    ${city
      ? `<g fill="#9fbfca" opacity=".65"><rect x="${x + 20}" y="${y + h - 150}" width="54" height="150"/><rect x="${x + 86}" y="${y + h - 220}" width="70" height="220"/><rect x="${x + 170}" y="${y + h - 180}" width="46" height="180"/><rect x="${x + 230}" y="${y + h - 260}" width="62" height="260"/><rect x="${x + 306}" y="${y + h - 140}" width="70" height="140"/><rect x="${x + 390}" y="${y + h - 200}" width="48" height="200"/></g>`
      : `<g><rect x="${x}" y="${y + h - 110}" width="${w}" height="110" fill="#8bb69a" opacity=".55"/><circle cx="${x + w * 0.2}" cy="${y + h - 130}" r="54" fill="#6fa083" opacity=".55"/><circle cx="${x + w * 0.72}" cy="${y + h - 150}" r="70" fill="#7eae8d" opacity=".45"/></g>`}
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#ffffff" stroke-width="9"/>
    <line x1="${x + w / 2}" y1="${y}" x2="${x + w / 2}" y2="${y + h}" stroke="#ffffff" stroke-width="7"/>
    <line x1="${x}" y1="${y + h * 0.42}" x2="${x + w}" y2="${y + h * 0.42}" stroke="#ffffff" stroke-width="7"/>
  </g>`;
}

function towel(x, y, p) {
  return `<g><rect x="${x}" y="${y}" width="120" height="9" rx="4" fill="${p.metal}"/><path d="M${x + 14} ${y + 6}h92v92c0 12-24 12-24 0V${y + 6}" fill="#ffffff" opacity=".9"/><path d="M${x + 52} ${y + 6}h54v82" stroke="#dce9ed" stroke-width="4" fill="none"/></g>`;
}

function light(cx, cy, p) {
  return `<g><line x1="${cx}" y1="0" x2="${cx}" y2="${cy - 26}" stroke="#7f9aa3" stroke-width="3"/><path d="M${cx - 34} ${cy + 18}c0-30 14-44 34-44s34 14 34 44z" fill="#f7fbfc"/><ellipse cx="${cx}" cy="${cy + 20}" rx="34" ry="8" fill="#fff5d8"/></g>`;
}

function bathroomScene({ id, p, bath: hasBath = false, showerOpts = {}, vanityW = 420, double = false, city = false, vj = false, commercial = false, accessible = false, compact = false }) {
  const winX = compact ? 1040 : 1100;
  const winW = compact ? 300 : 330;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
${defs(p, id)}
<rect width="1600" height="900" fill="url(#wall-${id})"/>
${vj ? `<g opacity=".35">${Array.from({ length: 34 }, (_, i) => `<line x1="${i * 50}" y1="0" x2="${i * 50}" y2="700" stroke="#b9a58f" stroke-width="2"/>`).join("")}</g>` : `<rect y="0" width="1600" height="700" fill="url(#tile-${id})"/>`}
<rect y="700" width="1600" height="200" fill="url(#floor-${id})"/>
<g opacity=".2" stroke="#5b7c87" stroke-width="2">${Array.from({ length: 9 }, (_, i) => `<line x1="${i * 200 - 100}" y1="900" x2="${i * 200 + 80}" y2="700"/>`).join("")}<line x1="0" y1="790" x2="1600" y2="790"/></g>
<rect y="694" width="1600" height="10" fill="#ffffff" opacity=".55"/>
${windowBox(winX, 130, winW, 300, p, id, city)}
${light(420, 160, p)}${light(760, 160, p)}
<ellipse cx="760" cy="760" rx="520" ry="46" fill="#0d3b47" opacity=".10" filter="url(#soft-${id})"/>
${accessible ? shower(120, 260, 470, 430, p, id, { niche: true, bench: true, rails: true }) : shower(120, 240, compact ? 350 : 430, compact ? 400 : 450, p, id, showerOpts)}
${hasBath ? bath(compact ? 600 : 620, 560, compact ? 360 : 430, p, id) : ""}
${commercial
    ? `<g>${[0, 1, 2].map((i) => vanity(600 + i * 300, 470, 240, p, id)).join("")}<rect x="560" y="300" width="960" height="8" fill="${p.metal}"/>${[0, 1, 2].map((i) => mirror(720 + i * 300, 290, 74, p, id)).join("")}</g>`
    : `${mirror(hasBath ? 1240 : 1180, 270, compact ? 76 : 96, p, id)}${vanity(hasBath ? 1010 : 950, 450, vanityW, p, id, { double })}`}
${!commercial && !accessible ? towel(760, 360, p) : ""}
${plant(520, 640, compact ? 1.1 : 1.35, p)}
<g opacity=".5"><rect x="0" y="0" width="1600" height="900" fill="none" stroke="#ffffff" stroke-width="20"/></g>
</svg>`;
}

function laundryScene({ id, p }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
${defs(p, id)}
<rect width="1600" height="900" fill="url(#wall-${id})"/>
<rect y="0" width="1600" height="700" fill="url(#tile-${id})"/>
<rect y="700" width="1600" height="200" fill="url(#floor-${id})"/>
${windowBox(1120, 150, 300, 280, p, id)}
<rect x="80" y="410" width="900" height="40" rx="6" fill="url(#stone-${id})" filter="url(#shadow-${id})"/>
<rect x="100" y="450" width="860" height="190" fill="${p.cabinet}"/>
<line x1="100" y1="540" x2="960" y2="540" stroke="#ffffff" stroke-opacity=".16" stroke-width="3"/>
${[0, 1].map((i) => `<g><rect x="${180 + i * 300}" y="500" width="220" height="120" rx="6" fill="#e9f1f3"/><circle cx="${290 + i * 300}" cy="560" r="36" fill="#b9d3dc" stroke="#ffffff" stroke-width="8"/><rect x="${190 + i * 300}" y="500" width="200" height="14" rx="7" fill="${p.metal}" opacity=".4"/></g>`).join("")}
<rect x="810" y="480" width="130" height="160" rx="6" fill="#173c48"/>
<rect x="826" y="496" width="98" height="46" rx="4" fill="#dfeef2"/>
<path d="M120 370h260M250 372v-70c0-14 10-24 24-24h80" stroke="${p.metal}" stroke-width="9" fill="none" stroke-linecap="round"/>
<rect x="112" y="330" width="250" height="80" rx="8" fill="#ffffff" opacity=".92"/>
<rect x="132" y="350" width="170" height="40" rx="4" fill="#bcdce8"/>
<g>${[0, 1, 2].map((i) => `<rect x="${1040 + i * 80}" y="420" width="56" height="210" rx="6" fill="#ffffff" opacity=".8"/><rect x="${1052 + i * 80}" y="436" width="32" height="90" rx="3" fill="${["#d7e7eb", "#c8a98a", "#a9c7c2"][i]}"/>`).join("")}</g>
${plant(1400, 610, 1.45, p)}
<rect x="0" y="0" width="1600" height="900" fill="none" stroke="#ffffff" stroke-width="20"/>
</svg>`;
}

function kitchenScene({ id, p }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
${defs(p, id)}
<rect width="1600" height="900" fill="url(#wall-${id})"/>
<rect y="0" width="1600" height="700" fill="url(#tile-${id})"/>
<rect y="700" width="1600" height="200" fill="url(#floor-${id})"/>
${windowBox(1060, 150, 360, 300, p, id)}
<rect x="60" y="180" width="720" height="330" fill="${p.cabinet}" filter="url(#shadow-${id})"/>
${[0, 1, 2, 3].map((i) => `<rect x="${90 + i * 172}" y="210" width="150" height="270" rx="4" fill="none" stroke="#ffffff" stroke-opacity=".18" stroke-width="3"/><rect x="${150 + i * 172}" y="330" width="30" height="4" rx="2" fill="#d9b77a"/>`).join("")}
<rect x="40" y="500" width="760" height="34" rx="4" fill="url(#stone-${id})"/>
<rect x="60" y="534" width="720" height="40" fill="#ffffff" opacity=".55"/>
<rect x="820" y="460" width="610" height="36" rx="6" fill="url(#stone-${id})" filter="url(#shadow-${id})"/>
<rect x="840" y="496" width="570" height="190" fill="${p.cabinet}"/>
<line x1="1125" y1="496" x2="1125" y2="686" stroke="#ffffff" stroke-opacity=".15" stroke-width="3"/>
<rect x="1110" y="330" width="10" height="120" rx="5" fill="${p.metal}"/>
<path d="M1112 330h-54c-16 0-28 12-28 28v18" stroke="${p.metal}" stroke-width="9" fill="none" stroke-linecap="round"/>
<rect x="880" y="400" width="300" height="60" rx="4" fill="#dfeef2"/>
<rect x="990" y="410" width="110" height="40" rx="3" fill="#8fb5c1"/>
<circle cx="1010" cy="455" r="20" fill="${p.metal}"/><circle cx="1080" cy="455" r="20" fill="${p.metal}"/>
${[0, 1, 2].map((i) => `<g><line x1="${360 + i * 260}" y1="0" x2="${360 + i * 260}" y2="120" stroke="#7f9aa3" stroke-width="3"/><path d="M${330 + i * 260} 160c0-28 14-40 30-40s30 12 30 40z" fill="#f7fbfc"/></g>`).join("")}
${plant(1440, 600, 1.25, p)}
<rect x="0" y="0" width="1600" height="900" fill="none" stroke="#ffffff" stroke-width="20"/>
</svg>`;
}

function tradeScene({ id, p, type }) {
  const isWaterproof = type === "waterproofing";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
${defs(p, id)}
<rect width="1600" height="900" fill="url(#wall-${id})"/>
<rect y="0" width="1600" height="900" fill="#eef5f6"/>
<g stroke="#b7ccd3" stroke-width="2" opacity=".7">${Array.from({ length: 18 }, (_, i) => `<line x1="0" y1="${i * 52}" x2="1600" y2="${i * 52}"/>`).join("")}${Array.from({ length: 24 }, (_, i) => `<line x1="${i * 72}" y1="0" x2="${i * 72}" y2="900"/>`).join("")}</g>
${isWaterproof
    ? `<path d="M160 180h1280v620H160z" fill="#2f8db3" opacity=".82"/><path d="M160 180h1280v620H160z" fill="url(#tile-${id})" opacity=".25"/><path d="M240 260h1120v460H240z" fill="#3a9dc4" opacity=".35" stroke="#ffffff" stroke-width="18"/><g><rect x="650" y="300" width="190" height="70" rx="8" fill="#cfe5ee"/><circle cx="745" cy="335" r="18" fill="#5b7c87"/><rect x="720" y="230" width="50" height="70" fill="#cfe5ee"/></g><g transform="rotate(-32 1180 470)"><rect x="1050" y="450" width="260" height="46" rx="20" fill="#f3d08b"/><rect x="1280" y="446" width="60" height="54" rx="10" fill="#8fa9b2"/></g><ellipse cx="420" cy="640" rx="120" ry="36" fill="#1d6d8c" opacity=".4"/><text x="230" y="250" font-family="Arial" font-size="44" fill="#ffffff" opacity=".9">AS 3740 WET AREA</text>`
    : `<path d="M160 520h1280v280H160z" fill="#cfdde2"/><path d="M160 520h1280v280H160z" fill="url(#tile-${id})" opacity=".4"/><g>${Array.from({ length: 5 }, (_, i) => `<rect x="${250 + i * 230}" y="${560 + (i % 2) * 60}" width="200" height="120" rx="3" fill="${["#e9f1f3", "#d7e7eb", "#c6dadf", "#f3f7f8"][i % 4]}" stroke="#9db5bd" stroke-width="2"/>`).join("")}</g><g transform="rotate(18 1120 340)"><rect x="960" y="320" width="300" height="60" rx="8" fill="#9fb4bb"/><rect x="940" y="370" width="340" height="18" rx="9" fill="#dce8eb"/></g><rect x="420" y="300" width="420" height="70" rx="5" fill="#ffffff" opacity=".8"/><text x="450" y="348" font-family="Arial" font-size="32" fill="#365c68">LARGE FORMAT TILING</text>`}
<rect x="0" y="0" width="1600" height="900" fill="none" stroke="#ffffff" stroke-width="20"/>
</svg>`;
}

function aboutScene({ id, p }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
${defs(p, id)}
<rect width="1600" height="900" fill="#eef5f6"/>
<rect x="0" y="620" width="1600" height="280" fill="#d6e2e6"/>
<g opacity=".22" stroke="#5b7c87" stroke-width="2">${Array.from({ length: 12 }, (_, i) => `<line x1="${i * 150 - 100}" y1="900" x2="${i * 150 + 90}" y2="620"/>`).join("")}</g>
<g filter="url(#shadow-${id})">
  <rect x="250" y="330" width="820" height="330" rx="26" fill="#ffffff"/>
  <rect x="250" y="330" width="820" height="90" rx="26" fill="${p.cabinet}"/>
  <rect x="250" y="390" width="820" height="30" fill="${p.cabinet}"/>
  <text x="640" y="390" text-anchor="middle" font-family="Arial" font-size="44" font-weight="bold" fill="#ffffff" letter-spacing="8">ACE</text>
  <rect x="330" y="470" width="300" height="150" rx="10" fill="#dceef5" stroke="#b7ccd3" stroke-width="4"/>
  <path d="M360 600l70-90 60 60 40-40 70 70z" fill="#8fb5c1"/>
  <circle cx="395" cy="515" r="22" fill="#f3d08b"/>
  <rect x="690" y="470" width="320" height="22" rx="6" fill="#9db5bd"/>
  <rect x="690" y="512" width="250" height="16" rx="6" fill="#c9d9de"/>
  <rect x="690" y="546" width="280" height="16" rx="6" fill="#c9d9de"/>
  <rect x="690" y="580" width="190" height="16" rx="6" fill="#c9d9de"/>
  <circle cx="365" cy="660" r="42" fill="#263b44"/><circle cx="475" cy="660" r="42" fill="#263b44"/>
</g>
<g transform="translate(1090 260)" filter="url(#shadow-${id})">
  <rect x="0" y="0" width="300" height="430" rx="16" fill="#ffffff"/>
  <rect x="24" y="28" width="252" height="48" rx="6" fill="${p.cabinet}"/>
  <rect x="46" y="110" width="160" height="12" rx="4" fill="#9db5bd"/>
  <rect x="46" y="142" width="208" height="10" rx="4" fill="#c9d9de"/>
  <rect x="46" y="170" width="180" height="10" rx="4" fill="#c9d9de"/>
  <rect x="46" y="214" width="130" height="70" rx="6" fill="#dceef5"/>
  <path d="M70 270l30-40 26 26 18-18 30 32z" fill="#8fb5c1"/>
  <rect x="46" y="320" width="208" height="10" rx="4" fill="#c9d9de"/>
  <circle cx="240" cy="380" r="34" fill="#1f99d8"/>
  <path d="M226 380l10 10 18-20" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>
</g>
${plant(1420, 640, 1.4, p)}
<rect x="0" y="0" width="1600" height="900" fill="none" stroke="#ffffff" stroke-width="20"/>
</svg>`;
}

function processScene({ id, p }) {
  const stages = [
    ["01", "MEASURE"],
    ["02", "SCOPE"],
    ["03", "BUILD"],
    ["04", "CERTIFY"],
    ["05", "HANDOVER"],
  ];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="1600" height="900">
${defs(p, id)}
<rect width="1600" height="900" fill="#eef5f6"/>
<rect x="100" y="120" width="1400" height="660" rx="24" fill="#ffffff" filter="url(#shadow-${id})"/>
<text x="160" y="220" font-family="Arial" font-size="34" font-weight="bold" fill="#004155">THE ACE RENOVATION PROCESS</text>
<line x1="190" y1="500" x2="1410" y2="500" stroke="#c9d9de" stroke-width="10" stroke-linecap="round"/>
${stages.map(([num, label], i) => `<g transform="translate(${210 + i * 295} 0)">
  <circle cx="0" cy="500" r="58" fill="${i === 0 ? "#1f99d8" : "#004155"}"/>
  <text x="0" y="515" text-anchor="middle" font-family="Arial" font-size="34" font-weight="bold" fill="#ffffff">${num}</text>
  <text x="0" y="610" text-anchor="middle" font-family="Arial" font-size="24" font-weight="bold" fill="#004155">${label}</text>
  <rect x="-52" y="645" width="104" height="8" rx="4" fill="#c9d9de"/>
</g>`).join("")}
<g opacity=".4">${[0, 1, 2].map((i) => `<rect x="${1180 + i * 40}" y="${220 + i * 34}" width="240" height="80" rx="10" fill="${["#dceef5", "#e9f1f3", "#f3d08b"][i]}"/>`).join("")}</g>
<rect x="0" y="0" width="1600" height="900" fill="none" stroke="#ffffff" stroke-width="20"/>
</svg>`;
}

const files = [];
function add(name, svg) {
  files.push([name, svg]);
}

add("hero-bathroom.svg", bathroomScene({ id: "hero", p: palettes.teal, bath: true, showerOpts: { niche: true }, vanityW: 430 }));
add("full-bathroom.svg", bathroomScene({ id: "full", p: palettes.blue, bath: true, showerOpts: { niche: true }, vanityW: 410 }));
add("ensuite.svg", bathroomScene({ id: "ens", p: palettes.slate, showerOpts: { niche: true }, vanityW: 360, compact: true }));
add("small-bathroom.svg", bathroomScene({ id: "small", p: palettes.sand, showerOpts: { bench: true }, vanityW: 330, compact: true }));
add("accessible-bathroom.svg", bathroomScene({ id: "access", p: palettes.teal, showerOpts: { niche: true }, vanityW: 380, accessible: true }));
add("apartment.svg", bathroomScene({ id: "apt", p: palettes.slate, showerOpts: { niche: true }, vanityW: 350, compact: true, city: true }));
add("queenslander.svg", bathroomScene({ id: "qld", p: palettes.warm, bath: true, showerOpts: { niche: true }, vanityW: 400, vj: true }));
add("commercial.svg", bathroomScene({ id: "comm", p: palettes.blue, commercial: true }));
add("laundry.svg", laundryScene({ id: "laundry", p: palettes.teal }));
add("kitchen.svg", kitchenScene({ id: "kitchen", p: palettes.sand }));
add("waterproofing.svg", tradeScene({ id: "waterproof", p: palettes.blue, type: "waterproofing" }));
add("tiling.svg", tradeScene({ id: "tiling", p: palettes.slate, type: "tiling" }));
add("about-team.svg", aboutScene({ id: "about", p: palettes.teal }));
add("process.svg", processScene({ id: "process", p: palettes.teal }));

const galleryConfigs = [
  ["gallery-1.svg", { id: "g1", p: palettes.teal, bath: true, showerOpts: { niche: true }, vanityW: 420 }],
  ["gallery-2.svg", { id: "g2", p: palettes.sand, showerOpts: { niche: true }, vanityW: 380, compact: true }],
  ["gallery-3.svg", { id: "g3", p: palettes.slate, bath: true, showerOpts: { niche: true }, vanityW: 420, double: true }],
  ["gallery-4.svg", { id: "g4", p: palettes.blue, showerOpts: { bench: true }, vanityW: 360, compact: true, city: true }],
  ["gallery-5.svg", { id: "g5", p: palettes.warm, showerOpts: { niche: true }, vanityW: 390, vj: true }],
  ["gallery-6.svg", { id: "g6", p: palettes.teal, showerOpts: { niche: true }, vanityW: 380, accessible: true }],
];
for (const [name, opts] of galleryConfigs) add(name, bathroomScene(opts));

for (const [name, svg] of files) {
  await writeFile(path.join(OUT, name), svg, "utf8");
}
console.log(`Wrote ${files.length} SVG placeholders to public/images`);
