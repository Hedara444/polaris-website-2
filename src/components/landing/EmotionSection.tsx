import "./styles/emotion.css";
export function EmotionSection() {
  return (
    <section className="emotion">
      <div className="bgfill" role="img" aria-label="夕暮れのドライブ" />
      <div className="scrim" />
      <div className="emotion-in wrap">
        <p className="eyebrow rv">愛車という存在</p>
        <h2 className="rv">
          盗まれるのは、
          <br />
          車両だけではありません。
        </h2>
        <p className="rv">初めて買ったバイク。家族と何度も出かけたクルマ。少しずつ手をかけてきた一台。車両には価格があります。でも、その愛車と過ごした時間には、価格をつけることができません。</p>
      </div>
    </section>
  );
}