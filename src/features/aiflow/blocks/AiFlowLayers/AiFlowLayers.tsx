import styles from './AiFlowLayers.module.scss'
import SectionHeader from '@/components/SectionHeader/SectionHeader';
import AiFlowLayersTab from './AiFlowLayersTab/AiFlowLayersTab';


function AiFlowLayers() {
   return (
      <section className={styles.ai_flow_layers}>
         <div className="container">
            <div className="ai_flow_layers_wrap">
               <SectionHeader
                  titleSize='h2'
                  title='Ai Flow работает в два слоя'
                  size='small'
                  alignLeftMobile={true}
               />
               <AiFlowLayersTab />
            </div>
         </div>
      </section>
   );
}

export default AiFlowLayers;