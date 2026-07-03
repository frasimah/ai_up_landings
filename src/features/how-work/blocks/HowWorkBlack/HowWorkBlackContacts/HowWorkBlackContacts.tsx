"use client";

import { useLayoutEffect, useRef, useState } from 'react';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './HowWorkBlackContacts.module.scss'
import CheckBox from '@/components/CheckBox/CheckBox';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function HowWorkBlackContacts() {
   const sectionRef = useRef<HTMLElement | null>(null);
   const listRef = useRef<HTMLDivElement | null>(null);
   const [activeIndex, setActiveIndex] = useState(-1);

   const dataList = [
      'время последней выгрузки',
      'сколько контактов пришло',
      'какие источники отработали',
      'по каким каналам пришли контакты',
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
         setActiveIndex(dataList.length - 1);
         return;
      }

      const activateChecks = () => {
         setActiveIndex(-1);

         dataList.forEach((_, index) => {
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
   }, [dataList.length]);

   return (
      <section ref={sectionRef} className={styles.how_work_contacts}>
         <div className={styles.how_work_contacts_wrap}>
            <SectionHeader
               title='Когда приходят контакты'
               titleSize='h2'
               as='h2'
               headingVariant='white'
               size='small'
               alignLeftMobile={true}
               description='Контакты появляются ежедневно, примерно с 06:00 до 14:00, в нескольких обновлениях'
               descriptionVariant='white'
            />
            <div ref={listRef} className={styles.how_work_source_wrap_last}>
               <div className={styles.how_work_source_wrap_last_title}>
                  Вы можете выбрать:
               </div>
               {dataList?.length > 0 && (
                  <div className={styles.how_work_source_wrap_last_list}>
                     {dataList?.map((text, index) => (
                        <div
                           className={`${styles.how_work_source_wrap_last_list_col} ${
                              index <= activeIndex ? styles.how_work_source_wrap_last_list_col_active : ''
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
            </div>
         </div>
      </section>
   );
}

export default HowWorkBlackContacts;
