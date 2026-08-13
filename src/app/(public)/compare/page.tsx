import { defaultKeywords } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "POLARISS | 他社製品との比較 (Comparison)",
  description:
    "他社製品との比較 – POLARISSは、優れたパフォーマンスと信頼性で、最新技術のセキュリティシステム、LINEだけで完結する操作性、充実したサポート体制を提供します。比較資料(PDF)から他社との違いをご覧いただけます。",
  path: "/compare",
  keywords: defaultKeywords.compare,
});

export default function ComparePage() {
  return (
    <>
      <section className="compare-hero">
        <div className="shell">
          <p className="eyebrow light">COMPARISON</p>
          <h1>他社製品との比較</h1>
          <p className="compare-hero-tagline">
            POLARISSが選ばれる理由を、
            <br />
            他社製品と比較しながらご紹介します。
          </p>
          <div className="compare-hero-divider" />
        </div>
      </section>

      <section className="section page-shell">
        <div className="shell">
          <div className="page-intro">
            <p className="eyebrow">なぜPOLARISSなのか</p>
            <h1>優れた性能と信頼性を、比較で明らかに。</h1>
            <p>
              POLARISSは、他社製品と比較しても優れたパフォーマンスと信頼性を誇ります。
              最新技術を駆使したセキュリティシステムや、使い慣れたLINEだけで完結するユーザーフレンドリーな操作性、そして充実したサポート体制が私たちの強みです。
              このセクションでは、他社製品との違いや、POLARISSが選ばれる理由を明確にお伝えいたします。
            </p>
            <p>
              優れた操作性だけでなく、機能性、長期間駆動を実現したバッテリー、リアルタイムの追跡、そしてお客様が感じる安心感まで、総合的に優れた価値をご提供しています。
              安心して愛車を守るために、なぜPOLARISSが最適なのか、その魅力を他社製品と比較しながらご紹介します。
            </p>
          </div>

          <div className="compare-panel">
            <div className="compare-panel-copy">
              <p className="eyebrow">PDF資料</p>
              <h2>他社製品との比較資料</h2>
              <p>
                POLARISSと他社製品を、操作性・機能・バッテリー駆動・リアルタイム追跡・安心感などの観点からまとめた比較資料です。
                導入をご検討の際に、ぜひご覧ください。
              </p>
            </div>
            <a
              className="button button-primary button-wide"
              href="/compare.pdf"
              target="_blank"
              rel="noopener noreferrer"
            >
              他社製品比較を見る（PDF） <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
    </>
  );
}