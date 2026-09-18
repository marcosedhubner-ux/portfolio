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
          backgroundColor: "#05070d",
          backgroundImage:
            "radial-gradient(circle at 12% 15%, rgba(47,111,237,0.35) 0%, transparent 42%), radial-gradient(circle at 88% 85%, rgba(124,92,255,0.3) 0%, transparent 42%)",
        }}
      >
        <div
          style={{
            fontFamily: "monospace",
            fontSize: 22,
            letterSpacing: 4,
            textTransform: "uppercase",
            color: "rgba(238,241,248,0.55)",
          }}
        >
          MH
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              fontSize: 64,
              color: "#f5f7fc",
              fontStyle: "italic",
              lineHeight: 1.1,
            }}
          >
            I build the part after the CRUD.
          </div>
          <div style={{ fontSize: 26, color: "rgba(238,241,248,0.6)", maxWidth: 820 }}>
            Five full-stack products built around genuinely hard problems — conflict-free
            scheduling, a concurrency-safe ledger, real-time collaboration.
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
