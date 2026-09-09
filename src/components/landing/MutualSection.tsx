import Link from "next/link";
import "./styles/mutual.css";
import { MutualMapStage } from "./MutualMapStage";

export function MutualSection() {
  return (
      <section className="mutual" id="mutual">
        <div className="wrap">
          <div className="mutual-hd rv">
            <p className="eyebrow">
              POLARISSの「相互監視」<span className="badge">実用新案申請中</span>
            </p>
            <h2 className="h2">
              愛車を、
              <br />
              一人で見守るだけじゃない。
            </h2>
            <p className="lead">
              万が一愛車が盗まれたとき、POLARISSユーザー同士で発見につながる情報を共有できる仕組みがあります。盗難車両が別のPOLARISSユーザーの周辺へ近づくと、そのユーザーへ通知。一人のGPSだけではなく、POLARISSユーザー同士でも愛車を見守ります。
            </p>
          </div>

          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <MutualMapStage stageId="mstage" className="rv" />
          </div>
          <p className="m-disc rv">※相互監視の仕組みを簡略化したイメージです。実際の画面・表示内容とは異なります。</p>

          <ol className="m-steps rv">
            <li>
              <span>01</span>
              <em>盗難が発生</em>
            </li>
            <li>
              <span>02</span>
              <em>相互監視を開始</em>
            </li>
            <li>
              <span>03</span>
              <em>近くのユーザーへ通知</em>
            </li>
            <li>
              <span>04</span>
              <em>オーナーと情報を共有</em>
            </li>
          </ol>

          <div className="m-opt rv">
            <i />
            相互監視の受付・開始は、それぞれON / OFFを選択できます。
          </div>

          <div className="m-foot rv">
            <Link href="/about" className="txtlink">
              相互監視の仕組みを詳しく見る →
            </Link>
            <p className="m-note">通知を受け取った場合も、盗難車両や不審者への直接的な接触を推奨するものではありません。安全を最優先とし、必要に応じて警察等への情報提供にご活用ください。</p>
          </div>
        </div>
      </section>
  );
}
