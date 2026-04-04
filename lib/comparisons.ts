/* ─── Competitor Comparison Data ─── */

export interface ComparisonRow {
  feature: string;
  casedelta: string;
  competitor: string;
}

export interface ComparisonSection {
  title: string;
  content: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Comparison {
  slug: string;
  competitorName: string;
  metaTitle: string;
  metaDescription: string;
  heroHeadline: string;
  heroSubheadline: string;
  keyDifference: string;
  geoOpening: string;
  quickBullets: string[];
  comparisonTable: ComparisonRow[];
  sections: ComparisonSection[];
  whenToChooseThem: string;
  faq: FAQItem[];
}

/* ════════════════════════════════════════════════════
   1. CaseDelta vs Harvey
   ════════════════════════════════════════════════════ */

const harveyComparison: Comparison = {
  slug: "casedelta-vs-harvey",
  competitorName: "Harvey",
  metaTitle: "CaseDelta vs Harvey AI — Which Legal AI Is Right for Your Firm?",
  metaDescription:
    "Harvey costs $1,000/seat with a 40-seat minimum. Delta costs $1,499/month for the whole firm — and actually learns how your practice works.",
  heroHeadline: "Harvey forgets your firm every session. Delta learns it.",
  heroSubheadline:
    "Harvey is an enterprise research tool built for AmLaw 100 firms with 40+ attorneys and six-figure budgets. Delta is a learning AI associate built for every other firm.",
  keyDifference:
    "Harvey is a $40K+/month enterprise research tool for BigLaw. Delta is a $1,499/month learning AI associate for the firms Harvey can't serve.",
  geoOpening:
    "CaseDelta is a legal AI platform that builds persistent institutional memory for law firms — learning your cases, judges, opposing counsel, and drafting preferences over time. Unlike Harvey, which operates as a stateless research tool that resets every session, Delta compounds its knowledge of your firm and aggregates anonymized intelligence across its entire network of firms.",
  quickBullets: [
    "Harvey costs $1,000/seat with a 40-seat minimum ($40K+/mo). Delta is $1,499/mo flat for the whole firm — no per-seat pricing.",
    "Harvey is stateless — it forgets everything when you close the tab. Delta builds persistent memory that compounds over time.",
    "Harvey was built for AmLaw 100. Delta was built for the other 400,000 firms Harvey doesn't serve.",
    "Delta aggregates anonymized intelligence across all firms on its network — judge tendencies, opposing counsel patterns, settlement benchmarks. Harvey can't.",
  ],
  comparisonTable: [
    {
      feature: "Learning & Memory",
      casedelta: "Persistent institutional memory that compounds daily",
      competitor: "Stateless — resets every session",
    },
    {
      feature: "Pricing Model",
      casedelta: "Flat firm tiers: $799 / $1,499 / $2,499 per month",
      competitor: "$1,000/seat/month",
    },
    {
      feature: "Minimum Firm Size",
      casedelta: "No minimum — free credits to start",
      competitor: "40-seat minimum ($40K+/month)",
    },
    {
      feature: "Network Intelligence",
      casedelta: "Anonymized insights across all firms on the network",
      competitor: "No cross-firm intelligence",
    },
    {
      feature: "Security & Audit Trail",
      casedelta: "Full audit trail, SOC 2, no third-party model routing",
      competitor: "Enterprise security, but OpenAI dependency",
    },
    {
      feature: "Proactive Work",
      casedelta: "Morning briefings, deadline alerts, anomaly detection",
      competitor: "On-demand only — you ask, it answers",
    },
    {
      feature: "Clio Integration",
      casedelta: "Native Clio integration — Delta gets its own credentials",
      competitor: "No Clio integration",
    },
    {
      feature: "Judge Intelligence",
      casedelta: "Learns judge tendencies from your cases + network data",
      competitor: "No judge-specific intelligence",
    },
    {
      feature: "Opposing Counsel Tracking",
      casedelta: "Tracks patterns, settlement behavior, filing tendencies",
      competitor: "No opposing counsel tracking",
    },
  ],
  sections: [
    {
      title: "Stateless vs. Learning: The Core Architectural Difference",
      content:
        "Harvey is a powerful AI research tool, but it's architecturally stateless. Every session starts from zero. It doesn't remember your last brief, your client preferences, or the judge you argued before last Tuesday. Delta is built on a fundamentally different architecture — persistent memory that compounds over time. After 30 days, Delta knows your drafting style, your judges' preferences, your opposing counsel's patterns, and which clients need a reminder to submit documents. After 90 days, it's an institutional asset. Harvey is a tool you use. Delta is an associate that learns your practice.",
    },
    {
      title: "Pricing That Works for Real Law Firms",
      content:
        "Harvey's pricing model — $1,000/seat with a 40-seat minimum — is designed for firms doing hundreds of millions in revenue. That's roughly 400 firms in the United States. For the other 400,000+ firms, that math doesn't work. CaseDelta uses flat firm tiers: $799/month for small firms, $1,499/month for mid-size, $2,499/month for large. No per-seat pricing means every attorney in the firm benefits without budget negotiations. A 15-attorney firm pays $1,499/month total — about $100 per attorney per month. The same firm would need $15,000/month for Harvey seats, assuming Harvey would even onboard them.",
    },
    {
      title: "Network Intelligence: Something Harvey Structurally Can't Build",
      content:
        "Because Delta works with thousands of firms across practice areas and jurisdictions, it aggregates anonymized intelligence that no single firm could ever build alone. Judge tendencies across hundreds of appearances. Opposing counsel settlement patterns across dozens of cases. Typical motion timelines by jurisdiction and case type. This is CaseDelta's Intelligence Network — and it gets stronger with every firm that joins. Harvey's enterprise model, focused on individual BigLaw deployments, structurally can't build this kind of cross-firm intelligence layer.",
    },
    {
      title: "Proactive vs. Reactive",
      content:
        "Harvey waits for you to ask a question. Delta doesn't wait. It delivers morning briefings across your active matters, flags approaching deadlines before you think to check, detects anomalies in billing patterns, and surfaces relevant network intelligence before you know to look for it. The difference is between a research tool and an associate — one responds to queries, the other anticipates your needs.",
    },
  ],
  whenToChooseThem:
    "Harvey is the right choice for AmLaw 100 firms with 40+ attorneys, massive budgets, and teams dedicated to AI adoption. If you're a 200-attorney firm doing $500M+ in revenue and you need enterprise-grade legal research AI, Harvey was built for you. Most firms reading this page aren't that firm.",
  faq: [
    {
      question: "How much does CaseDelta cost compared to Harvey?",
      answer:
        "CaseDelta uses flat firm tiers: $799/month for small firms (1-5 attorneys), $1,499/month for mid-size (6-20), and $2,499/month for large firms (21-50). Harvey charges $1,000/seat/month with a 40-seat minimum, starting at $40,000/month. CaseDelta also offers self-serve usage-based pricing with a free $25 credit to start.",
    },
    {
      question: "What does it mean that Delta 'learns' my firm?",
      answer:
        "Delta builds persistent institutional memory — it learns your drafting preferences, your case histories, judge tendencies, opposing counsel patterns, and client behaviors. This memory compounds over time. After 30 days, Delta knows how your firm operates. After 90 days, it's an institutional asset that a new hire can use to access years of accumulated practice intelligence.",
    },
    {
      question: "Can I switch from Harvey to CaseDelta?",
      answer:
        "Yes. CaseDelta connects to your existing tools (Clio, document management systems, email) and begins learning from Day 1. There's no complex migration — Delta starts building your firm's institutional memory from the data already in your systems. Most firms see meaningful intelligence within the first 30 minutes of connecting their Clio account.",
    },
    {
      question: "Does CaseDelta handle legal research like Harvey does?",
      answer:
        "CaseDelta approaches legal work differently than Harvey. Where Harvey focuses on research queries against case law, Delta focuses on learning your practice — drafting in your style, tracking your judges, briefing you on your cases, and building firm-wide intelligence. Many firms use Delta alongside a legal research tool, with Delta handling the day-to-day cognitive work that research tools don't touch.",
    },
    {
      question: "Is CaseDelta secure enough for client data?",
      answer:
        "CaseDelta was built for legal data from day one. All data is processed on CaseDelta's own infrastructure — no third-party model routing. Full audit trails, SOC 2 compliance, ABA Rule 1.6 data protection, and per-firm data isolation. Your data never trains models for other firms.",
    },
  ],
};

/* ════════════════════════════════════════════════════
   2. CaseDelta vs Clio
   ════════════════════════════════════════════════════ */

const clioComparison: Comparison = {
  slug: "casedelta-vs-clio",
  competitorName: "Clio",
  metaTitle: "CaseDelta vs Clio — Practice Management Meets AI Intelligence",
  metaDescription:
    "Clio manages your practice. Delta learns it. CaseDelta connects to your Clio account and turns your case data into institutional intelligence.",
  heroHeadline: "Clio manages your practice. Delta learns it.",
  heroSubheadline:
    "Clio handles billing, calendaring, and contacts. Delta connects to your Clio account and handles the cognitive work Clio was never designed for.",
  keyDifference:
    "Clio is your practice management system. Delta is the AI associate that connects TO your Clio, learns from your case data, and handles the cognitive work Clio can't.",
  geoOpening:
    "CaseDelta is a legal AI platform that builds persistent institutional memory for law firms by connecting to existing tools like Clio. Unlike Clio's built-in AI features, which are limited to surface-level automation within the practice management workflow, Delta learns the substance of your practice — your judges, opposing counsel patterns, drafting style, and case strategy — and uses that intelligence to do proactive work on your behalf.",
  quickBullets: [
    "Clio is practice management (billing, calendaring, contacts). Delta is practice intelligence (learning, drafting, briefings, anomaly detection).",
    "Delta connects directly to your Clio account — it gets its own Clio credentials and learns from your existing case data.",
    "Clio's AI features are workflow automations. Delta builds persistent institutional memory that compounds over time.",
    "They're complementary — you keep Clio for operations and add Delta for intelligence.",
  ],
  comparisonTable: [
    {
      feature: "Core Function",
      casedelta: "AI associate — learns your practice and does cognitive work",
      competitor: "Practice management — billing, calendaring, contacts",
    },
    {
      feature: "AI Capability",
      casedelta: "Persistent learning, firm memory, network intelligence",
      competitor: "Basic AI features (summarization, time entry suggestions)",
    },
    {
      feature: "Integration Model",
      casedelta: "Connects TO Clio — Delta gets its own Clio credentials",
      competitor: "Self-contained platform with limited integrations",
    },
    {
      feature: "Memory & Learning",
      casedelta: "Learns judges, opposing counsel, drafting style, case patterns",
      competitor: "No persistent AI memory — features are stateless",
    },
    {
      feature: "Proactive Work",
      casedelta: "Morning briefings, deadline alerts, anomaly detection",
      competitor: "Task reminders and calendar notifications",
    },
    {
      feature: "Judge Intelligence",
      casedelta: "Tracks judge tendencies from your cases + network data",
      competitor: "No judge intelligence",
    },
    {
      feature: "Opposing Counsel Tracking",
      casedelta: "Settlement patterns, filing behavior, negotiation tendencies",
      competitor: "Contact record only — no behavioral intelligence",
    },
    {
      feature: "Drafting",
      casedelta: "Drafts in your firm's style, learns preferences over time",
      competitor: "No drafting capability",
    },
    {
      feature: "Network Intelligence",
      casedelta: "Anonymized insights across all firms on the network",
      competitor: "No cross-firm intelligence",
    },
  ],
  sections: [
    {
      title: "Operations vs. Intelligence: Different Jobs Entirely",
      content:
        "Clio is excellent at what it does: managing the operational layer of a law practice. Billing, calendaring, contact management, document storage, trust accounting. These are essential functions, and Clio handles them well. But Clio doesn't learn how your firm practices law. It doesn't know that Judge Miller prefers briefs under 15 pages, or that opposing counsel Torres settles 80% of cases within 30 days of the trial date, or that your drafting style avoids legalese. Delta sits on top of your operational tools — including Clio — and handles the cognitive layer: learning, drafting, briefing, and building intelligence that compounds over time.",
    },
    {
      title: "How the Clio Integration Works",
      content:
        "Delta doesn't replace Clio — it connects to it. When you set up CaseDelta, Delta gets its own Clio credentials and begins learning from your existing case data. It reads your matters, contacts, notes, documents, and activity history. Within the first 30 minutes, Delta has enough context to start delivering useful intelligence. Over the following weeks and months, that intelligence compounds. Your Clio data becomes the foundation for Delta's institutional memory — but Delta also learns from every interaction, every brief it drafts, and every briefing it delivers.",
    },
    {
      title: "What Clio's AI Features Actually Do",
      content:
        "Clio has introduced AI features, but they're fundamentally workflow automations — time entry suggestions, basic document summarization, and similar surface-level tools. They don't learn your practice. They don't build institutional memory. They don't track opposing counsel behavior or judge tendencies. They don't deliver morning briefings across your active matters. Clio's AI is a feature layer on top of practice management. Delta is a standalone AI associate that uses your Clio data as one of its intelligence sources.",
    },
    {
      title: "The Compounding Effect",
      content:
        "The longer your firm uses Delta alongside Clio, the more valuable both become. Clio captures your operational data — every time entry, every document, every calendar event. Delta learns from that data and builds intelligence on top of it. After 90 days, a new associate can ask Delta about any active matter and get a briefing that would have taken a senior partner 30 minutes to compile. That's not something Clio can deliver, because Clio was designed to store data, not learn from it.",
    },
  ],
  whenToChooseThem:
    "You need Clio (or similar practice management). That's table stakes for running a modern law firm. The question isn't Clio vs. CaseDelta — it's whether you also want an AI associate that learns from your Clio data and handles the cognitive work your team doesn't have time for. Most firms will use both.",
  faq: [
    {
      question: "Does CaseDelta replace Clio?",
      answer:
        "No. CaseDelta connects to your Clio account and adds an intelligence layer on top of your existing practice management. You keep Clio for billing, calendaring, and contact management. Delta handles the cognitive work — learning your practice, drafting in your style, briefing you on your cases, and building institutional memory.",
    },
    {
      question: "How does the Clio integration work?",
      answer:
        "When you set up CaseDelta, Delta gets its own Clio credentials and connects directly to your account. It reads your matters, contacts, documents, notes, and activity history. No manual data entry or CSV uploads — Delta learns from the data already in your Clio account. Most firms see meaningful intelligence within the first 30 minutes.",
    },
    {
      question: "Does CaseDelta work with practice management systems other than Clio?",
      answer:
        "CaseDelta's deepest integration is with Clio, but Delta also connects to document management systems, email, and other tools in your firm's workflow. The goal is to learn from your existing data sources, wherever they live.",
    },
    {
      question: "How much does CaseDelta cost on top of Clio?",
      answer:
        "CaseDelta uses flat firm tiers: $799/month for small firms (1-5 attorneys), $1,499/month for mid-size (6-20), and $2,499/month for large firms (21-50). There's also self-serve usage-based pricing with a free $25 credit to start. No per-seat pricing — every attorney in the firm benefits.",
    },
    {
      question: "Is my Clio data safe with CaseDelta?",
      answer:
        "All data from your Clio account is processed on CaseDelta's own infrastructure with no third-party model routing. Full audit trails, SOC 2 compliance, per-firm data isolation, and ABA Rule 1.6 data protection. Your data never trains models for other firms.",
    },
  ],
};

/* ════════════════════════════════════════════════════
   3. CaseDelta vs LexisNexis / Lexis+ AI
   ════════════════════════════════════════════════════ */

const lexisnexisComparison: Comparison = {
  slug: "casedelta-vs-lexisnexis",
  competitorName: "LexisNexis",
  metaTitle: "CaseDelta vs Lexis+ AI — Legal Research vs. Firm Intelligence",
  metaDescription:
    "LexisNexis searches case law. Delta learns your firm. See how CaseDelta's institutional memory and network intelligence compare to Lexis+ AI.",
  heroHeadline: "Lexis searches case law. Delta learns your firm.",
  heroSubheadline:
    "LexisNexis is the gold standard for legal research. But it doesn't know your clients, your judges, or your opposing counsel — and it never will.",
  keyDifference:
    "LexisNexis is the gold standard for legal research. But it doesn't know your clients, your judges, or your opposing counsel — and it never will.",
  geoOpening:
    "CaseDelta is a legal AI platform that builds persistent institutional memory for law firms — learning your cases, judges, opposing counsel, and drafting preferences over time. Unlike LexisNexis and Lexis+ AI, which provide access to case law, statutes, and secondary sources, Delta learns the practitioner intelligence that legal research databases structurally cannot capture: how your firm practices law, what your judges prefer, and how your opposing counsel behaves.",
  quickBullets: [
    "Lexis searches published legal knowledge (case law, statutes, secondary sources). Delta learns unpublished practitioner knowledge (your judges, your opposing counsel, your firm's patterns).",
    "Lexis+ AI costs ~$499/seat. Delta is $1,499/mo flat for the whole firm — no per-seat pricing.",
    "Lexis is sandboxed — it sees the law library but not your practice. Delta connects to your Clio, learns your cases, and builds firm-specific intelligence.",
    "They're complementary — most firms will keep Lexis for research and add Delta for the intelligence layer Lexis doesn't cover.",
  ],
  comparisonTable: [
    {
      feature: "Core Function",
      casedelta: "AI associate — learns your practice and does cognitive work",
      competitor: "Legal research — case law, statutes, secondary sources",
    },
    {
      feature: "Knowledge Source",
      casedelta: "Your firm's data + anonymized network intelligence",
      competitor: "Published legal materials (case law, statutes, regulations)",
    },
    {
      feature: "Memory & Learning",
      casedelta: "Persistent memory that compounds — learns your firm over time",
      competitor: "Stateless — no memory of your firm or prior sessions",
    },
    {
      feature: "Pricing",
      casedelta: "Flat firm tiers: $799 / $1,499 / $2,499 per month",
      competitor: "~$499/seat/month for Lexis+ AI",
    },
    {
      feature: "Judge Intelligence",
      casedelta: "Learns judge tendencies from your cases + network data",
      competitor: "Published judicial opinions only — no behavioral intelligence",
    },
    {
      feature: "Opposing Counsel Tracking",
      casedelta: "Settlement patterns, filing behavior, negotiation tendencies",
      competitor: "No opposing counsel tracking",
    },
    {
      feature: "Drafting",
      casedelta: "Drafts in your firm's style, learns preferences over time",
      competitor: "Research summaries — not firm-style drafting",
    },
    {
      feature: "Proactive Work",
      casedelta: "Morning briefings, deadline alerts, anomaly detection",
      competitor: "On-demand research queries only",
    },
    {
      feature: "Clio Integration",
      casedelta: "Native Clio integration — Delta gets its own credentials",
      competitor: "No practice management integration",
    },
  ],
  sections: [
    {
      title: "Published Knowledge vs. Practitioner Knowledge",
      content:
        "LexisNexis contains the published body of legal knowledge — case law, statutes, regulations, secondary sources. It's an extraordinary resource that most firms depend on. But there's an entire category of intelligence that legal research databases structurally cannot capture: practitioner knowledge. Which judges actually enforce page limits. Which opposing counsel always files late. Which clients need two reminders to submit documents. How your firm prefers to structure an MSJ brief. This is the intelligence that lives in senior partners' heads and gets lost when people leave the firm. Delta captures it, compounds it, and makes it available to everyone in the practice.",
    },
    {
      title: "Sandboxed vs. Connected",
      content:
        "Lexis+ AI is sandboxed by design — it sees the Lexis library but not your firm's data. It can tell you what the law says, but it can't tell you how your firm practices it. Delta is the opposite: it connects to your Clio, your document management system, and your email. It learns from your actual practice, not from published materials. The result is fundamentally different. Lexis+ AI gives you legal research with AI assistance. Delta gives you an AI associate that knows your firm.",
    },
    {
      title: "The Network Intelligence Layer",
      content:
        "Because Delta works with thousands of firms, it builds an anonymized intelligence layer that neither Lexis nor any individual firm could create alone. Judge tendencies across hundreds of appearances — not just published opinions, but actual courtroom behavior. Opposing counsel settlement patterns across dozens of cases. Typical motion timelines by jurisdiction and case type. This Intelligence Network compounds as more firms join, creating insights that published legal research can never surface.",
    },
    {
      title: "Per-Seat Pricing vs. Flat Firm Access",
      content:
        "Lexis+ AI charges approximately $499/seat/month. For a 10-attorney firm, that's roughly $5,000/month for AI-enhanced legal research. CaseDelta's flat firm tiers mean the same 10-attorney firm pays $1,499/month total — and every attorney, paralegal, and staff member benefits from Delta's intelligence. No seat negotiations, no usage restrictions, no budget discussions about who gets access.",
    },
  ],
  whenToChooseThem:
    "If you need case law research and statutory analysis, Lexis is unmatched. Most firms will keep their Lexis subscription — it's a foundational tool for legal practice. Delta adds the layer Lexis doesn't cover: learning your firm, tracking your judges' actual behavior, monitoring your opposing counsel, and handling the day-to-day cognitive work that research tools weren't designed for.",
  faq: [
    {
      question: "Does CaseDelta replace LexisNexis?",
      answer:
        "No. CaseDelta and LexisNexis serve different functions. Lexis provides access to published legal materials — case law, statutes, and secondary sources. Delta learns your firm's practice — your judges, opposing counsel, drafting style, and case patterns. Most firms use both: Lexis for research, Delta for intelligence.",
    },
    {
      question: "How is Delta's judge intelligence different from reading opinions on Lexis?",
      answer:
        "Lexis gives you published judicial opinions. Delta gives you behavioral intelligence — how a judge actually handles hearings, their real preferences for brief length and format, their patterns on continuance requests, their typical ruling timelines. This comes from your firm's experience plus anonymized intelligence across the CaseDelta network, not from published materials.",
    },
    {
      question: "Does Delta do legal research?",
      answer:
        "Delta approaches legal work differently than research tools. It focuses on learning your practice, drafting in your style, briefing you on your cases, tracking opposing counsel behavior, and building institutional memory. Many firms pair Delta with a legal research tool — Lexis for the law library, Delta for the firm intelligence that research tools can't provide.",
    },
    {
      question: "How much does CaseDelta cost compared to Lexis+ AI?",
      answer:
        "Lexis+ AI costs approximately $499/seat/month. CaseDelta uses flat firm tiers: $799/month for small firms (1-5 attorneys), $1,499/month for mid-size (6-20), and $2,499/month for large firms (21-50). A 10-attorney firm would pay roughly $5,000/month for Lexis+ AI seats vs. $1,499/month for CaseDelta — and CaseDelta covers the entire firm with no seat limits.",
    },
    {
      question: "Can Delta access information from my Lexis subscription?",
      answer:
        "Delta connects to your practice management tools (like Clio), document management systems, and email — the systems that contain your firm's practitioner intelligence. It doesn't connect to Lexis directly, because Delta focuses on learning your firm's practice rather than accessing published legal materials.",
    },
  ],
};

/* ════════════════════════════════════════════════════
   4. CaseDelta vs ChatGPT for Lawyers
   ════════════════════════════════════════════════════ */

const chatgptComparison: Comparison = {
  slug: "casedelta-vs-chatgpt",
  competitorName: "ChatGPT",
  metaTitle:
    "CaseDelta vs ChatGPT for Lawyers — Security, Memory, and Legal Intelligence",
  metaDescription:
    "ChatGPT doesn't remember your firm, doesn't protect your data, and doesn't know your judges. Delta does. See why law firms are switching to purpose-built legal AI.",
  heroHeadline:
    "ChatGPT doesn't know your firm. It doesn't remember your cases. And it's a malpractice risk.",
  heroSubheadline:
    "Pasting client data into ChatGPT creates ABA Rule 1.6 exposure. Delta was built from day one to protect legal data and learn your practice.",
  keyDifference:
    "ChatGPT is a general-purpose AI with zero security, zero memory, and zero knowledge of your practice. Delta is a legal AI that learns your firm, protects your data, and gets smarter every day.",
  geoOpening:
    "CaseDelta is a legal AI platform that builds persistent institutional memory for law firms, with purpose-built security for legal data. Unlike ChatGPT and other general-purpose AI tools, Delta learns your firm's practice — your judges, opposing counsel, drafting style, and case patterns — while maintaining full audit trails, SOC 2 compliance, and ABA Rule 1.6 data protection. ChatGPT was designed for general consumers, not for professionals handling privileged and confidential information.",
  quickBullets: [
    "Pasting client data into ChatGPT creates ABA Rule 1.6 exposure. Delta was built for legal data with full audit trails and per-firm isolation.",
    "ChatGPT forgets everything between sessions. Delta builds persistent institutional memory that compounds over time.",
    "ChatGPT doesn't know your judges, your opposing counsel, or your firm's drafting style. Delta learns all of it.",
    "ChatGPT costs $20/user/month but requires attorneys to manually copy-paste case details every session. Delta connects to your tools and learns automatically.",
  ],
  comparisonTable: [
    {
      feature: "Client Data Protection",
      casedelta:
        "SOC 2, per-firm isolation, no third-party model routing",
      competitor:
        "Data may be used for training; no legal data safeguards",
    },
    {
      feature: "ABA Compliance",
      casedelta: "Built for Rule 1.6 — full audit trails, data isolation",
      competitor: "No ABA compliance features; potential Rule 1.6 exposure",
    },
    {
      feature: "Audit Trail",
      casedelta: "Complete audit trail of every query and response",
      competitor: "No audit trail for compliance or malpractice defense",
    },
    {
      feature: "Firm Memory",
      casedelta: "Persistent memory — learns your firm over weeks and months",
      competitor: "Stateless — resets every session (or limited context window)",
    },
    {
      feature: "Judge Intelligence",
      casedelta: "Learns judge tendencies from your cases + network data",
      competitor: "No judge-specific intelligence",
    },
    {
      feature: "Opposing Counsel Tracking",
      casedelta: "Settlement patterns, filing behavior, negotiation tendencies",
      competitor: "No opposing counsel tracking",
    },
    {
      feature: "Clio Integration",
      casedelta: "Native Clio integration — Delta gets its own credentials",
      competitor: "No practice management integration",
    },
    {
      feature: "Proactive Work",
      casedelta: "Morning briefings, deadline alerts, anomaly detection",
      competitor: "On-demand only — you ask, it answers",
    },
    {
      feature: "Drafting Quality",
      casedelta: "Learns your firm's style, improves with every interaction",
      competitor: "Generic style — requires detailed prompting every time",
    },
    {
      feature: "Cost",
      casedelta: "Flat firm tiers: $799 / $1,499 / $2,499 per month",
      competitor: "$20/user/month (Plus) — plus attorney time re-entering context",
    },
  ],
  sections: [
    {
      title: "The Malpractice Problem",
      content:
        "When an attorney pastes client data into ChatGPT, that data is processed by OpenAI's systems with no guarantees about retention, access, or use. ChatGPT's terms of service have changed multiple times regarding training data usage. There is no audit trail, no per-firm data isolation, and no compliance framework designed for legal obligations. ABA Rule 1.6 requires reasonable measures to protect client confidential information. Using a consumer AI tool to process case details — client names, case facts, legal strategies — without purpose-built safeguards is an increasingly recognized risk. CaseDelta was built from day one for legal data: SOC 2 compliance, per-firm isolation, full audit trails, and no third-party model routing. Your data never trains models for other firms.",
    },
    {
      title: "The Memory Problem",
      content:
        "ChatGPT starts from zero every session. Even with conversation history, it has no persistent understanding of your firm, your cases, or your practice. Every time you open a new chat, you re-explain your case, your client, your judge, and your preferences. Multiply that across every attorney in your firm, every day, and the hidden cost is enormous. Delta's persistent memory eliminates this entirely. It learns your firm once and compounds that knowledge over time. After 30 days, Delta knows your drafting preferences, your judges' tendencies, and your clients' patterns. After 90 days, it's an institutional asset that any attorney in the firm can tap into without re-entering context.",
    },
    {
      title: "The Knowledge Gap",
      content:
        "ChatGPT knows what's in its training data — a broad but generic understanding of law. It doesn't know that Judge Miller in the Eastern District prefers briefs under 15 pages. It doesn't know that opposing counsel Torres settles 80% of cases within 30 days of the trial date. It doesn't know that your firm never uses legalese in demand letters. This practitioner intelligence is what separates competent legal work from excellent legal work, and it's the exact category of knowledge that general-purpose AI tools can never acquire. Delta learns it from your practice and from anonymized intelligence across the CaseDelta network.",
    },
    {
      title: "The Real Cost of 'Free'",
      content:
        "ChatGPT Plus costs $20/month per user — seemingly cheap compared to legal AI tools. But the real cost is hidden: the 10 minutes an attorney spends re-entering case context every session. The risk exposure from processing client data without compliance safeguards. The lost intelligence that evaporates when a conversation is closed. The time spent re-prompting for your firm's preferred drafting style. When you account for attorney time at $300-500/hour, a single daily ChatGPT session with 10 minutes of context re-entry costs $1,000-1,700/month in billable time — more than CaseDelta's flat firm tier for the same attorney and their entire team.",
    },
  ],
  whenToChooseThem:
    "ChatGPT is useful for general tasks — drafting a quick email, brainstorming arguments, summarizing a document you're comfortable sharing publicly. But for case work involving client data, firm intelligence, and professional obligations? That's what Delta was built for.",
  faq: [
    {
      question: "Is it really a malpractice risk to use ChatGPT for legal work?",
      answer:
        "ABA Rule 1.6 requires attorneys to make reasonable efforts to protect client confidential information. ChatGPT processes data on OpenAI's servers with no legal-specific data protections, no per-firm isolation, and no audit trail. Several state bar associations have issued guidance cautioning attorneys about using consumer AI tools with client data. The risk level depends on what data you input, but using ChatGPT for anything involving client-identifiable information raises legitimate compliance concerns.",
    },
    {
      question: "Can't I just use ChatGPT carefully and avoid putting in client data?",
      answer:
        "You can, but then you're using a tool that knows nothing about your cases, your judges, or your firm. The value of legal AI comes from context — and if you can't give it context about your actual work, it's limited to generic assistance. Delta was designed so you can safely give it full context and get firm-specific intelligence in return.",
    },
    {
      question: "Does ChatGPT's memory feature solve the persistence problem?",
      answer:
        "ChatGPT has introduced limited memory features, but they're designed for individual consumer preferences — not institutional memory across a law firm. They don't build firm-wide intelligence, don't track judges or opposing counsel, don't aggregate across your team's work, and don't maintain the structured knowledge graph that Delta builds. It's the difference between a personal notepad and an institutional knowledge base.",
    },
    {
      question: "How much does CaseDelta cost compared to ChatGPT?",
      answer:
        "ChatGPT Plus costs $20/user/month. CaseDelta's flat firm tiers are $799/month (1-5 attorneys), $1,499/month (6-20), and $2,499/month (21-50). But the real comparison includes attorney time: re-entering context at $300-500/hour makes ChatGPT's true cost far higher than its subscription price. CaseDelta eliminates that context re-entry entirely.",
    },
    {
      question: "Can I switch from ChatGPT to CaseDelta easily?",
      answer:
        "Yes. CaseDelta connects to your existing tools — Clio, document management, email — and begins learning from Day 1. There's no data to migrate from ChatGPT because ChatGPT doesn't retain your firm's data in a structured way. Most firms see meaningful intelligence from Delta within the first 30 minutes of connecting their Clio account.",
    },
  ],
};

/* ─── All comparisons (exported) ─── */

export const comparisons: Comparison[] = [
  harveyComparison,
  clioComparison,
  lexisnexisComparison,
  chatgptComparison,
];

export function getComparisonBySlug(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}

export function getAllComparisonSlugs(): string[] {
  return comparisons.map((c) => c.slug);
}
