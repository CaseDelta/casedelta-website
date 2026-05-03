import localFont from "next/font/local";

const openSauce = localFont({
  src: [
    { path: "../../open-sauce/OpenSauceSans-Light.ttf",      weight: "300", style: "normal" },
    { path: "../../open-sauce/OpenSauceSans-Regular.ttf",    weight: "400", style: "normal" },
    { path: "../../open-sauce/OpenSauceSans-Medium.ttf",     weight: "500", style: "normal" },
    { path: "../../open-sauce/OpenSauceSans-SemiBold.ttf",   weight: "600", style: "normal" },
    { path: "../../open-sauce/OpenSauceSans-Bold.ttf",       weight: "700", style: "normal" },
    { path: "../../open-sauce/OpenSauceSans-ExtraBold.ttf",  weight: "800", style: "normal" },
    { path: "../../open-sauce/OpenSauceSans-Black.ttf",      weight: "900", style: "normal" },
  ],
  variable: "--font-open-sauce",
  display: "swap",
});

export default function VideoLayout({ children }: { children: React.ReactNode }) {
  return <div className={openSauce.variable} style={{ minHeight: "100vh" }}>{children}</div>;
}
