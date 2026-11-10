import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import styles from "./hero.module.css";

export function HeroSection() {
  return (
    <section className={styles.hero} aria-labelledby="home-hero-title">
      <div className={styles.artwork}>
        <Image
          src="/images/hero-rider-v1.png"
          alt="バイクのそばで、LINEのPOLARISS画面から愛車の位置を確認する様子とPOLARISS端末"
          fill
          sizes="(max-width: 760px) 100vw, 55vw"
          loading="eager"
          fetchPriority="high"
          className={styles.image}
        />
      </div>
      <div className={styles.copy}>
        <p className={styles.origin}>日本発。<span>京セラ製端末 × 国内システム開発。</span></p>
        <h1 id="home-hero-title" className={styles.title}>
          <span>愛車は買った。</span>
          <span>安心は買ったか。</span>
        </h1>
        <p className={styles.lead}>
          <span>動きを検知して、いつものLINEへ通知。</span>
          <span>GPSで位置を確認。ユーザー同士でも見守る。</span>
        </p>
        <p className={styles.description}>クルマ・バイクのための盗難対策サービス POLARISS</p>
        <div className={styles.actions}>
          <Link href="/about" className={styles.primary}>愛車を守る仕組みを見る</Link>
          <a href={siteConfig.buyNowUrl} className={styles.secondary} data-purchase-cta="hero">料金・購入はこちら</a>
        </div>
      </div>
    </section>
  );
}
