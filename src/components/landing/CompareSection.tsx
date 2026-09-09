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

            <div className="cl">通信のしくみ</div>
            <div className="cv cp">LTE（携帯回線）</div>
            <div className="cv">携帯回線など</div>
            <div className="cv">近くのスマホ</div>
            <div className="cv">携帯回線など</div>

            <div className="cl">ふだんの使い方</div>
            <div className="cv cp bot">LINEだけ</div>
            <div className="cv">専用アプリ</div>
            <div className="cv">専用アプリ</div>
            <div className="cv">専用アプリ</div>
          </div>
        </div>
        <p className="cnote">目的が違えば、得意なことも違います。それぞれに良さがあります。</p>
      </div>
    </section>
  );
}