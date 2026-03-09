import type { Metadata, Viewport } from "next";
import { Syne } from "next/font/google";
import "./globals.css";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tunai.app"),

  title: {
    default: "Tunai — The Operating System for Events",
    template: "%s | Tunai",
  },
  description:
    "Events run on spreadsheets, WhatsApp groups, and fragmented tools. Tunai unifies the entire operational stack — teams, vendors, tickets, and payments — into one system.",
  keywords: [
    "event management software",
    "event operating system",
    "event organizer platform",
    "college fest management",
    "hackathon management",
    "concert management",
    "event vendor management",
    "event ticketing platform",
    "event coordination tool",
    "event operations",
    "Tunai",
    "event infrastructure",
  ],
  authors: [{ name: "Tunai", url: "https://www.tunai.app" }],
  creator: "Tunai",
  publisher: "Tunai",
  applicationName: "Tunai",
  category: "technology",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://www.tunai.app",
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.tunai.app",
    siteName: "Tunai",
    title: "Tunai — The Operating System for Events",
    description:
      "Events run on spreadsheets, WhatsApp groups, and fragmented tools. Tunai brings everything into one unified system.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Tunai — The Operating System for Events",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Tunai — The Operating System for Events",
    description:
      "Events run on spreadsheets, WhatsApp groups, and fragmented tools. Tunai brings everything into one unified system.",
    images: ["/opengraph-image"],
  },

  icons: {
    icon: [
      { url: "/logo.png", type: "image/png" },
    ],
    apple: [
      { url: "/logo.png", type: "image/png" },
    ],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://www.tunai.app/#website",
      url: "https://www.tunai.app",
      name: "Tunai",
      description: "The Operating System for Events",
      inLanguage: "en-US",
    },
    {
      "@type": "Organization",
      "@id": "https://www.tunai.app/#organization",
      name: "Tunai",
      url: "https://www.tunai.app",
      logo: {
        "@type": "ImageObject",
        url: "https://www.tunai.app/logo.png",
      },
      description:
        "Tunai is the operating system for events — a unified platform for teams, vendors, tickets, and payments.",
      sameAs: [],
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.tunai.app/#app",
      name: "Tunai",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: "https://www.tunai.app",
      description:
        "Tunai unifies the full event operational stack — vendor coordination, ticketing, team management, and payment reconciliation — into one system.",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/PreOrder",
        price: "0",
        priceCurrency: "USD",
        description: "Early access waitlist",
      },
      publisher: {
        "@id": "https://www.tunai.app/#organization",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${syne.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
