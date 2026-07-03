"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CallCenterSenior.module.scss";

gsap.registerPlugin(ScrollTrigger);

// Section 08 — Senior-операторы. Built from Figma (title 3357:20479, script modal 3357:20444,
// cards 3357:20522/20534/20528/20540). Two-column: script mockup + 2×2 quality cards.
const CARDS: { title: string; desc: string }[] = [
   {
      title: "Знают типичные возражения по нишам",
      desc: "«дорого», «уже работаем», «не интересно». Закрывают их без зачитывания скрипта",
   },
   {
      title: "Чувствуют тон собеседника",
      desc: "когда нужно дожать, когда лучше отступить и предложить перезвонить",
   },
   {
      title: "Адаптируют скрипт на лету",
      desc: "не «робот, читающий по бумажке», а профессионал, ведущий разговор",
   },
   {
      title: "Передают живых лидов",
      desc: "не статус «Интересен» формально, а реальный заинтересованный клиент с деталями в комментарии",
   },
];

function CallCenterSenior() {
   const sectionRef = useRef<HTMLElement | null>(null);
   const [shown, setShown] = useState(false);

   useEffect(() => {
      const node = sectionRef.current;
      if (!node) return;

      const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      if (reduced) { setShown(true); return; }

      const st = ScrollTrigger.create({ trigger: node, start: "top 70%", once: true, onEnter: () => setShown(true) });
      return () => { st.kill(); };
   }, []);

   return (
      <section ref={sectionRef} className={styles.section} data-screen-label="08 Senior-операторы">
         <div className={styles.inner}>
            <header className={styles.head}>
               <h2 className={styles.title}>
                  20 операторов в команде.<br />
                  На ваш проект — только Senior-уровень
               </h2>
               <p className={styles.subtitle}>
                  AI-UP — собственный колл-центр из 20 операторов. На обычные проекты в КЦ работают
                  операторы любого уровня. На проекты «под ключ» — только Senior: те, кто проработал в
                  нашей команде не менее 4 месяцев и провёл тысячи разговоров с холодной базой
               </p>
            </header>

            <div className={styles.row}>
               <div className={`${styles.shot} ${shown ? styles.in : ""}`}>
                  <img src="/img/call-center/script-quality/script-modal.png" alt="Редактор скрипта звонка в AI-UP" />
               </div>
               <div className={styles.cards}>
                  {CARDS.map((c, i) => (
                     <article
                        key={c.title}
                        className={`${styles.card} ${shown ? styles.in : ""}`}
                        style={{ transitionDelay: `${i * 90}ms` }}
                     >
                        <span className={styles.check} aria-hidden>
                           <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                              <path d="M3.5 9.5L7 13L14.5 5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                           </svg>
                        </span>
                        <h3 className={styles.cardTitle}>{c.title}</h3>
                        <p className={styles.cardDesc}>{c.desc}</p>
                     </article>
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
}

export default CallCenterSenior;
