import SolutionPage from "@/components/SolutionPage";

export default function MidSizedFirmsPage() {
  return (
    <SolutionPage
      headline="Delta for"
      headlineAccent="Mid-Sized Firms"
      subtitle="Too big to do everything manually. Too small for Harvey. Delta is built for the 80% of firms that enterprise legal AI ignores."
      problem="You have 5 to 50 attorneys handling real caseloads. Enterprise legal AI requires 25-40 seat minimums at $1,000 per lawyer per month — that's not built for you. Your partners are doing work associates should handle. And every time a senior paralegal or partner leaves, years of institutional knowledge — your clients, your processes, the details that make your practice run — disappear overnight."
      points={[
        {
          heading: "Flat firm pricing, not per-seat",
          body: "Harvey charges $1,000/lawyer/month with a 40-seat minimum. Paxton charges $159-499 per seat. Delta charges per firm. Your whole team gets access at one flat price — $799 to $2,499/month depending on firm size. The more your team uses Delta, the more it learns.",
        },
        {
          heading: "Institutional memory that stays",
          body: "When a paralegal leaves after eight years, they take everything they knew about your clients, your cases, and your workflows. Delta captures it all permanently. After six months, Delta knows your firm better than a new hire would after 18 months — and none of that knowledge ever walks out.",
        },
        {
          heading: "Intelligence Network advantage",
          body: "A 10-attorney firm has appeared before a judge 3 times. A 50-attorney firm has appeared 30 times. Delta gives both firms access to aggregated, anonymized intelligence across all firms on the platform. The small firm gets the intelligence advantage of a firm ten times its size.",
        },
        {
          heading: "Works inside your existing stack",
          body: "Delta connects to Clio, Google Drive, and email with its own credentials — like onboarding a new associate who shows up already knowing your systems. No migration, no new platform. Full audit trail for bar compliance. No client data ever leaves CaseDelta.",
        },
      ]}
      closingLine="Harvey built legal AI for the AmLaw 100. Delta is built for the firms that actually need it. Start with $50 in free credits — no seat minimums, no contracts."
    />
  );
}
