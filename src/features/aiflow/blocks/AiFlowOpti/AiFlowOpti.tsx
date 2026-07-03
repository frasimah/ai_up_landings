import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './AiFlowOpti.module.scss'
import Button from '@/components/Buttons/Button';

function AiFlowOpti() {
   return (
      <section className={styles.ai_flow_opti}>
         <div className="container">
            <div className={styles.ai_flow_opti_wrap}>
               <div className={styles.ai_flow_opti_wrap_bg}>
                  <img src="/img/ai-flow/opti-bg.svg" alt="Декоративный фон блока оптимизации Ai Flow" loading="lazy" decoding="async" />
               </div>
               <div className="row">
                  <div className="col-xl-4">
                     <SectionHeader
                        title='Когда происходит оптимизация'
                        as='h2'
                        titleSize='h2'
                        headingVariant='white'
                     />
                  </div>
                  <div className="offset-xl-2 col-xl-6">
                     <div className={styles.ai_flow_opti_wrap_right}>
                        <div className={styles.ai_flow_opti_wrap_right_text}>
                           <p>
                              Каждый день, после полного завершения прозвона.
                              Ai Flow ничего не “считает на лету” — он ждёт, пока КЦ пройдёт весь массив, и только потом принимает взвешенные решения. То есть качество растёт ежедневно, а не “где-то когда-то”
                           </p>
                        </div>
                        <div className={styles.ai_flow_opti_wrap_right_btn}>
                           <Button
                              variant='blue'
                           >
                              Запустить Ai Flow
                           </Button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

export default AiFlowOpti;
