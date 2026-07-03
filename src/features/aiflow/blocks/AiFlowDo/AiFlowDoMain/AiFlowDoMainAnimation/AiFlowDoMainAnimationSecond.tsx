"use client";

import { useEffect, useRef, useState } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from '../AiFlowDoMain.module.scss'
import BubbleInCorrect from '@/components/Bubbles/BubbleInCorrect/BubbleInCorrect';
import {
   createBubbleFloatTweens,
   playBubblesFromCenter,
   setBubblesReducedMotion,
} from '@/lib/bubbleAnimation';

gsap.registerPlugin(ScrollTrigger);

type AiFlowDoMainAnimationSecondProps = {
   isActive?: boolean;
};

function AiFlowDoMainAnimationSecond({ isActive = true }: AiFlowDoMainAnimationSecondProps) {
   const containerRef = useRef<HTMLDivElement>(null);
   const [isAnimation, setIsAnimation] = useState(false);
   const isActiveRef = useRef(isActive);
   const floatTweensRef = useRef<gsap.core.Tween[]>([]);
   const entryTweenRef = useRef<gsap.core.Tween | null>(null);

   useEffect(() => {
      const containerNode = containerRef.current;
      if (!containerNode) return;

      const scrollTrigger = ScrollTrigger.create({
         trigger: containerNode,
         start: "top 80%",
         once: true,
         onEnter: () => {
            setIsAnimation(true)
         },
      });

      return () => {
         scrollTrigger.kill();
      };
   }, []);

   useEffect(() => {
      const containerNode = containerRef.current;
      if (!isAnimation || !containerNode) return;

      const elements = Array.from(containerNode.children) as HTMLElement[];
      if (!elements.length) return;

      const prefersReducedMotion = window.matchMedia(
         "(prefers-reduced-motion: reduce)"
      ).matches;

      entryTweenRef.current?.kill();
      floatTweensRef.current.forEach((tween) => tween.kill());
      floatTweensRef.current = [];
      gsap.killTweensOf(elements);

      if (prefersReducedMotion) {
         setBubblesReducedMotion(elements);
         return;
      }

      const startFloating = () => {
         floatTweensRef.current = createBubbleFloatTweens(elements);

         if (!isActiveRef.current) {
            floatTweensRef.current.forEach((tween) => {
               tween.pause();
            });
         }
      };

      entryTweenRef.current = playBubblesFromCenter({
         container: containerNode,
         elements,
         onComplete: startFloating,
      });

      return () => {
         entryTweenRef.current?.kill();
         entryTweenRef.current = null;
         floatTweensRef.current.forEach((tween) => tween.kill());
         floatTweensRef.current = [];
         gsap.killTweensOf(elements);
      };
   }, [isAnimation]);

   useEffect(() => {
      isActiveRef.current = isActive;

      floatTweensRef.current.forEach((tween) => {
         if (isActive) {
            tween.resume();
            return;
         }

         tween.pause();
      });
   }, [isActive]);
   return (
      <div className={`${styles.ai_flow_do_wrap_main_item_img_bubless} ${styles.ai_flow_do_wrap_main_item_img_bubless_second}`} ref={containerRef}>
         <BubbleInCorrect
            className={styles.ai_flow_do_wrap_main_item_img_buble}
            text='Домен'
            percent='-5%'
         />
         <BubbleInCorrect
            className={styles.ai_flow_do_wrap_main_item_img_buble}
            text='ОКВЭД'
            percent='-10%'
         />
      </div>
   );
}

export default AiFlowDoMainAnimationSecond;
