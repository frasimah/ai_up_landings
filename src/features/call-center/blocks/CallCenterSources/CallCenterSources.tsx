import styles from "./CallCenterSources.module.scss";

// Section 04 — «5 видов источников захвата». Built from Figma (node 3357:20232).
const COLS = ["Вид источника", "Что делает", "Когда работает лучше всего"];

const ROWS: [string, string, string][] = [
   ["Сайты конкурентов", "Захват посетителей сайтов в вашей нише", "Контентные ниши: ремонт, недвижимость, образование"],
   ["Телефоны конкурентов", "Захват тех, кто звонил в их офис", "B2B, медицина, юр.услуги"],
   ["Альфа-имена SMS", "Захват получателей рекламных SMS", "Финансы, страхование, ритейл"],
   ["ОКВЭД", "Захват по бизнес-кодам деятельности", "B2B продажи: оборудование, услуги"],
   ["Пиксель на ваш сайт", "Захват тех, кто был у вас, но ушёл без заявки", "Все ниши с трафиком на сайт"],
];

function CallCenterSources() {
   return (
      <section className={styles.section} data-screen-label="04 Источники">
         <div className={styles.inner}>
            <div className={styles.head}>
               <h2 className={styles.title}>5 видов источников захвата для любой ниши</h2>
               <p className={styles.lead}>
                  Большинство сервисов работают с 1-3 видами источников — обычно сайтами и телефонами. Мы используем 5: каждый вид доступен в зависимости от ниши и стадии готовности клиента. Внутри одного вида — десятки или сотни конкретных источников
               </p>
            </div>

            {/* Desktop: 3-col grid via display:contents. Mobile: each source = a card. */}
            <div className={styles.table}>
               <div className={styles.headRow}>
                  {COLS.map((c) => (
                     <div key={c} className={`${styles.cell} ${styles.head2}`}>{c}</div>
                  ))}
               </div>
               {ROWS.map((row) => (
                  <div key={row[0]} className={styles.rowGroup}>
                     {row.map((cell, ci) => (
                        <div key={ci} className={styles.cell} data-col={COLS[ci]}>{cell}</div>
                     ))}
                  </div>
               ))}
            </div>
         </div>
      </section>
   );
}

export default CallCenterSources;
