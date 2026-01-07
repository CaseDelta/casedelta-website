"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AIPolicy() {
  return (
    <main
      className="min-h-screen bg-background pt-[120px] pb-20 px-6"
      data-theme="light"
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link
            href="/"
            className="inline-flex items-center mb-8 text-sm text-text-secondary no-underline transition-colors duration-200 hover:text-text-high-contrast"
          >
            ← Back to Home
          </Link>

          <h1 className="text-[32px] font-semibold tracking-tight text-text-high-contrast mb-5 font-serif">
            Our AI Policy
          </h1>

          <p className="text-sm text-text-tertiary mb-10">
            Last updated: January 2026
          </p>

          <div className="bg-surface border border-border rounded-xl p-12">
            <div className="text-base text-text-primary leading-relaxed">
              <p className="mb-7">
                We built CaseDelta with a simple principle: your client data stays yours. Period.
              </p>

              <p className="mb-7">
                Unlike other AI tools that send your data to third-party services like OpenAI or Anthropic, we run our own AI infrastructure. This means we own and operate all the servers, containers, and AI models that power CaseDelta. Your client documents never leave our systems, and they're never processed by anyone else's AI.
              </p>

              <p className="mb-7">
                Think of it this way: when you use most AI tools, your data takes a trip through someone else's servers before coming back to you. With CaseDelta, everything happens inside our walls. We host our own AI models on our own servers, so your documents stay exactly where they should be—under your control and protected by our security.
              </p>

              <p className="mb-7">
                We don't share, sell, or allow third parties to access your client data. We don't use your documents to train AI models. We don't send your information to external AI providers. What you upload to CaseDelta stays in CaseDelta.
              </p>

              <p className="mb-0">
                This approach costs us more and takes more work to maintain, but we believe it's the only responsible way to handle sensitive legal documents. Your clients trust you with their information, and you should be able to trust us with it too.
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <p className="text-base text-text-secondary mb-4">
                Questions about our AI infrastructure or data handling?
              </p>
              <a
                href="mailto:camren@casedelta.com"
                className="text-base text-text-high-contrast underline font-medium hover:opacity-70 transition-opacity duration-150"
              >
                camren@casedelta.com
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
