import "./styles/story.css";
export function StorySection() {
  return (
    <section className="story" id="story">
      <div className="wrap">
        <div className="story-hd rv">
          <p className="eyebrow">できること</p>
          <h2 className="h2">
            愛車の異変を、
            <br />
            すぐ知る。すぐ確認する。
          </h2>
          <p className="story-lead">移動を検知してLINEへ通知。そのまま地図で現在地を確認できます。</p>
        </div>

        <div className="beat">
          <div className="beat-txt rv">
            <div className="beat-num">
              <span className="n">01</span>
              <span className="w">気づく。</span>
            </div>
            <p>停めているはずの愛車が動くと、POLARISSがその移動をすぐに検知します。</p>
          </div>
          <div className="stage rv">
            <span className="ring" />
            <span className="ring" />
            <span className="ring" />
            <div className="devimg" role="img" aria-label="POLARISS 本体" />
            <span className="stage-cap">POLARISS 本体 ／ 手のひらサイズ・バッテリー内蔵</span>
          </div>
        </div>

        <div className="joint" aria-hidden="true">
          <i />
          <u />
          <i />
        </div>

        <div className="beat flip">
          <div className="beat-txt rv">
            <div className="beat-num">
              <span className="n">02</span>
              <span className="w">知らせる。</span>
            </div>
            <p>「移動を検知しました」と、いつものLINEのトークにお知らせが届きます。</p>
          </div>
          <div className="rv">
            <div className="line-mock">
              <div className="line-bar">
                <span className="bk">‹</span>
                <b>POLARISS</b>
                <span className="t">14:32</span>
              </div>
              <div className="line-body">
                <div className="avatar">
                  <svg viewBox="0 0 56 56" fill="currentColor" aria-hidden="true">
                    <use href="#pl-star" />
                  </svg>
                </div>
                <div className="line-col">
                  <div className="who">POLARISS</div>
                  <div className="bub">移動を検知しました</div>
                  <div className="bub bub2">
                    現在地を確認できます。地図を開いて位置をチェックしましょう。
                    <span className="bub-cta">
                      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                        <path d="M12 3.2c-5.2 0-9.4 3.4-9.4 7.6 0 2.4 1.5 4.6 3.8 6-.2.7-.7 2.3-.8 2.6 0 .2.1.4.3.3.4-.2 3-2 3.5-2.3.8.1 1.7.2 2.6.2 5.2 0 9.4-3.4 9.4-7.6S17.2 3.2 12 3.2z" />
                      </svg>
                      現在地を見る
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="line-note">
              <i />
              通知からそのまま地図へ進めます
            </div>
          </div>
        </div>

        <div className="joint" aria-hidden="true">
          <i />
          <u />
          <i />
        </div>

        <div className="beat">
          <div className="beat-txt rv">
            <div className="beat-num">
              <span className="n">03</span>
              <span className="w">確認する。</span>
            </div>
            <p>地図を開けば、いま愛車がどこにあるかがひと目でわかります。移動のルートもたどれます。</p>
          </div>
          <div className="mapbox rv">
            <div className="bgfill" role="img" aria-label="地図上に表示された移動ルート" />
            <svg className="map-route-ui" viewBox="0 0 1200 720" preserveAspectRatio="none" aria-hidden="true">
              <path className="route-shadow" d="M120 565C190 525 270 492 360 472L430 462V355C430 333 448 316 470 316H620V250C620 230 636 214 656 214L830 245" />
              <path className="route-line" d="M120 565C190 525 270 492 360 472L430 462V355C430 333 448 316 470 316H620V250C620 230 636 214 656 214L830 245" />
              <circle className="route-start" cx="120" cy="565" r="9" />
              <circle className="route-current-ring" cx="830" cy="245" r="38" />
              <circle className="route-current-outer" cx="830" cy="245" r="18" />
              <circle className="route-current-core" cx="830" cy="245" r="10" />
            </svg>
            <span className="route-start-label">停車位置</span>
            <span className="route-current-label">現在地</span>
            <span className="chip tl">
              <i />
              移動履歴
            </span>
            <span className="chip tr">14:34 更新</span>
            <div className="mapcard">
              <b>
                <i />
                現在地を表示中
              </b>
              <small>停めた場所から 1.2km 移動</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}