import styles from "./CallCenterProblems.module.scss";

// Section 03 — Боли. Ported from "Лендинг AI-UP.dc.html" §3.
const PAINS = [
   {
      title: "Реклама дорожает, лиды — всё хуже",
      text: "Стоимость заявки растёт каждый месяц, а качество падает. Бюджет уходит, предсказуемости нет",
   },
   {
      title: "Конкуренты забирают ваших клиентов",
      text: "Люди сравнивают, уходят к тем, кто перезвонил первым. Вы даже не знаете, что они вас рассматривали",
   },
   {
      title: "Менеджеры не дозваниваются",
      text: "Номера блокируются как спам после первого недозвона. До половины базы остаётся «непрозвоненной»",
   },
   {
      title: "Подрядчики обещают, но не показывают",
      text: "Нет записей, нет прозрачности, нет понимания, за что вы платите. Только отчёты «всё хорошо»",
   },
];

function CallCenterProblems() {
   return (
      <section className={styles.section} data-screen-label="03 Боли">
         <div className={styles.inner}>
            <h2 className={styles.title}>Вам знакома хотя бы одна из этих ситуаций?</h2>
            <div className={styles.grid}>
               {PAINS.map((p) => (
                  <div key={p.title} className={styles.card}>
                     <div className={styles.mark}>!</div>
                     <div>
                        <h3 className={styles.cardTitle}>{p.title}</h3>
                        <p className={styles.cardText}>{p.text}</p>
                     </div>
                  </div>
               ))}
            </div>
            <p className={styles.note}>Все эти ситуации решает прямая работа с платформой, без посредников</p>
         </div>
      </section>
   );
}

export default CallCenterProblems;
