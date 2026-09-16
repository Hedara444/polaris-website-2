import Link from "next/link";
import { defaultKeywords } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";
import { VoicesInteractions } from "@/components/voices/VoicesInteractions";
import "./voices.css";

export const metadata = buildMetadata({
  title: "利用者の声 ｜ POLARISS",
  description:
    "利用者の声 – 大型バイク、ファミリーカー、スポーツカー、複数台管理。それぞれの不安とPOLARISSを選んだ理由をご紹介。",
  path: "/voices",
  keywords: defaultKeywords.voices,
});

const voiceCards = [
  {
    key: "VOICE 01",
    name: "Tさん（大型バイク所有）",
    type: "バイク",
    title: "安全性の確保で購入を決意",
    p1: "欲しかった大型バイクは盗難に遭いやすいという噂が多く、購入に二の足を踏んでいました。",
    p2: "チェーンロックなどの対策と併用する形でPOLARISSを導入することで、盗難対策を複数用意できるようになり、手に入れることを決めました。",
    summary: "盗難対策を複数重ねられることが、購入の後押しに。",
  },
  {
    key: "VOICE 02",
    name: "Yさん（ファミリーカー所有）",
    type: "車・ファミリーユース",
    title: "離れた駐車場でも安心",
    p1: "家族で乗っているワンボックスについて、盗難の話を聞く機会が増えたことをきっかけにPOLARISSの導入を決めました。",
    p2: "駐車場はやや離れた場所にありますが、位置情報を確認できることが安心感につながっています。移動した際の第一報も想像より早く届きました。",
    summary: "離れた駐車場でも、移動の通知と位置確認が安心材料に。",
  },
  {
    key: "VOICE 03",
    name: "Kさん（スポーツカー所有）",
    type: "車",
    title: "使いやすさと明瞭な料金体系が決め手",
    p1: "古いスポーツカーに乗っており、中古市場の高騰とともに盗難への不安が大きくなっていました。",
    p2: "以前使っていたGPSサービスでは通知までのタイムラグや、レンタル端末への不安がありました。POLARISSに変えてからは通信状況も良好で、端末が買い切りで保証もある点に安心しています。",
    summary: "通知の早さ、買い切りの端末、保証が継続利用の理由に。",
  },
  {
    key: "VOICE 04",
    name: "Iさん（車、バイク複数所有）",
    type: "車＆バイク",
    title: "複数の車両を管理しています",
    p1: "通勤用、趣味用と車もバイクも複数所有しており、ガレージ保管でも盗難のニュースを聞くたびに不安がありました。",
    p2: "POLARISSは自分のLINEアカウントから複数台を管理でき、旅行などの出先での盗難対策としても有効だと感じています。Bluetoothタグも一緒に搭載し、二段構えで備えています。",
    summary: "車もバイクも、同じLINEアカウントで管理できることが決め手に。",
  },
];

export default function VoicesPage() {
  return (
    <main id="top">
      <VoicesInteractions />

      {/* ==================== HERO : full photography ==================== */}
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
          <p>
            大型バイク、ファミリーカー、スポーツカー、複数台の車両管理。盗難への不安と、POLARISSを選んだ理由は、それぞれ少しずつ違います。
          </p>
        </div>
      </section>

      {/* ==================== VOICE CARDS ==================== */}
      <section className="voices" id="voices">
        <div className="wrap">
          <div className="voices-head">
            <p className="kicker rv">USERS COMMENT</p>
            <h2 className="rv">利用者の声</h2>
          </div>

          <div className="voice-grid">
            {voiceCards.map((card) => (
              <article key={card.key} className="voice-card rv">
                <div className="voice-body">
                  <div className="voice-k">{card.key}</div>
                  <span className="voice-name">{card.name}</span>
                  <span className="voice-type">{card.type}</span>
                  <h3>{card.title}</h3>
                  <p>{card.p1}</p>
                  <p>{card.p2}</p>
                  <div className="voice-summary">{card.summary}</div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== NOTE ==================== */}
      <section className="onote">
        <div className="wrap">
          <p className="rv">※POLARISSは、盗難の防止や車両の発見・回収を保証するサービスではありません。</p>
        </div>
      </section>

      {/* ==================== FINAL ==================== */}
      <section className="ofin" id="final">
        <div className="bgfill" role="img" aria-label="愛車と過ごす時間"></div>
        <div className="scrim"></div>
        <div className="ofin-in">
          <h2 className="rv">
            あなたの愛車にも、
            <br />
            秘密の備えを。
          </h2>
          <p className="rv">
            停める場所も、乗り方も違います。それでも、動かされたことに気づけるという一点は、多くの利用者にとって大切な備えになります。
          </p>
          <div className="ofin-btns rv">
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
