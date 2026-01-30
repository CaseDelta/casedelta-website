import { Hero } from "@/components/Hero";
import { ValuePropSection } from "@/components/ValuePropSection";
import SocialProof from "@/components/SocialProof";
import { SectionHeader } from "@/components/SectionHeader";
import { QuantifiableImpact } from "@/components/QuantifiableImpact";
import { Testimonials } from "@/components/Testimonials";
import { SecuritySection } from "@/components/SecuritySection";
import { ContactFormSection } from "@/components/ContactFormSection";
import { Footer } from "@/components/Footer";
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
            title={LANDING_CONTENT.valueProps.valueProp1.title}
            description={LANDING_CONTENT.valueProps.valueProp1.description}
            imagePath={LANDING_CONTENT.valueProps.valueProp1.imagePath}
            videoPath={LANDING_CONTENT.valueProps.valueProp1.videoPath}
            backgroundColor="var(--color-progressive-1)"
          />

          {/* Value Proposition 2 */}
          <ValuePropSection
            id="document-verification"
            title={LANDING_CONTENT.valueProps.valueProp2.title}
            description={LANDING_CONTENT.valueProps.valueProp2.description}
            imagePath={LANDING_CONTENT.valueProps.valueProp2.imagePath}
            videoPath={LANDING_CONTENT.valueProps.valueProp2.videoPath}
            reverse
            backgroundColor="var(--color-progressive-2)"
          />

          {/* Value Proposition 3 */}
          <ValuePropSection
            id="legal-workflows"
            title={LANDING_CONTENT.valueProps.valueProp3.title}
            description={LANDING_CONTENT.valueProps.valueProp3.description}
            imagePath={LANDING_CONTENT.valueProps.valueProp3.imagePath}
            videoPath={LANDING_CONTENT.valueProps.valueProp3.videoPath}
            backgroundColor="var(--color-progressive-3)"
          />

          {/* Value Proposition 4 */}
          <ValuePropSection
            id="time-savings"
            title={LANDING_CONTENT.valueProps.valueProp4.title}
            description={LANDING_CONTENT.valueProps.valueProp4.description}
            imagePath={LANDING_CONTENT.valueProps.valueProp4.imagePath}
            videoPath={LANDING_CONTENT.valueProps.valueProp4.videoPath}
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

      {/* Footer */}
      <Footer />
    </main>
  );
}
