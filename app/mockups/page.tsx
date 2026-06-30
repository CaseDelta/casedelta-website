import type { Metadata } from "next";
import { MockupsClient } from "./MockupsClient";

// Private gallery for comparing hero-demo mockups. Not indexed, not linked from the site.
export const metadata: Metadata = {
  title: "Demo mockups (internal)",
  robots: { index: false, follow: false },
};

export default function MockupsPage() {
  return <MockupsClient />;
}
