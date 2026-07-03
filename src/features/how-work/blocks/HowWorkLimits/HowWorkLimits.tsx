import styles from './HowWorkLimits.module.scss'

function HowWorkLimits() {
   return (
      <section className={styles.how_work_limits}>
         <div className="container">
            <div className={`row ${styles.how_work_limits_wrap}`}>
               <div className="col-xl-4">
                  <div className={styles.how_work_limits_wrap_content}>
                     <div className={styles.how_work_limits_wrap_content_title}>
                        Лимиты по источникам
                     </div>
                     <div className={styles.how_work_limits_wrap_content_text}>
                        <p>
                           Вы сами задаёте, сколько номеров получать с каждого источника в день. Просто установите лимит в личном кабинете и контролируйте поток лидов
                        </p>
                     </div>
                  </div>
               </div>
               <div className="col-xl-8">
                  <div className={styles.how_work_limits_wrap_img}>
                     <div className={styles.how_work_limits_wrap_img_media}>
                        <img src="/img/how-work/limits.png" alt="Интерфейс лимитов по источникам в Ai-UP" loading="lazy" decoding="async" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

export default HowWorkLimits;
