import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import "@/components/landing/styles/price-page.css";
import "./price.css";
import { PriceInteractions } from "./PriceInteractions";

export const metadata = buildMetadata({
  title: "POLARISS | 料金",
  description:
    "料金はシンプルに。初回19,800円（税込・配送料無料）、その後は月額2,178円（税込）。POLARISS GPSユニット、通信サービス、基本サービスの利用が含まれます。",
  path: "/price",
});

export default function PricePage() {
  return (
    <main id="top">
      <PriceInteractions />

      {/* 01 HERO — phero */}
      <section className="phero">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">ホーム</Link>／<span>料金</span>
          </div>
        </div>
        <div className="phero-in wrap">
          <p className="kicker">PRICE</p>
          <h1>
            料金は、
            <br />
            シンプルに。
          </h1>
          <p className="sub">プランの選択はありません。最初に本体、そのあとは通信費だけです。</p>

          <div className="bignums">
            <div className="bn">
              <span className="k">FIRST PAYMENT</span>
              <span className="jp">最初に</span>
              <div className="fig">
                <span className="n">19,800</span>
                <span className="y">円</span>
              </div>
              <p className="note">
                税込 ／ 配送料無料
                <br />
                GPSユニット本体のお支払いです。
              </p>
            </div>
            <div className="bn-div" aria-hidden="true"></div>
            <div className="bn">
              <span className="k">FROM SECOND PAYMENT</span>
              <span className="jp">その後は</span>
              <div className="fig">
                <span className="n">2,178</span>
                <span className="y">円</span>
                <span className="per">/ 月</span>
              </div>
              <p className="note">
                税込 ／ 通信サービスの利用料
                <br />
                2回目以降は、これだけです。
              </p>
            </div>
          </div>

          <p className="phero-msg">
            最初に19,800円。
            <br />
            あとは月2,178円。
          </p>

          <div className="phero-btns">
            <Link href="/order" className="btn btn-fill">
              購入
            </Link>
            <a href="#included" className="btn btn-line">
              料金に含まれるものを見る
            </a>
          </div>
        </div>
      </section>

      {/* 02 WHAT'S INCLUDED */}
      <section className="sec inc" id="included">
        <div className="wrap">
          <p className="kicker rv" style={{ color: "var(--gray)" }}>
            WHAT&apos;S INCLUDED
          </p>
          <h2 className="rv">料金に含まれるもの。</h2>
          <p className="lead rv">この料金でご利用いただける範囲です。</p>

          <div className="inc-list rv">
            <div>
              <span className="n">01</span>
              <div>
                <b>POLARISS GPSユニット</b>
                <small>初回のお支払いに含まれます。</small>
              </div>
              <span className="tag">FIRST</span>
            </div>
            <div>
              <span className="n">02</span>
              <div>
                <b>通信サービス</b>
                <small>位置情報や通知を届けるための通信。</small>
              </div>
              <span className="tag">MONTHLY</span>
            </div>
            <div>
              <span className="n">03</span>
              <div>
                <b>基本サービスの利用</b>
                <small>移動の検知、LINEへの通知、地図での位置確認。</small>
              </div>
              <span className="tag">MONTHLY</span>
            </div>
            <div>
              <span className="n">04</span>
              <div>
                <b>配送</b>
                <small>全国どこでも配送料は無料です。</small>
              </div>
              <span className="tag">FREE</span>
            </div>
          </div>
          <p className="inc-note">※上記以外の付属品・保証・取り付け作業の取り扱いは、公開時に確認のうえ掲載します。</p>
        </div>
      </section>

      {/* 03 PRICE FAQ */}
      <section className="sec pfaq" id="faq">
        <div className="wrap">
          <div className="sec-hd rv">
            <p className="kicker">PRICE FAQ</p>
            <h2 className="h2" style={{ marginTop: 16 }}>
              料金について、
              <br />
              よくある質問。
            </h2>
          </div>

          <div className="acc2 rv" id="acc2">
            <div className="acc2-item">
              <button className="acc2-q" aria-expanded="false">
                <span>最初にいくら必要ですか？</span>
                <i>＋</i>
              </button>
              <div className="acc2-a">
                <div>
                  <p>19,800円（税込）です。本体18,000円と消費税1,800円で、配送料はかかりません。</p>
                </div>
              </div>
            </div>
            <div className="acc2-item">
              <button className="acc2-q" aria-expanded="false">
                <span>毎月いくらかかりますか？</span>
                <i>＋</i>
              </button>
              <div className="acc2-a">
                <div>
                  <p>月額2,178円（税込）です。通信費1,980円と消費税198円で、追加の費用はかかりません。</p>
                </div>
              </div>
            </div>
            <div className="acc2-item">
              <button className="acc2-q" aria-expanded="false">
                <span>送料はかかりますか？</span>
                <i>＋</i>
              </button>
              <div className="acc2-a">
                <div>
                  <p>かかりません。配送料は無料で、初回の19,800円（税込）に含まれています。</p>
                </div>
              </div>
            </div>
            <div className="acc2-item">
              <button className="acc2-q" aria-expanded="false">
                <span>月額の通信費は、何の費用ですか？</span>
                <i>＋</i>
              </button>
              <div className="acc2-a">
                <div>
                  <p>
                    位置情報や通知を届けるための通信サービス利用料です。端末にSIMが入っているため、別途の回線契約は必要ありません。
                  </p>
                </div>
              </div>
            </div>
            <div className="acc2-item">
              <button className="acc2-q" aria-expanded="false">
                <span>契約期間や解約について教えてください</span>
                <i>＋</i>
              </button>
              <div className="acc2-a">
                <div>
                  <p>
                    最低利用期間の定めはありません。解約をご希望の場合は、所定の手続きに沿ってお申し込みください。月途中の取り扱いなどの詳細は、お申し込み時の案内をご確認ください。
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 CTA */}
      <section className="pcta" id="cta">
        <div className="wrap">
          <div className="pcta-grid">
            <div>
              <p className="kicker rv">START</p>
              <h2 className="rv">
                この料金で、
                <br />
                POLARISSをはじめる。
              </h2>
              <div className="rec rv">
                <div>
                  <span className="lb">最初に</span>
                  <span className="n">19,800</span>
                  <span className="u">円（税込）</span>
                </div>
                <div>
                  <span className="lb">その後</span>
                  <span className="n">2,178</span>
                  <span className="u">円 / 月（税込）</span>
                </div>
              </div>
              <div className="pcta-btns rv">
                <Link href="/order" className="btn btn-fill">
                  購入
                </Link>
                <Link href="/howto" className="btn btn-line">
                  使い方を見る
                </Link>
              </div>
              <p className="pcta-back rv">
                <Link href="/compare">他のGPSとの違いを見る →</Link>
              </p>
            </div>
            <div className="pcta-vis rv">
              <div className="devimg" role="img" aria-label="POLARISS 本体"></div>
            </div>
          </div>
          <p className="pcta-fine rv">
            表示価格はすべて税込です。POLARISSは、盗難の防止や車両の発見・回収を保証するサービスではありません。位置情報の取得と通知は、通信状況や周囲の環境の影響を受けます。
          </p>
        </div>
      </section>
    </main>
  );
}
