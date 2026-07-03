import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './AboutDo.module.scss'
import AboutDoSlider from './AboutDoSlider/AboutDoSlider';

function AboutDo() {
   return (
      <section className={styles.referral_work}>
         <div className="container">
            <div className={styles.referral_work_wrap}>
               <SectionHeader
                  title='Что делает Ai-UP уникальным'
                  titleSize='h2'
                  size='small'
                  alignLeftMobile={true}
                  as='h2'
               />
               <AboutDoSlider />
            </div>
         </div>
      </section>
   );
}

export default AboutDo;