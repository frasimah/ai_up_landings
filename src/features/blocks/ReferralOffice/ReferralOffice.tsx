"use client";

import { useLayoutEffect, useRef } from "react";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import styles from "./ReferralOffice.module.scss";
import SmallListItem from "@/components/SmallListItem/SmallListItem";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function ReferralOffice() {
   const dataList = [
      "вашу реферальную ссылку",
      "количество рефералов",
      "суммарный заработок",
      "историю операций",
      "сколько начислено, когда и за что",
      "бонусный баланс",
      "прибыль по каждому рефералу: «Обменять», «Вывести»",
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
               `.${styles.referral_office_wrap_left_head_list_it}`
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
      <section className={styles.referral_office}>
         <div className="container">
            <div className={styles.referral_office_wrap}>
               <SectionHeader
                  className={styles.referral_office_wrap_header}
                  title="Как выглядит кабинет партнёра"
                  titleSize="h2"
                  as="h2"
                  size="small"
                  alignLeftMobile={true}
               />
               <div className="row">
                  <div className="col-xl-6">
                     <div className={styles.referral_office_wrap_left}>
                        <div className={styles.referral_office_wrap_left_head}>
                           <div className={styles.referral_office_wrap_left_head_title}>Вы видите:</div>
                           {dataList?.length > 0 && (
                              <div
                                 ref={listRef}
                                 className={styles.referral_office_wrap_left_head_list}
                              >
                                 {dataList?.map((text, index) => (
                                    <SmallListItem
                                       className={styles.referral_office_wrap_left_head_list_it}
                                       text={text}
                                       key={text + index}
                                    />
                                 ))}
                              </div>
                           )}
                        </div>
                        <div className={styles.referral_office_wrap_left_message}>
                           <p ref={messageRef}>Удобно. Просто. Прозрачно.</p>
                        </div>
                     </div>
                  </div>
                  <div className="col-xl-6">
                     <div className={styles.referral_office_wrap}>
                        <img src="/img/referral-page/office.jpg" alt="Кабинет партнёра Ai-UP" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

export default ReferralOffice;
