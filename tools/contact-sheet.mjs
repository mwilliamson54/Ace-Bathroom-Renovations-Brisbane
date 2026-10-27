/**
 * Build a review contact sheet from imported slot images.
 *
 *   node tools/contact-sheet.mjs hero-bathroom full-bathroom ensuite
 *   node tools/contact-sheet.mjs --all
 *
 * Writes incoming/_contact-sheet.webp (git-ignored) with each slot labelled, so a batch of
 * generated images can be reviewed in one look. This is a review aid only; nothing here ships.
 */
import { readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const OUT_DIR = path.resolve("public/images");
const TARGET = path.resolve("incoming/_contact-sheet.webp");
const COLS = 3;
const CELL_W = 480;
const CELL_H = 360;
const LABEL_H = 34;
const PAD = 12;

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

async function main() {
  let slots = process.argv.slice(2).filter((a) => !a.startsWith("--"));
  if (process.argv.includes("--all") || !slots.length) {
    slots = (await readdir(OUT_DIR))
      .filter((f) => f.endsWith(".webp"))
      .map((f) => path.basename(f, ".webp"))
      .sort();
  }
  if (!slots.length) throw new Error("No slot images found in public/images.");

  const cols = Math.min(COLS, slots.length);
  const rows = Math.ceil(slots.length / cols);
  const cellW = CELL_W;
  const cellH = CELL_H + LABEL_H;
  const width = cols * cellW + (cols + 1) * PAD;
  const height = rows * cellH + (rows + 1) * PAD;

  const composites = [];
  const labels = [];

  for (const [i, slot] of slots.entries()) {
    const x = PAD + (i % cols) * (cellW + PAD);
    const y = PAD + Math.floor(i / cols) * (cellH + PAD);
    const tile = await sharp(path.join(OUT_DIR, `${slot}.webp`))
      .resize(cellW, CELL_H, { fit: "cover", position: "attention" })
      .toBuffer();
    composites.push({ input: tile, left: x, top: y + LABEL_H });
    labels.push(
      `<text x="${x + 4}" y="${y + 24}" font-family="Segoe UI, Arial, sans-serif" font-size="21" fill="#111">${i + 1}. ${esc(slot)}</text>`
    );
  }

  const overlay = Buffer.from(
    `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f4f1ec"/>${labels.join("")}</svg>`
  );

  await sharp({ create: { width, height, channels: 3, background: "#f4f1ec" } })
    .composite([...composites, { input: overlay, left: 0, top: 0 }])
    .webp({ quality: 82 })
    .toFile(TARGET);

  console.log(`${path.relative(process.cwd(), TARGET)} — ${slots.length} slot(s), ${width}×${height}`);
  slots.forEach((slot, i) => console.log(`  ${i + 1}. ${slot}`));
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
