import { PageWrapper } from "@/components/PageWrapper";
import { HeroFullscreen } from "@/components/HeroFullscreen";
import SocialProof from "@/components/SocialProof";
import { SectionHeader } from "@/components/SectionHeader";
import { ValuePropSection } from "@/components/ValuePropSection";
import { QuantifiableImpact } from "@/components/QuantifiableImpact";
import { Testimonials } from "@/components/Testimonials";
import { SecuritySection } from "@/components/SecuritySection";
import { ContactFormSection } from "@/components/ContactFormSection";
import { LANDING_CONTENT } from "@/lib/constants/landing";

export default function DarkFullscreenPage() {
  return (
    <PageWrapper theme="dark">
      <main>

        {/* Fullscreen Hero with Video Background */}
        <HeroFullscreen />

        {/* Social Proof - Customer Logos */}
        <SocialProof />

        {/* Features Section - Wraps all value props */}
        <div id="features">
          {/* Section Header */}
          <SectionHeader
            id="workflow-section"
            title={LANDING_CONTENT.workflowSectionTitle}
          />

          {/* Value Proposition 1 - Dark background */}
          <ValuePropSection
            id="ai-reminders"
            title={LANDING_CONTENT.valueProps.aiReminders.title}
            description={LANDING_CONTENT.valueProps.aiReminders.description}
            imagePath={LANDING_CONTENT.valueProps.aiReminders.imagePath}
            backgroundColor="#0d0d0d"
          />

          {/* Value Proposition 2 - Slightly lighter dark */}
          <ValuePropSection
            id="document-verification"
            title={LANDING_CONTENT.valueProps.documentVerification.title}
            description={LANDING_CONTENT.valueProps.documentVerification.description}
            imagePath={LANDING_CONTENT.valueProps.documentVerification.imagePath}
            reverse
            backgroundColor="#1a1a1a"
          />

          {/* Value Proposition 3 - Mid dark gray */}
          <ValuePropSection
            id="legal-workflows"
            title={LANDING_CONTENT.valueProps.legalWorkflows.title}
            description={LANDING_CONTENT.valueProps.legalWorkflows.description}
            imagePath={LANDING_CONTENT.valueProps.legalWorkflows.imagePath}
            backgroundColor="#141414"
          />

          {/* Value Proposition 4 - Dark gray */}
          <ValuePropSection
            id="time-savings"
            title={LANDING_CONTENT.valueProps.timeSavings.title}
            description={LANDING_CONTENT.valueProps.timeSavings.description}
            imagePath={LANDING_CONTENT.valueProps.timeSavings.imagePath}
            reverse
            backgroundColor="#1f1f1f"
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
    </PageWrapper>
  );
}
