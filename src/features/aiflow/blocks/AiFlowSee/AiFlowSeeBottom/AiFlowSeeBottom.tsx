"use client";

import SliderCheck from '@/components/SliderCheck/SliderCheck';
import styles from './AiFlowSeeBottom.module.scss'
import { useEffect, useRef } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function AiFlowSeeBottom() {

   const dataHead = [
      "Зачем нужен Ai Flow — на уровне одной фразы?",
      "Чтобы контакт становился дешевле и качественнее каждый день — без вашего участия"
   ]

   const dataList = [
      'Без маркетологов',
      'Без аналитиков',
      'Без Excel'
   ]

   const containerRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
      const containerNode = containerRef.current;
      if (!containerNode) return;

      const elements = Array.from(containerNode.children) as HTMLElement[];
      if (!elements.length) return;
      const floatTweens: gsap.core.Tween[] = [];
      let isAnimated = false;
      const prefersReducedMotion = window.matchMedia(
         "(prefers-reduced-motion: reduce)"
      ).matches;

      const startAnimation = () => {
         if (isAnimated) return;
         isAnimated = true;

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

         gsap.fromTo(
            elements,
            { opacity: 0, scale: 0.5, y: 20 },
            { opacity: 1, scale: 1, y: 0, duration: 0.8, stagger: 1, ease: "back.out(1.7)" }
         );

         elements.forEach((el, index) => {
            const tween = gsap.to(el, {
               y: "-=15",
               rotation: index % 2 === 0 ? -1 : 1,
               duration: 2 + Math.random(),
               repeat: -1,
               yoyo: true,
               ease: "sine.inOut",
               delay: Math.random(),
            });
            floatTweens.push(tween);
         });
      };

      const scrollTrigger = ScrollTrigger.create({
         trigger: containerNode,
         start: "top 80%",
         end: "bottom top",
         onEnter: startAnimation,
      });

      return () => {
         scrollTrigger.kill();
         gsap.killTweensOf(elements);
         floatTweens.forEach((tween) => tween.kill());
      };
   }, []);
   return (
      <div className={styles.ai_flow_see_bottom}>
         <div className={styles.ai_flow_see_bottom_head} ref={containerRef}>
            {dataHead?.map((item, index) => (
               <div className={styles.ai_flow_see_bottom_head_item} key={'work-head-' + index}>
                  {item}
               </div>
            ))}
         </div>
         <div className={`row ${styles.ai_flow_see_bottom_list}`}>
            {dataList?.map((item, index) => (
               <div className="col-xl-4" key={item + index}>
                  <div className={styles.ai_flow_see_bottom_list_it}>
                     <div className={styles.ai_flow_see_bottom_list_it_icon}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 40 40" fill="none">
                           <path fillRule="evenodd" clipRule="evenodd" d="M40 20C40 31.0456 31.0456 40 20 40C8.9543 40 0 31.0456 0 20C0 8.9543 8.9543 0 20 0C31.0456 0 40 8.9543 40 20ZM13.9393 13.9393C14.525 13.3535 15.4748 13.3535 16.0606 13.9393L20 17.8786L23.9392 13.9393C24.525 13.3536 25.4748 13.3536 26.0606 13.9393C26.6464 14.5251 26.6464 15.4749 26.0606 16.0606L22.1212 20L26.0606 23.9392C26.6464 24.525 26.6464 25.4748 26.0606 26.0606C25.4748 26.6464 24.525 26.6464 23.9392 26.0606L20 22.1214L16.0606 26.0606C15.4748 26.6464 14.5251 26.6464 13.9393 26.0606C13.3535 25.4748 13.3535 24.525 13.9393 23.9394L17.8786 20L13.9393 16.0606C13.3535 15.4748 13.3535 14.5251 13.9393 13.9393Z" fill="white" />
                        </svg>
                     </div>
                     {item}
                  </div>
               </div>
            ))}
         </div>
         <div className={styles.ai_flow_see_bottom_check}>
            <SliderCheck
               isActive={false}
            />
            Один переключатель — и оптимизация становится автоматической
         </div>
         <div className={styles.ai_flow_see_bottom_bg}>
            <img src="/img/ai-flow/see-bg.svg" alt="Декоративный фон блока Ai Flow" />
         </div>
      </div>
   );
}

export default AiFlowSeeBottom;
