"use client";

import { useEffect } from "react";

/**
 * Minimal interactions for the static FAQ variation.
 * Direct port of the inline script in `polariss-site_all-pages/faq-deprecated.html`:
 * scroll reveal, accordion, keyword search, mobile chips, desktop rail
 * highlight. Content itself stays static server-rendered HTML.
 * (Burger menu is handled by the shared site header.)
 */
export function StaticFaqInteractions() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ---- scroll reveal ----
    const rv = Array.from(document.querySelectorAll<HTMLElement>(".rv"));
    let io: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window && !reduce) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              (e.target as HTMLElement).classList.add("in");
              io?.unobserve(e.target);
            }
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.06 },
      );
      rv.forEach((n) => io?.observe(n));
    } else {
      rv.forEach((n) => n.classList.add("in"));
    }

    const items = Array.from(document.querySelectorAll<HTMLElement>(".qitem"));
    const groups = Array.from(document.querySelectorAll<HTMLElement>(".qgroup"));
    const empty = document.getElementById("qempty");
    const count = document.getElementById("qcount");
    const input = document.getElementById("qs") as HTMLInputElement | null;

    // ---- accordion (multiple can stay open) ----
    const accordionCleanups = items.map((it) => {
      const btn = it.querySelector<HTMLButtonElement>(".qq");
      if (!btn) return () => {};
      const fn = () => {
        const open = it.classList.toggle("open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
      };
      btn.addEventListener("click", fn);
      return () => btn.removeEventListener("click", fn);
    });

    // ---- search ----
    const applySearch = (raw: string) => {
      const q = raw.trim().toLowerCase();
      if (!q) {
        items.forEach((it) => it.classList.remove("hide"));
        groups.forEach((g) => g.classList.remove("hide"));
        empty?.classList.remove("show");
        if (count) count.textContent = "";
        return;
      }
      let hits = 0;
      groups.forEach((g) => {
        let shown = 0;
        Array.from(g.querySelectorAll<HTMLElement>(".qitem")).forEach((it) => {
          const hit = (it.textContent ?? "").toLowerCase().includes(q);
          it.classList.toggle("hide", !hit);
          if (hit) {
            shown++;
            hits++;
            it.classList.add("open");
            it.querySelector(".qq")?.setAttribute("aria-expanded", "true");
          }
        });
        g.classList.toggle("hide", shown === 0);
      });
      empty?.classList.toggle("show", hits === 0);
      if (count) count.textContent = `${hits}件の質問が見つかりました`;
    };
    const onInput = () => input && applySearch(input.value);
    input?.addEventListener("input", onInput);

    // ---- mobile category chips ----
    const chips = Array.from(document.querySelectorAll<HTMLButtonElement>(".qchips button"));
    const chipCleanups = chips.map((c) => {
      const fn = () => {
        chips.forEach((x) => x.classList.toggle("on", x === c));
        if (input) input.value = "";
        applySearch("");
        const g = c.dataset.g;
        groups.forEach((x) => x.classList.toggle("hide", g !== "all" && x.id !== g));
      };
      c.addEventListener("click", fn);
      return () => c.removeEventListener("click", fn);
    });

    // ---- desktop rail: highlight the visible category ----
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".qnav a"));
    let io2: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      io2 = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting) {
              links.forEach((a) =>
                a.classList.toggle("on", a.getAttribute("href") === `#${e.target.id}`),
              );
            }
          });
        },
        { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
      );
      groups.forEach((g) => io2?.observe(g));
    }

    return () => {
      io?.disconnect();
      io2?.disconnect();
      accordionCleanups.forEach((fn) => fn());
      chipCleanups.forEach((fn) => fn());
      input?.removeEventListener("input", onInput);
    };
  }, []);

  return null;
}
