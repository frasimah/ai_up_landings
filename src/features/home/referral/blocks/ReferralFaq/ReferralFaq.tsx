"use client"

import { useLayoutEffect, useMemo, useRef, useState } from 'react';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './ReferralFaq.module.scss';

type FaqItem = {
   question: string;
   answer: string;
};

export default function ReferralFaq() {
   const faqList: FaqItem[] = useMemo(
      () => [
         { question: 'Сколько длится партнёрка?', answer: 'Пожизненно' },
         { question: 'Когда начисляются деньги?', answer: 'Пожизненно' },
         { question: 'Как получить 20%?', answer: 'Пожизненно' },
         { question: 'Сколько можно привлечь людей?', answer: 'Пожизненно' },
      ],
      []
   );

   const [openIndex, setOpenIndex] = useState<number | null>(null);

   // Храним ссылки на внутренние блоки (для scrollHeight)
   const contentRefs = useRef<Array<HTMLDivElement | null>>([]);
   const [heights, setHeights] = useState<number[]>([]);

   const setRef = (el: HTMLDivElement | null, idx: number) => {
      contentRefs.current[idx] = el;
   };

   useLayoutEffect(() => {
      const calc = () => {
         setHeights(
            faqList.map((_, idx) => contentRefs.current[idx]?.scrollHeight ?? 0)
         );
      };

      calc();

      // На ресайзе пересчитываем (изменение ширины => перенос строк => другая высота)
      window.addEventListener('resize', calc);
      return () => window.removeEventListener('resize', calc);
   }, [faqList]);

   const toggle = (idx: number) => {
      setOpenIndex((prev) => (prev === idx ? null : idx));
   };

   return (
      <section className={styles.referral_faq}>
         <div className="container">
            <div className={styles.referral_faq_wrap}>
               <SectionHeader
                  title="FAQ — короткие ответы"
                  titleSize="h2"
                  as="h2"
                  headingVariant="white"
                  size="small"
                  alignLeftMobile={true}
               />

               {faqList.length > 0 && (
                  <div className={`row ${styles.referral_faq_wrap_list}`}>
                     {faqList.map((item, index) => {
                        const isOpen = openIndex === index;

                        return (
                           <div className="col-xl-6" key={`${item.question}${index}`}>
                              <button
                                 type="button"
                                 className={`${styles.referral_faq_wrap_list_item} ${isOpen ? styles.isOpen : ''
                                    }`}
                                 onClick={() => toggle(index)}
                                 aria-expanded={isOpen}
                              >
                                 <div className={styles.referral_faq_wrap_list_item_content}>
                                    <h3 className={styles.referral_faq_wrap_list_item_content_q}>
                                       {item.question}
                                    </h3>

                                    {/* wrapper, который анимируем по max-height */}
                                    <div
                                       className={styles.referral_faq_wrap_list_item_content_aWrap}
                                       style={{ maxHeight: isOpen ? `${heights[index] ?? 0}px` : '0px' }}
                                    >
                                       {/* внутренний блок, у которого читаем scrollHeight */}
                                       <div
                                          ref={(el) => setRef(el, index)}
                                          className={styles.referral_faq_wrap_list_item_content_a}
                                       >
                                          <p>{item.answer}</p>
                                       </div>
                                    </div>
                                 </div>

                                 <div className={styles.referral_faq_wrap_list_item_icon} aria-hidden="true">
                                    <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 30 30" fill="none">
                                       <path d="M16 14H30V16H16V30H14V16H0V14H14V0H16V14Z" fill="white" />
                                    </svg>
                                 </div>
                              </button>
                           </div>
                        );
                     })}
                  </div>
               )}
            </div>
         </div>
      </section>
   );
}