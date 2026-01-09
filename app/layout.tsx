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
