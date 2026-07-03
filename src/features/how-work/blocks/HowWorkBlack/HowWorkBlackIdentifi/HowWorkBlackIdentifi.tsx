"use client";

import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './HowWorkBlackIdentifi.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react';
import { useLayoutEffect, useRef } from "react";
import { Navigation, Pagination } from "swiper/modules";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


function HowWorkBlackIdentifi() {

   const dataSw = [
      "номер",
      "источник (телефон, домен, сайт, ОКВЭД)",
      "канал (Vault Core / Terra Link / Nova Net / Data Ray)",
      "регион",
   ];

   const sliderRef = useRef<HTMLDivElement | null>(null);

   useLayoutEffect(() => {
      const root = sliderRef.current;
      if (!root) return;

      const ctx = gsap.context(() => {
         const slides = Array.from(
            root.querySelectorAll<HTMLElement>(".swiper-slide")
         );
         if (!slides.length) return;

         const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
         ).matches;

         if (prefersReducedMotion) {
            gsap.set(slides, { autoAlpha: 1, y: 0, clearProps: "transform" });
            return;
         }

         // старт: скрыты
         gsap.set(slides, { autoAlpha: 0, y: 25 });

         const show = (targets: gsap.TweenTarget) =>
            gsap.to(targets, {
               autoAlpha: 1,
               y: 0,
               duration: 0.8,
               ease: "power2.out",
               stagger: 0.12,
               overwrite: true,
            });

         const hide = (targets: gsap.TweenTarget) =>
            gsap.to(targets, {
               autoAlpha: 0,
               y: 25,
               duration: 0.45,
               ease: "power2.inOut",
               stagger: 0.08,
               overwrite: true,
            });

         ScrollTrigger.batch(slides, {
            start: "top 85%",
            onEnter: (batch) => show(batch),
            onEnterBack: (batch) => show(batch),
            onLeaveBack: (batch) => hide(batch),
         });
      }, root);

      return () => ctx.revert();
   }, []);

   return (
      <section className={styles.how_work_identify}>
         <div className="how_work_identify_wrap">
            <SectionHeader
               title='Что видно в идентификациях'
               titleSize='h2'
               as='h2'
               headingVariant='white'
               size='small'
               alignLeftMobile={true}
               description='По каждому контакту видно:'
               descriptionVariant='white'
            />
            <div ref={sliderRef} className={styles.call_center_cost_slider}>
               <Swiper
                  className={styles.call_center_cost_sw}
                  modules={[Pagination, Navigation]}
                  speed={800}
                  slidesPerView={"auto"}
                  spaceBetween={30}
                  pagination={{
                     el: ".cost_pagination",
                     clickable: true,
                  }}
                  navigation={{
                     prevEl: ".custom-cost-prev",
                     nextEl: ".custom-cost-next",
                  }}
                  breakpoints={{
                     0: {
                        slidesPerView: "auto",
                        spaceBetween: 7,
                     },
                     1200: {
                        slidesPerView: "auto",
                        spaceBetween: 30,
                     },
                     1400: {
                        slidesPerView: 4,
                        spaceBetween: 30,
                     },
                  }}
               >
                  {dataSw?.map((item, index) => (
                     <SwiperSlide
                        className={styles.call_center_cost_sw_it}
                        key={item + index}
                     >
                        {item}
                     </SwiperSlide>
                  ))}
               </Swiper>

               {/* Кнопки */}
               <div className={styles.call_center_cost_slider_controls}>
                  <button
                     type="button"
                     aria-label="Предыдущий слайд"
                     className={`swiper-button-prev custom-cost-prev ${styles.call_center_cost_slider_controls_prev}`}
                  >
                     <svg
                        width={50}
                        height={50}
                        viewBox="0 0 50 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           d="M33 25H16M16 25L23.0833 32M16 25L23.0833 18"
                           stroke="white"
                           strokeWidth={2}
                           strokeLinecap="round"
                           strokeLinejoin="round"
                        />
                     </svg>
                  </button>

                  <button
                     type="button"
                     aria-label="Следующий слайд"
                     className={`swiper-button-next custom-cost-next ${styles.call_center_cost_slider_controls_next}`}
                  >
                     <svg
                        width={50}
                        height={50}
                        viewBox="0 0 50 50"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           d="M16 25H33M33 25L25.9167 18M33 25L25.9167 32"
                           stroke="white"
                           strokeWidth={2}
                           strokeLinecap="round"
                           strokeLinejoin="round"
                        />
                     </svg>
                  </button>
               </div>

               {/* Пагинация */}
               <div
                  className={`swiper-pagination cost_pagination ${styles.call_center_cost_slider_pagination}`}
               ></div>

               <div className={styles.call_center_cost_slider_text}>
                  <p>
                     Можно фильтровать, скачивать, передавать в КЦ или CRM
                  </p>
               </div>
            </div>
         </div>
      </section>
   );
}

export default HowWorkBlackIdentifi;
