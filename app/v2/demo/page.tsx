import type { Metadata } from "next";
import { DemoPage } from "@/components/v2/sasonix/DemoPage";

/**
 * /v2/demo: Book a demo page (first secondary page of the /v2 redesign). Shares the
 * /v2 layout (fonts) and the Sasonix primitive kit. Not indexed while /v2 is a preview.
 */
export const metadata: Metadata = {
  // Root layout applies the "%s | CaseDelta" title template, so just the page name here.
  title: "Book a demo",
  description: "See Delta on your firm's real cases. Book a 15 minute live walkthrough.",
  robots: { index: false, follow: false },
};

export default function V2DemoPage() {
  return <DemoPage />;
}
