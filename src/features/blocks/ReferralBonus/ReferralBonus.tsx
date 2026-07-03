import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './ReferralBonus.module.scss'
import ReferralBonusAnimationSecond from './ReferralBonusAnimationSecond/ReferralBonusAnimationSecond';
import ReferralBonusAnimatedBubble from './ReferralBonusAnimatedBubble';

function ReferralBonus() {

   return (
      <section className={styles.referral_bonus}>
         <div className="container">
            <div className={styles.referral_bonus_wrap}>
               <SectionHeader
                  title='Как использовать бонусы'
                  titleSize='h2'
                  as='h2'
                  size='small'
                  alignLeftMobile={true}
               />
               <div className={`row ${styles.referral_bonus_wrap_list}`}>
                  <div className="col-md-6">
                     <div className={styles.referral_bonus_wrap_list_item}>
                        <div className={styles.referral_bonus_wrap_list_item_content}>
                           <h3 className={styles.referral_bonus_wrap_list_item_content_title}>
                              Вывести на ваш счет
                           </h3>
                           <div className={styles.referral_bonus_wrap_list_item_content_text}>
                              <p>
                                 Отправьте реквизиты вашего счета и мы произведем выплату в течении суток
                              </p>
                           </div>
                        </div>
                        <div className={styles.referral_bonus_wrap_list_item_img}>
                           <div className={`${styles.referral_bonus_wrap_list_item_img_cloud} ${styles.referral_bonus_wrap_list_item_img_cloud_1}`}>
                              10.000 бонусов
                           </div>
                           <div className={styles.referral_bonus_wrap_list_item_img_icon}>
                              <svg xmlns="http://www.w3.org/2000/svg" width={50} height={50} viewBox="0 0 50 50" fill="none">
                                 <rect width={50} height={50} rx={25} fill="white" />
                                 <path d="M38.5967 21.6992C38.9164 21.6934 39.2318 21.8253 39.459 22.0586L41.6494 24.3076C42.1147 24.7855 42.1152 25.5598 41.6475 26.0352C41.4152 26.2737 41.1107 26.3936 40.8057 26.3936C40.5015 26.3935 40.1961 26.2737 39.9639 26.0352L39.8994 25.9678C39.4109 34.3415 32.622 41.001 24.3467 41.001C20.9495 41.0009 17.7209 39.8986 15.0098 37.8115C12.3886 35.7947 10.4156 32.922 9.45508 29.7236C9.26165 29.0785 9.61397 28.393 10.2422 28.1943C10.8704 27.9957 11.5372 28.3578 11.7314 29.0029C13.4475 34.7171 18.5175 38.5565 24.3467 38.5566C31.3737 38.5566 37.1351 32.8889 37.5254 25.7715C37.0733 26.2516 36.3278 26.2723 35.8525 25.8125C35.374 25.35 35.3516 24.5755 35.8027 24.084C35.8217 24.0628 36.2733 23.5721 36.7461 23.0713C37.028 22.7733 37.259 22.5334 37.4326 22.3594C37.5846 22.2076 37.7266 22.0638 37.8818 21.9502C37.9255 21.9164 37.9729 21.8873 38.0215 21.8594C38.0247 21.8577 38.028 21.8552 38.0312 21.8535C38.0519 21.8416 38.0732 21.8305 38.0947 21.8203C38.2418 21.7473 38.4041 21.7018 38.5967 21.6992ZM24.3535 9C27.2954 9.00001 30.1605 9.84662 32.6387 11.4492C35.0499 13.0068 36.9996 15.208 38.2783 17.8164C38.5739 18.4189 38.3375 19.1542 37.75 19.458C37.1631 19.7619 36.4473 19.5186 36.1514 18.915C33.893 14.3084 29.3718 11.4463 24.3525 11.4463C18.0504 11.4463 12.7663 16.0058 11.4619 22.0801L11.4844 22.0566C12.3076 21.9395 12.8163 22.1654 13.042 22.6992C13.2627 23.2204 13.1252 23.8301 12.7334 24.2324L10.9785 26.0342C10.7553 26.2634 10.4486 26.3936 10.1328 26.3936C10.1271 26.3936 10.1211 26.3934 10.1162 26.3926C9.60478 26.3848 9.30269 26.0829 8.95312 25.7324C8.77955 25.5584 8.54939 25.3184 8.26758 25.0205C7.79481 24.5198 7.34323 24.0282 7.32422 24.0078C6.85993 23.5019 6.89729 22.6967 7.41797 22.2393C7.87587 21.8371 8.55436 21.8716 8.99902 22.2764C10.2614 14.7473 16.666 9 24.3535 9Z" fill="#0169F9" />
                              </svg>
                           </div>
                           <div className={`${styles.referral_bonus_wrap_list_item_img_cloud} ${styles.referral_bonus_wrap_list_item_img_cloud_2}`}>
                              10.000 ₽
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className="col-md-6">
                     <div className={styles.referral_bonus_wrap_list_item}>
                        <div className={styles.referral_bonus_wrap_list_item_content}>
                           <h3 className={styles.referral_bonus_wrap_list_item_content_title}>
                              Обменять на идентификации
                           </h3>
                           <div className={styles.referral_bonus_wrap_list_item_content_text}>
                              <p>
                                 Система сама покажет, сколько контактов вы получите и вашу выгоду
                              </p>
                           </div>
                        </div>
                        <div className={`${styles.referral_bonus_wrap_list_item_img} ${styles.referral_bonus_wrap_list_item_img_2}`}>
                           <ReferralBonusAnimatedBubble
                              className={styles.referral_bonus_wrap_list_item_img_big_cloud}
                              text='Выгода'
                              cost='56.000 ₽'
                           />
                           <ReferralBonusAnimationSecond />
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

export default ReferralBonus;
