import { Geist, JetBrains_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";

/**
 * The homepage layout. This is a route GROUP, so "(home)" never appears in a URL: it
 * exists only so the four Sasonix fonts and the hash-landing offset apply to "/" and
 * to nothing else. Every other route keeps the root layout and the older marketing
 * design system (kit.tsx, NavbarV2, FooterV2).
 *
 * Formerly app/v2/layout.tsx. The homepage began as a pixel-exact clone of the Sasonix
 * Framer template rebuilt in clean React, lived at /v2 behind robots:noindex while it
 * was rewritten into a real CaseDelta page, and was promoted over the old homepage on
 * 2026-08-18.
 *
 * Fonts: the four Sasonix uses, all free/OFL, self-hosted via next/font.
 *   Archivo  -> display / headings
 *   Geist    -> body / buttons
 *   JetBrains Mono -> mono eyebrow labels
 *   Inter    -> small UI labels inside the product panels
 *
 * Archivo is self-hosted from the EXACT static masters the template serves (Fontshare
 * cuts: 400=Book, 500=Medium, 700=Bold, in ./fonts/). Google Fonts' Archivo is a
 * variable font whose interpolated 400/700 measurably diverge from Fontshare's static
 * masters (500 matched, 400/700 did not). Geist and JetBrains Mono measured identical
 * (same upstream) so they stay on next/font/google.
 */
const archivo = localFont({
  src: [
    { path: "./fonts/archivo-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/archivo-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/archivo-700.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--sx-archivo",
});
const geist = Geist({ subsets: ["latin"], weight: ["400", "500", "600", "700", "900"], display: "swap", variable: "--sx-geist" });
const jbmono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "700"], display: "swap", variable: "--sx-mono" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap", variable: "--sx-inter" });

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${archivo.variable} ${geist.variable} ${jbmono.variable} ${inter.variable}`}>
      {/* Offset hash landings (e.g. arriving at /#pricing from a secondary page) below the fixed nav. */}
      <style>{`#features,#howitworks,#security,#pricing,#contact{scroll-margin-top:156px}`}</style>
      {children}
    </div>
  );
}
