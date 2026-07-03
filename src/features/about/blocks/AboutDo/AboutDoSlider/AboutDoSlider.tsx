'use client';

import { useLayoutEffect, useRef } from 'react';
import styles from './AboutDoSlider.module.scss';
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from 'swiper';
import { Pagination } from 'swiper/modules';
import AboutDoSliderFirst from './AboutDoSliderFirst/AboutDoSliderFirst';
import AboutDoSliderSecond from './AboutDoSliderSecond/AboutDoSliderSecond';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutDoSliderThird from './AboutDoSliderThird/AboutDoSliderThird';

gsap.registerPlugin(ScrollTrigger);

function AboutDoSlider() {
   const refSwiper = useRef<SwiperType | null>(null);
   const sliderRootRef = useRef<HTMLDivElement | null>(null);
   const underlineBlockRef = useRef<HTMLParagraphElement | null>(null);
   const underlineTimelineRef = useRef<gsap.core.Timeline | null>(null);

   useLayoutEffect(() => {
      const rootNode = sliderRootRef.current;
      const underlineNode = underlineBlockRef.current;
      if (!rootNode || !underlineNode) return;
      let detachSlideListener: (() => void) | null = null;

      const ctx = gsap.context(() => {
         const underlineSpans = Array.from(underlineNode.querySelectorAll<HTMLElement>("span"));

         const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
         ).matches;

         if (prefersReducedMotion) {
            return;
         }

         if (underlineSpans.length) {
            gsap.set(underlineSpans, {
               display: "inline-block",
               backgroundImage: "linear-gradient(currentColor, currentColor)",
               backgroundRepeat: "no-repeat",
               backgroundPosition: "0 100%",
               backgroundSize: "0% 2px",
               paddingBottom: "1px",
               willChange: "background-size",
            });
         }

         const playUnderlineAnimation = () => {
            if (!underlineSpans.length) return;
            underlineTimelineRef.current?.kill();

            const timeline = gsap.timeline();

            underlineSpans.forEach((span, index) => {
               const startAt = index * 0.24;

               timeline.fromTo(
                  span,
                  {
                     backgroundPosition: "0 100%",
                     backgroundSize: "0% 2px",
                  },
                  {
                     backgroundPosition: "0 100%",
                     backgroundSize: "100% 2px",
                     duration: 0.58,
                     ease: "power1.out",
                  },
                  startAt
               );

               timeline.to(
                  span,
                  {
                     backgroundPosition: "0 100%",
                     backgroundSize: "100% 2px",
                     duration: 0.9,
                     ease: "none",
                  },
                  startAt + 0.58
               );

               timeline.set(span, { backgroundPosition: "100% 100%" }, startAt + 1.48);

               timeline.to(
                  span,
                  {
                     backgroundPosition: "100% 100%",
                     backgroundSize: "0% 2px",
                     duration: 0.5,
                     ease: "power1.inOut",
                  },
                  startAt + 1.48
               );
            });

            underlineTimelineRef.current = timeline;
         };

         ScrollTrigger.create({
            trigger: underlineNode,
            start: "top 90%",
            onEnter: playUnderlineAnimation,
            onEnterBack: playUnderlineAnimation,
         });

         const swiper = refSwiper.current;
         if (swiper) {
            const handleSlideChange = () => {
               const isMobile = window.matchMedia("(max-width: 1199px)").matches;
               if (!isMobile) return;
               if (swiper.activeIndex === 4) {
                  playUnderlineAnimation();
               }
            };

            swiper.on("slideChange", handleSlideChange);
            detachSlideListener = () => {
               swiper.off("slideChange", handleSlideChange);
            };
         }
      }, rootNode);

      return () => {
         detachSlideListener?.();
         underlineTimelineRef.current?.kill();
         ctx.revert();
      };
   }, []);

   return (

      <div ref={sliderRootRef}>
         <Swiper
            modules={[Pagination]}
            className={styles.home_get_wrap_main_sw}
            slidesPerView="auto"
            enabled={false}
            speed={800}
            onBeforeInit={(swiper: SwiperType) => {
               refSwiper.current = swiper;
            }}
            pagination={{
               el: '.contact_pagination',
               clickable: true,
            }}
            breakpoints={{
               0: {
                  enabled: true,
                  spaceBetween: 7,
                  slidesPerView: 'auto',
               },
               1200: {
                  enabled: false,
                  spaceBetween: 0,
                  slidesPerView: 'auto',
               },
            }}
         >
            <SwiperSlide className={styles.home_get_wrap_main_sw_it}>
               <div className={styles.home_get_wrap_main_sw_it_header}>
                  <h3 className={styles.home_get_wrap_main_sw_it_header_title}>
                     Работа с реальным спросом, а не с кликами
                  </h3>
                  <div className={styles.home_get_wrap_main_sw_it_header_text}>
                     Мы не прогнозируем интерес - мы фиксируем факт действия вчера
                  </div>
               </div>
               <div className={`${styles.home_get_wrap_main_sw_it_icon} ${styles.home_get_wrap_main_sw_it_icon_1}`}>
                  <AboutDoSliderFirst />
               </div>
            </SwiperSlide>
            <SwiperSlide className={styles.home_get_wrap_main_sw_it}>
               <div className={styles.home_get_wrap_main_sw_it_header}>
                  <h3 className={styles.home_get_wrap_main_sw_it_header_title}>
                     Технология перехвата
                     по 4 каналам
                  </h3>
                  <div className={styles.home_get_wrap_main_sw_it_header_text}>
                     Телефония, домены, пиксель
                     и ОКВЭД - каждый источник даёт уникальную точку входа в спрос
                  </div>
               </div>
               <div className={`${styles.home_get_wrap_main_sw_it_icon} ${styles.home_get_wrap_main_sw_it_icon_2}`}>
                  <div className={styles.home_get_wrap_main_sw_it_icon_2_bg}>
                     <img src="/img/ai-flow/do-bg.svg" alt="Декоративный фон блока Ai Flow" />
                  </div>
                  <div className={styles.home_get_wrap_main_sw_it_icon_2_svg}>
                     <AboutDoSliderSecond />
                  </div>
               </div>
            </SwiperSlide>
            <SwiperSlide className={styles.home_get_wrap_main_sw_it}>
               <AboutDoSliderThird />
            </SwiperSlide>
            <SwiperSlide className={styles.home_get_wrap_main_sw_it}>
               <div className={styles.home_get_wrap_main_sw_it_header}>
                  <h3 className={styles.home_get_wrap_main_sw_it_header_title}>
                     Собственный колл-центр, обученный внутри Академии
                  </h3>
                  <div className={styles.home_get_wrap_main_sw_it_header_text}>
                     <ul>
                        <li>
                           Строгий отбор 4–7% кандидатов, экзамены, ежедневный контроль качества
                        </li>
                        <li>
                           Уровень квалификации лидов выше в среднем на 7–10%
                        </li>
                     </ul>
                  </div>
               </div>
               <div className={`${styles.home_get_wrap_main_sw_it_icon} ${styles.home_get_wrap_main_sw_it_icon_4}`}>
                  <div className={styles.home_get_wrap_main_sw_it_icon_4_item}>
                     <div className={styles.home_get_wrap_main_sw_it_icon_4_item_head}>
                        <div className={styles.home_get_wrap_main_sw_it_icon_4_item_head_img}>
                           <img src="/img/about/do-people.png" alt="Оператор колл-центра Ai-UP" />
                        </div>
                        <div className={styles.home_get_wrap_main_sw_it_icon_4_item_head_content}>
                           <div className={styles.home_get_wrap_main_sw_it_icon_4_item_head_content_title}>
                              Оператор
                           </div>

                           <div className={styles.home_get_wrap_main_sw_it_icon_4_item_head_content_serf}>
                              <div className={styles.home_get_wrap_main_sw_it_icon_4_item_head_content_serf_icon}>
                                 <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 20 20" fill="none">
                                    <rect width={20} height={20} rx={10} fill="white" />
                                    <path d="M15.9673 13.4413C15.9366 13.5337 15.8852 13.6172 15.8175 13.6852C15.7497 13.7532 15.6673 13.8037 15.5772 13.8326L13.9506 14.3294L12.9363 15.7392C12.881 15.8174 12.8088 15.8812 12.7254 15.9255C12.642 15.9697 12.5498 15.9931 12.4561 15.9938C12.3603 15.9926 12.2662 15.9678 12.1817 15.9213C12.0971 15.8749 12.0245 15.8082 11.9699 15.7267L10.2413 13.1742C10.1792 13.0854 10.141 12.9812 10.1304 12.8721C10.1199 12.763 10.1374 12.653 10.1813 12.5532C10.2201 12.457 10.2816 12.3724 10.3603 12.3073C10.439 12.2422 10.5322 12.1986 10.6315 12.1806C11.159 12.0854 11.659 11.8684 12.0943 11.5459C12.5297 11.2233 12.8893 10.8035 13.1463 10.3174C13.1958 10.2259 13.2669 10.1489 13.353 10.0935C13.4391 10.0381 13.5373 10.0062 13.6385 10.0007C13.7403 9.99569 13.8416 10.0176 13.933 10.0643C14.0243 10.111 14.1027 10.181 14.1607 10.2678L15.8953 12.8886C15.9481 12.9685 15.9821 13.0601 15.9946 13.1561C16.0071 13.2521 15.9978 13.3497 15.9673 13.4413ZM9.36502 12.1992C8.83753 12.104 8.33753 11.8871 7.90216 11.5645C7.46679 11.242 7.10722 10.8221 6.85016 10.3361C6.8002 10.2448 6.7287 10.168 6.64232 10.1131C6.55595 10.0581 6.45752 10.0266 6.35623 10.0217C6.25494 10.0167 6.15408 10.0384 6.06308 10.0847C5.97207 10.131 5.89388 10.2004 5.83581 10.2864L4.10722 12.8886C4.05297 12.9694 4.01806 13.0624 4.00537 13.1599C3.99268 13.2575 4.00256 13.3567 4.03422 13.4495C4.06587 13.5423 4.11838 13.626 4.18743 13.6937C4.25647 13.7613 4.34007 13.8111 4.43133 13.8388L6.05189 14.3356L7.06623 15.7454C7.12151 15.8236 7.19373 15.8874 7.27711 15.9317C7.36048 15.9759 7.45271 15.9993 7.5464 16C7.64215 15.9988 7.73624 15.974 7.82081 15.9275C7.90539 15.8811 7.97799 15.8144 8.03257 15.733L9.76116 13.1805C9.82325 13.0916 9.8615 12.9874 9.87205 12.8783C9.88259 12.7692 9.86504 12.6592 9.82118 12.5594C9.78288 12.4705 9.72489 12.3921 9.65191 12.3306C9.57893 12.2691 9.49299 12.2262 9.40104 12.2054L9.36502 12.1992Z" fill="#0169F9" />
                                    <path d="M10.0059 4.5C12.5699 4.5 14.6493 6.57853 14.6494 9.14258C14.6494 11.7068 12.57 13.7861 10.0059 13.7861C7.44181 13.786 5.36328 11.7067 5.36328 9.14258C5.36343 6.57862 7.4419 4.50015 10.0059 4.5Z" fill="#0169F9" stroke="white" />
                                    <path d="M9.54814 10.8573C9.44792 10.8562 9.34907 10.8347 9.25801 10.7943C9.16694 10.7539 9.0857 10.6954 9.01956 10.6226L8.06242 9.58726C7.99563 9.52006 7.9436 9.44049 7.90949 9.35334C7.87537 9.26619 7.85987 9.17327 7.86391 9.08018C7.86795 8.98708 7.89146 8.89574 7.93301 8.81166C7.97456 8.72758 8.0333 8.65251 8.10569 8.59095C8.17808 8.5294 8.26261 8.48264 8.3542 8.4535C8.44578 8.42437 8.54253 8.41345 8.6386 8.42141C8.73467 8.42937 8.82807 8.45605 8.91319 8.49983C8.9983 8.54361 9.07337 8.60359 9.13385 8.67615L9.54814 9.1248L10.9196 7.6408C11.0471 7.51254 11.2209 7.43678 11.4048 7.42932C11.5886 7.42186 11.7684 7.48328 11.9066 7.60078C12.0448 7.71827 12.1307 7.88277 12.1464 8.05997C12.1621 8.23717 12.1064 8.4134 11.991 8.55191L10.0838 10.6226C10.0169 10.6962 9.93452 10.7552 9.84215 10.7957C9.74978 10.8362 9.64955 10.8572 9.54814 10.8573Z" fill="white" />
                                 </svg>
                              </div>
                              Квалифицирован
                           </div>
                        </div>
                     </div>
                     <div className={styles.home_get_wrap_main_sw_it_icon_4_item_list}>
                        <div className={styles.home_get_wrap_main_sw_it_icon_4_item_list_it}>
                           строгий отбор
                        </div>
                        <div className={styles.home_get_wrap_main_sw_it_icon_4_item_list_it}>
                           экзамены
                        </div>
                        <div className={styles.home_get_wrap_main_sw_it_icon_4_item_list_it}>
                           уровень квалификации
                        </div>
                     </div>
                  </div>
               </div>
            </SwiperSlide>
            <SwiperSlide className={styles.home_get_wrap_main_sw_it}>
               <div className={styles.home_get_wrap_main_sw_it_header}>
                  <h3 className={styles.home_get_wrap_main_sw_it_header_title}>
                     Ai Flow — автоматическая оптимизация в два уровня
                  </h3>
                  <div className={styles.home_get_wrap_main_sw_it_header_text}>
                     <p>
                        Ai Flow каждый день анализирует прозвон и перераспределяет лимиты между:
                     </p>
                     <ul>
                        <li>
                           источниками,
                        </li>
                        <li>
                           каналами внутри источника.
                        </li>
                     </ul>
                     <p ref={underlineBlockRef} className={styles.home_get_wrap_main_sw_it_header_text_last}>
                        Результат — снижение стоимости лида <span>
                           <svg xmlns="http://www.w3.org/2000/svg" width={14} height={16} viewBox="0 0 14 16" fill="none">
                              <path d="M7 1V15M7 15L1 9.16667M7 15L13 9.16667" stroke="#0169F9" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                           </svg> на 15–35%

                        </span>
                     </p>
                  </div>
               </div>
            </SwiperSlide>
            <div className={`swiper-pagination contact_pagination ${styles.home_get_wrap_main_sw_pagination}`}></div>
         </Swiper>
      </div>
   );
}

export default AboutDoSlider;
