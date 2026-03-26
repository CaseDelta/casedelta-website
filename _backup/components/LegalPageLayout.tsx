"use client";

import { getLastUpdatedDate } from "@/lib/utils/legalDates";
import { ReactNode } from "react";

interface LegalPageLayoutProps {
  title: string;
  children: ReactNode;
}

export function LegalPageLayout({ title, children }: LegalPageLayoutProps) {
  const lastUpdatedText = getLastUpdatedDate();

  return (
    <main className="pt-32">
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
              {title}
            </h1>
            <p
              style={{
                fontSize: "var(--font-size-base)",
                color: "var(--color-text-secondary)",
                lineHeight: "var(--line-height-relaxed)",
              }}
            >
              Last updated: {lastUpdatedText}
            </p>
          </header>

          {/* Content */}
          <div
            className="prose prose-casedelta"
            style={{
              color: "var(--color-text-primary)",
            }}
          >
            {children}
          </div>
        </article>
      </main>
  );
}

interface LegalSectionProps {
  title: string;
  children: ReactNode;
}

export function LegalSection({ title, children }: LegalSectionProps) {
  return (
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
        {title}
      </h2>
      <div
        style={{
          fontSize: "var(--font-size-base)",
          lineHeight: "var(--line-height-relaxed)",
          color: "var(--color-text-primary)",
          marginBottom: "1rem",
        }}
      >
        {children}
      </div>
    </section>
  );
}

interface LegalClosingProps {
  children: ReactNode;
}

export function LegalClosing({ children }: LegalClosingProps) {
  return (
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
        {children}
      </p>
    </section>
  );
}
