"use client";

import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import AboutHero from "@/components/AboutHero";
import ValueCard from "@/components/ValueCard";
import { QuantifiableImpact } from "@/components/QuantifiableImpact";
import { CTA, CTA_URLS } from "@/lib/constants/cta";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background" data-theme="light">
      <Navbar />

      <AboutHero />

      {/* Story Section */}
      <section className="bg-surface py-16 md:py-20">
        <div className="mx-auto max-w-[800px] px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            className="mb-8 font-serif text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tight text-text-high-contrast"
          >
            Our Story
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
            className="space-y-6 leading-relaxed text-text-primary"
          >
            <p>
              Every legal professional knows the pain: document requests that
              turn into weeks of follow-up calls, incomplete submissions that
              delay cases, and hours wasted organizing files that should have
              been simple. We built CaseDelta because we saw how much time
              lawyers lose to administrative busywork that technology could
              handle.
            </p>

            <p>
              Our AI-powered platform automates the entire document collection
              workflow—from intelligent client reminders to real-time
              verification and organized delivery. We're not trying to replace
              legal judgment; we're eliminating the follow-up headache so you
              can focus on the work that matters.
            </p>

            <p>
              We're starting with document collection, but our vision is bigger:
              a world where legal professionals have AI-powered tools
              purpose-built for their workflow, not generic software adapted
              from other industries. Where every law firm—from solo
              practitioners to large firms—has access to technology that makes
              them more efficient, not just busier.
            </p>

            <p>
              We're early in this journey. CaseDelta launched in 2025 and is
              already trusted by 500+ legal professionals. We're growing our
              team to build the document automation platform that legal
              professionals deserve.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="bg-progressive-2 py-32">
        <div className="mx-auto max-w-[1200px] px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            className="mb-16 text-center font-serif text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tight text-text-high-contrast"
          >
            What We Believe
          </motion.h2>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <ValueCard
              title="Built for Legal Professionals"
              description="We're not adapting generic tools—we're building purpose-built software for the unique workflows of legal practice."
              delay={0}
            />
            <ValueCard
              title="Privacy & Security First"
              description="Client data is sacred. We maintain bank-level encryption, zero-knowledge architecture, and transparent AI policies."
              delay={0.05}
            />
            <ValueCard
              title="Simplicity Over Features"
              description="We solve one problem exceptionally well rather than adding complexity. Every feature earns its place."
              delay={0.1}
            />
            <ValueCard
              title="Transparent & Honest"
              description="No hidden fees, no dark patterns, no misleading claims. We build trust through honesty and reliability."
              delay={0.15}
            />
            <ValueCard
              title="Continuous Improvement"
              description="We ship updates weekly, listen to feedback, and iterate based on how legal professionals actually work."
              delay={0.2}
            />
            <ValueCard
              title="Accessible to All Firms"
              description="Whether you're a solo practitioner or a large firm, you deserve powerful automation tools at fair pricing."
              delay={0.25}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <QuantifiableImpact />

      {/* Contact CTA Section */}
      <section className="bg-surface py-32">
        <div className="mx-auto max-w-[900px] px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
            className="mb-6 font-serif text-[clamp(2rem,4vw,3rem)] leading-tight tracking-tight text-text-high-contrast"
          >
            Questions about CaseDelta?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.33, 1, 0.68, 1] }}
            className="mb-8 text-lg leading-relaxed text-text-secondary"
          >
            We'd love to hear from you. Reach out for a demo, partnership
            inquiry, or just to say hello.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.33, 1, 0.68, 1] }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href={CTA_URLS.SCHEDULE_DEMO}
              className="rounded-lg bg-button-primary px-8 py-4 font-medium text-button-primary-text transition-opacity duration-150 hover:opacity-85"
            >
              {CTA.SCHEDULE_DEMO}
            </a>
            <a
              href="mailto:support@casedelta.com"
              className="text-text-primary underline transition-opacity duration-150 hover:opacity-70"
            >
              support@casedelta.com
            </a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
