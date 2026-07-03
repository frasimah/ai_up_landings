import SectionHeader from '@/components/SectionHeader/SectionHeader';
import styles from './AiFlowGood.module.scss'

function AiFlowGood() {
   return (
      <section className={styles.ai_flow_good}>
         <div className="container">
            <div className={`row ${styles.ai_flow_good_wrap}`}>
               <div className="col-12">
                  <SectionHeader
                     title='Как Ai Flow понимает, что хорошо, а что плохо'
                     as='h2'
                     titleSize='h2'
                     className={styles.ai_flow_good_wrap_title}
                  />
               </div>
               <div className="col-md-6">
                  <div className={styles.ai_flow_good_wrap_item}>
                     <div className={styles.ai_flow_good_wrap_item_head} style={{ color: '#34C759' }}>
                        <div className={styles.ai_flow_good_wrap_item_head_icon}>
                           <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 40 40" fill="none">
                              <path fillRule="evenodd" clipRule="evenodd" d="M40 20C40 31.0456 31.0456 40 20 40C8.9543 40 0 31.0456 0 20C0 8.9543 8.9543 0 20 0C31.0456 0 40 8.9543 40 20ZM28.0606 13.9393C28.6464 14.5251 28.6464 15.4749 28.0606 16.0606L18.0606 26.0606C17.4748 26.6464 16.5252 26.6464 15.9393 26.0606L11.9393 22.0606C11.3536 21.4748 11.3536 20.5252 11.9393 19.9394C12.5251 19.3536 13.4749 19.3536 14.0607 19.9394L17 22.8786L21.4696 18.409L25.9394 13.9393C26.5252 13.3536 27.4748 13.3536 28.0606 13.9393Z" fill="#34C759" />
                           </svg>
                        </div>
                        Хорошо
                     </div>
                     <ul className={styles.ai_flow_good_wrap_item_list}>
                        <li>много статусов “интересен”</li>
                        <li>много квалифицированных</li>
                        <li>длинные разговоры</li>
                        <li>стабильный дозвон</li>
                        <li>минимум отказов</li>
                        <li>минимум автоответчиков</li>
                     </ul>
                  </div>
               </div>
               <div className="col-md-6">
                  <div className={styles.ai_flow_good_wrap_item}>
                     <div className={styles.ai_flow_good_wrap_item_head} style={{ color: '#D72D1E' }}>
                        <div className={styles.ai_flow_good_wrap_item_head_icon}>
                           <svg xmlns="http://www.w3.org/2000/svg" width={40} height={40} viewBox="0 0 40 40" fill="none">
                              <path fillRule="evenodd" clipRule="evenodd" d="M40 20C40 31.0456 31.0456 40 20 40C8.9543 40 0 31.0456 0 20C0 8.9543 8.9543 0 20 0C31.0456 0 40 8.9543 40 20ZM13.9393 13.9393C14.525 13.3535 15.4748 13.3535 16.0606 13.9393L20 17.8786L23.9392 13.9393C24.525 13.3536 25.4748 13.3536 26.0606 13.9393C26.6464 14.5251 26.6464 15.4749 26.0606 16.0606L22.1212 20L26.0606 23.9392C26.6464 24.525 26.6464 25.4748 26.0606 26.0606C25.4748 26.6464 24.525 26.6464 23.9392 26.0606L20 22.1214L16.0606 26.0606C15.4748 26.6464 14.5251 26.6464 13.9393 26.0606C13.3535 25.4748 13.3535 24.525 13.9393 23.9394L17.8786 20L13.9393 16.0606C13.3535 15.4748 13.3535 14.5251 13.9393 13.9393Z" fill="#D72D1E" />
                           </svg>
                        </div>
                        Плохо
                     </div>
                     <ul className={styles.ai_flow_good_wrap_item_list}>
                        <li>сплошные недозвоны</li>
                        <li>короткие разговоры</li>
                        <li>много автоответов</li>
                        <li>нулевая квалификация</li>
                        <li>слабые каналы</li>

                     </ul>
                  </div>
               </div>
               <div className="col-12">
                  <div className={styles.ai_flow_good_wrap_last}>
                     <p>
                        Ai Flow не требует “доверия” — он просто смотрит на факты
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </section>
   );
}

export default AiFlowGood;