import styles from '../Bubbles.module.scss'

type BubbleCorrectProps = {
   percent?: string
   text: string
   className?: string
   ref?: any,
   bgColor?: 'default' | 'blue'
}

function BubbleCorrect({ percent, text, className, ref, bgColor }: BubbleCorrectProps) {
   return (
      <div className={`${styles.bubble_correct} ${className ? className : ''} ${bgColor === 'blue' ? styles.bubble_correct_blue : ''}`} ref={ref}>
         <div className={styles.bubble_correct_arrow}>
            <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 28 28" fill="none">
               <rect x={1} y={1} width={26} height={26} rx={13} fill="white" />
               <rect x={1} y={1} width={26} height={26} rx={13} stroke="#F6F6F6" strokeWidth={2} />
               <path fillRule="evenodd" clipRule="evenodd" d="M13.5545 9.16189C13.8139 8.94596 14.1905 8.94612 14.45 9.16189L18.7528 12.7468C19.0497 12.9943 19.0899 13.4362 18.8426 13.7332C18.5951 14.0301 18.1533 14.0704 17.8563 13.823L14.702 11.1941V18.3045C14.702 18.6911 14.3884 19.0047 14.0018 19.0047C13.6155 19.0043 13.3026 18.6908 13.3026 18.3045V11.1941L10.1483 13.823C9.85128 14.0705 9.40943 14.0302 9.16194 13.7332C8.91488 13.4362 8.95495 12.9942 9.25178 12.7468L13.5545 9.16189Z" fill="#34C759" />
            </svg>
         </div>
         {text}
         {percent && (
            <div className={styles.bubble_correct_percent}>
               {percent}
            </div>
         )}
      </div>
   );
}

export default BubbleCorrect;