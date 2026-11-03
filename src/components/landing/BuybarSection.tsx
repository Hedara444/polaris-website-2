"use client";

import { useEffect, useRef } from "react";

import { siteConfig } from "@/lib/site-config";
import { setPastHero } from "./buybarState";
import "./styles/buybar.css";

export function BuybarSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let lastY = window.scrollY;
    let ticking = false;
    // Positional state cached by IntersectionObserver instead of reading
    // getBoundingClientRect() inside the scroll handler — the latter forces a
    // synchronous layout flush on every scroll frame (heavy on mobile).
    let pastHero = false;
    let inFinal = false;
    let inFoot = false;

    const apply = () => {
      const y = window.scrollY;
      const down = y > lastY;
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
    };

    const schedule = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        apply();
      });
    };

    const observe = (
      selector: string,
      onChange: (visible: boolean) => void,
    ) => {
      if (!("IntersectionObserver" in window)) return null;
      const target = document.querySelector(selector);
      if (!target) return null;
      const io = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (!entry) return;
        onChange(entry.isIntersecting);
        schedule();
      });
      io.observe(target);
      return io;
    };

    const ios = [
      // heroEnd is the zero-height boundary after the hero: once it clears the
      // top of the viewport, we are "past hero", mirroring the old
      // `heroEnd.getBoundingClientRect().top < 0` check.
      observe("#heroEnd", (visible) => {
        pastHero = !visible;
        setPastHero(pastHero);
      }),
      observe("#final", (visible) => {
        inFinal = visible;
      }),
      observe("footer", (visible) => {
        inFoot = visible;
      }),
    ].filter((io): io is IntersectionObserver => io !== null);

    window.addEventListener("scroll", schedule, { passive: true });
    // initial state hidden until scroll up past hero
    return () => {
      window.removeEventListener("scroll", schedule);
      ios.forEach((io) => io.disconnect());
    };
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
        <a
          href={siteConfig.buyNowUrl}
          className="btn btn-white"
          data-purchase-cta="pricing"
        >
          購入
        </a>
      </div>
    </div>
  );
}