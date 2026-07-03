"use client";

import { useLayoutEffect, useRef } from "react";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import styles from "./CallCenterInside.module.scss";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function CallCenterInside() {
   const dataList = [
      "статус",
      "комментарий оператора",
      "запись разговора",
      "количество попыток",
      "источник (телефон, домен, сайт, ОКВЭД)",
      "канал (Vault Core / Terra Link / Nova Net / Data Ray)",
      "регион",
      "дата обработки",
   ];

   const listRef = useRef<HTMLDivElement | null>(null);

   useLayoutEffect(() => {
      const root = listRef.current;
      if (!root) return;

      const ctx = gsap.context(() => {
         const items = Array.from(
            root.querySelectorAll<HTMLElement>(
               `.${styles.call_center_inside_wrap_left_head_list_it}`
            )
         );

         if (!items.length) return;

         const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
         ).matches;

         if (prefersReducedMotion) {
            gsap.set(items, { autoAlpha: 1, y: 0, clearProps: "transform" });
            return;
         }

         const isTabletOrSmaller = window.matchMedia("(max-width: 1199px)").matches;
         const initialY = isTabletOrSmaller ? 12 : 18;

         const showItems = () => {
            gsap.killTweensOf(items);
            gsap.to(items, {
               autoAlpha: 1,
               y: 0,
               duration: 0.8,
               ease: "power2.out",
               stagger: 0.25,
               overwrite: true,
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

         ScrollTrigger.create({
            trigger: root,
            start: isTabletOrSmaller ? "top 92%" : "top 86%",
            onEnter: showItems,
            onEnterBack: showItems,
         });

         ScrollTrigger.create({
            trigger: root,
            start: "top bottom",
            onLeaveBack: hideItemsInstant,
         });
      }, root);

      return () => ctx.revert();
   }, []);

   return (
      <section className={styles.call_center_inside}>
         <div className="container">
            <div className={styles.call_center_inside_wrap}>
               <SectionHeader
                  className={styles.call_center_inside_wrap_title}
                  title="Как это выглядит внутри Ai-UP"
                  titleSize="h2"
                  as="h2"
                  size="small"
                  alignLeftMobile={true}
               />

               <div className="row">
                  <div className="col-xl-6">
                     <div className={styles.call_center_inside_wrap_left}>
                        <div className={styles.call_center_inside_wrap_left_head}>
                           <div className={styles.call_center_inside_wrap_left_head_title}>
                              В карточке каждого контакта видно:
                           </div>

                           {/* ✅ ref на контейнер списка */}
                           <div
                              ref={listRef}
                              className={styles.call_center_inside_wrap_left_head_list}
                           >
                              {dataList?.map((item, i) => (
                                 <div
                                    className={styles.call_center_inside_wrap_left_head_list_it}
                                    key={item + i}
                                 >
                                    <div
                                       className={
                                          styles.call_center_inside_wrap_left_head_list_it_icon
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

                        <div className={styles.call_center_inside_wrap_left_message}>
                           <p>Всё максимально прозрачно</p>
                        </div>
                     </div>
                  </div>

                  <div className="col-xl-6">
                     <div className={styles.call_center_inside_wrap_img}>
                        <picture>
                           <source
                              srcSet="/img/call-center/inside-img-mobile.jpg"
                              media="(max-width: 767px)"
                           />
                           <img
                              src="/img/call-center/inside-img.jpg"
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

export default CallCenterInside;
