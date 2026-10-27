import sharp from "sharp";
import { stat } from "node:fs/promises";

const file = process.argv[2];
const size = (await stat(file)).size;
const m = await sharp(file).metadata();
console.log(`file    : ${file}`);
console.log(`format  : ${m.format} ${m.width}x${m.height} ${(size / 1024).toFixed(1)} KB`);
console.log(`exif    : ${m.exif ? m.exif.length + " bytes" : "none"}`);
console.log(`xmp     : ${m.xmp ? m.xmp.length + " bytes" : "none"}`);
if (m.xmp) {
  const text = m.xmp.toString("utf8");
  const source = text.match(/DigitalSourceType="([^"]+)"/);
  const desc = text.match(/<dc:description>[\s\S]*?<rdf:li[^>]*>([^<]+)<\/rdf:li>/);
  const rights = text.match(/<dc:rights>[\s\S]*?<rdf:li[^>]*>([^<]+)<\/rdf:li>/);
  console.log(`ai flag : ${source ? source[1] : "MISSING"}`);
  console.log(`desc    : ${desc ? desc[1] : "MISSING"}`);
  console.log(`rights  : ${rights ? rights[1] : "MISSING"}`);
}
if (m.exif) {
  console.log(`exif txt: ${m.exif.toString("latin1").replace(/[^ -~]/g, ".").slice(0, 200)}`);
}
