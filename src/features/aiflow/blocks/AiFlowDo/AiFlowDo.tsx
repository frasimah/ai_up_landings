import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './AiFlowDo.module.scss'
import Button from '@/components/Buttons/Button';
import AiFlowDoMain from './AiFlowDoMain/AiFlowDoMain';

type props = {
   title?: string,
   description?: string,
   message?: string,
   isBtnShow?: boolean
}

function AiFlowDo({ title, description, message, isBtnShow = true }: props) {
   return (
      <section className={styles.ai_flow_do}>
         <div className="container">
            <div className={`${styles.ai_flow_do_wrap}`}>
               <SectionHeader
                  className={styles.ai_flow_do_wrap_title}
                  title={title ? title : 'Что делает AIFlow'}
                  description={description}
                  as='h2'
                  titleSize='h2'
               />
               <AiFlowDoMain />
               <div className={styles.ai_flow_do_wrap_text}>
                  {message ? (
                     <p>
                        {message}
                     </p>
                  ) : (
                     <p>
                        По&nbsp;сути&nbsp;&mdash; каждый канал &laquo;борется&raquo; за&nbsp;право получать больше лимита.
                        И&nbsp;выигрывают только лучшие
                     </p>
                  )}

               </div>
               {isBtnShow && (
                  <div className={styles.ai_flow_do_wrap_btn}>
                     <Button
                        variant='blue'
                     >
                        Включить Ai Flow
                     </Button>
                  </div>
               )}
            </div>
         </div>
      </section>
   );
}

export default AiFlowDo;
