"use client";

import { useEffect } from "react";

function revealVisible() {
  const viewportHeight = window.innerHeight || 0;
  document.querySelectorAll<HTMLElement>(".rv:not(.in)").forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < viewportHeight * 0.94 && rect.bottom > 0) {
      el.classList.add("in");
    }
  });
}

export function VoicesInteractions() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rv = Array.from(document.querySelectorAll<HTMLElement>(".rv"));

    if (!("IntersectionObserver" in window) || reduce) {
      rv.forEach((n) => n.classList.add("in"));
      return;
    }

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

    // Safety net: font swaps and layout shifts can move observed elements
    // so the observer never fires, leaving content invisible until a manual
    // refresh. Re-check on scroll/resize, shortly after load, and once
    // webfonts settle.
    let raf = 0;
    const schedule = () => {
      if (raf) {
        return;
      }
      raf = requestAnimationFrame(() => {
        raf = 0;
        revealVisible();
      });
    };
    const t1 = window.setTimeout(schedule, 400);
    const t2 = window.setTimeout(schedule, 2000);
    document.fonts?.ready.then(schedule).catch(() => {});
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);

    return () => {
      io.disconnect();
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (raf) {
        cancelAnimationFrame(raf);
      }
    };
  }, []);

  return null;
}
