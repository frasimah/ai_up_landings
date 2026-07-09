"use client";

import { useState } from "react";
import styles from "./CallCenterCost.module.scss";

// Section 14 — Тарифы. Rebuilt from Figma: title 3357:20428 + cards 3357:19792 (PREMIUM/VIP/ENTERPRISE)
// + note 3357:19944 + «Что входит во все тарифы» 3357:19945.
type Tier = {
   name: string;
   price: string;
   featured?: boolean;
   features: string[];
   cpl: string;
   cta: string;
};

const TIERS: Tier[] = [
   {
      name: "PREMIUM",
      price: "500 000 ₽",
      features: [
         "6 500 контактов",
         "5 видов источников, до 100 источников в работе",
         "Senior-операторы КЦ (минимум 4 месяца в команде)",
         "Технология дозвона: 4 оператора, выделенные номера, карусели",
         "Интеграция с CRM",
         "Личный кабинет 24/7",
         "Аккаунт-менеджер из команды AI-UP",
      ],
      cpl: "75 ₽",
      cta: "Заказать Premium",
   },
   {
      name: "VIP",
      price: "1 000 000 ₽",
      featured: true,
      features: [
         "14 000 контактов",
         "5 видов источников, до 300 источников в работе",
         "Senior-операторы КЦ + приоритетная очередь",
         "Технология дозвона с приоритетом обработки",
         "Интеграция с CRM + Webhook",
         "Расширенная аналитика по каналам",
         "Личный кабинет 24/7 + еженедельная сводка",
         "Персональный менеджер из команды AI-UP на связи 24/7",
      ],
      cpl: "71 ₽",
      cta: "Заказать VIP",
   },
   {
      name: "ENTERPRISE",
      price: "2 000 000 ₽",
      features: [
         "30 000 контактов",
         "5 видов источников, до 500 источников в работе + закрытые B2B-источники",
         "Senior-операторы КЦ без очереди",
         "Технология дозвона с максимальным приоритетом",
         "Интеграция с любой CRM + кастомные API",
         "Расширенная аналитика, отчёты по нишам",
         "Команда из 3 специалистов AI-UP (менеджер + аналитик + супервайзер КЦ)",
      ],
      cpl: "66 ₽",
      cta: "Заказать Enterprise",
   },
];

const WHAT_INCLUDED = [
   "Анализ ниши и подбор источников от маркетологов AI-UP с опытом 300+ проектов",
   "Создание и модерация скрипта прозвона (1 рабочий день)",
   "Настройка источников захвата",
   "Прозвон Senior-операторами с записью",
   "Технология дозвона с 4 операторами и каруселями номеров",
   "Юридическое сопровождение 152-ФЗ",
   "Передача данных в вашу CRM",
   "Срок старта: 3-7 дней с момента согласования",
];

const Check = ({ className }: { className: string }) => (
   <svg className={className} width="14" height="11" viewBox="0 0 16 12" fill="none">
      <path d="M1 6l4.5 4.5L15 1" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
   </svg>
);

function CallCenterCost() {
   const [active, setActive] = useState(1); // VIP shown first on mobile

   return (
      <section className={styles.section} data-screen-label="14 Тарифы">
         <div className={styles.inner}>
            <div className={styles.head}>
               <div className={styles.eyebrow}><span />под ключ</div>
               <h2 className={styles.title}>Всё включено в стоимость</h2>
               <p className={styles.lead}>
                  Никакой абонентской платы, доплат за колл-центр или премиальные источники.
                  Один платёж — полный цикл от настройки до передачи лидов в вашу CRM
               </p>
            </div>

            {/* Mobile-only switcher above the single-column card */}
            <div className={styles.tabs}>
               {TIERS.map((t, i) => (
                  <button
                     key={t.name}
                     type="button"
                     className={`${styles.tab} ${active === i ? styles.tabOn : ""}`}
                     onClick={() => setActive(i)}
                  >
                     {t.name}
                  </button>
               ))}
            </div>

            <div className={styles.grid}>
               {TIERS.map((t, i) => (
                  <div
                     key={t.name}
                     className={`${styles.card} ${t.featured ? styles.featured : ""} ${active === i ? styles.cardActive : ""}`}
                  >
                     {t.featured && <span className={styles.badge}>Рекомендуем</span>}
                     <div className={styles.cardTop}>
                        <span className={styles.tier}>{t.name}</span>
                        <div className={styles.price}>{t.price}</div>
                     </div>
                     <div className={styles.rule} />
                     <div className={styles.features}>
                        {t.features.map((f) => (
                           <div key={f} className={styles.feat}>
                              <span className={styles.featCheck}><Check className={styles.featCheckIcon} /></span>
                              {f}
                           </div>
                        ))}
                     </div>
                     <div className={styles.rule} />
                     <span className={styles.cpl}>CPL для вас: {t.cpl}</span>
                     <button type="button" className={styles.cardBtn} data-lead-form>{t.cta}</button>
                  </div>
               ))}
            </div>

            <p className={styles.note}>Для юридических лиц: оплата по договору, закрывающие документы</p>

            <div className={styles.included}>
               <h3 className={styles.includedTitle}>Что входит во все тарифы:</h3>
               <div className={styles.includedGrid}>
                  {WHAT_INCLUDED.map((f) => (
                     <div key={f} className={styles.includedCard}>
                        <span className={styles.includedCheck}><Check className={styles.includedCheckIcon} /></span>
                        <span>{f}</span>
                     </div>
                  ))}
               </div>
            </div>
         </div>
      </section>
   );
}

export default CallCenterCost;
