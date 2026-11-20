import {
  site, ventures, stages, outcomes, evaluationAreas, pipeline,
  businesses, location, divisions, faqs, statusInfo,
  principles, story, pillars, marquee, founderValues,
} from "./data.mjs";
import {
  esc, PageHero, SectionHeader, VentureCard, VentureGroup, DiscoveryStep, BusinessCard,
  LocationStrip, DivisionCard, FlowChips, Pipeline, CTASection, Faq,
} from "./components.mjs";
import {
  LoopVisual, FunnelVisual, FieldVisual, Marquee, Pillar, StageRow, OutcomeTile,
  DecisionCard, StoryStep, PrincipleCard, FounderCard,
  HeroScene, BizPhoto, FocusCard, ProjectRow, LabelLine,
} from "./visuals.mjs";

/* ---------- JSON-LD ---------- */

const orgLd = () => ({
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  alternateName: "Fivers",
  url: `${site.url}/`,
  logo: `${site.url}/favicon.svg`,
  slogan: site.tagline,
  description:
    "Fivers Corp is an AI-native venture studio that discovers, builds, and operates digital products, experiments, and real-world businesses.",
  location: {
    "@type": "Place",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Brebes",
      addressRegion: "Central Java",
      addressCountry: "ID",
    },
  },
  founder: {
    "@type": "Person",
    name: site.founder.name,
    jobTitle: site.founder.title,
    url: site.founder.url,
  },
});

const websiteLd = () => ({
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: `${site.url}/`,
  name: site.name,
  inLanguage: "en",
  publisher: { "@id": `${site.url}/#organization` },
});

const faqLd = () => ({
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

const crumbLd = (name, path) => ({
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: `${site.url}/` },
    { "@type": "ListItem", position: 2, name, item: `${site.url}${path}` },
  ],
});

const graph = (...nodes) => [{ "@context": "https://schema.org", "@graph": nodes }];

const byStatus = (s) => ventures.filter((v) => v.status === s);
const wrap = (inner, cls = "", labelledby = "") =>
  `<section${cls ? ` class="${cls}"` : ""}${labelledby ? ` aria-labelledby="${labelledby}"` : ""}><div class="wrap">${inner}</div></section>`;

/* ---------- HOME ---------- */

const founderCard = () =>
  FounderCard({
    name: site.founder.name,
    title: site.founder.title,
    url: site.founder.url,
    values: founderValues,
    text: "Sets the direction, makes the final decisions, and allocates capital at Fivers. Business Analyst, Product Owner, and System Analyst by background, and the seller of the layer chickens.",
  });

const iconSvg = {
  chip: '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/></svg>',
  rocket: '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 19c-1-3 0-6 2-8l5-5c3-3 7-3 9-3 0 2 0 6-3 9l-5 5c-2 2-5 3-8 2z"/><circle cx="15" cy="9" r="1.6"/><path d="M5 19l-2 2M9 22l1-3"/></svg>',
  store: '<svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9l2-5h14l2 5M3 9h18M3 9a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M5 12v8h14v-8M10 20v-5h4v5"/></svg>',
  sprout: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 21v-9"/><path d="M12 12c0-4 3-7 8-7 0 5-3 8-8 7z"/><path d="M12 15c0-3-2-5-6-5 0 4 2 6 6 5z"/></svg>',
  egg: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3c3.5 0 6 4.5 6 9a6 6 0 0 1-12 0c0-4.5 2.5-9 6-9z"/></svg>',
};

function home() {
  const hero = PageHero({
    cls: "hero-home",
    eyebrow: "Fivers Corp",
    titleHtml: 'Dari kantor AI sampai <em>ladang</em> dan <em>kandang</em>.',
    subtitle: "Technology, AI, Digital Products & Real Businesses.",
    lead: "Fivers Corp adalah perusahaan yang menggabungkan teknologi modern dengan bisnis nyata di dunia.",
    lead2: "An AI-native venture studio: Discover. Build. Operate.",
    ctas: [
      { label: "Explore Technology", href: "/technology/", primary: true },
      { label: "Explore Ventures", href: "/ventures/" },
    ],
    aside: HeroScene(),
  });

  const focus = wrap(
    `<div class="side-layout">
      <div class="side-head">${LabelLine("Our Focus")}<h2 class="title" id="h-focus">Build for <em>Real Impact</em></h2>
        <p class="muted">Fivers mengembangkan solusi teknologi, produk digital, dan menjalankan bisnis nyata untuk menciptakan dampak jangka panjang.</p></div>
      <div class="focus-grid">
        ${FocusCard({ href: "/technology/", icon: iconSvg.chip, title: "Technology", text: "AI, software and digital solutions" })}
        ${FocusCard({ href: "/ventures/", icon: iconSvg.rocket, title: "Ventures", text: "Digital products and experiments" })}
        ${FocusCard({ href: "/businesses/", icon: iconSvg.store, title: "Businesses", text: "Real-world businesses in Brebes" })}
      </div>
    </div>`, "", "h-focus"
  );

  const feat = ["Fivers Digital Office", "Veluna", "Financial Tracker", "FiveClip"].map((n) => ventures.find((v) => v.name === n));
  const featured = wrap(
    `<div class="side-layout">
      <div class="side-head">${LabelLine("Featured Projects")}<h2 class="title" id="h-feat">What We're <em>Building</em></h2>
        <p class="muted">A selection of our latest projects and experiments.</p>
        <a class="btn primary" href="/ventures/">View all projects &rarr;</a></div>
      <div class="proj-grid">${feat.map(ProjectRow).join("")}</div>
    </div>`, "", "h-feat"
  );

  const real = wrap(
    `<div class="side-layout">
      <div class="side-head">${LabelLine("Our Businesses")}<h2 class="title" id="h-biz">Beyond Software. <em>Into the Real World.</em></h2>
        <p class="muted">Fivers juga menjalankan bisnis nyata di Brebes, Jawa Tengah, mulai dari pertanian hingga peternakan ayam petelur.</p>
        <a class="btn primary" href="/businesses/">Explore Businesses &rarr;</a></div>
      <div class="photo-grid">${BizPhoto(businesses[0], iconSvg.sprout)}${BizPhoto(businesses[1], iconSvg.egg)}</div>
    </div>`, "", "h-biz"
  );

  const closing = `<section class="closing-strip"><div class="wrap"><div class="strip">
    <span class="strip-mark" aria-hidden="true"><svg viewBox="0 0 32 32" width="64" height="64"><path d="M5 27C5 14 12 6 26 5c0 14-7 21-21 22z" fill="currentColor"/><path d="M12 28c0-6 3-10 11-11 0 7-4 10-11 11z" fill="currentColor" opacity=".6"/></svg></span>
    <p class="strip-lines"><span>Some ideas become products.</span><span>Some become experiments.</span><span>Some should never be built.</span></p>
    <p class="strip-punch">Fivers exists to find out which is which.</p>
    <a class="btn primary" href="/discovery/">Learn More &rarr;</a>
  </div></div></section>`;

  return {
    path: "/",
    meta: {
      title: "Fivers Corp — Technology, AI & Real Businesses",
      description:
        "Fivers Corp is an AI-native venture studio that builds technology, digital products, and real-world businesses, from the AI office to the farm and coop in Brebes, Central Java.",
    },
    body: [hero, focus, featured, real, closing].join("\n"),
    jsonld: graph(orgLd(), websiteLd()),
  };
}

/* ---------- DISCOVERY ---------- */

function discovery() {
  const hero = PageHero({
    eyebrow: "Research before building",
    title: "Fivers Discovery",
    subtitle: "We don't build every idea.",
    lead: "Fivers Discovery is the research and validation layer of the company, where ideas are investigated, assumptions are challenged, opportunities are tested, and decisions are made before significant resources are committed.",
    aside: FunnelVisual(),
  });

  const framework = wrap(
    `${SectionHeader({ eyebrow: "Framework", title: "Four stages, one decision.", id: "h-fw" })}
    <div class="stages">${stages.map(StageRow).join("")}</div>`,
    "", "h-fw"
  );

  const outcomeSection = wrap(
    `${SectionHeader({ eyebrow: "Outcomes", title: "Build is not the default.", id: "h-out",
      text: "Every opportunity ends in a decision. Any of these is a good result if the evidence points there." })}
    <ul class="outcomes">${outcomes.map(OutcomeTile).join("")}</ul>`,
    "", "h-out"
  );

  const card = wrap(
    `<div class="split">
      <div>${SectionHeader({ eyebrow: "In practice", title: "Every opportunity ends on a card like this.", id: "h-card",
        text: "Short, explicit, and honest about what is not known yet. The point is a decision, not a document." })}</div>
      <div class="split-visual">${DecisionCard()}</div>
    </div>`,
    "", "h-card"
  );

  const evaluation = wrap(
    `${SectionHeader({ eyebrow: "Evaluation", title: "What we look at.", id: "h-eval",
      text: "Ten areas keep the assessment honest and comparable across very different ideas." })}
    <ol class="areas">${evaluationAreas.map((a, i) => `<li><span>${String(i + 1).padStart(2, "0")}</span>${esc(a)}</li>`).join("")}</ol>`,
    "", "h-eval"
  );

  const flow = wrap(
    `${SectionHeader({ eyebrow: "Pipeline", title: "From opportunity to decision.", id: "h-pipe" })}
    ${Pipeline(pipeline)}`,
    "", "h-pipe"
  );

  const cta = CTASection({
    title: "See what came out of it.",
    text: "Products, experiments, and businesses that moved through Discovery.",
    label: "View ventures",
    href: "/ventures/",
  });

  return {
    path: "/discovery/",
    name: "Discovery",
    meta: {
      title: "Fivers Discovery — Research Before Building",
      description:
        "Fivers Discovery is the research and validation layer of Fivers Corp: Discover, Validate, Experiment, Decide, before any significant resource is committed.",
    },
    body: [hero, framework, outcomeSection, card, evaluation, flow, cta].join("\n"),
    jsonld: graph(crumbLd("Discovery", "/discovery/")),
  };
}

/* ---------- VENTURES ---------- */

function venturesPage() {
  const hero = PageHero({
    eyebrow: "Portfolio",
    title: "Ventures",
    lead: "Products, experiments, and businesses emerging from the Fivers ecosystem. Each one carries a status that means what it says.",
  });

  const lifecycle = `<div class="wrap"><ol class="lifecycle" aria-label="Venture statuses">
    <li><span class="status status-experiment">Experiment</span><p>Small tests to learn before committing.</p></li>
    <li class="lc-arrow" aria-hidden="true">&rarr;</li>
    <li><span class="status status-building">Building</span><p>In active development.</p></li>
    <li class="lc-arrow" aria-hidden="true">&rarr;</li>
    <li><span class="status status-live">Live</span><p>Deployed and running.</p></li>
  </ol><p class="muted lc-note">Not every venture moves forward. Some are parked or stopped in Discovery.</p></div>`;

  const filters = `<div class="filters" role="group" aria-label="Filter ventures" data-filters hidden>
    <button type="button" data-filter="all" aria-pressed="true">All</button>
    <button type="button" data-filter="live" aria-pressed="false">Live</button>
    <button type="button" data-filter="building" aria-pressed="false">Building</button>
    <button type="button" data-filter="experiment" aria-pressed="false">Experiments</button>
  </div>`;

  const groups = wrap(
    `${filters}<div class="groups">
      ${VentureGroup("live", byStatus("live"))}
      ${VentureGroup("building", byStatus("building"))}
      ${VentureGroup("experiment", byStatus("experiment"))}
    </div>
    <p class="risk" role="note"><strong>Risk notice.</strong> ${esc(site.disclaimer)}</p>`
  );

  const cta = CTASection({
    title: "How does Fivers decide what to build?",
    text: "Every venture starts as an opportunity that has to earn its place.",
    label: "Explore Fivers Discovery",
    href: "/discovery/",
  });

  return {
    path: "/ventures/",
    name: "Ventures",
    meta: {
      title: "Fivers Ventures — Products & Experiments",
      description:
        "Products, experiments, and businesses from Fivers Corp, grouped by status: Veluna and Financial Tracker are live; Fivers Digital Office and LinguaFlow are being built.",
    },
    body: [hero, lifecycle, groups, cta].join("\n"),
    jsonld: graph(crumbLd("Ventures", "/ventures/")),
  };
}

/* ---------- BUSINESSES ---------- */

function businessesPage() {
  const hero = PageHero({
    eyebrow: "Real-world businesses",
    title: "Beyond software.",
    subtitle: "Into the real world.",
    lead: "Fivers also builds and operates businesses outside software, starting from family businesses and real-world operations in Brebes, Central Java.",
    aside: FieldVisual(),
  });

  const panel = (b, chips, flip) => `<article class="bizpanel${flip ? " flip" : ""}">
    <div class="bizpanel-ico">${BusinessCard(b).match(/<span class="ico">(.*?)<\/span>/s)[1]}</div>
    <div>
      <span class="tag warm">${esc(b.tag)}</span>
      <h3>${esc(b.title)}</h3>
      <p>${esc(b.text)}</p>
      <ul class="step-list chips-warm">${chips.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
    </div>
  </article>`;

  const cards = wrap(
    `${SectionHeader({ eyebrow: "Today", warm: true, title: "Two family businesses, as they are.", id: "h-two" })}
    <div class="bizpanels">
      ${panel(businesses[0], ["Onion", "Occasionally rice", "Family business"], false)}
      ${panel(businesses[1], ["Layer chicken", "Seller: Afif Firmansyah", "Family business"], true)}
    </div>
    ${LocationStrip(location)}`,
    "biz", "h-two"
  );

  const why = wrap(
    `<div class="split">
      <div>${SectionHeader({ eyebrow: "Why it belongs here", title: "Fivers is not only software.", id: "h-why",
        text: "Real-world businesses keep the company tied to real customers, real costs, and real operations, not only to screens and dashboards." })}</div>
      <p class="honest"><strong>Early stage, shown honestly.</strong> We do not publish scale, revenue, or production numbers here. These businesses are just getting started, and we show them that way.</p>
    </div>`,
    "", "h-why"
  );

  const cta = CTASection({
    title: "Interested in these businesses?",
    text: "To buy, ask, or work together, reach out through the founder's site.",
    label: "Contact the founder",
    href: site.founder.url,
    external: true,
  });

  return {
    path: "/businesses/",
    name: "Businesses",
    meta: {
      title: "Fivers Businesses — Beyond Software",
      description:
        "Fivers Corp also operates early-stage family businesses in Brebes, Central Java: agriculture (onion, occasionally rice) and layer chicken.",
    },
    body: [hero, cards, why, cta].join("\n"),
    jsonld: graph(crumbLd("Businesses", "/businesses/")),
  };
}

/* ---------- TECHNOLOGY ---------- */

function technologyPage() {
  const hero = PageHero({
    eyebrow: "Technology",
    title: "Technology",
    subtitle: "AI, software, and digital solutions.",
    lead: "Fivers started from tinkering with AI and trying to turn everyday activities into products. That became the idea of an AI office, and it is still the engine behind every venture.",
  });

  const flagship = wrap(
    `<div class="flagship">
      <div>${SectionHeader({ eyebrow: "Main product", title: "Fivers Digital Office.", id: "h-flag",
        text: "An AI office, currently in development. The aim is a platform where any need, whether entertainment or development, can produce something, and where Fivers' derivative products are developed." })}
        <p><span class="flag">Main product</span> <span class="status status-building">Building</span></p></div>
      <ol class="flow-down"><li><strong>Any need</strong><span>Entertainment or development</span></li><li><strong>The AI office</strong><span>Fivers Digital Office</span></li><li><strong>Something produced</strong><span>Derivative products and ventures</span></li></ol>
    </div>`, "", "h-flag"
  );

  const what = wrap(
    `${SectionHeader({ eyebrow: "What it covers", title: "From systems to AI agents.", id: "h-tech" })}
    <div class="cards">
      <article class="card"><h3>Digital products</h3><p>Veluna and Financial Tracker are live. LinguaFlow is in development. Each started as an opportunity that had to earn its place.</p></article>
      <article class="card"><h3>AI at work</h3><p>Fivers Digital Office is an AI-native operating environment, where AI agents support research, build, and operations.</p></article>
      <article class="card"><h3>Experiments</h3><p>FiveClip and Forex Agent test new ideas cheaply before any real commitment. Forex Agent runs in demo mode only.</p></article>
    </div>`, "", "h-tech"
  );

  const how = wrap(
    `<div class="split">
      <div>${SectionHeader({ eyebrow: "How Fivers works", title: "Human-led. AI-powered.", id: "h-how",
        text: "A human director sets strategy, decisions, and capital. AI agents handle research, build, and operations within defined permissions." })}</div>
      <figure class="opmodel" aria-label="Fivers operating model: a human director sets strategy, decisions, and capital; AI agents handle research, build, and operations">
        <div class="op-node"><strong>Human Director</strong></div>
        <div class="op-arrow" aria-hidden="true">&darr;</div>
        <ul class="op-row"><li>Strategy</li><li>Decisions</li><li>Capital</li></ul>
        <div class="op-arrow" aria-hidden="true">&darr;</div>
        <div class="op-node ai"><strong>AI Agents</strong></div>
        <div class="op-arrow" aria-hidden="true">&darr;</div>
        <ul class="op-row"><li>Research</li><li>Build</li><li>Operations</li></ul>
        <figcaption>An operating model, not a claim of full autonomy. Humans approve high-risk decisions.</figcaption>
      </figure>
    </div>`, "", "h-how"
  );

  const caps = wrap(
    `${SectionHeader({ eyebrow: "Capabilities", title: "Capabilities behind the ventures.", id: "h-cap",
      text: "Seven divisions provide the operating capabilities that Fivers ventures draw on." })}
    <div class="div-grid">${divisions.map(DivisionCard).join("")}</div>`, "", "h-cap"
  );

  const cta = CTASection({ title: "See the technology in use.", text: "Products and experiments built on it.", label: "View ventures", href: "/ventures/" });

  return {
    path: "/technology/",
    name: "Technology",
    meta: {
      title: "Fivers Technology — AI, Software & Digital Solutions",
      description:
        "The technology behind Fivers Corp: digital products, AI agents, and the human-led operating model that supports every venture.",
    },
    body: [hero, flagship, what, how, caps, cta].join("\n"),
    jsonld: graph(crumbLd("Technology", "/technology/")),
  };
}

/* ---------- ABOUT ---------- */

function about() {
  const hero = PageHero({
    eyebrow: "About",
    title: "About Fivers",
    lead: "Fivers Corp is an AI-native venture studio exploring, building, and operating digital products and real-world businesses.",
  });

  const storySec = wrap(
    `${SectionHeader({ eyebrow: "The story", title: "From office AI to the real world.", id: "h-story" })}
    <ol class="story">${story.map(StoryStep).join("")}</ol>`,
    "", "h-story"
  );

  const princ = wrap(
    `${SectionHeader({ eyebrow: "Principles", title: "How decisions get made.", id: "h-princ" })}
    <div class="principles">${principles.map(PrincipleCard).join("")}</div>`,
    "", "h-princ"
  );

  const decide = wrap(`<div class="band"><div><h2>How does Fivers decide what to build?</h2><p>Every opportunity moves through Discover, Validate, Experiment, and Decide.</p></div><a class="btn" href="/discovery/">Explore Fivers Discovery</a></div>`);

  const founder = wrap(founderCard());

  const faq = wrap(
    `${SectionHeader({ eyebrow: "FAQ", title: "Questions people ask.", id: "h-faq" })}
    ${Faq(faqs)}`,
    "", "h-faq"
  );

  const cta = CTASection({
    id: "contact",
    title: "Want to build, partner, or just ask?",
    text: "Get in touch through the founder's site.",
    label: "Contact Afif",
    href: site.founder.url,
    external: true,
  });

  return {
    path: "/about/",
    name: "About",
    meta: {
      title: "About Fivers Corp",
      description:
        "Fivers Corp is an AI-native venture studio, human-led and AI-powered, exploring, building, and operating digital products and real-world businesses.",
    },
    body: [hero, storySec, princ, decide, founder, faq, cta].join("\n"),
    jsonld: graph(orgLd(), crumbLd("About", "/about/"), faqLd()),
  };
}

export const pages = () => [home(), about(), technologyPage(), discovery(), venturesPage(), businessesPage()];
