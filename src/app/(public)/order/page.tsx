import Link from "next/link";
import { siteConfig, defaultKeywords } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";
import { getProductJsonLd } from "@/lib/json-ld";
import "./order.css";

export const metadata = buildMetadata({
  title: "POLARISSを購入する｜GPSで愛車を見守る",
  description:
    "POLARISSのGPSユニットを購入して、大切なバイクや車両の見守りを始めましょう。購入前に料金、利用開始の流れ、主な機能をご確認いただけます。",
  path: "/order",
  keywords: ["POLARISS 購入", "GPS セキュリティ 注文", "車 盗難対策 購入", ...defaultKeywords.compare],
});

export default function OrderPage() {
  const productJsonLd = getProductJsonLd();

  return (
    <main id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <div id="heroEnd" aria-hidden="true" />

      {/* PURCHASE SUMMARY */}
      <section className="sec osum" id="summary" style={{ padding: "clamp(72px,9vw,112px) 0", background: "#fff" }}>
        <div className="wrap">
          <div className="crumb" style={{ marginBottom: 16 }}>
            <Link href="/" style={{ fontSize: 13, fontWeight: 700, color: "var(--gray)" }}>ホーム</Link>／<span style={{ fontSize: 13, fontWeight: 700, color: "#4E4E4A" }}>POLARISSを購入する</span>
          </div>
          <div className="sec-hd rv in">
            <p className="kicker" style={{ fontSize: 13, fontWeight: 700, color: "var(--gray)", letterSpacing: ".13em", margin: 0 }}>
              ORDER & PURCHASE
            </p>
            <h1 style={{ fontSize: "clamp(30px,4.2vw,54px)", fontWeight: 900, marginTop: 12, lineHeight: 1.25 }}>
              POLARISSを購入する
            </h1>
            <p className="lead" style={{ marginTop: 12 }}>お申し込みは、この一点のみ。数量やカラーの選択はありません。</p>
          </div>

          <div className="osum-wrap rv in">
            <div className="oslip">
              <div className="row">
                <span className="lb">
                  POLARISS GPSユニット<small>本体 1台</small>
                </span>
                <span className="vl">18,000円</span>
              </div>
              <div className="row">
                <span className="lb">
                  消費税<small>10%</small>
                </span>
                <span className="vl">1,800円</span>
              </div>
              <div className="row">
                <span className="lb">
                  配送料<small>全国一律</small>
                </span>
                <span className="vl free">0円</span>
              </div>
              <div className="sum">
                <span className="lb">初回のお支払い</span>
                <span className="vl">19,800円</span>
              </div>
              <div className="after">
                <span className="lb">2回目以降 ／ 月額の通信費（税込）</span>
                <span className="vl">2,178円</span>
              </div>
            </div>

            <div className="osum-side">
              <span className="k" style={{ fontSize: 12, fontWeight: 700, color: "var(--gray)", letterSpacing: ".1em" }}>
                PURCHASE SUMMARY
              </span>
              <b style={{ display: "block", marginTop: 12, fontSize: 19, fontWeight: 900 }}>ご購入前の確認事項</b>
              
              <div style={{ marginTop: 14, padding: "14px 16px", background: "var(--warm)", borderRadius: 12, fontSize: 13, lineHeight: 1.75, color: "#3A3A35" }}>
                <p style={{ margin: "0 0 6px 0", fontWeight: 700 }}>■ 初回に含まれるもの：</p>
                <p style={{ margin: "0 0 10px 0", paddingLeft: 8 }}>19,800円（税込）- GPSユニット本体、初月通信費、送料無料</p>

                <p style={{ margin: "0 0 6px 0", fontWeight: 700 }}>■ 2回目以降の月額費用：</p>
                <p style={{ margin: "0 0 10px 0", paddingLeft: 8 }}>月額2,178円（税込）</p>

                <p style={{ margin: "0 0 6px 0", fontWeight: 700 }}>■ 購入後の流れ：</p>
                <p style={{ margin: 0, paddingLeft: 8 }}>配送・受取 ➔ Web初期設定 ➔ 愛車に設置・見守り開始</p>
              </div>

              <a href={siteConfig.buyNowUrl} target="_blank" rel="noopener noreferrer" className="btn btn-fill" style={{ marginTop: 20 }}>
                購入手続きへ
              </a>
              <div style={{ display: "flex", gap: 16, marginTop: 16, flexWrap: "wrap", fontSize: 13, fontWeight: 700 }}>
                <Link href="/price" style={{ borderBottom: "2px solid var(--gray)", paddingBottom: 2 }}>
                  料金詳細を見る →
                </Link>
                <Link href="/howto" style={{ borderBottom: "2px solid var(--gray)", paddingBottom: 2 }}>
                  使い方を見る →
                </Link>
                <Link href="/faq" style={{ borderBottom: "2px solid var(--gray)", paddingBottom: 2 }}>
                  FAQを見る →
                </Link>
              </div>
            </div>
          </div>
          <p className="osum-note" style={{ marginTop: 24, fontSize: 12, color: "#807F79" }}>
            ※表示価格はすべて税込。月額の通信費は2回目以降のお支払いです。
          </p>
        </div>
      </section>

      {/* AFTER PURCHASE */}
      <section className="sec after" id="after-purchase" style={{ padding: "clamp(72px,9vw,112px) 0", background: "var(--warm2)" }}>
        <div className="wrap">
          <div className="sec-hd rv in">
            <p className="kicker" style={{ fontSize: 13, fontWeight: 700, color: "var(--gray)", letterSpacing: ".13em", margin: 0 }}>
              AFTER PURCHASE
            </p>
            <h2 className="h2" style={{ marginTop: 16 }}>
              購入後の流れ。
            </h2>
            <p className="lead">購入手続きのあと、ユーザー登録フォームをご案内します。フォームから必要情報をご登録ください。</p>
          </div>
          <div className="flow4 rv in">
            {[
              { k: "01", b: "購入手続き", s: "お届け先・お支払い情報を入力して、購入手続きを完了します。" },
              { k: "02", b: "ユーザー登録", s: "購入後、ユーザー登録フォームをご案内します。商品到着までに必要事項をご登録ください。" },
              { k: "03", b: "POLARISSが到着", s: "端末がお手元に届きます。" },
              { k: "04", b: "愛車にセット", s: "端末を設置し、LINEから利用を開始します。" },
            ].map((f) => (
              <div key={f.k} className="fnode">
                <span className="k">{f.k}</span>
                <b>{f.b}</b>
                <small>{f.s}</small>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BEFORE YOU BUY */}
      <section className="sec chk" id="check" style={{ padding: "clamp(72px,9vw,112px) 0", background: "var(--warm2)" }}>
        <div className="wrap">
          <div className="sec-hd rv in">
            <p className="kicker" style={{ fontSize: 13, fontWeight: 700, color: "var(--gray)", letterSpacing: ".13em", margin: 0 }}>
              BEFORE YOU BUY
            </p>
            <h2 className="h2" style={{ marginTop: 16 }}>
              ご購入前に、
              <br />
              いくつか確認を。
            </h2>
            <p className="lead">「思っていたものと違った」とならないよう、先にお伝えします。</p>
          </div>

          <div className="chk-list rv in">
            {[
              { b: "クルマ・バイク向けのサービスです", s: "クルマ・バイクのために設計されています。人の見守りや持ち物さがしを目的とした製品ではありません。" },
              { b: "通知と位置確認は、LINEから", s: "専用アプリは不要ですが、LINEアカウントが必要です。ユーザー登録と車両の登録はWebから行います。" },
              { b: "位置情報と通信は、環境の影響を受けます", s: "屋内や地下では衛星の電波が届きにくく、携帯回線が届かない場所では送信や更新に時間がかかることがあります。" },
              { b: "盗難の防止・発見・回収を保証するものではありません", s: "動かされたことに気づき、位置を確認するための備えです。緊急時の警察等へのご連絡は、お客さまご自身で行っていただきます。" },
              { b: "取り付け方は、二通りから選べます", s: "車両から給電する方法と、内蔵バッテリーで使う方法があります。後者は定期的な充電が必要です。" },
              { b: "お支払い方法・契約条件", s: "最低利用期間の定めはありません。決済手段と解約時のお手続きは、購入手続きの画面でご確認ください。" },
            ].map((it) => (
              <div key={it.b}>
                <span className="ic" />
                <div>
                  <b>{it.b}</b>
                  <small>{it.s}</small>
                </div>
                <span />
              </div>
            ))}
            <div>
              <span className="ic" />
              <div>
                <b>お届けまでの日数</b>
                <small>発送までの目安と配送方法は、確定しだい掲載します。</small>
              </div>
              <span className="st" style={{ fontSize: 11, color: "var(--gray)", border: "1px solid var(--line)", borderRadius: 20, padding: "3px 8px" }}>
                公開前確認
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL PURCHASE */}
      <section className="fin" id="final" style={{ background: "#fff", padding: "clamp(72px,9vw,112px) 0" }}>
        <div className="wrap">
          <div className="fin-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, alignItems: "center" }}>
            <div className="fin-vis rv in">
              <div className="devimg" role="img" aria-label="POLARISS 本体" />
            </div>
            <div>
              <span className="name rv in" style={{ fontSize: 13, fontWeight: 700, color: "var(--gray)", letterSpacing: ".1em" }}>
                POLARISS
              </span>
              <div className="fig rv in" style={{ display: "flex", alignItems: "baseline", gap: 6, marginTop: 12 }}>
                <span className="n" style={{ fontFamily: "var(--num)", fontWeight: 800, fontSize: "clamp(48px,6vw,64px)" }}>
                  19,800
                </span>
                <span className="y" style={{ fontWeight: 700, fontSize: 22 }}>
                  円
                </span>
              </div>
              <p className="cap rv in" style={{ color: "var(--ink3)", marginTop: 8 }}>
                初回のお支払い ／ 税込・送料無料
              </p>
              <p className="month rv in" style={{ marginTop: 6, fontWeight: 700 }}>
                2回目以降　月額 2,178円（税込）
              </p>
              <div className="fin-btns rv in" style={{ marginTop: 24 }}>
                <a href={siteConfig.buyNowUrl} target="_blank" rel="noopener noreferrer" className="btn btn-fill">
                  購入手続きへ
                </a>
              </div>
              <p className="fin-link rv in" style={{ marginTop: 14 }}>
                <a href="/compare" style={{ fontSize: 14, fontWeight: 700, borderBottom: "2px solid var(--gray)", paddingBottom: 3 }}>
                  料金について詳しく
                </a>
              </p>
            </div>
          </div>
          <p className="fin-fine rv in" style={{ marginTop: 32, fontSize: 12, color: "#9A9A92", lineHeight: 1.8 }}>
            表示価格はすべて税込です。POLARISSは、盗難の防止や車両の発見・回収を保証するサービスではありません。最低利用期間の定めはありません。お支払い方法・お届けまでの日数は、正式な内容が確定しだい掲載します。
          </p>
        </div>
      </section>

      {/* Mobile sticky bar - always visible on mobile via CSS */}
      <div className="pbar show" id="pbar" style={{ display: "flex" }}>
        <div className="pbar-in wrap" style={{ width: "100%" }}>
          <div className="txt">
            <b>19,800円</b>
            <small>POLARISS ／ 税込・送料無料</small>
          </div>
          <a href={siteConfig.buyNowUrl} target="_blank" rel="noopener noreferrer" className="btn btn-white">
            購入手続きへ
          </a>
        </div>
      </div>
    </main>
  );
}
