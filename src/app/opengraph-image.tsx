import { ImageResponse } from "next/og";

export const alt = "Marcos Hubner — Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          backgroundColor: "#0a0d12",
          backgroundImage:
            "radial-gradient(circle at 1px 1px, rgba(232,230,224,0.14) 1px, transparent 0)",
          backgroundSize: "28px 28px",
        }}
      >
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "rgba(232,230,224,0.55)",
          }}
        >
          MH
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 64,
              color: "#e8e6e0",
              fontStyle: "italic",
              lineHeight: 1.1,
            }}
          >
            I build the part after the CRUD.
          </div>
          <div style={{ fontSize: 26, color: "rgba(232,230,224,0.6)", maxWidth: 820 }}>
            Five full-stack products built around genuinely hard problems — conflict-free
            scheduling, a concurrency-safe ledger, real-time collaboration.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
