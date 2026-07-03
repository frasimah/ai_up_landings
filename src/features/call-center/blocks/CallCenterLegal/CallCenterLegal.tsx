"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CallCenterLegal.module.scss";

gsap.registerPlugin(ScrollTrigger);

// Section 17 — «Полностью законно. Подтверждено документально». Figma 3367:20818 + Frame 9458 (3357:19736) + 3357:20107.
const CARDS = [
   {
      title: "152-ФЗ",
      text: "Передаваемые контакты не содержат ФИО и других данных, по которым можно установить личность. По 152-ФЗ номер телефона без привязки к ФИО не является персональными данными",
   },
   {
      title: "Реестр РКН",
      text: "ООО «НЕЙРОЛИД» (юр.лицо AI-UP) зарегистрировано в реестре операторов персональных данных Роскомнадзора",
   },
   {
      title: "Серверы в РФ",
      text: "Все данные обрабатываются и хранятся на серверах на территории Российской Федерации",
   },
];

function CallCenterLegal() {
   const sectionRef = useRef<HTMLElement | null>(null);
   const [shown, setShown] = useState(false);

   useEffect(() => {
      const node = sectionRef.current;
      if (!node) return;
      const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      if (reduced) { setShown(true); return; }
      const st = ScrollTrigger.create({ trigger: node, start: "top 75%", once: true, onEnter: () => setShown(true) });
      return () => { st.kill(); };
   }, []);

   return (
      <section ref={sectionRef} className={styles.section} data-screen-label="17 Законно">
         <div className={styles.inner}>
            <div className={`${styles.head} ${shown ? styles.shown : ""}`}>
               <svg className={styles.lock} viewBox="0 0 38 40" fill="none" aria-hidden>
                  <path
                     d="M8 17V11a11 11 0 0 1 22 0v6"
                     stroke="currentColor"
                     strokeWidth="3"
                     strokeLinecap="round"
                  />
                  <rect x="3" y="17" width="32" height="21" rx="5" fill="currentColor" />
               </svg>
               <h2 className={styles.title}>
                  Полностью законно.<br />Подтверждено документально
               </h2>
            </div>

            <div className={styles.grid}>
               {CARDS.map((c, i) => (
                  <div
                     key={c.title}
                     className={`${styles.card} ${shown ? styles.shown : ""}`}
                     style={{ transitionDelay: shown ? `${0.1 + i * 0.12}s` : "0s" }}
                  >
                     <p className={styles.cardTitle}>{c.title}</p>
                     <p className={styles.cardText}>{c.text}</p>
                  </div>
               ))}
            </div>

            <p className={styles.note}>
               Юридический отдел AI-UP согласует индивидуальные требования к договору, NDA, обработке
               данных. Готовы работать по корпоративным стандартам
            </p>
         </div>
      </section>
   );
}

export default CallCenterLegal;
