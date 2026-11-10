import { MapPin, RadioTower, Satellite, UsersRound } from "lucide-react";
import styles from "./styles/hero-proof.module.css";

export function StripSection() {
  return (
    <section className={styles.proof} aria-label="POLARISSの見守りを支える仕組み">
      <div className={styles.inner}>
        <article className={styles.item}>
          <h2>位置確認の安定性を支える、<br />3つの<span>衛星システム。</span></h2>
          <p>GPS・GLONASS・日本の「みちびき」に対応。</p>
          <div className={styles.satellites} aria-hidden="true">
            {["GPS", "GLONASS", "みちびき"].map((name) => (
              <div key={name}><b>{name}</b><Satellite size={32} strokeWidth={1.5} /></div>
            ))}
            <MapPin className={styles.pin} size={26} fill="#b91f19" color="#b91f19" />
          </div>
        </article>
        <article className={styles.item}>
          <h2>車両の情報を届ける、<br /><span>複数の国内大手キャリアの通信網。</span></h2>
          <p>国内大手キャリアの複数回線に対応。</p>
          <div className={styles.diagram} aria-hidden="true"><RadioTower size={76} strokeWidth={1.2} /></div>
        </article>
        <article className={styles.item}>
          <h2>一人で見守るだけじゃない。<br />ユーザー同士の相互監視。</h2>
          <p>必要なときに、近くのユーザーへ情報を共有。</p>
          <div className={styles.diagram} aria-hidden="true"><UsersRound size={76} strokeWidth={1.2} /></div>
        </article>
      </div>
    </section>
  );
}
