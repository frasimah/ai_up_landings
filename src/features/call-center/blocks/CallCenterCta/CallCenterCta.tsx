"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CallCenterCta.module.scss";

gsap.registerPlugin(ScrollTrigger);

// Section 05 — CTA «потенциал». Rebuilt from Figma (node 3560:367): centred stack —
// bold title, medium subtitle, white pill button — over the light-beam glow.
// Soft, slow scroll-in reveal: beam blooms + text/button rise in a gentle cascade.
function CallCenterCta() {
   const sectionRef = useRef<HTMLElement | null>(null);
   const [shown, setShown] = useState(false);

   useEffect(() => {
      const node = sectionRef.current;
      if (!node) return;
      const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      if (reduced) { setShown(true); return; }
      const st = ScrollTrigger.create({ trigger: node, start: "top 80%", once: true, onEnter: () => setShown(true) });
      return () => { st.kill(); };
   }, []);

   return (
      <section
         ref={sectionRef}
         className={`${styles.section} ${shown ? styles.in : ""}`}
         data-screen-label="05 CTA потенциал"
      >
         <img className={styles.bg} src="/img/call-center/cta/beam.png" alt="" aria-hidden />
         <div className={styles.inner}>
            <div className={styles.body}>
               <div className={styles.textGroup}>
                  <h2 className={styles.title}>Готовы посмотреть потенциал в вашей нише?</h2>
                  <p className={styles.subtitle}>Бесплатный 30-минутный аудит —<br />без обязательств</p>
               </div>
               <button type="button" className={styles.btn}>Заказать звонок</button>
            </div>
         </div>
      </section>
   );
}

export default CallCenterCta;
