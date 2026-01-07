import { PageWrapper } from "@/components/PageWrapper";
import { Navbar } from "@/components/Navbar";
import { HeroFullscreen } from "@/components/HeroFullscreen";
import SocialProof from "@/components/SocialProof";
import { SectionHeader } from "@/components/SectionHeader";
import { ValuePropSection } from "@/components/ValuePropSection";
import { QuantifiableImpact } from "@/components/QuantifiableImpact";
import { Testimonials } from "@/components/Testimonials";
import { SecuritySection } from "@/components/SecuritySection";
import { Footer } from "@/components/Footer";
import { CTA, CTA_URLS } from "@/lib/constants/cta";

export default function DarkFullscreenPage() {
  return (
    <PageWrapper theme="dark">
      <main>
        <Navbar />

        {/* Fullscreen Hero with Video Background */}
        <HeroFullscreen />

        {/* Social Proof - Customer Logos */}
        <SocialProof />

        {/* Section Header */}
        <SectionHeader
          id="workflow-section"
          title="Streamline Your Entire Document Collection Workflow"
        />

        {/* Value Proposition 1 - Dark background */}
        <ValuePropSection
          title="AI-Powered Client Reminders"
          description="Stop chasing clients for documents. Our AI automatically sends personalized follow-ups at the right time, keeping your cases moving forward."
          features={[]}
          imagePath="/images/value-props/prop-1.jpeg"
          backgroundColor="#0d0d0d"
        />

        {/* Value Proposition 2 - Slightly lighter dark */}
        <ValuePropSection
          title="Document Verification That Actually Works"
          description="Never waste time reviewing the wrong documents again. Our AI verifies that clients upload exactly what you requested—before they hit submit."
          features={[]}
          imagePath="/images/value-props/prop-2.jpeg"
          reverse
          backgroundColor="#1a1a1a"
        />

        {/* Value Proposition 3 - Mid dark gray */}
        <ValuePropSection
          title="Built for Legal Workflows"
          description="Designed specifically for law firms and legal professionals. Secure, compliant, and seamlessly integrated with your existing tools."
          features={[]}
          imagePath="/images/value-props/prop-3.jpeg"
          backgroundColor="#141414"
        />

        {/* Value Proposition 4 - Dark gray */}
        <ValuePropSection
          title="Save Hours Every Week"
          description="Focus on practicing law, not project managing document requests. CaseDelta handles the busywork so you can get back to what matters."
          features={[]}
          imagePath="/images/value-props/prop-4.jpeg"
          reverse
          backgroundColor="#1f1f1f"
        />

        {/* Quantifiable Impact Section */}
        <QuantifiableImpact />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Security Section */}
        <SecuritySection />

        {/* CTA Section */}
        <section
          className="section"
          style={{ backgroundColor: "var(--color-surface)", padding: "8rem 0" }}
        >
          <div className="container max-w-4xl">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <h2
                style={{
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  lineHeight: "1.2",
                  fontWeight: "400",
                  color: "var(--color-text-high-contrast)",
                  letterSpacing: "-0.01em",
                }}
              >
                Stop Chasing Documents.
                <br />
                <span style={{ color: "var(--color-text-secondary)" }}>
                  Start Getting Results.
                </span>
              </h2>

              <a
                href={CTA_URLS.REQUEST_DEMO}
                className="px-8 py-4 rounded-lg transition-all hover:opacity-90 flex-shrink-0"
                style={{
                  backgroundColor: "var(--color-button-primary)",
                  color: "var(--color-button-primary-text)",
                  fontSize: "var(--font-size-base)",
                  fontWeight: "var(--font-weight-medium)",
                }}
              >
                {CTA.REQUEST_DEMO}
              </a>
            </div>
          </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>
    </PageWrapper>
  );
}
