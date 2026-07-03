import styles from '../Bubbles.module.scss'

type BubbleCorrectProps = {
   percent?: string
   text: string
   className?: string
   ref?: any,
   bgColor?: 'default' | 'blue'
}

function BubbleInCorrect({ percent, text, className, ref, bgColor }: BubbleCorrectProps) {
   return (
      <div className={`${styles.bubble_in_correct} ${className ? className : ''} ${bgColor === 'blue' ? styles.bubble_in_correct_blue : ''}`} ref={ref}>
         <div className={styles.bubble_in_correct_arrow}>
            <svg xmlns="http://www.w3.org/2000/svg" width={28} height={28} viewBox="0 0 28 28" fill="none">
               <rect x={1} y={1} width={26} height={26} rx={13} fill="white" />
               <rect x={1} y={1} width={26} height={26} rx={13} stroke="#F6F6F6" strokeWidth={2} />
               <path d="M14.4492 18.8418C14.1898 19.0578 13.8132 19.0577 13.5537 18.8418L9.25098 15.2568C8.95405 15.0094 8.91382 14.5675 9.16113 14.2705C9.40861 13.9735 9.85047 13.9332 10.1475 14.1807L13.3018 16.8096V9.69922C13.3018 9.31262 13.6154 8.99902 14.002 8.99902C14.3883 8.99932 14.7012 9.3128 14.7012 9.69922V16.8096L17.8555 14.1807C18.1525 13.9332 18.5943 13.9735 18.8418 14.2705C19.0891 14.5675 19.0489 15.0094 18.752 15.2568L14.4492 18.8418Z" fill="#D72D1E" />
            </svg>
         </div>
         {text}
         {percent && (
            <div className={styles.bubble_in_correct_percent}>
               {percent}
            </div>
         )}
      </div>
   );
}

export default BubbleInCorrect;