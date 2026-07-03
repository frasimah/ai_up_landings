import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './ReferralEarnPartners.module.scss'
import ReferralEarnPartnersSwiper from './ReferralEarnPartnersSwiper/ReferralEarnPartnersSwiper';

function ReferralEarnPartners() {
   return (
      <div className={styles.referral_earn_partners}>
         <SectionHeader
            title='Преимущества партнёрки Ai-UP'
            titleSize='h2'
            as='h2'
            headingVariant='white'
         />
         <ReferralEarnPartnersSwiper />
      </div>
   );
}

export default ReferralEarnPartners;