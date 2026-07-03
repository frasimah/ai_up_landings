"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

import styles from "./HomeCallCenterNumber.module.scss";

type CallCenterStat = {
   number: string;
   text: string;
};

const data: CallCenterStat[] = [
   { number: "87%", text: "клиентов изучают рынок за 24 часа до заявки" },
   { number: "до 70%", text: "клиентов изучают рынок за 24 часа до заявки" },
   { number: "до 73%", text: "контактов — доступно к дозвону" },
   { number: "до 5–20%", text: "превращаются в квалифицированные лиды" },
];



type HomeCallCenterNumberProps = {
   isActive?: boolean;
};

function HomeCallCenterNumber({ isActive = true }: HomeCallCenterNumberProps) {
   const wrapRef = useRef<HTMLDivElement>(null);
   const timelineRef = useRef<gsap.core.Timeline | null>(null);
   const activeRef = useRef(isActive);

   useEffect(() => {
      activeRef.current = isActive;

      if (!timelineRef.current) {
         return;
      }

      if (isActive) {
         timelineRef.current.resume();
         return;
      }

      timelineRef.current.pause();
   }, [isActive]);

   useEffect(() => {
      const wrap = wrapRef.current;
      if (!wrap) return;

      const slides = Array.from(wrap.children) as HTMLElement[];
      const n = slides.length;
      if (n <= 1) return;

      // ===== НАСТРОЙКИ =====
      const MOVE = 1.2;
      const HOLD = 4.0;
      const HIDDEN_SCALE = 1.1;
      const ACTIVE_SCALE = 1.0;
      const OUT_SCALE = 0.8;
      const EASE = "power3.inOut";

      const GAP = 20;              // ← расстояние между слайдами (%)
      const STEP = 100 + GAP;      // ← шаг с учётом расстояния
      // =====================

      let active = 0;
      let killed = false;

      const ctx = gsap.context(() => {
         // стартовая раскладка
         slides.forEach((el, i) => {
            gsap.set(el, {
               yPercent: i * STEP,
               scale: i === 0 ? ACTIVE_SCALE : HIDDEN_SCALE,
               transformOrigin: "50% 50%",
               willChange: "transform",
               opacity: 1,
            });
         });

         const run = () => {
            if (killed) return;

            const current = active;
            const next = (active + 1) % n;

            slides.forEach((el, i) => {
               if (i !== current && i !== next) {
                  gsap.set(el, { scale: HIDDEN_SCALE });
               }
            });

            const tl = gsap.timeline({
               onComplete: () => {
                  // перекидываем вниз с учётом GAP
                  gsap.set(slides[current], {
                     yPercent: (n - 1) * STEP,
                     scale: HIDDEN_SCALE,
                  });

                  active = next;
                  run();
               },
            });
            timelineRef.current = tl;

            if (!activeRef.current) {
               tl.pause();
            }

            // пауза
            tl.to({}, { duration: HOLD });

            // текущий
            tl.to(
               slides[current],
               {
                  yPercent: `-=${STEP}`,
                  scale: OUT_SCALE,
                  duration: MOVE,
                  ease: EASE,
               },
               0
            );

            // следующий
            tl.to(
               slides[next],
               {
                  yPercent: `-=${STEP}`,
                  scale: ACTIVE_SCALE,
                  duration: MOVE,
                  ease: EASE,
               },
               0
            );

            // остальные
            slides.forEach((el, i) => {
               if (i !== current && i !== next) {
                  tl.to(
                     el,
                     {
                        yPercent: `-=${STEP}`,
                        duration: MOVE,
                        ease: EASE,
                     },
                     0
                  );
               }
            });
         };

         run();
      }, wrap);

      return () => {
         killed = true;
         timelineRef.current?.kill();
         timelineRef.current = null;
         ctx.revert();
      };
   }, []);





   return (
      data?.length > 0 && (
         <div className={`row ${styles.home_call_bottom}`}>
            <div className="col-xl-3 col-md-2">
               <div className={styles.home_call_bottom_line}>
                  <svg width={434} height={72} viewBox="0 0 434 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M1 1V71" stroke="#424242" strokeWidth={2} strokeLinecap="round" />
                     <path d="M49 1V71" stroke="#424242" strokeWidth={2} strokeLinecap="round" />
                     <path d="M97 1V71" stroke="#424242" strokeWidth={2} strokeLinecap="round" />
                     <path d="M145 1V71" stroke="#424242" strokeWidth={2} strokeLinecap="round" />
                     <path d="M193 1V71" stroke="#424242" strokeWidth={2} strokeLinecap="round" />
                     <path d="M241 1V71" stroke="#424242" strokeWidth={2} strokeLinecap="round" />
                     <path d="M289 1V71" stroke="#424242" strokeWidth={2} strokeLinecap="round" />
                     <path d="M337 1V71" stroke="#424242" strokeWidth={2} strokeLinecap="round" />
                     <path d="M385 1V71" stroke="#424242" strokeWidth={2} strokeLinecap="round" />
                     <path d="M433 1V71" stroke="#424242" strokeWidth={2} strokeLinecap="round" />
                  </svg>
               </div>
            </div>
            <div className="col-xl-6 col-md-8">
               <div className={styles.home_call_bottom_animate} ref={wrapRef}>
                  {data.map((item, index) => (
                     <div className={styles.home_call_bottom_animate_it} key={item.text + index}>
                        <div className={styles.home_call_bottom_animate_it_number} data-scramble="number">
                           {item.number}
                        </div>
                        <div className={styles.home_call_bottom_animate_it_text} data-scramble="text">
                           {item.text}
                        </div>
                     </div>
                  ))}
               </div>
            </div>
            <div className="col-xl-3 col-md-2">
               <div className={styles.home_call_bottom_line}>
                  <svg width={434} height={72} viewBox="0 0 434 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M1 1V71" stroke="#424242" strokeWidth={2} strokeLinecap="round" />
                     <path d="M49 1V71" stroke="#424242" strokeWidth={2} strokeLinecap="round" />
                     <path d="M97 1V71" stroke="#424242" strokeWidth={2} strokeLinecap="round" />
                     <path d="M145 1V71" stroke="#424242" strokeWidth={2} strokeLinecap="round" />
                     <path d="M193 1V71" stroke="#424242" strokeWidth={2} strokeLinecap="round" />
                     <path d="M241 1V71" stroke="#424242" strokeWidth={2} strokeLinecap="round" />
                     <path d="M289 1V71" stroke="#424242" strokeWidth={2} strokeLinecap="round" />
                     <path d="M337 1V71" stroke="#424242" strokeWidth={2} strokeLinecap="round" />
                     <path d="M385 1V71" stroke="#424242" strokeWidth={2} strokeLinecap="round" />
                     <path d="M433 1V71" stroke="#424242" strokeWidth={2} strokeLinecap="round" />
                  </svg>
               </div>
            </div>
         </div>
      )
   );
}

export default HomeCallCenterNumber;
