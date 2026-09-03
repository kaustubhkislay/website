import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { BASE_URL } from "./sitemap";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Kaustubh Kislay",
    template: "%s — Kaustubh Kislay",
  },
  description:
    "AI safety researcher. Director of the Wisconsin AI Safety Initiative. Writing, and everything I read.",
  authors: [{ name: "Kaustubh Kislay", url: BASE_URL }],
  creator: "Kaustubh Kislay",
  openGraph: {
    siteName: "Kaustubh Kislay",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@kaustubhais",
    site: "@kaustubhais",
  },
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": "/feed.xml" },
  },
  // Set GOOGLE_SITE_VERIFICATION to emit the Search Console meta tag; omitted
  // (no invalid tag) when unset — DNS/Vercel verification needs nothing here.
  ...(process.env.GOOGLE_SITE_VERIFICATION
    ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://use.typekit.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://p.typekit.net" crossOrigin="anonymous" />
        <link rel="preload" as="style" href="https://use.typekit.net/hem0twr.css" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var l=document.createElement('link');l.rel='stylesheet';l.href='https://use.typekit.net/hem0twr.css';l.media='print';l.onload=function(){l.media='all'};document.head.appendChild(l)})()`,
          }}
        />
        <noscript>
          <link rel="stylesheet" href="https://use.typekit.net/hem0twr.css" />
        </noscript>
      </head>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Kaustubh Kislay",
              url: BASE_URL,
              jobTitle: "AI Safety Researcher",
              affiliation: {
                "@type": "Organization",
                name: "Wisconsin AI Safety Initiative",
                url: "https://waisi.org/",
              },
              sameAs: [
                "https://github.com/kaustubhkislay",
                "https://www.linkedin.com/in/kaustubh-kislay",
                "https://x.com/kaustubhais",
                "https://scholar.google.com/citations?user=3INpQ98AAAAJ&hl=en",
                "https://www.lesswrong.com/users/kaustubh-kislay",
                "https://substack.com/@kaustubhais",
              ],
            }),
          }}
        />
        {children}
        {/* waisi.live webring. The health checker does a substring search of
            the served HTML for "https://waisi.live/embed/kaustubh", so the src
            must stay a literal string here — never assembled at runtime.
            The iframe inherits nothing from our CSS, so the query params carry
            the palette: faint text, chili links, rl-limo (falls back to the
            system sans until the ring's member YAML loads the Typekit kit).
            The widget's own rounded border is made transparent so the bar
            sits on the page with no outline. Pages end with pb-12 so the gap
            above the bar is a uniform 48px on every route. */}
        <footer className="mx-auto max-w-[640px] px-6 pb-12">
          <iframe
            src="https://waisi.live/embed/kaustubh?text_color=%235C4F42&link_color=%239B1B30&border_color=transparent&font=rl-limo,ui-sans-serif,system-ui,sans-serif&font_size=13px"
            title="waisi.live webring"
            className="block h-11 w-full border-0"
            loading="lazy"
          />
        </footer>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
