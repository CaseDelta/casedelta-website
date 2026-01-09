"use client";

import { LegalPageLayout, LegalSection, LegalClosing } from "@/components/LegalPageLayout";
import { CONTACT_EMAILS } from "@/lib/constants/contact";

export default function TermsPage() {
  return (
    <LegalPageLayout title="Terms of Service">
      <LegalSection title="Using CaseDelta">
        <p>
          By using CaseDelta, you agree to these Terms and our Privacy Policy. CaseDelta provides automated document collection and organization for legal professionals. The Service is a productivity tool—it does not provide legal advice or create an attorney-client relationship. You remain fully responsible for all legal work and professional judgment.
        </p>
      </LegalSection>

      <LegalSection title="Your Account">
        <p>
          You&apos;re responsible for maintaining the security of your account and all activity that occurs under it. Provide accurate registration information and keep your credentials confidential. If you suspect unauthorized access, contact us immediately at{" "}
          <a
            href={`mailto:${CONTACT_EMAILS.SUPPORT}`}
            style={{
              color: "var(--color-text-high-contrast)",
              textDecoration: "underline",
              textUnderlineOffset: "2px",
            }}
          >
            {CONTACT_EMAILS.SUPPORT}
          </a>
          . Use the Service only for lawful purposes and don&apos;t attempt to compromise our security or share account credentials.
        </p>
      </LegalSection>

      <LegalSection title="Your Data">
        <p>
          You own all documents and data you upload to CaseDelta. We use AI to process your documents with encryption and security protections, but we never use your data to train AI models. You can export your data at any time. We maintain strict confidentiality and won&apos;t disclose your data except as required by law or with your consent. See our Privacy Policy and AI Policy for complete details.
        </p>
      </LegalSection>

      <LegalSection title="Subscription and Cancellation">
        <p>
          CaseDelta operates on a subscription basis with pricing available on our website. Either party may cancel at any time. Upon cancellation, you&apos;ll have access through the end of your current billing period and 30 days to export your data before it&apos;s permanently deleted.
        </p>
      </LegalSection>

      <LegalSection title="Limitations">
        <p>
          The Service is provided &quot;as is&quot; without warranties. We&apos;re not responsible for indirect or consequential damages arising from your use of CaseDelta. If you integrate with third-party services, those are subject to their own terms and we&apos;re not responsible for their functionality.
        </p>
      </LegalSection>

      <LegalSection title="Changes and Contact">
        <p>
          We may update these Terms with notice to you. Continued use after changes means you accept the updated Terms. These Terms are governed by Kansas law. For questions, contact{" "}
          <a
            href={`mailto:${CONTACT_EMAILS.SUPPORT}`}
            style={{
              color: "var(--color-text-high-contrast)",
              textDecoration: "underline",
              textUnderlineOffset: "2px",
            }}
          >
            {CONTACT_EMAILS.SUPPORT}
          </a>
          .
        </p>
      </LegalSection>

      <LegalClosing>
        By using CaseDelta, you acknowledge understanding and agreeing to these Terms of Service.
      </LegalClosing>
    </LegalPageLayout>
  );
}
