"use client";

import { useState } from "react";
import styles from "./CallCenterForm.module.scss";

const Check = ({ w = 12, h = 9 }: { w?: number; h?: number }) => (
   <svg width={w} height={h} viewBox="0 0 16 12" fill="none"><path d="M1 6l4.5 4.5L15 1" stroke="#34C759" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
);

// Section 07 — Форма заявки. Ported from "Лендинг AI-UP.dc.html" §7.
function CallCenterForm() {
   const [name, setName] = useState("");
   const [phone, setPhone] = useState("");
   const [niche, setNiche] = useState("");
   const [submitted, setSubmitted] = useState(false);

   const submit = () => setSubmitted(true);

   return (
      <section className={styles.section} data-screen-label="07 Форма заявки">
         <div className={styles.grid}>
            <div>
               <div className={styles.eyebrow}><span />бесплатный аудит</div>
               <h2 className={styles.title}>Бесплатный аудит вашей ниши за 30 минут</h2>
               <p className={styles.lead}>Оставьте заявку — покажем доступные источники, посчитаем потенциал перехвата и стоимость под вашу нишу. Без обязательств</p>
               <div className={styles.bullets}>
                  {["Расчёт потенциала под вашу нишу", "Подбор оптимального микса источников", "Прозрачная смета без скрытых платежей"].map((b) => (
                     <div key={b} className={styles.bullet}><span className={styles.check}><Check /></span>{b}</div>
                  ))}
               </div>
               <div className={styles.channels}>
                  <span className={styles.label}>Альтернативные каналы:</span>
                  <a href="#" className={`${styles.channel} ${styles.tg}`}>Telegram</a>
                  <a href="#" className={`${styles.channel} ${styles.wa}`}>WhatsApp</a>
               </div>
            </div>

            <div className={styles.card}>
               {submitted ? (
                  <div className={styles.success}>
                     <div className={styles.icon}><Check w={34} h={26} /></div>
                     <h3>Заявка принята</h3>
                     <p>Связываемся в течение 30 минут в рабочее время (9:00–21:00 МСК)</p>
                  </div>
               ) : (
                  <div className={styles.fields}>
                     <div className={styles.field}>
                        <label htmlFor="cc-name">Как вас зовут</label>
                        <input id="cc-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Имя" />
                     </div>
                     <div className={styles.field}>
                        <label htmlFor="cc-phone">Телефон</label>
                        <input id="cc-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+7 (___) ___-__-__" inputMode="tel" />
                     </div>
                     <div className={styles.field}>
                        <label htmlFor="cc-niche">Ниша или сайт</label>
                        <input id="cc-niche" value={niche} onChange={(e) => setNiche(e.target.value)} placeholder="Напр. установка окон, bestshop.ru" />
                     </div>
                     <button type="button" className={styles.submit} onClick={submit}>Отправить заявку</button>
                     <p className={styles.consent}>Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных</p>
                  </div>
               )}
            </div>
         </div>
      </section>
   );
}

export default CallCenterForm;
