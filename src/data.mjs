// Single source of truth for site content. Edit here, then run `npm run build`.

export const site = {
  name: "Fivers Corp",
  // Set SITE_URL at build time, e.g. SITE_URL=https://example.com npm run build
  url: (process.env.SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? "https://" + process.env.VERCEL_PROJECT_PRODUCTION_URL : "__SITE_URL__")).replace(/\/$/, ""),
  tagline: "Discover. Build. Operate.",
  founder: {
    name: "Afif Firmansyah",
    title: "Founder & Director",
    url: "https://afiffirmansyah.com",
  },
  disclaimer:
    "Trading and investment involve risk. Forex Agent runs in demo mode only, and nothing on this site is financial advice.",
  year: 2026,
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/about/", label: "About" },
  { href: "/technology/", label: "Technology" },
  { href: "/ventures/", label: "Ventures" },
  { href: "/businesses/", label: "Businesses" },
];

export const contact = { href: "/about/#contact", label: "Contact" };

// Statuses: live | building | experiment
export const ventures = [
  {
    name: "Veluna",
    short: "Digital wedding invitation and event platform.",
    category: "Weddings & events",
    description:
      "AI-assisted digital wedding invitation and event platform: invitations, personal guest links, RSVP, and memories in one place.",
    status: "live",
    href: "https://veluna.afiffirmansyah.com",
    linkLabel: "Visit Veluna",
  },
  {
    name: "Financial Tracker",
    short: "Personal finance platform.",
    category: "Personal finance",
    description:
      "Personal finance platform for budgets, expenses, income, savings goals, and reports, built around Needs, Wants, and Savings.",
    status: "live",
  },
  {
    name: "Fivers Digital Office",
    short: "The AI office. Main product.",
    flagship: true,
    category: "AI workspace",
    description:
      "The main product: an AI office where entertainment and development needs alike can produce something, and where Fivers' derivative products are developed.",
    status: "building",
  },
  {
    name: "LinguaFlow",
    short: "Language learning platform, Japanese first.",
    category: "Education",
    description:
      "Language learning platform with leveled practice. Japanese comes first, with more languages planned.",
    status: "building",
  },
  {
    name: "FiveClip",
    short: "AI-powered content clipping.",
    category: "Media",
    description:
      "AI-powered content clipping venture, starting with gaming and streamer moments. Early MVP stage.",
    status: "experiment",
  },
  {
    name: "Forex Agent",
    short: "AI market research, demo mode only.",
    category: "Market research",
    description:
      "AI-assisted market research and trading experiment. Runs in demo mode only.",
    status: "experiment",
    note: "Demo mode only. Not financial advice.",
    href: "https://forexagent.afiffirmansyah.com",
    linkLabel: "See Forex Agent",
  },
];

export const statusInfo = {
  live: { label: "Live", blurb: "Deployed and running." },
  building: { label: "Building", blurb: "In active development." },
  experiment: { label: "Experiment", blurb: "Small tests to learn before committing." },
};

export const stages = [
  {
    n: "01",
    key: "DISCOVER",
    lead: "Understand the opportunity.",
    items: ["Problem", "User", "Jobs to be done", "Market", "Competitors", "Opportunity"],
  },
  {
    n: "02",
    key: "VALIDATE",
    lead: "Challenge assumptions through:",
    items: ["Research", "Market signals", "User feedback", "Demand validation", "Business model validation"],
  },
  {
    n: "03",
    key: "EXPERIMENT",
    lead: "Build the smallest useful experiment, such as:",
    items: ["Prototype", "MVP", "Landing page", "Internal tool", "Technical proof of concept"],
  },
  {
    n: "04",
    key: "DECIDE",
    lead: "Choose an outcome. Build is never the default.",
    items: ["Build", "Iterate", "Experiment", "Partner", "Park", "Kill"],
  },
];

export const outcomes = [
  { key: "BUILD", text: "Commit resources and build it." },
  { key: "ITERATE", text: "Improve the idea and test again." },
  { key: "EXPERIMENT", text: "Run another small experiment." },
  { key: "PARTNER", text: "Work with someone better placed to do it." },
  { key: "PARK", text: "Not now. Revisit when conditions change." },
  { key: "KILL", text: "Stop. Learn from it and move on." },
];

export const evaluationAreas = [
  "Problem & User",
  "Market",
  "Competition",
  "Business Model",
  "Distribution",
  "Technical Feasibility",
  "AI Leverage",
  "Operational Complexity",
  "Risk",
  "Validation Signals",
];

export const pipeline = ["Opportunity", "Discovery", "Validation", "Experiment", "Decision"];

export const businesses = [
  {
    title: "Agriculture",
    slug: "shallot",
    short: "Shallot farming in Brebes",
    tag: "Early stage",
    text: "Shallot farming, and occasionally rice, as a family business in Brebes, Central Java. Still run conventionally, the traditional way.",
    icon: "sprout",
  },
  {
    title: "Layer Chicken",
    slug: "hens",
    short: "Layer chicken farming",
    tag: "Early stage",
    text: "A family layer chicken business in Brebes, Central Java, with Afif Firmansyah as the seller of the layer chickens. Run conventionally today. Automation and digital products are only a possible future step, mainly to help with marketing and reach more people.",
    icon: "egg",
  },
];

export const location = "Brebes, Central Java, Indonesia";

export const divisions = [
  { code: "TECH", name: "Technology & Digital Solutions", text: "End-to-end technology services: consulting, engineering, integration, automation, and operations." },
  { code: "AIDP", name: "AI & Digital Product", text: "Reusable AI capabilities and digital products, starting with internal needs." },
  { code: "CBD", name: "Commercial & Business Development", text: "Market research, prospecting, sales, partnerships, and customer retention." },
  { code: "MCB", name: "Digital Media & Content Ventures", text: "Media assets and content ventures built with AI-assisted production." },
  { code: "DBI", name: "Data & Business Intelligence", text: "Reliable data and reproducible metrics behind business decisions." },
  { code: "CAP", name: "Capital, Investment & Trading", text: "Disciplined, data-driven capital management. Research and simulation only for now." },
  { code: "VIS", name: "Venture & Innovation Studio", text: "Finding and validating new business opportunities with evidence." },
];

export const faqs = [
  {
    q: "What is Fivers Corp?",
    a: "Fivers Corp is an AI-native venture studio that discovers, builds, and operates digital products, experiments, and real-world businesses.",
  },
  {
    q: "What does Fivers build?",
    a: "Its main product is Fivers Digital Office, an AI office in development. Around it are digital products such as Veluna and Financial Tracker (live), LinguaFlow (in development), and experiments such as FiveClip and Forex Agent.",
  },
  {
    q: "How did Fivers start?",
    a: "Fivers started from tinkering with AI and trying to turn everyday activities into products. That led to the idea of an AI office, Fivers Digital Office, where any need, entertainment or development, can produce something.",
  },
  {
    q: "What is Fivers Digital Office?",
    a: "The main product of Fivers: an AI office, currently in development, where AI agents support work and where derivative products are developed.",
  },
  {
    q: "Where is Fivers based?",
    a: "Fivers is based in Indonesia. Its real-world family businesses are in Brebes, Central Java.",
  },
  {
    q: "What are Fivers' businesses?",
    a: "Two early-stage family businesses in Brebes, Central Java: agriculture (shallot farming, and occasionally rice) and layer chicken. Both are run conventionally today. For the layer chicken business, automation and digital products are only a possible future step, mainly for marketing.",
  },
  {
    q: "How does Fivers use AI?",
    a: "AI agents support research, analysis, building, and operations within defined permissions. Humans set direction, make decisions, and approve high-risk actions.",
  },
  {
    q: "Do Fivers' farm and coop use AI?",
    a: "No. The shallot and rice farming and the layer chicken business are run conventionally today. Any automation or digital product for the layer chicken business is a possible future step, mainly to help with marketing and reach more people, and it is not live.",
  },
  {
    q: "What is an AI-native venture studio?",
    a: "A company that designs its research, building, and operations around AI from the start, and uses that to explore and run several ventures instead of a single product.",
  },
  {
    q: "What is Fivers Discovery?",
    a: "The research and validation layer of Fivers, where ideas are investigated, assumptions are challenged, and decisions are made before significant resources are committed.",
  },
  {
    q: "How does Fivers decide what to build?",
    a: "Each opportunity moves through Discover, Validate, Experiment, and Decide. The decision can be to build, iterate, experiment further, partner, park, or kill.",
  },
  {
    q: "Does every idea become a product?",
    a: "No. Some ideas become products, some become experiments, and some should never be built. Discovery exists to find out which is which.",
  },
];

export const principles = [
  { n: "01", title: "Look before building.", text: "Investigate the problem, the user, and the market before any significant resource is committed." },
  { n: "02", title: "Decide on evidence.", text: "Every opportunity ends in an explicit decision: build, iterate, experiment, partner, park, or kill." },
  { n: "03", title: "Humans stay accountable.", text: "AI agents research, build, and operate within defined permissions. Direction, capital, and high-risk decisions stay human." },
  { n: "04", title: "Be honest about stage.", text: "Live, building, and experiment mean what they say. Early-stage businesses are shown as early stage." },
];

export const story = [
  { era: "Where it started", title: "Tinkering with AI", text: "Fivers began as curiosity: playing with AI and trying to turn everyday activities into products." },
  { era: "What it became", title: "An AI office", text: "That grew into the idea of an AI office, a platform where any need, whether entertainment or development, can produce something. Fivers Digital Office is that platform and the main product." },
  { era: "What comes from it", title: "Derivative products and real businesses", text: "Derivative products are developed from the platform, such as Veluna, Financial Tracker, LinguaFlow, and FiveClip. Alongside software, Fivers is rooted in family businesses in Brebes, Central Java, which are still run conventionally." },
];

export const pillars = [
  { n: "01", key: "Discover", tone: "lime", text: "Find opportunities worth pursuing. Investigate the problem, the user, and the market, and challenge assumptions early.", chips: ["Research", "Validation", "Decision"] },
  { n: "02", key: "Build", tone: "text", text: "Turn validated opportunities into products and experiments, with AI agents working alongside the people who set direction.", chips: ["Products", "Experiments", "AI-assisted"] },
  { n: "03", key: "Operate", tone: "gold", text: "Run digital products and real-world businesses over time, from software in production to a farm in Brebes.", chips: ["Digital", "Real-world", "Day to day"] },
];

export const marquee = ["Digital products", "Experiments", "Real-world businesses", "AI-native", "Human-led", "Brebes, Central Java", "Discover", "Build", "Operate"];

export const founderValues = ["Integrity", "Direction", "Impact"];
