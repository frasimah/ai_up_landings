import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './CostBlack.module.scss'
import AiFlowDoMain from '@/features/aiflow/blocks/AiFlowDo/AiFlowDoMain/AiFlowDoMain';
import Button from '@/components/Buttons/Button';
import CostBlackMain from './CostBlackMain/CostBlackMain';

function CostBlack() {
   return (
      <section className={styles.cost_black}>
         <div className="container">
            <div className="cost_black_wrap">
               <SectionHeader
                  title='Ai Flow снижает стоимость лида на 15–35% каждую неделю'
                  titleSize='h2'
                  as='h2'
                  headingVariant='white'
                  size='small'
                  alignLeftMobile={true}
               />
               <CostBlackMain />
               <div className={styles.cost_black_bottom}>
                  <h3 className={styles.cost_black_bottom_title}>
                     Вот как это работает:
                  </h3>
                  <AiFlowDoMain variant='cost' />
                  <div className={styles.cost_black_bottom_mobile_adapt}>
                     Каждый день адаптируется под результаты прозвона
                  </div>
                  <div className={styles.ai_flow_do_wrap_text}>
                     <p>
                        В итоге: за те же деньги вы получаете больше лидов, а не просто больше контактов
                     </p>
                  </div>
                  <div className={styles.ai_flow_do_wrap_btn}>
                     <Button
                        variant='blue'
                        icon={true}
                     >
                        Что такое Ai Flow
                     </Button>
                  </div>
               </div>

            </div>
         </div>
      </section>
   );
}

export default CostBlack;
