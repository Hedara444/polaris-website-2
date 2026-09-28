// @ts-nocheck
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import "@/components/landing/styles/howto.css";
import { HowtoInteractions } from "@/components/howto/HowtoInteractions";

export const metadata = buildMetadata({
  title: "POLARISSの使い方｜GPSユニットの利用開始から見守りまで",
  description:
    "POLARISSの購入後の流れ、GPSユニットの利用開始方法、位置情報の確認方法をご案内します。初めての方にも分かりやすく説明します。",
  path: "/howto",
});

export default function HowtoPage() {
  return (
    <main id="top">
      <HowtoInteractions />

      {/* ==================== 01 HERO ==================== */}
      <section className="jhero">
        <div className="wrap">
          <div className="crumb">
            <Link href="/">ホーム</Link>／<span>の使い方</span>
          </div>
        </div>
        <div className="jhero-in wrap">
          <p className="kicker">HOW TO USE</p>
          <h1>POLARISSの使い方</h1>
          <p style={{ fontSize: "clamp(20px,2.6vw,36px)", fontWeight: 900, lineHeight: 1.3, marginTop: "12px", color: "#131312" }}>
            はじめるのも、
            <br />
            使うのも、シンプルに。
          </p>
          <p className="sub">購入から設定、愛車へのセット、ふだんの確認、そして万が一の通知まで。時間の流れに沿ってご紹介します。</p>
          <div className="jhero-btns">
            <a href="#overview" className="btn btn-fill">
              全体の流れを見る
            </a>
            <a href="#line" className="btn btn-line">
              LINEでできることを見る
            </a>
          </div>
        </div>
      </section>

      <nav className="prail">
        <div className="prail-in wrap">
          <a href="#p1">
            <span className="n">PHASE 01</span>
            <b>はじめる</b>
            <small>購入して、設定して、愛車に取り付けるまで。</small>
          </a>
          <a href="#p2">
            <span className="n">PHASE 02</span>
            <b>ふだん</b>
            <small>ほとんど何もしない時間が、いちばん長い。</small>
          </a>
          <a href="#p3">
            <span className="n">PHASE 03</span>
            <b>もしものとき</b>
            <small>通知が届いてから、あなたがすること。</small>
          </a>
        </div>
      </nav>

      {/* ==================== 02 OVERVIEW ==================== */}
      <section className="sec ov" id="overview">
        <div className="wrap">
          <div className="sec-hd rv">
            <p className="kicker">OVERVIEW</p>
            <h2 className="h2" style={{ marginTop: 16 }}>
              使いはじめるまでの、五つの区切り。
            </h2>
            <p className="lead">難しい工程はありません。順に進めば、見守りが始まります。</p>
          </div>
          <div className="route5 rv">
            <div className="rnode">
              <span className="k">01 BUY</span>
              <b>購入</b>
              <small>GPS本体と通信のサブスクリプション。</small>
            </div>
            <div className="rnode">
              <span className="k">02 SET UP</span>
              <b>Webで登録</b>
              <small>ユーザー名・車両名・愛車の写真を登録。</small>
            </div>
            <div className="rnode">
              <span className="k">03 SET</span>
              <b>愛車にセットする</b>
              <small>取り付ける、または車両に入れて使います。</small>
            </div>
            <div className="rnode now">
              <span className="k">04 READY</span>
              <b>見守り開始</b>
              <small>ここから先は、ふだん通りに。</small>
            </div>
            <div className="rnode">
              <span className="k">05 NOTICE</span>
              <b>異変があればLINEへ</b>
              <small>移動を検知するとお知らせが届きます。</small>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 03 PHASE 01 ==================== */}
      <section className="phase-hd" id="p1">
        <div className="wrap rv">
          <span className="tag">
            PHASE 01<u>はじめる</u>
          </span>
          <h2>まずは、使いはじめるまで。</h2>
          <p>やることは三つだけ。ここを越えれば、あとはふだん通りで大丈夫です。</p>
        </div>
      </section>

      <section className="scene a">
        <div className="wrap">
          <div className="scene-grid">
            <div className="scene-txt rv">
              <span className="stepno">01</span>
              <h3>POLARISSを購入する</h3>
              <p>GPS本体と、通信のサブスクリプション。<br />届くのは手のひらに収まる端末ひとつです。</p>
              <p className="fine">初回に本体費用、そのあとは通信費のみ。</p>
              <div className="go">
                <Link href="/price" className="txtlink">
                  料金を見る →
                </Link>
              </div>
            </div>
            <div className="devstage rv">
              <div className="devimg" role="img" aria-label="POLARISS 本体"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="scene b">
        <div className="wrap">
          <div className="scene-grid flip">
            <div className="scene-txt rv">
              <span className="stepno">02</span>
              <h3>Webでアカウントと車両を登録</h3>
              <p>ユーザー名と車両名を入力し、愛車の写真をアップロード。専用アプリのインストールは必要ありません。</p>
              <p className="fine">登録後の通知と位置確認は、LINEから受け取れます。</p>
            </div>
            <div className="rv" style={{ justifySelf: "center" }}>
              <div className="browser">
                <div className="br-bar">
                  <i></i>
                  <i></i>
                  <i></i>
                  <span className="br-url">polariss — 愛車の登録</span>
                </div>
                <div className="br-body">
                  <div className="br-steps">
                    <span>01 ACCOUNT</span>
                    <u></u>
                    <span className="on">02 VEHICLE</span>
                    <u></u>
                    <span>03 DONE</span>
                  </div>
                  <h4>愛車を登録する</h4>
                  <div className="br-field">
                    <label>ユーザー名</label>
                    <div className="in">yuki</div>
                  </div>
                  <div className="br-field">
                    <label>車両名</label>
                    <div className="in">Katana</div>
                  </div>
                  <div className="br-field">
                    <label>愛車の写真</label>
                    <div className="br-upload">
                      <span className="thumb" role="img" aria-label="登録した愛車の写真"></span>
                      <span className="up">
                        <b>katana_01.jpg</b>
                        <small>アップロード済み</small>
                      </span>
                      <span className="chg">変更</span>
                    </div>
                  </div>
                  <div className="br-btn">この内容で登録する</div>
                  <p className="br-note">登録した車両名は、LINEに届く通知にも表示されます。</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="scene b" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <div className="scene-grid">
            <div className="scene-txt rv">
              <span className="stepno">03</span>
              <h3>愛車にセットする</h3>
              <p>車体に取り付けても、シート下やバッグに入れておいても構いません。</p>
              <div className="go">
                <a href="#install" className="txtlink">
                  セットのしかたを見る →
                </a>
              </div>
            </div>
            <div className="photoframe bike rv">
              <div className="bgfill" role="img" aria-label="バイクに取り付けたイメージ"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 04 PHASE 02 ==================== */}
      <section className="quiet" id="p2">
        <div className="bgfill" role="img" aria-label="いつも通りの愛車"></div>
        <div className="scrim"></div>
        <div className="quiet-in">
          <span className="tag kicker rv">PHASE 02 ／ ふだん</span>
          <h2 className="rv">
            ふだんは、
            <br />
            ほとんど何もしない。
          </h2>
          <p className="rv">毎日ひらいて確認するサービスではありません。愛車には、いつも通り乗っていただいて大丈夫です。</p>
          <div className="quiet-do rv">
            <div>
              <i></i>
              <span>気になったときだけ、LINEから状態を見る</span>
            </div>
            <div>
              <i></i>
              <span>必要があれば、そのまま位置を確認する</span>
            </div>
            <div>
              <i></i>
              <span>停める場所が変わったら、設定を見直す</span>
            </div>
          </div>
          <p className="rv" style={{ fontSize: "12.5px", color: "#8E8E86", maxWidth: "40em" }}>
            POLARISSが動くのは、何かが起きたときだけです。
          </p>
        </div>
      </section>

      {/* ==================== 05 PHASE 03 ==================== */}
      <section className="sec act" id="p3">
        <div className="wrap">
          <div className="sec-hd rv">
            <span className="tag kicker">PHASE 03 ／ もしものとき</span>
            <h2 className="h2" style={{ marginTop: 16 }}>
              通知が届いてから、
              <br />
              あなたがすること。
            </h2>
            <p className="lead">あわてなくて大丈夫です。順番に進められるよう、やることを並べておきます。</p>
          </div>

          <div className="act-flow">
            <div className="act-steps">
              <div className="act-step rv">
                <div className="k">01 NOTICE</div>
                <h3>LINEの通知に気づく</h3>
                <p>移動を検知すると、いつものトークにお知らせが届きます。</p>
              </div>
              <div className="act-step rv">
                <div className="k">02 CHECK</div>
                <h3>心当たりがあるか確かめる</h3>
                <p>家族が動かした、ということもあります。通知の時刻と場所を見て、状況を確かめます。</p>
              </div>
              <div className="act-step rv">
                <div className="k">03 LOCATE</div>
                <h3>地図で位置を確認する</h3>
                <p>通知からそのまま地図へ。現在地と移動をたどれます。</p>
              </div>
              <div className="act-step rv safe">
                <div className="k">04 SAFETY</div>
                <h3>ご自身では追いかけない</h3>
                <p>車両や相手に近づくことはお控えください。安全が最優先です。</p>
              </div>
              <div className="act-step rv">
                <div className="k">05 REPORT</div>
                <h3>警察等へ連絡し、情報を伝える</h3>
                <p>警察等へご連絡ください。確認した位置や移動の情報が、そのまま伝える材料になります。</p>
              </div>
              <div className="act-step rv">
                <div className="k">06 TOGETHER</div>
                <h3>必要に応じて相互監視を開始する</h3>
                <p>開始するかどうかは、オーナーご自身で選べます。</p>
                <div className="go" style={{ marginTop: 14 }}>
                  <Link href="/about" className="txtlink">
                    相互監視について詳しく見る →
                  </Link>
                </div>
              </div>
            </div>

            <div className="act-vis rv">
              <div className="phone">
                <div className="screen">
                  <div className="app-ui monitor-ui alerting" role="img" aria-label="自己監視エリアの外への移動を検知したイラスト画面">
                    <div className="app-top">
                      <span className="back">‹</span>
                      <b>自己監視</b>
                      <span className="dots">•••</span>
                    </div>
                    <div className="monitor-control-ui">
                      <span>
                        <b>MY BIKE</b>
                        <small>自己監視を実行中</small>
                      </span>
                      <span className="toggle-ui">
                        <i></i>
                      </span>
                    </div>
                    <div className="ui-map">
                      <span className="ui-road r1"></span>
                      <span className="ui-road r2"></span>
                      <span className="ui-road r3"></span>
                      <svg className="map-route-ui" viewBox="0 0 1200 720" preserveAspectRatio="none" aria-hidden="true">
                        <path className="route-shadow" d="M430 462V355C430 333 448 316 470 316H620V250C620 230 636 214 656 214L830 245" />
                        <path className="route-line" d="M430 462V355C430 333 448 316 470 316H620V250C620 230 636 214 656 214L830 245" />
                        <circle className="route-start" cx="430" cy="462" r="9" />
                        <circle className="route-current-ring" cx="830" cy="245" r="38" />
                        <circle className="route-current-outer" cx="830" cy="245" r="18" />
                        <circle className="route-current-core" cx="830" cy="245" r="10" />
                      </svg>
                      <span className="monitor-ring-ui"></span>
                      <span className="monitor-center-ui"></span>
                      <div className="monitor-alert-ui">
                        <i></i>
                        <span>
                          <b>移動を検知しました</b>
                          <small>監視エリアの外へ移動しています。</small>
                        </span>
                      </div>
                      <div className="monitor-status-ui">
                        <b>
                          <i></i>エリア外への移動を検知
                        </b>
                        <small>MY BIKE ／ たった今</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="act-cap">自己監視エリアを出ると、LINEへ通知。</p>
            </div>
          </div>

          <div className="safe-note rv">
            <p>POLARISSは、盗難の防止や車両の発見・回収を保証するサービスではありません。緊急時の警察等へのご連絡は、お客さまご自身でお願いいたします。</p>
          </div>
        </div>
      </section>

      {/* ==================== 06 INSTALLATION ==================== */}
      <section className="sec install" id="install">
        <div className="wrap">
          <div className="sec-hd rv">
            <p className="kicker">INSTALLATION</p>
            <h2 className="h2" style={{ marginTop: 16 }}>
              クルマにも。
              <br />
              バイクにも。
            </h2>
            <p className="lead">車体に取り付けて使う方も、入れておくだけで使う方もいます。</p>
          </div>

          <div className="inst-grid rv">
            <div className="inst-item car">
              <div className="ph">
                <div className="bgfill" role="img" aria-label="クルマへの取り付けイメージ"></div>
              </div>
              <span className="k">FOR CARS</span>
              <b>クルマ</b>
              <p>車内に取り付けるほか、収納スペースに入れておく使い方も。</p>
            </div>
            <div className="inst-item moto">
              <div className="ph">
                <div className="bgfill" role="img" aria-label="バイクへの取り付けイメージ"></div>
              </div>
              <span className="k">FOR MOTORCYCLES</span>
              <b>バイク</b>
              <p>シート下やトップケース、車載バッグに入れておく使い方もよく選ばれます。</p>
            </div>
          </div>

          <div className="pwr rv">
            <div>
              <span className="k">01 WIRED</span>
              <b>車両から給電して使う</b>
              <p>車両の電源とつないで使う方法。ふだんの充電を意識する必要がありません。</p>
              <span className="tagline">取り付けあり ／ 充電の手間なし</span>
            </div>
            <div>
              <span className="k">02 STANDALONE</span>
              <b>内蔵バッテリーだけで使う</b>
              <p>入れておくだけで使う方法。配線は不要で、電源は4週間程度もちます。</p>
              <span className="tagline">取り付けなし ／ 約4週間が目安</span>
            </div>
          </div>

          <dl className="inst-facts rv">
            <div>
              <dt>電源</dt>
              <dd>内蔵バッテリー（1,500mAh）／ スタンドアローン時は約4週間が目安 ／ 車両からの給電にも対応</dd>
            </div>
            <div>
              <dt>充電</dt>
              <dd>外部USB（車両給電を使わない場合は、定期的な充電が必要です）</dd>
            </div>
            <div>
              <dt>本体サイズ</dt>
              <dd>約 83 × 49 × 13.8 mm ／ 約 63 g</dd>
            </div>
            <div>
              <dt>通信</dt>
              <dd>LTE Cat.M1（nano SIM）／ 通信費は月額料金に含まれます</dd>
            </div>
          </dl>
          <p className="inst-note">※取り付け位置や稼働時間は、車種・通信状況・気温・設置環境などの条件によって変わります。</p>
        </div>
      </section>

      {/* ==================== 07 REAL LINE EXPERIENCE ==================== */}
      <section className="sec lswitch" id="line">
        <div className="wrap">
          <div className="sec-hd rv">
            <p className="kicker">ON LINE</p>
            <h2 className="h2" style={{ marginTop: 16 }}>
              操作も、確認も。
              <br />
              いつものLINEから。
            </h2>
            <p className="lead">登録はWebから。そのあとの確認と通知は、LINEで。項目を選ぶと、そのときの画面が表示されます。</p>
          </div>

          <div className="lsw" id="lsw">
            <div className="sw-nav">
              <button className="on" data-s="1">
                <span className="k">01 STATUS</span>
                <b>状態を見る</b>
                <p>LINEのトークから、車両の状態と位置情報カードを確認できます。</p>
              </button>
              <button data-s="2">
                <span className="k">02 LOCATION</span>
                <b>位置を確認する</b>
                <p>地図を開いて、車両の現在地と状態を確認できます。</p>
              </button>
              <button data-s="3">
                <span className="k">03 SELF MONITORING</span>
                <b>自己監視を設定する</b>
                <p>駐車位置を基準に自己監視をONにし、監視エリアを確認します。</p>
              </button>
              <button data-s="4">
                <span className="k">04 NOTICE</span>
                <b>通知を受け取る</b>
                <p>自己監視中にエリアを出ると、LINEへ通知が届きます。</p>
              </button>
            </div>

            <div className="sw-stage rv">
              <div className="phone">
                <div className="screen">
                  <div className="sc on" data-s="1">
                    <div className="app-ui line-ui" role="img" aria-label="LINEトークに届いたMY BIKEの位置情報カードのイラスト">
                      <div className="app-top dark">
                        <span className="back">‹</span>
                        <b>POLARISS</b>
                        <span className="dots">•••</span>
                      </div>
                      <div className="chat-space">
                        <div className="chat-date">今日 14:32</div>
                        <div className="chat-row-ui">
                          <div className="chat-avatar-ui">P</div>
                          <div className="place-card-ui">
                            <div className="card-map-ui">
                              <span className="map-pin-ui"></span>
                            </div>
                            <div className="place-copy-ui">
                              <b>MY BIKE</b>
                              <small>
                                2026/08/25 14:32
                                <br />
                                バッテリー：高
                              </small>
                            </div>
                            <div className="location-link-ui">
                              <span>
                                <i></i>Location
                              </span>
                              <span>›</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sc" data-s="2">
                    <div className="app-ui map-ui" role="img" aria-label="MY BIKEの現在地を確認する地図のイラスト">
                      <div className="app-top">
                        <span className="back">×</span>
                        <b>位置情報</b>
                        <span className="dots">•••</span>
                      </div>
                      <div className="ui-map">
                        <span className="ui-road r1"></span>
                        <span className="ui-road r2"></span>
                        <span className="ui-road r3"></span>
                        <svg className="map-route-ui" viewBox="0 0 1200 720" preserveAspectRatio="none" aria-hidden="true">
                          <path className="route-shadow" d="M120 565C190 525 270 492 360 472L430 462V355C430 333 448 316 470 316H620V250C620 230 636 214 656 214L830 245" />
                          <path className="route-line" d="M120 565C190 525 270 492 360 472L430 462V355C430 333 448 316 470 316H620V250C620 230 636 214 656 214L830 245" />
                          <circle className="route-start" cx="120" cy="565" r="9" />
                          <circle className="route-current-ring" cx="830" cy="245" r="38" />
                          <circle className="route-current-outer" cx="830" cy="245" r="18" />
                          <circle className="route-current-core" cx="830" cy="245" r="10" />
                        </svg>
                        <span className="route-start-label">停車位置</span>
                        <span className="pin-label-ui">現在地</span>
                        <span className="map-pin-ui"></span>
                      </div>
                      <div className="detail-ui">
                        <b>MY BIKE</b>
                        <small>
                          2026/08/25 14:32
                          <br />
                          バッテリー：高
                        </small>
                      </div>
                    </div>
                  </div>

                  <div className="sc" data-s="3">
                    <div className="app-ui monitor-ui" role="img" aria-label="MY BIKEの自己監視エリアを表示する地図のイラスト">
                      <div className="app-top">
                        <span className="back">‹</span>
                        <b>自己監視</b>
                        <span className="dots">•••</span>
                      </div>
                      <div className="monitor-control-ui">
                        <span>
                          <b>MY BIKE</b>
                          <small>駐車位置を基準に監視</small>
                        </span>
                        <span className="toggle-ui">
                          <i></i>
                        </span>
                      </div>
                      <div className="ui-map">
                        <span className="ui-road r1"></span>
                        <span className="ui-road r2"></span>
                        <span className="ui-road r3"></span>
                        <span className="monitor-ring-ui"></span>
                        <span className="monitor-center-ui"></span>
                        <div className="monitor-status-ui">
                          <b>
                            <i></i>自己監視 ON
                          </b>
                          <small>監視エリア ／ 半径100m</small>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="sc" data-s="4">
                    <div className="app-ui line-ui" role="img" aria-label="LINEトークに届いた移動検知通知のイラスト">
                      <div className="app-top dark">
                        <span className="back">‹</span>
                        <b>POLARISS</b>
                        <span className="dots">•••</span>
                      </div>
                      <div className="chat-space">
                        <div className="chat-date">今日 14:35</div>
                        <div className="chat-row-ui">
                          <div className="chat-avatar-ui">P</div>
                          <div className="line-message-ui">
                            <b>移動を検知しました</b>
                            <small>自己監視中のMY BIKEが監視エリアの外へ移動しました。</small>
                            <span className="cta">位置を確認する</span>
                          </div>
                        </div>
                        <div className="message-time-ui">たった今</div>
                      </div>
                    </div>
                  </div>
                  <div className="notch"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 08 BEFORE YOU START ==================== */}
      <section className="sec before" id="before">
        <div className="wrap">
          <div className="sec-hd rv">
            <p className="kicker">BEFORE YOU START</p>
            <h2 className="h2" style={{ marginTop: 16 }}>
              使う前に、
              <br />
              知っておきたいこと。
            </h2>
          </div>
          <div className="dis rv">
            <div>
              <span className="n">01</span>
              <div>
                <b>位置情報には誤差が生じます</b>
                <p>建物のあいだや屋内、地下では衛星の電波が届きにくく、実際の場所と離れることがあります。</p>
              </div>
            </div>
            <div>
              <span className="n">02</span>
              <div>
                <b>通信環境によって届き方が変わります</b>
                <p>携帯回線の届かない場所では、送信や更新に時間がかかることがあります。</p>
              </div>
            </div>
            <div>
              <span className="n">03</span>
              <div>
                <b>盗難の防止・発見・回収を保証するものではありません</b>
                <p>動かされたことに気づき、位置を確認するための備えです。ほかの盗難対策とあわせてお使いください。</p>
              </div>
            </div>
            <div>
              <span className="n">04</span>
              <div>
                <b>緊急時のご連絡はお客さまご自身で</b>
                <p>警察等への通報や届け出は、お客さまご自身で行っていただきます。</p>
              </div>
            </div>
            <div>
              <span className="n">05</span>
              <div>
                <b>取り付けずに使う場合は、充電が必要です</b>
                <p>使用できる時間は環境によって変わります。定期的に残量をご確認ください。</p>
              </div>
            </div>
            <div>
              <span className="n">06</span>
              <div>
                <b>相互監視は任意の機能です</b>
                <p>受付・開始はそれぞれON / OFFを選べます。初期設定は受付ONで、いつでも変更できます。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== 09 NEXT ACTION ==================== */}
      <section className="next" id="next">
        <div className="wrap">
          <p className="kicker rv">NEXT</p>
          <h2 className="rv">
            使い方は、ここまで。
            <br />
            次に知りたいことへ。
          </h2>
          <div className="nlist rv">
            <Link href="/compare">
              <span className="no">01</span>
              <span>
                <b>他のGPSとの違いを知る</b>
                <small>見守り・紛失防止・警備との、目的の違い。</small>
              </span>
              <span className="go">比較する →</span>
            </Link>
            <Link href="/price">
              <span className="no">02</span>
              <span>
                <b>費用を確認する</b>
                <small>初回費用と月額の内訳。</small>
              </span>
              <span className="go">料金 →</span>
            </Link>
            <Link href="/about">
              <span className="no">03</span>
              <span>
                <b>設計の理由を知る</b>
                <small>なぜこの形になったのか。</small>
              </span>
              <span className="go">POLARISSとは →</span>
            </Link>
          </div>
          <div className="next-btns rv">
            <Link href="/order" className="btn btn-fill">
              購入
            </Link>
            <span className="next-fine">初回 19,800円（税込・送料無料）／ 月額 2,178円（税込）</span>
          </div>
        </div>
      </section>
    </main>
  );
}
