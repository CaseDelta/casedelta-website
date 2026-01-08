import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";
import { PostHogProvider } from "./providers/PostHogProvider";
import { PageTransition } from "@/components/transitions/PageTransition";
import { ConditionalLayout } from "@/components/ConditionalLayout";
import { RoutePreloader } from "@/components/RoutePreloader";

export const metadata: Metadata = {
  title: "CaseDelta | Legal Document Collection Made Simple",
  description: "AI-powered document collection platform for legal professionals. Get documents from clients faster with automated reminders and intelligent verification.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-light.png"
          id="favicon-light"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          type="image/png"
          href="/favicon-dark.png"
          id="favicon-dark"
          media="(prefers-color-scheme: dark)"
        />
        <Script id="favicon-switcher" strategy="beforeInteractive">
          {`
            (function() {
              const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
              const updateFavicon = () => {
                const isDark = darkModeMediaQuery.matches;
                const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
                link.type = 'image/png';
                link.rel = 'icon';
                link.href = isDark ? '/favicon-dark.png' : '/favicon-light.png';
                document.head.appendChild(link);
              };
              updateFavicon();
              darkModeMediaQuery.addEventListener('change', updateFavicon);
            })();
          `}
        </Script>
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
