/* ─── Competitor Comparison Data ───
   Every factual claim about a competitor here is sourced from the competitor's
   own site or a credible third party (verified June 2026). House rules:
   - Never claim a competitor "sends your data to OpenAI" or names a subprocessor.
   - Security is treated as PARITY (both sides use enterprise AI under no-training
     terms); we do NOT claim a no-third-party-LLM architecture advantage.
   - Differentiate on shape: the integration layer, transparent flat pricing,
     chronologies in minutes with no human-review queue, breadth, and context.
*/

export interface ComparisonRow {
  feature: string;
  casedelta: string;
  competitor: string;
}

export interface ComparisonSection {
  heading: string;
  body: string;
}

export interface ComparisonFAQ {
  question: string;
  answer: string;
}

export interface Comparison {
  slug: string;
  competitor: string;
  /** short label for nav/index cards */
  cardBlurb: string;
  metaTitle: string;
  metaDescription: string;
  /** GEO definition-first opening paragraph */
  geoOpening: string;
  heroHeadline: string;
  heroSubheadline: string;
  /** the one-line summary of the difference, shown as a callout */
  bottomLine: string;
  table: ComparisonRow[];
  sections: ComparisonSection[];
  /** honest "when the competitor is the better choice" section */
  whenToChoose: { heading: string; body: string };
  faq: ComparisonFAQ[];
}

const FLAT_PRICE = "$349 per user, per month. Flat, published, self-serve.";

export const COMPARISONS: Comparison[] = [
  /* ════════════════════════════════════════════ EVENUP ════════════════════════════════════════════ */
  {
    slug: "casedelta-vs-evenup",
    competitor: "EvenUp",
    cardBlurb:
      "EvenUp is a deliverable factory you send a case to. CaseDelta is an associate that works inside the tools you already run.",
    metaTitle: "CaseDelta vs EvenUp: The Difference Is Shape, Not Features",
    metaDescription:
      "CaseDelta vs EvenUp for personal injury firms. EvenUp ingests a case and returns a demand in days. Delta drives your existing stack and works the whole case, at a flat $349 per user.",
    geoOpening:
      "CaseDelta is an AI associate for plaintiff law firms that drives the tools a firm already uses, while EvenUp is a claims-intelligence platform that ingests a case file and returns documents like demand letters and medical chronologies. The core difference is shape: EvenUp is a deliverable you order, and CaseDelta is an associate that works across your whole stack.",
    heroHeadline: "CaseDelta vs EvenUp",
    heroSubheadline:
      "EvenUp is the best-known name in plaintiff AI, and its verdict dataset is genuinely useful for anchoring case value. But it is a place you send a case to get a document back. CaseDelta is an associate that drives Clio, Filevine, your email, drive, and billing, and works the whole matter.",
    bottomLine:
      "EvenUp returns a deliverable in a few days. Delta works the case in your own tools, in minutes, at a price you can see before the demo.",
    table: [
      { feature: "Shape", casedelta: "An AI associate that drives your existing tools and does the surrounding work", competitor: "A platform you send a case to, which returns documents" },
      { feature: "Integrations", casedelta: "Drives Clio, Filevine, MyCase, Google, Microsoft, and billing from one chat", competitor: "Case data flows one way into EvenUp from connected systems" },
      { feature: "Chronology turnaround", casedelta: "Built in minutes inside your stack", competitor: "Reviewed deliverables stated at one to five days on EvenUp's site" },
      { feature: "Human review layer", casedelta: "No review queue; you stay in control in real time", competitor: "A team of 150+ legal professionals reviews output" },
      { feature: "Pricing", casedelta: FLAT_PRICE, competitor: "Quote-gated per-case pricing, no public list price" },
      { feature: "Scope", casedelta: "Intake, chronologies, demands, discovery, email, and case ops", competitor: "Focused on PI demand and claims deliverables" },
    ],
    sections: [
      {
        heading: "A factory you feed, or an associate you ask",
        body: "EvenUp's model is to ingest your case and hand back a deliverable. That is a real service, and its 250,000-plus verdict and settlement dataset gives credible case-value arguments. But you are ordering an artifact. Delta is the opposite shape. It works inside Clio, Filevine, your email, your drive, and your billing, and it does the surrounding work: pulling records, building the chronology, drafting the demand, emailing the adjuster, and logging the time. You are not waiting on a deliverable. You are working with an associate.",
      },
      {
        heading: "Minutes in your stack, not days through a queue",
        body: "EvenUp's reviewed deliverables are stated on its own site at one to five days, with a team of legal professionals reviewing AI output. That review is a trust anchor, but it is also a speed and cost ceiling. Delta builds cited chronologies from 100 to 5,000-plus page sets in minutes, with no review queue, because the work happens in your own tools while you watch.",
      },
      {
        heading: "Know your price before the demo",
        body: "EvenUp moved to a per-case pricing model in 2026 and publishes no list price; you get a quote. CaseDelta is " + FLAT_PRICE.toLowerCase() + " No per-case math, no add-ons, no surprise invoice. For a contingency firm, predictable cost is its own feature.",
      },
    ],
    whenToChoose: {
      heading: "When EvenUp is the better fit",
      body: "If your only need is data-backed case-value anchoring for demand letters, and you want EvenUp's verdict dataset specifically, it is a strong, category-leading tool for exactly that job. CaseDelta is the better fit when you want an associate that works the whole case across the tools you already run, not a single deliverable you order.",
    },
    faq: [
      { question: "Is CaseDelta cheaper than EvenUp?", answer: "CaseDelta is a flat $349 per user, per month, published and self-serve. EvenUp uses quote-gated per-case pricing with no public list price, so a direct number-to-number comparison is not possible. The honest difference is predictability: you know your CaseDelta cost before the demo." },
      { question: "Does CaseDelta replace EvenUp?", answer: "For most plaintiff firms, yes, because Delta builds the chronologies and demands itself and also runs the surrounding case work. If you specifically want EvenUp's verdict dataset for case-value anchoring, some firms run both." },
      { question: "How fast are CaseDelta's chronologies versus EvenUp's?", answer: "Delta builds cited chronologies in minutes inside your own stack. EvenUp states reviewed deliverable turnaround at one to five days on its site, because a team of legal professionals reviews the output." },
    ],
  },

  /* ════════════════════════════════════════════ SUPIO ════════════════════════════════════════════ */
  {
    slug: "casedelta-vs-supio",
    competitor: "Supio",
    cardBlurb:
      "Supio is a strong document-intelligence product you feed. CaseDelta is an associate that runs your whole operation.",
    metaTitle: "CaseDelta vs Supio: Operational Layer vs Document Product",
    metaDescription:
      "CaseDelta vs Supio for plaintiff firms. Supio's chronologies are genuinely good and human-reviewed. Delta works your whole case across your tools, in minutes, with no review queue, at a flat $349 per user.",
    geoOpening:
      "CaseDelta is an AI associate that drives a firm's existing tools and works the whole case, while Supio is a plaintiff-focused document-intelligence platform that turns medical records into chronologies, demands, and case ledgers. Supio's output is genuinely strong and human-reviewed; the difference is that Supio is a product you feed and CaseDelta is an associate that operates across your stack.",
    heroHeadline: "CaseDelta vs Supio",
    heroSubheadline:
      "We will not pretend our chronologies are more accurate than Supio's. Theirs are good, and human-reviewed. The difference is shape, speed without a queue, and scope: Delta runs your whole operation, not just the document.",
    bottomLine:
      "Supio produces excellent documents on a review queue. Delta does the whole job across your tools, in minutes, at a published price.",
    table: [
      { feature: "Shape", casedelta: "An AI associate across intake, drafting, discovery, email, and case ops", competitor: "A document-intelligence product for chronologies, demands, and ledgers" },
      { feature: "Chronology quality", casedelta: "Cited, primary-source, multi-agent over large sets", competitor: "Genuinely strong and human-expert reviewed" },
      { feature: "Turnaround", casedelta: "Minutes, no review queue", competitor: "Human-QA tiers add review time" },
      { feature: "Pricing", casedelta: FLAT_PRICE, competitor: "Quote-gated, no public pricing" },
      { feature: "Breadth of work", casedelta: "Runs the surrounding case work, not just the document", competitor: "Focused on document output and case economics" },
      { feature: "Context", casedelta: "Answers grounded in your real matter across every system", competitor: "Works the files you load into Supio" },
    ],
    sections: [
      {
        heading: "Accuracy is table stakes, so we compete on shape",
        body: "Supio is well capitalized, plaintiff-native, and backed by Thomson Reuters, and it powered analysis behind a $495M verdict. Its chronologies are clean and source-pinned. We are not going to win a chronology-accuracy bake-off, and we will not claim to. The difference is that Supio is a product you feed your files to, and Delta is an associate that drives the tools you already run and does the work around the document too.",
      },
      {
        heading: "No review queue, and a price you can see",
        body: "Supio's human-expert review is a real trust anchor, and it is also a speed and cost ceiling: you wait on a queue and you negotiate a quote. Delta delivers cited chronologies in minutes with no review queue, and CaseDelta is " + FLAT_PRICE.toLowerCase() + " For a 5 to 50 attorney firm, transparent and self-serve beats an enterprise sales motion.",
      },
      {
        heading: "The whole job, not just the document",
        body: "Supio hands back outputs. Delta keeps going: it drafts the demand, emails the adjuster, updates the case file, calculates damages, and logs the time across Clio, Filevine, your email, and billing. It is one associate doing the operation, not one more system to feed.",
      },
    ],
    whenToChoose: {
      heading: "When Supio is the better fit",
      body: "If you are a larger plaintiff or mass-tort firm whose primary need is best-in-class, human-reviewed medical chronologies and case ledgers, and you value the Thomson Reuters relationship and the enterprise success team, Supio is an excellent, proven choice. CaseDelta is the better fit when you want an operational associate across your whole stack at a transparent, self-serve price.",
    },
    faq: [
      { question: "Are CaseDelta's chronologies as accurate as Supio's?", answer: "Supio's chronologies are genuinely strong and human-reviewed, and we treat chronology accuracy as table stakes rather than a selling point. Delta produces cited, primary-source chronologies over large sets in minutes. We compete on shape, speed without a queue, and breadth, not on an accuracy claim." },
      { question: "Does Supio integrate with my CMS?", answer: "Yes. Supio markets a two-way CMS integration, which is one of its stronger areas, so we do not knock Supio on integration. The difference is that Delta is the operational associate that runs the work across those systems, where Supio is the document product you feed." },
      { question: "What does Supio cost compared to CaseDelta?", answer: "Supio is quote-gated with no public pricing. CaseDelta is a flat $349 per user, per month, published and self-serve. The contrast is transparency and predictability, not a confirmed dollar gap." },
    ],
  },

  /* ════════════════════════════════════════════ EVE ════════════════════════════════════════════ */
  {
    slug: "casedelta-vs-eve",
    competitor: "Eve",
    cardBlurb:
      "Eve is a destination you move your firm into. CaseDelta lives in the tools you already pay for.",
    metaTitle: "CaseDelta vs Eve: Drive Your Stack, or Move Into Theirs",
    metaDescription:
      "CaseDelta vs Eve (eve.legal) for plaintiff firms. Same 'AI associate' words, opposite shape. Delta drives the tools you already run; Eve is a platform you work inside. Flat $349 per user, self-serve.",
    geoOpening:
      "CaseDelta is an AI associate that drives the tools a plaintiff firm already runs, while Eve is a vertical legal-AI platform that firms work inside to become, in Eve's words, an AI-Native firm. Both use the AI associate framing; the difference is that Eve is a destination you move into and CaseDelta is a layer over the stack you already pay for.",
    heroHeadline: "CaseDelta vs Eve",
    heroSubheadline:
      "Eve and CaseDelta use almost the same words: an associate that works your whole case. The difference is direction. Eve wants your firm to move in. Delta lives in the tools you already use and drives them.",
    bottomLine:
      "Eve is a place you go to work. Delta is the associate that works inside the tools you already have.",
    table: [
      { feature: "Shape", casedelta: "A layer that drives your existing tools", competitor: "A destination platform your firm works inside" },
      { feature: "Integrations", casedelta: "Drives Clio, Filevine, MyCase, Google, Microsoft, billing from one chat", competitor: "Connects to Clio, Filevine, MyCase for intake and data flow" },
      { feature: "Large record sets", casedelta: "No advertised page ceiling on chronologies", competitor: "Reviewers on G2 report a per-session document or page limit" },
      { feature: "Pricing", casedelta: FLAT_PRICE, competitor: "Quote-gated; reviewers describe per-user pricing as high" },
      { feature: "Onboarding", casedelta: "Five-minute self-serve connection for any public-API platform", competitor: "Reviewers note a learning curve and process rework" },
      { feature: "Context", casedelta: "Grounded in your real matter across every system", competitor: "Works within the Eve platform" },
    ],
    sections: [
      {
        heading: "Same words, opposite direction",
        body: "Eve's pitch is that every attorney gets an associate, and that your firm becomes AI-Native by running work inside Eve. Delta's pitch is the inverse: it lives in Clio, Filevine, MyCase, your email, your drive, and your billing, and drives them. One asks you to move in. The other moves in with you. For a firm that already has a stack it likes, that direction is the whole decision.",
      },
      {
        heading: "No page ceiling on the big record sets",
        body: "Eve consolidates medical records into chronologies, and reviewers on G2 report a per-session document or page limit that can force summarizing or removing files. On a 3,000 to 5,000 page med-mal set, that is a real wall. Delta's multi-agent orchestration has no advertised page ceiling on the largest sets.",
      },
      {
        heading: "A price you can see, and a five-minute connect",
        body: "Eve is quote-gated, and reviewers describe per-user pricing as high and note a setup learning curve. CaseDelta is " + FLAT_PRICE.toLowerCase() + " with five-minute self-serve onboarding for any platform that has a public API. Know your price, and be running the same afternoon.",
      },
    ],
    whenToChoose: {
      heading: "When Eve is the better fit",
      body: "If your firm wants to commit fully to one vertical platform and rebuild its workflows inside it, and you are comfortable with an enterprise, demo-gated motion, Eve is a well-funded, fast-growing choice with strong intake and drafting. CaseDelta is the better fit when you want to keep the stack you already run and add an associate on top of it.",
    },
    faq: [
      { question: "How is CaseDelta different from Eve if both are 'AI associates'?", answer: "The words are similar; the shape is opposite. Eve is a destination platform your firm works inside. CaseDelta is a layer that drives the tools you already pay for, including Clio, Filevine, MyCase, your email, drive, and billing, from one chat." },
      { question: "Does Eve have a document limit?", answer: "Reviewers on G2 report a per-session document or page limit that can require summarizing or removing files. Delta has no advertised page ceiling on large chronology sets, which matters on big med-mal and mass-tort records." },
      { question: "What does Eve cost versus CaseDelta?", answer: "Eve is quote-gated with no public pricing, and reviewers describe per-user pricing as high. CaseDelta is a flat $349 per user, per month, published and self-serve." },
    ],
  },

  /* ════════════════════════════════════════════ CLIO ════════════════════════════════════════════ */
  {
    slug: "casedelta-vs-clio",
    competitor: "Clio",
    cardBlurb:
      "Clio's AI sees only Clio's data. CaseDelta unifies your whole case across every system, including Clio.",
    metaTitle: "CaseDelta vs Clio AI (Manage AI / Duo): One System vs Every System",
    metaDescription:
      "CaseDelta vs Clio's Manage AI. Clio's built-in AI sees only what is in Clio. Delta drives Clio and your email, drive, billing, and other tools, and builds large chronologies Clio's assistant does not.",
    geoOpening:
      "CaseDelta is an AI associate that drives a firm's whole stack, while Clio's Manage AI (formerly Clio Duo) is a built-in assistant that works on the data inside Clio Manage. The difference is reach: Clio's assistant sees only Clio's own data, and Delta unifies the whole matter across every system the firm runs, including Clio itself.",
    heroHeadline: "CaseDelta vs Clio's AI",
    heroSubheadline:
      "Keep Clio. Delta works with it. Clio's Manage AI is useful inside Clio, but it only sees Clio's own data. Most firms run more than one system, and Delta is the only thing that unifies the whole picture.",
    bottomLine:
      "Clio's AI knows what is in Clio. Delta knows the whole case, across Clio and everything else you run.",
    table: [
      { feature: "Reach", casedelta: "Drives Clio plus email, drive, billing, and other case tools", competitor: "Manage AI operates on Clio Manage's own data" },
      { feature: "Model", casedelta: "Enterprise AI, used under no-training agreements", competitor: "Built on Microsoft Azure OpenAI GPT-4, per Clio's site" },
      { feature: "Chronologies", casedelta: "Cited chronologies over 100 to 5,000-plus page sets", competitor: "Lightweight tasks: summarizing, date extraction, drafting" },
      { feature: "Cross-system view", casedelta: "Unifies the whole matter across systems", competitor: "Single-system view within Clio" },
      { feature: "Pricing", casedelta: FLAT_PRICE, competitor: "Quote-gated add-on on top of your Clio subscription" },
      { feature: "Migration", casedelta: "Nothing to migrate; works with the Clio you run", competitor: "Requires your firm to be on Clio" },
    ],
    sections: [
      {
        heading: "Single-system context versus the whole case",
        body: "Clio's Manage AI is a genuinely handy assistant for working inside Clio: summarizing a document, extracting dates, drafting an email, suggesting a time entry. But it only ever sees what is in Clio. Most firms run a case manager plus email plus a drive plus a billing tool plus physical files. Delta is the only thing that unifies the whole picture, and it drives Clio as one of those systems rather than being limited to it.",
      },
      {
        heading: "Built for fact development, not just light tasks",
        body: "Clio's assistant is built on Microsoft Azure OpenAI GPT-4 and is scoped to lightweight work. It has no native engine for cited chronologies across thousands of pages of medical records. That large-corpus, multi-agent fact development is exactly Delta's hero capability, purpose-built for plaintiff work.",
      },
      {
        heading: "Work with Clio, do not bet everything on it",
        body: "You like that Clio is built for your practice, and you should keep it. The question is whether your AI should be limited to one platform's four walls. Delta sits above your system of record and drives Clio and everything else, so you are not consolidating your entire firm onto one mega-platform just to get an AI associate.",
      },
    ],
    whenToChoose: {
      heading: "When Clio's built-in AI is enough",
      body: "If your entire practice already lives inside Clio, and your needs are light (summaries, date extraction, quick drafting on Clio's own data), Manage AI is a convenient add-on and you may not need more. CaseDelta is the better fit when you run more than one system, or when you need real chronology and case-development work across your whole stack.",
    },
    faq: [
      { question: "Does CaseDelta replace Clio?", answer: "No. Delta works with Clio, not against it. It drives Clio and your email, drive, billing, and other tools from one chat. You keep Clio as your system of record." },
      { question: "Why not just use Clio's Manage AI?", answer: "Manage AI is useful, but it only sees data inside Clio and is scoped to light tasks. Delta unifies the whole case across every system you run and does large-corpus work like cited medical chronologies that Clio's assistant does not." },
      { question: "What AI does Clio's assistant use?", answer: "Per Clio's own site, Manage AI is built on Microsoft Azure OpenAI GPT-4. Both Clio and CaseDelta use enterprise AI under terms that do not train on your data, so the meaningful difference is reach and capability, not the model." },
    ],
  },

  /* ════════════════════════════════════════════ PROPLAINTIFF ════════════════════════════════════════════ */
  {
    slug: "casedelta-vs-proplaintiff",
    competitor: "ProPlaintiff",
    cardBlurb:
      "ProPlaintiff connects to cloud storage only. CaseDelta actually drives your CMS and your whole stack.",
    metaTitle: "CaseDelta vs ProPlaintiff: Storage App vs Operational Layer",
    metaDescription:
      "CaseDelta vs ProPlaintiff.ai, the nearest mirror. ProPlaintiff connects to Drive, Dropbox, and OneDrive only. Delta drives Clio, Filevine, and MyCase, with flat per-user pricing instead of usage credits.",
    geoOpening:
      "CaseDelta is an AI associate that drives a plaintiff firm's case-management and full stack, while ProPlaintiff.ai is an agentic PI tool that connects to cloud storage and produces demands, chronologies, and document analysis. They are close in spirit; the difference is that ProPlaintiff connects only to file storage, and CaseDelta operates the firm's actual case-management systems.",
    heroHeadline: "CaseDelta vs ProPlaintiff",
    heroSubheadline:
      "ProPlaintiff is our nearest mirror: agentic, PI-native, chat-driven, with cited output. So the difference has to be specific. It comes down to integrations, pricing shape, and chronology depth.",
    bottomLine:
      "ProPlaintiff is an app you upload files into. Delta is the associate that works inside the tools you already run.",
    table: [
      { feature: "Integrations", casedelta: "Drives Clio, Filevine, MyCase, plus email, drive, and billing", competitor: "Connects to Google Drive, Dropbox, and OneDrive only" },
      { feature: "CMS control", casedelta: "Operates your case-management system directly", competitor: "Per its FAQ, does not yet support CMS integrations" },
      { feature: "Pricing", casedelta: FLAT_PRICE, competitor: "Published, but usage-metered Law Credits that can vary with volume" },
      { feature: "Chronology depth", casedelta: "Multi-agent over 100 to 5,000-plus page sets", competitor: "Source-linked chronologies from uploaded files" },
      { feature: "Scope", casedelta: "Works the whole case across your stack", competitor: "Works the files you upload" },
    ],
    sections: [
      {
        heading: "The integration gap is the whole difference",
        body: "ProPlaintiff's own FAQ states that it connects to Google Drive, Dropbox, and OneDrive, and does not yet support integrations with other CMS providers. That means its intake-to-settlement claim runs on the files you upload, not on the systems you run. Delta actually drives Clio, Filevine, and MyCase, plus your email, drive, and billing, from one chat. For the nearest mirror, that is the decisive, concrete difference.",
      },
      {
        heading: "Flat per-user, not usage credits",
        body: "ProPlaintiff publishes its pricing, which we respect, but it is a usage-metered Law Credits model that can get unpredictable as document volume grows. CaseDelta is " + FLAT_PRICE.toLowerCase() + " A full associate seat, not a meter that ticks up with every heavy case.",
      },
      {
        heading: "Built for the biggest record sets",
        body: "Both tools produce cited, source-linked chronologies. Delta's multi-agent orchestration is built for the 100 to 5,000-plus page med-mal and mass-tort sets where single-pass generation strains, so the depth holds up on the cases that matter most.",
      },
    ],
    whenToChoose: {
      heading: "When ProPlaintiff is the better fit",
      body: "If your case files live entirely in Google Drive, Dropbox, or OneDrive, you do not need deep CMS control, and a usage-credit model suits your volume, ProPlaintiff is a capable, transparent option. CaseDelta is the better fit when you want to drive your actual case-management system and pay a flat, predictable per-user price.",
    },
    faq: [
      { question: "Does ProPlaintiff integrate with Clio or Filevine?", answer: "Per ProPlaintiff's own FAQ, it connects to Google Drive, Dropbox, and OneDrive and does not yet support other CMS integrations. CaseDelta drives Clio, Filevine, and MyCase directly, along with your email, drive, and billing." },
      { question: "How does pricing compare?", answer: "ProPlaintiff publishes a usage-metered Law Credits model, which can vary with document volume. CaseDelta is a flat $349 per user, per month, so a heavy case does not change your bill." },
      { question: "Is CaseDelta just a ProPlaintiff clone?", answer: "They share the agentic, PI-native, chat-driven approach. The concrete differences are deep CMS integration that drives your actual systems, flat per-user pricing instead of usage credits, and multi-agent chronology depth on the largest record sets." },
    ],
  },

  /* ════════════════════════════════════════════ CHATGPT ════════════════════════════════════════════ */
  {
    slug: "casedelta-vs-chatgpt",
    competitor: "ChatGPT",
    cardBlurb:
      "ChatGPT answers your question. Delta answers it about your actual case, and keeps an audit trail for bar compliance.",
    metaTitle: "CaseDelta vs ChatGPT for Law Firms: Context Is the Whole Difference",
    metaDescription:
      "CaseDelta vs ChatGPT for legal work. ChatGPT has no idea who your client is. Delta works your real matters across your tools, never trains on your data, and logs every action for ABA Rule 1.6.",
    geoOpening:
      "CaseDelta is an AI associate built for law firms that works a firm's real cases across its tools, while ChatGPT is a general-purpose assistant with no knowledge of a firm's matters, systems, or files. The difference is context: ChatGPT answers the question you type, and Delta answers it about your actual client, grounded in the real file.",
    heroHeadline: "CaseDelta vs ChatGPT",
    heroSubheadline:
      "You have tried ChatGPT. It gave you a confident answer about the law. It has no idea who your client is, what is in their file, or what you decided last week. That gap is the whole point.",
    bottomLine:
      "ChatGPT knows the law in general. Delta knows your case in particular, and proves every answer against the real file.",
    table: [
      { feature: "Context", casedelta: "Works your real matter across case files, email, and drive", competitor: "No knowledge of your client, file, or systems" },
      { feature: "Integrations", casedelta: "Drives Clio, Filevine, MyCase, Google, Microsoft, billing", competitor: "None; you paste in text by hand" },
      { feature: "Citations", casedelta: "Cites primary sources from your actual file", competitor: "Can fabricate citations with no file to check against" },
      { feature: "Audit trail", casedelta: "Every action logged for ABA Rule 1.6", competitor: "No matter-level audit trail" },
      { feature: "Your data", casedelta: "Never used to train AI; isolated per firm", competitor: "Free and Plus inputs may be used to improve models unless you opt out" },
      { feature: "Built for", casedelta: "Plaintiff legal workflows end to end", competitor: "General-purpose tasks" },
    ],
    sections: [
      {
        heading: "A smart answer, or a smart answer about your real client",
        body: "A general AI will answer the question you ask, confidently, even when your premise is wrong, because it has never seen the file. Delta answers as the facts actually are, because it has the case. In law, where a wrong premise can sink a matter, that difference is not a nicety. It is the entire value. The killer line: context makes answers correct even when the human is wrong.",
      },
      {
        heading: "Built for Rule 1.6, not against it",
        body: "Pasting client details into ChatGPT's free or Plus tier raises a real confidentiality problem: those inputs may be used to improve the model unless you opt out, and there is no matter-level audit trail to show what you shared. Delta never uses your data to train AI, isolates each firm's data, and logs every action so you can demonstrate reasonable efforts under ABA Rule 1.6.",
      },
      {
        heading: "It drives your tools; ChatGPT waits for you to paste",
        body: "With ChatGPT, you are the integration: you copy text out of Clio or a PDF, paste it in, copy the answer back. Delta drives the tools directly. It reads the discovery, builds the chronology, drafts the demand, and updates the case file, without you shuttling text between windows.",
      },
    ],
    whenToChoose: {
      heading: "When ChatGPT is the right tool",
      body: "For general drafting, brainstorming, and learning that involves no client confidential information, ChatGPT is a powerful, inexpensive assistant. The line is client data: the moment a real matter is involved, you want a tool that knows the case, cites the real file, never trains on your data, and keeps an audit trail.",
    },
    faq: [
      { question: "Is it safe to use ChatGPT with client information?", answer: "Using ChatGPT's free or Plus tier with client data is risky: inputs may be used to improve the model unless you opt out, and there is no matter-level audit trail. CaseDelta never uses your data to train AI, isolates each firm's data, and logs every action for ABA Rule 1.6." },
      { question: "Why can't I just paste my case into ChatGPT?", answer: "You can, but ChatGPT only knows what you paste, can fabricate citations with no file to check against, and keeps no audit trail. Delta works your real matter across your tools, cites primary sources from the actual file, and answers grounded in your case rather than generic law." },
      { question: "Does CaseDelta use the same AI as ChatGPT?", answer: "CaseDelta uses enterprise AI under agreements that do not train on your data, applied to your real cases inside your tools, with citations and an audit trail. The difference is not a chatbot; it is an associate that knows your firm's matters." },
    ],
  },
];

export function getAllComparisonSlugs(): string[] {
  return COMPARISONS.map((c) => c.slug);
}

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return COMPARISONS.find((c) => c.slug === slug);
}
