"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CallCenterCases.module.scss";

gsap.registerPlugin(ScrollTrigger);

// Section 10 — Кейсы. Built from Figma (header 3357:20570, cards Frame 9508 = 3407:520).
// Two case cards: eyebrow, title, 3D render, stat boxes, quote + avatar, "Читать кейс".
type Stat = { value: string; label?: string; full?: boolean };

type CaseCard = {
   tab: string;
   eyebrow: string;
   title: string;
   render: { src: string; alt: string; w: number };
   rows: Stat[][];
   quote: string;
   avatar: string;
   author: string;
};

const CASES: CaseCard[] = [
   {
      tab: "Стоматология",
      eyebrow: "Кейс 1: Стоматология · Москва",
      title: "47 пациентов за 2 месяца",
      render: { src: "/img/call-center/cases/tooth.png", alt: "", w: 110 },
      rows: [
         [{ value: "68 000 ₽", label: "бюджет" }, { value: "4,23 млн ₽", label: "выручка" }],
         [{ value: "3 200 ₽ → 400 ₽", label: "(×8 дешевле) CPL снизился" }, { value: "×62", label: "ROI" }],
      ],
      quote: "«Не верила, что это работает. Запустили на минимальном пакете — за две недели окупились в 8 раз»",
      avatar: "/img/call-center/cases/avatar-doctor.png",
      author: "Главврач сети, 4 клиники, Москва",
   },
   {
      tab: "Недвижимость",
      eyebrow: "Кейс 2: Недвижимость · Бали",
      title: "10 млн ₽ — сделка с одного теста",
      render: { src: "/img/call-center/cases/building.png", alt: "", w: 200 },
      rows: [
         [{ value: "5 000 ₽", label: "бюджет" }, { value: "×62", label: "ROI" }],
         [{ value: "100 контактов → 1 сделка на виллу 125 000 $", full: true }],
      ],
      quote: "«На обычной рекламе закрытие сделки стоит 200–300 тысяч. Здесь — пять тысяч и одна сделка покрыла бюджет на год вперёд»",
      avatar: "/img/call-center/cases/avatar-realtor.png",
      author: "Илья Королёв, партнёр застройщика",
   },
];

function CallCenterCases() {
   const sectionRef = useRef<HTMLElement | null>(null);
   const [shown, setShown] = useState(false);
   const [active, setActive] = useState(0);

   useEffect(() => {
      const node = sectionRef.current;
      if (!node) return;
      const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      if (reduced) { setShown(true); return; }
      const st = ScrollTrigger.create({ trigger: node, start: "top 75%", once: true, onEnter: () => setShown(true) });
      return () => { st.kill(); };
   }, []);

   return (
      <section ref={sectionRef} className={styles.section} data-screen-label="10 Кейсы">
         <div className={styles.inner}>
            <header className={styles.head}>
               <h2 className={styles.title}>Реальные результаты с конкретными цифрами</h2>
               <p className={styles.subtitle}>
                  Все наши кейсы публикуются в блоге AI-UP с реальными цифрами, источниками, скриптами
                  и комментариями клиентов
               </p>
            </header>

            {/* Mobile-only switcher above the slider */}
            <div className={styles.tabs}>
               {CASES.map((c, i) => (
                  <button
                     key={c.tab}
                     type="button"
                     className={`${styles.tab} ${active === i ? styles.tabOn : ""}`}
                     onClick={() => setActive(i)}
                  >
                     {c.tab}
                  </button>
               ))}
            </div>

            <div className={styles.grid}>
               {CASES.map((c, i) => (
                  <article
                     key={c.title}
                     className={`${styles.card} ${shown ? styles.in : ""} ${active === i ? styles.cardActive : ""}`}
                     style={{ transitionDelay: `${i * 120}ms` }}
                  >
                     <div className={styles.cardGrid} aria-hidden />
                     <div className={styles.cardTop}>
                        <div className={styles.cardHeadText}>
                           <div className={styles.eyebrow}>
                              <span className={styles.eyebrowDot} />
                              {c.eyebrow}
                           </div>
                           <h3 className={styles.cardTitle}>{c.title}</h3>
                        </div>
                        <img className={styles.render} src={c.render.src} alt={c.render.alt} style={{ width: c.render.w }} aria-hidden />
                     </div>

                     <div className={styles.stats}>
                        {c.rows.map((row, ri) => (
                           <div key={ri} className={styles.statRow}>
                              {row.map((s) => (
                                 <div key={s.value} className={`${styles.statBox} ${s.full ? styles.statFull : ""}`}>
                                    <span className={styles.statValue}>{s.value}</span>
                                    {s.label && <span className={styles.statLabel}>{s.label}</span>}
                                 </div>
                              ))}
                           </div>
                        ))}
                     </div>

                     <div className={styles.quoteRow}>
                        <p className={styles.quote}>{c.quote}</p>
                        <span className={styles.divider} aria-hidden />
                        <div className={styles.person}>
                           <span className={styles.avatar}>
                              <img src={c.avatar} alt="" aria-hidden />
                           </span>
                           <span className={styles.author}>{c.author}</span>
                        </div>
                     </div>

                     <button type="button" className={styles.readBtn}>Читать кейс</button>
                  </article>
               ))}
            </div>

            <div className={styles.nav} aria-hidden>
               <button type="button" className={styles.navArrow} aria-label="Назад">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                     <path d="M14 5l-7 7 7 7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
               </button>
               <button type="button" className={styles.navArrow} aria-label="Вперёд">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                     <path d="M10 5l7 7-7 7" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
               </button>
            </div>

            <button type="button" className={styles.blogBtn}>Перейти в блог</button>
         </div>
      </section>
   );
}

export default CallCenterCases;
