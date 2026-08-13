import { VoiceCard } from "@/components/public/VoiceCard";
import { testimonials } from "@/lib/content";
import { defaultKeywords } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "POLARISS | 利用者の声 (Customer Voices)",
  description:
    "利用者の声 – POLARISSのLINE＋GPS車両セキュリティシステムを実際にご利用いただいているお客様からの体験談をご紹介します。盗難対策・GPS追跡・LINE通知のリアルな効果をどうぞご覧ください。",
  path: "/voices",
  keywords: defaultKeywords.voices,
});

export default function VoicesPage() {
  return (
    <>
      <section className="voices-hero">
        <div className="shell voices-hero-grid">
          <div className="voices-hero-media" aria-hidden="true">
            <img src="/images/voices/voice-hero.jpg" alt="" />
          </div>
          <div className="voices-hero-copy">
            <p className="eyebrow light">CUSTOMER VOICES</p>
            <h1>利用者の声</h1>
            <p className="voices-hero-tagline">
              すでに利用されているお客様が語る、
              <br />
              POLARISSがもたらす安心と効果！
            </p>
            <div className="voices-hero-divider" />
          </div>
        </div>
      </section>

      <section className="section page-shell">
        <div className="shell">
          <div className="page-intro">
            <p className="eyebrow">リアルな体験談</p>
            <h1>安心を選ばれたお客様の声。</h1>
            <p>
              ポラリスのLINEとGPSを活用した車とバイク向けセキュリティシステムは、車両の安心と安全を提供する信頼のソリューションです。このページでは、実際にシステムをご利用いただいているお客様から寄せられたリアルな声をご紹介いたします。
            </p>
            <p>
              愛車やバイクの盗難防止や管理に不安を感じている方にとって、私たちのシステムがどのように役立っているのか、具体的な体験談をぜひご覧ください。お客様の生の声を通じて、ポラリスのセキュリティシステムの効果や利便性を実感していただけることでしょう。
            </p>
          </div>

          <div className="voices-note">
            <p>
              当社ではサービス向上のため、利用者様に定期的にご意見を伺っております。
              <br />
              お答えくださった利用者様の声をご紹介いたします。
            </p>
          </div>

          <div className="voice-list">
            {testimonials.map((item, index) => (
              <VoiceCard item={item} index={index} key={item.name} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}