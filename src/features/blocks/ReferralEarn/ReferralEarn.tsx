import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './ReferralEarn.module.scss'
import ReferralEarnPartners from './ReferralEarnPartners/ReferralEarnPartners';
import ReferralEarnGraph from './ReferralEarnGraph/ReferralEarnGraph';

function ReferralEarn() {
   return (
      <section className={styles.referral_earn}>
         <div className="container">
            <div className={styles.referral_earn_wrap}>
               <SectionHeader
                  title='Сколько можно заработать?'
                  titleSize='h2'
                  as='h2'
                  headingVariant='white'
                  size='small'
                  alignLeftMobile={true}
               />
               <div className={styles.referral_earn_wrap_head}>
                  <div className={styles.referral_earn_wrap_head_text}>
                     <p>
                        Средний чек пополнения: 15 000 ₽
                     </p>
                     <p>
                        Ваша выплата: 2 250 ₽ с одного пополнения
                     </p>
                  </div>
                  <ReferralEarnGraph/>
               </div>
               <ReferralEarnPartners />
            </div>
         </div>
      </section>
   );
}

export default ReferralEarn;