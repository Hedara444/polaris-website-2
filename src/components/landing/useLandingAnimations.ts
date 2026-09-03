"use client";

import { useEffect } from "react";

export function useLandingAnimations() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const rv = Array.from(document.querySelectorAll(".rv")) as HTMLElement[];
    if ("IntersectionObserver" in window && !reduce) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              const target = e.target as HTMLElement;
              const sibs = Array.from(target.parentNode?.children ?? []).filter((n) => (n as HTMLElement).classList.contains("rv")) as HTMLElement[];
              const i = Math.max(0, sibs.indexOf(target));
              target.style.transitionDelay = Math.min(i, 5) * 70 + "ms";
              target.classList.add("in");
              io.unobserve(target);
            }
          });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.08 },
      );
      rv.forEach((n) => io.observe(n));
    } else {
      rv.forEach((n) => n.classList.add("in"));
    }

    const rows = Array.from(document.querySelectorAll(".tl-row"));
    if ("IntersectionObserver" in window && !reduce) {
      const io2 = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              (e.target as HTMLElement).classList.add("in");
              io2.unobserve(e.target);
            }
          });
        },
        { rootMargin: "0px 0px -22% 0px", threshold: 0.3 },
      );
      rows.forEach((n) => io2.observe(n));
    } else {
      rows.forEach((n) => n.classList.add("in"));
    }

    const mn = document.getElementById("miniNotif");
    if (mn) {
      if (reduce) mn.classList.add("in");
      else if ("IntersectionObserver" in window) {
        const io3 = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) {
                mn.classList.add("in");
                io3.disconnect();
              }
            });
          },
          { threshold: 0.4 },
        );
        io3.observe(mn);
      } else mn.classList.add("in");
    }

    function countUp(el: HTMLElement) {
      const target = parseInt(el.getAttribute("data-count") || "0", 10);
      if (reduce || !target) return;
      const dur = 1400;
      let t0: number | null = null;
      const fmt = (n: number) => n.toLocaleString("en-US");
      const step = (ts: number) => {
        if (!t0) t0 = ts;
        const p = Math.min(1, (ts - t0) / dur);
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent = fmt(Math.round(target * e));
        if (p < 1) requestAnimationFrame(step);
      };
      el.textContent = "0";
      requestAnimationFrame(step);
    }
    const nums = Array.from(document.querySelectorAll("[data-count]")) as HTMLElement[];
    if ("IntersectionObserver" in window) {
      const io4 = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            countUp(e.target as HTMLElement);
            io4.unobserve(e.target);
          }
        });
      }, { threshold: 0.4 });
      nums.forEach((n) => io4.observe(n));
    } else {
      nums.forEach(countUp);
    }

    const stage = document.getElementById("mstage") as HTMLElement | null;
    if (stage) {
      let timers: number[] = [];
      let playing = false;
      let seen = false;
      const clearAll = () => {
        timers.forEach((t) => clearTimeout(t));
        timers = [];
      };
      const reset = () => {
        clearAll();
        playing = false;
        stage.classList.remove("t0", "t1", "t2", "t3");
      };
      const endState = () => {
        clearAll();
        stage.classList.add("t0", "t1", "t2", "t3");
      };
      const play = () => {
        if (playing) return;
        playing = true;
        reset();
        playing = true;
        timers.push(window.setTimeout(() => stage.classList.add("t0"), 260));
        timers.push(window.setTimeout(() => stage.classList.add("t1"), 2140));
        timers.push(window.setTimeout(() => stage.classList.add("t2"), 2950));
        timers.push(window.setTimeout(() => stage.classList.add("t3"), 3700));
      };
      if (reduce) endState();
      else if (!("IntersectionObserver" in window)) endState();
      else {
        const io = new IntersectionObserver(
          (entries) => {
            const e = entries[0];
            if (e.isIntersecting) {
              if (!seen) {
                seen = true;
                play();
              }
            } else {
              seen = false;
              reset();
            }
          },
          { threshold: 0.35 },
        );
        io.observe(stage);
      }
    }
  }, []);
}
