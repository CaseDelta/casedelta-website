import type { Metadata } from "next";
import "./globals.css";
import { PostHogProvider } from "./providers/PostHogProvider";
import { ClientLayout } from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "CaseDelta — Your AI Associate Attorney",
  description:
    "Delta analyzes thousands of records and builds chronologies, anomaly reports, and case briefs. The only legal AI that remembers your firm.",
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
  openGraph: {
    title: "CaseDelta — Your AI Associate Attorney",
    description:
      "Delta analyzes thousands of records and builds chronologies, anomaly reports, and case briefs. The only legal AI that remembers your firm.",
    siteName: "CaseDelta",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CaseDelta — Your AI Associate Attorney",
    description:
      "Delta analyzes thousands of records and builds chronologies, anomaly reports, and case briefs. The only legal AI that remembers your firm.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <PostHogProvider>
          <ClientLayout>{children}</ClientLayout>
        </PostHogProvider>
      </body>
    </html>
  );
}
