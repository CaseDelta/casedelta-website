import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://snap.licdn.com https://connect.facebook.net https://us-assets.i.posthog.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https:",
      "media-src 'self' https://reports.casedelta.com",
      "font-src 'self' data:",
      "connect-src 'self' https://px.ads.linkedin.com https://snap.licdn.com https://www.facebook.com https://us.i.posthog.com https://us-assets.i.posthog.com",
      "frame-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  trailingSlash: false,
  experimental: { turbopackFileSystemCacheForDev: false },

  // /setup reads content/rep-setup.html at request time. Without this the file is left out
  // of the deployed function bundle and the route answers 500 in production while working
  // perfectly on a laptop.
  outputFileTracingIncludes: {
    "/setup": ["./content/rep-setup.html"],
  },

  async redirects() {
    return [
      // Old pages that no longer exist — redirect to homepage
      { source: "/download", destination: "/", permanent: true },
      { source: "/contact", destination: "/", permanent: true },
      { source: "/book-a-demo", destination: "/demo", permanent: true },
      { source: "/book-demo", destination: "/demo", permanent: true },

      // The homepage preview route. /v2 was the new homepage while it was being built
      // and is now at /, so old bookmarks land on the real thing. It was robots:noindex
      // for its whole life, so nothing external points at it.
      //
      // EXACT paths only, never "/v2/:path*". The ambient hero photography is served
      // from public/v2/ambient/, and redirects are evaluated BEFORE public files, so a
      // wildcard here would redirect every image on the homepage and blank the hero.
      { source: "/v2", destination: "/", permanent: true },
      // The redesign was built at /concept (noindex) and promoted to / on 2026-09-12.
      { source: "/concept/privacy", destination: "/privacy", permanent: true },
      { source: "/concept/terms", destination: "/terms", permanent: true },
      { source: "/concept", destination: "/", permanent: true },
      { source: "/v2/demo", destination: "/demo", permanent: true },

      // Old A/B testing variant routes
      { source: "/dark", destination: "/", permanent: true },
      { source: "/dark/:path*", destination: "/", permanent: true },
      { source: "/light", destination: "/", permanent: true },
      { source: "/light/:path*", destination: "/", permanent: true },

      // Old hero variant pages
      { source: "/heroes/:path*", destination: "/", permanent: true },

      // The five marketing pages that were folded into the homepage on 2026-09-02.
      //
      // Each one now redirects to the homepage SECTION that carries its argument, so an
      // inbound link, an old sitemap entry or a bookmark still lands on the content it
      // was promised rather than at the top of an unrelated page.
      //
      //   /features   -> #work      the recorded Delta run (homepage promoted 2026-09-12)
      //   /use-cases  -> #work      same section; the practice-area pages argued capability
      //   /compare    -> #work      the new homepage has no comparison table
      //   /security   -> #privacy   Built for confidential work
      //   /pricing    -> #pricing   Pricing
      //
      // A fragment survives a 308: the hash rides in the Location header and the browser
      // applies it after following the redirect. Search engines drop it and consolidate
      // all five into "/", which is the accepted cost of collapsing them.
      //
      // The :slug forms must come FIRST. Next matches redirects in array order, and a bare
      // "/compare" source does not match "/compare/casedelta-vs-clio", so a child left
      // below its parent would simply 404 instead.
      { source: "/features", destination: "/#work", permanent: true },
      { source: "/use-cases/:slug", destination: "/#work", permanent: true },
      { source: "/use-cases", destination: "/#work", permanent: true },
      { source: "/compare/:slug", destination: "/#work", permanent: true },
      { source: "/compare", destination: "/#work", permanent: true },
      { source: "/security", destination: "/#privacy", permanent: true },
      { source: "/pricing", destination: "/#pricing", permanent: true },

      // Old legal page path → current path. The /legal/* paths are also what
      // Google's OAuth consent screen links to for Privacy Policy and Terms of
      // Service, so they must remain valid permanently.
      { source: "/legal/privacy-policy", destination: "/privacy", permanent: true },
      { source: "/legal/terms-of-service", destination: "/terms", permanent: true },

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
      // Rep onboarding. These are internal new-hire pages on a public marketing domain.
      // The routes set the same header themselves; it is repeated here so a refusal, an
      // error page or anything else Next serves on these paths carries it too. robots.ts
      // disallows them as well, they are absent from the sitemap, and nothing links to them.
      {
        source: "/setup",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, nosnippet, noimageindex" }],
      },
      {
        source: "/install.sh",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, nosnippet, noimageindex" }],
      },
      {
        source: "/install.ps1",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, nosnippet, noimageindex" }],
      },
      {
        source: "/outreach-kit.zip",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, nosnippet, noimageindex" }],
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
