import { LegalPage, LegalSection, LEGAL_LINK_STYLE } from "@/components/concept/ConceptLegal";

/*
 * Written 2026-09-25 to cover every dimension in plain terms, without describing
 * individual features or platforms, so it does not need editing each time the
 * product changes. A signed order form or agreement with a firm overrides these.
 */
const CONCIERGE = "concierge@casedelta.com";

export default function TermsClient() {
  return (
    <LegalPage title="Terms of Service" lastUpdated="September 25, 2026">
      <LegalSection title="Agreement">
        <p>These Terms are an agreement between you and CaseDelta (&ldquo;we,&rdquo; &ldquo;us&rdquo;). By using CaseDelta you agree to them and to our <a href="/privacy" style={LEGAL_LINK_STYLE}>Privacy Policy</a>. If you use CaseDelta for a firm, you agree for the firm and confirm you may bind it. If your firm has a signed agreement with us, that agreement controls where it differs.</p>
      </LegalSection>

      <LegalSection title="The service">
        <p>CaseDelta provides Delta, an AI paralegal that works inside the systems your firm connects and does work at your firm&apos;s direction, including work you schedule. We may improve or change features over time. We will not materially reduce the core service during a paid period without notice.</p>
      </LegalSection>

      <LegalSection title="Accounts">
        <p>Keep account information accurate and sign-ins secure. Your firm is responsible for everything done under its accounts and for who it gives access to. Each person who signs in counts as an account for pricing.</p>
      </LegalSection>

      <LegalSection title="Connected systems">
        <p>When your firm connects a system, you authorize Delta to sign in and act in it on your behalf, as you direct. You confirm your firm is allowed to give that access under the system&apos;s own terms. Your use of those systems stays governed by their terms, and we are not responsible for their availability or changes.</p>
      </LegalSection>

      <LegalSection title="Your data">
        <p>Your firm owns its data. You give us permission to use it only to provide and support the service, as described in the Privacy Policy. We never use it to train AI models and never sell it. We keep it confidential, and you keep confidential any non-public information about CaseDelta.</p>
      </LegalSection>

      <LegalSection title="AI output and your professional judgment">
        <p>Delta is not a lawyer. CaseDelta does not give legal advice and creates no attorney-client relationship. AI output can be incomplete or wrong. You are responsible for reviewing it before relying on it, sending it, or filing it, and for meeting your professional obligations.</p>
      </LegalSection>

      <LegalSection title="Acceptable use">
        <p>Use CaseDelta lawfully and within the rules of professional conduct. Do not attempt to break, overload or gain unauthorized access to the service; share sign-ins outside your firm; reverse engineer the service; or use it to infringe anyone&apos;s rights or send unlawful messages.</p>
      </LegalSection>

      <LegalSection title="Fees and billing">
        <p>Subscriptions are billed in advance at the price on our website or in your order. Fees exclude taxes. We may suspend the service for unpaid fees after notice. We will give at least 30 days&apos; notice of a price change, which applies from your next billing period. Fees already paid are not refunded, and access continues to the end of the paid period.</p>
      </LegalSection>

      <LegalSection title="Our property">
        <p>We own CaseDelta, including its software and content. If you send us feedback, we may use it without obligation to you.</p>
      </LegalSection>

      <LegalSection title="Disclaimers">
        <p>CaseDelta is provided &ldquo;as is.&rdquo; To the extent the law allows, we disclaim all warranties, including merchantability, fitness for a particular purpose, and non-infringement, and we do not promise the service will be uninterrupted or error-free.</p>
      </LegalSection>

      <LegalSection title="Limitation of liability">
        <p>To the extent the law allows, neither party is liable for indirect, incidental, special, consequential or punitive damages, or for lost profits or data. Our total liability for any claim is limited to the fees your firm paid us in the 12 months before the claim arose.</p>
      </LegalSection>

      <LegalSection title="Indemnity">
        <p>Your firm will defend and hold us harmless from claims arising from its data, its use of the service in breach of these Terms, or its breach of a connected system&apos;s terms.</p>
      </LegalSection>

      <LegalSection title="Ending the agreement">
        <p>Either party may cancel at any time; cancellation takes effect at the end of the paid period. We may suspend or end access for a breach of these Terms or conduct that harms the service or others. After the service ends, your firm has 30 days to export its data before it is deleted.</p>
      </LegalSection>

      <LegalSection title="General">
        <p>Kansas law governs these Terms. We may update these Terms; if a change is material, we will tell account holders by email or in the service before it takes effect, and continued use means acceptance. If any part is unenforceable, the rest remains in effect. Questions go to <a href={`mailto:${CONCIERGE}`} style={LEGAL_LINK_STYLE}>{CONCIERGE}</a>.</p>
      </LegalSection>
    </LegalPage>
  );
}
