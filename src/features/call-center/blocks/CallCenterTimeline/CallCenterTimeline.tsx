"use client";

import { useEffect, useRef } from "react";
import styles from "./CallCenterTimeline.module.scss";

// Section 03 — Таймлайн «4 шага». Replicated from "Таймлайн - 4 шага.dc.html".
type Step = {
   num: string;
   step: string;
   title: string;
   text: string;
   stats: { label: string; value: string; hot?: boolean }[];
};

const STEPS: Step[] = [
   {
      num: "01",
      step: "Шаг 01  /  Захват",
      title: "Захват",
      text: "Фиксируем номер человека, который вчера посещал сайт конкурента, звонил в их офис или попадал в их рекламную базу. 5 видов источников — выбираем оптимальный микс под вашу нишу",
      stats: [
         { label: "Источников", value: "5 видов" },
         { label: "Срок", value: "день захвата" },
      ],
   },
   {
      num: "02",
      step: "Шаг 02  /  Идентификация",
      title: "Идентификация",
      text: "Через нашу технологию номер привязывается к интересу — именно к вашей нише, именно сегодня. Точность — до 98% актуальных контактов",
      stats: [
         { label: "Точность", value: "до 98%" },
         { label: "Когда", value: "сегодня" },
      ],
   },
   {
      num: "03",
      step: "Шаг 03  /  Прозвон",
      title: "Прозвон скриптом",
      text: "Senior-операторы нашего КЦ обзванивают каждый контакт по вашему скрипту. Полноценная квалификация: интересен, отказ, не целевой, перезвонить. Запись каждого разговора",
      stats: [
         { label: "Статусов", value: "5" },
         { label: "Запись", value: "каждый звонок" },
      ],
   },
   {
      num: "04",
      step: "Шаг 04  /  CRM",
      title: "Передача в вашу CRM",
      text: "Готовые заявки автоматически попадают в Bitrix24, amoCRM или ваш Webhook. Менеджер получает квалифицированный лид с записью разговора и пометкой «горячий»",
      stats: [
         { label: "Интеграции", value: "Bitrix24 / amoCRM" },
         { label: "Метка", value: "горячий", hot: true },
      ],
   },
];

function CallCenterTimeline() {
   const sectionRef = useRef<HTMLElement | null>(null);

   // settle the fade-up entrance after 1.8s (matches the folder block)
   useEffect(() => {
      const node = sectionRef.current;
      if (!node) return;
      const t = setTimeout(() => {
         node.querySelectorAll<HTMLElement>(`.${styles.card}, .${styles.head}`).forEach((el) => {
            el.style.animation = "none";
         });
      }, 1800);
      return () => clearTimeout(t);
   }, []);

   return (
      <section ref={sectionRef} className={styles.section} data-screen-label="03 Таймлайн">
         <div className={styles.inner}>
            <div className={styles.head}>
               <div className={styles.eyebrow}><span />процесс</div>
               <h2 className={styles.title}>4 шага от первого контакта до записи в&nbsp;CRM</h2>
            </div>

            <div className={styles.track}>
               <div className={styles.rail}><div className={styles.railGlow} /></div>

               {STEPS.map((s, i) => (
                  <div key={s.num} className={styles.card} style={{ animationDelay: `${0.05 + i * 0.07}s` }}>
                     <div className={styles.cardWash} />
                     <span className={styles.ghostNum}>{s.num}</span>
                     <div className={styles.step}>{s.step}</div>
                     <h3 className={styles.cardTitle}>{s.title}</h3>
                     <p className={styles.cardText}>{s.text}</p>
                     <div className={styles.divider} />
                     <div className={styles.stats}>
                        {s.stats.map((st) => (
                           <div key={st.label} className={styles.stat}>
                              <span className={styles.statLabel}>{st.label}</span>
                              <span className={styles.statLeader} />
                              <span className={`${styles.statValue} ${st.hot ? styles.hot : ""}`}>{st.value}</span>
                           </div>
                        ))}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
}

export default CallCenterTimeline;
