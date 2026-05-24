import { ImageResponse } from "next/og";
import { business } from "@/lib/business";

export const alt = `${business.firstName} ${business.lastName} — model portfolio`;
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
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, color: inkMuted, fontSize: 16, letterSpacing: "0.32em", textTransform: "uppercase", fontFamily: "monospace" }}>
          <span style={{ color: accent }}>{business.firstName} {business.lastName}</span> · NY
        </div>

        <div style={{ marginTop: "auto", marginBottom: "auto", display: "flex", flexDirection: "column", gap: 4 }}>
          <div style={{ fontSize: 140, fontWeight: 500, lineHeight: 0.92, letterSpacing: "-0.04em", color: ink }}>Editorial.</div>
          <div style={{ fontSize: 140, fontWeight: 500, lineHeight: 0.92, letterSpacing: "-0.04em", color: ink, fontStyle: "italic" }}>Beauty.</div>
          <div style={{ fontSize: 140, fontWeight: 500, lineHeight: 0.92, letterSpacing: "-0.04em", color: accent }}>Runway.</div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", color: inkMuted, fontSize: 18, fontFamily: "monospace" }}>
          <span>{new URL(business.url).hostname}</span>
          <span style={{ color: accent, letterSpacing: "0.28em", textTransform: "uppercase", fontSize: 14 }}>Direct booking</span>
        </div>
      </div>
    ),
    size
  );
}
