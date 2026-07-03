"use client";

import { useLayoutEffect, useRef } from "react";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import styles from "./CostCheaper.module.scss";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function CostCheaper() {
   const cheaperRows = [
      {
         ad: "растущие ставки",
         aiup: "работает с фактическими действиями, а не предположениями",
      },
      {
         ad: "холодная аудитория",
         aiup: "контакт = человек, который вчера что-то сделал",
      },
      {
         ad: "вы платите за клики, даже если это боты или случайные люди",
         aiup: "нет кликов, нет ставок, нет аукционов",
      },
      {
         ad: "долгое “обучение” кампаний",
         aiup: "прозвон даёт предсказуемые цифры",
      },
      {
         ad: "постоянная ручная оптимизация",
         aiup: "Ai Flow ежедневно улучшает качество",
      },
      {
         ad: "нет гарантий, что завтра будет работать так же",
         aiup: "стоимость лида падает при том же бюджете",
      },
   ];

   const tableRef = useRef<HTMLTableElement | null>(null);

   useLayoutEffect(() => {
      const tableNode = tableRef.current;
      if (!tableNode) return;

      const ctx = gsap.context(() => {
         const rows = Array.from(tableNode.querySelectorAll<HTMLTableRowElement>("tbody tr"));
         if (!rows.length) return;

         const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
         ).matches;

         if (prefersReducedMotion) {
            rows.forEach((row) => {
               gsap.set(row, { autoAlpha: 1, y: 0, clearProps: "transform" });
            });
            return;
         }

         const isTabletOrSmaller = window.matchMedia("(max-width: 1199px)").matches;
         const initialY = isTabletOrSmaller ? 10 : 14;

         rows.forEach((row) => {
            const showRow = () => {
               gsap.killTweensOf(row);
               gsap.to(row, {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.5,
                  ease: "power2.out",
                  overwrite: true,
               });
            };

            const hideRow = () => {
               gsap.killTweensOf(row);
               gsap.to(row, {
                  autoAlpha: 0,
                  y: initialY,
                  duration: 0.32,
                  ease: "power2.inOut",
                  overwrite: true,
               });
            };

            hideRow();

            ScrollTrigger.create({
               trigger: row,
               start: isTabletOrSmaller ? "top 94%" : "top 90%",
               onEnter: showRow,
               onEnterBack: showRow,
               onLeaveBack: hideRow,
            });
         });
      }, tableNode);

      return () => ctx.revert();
   }, []);

   return (
      <section className={styles.cost_cheaper}>
         <div className="container">
            <div className={styles.cost_cheaper_wrap}>
               <SectionHeader
                  title="Почему Ai-UP дешевле рекламы"
                  titleSize="h2"
                  as="h2"
                  size="small"
                  alignLeftMobile={true}
               />
               <div className="row">
                  <div className="offset-xl-2 col-xl-8">
                     <div className={styles.cost_cheaper_wrap_table_scroll}>
                        <table ref={tableRef} className={styles.cost_cheaper_wrap_table}>
                           <thead>
                              <tr>
                                 <th>Реклама</th>
                                 <th>Ai-UP</th>
                              </tr>
                           </thead>
                           <tbody>
                              {cheaperRows.map((item) => (
                                 <tr key={item.ad}>
                                    <td>{item.ad}</td>
                                    <td>
                                       <div className={styles.cost_cheaper_wrap_table_item}>
                                          <span className={styles.cost_cheaper_wrap_table_item_icon} aria-hidden="true">
                                             <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 28 28" fill="none">
                                                <rect width={28} height={28} rx={14} fill="#0169F9" />
                                                <path d="M6 14.5555L10.6154 19L21 9" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                                             </svg>
                                          </span>
                                          <span>{item.aiup}</span>
                                       </div>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

export default CostCheaper;
