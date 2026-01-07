"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import PricingHero from "@/components/PricingHero";
import PricingCard from "@/components/PricingCard";
import FAQAccordion from "@/components/FAQAccordion";
import SocialProof from "@/components/SocialProof";
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
      <Navbar />

      <PricingHero />

      {/* Pricing Cards Section */}
      <section className="bg-background py-12 md:py-16">
        <div className="mx-auto max-w-[900px] px-6">
          <div className="grid gap-6 md:grid-cols-2 items-start">
            <PricingCard
              planName="Firm"
              description="For teams up to 5 users"
              price="$449"
              period="/month flat"
              features={[
                "Up to 5 users included",
                "Unlimited document requests",
                "AI-powered verification & reminders",
              ]}
              ctaText={CTA.START_FREE_TRIAL}
              ctaHref={CTA_URLS.START_FREE_TRIAL}
              isPrimary={false}
            />

            <PricingCard
              planName="Pro"
              description="For teams greater than 5 users"
              price="$849"
              period="/month flat"
              features={[
                "Unlimited users",
                "Advanced analytics & reporting",
                "Priority support & dedicated account manager",
              ]}
              ctaText={CTA.START_FREE_TRIAL}
              ctaHref={CTA_URLS.START_FREE_TRIAL}
              isPrimary={true}
            />
          </div>
        </div>
      </section>

      <SocialProof />

      <FAQAccordion />

      {/* Final CTA Section */}
      <section className="bg-progressive-2 py-32 md:py-40">
        <div className="mx-auto max-w-[900px] px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            className="mb-6 font-serif text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tight text-text-high-contrast"
          >
            Ready to streamline your document collection?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
            className="mb-8 text-lg leading-relaxed text-text-secondary"
          >
            Start your free 14-day trial. No credit card required.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href={CTA_URLS.START_FREE_TRIAL}
              className="rounded-lg bg-button-primary px-8 py-4 font-medium text-button-primary-text transition-opacity duration-150 hover:opacity-85"
            >
              {CTA.START_FREE_TRIAL}
            </a>
            <a
              href={CTA_URLS.SCHEDULE_DEMO}
              className="rounded-lg border border-border bg-transparent px-8 py-4 font-medium text-text-primary transition-colors duration-150 hover:bg-surface-hover"
            >
              {CTA.SCHEDULE_DEMO}
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
