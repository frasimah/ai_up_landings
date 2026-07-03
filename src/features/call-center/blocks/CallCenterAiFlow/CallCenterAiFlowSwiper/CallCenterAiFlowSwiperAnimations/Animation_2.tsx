import styles from '../CallCenterAiFlowSwiper.module.scss'

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import BubbleInCorrect from "@/components/Bubbles/BubbleInCorrect/BubbleInCorrect";
import {
   createBubbleFloatTweens,
   playBubblesFromCenter,
   setBubblesReducedMotion,
} from "@/lib/bubbleAnimation";

gsap.registerPlugin(ScrollTrigger);

function Animation_2() {

   const containerRef = useRef<HTMLDivElement>(null);
   const triggerRef = useRef<ScrollTrigger | null>(null);
   const entryTweenRef = useRef<gsap.core.Tween | null>(null);
   const floatTweensRef = useRef<gsap.core.Tween[]>([]);

   useEffect(() => {
      const container = containerRef.current;
      if (!container) return;

      const elements = Array.from(
         container.querySelectorAll<HTMLElement>(`.${styles.buble}`)
      );

      if (!elements.length) return;

      const prefersReducedMotion = window.matchMedia(
         "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
         setBubblesReducedMotion(elements);
         return;
      }

      const startAnimation = () => {
         if (entryTweenRef.current || floatTweensRef.current.length) return;

         const startFloating = () => {
            floatTweensRef.current = createBubbleFloatTweens(elements);
         };

         entryTweenRef.current = playBubblesFromCenter({
            container,
            elements,
            onComplete: startFloating,
         });
      };

      triggerRef.current = ScrollTrigger.create({
         trigger: container,
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
      <div className={`${styles.call_center_ai_wrap_item_img} ${styles.call_center_ai_wrap_item_img_2}`} ref={containerRef}>
         <BubbleInCorrect
            className={styles.buble}
            text='Домен'
            percent='-5%'
         />
         <BubbleInCorrect
            className={styles.buble}
            text='ОКВЭД'
            percent='-10%'
         />
         <div className={styles.call_center_ai_wrap_item_img_bg}>
            <img src="/img/call-center/ai-bg.svg" alt="Декоративный фон блока Ai Flow" />
         </div>
      </div>
   );
}

export default Animation_2;
