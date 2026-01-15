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
                  let theme = 'light';

                  // Determine theme based on route
                  if (pathname.startsWith('/dark/')) {
                    theme = 'dark';
                  } else if (pathname.startsWith('/light/')) {
                    theme = 'light';
                  } else if (pathname === '/') {
                    theme = 'dark';
                  } else {
                    // For non-variant pages, check localStorage or default to light
                    theme = localStorage.getItem('casedelta-theme') || 'light';
                  }

                  // Set theme attribute immediately
                  document.documentElement.setAttribute('data-theme', theme);
                } catch (e) {
                  // Fallback to light theme if any error occurs
                  document.documentElement.setAttribute('data-theme', 'light');
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
