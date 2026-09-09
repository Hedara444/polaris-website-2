import Link from "next/link";
import "./styles/price.css";

export function PriceSection() {
  return (
    <section className="price" id="price">
      <div className="wrap">
        <div className="price-hd rv">
          <p className="eyebrow">料金</p>
          <h2 className="h2">料金も、シンプルに。</h2>
        </div>
        <div className="price-dev rv">
          <div className="devimg" role="img" aria-label="POLARISS 本体" />
          <span>GPS本体は、初回料金に含まれます</span>
        </div>
        <div className="price-grid">
          <div className="price-col rv">
            <div className="cap">はじめに</div>
            <div className="price-fig">
              <span className="n">19,800</span>
              <span className="y">円</span>
            </div>
            <p className="note">
              初回のみ・GPS本体込み
              <br />
              <small>（税込・送料無料）</small>
            </p>
          </div>
          <div className="price-div rv" aria-hidden="true" />
          <div className="price-col rv">
            <div className="cap">その後は</div>
            <div className="price-fig">
              <span className="n">2,178</span>
              <span className="y">円</span>
              <span className="per">/ 月</span>
            </div>
            <p className="note">
              通信・移動検知・位置確認 込み
              <br />
              <small>（税込）</small>
            </p>
          </div>
        </div>
        <div className="price-btns rv">
          <Link href="/order" className="btn btn-fill">
            購入
          </Link>
          <Link href="/price" className="btn btn-line">
            料金の詳細を見る
          </Link>
        </div>
        <div className="price-incl rv">
          <span>移動検知</span>
          <u />
          <span>LINE通知</span>
          <u />
          <span>位置確認</span>
          <u />
          <span>移動履歴</span>
          <u />
          <span>通信費込み</span>
        </div>
      </div>
    </section>
  );
}