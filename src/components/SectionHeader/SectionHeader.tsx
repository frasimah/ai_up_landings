import styles from './SectionHeader.module.scss';

type HeadingTag = 'h1' | 'h2' | 'h3';

type ColorVariant = 'default' | 'white' | 'gray' | "full-gray";

type Size = 'full' | 'small';

type alignLeftMobile = true | false

type SectionHeaderProps = {
   eyebrow?: any;
   title?: string;
   description?: string;
   as?: HeadingTag;
   descriptionVariant?: ColorVariant;
   headingVariant?: ColorVariant;
   eyebrowVariant?: ColorVariant;
   size?: Size;
   alignLeftMobile?: alignLeftMobile
   descriptionSize?: "large" | "default"
   className?: string,
   titleSize?: "h1" | 'h2',
   classNameTitle?: string
};

function SectionHeader({
   eyebrow,
   title,
   description,
   as: Heading = 'h2',
   descriptionVariant = 'default',
   headingVariant = 'default',
   eyebrowVariant = 'default',
   size = "full",
   alignLeftMobile = false,
   descriptionSize = "default",
   className = "",
   titleSize = "h1",
   classNameTitle
}: SectionHeaderProps) {
   return (
      <div className={`${styles.section_header} ${styles[`section_header--${size}`]} ${alignLeftMobile && styles.alignLeftMobile} ${className ? className : ''}`}>
         {eyebrow && (
            <div className={`${styles.section_header_eyebrow} ${styles[`eyebrow_${eyebrowVariant}`]}`}>
               <span className={`${styles.section_header_eyebrow_icon} ${styles[`color_${eyebrowVariant}`]}`}></span>
               {eyebrow}
            </div>
         )}

         {title && (
            <Heading
               className={`${styles.section_header_title} ${styles[Heading]} ${styles[`title_${headingVariant}`]} ${styles[`title_size_${titleSize}`]} ${classNameTitle && classNameTitle}`}
               dangerouslySetInnerHTML={{ __html: title }}
            />
         )}

         {description && (
            <div
               className={`${styles.section_header_description} ${styles[`description_${descriptionVariant}`]} ${styles[`description_size_${descriptionSize}`]}`}
            >
               <p>{description}</p>
            </div>
         )}
      </div>
   );
}

export default SectionHeader;
