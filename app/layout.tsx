import type { Metadata } from "next";
import "./globals.css";
import { PostHogProvider } from "./providers/PostHogProvider";
import { PageTransition } from "@/components/transitions/PageTransition";
import { ConditionalLayout } from "@/components/ConditionalLayout";
import { RoutePreloader } from "@/components/RoutePreloader";
import { HERO_CONTENT } from "@/lib/constants/hero";

export const metadata: Metadata = {
  title: "CaseDelta | Legal Document Collection Made Simple",
  description: HERO_CONTENT.metaDescription,
  icons: {
    icon: [
      {
        url: "/favicon-light.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-dark.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Blocking script to prevent FOUC (Flash of Unstyled Content) */}
        {/* This sets the theme BEFORE first paint, eliminating theme flashing */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  const pathname = window.location.pathname;
                  let theme = 'dark'; // Default to dark for consistent experience

                  // Explicit light theme for specific variant paths
                  if (pathname.startsWith('/light/')) {
                    theme = 'light';
                  }
                  // Explicit dark theme for dark variant paths
                  else if (pathname.startsWith('/dark/') || pathname === '/') {
                    theme = 'dark';
                  }
                  // All other pages default to dark (consistent with homepage)
                  // Examples: /about, /ai-policy, /pricing, /terms, /privacy, /sms-opt-in
                  else {
                    theme = 'dark';
                  }

                  // Set theme attribute immediately (before first paint)
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {
                  // Fallback to dark theme if any error occurs
                  document.documentElement.setAttribute('data-theme', 'dark');
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <PostHogProvider>
          <RoutePreloader />
          <ConditionalLayout>
            <PageTransition>
              {children}
            </PageTransition>
          </ConditionalLayout>
        </PostHogProvider>
      </body>
    </html>
  );
}
