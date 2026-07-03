import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './HomeSecurity.module.scss'
import HomeSecuritySlider from './HomeSecuritySlider/HomeSecuritySlider';

function HomeSecurity() {

   const data = [
      'Идентификация полностью законна и&nbsp;не&nbsp;относится к&nbsp;персональным данным',
      'Мы&nbsp;не&nbsp;передаём ФИО и&nbsp;данные, позволяющие установить личность',
      'Работаем только с&nbsp;аудиторией, давшей согласие',
      'Не&nbsp;используем запрещённые методы и&nbsp;кликджекинг',
   ]
   return (
      <section className={styles.home_security}>
         <div className="container">
            <div className={styles.home_security_wrap}>
               <div className={styles.home_security_head}>
                  <div className={styles.home_security_head_icon}>
                     <svg xmlns="http://www.w3.org/2000/svg" width={38} height={40} viewBox="0 0 38 40" fill="none">
                        <path opacity="0.3" d="M0 28.4335C0 22.9811 0 20.255 1.66949 18.5611C3.33898 16.8672 6.02598 16.8672 11.4 16.8672H26.6C31.974 16.8672 34.6609 16.8672 36.3305 18.5611C38 20.255 38 22.9811 38 28.4335C38 33.8858 38 36.612 36.3305 38.3059C34.6609 39.9997 31.974 39.9997 26.6 39.9997H11.4C6.02598 39.9997 3.33898 39.9997 1.66949 38.3059C0 36.612 0 33.8858 0 28.4335Z" fill="white" />
                        <path d="M20.4262 24.5786C20.4262 23.7801 19.7882 23.1328 19.0012 23.1328C18.2142 23.1328 17.5762 23.7801 17.5762 24.5786V32.2894C17.5762 33.0879 18.2142 33.7352 19.0012 33.7352C19.7882 33.7352 20.4262 33.0879 20.4262 32.2894V24.5786Z" fill="white" />
                        <path d="M9.02578 13.0121C9.02578 7.42268 13.4917 2.89157 19.0008 2.89157C24.5098 2.89157 28.9758 7.42268 28.9758 13.0121V16.8744C30.0538 16.8846 30.9964 16.9099 31.8258 16.9727V13.0121C31.8258 5.8257 26.0838 0 19.0008 0C11.9177 0 6.17578 5.8257 6.17578 13.0121V16.9727C7.00515 16.9099 7.9478 16.8846 9.02578 16.8744V13.0121Z" fill="white" />
                     </svg>
                  </div>
                  <SectionHeader
                     title='Законность и&nbsp;безопасность'
                     headingVariant='white'
                     size='small'
                     alignLeftMobile={true}
                  />
               </div>
               <div className={styles.home_security_slider}>
                  <HomeSecuritySlider data={data} />
               </div>
            </div>
         </div>
         <div className={styles.home_security_bg}>
            <img src="/img/home/calc-bg.svg" alt="Декоративный фон калькулятора" />
         </div>
      </section>
   );
}

export default HomeSecurity;
