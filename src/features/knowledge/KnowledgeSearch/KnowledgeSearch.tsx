import styles from './KnowledgeSearch.module.scss'

function KnowledgeSearch() {
   return (
      <div className={styles.knowledge_search}>
         <input type="search"
            placeholder='Найти'
         />
         <button type='submit'>
            <svg xmlns="http://www.w3.org/2000/svg" width={22} height={22} viewBox="0 0 22 22" fill="none">
               <path d="M15.2172 15.2346L21 21M17.6667 9.33333C17.6667 13.9357 13.9357 17.6667 9.33333 17.6667C4.73096 17.6667 1 13.9357 1 9.33333C1 4.73096 4.73096 1 9.33333 1C13.9357 1 17.6667 4.73096 17.6667 9.33333Z" stroke="#777777" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
            </svg>
         </button>
      </div>
   );
}

export default KnowledgeSearch;