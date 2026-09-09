import "./styles/owner.css";

export function OwnerSection() {
  return (
    <section className="owner" id="owner">
      <div className="owner-img">
        <div className="bgfill" role="img" aria-label="愛車の横でLINEの画面を確認する利用者" />
      </div>
      <div className="owner-txt">
        <p className="eyebrow rv">利用者の声</p>
        <div className="quotemark rv">“</div>
        <h2 className="rv">
          複数の対策を用意できたから、
          <br />
          大型バイクに踏み出せました。
        </h2>
        <div className="owner-who rv">Tさん ／ 大型バイク所有</div>
        <dl className="owner-meta rv">
          <dt>導入のきっかけ</dt>
          <dd>欲しかった大型バイクに盗難の噂が多く、購入に踏み切れずにいた。</dd>
          <dt>選んだ理由</dt>
          <dd>チェーンロックなど、これまでの盗難対策と併用できること。</dd>
        </dl>
      </div>
    </section>
  );
}