import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './RegBlock.module.scss';
import Button from '@/components/Buttons/Button';

type regProps = {
   title: '' | string,
   description?: '' | string,
   btnText?: '' | string,
   bg?: 'default' | 'black'
   isMarginTop?: boolean
   isPaddingTop?: boolean
}

function RegBlock({ title, description, btnText, bg, isMarginTop = true, isPaddingTop = false }: regProps) {
   return (
      <section className={`${styles.home_reg} ${bg === 'black' && styles.home_reg_black} ${!isMarginTop && styles.noMarginTop} ${isPaddingTop && styles.isPaddingTop}`}>
         <div className="container">
            <div className={styles.home_reg_wrap}>
               <div className={styles.home_reg_wrap_content}>
                  <SectionHeader
                     title={title}
                     description={description}
                     descriptionVariant='white'
                     headingVariant='white'
                     as='h2'
                     titleSize='h1'
                     classNameTitle={styles.home_reg_wrap_content_title}
                  />
                  {btnText && (
                     <Button
                        variant='white'
                     >
                        {btnText}
                     </Button>
                  )}
               </div>
               <div className={styles.home_reg_wrap_dots}>
                  <picture>
                     <source srcSet="/img/home/reg-dots-mobile.svg" media="(max-width: 1200px)" />
                     <img src="/img/home/reg-dots.svg" alt="Декоративный фон блока регистрации" />
                  </picture>
               </div>
               <div className={styles.home_reg_wrap_img}>
                  <picture>
                     <source srcSet="/img/home/reg-img-mobile.png" media="(max-width: 1200px)" />
                     <img src="/img/home/reg-img.png" alt="Иллюстрация регистрации в Ai-UP" />
                  </picture>
               </div>
            </div>
         </div>
      </section>
   );
}

export default RegBlock;
