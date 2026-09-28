import { HomePage } from "@/components/public/HomePage";
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
