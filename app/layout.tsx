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
    "Stop running events on spreadsheets and WhatsApp. Tunai is the operating system that unifies your team, vendors, tickets, and payments — built by organisers, for organisers.",
  keywords: [
    "event management software",
    "event operating system",
    "event organizer platform",
    "college fest management",
    "college fest management tool India",
    "hackathon management platform",
    "concert management software",
    "event vendor management",
    "event vendor coordination",
    "event ticketing platform",
    "event coordination tool",
    "event operations platform",
    "event payment reconciliation",
    "event team coordination",
    "event planning software for colleges",
    "conference management tool",
    "community event organizer",
    "Tunai",
    "Tunai app",
    "tunai events",
    "event infrastructure",
    "best event management software 2026",
    "event management platform India",
    "founding organisers circle",
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
    title: "Tunai — The Operating System for Events | Team, Vendors, Tickets, Payments",
    description:
      "Stop running events on spreadsheets and WhatsApp. Tunai unifies your team, vendors, tickets, and payments into one system. Join the Founding Organisers Circle.",
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
      "Stop running events on spreadsheets and WhatsApp. Tunai unifies your team, vendors, tickets, and payments into one system. Join the Founding Organisers Circle.",
    creator: "@tunai_app",
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
      description: "The Operating System for Events — unify your team, vendors, tickets, and payments.",
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
        width: 512,
        height: 512,
      },
      description:
        "Tunai is the operating system for events — a unified platform for teams, vendors, tickets, and payments.",
      foundingDate: "2025",
      sameAs: [],
    },
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.tunai.app/#app",
      name: "Tunai",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Event Management",
      operatingSystem: "Web",
      url: "https://www.tunai.app",
      description:
        "Tunai unifies the full event operational stack — vendor coordination, ticketing, team management, and payment reconciliation — into one system.",
      featureList: "Team Coordination, Vendor Management, Ticketing, Payment Reconciliation, Real-time Operations, Agent-powered Automation",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/PreOrder",
        price: "0",
        priceCurrency: "USD",
        description: "Join the Founding Organisers Circle — free early access",
      },
      publisher: {
        "@id": "https://www.tunai.app/#organization",
      },
    },
    {
      "@type": "FAQPage",
      "@id": "https://www.tunai.app/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Tunai?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Tunai is the operating system for events. It unifies your team coordination, vendor management, ticketing, and payment reconciliation into one platform — replacing the spreadsheets and WhatsApp groups.",
          },
        },
        {
          "@type": "Question",
          name: "Who is Tunai built for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Tunai is built for event organisers running events with multiple vendors, teams, or recurring operational complexity — college fests, hackathons, concerts, conferences, community summits, and corporate events.",
          },
        },
        {
          "@type": "Question",
          name: "What is the Founding Organisers Circle?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The Founding Organisers Circle is an invite-only group of early organisers who get early access, direct input on product decisions, access to a private organiser community, and priority support from the Tunai team.",
          },
        },
        {
          "@type": "Question",
          name: "Is Tunai free to use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Tunai is currently in pilot with early access available through the Founding Organisers Circle waitlist at no cost.",
          },
        },
        {
          "@type": "Question",
          name: "How does Tunai handle vendor management?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Tunai tracks vendor outreach, sends automatic deadline reminders, monitors contract status, and handles payment tracking and post-event reconciliation — all in one place.",
          },
        },
      ],
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
