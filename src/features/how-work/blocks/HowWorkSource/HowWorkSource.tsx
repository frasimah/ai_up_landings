"use client";

import { useLayoutEffect, useRef, useState } from 'react';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './HowWorkSource.module.scss'
import CheckBox from '@/components/CheckBox/CheckBox';
import HowWorkSourceAnimation from './HowWorkSourceAnimation/HowWorkSourceAnimation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function HowWorkSource() {
   const lastRef = useRef<HTMLDivElement | null>(null);
   const [activeIndex, setActiveIndex] = useState(-1);

   const dataList = [
      'работает сам по себе',
      'имеет свой лимит, регион и каналы',
      'собирает действия за вчера',
      'отдаёт контакты утром',
   ];

   useLayoutEffect(() => {
      const lastNode = lastRef.current;
      if (!lastNode) {
         return;
      }

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isTabletOrSmaller = window.matchMedia('(max-width: 1199px)').matches;
      const timeoutIds: number[] = [];

      if (prefersReducedMotion) {
         setActiveIndex(dataList.length - 1);
         return;
      }

      const activateChecks = () => {
         setActiveIndex(-1);
         dataList.forEach((_, index) => {
            const timeoutId = window.setTimeout(() => {
               setActiveIndex(index);
            }, 220 + index * 450);
            timeoutIds.push(timeoutId);
         });
      };

      const trigger = ScrollTrigger.create({
         trigger: lastNode,
         start: isTabletOrSmaller ? 'top 92%' : 'top 86%',
         once: true,
         onEnter: activateChecks,
      });

      return () => {
         trigger.kill();
         timeoutIds.forEach((id) => window.clearTimeout(id));
      };
   }, [dataList.length]);

   return (
      <section className={styles.how_work_source}>
         <div className="container">
            <div className={styles.how_work_source_wrap}>
               <SectionHeader
                  title='Что такое источник?'
                  titleSize='h2'
                  as='h2'
                  headingVariant='white'
                  size='small'
                  alignLeftMobile={true}
               />
               <div className={styles.how_work_source_wrap_main}>
                  <HowWorkSourceAnimation />
               </div>
               <div ref={lastRef} className={styles.how_work_source_wrap_last}>
                  <div className={styles.how_work_source_wrap_last_title}>
                     Каждый источник:
                  </div>
                  {dataList?.length > 0 && (
                     <div className={styles.how_work_source_wrap_last_list}>
                        {dataList?.map((text, index) => (
                           <div
                              className={`${styles.how_work_source_wrap_last_list_col} ${index <= activeIndex ? styles.how_work_source_wrap_last_list_col_active : ''
                                 }`}
                              key={text + index}
                           >
                              <div className={styles.how_work_source_wrap_last_list_it}>
                                 <CheckBox variant='white' isAnimation={false} active={index <= activeIndex} />
                                 {text}
                              </div>
                           </div>
                        ))}
                     </div>
                  )}
                  <div className={styles.how_work_source_wrap_message}>
                     <p>
                        Хочешь собирать больше — добавляешь источники.
                        Хочешь точечно — оставляешь 1–2. Всё просто
                     </p>
                  </div>
               </div>
            </div>
         </div>
         <div className={styles.how_work_source_bg}>
            <img src="/img/ai-flow/see-bg.svg" alt="Декоративный фон блока Ai Flow" loading="lazy" decoding="async" />
         </div>
      </section>
   );
}

export default HowWorkSource;
