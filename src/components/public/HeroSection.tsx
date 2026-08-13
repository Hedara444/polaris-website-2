"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { heroImages } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

export function HeroSection() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion || heroPaused) {
      return;
    }

    const timer = window.setInterval(() => {
      setHeroIndex((current) => (current + 1) % heroImages.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [heroPaused]);

  return (
    <section
      className="hero"
      onMouseEnter={() => setHeroPaused(true)}
      onMouseLeave={() => setHeroPaused(false)}
    >
      <div className="hero-media" aria-hidden="true">
        {heroImages.map((image, index) => (
          <img
            className={heroIndex === index ? "is-active" : ""}
            src={image}
            alt=""
            key={image}
          />
        ))}
      </div>
      <div className="hero-overlay" />

      <div className="hero-content shell">
        <p className="eyebrow light">LINE + GPS / SMART VEHICLE SECURITY</p>
        <h1>
          大切な愛車を、
          <br />
          <em>24時間守る。</em>
        </h1>
        <p className="hero-copy">
          盗難対策・GPS追跡・LINE通知をひとつに。
          <br />
          次世代IoTカーセキュリティ、POLARISS。
        </p>
        <div className="hero-actions">
          <a target="_blank" className="button button-primary" href={siteConfig.buyNowUrl}>
            Buy Now <span aria-hidden="true">↗</span>
          </a>
          <Link className="button button-glass" href="/articles">
            View Articles <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      <div className="hero-rail">
        <div className="hero-dots" aria-label="Main visual selector">
          {heroImages.map((image, index) => (
            <button
              className={heroIndex === index ? "is-active" : ""}
              type="button"
              onClick={() => setHeroIndex(index)}
              aria-label={`Show slide ${index + 1}`}
              aria-current={heroIndex === index}
              key={image}
            >
              <span />
            </button>
          ))}
        </div>
        <p>SCROLL TO DISCOVER</p>
      </div>
    </section>
  );
}
