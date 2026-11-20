import {
  site, ventures, stages, outcomes, evaluationAreas, pipeline,
  businesses, location, divisions, faqs, statusInfo,
} from "./data.mjs";
import {
  esc, PageHero, SectionHeader, VentureGroup, DiscoveryStep, BusinessCard,
  LocationStrip, DivisionCard, FlowChips, Pipeline, CTASection, Faq,
} from "./components.mjs";

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

function home() {
  const aside = `<aside class="loop" aria-label="How Fivers works">
  <h2>The Fivers loop</h2>
  <ol>
    <li><strong>Discover</strong><span>Find opportunities worth pursuing.</span></li>
    <li><strong>Build</strong><span>Turn validated opportunities into products and experiments.</span></li>
    <li class="warm"><strong>Operate</strong><span>Run digital and real-world ventures.</span></li>
  </ol>
</aside>`;

  const hero = PageHero({
    eyebrow: "Fivers Corp",
    titleHtml: 'Discover. <em>Build.</em> <em class="warm">Operate.</em>',
    lead: "An AI-native venture studio building digital products, experiments, and real-world businesses.",
    ctas: [
      { label: "Explore Fivers Discovery", href: "/discovery/", primary: true },
      { label: "Explore Ventures", href: "/ventures/" },
    ],
    aside,
  });

  const discovery = wrap(
    `<div class="split">
      <div>
        ${SectionHeader({ eyebrow: "Fivers Discovery", title: "We don't build every idea.", id: "h-disc",
          text: "Before building, Fivers investigates the problem, market, users, business model, feasibility, and assumptions behind an opportunity." })}
        <a class="textlink" href="/discovery/">Explore Fivers Discovery &rarr;</a>
      </div>
      <div class="split-visual">${FlowChips(["Discover", "Validate", "Experiment", "Decide"])}</div>
    </div>`,
    "", "h-disc"
  );

  const featured = wrap(
    `${SectionHeader({ eyebrow: "Ventures", title: "What is emerging from Fivers.", id: "h-vent",
      text: "A selection of products and experiments, grouped by where they stand today." })}
    <div class="groups">
      ${VentureGroup("live", byStatus("live"), { headingLevel: 3 })}
      ${VentureGroup("building", byStatus("building"), { headingLevel: 3 })}
      ${VentureGroup("experiment", byStatus("experiment"), { headingLevel: 3 })}
    </div>
    <p class="after"><a class="textlink" href="/ventures/">View all ventures &rarr;</a></p>`,
    "", "h-vent"
  );

  const real = wrap(
    `${SectionHeader({ eyebrow: "Businesses", warm: true, title: "Beyond software. Into the real world.", id: "h-biz",
      text: "Fivers also operates family businesses outside software." })}
    <div class="cards">${businesses.map(BusinessCard).join("")}</div>
    ${LocationStrip(location)}
    <p class="after"><a class="textlink warm" href="/businesses/">Explore Businesses &rarr;</a></p>`,
    "biz", "h-biz"
  );

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
    body: [hero, discovery, featured, real, closing].join("\n"),
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
  });

  const framework = wrap(
    `${SectionHeader({ eyebrow: "Framework", title: "Four stages, one decision.", id: "h-fw" })}
    <div class="steps">${stages.map(DiscoveryStep).join("")}</div>`,
    "", "h-fw"
  );

  const outcomeSection = wrap(
    `${SectionHeader({ eyebrow: "Outcomes", title: "Build is not the default.", id: "h-out",
      text: "Every opportunity ends in a decision. Any of these is a good result if the evidence points there." })}
    <ul class="outcomes">${outcomes
      .map((o) => `<li><strong>${esc(o.key)}</strong><span>${esc(o.text)}</span></li>`)
      .join("")}</ul>`,
    "", "h-out"
  );

  const evaluation = wrap(
    `${SectionHeader({ eyebrow: "Evaluation", title: "What we look at.", id: "h-eval",
      text: "Ten areas keep the assessment honest and comparable across very different ideas." })}
    <ul class="areas">${evaluationAreas.map((a) => `<li>${esc(a)}</li>`).join("")}</ul>`,
    "", "h-eval"
  );

  const flow = wrap(
    `<div class="split">
      <div>${SectionHeader({ eyebrow: "Output", title: "From opportunity to decision.", id: "h-pipe",
        text: "Each opportunity moves through the same pipeline, so decisions are made on evidence instead of enthusiasm." })}</div>
      <div class="split-visual">${Pipeline(pipeline)}</div>
    </div>`,
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
    body: [hero, framework, outcomeSection, evaluation, flow, cta].join("\n"),
    jsonld: graph(crumbLd("Discovery", "/discovery/")),
  };
}

/* ---------- VENTURES ---------- */

function venturesPage() {
  const hero = PageHero({
    eyebrow: "Portfolio",
    title: "Ventures",
    lead: "Products, experiments, and businesses emerging from the Fivers ecosystem.",
  });

  const groups = wrap(
    `<div class="groups">
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
    body: [hero, groups, cta].join("\n"),
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
  });

  const cards = wrap(
    `${SectionHeader({ eyebrow: "Today", warm: true, title: "Two family businesses, as they are.", id: "h-two" })}
    <div class="cards">${businesses.map(BusinessCard).join("")}</div>
    ${LocationStrip(location)}
    <p class="honest"><strong>Early stage, shown honestly.</strong> We do not publish scale, revenue, or production numbers here. These businesses are just getting started, and we show them that way.</p>`,
    "biz", "h-two"
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
    body: [hero, cards, cta].join("\n"),
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

  const story = wrap(
    `<div class="prose">
      <p>Fivers began in IT and AI-assisted office work. Since then it has grown into products, experiments, and real-world businesses, and it keeps one rule: look before building.</p>
      <p>It is a small team today, designed to grow into a larger ecosystem. New ventures arrive through Discovery, and each one is built, iterated, parked, or stopped on evidence.</p>
    </div>`
  );

  const how = wrap(
    `${SectionHeader({ eyebrow: "How Fivers works", title: "Human-led. AI-powered.", id: "h-how" })}
    <figure class="opmodel" aria-label="Fivers operating model: a human director sets strategy, decisions, and capital; AI agents handle research, build, and operations">
      <div class="op-node"><strong>Human Director</strong></div>
      <div class="op-arrow" aria-hidden="true">&darr;</div>
      <ul class="op-row"><li>Strategy</li><li>Decisions</li><li>Capital</li></ul>
      <div class="op-arrow" aria-hidden="true">&darr;</div>
      <div class="op-node ai"><strong>AI Agents</strong></div>
      <div class="op-arrow" aria-hidden="true">&darr;</div>
      <ul class="op-row"><li>Research</li><li>Build</li><li>Operations</li></ul>
      <figcaption>An operating model, not a claim of full autonomy. AI agents work within defined permissions, and humans approve high-risk decisions.</figcaption>
    </figure>`,
    "", "h-how"
  );

  const caps = wrap(
    `${SectionHeader({ eyebrow: "Capabilities", title: "Capabilities behind the ventures.", id: "h-cap",
      text: "Seven divisions provide the operating capabilities that Fivers ventures draw on." })}
    <div class="div-grid">${divisions.map(DivisionCard).join("")}</div>`,
    "", "h-cap"
  );

  const founder = wrap(
    `${SectionHeader({ eyebrow: "Founder", title: site.founder.name, id: "h-founder" })}
    <div class="founder">
      <p><strong>${esc(site.founder.title)}.</strong> Business Analyst, Product Owner, and System Analyst by background. Sets the direction, makes the final decisions, and allocates capital at Fivers.</p>
      <a class="btn" href="${site.founder.url}" rel="noopener">View profile</a>
    </div>`,
    "", "h-founder"
  );

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
    body: [hero, story, how, caps, founder, faq, cta].join("\n"),
    jsonld: graph(orgLd(), crumbLd("About", "/about/"), faqLd()),
  };
}

export const pages = () => [home(), discovery(), venturesPage(), businessesPage(), about()];
