"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    quote: "CaseDelta cut our document collection time by 70%. Game changer.",
    author: "Sarah Chen",
    role: "Partner, Chen & Associates",
  },
  {
    quote: "Our clients love how simple it is. No more chasing documents.",
    author: "Michael Rodriguez",
    role: "Managing Attorney, Rodriguez Law",
  },
  {
    quote: "The AI verification catches errors before submission. Incredible.",
    author: "Jennifer Park",
    role: "Senior Partner, Park Legal Group",
  },
];

const stats = [
  { value: "500+", label: "Legal professionals" },
  { value: "10k+", label: "Documents collected" },
  { value: "70%", label: "Time saved" },
];

export default function SocialProof() {
  return (
    <section className="bg-[#000000] py-40 md:py-48">
      <div className="mx-auto max-w-[1200px] px-6">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          className="mb-24 flex flex-col items-center justify-center divide-y divide-gray-800 md:flex-row md:divide-x md:divide-y-0"
        >
          {stats.map((stat, index) => (
            <div key={index} className="px-12 py-8 text-center md:py-0">
              <div className="mb-3 font-serif text-[clamp(3rem,8vw,5rem)] leading-none tracking-tight text-white">
                {stat.value}
              </div>
              <div className="text-sm text-white/70">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.33, 1, 0.68, 1],
              }}
              className="rounded-xl border border-white/10 bg-white/5 p-8"
            >
              <p className="mb-6 leading-[1.7] text-white">
                &ldquo;{testimonial.quote}&rdquo;
              </p>
              <div className="border-t border-white/10 pt-4">
                <div className="font-medium text-white">
                  {testimonial.author}
                </div>
                <div className="text-sm text-white/70">
                  {testimonial.role}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
