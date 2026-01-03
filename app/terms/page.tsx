"use client";

import { PageWrapper } from "@/components/PageWrapper";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export default function TermsPage() {
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
              Terms of Service
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

          {/* Terms Content */}
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
                1. Acceptance of Terms
              </h2>
              <p
                style={{
                  fontSize: "var(--font-size-base)",
                  lineHeight: "var(--line-height-relaxed)",
                  color: "var(--color-text-primary)",
                  marginBottom: "1rem",
                }}
              >
                By using CaseDelta&apos;s document automation platform (&quot;Service&quot;), you agree to these Terms and our Privacy Policy. If using the Service for a law firm or organization, you represent having authority to bind that entity.
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
                2. Service Description
              </h2>
              <p
                style={{
                  fontSize: "var(--font-size-base)",
                  lineHeight: "var(--line-height-relaxed)",
                  color: "var(--color-text-primary)",
                  marginBottom: "1rem",
                }}
              >
                CaseDelta provides automated document collection, validation, and organization for legal discovery. The Service is a productivity tool and does not provide legal advice or create an attorney-client relationship. You remain fully responsible for all legal work and professional judgment.
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
                3. Account Security
              </h2>
              <p
                style={{
                  fontSize: "var(--font-size-base)",
                  lineHeight: "var(--line-height-relaxed)",
                  color: "var(--color-text-primary)",
                  marginBottom: "1rem",
                }}
              >
                You must provide accurate registration information and maintain the confidentiality of your credentials. You&apos;re responsible for all account activity. Notify us immediately at{" "}
                <a
                  href="mailto:support@casedelta.com"
                  style={{
                    color: "var(--color-text-high-contrast)",
                    textDecoration: "underline",
                    textUnderlineOffset: "2px",
                  }}
                >
                  support@casedelta.com
                </a>{" "}
                of any unauthorized access.
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
                4. Acceptable Use
              </h2>
              <p
                style={{
                  fontSize: "var(--font-size-base)",
                  lineHeight: "var(--line-height-relaxed)",
                  color: "var(--color-text-primary)",
                  marginBottom: "1rem",
                }}
              >
                Use the Service only for lawful legal practice. Do not: violate attorney-client privilege, attempt to compromise our security, share account credentials, or process documents without legal authority. We may suspend accounts violating these Terms.
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
                5. Data Processing and Ownership
              </h2>
              <p
                style={{
                  fontSize: "var(--font-size-base)",
                  lineHeight: "var(--line-height-relaxed)",
                  color: "var(--color-text-primary)",
                  marginBottom: "1rem",
                }}
              >
                The Service uses AI to process documents with industry-standard security including encryption and PII protection. You retain all document ownership rights. We don&apos;t use client data to train AI models. Documents are automatically purged according to your configured retention period.
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
                6. Subscription and Payment
              </h2>
              <p
                style={{
                  fontSize: "var(--font-size-base)",
                  lineHeight: "var(--line-height-relaxed)",
                  color: "var(--color-text-primary)",
                  marginBottom: "1rem",
                }}
              >
                Service costs $1,199/month for up to 5 users, with additional users at $219/month. Fees are non-refundable except per our Performance Guarantee: if we don&apos;t save you 4+ hours weekly, request a monthly credit. We may modify pricing with 30 days&apos; notice.
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
                7. Third-Party Integrations
              </h2>
              <p
                style={{
                  fontSize: "var(--font-size-base)",
                  lineHeight: "var(--line-height-relaxed)",
                  color: "var(--color-text-primary)",
                  marginBottom: "1rem",
                }}
              >
                The Service integrates with platforms like Google Drive and Dropbox. Your use of these integrations is subject to their terms. We&apos;re not responsible for third-party platform functionality.
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
                8. Confidentiality
              </h2>
              <p
                style={{
                  fontSize: "var(--font-size-base)",
                  lineHeight: "var(--line-height-relaxed)",
                  color: "var(--color-text-primary)",
                  marginBottom: "1rem",
                }}
              >
                We maintain strict confidentiality of all client data. We won&apos;t disclose your data except as required by law or with your explicit consent.
              </p>
            </section>

            {/* Section 9 */}
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
                9. Limitation of Liability
              </h2>
              <p
                style={{
                  fontSize: "var(--font-size-base)",
                  lineHeight: "var(--line-height-relaxed)",
                  color: "var(--color-text-primary)",
                  marginBottom: "1rem",
                }}
              >
                To the maximum extent permitted by law, CaseDelta shall not be liable for indirect, incidental, special, or consequential damages. Our total liability shall not exceed twelve months of subscription fees.
              </p>
            </section>

            {/* Section 10 */}
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
                10. Termination and Data Export
              </h2>
              <p
                style={{
                  fontSize: "var(--font-size-base)",
                  lineHeight: "var(--line-height-relaxed)",
                  color: "var(--color-text-primary)",
                  marginBottom: "1rem",
                }}
              >
                Either party may terminate with written notice. Upon termination, access ends at your current billing period&apos;s conclusion. You may export all documents before termination and have 30 days post-termination to retrieve data.
              </p>
            </section>

            {/* Section 11 */}
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
                11. Governing Law
              </h2>
              <p
                style={{
                  fontSize: "var(--font-size-base)",
                  lineHeight: "var(--line-height-relaxed)",
                  color: "var(--color-text-primary)",
                  marginBottom: "1rem",
                }}
              >
                These Terms are governed by Kansas law. Disputes shall be resolved in Johnson County, Kansas courts.
              </p>
            </section>

            {/* Section 12 */}
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
                12. Modifications
              </h2>
              <p
                style={{
                  fontSize: "var(--font-size-base)",
                  lineHeight: "var(--line-height-relaxed)",
                  color: "var(--color-text-primary)",
                  marginBottom: "1rem",
                }}
              >
                We may modify these Terms with 30 days&apos; notice. Continued use constitutes acceptance. For questions, contact{" "}
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
                By using CaseDelta, you acknowledge understanding and agreeing to these Terms of Service.
              </p>
            </section>
          </div>
        </article>
        <Footer />
      </main>
    </PageWrapper>
  );
}
