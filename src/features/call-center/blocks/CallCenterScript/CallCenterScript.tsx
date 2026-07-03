import styles from "./CallCenterScript.module.scss";

// Section 08c — Скрипт. Ported from "Лендинг AI-UP.dc.html" §8c.
const YOU_PROVIDE = ["приветствие", "3–5 ключевых вопросов", "уточнение", "завершение разговора"];
const WE_CHECK = [
   "нет ли продажи",
   "нет ли упоминаний брендов",
   "нет давления",
   "нет запрещённых тематик",
   "всё ли понятно обычному человеку",
];

function CallCenterScript() {
   return (
      <section className={styles.section} data-screen-label="08c Скрипт">
         <div className={styles.inner}>
            <div className={styles.head}>
               <div className={styles.eyebrow}><span />скрипт</div>
               <h2 className={styles.title}>Ваш скрипт — наши руки</h2>
               <p className={styles.lead}>Перед запуском вы загружаете свой скрипт — мы адаптируем его под телефонный формат за 1 рабочий день</p>
            </div>
            <div className={styles.grid}>
               <div>
                  <div className={styles.colLabel}>Что вы указываете:</div>
                  <div className={styles.list}>
                     {YOU_PROVIDE.map((t) => (
                        <div key={t} className={styles.row}>
                           <span className={styles.chk}>
                              <svg width="15" height="11" viewBox="0 0 16 12" fill="none"><path d="M1 6l4.5 4.5L15 1" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                           </span>
                           {t}
                        </div>
                     ))}
                  </div>
                  <button type="button" className={styles.outlineBtn}>Подробный регламент</button>
               </div>
               <div className={styles.card}>
                  <div className={styles.cardLabel}>Что проверяем по регламенту:</div>
                  <div className={styles.checks}>
                     {WE_CHECK.map((t) => (
                        <div key={t} className={styles.check}><span />{t}</div>
                     ))}
                  </div>
                  <div className={styles.note}>Если что-то нужно поправить — даём короткие корректировки. После одобрения оператор начинает работать по вашему сценарию.</div>
               </div>
            </div>
         </div>
      </section>
   );
}

export default CallCenterScript;
