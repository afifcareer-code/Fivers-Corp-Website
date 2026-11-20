import { site, nav, contact, statusInfo } from "./data.mjs";
import { Glyph } from "./visuals.mjs";

export const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const icons = {
  sprout:
    '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21v-9"/><path d="M12 12c0-4 3-7 8-7 0 5-3 8-8 7z"/><path d="M12 15c0-3-2-5-6-5 0 4 2 6 6 5z"/></svg>',
  egg: '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3c3.5 0 6 4.5 6 9a6 6 0 0 1-12 0c0-4.5 2.5-9 6-9z"/></svg>',
  pin: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/></svg>',
};

/* ---------- Layout ---------- */

export const LANGS = {
  id: { prefix: "", locale: "id_ID", name: "Bahasa Indonesia", short: "ID" },
  en: { prefix: "/en", locale: "en_US", name: "English", short: "EN" },
};
export const langPath = (lang, path) => (LANGS[lang].prefix ? (path === "/" ? "/en/" : `/en${path}`) : path);

const flagId = '<svg class="flag-ico" viewBox="0 0 24 16" width="22" height="15" aria-hidden="true"><rect width="24" height="8" fill="#E70011"/><rect y="8" width="24" height="8" fill="#fff"/></svg>';
const flagEn = '<svg class="flag-ico" viewBox="0 0 24 16" width="22" height="15" aria-hidden="true"><rect width="24" height="16" fill="#012169"/><path d="M0 0l24 16M24 0L0 16" stroke="#fff" stroke-width="3"/><path d="M0 0l24 16M24 0L0 16" stroke="#C8102E" stroke-width="1.3"/><path d="M12 0v16M0 8h24" stroke="#fff" stroke-width="5"/><path d="M12 0v16M0 8h24" stroke="#C8102E" stroke-width="3"/></svg>';

export function Layout({ meta, path, body, jsonld = [], lang = "id" }) {
  const L = LANGS[lang];
  const urlOf = (l) => `${site.url}${langPath(l, path)}`;
  const url = urlOf(lang);
  const ogImage = `${site.url}/og-image.png`;
  const ld = jsonld
    .map(
      (o) =>
        `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`
    )
    .join("\n");
  const html = `<!doctype html>
<html lang="${lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(meta.title)}</title>
<meta name="description" content="${esc(meta.description)}">
<link rel="canonical" href="${esc(url)}">
<link rel="alternate" hreflang="id" href="${esc(urlOf("id"))}">
<link rel="alternate" hreflang="en" href="${esc(urlOf("en"))}">
<link rel="alternate" hreflang="x-default" href="${esc(urlOf("id"))}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#08130d">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:locale" content="${L.locale}">
<meta property="og:locale:alternate" content="${LANGS[lang === "id" ? "en" : "id"].locale}">
<meta property="og:title" content="${esc(meta.title)}">
<meta property="og:description" content="${esc(meta.description)}">
<meta property="og:url" content="${esc(url)}">
<meta property="og:image" content="${esc(ogImage)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Fivers Corp: Discover. Build. Operate.">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(meta.title)}">
<meta name="twitter:description" content="${esc(meta.description)}">
<meta name="twitter:image" content="${esc(ogImage)}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&amp;family=Instrument+Sans:wght@400;500;600&amp;display=swap" rel="stylesheet">
<script>(function(){var d=document.documentElement;try{var t=localStorage.getItem("fivers-theme");if(!t)t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";d.dataset.theme=t}catch(e){d.dataset.theme="dark"}d.classList.add("js")})()</script>
<link rel="stylesheet" href="/assets/styles.css">
${ld}
</head>
<body>
<a class="skip" href="#main">Skip to main content</a>
${Navbar(path)}
<main id="main">
${body}
</main>
${Footer()}
<script src="/assets/nav.js" defer></script>
</body>
</html>
`;
  return html;
}

/* Prefix root-relative page links for non-default languages. */
export function prefixLinks(html, lang) {
  const p = LANGS[lang].prefix;
  if (!p) return html;
  return html.replace(/href="(\/[^"]*)"/g, (m, h) =>
    /^\/(assets|photos|favicon|og-image|founder-mark|en\/)/.test(h) ? m : `href="${h === "/" ? "/en/" : p + h}"`
  );
}

export function langSwitch(html, path) {
  return html
    .replace(/@@LANG_ID@@/g, langPath("id", path))
    .replace(/@@LANG_EN@@/g, langPath("en", path));
}

/* ---------- Navigation ---------- */

export function Navbar(currentPath) {
  const links = nav
    .map((l) => {
      const current = l.href === currentPath ? ' aria-current="page"' : "";
      return `<li><a href="${l.href}"${current}>${esc(l.label)}</a></li>`;
    })
    .join("");
  return `<header class="site-header">
  <div class="wrap bar">
    <a class="brand" href="/" aria-label="Fivers Corp, home"><span class="mark" aria-hidden="true"><svg viewBox="0 0 32 32" width="30" height="30"><path d="M5 27C5 14 12 6 26 5c0 14-7 21-21 22z" fill="currentColor"/><path d="M12 28c0-6 3-10 11-11 0 7-4 10-11 11z" fill="currentColor" opacity=".6"/></svg></span><span>Fivers</span></a>
    <button class="nav-toggle" type="button" data-nav-toggle aria-expanded="false" aria-controls="nav-panel">
      <span class="sr">Menu</span>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
    </button>
    <div class="nav-panel" id="nav-panel" data-nav-panel>
      <nav aria-label="Primary"><ul>${links}</ul></nav>
      <div class="tools">
        <div class="lang" role="group" aria-label="Language">
          <a href="@@LANG_ID@@" hreflang="id" lang="id" title="Bahasa Indonesia" data-lang="id">${flagId}<span>ID</span></a>
          <a href="@@LANG_EN@@" hreflang="en" lang="en" title="English" data-lang="en">${flagEn}<span>EN</span></a>
        </div>
        <button class="theme-toggle" type="button" data-theme-toggle aria-label="Toggle light and dark mode">
          <svg class="i-moon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4 8 8 0 1 0 20 14.5z"/></svg>
          <svg class="i-sun" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M5 19l1.5-1.5M17.5 6.5L19 5"/></svg>
        </button>
      </div>
      <a class="cta" href="${contact.href}">${esc(contact.label)} <span aria-hidden="true">&rarr;</span></a>
    </div>
  </div>
</header>`;
}

export function Footer() {
  const links = nav.map((l) => `<a href="${l.href}">${esc(l.label)}</a>`).join("");
  return `<footer class="site-footer">
  <div class="wrap">
    <div class="foot-top">
      <div>
        <a class="brand" href="/" aria-label="Fivers Corp, home"><span class="mark" aria-hidden="true"><svg viewBox="0 0 32 32" width="30" height="30"><path d="M5 27C5 14 12 6 26 5c0 14-7 21-21 22z" fill="currentColor"/><path d="M12 28c0-6 3-10 11-11 0 7-4 10-11 11z" fill="currentColor" opacity=".6"/></svg></span><span>Fivers</span></a>
        <p class="muted foot-tag">${esc(site.tagline)} An AI-native venture studio.</p>
      </div>
      <nav class="foot-nav" aria-label="Footer">${links}<a href="${contact.href}">${esc(contact.label)}</a></nav>
    </div>
    <div class="foot-bottom">
      <p>&copy; ${site.year} Fivers Corp. All rights reserved.</p>
      <p>${esc(site.disclaimer)}</p>
    </div>
  </div>
</footer>`;
}

/* ---------- Building blocks ---------- */

export function PageHero({ eyebrow, title, titleHtml, subtitle, lead, lead2, ctas = [], aside = "", cls = "" }) {
  const h1 = titleHtml ?? esc(title);
  const buttons = ctas.length
    ? `<div class="btns">${ctas
        .map((c) => `<a class="btn${c.primary ? " primary" : ""}" href="${c.href}">${esc(c.label)}</a>`)
        .join("")}</div>`
    : "";
  return `<section class="hero${cls ? " " + cls : ""}">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      ${eyebrow ? `<span class="eyebrow">${esc(eyebrow)}</span>` : ""}
      <h1>${h1}</h1>
      ${subtitle ? `<p class="hero-sub">${esc(subtitle)}</p>` : ""}
      ${lead ? `<p class="lead">${esc(lead)}</p>` : ""}
      ${lead2 ? `<p class="lead2">${esc(lead2)}</p>` : ""}
      ${buttons}
    </div>
    ${aside}
  </div>
</section>`;
}

export function SectionHeader({ eyebrow, title, text, warm = false, id }) {
  return `<div class="head">
  ${eyebrow ? `<span class="eyebrow${warm ? " warm" : ""}">${esc(eyebrow)}</span>` : ""}
  <h2 class="title"${id ? ` id="${id}"` : ""}>${esc(title)}</h2>
  ${text ? `<p class="muted">${esc(text)}</p>` : ""}
</div>`;
}

export function StatusBadge(status) {
  const info = statusInfo[status];
  return `<span class="status status-${status}">${esc(info.label)}</span>`;
}

export function VentureCard(v) {
  return `<article class="card venture">
  <div class="card-top">${Glyph(v.name)}<span class="badges">${v.flagship ? '<span class="flag">Main product</span>' : ""}${StatusBadge(v.status)}</span></div>
  <span class="cat">${esc(v.category)}</span>
  <h3>${esc(v.name)}</h3>
  <p>${esc(v.description)}</p>
  ${v.note ? `<p class="note">${esc(v.note)}</p>` : ""}
  ${v.href ? `<a class="more" href="${v.href}" rel="noopener">${esc(v.linkLabel || "Visit")} &rarr;</a>` : ""}
</article>`;
}

export function VentureGroup(status, items, { headingLevel = 2 } = {}) {
  const info = statusInfo[status];
  const h = `h${headingLevel}`;
  return `<div class="group group-${status}">
  <div class="group-head">
    ${StatusBadge(status)}
    <${h} class="group-title">${esc(info.label === "Experiment" ? "Experiments" : info.label)}</${h}>
    <p class="muted">${esc(info.blurb)}</p>
  </div>
  <div class="cards">${items.map(VentureCard).join("")}</div>
</div>`;
}

export function DiscoveryStep(s) {
  const outcomeNote = s.key === "DECIDE" ? " chips" : "";
  const items = s.items.map((i) => `<li>${esc(i)}</li>`).join("");
  return `<article class="step">
  <span class="step-n">${s.n}</span>
  <h3>${esc(s.key)}</h3>
  <p class="muted">${esc(s.lead)}</p>
  <ul class="step-list${outcomeNote}">${items}</ul>
</article>`;
}

export function BusinessCard(b) {
  return `<article class="card biz-card">
  <span class="tag warm">${esc(b.tag)}</span>
  <h3><span class="ico">${icons[b.icon]}</span>${esc(b.title)}</h3>
  <p>${esc(b.text)}</p>
</article>`;
}

export function LocationStrip(text, extra = "") {
  return `<p class="place"><span class="pin">${icons.pin}</span><span><strong>Location:</strong> ${esc(text)}</span>${extra ? `<span>${esc(extra)}</span>` : ""}</p>`;
}

export function DivisionCard(d) {
  return `<article class="div-card">
  <span class="code">${esc(d.code)}</span>
  <h3>${esc(d.name)}</h3>
  <p class="muted">${esc(d.text)}</p>
</article>`;
}

export function FlowChips(labels) {
  return `<ol class="flow" aria-label="Process">${labels
    .map((l, i) => `<li>${esc(l)}</li>${i < labels.length - 1 ? '<li class="arrow" aria-hidden="true">&rarr;</li>' : ""}`)
    .join("")}</ol>`;
}

export function Pipeline(labels) {
  return `<ol class="pipeline">${labels
    .map(
      (l, i) =>
        `<li><span class="pl-n">${String(i + 1).padStart(2, "0")}</span><span class="pl-t">${esc(l)}</span></li>`
    )
    .join("")}</ol>`;
}

export function CTASection({ id, title, text, label, href, external = false }) {
  return `<section class="cta-section"${id ? ` id="${id}"` : ""}>
  <div class="wrap">
    <div class="band">
      <div>
        <h2>${esc(title)}</h2>
        ${text ? `<p>${esc(text)}</p>` : ""}
      </div>
      <a class="btn" href="${href}"${external ? ' rel="noopener"' : ""}>${esc(label)}</a>
    </div>
  </div>
</section>`;
}

export function Faq(items) {
  return `<div class="faq">${items
    .map((f) => `<details><summary>${esc(f.q)}</summary><p>${esc(f.a)}</p></details>`)
    .join("")}</div>`;
}
