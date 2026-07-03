import styles from '../Bubbles.module.scss'

type BubbleCorrectProps = {
   text: string
   className?: string
   ref?: any
}

function BubbleDefault({ text, className, ref }: BubbleCorrectProps) {
   return (
      <div className={`${styles.bubble_default} ${className ? className : ''}`} ref={ref}>
         {text}
      </div>
   );
}

export default BubbleDefault;