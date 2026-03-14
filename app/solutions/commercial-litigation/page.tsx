import SolutionPage from "@/components/SolutionPage";

export default function CommercialLitigationPage() {
  return (
    <SolutionPage
      headline="Delta for"
      headlineAccent="Commercial Litigation"
      subtitle="Discovery is the most expensive phase of any case. Delta cuts the document review time your clients hate paying for."
      problem="Commercial litigation generates more documents per case than any other practice area. Contracts, correspondence, financial records, internal communications, regulatory filings — discovery alone can produce tens of thousands of pages. Your clients watch the bills climb during document review and ask why it costs $50,000 to read emails. The firms that reduce that cost win the business."
      points={[
        {
          heading: "Contract analysis and cross-reference",
          body: "Delta reads contracts, amendments, and side letters together. When a term in the original agreement was modified by a later amendment that contradicts an email representation, Delta flags it.",
        },
        {
          heading: "Financial discrepancy detection",
          body: "Upload financial statements, invoices, and payment records. Delta cross-references the numbers. Revenue reported in one document that doesn't match another, payments that don't align with contract terms — surfaced automatically.",
        },
        {
          heading: "Discovery document classification",
          body: "Thousands of produced documents sorted by type, date, and relevance. Delta classifies at scale so your associates spend time analyzing, not organizing.",
        },
        {
          heading: "Cross-party communication filtering",
          body: "When you need to find every communication between specific parties about a specific issue across years of correspondence, Delta handles the search and surfaces the relevant threads with source citations.",
        },
      ]}
      closingLine="Discovery costs are the number one client complaint in commercial litigation. Delta makes document review faster and cheaper. Try it on your next production."
    />
  );
}
