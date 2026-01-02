export default function Home() {
  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundColor: "#000000",
        padding: "var(--spacing-6)",
      }}
    >
      <div className="max-w-2xl w-full text-center">
        <h1
          className="mb-6"
          style={{
            fontSize: "48px",
            fontWeight: "var(--font-weight-semibold)",
            letterSpacing: "var(--letter-spacing-tight)",
            color: "#FFFFFF",
            lineHeight: "1.2",
          }}
        >
          We&apos;re Improving Our Website
        </h1>
        <p
          className="mb-8"
          style={{
            fontSize: "20px",
            color: "#A0A0A0",
            lineHeight: "1.6",
            maxWidth: "560px",
            margin: "0 auto",
          }}
        >
          CaseDelta is enhancing our platform to better serve legal professionals.
          We&apos;ll be back shortly with an improved experience.
        </p>
        <div
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
            }}
          >
            contact@casedelta.com
          </a>
        </div>
      </div>
    </main>
  );
}
