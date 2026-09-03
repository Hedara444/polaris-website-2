import Link from "next/link";
import "./styles/compare.css";

export function CompareSection() {
  return (
    <section className="compare" id="compare">
      <div className="wrap">
        <div className="compare-hd rv">
          <p className="eyebrow">選び方</p>
          <h2 className="h2">GPSなら、どれでも同じ？</h2>
          <p className="lead">同じ「位置がわかる道具」でも、目的が違えば得意なことも違います。用途の違いから見てみましょう。</p>
        </div>
        <p className="thint">← 横にスクロールできます →</p>
        <div className="tscroll rv">
          <div className="ctable">
            <div className="ch" />
            <div className="ch cp top">
              <b>POLARISS</b>
              <span className="me">このサイトのサービス</span>
            </div>
            <div className="ch">
              <b>見守りGPS</b>
            </div>
            <div className="ch">
              <b>紛失防止タグ</b>
            </div>
            <div className="ch">
              <b>警備会社GPS</b>
            </div>

            <div className="cl">主な目的</div>
            <div className="cv cp">クルマ・バイクの盗難対策</div>
            <div className="cv">人の見守り</div>
            <div className="cv">持ち物さがし</div>
            <div className="cv">警備・かけつけ</div>

            <div className="cl">車両向けの設計</div>
            <div className="cv cp">しっかり対応</div>
            <div className="cv dash">—</div>
            <div className="cv dash">—</div>
            <div className="cv">対応することも</div>

            <div className="cl">移動を検知して通知</div>
            <div className="cv cp">LINEへ通知</div>
            <div className="cv dash">—</div>
            <div className="cv dash">—</div>
            <div className="cv">通知あり</div>

            <div className="cl">バッテリー内蔵</div>
            <div className="cv cp">あり（2WAY）</div>
            <div className="cv dash">—</div>
            <div className="cv">あり</div>
            <div className="cv dash">—</div>
          </div>
        </div>
        <p className="cnote">※表は用途の違いを簡潔に示したものです。詳しくは比較ページで。</p>
        <div style={{ marginTop: 24 }}>
          <Link href="/compare" className="btn btn-line">
            比較を詳しく見る
          </Link>
        </div>
      </div>
    </section>
  );
}