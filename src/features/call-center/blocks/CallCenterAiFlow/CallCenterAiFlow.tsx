import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './CallCenterAiFlow.module.scss'
import Button from '@/components/Buttons/Button';
import { SITE_ROUTES } from '@/lib/routes';
import CallCenterAiFlowSwiper from './CallCenterAiFlowSwiper/CallCenterAiFlowSwiper';

function CallCenterAiFlow() {
   return (
      <section className={styles.call_center_ai}>
         <div className="container">
            <div className={styles.call_center_ai_wrap}>
               <SectionHeader
                  title='Как КЦ работает вместе с Ai Flow'
                  titleSize='h2'
                  as='h2'
                  description='Если вы включили Ai Flow, система будет использовать результаты прозвона для оптимизации источников'
                  alignLeftMobile={true}
                  size='small'
               />
               <CallCenterAiFlowSwiper />
               <div className={styles.call_center_ai_wrap_bottom}>
                  <div className={styles.call_center_ai_wrap_bottom_text}>
                     <p>
                        То есть КЦ не просто обрабатывает ваши контакты, а ещё и даёт системе сигнал, откуда приходят самые полезные
                     </p>
                  </div>
                  <div className={styles.call_center_ai_wrap_bottom_btn}>
                     <Button
                        variant='blue'
                        icon={true}
                        href={SITE_ROUTES.aiFlow}
                     >
                        Подробнее про Ai Flow
                     </Button>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

export default CallCenterAiFlow;
