import Button from '@/components/Buttons/Button';
import styles from './HomePartners.module.scss'
import CheckBox from '@/components/CheckBox/CheckBox';
import HomePartnersAnimation from './HomePartnersAnimation/HomePartnersAnimation';

function HomePartners() {
   return (
      <section className={styles.home_partner}>
         <div className="container">
            <div className={`row ${styles.home_partner_wrap}`}>
               <div className="col-12">
                  <h2 className={styles.home_partner_title}>
                     Что доступно каждому партнёру
                  </h2>
               </div>
               <div className="col-xl-3 col-md-4">
                  <div className={styles.home_partner_left}>
                     <h3 className={styles.home_partner_left_title}>
                        Личная реферальная ссылка
                     </h3>
                     <div className={styles.home_partner_left_block}>
                        <div className={styles.home_partner_left_block_head}>
                           Получай 15 % c каждого пополнения
                        </div>
                        <div className={styles.home_partner_left_block_content}>
                           <div className={styles.home_partner_left_block_content_title}>
                              Реферальная ссылка
                           </div>
                           <div className={styles.home_partner_left_block_content_message}>
                              <span>
                                 {'https://ai-up.com/referra..'}
                              </span>
                              <div className={styles.home_partner_left_block_content_message_icon}>
                                 <svg width={30} height={30} viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <rect x="0.5" y="0.5" width={29} height={29} rx="8.5" stroke="#0169F9" />
                                    <g clipPath="url(#clip0_1589_4022)">
                                       <path d="M16.5 19H11.5C10.8372 18.9992 10.2018 18.7356 9.73311 18.2669C9.26444 17.7982 9.00079 17.1628 9 16.5V11.5C9.00079 10.8372 9.26444 10.2018 9.73311 9.73311C10.2018 9.26444 10.8372 9.00079 11.5 9H16.5C17.1628 9.00079 17.7982 9.26444 18.2669 9.73311C18.7356 10.2018 18.9992 10.8372 19 11.5V16.5C18.9992 17.1628 18.7356 17.7982 18.2669 18.2669C17.7982 18.7356 17.1628 18.9992 16.5 19ZM11.5 10C11.1022 10 10.7206 10.158 10.4393 10.4393C10.158 10.7206 10 11.1022 10 11.5V16.5C10 16.8978 10.158 17.2794 10.4393 17.5607C10.7206 17.842 11.1022 18 11.5 18H16.5C16.8978 18 17.2794 17.842 17.5607 17.5607C17.842 17.2794 18 16.8978 18 16.5V11.5C18 11.1022 17.842 10.7206 17.5607 10.4393C17.2794 10.158 16.8978 10 16.5 10H11.5ZM21 18.5V12C21 11.8674 20.9473 11.7402 20.8536 11.6464C20.7598 11.5527 20.6326 11.5 20.5 11.5C20.3674 11.5 20.2402 11.5527 20.1464 11.6464C20.0527 11.7402 20 11.8674 20 12V18.5C20 18.8978 19.842 19.2794 19.5607 19.5607C19.2794 19.842 18.8978 20 18.5 20H12C11.8674 20 11.7402 20.0527 11.6464 20.1464C11.5527 20.2402 11.5 20.3674 11.5 20.5C11.5 20.6326 11.5527 20.7598 11.6464 20.8536C11.7402 20.9473 11.8674 21 12 21H18.5C19.1628 20.9992 19.7982 20.7356 20.2669 20.2669C20.7356 19.7982 20.9992 19.1628 21 18.5Z" fill="#0169F9" />
                                    </g>
                                    <defs>
                                       <clipPath id="clip0_1589_4022">
                                          <rect width={12} height={12} fill="white" transform="translate(9 9)" />
                                       </clipPath>
                                    </defs>
                                 </svg>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <div className="col-xl-9 col-md-8">
                  <div className={styles.home_partner_right}>
                     <div className={styles.home_partner_right_content}>
                        <h3 className={styles.home_partner_right_content_title}>
                           Отдельный партнёрский кабинет
                        </h3>
                        <ul className={styles.home_partner_right_content_list}>
                           <li className={styles.home_partner_right_content_list_it}>
                              <CheckBox />
                              <div className={styles.home_partner_right_content_list_it_text}>
                                 прозрачный баланс и история выплат
                              </div>
                           </li>
                           <li className={styles.home_partner_right_content_list_it}>
                              <CheckBox />
                              <div className={styles.home_partner_right_content_list_it_text}>
                                 статистика кликов, регистраций и пополнений
                              </div>
                           </li>
                           <li className={styles.home_partner_right_content_list_it}>
                              <CheckBox />
                              <div className={styles.home_partner_right_content_list_it_text}>
                                 бонусный баланс можно вывести на баланс системы или заказать выплату на ваше юр. лицо
                              </div>
                           </li>
                        </ul>
                     </div>
                     <HomePartnersAnimation />
                  </div>
               </div>
               <div className="col-xl-3 col-md-3">
                  <div className={styles.home_partner_btn}>
                     <Button
                        variant='blue'
                        icon={true}
                        href='/referral-programm'
                     >
                        Подробнее
                     </Button>
                  </div>
               </div>
               <div className="offset-xl-5 col-xl-4 offset-md-3 col-md-6">
                  <div className={styles.home_partner_last_text}>
                     <p>
                        Это реальный доход, который растёт вместе с активностью ваших приглашённых пользователей
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

export default HomePartners;