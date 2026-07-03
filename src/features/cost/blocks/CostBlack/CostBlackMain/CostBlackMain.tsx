"use client";

import { useLayoutEffect, useRef } from "react";
import styles from './CostBlackMain.module.scss'
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function CostBlackMain() {
   const chatRef = useRef<HTMLDivElement | null>(null);
   const botRef = useRef<HTMLDivElement | null>(null);

   useLayoutEffect(() => {
      const chatNode = chatRef.current;
      if (!chatNode) return;

      const ctx = gsap.context(() => {
         const chatItems = Array.from(
            chatNode.querySelectorAll<HTMLElement>(`.${styles.cost_main_wrap_top_chat_item}`)
         );
         if (!chatItems.length) return;

         const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
         ).matches;

         if (prefersReducedMotion) {
            gsap.set(chatItems, { autoAlpha: 1, x: 0, y: 0, clearProps: "transform" });
            return;
         }

         const isTabletOrSmaller = window.matchMedia("(max-width: 1199px)").matches;

         chatItems.forEach((item, index) => {
            const fromX = isTabletOrSmaller ? 0 : index === 1 ? 26 : -26;
            gsap.set(item, {
               autoAlpha: 0,
               x: fromX,
               y: 12,
               scale: 0.94,
            });
         });

         const chatTimeline = gsap.timeline({ paused: true });
         const floatTweens: gsap.core.Tween[] = [];

         const stopFloating = () => {
            floatTweens.forEach((tween) => tween.kill());
            floatTweens.length = 0;
            chatItems.forEach((item) => {
               gsap.set(item, { rotation: 0 });
            });
         };

         const startFloating = () => {
            stopFloating();
            chatItems.forEach((item, index) => {
               const tween = gsap.to(item, {
                  y: "-=10",
                  rotation: index === 2 ? 1 : (index % 2 === 0 ? -1 : 1),
                  duration: 2 + Math.random(),
                  repeat: -1,
                  yoyo: true,
                  ease: "sine.inOut",
                  delay: Math.random(),
               });
               floatTweens.push(tween);
            });
         };

         chatItems.forEach((item, index) => {
            chatTimeline.to(
               item,
               {
                  autoAlpha: 1,
                  x: 0,
                  y: 0,
                  scale: 1,
                  duration: 0.62,
                  ease: "power3.out",
               },
               index === 0 ? 0 : `+=${index === 1 ? 0.2 : 0.16}`
            );
         });

         chatTimeline.eventCallback("onComplete", startFloating);

         ScrollTrigger.create({
            trigger: chatNode,
            start: isTabletOrSmaller ? "top 90%" : "top 84%",
            once: true,
            onEnter: () => {
               chatTimeline.play(0);
            },
         });

         return () => {
            chatTimeline.eventCallback("onComplete", null);
            stopFloating();
            chatTimeline.kill();
         };
      }, chatNode);

      return () => ctx.revert();
   }, []);

   useLayoutEffect(() => {
      const botNode = botRef.current;
      if (!botNode) return;

      const ctx = gsap.context(() => {
         const sequenceNodes = Array.from(
            botNode.querySelectorAll<HTMLElement>(
               `.${styles.cost_main_wrap_bot_item}, .${styles.cost_main_wrap_bot_arrow}`
            )
         );
         if (!sequenceNodes.length) return;

         const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
         ).matches;

         if (prefersReducedMotion) {
            gsap.set(sequenceNodes, { autoAlpha: 1, x: 0, y: 0, clearProps: "transform" });
            return;
         }

         const isTabletOrSmaller = window.matchMedia("(max-width: 1199px)").matches;
         const cardOffsetY = isTabletOrSmaller ? 8 : 10;
         const arrowOffset = isTabletOrSmaller ? -10 : -14;

         const resetBotInstant = () => {
            sequenceNodes.forEach((node) => {
               const isArrow = node.classList.contains(styles.cost_main_wrap_bot_arrow);
               gsap.set(node, {
                  autoAlpha: 0,
                  x: isArrow && !isTabletOrSmaller ? arrowOffset : 0,
                  y: isArrow ? (isTabletOrSmaller ? arrowOffset : 0) : cardOffsetY,
               });
            });
         };

         resetBotInstant();

         const botTimeline = gsap.timeline({ paused: true });
         sequenceNodes.forEach((node, index) => {
            const isArrow = node.classList.contains(styles.cost_main_wrap_bot_arrow);

            botTimeline.to(
               node,
               {
                  autoAlpha: 1,
                  x: 0,
                  y: 0,
                  duration: isArrow ? 0.34 : 0.5,
                  ease: "power2.out",
               },
               index === 0 ? 0 : `+=${isArrow ? 0.06 : 0.16}`
            );
         });

         ScrollTrigger.create({
            trigger: botNode,
            start: isTabletOrSmaller ? "top 92%" : "top 86%",
            once: true,
            onEnter: () => botTimeline.play(0),
         });
      }, botNode);

      return () => ctx.revert();
   }, []);

   return (
      <div className={styles.cost_main}>
         <div className={styles.cost_main_wrap}>
            <div className={styles.cost_main_wrap_top}>
               <div ref={chatRef} className={styles.cost_main_wrap_top_chat}>
                  <div className={styles.cost_main_wrap_top_chat_item}>
                     Стоимость контакта фиксированная.
                     <br />
                     Но стоимость лида может снижаться каждый день.
                  </div>
                  <div className={styles.cost_main_wrap_top_chat_item}>
                     Почему?
                  </div>
                  <div className={styles.cost_main_wrap_top_chat_item}>
                     Потому что Ai Flow делает оптимизацию
                  </div>
               </div>
            </div>
            <div ref={botRef} className={styles.cost_main_wrap_bot}>
               <div className={styles.cost_main_wrap_bot_item}>
                  Ai Flow
               </div>
               <div className={styles.cost_main_wrap_bot_arrow} aria-hidden="true">
                  <svg className={styles.cost_main_wrap_bot_arrow_desktop} xmlns="http://www.w3.org/2000/svg" width={23} height={20} viewBox="0 0 23 20" fill="none">
                     <path d="M9.35704 0H13.1849L23 10L13.1849 20H9.35704L17.798 11.4H0V8.6H17.798L9.35704 0Z" fill="white" />
                  </svg>
                  <svg className={styles.cost_main_wrap_bot_arrow_tablet} xmlns="http://www.w3.org/2000/svg" width={11} height={13} viewBox="0 0 11 13" fill="none">
                     <path d="M11 5.28876L11 7.45235L5.5 13L8.88684e-08 7.45235L6.30679e-08 5.28876L4.73 10.0597L4.73 7.4769e-08L6.27 5.64047e-08L6.27 10.0597L11 5.28876Z" fill="white" />
                  </svg>
               </div>
               <div className={styles.cost_main_wrap_bot_item}>
                  меньше контактов тратится на один лид
               </div>
               <div className={styles.cost_main_wrap_bot_arrow} aria-hidden="true">
                  <svg className={styles.cost_main_wrap_bot_arrow_desktop} xmlns="http://www.w3.org/2000/svg" width={23} height={20} viewBox="0 0 23 20" fill="none">
                     <path d="M9.35704 0H13.1849L23 10L13.1849 20H9.35704L17.798 11.4H0V8.6H17.798L9.35704 0Z" fill="white" />
                  </svg>
                  <svg className={styles.cost_main_wrap_bot_arrow_tablet} xmlns="http://www.w3.org/2000/svg" width={11} height={13} viewBox="0 0 11 13" fill="none">
                     <path d="M11 5.28876L11 7.45235L5.5 13L8.88684e-08 7.45235L6.30679e-08 5.28876L4.73 10.0597L4.73 7.4769e-08L6.27 5.64047e-08L6.27 10.0597L11 5.28876Z" fill="white" />
                  </svg>
               </div>
               <div className={styles.cost_main_wrap_bot_item}>
                  стоимость лида снижается
               </div>
            </div>
         </div>
      </div>
   );
}

export default CostBlackMain;
