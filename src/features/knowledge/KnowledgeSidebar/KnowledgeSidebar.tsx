"use client";

import Link from "next/link";
import { useState } from "react";

type SidebarItem = {
   slug: string;
   title: string;
   children: { href: string; title: string }[];
};

export default function KnowledgeSidebar({
   items,
   activeRootSlug,
}: {
   items: SidebarItem[];
   activeRootSlug: string;
}) {
   const [openSlug, setOpenSlug] = useState(activeRootSlug);

   return (
      <div className="knowledge_sidebar">
         <div className="knowledge_sidebar_search">
            <input type="text" placeholder="" aria-label="Поиск по базе знаний" />
         </div>
         <div className="knowledge_sidebar_title">Категории</div>
         <ul className="knowledge_sidebar_list">
            {items.map((item) => {
               const isOpen = openSlug === item.slug;
               const isActive = activeRootSlug === item.slug;

               return (
                  <li key={item.slug} className={`knowledge_sidebar_item ${isOpen ? "is-open" : ""} ${isActive ? "is-active" : ""}`}>
                     <button
                        type="button"
                        className="knowledge_sidebar_item_button"
                        onClick={() => setOpenSlug((prev) => (prev === item.slug ? "" : item.slug))}
                        aria-expanded={isOpen}
                     >
                        <span>{item.title}</span>
                        <span aria-hidden>›</span>
                     </button>
                     {isOpen ? (
                        <ul className="knowledge_sidebar_sublist">
                           <li className="knowledge_sidebar_subitem">
                              <Link href={`/knowledge-base/${item.slug}`}>Все материалы раздела</Link>
                           </li>
                           {item.children.map((child) => (
                              <li key={child.href} className="knowledge_sidebar_subitem">
                                 <Link href={child.href}>{child.title}</Link>
                              </li>
                           ))}
                        </ul>
                     ) : null}
                  </li>
               );
            })}
         </ul>
      </div>
   );
}
