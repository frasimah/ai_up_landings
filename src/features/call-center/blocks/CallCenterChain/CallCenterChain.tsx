"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CallCenterChain.module.scss";

gsap.registerPlugin(ScrollTrigger);

// Section 12 — диаграмма «Обычная / Наша цепочка». Figma: title 3357:20573,
// «Обычная цепочка» dashed row 3357:20637, «Наша цепочка» curve frame (vector 3428:565,
// 1237.82×781.567) with accent 3428:566 / glow 3428:568, label 3428:564, drop-lines
// 3428:570 + dots 3428:587/588, badges 3428:572/582, caption 3357:20634.
// The curve sub-block is rebuilt at its NATURAL 1238px width (scaled-to-fit) so it fills
// the frame exactly as in Figma, instead of floating inside an oversized shared stage.

// Curve frame natural size + headroom above for the centered «Наша цепочка» label.
const STAGE_W = 1237.82;
const CURVE_H = 781.567;
const HEAD = 94; // label sits 94px above the curve top (Figma rel y = -94)
const STAGE_H = HEAD + CURVE_H;

// Exact Figma vector paths (node 3428:565 white S-curve, 3428:566 blue accent).
const PATH_MAIN =
   "M288.936 0.994C288.936 0.994 -47.9103 35.6353 7.06509 196.249C62.0405 356.863 493.723 358.94 776.213 457.751C1086.5 566.285 1237 780.994 1237 780.994";
const PATH_ACCENT =
   "M288.936 0.994C288.936 0.994 -47.9103 35.6354 7.06509 196.249C32.2036 269.693 136.109 309.987 268.5 341.539";

function CallCenterChain() {
   const wrapRef = useRef<HTMLDivElement | null>(null);
   const stageRef = useRef<HTMLDivElement | null>(null);
   const mainRef = useRef<SVGPathElement | null>(null);
   const accentRef = useRef<SVGPathElement | null>(null);
   const glowRef = useRef<SVGPathElement | null>(null);
   const line1Ref = useRef<SVGLineElement | null>(null);
   const line2Ref = useRef<SVGLineElement | null>(null);
   const dot1Ref = useRef<SVGCircleElement | null>(null);
   const dot2Ref = useRef<SVGCircleElement | null>(null);
   const badge1Ref = useRef<HTMLDivElement | null>(null);
   const badge2Ref = useRef<HTMLDivElement | null>(null);
   const [scale, setScale] = useState(1);

   // Scale the natural-width curve stage to fit the container (cap at 1).
   useEffect(() => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const ro = new ResizeObserver(() => setScale(Math.min(1, wrap.clientWidth / STAGE_W)));
      ro.observe(wrap);
      return () => ro.disconnect();
   }, []);

   // Elegant scroll-scrubbed draw: a light travels platform → you as the section scrolls,
   // dots ignite and badges rise in sequence as the line reaches each step.
   useEffect(() => {
      const stage = stageRef.current;
      const wrap = wrapRef.current;
      const main = mainRef.current;
      const accent = accentRef.current;
      const glow = glowRef.current;
      if (!stage || !wrap || !main || !accent || !glow) return;

      const draw = [main, accent, glow];
      const lines = [line1Ref.current, line2Ref.current];
      const dots = [dot1Ref.current, dot2Ref.current];
      const badges = [badge1Ref.current, badge2Ref.current];

      const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
         gsap.set(draw, { strokeDashoffset: 0 });
         gsap.set([...lines, ...badges], { autoAlpha: 1, y: 0 });
         gsap.set(dots, { scale: 1 });
         return;
      }

      const ctx = gsap.context(() => {
         gsap.set(draw, { strokeDashoffset: 1 });
         gsap.set(lines, { autoAlpha: 0 });
         gsap.set(dots, { scale: 0, transformOrigin: "center" });
         gsap.set(badges, { autoAlpha: 0, y: 16 });

         const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: wrap, start: "top 82%", end: "center 45%", scrub: 1 },
         });

         tl.to(main, { strokeDashoffset: 0, duration: 1 }, 0)
            .to([accent, glow], { strokeDashoffset: 0, duration: 0.42 }, 0)
            // step 1 — platform anchor
            .to(line1Ref.current, { autoAlpha: 1, duration: 0.1 }, 0.32)
            .to(dot1Ref.current, { scale: 1, duration: 0.12, ease: "back.out(2)" }, 0.36)
            .to(badge1Ref.current, { autoAlpha: 1, y: 0, duration: 0.16, ease: "power2.out" }, 0.38)
            // step 2 — you
            .to(line2Ref.current, { autoAlpha: 1, duration: 0.1 }, 0.74)
            .to(dot2Ref.current, { scale: 1, duration: 0.12, ease: "back.out(2)" }, 0.78)
            .to(badge2Ref.current, { autoAlpha: 1, y: 0, duration: 0.16, ease: "power2.out" }, 0.8);
      }, stage);

      return () => ctx.revert();
   }, []);

   return (
      <section className={styles.section} data-screen-label="12 Цепочка">
         <div className={styles.inner}>
            <header className={styles.head}>
               <h2 className={styles.title}>
                  Внутренние тарифы платформы.<br />Цена ниже, чем у любого подрядчика на рынке
               </h2>
               <p className={styles.subtitle}>
                  Когда вы покупаете «под ключ» у агентства — между вами и платформой стоит ещё одна
                  компания со своей наценкой. Когда работаете с нашей командой — этого слоя нет, вы
                  получаете тариф уровня самой платформы
               </p>
            </header>

            {/* «Обычная цепочка» — dashed 3-box row */}
            <div className={styles.normalChain}>
               <span className={styles.rowLabel}>Обычная цепочка</span>
               <div className={styles.row}>
                  <div className={styles.box}>платформа сбора данных</div>
                  <span className={styles.arrow} aria-hidden>
                     <svg width="23" height="20" viewBox="0 0 23 20" fill="none"><path d="M2 10h18m0 0l-6-6m6 6l-6 6" stroke="#686d7c" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <div className={styles.box}><span>агентство-посредник</span><span>+30-40% наценки</span></div>
                  <span className={styles.arrow} aria-hidden>
                     <svg width="23" height="20" viewBox="0 0 23 20" fill="none"><path d="M2 10h18m0 0l-6-6m6 6l-6 6" stroke="#686d7c" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <div className={styles.box}>вы</div>
               </div>
            </div>

            {/* «Наша цепочка» — bypass curve, rebuilt at natural Figma proportions */}
            <div className={styles.stageWrap} ref={wrapRef} style={{ height: STAGE_H * scale }}>
               <div className={styles.stage} ref={stageRef} style={{ transform: `translateX(-50%) scale(${scale})` }}>
                  <span className={styles.curveLabel}>Наша цепочка</span>

                  <svg
                     className={styles.curves}
                     viewBox={`0 0 ${STAGE_W} ${CURVE_H}`}
                     width={STAGE_W}
                     height={CURVE_H}
                     style={{ top: HEAD }}
                     fill="none"
                     aria-hidden
                  >
                     <defs>
                        <linearGradient id="chainWhite" x1="288" y1="0.994" x2="1237" y2="780.994" gradientUnits="userSpaceOnUse">
                           <stop stopColor="#fff" stopOpacity="0" />
                           <stop offset="0.551" stopColor="#fff" />
                           <stop offset="1" stopColor="#fff" stopOpacity="0" />
                        </linearGradient>
                        <linearGradient id="chainBlue" x1="289" y1="0.994" x2="166.5" y2="316.994" gradientUnits="userSpaceOnUse">
                           <stop stopColor="#0169F9" stopOpacity="0" />
                           <stop offset="1" stopColor="#0169F9" />
                        </linearGradient>
                     </defs>

                     {/* blue glow under the platform-side accent */}
                     <path ref={glowRef} className={`${styles.draw} ${styles.glow}`} d={PATH_ACCENT} stroke="#0169F9" strokeOpacity="0.35" strokeWidth="8" pathLength={1} />
                     {/* crisp white sweep platform → you — hairline, matching Figma */}
                     <path ref={mainRef} className={styles.draw} d={PATH_MAIN} stroke="url(#chainWhite)" strokeWidth="1" pathLength={1} />
                     {/* crisp blue accent near platform */}
                     <path ref={accentRef} className={styles.draw} d={PATH_ACCENT} stroke="url(#chainBlue)" strokeWidth="1" pathLength={1} />

                     {/* vertical drop-lines + cyan anchor dots */}
                     <line ref={line1Ref} x1="268" y1="223" x2="268" y2="463" stroke="#686d7c" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="4 4" />
                     <line ref={line2Ref} x1="911" y1="398" x2="911" y2="638" stroke="#686d7c" strokeOpacity="0.5" strokeWidth="1" strokeDasharray="4 4" />
                     <circle ref={dot1Ref} cx="268" cy="340" r="3.5" fill="#12bbff" />
                     <circle ref={dot2Ref} cx="911" cy="515" r="3.5" fill="#12bbff" />
                  </svg>

                  <div ref={badge1Ref} className={styles.badge} style={{ left: 298, top: HEAD + 223 }}>
                     <div className={styles.badgeStep}><span className={styles.badgeDot} />1 шаг</div>
                     <div className={styles.badgeName}>платформа<br />AI-UP</div>
                  </div>
                  <div ref={badge2Ref} className={styles.badge} style={{ left: 941, top: HEAD + 398 }}>
                     <div className={styles.badgeStep}><span className={styles.badgeDot} />2 шаг</div>
                     <div className={styles.badgeName}>вы<br />(внутренний тариф)</div>
                  </div>
               </div>
            </div>

            {/* Mobile: the scaled-down curve collapses into an unreadable void — show a
                compact 2-step chain instead, mirroring «Обычная цепочка» above. */}
            <div className={styles.ourChainMobile}>
               <span className={`${styles.rowLabel} ${styles.rowLabelOur}`}>Наша цепочка</span>
               <div className={styles.row}>
                  <div className={`${styles.box} ${styles.boxOur}`}>
                     <span className={styles.boxStep}>1 шаг</span>
                     <span>платформа AI-UP</span>
                  </div>
                  <span className={styles.arrow} aria-hidden>
                     <svg width="23" height="20" viewBox="0 0 23 20" fill="none"><path d="M2 10h18m0 0l-6-6m6 6l-6 6" stroke="#12bbff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <div className={`${styles.box} ${styles.boxOur}`}>
                     <span className={styles.boxStep}>2 шаг</span>
                     <span>вы (внутренний тариф)</span>
                  </div>
               </div>
            </div>

            <p className={styles.caption}>
               Это не маркетинговая фраза «у нас дешевле». Это структурное преимущество: у нас просто
               меньше рук между вами и платформой
            </p>
         </div>
      </section>
   );
}

export default CallCenterChain;
