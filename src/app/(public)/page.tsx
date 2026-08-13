import { HomePage } from "@/components/public/HomePage";
import { defaultKeywords } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";
import { getLatestArticles, getPublishedFaqs } from "@/server/content-service";

export const metadata = buildMetadata({
  title: "POLARISS | Landing Page",
  description:
    "A premium landing page for POLARISS with article highlights, FAQ previews, and strong route-based navigation.",
  path: "/",
  keywords: defaultKeywords.home,
});

export default async function LandingPage() {
  const [latestArticles, latestFaqs] = await Promise.all([
    getLatestArticles(3),
    getPublishedFaqs(3),
  ]);

  return <HomePage latestArticles={latestArticles} latestFaqs={latestFaqs} />;
}
