import Link from "next/link";
import "./styles/final.css";

export function FinalSection() {
  return (
    <section className="final" id="final">
      <div className="bgfill" role="img" aria-label="愛車と過ごす時間" />
      <div className="scrim" />
      <div className="final-in wrap">
        <h2 className="rv">
          「付けておけばよかった」と
          <br />
          思う日が来る前に。
        </h2>
        <p className="rv">万が一のとき、「いま、どこにあるか分かる」という備えを、愛車に。</p>
        <div className="final-btns rv">
          <Link href="/order" className="btn btn-white">
            購入
          </Link>
          <a href="#price" className="btn btn-ghost">
            料金を確認する
          </a>
        </div>
      </div>
    </section>
  );
}