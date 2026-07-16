import { Geist, JetBrains_Mono, Inter } from "next/font/google";
import localFont from "next/font/local";

/**
 * /v2 = a pixel-exact clone of the Sasonix Framer template (https://sasonix.framer.website/),
 * rebuilt from scratch in clean React. Sasonix as-is first (its orange, its fonts, its
 * copy); rebrand to CaseDelta later by swapping the tokens in components/v2/sasonix/tokens.ts.
 *
 * Fonts: the four Sasonix uses, all free/OFL, self-hosted via next/font. Scoped to /v2
 * via this nested layout so the live site is untouched.
 *   Archivo  -> display / headings
 *   Geist    -> body / buttons
 *   JetBrains Mono -> mono eyebrow labels
 *   Inter    -> small UI labels inside the product panels
 *
 * Archivo is self-hosted from the EXACT static masters the live site serves (Fontshare
 * cuts: 400=Book, 500=Medium, 700=Bold, in app/v2/fonts/). Google Fonts' Archivo is a
 * variable font whose interpolated 400/700 measurably diverge from Fontshare's static
 * masters (500 matched, 400/700 did not); using the originals makes the display type
 * byte-identical to the live template. Geist/JetBrains Mono measured identical to the
 * live site (same upstream) so they stay on next/font/google.
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

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return <div className={`${archivo.variable} ${geist.variable} ${jbmono.variable} ${inter.variable}`}>{children}</div>;
}
