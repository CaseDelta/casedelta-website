import SolutionPage from "@/components/SolutionPage";

export default function MedicalMalpracticePage() {
  return (
    <SolutionPage
      headline="Delta for"
      headlineAccent="Medical Malpractice"
      subtitle="Thousands of pages of medical records. Timelines that span years. Delta reads all of it and tells you what matters."
      problem="Med mal is the most document-intensive practice area in law. A single case can involve thousands of pages of treatment records, imaging reports, expert disclosures, and billing statements spanning years of care. Finding the deviation — the moment the standard of care was breached — means reading everything. Missing one record can sink an entire theory of liability."
      points={[
        {
          heading: "Cross-document anomaly detection",
          body: "Delta compares records across providers and timelines. Conflicting dates, inconsistent medication dosages, gaps between documented symptoms and treatment — the kind of discrepancies that take a paralegal days to find manually.",
        },
        {
          heading: "Treatment timeline reconstruction",
          body: "Upload records from every provider and Delta builds a chronological map. See the full arc of care in one view — where treatment started, where it changed, where gaps exist.",
        },
        {
          heading: "Document classification at scale",
          body: "Drop in a box of records and Delta sorts them: operative notes, lab results, nursing assessments, radiology reports, discharge summaries. No manual labeling. No misfiled pages.",
        },
        {
          heading: "Expert disclosure preparation",
          body: "Delta surfaces the key findings and source documents you need for expert review. Less time assembling packages, more time with your expert building the causation argument.",
        },
      ]}
      closingLine="One partner hour in med mal costs $400–600. Delta saves dozens of those hours per case. Try it on your most document-heavy matter."
    />
  );
}
