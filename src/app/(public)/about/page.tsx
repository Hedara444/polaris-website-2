// @ts-nocheck
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import "@/components/landing/styles/about.css";
import { AboutMapSection } from "@/components/about/AboutMapSection";
import { AboutAnimations } from "@/components/about/AboutAnimations";

export const metadata = buildMetadata({
  title: "POLARISSとは｜GPS・相互監視・気象リスク通知で愛車を守る",
  description:
    "POLARISSの仕組みと主な機能をご紹介します。GPS位置情報、相互監視、気象リスク通知を活用し、大切なバイクや車両を見守ります。",
  path: "/about",
});

export default function AboutPage() {
  return (
    <main id="top">
      <AboutAnimations />

      {/* ==================== 01 HERO ==================== */}
      <section className="ehero">
        <div className="wrap">
          <div className="crumb"><a href="/">ホーム</a>／<span>POLARISSとは</span></div>
        </div>
        <div className="ehero-grid wrap">
          <div>
            <p className="kicker">ABOUT POLARISS</p>
            <h1>POLARISSとは</h1>
            <p style={{ fontSize: "clamp(20px,2.6vw,36px)", fontWeight: 900, lineHeight: 1.3, marginTop: "12px", color: "#131312" }}>
              POLARISSが、<br />この形になった理由。
            </p>
          </div>
          <div>
            <div className="ehero-dev">
              <div className="devimg" role="img" aria-label="POLARISS 本体"></div>
              <span className="hanno l h1a"><span className="tx"><b>ACCELERATION</b><small>動きを検知する</small></span><i></i></span>
              <span className="hanno l h2a"><span className="tx"><b>LTE Cat.M1</b><small>情報を送る</small></span><i></i></span>
              <span className="hanno r h1a"><i></i><span className="tx"><b>GPS / GNSS</b><small>位置を調べる</small></span></span>
              <span className="hanno r h2a"><i></i><span className="tx"><b>1,500mAh</b><small>内蔵バッテリー</small></span></span>
            </div>
            <div className="dev-legend">
              <span>ACCELERATION SENSOR</span><u></u><span>GPS / GNSS</span><u></u>
              <span>LTE Cat.M1</span><u></u><span>1,500mAh BATTERY</span>
            </div>
          </div>
          <p className="sub">盗難を100%防ぐことは難しい。だから私たちは、<b>「盗まれた後」に必要なこと</b>からPOLARISSを考えました。<br />このページでは、その設計の理由を順にたどります。</p>
        </div>
      </section>

      {/* ==================== CHAPTER INDEX ==================== */}
      <nav className="index">
        <div className="index-in wrap">
          <a href="/about#ch02"><span className="no">01 / DETECT</span><b>「移動」をきっかけに</b></a>
          <a href="/about#ch03"><span className="no">02 / LINE</span><b>なぜLINEなのか</b></a>
          <a href="/about#ch04"><span className="no">03 / POWER</span><b>本体に電源を持つ理由</b></a>
          <a href="/about#ch05"><span className="no">04 / TOGETHER</span><b>ユーザー同士で見守る</b></a>
        </div>
      </nav>

      {/* ==================== 02 INTRO ==================== */}
      <section className="intro" id="intro">
        <div className="wrap">
          <div className="intro-in">
            <h2 className="rv">盗難対策を、<span className="hp">「盗まれた後」から考える。</span></h2>
            <div className="words rv">
              <span>ロック</span><u></u><span>チェーン</span><u></u><span>ガレージ</span><u></u><span>アラーム</span><u></u><span>防犯カメラ</span>
            </div>
            <p className="rv">ロックやチェーンなど、盗まれないための備えはどれも大切です。<br />POLARISSは、それらに「動かされた後の備え」を加えます。</p>
          </div>
        </div>
        <div className="wrap intro-close">
          <div className="tl rv" style={{ maxWidth: "none" }}>
            <div className="tl-col before">
              <div className="tl-top"></div>
              <div className="tl-rail dash"></div>
              <div className="tl-body">
                <span className="tl-k">BEFORE THEFT</span>
                <b>盗まれないための備え</b>
                <ul className="tl-items"><li>LOCK</li><li>CHAIN</li><li>GARAGE</li><li>ALARM</li></ul>
              </div>
            </div>
            <div className="tl-col mark">
              <div className="tl-top"><span className="tl-ev">「愛車が動いた」</span></div>
              <div className="tl-rail mid"><span className="dot"></span></div>
              <div className="tl-body">
                <span className="tl-k">THE MOMENT</span>
                <b>突破された瞬間</b>
              </div>
            </div>
            <div className="tl-col after">
              <div className="tl-top"></div>
              <div className="tl-rail solid"></div>
              <div className="tl-body">
                <span className="tl-k">AFTER MOVEMENT</span>
                <b>動かされた後の備え</b>
                <ul className="tl-items"><li>DETECT</li><li>LOCATE</li><li>NOTIFY</li></ul>
                <span className="tl-brand">POLARISS</span>
              </div>
            </div>
          </div>
          <p className="tl-note rv">POLARISSは、左側を置き換えません。右側を、あとから足すための層です。</p>
        </div>
      </section>

      {/* ==================== 04 REASON 02 / DETECT ==================== */}
      <section className="ch warm" id="ch02">
        <div className="wrap ch-grid">
          <aside className="ch-rail"><span className="no">01 / 04</span><span className="tag">DETECT</span><i></i></aside>
          <div>
            <h2 className="ch-h rv">なぜ「移動」を、きっかけにするのか。</h2>
            <div className="prose">
              <p className="rv wide">停めたはずの愛車が動く。それは、できるだけ早く知りたい変化のひとつです。</p>
              <p className="big rv">POLARISSは、車両の「動き」を情報の起点にしています。</p>
            </div>

            <div className="anat" id="anat">
              <div className="anat-vis">
                <div className="anat-inner">
                  <div className="wlabel">REAL WORLD</div>
                  <span className="wchip" data-i="1"><i></i>PARKED<u>停車</u></span>
                  <span className="wsep"></span>
                  <span className="wchip" data-i="2"><i></i>CHANGE<u>車両が動く</u></span>
                  <span className="wsep long"></span>
                  <div className="wlabel">IN THE DEVICE</div>
                  <div className="devwrap">
                    <div className="devimg" role="img" aria-label="POLARISS 本体"></div>
                    <span className="hot p1" data-i="3">SENSE<i></i></span>
                    <span className="hot p2 r" data-i="4"><i></i>LOCATE</span>
                    <span className="hot p3" data-i="5">CONNECT<i></i></span>
                    <span className="hot p4 r" data-i="6"><i></i>NOTIFY</span>
                  </div>
                  <span className="wsep long"></span>
                  <div className="wlabel">TO YOU</div>
                  <div className="outnotif" data-i="6">
                    <div className="avatar"><svg viewBox="0 0 56 56" fill="currentColor"><use href="#pl-star"></use></svg></div>
                    <div>
                      <div className="hd"><u></u>LINE ／ たった今</div>
                      <b>移動を検知しました</b>
                    </div>
                  </div>
                </div>
              </div>
              <div className="anat-steps">
                <div className="anat-step" data-i="1">
                  <div className="k">01 PARKED</div>
                  <h3>停車</h3>
                  <p>駐車場に停める。ここでは、まだ何も起きていません。</p>
                </div>
                <div className="anat-step" data-i="2">
                  <div className="k">02 CHANGE</div>
                  <h3>車両が動く</h3>
                  <p>停めたはずの車体に、動きが生まれます。</p>
                </div>
                <div className="anat-div"><span>IN THE DEVICE</span><i></i></div>
                <div className="anat-step" data-i="3">
                  <div className="k">03 SENSE</div>
                  <h3>加速度センサー</h3>
                  <p>その動きを、本体のセンサーが拾います。</p>
                </div>
                <div className="anat-step" data-i="4">
                  <div className="k">04 LOCATE</div>
                  <h3>GPS / GNSS</h3>
                  <p>衛星の電波で、いる場所を割り出します。</p>
                </div>
                <div className="anat-step" data-i="5">
                  <div className="k">05 CONNECT</div>
                  <h3>LTE</h3>
                  <p>携帯回線で、その情報を送ります。</p>
                </div>
                <div className="anat-step" data-i="6">
                  <div className="k">06 NOTIFY</div>
                  <h3>LINE</h3>
                  <p>オーナーの手元へ届きます。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICE MOVIE INSERTION POINT */}

      {/* ==================== 06 REASON 03 / LINE ==================== */}
      <section className="ch" id="ch03">
        <div className="wrap ch-grid">
          <aside className="ch-rail"><span className="no">02 / 04</span><span className="tag">LINE</span><i></i></aside>
          <div>
            <h2 className="ch-h rv">なぜPOLARISSは、LINEを選んだのか。</h2>
            <div className="prose">
              <p className="rv">盗難対策は、毎日使うものではありません。だから、いざというときに「久しぶりに開くアプリ」にしたくなかった。</p>
              <p className="big rv">万が一のときほど、いつもの操作で。</p>
            </div>

            <div className="useq rv">
              <figure className="us">
                <div className="us-vis location">
                  <div className="locapp" role="img" aria-label="架空の地図にMY BIKEの現在地を表示した位置情報画面のイラスト">
                    <div className="locbar"><span>×</span><b>位置情報</b><i>•••</i></div>
                    <div className="locmap">
                      <span className="locroad"></span>
                      <svg className="map-route-ui" viewBox="0 0 1200 720" preserveAspectRatio="none" aria-hidden="true">
                        <path className="route-shadow" d="M120 565C190 525 270 492 360 472L430 462V355C430 333 448 316 470 316H620V250C620 230 636 214 656 214L830 245"></path>
                        <path className="route-line" d="M120 565C190 525 270 492 360 472L430 462V355C430 333 448 316 470 316H620V250C620 230 636 214 656 214L830 245"></path>
                        <circle className="route-start" cx="120" cy="565" r="9"></circle>
                        <circle className="route-current-ring" cx="830" cy="245" r="38"></circle>
                        <circle className="route-current-outer" cx="830" cy="245" r="18"></circle>
                        <circle className="route-current-core" cx="830" cy="245" r="10"></circle>
                      </svg>
                      <span className="route-start-label">停車位置</span>
                      <span className="locname">MY BIKE</span><span className="locpin"></span>
                    </div>
                    <div className="locdetail"><b>MY BIKE</b><small>2026/08/25 14:32<br />バッテリー：高</small></div>
                  </div>
                </div>
                <figcaption>
                  <span className="k">01 LOCATION</span>
                  <b>現在地を確認する</b>
                  <small>通知から地図を開き、愛車の位置を確認できます。</small>
                </figcaption>
              </figure>

              <span className="us-arrow">→</span>

              <figure className="us now">
                <div className="us-vis notice">
                  <div className="nvcard">
                    <div className="hd">
                      <div className="avatar"><svg viewBox="0 0 56 56" fill="currentColor"><use href="#pl-star"></use></svg></div>
                      <b>POLARISS</b><span className="t">たった今</span>
                    </div>
                    <h4>移動を検知しました</h4>
                    <p>自己監視中のMY BIKEが監視エリアの外へ移動しました。</p>
                    <span className="cta">現在地を見る</span>
                  </div>
                </div>
                <figcaption>
                  <span className="k">02 NOTICE</span>
                  <b>「移動を検知しました」</b>
                  <small>毎日開いている、同じ画面に届きます。</small>
                </figcaption>
              </figure>

              <span className="us-arrow">→</span>

              <figure className="us">
                <div className="us-vis">
                  <div className="dtalk" role="img" aria-label="POLARISSの通知が並ぶ架空のLINEトーク一覧のイラスト">
                    <div className="dt-status"><b>9:41</b><span>● ● ●</span></div>
                    <div className="dt-tabs"><b>トーク</b><span>友だち</span></div>
                    <div className="dt-search">検索</div>
                    <div className="dt-row"><span className="ic brand">P</span><span className="tx"><b>POLARISS</b><small>移動を検知しました</small></span><span className="unread">1</span></div>
                    <div className="dt-row"><span className="ic ride">R</span><span className="tx"><b>週末ライド</b><small>次のルートを共有しました</small></span><span className="meta">8:52</span></div>
                    <div className="dt-row"><span className="ic maint">M</span><span className="tx"><b>メンテナンス予約</b><small>点検のご予約について</small></span><span className="meta">昨日</span></div>
                    <div className="dt-row"><span className="ic family">F</span><span className="tx"><b>家族グループ</b><small>了解です、ありがとう</small></span><span className="meta">昨日</span></div>
                    <div className="dt-row"><span className="ic news">N</span><span className="tx"><b>地域のお知らせ</b><small>新しい記事が届きました</small></span><span className="meta">月</span></div>
                    <div className="dt-bottom"><span>ホーム</span><span className="on">トーク</span><span>VOOM</span><span>ニュース</span><span>アプリ</span></div>
                  </div>
                </div>
                <figcaption>
                  <span className="k">03 LINE</span>
                  <b>いつものトークに届く</b>
                  <small>ほかのトークと同じ一覧で、POLARISSの通知に気づけます。</small>
                </figcaption>
              </figure>
            </div>

            <p className="line-cap rv" style={{ marginTop: "clamp(24px,3vw,34px)", textAlign: "left" }}>探す必要も、思い出す必要もありません。異変は、家族や友人からのメッセージと同じ場所に届きます。</p>
          </div>
        </div>
      </section>

      {/* ==================== INTERLUDE ==================== */}
      <figure className="interlude">
        <div className="bgfill" role="img" aria-label="愛車の横で手元を確認する"></div>
        <figcaption>取り付けたら、あとは日常のなかに。</figcaption>
      </figure>

      {/* ==================== 07 REASON 04 / POWER ==================== */}
      <section className="ch dark" id="ch04">
        <div className="wrap ch-grid">
          <aside className="ch-rail"><span className="no">03 / 04</span><span className="tag">POWER</span><i></i></aside>
          <div>
            <h2 className="ch-h rv">なぜPOLARISSは、<br />本体に電源を持つのか。</h2>

            <div className="split pw">
              <div className="prose">
                <p className="rv">電源は、車両側の状態に左右されます。盗難の場面では、バッテリーが外されたり、配線が切られたりする可能性もあります。</p>
                <p className="big rv">車両だけに、<br />電源を頼らないために。</p>
                <p className="rv">POLARISSは、二つの電源を使える設計です。</p>
              </div>
              <div className="split-vis">
                <div className="dual rv">
                  <div className="dl-node"><span className="k">01 VEHICLE POWER</span><b>車両からの給電</b><small>取り付け方法に応じて対応</small></div>
                  <span className="dl-arrow" aria-hidden="true"></span>
                  <div className="dl-dev"><div className="devimg" role="img" aria-label="POLARISS 本体"></div></div>
                  <span className="dl-arrow up" aria-hidden="true"></span>
                  <div className="dl-node"><span className="k">02 INTERNAL</span><b>内蔵バッテリー</b><small>スタンドアローン時は約4週間が目安</small></div>
                </div>
              </div>
            </div>
            <div className="prose after-split">
              <p className="fine rv">※使用できる時間は、取り付け方法・通信状況・気温・設置環境などの条件によって変わります。</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 08 REASON 05 / TOGETHER ==================== */}
      <section className="ch mutual" id="ch05">
        <div className="wrap ch-grid">
          <aside className="ch-rail"><span className="no">04 / 04</span><span className="tag">TOGETHER</span><i></i></aside>
          <div>
            <h2 className="ch-h rv">なぜPOLARISSは、<br />ユーザー同士で見守るのか。</h2>
            <div className="split">
              <div className="prose">
                <p className="rv">位置がわかっても、オーナー自身がその場所にいるとは限りません。</p>
                <p className="rv">遠く離れた土地かもしれない。真夜中かもしれない。GPSは場所を教えてくれますが、そこに人がいるかどうかまでは変えられません。</p>
              </div>
              <div className="split-vis">
                <div className="cdiag rv">
                  <svg viewBox="0 0 520 310" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
                    <circle cx="330" cy="112" r="66" fill="rgba(152,153,153,.13)" stroke="#989999" strokeWidth="1.4" strokeDasharray="4 6"></circle>
                    <path d="M84 240 C 160 214 236 176 296 132" fill="none" stroke="#C6C2B9" strokeWidth="1.5" strokeDasharray="3 8"></path>
                    <circle cx="330" cy="112" r="7" fill="#1A1A18"></circle>
                    <circle cx="372" cy="158" r="5" fill="#989999"></circle>
                    <circle cx="76" cy="246" r="7.5" fill="none" stroke="#1A1A18" strokeWidth="2"></circle>
                  </svg>
                  <span className="cd-lab cd-l1">愛車の位置<u>わかる</u></span>
                  <span className="cd-lab cd-l3 gray">近くのPOLARISSユーザー</span>
                  <span className="cd-lab cd-l2">オーナー<u>その場所にいるとは限らない</u></span>
                  <span className="cd-dist">DISTANCE</span>
                </div>
              </div>
            </div>

            <div className="prose after-split">
              <p className="big rv">一人で確かめるだけでは、<br />届かないことがある。</p>
              <p className="rv wide">そこでPOLARISSは、必要なときだけ、周辺のPOLARISSユーザーへ情報をつなげられる仕組みを考えました。それが「相互監視」です。</p>
              <p className="rv" style={{ marginTop: "16px" }}><span className="badge">実用新案申請中 / 表記確認</span></p>
              <div className="switches rv">
                <div className="sw">
                  <span className="lb">相互監視の受付</span>
                  <span className="row"><span className="tgl on"><i></i></span><span className="st">ON</span></span>
                  <small>初期設定はONですが、いつでもOFFにできます。</small>
                </div>
                <div className="sw">
                  <span className="lb">相互監視の開始</span>
                  <span className="row"><span className="tgl"><i></i></span><span className="st">OFF</span></span>
                  <small>ふだんはOFF。必要と判断したときだけ、オーナー自身が開始します。</small>
                </div>
              </div>
            </div>

            <div className="mut-wrap">
              <AboutMapSection />
              <p className="m-disc rv">※相互監視の仕組みを簡略化したイメージです。実際の画面・表示内容とは異なります。</p>

              <div className="m-opt rv"><i></i>相互監視の受付・開始は、それぞれON / OFFを選択できます。初期設定では受付がONですが、いつでもOFFに変更できます。</div>

              <div className="safe-note rv">
                <p>相互監視の目的は、発見につながる情報を共有することです。通知を受け取った場合も、盗難車両や不審者への直接的な接触を推奨するものではありません。安全を最優先とし、必要に応じて警察等への情報提供にご活用ください。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 09 HONESTY ==================== */}
      <section className="honest" id="honest">
        <div className="wrap">
          <p className="kicker rv">HONESTLY</p>
          <h2 className="rv" style={{ marginTop: "18px" }}>POLARISSは、<br />万能な盗難防止装置ではありません。</h2>
          <p className="lede rv">できないことを曖昧にしたままでは、いざというときに困るのはオーナーです。だから、はじめにはっきりさせておきます。</p>

          <div className="cc rv">
            <div className="yes">
              <div className="lab">CAN</div>
              <div className="jp">できること</div>
              <ul>
                <li>愛車の移動を検知する</li>
                <li>異変を、いつものLINEへ知らせる</li>
                <li>地図で位置と移動を確認する</li>
                <li>相互監視による情報共有につなげる</li>
              </ul>
            </div>
            <div className="rule" aria-hidden="true"></div>
            <div className="no">
              <div className="lab">CANNOT</div>
              <div className="jp">できないこと</div>
              <ul>
                <li>盗難を100%防ぐ</li>
                <li>必ず車両を発見する</li>
                <li>車両の回収を保証する</li>
                <li>犯人を追跡・確保する</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 10 PRODUCT ANATOMY + SPEC ==================== */}
      <section className="anatomy" id="anatomy">
        <div className="wrap">
          <p className="kicker rv">PRODUCT ANATOMY</p>
          <h2 className="ch-h rv" style={{ marginTop: "18px" }}>手のひらサイズの、その中身。</h2>

          <div className="dev-stage rv">
            <div className="devimg" role="img" aria-label="POLARISS 本体"></div>
            <div className="callout l c1"><div className="tx"><b>ACCELERATION</b><small>車両の動きをとらえる</small></div><i></i></div>
            <div className="callout l c2"><div className="tx"><b>GPS / GNSS</b><small>いる場所を調べる</small></div><i></i></div>
            <div className="callout l c3"><div className="tx"><b>TEMPERATURE</b><small>周囲の状態を把握する</small></div><i></i></div>
            <div className="callout r c1"><div className="tx"><b>LTE Cat.M1</b><small>情報を送る携帯回線</small></div><i></i></div>
            <div className="callout r c2"><div className="tx"><b>1,500mAh</b><small>本体に内蔵したバッテリー</small></div><i></i></div>
            <div className="callout r c3"><div className="tx"><b>USB / nano SIM</b><small>給電と通信のための接点</small></div><i></i></div>
          </div>

          <dl className="spec-tbl rv">
            <div><dt>MODEL</dt><dd>Kyocera LU1CMO13</dd></div>
            <div><dt>NETWORK</dt><dd>LTE Cat.M1</dd></div>
            <div><dt>SIZE</dt><dd>約 83 × 49 × 13.8 mm</dd></div>
            <div><dt>GNSS</dt><dd>GPS ／ GLONASS ／ みちびき（QZSS）</dd></div>
            <div><dt>WEIGHT</dt><dd>約 63 g</dd></div>
            <div><dt>SENSOR</dt><dd>加速度センサー ／ 温度センサー</dd></div>
            <div><dt>BATTERY</dt><dd>1,500 mAh（内蔵）</dd></div>
            <div><dt>INTERFACE</dt><dd>外部USB ／ nano SIM</dd></div>
          </dl>
          <p className="spec-note">※記載のない項目については、公開時に内容を確認のうえ掲載します。仕様は改良のため予告なく変更となる場合があります。</p>
        </div>
      </section>

      {/* ==================== 11 POSITIONING ==================== */}
      <section className="pos" id="pos">
        <div className="wrap">
          <p className="kicker rv">POSITIONING</p>
          <h2 className="rv">盗まれないために。<br />盗まれたあとにも。</h2>
          <div className="split">
            <div className="rv">
              <span className="k">EXISTING</span>
              <b>盗まれないための備え</b>
              <small>ロック、チェーン、ガレージ、アラーム、防犯カメラ。POLARISSは、これらを置きかえるものではありません。</small>
            </div>
            <div className="rv">
              <span className="k">POLARISS</span>
              <b>盗難対策の、「最後の一層」。</b>
              <small>それでも動かされたときに、気づき, 場所を知るための層。これまでの備えの上に、重ねてお使いいただけます。</small>
            </div>
          </div>
          <p className="disc rv">POLARISSは、盗難の防止や車両の回収を保証するサービスではありません。位置情報は原則として取得できますが、通信状況や周囲の環境に左右されることがあります。</p>
        </div>
      </section>

      {/* ==================== 12 NEXT ACTION ==================== */}
      <section className="next" id="next">
        <div className="wrap">
          <p className="kicker rv">NEXT</p>
          <h2 className="rv">設計の理由は、ここまで。<br />次に知りたいことへ。</h2>
          <div className="nlist rv">
            <a href="/howto"><span className="no">01</span><span><b>実際の使い方を知る</b><small>購入から設置、通知が届くまでの流れ。</small></span><span className="go">使い方 →</span></a>
            <a href="/compare"><span className="no">02</span><span><b>他のGPSとの違いを知る</b><small>見守り・紛失防止・警備との、目的の違い。</small></span><span className="go">比較する →</span></a>
            <a href="/price"><span className="no">03</span><span><b>費用を確認する</b><small>初回費用と月額の内訳。</small></span><span className="go">料金 →</span></a>
          </div>
          <div className="next-btns rv">
            <a href="/order" className="btn btn-fill">購入</a>
            <span className="next-fine">初回 19,800円（税込・送料無料）／ 月額 2,178円（税込）</span>
          </div>
        </div>
      </section>

    </main>
  );
}

