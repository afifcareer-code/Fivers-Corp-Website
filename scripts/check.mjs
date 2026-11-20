// Post-build sanity checks. Run after `npm run build`.
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { faqs, site } from "../src/data.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const routes = { "/": "index.html", "/discovery/": "discovery/index.html", "/ventures/": "ventures/index.html", "/businesses/": "businesses/index.html", "/about/": "about/index.html" };
let fail = 0;
const bad = (m) => { fail++; console.error("FAIL", m); };

const titles = new Set();
for (const [route, file] of Object.entries(routes)) {
  if (!existsSync(join(root, file))) { bad(`${route} missing (${file})`); continue; }
  const html = readFileSync(join(root, file), "utf8");
  const title = (html.match(/<title>(.*?)<\/title>/) || [])[1];
  if (!title) bad(`${route} no <title>`); else if (titles.has(title)) bad(`${route} duplicate title`); else titles.add(title);
  if (!/<meta name="description" content="[^"]{40,}/.test(html)) bad(`${route} weak/missing description`);
  if (!html.includes(`<link rel="canonical" href="${site.url}${route}">`)) bad(`${route} canonical`);
  if ((html.match(/<h1[ >]/g) || []).length !== 1) bad(`${route} must have exactly one h1`);
  if (!html.includes(`aria-current="page"`) && route !== "/") bad(`${route} no active nav`);
  if (!html.includes("Trading and investment involve risk")) bad(`${route} disclaimer missing in footer`);
  // internal links resolve
  for (const m of html.matchAll(/href="(\/[^"#]*)(#[^"]*)?"/g)) {
    const p = m[1];
    if (p.startsWith("/assets/") || p === "/favicon.svg") continue;
    if (!routes[p]) bad(`${route} broken internal link ${p}`);
  }
}
const about = readFileSync(join(root, "about/index.html"), "utf8");
for (const f of faqs) {
  if (!about.includes(`<summary>${f.q.replace(/'/g, "'")}</summary>`) && !about.includes(f.q)) bad(`FAQ not visible: ${f.q}`);
}
if (!about.includes('"@type":"FAQPage"')) bad("about: FAQPage JSON-LD missing");
if (!about.includes('id="contact"')) bad("about: #contact anchor missing");
const sm = readFileSync(join(root, "sitemap.xml"), "utf8");
if ((sm.match(/<loc>/g) || []).length !== 5) bad("sitemap should list 5 URLs");
if (!existsSync(join(root, "robots.txt"))) bad("robots.txt missing");
if (fail) { console.error(`\n${fail} check(s) failed`); process.exit(1); }
console.log("All checks passed.");
