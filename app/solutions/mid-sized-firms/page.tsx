import SolutionPage from "@/components/SolutionPage";

export default function MidSizedFirmsPage() {
  return (
    <SolutionPage
      headline="Delta for"
      headlineAccent="Mid-Sized Firms"
      subtitle="Too big to do everything manually. Too small for Harvey. Delta is built for the firms in between."
      problem="You have 5 to 50 attorneys handling real caseloads with real complexity. But enterprise legal AI requires 25-seat minimums at $1,000 per lawyer per month — that's not built for you. Your partners are doing work that associates should handle because you can't hire fast enough, can't train fast enough, and can't afford the overhead. You need capacity, not another tool that sits unused."
      points={[
        {
          heading: "Flat firm pricing, not per-seat",
          body: "Every other legal AI tool charges per attorney. Delta charges for the work it does. Your whole firm gets access. Whether 3 attorneys use it or 30, the pricing stays tied to value delivered — not headcount.",
        },
        {
          heading: "Works inside your existing stack",
          body: "Delta connects to Clio, MyCase, and Google Drive with its own credentials — separate from your attorneys' logins. No migration, no new platform to learn. Like onboarding a new associate who shows up already knowing how your systems work.",
        },
        {
          heading: "Institutional memory that stays",
          body: "When a paralegal leaves, they take years of case knowledge with them. Delta builds institutional memory that compounds over time and never walks out the door. After six months, Delta knows your firm's clients, document patterns, and workflows better than a new hire would after a year.",
        },
        {
          heading: "Audit trail for bar compliance",
          body: "Every action Delta takes is logged with a timestamp, the document accessed, the query asked, and the sources cited. If your bar association asks how your firm uses AI, you show them the log. No client data ever leaves CaseDelta or goes to a third party.",
        },
      ]}
      closingLine="Harvey built legal AI for the Am Law 100. Delta is built for the firms that actually need it. Start with $25 in free credits — no seat minimums, no contracts."
    />
  );
}
