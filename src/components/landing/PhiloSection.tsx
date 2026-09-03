import "./styles/philo.css";
export function PhiloSection() {
  return (
    <section className="philo">
      <div className="philo-in wrap">
        <h2 className="dim rv">盗難を、100%防ぐことは難しい。</h2>
        <div className="means rv">
          <span>チェーンロック</span>
          <u />
          <span>ハンドルロック</span>
          <u />
          <span>ガレージ保管</span>
          <u />
          <span>防犯カメラ</span>
        </div>
        <hr className="rv" />
        <div className="turn rv">だからこそ、</div>
        <h2 className="rv">
          その上で、万が一
          <br />
          動かされた後にも備える。
        </h2>
      </div>
    </section>
  );
}