"use client";

import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './HomeEffective.module.scss';
import HomeEffectiveAnimationFirst from './HomeEffectiveAnimationFirst/HomeEffectiveAnimationFirst';
import { useEffect, useRef, useState } from 'react';
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function HomeEffective() {
   const sectionRef = useRef<HTMLElement | null>(null);
   const iconRef = useRef<HTMLDivElement>(null);
   const peoplesRef = useRef<HTMLDivElement>(null);
   const countRef = useRef<HTMLDivElement>(null);
   const photoRefs = useRef<Array<HTMLDivElement | null>>([]);
   const swapTimelineRef = useRef<gsap.core.Timeline | null>(null);
   const floatTweensRef = useRef<gsap.core.Tween[]>([]);

   const [isAnimation, setSsAnimation] = useState(false);
   const [isViewportActive, setIsViewportActive] = useState(false);
   const [peoplePhotos, setPeoplePhotos] = useState<string[]>([
      "/img/home/effective-people-1.jpg",
      "/img/home/effective-people-2.jpg",
      "/img/home/effective-people-3.jpg",
   ]);
   const [peopleCount, setPeopleCount] = useState(54);

   useEffect(() => {
      const node = sectionRef.current;
      if (!node) return;

      const observer = new IntersectionObserver(
         ([entry]) => {
            setIsViewportActive(entry.isIntersecting);
         },
         {
            rootMargin: "80px 0px",
            threshold: 0.2,
         }
      );

      observer.observe(node);

      return () => observer.disconnect();
   }, []);

   useEffect(() => {
      if (!iconRef.current) return;
      if (!peoplesRef.current) return;

      const scrollTrigger = ScrollTrigger.create({
         trigger: iconRef.current,
         start: "top 80%",
         end: "bottom top",
         onEnter: () => {
            setSsAnimation(true);
         },
      });

      if (!isAnimation) return;

      const elements = [iconRef.current, peoplesRef.current].filter(Boolean);

      const startFloat = () => {
         floatTweensRef.current.forEach((t) => t.kill());
         floatTweensRef.current = [];

         const floatY = window.innerWidth < 1200 ? "-=5" : "-=10";

         elements.forEach((el, index) => {
            const tween = gsap.to(el, {
               y: floatY,
               rotation: index % 2 === 0 ? -5 : 2,
               duration: 2 + Math.random(),
               repeat: -1,
               yoyo: true,
               ease: "sine.inOut",
               delay: Math.random(),
            });

            if (!isViewportActive) {
               tween.pause();
            }

            floatTweensRef.current.push(tween);
         });
      };

      // стартуем
      gsap.fromTo(
         elements,
         { opacity: 0, scale: 0.5, y: 20 },
         {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "back.out(1.7)",
         }
      );

      startFloat();

      // ✅ пересоздаём при resize
      window.addEventListener("resize", startFloat);

      return () => {
         scrollTrigger.kill();
         window.removeEventListener("resize", startFloat);
         floatTweensRef.current.forEach((t) => t.kill());
         floatTweensRef.current = [];
      };
   }, [isAnimation, isViewportActive]);

   useEffect(() => {
      floatTweensRef.current.forEach((tween) => {
         if (isViewportActive) {
            tween.resume();
            return;
         }

         tween.pause();
      });

      if (!isViewportActive) {
         swapTimelineRef.current?.pause();
         return;
      }

      swapTimelineRef.current?.resume();
   }, [isViewportActive]);

   useEffect(() => {
      if (!isAnimation || !isViewportActive) return;

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
   }, [isAnimation, isViewportActive]);


   return (
      <section ref={sectionRef} className={styles.home_effective}>
         <div className="container">
            <div className={styles.home_effective_wrap}>
               <SectionHeader
                  title='73% дозвон и&nbsp;5&ndash;20% конверсия&nbsp;&mdash; вот что даёт работа с&nbsp;вчерашним спросом'
                  size='small'
               />
               <div className={styles.home_effective_content}>
                  <HomeEffectiveAnimationFirst isActive={isViewportActive} />
                  <div className={styles.home_effective_content_item}>
                     <div className={styles.home_effective_content_item_second}>
                        <div className={styles.home_effective_content_item_second_head}>
                           <span>До</span>
                           <div className={styles.home_effective_content_item_second_head_list}>
                              <div className={styles.home_effective_content_item_second_head_list_item}>
                                 <div className={styles.home_effective_content_item_second_head_list_item_num}>80%</div>
                                 <div className={styles.home_effective_content_item_second_head_list_item_text}>дозвона</div>
                              </div>
                              <div className={styles.home_effective_content_item_second_head_list_item}>
                                 <div className={styles.home_effective_content_item_second_head_list_item_num}>25%</div>
                                 <div className={styles.home_effective_content_item_second_head_list_item_text}>квалификации</div>
                              </div>
                           </div>
                        </div>
                        <div className={styles.home_effective_content_item_title}>
                           — в 3–5 раз выше, чем у рекламы
                        </div>
                        <div className={styles.home_effective_content_item_second_icon}
                           ref={iconRef}
                        >
                           <svg xmlns="http://www.w3.org/2000/svg" width={280} height={350} viewBox="0 0 280 350" fill="none">
                              <path opacity="0.04" d="M30 255.008V30M30 30H255M30 30L330 330" stroke="white" strokeWidth={60} strokeLinecap="round" strokeLinejoin="round" />
                           </svg>
                        </div>
                     </div>
                  </div>
                  <div className={styles.home_effective_content_item}>
                     <div className={styles.home_effective_content_item_title}>
                        Аудитория уже прогрета: визиты, звонки, изучение услуг
                     </div>
                     <div className={styles.home_effective_content_item_peoples}
                        ref={peoplesRef}
                     >
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
                     <div className={styles.home_effective_content_item_bg}>
                        <img src="/img/home/effective-dots.svg" alt="Декоративный фон блока эффективности" />
                     </div>
                  </div>
                  <div className={styles.home_effective_content_item}>
                     Нет аукционов и конкуренции ставок
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

export default HomeEffective;
