"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./HomeGetContactSwiperThiradAnimation.module.scss";

type HomeGetContactSwiperThiradAnimationProps = {
   isActive?: boolean;
};

export default function HomeGetContactSwiperThiradAnimation({ isActive = true }: HomeGetContactSwiperThiradAnimationProps) {
   const wrapperRef = useRef<HTMLDivElement | null>(null);
   const rowTweensRef = useRef<gsap.core.Tween[]>([]);
   const intervalRef = useRef<number | null>(null);

   const arrayNumbers: string[][] = [
      ["X", "X", "X", "1", "2", "0", "X", "X", "X", "1", "2", "0"],
      ["X", "X", "X", "1", "2", "0", "X", "X", "X", "1", "2", "0"],
   ];

   useEffect(() => {
      if (!wrapperRef.current) return;

      const rows = gsap.utils.toArray<HTMLDivElement>(
         `.${styles.home_get_wrap_main_sw_it_animate_3_row}`
      );

      rows.forEach((row, index) => {
         const rowWidth = row.scrollWidth / 2;
         let tween: gsap.core.Tween;

         if (index === 0) {
            tween = gsap.to(row, {
               x: -rowWidth,
               repeat: -1,
               duration: 10,
               ease: "linear",
            });
         } else {
            gsap.set(row, { x: -rowWidth });
            tween = gsap.to(row, {
               x: 0,
               repeat: -1,
               duration: 10,
               ease: "linear",
            });
         }

         rowTweensRef.current.push(tween);
      });

      const spans = wrapperRef.current.querySelectorAll<HTMLSpanElement>("span");
      const mutableSpans = Array.from(spans).filter((span) => span.textContent !== "X");

      return () => {
         if (intervalRef.current !== null) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
         }
         rowTweensRef.current.forEach((tween) => tween.kill());
         rowTweensRef.current = [];
      };
   }, [styles.home_get_wrap_main_sw_it_animate_3_row]);

   useEffect(() => {
      rowTweensRef.current.forEach((tween) => {
         if (isActive) {
            tween.resume();
            return;
         }

         tween.pause();
      });

      if (intervalRef.current !== null) {
         window.clearInterval(intervalRef.current);
         intervalRef.current = null;
      }

      if (!isActive || !wrapperRef.current || document.hidden) {
         return;
      }

      const spans = Array.from(wrapperRef.current.querySelectorAll<HTMLSpanElement>("span"))
         .filter((span) => span.textContent !== "X");

      if (spans.length === 0) {
         return;
      }

      intervalRef.current = window.setInterval(() => {
         if (document.hidden) return;

         const updatesPerTick = Math.max(2, Math.ceil(spans.length / 4));

         for (let index = 0; index < updatesPerTick; index += 1) {
            const targetSpan = spans[(Math.random() * spans.length) | 0];

            if (targetSpan) {
               targetSpan.textContent = String((Math.random() * 10) | 0);
            }
         }
      }, 900);

      return () => {
         if (intervalRef.current !== null) {
            window.clearInterval(intervalRef.current);
            intervalRef.current = null;
         }
      };
   }, [isActive]);

   return (
      <div
         ref={wrapperRef}
         className={styles.home_get_wrap_main_sw_it_animate_3}
      >
         {arrayNumbers.map((item, j) => (
            <div
               key={j}
               className={styles.home_get_wrap_main_sw_it_animate_3_row}
            >
               {[...item, ...item].map((letter, i) => {
                  const localIndex = i % item.length;

                  return (
                     <span
                        key={letter + i}
                        style={
                           localIndex > 5 && localIndex < 12
                              ? { borderColor: "#399B52", color: "#399B52" }
                              : undefined
                        }
                     >
                        {letter}
                     </span>
                  );
               })}
            </div>
         ))}
      </div>
   );
}
