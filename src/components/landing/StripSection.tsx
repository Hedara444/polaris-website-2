import Link from "next/link";
import "./styles/strip.css";

export function StripSection() {
  return (
    <section className="strip">
      <div className="strip-in wrap">
        <Link className="sb" href="#how">
          <b className="sb-title">LINEで操作</b>
          <small className="sb-desc">新しいアプリを入れずに使えます</small>
        </Link>
        <Link className="sb" href="#story">
          <b className="sb-title">異変もLINEへ通知</b>
          <small className="sb-desc">愛車の移動を検知してお知らせ</small>
        </Link>
        <Link className="sb" href="#mutual">
          <div className="sb-head">
            <b className="sb-title">相互監視</b>
            <em className="sb-badge">実用新案申請中</em>
          </div>
          <small className="sb-desc">POLARISSユーザー同士でも見守る</small>
        </Link>
        <div className="sb">
          <b className="sb-title">バッテリー内蔵</b>
          <small className="sb-desc">車両からの常時給電にも対応する2WAY。万が一の電源断にも備えます。</small>
        </div>
      </div>
    </section>
  );
}