"use client";

import { LegalPageLayout, LegalSection, LegalClosing } from "@/components/LegalPageLayout";
import { CONTACT_EMAILS } from "@/lib/constants/contact";

export default function PrivacyPage() {
  return (
    <LegalPageLayout title="Privacy Policy">
      <LegalSection title="What We Collect">
        <p>
          We collect your account information (name, email, firm details, and billing information) and the documents you upload for processing. When your clients use the portal, we collect only their name and email. We also collect basic usage data and technical information for security and improving our service. We don&apos;t collect unnecessary information.
        </p>
      </LegalSection>

      <LegalSection title="How We Use Your Data">
        <p>
          We use AI to process your documents with security protections in place. Your data is never used to train AI models. Documents are processed only to provide our service and are automatically deleted based on your retention settings. You can export your data anytime, and you have 30 days after cancellation to retrieve it. We never sell or share your data with third parties except as needed to provide our service (like AWS for hosting and Stripe for payments) or when legally required.
        </p>
      </LegalSection>

      <LegalSection title="Security and Storage">
        <p>
          Your data is encrypted and stored on secure AWS infrastructure in the United States. We use multi-factor authentication, access controls, and security monitoring to protect your information. While no system is completely secure, we maintain protections appropriate for legal data. See our AI Policy for details on how we handle AI processing.
        </p>
      </LegalSection>

      <LegalSection title="Your Control">
        <p>
          You own all your data and can export or delete it at any time. You control retention periods and can opt out of marketing communications. We may disclose information only when legally required and will notify you unless prohibited by law.
        </p>
      </LegalSection>

      <LegalSection title="Changes and Contact">
        <p>
          We may update this Policy with notice to you. For privacy questions, contact{" "}
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
        By using CaseDelta, you acknowledge understanding and accepting this Privacy Policy.
      </LegalClosing>
    </LegalPageLayout>
  );
}
