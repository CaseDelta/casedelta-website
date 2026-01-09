import { Hero } from "@/components/Hero";
import { ValuePropSection } from "@/components/ValuePropSection";
import SocialProof from "@/components/SocialProof";
import { SectionHeader } from "@/components/SectionHeader";
import { QuantifiableImpact } from "@/components/QuantifiableImpact";
import { Testimonials } from "@/components/Testimonials";
import { SecuritySection } from "@/components/SecuritySection";
import { ContactFormSection } from "@/components/ContactFormSection";
import { LANDING_CONTENT } from "@/lib/constants/landing";

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

        {/* Features Section - Wraps all value props */}
        <div id="features">
          {/* Section Header */}
          <SectionHeader
            id="workflow-section"
            title={LANDING_CONTENT.workflowSectionTitle}
          />

          {/* Value Proposition 1 */}
          <ValuePropSection
            id="ai-reminders"
            title={LANDING_CONTENT.valueProps.aiReminders.title}
            description={LANDING_CONTENT.valueProps.aiReminders.description}
            features={LANDING_CONTENT.valueProps.aiReminders.features}
            imagePath={LANDING_CONTENT.valueProps.aiReminders.imagePath}
            backgroundColor="var(--color-progressive-1)"
          />

          {/* Value Proposition 2 */}
          <ValuePropSection
            id="document-verification"
            title={LANDING_CONTENT.valueProps.documentVerification.title}
            description={LANDING_CONTENT.valueProps.documentVerification.description}
            features={LANDING_CONTENT.valueProps.documentVerification.features}
            imagePath={LANDING_CONTENT.valueProps.documentVerification.imagePath}
            reverse
            backgroundColor="var(--color-progressive-2)"
          />

          {/* Value Proposition 3 */}
          <ValuePropSection
            id="legal-workflows"
            title={LANDING_CONTENT.valueProps.legalWorkflows.title}
            description={LANDING_CONTENT.valueProps.legalWorkflows.description}
            features={LANDING_CONTENT.valueProps.legalWorkflows.features}
            imagePath={LANDING_CONTENT.valueProps.legalWorkflows.imagePath}
            backgroundColor="var(--color-progressive-3)"
          />

          {/* Value Proposition 4 */}
          <ValuePropSection
            id="time-savings"
            title={LANDING_CONTENT.valueProps.timeSavings.title}
            description={LANDING_CONTENT.valueProps.timeSavings.description}
            features={LANDING_CONTENT.valueProps.timeSavings.features}
            imagePath={LANDING_CONTENT.valueProps.timeSavings.imagePath}
            reverse
            backgroundColor="var(--color-progressive-4)"
          />
        </div>

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
