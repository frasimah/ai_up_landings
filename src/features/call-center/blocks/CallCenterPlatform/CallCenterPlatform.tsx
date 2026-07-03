"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CallCenterPlatform.module.scss";

gsap.registerPlugin(ScrollTrigger);

// Section 06 — Платформа. Count-up ported from "Лендинг AI-UP.dc.html" §6:
// p 0→1 over 1400ms, eased 1-(1-p)³, value = round(target*e), ru-RU + '+' when done.
const STATS: { target: number; label: string; plus?: boolean }[] = [
   { target: 11000, label: "пользователей платформы", plus: true },
   { target: 300, label: "проектов под ключ", plus: true },
   { target: 50, label: "человек в команде AI-UP", plus: true },
   { target: 20, label: "операторов в собственном КЦ" },
];

function CallCenterPlatform() {
   const sectionRef = useRef<HTMLElement | null>(null);
   const dividerRef = useRef<HTMLDivElement | null>(null);
   const [p, setP] = useState(0);
   const [shown, setShown] = useState(false);

   // The equalizer divider is a SCROLL-driven playhead: as the section scrolls
   // through the viewport, a single bright line sweeps left → right and the
   // bars behind it fill white. Position is written to the --divider-progress
   // CSS var directly (no React re-render per frame). scrub ties it to scroll;
   // ScrollTrigger is ScrollSmoother-aware where a plain scroll listener isn't.
   useEffect(() => {
      const el = dividerRef.current;
      if (!el) return;
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
         el.style.setProperty("--divider-progress", "1");
         return;
      }
      const st = ScrollTrigger.create({
         trigger: el,
         start: "top 92%",
         end: "bottom 45%",
         scrub: true,
         onUpdate: (self) => {
            el.style.setProperty("--divider-progress", String(self.progress));
         },
      });
      return () => { st.kill(); };
   }, []);

   useEffect(() => {
      const node = sectionRef.current;
      if (!node) return;

      const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
         setP(1);
         setShown(true);
         return;
      }

      let raf = 0;
      let started = false;
      const run = () => {
         if (started) return;
         started = true;
         setShown(true);
         const t0 = performance.now();
         const dur = 1400;
         const step = (now: number) => {
            const pr = Math.min(1, (now - t0) / dur);
            setP(pr);
            if (pr < 1) raf = requestAnimationFrame(step);
         };
         raf = requestAnimationFrame(step);
      };

      // gsap ScrollTrigger is ScrollSmoother-aware (plain IntersectionObserver is not).
      const st = ScrollTrigger.create({ trigger: node, start: "top 80%", once: true, onEnter: run });

      return () => { cancelAnimationFrame(raf); st.kill(); };
   }, []);

   const fmt = (target: number, plus?: boolean) => {
      const e = 1 - Math.pow(1 - p, 3);
      const v = Math.round(target * e);
      return v.toLocaleString("ru-RU") + (plus && p >= 1 ? "+" : "");
   };

   return (
      <section ref={sectionRef} className={styles.section} data-screen-label="06 Платформа">
         <div className={styles.inner}>
            <h2 className={`${styles.title} ${shown ? styles.in : ""}`}>Платформа, которой доверяет рынок</h2>
            <div className={styles.grid}>
               {STATS.map((s, i) => (
                  <div
                     key={s.label}
                     className={`${styles.stat} ${shown ? styles.in : ""}`}
                     style={{ transitionDelay: `${120 + i * 90}ms` }}
                  >
                     <span className={styles.num}>{fmt(s.target, s.plus)}</span>
                     <span className={styles.label}>{s.label}</span>
                  </div>
               ))}
            </div>
            <div className={`${styles.dividerWrap} ${shown ? styles.in : ""}`} ref={dividerRef} aria-hidden>
               <div className={styles.dividerBars} />
               <div className={styles.dividerBarsFill} />
               <div className={styles.dividerPlayhead} />
            </div>
         </div>
      </section>
   );
}

export default CallCenterPlatform;
