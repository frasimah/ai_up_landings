"use client";

import { type ReactNode, useLayoutEffect, useMemo, useRef, useState } from 'react';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './ReferralFaq.module.scss';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export type FaqItem = {
   question: string;
   answer: ReactNode;
};

type ReferralFaqProps = {
   title?: string;
   items?: FaqItem[];
   defaultOpenIndex?: number | null;
   marginTop?: boolean;
   paddingTop?: boolean;
};

export default function ReferralFaq({
   title = 'FAQ — короткие ответы',
   items,
   defaultOpenIndex = null,
   marginTop = true,
   paddingTop = true
}: ReferralFaqProps) {
   const renderAnswer = (answer: FaqItem['answer']) => {
      if (typeof answer === 'string') {
         return <p>{answer}</p>;
      }

      return answer;
   };

   const faqList: FaqItem[] = useMemo(
      () =>
         items ?? [
            { question: 'Вопросы не заданы', answer: 'Вопросы не заданы' },
         ],
      [items]
   );

   const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);
   const refreshTimerRef = useRef<number | null>(null);

   const listRef = useRef<HTMLDivElement | null>(null);
   const contentRefs = useRef<Array<HTMLDivElement | null>>([]);
   const [heights, setHeights] = useState<number[]>([]);

   const setRef = (el: HTMLDivElement | null, idx: number) => {
      contentRefs.current[idx] = el;
   };

   useLayoutEffect(() => {
      const calc = () => {
         setHeights(faqList.map((_, idx) => contentRefs.current[idx]?.scrollHeight ?? 0));
      };

      calc();
      window.addEventListener('resize', calc);
      return () => window.removeEventListener('resize', calc);
   }, [faqList]);

   useLayoutEffect(() => {
      const listNode = listRef.current;
      if (!listNode) return;

      const ctx = gsap.context(() => {
         const items = Array.from(
            listNode.querySelectorAll<HTMLElement>(`.${styles.referral_faq_wrap_list_item}`)
         );
         if (!items.length) return;

         const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
         ).matches;

         if (prefersReducedMotion) {
            gsap.set(items, { autoAlpha: 1, y: 0, clearProps: 'transform' });
            return;
         }

         const isTabletOrSmaller = window.matchMedia('(max-width: 1199px)').matches;
         const initialY = isTabletOrSmaller ? 12 : 18;

         items.forEach((item) => {
            gsap.set(item, {
               autoAlpha: 0,
               y: initialY,
            });

            const showCard = () => {
               gsap.killTweensOf(item);
               gsap.to(item, {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.52,
                  ease: 'power2.out',
                  overwrite: true,
               });
            };

            const hideCard = () => {
               gsap.killTweensOf(item);
               gsap.to(item, {
                  autoAlpha: 0,
                  y: initialY,
                  duration: 0.3,
                  ease: 'power2.inOut',
                  overwrite: true,
               });
            };

            ScrollTrigger.create({
               trigger: item,
               start: isTabletOrSmaller ? 'top 94%' : 'top 90%',
               onEnter: showCard,
               onEnterBack: showCard,
               onLeaveBack: hideCard,
            });
         });
      }, listNode);

      return () => ctx.revert();
   }, []);

   useLayoutEffect(() => {
      return () => {
         if (refreshTimerRef.current !== null) {
            window.clearTimeout(refreshTimerRef.current);
         }
      };
   }, []);

   const toggle = (idx: number) => {
      setOpenIndex((prev) => (prev === idx ? null : idx));

      if (refreshTimerRef.current !== null) {
         window.clearTimeout(refreshTimerRef.current);
      }

      window.requestAnimationFrame(() => {
         refreshTimerRef.current = window.setTimeout(() => {
            ScrollTrigger.refresh();
         }, 520);
      });
   };

   const leftColumnItems = faqList.filter((_, index) => index % 2 === 0);
   const rightColumnItems = faqList.filter((_, index) => index % 2 === 1);

   const renderFaqItem = (item: FaqItem, index: number) => {
      const isOpen = openIndex === index;

      return (
         <button
            key={`${item.question}${index}`}
            type="button"
            className={`${styles.referral_faq_wrap_list_item} ${isOpen ? styles.isOpen : ''}`}
            onClick={() => toggle(index)}
            aria-expanded={isOpen}
         >
            <div className={styles.referral_faq_wrap_list_item_content}>
               <h3 className={styles.referral_faq_wrap_list_item_content_q}>{item.question}</h3>
               <div
                  className={styles.referral_faq_wrap_list_item_content_aWrap}
                  style={{ maxHeight: isOpen ? `${heights[index] ?? 0}px` : '0px' }}
               >
                  <div
                     ref={(el) => setRef(el, index)}
                     className={styles.referral_faq_wrap_list_item_content_a}
                  >
                     {renderAnswer(item.answer)}
                  </div>
               </div>
            </div>

            <div className={styles.referral_faq_wrap_list_item_icon} aria-hidden="true">
               <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 30 30" fill="none">
                  <path d="M16 14H30V16H16V30H14V16H0V14H14V0H16V14Z" fill="white" />
               </svg>
            </div>
         </button>
      );
   };

   return (
      <section className={`${styles.referral_faq} ${!marginTop && styles.margin} ${!paddingTop && styles.padding}`}>
         <div className="container">
            <div className={styles.referral_faq_wrap}>
               <SectionHeader
                  title={title}
                  titleSize="h2"
                  as="h2"
                  headingVariant="white"
                  size="small"
                  alignLeftMobile={true}
               />

               {faqList.length > 0 && (
                  <div ref={listRef} className={styles.referral_faq_wrap_list}>
                     <div className={styles.referral_faq_wrap_list_col}>
                        {leftColumnItems.map((item, localIndex) => renderFaqItem(item, localIndex * 2))}
                     </div>
                     <div className={styles.referral_faq_wrap_list_col}>
                        {rightColumnItems.map((item, localIndex) => renderFaqItem(item, localIndex * 2 + 1))}
                     </div>
                  </div>
               )}
            </div>
         </div>
      </section>
   );
}
