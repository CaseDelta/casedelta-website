"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
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

  const handleRoleSelect = (role: string) => {
    setFormData({
      ...formData,
      role,
    });
  };

  if (isSubmitted) {
    return (
      <section
        id="get-started"
        className="section"
        style={{
          backgroundColor: "var(--color-background)",
          padding: "8rem 0",
          scrollMarginTop: "100px",
        }}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
            className="max-w-2xl mx-auto text-center"
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "16px",
              padding: "80px 60px",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                backgroundColor: "var(--color-button-primary)",
                margin: "0 auto 32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--color-button-primary-text)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>

            <h2
              style={{
                fontSize: "32px",
                fontWeight: "var(--font-weight-semibold)",
                letterSpacing: "var(--letter-spacing-tight)",
                color: "var(--color-text-high-contrast)",
                marginBottom: "20px",
              }}
            >
              We'll be in touch soon
            </h2>

            <p
              style={{
                fontSize: "16px",
                color: "var(--color-text-secondary)",
                lineHeight: "1.6",
                maxWidth: "500px",
                margin: "0 auto",
              }}
            >
              Our team will reach out shortly to show you how CaseDelta can transform your document collection workflow.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="get-started"
      className="section"
      style={{
        backgroundColor: "var(--color-background)",
        padding: "8rem 0",
        scrollMarginTop: "100px",
      }}
    >
      <div className="container max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Copy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
          >
            <h2
              className="mb-6"
              style={{
                fontSize: "clamp(40px, 5vw, 56px)",
                fontWeight: "var(--font-weight-semibold)",
                letterSpacing: "var(--letter-spacing-tight)",
                color: "var(--color-text-high-contrast)",
                lineHeight: "1.1",
              }}
            >
              Get documents from clients without the follow-up headache
            </h2>

            <p
              className="mb-8"
              style={{
                fontSize: "20px",
                color: "var(--color-text-secondary)",
                lineHeight: "1.6",
              }}
            >
              CaseDelta uses AI to collect, verify, and organize client documents
              automatically. See how leading legal professionals are saving 70% of
              their time.
            </p>
          </motion.div>

          {/* Right Side - Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
            style={{
              backgroundColor: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              borderRadius: "12px",
              padding: "var(--spacing-10)",
            }}
          >
            <h3
              className="mb-2"
              style={{
                fontSize: "24px",
                fontWeight: "var(--font-weight-semibold)",
                color: "var(--color-text-high-contrast)",
                letterSpacing: "var(--letter-spacing-tight)",
              }}
            >
              Get Started
            </h3>

            <p
              className="mb-8"
              style={{
                fontSize: "var(--font-size-base)",
                color: "var(--color-text-secondary)",
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
                    color: "var(--color-text-high-contrast)",
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
                  placeholder="Your name"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    fontSize: "var(--font-size-base)",
                    color: "var(--color-text-primary)",
                    backgroundColor: "var(--color-background)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                    outline: "none",
                    transition: "all 0.2s ease",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-text-high-contrast)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-border)";
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
                    color: "var(--color-text-high-contrast)",
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
                    color: "var(--color-text-primary)",
                    backgroundColor: "var(--color-background)",
                    border: "1px solid var(--color-border)",
                    borderRadius: "8px",
                    outline: "none",
                    transition: "all 0.2s ease",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-text-high-contrast)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-border)";
                  }}
                />
              </div>

              <div className="mb-8">
                <label
                  style={{
                    display: "block",
                    fontSize: "var(--font-size-base)",
                    fontWeight: "var(--font-weight-medium)",
                    color: "var(--color-text-high-contrast)",
                    marginBottom: "var(--spacing-3)",
                  }}
                >
                  I am a *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { value: "lawyer", label: "Lawyer" },
                    { value: "paralegal", label: "Paralegal" },
                    { value: "manager", label: "Manager" },
                    { value: "developer", label: "Developer" },
                    { value: "other", label: "Other" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => handleRoleSelect(option.value)}
                      disabled={isSubmitting}
                      style={{
                        padding: "10px 12px",
                        fontSize: "var(--font-size-small)",
                        fontWeight: "var(--font-weight-medium)",
                        color: formData.role === option.value
                          ? "var(--color-button-primary-text)"
                          : "var(--color-text-primary)",
                        backgroundColor: formData.role === option.value
                          ? "var(--color-button-primary)"
                          : "var(--color-background)",
                        border: `1px solid ${formData.role === option.value
                          ? "var(--color-button-primary)"
                          : "var(--color-border)"}`,
                        borderRadius: "6px",
                        cursor: isSubmitting ? "not-allowed" : "pointer",
                        transition: "all 0.2s ease",
                        textAlign: "center",
                      }}
                      onMouseEnter={(e) => {
                        if (!isSubmitting && formData.role !== option.value) {
                          e.currentTarget.style.borderColor = "var(--color-text-high-contrast)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (formData.role !== option.value) {
                          e.currentTarget.style.borderColor = "var(--color-border)";
                        }
                      }}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
                {/* Hidden input for form validation */}
                <input
                  type="hidden"
                  name="role"
                  value={formData.role}
                  required
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
                  color: "var(--color-button-primary-text)",
                  backgroundColor: isSubmitting ? "var(--color-text-tertiary)" : "var(--color-button-primary)",
                  border: "none",
                  borderRadius: "8px",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.opacity = "0.9";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSubmitting) {
                    e.currentTarget.style.opacity = "1";
                  }
                }}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>

              <p
                className="mt-4 text-center"
                style={{
                  fontSize: "var(--font-size-small)",
                  color: "var(--color-text-tertiary)",
                  lineHeight: "1.5",
                }}
              >
                By submitting, you agree to our{" "}
                <Link
                  href="/terms"
                  style={{ color: "var(--color-text-secondary)", textDecoration: "underline" }}
                >
                  Terms
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  style={{ color: "var(--color-text-secondary)", textDecoration: "underline" }}
                >
                  Privacy Policy
                </Link>
                .
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
