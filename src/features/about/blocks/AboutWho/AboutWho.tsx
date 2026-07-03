"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import SectionHeader from "@/components/SectionHeader/SectionHeader";
import styles from "./AboutWho.module.scss";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BubbleBig from "@/components/Bubbles/BubbleBig/BubbleBig";
import {
   createBubbleFloatTweens,
   playBubblesFromCenter,
   setBubblesReducedMotion,
} from "@/lib/bubbleAnimation";

gsap.registerPlugin(ScrollTrigger);

function AboutWho() {
   const dataList = [
      "разработала технологию идентификации пользовательского действия",
      "создала модуль Ai Flow для автооптимизации источников",
      "построила собственный операторский КЦ с Академией\u00A0операторов",
      "запустила партнёрскую программу, где уже заработано 7\u00A0400\u00A0000\u00A0₽"
   ];

   const listRef = useRef<HTMLDivElement | null>(null);
   const peopleRef = useRef<HTMLDivElement>(null);
   const bubbleRef = useRef<HTMLDivElement>(null);
   const countRef = useRef<HTMLDivElement>(null);
   const photoRefs = useRef<Array<HTMLDivElement | null>>([]);
   const swapTimelineRef = useRef<gsap.core.Timeline | null>(null);
   const [isAnimation, setSsAnimation] = useState(false)
   const [peoplePhotos, setPeoplePhotos] = useState<string[]>([
      "/img/home/effective-people-1.jpg",
      "/img/home/effective-people-2.jpg",
      "/img/home/effective-people-3.jpg",
   ]);
   const [peopleCount, setPeopleCount] = useState(54);

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

   useEffect(() => {
      const bubbleNode = bubbleRef.current;
      if (!bubbleNode) return;

      const scrollTrigger = ScrollTrigger.create({
         trigger: bubbleNode,
         start: "top 80%",
         once: true,
         onEnter: () => {
            setSsAnimation(true);
         },
      });

      return () => {
         scrollTrigger.kill();
      };
   }, []);

   useEffect(() => {
      const bubbleNode = bubbleRef.current;
      const peopleNode = peopleRef.current;

      if (!isAnimation || !bubbleNode || !peopleNode) return;

      const containerNode = bubbleNode.parentElement;
      if (!containerNode) return;

      const elements = [bubbleNode, peopleNode];
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      let floatTweens: gsap.core.Tween[] = [];
      let entryTween: gsap.core.Tween | null = null;
      let resizeFrameId: number | null = null;

      const startFloat = () => {
         floatTweens.forEach((t) => t.kill());
         floatTweens = createBubbleFloatTweens(elements, {
            distance: 6,
            baseDuration: 3.8,
            rotation: 1,
         });
      };

      const handleResize = () => {
         if (resizeFrameId) {
            window.cancelAnimationFrame(resizeFrameId);
         }

         resizeFrameId = window.requestAnimationFrame(() => {
            resizeFrameId = null;
            startFloat();
         });
      };

      gsap.killTweensOf(elements);

      if (prefersReducedMotion) {
         setBubblesReducedMotion(elements);

         return () => {
            if (resizeFrameId) {
               window.cancelAnimationFrame(resizeFrameId);
            }
         };
      }

      entryTween = playBubblesFromCenter({
         container: containerNode,
         elements,
         onComplete: startFloat,
      });

      window.addEventListener("resize", handleResize);

      return () => {
         if (resizeFrameId) {
            window.cancelAnimationFrame(resizeFrameId);
         }
         window.removeEventListener("resize", handleResize);
         entryTween?.kill();
         gsap.killTweensOf(elements);
         floatTweens.forEach((t) => t.kill());
      };
   }, [isAnimation]);

   useEffect(() => {
      if (!isAnimation) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const intervalMs = prefersReducedMotion ? 3000 : 2300;

      const runSwap = () => {
         const firstPhoto = photoRefs.current[0];
         const lastPhoto = photoRefs.current[2];
         const countNode = countRef.current;

         if (!firstPhoto || !lastPhoto) return;

         if (prefersReducedMotion) {
            setPeoplePhotos((prev) => [prev[2], prev[0], prev[1]]);
            setPeopleCount((prev) => (prev >= 199 ? 54 : prev + 1));
            return;
         }

         swapTimelineRef.current?.kill();

         const timeline = gsap.timeline();
         swapTimelineRef.current = timeline;

         timeline.to(firstPhoto, {
            x: 0,
            scale: 1,
            duration: 0.24,
            ease: "power2.out",
         }, 0);

         timeline.to(lastPhoto, {
            autoAlpha: 0,
            scale: 0.5,
            x: 50,
            duration: 0.34,
            ease: "power2.in",
         }, 0);

         timeline.add(() => {
            setPeoplePhotos((prev) => [prev[2], prev[0], prev[1]]);
            setPeopleCount((prev) => (prev >= 199 ? 54 : prev + 1));
         });

         timeline.add(() => {
            requestAnimationFrame(() => {
               const updatedFirstPhoto = photoRefs.current[0];
               const updatedLastPhoto = photoRefs.current[2];
               const updatedPhotos = photoRefs.current.filter(Boolean) as HTMLDivElement[];
               if (!updatedFirstPhoto || !updatedLastPhoto) return;

               gsap.set(updatedFirstPhoto, {
                  autoAlpha: 0,
                  scale: 1.1,
                  x: 50,
               });
               gsap.set(updatedLastPhoto, { autoAlpha: 1, scale: 1, x: 0 });

               const revealTimeline = gsap.timeline();
               revealTimeline.to(updatedFirstPhoto, {
                  autoAlpha: 1,
                  scale: 1,
                  x: 0,
                  duration: 0.5,
                  ease: "power3.out",
               }, 0);

               revealTimeline.fromTo(
                  updatedPhotos,
                  { x: 0 },
                  {
                     x: 0,
                     duration: 0.46,
                     stagger: 0.08,
                     ease: "power3.out",
                  },
                  0
               );

               if (countNode) {
                  gsap.fromTo(
                     countNode,
                     { scale: 0.9, y: 2 },
                     {
                        scale: 1,
                        y: 0,
                        duration: 0.34,
                        ease: "power2.out",
                     }
                  );
               }
            });
         });
      };

      const intervalId = window.setInterval(runSwap, intervalMs);

      return () => {
         window.clearInterval(intervalId);
         swapTimelineRef.current?.kill();
      };
   }, [isAnimation]);

   return (
      <section className={styles.call_center_inside}>
         <div className="container">
            <div className={styles.call_center_inside_wrap}>
               <SectionHeader
                  className={styles.call_center_inside_wrap_title}
                  title="Кто мы"
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
                              Мы — команда инженеров, аналитиков, разработчиков и специалистов по коммуникации, которая:
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
                           <p>Ai-UP — это не «ещё один сервис лидов», а новая логика привлечения клиентов, работающая на фактах, а не на гипотезах</p>
                        </div>
                     </div>
                  </div>

                  <div className="col-xl-6">
                     <div className={styles.call_center_inside_wrap_img}>
                        <picture>
                           <img
                              src="/img/about/who-are-we.png"
                              alt="Команда Ai-UP"
                           />
                        </picture>
                        <div className={styles.home_effective_content_item_peoples} ref={peopleRef}>
                           <div className={styles.home_effective_content_item_peoples_item}>
                              <img src="/icons/flame.svg" alt="Иконка интереса к продукту" />
                           </div>
                           {peoplePhotos.map((photo, index) => (
                              <div
                                 className={styles.home_effective_content_item_peoples_item}
                                 key={index}
                                 ref={(el) => {
                                    photoRefs.current[index] = el;
                                 }}
                              >
                                 <img src={photo} alt="Контакт заинтересованного клиента Ai-UP" />
                              </div>
                           ))}
                           <div ref={countRef} className={styles.home_effective_content_item_peoples_last}>
                              + {peopleCount}
                           </div>
                        </div>
                        <BubbleBig
                           className={styles.call_center_inside_wrap_img_buble}
                           cost="12.800 ₽"
                           percent="15%"
                           ref={bubbleRef}
                        />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

export default AboutWho;
