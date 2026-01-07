"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function GetInfoPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send message');
      }

      console.log("Email sent successfully:", data);
      setIsSubmitted(true);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(error instanceof Error ? error.message : 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (isSubmitted) {
    return (
      <main
        className="min-h-screen flex items-center justify-center"
        style={{
          backgroundColor: "#FAFAFA",
          padding: "var(--spacing-6)",
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
          className="max-w-lg w-full text-center"
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E5E5",
            borderRadius: "12px",
            padding: "var(--spacing-12)",
          }}
        >
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              backgroundColor: "#000000",
              margin: "0 auto var(--spacing-6)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#FFFFFF"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h1
            style={{
              fontSize: "32px",
              fontWeight: "var(--font-weight-semibold)",
              letterSpacing: "var(--letter-spacing-tight)",
              color: "#000000",
              marginBottom: "var(--spacing-4)",
            }}
          >
            Thanks for your interest
          </h1>

          <p
            style={{
              fontSize: "18px",
              color: "#666666",
              lineHeight: "1.6",
              marginBottom: "var(--spacing-8)",
            }}
          >
            We'll be in touch shortly to show you how CaseDelta can transform
            your document collection workflow.
          </p>

          <Link
            href="/"
            style={{
              display: "inline-block",
              padding: "12px 24px",
              backgroundColor: "#000000",
              color: "#FFFFFF",
              fontSize: "var(--font-size-base)",
              fontWeight: "var(--font-weight-medium)",
              borderRadius: "8px",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#333333";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#000000";
            }}
          >
            Back to Home
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundColor: "#FAFAFA",
        padding: "var(--spacing-6)",
      }}
    >
      <div className="w-full max-w-6xl grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side - Copy */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        >
          <Link
            href="/"
            style={{
              fontSize: "var(--font-size-small)",
              color: "#666666",
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              marginBottom: "var(--spacing-8)",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "#000000";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "#666666";
            }}
          >
            ← Back to Home
          </Link>

          <h1
            className="mb-6"
            style={{
              fontSize: "clamp(40px, 5vw, 56px)",
              fontWeight: "var(--font-weight-semibold)",
              letterSpacing: "var(--letter-spacing-tight)",
              color: "#000000",
              lineHeight: "1.1",
              fontFamily: "var(--font-family-serif)",
            }}
          >
            Get documents from clients without the follow-up headache
          </h1>

          <p
            className="mb-8"
            style={{
              fontSize: "20px",
              color: "#666666",
              lineHeight: "1.6",
            }}
          >
            CaseDelta uses AI to collect, verify, and organize client documents
            automatically. See how leading legal professionals are saving 70% of
            their time.
          </p>

          <div
            style={{
              fontSize: "var(--font-size-small)",
              color: "#999999",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              marginBottom: "var(--spacing-4)",
            }}
          >
            Trusted by legal professionals
          </div>

          <div className="flex items-center gap-8 opacity-50">
            <div style={{ color: "#666666", fontSize: "14px" }}>
              500+ Attorneys
            </div>
            <div style={{ color: "#666666", fontSize: "14px" }}>
              10k+ Documents
            </div>
          </div>
        </motion.div>

        {/* Right Side - Form */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
          style={{
            backgroundColor: "#FFFFFF",
            border: "1px solid #E5E5E5",
            borderRadius: "12px",
            padding: "var(--spacing-10)",
          }}
        >
          <h2
            className="mb-2"
            style={{
              fontSize: "24px",
              fontWeight: "var(--font-weight-semibold)",
              color: "#000000",
              letterSpacing: "var(--letter-spacing-tight)",
            }}
          >
            Get Started
          </h2>

          <p
            className="mb-8"
            style={{
              fontSize: "var(--font-size-base)",
              color: "#666666",
            }}
          >
            Tell us a bit about yourself and we'll show you how CaseDelta works.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="name"
                style={{
                  display: "block",
                  fontSize: "var(--font-size-base)",
                  fontWeight: "var(--font-weight-medium)",
                  color: "#000000",
                  marginBottom: "var(--spacing-2)",
                }}
              >
                Name *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: "var(--font-size-base)",
                  color: "#000000",
                  backgroundColor: "#FAFAFA",
                  border: "1px solid #E5E5E5",
                  borderRadius: "8px",
                  outline: "none",
                  transition: "all 0.2s ease",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#000000";
                  e.currentTarget.style.backgroundColor = "#FFFFFF";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#E5E5E5";
                  e.currentTarget.style.backgroundColor = "#FAFAFA";
                }}
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  fontSize: "var(--font-size-base)",
                  fontWeight: "var(--font-weight-medium)",
                  color: "#000000",
                  marginBottom: "var(--spacing-2)",
                }}
              >
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="you@lawfirm.com"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: "var(--font-size-base)",
                  color: "#000000",
                  backgroundColor: "#FAFAFA",
                  border: "1px solid #E5E5E5",
                  borderRadius: "8px",
                  outline: "none",
                  transition: "all 0.2s ease",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#000000";
                  e.currentTarget.style.backgroundColor = "#FFFFFF";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#E5E5E5";
                  e.currentTarget.style.backgroundColor = "#FAFAFA";
                }}
              />
            </div>

            <div className="mb-8">
              <label
                htmlFor="company"
                style={{
                  display: "block",
                  fontSize: "var(--font-size-base)",
                  fontWeight: "var(--font-weight-medium)",
                  color: "#000000",
                  marginBottom: "var(--spacing-2)",
                }}
              >
                Law Firm{" "}
                <span style={{ color: "#999999", fontWeight: "normal" }}>
                  (optional)
                </span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your law firm name"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  fontSize: "var(--font-size-base)",
                  color: "#000000",
                  backgroundColor: "#FAFAFA",
                  border: "1px solid #E5E5E5",
                  borderRadius: "8px",
                  outline: "none",
                  transition: "all 0.2s ease",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "#000000";
                  e.currentTarget.style.backgroundColor = "#FFFFFF";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "#E5E5E5";
                  e.currentTarget.style.backgroundColor = "#FAFAFA";
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: "100%",
                padding: "14px 24px",
                fontSize: "var(--font-size-base)",
                fontWeight: "var(--font-weight-medium)",
                color: "#FFFFFF",
                backgroundColor: isSubmitting ? "#666666" : "#000000",
                border: "none",
                borderRadius: "8px",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.backgroundColor = "#333333";
                }
              }}
              onMouseLeave={(e) => {
                if (!isSubmitting) {
                  e.currentTarget.style.backgroundColor = "#000000";
                }
              }}
            >
              {isSubmitting ? "Submitting..." : "Get Info"}
            </button>

            <p
              className="mt-4 text-center"
              style={{
                fontSize: "var(--font-size-small)",
                color: "#999999",
                lineHeight: "1.5",
              }}
            >
              By submitting, you agree to our{" "}
              <Link
                href="/terms"
                style={{ color: "#666666", textDecoration: "underline" }}
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                style={{ color: "#666666", textDecoration: "underline" }}
              >
                Privacy Policy
              </Link>
              .
            </p>
          </form>
        </motion.div>
      </div>
    </main>
  );
}
