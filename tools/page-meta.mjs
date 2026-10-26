import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("dist");

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...await walk(file));
    else if (entry.name === "index.html") out.push(file);
  }
  return out;
}

const files = (await walk(root)).sort();
for (const file of files) {
  const html = await readFile(file, "utf8");
  const title = (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || "";
  const description = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || "";
  const route = `/${path.relative(root, path.dirname(file)).replace(/\\/g, "/")}/`.replace("//", "/");
  console.log(`${route}\t${title}\t${description}`);
}
