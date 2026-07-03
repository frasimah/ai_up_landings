"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './HomeSecuritySlider.module.scss'
import { Navigation, Pagination } from 'swiper/modules';
import gsap from "gsap";
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useRef } from 'react';
import type { Swiper as SwiperType } from "swiper";

gsap.registerPlugin(ScrollTrigger);


type HomeSecuritySliderProps = {
   data: string[]; // массив строк, которые будут слайдами
}

function HomeSecuritySlider({ data }: HomeSecuritySliderProps) {
   const wrapRef = useRef<HTMLElement | null>(null);


   useEffect(() => {
      if (!wrapRef.current) return;

      const items = Array.from(wrapRef.current.children) as HTMLElement[];
      if (!items.length) return;

      // важно: очистка на размонтировании (Next/React strict mode)
      const ctx = gsap.context(() => {
         gsap.from(items, {
            opacity: 0,
            y: 40,
            duration: 1,
            ease: "power2.out",
            stagger: 0.12,
            scrollTrigger: {
               trigger: wrapRef.current,
               start: "top 90%",
               toggleActions: "play none none reverse",
            },
         });
      }, wrapRef);

      return () => ctx.revert();
   }, []);
   return (
      <Swiper
         modules={[Navigation, Pagination]}
         className={styles.home_security_swiper}
         speed={800}
         slidesPerView={'auto'}
         spaceBetween={30}
         navigation={{
            nextEl: '.custom-security-next',
            prevEl: '.custom-security-prev',
         }}
         pagination={{
            el: ".custom-security-pagination",
            clickable: true
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
         onSwiper={(swiper: SwiperType) => {
            wrapRef.current = swiper.wrapperEl; // <-- swiper-wrapper
         }}
      >
         {data?.map((text, index) => (
            <SwiperSlide
               className={styles.home_security_swiper_it}
               key={text + index}
            >
               <p dangerouslySetInnerHTML={{ __html: text }} />
            </SwiperSlide>
         ))}
         <div className={styles.home_security_swiper_controls}>
            <button
               type='button'
               aria-label='Предыдущий слайд'
               title='Следующий слайд'
               className={`swiper-button-prev custom-security-prev ${styles.home_security_swiper_controls_prev}`}>
               <svg width={50} height={50} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M33 25H16M16 25L23.0833 32M16 25L23.0833 18" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
               </svg>
            </button>
            <button
               type='button'
               aria-label='Предыдущий слайд'
               title='Следующий слайд'
               className={`swiper-button-next custom-security-next ${styles.home_security_swiper_controls_next}`}>
               <svg width={50} height={50} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 25H33M33 25L25.9167 18M33 25L25.9167 32" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
               </svg>
            </button>
         </div>
         <div className={`swiper-pagination custom-security-pagination ${styles.home_security_swiper_pagination}`}></div>
      </Swiper>
   );
}

export default HomeSecuritySlider;