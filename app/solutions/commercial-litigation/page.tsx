import SolutionPage from "@/components/SolutionPage";

export default function CommercialLitigationPage() {
  return (
    <SolutionPage
      headline="Delta for"
      headlineAccent="Commercial Litigation"
      subtitle="Complex discovery. Cross-party patterns. Judge tendencies that determine strategy. Delta learns it all."
      problem="Commercial litigation generates more documents per case than any other practice area. Your clients watch bills climb during document review and ask why it costs $50,000 to read emails. But the real cost isn't document review — it's the strategic intelligence that takes decades to develop. Which judges are favorable for MSJ, how opposing counsel approaches settlement, what arguments land in this jurisdiction. That intelligence is trapped in senior partners' heads."
      points={[
        {
          heading: "Judge and opposing counsel intelligence",
          body: "Delta profiles every judge and opposing counsel your firm encounters — and draws from the anonymized Intelligence Network for the ones you haven't. Motion grant rates, settlement patterns, preferred brief formats, tendencies on discovery disputes. Strategy before the first filing.",
        },
        {
          heading: "Contract analysis and cross-reference",
          body: "Delta reads contracts, amendments, and side letters together. When a term in the original agreement was modified by a later amendment that contradicts an email representation, Delta flags it. Financial discrepancies across documents surfaced automatically.",
        },
        {
          heading: "Institutional memory for complex matters",
          body: "Commercial litigation cases span years. Delta maintains the full context — every filing, every communication pattern, every strategic decision. When an associate picks up a file, Delta's case thread gives them complete context without reading thousands of pages.",
        },
        {
          heading: "Discovery document classification at scale",
          body: "Thousands of produced documents sorted by type, date, and relevance. Your associates spend time analyzing, not organizing. Delta learns your firm's classification preferences and gets faster with every production.",
        },
      ]}
      closingLine="The firms that win commercial litigation are the ones with better intelligence. Delta builds that intelligence for your firm — and it never walks out the door."
    />
  );
}
