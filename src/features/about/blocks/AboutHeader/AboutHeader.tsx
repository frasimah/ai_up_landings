"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import Button from "@/components/Buttons/Button";
import styles from "./AboutHeader.module.scss";

gsap.registerPlugin(ScrollTrigger);

function AboutHeader() {
   const sectionRef = useRef<HTMLElement | null>(null);
   const peopleRef = useRef<HTMLDivElement | null>(null);
   const headerRef = useRef<HTMLDivElement | null>(null);
   const buttonRef = useRef<HTMLDivElement | null>(null);

   useLayoutEffect(() => {
      const sectionNode = sectionRef.current;
      if (!sectionNode) return;

      const ctx = gsap.context(() => {
         const peopleNode = peopleRef.current;
         const headerNode = headerRef.current;
         const buttonNode = buttonRef.current;

         if (!peopleNode || !headerNode || !buttonNode) return;

         const titleNode = headerNode.querySelector<HTMLElement>("h1, h2, h3");
         const descriptionNode = headerNode.querySelector<HTMLElement>("p");
         if (!titleNode) return;

         const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
         ).matches;

         const animatedNodes = [peopleNode, titleNode, descriptionNode, buttonNode].filter(
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

         gsap.set(peopleNode, { autoAlpha: 0, y: initialY });
         gsap.set(titleNode, { autoAlpha: 0, y: initialY + 2 });
         if (descriptionNode) {
            gsap.set(descriptionNode, { autoAlpha: 0, y: initialY + 2 });
         }
         gsap.set(buttonNode, { autoAlpha: 0, y: initialY, scale: 0.97 });

         const timeline = gsap.timeline({ paused: true });
         timeline
            .to(peopleNode, {
               autoAlpha: 1,
               y: 0,
               duration: 0.75,
               ease: "power2.out",
               delay: 0.2,
            })
            .to(
               titleNode,
               {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.75,
                  ease: "power2.out",
               },
               "-=0.58"
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

         const trigger = ScrollTrigger.create({
            trigger: sectionNode,
            start: isTabletOrSmaller ? "top 92%" : "top 86%",
            once: true,
            onEnter: () => timeline.play(0),
         });

         if (trigger.isActive || trigger.progress > 0) {
            timeline.play(0);
         }
      }, sectionNode);

      return () => ctx.revert();
   }, []);

   return (
      <section ref={sectionRef} className={styles.about_header}>
         <div className="container">
            <div className={styles.about_header_wrap}>
               <div ref={peopleRef} className={styles.about_header_wrap_people}>
                  <div className={styles.about_header_wrap_people_item}>
                     <div className={styles.about_header_wrap_people_item_img}>
                        <img src="/img/about/about-2.png" alt="Заинтересованный клиент Ai-UP" />
                     </div>
                     <div className={styles.about_header_wrap_people_item_content}>
                        <span className={styles.about_header_wrap_people_item_content_icon}></span>
                        <div className={styles.about_header_wrap_people_item_content_text}>
                           Заинтересован
                        </div>
                     </div>
                  </div>
                  <div className={styles.about_header_wrap_people_item}>
                     <div className={styles.about_header_wrap_people_item_img}>
                        <img src="/img/about/about-1.png" alt="Контакт клиента Ai-UP" />
                     </div>
                     <div className={styles.about_header_wrap_people_item_content}>
                        <span className={styles.about_header_wrap_people_item_content_icon}></span>
                        <div className={styles.about_header_wrap_people_item_content_text}>
                           Заинтересован
                        </div>
                     </div>
                  </div>
                  <div className={styles.about_header_wrap_people_item}>
                     <div className={styles.about_header_wrap_people_item_img}>
                        <img src="/img/about/about-3.png" alt="Лид в системе Ai-UP" />
                     </div>
                     <div className={styles.about_header_wrap_people_item_content}>
                        <span className={styles.about_header_wrap_people_item_content_icon}></span>
                        <div className={styles.about_header_wrap_people_item_content_text}>
                           Заинтересован
                        </div>
                     </div>
                  </div>
               </div>
               <div ref={headerRef}>
                  <SectionHeader
                     title="Мы создали способ получать клиентов, когда реклама перестала работать"
                     titleSize="h1"
                     as="h1"
                     description="Ai-UP — российская платформа, которая помогает бизнесу привлекать клиентов из уже проявившегося интереса спроса без рекламных кабинетов, ставок и сложной аналитики, делая маркетинг в 3–5 раз эффективнее классической рекламы"
                     size="small"
                     className={styles.about_header_wrap_head}
                  />
               </div>
               <div ref={buttonRef} className={styles.about_header_wrap_btn_block}>
                  <Button>Создать аккаунт</Button>
               </div>
            </div>
         </div>
         <div className={styles.about_header_bg}>
            <img src="/img/first-bg.svg" alt="Декоративный фон первого экрана" />
         </div>
      </section>
   );
}

export default AboutHeader;
