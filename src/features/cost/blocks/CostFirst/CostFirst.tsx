"use client";

import { useLayoutEffect, useRef } from "react";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import styles from "./CostFirst.module.scss";
import Button from "@/components/Buttons/Button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function CostFirst() {
   const sectionRef = useRef<HTMLElement | null>(null);
   const messageRef = useRef<HTMLDivElement | null>(null);
   const buttonRef = useRef<HTMLDivElement | null>(null);

   useLayoutEffect(() => {
      const sectionNode = sectionRef.current;
      if (!sectionNode) return;

      const ctx = gsap.context(() => {
         const messageNode = messageRef.current;
         const headerNode = sectionNode.querySelector<HTMLElement>(
            `.${styles.cost_first_wrap_header}`
         );
         const buttonNode = buttonRef.current;

         if (!messageNode || !headerNode || !buttonNode) return;

         const titleNode = headerNode.querySelector<HTMLElement>("h1, h2, h3");
         const descriptionNode = headerNode.querySelector<HTMLElement>("p");
         if (!titleNode) return;

         const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
         ).matches;

         const animatedNodes = [messageNode, titleNode, descriptionNode, buttonNode].filter(
            Boolean
         ) as HTMLElement[];

         if (prefersReducedMotion) {
            gsap.set(animatedNodes, {
               autoAlpha: 1,
               y: 0,
               scale: 1,
               clearProps: "transform",
            });
            return;
         }

         const isTabletOrSmaller = window.matchMedia("(max-width: 1199px)").matches;
         const initialY = isTabletOrSmaller ? 10 : 14;

         gsap.set(messageNode, { autoAlpha: 0, y: initialY });
         gsap.set(titleNode, { autoAlpha: 0, y: initialY + 2 });
         if (descriptionNode) {
            gsap.set(descriptionNode, { autoAlpha: 0, y: initialY + 2 });
         }
         gsap.set(buttonNode, { autoAlpha: 0, y: initialY, scale: 0.97 });

         const timeline = gsap.timeline({ paused: true });
         timeline
            .to(messageNode, {
               autoAlpha: 1,
               y: 0,
               duration: 0.75,
               ease: "power2.out",
               delay: .25
            })
            .to(
               titleNode,
               {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.75,
                  ease: "power2.out",
               },
               "-=0.6"
            );

         if (descriptionNode) {
            timeline.to(
               descriptionNode,
               {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.75,
                  ease: "power2.out",
               },
               "-=0.6"
            );
         }

         timeline.to(
            buttonNode,
            {
               autoAlpha: 1,
               y: 0,
               scale: 1,
               duration: 0.75,
               ease: "power2.out",
            },
            "-=0.6"
         );

         ScrollTrigger.create({
            trigger: sectionNode,
            start: isTabletOrSmaller ? "top 92%" : "top 86%",
            once: true,
            onEnter: () => timeline.play(0),
         });
      }, sectionNode);

      return () => ctx.revert();
   }, []);

   return (
      <section ref={sectionRef} className={styles.cost_first}>
         <div className="container">
            <div className={styles.cost_first_wrap}>
               <div ref={messageRef} className={styles.cost_first_wrap_message}>
                  <div className={styles.cost_first_wrap_message_icon}>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={28}
                        height={28}
                        viewBox="0 0 28 28"
                        fill="none"
                     >
                        <rect width={28} height={28} rx={14} fill="#34C759" />
                        <path
                           d="M14.9535 13.0233H19V14.9535H14.9535V19H13.0233V14.9535H9V13.0233H13.0233V9H14.9535V13.0233Z"
                           fill="white"
                        />
                     </svg>
                  </div>
                  +50 идентификаций при первом пополнении
               </div>
               <SectionHeader
                  className={styles.cost_first_wrap_header}
                  title="Платите только за контакты реальных людей. Без подписок и абонентской платы"
                  as="h1"
                  titleSize="h1"
                  description="Ai-UP не использует рекламные ставки, аукционы или списания за клики. Вы платите только за реальные идентификации контактов, которые вчера проявили интерес в вашей нише."
                  descriptionSize="large"
                  size="small"
                  alignLeftMobile={true}
               />
               <div ref={buttonRef} className={styles.cost_first_wrap_btn}>
                  <Button variant="blue">Попробовать</Button>
               </div>
            </div>
         </div>
         <div className={styles.cost_first_bg}>
            <img src="/img/first-bg.svg" alt="Декоративный фон первого экрана" />
         </div>
      </section>
   );
}

export default CostFirst;
