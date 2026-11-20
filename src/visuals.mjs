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
