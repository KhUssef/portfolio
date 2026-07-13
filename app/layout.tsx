import type { Metadata } from "next";
import { IBM_Plex_Mono, Silkscreen } from "next/font/google";
import { profile } from "@/data/profile";
import "./globals.css";

const pixel = Silkscreen({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-silkscreen",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

// On Vercel the production URL is provided at build time; locally the links
// resolve against the dev server.
const siteUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : "http://localhost:3000";

const siteTitle = `youssefOS - ${profile.name}, ${profile.role}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteTitle,
  description: profile.tagline,
  openGraph: {
    title: siteTitle,
    description: profile.tagline,
    url: "/",
    siteName: "youssefOS",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: profile.tagline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${pixel.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
