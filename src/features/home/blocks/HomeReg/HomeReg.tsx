"use client";

import { useEffect, useRef, useState } from 'react';
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './HomeReg.module.scss';
import Button from '@/components/Buttons/Button';
import HomeRegFrame from './HomeRegFrame/HomeRegFrame';

function HomeReg() {
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
      <section ref={sectionRef} className={styles.home_reg}>
         <div className="container">
            <div className={styles.home_reg_wrap}>
               <div className={styles.home_reg_wrap_content}>
                  <SectionHeader
                     title='Первые контакты — завтра утром. Регистрация за 2 минуты'
                     description='Зарегистрируйтесь прямо сейчас и получите +50 идентификаций бесплатно, при первом пополнении'
                     descriptionVariant='white'
                     headingVariant='white'
                  />
                  <Button
                     variant='white'
                  >
                     Зарегистрироваться
                  </Button>
               </div>
               <HomeRegFrame isActive={isViewportActive} />
               <div className={styles.home_reg_wrap_dots}>
                  <picture>
                     <source srcSet="/img/home/reg-dots-mobile.svg" media="(max-width: 1200px)" />
                     <img src="/img/home/reg-dots.svg" alt="Декоративный фон блока регистрации" />
                  </picture>
               </div>
               <div className={styles.home_reg_wrap_img}>
                  <picture>
                     <source srcSet="/img/home/reg-img-mobile.png" media="(max-width: 1200px)" />
                     <img src="/img/home/reg-img.png" alt="Иллюстрация регистрации в Ai-UP" />
                  </picture>
               </div>
            </div>
         </div>
      </section>
   );
}

export default HomeReg;
