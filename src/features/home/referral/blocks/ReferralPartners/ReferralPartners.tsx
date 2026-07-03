import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './ReferralPartners.module.scss'
import SmallListItem from '@/components/SmallListItem/SmallListItem';
import HomeReferralAnimation from '@/features/home/blocks/HomeReferral/HomeReferralAnimation/HomeReferralAnimation';

function ReferralPartners() {
   const dataList = [
      "идентификации",
      "колл-центр",
      "новые функции, которые будут добавляться дальше",
   ]
   return (
      <section className={styles.referral_partners}>
         <div className="container">
            <div className={styles.referral_partners_wrap}>
               <SectionHeader
                  className={styles.referral_partners_wrap_head}
                  title='Почему партнёрка Ai-UP выгоднее большинства программ на рынке'
                  as='h2'
                  titleSize='h2'
                  description='Ai-UP — это экосистема, в которой пользователи постоянно тратят деньги на реальные бизнес-задачи:'
                  size='small'
                  alignLeftMobile={true}
               />
               <div className="row">
                  <div className="col-xl-6">
                     <div className={styles.referral_partners_wrap_left}>
                        <div className={styles.referral_partners_wrap_left_head}>
                           {dataList?.length > 0 && (
                              <div className={styles.referral_partners_wrap_left_head_list}>
                                 {dataList?.map((text, index) => (
                                    <SmallListItem
                                       text={text}
                                       key={text + index}
                                    />
                                 ))}
                              </div>
                           )}
                           <div className={styles.referral_partners_wrap_left_head_text}>
                              <p>
                                 Это значит, что ваши рефералы пополняют баланс регулярно, а вы получаете процент с каждой операции — без каких-либо действий с вашей стороны.
                              </p>
                              <p>
                                 И чем больше сервис развивается, чем больше функций появляется, чем больше направлений мы запускаем — тем чаще ваши рефералы тратят деньги и тем больше вы зарабатываете.
                              </p>
                           </div>
                        </div>
                        <div className={styles.referral_partners_wrap_left_message}>
                           <p>
                              Доход растёт вместе с ростом Ai-UP. И вам ничего не нужно делать
                           </p>
                        </div>
                     </div>
                  </div>
                  <div className="col-xl-6">
                     <HomeReferralAnimation />
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

export default ReferralPartners;