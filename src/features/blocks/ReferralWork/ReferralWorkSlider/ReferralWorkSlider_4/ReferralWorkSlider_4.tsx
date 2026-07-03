"use client";

import BubbleBig from '@/components/Bubbles/BubbleBig/BubbleBig';
import styles from '../ReferralWorkSlider.module.scss'
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
   createBubbleFloatTweens,
   playBubblesFromCenter,
   setBubblesReducedMotion,
} from '@/lib/bubbleAnimation';

gsap.registerPlugin(ScrollTrigger);

function ReferralWorkSlider_4() {

   const containerRef = useRef<HTMLDivElement>(null);
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
         setBubblesReducedMotion(elements);
         return;
      }

      const startFloating = () => {
         if (floatTweensRef.current.length) return;

         floatTweensRef.current = createBubbleFloatTweens(elements);
      };

      const startAnimation = () => {
         if (hasAnimatedRef.current) return;
         hasAnimatedRef.current = true;

         entryTweenRef.current = playBubblesFromCenter({
            container: containerNode,
            elements,
            onComplete: startFloating,
         });
      };

      triggerRef.current = ScrollTrigger.create({
         trigger: containerNode,
         start: "top 80%",
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
      <>
         <div className={styles.home_get_wrap_main_sw_it_header}>
            <h3 className={styles.home_get_wrap_main_sw_it_header_title}>
               С каждого его пополнения вы получаете процент
            </h3>
            <div className={styles.home_get_wrap_main_sw_it_header_text}>
               <ul>
                  <li>
                     15% — базовая ставка
                  </li>
                  <li>
                     20% — если оборот ваших рефералов превысил 1 млн ₽/мес
                  </li>
               </ul>
            </div>
         </div>
         <div className={`${styles.home_get_wrap_main_sw_it_icon} ${styles.home_get_wrap_main_sw_it_icon_4}`} ref={containerRef}>
            <BubbleBig
               cost='24.000 ₽'
               percent='15%'
               className={styles.home_get_wrap_main_sw_it_icon_4_buble}
            />
            <BubbleBig
               cost='32.000 ₽'
               percent='20%'
               className={styles.home_get_wrap_main_sw_it_icon_4_buble}
            />
         </div>
      </>
   );
}

export default ReferralWorkSlider_4;
