"use client";

import { useEffect } from "react";

export function VoicesInteractions() {
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
        { rootMargin: "0px 0px -10% 0px", threshold: 0.06 },
      );
      rv.forEach((n) => io.observe(n));
      return () => io.disconnect();
    } else {
      rv.forEach((n) => n.classList.add("in"));
    }
  }, []);

  return null;
}
