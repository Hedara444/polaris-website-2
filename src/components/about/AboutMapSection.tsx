"use client";

import { useEffect, useRef, useState } from "react";

export function AboutMapSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const stage = el.querySelector("#mstageAbout") as HTMLElement | null;
    if (!stage) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let timers: number[] = [];
    let seen = false;
    let playing = false;

    const clearAll = () => {
      timers.forEach((t) => clearTimeout(t));
      timers = [];
    };
    const reset = () => {
      clearAll();
      playing = false;
      stage.classList.remove("t0", "t1", "t2", "t3");
      // Reset vehicle position
      const vehs = stage.querySelectorAll(".veh");
      vehs.forEach((v) => v.removeAttribute("transform"));
    };
    const endState = () => {
      clearAll();
      stage.classList.add("t0", "t1", "t2", "t3");
      const d = stage.querySelector(".route.desk .veh") as SVGElement | null;
      const m = stage.querySelector(".route.mob .veh") as SVGElement | null;
      if (d) d.setAttribute("transform", "translate(830,245)");
      if (m) m.setAttribute("transform", "translate(250,428)");
    };
    const play = () => {
      if (playing) return;
      playing = true;
      reset();
      playing = true;
      timers.push(window.setTimeout(() => stage.classList.add("t0"), 260));
      // Trigger animateMotion
      timers.push(
        window.setTimeout(() => {
          stage.querySelectorAll("animateMotion").forEach((a: any) => {
            if (typeof a.beginElement === "function") {
              try {
                a.beginElement();
              } catch {}
            }
          });
        }, 260),
      );
      timers.push(window.setTimeout(() => stage.classList.add("t1"), 2140));
      timers.push(window.setTimeout(() => stage.classList.add("t2"), 2950));
      timers.push(window.setTimeout(() => stage.classList.add("t3"), 3700));
    };

    if (reduce) {
      endState();
      setIsVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e.isIntersecting) {
          if (!seen) {
            seen = true;
            setIsVisible(true);
            play();
          }
        } else {
          seen = false;
          setIsVisible(false);
          reset();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearAll();
    };
  }, []);

  return (
    <div ref={ref}>
      <div className={`stage-map rv ${isVisible ? "in t0 t1 t2 t3" : ""}`} id="mstageAbout" style={{ opacity: isVisible ? 1 : undefined }}>
        <svg className="mapbg desk" viewBox="0 0 1200 560" preserveAspectRatio="none" aria-hidden="true">
          <rect width="1200" height="560" fill="#EFF1EA" />
          <rect x="52" y="34" width="196" height="118" rx="9" fill="#E2ECD7" />
          <rect x="470" y="378" width="212" height="122" rx="9" fill="#E2ECD7" />
          <rect x="962" y="52" width="198" height="112" rx="9" fill="#E2ECD7" />
          <rect x="180" y="196" width="118" height="76" rx="7" fill="#E8EBE1" />
          <rect x="748" y="452" width="150" height="88" rx="7" fill="#E8EBE1" />
          <path d="M-20 508 C 180 478 300 548 520 528 C 760 506 900 552 1220 518 L1220 580 L-20 580 Z" fill="#D9E5EE" />
          <g stroke="#FFFFFF" strokeLinecap="round" fill="none">
            <path d="M-20 300 C 260 294 420 268 700 262 C 900 258 1060 268 1220 258" strokeWidth="27" />
            <path d="M332 -20 C 340 140 316 300 342 462 C 350 522 346 560 346 580" strokeWidth="20" />
            <path d="M858 -20 C 866 118 848 260 872 400 L878 580" strokeWidth="16" />
            <path d="M-20 128 C 220 124 460 138 700 126 L1220 132" strokeWidth="11" />
            <path d="M-20 432 C 240 426 520 442 780 430 L1220 438" strokeWidth="10" />
            <path d="M152 -20 V 300" strokeWidth="8" />
            <path d="M604 128 V 580" strokeWidth="8" />
            <path d="M1078 128 V 580" strokeWidth="8" />
          </g>
          <path d="M-20 300 C 260 294 420 268 700 262 C 900 258 1060 268 1220 258" stroke="#E5E8DF" strokeWidth="1.6" strokeDasharray="11 11" fill="none" />
        </svg>

        <svg className="mapbg mob" viewBox="0 0 480 760" preserveAspectRatio="none" aria-hidden="true">
          <rect width="480" height="760" fill="#EFF1EA" />
          <rect x="24" y="196" width="128" height="92" rx="8" fill="#E2ECD7" />
          <rect x="318" y="486" width="140" height="118" rx="8" fill="#E2ECD7" />
          <rect x="300" y="60" width="150" height="86" rx="7" fill="#E8EBE1" />
          <path d="M-20 690 C 100 664 200 716 320 700 C 400 690 440 712 500 700 L500 780 L-20 780 Z" fill="#D9E5EE" />
          <g stroke="#FFFFFF" strokeLinecap="round" fill="none">
            <path d="M-20 340 C 120 332 240 356 360 344 L500 350" strokeWidth="24" />
            <path d="M262 -20 C 268 160 246 380 272 560 L276 780" strokeWidth="20" />
            <path d="M-20 160 C 140 154 320 168 500 158" strokeWidth="11" />
            <path d="M-20 552 C 140 546 320 560 500 550" strokeWidth="10" />
            <path d="M92 -20 V 780" strokeWidth="9" />
            <path d="M408 160 V 780" strokeWidth="8" />
          </g>
          <path d="M-20 340 C 120 332 240 356 360 344 L500 350" stroke="#E5E8DF" strokeWidth="1.5" strokeDasharray="10 10" fill="none" />
        </svg>

        <svg className="route desk" viewBox="0 0 1200 720" preserveAspectRatio="none" aria-hidden="true">
          <path className="back" d="M830 245L656 214C636 214 620 230 620 250V316" fill="none" stroke="#9EA09B" strokeWidth="3" strokeLinecap="round" strokeDasharray="3 10" />
          <path className="path" d="M120 565C190 525 270 492 360 472L430 462V355C430 333 448 316 470 316H620V250C620 230 636 214 656 214L830 245" fill="none" stroke="#343630" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
          <g className="veh">
            <circle r="18" fill="#343630" opacity=".15" />
            <circle r="9" fill="#343630" />
            <circle r="2.6" fill="#fff" />
            <animateMotion id="vehDAbout" begin="indefinite" dur="2.2s" fill="freeze" path="M120 565C190 525 270 492 360 472L430 462V355C430 333 448 316 470 316H620V250C620 230 636 214 656 214L830 245" />
          </g>
        </svg>

        <svg className="route mob" viewBox="0 0 480 760" preserveAspectRatio="none" aria-hidden="true">
          <path className="back" d="M252 622 C 190 662 140 660 96 640" fill="none" stroke="#9EA09B" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 9" />
          <path className="path" d="M96 152 C 152 220 182 320 250 428" fill="none" stroke="#26261F" strokeWidth="3.6" strokeLinecap="round" strokeDasharray="1 12" />
          <g className="veh">
            <circle r="14" fill="#26261F" opacity=".14" />
            <circle r="8" fill="#26261F" />
            <circle r="2.8" fill="#fff" />
            <animateMotion id="vehMAbout" begin="indefinite" dur="2.2s" fill="freeze" path="M96 152 C 152 220 182 320 250 428" />
          </g>
        </svg>

        <div className="m-area" aria-hidden="true" />
        <div className={`m-user ${isVisible ? "animate" : ""}`} style={{ offsetPath: isVisible ? undefined : 'path("M120 565C190 525 270 492 360 472L430 462V355C430 333 448 316 470 316H620V250C620 230 636 214 656 214L830 245")' } as any}>
          <div className="m-user-dot" />
          <span>近くのPOLARISSユーザー</span>
        </div>

        <div className="m-card m-n1 m-step-el s0" style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "none" : "translateY(10px)" }}>
          <b>あなたの愛車が動かされた</b>
          <small>
            <span className="m-pin" />　オーナーが「相互監視」を開始
          </small>
        </div>

        <span className="m-chip m-n2 m-step-el s0" style={{ opacity: isVisible ? 1 : 0 }}>
          <i />
          盗難車両が移動中
        </span>

        <span className="m-chip soft m-arealab">
          <i />
          通知対象エリア
        </span>
        <span className="m-chip alert m-entry m-step-el s1" style={{ opacity: isVisible ? 1 : 0 }}>
          <i />
          エリアに進入
        </span>

        <div className="m-card m-n3 m-step-el s2" style={{ opacity: isVisible ? 1 : 0 }}>
          <div className="m-notif">
            <div className="avatar">
              <svg viewBox="0 0 56 56" fill="currentColor">
                <use href="#pl-star" />
              </svg>
            </div>
            <div className="tx" style={{ padding: "clamp(40px, 0vw, 106px) 17px" }}>
              <div className="hd">
                <u />
                LINE ／ たった今
              </div>
              <b>盗難された可能性のある車両が近くにあります</b>
              <small>近くのPOLARISSユーザーへお知らせ</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
