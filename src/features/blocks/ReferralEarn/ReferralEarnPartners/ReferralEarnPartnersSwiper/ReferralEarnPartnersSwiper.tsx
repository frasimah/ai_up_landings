"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './ReferralEarnPartnersSwiper.module.scss'
import { Navigation, Pagination } from 'swiper/modules';

function ReferralEarnPartnersSwiper() {

   const data = [
      {
         title: 'Пожизненные начисления',
         text: 'Реферал закрепляется за вами навсегда'
      },
      {
         title: '15–20% без ограничения по сумме',
         text: 'Ваш доход растёт вместе с активностью ваших пользователей'
      },
      {
         title: 'Рост прибыли вместе с сервисом',
         text: 'Чем больше функций мы добавляем (Идентификации → КЦ → Ai Flow → новые модули), тем больше мест, куда реферал может тратить деньги, и тем больше вы зарабатываете автоматически'
      },
      {
         title: 'Прозрачная статистика в кабинете',
         text: 'Все операции, начисления и история — в одном месте'
      }
   ]
   return (
      <div className={styles.ai_flow_see_wrap_head_left_swiper}>
         <Swiper
            modules={[Navigation, Pagination]}
            className={styles.ai_flow_see_wrap_head_left_swiper_sw}
            slidesPerView={4}
            spaceBetween={30}
            speed={800}
            navigation={{
               nextEl: '.see-next',
               prevEl: '.see-prev',
            }}
            pagination={{
               el: ".cost_pagination",
               clickable: true,
            }}
            breakpoints={{
               0: {
                  slidesPerView: 'auto',
                  spaceBetween: 7,
               },
               1200: {
                  slidesPerView: 4,
                  spaceBetween: 30,
               }
            }}
         >
            {data?.map((item, index) => (
               <SwiperSlide className={styles.ai_flow_see_wrap_head_left_swiper_it} key={'see-' + index}>
                  <h3 className={styles.ai_flow_see_wrap_head_left_swiper_it_title}>
                     {item.title}
                  </h3>
                  <div className={styles.ai_flow_see_wrap_head_left_swiper_it_text}>
                     {item.text}
                  </div>
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
            className={`swiper-pagination cost_pagination ${styles.call_center_cost_slider_pagination}`}
         ></div>
      </div>
   );
}

export default ReferralEarnPartnersSwiper;