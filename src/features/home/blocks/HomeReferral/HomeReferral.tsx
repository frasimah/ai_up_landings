import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './HomeReferral.module.scss';
import HomeReferralAnimation from './HomeReferralAnimation/HomeReferralAnimation';
import Button from '@/components/Buttons/Button';

function HomeReferral() {
   return (
      <section className={styles.home_refferal}>
         <div className="container">
            <div className={`row ${styles.home_refferal_wrap}`}>
               <div className="col-xl-6">
                  <div className={styles.home_refferal_left}>
                     <SectionHeader
                        eyebrow='Реферальная программа'
                        eyebrowVariant='gray'
                        title='Приводите пользователей&nbsp;&mdash; <br/> Ai-UP возвращает вам&nbsp;15% со&nbsp;всех пополнений'
                        description='Это не&nbsp;разовая комиссия&nbsp;&mdash; это пожизненные начисления, пока пользователь работает с&nbsp;платформой'
                        size='full'
                     />
                     <Button
                        className={styles.home_refferal_btn}
                        href={'/referral-programm'}
                        icon={true}
                     >
                        Подробнее
                     </Button>
                  </div>
               </div>
               <div className="col-xl-6">
                  <HomeReferralAnimation />
               </div>
            </div>
         </div>
      </section>
   );
}

export default HomeReferral;