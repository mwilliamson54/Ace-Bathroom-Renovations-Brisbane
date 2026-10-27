/**
 * Import generated images into the site.
 *
 *   node tools/import-images.mjs                      # import every slot found in incoming/
 *   node tools/import-images.mjs <file> <slot>        # import one file into a named slot
 *   node tools/import-images.mjs --list               # show slots, sizes and which are done
 *
 * Each source is auto-oriented, cropped to the slot's aspect ratio, converted to WebP and given
 * *truthful* metadata: the description is the slot's alt text, the creator and copyright are the
 * business, and the IPTC digital source type is `trainedAlgorithmicMedia` because these are
 * AI-assisted illustrations, not photographs of completed projects. Never write camera EXIF onto
 * a generated image: it misrepresents the work and is misleading conduct under the ACL.
 */
import { mkdir, readdir, readFile, stat, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const INCOMING = path.resolve("incoming");
const OUT_DIR = path.resolve("public/images");
const MAX_BYTES = 200 * 1024;

const BUSINESS = "Ace Bathroom Renovations Brisbane";
const COPYRIGHT = "© 2026 Ace Bathroom Renovations Brisbane";
const AI_SOURCE = "http://cv.iptc.org/newscodes/digitalsourcetype/trainedAlgorithmicMedia";

const SLOTS = {
  "hero-bathroom": {
    width: 1600, height: 900,
    alt: "Contemporary Brisbane bathroom renovation with large-format tiling, walk-in shower and timber vanity",
  },
  "full-bathroom": {
    width: 1200, height: 900,
    alt: "Full bathroom renovation with walk-in shower, freestanding bath and large-format tiles",
  },
  apartment: {
    width: 1200, height: 900,
    alt: "Apartment bathroom with space-saving wall-hung vanity and frameless shower",
  },
  waterproofing: {
    width: 1200, height: 900,
    alt: "Waterproofing membrane applied to a bathroom floor and wall junction",
  },
  ensuite: {
    width: 1200, height: 900,
    alt: "Ensuite renovation with double basin vanity, large mirror and walk-in shower",
  },
  queenslander: {
    width: 1200, height: 900,
    alt: "Queenslander bathroom renovation with VJ panelling and clawfoot bath",
  },
  "small-bathroom": {
    width: 1200, height: 900,
    alt: "Compact bathroom with wall-hung vanity, walk-in shower and light tiles",
  },
  laundry: {
    width: 1200, height: 900,
    alt: "Laundry renovation with built-in cabinetry, stone bench and subway tiles",
  },
  tiling: {
    width: 1200, height: 900,
    alt: "Tiler setting out large-format bathroom tiles with levelling clips",
  },
  "about-team": {
    width: 1200, height: 900,
    alt: "Renovation team reviewing plans on a Brisbane bathroom site",
  },
  kitchen: {
    width: 1200, height: 900,
    alt: "Modern kitchen with island bench, stone benchtop and tiled splashback",
  },
  process: {
    width: 1200, height: 900,
    alt: "Bathroom stripped to studs during renovation, with new plumbing rough-in",
  },
  accessible: {
    width: 1200, height: 900,
    alt: "Accessible bathroom with level-entry shower and grab rail",
  },
  commercial: {
    width: 1200, height: 900,
    alt: "Commercial bathroom refurbishment with cubicles and solid surface basins",
  },
  "gallery-1": {
    width: 1200, height: 900,
    alt: "Freestanding bath beside a garden window in a renovated bathroom",
  },
  "gallery-2": {
    width: 1200, height: 900,
    alt: "Double shower with twin rain heads and niche shelf in a dark-tiled ensuite",
  },
  "gallery-3": {
    width: 1200, height: 900,
    alt: "Family bathroom with bath and shower combination and timber vanity",
  },
  "gallery-4": {
    width: 1200, height: 900,
    alt: "Powder room with floating stone basin and brass tapware",
  },
  "gallery-5": {
    width: 1200, height: 900,
    alt: "Laundry with butler's sink and herringbone tile splashback",
  },
  "gallery-6": {
    width: 1200, height: 900,
    alt: "Heritage bathroom with clawfoot bath, subway tiles and black tapware",
  },
};

const SOURCE_EXT = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif", ".tif", ".tiff"]);

const kb = (bytes) => `${(bytes / 1024).toFixed(1)} KB`;
const xml = (value) =>
  String(value).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function xmp(slot, alt) {
  return `<x:xmpmeta xmlns:x="adobe:ns:meta/">
 <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
  <rdf:Description rdf:about=""
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:xmp="http://ns.adobe.com/xap/1.0/"
    xmlns:Iptc4xmpExt="http://iptc.org/std/Iptc4xmpExt/2008-02-29/"
    xmp:CreatorTool="AI-assisted illustration, generated then optimised"
    Iptc4xmpExt:DigitalSourceType="${AI_SOURCE}">
   <dc:description><rdf:Alt><rdf:li xml:lang="x-default">${xml(alt)}</rdf:li></rdf:Alt></dc:description>
   <dc:creator><rdf:Seq><rdf:li>${xml(BUSINESS)}</rdf:li></rdf:Seq></dc:creator>
   <dc:rights><rdf:Alt><rdf:li xml:lang="x-default">${xml(COPYRIGHT)}</rdf:li></rdf:Alt></dc:rights>
  </rdf:Description>
 </rdf:RDF>
</x:xmpmeta>`;
}

async function convert(source, slot, config) {
  const meta = await sharp(source).metadata();
  let quality = 78;
  let buffer;
  let info;

  for (;;) {
    buffer = await sharp(source)
      .rotate()
      .resize(config.width, config.height, { fit: "cover", position: "attention" })
      .withExif({
        IFD0: {
          ImageDescription: config.alt,
          Artist: BUSINESS,
          Copyright: COPYRIGHT,
          Software: "AI-assisted illustration, optimised for web",
        },
      })
      .withXmp(xmp(slot, config.alt))
      .webp({ quality, effort: 5 })
      .toBuffer({ resolveWithObject: true })
      .then((result) => result);

    info = buffer.info;
    if (info.size <= MAX_BYTES || quality <= 58) break;
    quality -= 6;
  }

  return {
    buffer: buffer.data,
    info,
    quality,
    sourceDims: `${meta.width}×${meta.height}`,
    sourceFormat: meta.format,
  };
}

async function findSources() {
  try {
    const entries = await readdir(INCOMING, { withFileTypes: true });
    return entries
      .filter((e) => e.isFile() && SOURCE_EXT.has(path.extname(e.name).toLowerCase()))
      .map((e) => path.join(INCOMING, e.name));
  } catch {
    return [];
  }
}

async function slotFromFile(file) {
  const base = path.basename(file, path.extname(file)).trim().toLowerCase();
  if (SLOTS[base]) return base;
  // Accept "hero-bathroom (1)", "hero-bathroom-final", "01 hero-bathroom".
  for (const slot of Object.keys(SLOTS)) {
    if (base === slot || base.startsWith(slot + " ") || base.startsWith(slot + "(") || base.startsWith(slot + "-")) return slot;
  }
  const prefixed = base.match(/^\d+[\s._-]+(.+)$/);
  if (prefixed && SLOTS[prefixed[1]]) return prefixed[1];
  return null;
}

async function list() {
  console.log("slot                 size       status");
  for (const [slot, config] of Object.entries(SLOTS)) {
    let status = "missing";
    try {
      const info = await stat(path.join(OUT_DIR, `${slot}.webp`));
      status = `${kb(info.size)}  ${new Date(info.mtimeMs).toISOString().slice(0, 10)}`;
    } catch {}
    console.log(`${slot.padEnd(20)} ${`${config.width}×${config.height}`.padEnd(10)} ${status}`);
  }
  const done = await Promise.all(
    Object.keys(SLOTS).map((slot) => stat(path.join(OUT_DIR, `${slot}.webp`)).then(() => 1, () => 0))
  );
  console.log(`\n${done.reduce((a, b) => a + b, 0)} of ${Object.keys(SLOTS).length} slots have a WebP file.`);
}

async function main() {
  const args = process.argv.slice(2);

  if (args[0] === "--list") {
    await list();
    return;
  }

  await mkdir(OUT_DIR, { recursive: true });
  await mkdir(INCOMING, { recursive: true });

  let jobs = [];

  if (args.length >= 2 && !args[0].startsWith("--")) {
    const [file, slot] = args;
    if (!SLOTS[slot]) throw new Error(`Unknown slot "${slot}". Run with --list to see the slots.`);
    jobs = [{ file: path.resolve(file), slot }];
  } else {
    for (const file of await findSources()) {
      const slot = await slotFromFile(file);
      if (!slot) {
        console.warn(`skipped (no matching slot): ${path.basename(file)}`);
        continue;
      }
      jobs.push({ file, slot });
    }
  }

  if (!jobs.length) {
    console.log("Nothing to import. Drop files named after a slot into incoming/ (see docs/IMAGE-BRIEF.md).");
    return;
  }

  const rows = [];
  for (const { file, slot } of jobs) {
    const config = SLOTS[slot];
    const result = await convert(file, slot, config);
    const target = path.join(OUT_DIR, `${slot}.webp`);
    await writeFile(target, result.buffer);
    rows.push({
      slot,
      source: `${path.basename(file)} (${result.sourceFormat} ${result.sourceDims})`,
      output: `${result.info.width}×${result.info.height}`,
      size: result.info.size,
      quality: result.quality,
    });
  }

  console.log("slot                 output        size       q   source");
  for (const row of rows) {
    console.log(`${row.slot.padEnd(20)} ${row.output.padEnd(13)} ${kb(row.size).padEnd(10)} ${String(row.quality).padEnd(3)} ${row.source}`);
  }
  const total = rows.reduce((n, r) => n + r.size, 0);
  console.log(`\n${rows.length} file(s) written, ${kb(total)} total.`);
  console.log("Next: swap the .svg reference for .webp, then run npm run build && npm run check.");
}

main().catch((error) => {
  console.error(error.message || error);
  process.exit(1);
});
