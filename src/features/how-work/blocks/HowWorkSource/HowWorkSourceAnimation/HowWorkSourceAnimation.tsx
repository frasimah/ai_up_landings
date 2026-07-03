import styles from './HowWorkSourceAnimation.module.scss';
import { useEffect, useRef, useState } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function HowWorkSourceAnimation() {
   const dataHead = [
      "Что такое источник?",
      "Это место, откуда Ai-UP собирает контакты: сайт, телефон, альфа-имена или ОКВЭД-направление"
   ]

   const containerRef = useRef<HTMLDivElement>(null);
   const [isActive, setIsActive] = useState(false);
   const floatTweensRef = useRef<gsap.core.Tween[]>([]);
   const entryTweenRef = useRef<gsap.core.Tween | null>(null);
   const triggerRef = useRef<ScrollTrigger | null>(null);
   const hasAnimatedRef = useRef(false);
   const prefersReducedMotionRef = useRef(false);

   useEffect(() => {
      const containerNode = containerRef.current;
      if (!containerNode) return;

      prefersReducedMotionRef.current = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      if (prefersReducedMotionRef.current) {
         return;
      }

      const observer = new IntersectionObserver(
         ([entry]) => {
            setIsActive(entry.isIntersecting);
         },
         {
            rootMargin: '80px 0px',
            threshold: 0.2,
         }
      );

      observer.observe(containerNode);

      return () => observer.disconnect();
   }, []);

   useEffect(() => {
      const containerNode = containerRef.current;
      if (!containerNode) return;

      const elements = Array.from(containerNode.children) as HTMLElement[];
      if (!elements.length) return;

      if (prefersReducedMotionRef.current) {
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

         elements.forEach((el, index) => {
            const tween = gsap.to(el, {
               y: "-=10",
               rotation: index % 2 === 0 ? -1 : 1,
               duration: 3.2 + Math.random() * 0.8,
               repeat: -1,
               yoyo: true,
               ease: "sine.inOut",
               delay: Math.random() * 0.8,
            });
            floatTweensRef.current.push(tween);
         });
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
               duration: 0.95,
               stagger: 1.05,
               ease: "back.out(1.4)",
               onComplete: startFloating,
            }
         );
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

   useEffect(() => {
      floatTweensRef.current.forEach((tween) => {
         if (isActive) {
            tween.resume();
            return;
         }

         tween.pause();
      });
   }, [isActive]);

   return (
      <div className={styles.ai_flow_see_bottom_head} ref={containerRef}>
         {dataHead?.map((item, index) => (
            <div className={styles.ai_flow_see_bottom_head_item} key={'work-head-' + index}>
               {item}
            </div>
         ))}
      </div>
   );
}

export default HowWorkSourceAnimation;
