import CheckBox from '../CheckBox/CheckBox';
import styles from './BigBorderItem.module.scss'

type props = {
   className?: string,
   classNameIcon?: string,
   classNameText?: string,
   text?: string,
   key?: any
}

function BigBorderItem({ className, classNameIcon, classNameText, text, key }: props) {
   return (
      <div className={`${styles.big_border_item} ${styles.className}`} key={key}>
         <div className={`${styles.big_border_item_icon} ${styles.classNameIcon}`}>
            <CheckBox />
         </div>
         <span className={`${styles.big_border_item_text} ${styles.classNameText}`}>
            {text}
         </span>
      </div>
   );
}

export default BigBorderItem;