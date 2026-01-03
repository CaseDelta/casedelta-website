"use client";

import { PageWrapper } from "@/components/PageWrapper";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function PrivacyPage() {
  return (
    <PageWrapper theme="light">
      <Navbar />
      <main className="pt-20">
        <article className="container max-w-4xl mx-auto px-6 py-16 md:py-24">
          {/* Header */}
          <header className="mb-12 md:mb-16">
            <h1
              className="mb-4"
              style={{
                fontFamily: "Harvey Serif, Georgia, serif",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                lineHeight: "var(--line-height-tight)",
                letterSpacing: "var(--letter-spacing-tight)",
                color: "var(--color-text-high-contrast)",
              }}
            >
              Privacy Policy
            </h1>
            <p
              style={{
                fontSize: "var(--font-size-base)",
                color: "var(--color-text-secondary)",
                lineHeight: "var(--line-height-relaxed)",
              }}
            >
              Last updated: January 2, 2026
            </p>
          </header>

          {/* Privacy Content */}
          <div
            className="prose prose-casedelta"
            style={{
              color: "var(--color-text-primary)",
            }}
          >
            {/* Section 1 */}
            <section className="mb-12">
              <h2
                className="mb-4"
                style={{
                  fontFamily: "Harvey Serif, Georgia, serif",
                  fontSize: "var(--font-size-h3)",
                  lineHeight: "var(--line-height-tight)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--color-text-high-contrast)",
                }}
              >
                1. Information We Collect
              </h2>
              <p
                style={{
                  fontSize: "var(--font-size-base)",
                  lineHeight: "var(--line-height-relaxed)",
                  color: "var(--color-text-primary)",
                  marginBottom: "1rem",
                }}
              >
                We collect account information including your name, email, law firm details, bar number, and billing information. For document processing, we temporarily store discovery documents you upload and minimal client information (name and email only) when they use your branded portal. We also collect usage data and technical information like IP addresses for security and service improvement. No unnecessary personal information is collected from you or your clients.
              </p>
            </section>

            {/* Section 2 */}
            <section className="mb-12">
              <h2
                className="mb-4"
                style={{
                  fontFamily: "Harvey Serif, Georgia, serif",
                  fontSize: "var(--font-size-h3)",
                  lineHeight: "var(--line-height-tight)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--color-text-high-contrast)",
                }}
              >
                2. How We Use AI and Process Documents
              </h2>
              <p
                style={{
                  fontSize: "var(--font-size-base)",
                  lineHeight: "var(--line-height-relaxed)",
                  color: "var(--color-text-primary)",
                  marginBottom: "1rem",
                }}
              >
                Our AI processes documents with strict safeguards: automatic PII redaction and tokenization occur before any AI processing, and client data is never used to train AI models. You control AI actions through configurable approval gates - the AI suggests, you approve, then it acts. Documents are processed solely to provide our services and are automatically purged according to your configured retention period (default 30 days). All AI actions are logged for audit trails and compliance.
              </p>
            </section>

            {/* Section 3 */}
            <section className="mb-12">
              <h2
                className="mb-4"
                style={{
                  fontFamily: "Harvey Serif, Georgia, serif",
                  fontSize: "var(--font-size-h3)",
                  lineHeight: "var(--line-height-tight)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--color-text-high-contrast)",
                }}
              >
                3. Data Security and Storage
              </h2>
              <p
                style={{
                  fontSize: "var(--font-size-base)",
                  lineHeight: "var(--line-height-relaxed)",
                  color: "var(--color-text-primary)",
                  marginBottom: "1rem",
                }}
              >
                We protect your data through end-to-end encryption, multi-factor authentication, regular security audits, and strict access controls. Documents exist only temporarily during processing and are stored in SOC 2 compliant AWS infrastructure in the United States. You can export all data at any time, and upon account termination, you have 30 days to retrieve data before permanent deletion. While no system is 100% secure, we maintain industry-standard protections appropriate for legal services.
              </p>
            </section>

            {/* Section 4 */}
            <section className="mb-12">
              <h2
                className="mb-4"
                style={{
                  fontFamily: "Harvey Serif, Georgia, serif",
                  fontSize: "var(--font-size-h3)",
                  lineHeight: "var(--line-height-tight)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--color-text-high-contrast)",
                }}
              >
                4. Third-Party Services
              </h2>
              <p
                style={{
                  fontSize: "var(--font-size-base)",
                  lineHeight: "var(--line-height-relaxed)",
                  color: "var(--color-text-primary)",
                  marginBottom: "1rem",
                }}
              >
                We work with vetted providers including AWS for infrastructure, Stripe for payment processing (we never store credit card details), and optional integrations with Google Drive and Dropbox that you control. All providers meet security standards appropriate for legal data. We do not sell, rent, or share your data with any third parties except as necessary to provide our services or comply with legal obligations.
              </p>
            </section>

            {/* Section 5 */}
            <section className="mb-12">
              <h2
                className="mb-4"
                style={{
                  fontFamily: "Harvey Serif, Georgia, serif",
                  fontSize: "var(--font-size-h3)",
                  lineHeight: "var(--line-height-tight)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--color-text-high-contrast)",
                }}
              >
                5. Your Rights and Control
              </h2>
              <p
                style={{
                  fontSize: "var(--font-size-base)",
                  lineHeight: "var(--line-height-relaxed)",
                  color: "var(--color-text-primary)",
                  marginBottom: "1rem",
                }}
              >
                You maintain complete control over your data. You can access and export all documents, configure AI approval settings, set custom retention periods, opt out of marketing communications, and delete your account at any time. Client data is segregated by firm and case, ensuring complete confidentiality. You retain all ownership rights to documents processed through our service.
              </p>
            </section>

            {/* Section 6 */}
            <section className="mb-12">
              <h2
                className="mb-4"
                style={{
                  fontFamily: "Harvey Serif, Georgia, serif",
                  fontSize: "var(--font-size-h3)",
                  lineHeight: "var(--line-height-tight)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--color-text-high-contrast)",
                }}
              >
                6. Legal Compliance
              </h2>
              <p
                style={{
                  fontSize: "var(--font-size-base)",
                  lineHeight: "var(--line-height-relaxed)",
                  color: "var(--color-text-primary)",
                  marginBottom: "1rem",
                }}
              >
                We may disclose information only when legally required, such as complying with valid subpoenas or court orders, protecting safety, or investigating Terms of Service violations. We will notify you of legal requests unless prohibited by law. Our service is intended only for legal professionals and adult clients—we do not knowingly collect information from individuals under 18.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-12">
              <h2
                className="mb-4"
                style={{
                  fontFamily: "Harvey Serif, Georgia, serif",
                  fontSize: "var(--font-size-h3)",
                  lineHeight: "var(--line-height-tight)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--color-text-high-contrast)",
                }}
              >
                7. Updates to This Policy
              </h2>
              <p
                style={{
                  fontSize: "var(--font-size-base)",
                  lineHeight: "var(--line-height-relaxed)",
                  color: "var(--color-text-primary)",
                  marginBottom: "1rem",
                }}
              >
                We may update this Policy with 30 days&apos; notice via email or platform notification. Material changes affecting data handling or AI usage will be clearly highlighted. Continued use after updates constitutes acceptance.
              </p>
            </section>

            {/* Section 8 */}
            <section className="mb-12">
              <h2
                className="mb-4"
                style={{
                  fontFamily: "Harvey Serif, Georgia, serif",
                  fontSize: "var(--font-size-h3)",
                  lineHeight: "var(--line-height-tight)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--color-text-high-contrast)",
                }}
              >
                8. Contact Us
              </h2>
              <p
                style={{
                  fontSize: "var(--font-size-base)",
                  lineHeight: "var(--line-height-relaxed)",
                  color: "var(--color-text-primary)",
                  marginBottom: "1rem",
                }}
              >
                For privacy or AI usage questions, contact{" "}
                <a
                  href="mailto:privacy@casedelta.com"
                  style={{
                    color: "var(--color-text-high-contrast)",
                    textDecoration: "underline",
                    textUnderlineOffset: "2px",
                  }}
                >
                  privacy@casedelta.com
                </a>
                . For support, reach{" "}
                <a
                  href="mailto:support@casedelta.com"
                  style={{
                    color: "var(--color-text-high-contrast)",
                    textDecoration: "underline",
                    textUnderlineOffset: "2px",
                  }}
                >
                  support@casedelta.com
                </a>
                .
              </p>
            </section>

            {/* Closing Statement */}
            <section
              className="mt-16 pt-8"
              style={{
                borderTop: "1px solid var(--color-border)",
              }}
            >
              <p
                style={{
                  fontSize: "var(--font-size-base)",
                  lineHeight: "var(--line-height-relaxed)",
                  color: "var(--color-text-secondary)",
                  fontStyle: "italic",
                }}
              >
                By using CaseDelta, you acknowledge understanding and accepting these privacy and AI usage practices.
              </p>
            </section>
          </div>
        </article>
        <Footer />
      </main>
    </PageWrapper>
  );
}
