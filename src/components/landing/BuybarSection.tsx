"use client";

import { useEffect, useRef } from "react";

import Link from "next/link";
//import { siteConfig } from "@/lib/site-config";
import "./styles/buybar.css";

export function BuybarSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let lastY = window.scrollY;
    let ticking = false;

    const heroEnd = document.getElementById("heroEnd");
    const fin = document.getElementById("final");
    const ft = document.querySelector("footer");

    const update = () => {
      const y = window.scrollY;
      const down = y > lastY;
      const pastHero = heroEnd ? heroEnd.getBoundingClientRect().top < 0 : y > 400;
      const inFinal = fin ? fin.getBoundingClientRect().top < window.innerHeight && fin.getBoundingClientRect().bottom > 0 : false;
      const inFoot = ft ? ft.getBoundingClientRect().top < window.innerHeight : false;
      const anyFaqOpen = document.querySelector(".acc-item.open") !== null;

      if (anyFaqOpen) {
        el.classList.add("show");
      } else if (inFinal || inFoot || !pastHero) {
        el.classList.remove("show");
      } else if (down) {
        el.classList.remove("show");
      } else {
        el.classList.add("show");
      }
      lastY = y;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // initial state hidden until scroll up past hero
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="buybar" id="buybar" ref={ref}>
      <div className="buybar-in">
        <div className="devimg" />
        <div className="txt">
          <b>
            <span className="d-lg">POLARISS　</span>初回 19,800円
            <span className="d-lg">（税込・送料無料）</span>
          </b>
          <small>
            その後 月額 2,178円
            <span className="d-lg">（税込）／ アプリ不要・LINEだけ</span>
          </small>
        </div>
        <Link href="/order" className="btn btn-white">
          購入
        </Link>
      </div>
    </div>
  );
}