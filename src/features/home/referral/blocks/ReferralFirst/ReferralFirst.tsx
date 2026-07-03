import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './ReferralFirst.module.scss'
import Button from '@/components/Buttons/Button';

function ReferralFirst() {
   return (
      <section className={styles.how_work_first}>
         <div className="container">
            <div className={styles.how_work_first_wrap}>
               <div className={styles.how_work_first_wrap_video}>
                  <video src="/img/call-center/first-video.mp4" autoPlay={true} loop={true} muted={true} playsInline={true} poster="/img/call-center/first-video-poster.png" preload="auto" />
               </div>
               <SectionHeader
                  className={styles.how_work_first_wrap_header}
                  eyebrow={'Не один раз. Не в первый месяц. А всегда.'}
                  eyebrowVariant='gray'
                  title='Зарабатывайте 15–20% с каждого пополнения вашего приглашённого пользователя. Пожизненно.'
                  as='h1'
                  titleSize='h1'
                  description='Ai-UP — не разовая партнёрка. Каждый пользователь, пришедший по вашей ссылке, навсегда закрепляется за вами, и вы получаете процент с каждого его пополнения'
                  descriptionSize='large'
                  size='small'
                  alignLeftMobile={true}
               />
               <div className={styles.how_work_first_wrap_btn}>
                  <Button
                     variant='blue'
                  >
                     Получить свою ссылку
                  </Button>
               </div>
            </div>
         </div>
      </section>
   );
}

export default ReferralFirst;