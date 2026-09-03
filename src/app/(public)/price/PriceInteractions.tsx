"use client";

import { useEffect } from "react";

export function PriceInteractions() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rv = Array.from(document.querySelectorAll<HTMLElement>(".rv"));

    if ("IntersectionObserver" in window && !reduce) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              (e.target as HTMLElement).classList.add("in");
              io.unobserve(e.target);
            }
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.06 }
      );
      rv.forEach((n) => io.observe(n));
      return () => io.disconnect();
    } else {
      rv.forEach((n) => n.classList.add("in"));
    }
  }, []);

  useEffect(() => {
    const btns = Array.from(document.querySelectorAll<HTMLButtonElement>(".acc2-q"));
    const items = Array.from(document.querySelectorAll<HTMLElement>(".acc2-item"));

    const handlers: Array<{ el: HTMLButtonElement; fn: () => void }> = [];

    btns.forEach((btn) => {
      const fn = () => {
        const item = btn.parentElement;
        if (!item) return;
        const open = item.classList.contains("open");
        items.forEach((it) => {
          it.classList.remove("open");
          const q = it.querySelector<HTMLButtonElement>(".acc2-q");
          if (q) q.setAttribute("aria-expanded", "false");
        });
        if (!open) {
          item.classList.add("open");
          btn.setAttribute("aria-expanded", "true");
        }
      };
      btn.addEventListener("click", fn);
      handlers.push({ el: btn, fn });
    });

    return () => handlers.forEach(({ el, fn }) => el.removeEventListener("click", fn));
  }, []);

  return null;
}
