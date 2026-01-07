"use client";

import { Check } from "lucide-react";

interface PricingCardProps {
  planName: string;
  description: string;
  price: string;
  period?: string;
  features: string[];
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
    <div
      className={`group relative flex min-h-[600px] flex-col rounded-2xl border-2 bg-surface p-10 transition-all duration-300 hover:-translate-y-1 ${
        isPrimary
          ? "border-text-high-contrast bg-[#FAFAFA]"
          : "border-border hover:border-text-tertiary"
      }`}
    >
      {badge && (
        <div className="mb-4">
          <span className="inline-block rounded-full bg-button-primary px-3 py-1 text-xs font-medium uppercase tracking-wider text-button-primary-text">
            {badge}
          </span>
        </div>
      )}

      <h3 className="mb-3 font-serif text-2xl text-text-high-contrast md:text-3xl">
        {planName}
      </h3>

      <p className="mb-6 text-lg leading-[1.7] text-text-secondary">
        {description}
      </p>

      <div className="mb-10">
        <span className="font-serif text-[clamp(2.5rem,4vw,3rem)] leading-none tracking-tight text-text-high-contrast">
          {price}
        </span>
        {period && (
          <span className="ml-1 text-lg text-text-secondary">{period}</span>
        )}
      </div>

      <a
        href={ctaHref}
        className={`mb-10 block rounded-lg border-2 px-8 py-4 text-center text-base font-medium transition-all duration-200 ${
          isPrimary
            ? "border-button-primary bg-button-primary text-button-primary-text hover:bg-[#333]"
            : "border-text-high-contrast bg-transparent text-text-high-contrast hover:bg-text-high-contrast hover:text-white"
        }`}
      >
        {ctaText}
      </a>

      <div className="mb-6 border-t border-border pt-6">
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
    </div>
  );
}
