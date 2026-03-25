import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CaseDelta — Your AI Associate Attorney",
  description:
    "Delta analyzes thousands of records and builds chronologies, anomaly reports, and case briefs. The only legal AI that remembers your firm.",
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

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
