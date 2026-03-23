import SolutionPage from "@/components/SolutionPage";

export default function EmploymentLawPage() {
  return (
    <SolutionPage
      headline="Delta for"
      headlineAccent="Employment Law"
      subtitle="Same judges, same opposing counsel, same patterns across dozens of cases. Delta's learning compounds fastest in employment law."
      problem="Employment defense means repeat players — the same judges, the same plaintiff firms, the same jurisdictions. The intelligence that wins cases takes years to accumulate: which judges favor short briefs, which opposing counsel settles late, how to structure a discovery timeline for this specific court. That knowledge lives in senior partners' heads. When they leave, it disappears."
      points={[
        {
          heading: "Learns your judges and opposing counsel",
          body: "Delta builds profiles from your firm's cases and the anonymized Intelligence Network. Judge Miller's motion grant rate, opposing counsel Torres's settlement patterns, how the 10th Judicial District handles employment claims. Intelligence that took 20 years to build, available at case intake.",
        },
        {
          heading: "Pattern detection across HR records",
          body: "Delta reads performance reviews, disciplinary records, and internal communications looking for inconsistencies. A glowing review three months before termination, a policy change that only affected one employee — Delta surfaces the patterns that build your narrative.",
        },
        {
          heading: "Institutional memory that compounds",
          body: "Every employment case your firm handles teaches Delta more about your practice. Document patterns, brief formats that work, arguments that land with specific judges. After six months, Delta knows your employment practice better than a new associate would after a year.",
        },
        {
          heading: "Morning briefings across your caseload",
          body: "Every morning, Delta has reviewed your active employment matters. Deadlines approaching, discovery gaps, documents missing from the personnel file, depositions needing prep. Findings ready before you sit down with your coffee.",
        },
      ]}
      closingLine="Employment cases are won on intelligence — knowing the judge, the opposing counsel, and the patterns. Delta learns it all and never forgets. Start with $50 in free credits."
    />
  );
}
