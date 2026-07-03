"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SliderCheck from '@/components/SliderCheck/SliderCheck';
import styles from '../AiFlowExample.module.scss'
import BubbleInCorrect from '@/components/Bubbles/BubbleInCorrect/BubbleInCorrect';

gsap.registerPlugin(ScrollTrigger);

function AiFlowExampleAnimations_3() {

   const containerRef = useRef<HTMLDivElement>(null);
   const wrapRef = useRef<HTMLDivElement>(null);
   const floatTweensRef = useRef<gsap.core.Tween[]>([]);
   const entryTweenRef = useRef<gsap.core.Tween | null>(null);
   const timeoutRef = useRef<number | null>(null);
   const [isAnimation, setSsAnimation] = useState(false)

   useEffect(() => {
      const wrapNode = wrapRef.current;
      if (!wrapNode) return;

      const scrollTrigger = ScrollTrigger.create({
         trigger: wrapNode,
         start: "top 50%",
         once: true,
         onEnter: () => {
            timeoutRef.current = window.setTimeout(() => {
               setSsAnimation(true)
            }, 200);
         },
      });

      return () => {
         scrollTrigger.kill();
         if (timeoutRef.current) {
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
         }
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

      floatTweensRef.current.forEach((tween) => tween.kill());
      floatTweensRef.current = [];
      entryTweenRef.current?.kill();
      gsap.killTweensOf(elements);

      if (prefersReducedMotion) {
         gsap.set(elements, {
            autoAlpha: 1,
            scale: 1,
            x: 0,
            y: 0,
            rotation: 0,
         });
         return;
      }

      entryTweenRef.current = gsap.fromTo(
         elements,
         { opacity: 0, scale: 0.5, y: 20 },
         { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 0.8, ease: "back.out(1.7)" }
      );

      elements.forEach((el, index) => {
         const tween = gsap.to(el, {
            y: "-=15",
            rotation: index % 2 === 0 ? 2 : -2,
            duration: 2 + Math.random(),
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: Math.random(),
         });
         floatTweensRef.current.push(tween);
      });

      return () => {
         entryTweenRef.current?.kill();
         entryTweenRef.current = null;
         floatTweensRef.current.forEach((tween) => tween.kill());
         floatTweensRef.current = [];
         gsap.killTweensOf(elements);
      };
   }, [isAnimation]);
   return (
      <div className={styles.ai_flow_example_animations_3} ref={wrapRef}>
         <svg width={506} height={360} viewBox="0 0 506 360" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
               <pattern id="aiflow-example-3-dots-sm" x="0" y="0" width="11.11" height="11.11" patternUnits="userSpaceOnUse">
                  <circle cx="5.555" cy="5.555" r="0.42" fill="#E9E9E9" />
               </pattern>
               <pattern id="aiflow-example-3-dots-md" x="0" y="0" width="11.11" height="11.11" patternUnits="userSpaceOnUse">
                  <circle cx="5.555" cy="5.555" r="0.8" fill="#E9E9E9" />
               </pattern>
               <pattern id="aiflow-example-3-dots-lg" x="0" y="0" width="11.11" height="11.11" patternUnits="userSpaceOnUse">
                  <circle cx="5.555" cy="5.555" r="1.28" fill="#E9E9E9" />
               </pattern>
               <pattern id="aiflow-example-3-dots-xl" x="0" y="0" width="11.11" height="11.11" patternUnits="userSpaceOnUse">
                  <circle cx="5.555" cy="5.555" r="1.88" fill="#E9E9E9" />
               </pattern>
               <radialGradient id="aiflow-example-3-fade-md" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(253 180) rotate(90) scale(170 120)">
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
               </radialGradient>
               <radialGradient id="aiflow-example-3-fade-lg" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(253 180) rotate(90) scale(132 92)">
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
               </radialGradient>
               <radialGradient id="aiflow-example-3-fade-xl" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(253 180) rotate(90) scale(94 66)">
                  <stop stopColor="white" />
                  <stop offset="1" stopColor="white" stopOpacity="0" />
               </radialGradient>
               <mask id="aiflow-example-3-mask-md" maskUnits="userSpaceOnUse" x="0" y="0" width="506" height="360">
                  <rect width="506" height="360" fill="url(#aiflow-example-3-fade-md)" />
               </mask>
               <mask id="aiflow-example-3-mask-lg" maskUnits="userSpaceOnUse" x="0" y="0" width="506" height="360">
                  <rect width="506" height="360" fill="url(#aiflow-example-3-fade-lg)" />
               </mask>
               <mask id="aiflow-example-3-mask-xl" maskUnits="userSpaceOnUse" x="0" y="0" width="506" height="360">
                  <rect width="506" height="360" fill="url(#aiflow-example-3-fade-xl)" />
               </mask>
            </defs>
            <rect width="506" height="360" fill="url(#aiflow-example-3-dots-sm)" opacity="0.56" />
            <rect width="506" height="360" fill="url(#aiflow-example-3-dots-md)" opacity="0.72" mask="url(#aiflow-example-3-mask-md)" />
            <rect width="506" height="360" fill="url(#aiflow-example-3-dots-lg)" opacity="0.88" mask="url(#aiflow-example-3-mask-lg)" />
            <rect width="506" height="360" fill="url(#aiflow-example-3-dots-xl)" mask="url(#aiflow-example-3-mask-xl)" />
         </svg>
         <div className={styles.ai_flow_example_animations_3_check}>
            <SliderCheck isActive={true} />
            Terra Link
         </div>
         <div className="buble" ref={containerRef}>
            <BubbleInCorrect
               text='Домен'
               percent='-5%'
               className={styles.ai_flow_example_animations_3_buble_1}
            />
            <BubbleInCorrect
               text='ОКВЭД'
               percent='-10%'
               className={styles.ai_flow_example_animations_3_buble_2}
            />
         </div>

      </div>
   );
}

export default AiFlowExampleAnimations_3;
