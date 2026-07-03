"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BubbleBig from "@/components/Bubbles/BubbleBig/BubbleBig";
import {
   createBubbleFloatTweens,
   playBubblesFromCenter,
   setBubblesReducedMotion,
} from "@/lib/bubbleAnimation";

gsap.registerPlugin(ScrollTrigger);

type ReferralBonusAnimatedBubbleProps = {
   className?: string;
   text?: string;
   cost?: string;
   percent?: string;
};

function ReferralBonusAnimatedBubble({
   className,
   text,
   cost,
   percent,
}: ReferralBonusAnimatedBubbleProps) {
   const wrapperRef = useRef<HTMLDivElement | null>(null);
   const bubbleRef = useRef<HTMLDivElement | null>(null);
   const triggerRef = useRef<ScrollTrigger | null>(null);
   const entryTweenRef = useRef<gsap.core.Tween | null>(null);
   const floatTweensRef = useRef<gsap.core.Tween[]>([]);

   useEffect(() => {
      const wrapperNode = wrapperRef.current;
      const bubbleNode = bubbleRef.current;
      const containerNode = wrapperNode?.parentElement;

      if (!wrapperNode || !bubbleNode || !containerNode) return;

      const elements = [bubbleNode];
      const prefersReducedMotion = window.matchMedia(
         "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
         setBubblesReducedMotion(elements);
         return;
      }

      gsap.set(elements, {
         opacity: 0,
         scale: 0.64,
         x: 0,
         y: 0,
      });

      const startAnimation = () => {
         if (entryTweenRef.current || floatTweensRef.current.length) return;

         entryTweenRef.current = playBubblesFromCenter({
            container: containerNode,
            elements,
            onComplete: () => {
               floatTweensRef.current = createBubbleFloatTweens(elements, {
                  distance: 6,
                  baseDuration: 3.8,
                  rotation: 1,
               });
            },
         });
      };

      triggerRef.current = ScrollTrigger.create({
         trigger: wrapperNode,
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
      <div ref={wrapperRef} className={className}>
         <BubbleBig
            text={text}
            cost={cost}
            percent={percent}
            ref={bubbleRef}
         />
      </div>
   );
}

export default ReferralBonusAnimatedBubble;
