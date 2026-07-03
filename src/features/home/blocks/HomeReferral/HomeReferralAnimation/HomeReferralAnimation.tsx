'use client';

import styles from './HomeReferralAnimation.module.scss'
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function HomeReferralAnimation() {
   const containerRef = useRef<HTMLDivElement | null>(null);
   const triggerRef = useRef<ScrollTrigger | null>(null);
   const entryTweenRef = useRef<gsap.core.Tween | null>(null);
   const floatTweensRef = useRef<gsap.core.Tween[]>([]);
   const hasAnimatedRef = useRef(false);

   useEffect(() => {
      const containerNode = containerRef.current;
      if (!containerNode) return;

      const elements = Array.from(containerNode.children) as HTMLElement[];
      if (!elements.length) return;

      const prefersReducedMotion = window.matchMedia(
         '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReducedMotion) {
         gsap.set(elements, {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            clearProps: 'transform',
         });
         return;
      }

      const startFloating = () => {
         if (floatTweensRef.current.length) return;

         floatTweensRef.current = elements.map((el, index) =>
            gsap.to(el, {
               y: '-=10',
               rotation: index % 2 === 0 ? 2 : -2,
               duration: 2 + Math.random(),
               repeat: -1,
               yoyo: true,
               ease: 'sine.inOut',
               delay: Math.random(),
            })
         );
      };

      const startAnimation = () => {
         if (hasAnimatedRef.current) return;
         hasAnimatedRef.current = true;

         entryTweenRef.current = gsap.fromTo(
            elements,
            { opacity: 0, scale: 0.5, y: 20 },
            {
               opacity: 1,
               scale: 1,
               y: 0,
               duration: 0.8,
               stagger: 0.2,
               ease: "back.out(1.7)",
               onComplete: startFloating,
            }
         );
      };

      triggerRef.current = ScrollTrigger.create({
         trigger: containerNode,
         start: "top center",
         once: true,
         onEnter: startAnimation,
      });

      return () => {
         triggerRef.current?.kill();
         triggerRef.current = null;
         entryTweenRef.current?.kill();
         entryTweenRef.current = null;
         floatTweensRef.current.forEach((tween) => tween.kill());
         floatTweensRef.current = [];
         gsap.killTweensOf(elements);
      };
   }, []);

   return (

      <div className={styles.home_refferal_right}>
         <div className={styles.home_refferal_right_grid}>
            <img src="/img/home/referral-grid.svg" alt="Декоративная сетка реферальной программы" />
         </div>
         <div className={styles.home_refferal_right_img}>
            <img src="/img/home/referral-img.png" alt="Интерфейс реферальной программы Ai-UP" />
         </div>
         <div className={styles.home_refferal_right_cloud} ref={containerRef}>
            <div className={styles.home_refferal_right_cloud_1}>
               <div className={styles.home_refferal_right_cloud_1_img}>
                  <svg xmlns="http://www.w3.org/2000/svg" width={80} height={80} viewBox="0 0 80 80" fill="none">
                     <rect width={80} height={80} rx={40} fill="white" />
                     <path d="M55 49.1723V53.8684C54.998 54.6984 54.6646 55.4938 54.0727 56.0806C53.4808 56.6675 52.6785 56.998 51.8414 57H28.1586C27.3215 56.998 26.5192 56.6675 25.9273 56.0806C25.3354 55.4938 25.002 54.6984 25 53.8684V49.1723C25.0059 47.0981 25.8396 45.1105 27.319 43.6437C28.7983 42.177 30.803 41.3504 32.8951 41.3446H47.1049C49.197 41.3504 51.2017 42.177 52.681 43.6437C54.1604 45.1105 54.9941 47.0981 55 49.1723ZM31.9329 30.9958C31.9333 29.414 32.4069 27.8678 33.2936 26.5529C34.1804 25.2379 35.4404 24.2131 36.9146 23.6081C38.3887 23.0031 40.0106 22.8451 41.5753 23.154C43.1401 23.4629 44.5773 24.2248 45.7052 25.3435C46.8332 26.4622 47.6012 27.8873 47.9123 29.4388C48.2234 30.9902 48.0635 32.5983 47.4528 34.0596C46.8422 35.521 45.8082 36.77 44.4816 37.6487C43.155 38.5275 41.5954 38.9965 40 38.9965C37.8605 38.9965 35.8086 38.1538 34.2957 36.6539C32.7828 35.1539 31.9329 33.1171 31.9329 30.9958Z" fill="#777777" />
                  </svg>
               </div>
               <div className={styles.home_refferal_right_cloud_1_content}>
                  <div className={styles.home_refferal_right_cloud_1_content_name}>
                     Реферал
                  </div>
                  <div className={styles.home_refferal_right_cloud_1_content_cost}>
                     -80.000 ₽
                  </div>
               </div>
            </div>
            <div className={styles.home_refferal_right_cloud_2}>
               <div className={styles.home_refferal_right_cloud_2_icon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 40 40" fill="none">
                     <rect width={40} height={40} rx={20} fill="white" />
                     <path d="M21.1442 18.8279H26V21.1442H21.1442V26H18.8279V21.1442H14V18.8279H18.8279V14H21.1442V18.8279Z" fill="#34C759" />
                  </svg>
               </div>
               <div className={styles.home_refferal_right_cloud_2_text}>
                  12.000 ₽
               </div>
               <span className={styles.home_refferal_right_cloud_2_percent}>
                  15%
               </span>
            </div>
         </div>
      </div>
   );
}

export default HomeReferralAnimation;
