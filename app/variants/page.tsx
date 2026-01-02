import Link from "next/link";

export default function Home() {
  return (
    <main
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundColor: "var(--color-background)",
        padding: "var(--spacing-6)",
      }}
    >
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1
            className="mb-4"
            style={{
              fontSize: "var(--font-size-hero)",
              fontWeight: "var(--font-weight-semibold)",
              letterSpacing: "var(--letter-spacing-tight)",
              color: "var(--color-text-high-contrast)",
            }}
          >
            CaseDelta Landing Page Variants
          </h1>
          <p
            style={{
              fontSize: "var(--font-size-large)",
              color: "var(--color-text-secondary)",
            }}
          >
            Choose a variant to preview. Each is a standalone page for A/B
            testing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Light + Side */}
          <Link
            href="/light/side"
            className="group p-8 rounded-xl border transition-all hover:scale-105"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-4 h-4 rounded-full bg-white border"
                style={{ borderColor: "var(--color-border)" }}
              />
              <h2
                style={{
                  fontSize: "var(--font-size-h2)",
                  fontWeight: "var(--font-weight-semibold)",
                  color: "var(--color-text-high-contrast)",
                }}
              >
                Light + Side
              </h2>
            </div>
            <p
              style={{
                fontSize: "var(--font-size-body)",
                color: "var(--color-text-secondary)",
              }}
            >
              Light theme with video positioned beside hero text
            </p>
            <div
              className="mt-4 inline-block text-sm px-3 py-1 rounded-md"
              style={{
                backgroundColor: "var(--color-surface-secondary)",
                color: "var(--color-text-secondary)",
                fontSize: "var(--font-size-small)",
              }}
            >
              /light/side
            </div>
          </Link>

          {/* Light + Bottom */}
          <Link
            href="/light/bottom"
            className="group p-8 rounded-xl border transition-all hover:scale-105"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-4 h-4 rounded-full bg-white border"
                style={{ borderColor: "var(--color-border)" }}
              />
              <h2
                style={{
                  fontSize: "var(--font-size-h2)",
                  fontWeight: "var(--font-weight-semibold)",
                  color: "var(--color-text-high-contrast)",
                }}
              >
                Light + Bottom
              </h2>
            </div>
            <p
              style={{
                fontSize: "var(--font-size-body)",
                color: "var(--color-text-secondary)",
              }}
            >
              Light theme with video positioned below hero text
            </p>
            <div
              className="mt-4 inline-block text-sm px-3 py-1 rounded-md"
              style={{
                backgroundColor: "var(--color-surface-secondary)",
                color: "var(--color-text-secondary)",
                fontSize: "var(--font-size-small)",
              }}
            >
              /light/bottom
            </div>
          </Link>

          {/* Light + Fullscreen */}
          <Link
            href="/light/fullscreen"
            className="group p-8 rounded-xl border transition-all hover:scale-105"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-4 h-4 rounded-full bg-white border"
                style={{ borderColor: "var(--color-border)" }}
              />
              <h2
                style={{
                  fontSize: "var(--font-size-h2)",
                  fontWeight: "var(--font-weight-semibold)",
                  color: "var(--color-text-high-contrast)",
                }}
              >
                Light + Fullscreen Video
              </h2>
            </div>
            <p
              style={{
                fontSize: "var(--font-size-body)",
                color: "var(--color-text-secondary)",
              }}
            >
              Light theme with video as full-screen background (Rogo style)
            </p>
            <div
              className="mt-4 inline-block text-sm px-3 py-1 rounded-md"
              style={{
                backgroundColor: "var(--color-surface-secondary)",
                color: "var(--color-text-secondary)",
                fontSize: "var(--font-size-small)",
              }}
            >
              /light/fullscreen
            </div>
          </Link>

          {/* Dark + Side */}
          <Link
            href="/dark/side"
            className="group p-8 rounded-xl border transition-all hover:scale-105"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-4 h-4 rounded-full border"
                style={{
                  backgroundColor: "#181818",
                  borderColor: "var(--color-border)",
                }}
              />
              <h2
                style={{
                  fontSize: "var(--font-size-h2)",
                  fontWeight: "var(--font-weight-semibold)",
                  color: "var(--color-text-high-contrast)",
                }}
              >
                Dark + Side
              </h2>
            </div>
            <p
              style={{
                fontSize: "var(--font-size-body)",
                color: "var(--color-text-secondary)",
              }}
            >
              Dark theme with video positioned beside hero text
            </p>
            <div
              className="mt-4 inline-block text-sm px-3 py-1 rounded-md"
              style={{
                backgroundColor: "var(--color-surface-secondary)",
                color: "var(--color-text-secondary)",
                fontSize: "var(--font-size-small)",
              }}
            >
              /dark/side
            </div>
          </Link>

          {/* Dark + Bottom */}
          <Link
            href="/dark/bottom"
            className="group p-8 rounded-xl border transition-all hover:scale-105"
            style={{
              backgroundColor: "var(--color-surface)",
              borderColor: "var(--color-border)",
            }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-4 h-4 rounded-full border"
                style={{
                  backgroundColor: "#181818",
                  borderColor: "var(--color-border)",
                }}
              />
              <h2
                style={{
                  fontSize: "var(--font-size-h2)",
                  fontWeight: "var(--font-weight-semibold)",
                  color: "var(--color-text-high-contrast)",
                }}
              >
                Dark + Bottom
              </h2>
            </div>
            <p
              style={{
                fontSize: "var(--font-size-body)",
                color: "var(--color-text-secondary)",
              }}
            >
              Dark theme with video positioned below hero text
            </p>
            <div
              className="mt-4 inline-block text-sm px-3 py-1 rounded-md"
              style={{
                backgroundColor: "var(--color-surface-secondary)",
                color: "var(--color-text-secondary)",
                fontSize: "var(--font-size-small)",
              }}
            >
              /dark/bottom
            </div>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <p
            style={{
              fontSize: "var(--font-size-small)",
              color: "var(--color-text-tertiary)",
            }}
          >
            For A/B testing, send traffic directly to variant URLs. This page is
            for internal preview only.
          </p>
        </div>
      </div>
    </main>
  );
}
