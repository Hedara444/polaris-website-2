import Link from "next/link";
import "./styles/data.css";

export function DataSection() {
  return (
    <section className="data">
      <div className="data-bg">
        <div className="bgfill" />
      </div>
      <div className="data-in wrap">
        <p className="eyebrow rv">盗難のリアル</p>
        <h2 className="rv">
          盗難は、
          <br />
          他人事ではない。
        </h2>
        <p className="data-sub rv">そして、ここ数年は再び増えています。</p>
        <div className="figs">
          <div className="fig rv">
            <div className="v">
              <span className="n" data-count="6386">
                6,386
              </span>
              <span className="u">件</span>
              <span className="trend">↗ 増加傾向</span>
            </div>
            <div className="lab">自動車　2025年 年間盗難認知件数</div>
            <p className="micro">長期的には大きく減少してきた一方、2022年以降は4年連続で増加しています。</p>
          </div>
          <div className="figdiv rv" aria-hidden="true" />
          <div className="fig rv">
            <div className="v">
              <span className="n" data-count="14552">
                0
              </span>
              <span className="u">件</span>
              <span className="trend">↗ 増加傾向</span>
            </div>
            <div className="lab">二輪車　2025年 年間盗難認知件数</div>
            <p className="micro">2021年を底に増加が続き、2025年には約1.9倍になりました。</p>
            <div className="twopt rv">
              <div className="tp">
                <span className="y">2021</span>
                <span className="bar">
                  <i style={{ width: "52%" }} />
                </span>
                <span className="v">7,569</span>
              </div>
              <div className="tp now">
                <span className="y">2025</span>
                <span className="bar">
                  <i style={{ width: "100%" }} />
                </span>
                <span className="v">14,552</span>
              </div>
            </div>
          </div>
        </div>
        <div className="data-side rv">
          <p>毎日どこかで、愛車が持ち去られています。「うちは大丈夫」と、言い切れる人はいません。</p>
          <Link href="/articles" className="btn btn-ghost btn-sm">
            盗難について詳しく見る
          </Link>
        </div>
        <p className="data-note">
          出典：自動車＝JAF Mate／日本損害保険協会ほか盗難統計資料　二輪車＝日本二輪車普及安全協会／UMDAほか盗難統計資料
        </p>
      </div>
    </section>
  );
}