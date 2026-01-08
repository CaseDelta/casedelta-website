"use client";

import { PageWrapper } from "@/components/PageWrapper";
import { useState } from "react";

export default function SmsOptInPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    consent: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API request with 1.8 second delay
    await new Promise((resolve) => setTimeout(resolve, 1800));

    setIsLoading(false);
    setIsSubmitted(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const isFormValid =
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    formData.phone.trim() !== "" &&
    formData.consent;

  if (isSubmitted) {
    return (
      <PageWrapper theme="light">
        <main className="pt-20">
          <div className="container max-w-2xl mx-auto px-6 py-16 md:py-24">
            <div className="text-center">
              {/* Success Icon */}
              <div
                className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{
                  backgroundColor: "var(--color-success)",
                }}
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <h1
                className="mb-4"
                style={{
                  fontFamily: "Harvey Serif, Georgia, serif",
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  lineHeight: "var(--line-height-tight)",
                  letterSpacing: "var(--letter-spacing-tight)",
                  color: "var(--color-text-high-contrast)",
                }}
              >
                You&apos;re All Set!
              </h1>

              <p
                className="mb-8"
                style={{
                  fontSize: "var(--font-size-large)",
                  lineHeight: "var(--line-height-relaxed)",
                  color: "var(--color-text-secondary)",
                }}
              >
                Thank you for subscribing to CaseDelta text notifications. You&apos;ll receive important updates about your document requests.
              </p>

              <div
                className="p-6 rounded-lg mb-8"
                style={{
                  backgroundColor: "var(--color-surface-secondary)",
                }}
              >
                <p
                  style={{
                    fontSize: "var(--font-size-base)",
                    lineHeight: "var(--line-height-relaxed)",
                    color: "var(--color-text-primary)",
                    marginBottom: "0.5rem",
                  }}
                >
                  <strong>Quick Reminder:</strong>
                </p>
                <p
                  style={{
                    fontSize: "var(--font-size-base)",
                    lineHeight: "var(--line-height-relaxed)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  Reply <strong>STOP</strong> to unsubscribe at any time.
                  <br />
                  Reply <strong>HELP</strong> for assistance.
                </p>
              </div>

              <button
                onClick={() => setIsSubmitted(false)}
                className="px-6 py-3 rounded-lg transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: "var(--color-button-primary)",
                  color: "var(--color-button-primary-text)",
                  fontSize: "var(--font-size-base)",
                  fontWeight: "var(--font-weight-medium)",
                }}
              >
                Submit Another
              </button>
            </div>
          </div>
        </main>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper theme="light">
      <main className="pt-20">
        <div className="container max-w-2xl mx-auto px-6 py-16 md:py-24">
          {/* Header */}
          <header className="mb-12 text-center">
            <h1
              className="mb-4"
              style={{
                fontFamily: "Harvey Serif, Georgia, serif",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                lineHeight: "var(--line-height-tight)",
                letterSpacing: "var(--letter-spacing-tight)",
                color: "var(--color-text-high-contrast)",
              }}
            >
              Get Text Updates
            </h1>
            <p
              style={{
                fontSize: "var(--font-size-large)",
                lineHeight: "var(--line-height-relaxed)",
                color: "var(--color-text-secondary)",
              }}
            >
              Stay informed about your document requests with text notifications
            </p>
          </header>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div
              className="p-8 rounded-lg mb-8"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              {/* First Name */}
              <div className="mb-6">
                <label
                  htmlFor="firstName"
                  className="block mb-2"
                  style={{
                    fontSize: "var(--font-size-base)",
                    fontWeight: "var(--font-weight-medium)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  First Name <span style={{ color: "var(--color-error)" }}>*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border transition-all"
                  style={{
                    fontSize: "var(--font-size-base)",
                    backgroundColor: "var(--color-background)",
                    borderColor: "var(--color-border)",
                    color: "var(--color-text-primary)",
                  }}
                  placeholder="John"
                />
              </div>

              {/* Last Name */}
              <div className="mb-6">
                <label
                  htmlFor="lastName"
                  className="block mb-2"
                  style={{
                    fontSize: "var(--font-size-base)",
                    fontWeight: "var(--font-weight-medium)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  Last Name <span style={{ color: "var(--color-error)" }}>*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border transition-all"
                  style={{
                    fontSize: "var(--font-size-base)",
                    backgroundColor: "var(--color-background)",
                    borderColor: "var(--color-border)",
                    color: "var(--color-text-primary)",
                  }}
                  placeholder="Doe"
                />
              </div>

              {/* Phone Number */}
              <div className="mb-6">
                <label
                  htmlFor="phone"
                  className="block mb-2"
                  style={{
                    fontSize: "var(--font-size-base)",
                    fontWeight: "var(--font-weight-medium)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  Mobile Phone Number <span style={{ color: "var(--color-error)" }}>*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border transition-all"
                  style={{
                    fontSize: "var(--font-size-base)",
                    backgroundColor: "var(--color-background)",
                    borderColor: "var(--color-border)",
                    color: "var(--color-text-primary)",
                  }}
                  placeholder="(555) 123-4567"
                />
              </div>

              {/* Email (Optional) */}
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block mb-2"
                  style={{
                    fontSize: "var(--font-size-base)",
                    fontWeight: "var(--font-weight-medium)",
                    color: "var(--color-text-primary)",
                  }}
                >
                  Email <span style={{ color: "var(--color-text-tertiary)" }}>(Optional)</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border transition-all"
                  style={{
                    fontSize: "var(--font-size-base)",
                    backgroundColor: "var(--color-background)",
                    borderColor: "var(--color-border)",
                    color: "var(--color-text-primary)",
                  }}
                  placeholder="john.doe@example.com"
                />
              </div>

              {/* Consent Checkbox */}
              <div className="mb-6">
                <label
                  className="flex items-start gap-3 cursor-pointer"
                  htmlFor="consent"
                >
                  <input
                    type="checkbox"
                    id="consent"
                    name="consent"
                    checked={formData.consent}
                    onChange={handleChange}
                    required
                    className="mt-1 w-5 h-5 cursor-pointer"
                    style={{
                      accentColor: "var(--color-button-primary)",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "var(--font-size-base)",
                      lineHeight: "var(--line-height-relaxed)",
                      color: "var(--color-text-primary)",
                    }}
                  >
                    I consent to receive automated text messages from CaseDelta regarding my document requests and case updates. Message frequency varies. Message and data rates may apply. Reply STOP to opt out at any time or HELP for help. By checking this box, I agree to the{" "}
                    <a
                      href="/terms"
                      style={{
                        color: "var(--color-text-high-contrast)",
                        textDecoration: "underline",
                        textUnderlineOffset: "2px",
                      }}
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="/privacy"
                      style={{
                        color: "var(--color-text-high-contrast)",
                        textDecoration: "underline",
                        textUnderlineOffset: "2px",
                      }}
                    >
                      Privacy Policy
                    </a>
                    . <span style={{ color: "var(--color-error)" }}>*</span>
                  </span>
                </label>
              </div>
            </div>

            {/* 10DLC Compliance Disclosure */}
            <div
              className="p-6 rounded-lg mb-8"
              style={{
                backgroundColor: "var(--color-surface-secondary)",
              }}
            >
              <p
                className="mb-3"
                style={{
                  fontSize: "var(--font-size-small)",
                  lineHeight: "var(--line-height-relaxed)",
                  color: "var(--color-text-secondary)",
                }}
              >
                <strong style={{ color: "var(--color-text-primary)" }}>
                  Text Messaging Disclosure:
                </strong>
              </p>
              <ul className="space-y-2">
                <li
                  style={{
                    fontSize: "var(--font-size-small)",
                    lineHeight: "var(--line-height-relaxed)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  • You will receive text notifications about document requests, reminders, and case status updates
                </li>
                <li
                  style={{
                    fontSize: "var(--font-size-small)",
                    lineHeight: "var(--line-height-relaxed)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  • Message frequency may vary based on your case activity
                </li>
                <li
                  style={{
                    fontSize: "var(--font-size-small)",
                    lineHeight: "var(--line-height-relaxed)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  • Message and data rates may apply depending on your mobile carrier
                </li>
                <li
                  style={{
                    fontSize: "var(--font-size-small)",
                    lineHeight: "var(--line-height-relaxed)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  • Reply <strong>STOP</strong> to unsubscribe at any time
                </li>
                <li
                  style={{
                    fontSize: "var(--font-size-small)",
                    lineHeight: "var(--line-height-relaxed)",
                    color: "var(--color-text-secondary)",
                  }}
                >
                  • Reply <strong>HELP</strong> for assistance or contact{" "}
                  <a
                    href="mailto:support@casedelta.com"
                    style={{
                      color: "var(--color-text-primary)",
                      textDecoration: "underline",
                      textUnderlineOffset: "2px",
                    }}
                  >
                    support@casedelta.com
                  </a>
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="w-full px-6 py-4 rounded-lg transition-all flex items-center justify-center gap-3"
              style={{
                backgroundColor: isFormValid && !isLoading
                  ? "var(--color-button-primary)"
                  : "var(--color-surface-tertiary)",
                color: isFormValid && !isLoading
                  ? "var(--color-button-primary-text)"
                  : "var(--color-text-tertiary)",
                fontSize: "var(--font-size-base)",
                fontWeight: "var(--font-weight-medium)",
                cursor: isFormValid && !isLoading ? "pointer" : "not-allowed",
                opacity: isFormValid && !isLoading ? 1 : 0.6,
              }}
            >
              {isLoading && (
                <svg
                  className="animate-spin"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                </svg>
              )}
              {isLoading ? "Subscribing..." : "Subscribe to Text Updates"}
            </button>

            <p
              className="mt-4 text-center"
              style={{
                fontSize: "var(--font-size-small)",
                color: "var(--color-text-tertiary)",
              }}
            >
              Your information is secure and will never be shared with third parties
            </p>
          </form>
        </div>
      </main>
    </PageWrapper>
  );
}
