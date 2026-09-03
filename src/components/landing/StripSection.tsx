import Link from "next/link";
import "./styles/strip.css";

export function StripSection() {
  return (
    <section className="strip">
      <style>{`
        .strip-in{display: flex; flex-wrap: wrap;  }
        .strip .sb{
         display: flex;
        
          justify-content:center;
          padding: 18px clamp(20px, 2.8vw, 40px) ;
          flex: 1 ;
          min-width:0; 
        }
        .strip .sb b, .strip .sb small, .strip .sb em{ width: 100%; }
        @media(max-width:820px){
          .strip .sb{ padding: 16px clamp(14px, 3vw, 22px) !important; }
        }
      `}</style>
      <div className="strip-in wrap">
        <Link className="sb" href="#how">
          <b>LINEで操作</b>
          <small>新しいアプリを入れずに使えます</small>
        </Link>
        <Link className="sb" href="#story">
          <b>異変もLINEへ通知</b>
          <small>愛車の移動を検知してお知らせ</small>
        </Link>
        <Link className="sb" href="#mutual">
          <b>相互監視</b>
          <small>POLARISSユーザー同士でも見守る</small>
          <em>実用新案申請中</em>
        </Link>
        <span className="sb">
          <b>バッテリー内蔵</b>
          <small>車両からの常時給電にも対応する2WAY。万が一の電源断にも備えます。</small>
        </span>
      </div>
    </section>
  );
}