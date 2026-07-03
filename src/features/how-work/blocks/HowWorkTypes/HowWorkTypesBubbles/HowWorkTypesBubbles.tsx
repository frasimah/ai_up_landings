"use client";
import { useEffect, useRef } from 'react';
import styles from '../HowWorkTypes.module.scss'
import gsap from "gsap";

type HowWorkTypesBubblesProps = {
   isActive?: boolean;
};

function HowWorkTypesBubbles({ isActive = true }: HowWorkTypesBubblesProps) {

   const containerRef = useRef<HTMLDivElement>(null);
   const bubbleTimelinesRef = useRef<gsap.core.Timeline[]>([]);
   const delayedCallsRef = useRef<gsap.core.Tween[]>([]);
   const reducedMotionRef = useRef(false);
   const isActiveRef = useRef(isActive);
   const startLoopsRef = useRef<(() => void) | null>(null);

   useEffect(() => {
      const containerNode = containerRef.current;
      if (!containerNode) return;

      const elements = Array.from(containerNode.children) as HTMLElement[];
      if (!elements.length) return;

      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      reducedMotionRef.current = prefersReducedMotion;
      const targetScales = [1, 0.6, 1];
      const random = gsap.utils.random;

      const clearLoops = () => {
         delayedCallsRef.current.forEach((call) => call.kill());
         delayedCallsRef.current = [];
         bubbleTimelinesRef.current.forEach((timeline) => timeline.kill());
         bubbleTimelinesRef.current = [];
      };

      if (prefersReducedMotion) {
         gsap.set(elements, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            clearProps: 'transform',
         });
         return;
      }

      const startLoops = () => {
         clearLoops();
         gsap.killTweensOf(elements);
         gsap.set(elements, {
            clearProps: 'x,y,opacity,visibility,scale,rotation',
         });

         const containerRect = containerNode.getBoundingClientRect();
         const centerX = containerRect.left + containerRect.width / 2;
         const centerY = containerRect.top + containerRect.height / 2;

         const bubbleStates = elements.map((element, index) => {
            const rect = element.getBoundingClientRect();

            return {
               element,
               startX: centerX - (rect.left + rect.width / 2),
               startY: centerY - (rect.top + rect.height / 2),
               targetScale: targetScales[index] ?? 1,
            };
         });

         const runBubble = (bubbleState: (typeof bubbleStates)[number]) => {
            if (!isActiveRef.current) return;

            const { element, startX, startY, targetScale } = bubbleState;
            const entryDuration = random(1.35, 1.95);
            const exitDuration = random(0.75, 1.1);

            const timeline = gsap.timeline({
               onComplete: () => {
                  bubbleTimelinesRef.current = bubbleTimelinesRef.current.filter((item) => item !== timeline);

                  if (!isActiveRef.current) return;

                  const nextCall = gsap.delayedCall(random(0.08, 0.38), () => {
                  delayedCallsRef.current = delayedCallsRef.current.filter((item) => item !== nextCall);
                     runBubble(bubbleState);
                  });

                  delayedCallsRef.current.push(nextCall);
               },
            });

            bubbleTimelinesRef.current.push(timeline);

            timeline.fromTo(
               element,
               {
                  x: startX + random(-42, 42),
                  y: startY + random(-36, 36),
                  autoAlpha: 0,
                  scale: Math.max(targetScale * random(0.18, 0.42), 0.2),
                  rotation: 0,
               },
               {
                  x: 0,
                  y: 0,
                  autoAlpha: 1,
                  scale: targetScale,
                  rotation: 0,
                  duration: entryDuration,
                  ease: 'power2.out',
               }
            );

            timeline.to(
               element,
               {
                  x: random(-48, 48),
                  y: random(-42, 42),
                  autoAlpha: 0,
                  scale: targetScale * random(0.72, 0.92),
                  rotation: 0,
                  duration: exitDuration,
                  ease: 'sine.inOut',
               },
               `>-${random(0.12, 0.32)}`
            );
         };

         bubbleStates.forEach((bubbleState) => {
            const initialCall = gsap.delayedCall(random(0, 1.2), () => {
               delayedCallsRef.current = delayedCallsRef.current.filter((item) => item !== initialCall);
               runBubble(bubbleState);
            });

            delayedCallsRef.current.push(initialCall);
         });
      };

      startLoopsRef.current = startLoops;
      startLoops();
      window.addEventListener('resize', startLoops);

      return () => {
         window.removeEventListener('resize', startLoops);
         startLoopsRef.current = null;
         clearLoops();
         gsap.killTweensOf(elements);
      };
   }, []);

   useEffect(() => {
      isActiveRef.current = isActive;

      if (reducedMotionRef.current) return;

      if (isActive) {
         startLoopsRef.current?.();
         return;
      }

      delayedCallsRef.current.forEach((call) => call.kill());
      delayedCallsRef.current = [];
      bubbleTimelinesRef.current.forEach((timeline) => timeline.kill());
      bubbleTimelinesRef.current = [];
   }, [isActive]);

   const bubleData = [
      '8(916)-102-87-00',
      '8(915)-093-28-01',
      '8(922)-234-34-23'
   ]
   return (
      <div className={styles.how_work_types_bubbles} ref={containerRef}>
         {bubleData?.map((text, index) => (
            <div
               className={`${styles.how_work_types_wrap_item_img_buble} ${styles[`how_work_types_wrap_item_img_buble_${index + 1}`]}`}
               key={text + index}
            >
               <div className={styles.how_work_types_wrap_item_img_buble_icon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                     <path d="M5.63129 1.59732C5.63129 1.59732 5.36994 1 4.9708 1C4.57799 1 4.37366 1.17695 4.23745 1.29905C4.10123 1.42114 1.82198 3.24864 1.82198 3.24864C1.82198 3.24864 1.15911 3.8135 1.2098 4.876C1.25256 5.9385 1.4656 7.45073 2.57117 9.55718C3.66882 11.659 6.41612 14.8705 8.15209 15.9994C8.15209 15.9994 9.76055 17.2033 11.2573 17.6925C11.6921 17.8261 12.5617 18 12.7644 18C12.9704 18 13.3339 18 13.7512 17.7025C14.1757 17.4019 16.5571 15.5335 16.5571 15.5335C16.5571 15.5335 17.14 15.0196 16.4629 14.4223C15.7826 13.825 13.7172 12.4966 13.2753 12.1474C12.8326 11.7927 12.2022 11.9488 11.9297 12.1891C11.6581 12.431 11.1726 12.8289 11.1132 12.8791C11.0245 12.9456 10.7814 13.1612 10.509 13.0538C10.1621 12.9201 8.73972 12.1667 7.42111 10.4064C6.11042 8.64768 5.96629 8.07277 5.77067 7.4515C5.7375 7.35966 5.73704 7.25958 5.76938 7.16745C5.80171 7.07533 5.86495 6.99653 5.94887 6.94382C6.14527 6.81091 6.86833 6.22286 6.86833 6.22286C6.86833 6.22286 7.33637 5.77236 7.14076 5.2415C6.94515 4.71064 5.63129 1.59732 5.63129 1.59732Z" fill="#0169F9" />
                  </svg>
               </div>
               {text}
            </div>
         ))}
      </div>
   );
}

export default HowWorkTypesBubbles;
