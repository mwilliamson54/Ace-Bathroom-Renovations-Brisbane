import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("dist");
const port = Number(process.env.PORT || 4173);
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://localhost:${port}`);
    if (url.pathname === "/api/quote") {
      if (req.method !== "POST") {
        res.writeHead(405, { "content-type": "application/json" });
        return res.end(JSON.stringify({ ok: false, message: "Use the form." }));
      }
      let body = "";
      for await (const chunk of req) body += chunk;
      res.writeHead(503, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
      return res.end(JSON.stringify({
        ok: false,
        message: "Local preview: the form endpoint is not connected. On Cloudflare, configure RESEND_API_KEY and QUOTE_TO_EMAIL. Please call (07) 8590 6941.",
        fallback: { phone: "(07) 8590 6941", email: "AceBathroomRenovationsBrisbane@gmail.com" },
      }));
    }
    let file = path.join(root, decodeURIComponent(url.pathname));
    if (url.pathname.endsWith("/")) file = path.join(file, "index.html");
    try {
      const info = await stat(file);
      if (info.isDirectory()) file = path.join(file, "index.html");
    } catch {
      file = path.join(root, "404.html");
      res.statusCode = 404;
    }
    const data = await readFile(file);
    res.setHeader("content-type", types[path.extname(file)] || "application/octet-stream");
    res.setHeader("cache-control", "no-cache");
    res.end(data);
  } catch (err) {
    res.writeHead(500, { "content-type": "text/plain" });
    res.end(`Server error: ${err.message}`);
  }
});

server.listen(port, () => console.log(`Preview: http://localhost:${port}`));
