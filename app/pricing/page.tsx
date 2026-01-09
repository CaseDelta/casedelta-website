"use client";

import { motion } from "framer-motion";
import PricingHero from "@/components/PricingHero";
import PricingCard from "@/components/PricingCard";
import SocialProof from "@/components/SocialProof";
import { ContactFormSection } from "@/components/ContactFormSection";
import { CTA, CTA_URLS } from "@/lib/constants/cta";
import { useEffect, useState } from "react";

export default function PricingPage() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    // Read theme from localStorage or default to light
    const savedTheme = localStorage.getItem("casedelta-theme") as "light" | "dark" | null;
    const currentTheme = savedTheme || "light";
    setTheme(currentTheme);
    document.documentElement.setAttribute("data-theme", currentTheme);
  }, []);

  return (
    <div className="min-h-screen bg-background" data-theme={theme}>

      <PricingHero />

      {/* Pricing Cards Section */}
      <section className="bg-progressive-3 pt-8 pb-12 md:pt-10 md:pb-16">
        <div className="mx-auto max-w-[900px] px-6">
          <div className="grid gap-6 md:grid-cols-2 items-start">
            <PricingCard
              planName="Firm"
              description="For teams up to 5 users"
              price="$449"
              period="/month flat"
              ctaText={CTA.GET_STARTED}
              ctaHref={CTA_URLS.GET_STARTED}
              isPrimary={false}
            />

            <PricingCard
              planName="Pro"
              description="For teams greater than 5 users"
              price="$849"
              period="/month flat"
              ctaText={CTA.GET_STARTED}
              ctaHref={CTA_URLS.GET_STARTED}
              isPrimary={true}
            />
          </div>

          {/* Unified Features Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            className="mt-16"
          >
            <h3
              className="mb-8 text-center font-serif"
              style={{
                fontSize: "var(--font-size-h3)",
                color: "var(--color-text-high-contrast)",
                letterSpacing: "var(--letter-spacing-tight)",
              }}
            >
              What's Included in All Plans
            </h3>

            <div style={{ textAlign: "center" }}>
              <div
                className="flex flex-col gap-6"
                style={{ display: "inline-block", textAlign: "left" }}
              >
                {[
                "Unlimited cases, clients, and documents",
                "AI verifies documents & automates client follow-ups",
                "Documents automatically organized with one-click export",
                "SOC 2 & HIPAA certified",
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05, ease: [0.33, 1, 0.68, 1] }}
                  className="flex items-start gap-3"
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: "var(--color-text-high-contrast)", flexShrink: 0, marginTop: "2px" }}
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <span
                    style={{
                      fontSize: "var(--font-size-base)",
                      color: "var(--color-text-primary)",
                      lineHeight: "1.7",
                    }}
                  >
                    {feature}
                  </span>
                </motion.div>
              ))}
              </div>
            </div>

          </motion.div>
        </div>
      </section>

      <SocialProof />

      <ContactFormSection />

    </div>
  );
}
