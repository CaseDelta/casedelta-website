import { Hero } from "@/components/Hero";
import { ValuePropSection } from "@/components/ValuePropSection";
import { Navbar } from "@/components/Navbar";
import { SocialProof } from "@/components/SocialProof";
import { SectionHeader } from "@/components/SectionHeader";

interface LandingContentProps {
  heroVariant: "side" | "bottom";
}

export function LandingContent({ heroVariant }: LandingContentProps) {
  return (
    <main>
      <Navbar />

      {/* Add padding-top to account for fixed navbar */}
      <div style={{ paddingTop: "80px" }}>
        {/* Hero Section */}
        <Hero variant={heroVariant} />

        {/* Social Proof - Customer Logos */}
        <SocialProof />

        {/* Section Header - Like Harvey's "Augment All of Your Work..." */}
        <SectionHeader
          title="Streamline Your Entire Document Collection Workflow"
          subtitle="Automate reminders, verify uploads, and get the right documents faster—all on one secure platform built specifically for legal professionals."
        />

        {/* Value Proposition 1 */}
        <ValuePropSection
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
                <button
                  className="px-8 py-4 rounded-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                  style={{
                    backgroundColor: "var(--color-button-primary)",
                    color: "var(--color-button-primary-text)",
                    fontSize: "var(--font-size-base)",
                    fontWeight: "var(--font-weight-medium)",
                    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  Start Free Trial
                </button>

                <button
                  className="px-8 py-4 rounded-lg border transition-all hover:bg-[var(--color-surface-hover)] hover:border-[var(--color-text-tertiary)]"
                  style={{
                    borderColor: "var(--color-border)",
                    color: "var(--color-text-primary)",
                    fontSize: "var(--font-size-base)",
                    fontWeight: "var(--font-weight-medium)",
                  }}
                >
                  Schedule Demo
                </button>
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
      </div>
    </main>
  );
}
