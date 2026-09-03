import Link from "next/link";
import "./styles/how.css";

export function HowSection() {
  return (
    <section className="how" id="how">
      <div className="wrap">
        <div className="how-hd rv">
          <p className="eyebrow">仕組み</p>
          <h2 className="h2">難しい操作は、必要ありません。</h2>
          <p className="lead">普段は何も操作しなくて大丈夫。愛車が動いたときだけ、LINEにお知らせが届きます。</p>
        </div>
        <div className="how-grid">
          <div className="phone-stage rv">
            <div className="geo">
              <div className="bgfill" role="img" aria-label="監視エリアの設定画面" />
              <span className="glab">監視エリア</span>
            </div>
            <div className="phone">
              <div className="screen">
                <div className="bgfill" role="img" aria-label="POLARISSの地図画面" />
                <div className="scr-bar">
                  <span>POLARISS</span>
                </div>
                <div className="scr-ctl">
                  <u>2026/08/19</u>
                  <u>2026/08/20</u>
                  <b>更新</b>
                </div>
                <div className="notch" />
                <div className="mini-notif" id="miniNotif">
                  <div className="avatar">
                    <svg viewBox="0 0 56 56" fill="currentColor" aria-hidden="true">
                      <use href="#pl-star" />
                    </svg>
                  </div>
                  <div>
                    <b>移動を検知しました</b>
                    <small>現在地を確認してください</small>
                  </div>
                  <span className="tm">今</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="tl-row rv">
              <span className="n">01</span>
              <div>
                <h3>愛車にPOLARISSを設置</h3>
                <p>付属のハーネスで電源をつなぎ、車両の目立たない場所へ。本体は手のひらサイズです。</p>
              </div>
            </div>
            <div className="tl-row rv">
              <span className="n">02</span>
              <div>
                <h3>普段は見守るだけ</h3>
                <p>監視エリアを設定すれば、あとはPOLARISSにお任せ。毎日操作する必要はありません。</p>
              </div>
            </div>
            <div className="tl-row rv">
              <span className="n">03</span>
              <div>
                <h3>異変はLINEへ</h3>
                <p>移動を検知すると、いつものLINEへ即時通知。地図で現在地を確認できます。</p>
              </div>
            </div>
            <div className="how-cta">
              <Link href="/steps" className="btn btn-fill">
                使い方を詳しく見る
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}