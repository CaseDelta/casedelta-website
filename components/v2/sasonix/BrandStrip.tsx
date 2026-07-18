"use client";

/**
 * Brand Section, matching the live site (top 969, h254): a left-aligned label +
 * an infinite marquee of brand logos, vertically centered at y=1053 (aligned with
 * the hero dashboards' bottom edge). Logos are Sasonix's placeholder brand SVGs
 * (hotlinked; swapped on rebrand).
 */
import { SX } from "./tokens";
import { Container } from "./kit";
import { Reveal } from "./reveal";

const LOGOS = [
  "https://framerusercontent.com/images/4fMdQURZjmnz4MzthqdHnuPRWG0.svg",
  "https://framerusercontent.com/images/HxCKj0TIOZzDK4yuN05ZYWa5P8.svg",
  "https://framerusercontent.com/images/3ZWmbugYt2b7ki3Z9rZvvGBX0.svg",
  "https://framerusercontent.com/images/AIpioOtc4RYdHKKedo5DHO2Vzy0.svg",
  "https://framerusercontent.com/images/tY69ZUduxPlehy1w7LLAYd6DA8.svg",
];

export function BrandStrip() {
  const track = [...LOGOS, ...LOGOS];
  return (
    <section style={{ background: SX.white, padding: "34px 0 120px" }}>
      <Container>
        <Reveal style={{ display: "flex", alignItems: "center", height: 100, gap: 0 }}>
          <p style={{ flex: "0 0 auto", width: 300, fontFamily: SX.body, fontWeight: 500, fontSize: 18, lineHeight: "25.2px", color: SX.ink, margin: 0 }}>
            Purpose-built for personal injury, mass tort, and medical malpractice firms.
          </p>
          <div className="sx-marquee" style={{ flex: "1 1 auto", marginLeft: 72, overflow: "hidden", maskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)" }}>
            <div className="sx-marquee-track" style={{ display: "flex", alignItems: "center", gap: 20, width: "max-content" }}>
              {track.map((src, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={i} src={src} alt="" aria-hidden style={{ height: 100, width: "auto", flex: "0 0 auto", objectFit: "contain" }} />
              ))}
            </div>
          </div>
        </Reveal>
      </Container>

      <style>{`
        .sx-marquee-track { animation: sx-marquee 26s linear infinite; }
        @keyframes sx-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @media (prefers-reduced-motion: reduce) { .sx-marquee-track { animation: none; } }
      `}</style>
    </section>
  );
}
