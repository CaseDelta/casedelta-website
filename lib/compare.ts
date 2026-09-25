/**
 * The one place a comparison page's content is written down: /compare and
 * /compare/[slug] read from here.
 *
 * RULES FOR THIS FILE
 *
 * 1. Every competitor fact has a public source in `sources`, checked on the date in
 *    `checkedAt`. If a fact cannot be sourced, it does not go in. "Not listed on its
 *    public site" means exactly that: we looked and did not find it, not that the
 *    product cannot do it.
 * 2. Be fair. Every page carries a real "Choose <them> when". Never disparage.
 *    Third-party price estimates are NOT used; a price is either on the vendor's own
 *    page or it is "not published".
 * 3. CaseDelta's own numbers come from lib/pricing.ts and are never retyped here.
 * 4. Never name or imply the model CaseDelta runs on, and never claim CaseDelta
 *    uses no outside AI (see lib/security.ts DO NOT SAY). Security is not compared
 *    here at all: lib/security.ts treats it as parity, never an advantage.
 * 5. No em dashes. Delta is "it". No firm names, customer counts or testimonials,
 *    ours or theirs.
 *
 * lib/compare-links.ts derives the footer, sitemap and redirect lists from these slugs.
 */
import { PRICE_CLAUSE, PRICE_LINE, TIERS } from "./pricing";

export const COMPARE_UPDATED = "2026-09-25";

export interface Source { label: string; url: string }

/** One row of the side-by-side table, for one product. */
export interface Row {
  what: string;
  caseSystem: string;
  across: string;
  schedule: string;
  pricing: string;
  bestFor: string;
}

export interface Column { name: string; row: Row }

export interface Competitor {
  slug: string;
  /** The name in "CaseDelta vs <name>". */
  name: string;
  /** The <title>: "CaseDelta vs <name>: <short honest difference> (2026)". */
  title: string;
  description: string;
  /** One sentence under the hero heading. */
  lead: string;
  /** One line on the /compare index. */
  line: string;
  /** One column per product compared. Usually one; general-ai has three. */
  columns: Column[];
  chooseThem: string[];
  chooseUs: string[];
  qa: { q: string; a: string }[];
  sources: Source[];
  checkedAt: string;
}

const FIRST = TIERS[0];
const LAST = TIERS[TIERS.length - 1];

/** CaseDelta's column. The same on every page. */
export const CASEDELTA_ROW: Row = {
  what: "An AI paralegal that works inside every system your firm already uses.",
  caseSystem: "Yes. Reads and updates the case system you already use, including ones with no API.",
  across: "Yes. Case management, intake, email, documents and billing, all at once.",
  schedule: `Yes. ${FIRST.automations} to ${LAST.automations} automations included, by band.`,
  pricing: PRICE_LINE,
  bestFor: "Plaintiff PI, mass tort and med mal firms that want one assistant across every system.",
};

export const ROW_LABELS: { key: keyof Row; label: string }[] = [
  { key: "what", label: "What it is" },
  { key: "caseSystem", label: "Works inside your case system" },
  { key: "across", label: "Works across email, documents, intake" },
  { key: "schedule", label: "Runs on a schedule" },
  { key: "pricing", label: "Pricing" },
  { key: "bestFor", label: "Best for" },
];

/** Lines every "Choose CaseDelta when" list can draw on. */
const US = {
  across: "You want one assistant across your case system, intake, email and documents",
  schedule: "You want work done on a schedule, like a briefing every morning at 7",
  flat: `You want a flat firm price, from ${FIRST.price} a month, not per case or per seat`,
  noApi: "Your case system or intake tool has no public API",
  keep: "You want to keep every system you use and migrate nothing",
  memory: "You want it to remember your firm's own procedures",
  signIn: "You want it to sign in to each system once, on that system's own page",
};

const PRICE_ANSWER = `CaseDelta is ${PRICE_CLAUSE}.`;

export const COMPETITORS: Competitor[] = [
  {
    slug: "casedelta-vs-evenup",
    name: "EvenUp",
    title: "CaseDelta vs EvenUp: AI paralegal across your systems vs AI demand letters (2026)",
    description: "EvenUp is an AI platform for personal injury firms built around demand letters, with case-based pricing. CaseDelta is an AI paralegal that works inside every system a firm uses, at a flat firm price.",
    lead: "EvenUp drafts demands and case documents. Delta works across every system your firm runs on.",
    line: "Demand letters at volume, or one AI paralegal across every system.",
    columns: [{ name: "EvenUp", row: {
      what: "An AI platform for personal injury firms, best known for demand letters, with optional review by its in-house legal team.",
      caseSystem: "Integrates with named case systems including Litify, SmartAdvocate and CASEpeer.",
      across: "Centered on case files and medical records: drafting, medical chronologies, treatment tracking and communication agents.",
      schedule: "Not listed on its public site.",
      pricing: "Case-based pricing. Rates not published.",
      bestFor: "PI firms producing many demand letters, with the option of expert review.",
    } }],
    chooseThem: [
      "You send a high volume of demand letters",
      "You want an outside legal team to review demands (1 to 5 days)",
      "You prefer to pay per case",
      "You want verdict and settlement data behind your demands",
    ],
    chooseUs: [US.across, US.schedule, US.flat, US.noApi],
    qa: [
      { q: "Is CaseDelta an alternative to EvenUp?", a: "For some work. EvenUp centers on demand letters and PI case documents; CaseDelta is an AI paralegal that works across every system a firm uses. A firm whose main need is demands at volume may be better served by EvenUp." },
      { q: "Can I use EvenUp and CaseDelta together?", a: "Yes. A firm can keep EvenUp for demands and have Delta work across EvenUp, its case system and its email." },
      { q: "Which is cheaper, EvenUp or CaseDelta?", a: `EvenUp uses case-based pricing and does not publish its rates. ${PRICE_ANSWER}` },
      { q: "Does EvenUp work with Filevine?", a: "Filevine is not on EvenUp's integrations page, which names Litify, SmartAdvocate and CASEpeer. Delta works inside Filevine with the firm's own sign-in." },
      { q: "Does CaseDelta write demand letters?", a: "Delta can draft from the records in your own systems. EvenUp offers demands reviewed by its in-house legal team, which CaseDelta does not." },
    ],
    sources: [
      { label: "EvenUp home page", url: "https://www.evenuplaw.com/" },
      { label: "EvenUp Demands", url: "https://www.evenuplaw.com/products/demands/" },
      { label: "EvenUp integrations", url: "https://www.evenuplaw.com/products/integrations/" },
    ],
    checkedAt: COMPARE_UPDATED,
  },
  {
    slug: "casedelta-vs-supio",
    name: "Supio",
    title: "CaseDelta vs Supio: AI across your systems vs AI for records and mass torts (2026)",
    description: "Supio is an AI platform for plaintiff and mass tort firms, built for records review, chronologies and drafting. CaseDelta is an AI paralegal that works inside every system a firm uses, at a flat firm price.",
    lead: "Supio analyzes case records at scale. Delta works across every system your firm runs on.",
    line: "Records review for plaintiff and mass tort firms, or one AI paralegal across every system.",
    columns: [{ name: "Supio", row: {
      what: "An AI platform for plaintiff and mass tort firms: intake, medical chronologies, demands and litigation drafting.",
      caseSystem: "Integrates with Litify, SmartAdvocate, MyCase, CASEpeer, Smokeball, Jove and Neostella.",
      across: "Connects to document storage such as SharePoint, OneDrive, Box and Google Drive, plus Outlook, phone systems and Westlaw.",
      schedule: "Not listed on its public site.",
      pricing: "Case subscription or unlimited firm access. Rates not published.",
      bestFor: "Plaintiff and mass tort firms reviewing large volumes of records.",
    } }],
    chooseThem: [
      "You review large record sets across a mass tort docket",
      "You want chronologies and demands built from records",
      "Your case system is on Supio's integration list",
      "You want Westlaw research connected",
    ],
    chooseUs: [US.across, US.schedule, US.flat, US.noApi],
    qa: [
      { q: "Is CaseDelta an alternative to Supio?", a: "For some work. Supio focuses on analyzing records and drafting from them; CaseDelta is an AI paralegal that reads and updates every system a firm uses. Firms with very large record sets may want Supio for that job." },
      { q: "Can I use Supio and CaseDelta together?", a: "Yes. A firm can keep Supio for records analysis and have Delta work across its case system, intake and email." },
      { q: "Which is cheaper, Supio or CaseDelta?", a: `Supio publishes its plan structure but not its rates. ${PRICE_ANSWER}` },
      { q: "Does Supio work with Filevine?", a: "Filevine is not on Supio's integrations page. Delta works inside Filevine with the firm's own sign-in." },
      { q: "Does Supio limit users or pages?", a: "No. Supio's pricing page lists unlimited usage, users and pages on both plans." },
    ],
    sources: [
      { label: "Supio home page", url: "https://www.supio.com/" },
      { label: "Supio integrations", url: "https://www.supio.com/integrations" },
      { label: "Supio pricing", url: "https://www.supio.com/pricing" },
    ],
    checkedAt: COMPARE_UPDATED,
  },
  {
    slug: "casedelta-vs-eve",
    name: "Eve",
    title: "CaseDelta vs Eve: AI inside your existing systems vs an AI platform for plaintiff firms (2026)",
    description: "Eve is an AI platform for plaintiff firms covering intake, case review, drafting and analytics, and it can serve as a firm's primary system. CaseDelta is an AI paralegal that works inside the systems a firm already uses.",
    lead: "Eve can become your firm's platform. Delta works inside the systems you already have.",
    line: "An AI platform for plaintiff firms, or an AI paralegal inside the systems you keep.",
    columns: [{ name: "Eve", row: {
      what: "An AI platform for plaintiff firms: intake, nightly case review, drafting agents, analytics and structured case data.",
      caseSystem: "Integrates with Filevine, Clio, Litify, SmartAdvocate and Growpath. Some firms use Eve as their primary system.",
      across: "Intake calls, records and bills, plus phone systems such as RingCentral, Zoom Phone and Dialpad.",
      schedule: "Yes. Its Auditor reviews cases nightly.",
      pricing: "Not published.",
      bestFor: "Plaintiff firms that want one AI platform, or a new primary system, from intake to settlement.",
    } }],
    chooseThem: [
      "You want an AI intake team that answers calls around the clock",
      "You are open to replacing or adding a primary system",
      "You want built-in firm analytics on revenue and settlements",
      "You want nightly case review out of the box",
    ],
    chooseUs: [US.keep, US.across, US.noApi, US.flat],
    qa: [
      { q: "Is CaseDelta an alternative to Eve?", a: "For some firms. Eve is a platform that can become a firm's primary system; CaseDelta works inside the systems a firm already uses. A firm ready to move onto a new platform may prefer Eve." },
      { q: "Can I use Eve and CaseDelta together?", a: "Yes. Delta can work across Eve and the firm's other systems, such as its email and billing." },
      { q: "Which is cheaper, Eve or CaseDelta?", a: `Eve does not publish its pricing. ${PRICE_ANSWER}` },
      { q: "Does Eve work with Filevine?", a: "Yes. Eve lists Filevine among its case system integrations. Delta also works inside Filevine." },
      { q: "Do I have to change case systems for either?", a: "No. Eve connects to existing case systems, and Delta works inside the one you already use." },
    ],
    sources: [
      { label: "Eve home page", url: "https://www.eve.legal/" },
      { label: "EveOS platform", url: "https://www.eve.legal/platform" },
      { label: "Eve integrations (workers' comp page FAQ)", url: "https://www.eve.legal/practice-area/workers-compensation" },
      { label: "Eve Atlas", url: "https://www.eve.legal/use-cases/atlas" },
    ],
    checkedAt: COMPARE_UPDATED,
  },
  {
    slug: "casedelta-vs-fasteroutcomes",
    name: "FasterOutcomes",
    title: "CaseDelta vs FasterOutcomes: AI across your systems vs AI document workflows (2026)",
    description: "FasterOutcomes offers Saxon, an AI partner for legal document analysis, drafting and playbooks, plus a firm knowledge base. CaseDelta is an AI paralegal that works inside every system a firm uses, at a flat firm price.",
    lead: "FasterOutcomes works on the documents you give it. Delta works inside every system your firm runs on.",
    line: "AI document analysis and drafting, or one AI paralegal across every system.",
    columns: [{ name: "FasterOutcomes", row: {
      what: "AI workflows for legal and medical practices. Saxon, its legal AI, analyzes documents, drafts, runs playbooks and searches firm knowledge.",
      caseSystem: "Lists a SmartAdvocate integration.",
      across: "Documents you upload, plus a searchable firm knowledge base.",
      schedule: "Not listed on its public site.",
      pricing: "Not published. Depends on workflows, team and implementation.",
      bestFor: "Firms and expert witnesses that want document analysis and drafting workflows.",
    } }],
    chooseThem: [
      "You want document analysis and drafting from files you upload",
      "You want a searchable knowledge base of your firm's work",
      "You use SmartAdvocate and want its integration",
      "You also support expert witness or medical-legal work",
    ],
    chooseUs: [US.across, US.schedule, US.flat, US.noApi],
    qa: [
      { q: "Is CaseDelta an alternative to FasterOutcomes?", a: "For some work. FasterOutcomes centers on analyzing and drafting from documents; CaseDelta reads and updates every system a firm uses." },
      { q: "Can I use FasterOutcomes and CaseDelta together?", a: "Yes. A firm can keep FasterOutcomes for document workflows and have Delta work across its case system, intake and email." },
      { q: "Which is cheaper, FasterOutcomes or CaseDelta?", a: `FasterOutcomes does not publish pricing; it depends on workflows, team and implementation. ${PRICE_ANSWER}` },
      { q: "Does FasterOutcomes work with Filevine?", a: "Filevine is not among the integrations FasterOutcomes lists, which include SmartAdvocate. Delta works inside Filevine with the firm's own sign-in." },
    ],
    sources: [
      { label: "FasterOutcomes home page", url: "https://www.fasteroutcomes.com/" },
      { label: "FasterOutcomes FAQs", url: "https://www.fasteroutcomes.com/frequently-asked-questions/" },
      { label: "FasterOutcomes company page", url: "https://www.fasteroutcomes.com/company/" },
      { label: "FasterOutcomes expert witnesses", url: "https://www.fasteroutcomes.com/expert-witnesses/" },
    ],
    checkedAt: COMPARE_UPDATED,
  },
  {
    slug: "casedelta-vs-filevine-ai",
    name: "Filevine AI",
    title: "CaseDelta vs Filevine AI: AI across every system vs AI inside Filevine (2026)",
    description: "Filevine's AI, LOIS, works on the data inside Filevine: drafting, demands, medical chronologies and deposition tools. CaseDelta works inside Filevine and every other system a firm uses.",
    lead: "Filevine's AI works inside Filevine. Delta works inside Filevine and everything around it.",
    line: "AI inside Filevine, or an AI paralegal inside Filevine and every other system.",
    columns: [{ name: "Filevine AI", row: {
      what: "AI built into Filevine, called LOIS: Ask LOIS, AI drafting, DemandsAI, MedChron, Depo Copilot, Leads AI and LOIS for Word.",
      caseSystem: "Yes, inside Filevine.",
      across: "Works on the case files in Filevine, with an add-in for Word.",
      schedule: "Not listed on its AI pages.",
      pricing: "Custom packages. Rates not published.",
      bestFor: "Firms that run on Filevine and want AI inside it.",
    } }],
    chooseThem: [
      "Your firm's work lives in Filevine",
      "You want AI inside the Filevine screens your team already uses",
      "You want deposition tools like Depo Copilot",
      "You want one vendor for case management and AI",
    ],
    chooseUs: [
      "Your firm also runs on Outlook or Gmail, a billing tool or documents outside Filevine",
      US.schedule,
      "You want a published price",
      US.memory,
    ],
    qa: [
      { q: "Is CaseDelta an alternative to Filevine AI?", a: "It does different work. Filevine's AI works on Filevine data; Delta works inside Filevine and the firm's other systems, such as email, intake and billing." },
      { q: "Can I use Filevine AI and CaseDelta together?", a: "Yes. Delta works inside Filevine with the firm's own sign-in, alongside Filevine's own AI." },
      { q: "Which is cheaper, Filevine AI or CaseDelta?", a: `Filevine builds custom packages and does not publish rates. ${PRICE_ANSWER}` },
      { q: "Does CaseDelta replace Filevine?", a: "No. Filevine stays your system of record. Delta reads and updates it." },
      { q: "What is Filevine's AI called?", a: "LOIS. Filevine's pricing page lists LOIS for Word, Ask LOIS, AI Drafting, Depo Copilot, Depo Summaries, Depo Library, MedChron and Leads AI." },
    ],
    sources: [
      { label: "Filevine AI features", url: "https://www.filevine.com/platform/ai-features-and-solutions/" },
      { label: "Filevine pricing", url: "https://www.filevine.com/pricing/" },
    ],
    checkedAt: COMPARE_UPDATED,
  },
  {
    slug: "casedelta-vs-clio-ai",
    name: "Clio AI",
    title: "CaseDelta vs Clio AI: AI across every system vs AI inside Clio (2026)",
    description: "Clio's AI works inside Clio: Manage AI, formerly Clio Duo, plus Clio Work for research and drafting. CaseDelta works inside Clio and every other system a firm uses, at a flat firm price.",
    lead: "Clio's AI works inside Clio. Delta works inside Clio and everything around it.",
    line: "AI inside Clio, or an AI paralegal inside Clio and every other system.",
    columns: [{ name: "Clio AI", row: {
      what: "AI built into Clio Manage (formerly Clio Duo), plus Clio Work, Clio's AI workspace for legal research and drafting.",
      caseSystem: "Yes, inside Clio.",
      across: "Clio's matters, documents, calendar and billing. Clio Grow adds intake.",
      schedule: "Yes, for reports: Signature plans can have AI build reports on a schedule.",
      pricing: "Clio Manage from $49 per user a month. Higher plans priced on request.",
      bestFor: "Firms that run their practice and billing in Clio.",
    } }],
    chooseThem: [
      "Your firm's work and billing live in Clio",
      "You want AI inside the Clio screens your team already uses",
      "You want legal research in Clio Work",
      "You want Clio's personal injury add-on",
    ],
    chooseUs: [
      "Your firm also runs on Outlook or Gmail, a separate intake tool or documents outside Clio",
      US.schedule,
      "You want a flat firm price, not per user",
      US.memory,
    ],
    qa: [
      { q: "Is CaseDelta an alternative to Clio AI?", a: "It does different work. Clio's AI works inside Clio; Delta works inside Clio and the firm's other systems, such as email and intake." },
      { q: "Can I use Clio AI and CaseDelta together?", a: "Yes. Delta works inside Clio with the firm's own sign-in, alongside Clio's own AI." },
      { q: "Which is cheaper, Clio AI or CaseDelta?", a: `Clio Manage starts at $49 per user a month, and its higher plans are priced on request. ${PRICE_ANSWER}` },
      { q: "What happened to Clio Duo?", a: "Clio's help center describes Manage AI as the evolution of Clio Duo. Its AI features now sit throughout Clio Manage." },
      { q: "Does CaseDelta replace Clio?", a: "No. Clio stays your system of record. Delta reads and updates it." },
    ],
    sources: [
      { label: "Clio pricing", url: "https://www.clio.com/pricing/" },
      { label: "Clio help: Manage AI, the evolution of Clio Duo", url: "https://help.clio.com/hc/en-us/articles/41990965598491-Manage-AI-The-Evolution-of-Clio-Duo" },
      { label: "LawSites: Clio Work as a standalone product", url: "https://www.lawnext.com/2026/04/clio-work-clios-ai-workspace-is-now-available-to-solo-and-smaller-law-firms-as-a-standalone-product.html" },
    ],
    checkedAt: COMPARE_UPDATED,
  },
  {
    slug: "casedelta-vs-lexis-ai",
    name: "Lexis+ AI",
    title: "CaseDelta vs Lexis+ AI (Protégé): case operations vs legal research (2026)",
    description: "Lexis+ with Protégé, formerly Lexis+ AI, is legal AI for research and drafting built on LexisNexis content. CaseDelta is an AI paralegal that works inside a firm's case system, intake, email and documents.",
    lead: "Lexis+ AI researches the law. Delta works inside the systems that run your cases.",
    line: "AI legal research and drafting, or an AI paralegal inside your case systems.",
    columns: [{ name: "Lexis+ AI", row: {
      what: "Lexis+ with Protégé, formerly Lexis+ AI: legal research, drafting and analysis on LexisNexis content, with Shepard's citations.",
      caseSystem: "Not a case system tool. Connects to document systems such as iManage, SharePoint and NetDocuments.",
      across: "Your firm's documents through those systems, plus a secure Vault for large document sets.",
      schedule: "Not listed on its public site.",
      pricing: "Not published. Quoted by LexisNexis, with a free trial.",
      bestFor: "Legal research and drafting grounded in cited authority.",
    } }],
    chooseThem: [
      "You need legal research with Shepard's citation checks",
      "You draft motions and briefs from case law",
      "You want LexisNexis practice guidance and forms",
      "Your firm already subscribes to Lexis+",
    ],
    chooseUs: [
      "You want the work in your case system, intake and email done, not researched",
      US.schedule,
      US.flat,
      US.noApi,
    ],
    qa: [
      { q: "Is CaseDelta an alternative to Lexis+ AI?", a: "No. They do different jobs: Lexis+ AI is for legal research and drafting from authority, and Delta works inside a firm's case system, intake, email and documents." },
      { q: "Can I use Lexis+ AI and CaseDelta together?", a: "Yes. A firm can research in Lexis+ AI and have Delta handle work across its own systems." },
      { q: "Which is cheaper, Lexis+ AI or CaseDelta?", a: `LexisNexis does not publish Lexis+ with Protégé pricing. ${PRICE_ANSWER}` },
      { q: "Is Lexis+ AI now called Protégé?", a: "The product is now Lexis+ with Protégé, formerly Lexis+ AI. Protégé is the AI assistant across LexisNexis products." },
      { q: "Does Lexis+ AI work with Filevine?", a: "LexisNexis lists document systems such as iManage, SharePoint and NetDocuments; case systems like Filevine are not on that list. Delta works inside Filevine." },
    ],
    sources: [
      { label: "Lexis+ with Protégé product page", url: "https://www.lexisnexis.com/en-us/products/lexis-plus-protege.page" },
    ],
    checkedAt: COMPARE_UPDATED,
  },
  {
    slug: "casedelta-vs-chatgpt",
    name: "ChatGPT",
    title: "CaseDelta vs ChatGPT: an AI paralegal inside your systems vs a general assistant (2026)",
    description: "ChatGPT is a general AI assistant with projects, memory, scheduled tasks and apps for Google Workspace and Microsoft 365. CaseDelta is an AI paralegal that works inside a firm's case system, intake, email and documents.",
    lead: "ChatGPT is a general assistant. Delta is an AI paralegal inside your firm's own systems.",
    line: "A general AI assistant, or an AI paralegal inside your case systems.",
    columns: [{ name: "ChatGPT", row: {
      what: "A general AI assistant with projects, memory, scheduled tasks, deep research and apps that connect to other tools.",
      caseSystem: "Not built in. Possible through a custom app or connector the firm sets up.",
      across: "Yes, through apps for Google Workspace, Microsoft 365 and others on business plans.",
      schedule: "Yes. Scheduled tasks on Plus, Pro and Business.",
      pricing: "Business: $20 per user a month billed annually, $25 monthly. Enterprise: custom.",
      bestFor: "General writing, research and analysis across a whole company.",
    } }],
    chooseThem: [
      "You want a general assistant for writing and research",
      "Your team works mainly in Google Workspace or Microsoft 365",
      "You have staff who can build and maintain connectors",
      "You want per-user pricing for a few people",
    ],
    chooseUs: [
      "You want it inside your case system without building a connector",
      US.signIn,
      US.across,
      US.memory,
    ],
    qa: [
      { q: "Is CaseDelta an alternative to ChatGPT?", a: "It does a different job. ChatGPT is a general assistant; Delta is an AI paralegal that works inside a firm's case system, intake, email and documents." },
      { q: "Can ChatGPT see my case system?", a: "Not out of the box. It can reach one through a custom app or connector the firm adds, and community-built connectors for systems like Filevine and Clio exist." },
      { q: "Can I use ChatGPT and CaseDelta together?", a: "Yes. A firm can keep ChatGPT for general writing and have Delta do the work inside its own systems." },
      { q: "Which is cheaper, ChatGPT or CaseDelta?", a: `ChatGPT Business is $20 per user a month billed annually, or $25 monthly. ${PRICE_ANSWER}` },
      { q: "Does ChatGPT Business train on our data?", a: "No. OpenAI states that ChatGPT Business does not train on business data by default." },
    ],
    sources: [
      { label: "ChatGPT pricing", url: "https://chatgpt.com/pricing" },
      { label: "Community Filevine connector (example)", url: "https://github.com/oktopeak/filevine-mcp" },
      { label: "Community Clio connector (example)", url: "https://github.com/oktopeak/clio-mcp" },
    ],
    checkedAt: COMPARE_UPDATED,
  },
  {
    slug: "casedelta-vs-claude",
    name: "Claude",
    title: "CaseDelta vs Claude: an AI paralegal inside your systems vs a general assistant (2026)",
    description: "Claude is a general AI assistant with projects, memory, connectors and scheduled tasks. CaseDelta is an AI paralegal that works inside a firm's case system, intake, email and documents.",
    lead: "Claude is a general assistant. Delta is an AI paralegal inside your firm's own systems.",
    line: "A general AI assistant, or an AI paralegal inside your case systems.",
    columns: [{ name: "Claude", row: {
      what: "A general AI assistant with projects, memory, connectors and scheduled tasks.",
      caseSystem: "Not built in. Possible through a connector the firm adds.",
      across: "Yes, through connectors, including Microsoft 365, on paid plans.",
      schedule: "Yes. Scheduled tasks on paid plans.",
      pricing: "Team: $20 per seat a month billed annually, $25 monthly. Enterprise: $20 per seat plus usage.",
      bestFor: "General writing, research and analysis across a whole company.",
    } }],
    chooseThem: [
      "You want a general assistant for writing and research",
      "Your team works mainly in Microsoft 365 or other connected tools",
      "You have staff who can build and maintain connectors",
      "You want per-seat pricing for a few people",
    ],
    chooseUs: [
      "You want it inside your case system without building a connector",
      US.signIn,
      US.across,
      US.memory,
    ],
    qa: [
      { q: "Is CaseDelta an alternative to Claude?", a: "It does a different job. Claude is a general assistant; Delta is an AI paralegal that works inside a firm's case system, intake, email and documents." },
      { q: "Can Claude see my case system?", a: "Not out of the box. It can reach one through a connector the firm adds, and community-built connectors for systems like Filevine and Clio exist." },
      { q: "Can I use Claude and CaseDelta together?", a: "Yes. A firm can keep Claude for general writing and have Delta do the work inside its own systems." },
      { q: "Which is cheaper, Claude or CaseDelta?", a: `Claude Team is $20 per seat a month billed annually, or $25 monthly. ${PRICE_ANSWER}` },
      { q: "Does Claude Team train on our data?", a: "No. The Claude pricing page states no model training on your content by default for Team and Enterprise." },
    ],
    sources: [
      { label: "Claude pricing", url: "https://claude.com/pricing" },
      { label: "Community Filevine connector (example)", url: "https://github.com/oktopeak/filevine-mcp" },
      { label: "Community Clio connector (example)", url: "https://github.com/oktopeak/clio-mcp" },
    ],
    checkedAt: COMPARE_UPDATED,
  },
  {
    slug: "casedelta-vs-general-ai",
    name: "Gemini, Copilot and Grok",
    title: "CaseDelta vs Gemini, Copilot and Grok: an AI paralegal vs general AI assistants (2026)",
    description: "Gemini, Microsoft 365 Copilot and Grok are general AI assistants tied to their own suites and connectors. CaseDelta is an AI paralegal that works inside a firm's case system, intake, email and documents.",
    lead: "General assistants work best inside their own suites. Delta works inside every system your firm runs on.",
    line: "Gemini, Microsoft Copilot and Grok, or an AI paralegal inside your case systems.",
    columns: [
      { name: "Gemini", row: {
        what: "Google's AI assistant, included in Google Workspace.",
        caseSystem: "Not built in.",
        across: "Gmail, Docs, Drive and the rest of Google Workspace.",
        schedule: "Yes. Scheduled actions on qualifying plans.",
        pricing: "Google Workspace Business: $7 to $22 per user a month, Gemini included.",
        bestFor: "Firms on Google Workspace.",
      } },
      { name: "Microsoft Copilot", row: {
        what: "Microsoft's AI assistant, built into Microsoft 365.",
        caseSystem: "Not built in.",
        across: "Outlook, Word, Excel, PowerPoint and Teams.",
        schedule: "Not listed on the pricing page checked.",
        pricing: "Copilot Business: $21 per user a month paid yearly, added to a Microsoft 365 plan.",
        bestFor: "Firms on Microsoft 365.",
      } },
      { name: "Grok", row: {
        what: "xAI's AI assistant, with a business plan.",
        caseSystem: "Not built in. Supports connectors, including your own MCP server.",
        across: "Through connectors such as Slack, Notion and Salesforce.",
        schedule: "Not listed on the business page checked.",
        pricing: "Grok Business: $30 per user a month. Enterprise: custom.",
        bestFor: "Teams that want real-time search and connectors.",
      } },
    ],
    chooseThem: [
      "You want an assistant inside Gmail and Docs, or Outlook and Word",
      "You already pay for Google Workspace or Microsoft 365",
      "You want general writing and research",
      "You have staff who can build and maintain connectors",
    ],
    chooseUs: [
      "You want it inside your case system without building a connector",
      US.signIn,
      US.across,
      US.memory,
    ],
    qa: [
      { q: "Is CaseDelta an alternative to Gemini, Copilot or Grok?", a: "It does a different job. They are general assistants; Delta is an AI paralegal that works inside a firm's case system, intake, email and documents." },
      { q: "Does Microsoft Copilot work with my Outlook email?", a: "Yes. Copilot is built into Outlook, Word, Excel, PowerPoint and Teams. Delta also works in Outlook, and in the firm's case system at the same time." },
      { q: "Can these assistants see my case system?", a: "Not out of the box. Each can reach other tools only through connectors the firm sets up." },
      { q: "Can I use them and CaseDelta together?", a: "Yes. A firm can keep its suite's assistant for writing and have Delta do the work inside its case systems." },
      { q: "Which is cheaper?", a: `Per user, the general assistants cost less: Workspace Business runs $7 to $22, Copilot Business $21 and Grok Business $30 a month. ${PRICE_ANSWER}` },
    ],
    sources: [
      { label: "Google Workspace pricing", url: "https://workspace.google.com/pricing" },
      { label: "Gemini scheduled actions", url: "https://support.google.com/gemini/answer/16316416" },
      { label: "Microsoft Copilot for business", url: "https://www.microsoft.com/en-us/microsoft-365/copilot/business" },
      { label: "Grok Business", url: "https://x.ai/grok/business" },
    ],
    checkedAt: COMPARE_UPDATED,
  },
];

const bySlug = Object.fromEntries(COMPETITORS.map((c) => [c.slug, c]));
export function competitor(slug: string): Competitor | undefined {
  return bySlug[slug];
}
