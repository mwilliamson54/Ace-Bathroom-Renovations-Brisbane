/**
 * Build the Open Graph / social share card from the hero image.
 *
 *   node tools/make-og.mjs
 *
 * Writes public/images/og-image.png (1200×630). Re-run this whenever the hero image changes.
 * The card carries the business name, phone and domain only — no address, no licence number,
 * matching the rule that those appear on the About page alone.
 */
import path from "node:path";
import sharp from "sharp";

const SRC = path.resolve("public/images/hero-bathroom.webp");
const OUT = path.resolve("public/images/og-image.png");

const W = 1200;
const H = 630;

const overlay = `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="scrim" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#001a24" stop-opacity="0.90"/>
      <stop offset="0.5" stop-color="#001a24" stop-opacity="0.62"/>
      <stop offset="1" stop-color="#001a24" stop-opacity="0"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#scrim)"/>
  <rect x="80" y="96" width="64" height="6" fill="#7FD0F4"/>
  <text x="80" y="212" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="96" font-weight="700" fill="#ffffff">ACE</text>
  <text x="80" y="270" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="30" font-weight="400" fill="#ffffff">BATHROOM RENOVATIONS BRISBANE</text>
  <text x="82" y="316" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="23" fill="#CFE3E9">QBCC licensed builder &#183; Fixed written scope &#183; AS 3740 waterproofing</text>
  <text x="80" y="500" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="34" font-weight="700" fill="#ffffff">(07) 8590 6941</text>
  <text x="80" y="544" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="23" fill="#7FD0F4">acebathroomrenovationsbrisbane.com</text>
  <text x="80" y="584" font-family="Segoe UI, Arial, Helvetica, sans-serif" font-size="23" fill="#CFE3E9">Open 7am&#8211;10pm, 7 days &#183; Brisbane and surrounds</text>
</svg>`;

const base = await sharp(SRC)
  .resize(W, H, { fit: "cover", position: "attention" })
  .toBuffer();

await sharp(base)
  .composite([{ input: Buffer.from(overlay), left: 0, top: 0 }])
  .png({ compressionLevel: 9, quality: 90 })
  .toFile(OUT);

const info = await sharp(OUT).metadata();
console.log(`${path.relative(process.cwd(), OUT)} — ${info.width}×${info.height}`);
