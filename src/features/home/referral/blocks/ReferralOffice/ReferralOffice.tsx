import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './ReferralOffice.module.scss'
import SmallListItem from '@/components/SmallListItem/SmallListItem';

function ReferralOffice() {

   const dataList = [
      'вашу реферальную ссылку',
      'количество рефералов',
      'суммарный заработок',
      'историю операций',
      'сколько начислено, когда и за что',
      'бонусный баланс',
      'прибыль по каждому рефералу: «Обменять», «Вывести»'
   ]

   return (
      <section className={styles.referral_office}>
         <div className="container">
            <div className={styles.referral_office_wrap}>
               <SectionHeader
                  className={styles.referral_office_wrap_header}
                  title='Как выглядит кабинет партнёра'
                  titleSize='h2'
                  as='h2'
                  size='small'
                  alignLeftMobile={true}
               />
               <div className="row">
                  <div className="col-xl-6">
                     <div className={styles.referral_office_wrap_left}>
                        <div className={styles.referral_office_wrap_left_head}>
                           <div className={styles.referral_office_wrap_left_head_title}>Вы видите:</div>
                           {dataList?.length > 0 && (
                              <div className={styles.referral_office_wrap_left_head_list}>
                                 {dataList?.map((text, index) => (
                                    <SmallListItem
                                       text={text}
                                       key={text + index}
                                    />
                                 ))}
                              </div>
                           )}
                        </div>
                        <div className={styles.referral_office_wrap_left_message}>
                           <p>
                              Удобно, просто, прозрачно
                           </p>
                        </div>
                     </div>
                  </div>
                  <div className="col-xl-6">
                     <div className={styles.referral_office_wrap}>
                        <img src="/img/referral-page/office.jpg" alt="Кабинет партнёра Ai-UP" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

export default ReferralOffice;
