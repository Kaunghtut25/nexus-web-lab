import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Nexus Web Lab — Digital Solutions";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0F172A",
          position: "relative",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Gradient glow top */}
        <div
          style={{
            position: "absolute",
            top: "-100px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "300px",
            background:
              "radial-gradient(ellipse, rgba(59,130,246,0.2) 0%, transparent 70%)",
          }}
        />

        {/* Accent bar */}
        <div
          style={{
            width: "80px",
            height: "6px",
            background: "linear-gradient(90deg, #3B82F6, #06B6D4)",
            borderRadius: "3px",
            marginBottom: "32px",
          }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: 900,
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "8px",
            letterSpacing: "-0.02em",
          }}
        >
          <span style={{ color: "#FFFFFF" }}>Nexus Web Lab</span>
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: "32px",
            fontWeight: 600,
            background: "linear-gradient(90deg, #3B82F6, #06B6D4)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: "24px",
          }}
        >
          Digital Solutions
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "24px",
            color: "#94A3B8",
            fontWeight: 400,
            maxWidth: "700px",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          We Build Websites That Grow Your Business
        </div>

        {/* Bottom accent bar */}
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "0",
            width: "100%",
            height: "8px",
            background: "linear-gradient(90deg, #3B82F6, #06B6D4)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
