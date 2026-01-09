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

export default function LightFullscreenPage() {
  return (
    <PageWrapper theme="light">
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

          {/* Value Proposition 1 - White background */}
          <ValuePropSection
            title={LANDING_CONTENT.valueProps.aiReminders.title}
            description={LANDING_CONTENT.valueProps.aiReminders.description}
            imagePath={LANDING_CONTENT.valueProps.aiReminders.imagePath}
            backgroundColor="#ffffff"
          />

          {/* Value Proposition 2 - Very light gray */}
          <ValuePropSection
            title={LANDING_CONTENT.valueProps.documentVerification.title}
            description={LANDING_CONTENT.valueProps.documentVerification.description}
            imagePath={LANDING_CONTENT.valueProps.documentVerification.imagePath}
            reverse
            backgroundColor="#fafafa"
          />

          {/* Value Proposition 3 - Light gray */}
          <ValuePropSection
            title={LANDING_CONTENT.valueProps.legalWorkflows.title}
            description={LANDING_CONTENT.valueProps.legalWorkflows.description}
            imagePath={LANDING_CONTENT.valueProps.legalWorkflows.imagePath}
            backgroundColor="#f5f5f5"
          />

          {/* Value Proposition 4 - Light gray */}
          <ValuePropSection
            title={LANDING_CONTENT.valueProps.timeSavings.title}
            description={LANDING_CONTENT.valueProps.timeSavings.description}
            imagePath={LANDING_CONTENT.valueProps.timeSavings.imagePath}
            reverse
            backgroundColor="#f0f0f0"
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

        {/* Footer */}
      </main>
    </PageWrapper>
  );
}
