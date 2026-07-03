"use client";

import { useLayoutEffect, useRef } from "react";
import Button from "@/components/Buttons/Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./CostPurchaseVipSection.module.scss";

gsap.registerPlugin(ScrollTrigger);

type PurchaseRow = {
  volume: string;
  price: string;
};

const purchaseRows: PurchaseRow[] = [
  { volume: "100-299", price: "47 ₽" },
  { volume: "300-999", price: "42 ₽" },
  { volume: "1 000-1 999", price: "37 ₽" },
  { volume: "2 000-3 999", price: "32 ₽" },
  { volume: "4 000-9 999", price: "27 ₽" },
  { volume: "10 000-29 999", price: "22 ₽" },
];

const vipRows: PurchaseRow[] = [
  { volume: "30 000-49 999", price: "19 ₽" },
  { volume: "50 000-99 999", price: "18 ₽" },
  { volume: "100 000+", price: "17 ₽" },
];

function CostPurchaseVipSection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    const sectionNode = sectionRef.current;
    if (!sectionNode) return;

    const ctx = gsap.context(() => {
      const rows = Array.from(
        sectionNode.querySelectorAll<HTMLTableRowElement>("tbody tr")
      );
      if (!rows.length) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
        rows.forEach((row) => {
          gsap.set(row, { autoAlpha: 1, y: 0, clearProps: "transform" });

          if (row.dataset.section === "vip") {
            const cells = Array.from(row.querySelectorAll<HTMLTableCellElement>("td"));
            gsap.set(cells, { "--vip-fill-size": "100%" });
          }
        });

        return;
      }

      const isTabletOrSmaller = window.matchMedia("(max-width: 1199px)").matches;
      const initialY = isTabletOrSmaller ? 10 : 14;
      const accentRowColor = "#dbeafe";

      rows.forEach((row) => {
        const cells = Array.from(row.querySelectorAll<HTMLTableCellElement>("td"));
        const isVipRow = row.dataset.section === "vip";

        const showRow = () => {
          gsap.killTweensOf([row, ...cells]);

          const rowTimeline = gsap.timeline();
          rowTimeline.to(row, {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out",
            overwrite: true,
          });

          if (!cells.length) return;

          if (isVipRow) {
            rowTimeline.fromTo(
              cells,
              { "--vip-fill-size": "0%" },
              {
                "--vip-fill-size": "100%",
                duration: 0.75,
                ease: "power1.out",
                stagger: 0.03,
              },
              0.06
            );

            return;
          }

          rowTimeline.fromTo(
            cells,
            { backgroundColor: accentRowColor },
            {
              backgroundColor: "#ebebeb",
              duration: 0.75,
              ease: "power1.out",
              stagger: 0.03,
              onComplete: () => {
                gsap.set(cells, { clearProps: "backgroundColor" });
              },
            },
            0.06
          );
        };

        const hideRow = () => {
          gsap.killTweensOf([row, ...cells]);

          if (cells.length) {
            if (isVipRow) {
              gsap.set(cells, { "--vip-fill-size": "0%" });
            } else {
              gsap.set(cells, { clearProps: "backgroundColor" });
            }
          }

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
          onLeaveBack: hideRow,
        });
      });
    }, sectionNode);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.cost_purchase}>
      <div className="container">
        <div className={`row ${styles.cost_purchase_wrap}`}>
          <div className="col-xl-3">
            <div className={styles.cost_purchase_wrap_main}>
              <h2 className={styles.cost_purchase_wrap_main_title}>
                Стоимость зависит только от разовой покупки:
              </h2>
              <div className={styles.cost_purchase_wrap_main_bottom}>
                <div className={styles.cost_purchase_wrap_main_bottom_text}>
                  <p>Чем больше объём, тем сильнее экономия</p>
                </div>
                <div className={styles.cost_purchase_wrap_main_bottom_btn}>
                  <Button>Пополнить баланс</Button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-6">
            <div ref={sectionRef} className={styles.cost_purchase_wrap_tables}>
              <table className={styles.cost_purchase_wrap_table}>
                <caption className={styles.visuallyHidden}>
                  Таблица стоимости контакта в зависимости от объёма покупки
                </caption>
                <thead>
                  <tr>
                    <th>Объём</th>
                    <th>Цена за контакт</th>
                  </tr>
                </thead>
                <tbody>
                  {purchaseRows.map((row) => (
                    <tr key={row.volume}>
                      <td>{row.volume}</td>
                      <td>{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className={styles.cost_purchase_wrap_vip}>
                <table
                  className={`${styles.cost_purchase_wrap_table} ${styles.cost_purchase_wrap_table_vip}`}
                >
                  <caption className={styles.visuallyHidden}>
                    VIP-секция стоимости контакта
                  </caption>
                  <tbody>
                    {vipRows.map((row) => (
                      <tr
                        key={row.volume}
                        data-section="vip"
                        className={styles.vipRow}
                      >
                        <td>
                          <span>{row.volume}</span>
                        </td>
                        <td>
                          <span>{row.price}</span>
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

export default CostPurchaseVipSection;
