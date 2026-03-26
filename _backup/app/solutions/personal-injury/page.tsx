import SolutionPage from "@/components/SolutionPage";

export default function PersonalInjuryPage() {
  return (
    <SolutionPage
      headline="Delta for"
      headlineAccent="Personal Injury"
      subtitle="Contingency cases demand efficiency. Delta learns your PI practice and handles the cognitive work eating your billable time."
      problem="PI firms live on volume. Dozens of active cases, each with medical records, billing statements, insurance correspondence, and employment docs. Your paralegals spend more time chasing documents than reviewing them. And the intelligence your senior partners carry — which adjusters negotiate, which judges are favorable, which experts to use — that lives in their heads with no backup."
      points={[
        {
          heading: "Income discrepancy detection",
          body: "Delta cross-references W-2s, tax returns, pay stubs, and bank statements automatically. When reported income doesn't match deposits, Delta flags the gap — the kind of finding that changes a case valuation.",
        },
        {
          heading: "Learns your case patterns over time",
          body: "Delta learns which document types matter for your PI cases, which clients submit late, how you structure demand letters, and your firm's preferred workflow. Every case teaches Delta more about your practice.",
        },
        {
          heading: "Judge and jurisdiction intelligence",
          body: "Draw a judge you've never seen? Delta already has intelligence from the network. Verdict ranges, motion tendencies, settlement pressure points. Strategic context that would take years of courtroom experience to accumulate.",
        },
        {
          heading: "Proactive case monitoring",
          body: "Every morning, Delta reviews your active PI matters. Missing medical records, upcoming statute deadlines, stale cases with no activity. Follow-up drafts prepared in your firm's style, ready for review.",
        },
      ]}
      closingLine="PI firms that use Delta spend less time on admin and more time building cases worth settling. Everything Delta learns about your practice stays permanently."
    />
  );
}
