"use client";

import { useEffect, useRef, useState } from 'react';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './HomeCallCenter.module.scss'
import Button from '@/components/Buttons/Button';
import HomeCallCenterAnimation from './HomeCallCenterAnimation/HomeCallCenterAnimation';
import HomeCallCenterNumber from './HomeCallCenterNumber/HomeCallCenterNumber';


function HomeCallCenter() {
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
      <section ref={sectionRef} className={styles.home_call}>
         <div className="container">
            <div className={styles.home_call_wrap}>
               <div className="row">
                  <div className="col-xl-6 order-xl-1 order-1">
                     <div className={styles.home_call_wrap_left}>
                        <SectionHeader
                           eyebrow='Встроенный колл-центр Ai-UP'
                           eyebrowVariant='gray'
                           title='Подключайте колл-центр и&nbsp;получайте только квалифицированные лиды'
                           as='h2'
                           headingVariant='white'
                           description='Колл-центр делает до&nbsp;4&nbsp;попыток дозвона, ведёт корректный разговор, выявляет потребности, ставит статусы, оставляет комментарии, записывает разговоры и&nbsp;передаёт только квалифицированные контакты. Модуль подключается по&nbsp;желанию'
                           descriptionVariant='white'
                        />
                        <div className={styles.home_call_wrap_left_message}>
                           Стоимость обработки — 45 ₽
                        </div>
                     </div>
                  </div>
                  <div className={`col-xl-6 offset-xl-0 order-xl-2 order-3 ${styles.home_call_over}`}>
                     <HomeCallCenterAnimation />
                  </div>
                  <div className="col-12 order-xl-3 order-2">
                     <div className={styles.home_call_wrap_btn}>
                        <Button
                           variant='blue'
                           icon={true}
                           noBorder={false}
                           href='/call-center'
                        >
                           Подробнее про колл-центр
                        </Button>
                     </div>
                  </div>
               </div>
            </div>
            <HomeCallCenterNumber isActive={isViewportActive} />
         </div>
      </section >
   );
}

export default HomeCallCenter;
