import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { GoogleTagManager } from "@next/third-parties/google";

import { siteConfig } from "@/lib/site-config";

import "./globals.css";

export const metadata: Metadata = {
  title: siteConfig.name,
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
      <body suppressHydrationWarning className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
