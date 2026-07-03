import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './AiFlowSee.module.scss'
import AiFlowSeeSwiper from './AiFlowSeeSwiper/AiFlowSeeSwiper';
import AiFlowSeeBottom from './AiFlowSeeBottom/AiFlowSeeBottom';

function AiFlowSee() {
   return (
      <section className={styles.ai_flow_see}>
         <div className="container">
            <div className={styles.ai_flow_see_wrap}>
               <div className={`row ${styles.ai_flow_see_wrap_head}`}>
                  <div className="col-xl-6">
                     <div className={styles.ai_flow_see_wrap_head_left}>
                        <SectionHeader
                           title='Что видит пользователь'
                           titleSize='h2'
                           headingVariant='white'
                           as='h2'
                           description='Мы не нагружаем вас лишней аналитикой. Вы видите только:'
                           descriptionVariant='white'
                        />
                        <AiFlowSeeSwiper perView={2} />
                        <div className={styles.ai_flow_see_wrap_head_left_message}>
                           <p>
                              Всё остальное — внутри алгоритма
                           </p>
                        </div>
                     </div>
                  </div>
                  <div className="col-xl-6">
                     <div className={styles.ai_flow_see_wrap_head_img}>
                        <img src="/img/ai-flow/see.jpg" alt="Интерфейс пользователя Ai Flow" loading="lazy" decoding="async" />
                     </div>
                  </div>
               </div>
               <AiFlowSeeBottom />
            </div>
         </div>
      </section>
   );
}

export default AiFlowSee;
