import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './HomeFirst.module.scss';
import HomeFirstAnimation from './HomeFirstAnimation/HomeFirstAnimation';
import Button from '@/components/Buttons/Button';
import { APP_ROUTES } from "@/lib/routes";

function HomeFirst() {
   return (
      <section className={styles.home_first}>
         <div className="container">
            <div className={styles.home_first_wrap}>
               <HomeFirstAnimation />
               <div className={styles.home_first_wrap_bottom}>
                  <div className="row">
                     <div className="col-xl-9 col-md-9">
                        <div className={styles.home_first_wrap_bottom_block} style={{ zIndex: 1, position: 'relative' }}>
                           <SectionHeader
                              eyebrow='Без ставок, без рекламных кабинетов и без ежедневной оптимизации'
                              eyebrowVariant='full-gray'
                              title='Получайте контакты людей, которые вчера искали ваших конкурентов'
                              headingVariant='white'
                              as='h1'
                           />
                        </div>
                     </div>
                  </div>
                  <Button
                     className={styles.home_first_wrap_bottom_btn}
                     href={APP_ROUTES.signUp}
                     variant='blue'
                     noBorder={false}
                  >
                     Создать аккаунт
                  </Button>
               </div>
            </div>
         </div>
         <div className={styles.home_first_bg}>
            <img src="/img/home/home-first-bg.svg" alt="Фон первого экрана Ai-UP" />
         </div>
      </section>
   );
}

export default HomeFirst;
