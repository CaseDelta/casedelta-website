"use client";

import { Check } from "lucide-react";

interface PricingCardProps {
  planName: string;
  description: string;
  price: string;
  period?: string;
  features?: string[];
  ctaText: string;
  ctaHref: string;
  isPrimary?: boolean;
  badge?: string;
}

export default function PricingCard({
  planName,
  description,
  price,
  period = "/month",
  features,
  ctaText,
  ctaHref,
  isPrimary = false,
  badge,
}: PricingCardProps) {
  return (
    <div className="flex flex-col rounded-2xl border border-border p-8 bg-surface">
      <h3 className="mb-3 font-serif text-2xl md:text-3xl text-text-high-contrast">
        {planName}
      </h3>

      <p className="mb-6 text-base md:text-lg leading-[1.7] text-text-secondary">
        {description}
      </p>

      <div className="mb-8">
        <span className="font-serif text-[clamp(2.5rem,4vw,3rem)] leading-none tracking-tight text-text-high-contrast">
          {price}
        </span>
        {period && (
          <span className="ml-1 text-lg text-text-secondary">{period}</span>
        )}
      </div>

      <a
        href={ctaHref}
        className="block rounded-lg px-8 py-3 text-center"
        style={{
          border: "1px solid var(--color-border)",
          backgroundColor: "transparent",
          fontSize: "var(--font-size-base)",
          fontWeight: "var(--font-weight-medium)",
          color: "var(--color-text-high-contrast)",
          textDecoration: "none",
          transition: "all 0.2s ease",
          opacity: 1,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = "var(--color-text-high-contrast)";
          e.currentTarget.style.opacity = "1";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = "var(--color-border)";
          e.currentTarget.style.opacity = "1";
        }}
      >
        {ctaText}
      </a>

      {features && features.length > 0 && (
        <>
          <div className="mb-5 mt-8">
            <p className="text-sm font-medium uppercase tracking-wider text-text-tertiary">
              What's included
            </p>
          </div>

          <ul className="flex flex-col gap-4">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-3">
                <Check
                  className="mt-1 shrink-0 text-text-high-contrast"
                  size={20}
                />
                <span className="text-base leading-[1.7] text-text-primary">{feature}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
