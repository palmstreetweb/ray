import { ImageResponse } from "next/og";
import { business } from "@/lib/business";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  const { bg, ink } = business.brand;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: bg,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
          color: ink,
          fontStyle: "italic",
          fontWeight: 600,
          fontSize: 42,
          letterSpacing: "-0.04em",
        }}
      >
        R
      </div>
    ),
    size
  );
}
