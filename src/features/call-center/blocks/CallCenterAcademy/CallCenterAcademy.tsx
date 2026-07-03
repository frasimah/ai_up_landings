import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './CallCenterAcademy.module.scss'
import CallCenterAcademySwiper from './CallCenterAcademySwiper/CallCenterAcademySwiper';

function CallCenterAcademy() {

   return (
      <section className={styles.call_center_academy}>
         <div className="container">
            <div className={styles.call_center_academy_wrap}>
               <SectionHeader
                  className={styles.call_center_academy_wrap_title}
                  title='Академия операторов Ai-UP'
                  titleSize='h2'
                  as='h2'
                  description='Мы не используем “массовку”. Каждый оператор проходит наш внутренний путь:'
                  size='small'
                  alignLeftMobile={true}
               />
               <CallCenterAcademySwiper />
            </div>
         </div>
      </section>
   );
}

export default CallCenterAcademy;