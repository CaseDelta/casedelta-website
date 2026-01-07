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
      className={`flex min-h-[600px] flex-col rounded-2xl border-2 p-10 ${
        isPrimary
          ? "border-black bg-white"
          : "border-[#E5E5E5] bg-white"
      }`}
    >
      <h3 className="mb-3 font-serif text-2xl text-black md:text-3xl">
        {planName}
      </h3>

      <p className="mb-6 text-lg leading-[1.7] text-[#666666]">
        {description}
      </p>

      <div className="mb-10">
        <span className="font-serif text-[clamp(2.5rem,4vw,3rem)] leading-none tracking-tight text-black">
          {price}
        </span>
        {period && (
          <span className="ml-1 text-lg text-[#666666]">{period}</span>
        )}
      </div>

      <a
        href={ctaHref}
        className="mb-10 block rounded-lg border-2 border-[#E5E5E5] bg-transparent px-8 py-4 text-center text-base font-medium text-black transition-colors duration-300 hover:border-black"
      >
        {ctaText}
      </a>

      <div className="mb-6 border-t border-[#E5E5E5] pt-6">
        <p className="text-sm font-medium uppercase tracking-wider text-[#999999]">
          What's included
        </p>
      </div>

      <ul className="flex flex-col gap-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <Check
              className="mt-1 shrink-0 text-black"
              size={20}
            />
            <span className="text-base leading-[1.7] text-[#333333]">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
