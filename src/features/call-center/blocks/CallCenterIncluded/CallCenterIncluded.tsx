"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CallCenterIncluded.module.scss";

gsap.registerPlugin(ScrollTrigger);

// Section 09 — «Что входит в работу КЦ». Replicated from
// design_handoff_aiup_landing/Что входит в работу КЦ.dc.html (Figma Group 1965 = 3407:372):
// glowing torus portal + concentric ripples + 4 connector lines to 4 frosted cards.
// Fixed 1600×920 stage, scaled to fit container. Entrance anims gated on scroll; ambient loops always on.

// Endpoints re-anchored to each card's actual bottom edge (+18px gap, matching
// the "Запись разговоров" card which was already correct) — cards 1/2/4 grew
// taller than the original artwork after their copy was lengthened, so the old
// endpoints landed inside the box instead of at its border.
const LINE_PATHS = [
   "M796,778 L796,509 Q796,491 776,491 L490,491 Q470,491 470,471 L470,441",
   "M788,780 L788,765 Q788,747 768,747 L340,747 Q320,747 320,729 L320,715",
   "M804,778 L804,458 Q804,440 824,440 L1040,440 Q1060,440 1060,422 L1060,380",
   "M812,780 L812,621 Q812,603 832,603 L1160,603 Q1180,603 1180,585 L1180,573",
];
const DOTS = [
   { cx: 470, cy: 441 },
   { cx: 320, cy: 715 },
   { cx: 1060, cy: 380 },
   { cx: 1180, cy: 573 },
];

const CARDS: { left: number; top: number; width: number; delay: string; title: string; desc: string }[] = [
   { left: 300, top: 250, width: 340, delay: "1s", title: "Адаптация скрипта", desc: "Наш редактор адаптирует ваш скрипт под телефонный формат за 1 рабочий день" },
   { left: 150, top: 474, width: 340, delay: "1.25s", title: "4 попытки дозвона", desc: "Каждая попытка — с номера нового мобильного оператора. Карусель номеров не даёт звонку уйти в спам — дозваниваемся до каждого лида" },
   { left: 980, top: 214, width: 360, delay: "1.1s", title: "Запись разговоров", desc: "Запись каждого разговора хранится 90 дней и доступна в карточке лида" },
   { left: 1110, top: 382, width: 360, delay: "1.35s", title: "Дозвон до 70%", desc: "До 70% полученных контактов доходят до живого разговора — за счёт 4 попыток и карусели номеров" },
];

function CallCenterIncluded() {
   const sectionRef = useRef<HTMLElement | null>(null);
   const stageWrapRef = useRef<HTMLDivElement | null>(null);
   const [shown, setShown] = useState(false);
   const [scale, setScale] = useState(1);

   useEffect(() => {
      const node = sectionRef.current;
      if (!node) return;
      const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      if (reduced) { setShown(true); return; }
      const st = ScrollTrigger.create({ trigger: node, start: "top 75%", once: true, onEnter: () => setShown(true) });
      return () => { st.kill(); };
   }, []);

   // Scale the fixed 1600px stage to fit the container width (cap at 1).
   useEffect(() => {
      const wrap = stageWrapRef.current;
      if (!wrap) return;
      const ro = new ResizeObserver(() => setScale(Math.min(1, wrap.clientWidth / 1600)));
      ro.observe(wrap);
      return () => ro.disconnect();
   }, []);

   const run = shown ? ` ${styles.run}` : "";

   return (
      <section ref={sectionRef} className={styles.section} data-screen-label="09 Что входит в работу КЦ">
         <div ref={stageWrapRef} className={styles.stageWrap} style={{ height: 1010 * scale }}>
            <div className={styles.stage} style={{ transform: `translateX(-50%) scale(${scale})` }}>
               {/* faint grid overlay */}
               <div className={styles.grid} />

               {/* header lockup */}
               <div className={styles.header}>
                  <div className={styles.eyebrow}>
                     <span className={styles.eyebrowDot} />
                     колл-центр
                  </div>
                  <h2 className={styles.title}>Что входит в работу КЦ</h2>
               </div>

               {/* ambient pool + transient ground ripples (no static outline rings —
                   the reference keeps the surround clean, bands only) */}
               <div className={styles.pool} />
               <div className={styles.rippleEl} />
               <div className={styles.rippleEl} style={{ "--rd": "2.5s" } as React.CSSProperties} />

               {/* connector lines */}
               <svg viewBox="0 0 1600 920" width="1600" height="920" fill="none" className={styles.lines}>
                  <defs>
                     <filter id="kcLineGlow" x="-40%" y="-40%" width="180%" height="180%">
                        <feGaussianBlur stdDeviation="3" result="b" />
                        <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                     </filter>
                     <linearGradient id="kcLineGrad" x1="0" y1="1" x2="0" y2="0">
                        <stop offset="0%" stopColor="#0169F9" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#0169F9" stopOpacity="0.32" />
                     </linearGradient>
                  </defs>
                  <g stroke="url(#kcLineGrad)" strokeWidth="1.5" filter="url(#kcLineGlow)" className={`${styles.drawGroup}${run}`}>
                     {LINE_PATHS.map((d) => <path key={d} pathLength={1} d={d} />)}
                  </g>
                  <g stroke="rgba(150,195,255,.95)" strokeWidth="2" strokeLinecap="round" filter="url(#kcLineGlow)" className={styles.flow}>
                     {LINE_PATHS.map((d, i) => (
                        <path key={d} className={styles.flowPath} pathLength={1} d={d} style={{ animationDelay: `${i * -3.5}s` }} />
                     ))}
                  </g>
                  <g fill="#0169F9" className={`${styles.dots}${run}`}>
                     {DOTS.map((p) => <circle key={`${p.cx}-${p.cy}`} cx={p.cx} cy={p.cy} r={3.5} />)}
                  </g>
               </svg>

               {/* the glowing torus — a single elliptical ring around a dark hole */}
               <div className={styles.torus}>
                  <div className={styles.torusPool} />
                  <div className={styles.torusRing} />
               </div>

               {/* cards */}
               {CARDS.map((c) => (
                  <div
                     key={c.title}
                     className={`${styles.card}${run}`}
                     style={{ left: c.left, top: c.top, width: c.width, "--cd": c.delay } as React.CSSProperties}
                  >
                     <div className={styles.cardHead}>
                        <span className={styles.cardCheck}>
                           <svg width="15" height="11" viewBox="0 0 16 12" fill="none"><path d="M1 6l4.5 4.5L15 1" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </span>
                        <span className={styles.cardTitle}>{c.title}</span>
                     </div>
                     <p className={styles.cardDesc}>{c.desc}</p>
                  </div>
               ))}
            </div>
         </div>

         {/* Mobile: heavy animated stage is hidden; cards become a swipe slider. */}
         <div className={styles.mobile}>
            <div className={styles.mHeader}>
               <div className={styles.eyebrow}>
                  <span className={styles.eyebrowDot} />
                  колл-центр
               </div>
               <h2 className={styles.mTitle}>Что входит в работу КЦ</h2>
            </div>
            <div className={styles.slider}>
               {CARDS.map((c) => (
                  <div key={c.title} className={styles.slide}>
                     <div className={styles.cardHead}>
                        <span className={styles.cardCheck}>
                           <svg width="15" height="11" viewBox="0 0 16 12" fill="none"><path d="M1 6l4.5 4.5L15 1" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </span>
                        <span className={styles.cardTitle}>{c.title}</span>
                     </div>
                     <p className={styles.cardDesc}>{c.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
}

export default CallCenterIncluded;
