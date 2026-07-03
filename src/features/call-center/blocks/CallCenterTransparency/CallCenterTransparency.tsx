"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CallCenterTransparency.module.scss";

gsap.registerPlugin(ScrollTrigger);

// Section 07 — Прозрачность. Built from Figma (title 3357:20476, dashboard 3357:20443).
// Centered heading + live-calls dashboard mockup on a grid navy backdrop, fade-up on scroll.
function CallCenterTransparency() {
   const sectionRef = useRef<HTMLElement | null>(null);
   const [shown, setShown] = useState(false);

   useEffect(() => {
      const node = sectionRef.current;
      if (!node) return;

      const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      if (reduced) { setShown(true); return; }

      // gsap ScrollTrigger is ScrollSmoother-aware (plain IntersectionObserver is not).
      const st = ScrollTrigger.create({ trigger: node, start: "top 75%", once: true, onEnter: () => setShown(true) });
      return () => { st.kill(); };
   }, []);

   return (
      <section ref={sectionRef} className={styles.section} data-screen-label="07 Прозрачность">
         <div className={styles.grid} aria-hidden />
         <div className={styles.inner}>
            <h2 className={styles.title}>
               Никаких отчётов раз в месяц.<br />
               Вы видите каждый звонок в момент,<br />
               когда он происходит
            </h2>
            <p className={styles.subtitle}>
               90% жалоб на сервисы перехвата звучат одинаково: «обещали 1 000 контактов — пришло
               600», «дозвоны были, но мы их не слышали», «отчёты приходят с опозданием». У нас этих
               проблем не существует — вы всё видите сами
            </p>
            <div className={`${styles.shot} ${shown ? styles.shotShown : ""}`}>
               <img src="/img/call-center/transparency/dashboard.png" alt="Панель AI-UP: список звонков в реальном времени" />
            </div>
         </div>
      </section>
   );
}

export default CallCenterTransparency;
