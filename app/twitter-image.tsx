import { readFile } from "fs/promises";
import { ImageResponse } from "next/og";
import { join } from "path";

export const runtime = "nodejs";
export const alt = "Tunai — The Operating System for Events";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function TwitterImage() {
  const logoData = await readFile(join(process.cwd(), "public", "logo.png"));
  const logoBase64 = `data:image/png;base64,${logoData.toString("base64")}`;

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
        {/* Grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Glow */}
        <div
          style={{
            position: "absolute",
            top: -120,
            right: -120,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(236,72,153,0.12) 0%, transparent 70%)",
          }}
        />

        {/* Logo + brand */}
        <div
          style={{
            position: "absolute",
            top: 72,
            left: 96,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoBase64}
            alt="Tunai Logo"
            width={56}
            height={56}
          />
          <span
            style={{
              fontSize: 22,
              fontWeight: 700,
              color: "rgba(255,255,255,0.96)",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
            }}
          >
            Tunai
          </span>
        </div>

        {/* Headline */}
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
              color: "rgba(255,255,255,0.50)",
              margin: 0,
              lineHeight: 1.5,
              letterSpacing: "0.01em",
            }}
          >
            One system. Teams, vendors, tickets, payments.
          </p>
        </div>

        {/* Badge */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            right: 96,
            display: "flex",
            alignItems: "center",
            gap: 10,
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: 8,
            padding: "10px 20px",
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#34D399",
            }}
          />
          <span
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "rgba(255,255,255,0.50)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Waitlist Open
          </span>
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: 80,
            left: 96,
            display: "flex",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 14,
              fontWeight: 500,
              color: "rgba(255,255,255,0.30)",
              letterSpacing: "0.05em",
            }}
          >
            tunai.app
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
