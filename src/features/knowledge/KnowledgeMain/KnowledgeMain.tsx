"use client";

import { useDeferredValue, useEffect, useId, useState } from "react";
import KnowledgeMainItem, { type KnowledgeMainItemData } from "../KnowledgeMainItem/KnowledgeMainItem";
import styles from "./KnowledgeMain.module.scss";

type KnowledgeMainProps = {
   items: KnowledgeMainItemData[];
   initialSearchValue?: string;
};

function KnowledgeMain({ items, initialSearchValue = "" }: KnowledgeMainProps) {
   const [searchValue, setSearchValue] = useState(initialSearchValue);
   const deferredSearchValue = useDeferredValue(searchValue.trim().toLowerCase());
   const searchId = useId();

   useEffect(() => {
      setSearchValue(initialSearchValue);
   }, [initialSearchValue]);

   const filteredItems = deferredSearchValue
      ? items.filter((item) => {
         const title = item.title.toLowerCase();
         const description = item.description.toLowerCase();

         return title.includes(deferredSearchValue) || description.includes(deferredSearchValue);
      })
      : items;

   return (
      <div className={styles.knowledgeMain}>
         <header className={styles.header}>
            <h1 className={styles.title}>База знаний</h1>
            <p className={styles.subtitle}>Всё о работе с Ai-UP — от регистрации до интеграций</p>
            <div className={styles.searchWrap}>
               <label className={styles.visuallyHidden} htmlFor={searchId}>
                  {"\u041f\u043e\u0438\u0441\u043a \u043f\u043e \u0440\u0430\u0437\u0434\u0435\u043b\u0430\u043c \u0431\u0430\u0437\u044b \u0437\u043d\u0430\u043d\u0438\u0439"}
               </label>
               <input
                  id={searchId}
                  className={styles.search}
                  type="search"
                  placeholder={"Поиск"}
                  autoComplete="off"
                  value={searchValue}
                  onChange={(event) => setSearchValue(event.target.value)}
               />
               <span className={styles.searchIcon} aria-hidden="true">
                  <svg viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path
                        d="M15.2172 15.2346L21 21M17.6667 9.33333C17.6667 13.9357 13.9357 17.6667 9.33333 17.6667C4.73096 17.6667 1 13.9357 1 9.33333C1 4.73096 4.73096 1 9.33333 1C13.9357 1 17.6667 4.73096 17.6667 9.33333Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                     />
                  </svg>
               </span>
            </div>
         </header>

         {filteredItems.length ? (
            <ul className={styles.grid}>
               {filteredItems.map((item) => (
                  <KnowledgeMainItem key={item.slug} item={item} />
               ))}
            </ul>
         ) : (
            <p className={styles.empty} role="status">
               {"\u041f\u043e \u0432\u0430\u0448\u0435\u043c\u0443 \u0437\u0430\u043f\u0440\u043e\u0441\u0443 \u043d\u0438\u0447\u0435\u0433\u043e \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d\u043e."}
            </p>
         )}
      </div>
   );
}

export default KnowledgeMain;
