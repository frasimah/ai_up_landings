import styles from './SmallListItem.module.scss'

type props = {
   className?: string
   classNameIcon?: string
   classNameText?: string
   text?: string
}

function SmallListItem({ className, classNameIcon, classNameText, text }: props) {
   return (
      <div className={`${styles.small_list_item} ${className}`}>
         <div className={`${styles.small_list_item_icon} ${classNameIcon}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 28 28" fill="none">
               <rect width={28} height={28} rx={14} fill="#0169F9" />
               <path d="M6 14.5555L10.6154 19L21 9" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
         </div>
         <span className={classNameText}>
            {text}
         </span>
      </div>
   );
}

export default SmallListItem;
