"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./LeadModal.module.scss";

// Lead-capture popup. Two variants:
//  • showPackages (ROI calculator) — 3-package chooser + form, wide two columns.
//  • form-only (other CTAs) — just Имя / Почта / Телефон / Ниша.
// Submission target is not wired yet — see submit().

export const PACKAGES = [
   { id: "start", total: "500 000 ₽", meta: "6 500 контактов", price: "75 ₽/контакт" },
   { id: "growth", total: "1 000 000 ₽", meta: "14 000 контактов", price: "71 ₽/контакт" },
   { id: "max", total: "2 000 000 ₽", meta: "30 000 контактов", price: "66 ₽/контакт" },
] as const;

export type PackageId = (typeof PACKAGES)[number]["id"];

const Check = () => (
   <svg width={28} height={22} viewBox="0 0 16 12" fill="none">
      <path d="M1 6l4.5 4.5L15 1" stroke="#34C759" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
   </svg>
);

type Props = {
   open: boolean;
   onClose: () => void;
   showPackages?: boolean;
   initialPackage?: PackageId;
   title?: string;
   subtitle?: string;
};

function LeadModal({ open, onClose, showPackages = true, initialPackage = "start", title, subtitle }: Props) {
   const [mounted, setMounted] = useState(false);
   const [pkg, setPkg] = useState<PackageId>(initialPackage);
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [phone, setPhone] = useState("");
   const [niche, setNiche] = useState("");
   const [touched, setTouched] = useState(false);
   const [submitted, setSubmitted] = useState(false);

   useEffect(() => setMounted(true), []);

   // Reset selected package + state each time it opens.
   useEffect(() => {
      if (open) { setPkg(initialPackage); setSubmitted(false); setTouched(false); }
   }, [open, initialPackage]);

   // ESC to close + lock body scroll while open.
   useEffect(() => {
      if (!open) return;
      const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
      document.addEventListener("keydown", onKey);
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
         document.removeEventListener("keydown", onKey);
         document.body.style.overflow = prevOverflow;
      };
   }, [open, onClose]);

   if (!mounted || !open) return null;

   const nameOk = name.trim().length > 1;
   const phoneOk = phone.replace(/\D/g, "").length >= 10;
   const valid = nameOk && phoneOk;

   const submit = () => {
      setTouched(true);
      if (!valid) return;
      // TODO: wire real destination (Telegram bot / email / API route).
      // eslint-disable-next-line no-console
      console.log("[lead]", { package: showPackages ? pkg : null, name, email, phone, niche });
      setSubmitted(true);
   };

   const heading = title ?? (showPackages ? "Получить расчёт под нишу" : "Оставить заявку");
   const sub = subtitle ?? (showPackages
      ? "Оставьте контакты и выберите пакет — вернёмся с точной сметой и планом перехвата под вашу нишу"
      : "Оставьте контакты — свяжемся, ответим на вопросы и рассчитаем стоимость под вашу нишу");

   const packagesBlock = (
      <div className={styles.colPackages}>
         <div className={styles.groupLabel}>Пакет</div>
         <div className={styles.packages}>
            {PACKAGES.map((p) => (
               <button
                  key={p.id}
                  type="button"
                  className={`${styles.package} ${pkg === p.id ? styles.selected : ""}`}
                  onClick={() => setPkg(p.id)}
               >
                  <span className={styles.radio} />
                  <span className={styles.pkgBody}>
                     <span className={styles.pkgTotal}>{p.total}</span>
                     <span className={styles.pkgMeta}>{p.meta}</span>
                  </span>
                  <span className={styles.pkgPrice}>{p.price}</span>
               </button>
            ))}
         </div>
      </div>
   );

   const formBlock = (
      <div className={styles.colForm}>
         <div className={styles.fields}>
            <div className={`${styles.field} ${touched && !nameOk ? styles.invalid : ""}`}>
               <label htmlFor="lead-name">Имя</label>
               <input id="lead-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Как к вам обращаться" />
            </div>
            <div className={styles.field}>
               <label htmlFor="lead-email">Почта</label>
               <input id="lead-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.ru" inputMode="email" />
            </div>
            <div className={`${styles.field} ${touched && !phoneOk ? styles.invalid : ""}`}>
               <label htmlFor="lead-phone">Телефон</label>
               <input id="lead-phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+7 (___) ___-__-__" inputMode="tel" />
            </div>
            <div className={styles.field}>
               <label htmlFor="lead-niche">Ниша</label>
               <input id="lead-niche" value={niche} onChange={(e) => setNiche(e.target.value)} placeholder="Напр. установка окон, bestshop.ru" />
            </div>
         </div>

         <button type="button" className={styles.submit} onClick={submit}>Отправить заявку</button>
         <p className={styles.consent}>Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных</p>
      </div>
   );

   return createPortal(
      <div className={styles.overlay} onClick={onClose}>
         <div className={`${styles.modal} ${showPackages ? styles.wide : ""}`} role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
            <button type="button" className={styles.close} onClick={onClose} aria-label="Закрыть">×</button>

            {submitted ? (
               <div className={styles.success}>
                  <div className={styles.successIcon}><Check /></div>
                  <h3>Заявка принята</h3>
                  <p>Свяжемся с вами в течение 30 минут в рабочее время (9:00–21:00 МСК) и рассчитаем стоимость под вашу нишу</p>
                  <button type="button" className={styles.submit} onClick={onClose}>Хорошо</button>
               </div>
            ) : (
               <>
                  <h2 className={styles.title}>{heading}</h2>
                  <p className={styles.subtitle}>{sub}</p>
                  <div className={styles.divider} />

                  {showPackages ? (
                     <div className={styles.body}>
                        {packagesBlock}
                        {formBlock}
                     </div>
                  ) : formBlock}
               </>
            )}
         </div>
      </div>,
      document.body,
   );
}

export default LeadModal;
