"use client";

import { useLayoutEffect, useRef, useState } from 'react';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './HowWorkWhy.module.scss'
import CheckBox from '@/components/CheckBox/CheckBox';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function HowWorkWhy() {
   const listRef = useRef<HTMLDivElement | null>(null);
   const [activeIndex, setActiveIndex] = useState(-1);

   const dataSw = [
      'Человек вчера уже интересовался',
      'Вы работаете только по факту активности',
      'Выше дозвон',
      'Выше конверсия',
      'Нет перерасхода бюджета',
      'Всё предсказуемо: источник → сбор → контакты',
   ];

   useLayoutEffect(() => {
      const listNode = listRef.current;
      if (!listNode) {
         return;
      }

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isTabletOrSmaller = window.matchMedia('(max-width: 1199px)').matches;
      const timeoutIds: number[] = [];

      if (prefersReducedMotion) {
         setActiveIndex(dataSw.length - 1);
         return;
      }

      const activateChecks = () => {
         setActiveIndex(-1);

         dataSw.forEach((_, index) => {
            const timeoutId = window.setTimeout(() => {
               setActiveIndex(index);
            }, 220 + index * 520);
            timeoutIds.push(timeoutId);
         });
      };

      const trigger = ScrollTrigger.create({
         trigger: listNode,
         start: isTabletOrSmaller ? 'top 92%' : 'top 86%',
         once: true,
         onEnter: activateChecks,
      });

      return () => {
         trigger.kill();
         timeoutIds.forEach((id) => window.clearTimeout(id));
      };
   }, [dataSw.length]);

   return (
      <section className={styles.how_work_why}>
         <div className="container">
            <div className={styles.how_work_why_wrap}>
               <SectionHeader
                  title='Почему перехват работает лучше рекламы'
                  titleSize='h2'
                  as='h2'
                  size='small'
                  alignLeftMobile={true}
                  description='Потому что вы работаете не со ставками и кликами, а с действиями:'
               />
               {dataSw?.length > 0 && (
                  <div ref={listRef} className={styles.how_work_why_wrap_list}>
                     {dataSw?.map((text, index) => (
                        <div
                           className={`${styles.how_work_why_wrap_list_col} ${
                              index <= activeIndex ? styles.how_work_why_wrap_list_col_active : ''
                           }`}
                           key={text + index}
                        >
                           <div className={styles.how_work_why_wrap_list_it}>
                              <CheckBox isAnimation={false} active={index <= activeIndex} />
                              {text}
                           </div>
                        </div>
                     ))}
                  </div>
               )}

               <div className={styles.how_work_why_wrap_message}>
                  <p>
                     Это просто честная модель. Без аукционов и угадываний
                  </p>
               </div>
            </div>
         </div>
      </section>
   );
}

export default HowWorkWhy;
