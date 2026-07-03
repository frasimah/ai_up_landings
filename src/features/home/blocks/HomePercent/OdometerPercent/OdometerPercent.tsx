"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../HomePercent.module.scss";

gsap.registerPlugin(ScrollTrigger);

function OdometerPercent({ value = 87, digitsCount = 2 }: { value?: number; digitsCount?: number }) {
   const rootRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const root = rootRef.current;
      if (!root) return;

      const cols = Array.from(root.querySelectorAll("[data-digit]")) as HTMLDivElement[];
      if (!cols.length) return;

      // Лента: 0..9 повторяем много раз -> никакого "прыжка назад"
      const REPEATS = 12; // хватит с запасом (0..9 * 12 = 120 шагов)
      const TAPE_LEN = 10 * REPEATS; // кол-во "цифр" в ленте
      const STEP_PERCENT = 100 / TAPE_LEN; // yPercent на 1 цифру

      const movers = cols.map((col) =>
         gsap.quickTo(col, "yPercent", {
            duration: 8,
            ease: "power4.out",
         })
      );

      // абсолютная позиция каждой колонки (в шагах), без wrap
      const step = new Array(digitsCount).fill(0);

      // старт в 0
      // старт в 0 (все колонки на "0")
      for (let i = 0; i < digitsCount; i++) {
         step[i] = 0;
         movers;
      }


      const obj = { val: 0 };
      let prevStr = "".padStart(digitsCount, "0");

      const tween = gsap.to(obj, {
         val: value,
         duration: 1,
         ease: "power.out",
         paused: true,
         snap: { val: 1 },
         onUpdate() {
            const s = String(obj.val).padStart(digitsCount, "0");
            if (s === prevStr) return;

            for (let i = 0; i < digitsCount; i++) {
               if (s[i] === prevStr[i]) continue;

               const from = Number(prevStr[i]);
               const to = Number(s[i]);

               const delta = (to - from + 10) % 10; // 9->0 = 1, 0->9 = 9
               step[i] += delta; // всегда крутим "вперёд"

               movers[i](-(step[i] * STEP_PERCENT));
            }

            prevStr = s;
         },
      });

      const st = ScrollTrigger.create({
         trigger: root,
         start: "top 55%",
         onEnter: () => tween.play(0),
         once: true,
      });

      return () => {
         st.kill();
         tween.kill();
      };
   }, [value, digitsCount]);

   // важно: REPEATS здесь должен совпадать с REPEATS в effect
   const REPEATS = 12;

   return (
      <div className={styles.odometer} ref={rootRef} aria-label={`${value}%`}>
         {Array.from({ length: digitsCount }).map((_, idx) => (
            <div className={styles.odometerCol} key={idx}>
               <div className={styles.odometerDigits} data-digit>
                  {Array.from({ length: 10 * REPEATS }).map((_, n) => (
                     <span key={n} className={styles.odometerDigit}>
                        {n % 10}
                     </span>
                  ))}
               </div>
            </div>
         ))}
         <span className={styles.odometerSuffix}>%</span>
      </div>
   );
}

export default OdometerPercent;
