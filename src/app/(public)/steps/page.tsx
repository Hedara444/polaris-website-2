import { StepsFlow } from "@/components/public/StepsFlow";
import {
  stepsFeatures,
  stepsFlow,
  stepsIntroParagraphs,
  stepsWorries,
} from "@/lib/content";
import { defaultKeywords, siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "POLARISS | 利用開始までのステップ (Getting Started)",
  description:
    "利用開始までのステップ – POLARISSの導入からご利用開始まで、最短翌日から始められる6つのステップをご案内します。ご購入・初期設定・設置・ご利用開始・解約に至るまでの流れを詳しく解説。",
  path: "/steps",
  keywords: defaultKeywords.steps,
});

export default function StepsPage() {
  return (
    <>
      <section className="steps-hero">
        <div className="shell">
          <p className="eyebrow light">GETTING STARTED</p>
          <h1>
            ＼こんな悩みは
            <br />
            ありませんか？／
          </h1>

          <div className="steps-worries">
            {stepsWorries.map((worry, index) => (
              <div className="steps-worry-card" key={worry}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{worry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="steps-intro section page-shell">
        <div className="shell steps-intro-grid">
          <div className="steps-intro-copy">
            <p className="eyebrow">POLARISSにおまかせください</p>
            <h2>悩みや不安を解消する、トータルソリューション。</h2>
            {stepsIntroParagraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="steps-cost-chip">
              <span>コストパフォーマンス</span>
              <strong>1日わずか約66円</strong>
            </div>
          </div>
          <div className="steps-intro-media">
            <img src="/images/steps/trust.jpg" alt="POLARISS セキュリティシステム" />
          </div>
        </div>
      </section>

      <section className="steps-features section">
        <div className="shell">
          <div className="section-heading centered-heading">
            <p className="eyebrow">WHY POLARISS</p>
            <h2>
              POLARISSが
              <br />
              選ばれる理由。
            </h2>
          </div>

          <div className="steps-feature-list">
            {stepsFeatures.map((feature, index) => (
              <article
                className={`steps-feature-row ${index % 2 ? "reverse" : ""}`}
                key={feature.index}
              >
                <div className="steps-feature-image">
                  <img src={feature.image} alt={feature.title} />
                  <span>{feature.index}</span>
                </div>
                <div className="steps-feature-copy">
                  <p className="eyebrow">FEATURE {feature.index}</p>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                  {feature.note ? <p className="steps-feature-note">{feature.note}</p> : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="steps-flow-section section">
        <div className="shell">
          <div className="section-heading centered-heading">
            <p className="eyebrow">HOW TO START</p>
            <h2>ご利用までの流れ</h2>
            <p className="steps-flow-subtitle">最短翌日からご利用開始(※1)</p>
          </div>

          <p className="steps-consultation">
            まずはお気軽にお問い合わせください。ご質問やご相談にも迅速に対応させていただきます。
            POLARISSに関する不安や悩みを十分に解消されてから、安心してお申込みください。
          </p>

          <StepsFlow items={stepsFlow} />

          <p className="steps-flow-note">
            ※1 関東圏を中心とした翌日配送可能な範囲、ユーザー登録など初期登録の完了時間により前後致します。
          </p>
        </div>
      </section>

      <section className="steps-cta section">
        <div className="shell">
          <p className="eyebrow light">お気軽にどうぞ</p>
          <h2>
            ＼いつでも
            <br />
            ご相談ください／
          </h2>
          <p>
            POLARISSは、お客様の安心と快適な生活をサポートするために、最先端の技術と確かなサービスを提供いたします。
            機能に関する詳しいご説明、最適な設置方法のご提案、価格やサービスプランの詳細についてのご相談など、あらゆるお問い合わせに丁寧かつ迅速に対応いたします。
            何かご不明な点がございましたら、専門のスタッフがしっかりとサポートさせていただきますので、どうぞお気軽にご相談ください。
          </p>
          <a
            className="button button-primary button-wide"
            href={siteConfig.buyNowUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            購入はこちら <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
    </>
  );
}