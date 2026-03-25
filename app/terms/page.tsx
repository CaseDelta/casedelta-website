"use client";

import {
  LegalPageLayoutV2,
  LegalSectionV2,
  LegalClosingV2,
  LEGAL_LINK_STYLE,
} from "@/components/LegalPageLayoutV2";

export default function TermsPage() {
  return (
    <LegalPageLayoutV2 title="Terms of Service">
      <LegalSectionV2 title="Using CaseDelta">
        <p>
          By using CaseDelta, you agree to these Terms and our{" "}
          <a href="/privacy" style={LEGAL_LINK_STYLE}>Privacy Policy</a>.
          CaseDelta provides Delta, an AI associate that learns how your firm works &mdash; connecting to your existing tools, analyzing your documents, and building institutional knowledge that compounds over time.
        </p>
        <p style={{ marginTop: 12 }}>
          <strong>Delta is a productivity tool, not a lawyer.</strong> CaseDelta does not provide legal advice and does not create an attorney-client relationship between CaseDelta and you or your clients. Delta generates analyses, chronologies, and reports to assist your professional judgment. You remain fully responsible for all legal work, professional obligations, and the accuracy of any work product you deliver to clients or courts.
        </p>
      </LegalSectionV2>

      <LegalSectionV2 title="Your Account">
        <p>
          You are responsible for maintaining the security of your account and all activity under it. Provide accurate registration information and keep your credentials confidential. If you suspect unauthorized access, contact us immediately at{" "}
          <a href="mailto:support@casedelta.com" style={LEGAL_LINK_STYLE}>
            support@casedelta.com
          </a>
          .
        </p>
      </LegalSectionV2>

      <LegalSectionV2 title="Your Data and Intellectual Property">
        <p>
          You own all documents and data you upload to CaseDelta. CaseDelta claims no ownership or intellectual property rights over your content. We process your documents solely to provide the service.
        </p>
        <p style={{ marginTop: 12 }}>
          We never use your documents, queries, or Delta&apos;s responses to train AI models. Your firm&apos;s data is completely isolated from every other firm on the platform. You can export all of your data at any time. See our{" "}
          <a href="/privacy" style={LEGAL_LINK_STYLE}>Privacy Policy</a>{" "}
          for complete details on how we handle your data.
        </p>
      </LegalSectionV2>

      <LegalSectionV2 title="AI-Generated Output">
        <p>
          Delta generates analyses, chronologies, anomaly reports, case briefs, and other work product based on the documents you provide. These outputs are tools to assist your professional judgment &mdash; not substitutes for it.
        </p>
        <p style={{ marginTop: 12 }}>
          <strong>CaseDelta does not guarantee the accuracy, completeness, or legal sufficiency of any AI-generated output.</strong> You must independently verify all findings, conclusions, and recommendations before relying on them in any legal matter. Delta may miss relevant information, misinterpret documents, or produce errors. Professional review of all output is required.
        </p>
      </LegalSectionV2>

      <LegalSectionV2 title="Acceptable Use">
        <p>You agree to use CaseDelta only for lawful purposes and in accordance with these Terms. You will not:</p>
        <ul style={{ marginTop: 12, paddingLeft: 20, listStyleType: "disc" }}>
          <li style={{ marginBottom: 8 }}>
            Attempt to compromise, disrupt, or gain unauthorized access to CaseDelta&apos;s systems or infrastructure.
          </li>
          <li style={{ marginBottom: 8 }}>
            Share your account credentials with unauthorized individuals.
          </li>
          <li style={{ marginBottom: 8 }}>
            Reverse-engineer, decompile, or attempt to extract the source code or underlying algorithms of the service.
          </li>
          <li>
            Use the service in any way that violates applicable laws, regulations, or professional conduct rules.
          </li>
        </ul>
      </LegalSectionV2>

      <LegalSectionV2 title="Subscription and Billing">
        <p>
          CaseDelta operates on a subscription basis. Current pricing is available on our website or through our sales team. Either party may cancel at any time.
        </p>
        <p style={{ marginTop: 12 }}>
          Upon cancellation, you retain access through the end of your current billing period. You then have 30 days to export your data before it is permanently deleted. See our{" "}
          <a href="/privacy" style={LEGAL_LINK_STYLE}>Privacy Policy</a>{" "}
          for data retention details.
        </p>
      </LegalSectionV2>

      <LegalSectionV2 title="Limitation of Liability">
        <p>
          CaseDelta is provided &ldquo;as is&rdquo; without warranties of any kind, express or implied, including warranties of merchantability, fitness for a particular purpose, or non-infringement.
        </p>
        <p style={{ marginTop: 12 }}>
          To the maximum extent permitted by law, CaseDelta shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service, including but not limited to loss of data, loss of revenue, or damages arising from reliance on AI-generated output.
        </p>
        <p style={{ marginTop: 12 }}>
          If you integrate CaseDelta with third-party services (such as Clio, Google Drive, or Outlook), those integrations are subject to their respective terms and conditions. CaseDelta is not responsible for the availability or functionality of third-party services.
        </p>
      </LegalSectionV2>

      <LegalSectionV2 title="Termination">
        <p>
          Either party may terminate this agreement at any time. CaseDelta may suspend or terminate your access if you violate these Terms or engage in conduct that harms the service or other users.
        </p>
        <p style={{ marginTop: 12 }}>
          Upon termination, your right to use CaseDelta ceases immediately (or at the end of your billing period for voluntary cancellation). You will have 30 days to export your data before permanent deletion.
        </p>
      </LegalSectionV2>

      <LegalSectionV2 title="Changes and Governing Law">
        <p>
          We may update these Terms from time to time. When we make material changes, we&apos;ll notify you via email or through the CaseDelta interface. Continued use of the service after changes constitutes acceptance of the updated Terms.
        </p>
        <p style={{ marginTop: 12 }}>
          These Terms are governed by the laws of the State of Kansas, without regard to conflict of law principles. For questions about these Terms, contact{" "}
          <a href="mailto:support@casedelta.com" style={LEGAL_LINK_STYLE}>
            support@casedelta.com
          </a>
          .
        </p>
      </LegalSectionV2>

      <LegalClosingV2>
        By using CaseDelta, you acknowledge understanding and agreeing to these Terms of Service.
      </LegalClosingV2>
    </LegalPageLayoutV2>
  );
}
