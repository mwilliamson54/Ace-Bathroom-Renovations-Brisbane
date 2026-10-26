import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";

const run = (script) =>
  execFileSync(process.execPath, [path.join("tools", script)], {
    encoding: "utf8",
    maxBuffer: 20 * 1024 * 1024,
  });

const scripts = ["links.mjs", "schema.mjs", "meta.mjs", "linkmatrix.mjs"];
const results = {};
const checks = [];

for (const script of scripts) {
  try {
    results[script] = run(script);
  } catch (error) {
    results[script] = `${error.stdout || ""}${error.stderr || ""}`;
  }
}

const expect = (name, ok, detail = "") => checks.push({ name, ok, detail });

expect("Internal links resolve", /Broken: 0\b/.test(results["links.mjs"]));
expect("JSON-LD valid", /Errors: 0\b/.test(results["schema.mjs"]));
expect("Titles and descriptions within limits", /0 pages out of \d+/.test(results["meta.mjs"]));
expect("Every non-legal page links to every other", /missing internal links: 0\b/.test(results["linkmatrix.mjs"]));

const countOutput = run("count.mjs");
const rows = countOutput
  .trim()
  .split(/\r?\n/)
  .map((line) => {
    const match = line.match(/^\s*(\d+)\s+(.+)$/);
    return match ? { words: Number(match[1]), page: match[2] } : null;
  })
  .filter(Boolean);

const serviceAndLocation = rows.filter((row) => /\/services\/|bathroom-renovations-/.test(row.page));
const home = rows.find((row) => row.page === "/index.html");
const minService = serviceAndLocation.reduce((min, row) => Math.min(min, row.words), Infinity);

expect("Homepage at least 1,500 words", Boolean(home && home.words >= 1500), home ? `${home.words} words` : "missing");
expect(
  "Service and location pages at least 1,200 words",
  serviceAndLocation.length === 0 || minService >= 1200,
  `${serviceAndLocation.length} pages; shortest ${minService} words`
);

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const file = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}

const htmlFiles = walk("dist").filter((file) => file.endsWith(".html") && !path.basename(file).startsWith("qa-"));
let licenceIssues = 0;
let addressIssues = 0;
let brandIssues = 0;
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const route = `/${path.relative("dist", file).replace(/\\/g, "/")}`;
  const licences = (html.match(/17347609/g) || []).length;
  const addresses = (html.match(/63 Sedgebrook/g) || []).length;
  if (licences > 0 && route !== "/about/index.html") licenceIssues += 1;
  if (addresses > 1 && route !== "/about/index.html") addressIssues += 1;
  if (/Lincoln|Copeley/i.test(html)) brandIssues += 1;
}
expect("Licence number only on About", licenceIssues === 0);
expect("Street address visible only on About", addressIssues === 0);
expect("Owner name never published", brandIssues === 0);

const manifest = JSON.parse(readFileSync("dist/site.webmanifest", "utf8"));
const missingIcons = manifest.icons.map((icon) => icon.src).filter((src) => !existsSync(path.join("dist", src)));
expect("Manifest icons resolve", missingIcons.length === 0, missingIcons.join(", "));
expect("Sitemap exists", existsSync("dist/sitemap.xml"));
expect("404 page exists", existsSync("dist/404.html"));

for (const check of checks) {
  console.log(`${check.ok ? "PASS" : "FAIL"}  ${check.name}${check.detail ? ` (${check.detail})` : ""}`);
}

const failed = checks.filter((check) => !check.ok);
console.log(`\n${checks.length - failed.length}/${checks.length} checks passed.`);
if (failed.length) process.exitCode = 1;
