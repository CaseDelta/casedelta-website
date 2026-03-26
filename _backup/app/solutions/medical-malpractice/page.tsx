import SolutionPage from "@/components/SolutionPage";

export default function MedicalMalpracticePage() {
  return (
    <SolutionPage
      headline="Delta for"
      headlineAccent="Medical Malpractice"
      subtitle="Thousands of pages of medical records. Delta reads all of it, learns your approach, and gets better at finding what matters with every case."
      problem="Med mal is the most document-intensive practice area in law. Thousands of pages per case spanning years of care. Finding the deviation — the moment the standard of care was breached — means reading everything. One missed record can sink an entire theory. And the expertise to know what to look for? That takes a decade to develop and walks out the door when partners retire."
      points={[
        {
          heading: "Cross-document anomaly detection",
          body: "Delta compares records across providers and timelines. Conflicting dates, inconsistent medication dosages, gaps between documented symptoms and treatment — the discrepancies that take a paralegal days to find manually.",
        },
        {
          heading: "Learns what matters for your cases",
          body: "Every med mal case teaches Delta more about your firm's approach. Document types that matter, expert preferences, how you structure chronologies, which anomaly patterns are significant. Delta's analysis gets sharper with every case your firm handles.",
        },
        {
          heading: "Expert and jurisdiction intelligence",
          body: "Delta tracks which experts your firm uses, how opposing experts tend to testify, and how judges in your jurisdiction handle Daubert challenges. Intelligence from the network fills gaps your firm's experience hasn't covered yet.",
        },
        {
          heading: "Treatment timeline reconstruction",
          body: "Upload records from every provider and Delta builds a chronological map. The full arc of care in one view — where treatment started, where it changed, where gaps exist. Sourced to specific documents and page numbers.",
        },
      ]}
      closingLine="One partner hour in med mal costs $400-600. Delta saves dozens of those hours per case — and everything it learns about your practice compounds permanently."
    />
  );
}
