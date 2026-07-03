'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../ReferralWorkSlider.module.scss'

gsap.registerPlugin(ScrollTrigger);

function ReferralWorkSlider_2() {
   const triggerRef = useRef<HTMLDivElement | null>(null);
   const textRef = useRef<HTMLDivElement | null>(null);
   const triggerInstanceRef = useRef<ScrollTrigger | null>(null);
   const appearTweenRef = useRef<gsap.core.Tween | null>(null);
   const floatTweenRef = useRef<gsap.core.Tween | null>(null);

   useEffect(() => {
      const triggerElement = triggerRef.current;
      const textElement = textRef.current;

      if (!triggerElement || !textElement) {
         return;
      }

      const prefersReducedMotion = window.matchMedia(
         '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReducedMotion) {
         gsap.set(textElement, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            clearProps: 'transform',
         });
         return;
      }

      const startFloating = () => {
         if (floatTweenRef.current) return;

         floatTweenRef.current = gsap.to(textElement, {
            y: '-=8',
            rotation: -1.5,
            duration: 2.2,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
         });
      };

      appearTweenRef.current = gsap.fromTo(
         textElement,
         { opacity: 0, scale: 0.5, y: 20 },
         {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            ease: 'back.out(1.7)',
            paused: true,
            onComplete: startFloating,
         }
      );

      triggerInstanceRef.current = ScrollTrigger.create({
         trigger: triggerElement,
         start: 'top 80%',
         once: true,
         onEnter: () => {
            appearTweenRef.current?.play(0);
         },
      });

      return () => {
         triggerInstanceRef.current?.kill();
         triggerInstanceRef.current = null;
         appearTweenRef.current?.kill();
         appearTweenRef.current = null;
         floatTweenRef.current?.kill();
         floatTweenRef.current = null;
         gsap.killTweensOf(textElement);
      };
   }, []);

   return (
      <>
         <div className={styles.home_get_wrap_main_sw_it_header}>
            <h3 className={styles.home_get_wrap_main_sw_it_header_title}>
               Делитесь где угодно
            </h3>
            <div className={styles.home_get_wrap_main_sw_it_header_text}>
               Статьи, соцсети, YouTube, Telegram, личный бренд, рабочие чаты
            </div>
         </div>
         <div className={`${styles.home_get_wrap_main_sw_it_icon} ${styles.home_get_wrap_main_sw_it_icon_2}`}>
            <div className={styles.home_get_wrap_main_sw_it_icon_2_bg}>
               <img src="/img/ai-flow/do-bg.svg" alt="Декоративный фон блока Ai Flow" />
            </div>
            <div ref={triggerRef} className={styles.home_get_wrap_main_sw_it_icon_2_item}>
               <div className={styles.home_get_wrap_main_sw_it_icon_2_item_avatar}>
                  <img src="/img/referral-page/work_item.png" alt="Элемент интерфейса реферальной программы Ai-UP" />
               </div>
               <div ref={textRef} className={styles.home_get_wrap_main_sw_it_icon_2_item_text}>
                  https://ai-up.com/
                  referral?code=<span>USER1234</span>
               </div>
            </div>
         </div>
      </>
   );
}

export default ReferralWorkSlider_2;
