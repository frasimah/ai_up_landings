"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './CallCenterAiFlowSwiper.module.scss'
import Animation_1 from './CallCenterAiFlowSwiperAnimations/Animation_1';
import Animation_2 from './CallCenterAiFlowSwiperAnimations/Animation_2';
import SliderCheck from '@/components/SliderCheck/SliderCheck';

function CallCenterAiFlowSwiper() {

   return (
      <Swiper
         slidesPerView={3}
         spaceBetween={40}
         className={styles.call_center_ai_sw}
         speed={800}
         breakpoints={{
            0: {
               slidesPerView: 'auto',
               spaceBetween: 7,
            },
            1200: {
               slidesPerView: 3,
               spaceBetween: 30,
            },
            1600: {
               slidesPerView: 3,
               spaceBetween: 40,
            }
         }}
      >
         <SwiperSlide className={styles.call_center_ai_wrap_item}>
            <h3 className={styles.call_center_ai_wrap_item_title}>
               Усиливает источники и каналы, по которым КЦ чаще ставит “интересен/готов к разговору”
            </h3>
            <Animation_1 />
         </SwiperSlide>
         <SwiperSlide className={styles.call_center_ai_wrap_item}>
            <h3 className={styles.call_center_ai_wrap_item_title}>
               Снижает лимиты для источников, где в основном “мусор”
            </h3>
            <Animation_2 />
         </SwiperSlide>
         <SwiperSlide className={styles.call_center_ai_wrap_item}>
            <h3 className={styles.call_center_ai_wrap_item_title}>
               Отключает те, откуда идут только недозвоны и отказы
            </h3>
            <div className={`${styles.call_center_ai_wrap_item_img} ${styles.call_center_ai_wrap_item_img_3}`}>
               <SliderCheck isActive={true} />
               Terra Link
               <div className={styles.call_center_ai_wrap_item_img_bg}>
                  <img src="/img/call-center/ai-bg.svg" alt="Декоративный фон блока Ai Flow" />
               </div>
            </div>
         </SwiperSlide>
      </Swiper>
   );
}

export default CallCenterAiFlowSwiper;
