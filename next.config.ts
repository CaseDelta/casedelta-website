import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig: NextConfig = {
  trailingSlash: false,

  async redirects() {
    return [
      // Old pages that no longer exist — redirect to homepage
      { source: "/download", destination: "/", permanent: true },
      { source: "/contact", destination: "/", permanent: true },
      { source: "/book-a-demo", destination: "/", permanent: true },

      // Old A/B testing variant routes
      { source: "/dark", destination: "/", permanent: true },
      { source: "/dark/:path*", destination: "/", permanent: true },
      { source: "/light", destination: "/", permanent: true },
      { source: "/light/:path*", destination: "/", permanent: true },

      // Old hero variant pages
      { source: "/heroes/:path*", destination: "/", permanent: true },

      // Old legal page path → current path
      { source: "/legal/privacy-policy", destination: "/privacy", permanent: true },

      // Old blog posts that were removed — redirect to blog index
      { source: "/blog/building-brand-loyalty-through-exceptional-customer-support", destination: "/blog", permanent: true },
      { source: "/blog/common-mistakes-to-avoid-when-launching-a-subscription-platform", destination: "/blog", permanent: true },
      { source: "/blog/tips-for-optimizing-your-platform-s-performance-and-speed", destination: "/blog", permanent: true },
      { source: "/blog/the-art-of-storytelling-and-why-it-matters-for-your-marketing", destination: "/blog", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/assets/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

export default nextConfig;
