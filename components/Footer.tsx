export function Footer() {
  return (
    <footer
      className="py-16 border-t"
      style={{
        backgroundColor: "var(--color-surface)",
        borderColor: "var(--color-border)",
      }}
    >
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-12">
          {/* Product */}
          <div>
            <h3
              className="mb-4 uppercase tracking-wider"
              style={{
                fontSize: "var(--font-size-small)",
                color: "var(--color-text-tertiary)",
                fontWeight: "var(--font-weight-medium)",
                letterSpacing: "0.1em",
              }}
            >
              Product
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/#features"
                  style={{
                    fontSize: "var(--font-size-base)",
                    color: "var(--color-text-primary)",
                    textDecoration: "none",
                  }}
                  className="hover:opacity-70 transition-opacity"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="/#pricing"
                  style={{
                    fontSize: "var(--font-size-base)",
                    color: "var(--color-text-primary)",
                    textDecoration: "none",
                  }}
                  className="hover:opacity-70 transition-opacity"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="/#security"
                  style={{
                    fontSize: "var(--font-size-base)",
                    color: "var(--color-text-primary)",
                    textDecoration: "none",
                  }}
                  className="hover:opacity-70 transition-opacity"
                >
                  Security
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3
              className="mb-4 uppercase tracking-wider"
              style={{
                fontSize: "var(--font-size-small)",
                color: "var(--color-text-tertiary)",
                fontWeight: "var(--font-weight-medium)",
                letterSpacing: "0.1em",
              }}
            >
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/about"
                  style={{
                    fontSize: "var(--font-size-base)",
                    color: "var(--color-text-primary)",
                    textDecoration: "none",
                  }}
                  className="hover:opacity-70 transition-opacity"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/careers"
                  style={{
                    fontSize: "var(--font-size-base)",
                    color: "var(--color-text-primary)",
                    textDecoration: "none",
                  }}
                  className="hover:opacity-70 transition-opacity"
                >
                  Careers
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3
              className="mb-4 uppercase tracking-wider"
              style={{
                fontSize: "var(--font-size-small)",
                color: "var(--color-text-tertiary)",
                fontWeight: "var(--font-weight-medium)",
                letterSpacing: "0.1em",
              }}
            >
              Legal
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="/terms"
                  style={{
                    fontSize: "var(--font-size-base)",
                    color: "var(--color-text-primary)",
                    textDecoration: "none",
                  }}
                  className="hover:opacity-70 transition-opacity"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  style={{
                    fontSize: "var(--font-size-base)",
                    color: "var(--color-text-primary)",
                    textDecoration: "none",
                  }}
                  className="hover:opacity-70 transition-opacity"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3
              className="mb-4 uppercase tracking-wider"
              style={{
                fontSize: "var(--font-size-small)",
                color: "var(--color-text-tertiary)",
                fontWeight: "var(--font-weight-medium)",
                letterSpacing: "0.1em",
              }}
            >
              Contact
            </h3>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:support@casedelta.com"
                  style={{
                    fontSize: "var(--font-size-base)",
                    color: "var(--color-text-primary)",
                    textDecoration: "none",
                  }}
                  className="hover:opacity-70 transition-opacity"
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  href="mailto:sales@casedelta.com"
                  style={{
                    fontSize: "var(--font-size-base)",
                    color: "var(--color-text-primary)",
                    textDecoration: "none",
                  }}
                  className="hover:opacity-70 transition-opacity"
                >
                  Sales
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="pt-8 border-t text-center"
          style={{ borderColor: "var(--color-border)" }}
        >
          <p
            style={{
              fontSize: "var(--font-size-small)",
              color: "var(--color-text-tertiary)",
            }}
          >
            © 2026 CaseDelta. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
