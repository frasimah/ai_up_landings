'use client';

import styles from './ReferralWorkSlider.module.scss';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from 'swiper/modules';
import ReferralWorkSlider_2 from './ReferralWorkSlider_2/ReferralWorkSlider_2';
import ReferralWorkSlider_3 from './ReferralWorkSlider_3/ReferralWorkSlider_3';
import ReferralWorkSlider_4 from './ReferralWorkSlider_4/ReferralWorkSlider_4';

function ReferralWorkSlider() {

   return (

      <Swiper
         modules={[Pagination]}
         className={styles.home_get_wrap_main_sw}
         slidesPerView="auto"
         enabled={false}
         speed={800}
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
                  Вы получаете одну персональную ссылку
               </h3>
               <div className={styles.home_get_wrap_main_sw_it_header_text}>
                  Раздел «Партнёрам» → «Реферальная ссылка»
               </div>
            </div>
            <div className={`${styles.home_get_wrap_main_sw_it_icon} ${styles.home_get_wrap_main_sw_it_icon_1}`}>
               <div className={styles.home_get_wrap_main_sw_it_icon_1_item}>
                  Получай 15 % c каждого
                  пополнения
               </div>
               <div className={styles.home_get_wrap_main_sw_it_icon_1_link}>
                  <div className={styles.home_get_wrap_main_sw_it_icon_1_link_title}>
                     Реферальная ссылка
                  </div>
                  <div className={styles.home_get_wrap_main_sw_it_icon_1_link_it}>
                     <div className={styles.home_get_wrap_main_sw_it_icon_1_link_it_text}>
                        https://ai-up.com/
                        referral?code=<span>USER1234</span>
                     </div>
                     <div className={styles.home_get_wrap_main_sw_it_icon_1_link_it_icon}>
                        <svg width={40} height={40} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                           <rect x="0.5" y="0.5" width={39} height={39} rx="9.5" stroke="#0169F9" />
                           <path d="M22 25.3333H15.3333C14.4496 25.3323 13.6024 24.9807 12.9775 24.3559C12.3526 23.731 12.0011 22.8837 12 22V15.3333C12.0011 14.4496 12.3526 13.6024 12.9775 12.9775C13.6024 12.3526 14.4496 12.0011 15.3333 12H22C22.8837 12.0011 23.731 12.3526 24.3559 12.9775C24.9807 13.6024 25.3323 14.4496 25.3333 15.3333V22C25.3323 22.8837 24.9807 23.731 24.3559 24.3559C23.731 24.9807 22.8837 25.3323 22 25.3333ZM15.3333 13.3333C14.8029 13.3333 14.2942 13.544 13.9191 13.9191C13.544 14.2942 13.3333 14.8029 13.3333 15.3333V22C13.3333 22.5304 13.544 23.0391 13.9191 23.4142C14.2942 23.7893 14.8029 24 15.3333 24H22C22.5304 24 23.0391 23.7893 23.4142 23.4142C23.7893 23.0391 24 22.5304 24 22V15.3333C24 14.8029 23.7893 14.2942 23.4142 13.9191C23.0391 13.544 22.5304 13.3333 22 13.3333H15.3333ZM28 24.6667V16C28 15.8232 27.9298 15.6536 27.8047 15.5286C27.6797 15.4036 27.5101 15.3333 27.3333 15.3333C27.1565 15.3333 26.987 15.4036 26.8619 15.5286C26.7369 15.6536 26.6667 15.8232 26.6667 16V24.6667C26.6667 25.1971 26.456 25.7058 26.0809 26.0809C25.7058 26.456 25.1971 26.6667 24.6667 26.6667H16C15.8232 26.6667 15.6536 26.7369 15.5286 26.8619C15.4036 26.987 15.3333 27.1565 15.3333 27.3333C15.3333 27.5101 15.4036 27.6797 15.5286 27.8047C15.6536 27.9298 15.8232 28 16 28H24.6667C25.5504 27.9989 26.3976 27.6474 27.0225 27.0225C27.6474 26.3976 27.9989 25.5504 28 24.6667Z" fill="#0169F9" />
                        </svg>
                     </div>
                  </div>
               </div>
            </div>
         </SwiperSlide>
         <SwiperSlide className={styles.home_get_wrap_main_sw_it}>
            <ReferralWorkSlider_2 />
         </SwiperSlide>
         <SwiperSlide className={styles.home_get_wrap_main_sw_it}>
            <ReferralWorkSlider_3 />
         </SwiperSlide>
         <SwiperSlide className={styles.home_get_wrap_main_sw_it}>
            <ReferralWorkSlider_4 />
         </SwiperSlide>
         <SwiperSlide className={styles.home_get_wrap_main_sw_it}>
            <div className={styles.home_get_wrap_main_sw_it_header}>
               <h3 className={styles.home_get_wrap_main_sw_it_header_title}>
                  Вы используете бонусы так, как вам выгодно
               </h3>
               <div className={styles.home_get_wrap_main_sw_it_header_text}>
                  <ul>
                     <li>
                        выводите на счёт ИП/ООО/самозанятого
                     </li>
                     <li>
                        обмениваете на идентификации
                     </li>
                     <li>
                        зачисляете на баланс
                     </li>
                  </ul>
               </div>
            </div>
         </SwiperSlide>
         <div className={`swiper-pagination contact_pagination ${styles.home_get_wrap_main_sw_pagination}`}></div>
      </Swiper>
   );
}

export default ReferralWorkSlider;