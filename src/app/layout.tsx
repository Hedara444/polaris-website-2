import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { GoogleTagManager } from "@next/third-parties/google";

import { siteConfig } from "@/lib/site-config";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "POLARISS｜GPSで大切なバイク・車両を見守る",
    template: "%s | POLARISS",
  },
  description: siteConfig.description,
  verification: {
    google: "a0u6yNO2uFEYGVsLh0qOdXA91q24LS51Vv7iwJ-0BrE",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="ja" suppressHydrationWarning className="h-full antialiased" data-scroll-behavior="smooth">
      {siteConfig.gtmId && <GoogleTagManager gtmId={siteConfig.gtmId} />}
      {siteConfig.clarityProjectId && (
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${siteConfig.clarityProjectId}");
          `}
        </Script>
      )}
      <body suppressHydrationWarning className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
