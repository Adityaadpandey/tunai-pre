import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Tunai — The Operating System for Events";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#000000",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          padding: "80px 96px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Top-right glow */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Brand mark */}
        <div
          style={{
            position: "absolute",
            top: 72,
            left: 96,
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.12)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
          <span
            style={{
              fontSize: 14,
              fontWeight: 700,
              color: "rgba(255,255,255,0.96)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            Tunai
          </span>
        </div>

        {/* Main headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <p
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "rgba(255,255,255,0.96)",
              lineHeight: 1.05,
              margin: 0,
              letterSpacing: "-0.02em",
              textTransform: "uppercase",
            }}
          >
            The Operating
            <br />
            System for Events
          </p>

          <p
            style={{
              fontSize: 22,
              fontWeight: 400,
              color: "rgba(255,255,255,0.44)",
              margin: 0,
              lineHeight: 1.5,
              letterSpacing: "0.01em",
            }}
          >
            One system. Teams, vendors, tickets, payments.
          </p>
        </div>

        {/* Bottom badge */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            right: 96,
            display: "flex",
            alignItems: "center",
            gap: 8,
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 6,
            padding: "8px 16px",
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#34D399",
            }}
          />
          <span
            style={{
              fontSize: 12,
              fontWeight: 600,
              color: "rgba(255,255,255,0.44)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Waitlist Open
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
