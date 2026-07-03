import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './ReferralWork.module.scss'
import ReferralWorkSlider from './ReferralWorkSlider/ReferralWorkSlider';

function ReferralWork() {
   return (
      <section className={styles.referral_work}>
         <div className="container">
            <div className={styles.referral_work_wrap}>
               <SectionHeader
                  title='Как это работает'
                  titleSize='h2'
                  size='small'
                  alignLeftMobile={true}
                  as='h2'
               />
               <ReferralWorkSlider />
            </div>
         </div>
      </section>
   );
}

export default ReferralWork;