import Link from "next/link";
import "../landing/styles/hero.css";

export function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-media">
        <div className="bgfill" role="img" aria-label="バイクの横でスマートフォンを見るオーナー" />
        <div className="hero-scrim" />
        <article className="notif notif-float">
          <div className="notif-hd">
            <div className="avatar">
              <svg viewBox="0 0 56 56" fill="currentColor" aria-hidden="true">
                <use href="#pl-star" />
              </svg>
            </div>
            <b>POLARISS</b>
            <div className="when">
              <i />たった今
            </div>
          </div>
          <h3>移動を検知しました</h3>
          <p>駐車中の車両の移動を検知しました。現在地を確認してください。</p>
          <div className="notif-ac">
            <span className="pill-line">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 3.2c-5.2 0-9.4 3.4-9.4 7.6 0 2.4 1.5 4.6 3.8 6-.2.7-.7 2.3-.8 2.6 0 .2.1.4.3.3.4-.2 3-2 3.5-2.3.8.1 1.7.2 2.6.2 5.2 0 9.4-3.4 9.4-7.6S17.2 3.2 12 3.2z" />
              </svg>
              LINEで確認
            </span>
            <span className="more">MAPを開く →</span>
          </div>
        </article>
      </div>

      <div className="hero-copy">
        <div className="hero-tag">
          <i />
          クルマ・バイクのための盗難対策サービス
        </div>
        <h1>
          <span>
            <i className="w1">GPSで、</i>
            <i className="w2">大切な愛車を</i>
          </span>
          <span>
            <i className="w3">見守る。</i>
          </span>
        </h1>
        <p className="sub">
          愛車の移動を検知して、いつものLINEへ通知。
          <br />
          GPS × LTEで、万が一のその後まで備える。
        </p>
        <div className="hero-btns">
          <Link href="/about" className="btn btn-fill">
            POLARISSを詳しく見る
          </Link>
          <a href="#price" className="btn btn-line">
            料金を確認する
          </a>
        </div>
      </div>
    </section>
  );
}
