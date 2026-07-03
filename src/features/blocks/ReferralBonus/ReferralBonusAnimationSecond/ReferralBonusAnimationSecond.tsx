"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import styles from "./ReferralBonusAnimationSecond.module.scss";

export type RunningItem = {
   type: 'phone' | 'site';
   value: string;
};

export type RunningLine = {
   items: RunningItem[];
};

export const runningLinesData: RunningLine[] = [
   {
      items: [
         { type: 'phone', value: '8...-93-58' },
         { type: 'phone', value: '8...-28-14' },
         { type: 'phone', value: '8...-67-21' },
         { type: 'phone', value: '8...-82-39' },
         { type: 'phone', value: '8...-47-06' },
         { type: 'phone', value: '8...-51-90' },
      ]
   },

   // 2
   {
      items: [
         { type: 'phone', value: '8...-76-12' },
         { type: 'phone', value: '8...-04-87' },
         { type: 'phone', value: '8...-63-45' },
         { type: 'phone', value: '8...-29-53' },
         { type: 'phone', value: '8...-58-71' },
         { type: 'phone', value: '8...-31-94' },
      ]
   },

   // 3
   {
      items: [
         { type: 'phone', value: '8...-45-62' },
         { type: 'phone', value: '8...-90-17' },
         { type: 'phone', value: '8...-12-83' },
         { type: 'phone', value: '8...-34-59' },
         { type: 'phone', value: '8...-68-21' },
         { type: 'phone', value: '8...-27-40' },
      ],
   }
];

function ReferralBonusAnimationSecond() {
   const containerRef = useRef<HTMLDivElement | null>(null);
   const rowsRef = useRef<HTMLDivElement[]>([]);
   const tweenRefs = useRef<gsap.core.Tween[]>([]);

   useEffect(() => {
      const containerNode = containerRef.current;
      const rows = rowsRef.current.filter(Boolean);

      if (!containerNode || !rows.length) {
         return;
      }

      const prefersReducedMotion = window.matchMedia(
         '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReducedMotion) {
         rows.forEach((row) => {
            gsap.set(row, { clearProps: 'transform' });
         });
         return;
      }

      tweenRefs.current = rows.map((row, index) => {
         const direction = index % 2 === 0 ? 1 : -1;

         if (direction === 1) {
            gsap.set(row, { xPercent: -50 });
         }

         return gsap.to(row, {
            xPercent: direction === 1 ? 0 : -50,
            duration: 20,
            ease: "none",
            repeat: -1,
            paused: true,
         });
      });

      const observer = new IntersectionObserver(
         ([entry]) => {
            tweenRefs.current.forEach((tween) => {
               if (entry.isIntersecting) {
                  tween.resume();
                  return;
               }

               tween.pause();
            });
         },
         {
            rootMargin: '120px 0px',
            threshold: 0.1,
         }
      );

      observer.observe(containerNode);

      return () => {
         observer.disconnect();
         tweenRefs.current.forEach((tween) => tween.kill());
         tweenRefs.current = [];
         gsap.killTweensOf(rows);
      };
   }, []);



   return (
      <div ref={containerRef} className={styles.referral_bonus_second_item}>
         <div className={styles.referral_bonus_second_item_list}>
            {runningLinesData.map((line, i) => (
               <div
                  key={i}
                  className={styles.referral_bonus_second_item_list_row}

               >
                  <div className={styles.referral_bonus_second_item_list_row_track}
                     ref={(el) => {
                        if (el) rowsRef.current[i] = el;
                     }}
                  >
                     {line.items.map((text, j) => (
                        <div
                           key={`a-${j}`}
                           className={styles.referral_bonus_second_item_list_row_item}
                        >
                           <div className={styles.referral_bonus_second_item_list_row_item_icon}>
                              <svg xmlns="http://www.w3.org/2000/svg" width={18} height={18} viewBox="0 0 18 18" fill="none">
                                 <path d="M5.63129 1.59732C5.63129 1.59732 5.36994 1 4.9708 1C4.57799 1 4.37366 1.17695 4.23745 1.29905C4.10123 1.42114 1.82198 3.24864 1.82198 3.24864C1.82198 3.24864 1.15911 3.8135 1.2098 4.876C1.25256 5.9385 1.4656 7.45073 2.57117 9.55718C3.66882 11.659 6.41612 14.8705 8.15209 15.9994C8.15209 15.9994 9.76055 17.2033 11.2573 17.6925C11.6921 17.8261 12.5617 18 12.7644 18C12.9704 18 13.3339 18 13.7512 17.7025C14.1757 17.4019 16.5571 15.5335 16.5571 15.5335C16.5571 15.5335 17.14 15.0196 16.4629 14.4223C15.7826 13.825 13.7172 12.4966 13.2753 12.1474C12.8326 11.7927 12.2022 11.9488 11.9297 12.1891C11.6581 12.431 11.1726 12.8289 11.1132 12.8791C11.0245 12.9456 10.7814 13.1612 10.509 13.0538C10.1621 12.9201 8.73972 12.1667 7.42111 10.4064C6.11042 8.64768 5.96629 8.07277 5.77067 7.4515C5.7375 7.35966 5.73704 7.25958 5.76938 7.16745C5.80171 7.07533 5.86495 6.99653 5.94887 6.94382C6.14527 6.81091 6.86833 6.22286 6.86833 6.22286C6.86833 6.22286 7.33637 5.77236 7.14076 5.2415C6.94515 4.71064 5.63129 1.59732 5.63129 1.59732Z" fill="#0169F9" />
                              </svg>
                           </div>
                           <div className={styles.referral_bonus_second_item_list_row_item_content}>
                              <div className={styles.referral_bonus_second_item_list_row_item_content_title}>
                                 Контакты
                              </div>
                              <div className={styles.referral_bonus_second_item_list_row_item_content_value}>
                                 {text.value}
                              </div>

                           </div>

                        </div>
                     ))}
                  </div>
               </div>
            ))}
         </div>
      </div>
   );
}

export default ReferralBonusAnimationSecond;
