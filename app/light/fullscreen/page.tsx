import { PageWrapper } from "@/components/PageWrapper";
import { Navbar } from "@/components/Navbar";
import { HeroFullscreen } from "@/components/HeroFullscreen";
import SocialProof from "@/components/SocialProof";
import { SectionHeader } from "@/components/SectionHeader";
import { ValuePropSection } from "@/components/ValuePropSection";
import { CTA, CTA_URLS } from "@/lib/constants/cta";

export default function LightFullscreenPage() {
  return (
    <PageWrapper theme="light">
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
          subtitle="Automate reminders, verify uploads, and get the right documents faster—all on one secure platform built specifically for legal professionals."
        />

        {/* Value Proposition 1 - White background */}
        <ValuePropSection
          title="AI-Powered Client Reminders"
          description="Stop chasing clients for documents. Our AI automatically sends personalized follow-ups at the right time, keeping your cases moving forward."
          features={[]}
          imagePath="/images/value-props/prop-1.jpeg"
          backgroundColor="#ffffff"
        />

        {/* Value Proposition 2 - Very light gray */}
        <ValuePropSection
          title="Document Verification That Actually Works"
          description="Never waste time reviewing the wrong documents again. Our AI verifies that clients upload exactly what you requested—before they hit submit."
          features={[]}
          imagePath="/images/value-props/prop-2.jpeg"
          reverse
          backgroundColor="#fafafa"
        />

        {/* Value Proposition 3 - Light gray */}
        <ValuePropSection
          title="Built for Legal Workflows"
          description="Designed specifically for law firms and legal professionals. Secure, compliant, and seamlessly integrated with your existing tools."
          features={[]}
          imagePath="/images/value-props/prop-3.jpeg"
          backgroundColor="#f5f5f5"
        />

        {/* Value Proposition 4 - Light gray */}
        <ValuePropSection
          title="Save Hours Every Week"
          description="Focus on practicing law, not project managing document requests. CaseDelta handles the busywork so you can get back to what matters."
          features={[]}
          imagePath="/images/value-props/prop-4.jpeg"
          reverse
          backgroundColor="#f0f0f0"
        />

        {/* CTA Section */}
        <section
          className="section"
          style={{ backgroundColor: "var(--color-background)" }}
        >
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h2
                className="mb-8"
                style={{
                  fontSize: "var(--font-size-h2)",
                  lineHeight: "var(--line-height-tight)",
                  fontWeight: "var(--font-weight-semibold)",
                  color: "var(--color-text-high-contrast)",
                }}
              >
                Ready to transform your document collection?
              </h2>

              <p
                className="mb-10"
                style={{
                  fontSize: "var(--font-size-large)",
                  lineHeight: "var(--line-height-relaxed)",
                  color: "var(--color-text-secondary)",
                }}
              >
                Join hundreds of legal professionals who've already streamlined
                their workflows with CaseDelta.
              </p>

              <div className="flex gap-4 justify-center flex-wrap">
                <a
                  href={CTA_URLS.START_FREE_TRIAL}
                  className="px-8 py-4 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    backgroundColor: "var(--color-button-primary)",
                    color: "var(--color-button-primary-text)",
                    fontSize: "var(--font-size-base)",
                    fontWeight: "var(--font-weight-medium)",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  {CTA.START_FREE_TRIAL}
                </a>

                <a
                  href={CTA_URLS.SCHEDULE_DEMO}
                  className="px-8 py-4 rounded-lg border transition-all hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-text-tertiary)]"
                  style={{
                    borderColor: "var(--color-border)",
                    color: "var(--color-text-primary)",
                    fontSize: "var(--font-size-base)",
                    fontWeight: "var(--font-weight-medium)",
                  }}
                >
                  {CTA.SCHEDULE_DEMO}
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer
          className="py-12 border-t"
          style={{
            backgroundColor: "var(--color-background)",
            borderColor: "var(--color-border)",
          }}
        >
          <div className="container">
            <div className="text-center">
              <p
                style={{
                  fontSize: "var(--font-size-small)",
                  color: "var(--color-text-tertiary)",
                }}
              >
                © 2025 CaseDelta. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </PageWrapper>
  );
}
