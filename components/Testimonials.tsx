"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

interface Testimonial {
  quote: string;
  author: string;
  title: string;
  company: string;
  imagePath: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "What used to take us 2-3 weeks of follow-up for our paralegals now happens in a few days. I appreciate being able to audit AI emails, and automatically store files in Dropbox.",
    author: "Jason Havencroft",
    title: "Managing Partner",
    company: "Havencroft & Associates",
    imagePath: "/images/testimonial.jpg",
  },
];

function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
      className="relative overflow-hidden"
      style={{
        minHeight: "85vh",
      }}
    >
      {/* Background Image */}
      <Image
        src={testimonial.imagePath}
        alt={testimonial.author}
        fill
        className="object-cover"
        sizes="100vw"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-12 lg:p-16 max-w-7xl mx-auto" style={{ minHeight: "85vh" }}>
        {/* Company Name at Top */}
        <div
          style={{
            fontSize: "var(--font-size-h3)",
            fontWeight: "var(--font-weight-semibold)",
            color: "#ffffff",
            letterSpacing: "0.05em",
          }}
        >
          {testimonial.company.toUpperCase()}
        </div>

        {/* Quote and Attribution at Bottom */}
        <div>
          <blockquote
            className="mb-8"
            style={{
              fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
              lineHeight: "1.3",
              color: "#ffffff",
              fontWeight: "var(--font-weight-regular)",
            }}
          >
            "{testimonial.quote}"
          </blockquote>

          <div style={{ color: "rgba(255, 255, 255, 0.9)" }}>
            <div
              style={{
                fontSize: "var(--font-size-base)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              {testimonial.author}, {testimonial.title}, {testimonial.company}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="section"
      style={{
        backgroundColor: "var(--color-surface)",
        padding: "0",
      }}
    >
      {testimonials.map((testimonial, index) => (
        <TestimonialCard key={index} testimonial={testimonial} index={index} />
      ))}
    </section>
  );
}
