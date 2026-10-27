/**
 * Image inventory — counts <img> elements and inline SVG icons per built page.
 *
 *   node tools/image-report.mjs            # print the table
 *   node tools/image-report.mjs --write     # also write docs/IMAGE-INVENTORY.md
 *
 * Counts come from dist/, so run `npm run build` first.
 */
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const DIST = path.resolve("dist");
const OUT = path.resolve("docs/IMAGE-INVENTORY.md");

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith(".html")) files.push(full);
  }
  return files;
}

const urlFor = (file) => {
  const rel = path.relative(DIST, file).split(path.sep).join("/");
  return rel === "index.html" ? "/" : "/" + rel.replace(/index\.html$/, "");
};

const section = (url) => {
  if (url === "/") return "Home";
  if (url === "/404.html") return "Error page";
  const parts = url.split("/").filter(Boolean);
  if (parts[0] === "services" && parts.length > 2) return "Service detail";
  if (parts[0] === "bathroom-renovations" ) return "Location";
  return parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
};

const files = (await htmlFiles(DIST)).sort();
const rows = [];
const usage = new Map();

for (const file of files) {
  const html = await readFile(file, "utf8");
  const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].map((m) => m[0]);
  const srcs = imgs
    .map((tag) => (tag.match(/\bsrc="([^"]+)"/i) || [])[1])
    .filter(Boolean);
  for (const src of srcs) usage.set(src, (usage.get(src) || 0) + 1);

  const url = urlFor(file);
  rows.push({
    url,
    section: section(url),
    imgs: imgs.length,
    unique: new Set(srcs).size,
    svg: (html.match(/<svg\b/gi) || []).length,
    files: [...new Set(srcs)],
  });
}

const totalImgs = rows.reduce((n, r) => n + r.imgs, 0);
const distinct = [...usage.keys()].sort();

const pad = (value, width) => String(value).padEnd(width);
const lines = [];
lines.push("# Image inventory", "");
lines.push(`Generated from \`dist/\` by \`node tools/image-report.mjs --write\`. ${rows.length} pages, ${totalImgs} \`<img>\` elements, ${distinct.length} distinct image files.`, "");
lines.push("`<img>` counts visible content images. Inline SVG counts decorative icons, ticks, arrows and the logo mark, which are code rather than requests.", "");
lines.push("| Page | Section | `<img>` | Distinct files | Inline SVG |");
lines.push("| --- | --- | ---: | ---: | ---: |");
for (const r of rows) {
  lines.push(`| \`${r.url}\` | ${r.section} | ${r.imgs} | ${r.unique} | ${r.svg} |`);
}
lines.push("");
lines.push("## Pages with no content images", "");
const none = rows.filter((r) => r.imgs === 0).map((r) => `\`${r.url}\``);
lines.push(none.length ? none.join(", ") : "None.");
lines.push("");
lines.push("## Usage by file", "");
lines.push("| File | Placements | Pages |");
lines.push("| --- | ---: | ---: |");
for (const src of distinct) {
  const pages = rows.filter((r) => r.files.includes(src)).length;
  lines.push(`| \`${src}\` | ${usage.get(src)} | ${pages} |`);
}
lines.push("");

const report = lines.join("\n");
console.log(report.match(/## Usage by file[\s\S]*/)[0]);

// Console table, grouped by section.
let current = "";
for (const r of rows.sort((a, b) => a.section.localeCompare(b.section) || a.url.localeCompare(b.url))) {
  if (r.section !== current) {
    current = r.section;
    console.log(`\n[${current}]`);
  }
  console.log(`  ${pad(r.url, 62)} img=${pad(r.imgs, 3)} files=${pad(r.unique, 3)} svg=${r.svg}`);
}
console.log(`\nTOTAL pages=${rows.length} img-elements=${totalImgs} distinct-files=${distinct.length}`);

if (process.argv.includes("--write")) {
  await writeFile(OUT, report, "utf8");
  console.log(`\nWritten: ${path.relative(process.cwd(), OUT)}`);
}
