import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

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
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t)document.documentElement.dataset.theme=t;else if(window.matchMedia('(prefers-color-scheme:light)').matches)document.documentElement.dataset.theme='light'}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${jetbrains.variable} font-mono antialiased`}>
        {children}
      </body>
    </html>
  );
}
