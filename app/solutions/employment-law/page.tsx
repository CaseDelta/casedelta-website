import SolutionPage from "@/components/SolutionPage";

export default function EmploymentLawPage() {
  return (
    <SolutionPage
      headline="Delta for"
      headlineAccent="Employment Law"
      subtitle="Years of HR records, performance reviews, and communications. Delta finds the patterns your case depends on."
      problem="Employment cases turn on documented patterns — years of performance reviews, internal complaints, disciplinary actions, policy changes, and communications that tell a story of what really happened. The problem is that story is buried across hundreds of documents from multiple sources, and the opposing party knows exactly which ones to bury in production."
      points={[
        {
          heading: "Pattern detection across HR records",
          body: "Delta reads performance reviews, disciplinary records, and internal communications looking for inconsistencies. A glowing review three months before termination, a policy change that only affected one employee — Delta surfaces the patterns that build your narrative.",
        },
        {
          heading: "Document completeness by category",
          body: "Upload what you have and Delta maps it against what a complete employment file should contain. Missing personnel records, absent I-9s, gaps in the disciplinary timeline — identified before discovery closes.",
        },
        {
          heading: "Communication filtering",
          body: "When you're dealing with years of emails and Slack messages, Delta helps you find the relevant exchanges without reading every thread. Surface communications mentioning specific employees, policies, or incidents.",
        },
        {
          heading: "Timeline construction",
          body: "Employment cases live and die on chronology. Delta builds a timeline from the documents — hire date through termination — with every relevant event sourced to a specific document and page number.",
        },
      ]}
      closingLine="Employment cases are won on paper. Delta reads the paper faster than any associate and finds what matters. Start with an active case."
    />
  );
}
