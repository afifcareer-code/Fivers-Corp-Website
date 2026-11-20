// Dependency-free static site generator.
// Usage: SITE_URL=https://your-domain.com node build.mjs
import { mkdirSync, writeFileSync, copyFileSync, existsSync, cpSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { site } from "./src/data.mjs";
import { Layout, prefixLinks, langSwitch, langPath } from "./src/components.mjs";
import { localize, missing } from "./src/i18n.mjs";
import { pages } from "./src/pages.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const out = (p) => join(root, p);
const list = pages();

const LANG_LIST = ["id", "en"];
for (const lang of LANG_LIST) {
  for (const p of list) {
    let html = Layout({ ...p, lang });
    html = prefixLinks(html, lang);
    html = langSwitch(html, p.path);
    html = html.replace(`data-lang="${lang}"`, `data-lang="${lang}" aria-current="true"`);
    html = localize(html, lang);
    const base = p.path === "/" ? "" : p.path.replace(/^\/|\/$/g, "");
    const file = join(lang === "en" ? "en" : "", base, "index.html");
    mkdirSync(dirname(out(file)), { recursive: true });
    writeFileSync(out(file), html);
    console.log("wrote", file);
  }
}
if (missing.size) {
  console.warn(`\n${missing.size} string(s) have no Indonesian translation (fallback to English):`);
  for (const m of missing) console.warn("  -", JSON.stringify(m));
  writeFileSync(out("scripts/.missing.json"), JSON.stringify([...missing], null, 1));
}

const today = new Date().toISOString().slice(0, 10);
const urls = LANG_LIST.flatMap((lang) =>
  list.map(
    (p) => `  <url>
    <loc>${site.url}${langPath(lang, p.path)}</loc>
    <xhtml:link rel="alternate" hreflang="id" href="${site.url}${langPath("id", p.path)}"/>
    <xhtml:link rel="alternate" hreflang="en" href="${site.url}${langPath("en", p.path)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${site.url}${langPath("id", p.path)}"/>
    <lastmod>${today}</lastmod>
    <priority>${p.path === "/" ? "1.0" : "0.8"}</priority>
  </url>`
  )
).join("\n");
writeFileSync(
  out("sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`
);
writeFileSync(out("robots.txt"), `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
console.log("wrote sitemap.xml, robots.txt");

for (const f of ["favicon.svg", "og-image.png", "founder-mark.jpg"]) {
  if (existsSync(out(`public/${f}`))) copyFileSync(out(`public/${f}`), out(f));
}

if (existsSync(out("public/photos"))) cpSync(out("public/photos"), out("photos"), { recursive: true });

if (site.url.includes("__SITE_URL__")) {
  console.warn(
    "\nWARNING: SITE_URL is not set, so canonical, Open Graph, and sitemap URLs contain the placeholder __SITE_URL__.\n" +
      "Build again with: SITE_URL=https://your-domain.com npm run build\n"
  );
}
