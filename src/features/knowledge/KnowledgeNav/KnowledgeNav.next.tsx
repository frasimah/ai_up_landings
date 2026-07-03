"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useMemo, useState } from "react";
import styles from "./KnowledgeNav.module.scss";

type ArticleLink = {
   href: string;
   title: string;
};

type Module = {
   slug: string;
   title: string;
   href: string;
   links: ArticleLink[];
};

function getArticlesNoun(count: number): string {
   const abs = Math.abs(count);
   const lastTwo = abs % 100;
   const last = abs % 10;

   if (lastTwo >= 11 && lastTwo <= 14) return "статей";
   if (last === 1) return "статья";
   if (last >= 2 && last <= 4) return "статьи";
   return "статей";
}

function normalizeValue(value: string) {
   return value.trim().toLowerCase();
}

export default function KnowledgeNav({
   sectionSlug,
   sectionTitle,
   items,
   tree,
}: {
   sectionSlug?: string;
   sectionTitle?: string;
   items?: { slug: string; title: string }[];
   tree?: {
      rootSlug: string;
      rootTitle: string;
      children: { slug: string; title: string; items: { href: string; title: string }[] }[];
      activeSectionSlug: string;
   };
}) {
   const pathname = usePathname();
   const searchId = useId();
   const [query, setQuery] = useState("");

   const modules = useMemo<Module[]>(() => {
      if (tree) {
         return tree.children.map((child) => ({
            slug: child.slug,
            title: child.title,
            href: `/knowledge-base/${child.slug}`,
            links: child.items,
         }));
      }

      if (!sectionSlug || !sectionTitle || !items) {
         return [];
      }

      return [
         {
            slug: sectionSlug,
            title: sectionTitle,
            href: `/knowledge-base/${sectionSlug}`,
            links: items.map((item) => ({
               href: `/knowledge-base/${sectionSlug}/${item.slug}`,
               title: item.title,
            })),
         },
      ];
   }, [items, sectionSlug, sectionTitle, tree]);

   const activeModuleSlug = useMemo(() => {
      const activeModule = modules.find((module) => pathname === module.href || module.links.some((link) => link.href === pathname));
      return activeModule?.slug ?? modules[0]?.slug ?? null;
   }, [modules, pathname]);

   const [openSlug, setOpenSlug] = useState<string | null>(activeModuleSlug);

   useEffect(() => {
      setOpenSlug(activeModuleSlug);
   }, [activeModuleSlug]);

   const normalizedQuery = normalizeValue(query);
   const isSearching = normalizedQuery.length > 0;

   const filteredModules = useMemo(() => {
      return modules
         .map((module) => {
            const moduleMatches = normalizeValue(module.title).includes(normalizedQuery);
            const visibleLinks = moduleMatches
               ? module.links
               : module.links.filter((link) => normalizeValue(link.title).includes(normalizedQuery));

            return {
               ...module,
               visibleLinks,
               isVisible: !isSearching || moduleMatches || visibleLinks.length > 0,
            };
         })
         .filter((module) => module.isVisible);
   }, [isSearching, modules, normalizedQuery]);

   if (modules.length === 0) return null;

   return (
      <nav className={styles.knowledge_nav} aria-label="Навигация по базе знаний">
         <div className={styles.knowledge_nav_search}>
            <label className={styles.knowledge_nav_search_label} htmlFor={searchId}>
               Поиск по базе знаний
            </label>
            <div className={styles.knowledge_nav_search_field}>
               <input
                  id={searchId}
                  type="search"
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Поиск по базе знаний..."
                  autoComplete="off"
               />
               <span className={styles.knowledge_nav_search_icon} aria-hidden="true">
                  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                     <circle cx="7" cy="7" r="5.25" stroke="currentColor" strokeWidth="1.5" />
                     <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
               </span>
            </div>
         </div>

         <div className={styles.knowledge_nav_modules}>
            {filteredModules.map((module) => {
               const visibleLinks = isSearching ? module.visibleLinks : module.links;
               const sectionPageActive = pathname === module.href;
               const activeArticleHref = module.links.find((link) => link.href === pathname)?.href ?? null;
               const isActive = sectionPageActive || activeArticleHref !== null;
               const isOpen = isSearching ? true : openSlug === module.slug;
               const contentId = `knowledge-nav-panel-${module.slug}`;
               const countLabel = `${module.links.length} ${getArticlesNoun(module.links.length)}`;

               return (
                  <section
                     key={module.slug}
                     className={`${styles.knowledge_nav_module} ${isOpen ? styles.knowledge_nav_module_open : ""} ${isActive ? styles.knowledge_nav_module_active : ""}`}
                  >
                     <button
                        type="button"
                        className={styles.knowledge_nav_module_header}
                        onClick={() => setOpenSlug((previous) => (previous === module.slug ? null : module.slug))}
                        aria-expanded={isOpen}
                        aria-controls={contentId}
                     >
                        <span className={styles.knowledge_nav_module_main}>
                           <span className={styles.knowledge_nav_module_title}>{module.title}</span>
                           <span className={styles.knowledge_nav_module_count}>{countLabel}</span>
                        </span>
                        <span className={styles.knowledge_nav_module_arrow} aria-hidden="true">
                           <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} viewBox="0 0 16 16" fill="none">
                              <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                           </svg>
                        </span>
                     </button>

                     <div
                        id={contentId}
                        className={styles.knowledge_nav_module_panel}
                        aria-hidden={!isOpen}
                     >
                        <div className={styles.knowledge_nav_module_panel_inner}>
                           <Link
                              href={module.href}
                              className={`${styles.knowledge_nav_link} ${sectionPageActive ? styles.knowledge_nav_link_active : ""}`}
                              aria-current={sectionPageActive ? "page" : undefined}
                           >
                              Все материалы раздела
                           </Link>
                           {visibleLinks.map((link) => {
                              const isCurrentArticle = activeArticleHref === link.href;

                              return (
                                 <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`${styles.knowledge_nav_link} ${isCurrentArticle ? styles.knowledge_nav_link_active : ""}`}
                                    aria-current={isCurrentArticle ? "page" : undefined}
                                 >
                                    {link.title}
                                 </Link>
                              );
                           })}
                        </div>
                     </div>
                  </section>
               );
            })}
         </div>

         <p className={`${styles.knowledge_nav_no_results} ${filteredModules.length === 0 ? styles.knowledge_nav_no_results_visible : ""}`}>
            Ничего не найдено
         </p>
      </nav>
   );
}
