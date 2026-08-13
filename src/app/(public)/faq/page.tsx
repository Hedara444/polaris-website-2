import { FaqAccordion } from "@/components/public/FaqAccordion";
import { defaultKeywords } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";
import { getPublishedFaqs } from "@/server/content-service";

export const metadata = buildMetadata({
  title: "POLARISS | FAQ",
  description:
    "Browse ordered FAQ content managed from the admin side, including keyword-aware support answers and setup guidance.",
  path: "/faq",
  keywords: defaultKeywords.faq,
});

export default async function FaqPage() {
  const faqs = await getPublishedFaqs();

  return (
    <section className="section page-shell">
      <div className="shell">
        <div className="page-intro">
          <p className="eyebrow">FAQ</p>
          <h1>Answers shaped for support, indexing, and quick scanning.</h1>
          <p>
            FAQ content is manually ordered from the admin side so the most relevant answers
            stay visible at the top of the page.
          </p>
        </div>

        <FaqAccordion items={faqs} />
      </div>
    </section>
  );
}
