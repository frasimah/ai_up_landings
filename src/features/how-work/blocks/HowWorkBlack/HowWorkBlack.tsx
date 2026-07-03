import styles from './HowWorkBlack.module.scss'
import HowWorkBlackContacts from './HowWorkBlackContacts/HowWorkBlackContacts';
import HowWorkBlackIdentifi from './HowWorkBlackIdentifi/HowWorkBlackIdentifi';
import HowWorkBlackRegions from './HowWorkBlackRegions/HowWorkBlackRegions';

function HowWorkBlack() {
   return (
      <div className={styles.how_work_black}>
         <div className="container">
            <div className={styles.how_work_black_wrap}>
               <HowWorkBlackRegions />
               <HowWorkBlackContacts />
               <HowWorkBlackIdentifi />
            </div>
         </div>
      </div>
   );
}

export default HowWorkBlack;