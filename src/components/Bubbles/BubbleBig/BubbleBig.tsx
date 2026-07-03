import styles from '../Bubbles.module.scss'

type BubbleBigProps = {
   percent?: string
   text?: string
   cost?: string
   className?: string
   ref?: any,
   bgColor?: 'default' | 'blue'
}

function BubbleBig({ percent, text, className, ref, bgColor, cost }: BubbleBigProps) {
   return (
      <div className={`${styles.bubble_big_correct} ${className ? className : ''} ${bgColor === 'blue' ? styles.bubble_big_correct_blue : ''}`} ref={ref}>
         <div className={styles.bubble_big_correct_icon}>
            <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 40 40" fill="none">
               <rect width={40} height={40} rx={20} fill="white" />
               <path d="M21.1442 18.8279H26V21.1442H21.1442V26H18.8279V21.1442H14V18.8279H18.8279V14H21.1442V18.8279Z" fill="#34C759" />
            </svg>
         </div>
         <div className={styles.bubble_big_correct_content}>
            <span>{text}</span>
            <span>{cost}</span>
         </div>
         {percent && (
            <div className={styles.bubble_big_correct_percent}>
               {percent}
            </div>
         )}
      </div>
   );
}

export default BubbleBig;