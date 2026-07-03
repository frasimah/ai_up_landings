import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './HomeCrm.module.scss';
import CheckBox from '@/components/CheckBox/CheckBox';

function HomeCrm() {

   type CompanyItem = {
      id: string;
      src: string;
      alt?: string;
   };

   const company: CompanyItem[] = [
      { id: 'crm-1', src: '/img/home/crm-svg-1.svg', alt: 'albato' },
      { id: 'crm-2', src: '/img/home/crm-svg-2.svg', alt: 'make' },
      { id: 'crm-3', src: '/img/home/crm-svg-3.svg', alt: 'Битрикс 24' },
      { id: 'crm-4', src: '/img/home/crm-svg-4.png', alt: 'amoCRM' },
      { id: 'crm-5', src: '/img/home/crm-svg-5.svg', alt: 'Api Monster' },
   ];
   return (
      <section className={styles.home_crm}>
         <div className="container">
            <div className={styles.home_crm_wrap}>
               <SectionHeader
                  title='Встроенная удобная <br/> CRM система'
                  description='Вы можете внедрить процесс работы с идентифицированными лидами даже если у вас нет CRM или вы пока не хотите настраивать интеграцию'
                  size='small'
               />
               <div className={styles.home_crm_content}>
                  <div className={styles.home_crm_content_item}>
                     <CheckBox />
                     <h3 className={styles.home_crm_content_item_title}>
                        Всё в одном экране. <br />
                        Контакты, статусы, фильтры и отчёты — без переключений
                     </h3>
                  </div>
                  <div className={styles.home_crm_content_item}>
                     <CheckBox />
                     <h3 className={styles.home_crm_content_item_title}>
                        Статусы после прозвона. <br />
                        Интересен, Отказ, Недозвон — с записью и комментарием оператора
                     </h3>
                  </div>
                  <div className={`${styles.home_crm_content_item} ${styles.home_crm_content_center}`}>
                     <div className={styles.home_crm_content_center_img}>
                        <img src="/img/home/crm-img.png" alt="Интерфейс CRM Ai-UP" />
                     </div>
                     <span className={`${styles.home_crm_content_center_circle} ${styles.home_crm_content_center_circle_1}`}></span>
                     <span className={`${styles.home_crm_content_center_circle} ${styles.home_crm_content_center_circle_2}`}></span>
                     <span className={`${styles.home_crm_content_center_circle} ${styles.home_crm_content_center_circle_3}`}></span>
                  </div>
                  <div className={styles.home_crm_content_item}>
                     <CheckBox />
                     <h3 className={styles.home_crm_content_item_title}>
                        Интеграция с другими
                        инструментами
                     </h3>
                     <div className={styles.home_crm_content_item_list}>
                        {company?.map((item, index) => (
                           <div className={styles.home_crm_content_item_list_it} key={item.id}>
                              <img src={item.src} alt={item.alt} />
                           </div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

export default HomeCrm;
