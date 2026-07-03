import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './AiFlowExample.module.scss'
import AiFlowExampleAnimations_1 from './AiFlowExampleAnimations/AiFlowExampleAnimations_1';
import AiFlowExampleAnimations_2 from './AiFlowExampleAnimations/AiFlowExampleAnimations_2';
import AiFlowExampleAnimations_3 from './AiFlowExampleAnimations/AiFlowExampleAnimations_3';
import AiFlowExampleAnimations_4 from './AiFlowExampleAnimations/AiFlowExampleAnimations_4';

function AiFlowExample() {
   return (
      <section className={styles.ai_flow_example}>
         <div className="container">
            <div className={`row ${styles.ai_flow_example_wrap}`}>
               <div className="offset-xl-1 col-xl-4 col-md-6">
                  <div className={styles.ai_flow_example_wrap_item}>
                     <SectionHeader
                        className={styles.ai_flow_example_wrap_item_head}
                        eyebrow='День 1'
                        eyebrowVariant='gray'
                     />
                     <div className={styles.ai_flow_example_wrap_item_text}>
                        <ul>
                           <li>Вы включили Ai Flow на 3 источниках</li>
                           <li>КЦ прозвонил 143 контакта</li>
                        </ul>
                     </div>
                     <div className={styles.ai_flow_example_wrap_item_img}>
                        <AiFlowExampleAnimations_1 />
                     </div>
                  </div>
               </div>
               <div className="offset-xl-7 col-xl-4 offset-md-6 col-md-6">
                  <div className={styles.ai_flow_example_wrap_item}>
                     <SectionHeader
                        className={styles.ai_flow_example_wrap_item_head}
                        eyebrow='День 2'
                        eyebrowVariant='gray'
                     />
                     <div className={styles.ai_flow_example_wrap_item_text}>
                        <ul>
                           <li>Ai Flow уменьшил лимит 2 каналам, увеличил 1 каналу</li>
                           <li>Качество выросло</li>
                        </ul>
                     </div>
                     <div className={styles.ai_flow_example_wrap_item_img}>
                        <AiFlowExampleAnimations_2 />
                     </div>
                     <div className={styles.ai_flow_example_wrap_item_line}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={648} height={121} viewBox="0 0 648 121" fill="none">
                           <path d="M647 120.5V30.5C647 13.9315 633.569 0.500004 617 0.500004H0" stroke="#9C9C9C" strokeDasharray="8 8" />
                        </svg>
                     </div>
                  </div>
               </div>
               <div className="offset-xl-1 col-xl-4 col-md-6">
                  <div className={styles.ai_flow_example_wrap_item}>
                     <SectionHeader
                        className={styles.ai_flow_example_wrap_item_head}
                        eyebrow='День 3'
                        eyebrowVariant='gray'
                     />
                     <div className={styles.ai_flow_example_wrap_item_text}>
                        <ul>
                           <li>Ещё одно перераспределение</li>
                           <li>Весь мусор отключён, остаются только рабочие каналы</li>
                        </ul>
                     </div>
                     <div className={styles.ai_flow_example_wrap_item_img}>
                        <AiFlowExampleAnimations_3 />
                     </div>
                     <div className={styles.ai_flow_example_wrap_item_line}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={646} height={121} viewBox="0 0 646 121" fill="none">
                           <path d="M0.500021 120.5V30.5C0.500021 13.9315 13.9315 0.500004 30.5 0.500004H645.5" stroke="#9C9C9C" strokeDasharray="8 8" />
                        </svg>
                     </div>
                  </div>
               </div>
               <div className="offset-xl-7 col-xl-4 offset-md-6 col-md-6">
                  <div className={styles.ai_flow_example_wrap_item}>
                     <SectionHeader
                        className={styles.ai_flow_example_wrap_item_head}
                        eyebrow='День 4'
                        eyebrowVariant='gray'
                     />
                     <div className={styles.ai_flow_example_wrap_item_text}>
                        <p>
                           Вы видите, что квалификация выросла, а стоимость — снизилась
                        </p>
                        <ul>
                           <li>Без анализа</li>
                           <li>Без ручной оптимизации</li>
                           <li>Без участия человека</li>
                        </ul>
                     </div>
                     <div className={styles.ai_flow_example_wrap_item_img}>
                        <AiFlowExampleAnimations_4 />
                     </div>
                     <div className={styles.ai_flow_example_wrap_item_line}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={647} height={121} viewBox="0 0 647 121" fill="none">
                           <path d="M646 120.5V30.5C646 13.9315 632.569 0.500004 616 0.500004H0" stroke="#9C9C9C" strokeDasharray="8 8" />
                        </svg>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

export default AiFlowExample;