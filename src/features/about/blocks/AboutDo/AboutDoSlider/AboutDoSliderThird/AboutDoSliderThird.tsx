"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "../AboutDoSlider.module.scss";

gsap.registerPlugin(ScrollTrigger);

type AboutDoSliderThirdProps = {
   isActiveMobile?: boolean;
};

function AboutDoSliderThird({ isActiveMobile = false }: AboutDoSliderThirdProps) {
   const rootRef = useRef<HTMLDivElement | null>(null);
   const timelineRef = useRef<gsap.core.Timeline | null>(null);

   const resetToInitial = () => {
      const rootNode = rootRef.current;
      if (!rootNode) return;

      const legalPoints = Array.from(
         rootNode.querySelectorAll<HTMLElement>(
            `.${styles.home_get_wrap_main_sw_it_header_text} li`
         )
      );
      const cardNode = rootNode.querySelector<HTMLElement>(
         `.${styles.home_get_wrap_main_sw_it_icon_3_item}`
      );
      const cardRows = Array.from(
         rootNode.querySelectorAll<HTMLElement>(
            `.${styles.home_get_wrap_main_sw_it_icon_3_item_content} p`
         )
      );
      const avatarNode = rootNode.querySelector<HTMLElement>(
         `.${styles.home_get_wrap_main_sw_it_icon_3_item_img}`
      );

      gsap.killTweensOf([legalPoints, cardNode, cardRows, avatarNode]);
      if (legalPoints.length) gsap.set(legalPoints, { autoAlpha: 0, y: 8 });
      if (cardNode) gsap.set(cardNode, { autoAlpha: 0, y: 14, scale: 0.985 });
      if (cardRows.length) gsap.set(cardRows, { autoAlpha: 0, x: 12 });
      if (avatarNode) gsap.set(avatarNode, { autoAlpha: 0, scale: 0.9 });
   };

   const playAnimation = () => {
      const rootNode = rootRef.current;
      if (!rootNode) return;

      const legalPoints = Array.from(
         rootNode.querySelectorAll<HTMLElement>(
            `.${styles.home_get_wrap_main_sw_it_header_text} li`
         )
      );
      const cardNode = rootNode.querySelector<HTMLElement>(
         `.${styles.home_get_wrap_main_sw_it_icon_3_item}`
      );
      const cardRows = Array.from(
         rootNode.querySelectorAll<HTMLElement>(
            `.${styles.home_get_wrap_main_sw_it_icon_3_item_content} p`
         )
      );
      const avatarNode = rootNode.querySelector<HTMLElement>(
         `.${styles.home_get_wrap_main_sw_it_icon_3_item_img}`
      );

      if (!cardNode || !legalPoints.length || !cardRows.length) return;

      timelineRef.current?.kill();
      resetToInitial();

      const timeline = gsap.timeline();

      timeline.to(
         legalPoints,
         {
            autoAlpha: 1,
            y: 0,
            duration: 0.4,
            stagger: 0.12,
            ease: "power2.out",
         },
         0
      )
         .to(
            cardNode,
            {
               autoAlpha: 1,
               y: 0,
               scale: 1,
               duration: 0.55,
               ease: "power2.out",
            },
            "-=0.08"
         )
         .to(
            cardRows,
            {
               autoAlpha: 1,
               x: 0,
               duration: 0.34,
               stagger: 0.08,
               ease: "power2.out",
            },
            "-=0.24"
         );

      if (avatarNode) {
         timeline.to(
            avatarNode,
            {
               autoAlpha: 1,
               scale: 1,
               duration: 0.35,
               ease: "back.out(1.7)",
            },
            "<"
         );
      }

      timelineRef.current = timeline;
   };

   useLayoutEffect(() => {
      const rootNode = rootRef.current;
      if (!rootNode) return;

      const prefersReducedMotion = window.matchMedia(
         "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) {
         const legalPoints = Array.from(
            rootNode.querySelectorAll<HTMLElement>(
               `.${styles.home_get_wrap_main_sw_it_header_text} li`
            )
         );
         const cardNode = rootNode.querySelector<HTMLElement>(
            `.${styles.home_get_wrap_main_sw_it_icon_3_item}`
         );
         const cardRows = Array.from(
            rootNode.querySelectorAll<HTMLElement>(
               `.${styles.home_get_wrap_main_sw_it_icon_3_item_content} p`
            )
         );
         const avatarNode = rootNode.querySelector<HTMLElement>(
            `.${styles.home_get_wrap_main_sw_it_icon_3_item_img}`
         );

         if (legalPoints.length) gsap.set(legalPoints, { autoAlpha: 1, y: 0, clearProps: "transform" });
         if (cardNode) gsap.set(cardNode, { autoAlpha: 1, y: 0, scale: 1, clearProps: "transform" });
         if (cardRows.length) gsap.set(cardRows, { autoAlpha: 1, x: 0, clearProps: "transform" });
         if (avatarNode) gsap.set(avatarNode, { autoAlpha: 1, scale: 1, clearProps: "transform" });
         return;
      }

      resetToInitial();

      const trigger = ScrollTrigger.create({
         trigger: rootNode,
         start: "top 88%",
         onEnter: playAnimation,
         onEnterBack: playAnimation,
      });

      const leaveBackTrigger = ScrollTrigger.create({
         trigger: rootNode,
         start: "top bottom",
         onLeaveBack: () => {
            timelineRef.current?.pause(0);
            resetToInitial();
         },
      });

      return () => {
         trigger.kill();
         leaveBackTrigger.kill();
         timelineRef.current?.kill();
      };
   }, []);

   useEffect(() => {
      const isMobile = window.matchMedia("(max-width: 1199px)").matches;
      if (!isMobile || !isActiveMobile) return;
      playAnimation();
   }, [isActiveMobile]);

   return (
      <div ref={rootRef}>
         <div className={styles.home_get_wrap_main_sw_it_header}>
            <h3 className={styles.home_get_wrap_main_sw_it_header_title}>
               Полностью законная модель работы
            </h3>
            <div className={styles.home_get_wrap_main_sw_it_header_text}>
               <ul>
                  <li style={{ opacity: 0, transform: "translateY(8px)" }}>
                     Идентификация не содержит персональных данных (без ФИО)
                  </li>
                  <li style={{ opacity: 0, transform: "translateY(8px)" }}>
                     Мы работаем только с аудиторией, давшей согласие
                  </li>
                  <li style={{ opacity: 0, transform: "translateY(8px)" }}>
                     Ai-UP зарегистрирован как оператор персональных данных
                  </li>
               </ul>
            </div>
         </div>
         <div className={`${styles.home_get_wrap_main_sw_it_icon} ${styles.home_get_wrap_main_sw_it_icon_3}`}>
            <div
               className={styles.home_get_wrap_main_sw_it_icon_3_item}
               style={{ opacity: 0, transform: "translateY(14px) scale(0.985)" }}
            >
               <div
                  className={styles.home_get_wrap_main_sw_it_icon_3_item_img}
                  style={{ opacity: 0, transform: "scale(0.9)" }}
               >
                  <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 50 50" fill="none">
                     <rect width={50} height={50} rx={10} fill="#F6F6F6" />
                     <path d="M35 30.935V33.9737C34.9987 34.5107 34.7876 35.0254 34.4127 35.4051C34.0378 35.7848 33.5297 35.9987 32.9996 36H18.0004C17.4703 35.9987 16.9622 35.7848 16.5873 35.4051C16.2124 35.0254 16.0013 34.5107 16 33.9737V30.935C16.0037 29.5929 16.5318 28.3068 17.4687 27.3577C18.4056 26.4087 19.6753 25.8738 21.0002 25.87H29.9998C31.3247 25.8738 32.5944 26.4087 33.5313 27.3577C34.4682 28.3068 34.9963 29.5929 35 30.935ZM20.3908 19.1737C20.3911 18.1502 20.691 17.1498 21.2526 16.2989C21.8142 15.448 22.6123 14.785 23.5459 14.3935C24.4795 14.002 25.5067 13.8998 26.4977 14.0996C27.4887 14.2995 28.3989 14.7925 29.1133 15.5164C29.8277 16.2402 30.3141 17.1624 30.5111 18.1663C30.7081 19.1701 30.6069 20.2107 30.2201 21.1562C29.8334 22.1018 29.1785 22.91 28.3383 23.4786C27.4982 24.0472 26.5104 24.3507 25.5 24.3507C24.145 24.3507 22.8454 23.8054 21.8873 22.8349C20.9291 21.8643 20.3908 20.5463 20.3908 19.1737Z" fill="#777777" />
                  </svg>
               </div>
               <div className={styles.home_get_wrap_main_sw_it_icon_3_item_content}>
                  <p style={{ opacity: 0, transform: "translateX(12px)" }}>Имя: Анонимно</p>
                  <p style={{ opacity: 0, transform: "translateX(12px)" }}>Возраст: 25–34</p>
                  <p style={{ opacity: 0, transform: "translateX(12px)" }}>Город: Москва</p>
                  <p style={{ opacity: 0, transform: "translateX(12px)" }}>Профессия: Аналитик</p>
                  <p style={{ opacity: 0, transform: "translateX(12px)" }}>Согласие: ✅</p>
               </div>
            </div>
         </div>
      </div>
   );
}

export default AboutDoSliderThird;
