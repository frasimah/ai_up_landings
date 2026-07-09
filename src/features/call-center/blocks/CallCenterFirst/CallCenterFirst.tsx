"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./CallCenterFirst.module.scss";

const HERO_SUBTITLE_SLIDES = [
   "Под ключ от команды, которая создала AI-UP",
   "Закрытые источники и Senior-операторы",
   "Прозрачность каждого звонка в реальном времени",
];

// Hero (01) — dark blueprint. Ported from the approved эталон "Hero AI-UP.dc.html"
// without its built-in <header>; the global fixed HeaderOther floats over it.
function CallCenterFirst() {
   const sectionRef = useRef<HTMLElement | null>(null);
   const [subtitleSlide, setSubtitleSlide] = useState(0);

   // Subtitle rotates through 3 short value props one at a time (slider), instead
   // of showing all 3 as one long run-on line. Skips for reduced-motion, same
   // gate used by the cursor-parallax effect below.
   useEffect(() => {
      const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;
      const id = setInterval(() => {
         setSubtitleSlide((s) => (s + 1) % HERO_SUBTITLE_SLIDES.length);
      }, 4200);
      return () => clearInterval(id);
   }, []);

   // Entrance fade-up runs via CSS; after 1.3s "settle" to final state (matches эталон).
   useEffect(() => {
      const node = sectionRef.current;
      if (!node) return;
      const settle = setTimeout(() => {
         node.querySelectorAll<HTMLElement>(`.${styles.enter}`).forEach((el) => {
            el.style.animation = "none";
            el.style.opacity = "1";
            el.style.transform = "none";
         });
      }, 1300);
      return () => clearTimeout(settle);
   }, []);

   // Ambient nodes/plus-marks/connectors drift toward the cursor — a soft,
   // lerped parallax (not 1:1 tracking) so it reads as alive rather than static.
   // Desktop-with-mouse only; skipped for touch and reduced-motion.
   useEffect(() => {
      const node = sectionRef.current;
      if (!node) return;
      const canHover = window.matchMedia?.("(hover: hover) and (pointer: fine)").matches;
      const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      if (!canHover || reduced) return;

      let targetX = 0;
      let targetY = 0;
      let curX = 0;
      let curY = 0;
      let raf = 0;

      const onMove = (e: MouseEvent) => {
         const rect = node.getBoundingClientRect();
         targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
         targetY = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      };
      const onLeave = () => { targetX = 0; targetY = 0; };
      const tick = () => {
         curX += (targetX - curX) * 0.06;
         curY += (targetY - curY) * 0.06;
         node.style.setProperty("--mx", curX.toFixed(4));
         node.style.setProperty("--my", curY.toFixed(4));
         raf = requestAnimationFrame(tick);
      };

      node.addEventListener("mousemove", onMove);
      node.addEventListener("mouseleave", onLeave);
      raf = requestAnimationFrame(tick);

      return () => {
         node.removeEventListener("mousemove", onMove);
         node.removeEventListener("mouseleave", onLeave);
         cancelAnimationFrame(raf);
      };
   }, []);

   return (
      <section ref={sectionRef} className={styles.hero} data-screen-label="01 Hero">
         <div className={styles.grid} />

         {/* ambient pulsing nodes + plus marks — nearer layer, moves more with the cursor */}
         <div className={styles.parallaxNear}>
            <div className={`${styles.amb} ${styles.node}`} style={{ left: "20%", top: "41%" }} />
            <div className={`${styles.amb} ${styles.node}`} style={{ left: "25%", bottom: "32%", width: 8, height: 8, animationDuration: "3.6s", animationDelay: ".6s" }} />
            <div className={`${styles.amb} ${styles.node}`} style={{ right: "22%", top: "50%", animationDuration: "3.4s", animationDelay: ".9s" }} />
            <div className={`${styles.amb} ${styles.node}`} style={{ right: "30%", top: "28%", width: 7, height: 7, animationDuration: "2.8s", animationDelay: ".4s" }} />
            <div className={`${styles.amb} ${styles.node}`} style={{ left: "10%", top: "60%", width: 7, height: 7, animationDuration: "2.6s", animationDelay: "1.3s" }} />
            <div className={`${styles.amb} ${styles.node}`} style={{ left: "34%", top: "22%", animationDuration: "3s", animationDelay: "1.7s" }} />
            <div className={`${styles.amb} ${styles.node}`} style={{ right: "12%", bottom: "42%", animationDuration: "3.8s", animationDelay: ".2s" }} />
            <div className={`${styles.amb} ${styles.node}`} style={{ right: "36%", bottom: "20%", width: 8, height: 8, animationDuration: "2.4s", animationDelay: "1.5s" }} />
            <div className={`${styles.amb} ${styles.plus}`} style={{ left: "17%", bottom: "34%" }}>+</div>
            <div className={`${styles.amb} ${styles.plus}`} style={{ right: "27%", bottom: "34%" }}>+</div>
            <div className={`${styles.amb} ${styles.plus}`} style={{ left: "17%", top: "28%" }}>+</div>
            <div className={`${styles.amb} ${styles.plus}`} style={{ right: "22%", top: "28%" }}>+</div>
         </div>

         {/* flowing data connectors — sits further back, drifts less */}
         <div className={styles.parallaxFar}>
            <svg viewBox="0 0 1920 1080" fill="none" preserveAspectRatio="xMidYMid slice" className={`${styles.amb} ${styles.connectors}`}>
               <g stroke="rgba(86,150,255,.32)" strokeWidth="1.5" strokeDasharray="9 11" strokeLinecap="round">
                  <path d="M300 430 H470 a16 16 0 0 1 16 16 V520" style={{ animation: "ll-flow 4.5s linear infinite" }} />
                  <path d="M360 690 H560 a16 16 0 0 0 16 -16 V600" style={{ animation: "ll-flow2 5s linear infinite" }} />
                  <path d="M1620 360 H1450 a16 16 0 0 0 -16 16 V470" style={{ animation: "ll-flow2 4.2s linear .3s infinite" }} />
                  <path d="M1560 660 H1370 a16 16 0 0 1 -16 -16 V560" style={{ animation: "ll-flow 4.8s linear .6s infinite" }} />
               </g>
               <g stroke="#5ab0ff" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="96 144" style={{ filter: "drop-shadow(0 0 8px rgba(90,176,255,.95))" }}>
                  <path d="M300 430 H470 a16 16 0 0 1 16 16 V520" style={{ animation: "ll-flow 3s linear infinite" }} />
                  <path d="M360 690 H560 a16 16 0 0 0 16 -16 V600" style={{ animation: "ll-flow2 3.4s linear infinite" }} />
                  <path d="M1620 360 H1450 a16 16 0 0 0 -16 16 V470" style={{ animation: "ll-flow2 2.8s linear .5s infinite" }} />
                  <path d="M1560 660 H1370 a16 16 0 0 1 -16 -16 V560" style={{ animation: "ll-flow 3.2s linear .8s infinite" }} />
               </g>
            </svg>
         </div>

         {/* module card — site scan */}
         <div className={`${styles.hcard} ${styles.hcardScan}`} style={{ width: 202, animation: "ll-drift 7s ease-in-out infinite" }}>
            <div className={styles.card} style={{ padding: "24px 22px" }}>
               <div className={styles.scanline} />
               <div style={{ display: "flex", justifyContent: "center" }}>
                  <div className={styles.iconCircle}>
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#56b8ff" strokeWidth="1.4" /><path d="M3 12h18M12 3c2.5 2.5 2.5 16 0 18M12 3c-2.5 2.5-2.5 16 0 18" stroke="#56b8ff" strokeWidth="1.2" /></svg>
                  </div>
               </div>
               <div className={styles.tag} style={{ marginTop: 18 }}>СКАН&nbsp;САЙТА</div>
            </div>
         </div>

         {/* module card — CRM sync */}
         <div className={`${styles.hcard} ${styles.hcardCrm}`} style={{ width: 212, animation: "ll-drift 8s ease-in-out .8s infinite" }}>
            <div className={styles.card} style={{ padding: 22 }}>
               <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div className={styles.crmBox}>B24</div>
                  <svg width="60" height="16" viewBox="0 0 60 16" fill="none"><path d="M2 8h56" stroke="rgba(86,150,255,.3)" strokeWidth="1.4" strokeDasharray="3 4" /><circle r="3" fill="#39a0ff"><animateMotion dur="2.2s" repeatCount="indefinite" path="M2 8 H58" /></circle></svg>
                  <div className={styles.crmBox}>amo</div>
               </div>
               <div className={styles.tag}>CRM&nbsp;SYNC</div>
            </div>
         </div>

         {/* module card — sources */}
         <div className={`${styles.hcard} ${styles.hcardSources}`} style={{ width: 220, animation: "ll-drift 7.5s ease-in-out .4s infinite" }}>
            <div className={styles.card} style={{ padding: 22 }}>
               <div className={styles.docPanel}>
                  <div className={styles.docLine} style={{ height: 7, width: "70%", background: "rgba(86,150,255,.28)" }} />
                  <div className={styles.docLine} style={{ height: 7, width: "90%", background: "rgba(86,150,255,.20)" }} />
                  <div className={styles.docLine} style={{ height: 7, width: "55%", background: "rgba(86,150,255,.20)", marginBottom: 0 }} />
                  <div className={styles.docScan} />
               </div>
               <div className={styles.tag}>ИСТОЧНИКИ</div>
            </div>
         </div>

         {/* module card — enrichment */}
         <div className={`${styles.hcard} ${styles.hcardEnrich}`} style={{ width: 220, animation: "ll-drift 8.5s ease-in-out 1s infinite" }}>
            <div className={styles.card} style={{ padding: 22 }}>
               <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div className={styles.iconCircle} style={{ width: 42, height: 42 }}>
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M12 2l2.4 6.6L21 11l-6.6 2.4L12 20l-2.4-6.6L3 11l6.6-2.4z" stroke="#56b8ff" strokeWidth="1.3" strokeLinejoin="round" /></svg>
                  </div>
                  <div style={{ flex: 1 }}>
                     <div className={styles.enrichBar}><div className={styles.enrichFill} /></div>
                     <div style={{ marginTop: 8, height: 6, width: "70%", borderRadius: 4, background: "rgba(86,150,255,.14)" }} />
                  </div>
               </div>
               <div className={styles.tag}>ОБОГАЩЕНИЕ</div>
            </div>
         </div>

         {/* centred content */}
         <div className={styles.content}>
            <div className={`${styles.badge} ${styles.enter}`}>
               <span className={styles.badgeCheck}>
                  <svg width="13" height="10" viewBox="0 0 16 12" fill="none">
                     <path d="M1 6l4.5 4.5L15 1" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
               </span>
               Официальное агентство от сервиса AI-UP
            </div>
            <div className={styles.mobileStage} aria-hidden>
               <div className={styles.mobileAmb}>
                  <svg className={styles.mobileConnectors} viewBox="0 0 320 240" fill="none" preserveAspectRatio="xMidYMid slice">
                     <g stroke="rgba(86,150,255,.22)" strokeWidth="1.4" strokeDasharray="7 11" strokeLinecap="round">
                        <path d="M20 62 H120 a12 12 0 0 1 12 12 V150" style={{ animation: "ll-flow 6s linear infinite" }} />
                        <path d="M300 84 H210 a12 12 0 0 0 -12 12 V170" style={{ animation: "ll-flow2 6.6s linear .4s infinite" }} />
                        <path d="M52 220 H150 a12 12 0 0 0 12 -12 V150" style={{ animation: "ll-flow 7s linear .8s infinite" }} />
                     </g>
                  </svg>
                  <div className={styles.node} style={{ left: "14%", top: "24%", animationDuration: "3s" }} />
                  <div className={styles.node} style={{ left: "80%", top: "18%", width: 7, height: 7, animationDuration: "2.6s", animationDelay: ".5s" }} />
                  <div className={styles.node} style={{ left: "30%", top: "64%", animationDuration: "3.4s", animationDelay: ".9s" }} />
                  <div className={styles.node} style={{ left: "70%", top: "72%", width: 7, height: 7, animationDuration: "2.8s", animationDelay: "1.3s" }} />
                  <div className={styles.node} style={{ left: "50%", top: "42%", animationDuration: "3.2s", animationDelay: ".3s" }} />
                  <span className={styles.plus} style={{ left: "22%", top: "72%" }}>+</span>
                  <span className={styles.plus} style={{ left: "84%", top: "48%" }}>+</span>
                  <span className={styles.plus} style={{ left: "46%", top: "10%" }}>+</span>
                  <div className={styles.mobileSourceCard} style={{ animation: "ll-drift 7.5s ease-in-out infinite" }}>
                     <div className={styles.docPanel}>
                        <div className={styles.docLine} style={{ height: 7, width: "70%", background: "rgba(86,150,255,.28)" }} />
                        <div className={styles.docLine} style={{ height: 7, width: "90%", background: "rgba(86,150,255,.20)" }} />
                        <div className={styles.docLine} style={{ height: 7, width: "55%", background: "rgba(86,150,255,.20)", marginBottom: 0 }} />
                        <div className={styles.docScan} />
                     </div>
                     <div className={styles.mobileSourceTag}>ИСТОЧНИКИ</div>
                  </div>
               </div>
            </div>
            <h1 className={`${styles.title} ${styles.enter}`}>
               Получаете контакты людей, которые вчера выбирали вашего <span>конкурента</span>
            </h1>
            <div className={`${styles.subtitle} ${styles.enter}`}>
               {HERO_SUBTITLE_SLIDES.map((text, i) => (
                  <p
                     key={text}
                     className={`${styles.subtitleSlide}${i === subtitleSlide ? ` ${styles.subtitleSlideActive}` : ""}`}
                  >
                     {text}
                  </p>
               ))}
            </div>
            <div className={`${styles.actions} ${styles.enter}`}>
               <button type="button" className={styles.btnPrimary} data-lead-form>Заказать звонок</button>
               <button type="button" className={styles.btnGhost}>Написать в Telegram</button>
            </div>
            <p className={`${styles.note} ${styles.enter}`}>
               Бесплатный аудит вашей ниши за 30 минут — покажем потенциал перехвата с расчётом
            </p>
         </div>
      </section>
   );
}

export default CallCenterFirst;
