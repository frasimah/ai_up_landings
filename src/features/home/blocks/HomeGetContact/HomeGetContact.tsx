import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './HomeGetContact.module.scss';
import HomeGetContactSwiper from './HomeGetContactSwiper/HomeGetContactSwiper';

function HomeGetContact() {
   return (
      <section className={styles.home_get}>
         <div className="container">
            <div className={styles.home_get_wrap}>
               <SectionHeader
                  title='5 типов источников контактов'
                  size='small'
               />
            </div>

            <div className={styles.home_get_wrap_main}>
               <HomeGetContactSwiper />
               <div className={styles.home_get_wrap_main_bg}>
               </div>
            </div>
         </div>
      </section>
   );
}

export default HomeGetContact;