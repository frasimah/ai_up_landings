"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CallCenterEnabled.module.scss";

gsap.registerPlugin(ScrollTrigger);

// Section 08b — Когда нужен КЦ. Ported from "Лендинг AI-UP.dc.html" §8b.
const ITEMS = [
   "контактов больше, чем вы успеваете прозванивать",
   "пропускаете звонки и теряете лидов",
   "менеджеры устали от рутины",
   "тестируете нишу и хотите понять качество быстрее",
   "получаете много «хаотичного» трафика",
   "нет выделенного сотрудника под прозвон",
   "хотите работать только с теми, у кого реально есть спрос",
];

function CallCenterEnabled() {
   const listRef = useRef<HTMLDivElement | null>(null);
   const [on, setOn] = useState<boolean[]>(() => ITEMS.map(() => false));

   useEffect(() => {
      const node = listRef.current;
      if (!node) return;

      const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      if (reduced) { setOn(ITEMS.map(() => true)); return; }

      const timers: number[] = [];
      // gsap ScrollTrigger is ScrollSmoother-aware (plain IntersectionObserver is not).
      const st = ScrollTrigger.create({
         trigger: node,
         start: "top 80%",
         once: true,
         onEnter: () => {
            ITEMS.forEach((_, i) => {
               timers.push(window.setTimeout(() => {
                  setOn((prev) => { const next = [...prev]; next[i] = true; return next; });
               }, 220 + i * 420));
            });
         },
      });

      return () => { st.kill(); timers.forEach(clearTimeout); };
   }, []);

   return (
      <section className={styles.section} data-screen-label="08b Когда нужен КЦ">
         <div className={styles.inner}>
            <div className={styles.head}>
               <div className={styles.eyebrow}><span />чек-лист</div>
               <h2 className={styles.title}>Когда нужно включить колл-центр AI-UP</h2>
               <p className={styles.lead}>Если вы отметили 2 и более пунктов — вам нужен КЦ</p>
            </div>
            <div ref={listRef} className={styles.grid}>
               {ITEMS.map((text, i) => (
                  <div key={text} className={`${styles.item} ${i === ITEMS.length - 1 ? styles.wide : ""}`}>
                     <span className={`${styles.chk} ${on[i] ? styles.on : ""}`}>
                        <svg width="15" height="11" viewBox="0 0 16 12" fill="none"><path d="M1 6l4.5 4.5L15 1" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                     </span>
                     {text}
                  </div>
               ))}
            </div>
            <div className={styles.cta}>
               <button type="button" className={styles.ctaBtn}>Включить колл-центр</button>
            </div>
         </div>
      </section>
   );
}

export default CallCenterEnabled;
