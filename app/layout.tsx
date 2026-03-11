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
    default: "Tunai — The Operating System for Events | Manage Teams, Vendors, Tickets & Payments",
    template: "%s | Tunai — Event Operating System",
  },
  description:
    "Stop running events on spreadsheets and WhatsApp. Tunai is the AI-powered operating system that unifies your team, vendors, tickets, and payments — built by organisers, for organisers. Join the Founding Organisers Circle.",
  keywords: [
    // Core product keywords
    "event management software",
    "event operating system",
    "event organizer platform",
    "event management platform",
    // India-specific
    "college fest management",
    "college fest management tool India",
    "best event management software India",
    "event management platform India 2026",
    "college event management tool",
    // Event types
    "hackathon management platform",
    "concert management software",
    "conference management tool",
    "community event organizer",
    "corporate event management",
    "music festival management",
    "sports event organizer software",
    "workshop management platform",
    // Feature keywords
    "event vendor management",
    "event vendor coordination",
    "event ticketing platform",
    "event coordination tool",
    "event operations platform",
    "event payment reconciliation",
    "event team coordination",
    "event planning software for colleges",
    "event budget management",
    "event scheduling tool",
    // AI/tech keywords
    "AI event management",
    "AI-powered event platform",
    "smart event organizer",
    "automated event operations",
    // Conversational / AEO keywords
    "how to manage a college fest",
    "best tool for organizing hackathons",
    "how to coordinate event vendors",
    "how to manage event payments",
    "event management without spreadsheets",
    "alternative to spreadsheets for events",
    "WhatsApp alternative for event teams",
    "how to run a college event smoothly",
    "event organizer checklist tool",
    "how to track event vendors and payments",
    // Brand
    "Tunai",
    "Tunai app",
    "tunai events",
    "event infrastructure",
    "founding organisers circle",
    "best event management software 2026",
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
      "Stop running events on spreadsheets and WhatsApp. Tunai unifies your team, vendors, tickets, and payments into one AI-powered system. Join the Founding Organisers Circle.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Tunai — The Operating System for Events — Logo and branding",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Tunai — The Operating System for Events",
    description:
      "Stop running events on spreadsheets and WhatsApp. Tunai unifies your team, vendors, tickets, and payments into one AI-powered system. Join the Founding Organisers Circle.",
    creator: "@tunai_app",
    site: "@tunai_app",
    images: [
      {
        url: "/twitter-image",
        width: 1200,
        height: 630,
        alt: "Tunai — The Operating System for Events",
      },
    ],
  },

  icons: {
    icon: [
      { url: "/logo.png", type: "image/png", sizes: "512x512" },
      { url: "/logo.png", type: "image/png", sizes: "192x192" },
      { url: "/logo.png", type: "image/png", sizes: "32x32" },
      { url: "/logo.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [
      { url: "/logo.png", type: "image/png", sizes: "180x180" },
    ],
    shortcut: "/logo.png",
  },

  other: {
    "msapplication-TileColor": "#000000",
    "msapplication-TileImage": "/logo.png",
  },
};

/* ─── JSON-LD Structured Data ─── */

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    // ── WebSite with SearchAction ──
    {
      "@type": "WebSite",
      "@id": "https://www.tunai.app/#website",
      url: "https://www.tunai.app",
      name: "Tunai",
      description: "The Operating System for Events — unify your team, vendors, tickets, and payments.",
      inLanguage: "en-US",
      publisher: { "@id": "https://www.tunai.app/#organization" },
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://www.tunai.app/?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },

    // ── Organization with logo, social, and contact ──
    {
      "@type": "Organization",
      "@id": "https://www.tunai.app/#organization",
      name: "Tunai",
      url: "https://www.tunai.app",
      logo: {
        "@type": "ImageObject",
        "@id": "https://www.tunai.app/#logo",
        url: "https://www.tunai.app/logo.png",
        contentUrl: "https://www.tunai.app/logo.png",
        caption: "Tunai — The Operating System for Events",
        width: 512,
        height: 512,
      },
      image: { "@id": "https://www.tunai.app/#logo" },
      description:
        "Tunai is the AI-powered operating system for events — a unified platform for teams, vendors, tickets, and payments. Built by organisers, for organisers.",
      foundingDate: "2025",
      sameAs: [
        "https://twitter.com/tunai_app",
        "https://www.linkedin.com/company/tunai-app",
        "https://www.instagram.com/tunai_app",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        url: "https://www.tunai.app",
        availableLanguage: ["English", "Hindi"],
      },
    },

    // ── SoftwareApplication ──
    {
      "@type": "SoftwareApplication",
      "@id": "https://www.tunai.app/#app",
      name: "Tunai",
      applicationCategory: "BusinessApplication",
      applicationSubCategory: "Event Management",
      operatingSystem: "Web",
      url: "https://www.tunai.app",
      description:
        "Tunai unifies the full event operational stack — vendor coordination, ticketing, team management, and payment reconciliation — into one AI-powered system.",
      featureList: [
        "Team Coordination",
        "Vendor Management",
        "Ticketing & Registration",
        "Payment Reconciliation",
        "Real-time Operations Dashboard",
        "Agent-powered Automation",
        "Budget Tracking",
        "Multi-event Support",
        "Vendor Communication Hub",
        "Automated Reminders & Deadlines",
      ].join(", "),
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/PreOrder",
        price: "0",
        priceCurrency: "USD",
        description: "Join the Founding Organisers Circle — free early access",
      },
      publisher: { "@id": "https://www.tunai.app/#organization" },
      screenshot: "https://www.tunai.app/opengraph-image",
    },

    // ── FAQPage (expanded for AEO) ──
    {
      "@type": "FAQPage",
      "@id": "https://www.tunai.app/#faq",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Tunai?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Tunai is the operating system for events. It unifies your team coordination, vendor management, ticketing, and payment reconciliation into one platform — replacing the spreadsheets and WhatsApp groups that event organisers typically rely on.",
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
            text: "Tunai is currently in pilot with early access available through the Founding Organisers Circle waitlist at no cost. Early members will receive special pricing when premium features launch.",
          },
        },
        {
          "@type": "Question",
          name: "How does Tunai handle vendor management?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Tunai tracks vendor outreach, sends automatic deadline reminders, monitors contract status, and handles payment tracking and post-event reconciliation — all in one place. No more chasing vendors over WhatsApp or email.",
          },
        },
        {
          "@type": "Question",
          name: "How is Tunai different from other event management tools?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Most event tools focus on ticketing or registration alone. Tunai is a full operating system that covers the entire event lifecycle — from vendor coordination and team management to ticketing, payments, and post-event reconciliation. It's built by organisers who understand the chaos of running real events.",
          },
        },
        {
          "@type": "Question",
          name: "Can I use Tunai for college fests and hackathons?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. Tunai was built with college fests and hackathons in mind. It handles multi-track events, team coordination across committees, sponsor and vendor management, and budget tracking — perfect for student-led events.",
          },
        },
        {
          "@type": "Question",
          name: "Does Tunai support team collaboration?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Tunai provides real-time team coordination with role-based access, task assignments, and a shared operations dashboard. Every team member sees what's happening without endless status update messages.",
          },
        },
        {
          "@type": "Question",
          name: "How do I join the Tunai waitlist?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Visit tunai.app and chat with the Tunai assistant to express your interest. You can also click 'I want to Join the Waitlist' in the conversation to be added to the Founding Organisers Circle.",
          },
        },
        {
          "@type": "Question",
          name: "Does Tunai use AI or automation?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Tunai uses AI-powered agents to automate repetitive event operations — from sending vendor follow-ups and deadline reminders to generating event reports and tracking budget utilization in real time.",
          },
        },
      ],
    },

    // ── HowTo (GEO-optimized) ──
    {
      "@type": "HowTo",
      "@id": "https://www.tunai.app/#howto",
      name: "How to Join Tunai's Founding Organisers Circle",
      description:
        "Step-by-step guide to joining Tunai's exclusive early access program for event organisers.",
      totalTime: "PT2M",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Visit tunai.app",
          text: "Go to tunai.app in your browser. You'll see a cinematic intro followed by a chat interface.",
          url: "https://www.tunai.app",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Start a conversation",
          text: "Chat with the Tunai assistant. Tell it about the events you organise and what challenges you face.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Express your interest",
          text: "Click 'I want to Join the Waitlist' or type your interest in joining the Founding Organisers Circle.",
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Provide your details",
          text: "Share your name and email when prompted. The Tunai team will reach out with early access details.",
        },
      ],
    },

    // ── BreadcrumbList ──
    {
      "@type": "BreadcrumbList",
      "@id": "https://www.tunai.app/#breadcrumb",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://www.tunai.app",
        },
      ],
    },

    // ── Speakable (AEO — voice assistant optimization) ──
    {
      "@type": "WebPage",
      "@id": "https://www.tunai.app/#webpage",
      url: "https://www.tunai.app",
      name: "Tunai — The Operating System for Events",
      isPartOf: { "@id": "https://www.tunai.app/#website" },
      about: { "@id": "https://www.tunai.app/#app" },
      description:
        "Tunai is the AI-powered operating system for events. It replaces spreadsheets and WhatsApp groups with a unified platform for team coordination, vendor management, ticketing, and payment reconciliation.",
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: [".story-line", ".char-bubble", ".topbar-name"],
      },
      breadcrumb: { "@id": "https://www.tunai.app/#breadcrumb" },
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
