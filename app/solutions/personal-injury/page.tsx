import SolutionPage from "@/components/SolutionPage";

export default function PersonalInjuryPage() {
  return (
    <SolutionPage
      headline="Delta for"
      headlineAccent="Personal Injury"
      subtitle="Contingency cases demand efficiency. Every hour your team spends chasing documents is an hour that erodes your margin."
      problem="PI firms live on volume. You're managing dozens of active cases, each with medical records, billing statements, insurance correspondence, and employment docs. Clients forget to send things. Records arrive incomplete. Your paralegals spend more time following up than reviewing. And on contingency, every wasted hour comes straight out of your recovery."
      points={[
        {
          heading: "Income discrepancy detection",
          body: "Delta cross-references W-2s, tax returns, pay stubs, and bank statements automatically. When the reported income doesn't match the deposits, Delta flags the gap — the kind of finding that changes a case valuation.",
        },
        {
          heading: "Medical record completeness tracking",
          body: "Upload treatment records and Delta maps what's there against what's expected. Missing imaging reports, gaps in treatment timelines, unsigned authorizations — surfaced before they become a problem at mediation.",
        },
        {
          heading: "Automated client follow-up",
          body: "When documents are missing, Delta drafts the follow-up email for your review. One click to send. No more sticky notes, no more 'I'll get to it later' from the client.",
        },
        {
          heading: "Case briefings on demand",
          body: "Pull a full case summary with findings, document status, and flags in minutes. Prep for demand letters, mediations, or partner review without reading every page yourself.",
        },
      ]}
      closingLine="PI firms that use Delta spend less time on intake admin and more time building cases worth settling. Start with your hardest active case."
    />
  );
}
