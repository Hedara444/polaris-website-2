import { HomePage } from "@/components/public/HomePage/HomePage";
import { defaultKeywords } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";
import { getLatestArticles, getPublishedFaqs } from "@/server/content-service";
import { getOrganizationJsonLd, getProductJsonLd } from "@/lib/json-ld";

export const metadata = buildMetadata({
  title: "POLARISS｜GPSで大切なバイク・車両を見守る",
  description:
    "POLARISSは、GPS位置情報と相互監視で大切なバイクや車両を見守るサービスです。盗難対策に加え、気象リスク通知で愛車の危険にも備えます。",
  path: "/",
  keywords: defaultKeywords.home,
});

export default async function LandingPage() {
  const [latestArticles, latestFaqs] = await Promise.all([
    getLatestArticles(3),
    getPublishedFaqs(3),
  ]);

  const orgJsonLd = getOrganizationJsonLd();
  const productJsonLd = getProductJsonLd();

  return (
    <>
      {/* LCP is the hero art, loaded via CSS background-image (--i-hero), so it
          has no <img fetchpriority> to signal priority. Preload it from HTML
          discovery time with fetchpriority=high to kick the download early.
          The media-scoped pair ensures a phone only downloads the 32 KB
          mobile copy, while larger screens preload the desktop copy. */}
      <link
        rel="preload"
        as="image"
        media="(max-width: 640px)"
        href="/images/hero-mobile.webp"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        media="(min-width: 641px)"
        href="/images/hero.webp"
        fetchPriority="high"
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <HomePage latestArticles={latestArticles} latestFaqs={latestFaqs} />
    </>
  );
}
