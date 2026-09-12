import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Nexus Web Lab — AI Automation & AI-Powered Web Development in Yangon, Myanmar";

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
          overflow: "hidden",
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
              "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Gradient glows */}
        <div
          style={{
            position: "absolute",
            top: "-120px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "700px",
            height: "320px",
            background:
              "radial-gradient(ellipse, rgba(59,130,246,0.25) 0%, transparent 70%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-160px",
            right: "-80px",
            width: "500px",
            height: "360px",
            background:
              "radial-gradient(ellipse, rgba(139,92,246,0.18) 0%, transparent 70%)",
          }}
        />

        {/* Accent bar */}
        <div
          style={{
            width: "80px",
            height: "6px",
            background: "linear-gradient(90deg, #3B82F6, #06B6D4)",
            borderRadius: "3px",
            marginBottom: "36px",
          }}
        />

        {/* Title */}
        <div
          style={{
            fontSize: "76px",
            fontWeight: 900,
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            gap: "18px",
            marginBottom: "10px",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          Nexus Web Lab
        </div>

        {/* Subtitle — gradient, matches site positioning */}
        <div
          style={{
            fontSize: "34px",
            fontWeight: 700,
            background: "linear-gradient(90deg, #3B82F6, #06B6D4)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: "28px",
            lineHeight: 1.2,
          }}
        >
          AI Automation & AI-Powered Web Development
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "26px",
            color: "#94A3B8",
            fontWeight: 400,
            maxWidth: "760px",
            textAlign: "center",
            lineHeight: 1.5,
          }}
        >
          Custom AI agents, chatbots & websites that grow your business
        </div>

        {/* Location pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            marginTop: "36px",
            padding: "10px 24px",
            borderRadius: "9999px",
            border: "1px solid rgba(147,197,253,0.25)",
            background: "rgba(15,23,42,0.6)",
          }}
        >
          <div
            style={{
              width: "8px",
              height: "8px",
              borderRadius: "50%",
              background: "#06B6D4",
            }}
          />
          <div style={{ fontSize: "22px", color: "#93C5FD", fontWeight: 500 }}>
            Yangon, Myanmar
          </div>
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
