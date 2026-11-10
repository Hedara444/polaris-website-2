import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import Script from "next/script";
import { Manrope, Noto_Sans_JP, Zen_Kaku_Gothic_New } from "next/font/google";

import { siteConfig } from "@/lib/site-config";

import "./globals.css";

// Self-hosted at build time (downloaded once, served from /_next/static/media).
// Keeps Google's unicode-range slicing, so only the slices actually used on the
// page are fetched — replacing the render-blocking googleapis @import in globals.css.
const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
  adjustFontFallback: true,
});

// preload is disabled for the Japanese font: Google returns ~484 slice @font-face
// rules but only ~12 carry subset comments, so next/font would mark nearly all of
// them preloadable (hundreds of eager font downloads on mobile). With preload off,
// slices are fetched lazily via unicode-range only when text actually uses them.
const zenKakuGothicNew = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-zen",
  adjustFontFallback: true,
  preload: false,
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["700", "900"],
  display: "swap",
  variable: "--font-noto-sans-jp",
  adjustFontFallback: true,
  preload: false,
});

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
    <html lang="ja" suppressHydrationWarning className={`${manrope.variable} ${zenKakuGothicNew.variable} ${notoSansJP.variable} h-full antialiased`} data-scroll-behavior="smooth">
      {/* Deferred to browser idle (`lazyOnload`): on a slow mobile connection GTM
          + Clarity cost ~700ms of main-thread CPU and 314KB right after hydration,
          inflating TTI. Loading them only when the browser is idle keeps them off
          the critical path while still capturing the vast majority of sessions. */}
      {siteConfig.gtmId && (
        <Script id="gtm" strategy="lazyOnload">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${siteConfig.gtmId}');
          `}
        </Script>
      )}
      {siteConfig.clarityProjectId && (
        <Script id="microsoft-clarity" strategy="lazyOnload">
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
