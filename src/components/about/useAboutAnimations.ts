"use client";

import { useEffect } from "react";

export function useAboutAnimations() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---- quiet reveal (.rv) ---- */
    const rv = Array.from(document.querySelectorAll(".rv")) as HTMLElement[];
    if ("IntersectionObserver" in window && !reduce) {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.06 }
      );
      rv.forEach((n) => io.observe(n));
    } else {
      rv.forEach((n) => n.classList.add("in"));
    }

    /* ---- chapter 02 : device anatomy scroll narrative (#anat) ---- */
    const wrap = document.getElementById("anat");
    if (wrap) {
      const steps = Array.from(wrap.querySelectorAll(".anat-step")) as HTMLElement[];
      const hots = Array.from(wrap.querySelectorAll(".hot, .wchip, .outnotif")) as HTMLElement[];

      const activate = (i: string) => {
        steps.forEach((s) => s.classList.toggle("on", s.dataset.i === i));
        hots.forEach((h) => h.classList.toggle("on", h.dataset.i === i));
      };

      if (reduce || !("IntersectionObserver" in window)) {
        steps.forEach((s) => s.classList.add("on"));
        hots.forEach((h) => h.classList.add("on"));
      } else {
        activate("1");
        const obs = new IntersectionObserver(
          (entries) => {
            entries.forEach((e) => {
              if (e.isIntersecting) {
                const datasetIndex = (e.target as HTMLElement).dataset.i;
                if (datasetIndex) activate(datasetIndex);
              }
            });
          },
          { rootMargin: "-46% 0px -46% 0px", threshold: 0 }
        );
        steps.forEach((s) => obs.observe(s));
      }
    }

    /* ---- service movie (#vposter, #svideo) ---- */
    const poster = document.getElementById("vposter");
    const video = document.getElementById("svideo") as HTMLVideoElement | null;
    const note = document.getElementById("vnote");

    if (poster && video) {
      const handlePosterClick = () => {
        const sources = Array.from(video.querySelectorAll("source"));
        const ready = sources.some((s) => (s.getAttribute("src") || "").trim() !== "");
        if (!ready) {
          note?.classList.add("show");
          return;
        }
        poster.style.display = "none";
        video.setAttribute("controls", "");
        const pr = video.play();
        if (pr && pr.catch) {
          pr.catch(() => note?.classList.add("show"));
        }
      };

      poster.addEventListener("click", handlePosterClick);
    }

    /* ---- mutual watch sequence (#mstage) ---- */
    const stage = document.getElementById("mstage");
    if (stage) {
      let timers: ReturnType<typeof setTimeout>[] = [];
      let playing = false;
      let seen = false;

      const clearAll = () => {
        timers.forEach(clearTimeout);
        timers = [];
      };

      const reset = () => {
        clearAll();
        playing = false;
        stage.classList.remove("t0", "t1", "t2", "t3");
        const vehs = Array.from(stage.querySelectorAll(".veh")) as HTMLElement[];
        vehs.forEach((v) => v.removeAttribute("transform"));
      };

      const endState = () => {
        clearAll();
        stage.classList.add("t0", "t1", "t2", "t3");
        const d = stage.querySelector(".route.desk .veh") as HTMLElement | null;
        const m = stage.querySelector(".route.mob .veh") as HTMLElement | null;
        if (d) d.setAttribute("transform", "translate(830,245)");
        if (m) m.setAttribute("transform", "translate(250,428)");
      };

      const play = () => {
        if (playing) return;
        reset();
        playing = true;

        timers.push(
          setTimeout(() => {
            stage.classList.add("t0");
            const anims = Array.from(stage.querySelectorAll("animateMotion")) as any[];
            anims.forEach((a) => {
              if (typeof a.beginElement === "function") {
                try {
                  a.beginElement();
                } catch {}
              }
            });
          }, 260)
        );

        timers.push(setTimeout(() => stage.classList.add("t1"), 2140));
        timers.push(setTimeout(() => stage.classList.add("t2"), 2950));
        timers.push(setTimeout(() => stage.classList.add("t3"), 3700));
      };

      if (reduce || !("IntersectionObserver" in window)) {
        endState();
      } else {
        const obsMstage = new IntersectionObserver(
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
          { threshold: 0.35 }
        );
        obsMstage.observe(stage);
      }
    }
  }, []);
}
