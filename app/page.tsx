"use client";

import { motion } from "framer-motion";

export default function Home() {
  // Get current date dynamically
  const getCurrentDate = () => {
    const now = new Date();
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'];

    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const dayNumber = now.getDate();

    // Add ordinal suffix (1st, 2nd, 3rd, 4th, etc.)
    const getOrdinalSuffix = (day: number) => {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };

    return `${dayName}, ${monthName} ${dayNumber}${getOrdinalSuffix(dayNumber)}`;
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundColor: "#000000",
        padding: "var(--spacing-6)",
      }}
    >
      <motion.div
        className="max-w-2xl w-full text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            fontSize: "var(--font-size-small)",
            color: "#666666",
            marginBottom: "var(--spacing-8)",
            letterSpacing: "0.05em",
            textTransform: "uppercase",
          }}
        >
          {getCurrentDate()}
        </motion.div>

        <motion.h1
          className="mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          style={{
            fontSize: "48px",
            fontWeight: "var(--font-weight-semibold)",
            letterSpacing: "var(--letter-spacing-tight)",
            color: "#FFFFFF",
            lineHeight: "1.2",
          }}
        >
          We&apos;re Improving Our Website
        </motion.h1>

        <motion.p
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          style={{
            fontSize: "20px",
            color: "#A0A0A0",
            lineHeight: "1.6",
            maxWidth: "560px",
            margin: "0 auto",
          }}
        >
          CaseDelta is enhancing our platform to better serve legal
          professionals. We&apos;ll be back shortly with an improved experience.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{
            fontSize: "var(--font-size-small)",
            color: "#666666",
            marginTop: "var(--spacing-12)",
          }}
        >
          For inquiries, please contact us at{" "}
          <a
            href="mailto:contact@casedelta.com"
            style={{
              color: "#FFFFFF",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              transition: "opacity 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = "0.7";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = "1";
            }}
          >
            contact@casedelta.com
          </a>
        </motion.div>
      </motion.div>
    </main>
  );
}
