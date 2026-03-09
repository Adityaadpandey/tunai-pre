import type { Metadata } from "next";
import { Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Tunai — The Operating System for Events",
  description:
    "Events run on spreadsheets, WhatsApp groups, and fragmented tools. Tunai brings everything into one unified system. Join the waitlist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${syne.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
