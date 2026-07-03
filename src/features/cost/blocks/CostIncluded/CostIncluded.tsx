"use client";

import { useLayoutEffect, useRef } from "react";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import styles from "./CostIncluded.module.scss";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type props = {
   titleSection?: string
}

function CostIncluded({ titleSection }: props) {
   const dataList = [
      "подтверждён действием вчера — посещение сайта, звонок, активность по ОКВЭД или визит на ваш сайт",
      "содержит номер телефона",
      "имеет источник (тип и канал)",
      "привязан к региону, который вы выбрали",
      "готов к прозвону вручную или через КЦ",
   ];

   const listRef = useRef<HTMLDivElement | null>(null);
   const messageRef = useRef<HTMLParagraphElement | null>(null);

   useLayoutEffect(() => {
      const root = listRef.current;
      const messageNode = messageRef.current;
      if (!root) return;

      const ctx = gsap.context(() => {
         const items = Array.from(
            root.querySelectorAll<HTMLElement>(
               `.${styles.cost_included_wrap_left_head_list_it}`
            )
         );

         if (!items.length) return;

         const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
         ).matches;
         const messageText = messageNode?.textContent?.trim() ?? "";

         if (prefersReducedMotion) {
            gsap.set(items, { autoAlpha: 1, y: 0, clearProps: "transform" });
            if (messageNode) messageNode.textContent = messageText;
            return;
         }

         const isTabletOrSmaller = window.matchMedia("(max-width: 1199px)").matches;
         const initialY = isTabletOrSmaller ? 12 : 18;
         let isTyped = false;

         const typingTimeline = (() => {
            if (!messageNode || !messageText) return null;

            const timeline = gsap.timeline({ paused: true });
            const segments = messageText.match(/[^.]+\.?/g) ?? [messageText];
            let typed = "";

            messageNode.textContent = "";

            segments.forEach((segment) => {
               const state = { chars: 0 };

               timeline.to(state, {
                  chars: segment.length,
                  duration: Math.max(segment.length * 0.05, 0.8),
                  ease: "none",
                  snap: { chars: 1 },
                  onUpdate: () => {
                     if (!messageNode) return;
                     messageNode.textContent = typed + segment.slice(0, state.chars);
                  },
                  onComplete: () => {
                     typed += segment;
                     if (!messageNode) return;
                     messageNode.textContent = typed;
                  },
               });

               if (segment.trimEnd().endsWith(".")) {
                  timeline.to({}, { duration: 0.25 });
               }
            });

            return timeline;
         })();

         const showItems = () => {
            gsap.killTweensOf(items);
            gsap.to(items, {
               autoAlpha: 1,
               y: 0,
               duration: 0.8,
               ease: "power2.out",
               stagger: 0.25,
               overwrite: true,
               onComplete: () => {
                  if (isTyped || !typingTimeline) return;
                  isTyped = true;
                  typingTimeline.play(0);
               },
            });
         };

         const hideItemsInstant = () => {
            gsap.killTweensOf(items);
            gsap.set(items, {
               autoAlpha: 0,
               y: initialY,
               overwrite: true,
            });
         };

         hideItemsInstant();

         // Появление, когда блок входит в экран
         ScrollTrigger.create({
            trigger: root,
            start: isTabletOrSmaller ? "top 92%" : "top 86%",
            onEnter: showItems,
            onEnterBack: showItems,
         });

         // Скрытие только когда блок полностью ушел вниз
         ScrollTrigger.create({
            trigger: root,
            start: "top bottom",
            onLeaveBack: hideItemsInstant,
         });
      }, root);

      return () => ctx.revert();
   }, []);

   return (
      <section className={styles.cost_included}>
         <div className="container">
            <div className={styles.cost_included_wrap}>
               <SectionHeader
                  className={styles.cost_included_wrap_title}
                  title={titleSection ? titleSection : "Как это выглядит внутри Ai-UP"}
                  titleSize="h2"
                  as="h2"
                  size="small"
                  alignLeftMobile={true}
               />

               <div className="row">
                  <div className="col-xl-6">
                     <div className={styles.cost_included_wrap_left}>
                        <div className={styles.cost_included_wrap_left_head}>
                           <div className={styles.cost_included_wrap_left_head_title}>
                              Каждый контакт, который вы получаете:
                           </div>

                           {/* ref на контейнер списка */}
                           <div
                              ref={listRef}
                              className={styles.cost_included_wrap_left_head_list}
                           >
                              {dataList?.map((item, i) => (
                                 <div
                                    className={styles.cost_included_wrap_left_head_list_it}
                                    key={item + i}
                                 >
                                    <div
                                       className={
                                          styles.cost_included_wrap_left_head_list_it_icon
                                       }
                                    >
                                       <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          width={28}
                                          height={28}
                                          viewBox="0 0 28 28"
                                          fill="none"
                                       >
                                          <rect width={28} height={28} rx={14} fill="#0169F9" />
                                          <path
                                             d="M6 14.5555L10.6154 19L21 9"
                                             stroke="white"
                                             strokeWidth={2}
                                             strokeLinecap="round"
                                             strokeLinejoin="round"
                                          />
                                       </svg>
                                    </div>
                                    {item}
                                 </div>
                              ))}
                           </div>
                        </div>

                        <div className={styles.cost_included_wrap_left_message}>
                           <p ref={messageRef}>Никаких подписок. Никакой абонентки. Только факт.</p>
                        </div>
                     </div>
                  </div>

                  <div className="col-xl-6">
                     <div className={styles.cost_included_wrap_img}>
                        <picture>
                           <source
                              srcSet="/img/call-center/inside-img-mobile.jpg"
                              media="(max-width: 767px)"
                           />
                           <img
                              src="/img/call-center/inside-img.jpg"
                              alt="Интерфейс обработки контактов в Ai-UP"
                           />
                        </picture>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

export default CostIncluded;
