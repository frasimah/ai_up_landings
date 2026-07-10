"use client";

import { useState } from "react";
import styles from "./CallCenterRoi.module.scss";
import LeadModal, { PackageId } from "../../lead/LeadModal";

// Section 09 — ROI-калькулятор.
// Цена за контакт задаётся ТАРИФОМ (пакетом), а не плавно по объёму — промежуточных
// значений (72/73/74) нет, клиент покупает готовый пакет:
//   500 000 ₽ → до 6 500 контактов → 75 ₽/контакт
//   1 000 000 ₽ → до 14 000 контактов → 71 ₽/контакт
//   2 000 000 ₽ → до 30 000 контактов → 66 ₽/контакт
const ppi = (q: number) => (q <= 6500 ? 75 : q <= 14000 ? 71 : 66);
const fmt = (n: number) => Math.round(n).toLocaleString("ru-RU");

function CallCenterRoi() {
   const [contacts, setContacts] = useState(6500);
   const [check, setCheck] = useState(60000);
   const [conv, setConv] = useState(6);
   const [modalOpen, setModalOpen] = useState(false);

   // Pre-select the package by tariff tier (same 6 500 / 14 000 boundaries as the price).
   const initialPkg: PackageId = contacts <= 6500 ? "start" : contacts <= 14000 ? "growth" : "max";

   const price = ppi(contacts);
   const serviceCost = contacts * price;
   // ~8% контактов в среднем становятся квал. лидом; конверсия в продажу берётся уже от них.
   const quals = contacts * 0.08;
   const sales = Math.round(quals * (conv / 100));
   const revenue = sales * check;
   const profit = revenue - serviceCost;
   const roi = serviceCost > 0 ? revenue / serviceCost : 0;
   const roiText = "×" + roi.toFixed(1).replace(".", ",");

   return (
      <section className={styles.section} data-screen-label="09 ROI">
         <div className={styles.inner}>
            <div className={styles.head}>
               <div className={styles.eyebrow}><span />экономика</div>
               <h2 className={styles.title}>Посмотрите свою экономику за 60 секунд</h2>
               <p className={styles.lead}>Подвигайте ползунки под свою нишу — расчёт обновляется в реальном времени. Цена за контакт зависит от тарифа</p>
            </div>

            <div className={styles.grid}>
               <div className={styles.controls}>
                  <div className={styles.control}>
                     <div className={styles.row}>
                        <span className={styles.label}>Контактов в месяц</span>
                        <span className={styles.value}>{contacts.toLocaleString("ru-RU")}</span>
                     </div>
                     <input className={styles.range} type="range" min={6500} max={30000} step={100} value={contacts} onChange={(e) => setContacts(+e.target.value)} />
                     <div className={styles.ends}><span>6 500</span><span>30 000</span></div>
                  </div>

                  <div className={styles.control}>
                     <div className={styles.row}>
                        <span className={styles.label}>Средний чек, ₽</span>
                        <span className={styles.value}>{fmt(check)} ₽</span>
                     </div>
                     <input className={styles.range} type="range" min={5000} max={500000} step={5000} value={check} onChange={(e) => setCheck(+e.target.value)} />
                     <div className={styles.ends}><span>5 000</span><span>500 000</span></div>
                  </div>

                  <div className={styles.control}>
                     <div className={styles.row}>
                        <span className={styles.label}>Конверсия в продажу, %</span>
                        <span className={styles.value}>{conv}%</span>
                     </div>
                     <input className={styles.range} type="range" min={1} max={30} step={1} value={conv} onChange={(e) => setConv(+e.target.value)} />
                     <div className={styles.ends}><span>1%</span><span>30%</span></div>
                  </div>

                  <p className={styles.subnote}>Тариф: {price} ₽ за контакт · из {contacts.toLocaleString("ru-RU")} контактов ≈8% в квал. лид = {fmt(quals)} · из них {conv}% в продажу = {fmt(sales)}</p>
               </div>

               <div className={styles.results}>
                  <div className={styles.roiRow}>
                     <span className={styles.roiLabel}>Окупаемость</span>
                     <span className={styles.roiBadge}>ROI {roiText}</span>
                  </div>
                  <div className={styles.rule} />
                  <div>
                     <div className={styles.revLabel}>Прогноз выручки в месяц</div>
                     <div className={styles.revValue}>{fmt(revenue)} ₽</div>
                  </div>
                  <div className={styles.metrics}>
                     <div className={styles.metric}>
                        <div className={styles.metricLabel}>Стоимость услуги</div>
                        <div className={styles.metricValue}>{fmt(serviceCost)} ₽</div>
                     </div>
                     <div className={`${styles.metric} ${styles.profit}`}>
                        <div className={styles.metricLabel}>Чистая прибыль</div>
                        <div className={styles.metricValue}>{fmt(profit)} ₽</div>
                     </div>
                  </div>
                  <button type="button" className={styles.cta} onClick={() => setModalOpen(true)}>Получить расчёт под нишу</button>
               </div>
            </div>
         </div>

         <LeadModal open={modalOpen} onClose={() => setModalOpen(false)} initialPackage={initialPkg} />
      </section>
   );
}

export default CallCenterRoi;
