"use client";

import { useEffect } from "react";

export function HowtoInteractions() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rv = Array.from(document.querySelectorAll(".rv")) as HTMLElement[];

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
    const wrap = document.getElementById("lsw");
    if (!wrap) return;
    const btns = Array.from(wrap.querySelectorAll<HTMLButtonElement>(".sw-nav button"));
    const scs = Array.from(wrap.querySelectorAll<HTMLElement>(".sc"));
    const handler = (b: HTMLButtonElement) => {
      const s = b.dataset.s;
      btns.forEach((x) => x.classList.toggle("on", x === b));
      scs.forEach((x) => x.classList.toggle("on", x.dataset.s === s));
    };
    const listeners: Array<{ el: HTMLButtonElement; fn: () => void }> = [];
    btns.forEach((b) => {
      const fn = () => handler(b);
      b.addEventListener("click", fn);
      listeners.push({ el: b, fn });
    });
    return () => listeners.forEach(({ el, fn }) => el.removeEventListener("click", fn));
  }, []);

  return null;
}
