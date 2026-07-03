"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './AiFlowSeeSwiper.module.scss'
import { Navigation, Pagination } from 'swiper/modules';

type props = {
   perView?: number
}

function AiFlowSeeSwiper({ perView = 4 }: props) {

   const data = [
      'на каких источниках включён Ai Flow',
      'какие работают вручную',
      'на каких источниках включён Ai Flow',
      'какие работают вручную'
   ]
   return (
      <div className={styles.ai_flow_see_wrap_head_left_swiper}>
         <Swiper
            modules={[Navigation, Pagination]}
            className={styles.ai_flow_see_wrap_head_left_swiper_sw}
            slidesPerView={perView}
            spaceBetween={40}
            speed={800}
            navigation={{
               nextEl: '.see-next',
               prevEl: '.see-prev',
            }}
            pagination={{
               el: ".ai_see_pagination",
               clickable: true,
            }}
            breakpoints={{
               0: {
                  slidesPerView: 'auto',
                  spaceBetween: 7
               },
               1200: {
                  slidesPerView: perView,
                  spaceBetween: 30
               },
               1600: {
                  slidesPerView: perView,
                  spaceBetween: 40
               }
            }}
         >
            {data?.map((item, index) => (
               <SwiperSlide className={styles.ai_flow_see_wrap_head_left_swiper_it} key={'see-' + index}>
                  {item}
               </SwiperSlide>
            ))}
         </Swiper>
         <div className={styles.ai_flow_see_wrap_head_left_swiper_btns}>
            <button className={`swiper-button-prev see-prev ${styles.ai_flow_see_wrap_head_left_swiper_btns_prev}`} aria-label='Предыдущий слайд' type='button'>
               <svg width={50} height={50} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M33 25H16M16 25L23.0833 32M16 25L23.0833 18" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
               </svg>
            </button>
            <button className={`swiper-button-next see-next ${styles.ai_flow_see_wrap_head_left_swiper_btns_next}`} aria-label='Следующий слайд' type='button'>
               <svg width={50} height={50} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 25H33M33 25L25.9167 18M33 25L25.9167 32" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
               </svg>
            </button>
         </div>
         <div
            className={`swiper-pagination ai_see_pagination ${styles.ai_see_pagination}`}
         ></div>
      </div>
   );
}

export default AiFlowSeeSwiper;