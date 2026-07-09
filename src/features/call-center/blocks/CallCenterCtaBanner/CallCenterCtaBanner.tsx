"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CallCenterCtaBanner.module.scss";

gsap.registerPlugin(ScrollTrigger);

// Reusable CTA-баннер. Figma Frame 9495 (3367:20756) «Не определились…» — rounded blue
// banner: left bold 60px title, right medium 28px lead + white pill button. Glow on left or right.
// «centered» variant is the redesigned Frame 9520/9516 (3560:315) «Не уверены…»: a rounded card
// with vertical light-streak background (Fractal Glass) + centred stack (title → lead → button).
type Props = {
   title: string;
   lead: string;
   button: string;
   glow?: "left" | "right";
   label?: string;
   variant?: "split" | "centered";
};

function CallCenterCtaBanner({ title, lead, button, glow = "left", label, variant = "split" }: Props) {
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

   if (variant === "centered") {
      return (
         <section ref={sectionRef} className={styles.section} data-screen-label={label}>
            <div className={`${styles.centeredBanner} ${shown ? styles.in : ""}`}>
               <div className={styles.centeredStreaks} aria-hidden />
               <div className={styles.centeredGlow} aria-hidden />
               <div className={styles.centeredInner}>
                  <div className={styles.textGroup}>
                     <h2 className={styles.centeredTitle}>{title}</h2>
                     <p className={styles.centeredLead}>{lead}</p>
                  </div>
                  <button type="button" className={styles.centeredBtn} data-lead-form>{button}</button>
               </div>
            </div>
         </section>
      );
   }

   return (
      <section ref={sectionRef} className={styles.section} data-screen-label={label}>
         <div className={`${styles.banner} ${shown ? styles.in : ""} ${glow === "right" ? styles.glowRight : ""}`}>
            <div className={styles.glow} aria-hidden />
            <h2 className={styles.title}>{title}</h2>
            <div className={styles.aside}>
               <p className={styles.lead}>{lead}</p>
               <button type="button" className={styles.btn} data-lead-form>{button}</button>
            </div>
         </div>
      </section>
   );
}

export default CallCenterCtaBanner;
