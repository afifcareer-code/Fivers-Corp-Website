// Post-build sanity checks. Run after `npm run build`.
import { readFileSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { faqs, site } from "../src/data.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const base = { "/": "index.html", "/about/": "about/index.html", "/technology/": "technology/index.html", "/discovery/": "discovery/index.html", "/ventures/": "ventures/index.html", "/businesses/": "businesses/index.html" };
const langs = { id: "", en: "en/" };
const routes = {};
for (const [l, pre] of Object.entries(langs)) for (const [r, f] of Object.entries(base)) routes[`${l}:${r}`] = { lang: l, route: r, file: pre + f, url: (l === "en" ? "/en" : "") + (r === "/" && l === "en" ? "/" : r) };
let fail = 0;
const bad = (m) => { fail++; console.error("FAIL", m); };

const titles = new Set();
for (const { lang, route, file, url } of Object.values(routes)) {
  const tag = `${lang}:${route}`;
  if (!existsSync(join(root, file))) { bad(`${tag} missing (${file})`); continue; }
  const html = readFileSync(join(root, file), "utf8");
  const title = (html.match(/<title>(.*?)<\/title>/) || [])[1];
  if (!title) bad(`${tag} no <title>`); else if (titles.has(title)) bad(`${tag} duplicate title`); else titles.add(title);
  if (!/<meta name="description" content="[^"]{40,}/.test(html)) bad(`${tag} weak/missing description`);
  if (!html.includes(`<link rel="canonical" href="${site.url}${url}">`)) bad(`${tag} canonical`);
  if (!html.includes(`<html lang="${lang}">`)) bad(`${tag} html lang`);
  if (!html.includes('hreflang="x-default"')) bad(`${tag} hreflang`);
  if ((html.match(/<h1[ >]/g) || []).length !== 1) bad(`${tag} must have exactly one h1`);
  if (!/aria-current="page"/.test(html) && route !== "/" && route !== "/discovery/") bad(`${tag} no active nav`);
  if (!/data-lang="(id|en)" aria-current="true"/.test(html)) bad(`${tag} language switch state`);
  if (!/Trading and investment involve risk|Trading dan investasi mengandung risiko/.test(html)) bad(`${tag} disclaimer missing in footer`);
  if (lang === "id" && /Learn more|Explore Ventures|View all projects/.test(html)) bad(`${tag} untranslated English left`);
  const noSwitch = html.replace(/<div class="lang"[\s\S]*?<\/div>/, "");
  for (const m of noSwitch.matchAll(/href="(\/[^"#]*)(#[^"]*)?"/g)) {
    let p = m[1];
    if (p.startsWith("/assets/") || p === "/favicon.svg") continue;
    if (lang === "en") { if (!p.startsWith("/en/")) { bad(`${tag} link missing /en prefix ${p}`); continue; } p = p.slice(3); }
    else if (p.startsWith("/en/") && !/data-lang|hreflang/.test(m.input.slice(Math.max(0, m.index - 20), m.index + 80))) { /* language switch link */ }
    if (!base[p] && !(lang === "id" && p.startsWith("/en/"))) bad(`${tag} broken internal link ${m[1]}`);
  }
}
const about = readFileSync(join(root, "en/about/index.html"), "utf8");
for (const f of faqs) {
  if (!about.includes(`<summary>${f.q.replace(/'/g, "'")}</summary>`) && !about.includes(f.q)) bad(`FAQ not visible: ${f.q}`);
}
if (!about.includes('"@type":"FAQPage"')) bad("about: FAQPage JSON-LD missing");
if (!about.includes('id="contact"')) bad("about: #contact anchor missing");
const sm = readFileSync(join(root, "sitemap.xml"), "utf8");
if ((sm.match(/<loc>/g) || []).length !== 12) bad("sitemap should list 12 URLs");
if (!existsSync(join(root, "robots.txt"))) bad("robots.txt missing");
if (fail) { console.error(`\n${fail} check(s) failed`); process.exit(1); }
console.log("All checks passed.");
