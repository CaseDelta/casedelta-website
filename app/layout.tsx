import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PostHogProvider } from "./providers/PostHogProvider";
import { ClientLayout } from "@/components/ClientLayout";
import { OrganizationSchema, WebAppSchema } from "@/components/JsonLd";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://casedelta.com"),
  title: {
    default: "CaseDelta — The AI Associate That Learns Your Firm",
    template: "%s | CaseDelta",
  },
  description:
    "Delta learns how your law firm works — your cases, your judges, your opposing counsel — and gets smarter every day. The only legal AI with persistent memory and network intelligence.",
  keywords: [
    "legal AI",
    "AI for law firms",
    "AI associate attorney",
    "legal technology",
    "institutional knowledge law firm",
    "AI document analysis legal",
    "law firm AI assistant",
    "Clio AI integration",
    "legal AI that learns",
    "law firm automation",
  ],
  authors: [{ name: "CaseDelta", url: "https://casedelta.com" }],
  creator: "CaseDelta",
  publisher: "CaseDelta",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-light.png", media: "(prefers-color-scheme: light)" },
      { url: "/favicon-dark.png", media: "(prefers-color-scheme: dark)" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://casedelta.com",
    siteName: "CaseDelta",
    title: "CaseDelta — The AI Associate That Learns Your Firm",
    description:
      "Delta learns how your law firm works — your cases, your judges, your opposing counsel — and gets smarter every day. The only legal AI with persistent memory and network intelligence.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CaseDelta — The AI Associate That Learns Your Firm",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CaseDelta — The AI Associate That Learns Your Firm",
    description:
      "Delta learns your firm — your cases, your judges, your opposing counsel. The only legal AI that remembers.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://casedelta.com",
  },
  verification: {
    // Replace with actual Google Search Console verification code
    // google: "your-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" className={inter.variable} suppressHydrationWarning>
      <head>
        <OrganizationSchema />
        <WebAppSchema />
      </head>
      <body>
        <PostHogProvider>
          <ClientLayout>{children}</ClientLayout>
        </PostHogProvider>
      </body>
    </html>
  );
}
