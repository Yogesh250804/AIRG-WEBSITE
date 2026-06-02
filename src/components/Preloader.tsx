"use client";

import React, { useEffect, useState } from "react";

interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [animate, setAnimate] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Trigger CSS animations on mount (almost instantly)
    const animTimeout = setTimeout(() => {
      setAnimate(true);
    }, 50);

    // Complete loader after animations finish (faster sequence: ~0.8s total)
    const completeTimeout = setTimeout(() => {
      setVisible(false);
      if (onComplete) {
        onComplete();
      }
    }, 800);

    return () => {
      clearTimeout(animTimeout);
      clearTimeout(completeTimeout);
    };
  }, [onComplete]);

  if (!visible) return null;

  const word1 = "AIRG".split("");
  const word2 = "INTERNATIONAL".split("");

  return (
    <div className="fixed inset-0 z-[9999] flex select-none pointer-events-none">
      {/* 10 vertical columns for the slide down animation */}
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="h-full w-[10%] bg-[#EB0028] border-r border-white/5 pointer-events-auto transition-transform duration-350 ease-in-out will-change-transform"
          style={{
            transform: animate ? "translateY(100%)" : "translateY(0%)",
            transitionDelay: `${0.2 + i * 0.02}s`,
          }}
        />
      ))}

      {/* Premium Corporate Logo Reveal */}
      <div 
        className="name-text flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[10000] w-full px-4 transition-opacity duration-200 text-center select-none"
        style={{
          opacity: animate ? 0 : 1,
          transitionDelay: "0.5s",
        }}
      >
        {/* Line 1: AIRG */}
        <div className="font-outfit font-black text-[12vw] sm:text-[8vw] tracking-tighter leading-none text-white uppercase overflow-hidden flex justify-center">
          {word1.map((char, idx) => (
            <span
              key={idx}
              className="inline-block transition-transform duration-250 ease-out will-change-transform"
              style={{
                transform: animate ? "translateY(0%)" : "translateY(105%)",
                transitionDelay: `${idx * 0.02}s`,
              }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* Line 2: INTERNATIONAL */}
        <div className="font-outfit font-bold text-[2.8vw] sm:text-[1.4vw] tracking-[0.45em] leading-none text-white/80 uppercase overflow-hidden mt-3 sm:mt-4 flex justify-center translate-x-[0.225em]">
          {word2.map((char, idx) => (
            <span
              key={idx}
              className="inline-block transition-transform duration-250 ease-out will-change-transform"
              style={{
                transform: animate ? "translateY(0%)" : "translateY(105%)",
                transitionDelay: `${0.08 + idx * 0.01}s`,
              }}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
