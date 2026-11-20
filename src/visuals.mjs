const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const g = (d, s = 26) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;

const glyphs = {
  Veluna: g('<circle cx="9" cy="13" r="5"/><circle cx="15" cy="13" r="5"/><path d="M12 3l1.2 2.4L12 7.5 10.8 5.4z"/>'),
  "Financial Tracker": g('<path d="M4 20V10M10 20V4M16 20v-7M22 20H2"/>'),
  "Fivers Digital Office": g('<rect x="3" y="4" width="18" height="12" rx="2"/><path d="M8 20h8M12 16v4M8 9l2 2 4-4"/>'),
  LinguaFlow: g('<path d="M4 5h12a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H9l-4 3v-3H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1z"/><path d="M14 17h5l2 2v-8"/>'),
  FiveClip: g('<rect x="3" y="5" width="18" height="14" rx="3"/><path d="M10 9.5v5l4.5-2.5z"/>'),
  "Forex Agent": g('<path d="M3 17l5-5 4 3 8-9"/><path d="M15 6h5v5"/>'),
};
export const Glyph = (name) => `<span class="glyph">${glyphs[name] || ""}</span>`;

export function LoopVisual() {
  return `<figure class="loopviz" aria-label="Discover, Build, Operate: the Fivers loop">
<svg viewBox="0 0 400 400" role="img" aria-labelledby="lv-t">
  <title id="lv-t">Discover leads to Build, Build leads to Operate, Operate feeds back into Discover</title>
  <defs><radialGradient id="lg" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#C5F03C" stop-opacity=".16"/><stop offset="1" stop-color="#C5F03C" stop-opacity="0"/></radialGradient></defs>
  <circle cx="200" cy="200" r="190" fill="url(#lg)"/>
  <circle class="spin" cx="200" cy="200" r="135" fill="none" stroke="#3A4A40" stroke-width="2" stroke-dasharray="2 9" stroke-linecap="round"/>
  <path d="M236 77a135 135 0 0 1 62 56" fill="none" stroke="#C5F03C" stroke-width="2.5" stroke-linecap="round"/>
  <path d="M313 232a135 135 0 0 1-70 108" fill="none" stroke="#EEF2EA" stroke-width="2.5" stroke-linecap="round" opacity=".7"/>
  <path d="M148 340a135 135 0 0 1-60-108" fill="none" stroke="#F2B84B" stroke-width="2.5" stroke-linecap="round"/>
  <g class="node"><circle cx="200" cy="65" r="46" fill="#151C17" stroke="#C5F03C" stroke-width="2"/><text x="200" y="70" text-anchor="middle" fill="#C5F03C">Discover</text></g>
  <g class="node"><circle cx="317" cy="267" r="46" fill="#151C17" stroke="#EEF2EA" stroke-width="2"/><text x="317" y="272" text-anchor="middle" fill="#EEF2EA">Build</text></g>
  <g class="node"><circle cx="83" cy="267" r="46" fill="#151C17" stroke="#F2B84B" stroke-width="2"/><text x="83" y="272" text-anchor="middle" fill="#F2B84B">Operate</text></g>
  <text x="200" y="196" text-anchor="middle" class="core">FIVERS</text>
  <text x="200" y="216" text-anchor="middle" class="core-sub">Human-led. AI-powered.</text>
</svg></figure>`;
}

export function FunnelVisual() {
  const rows = [
    ["Ideas", 100, "#26302A", "#EEF2EA"],
    ["Discovery", 82, "#2C3A31", "#EEF2EA"],
    ["Validation", 62, "#34493B", "#EEF2EA"],
    ["Experiment", 42, "#8AA82A", "#0D120F"],
    ["Decision", 24, "#C5F03C", "#0D120F"],
  ];
  const bars = rows
    .map(([l, w, f, t], i) => {
      const x = 300 - (w * 5.4) / 2;
      return `<rect x="${x}" y="${i * 46}" width="${w * 5.4}" height="38" rx="10" fill="${f}"/><text x="300" y="${i * 46 + 24}" text-anchor="middle" fill="${t}">${l}</text>`;
    })
    .join("");
  return `<figure class="funnel">
<svg viewBox="0 0 600 232" role="img" aria-label="Illustration: many ideas narrow through discovery, validation, and experiment into a decision">${bars}</svg>
<figcaption>Illustration of the idea. Not Fivers data.</figcaption></figure>`;
}

export function FieldVisual() {
  const furrows = Array.from({ length: 9 }, (_, i) => {
    const x = 20 + i * 70;
    return `<path d="M${300 + (x - 300) * 0.18} 190 L${x - 40 + (i - 4) * 18} 360" stroke="#8a6a2a" stroke-width="2" opacity=".55"/>`;
  }).join("");
  return `<figure class="field" aria-hidden="true">
<svg viewBox="0 0 600 360" preserveAspectRatio="xMidYMid slice">
<defs><linearGradient id="sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a2316"/><stop offset="1" stop-color="#F2B84B" stop-opacity=".55"/></linearGradient>
<linearGradient id="soil" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a2f17"/><stop offset="1" stop-color="#171209"/></linearGradient></defs>
<rect width="600" height="360" fill="url(#sky)"/>
<circle cx="440" cy="150" r="46" fill="#F2B84B" opacity=".95"/>
<path d="M0 190 Q150 150 300 180 T600 170 V360 H0z" fill="url(#soil)"/>
${furrows}
<g fill="none" stroke="#C5F03C" stroke-width="2.4" stroke-linecap="round"><path d="M120 300v-26M120 292c-8-2-12-8-12-14M120 288c8-2 12-8 12-14"/><path d="M300 270v-20M300 264c-7-2-10-7-10-12M300 261c7-2 10-7 10-12"/><path d="M470 310v-30M470 300c-9-2-13-9-13-16M470 296c9-2 13-9 13-16"/></g>
</svg></figure>`;
}

export function Marquee(items) {
  const row = items.map((t) => `<span>${esc(t)}</span>`).join("");
  return `<div class="marquee" aria-hidden="true"><div class="marquee-track">${row}${row}</div></div>`;
}

export function Pillar(p) {
  return `<article class="pillar pillar-${p.tone}">
  <span class="pillar-n">${p.n}</span>
  <h3>${esc(p.key)}</h3>
  <p>${esc(p.text)}</p>
  <ul class="step-list">${p.chips.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
</article>`;
}

export function StageRow(s) {
  return `<article class="stage">
  <div class="stage-side"><span class="stage-n">${s.n}</span><h3>${esc(s.key)}</h3></div>
  <div class="stage-body">
    <p class="stage-lead">${esc(s.lead)}</p>
    <ul class="step-list">${s.items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>
  </div>
</article>`;
}

export function OutcomeTile(o, i) {
  const tone = o.key === "BUILD" ? "go" : o.key === "KILL" || o.key === "PARK" ? "stop" : "mid";
  return `<li class="outcome outcome-${tone}"><span class="outcome-n">${String(i + 1).padStart(2, "0")}</span><strong>${esc(o.key)}</strong><span>${esc(o.text)}</span></li>`;
}

export function DecisionCard() {
  const f = (l, h) => `<div class="dc-row"><span>${l}</span><i>${h}</i></div>`;
  return `<figure class="decision" aria-label="Template of a Fivers decision card">
  <div class="dc-head"><strong>Decision card</strong><span class="status status-experiment">Template</span></div>
  ${f("Opportunity", "What are we looking at?")}
  ${f("Evidence", "What did we learn?")}
  ${f("Key assumption", "What must be true?")}
  ${f("Risk", "What could go wrong?")}
  <div class="dc-row dc-end"><span>Decision</span><i>Build · Iterate · Experiment · Partner · Park · Kill</i></div>
  <figcaption>Illustrative template, not a real record.</figcaption>
</figure>`;
}

export function StoryStep(s, i) {
  return `<li class="story-step"><span class="story-dot">${i + 1}</span><div><span class="story-era">${esc(s.era)}</span><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div></li>`;
}

export function PrincipleCard(p) {
  return `<article class="principle"><span class="pillar-n">${p.n}</span><h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></article>`;
}

export function FounderCard({ name, title, url, values, text }) {
  return `<div class="founder-card">
  <img src="/founder-mark.jpg" width="472" height="434" alt="Afif Firmansyah personal monogram: Integrity, Direction, Impact" loading="lazy">
  <div>
    <span class="eyebrow">Founder</span>
    <h3>${esc(name)}</h3>
    <p class="muted">${esc(title)}</p>
    <p>${esc(text)}</p>
    <ul class="step-list">${values.map((v) => `<li>${esc(v)}</li>`).join("")}</ul>
    <a class="btn" href="${url}" rel="noopener">View profile</a>
  </div>
</div>`;
}

/* ===== reference-style home visuals ===== */
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const pubDir = join(dirname(fileURLToPath(import.meta.url)), "..", "public");

const hen = (x, y, s = 1, body = "#b8742f", wing = "#8a4f1d") =>
  `<g transform="translate(${x} ${y}) scale(${s})">
  <path d="M42 -12q26 -30 14 -52q-4 20 -30 26z" fill="${wing}"/>
  <ellipse cx="0" cy="0" rx="48" ry="34" fill="${body}"/>
  <path d="M-30 6q22 24 58 -2q-20 30 -58 2z" fill="#d49a58" opacity=".7"/>
  <ellipse cx="6" cy="-2" rx="26" ry="16" fill="${wing}" opacity=".85"/>
  <path d="M-36 -14q-8 -24 -4 -34l14 4q-6 14 0 28z" fill="${body}"/>
  <circle cx="-42" cy="-36" r="14" fill="#c98a46"/>
  <circle cx="-48" cy="-52" r="5" fill="#d23b3b"/><circle cx="-41" cy="-54" r="5" fill="#d23b3b"/><circle cx="-35" cy="-50" r="4" fill="#d23b3b"/>
  <path d="M-55 -36l-14 4l14 6z" fill="#F2B84B"/>
  <circle cx="-46" cy="-39" r="2.4" fill="#111"/>
  <path d="M-52 -26q-3 10 3 12q4 -6 0 -12z" fill="#d23b3b"/>
  <path d="M-8 32v22M10 32v22M-14 54h12M4 54h12" stroke="#F2B84B" stroke-width="3.5" stroke-linecap="round" fill="none"/>
</g>`;

function faceGrid(p, cols, rows, cls) {
  const lerp = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
  const [tl, tr, br, bl] = p;
  let d = "";
  for (let i = 1; i < cols; i++) { const t = i / cols; const a = lerp(tl, tr, t), b = lerp(bl, br, t); d += `M${a[0].toFixed(1)} ${a[1].toFixed(1)}L${b[0].toFixed(1)} ${b[1].toFixed(1)}`; }
  for (let j = 1; j < rows; j++) { const t = j / rows; const a = lerp(tl, bl, t), b = lerp(tr, br, t); d += `M${a[0].toFixed(1)} ${a[1].toFixed(1)}L${b[0].toFixed(1)} ${b[1].toFixed(1)}`; }
  return `<path d="${d}" class="${cls}"/>`;
}

const journeySteps = [
  { n: 1, t: "Tinkering with AI", d: "It began with curiosity: playing with AI." },
  { n: 2, t: "Into products", d: "Everyday activities become products." },
  { n: 3, t: "The AI office", d: "Fivers Digital Office: the main product, where derivative products are born.", main: true },
  { n: 4, t: "Field & coop", d: "Conventional family businesses in Brebes, Central Java.", real: true },
];

function curve(pts) {
  let d = `M${pts[0][0]} ${pts[0][1]}`;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] || pts[i], p1 = pts[i], p2 = pts[i + 1], p3 = pts[i + 2] || p2;
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
    d += `C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0]} ${p2[1]}`;
  }
  return d;
}

export function HeroScene() {
  const nodes = [[95, 330], [265, 235], [440, 150], [610, 285]];
  const rows = Array.from({ length: 13 }, (_, i) => `<path d="M560 330L${200 + i * 62} 470" class="row${i % 2 ? " alt" : ""}"/>`).join("");
  const icon = [
    `<path d="M0 -15l4 11 11 4-11 4-4 11-4-11-11-4 11-4z" fill="#C5F03C"/>`,
    `<g fill="none" stroke="#C5F03C" stroke-width="2.4"><rect x="-14" y="-14" width="11" height="11" rx="3"/><rect x="3" y="-14" width="11" height="11" rx="3"/><rect x="-14" y="3" width="11" height="11" rx="3"/><rect x="3" y="3" width="11" height="11" rx="3" fill="#C5F03C"/></g>`,
    `<g><path d="M-18 14V-8l16-5 20 6v21z" fill="#0f2a20" stroke="#C5F03C" stroke-width="2.4" stroke-linejoin="round"/><path d="M-8 -2h4M2 -2h4M-8 5h4M2 5h4M12 0h2M12 6h2" stroke="#C5F03C" stroke-width="2.2" stroke-linecap="round"/></g>`,
    `<g fill="none" stroke="#C5F03C" stroke-width="2.4" stroke-linecap="round"><path d="M0 16V-2"/><path d="M0 -2c0-8 6-13 15-13 0 9-6 14-15 13z"/><path d="M0 6c0-6-4-10-12-10 0 7 4 11 12 10z"/></g>`,
  ];
  const nodeSvg = nodes.map(([x, y], i) => {
    const main = journeySteps[i].main;
    const r = main ? 44 : 34;
    return `<g transform="translate(${x} ${y})"><circle r="${r + 10}" fill="${main ? "#C5F03C" : "#2f4a38"}" opacity="${main ? ".14" : ".25"}"/><circle r="${r}" fill="#0f1d14" stroke="${main ? "#C5F03C" : "#3f7a52"}" stroke-width="${main ? 3 : 2}"/><g transform="scale(${main ? 1.25 : 1})">${icon[i]}</g><g transform="translate(${r * 0.72} ${-r * 0.72})"><circle r="13" fill="#C5F03C"/><text y="5" text-anchor="middle" class="num">${i + 1}</text></g></g>`;
  }).join("");
  const list = journeySteps.map((j) => `<li${j.main ? ' class="main"' : ""}><span class="jn">${j.n}</span><div><strong>${esc(j.t)}</strong><span>${esc(j.d)}</span></div></li>`).join("");
  return `<figure class="scene">
<svg viewBox="0 0 720 470" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
<defs>
<linearGradient id="hs-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b2417"/><stop offset="1" stop-color="#143823"/></linearGradient>
<linearGradient id="hs-ground" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c5029"/><stop offset="1" stop-color="#0b2113"/></linearGradient>
<radialGradient id="hs-sun" cx="55%" cy="22%" r="40%"><stop offset="0" stop-color="#d8ff7a" stop-opacity=".28"/><stop offset="1" stop-color="#d8ff7a" stop-opacity="0"/></radialGradient>
</defs>
<rect width="720" height="470" fill="url(#hs-sky)"/><rect width="720" height="470" fill="url(#hs-sun)"/>
<path d="M0 372Q200 340 420 368T720 350V470H0z" fill="url(#hs-ground)"/>
${rows}
<path d="${curve(nodes)}" fill="none" stroke="#C5F03C" stroke-width="3" stroke-dasharray="3 10" stroke-linecap="round"/>
${nodeSvg}
${hen(640, 428, 0.78)}
</svg>
<ol class="journey">${list}</ol></figure>`;
}

function onionArt() {
  const bulb = (x, y, k) => `<g transform="translate(${x} ${y}) scale(${k})"><path d="M0 -34q10 -4 8 8M0 -34q-10 -4 -8 8" stroke="#6fbf3a" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M-3 -30L-1 -52M3 -30L6 -50" stroke="#7fd04a" stroke-width="3" stroke-linecap="round"/><path d="M0 -30C26 -22 34 8 0 30C-34 8 -26 -22 0 -30z" fill="#a63a5c"/><path d="M-6 -24C-20 -8 -18 12 -4 26" stroke="#d66a8a" stroke-width="3" fill="none" stroke-linecap="round" opacity=".7"/></g>`;
  return `<svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="400" height="260" fill="#2b2113"/><rect y="150" width="400" height="110" fill="#3a2a17"/>${[60, 150, 240, 330].map((x, i) => bulb(x, 150 + (i % 2) * 8, 1.15)).join("")}${[105, 195, 285].map((x) => bulb(x, 195, 1)).join("")}${[30, 120, 210, 300, 370].map((x) => bulb(x, 235, 0.9)).join("")}</svg>`;
}
function hensArt() {
  return `<svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><rect width="400" height="260" fill="#3a3a1e"/><rect y="150" width="400" height="110" fill="#4a3d1f"/>${hen(120, 170, 0.9)}${hen(260, 190, 1.05, "#a86a2a", "#7a4519")}${hen(350, 150, 0.6, "#c58a45", "#8a4f1d")}</svg>`;
}

export function BizPhoto(b, icon) {
  const file = `${b.slug}.jpg`;
  const real = existsSync(join(pubDir, "photos", file));
  const media = real
    ? `<img src="/photos/${file}" alt="${esc(b.title)}: ${esc(b.short)}" loading="lazy">`
    : b.slug === "shallot" ? onionArt() : hensArt();
  return `<a class="photo-card" href="/businesses/">
  <div class="photo-media">${media}</div>
  <div class="photo-cap"><span class="ico">${icon}</span><div><strong>${esc(b.title)}</strong><span>${esc(b.short)}</span></div></div>
</a>`;
}

export function FocusCard(c) {
  return `<a class="focus-card" href="${c.href}">
  <span class="focus-ico">${c.icon}</span>
  <h3>${esc(c.title)}</h3>
  <p>${esc(c.text)}</p>
  <span class="more">Learn more &rarr;</span>
</a>`;
}

export function ProjectRow(v) {
  const label = v.status === "building" ? "In development" : v.status === "live" ? "Live" : "Experiment";
  return `<a class="proj" href="/ventures/">
  ${Glyph(v.name)}
  <div><span class="badges">${v.flagship ? '<span class="flag">Main product</span>' : ""}<span class="status status-${v.status}">${label}</span></span><strong>${esc(v.name)}</strong><span class="muted">${esc(v.short || v.description)}</span></div>
  <span class="proj-go" aria-hidden="true">&rarr;</span>
</a>`;
}

export function LabelLine(t) {
  return `<span class="label-line">${esc(t)}</span>`;
}
