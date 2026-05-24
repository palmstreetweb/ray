import { ImageResponse } from "next/og";
import { business } from "@/lib/business";

export const alt = `${business.firstName} ${business.lastName} — ${business.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const { accent, bg, ink, inkMuted } = business.brand;
  return new ImageResponse(
    (
      <div
        style={{
          background: bg,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "60px 80px",
          color: ink,
          fontFamily: "serif",
          position: "relative",
        }}
      >
        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: inkMuted, fontSize: 16, letterSpacing: "0.32em", textTransform: "uppercase", fontFamily: "monospace", borderTop: `1px solid ${ink}33`, paddingTop: 14 }}>
          <span>{business.basedIn}</span>
          <span style={{ color: accent }}>Portfolio · 2026</span>
        </div>

        {/* Big name */}
        <div style={{ marginTop: "auto", marginBottom: "auto", display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 220, fontWeight: 500, lineHeight: 0.85, letterSpacing: "-0.04em", color: ink }}>
            {business.firstName}
          </span>
          <span style={{ fontSize: 220, fontWeight: 500, lineHeight: 0.85, letterSpacing: "-0.04em", color: accent, fontStyle: "italic" }}>
            {business.lastName}.
          </span>
        </div>

        {/* Bottom bar */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", color: inkMuted, fontSize: 18, fontFamily: "monospace", borderTop: `1px solid ${ink}33`, paddingTop: 14 }}>
          <span>{new URL(business.url).hostname}</span>
          <span style={{ color: accent, letterSpacing: "0.28em", textTransform: "uppercase", fontSize: 14 }}>
            Editorial · Beauty · Runway
          </span>
        </div>
      </div>
    ),
    size
  );
}
