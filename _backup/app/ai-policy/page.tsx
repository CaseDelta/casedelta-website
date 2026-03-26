"use client";

import { LegalPageLayout, LegalSection } from "@/components/LegalPageLayout";

export default function AIPolicy() {
  return (
    <LegalPageLayout title="Our AI Policy">
      <LegalSection title="We Run Our Own AI Infrastructure">
        <p>
          Unlike other AI tools that send your data to third-party services like OpenAI or Anthropic, we own and operate our entire AI infrastructure. When you use most AI tools, your data takes a trip through someone else's servers. With CaseDelta, everything happens inside our walls—your client documents never leave our systems and are never processed by anyone else's AI.
        </p>
      </LegalSection>

      <LegalSection title="What We Don't Do With Your Data">
        <p>
          We don't share, sell, or allow third parties to access your client data. We don't use your documents to train AI models. We don't send your information to external AI providers. What you upload to CaseDelta stays in CaseDelta.
        </p>
      </LegalSection>

      <LegalSection title="Why We Built It This Way">
        <p>
          This approach costs us more and takes more work to maintain, but we believe it's the only responsible way to handle sensitive legal documents. Your clients trust you with their information, and you should be able to trust us with it too.
        </p>
      </LegalSection>
    </LegalPageLayout>
  );
}
