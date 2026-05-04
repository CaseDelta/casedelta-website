"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { setLinkedInUserData } from "@/lib/linkedin";

const FONT = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
const ACCENT = "#2563EB";
const BORDER = "#EDEDED";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export function ContactModal({ open, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({ name: "", email: "", firmSize: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to send");
      setLinkedInUserData(formData.email);
      setIsSubmitted(true);
    } catch (err) {
      alert(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setFormData({ name: "", email: "", firmSize: "", message: "" });
      setIsSubmitted(false);
    }, 300);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    fontSize: 14,
    fontFamily: FONT,
    color: "#333",
    backgroundColor: "#FAFAFA",
    border: `1px solid ${BORDER}`,
    borderRadius: 6,
    outline: "none",
    transition: "border-color 0.2s",
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleClose}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "rgba(0,0,0,0.4)",
            padding: 24,
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#FFF",
              borderRadius: 12,
              width: "100%",
              maxWidth: 440,
              padding: 32,
              boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
              position: "relative",
            }}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              style={{
                position: "absolute",
                top: 16,
                right: 16,
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 4,
                color: "#999",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {isSubmitted ? (
              <div style={{ textAlign: "center", padding: "24px 0" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%", backgroundColor: ACCENT,
                  margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#FFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 style={{ fontFamily: FONT, fontSize: 20, fontWeight: 600, color: "#0A0A0A", marginBottom: 8 }}>
                  We&apos;ll be in touch soon
                </h3>
                <p style={{ fontFamily: FONT, fontSize: 14, color: "#888", lineHeight: 1.5 }}>
                  Expect to hear from us within one business day.
                </p>
              </div>
            ) : (
              <>
                <h3 style={{ fontFamily: FONT, fontSize: 20, fontWeight: 600, color: "#0A0A0A", marginBottom: 4 }}>
                  Get enterprise pricing
                </h3>
                <p style={{ fontFamily: FONT, fontSize: 14, color: "#888", marginBottom: 24 }}>
                  We&apos;ll reach out with a custom quote for your firm.
                </p>

                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <input
                    name="name"
                    required
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#CCC"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = BORDER; }}
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="you@lawfirm.com"
                    value={formData.email}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#CCC"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = BORDER; }}
                  />
                  <input
                    name="firmSize"
                    required
                    placeholder="Number of attorneys (e.g. 15)"
                    value={formData.firmSize}
                    onChange={handleChange}
                    style={inputStyle}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#CCC"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = BORDER; }}
                  />
                  <textarea
                    name="message"
                    placeholder="Anything else? (optional)"
                    value={formData.message}
                    onChange={handleChange}
                    rows={3}
                    style={{ ...inputStyle, resize: "vertical" }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = "#CCC"; }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = BORDER; }}
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: "100%",
                      height: 44,
                      fontFamily: FONT,
                      fontSize: 14,
                      fontWeight: 500,
                      color: "#FFF",
                      backgroundColor: isSubmitting ? "#93B4F5" : ACCENT,
                      border: "none",
                      borderRadius: 6,
                      cursor: isSubmitting ? "not-allowed" : "pointer",
                      transition: "background-color 0.2s",
                    }}
                  >
                    {isSubmitting ? "Sending..." : "Submit"}
                  </button>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
