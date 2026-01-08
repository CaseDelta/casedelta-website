import { Hero } from "@/components/Hero";
import { ValuePropSection } from "@/components/ValuePropSection";
import SocialProof from "@/components/SocialProof";
import { SectionHeader } from "@/components/SectionHeader";
import { QuantifiableImpact } from "@/components/QuantifiableImpact";
import { Testimonials } from "@/components/Testimonials";
import { SecuritySection } from "@/components/SecuritySection";
import { ContactFormSection } from "@/components/ContactFormSection";

interface LandingContentProps {
  heroVariant: "side" | "bottom";
}

export function LandingContent({ heroVariant }: LandingContentProps) {
  return (
    <main>
      {/* Hero Section */}
      <Hero variant={heroVariant} />

        {/* Social Proof - Customer Logos */}
        <SocialProof />

        {/* Section Header - Like Harvey's "Augment All of Your Work..." */}
        <SectionHeader
          id="workflow-section"
          title="Streamline Your Entire Document Collection Workflow"
        />

        {/* Value Proposition 1 */}
        <ValuePropSection
          id="ai-reminders"
          title="AI-Powered Client Reminders"
          description="Stop chasing clients for documents. Our AI automatically sends personalized follow-ups at the right time, keeping your cases moving forward."
          features={[
            "Intelligent reminder scheduling based on client behavior",
            "Personalized messaging that feels human, not robotic",
            "Multi-channel reminders via email, SMS, and portal notifications",
            "Automatic escalation for overdue documents",
          ]}
          imagePath="/images/value-props/prop-1.jpeg"
          backgroundColor="var(--color-progressive-1)"
        />

        {/* Value Proposition 2 */}
        <ValuePropSection
          id="document-verification"
          title="Document Verification That Actually Works"
          description="Never waste time reviewing the wrong documents again. Our AI verifies that clients upload exactly what you requested—before they hit submit."
          features={[
            "Instant document type detection and validation",
            "Smart extraction of key information and dates",
            "Automatic quality checks for completeness and clarity",
            "Real-time feedback to clients for corrections",
          ]}
          imagePath="/images/value-props/prop-2.jpeg"
          reverse
          backgroundColor="var(--color-progressive-2)"
        />

        {/* Value Proposition 3 */}
        <ValuePropSection
          id="legal-workflows"
          title="Built for Legal Workflows"
          description="Designed specifically for law firms and legal professionals. Secure, compliant, and seamlessly integrated with your existing tools."
          features={[
            "Bank-level encryption and HIPAA-compliant storage",
            "One-click integration with major practice management systems",
            "Role-based access controls for your entire team",
            "Audit trails and detailed activity logs",
          ]}
          imagePath="/images/value-props/prop-3.jpeg"
          backgroundColor="var(--color-progressive-3)"
        />

        {/* Value Proposition 4 */}
        <ValuePropSection
          id="time-savings"
          title="Save Hours Every Week"
          description="Focus on practicing law, not project managing document requests. CaseDelta handles the busywork so you can get back to what matters."
          features={[
            "Reduce document collection time by 70%",
            "Eliminate manual follow-up emails and phone calls",
            "Real-time visibility into client progress",
            "Automatic organization and case file management",
          ]}
          imagePath="/images/value-props/prop-4.jpeg"
          reverse
          backgroundColor="var(--color-progressive-4)"
        />

        {/* Quantifiable Impact Section */}
        <QuantifiableImpact />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Security Section */}
        <SecuritySection />

      {/* Contact Form Section */}
      <ContactFormSection />
    </main>
  );
}
