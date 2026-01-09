export const LANDING_CONTENT = {
  // Section Headers
  workflowSectionTitle: "What if you got documents from clients all-correct the first time?",

  // Value Propositions
  valueProps: {
    aiReminders: {
      title: "AI-Powered Client Reminders",
      description: "Stop chasing clients for documents. Our AI automatically sends personalized follow-ups at the right time, keeping your cases moving forward.",
      features: [
        "Intelligent reminder scheduling based on client behavior",
        "Personalized messaging that feels human, not robotic",
        "Multi-channel reminders via email, SMS, and portal notifications",
        "Automatic escalation for overdue documents",
      ],
      imagePath: "/images/value-props/prop-1.jpeg",
    },
    documentVerification: {
      title: "Document Verification That Actually Works",
      description: "Never waste time reviewing the wrong documents again. Our AI verifies that clients upload exactly what you requested—before they hit submit.",
      features: [
        "Instant document type detection and validation",
        "Smart extraction of key information and dates",
        "Automatic quality checks for completeness and clarity",
        "Real-time feedback to clients for corrections",
      ],
      imagePath: "/images/value-props/prop-2.jpeg",
    },
    legalWorkflows: {
      title: "Built for Legal Workflows",
      description: "Designed specifically for law firms and legal professionals. Secure, compliant, and seamlessly integrated with your existing tools.",
      features: [
        "Bank-level encryption and HIPAA-compliant storage",
        "One-click integration with major practice management systems",
        "Role-based access controls for your entire team",
        "Audit trails and detailed activity logs",
      ],
      imagePath: "/images/value-props/prop-3.jpeg",
    },
    timeSavings: {
      title: "Save Hours Every Week",
      description: "Focus on practicing law, not project managing document requests. CaseDelta handles the busywork so you can get back to what matters.",
      features: [
        "Reduce document collection time by 70%",
        "Eliminate manual follow-up emails and phone calls",
        "Real-time visibility into client progress",
        "Automatic organization and case file management",
      ],
      imagePath: "/images/value-props/prop-4.jpeg",
    },
  },
} as const;
