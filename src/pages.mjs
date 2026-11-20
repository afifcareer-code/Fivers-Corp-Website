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

function home() {
  const hero = PageHero({
    eyebrow: "Fivers Corp",
    titleHtml: 'Discover. <em>Build.</em> <em class="warm">Operate.</em>',
    lead: "An AI-native venture studio building digital products, experiments, and real-world businesses.",
    ctas: [
      { label: "Explore Fivers Discovery", href: "/discovery/", primary: true },
      { label: "Explore Ventures", href: "/ventures/" },
    ],
    aside: LoopVisual(),
  });

  const pillarSec = wrap(
    `${SectionHeader({ eyebrow: "How Fivers works", title: "One loop, three jobs.", id: "h-loop",
      text: "Fivers is organised around finding the right things to do, doing them, and keeping them running." })}
    <div class="pillars">${pillars.map(Pillar).join("")}</div>`,
    "", "h-loop"
  );

  const discovery = wrap(
    `<div class="split">
      <div>
        ${SectionHeader({ eyebrow: "Fivers Discovery", title: "We don't build every idea.", id: "h-disc",
          text: "Before building, Fivers investigates the problem, market, users, business model, feasibility, and assumptions behind an opportunity." })}
        ${FlowChips(["Discover", "Validate", "Experiment", "Decide"])}
        <p class="after"><a class="textlink" href="/discovery/">Explore Fivers Discovery &rarr;</a></p>
      </div>
      <div class="split-visual">${FunnelVisual()}</div>
    </div>`,
    "", "h-disc"
  );

  const featured = wrap(
    `${SectionHeader({ eyebrow: "Ventures", title: "What is emerging from Fivers.", id: "h-vent",
      text: "Products and experiments, each labelled with where it honestly stands today." })}
    <div class="bento">${ventures.map((v) => VentureCard(v)).join("")}</div>
    <p class="after"><a class="textlink" href="/ventures/">View all ventures &rarr;</a></p>`,
    "", "h-vent"
  );

  const real = `<section class="biz" aria-labelledby="h-biz"><div class="wrap split">
    <div>
      ${SectionHeader({ eyebrow: "Businesses", warm: true, title: "Beyond software. Into the real world.", id: "h-biz",
        text: "Fivers also operates family businesses outside software: onion farming, and occasionally rice, plus layer chickens, in Brebes, Central Java." })}
      <ul class="step-list chips-warm"><li>Agriculture</li><li>Layer chicken</li><li>Brebes, Central Java</li><li>Early stage</li></ul>
      <p class="after"><a class="textlink warm" href="/businesses/">Explore Businesses &rarr;</a></p>
    </div>
    <div class="split-visual">${FieldVisual()}</div>
  </div></section>`;

  const founder = wrap(founderCard());

  const closing = `<section class="closing"><div class="wrap">
  <p class="closing-lines"><span>Some ideas become products.</span><span>Some become experiments.</span><span>Some should never be built.</span></p>
  <p class="closing-punch">Fivers exists to find out which is which.</p>
</div></section>`;

  return {
    path: "/",
    meta: {
      title: "Fivers Corp — Discover. Build. Operate.",
      description:
        "Fivers Corp is an AI-native venture studio that discovers, builds, and operates digital products, experiments, and real-world businesses.",
    },
    body: [hero, Marquee(marquee), pillarSec, discovery, featured, real, founder, closing].join("\n"),
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
    </div>`,
    "", "h-how"
  );

  const caps = wrap(
    `${SectionHeader({ eyebrow: "Capabilities", title: "Capabilities behind the ventures.", id: "h-cap",
      text: "Seven divisions provide the operating capabilities that Fivers ventures draw on." })}
    <div class="div-grid">${divisions.map(DivisionCard).join("")}</div>`,
    "", "h-cap"
  );

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
    body: [hero, storySec, princ, how, caps, founder, faq, cta].join("\n"),
    jsonld: graph(orgLd(), crumbLd("About", "/about/"), faqLd()),
  };
}

export const pages = () => [home(), discovery(), venturesPage(), businessesPage(), about()];
