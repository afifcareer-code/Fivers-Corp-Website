// Dependency-free static site generator.
// Usage: SITE_URL=https://your-domain.com node build.mjs
import { mkdirSync, writeFileSync, copyFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { site } from "./src/data.mjs";
import { Layout } from "./src/components.mjs";
import { pages } from "./src/pages.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const out = (p) => join(root, p);
const list = pages();

for (const p of list) {
  const file = p.path === "/" ? "index.html" : join(p.path.replace(/^\/|\/$/g, ""), "index.html");
  mkdirSync(dirname(out(file)), { recursive: true });
  writeFileSync(out(file), Layout(p));
  console.log("wrote", file);
}

const today = new Date().toISOString().slice(0, 10);
const urls = list
  .map(
    (p) => `  <url>
    <loc>${site.url}${p.path}</loc>
    <lastmod>${today}</lastmod>
    <priority>${p.path === "/" ? "1.0" : "0.8"}</priority>
  </url>`
  )
  .join("\n");
writeFileSync(
  out("sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`
);
writeFileSync(out("robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
console.log("wrote sitemap.xml, robots.txt");

for (const f of ["favicon.svg", "og-image.png", "founder-mark.jpg"]) {
  if (existsSync(out(`public/${f}`))) copyFileSync(out(`public/${f}`), out(f));
}

if (site.url.includes("__SITE_URL__")) {
  console.warn(
    "\nWARNING: SITE_URL is not set, so canonical, Open Graph, and sitemap URLs contain the placeholder __SITE_URL__.\n" +
      "Build again with: SITE_URL=https://your-domain.com npm run build\n"
  );
}
