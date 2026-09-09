"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import mapBaseSvg from "../map-base.svg";

type MutualMapStageProps = {
  stageId: string;
  className?: string;
};

export function MutualMapStage({ stageId, className = "" }: MutualMapStageProps) {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
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
      Array.from(stage.querySelectorAll(".veh")).forEach((v) => v.removeAttribute("transform"));
    };

    const endState = () => {
      clearAll();
      stage.classList.add("t0", "t1", "t2", "t3");
      const desktopVehicle = stage.querySelector(".route.desk .veh");
      if (desktopVehicle) desktopVehicle.setAttribute("transform", "translate(830,245)");
    };

    const play = () => {
      if (playing) return;
      reset();
      playing = true;

      timers.push(
        window.setTimeout(() => {
          stage.classList.add("t0");
          Array.from(stage.querySelectorAll("animateMotion")).forEach((node) => {
            const animation = node as unknown as { beginElement?: () => void };
            if (typeof animation.beginElement === "function") {
              try {
                animation.beginElement();
              } catch {
                // Ignore browsers that expose animateMotion without beginElement.
              }
            }
          });
        }, 260),
      );
      timers.push(window.setTimeout(() => stage.classList.add("t1"), 2140));
      timers.push(window.setTimeout(() => stage.classList.add("t2"), 2950));
      timers.push(window.setTimeout(() => stage.classList.add("t3"), 3700));
    };

    if (reduce || !("IntersectionObserver" in window)) {
      endState();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
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

    observer.observe(stage);

    return () => {
      observer.disconnect();
      clearAll();
    };
  }, []);

  return (
    <div ref={stageRef} className={`stage-map ${className}`.trim()} id={stageId}>
      <Image
        className="mapbg"
        src={mapBaseSvg}
        alt=""
        fill
        sizes="(max-width: 900px) 100vw, 900px"
        unoptimized
        aria-hidden="true"
      />

      <svg className="route desk" viewBox="0 0 1200 720" preserveAspectRatio="none" aria-hidden="true">
        <path
          className="back"
          d="M830 245L656 214C636 214 620 230 620 250V316"
          fill="none"
          stroke="#9EA09B"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="3 10"
        />
        <path
          className="path"
          d="M120 565C190 525 270 492 360 472L430 462V355C430 333 448 316 470 316H620V250C620 230 636 214 656 214L830 245"
          fill="none"
          stroke="#343630"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g className="veh">
          <circle r="18" fill="#343630" opacity=".15" />
          <circle r="9" fill="#343630" />
          <circle r="2.6" fill="#fff" />
          <animateMotion
            id="vehD"
            begin="indefinite"
            dur="2.2s"
            fill="freeze"
            path="M120 565C190 525 270 492 360 472L430 462V355C430 333 448 316 470 316H620V250C620 230 636 214 656 214L830 245"
          />
        </g>
      </svg>

      <div className="m-area" aria-hidden="true" />

      <span className="m-user">
        <i className="m-user-dot" />
        <span>近くのPOLARISSユーザー</span>
      </span>

      <div className="m-card m-n1 m-step-el s0">
        <b>あなたの愛車が動かされた</b>
        <small>
          <span className="m-pin" />　オーナーが「相互監視」を開始
        </small>
      </div>

      <span className="m-chip m-n2 m-step-el s0">
        <i />
        盗難車両が移動中
      </span>

      <span className="m-chip soft m-arealab">
        <i />
        通知対象エリア
      </span>
      <span className="m-chip alert m-entry m-step-el s1">
        <i />
        エリアに進入
      </span>

      <div className="m-card m-n3 m-step-el s2">
        <div className="m-notif">
          <div className="avatar">
            <svg viewBox="0 0 56 56" fill="currentColor">
              <use href="#pl-star" />
            </svg>
          </div>
          <div className="tx">
            <div className="hd">
              <u />
              LINE ／ たった今
            </div>
            <b>盗難された可能性のある車両が近くにあります</b>
            <small>近くのPOLARISSユーザーへお知らせ</small>
          </div>
        </div>
      </div>

      <span className="m-chip soft m-n4 m-step-el s3">
        <i />
        オーナーと情報を共有
      </span>
    </div>
  );
}
