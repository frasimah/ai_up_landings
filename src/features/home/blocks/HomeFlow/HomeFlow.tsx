"use client";

import { useEffect, useRef, useState } from 'react';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './HomeFlow.module.scss'
import Button from '@/components/Buttons/Button';
import { FloatingBubbles } from './FloatingBubbles/FloatingBubbles';
import CheckBox from '@/components/CheckBox/CheckBox';

function HomeFlow() {
   const sectionRef = useRef<HTMLElement | null>(null);
   const [isViewportActive, setIsViewportActive] = useState(false);

   useEffect(() => {
      const node = sectionRef.current;
      if (!node) return;

      const observer = new IntersectionObserver(
         ([entry]) => {
            setIsViewportActive(entry.isIntersecting);
         },
         {
            rootMargin: '80px 0px',
            threshold: 0.2,
         }
      );

      observer.observe(node);

      return () => observer.disconnect();
   }, []);

   return (
      <section ref={sectionRef} className={styles.home_flow}>
         <div className="container">
            <div className={`row ${styles.home_flow_wrap}`}>
               <div className="col-xl-6 order-xl-1 order-2">
                  <div className={styles.home_flow_wrap_left}>
                     <FloatingBubbles isActive={isViewportActive} />
                     <div className={styles.home_flow_wrap_left_dots}>
                        <img src="/img/home/ai-flow-dots.svg" alt="Декоративный фон блока Ai Flow" />
                     </div>
                  </div>
               </div>
               <div className="col-xl-6 order-xl-2 order-1">
                  <div className={styles.home_flow_wrap_right}>
                     <SectionHeader
                        eyebrow='Ai Flow — автооптимизация источников'
                        title='Ai Flow анализирует качество звонков и сам регулирует лимиты'
                        description='Увеличивает эффективные источники, снижает там, где автоответы, отключает нерелевантный трафик и адаптируется под нишу'
                        eyebrowVariant='gray'
                     />
                     <Button
                        icon={true}
                        variant='blue'
                        href='/ai-flow'
                     >
                        Что такое Ai Flow
                     </Button>
                  </div>
               </div>
               <div className="col-12 order-xl-3 order-3">
                  <div className={styles.home_flow_wrap_bottom}>
                     <div className={styles.home_flow_wrap_bottom_it}>
                        <CheckBox />
                        <div className={styles.home_flow_wrap_bottom_it_text}>
                           Работает 24/7
                        </div>
                     </div>
                     <div className={styles.home_flow_wrap_bottom_it}>
                        <CheckBox />
                        <div className={styles.home_flow_wrap_bottom_it_text}>
                           Не требует маркетолога
                        </div>
                     </div>
                     <div className={styles.home_flow_wrap_bottom_it}>
                        <CheckBox />
                        <div className={styles.home_flow_wrap_bottom_it_text}>
                           Подключается одним кликом
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-12 order-xl-4 order-4">
                  <div className={styles.home_flow_wrap_under_text}>
                     Это даёт снижение стоимости лида <span><span className="icon"><svg xmlns="http://www.w3.org/2000/svg" width={15} height={18} viewBox="0 0 15 18" fill="none"><path d="M7.5 1V17M7.5 17L1 10.3333M7.5 17L14 10.3333" stroke="#0169F9" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></svg></span> на 15–35%</span> уже в первую неделю
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

export default HomeFlow;
