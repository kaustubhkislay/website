import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kaustubh Kislay",
  description: "Personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t;else if(window.matchMedia('(prefers-color-scheme:dark)').matches)document.documentElement.dataset.theme='dark'}catch(e){}})()`,
          }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
