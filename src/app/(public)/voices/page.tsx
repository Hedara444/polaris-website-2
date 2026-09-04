import Link from "next/link";

import { testimonials } from "@/lib/content";
import { defaultKeywords } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";
import "./voices.css";

export const metadata = buildMetadata({
  title: "POLARISS | 利用者の声",
  description:
    "利用者の声 – 大型バイク、ファミリーカー、スポーツカー、複数台管理。それぞれの不安とPOLARISSを選んだ理由をご紹介。",
  path: "/voices",
  keywords: defaultKeywords.voices,
});

const summaries = [
  "盗難対策を複数重ねられることが、購入の後押しに。",
  "離れた駐車場でも、移動の通知と位置確認が安心材料に。",
  "通知の早さ、買い切りの端末、保証が継続利用の理由に。",
  "車もバイクも、同じLINEアカウントで管理できることが決め手に。",
];

function parseTestimonial(text: string, idx: number) {
  const summary = summaries[idx] ?? "";
  const clean = text.replace(/<\/?mark>/g, "");
  const parts = clean.split("。");
  const p1 = parts.slice(0, 1).join("。") + (parts.length > 1 ? "。" : "");
  const p2 = parts.slice(1).join("。").trim();
  return { clean, summary, p1, p2 };
}

export default function VoicesPage() {
  return (
    <main id="top">
      <section className="ohero">
        <div className="ohero-in wrap">
          <div className="crumb">
            <Link href="/">ホーム</Link>／<span>利用者の声</span>
          </div>
          <p className="kicker">USERS</p>
          <h1>
            実際に使う人の言葉で、
            <br />
            POLARISSを見る。
          </h1>
          <p>大型バイク、ファミリーカー、スポーツカー、複数台の車両管理。盗難への不安と、POLARISSを選んだ理由は、それぞれ少しずつ違います。</p>
        </div>
      </section>

      <section className="voices" id="voices">
        <div className="wrap">
          <div className="voices-head">
            <p className="kicker rv in">USERS COMMENT</p>
            <h2 className="rv in">利用者の声</h2>
          </div>

          <div className="voice-grid">
            {testimonials.map((item, idx) => {
              const { p1, p2, summary } = parseTestimonial(item.text, idx);
              return (
                <article key={item.name} className="voice-card rv in">
                  <div className="voice-body">
                    <div className="voice-k">VOICE 0{idx + 1}</div>
                    <span className="voice-name">{item.name}</span>
                    <span className="voice-type">{item.category}</span>
                    <h3>{item.title}</h3>
                    <p>{p1}</p>
                    {p2 && <p>{p2}</p>}
                    {summary && <div className="voice-summary">{summary}</div>}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="onote">
        <div className="wrap">
          <p className="rv in">※POLARISSは、盗難の防止や車両の発見・回収を保証するサービスではありません。</p>
        </div>
      </section>

      <section className="ofin" id="final">
        <div className="bgfill" role="img" aria-label="愛車と過ごす時間"></div>
        <div className="scrim"></div>
        <div className="ofin-in">
          <h2 className="rv in">
            あなたの愛車にも、
            <br />
            もしもの備えを。
          </h2>
          <p className="rv in">
            停める場所も、乗り方も違います。それでも、動かされたことに気づけるという一点は、多くの利用者にとって大切な備えになります。
          </p>
          <div className="ofin-btns rv in">
            <Link href="/order" className="btn btn-white">
              購入
            </Link>
            <Link href="/howto" className="btn btn-ghost">
              使い方を見る
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
