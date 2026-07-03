"use client";

import { useEffect, useRef, useState } from 'react';
import SliderCheck from '@/components/SliderCheck/SliderCheck';
import styles from './AiFlowDoMain.module.scss';
import AiFlowDoMainAnimationFirst from './AiFlowDoMainAnimation/AiFlowDoMainAnimationFirst';
import AiFlowDoMainAnimationSecond from './AiFlowDoMainAnimation/AiFlowDoMainAnimationSecond';
import AboutDoSliderSecond from '@/features/about/blocks/AboutDo/AboutDoSlider/AboutDoSliderSecond/AboutDoSliderSecond';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

type AiFlowDoMainProps = {
   variant?: 'default' | 'cost';
};

function AiFlowDoMain({ variant = 'default' }: AiFlowDoMainProps) {
   const isCostVariant = variant === 'cost';
   const sectionRef = useRef<HTMLDivElement | null>(null);
   const [isActive, setIsActive] = useState(false);

   useEffect(() => {
      const sectionNode = sectionRef.current;
      if (!sectionNode) return;

      const observer = new IntersectionObserver(
         ([entry]) => {
            setIsActive(entry.isIntersecting);
         },
         {
            rootMargin: '80px 0px',
            threshold: 0.2,
         }
      );

      observer.observe(sectionNode);

      return () => observer.disconnect();
   }, []);

   return (
      <>
         <div ref={sectionRef}>
         <Swiper
            className={styles.ai_flow_do_wrap_main}
            slidesPerView="auto"
            speed={800}
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
            <SwiperSlide className={`${styles.ai_flow_do_wrap_main_item} ${styles.ai_flow_do_wrap_main_item_1}`}>
               {isCostVariant
                  ? 'Усиливает те, где КЦ фиксирует "интересен" или "квалифицирован"'
                  : 'Увеличивает лимиты источников, которые дают квалификацию'}
               <div className={styles.ai_flow_do_wrap_main_item_img}>
                  <AiFlowDoMainAnimationFirst isActive={isActive} />
                  <div className={styles.ai_flow_do_wrap_main_item_img_bg}>
                     <img src="/img/ai-flow/do-main-bg.svg" alt="Декоративный фон блока Ai Flow" />
                  </div>
               </div>
            </SwiperSlide>
            <SwiperSlide className={`${styles.ai_flow_do_wrap_main_item} ${styles.ai_flow_do_wrap_main_item_2}`}>
               {isCostVariant ? 'Фильтрует мусор до того, как он попадёт к вам' : 'Уменьшает лимиты там, где мусор'}
               <div className={styles.ai_flow_do_wrap_main_item_img}>
                  <AiFlowDoMainAnimationSecond isActive={isActive} />
                  <div className={styles.ai_flow_do_wrap_main_item_img_bg}>
                     <img src="/img/ai-flow/do-main-bg.svg" alt="Декоративный фон блока Ai Flow" />
                  </div>
               </div>
            </SwiperSlide>
            <SwiperSlide className={`${styles.ai_flow_do_wrap_main_item} ${styles.ai_flow_do_wrap_main_item_3}`}>
               Перераспределяет лимиты между 4 каналами
               <div className={styles.ai_flow_do_wrap_main_item_img}>
                  <div className={styles.ai_flow_do_wrap_main_item_img_svg}>
                     <AboutDoSliderSecond />
                  </div>
                  <div className={styles.ai_flow_do_wrap_main_item_img_bg}>
                     <img src="/img/ai-flow/do-main-bg.svg" alt="Декоративный фон блока Ai Flow" />
                  </div>
               </div>
            </SwiperSlide>
            <SwiperSlide className={`${styles.ai_flow_do_wrap_main_item} ${styles.ai_flow_do_wrap_main_item_4}`}>
               Отключает слабые каналы
               <div className={styles.ai_flow_do_wrap_main_item_img}>
                  <div className={styles.ai_flow_do_wrap_main_item_img_sl}>
                     <div className={styles.ai_flow_do_wrap_main_item_img_check}>
                        <SliderCheck isActive={isActive} />
                        Terra Link
                     </div>

                     <div className={`${styles.ai_flow_do_wrap_main_item_img_cursor} ${isActive ? styles.ai_flow_do_wrap_main_item_img_cursor_active : ''}`}>
                        <img src="/icons/cursor.svg" alt="Иконка курсора" />
                     </div>
                  </div>
                  <div className={styles.ai_flow_do_wrap_main_item_img_bg}>
                     <img src="/img/ai-flow/do-main-bg.svg" alt="Декоративный фон блока Ai Flow" />
                  </div>
               </div>
            </SwiperSlide>
            <SwiperSlide className={`${styles.ai_flow_do_wrap_main_item} ${styles.ai_flow_do_wrap_main_item_5}`}>
               {isCostVariant ? (
                  <div className={styles.ai_flow_do_wrap_main_item_small}>
                     Каждый день адаптируется под результаты прозвона
                  </div>
               ) : (
                  <>
                     <div className={styles.ai_flow_do_wrap_main_item_small}>
                        Усиливает сильные
                        <div className={styles.ai_flow_do_wrap_main_item_small_check}>
                           <SliderCheck isActive={false}>
                              <svg width={39} height={38} viewBox="0 0 39 38" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M24.9779 18.7379C24.9405 18.6021 24.8749 18.4758 24.7855 18.3673C24.696 18.2587 24.5846 18.1702 24.4587 18.1077L21.0734 16.4274L21.9821 10.1362C22.012 9.91816 21.9692 9.69634 21.8605 9.50512C21.7517 9.31389 21.583 9.16393 21.3805 9.07848C21.178 8.99302 20.9531 8.97685 20.7405 9.03245C20.5279 9.08806 20.3395 9.21235 20.2046 9.38605L13.2143 18.3878C13.1194 18.5091 13.0538 18.6508 13.0227 18.8018C12.9915 18.9527 12.9956 19.1088 13.0346 19.258C13.0786 19.4071 13.1553 19.5446 13.2589 19.6605C13.3625 19.7764 13.4905 19.8678 13.6337 19.9281L17.8978 21.6384L16.9891 27.8596C16.9582 28.0829 17.0035 28.3101 17.1177 28.5044C17.2319 28.6986 17.4082 28.8485 17.6182 28.9298C17.7352 28.9784 17.861 29.0023 17.9877 28.9998C18.1521 28.999 18.3139 28.9574 18.4585 28.8789C18.6031 28.8004 18.7261 28.6873 18.8165 28.5497L24.8082 19.548C24.8926 19.4329 24.9514 19.3011 24.9807 19.1613C25.0099 19.0216 25.009 18.8772 24.9779 18.7379Z" fill="#34C759" />
                              </svg>
                           </SliderCheck>
                           Data Ray
                        </div>
                     </div>
                     <div className={styles.ai_flow_do_wrap_main_item_small}>
                        Адаптируется к вашей нише ежедневно
                     </div>
                  </>
               )}
            </SwiperSlide>
         </Swiper>
         </div>
      </>
   );
}

export default AiFlowDoMain;
