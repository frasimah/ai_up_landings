import Link from "next/link";
import type { CSSProperties } from "react";
import styles from "./KnowledgeMainItem.module.scss";

export type KnowledgeMainItemData = {
   slug: string;
   title: string;
   description: string;
   count: string;
   link: string;
   variant: "default" | "primary" | "danger";
   iconBg: string;
   iconUrl: string | null;
};

type KnowledgeMainItemProps = {
   item: KnowledgeMainItemData;
};

function KnowledgeMainItem({ item }: KnowledgeMainItemProps) {
   const style = { "--knowledge-icon-bg": item.iconBg } as CSSProperties;

   return (
      <li className={styles.item}>
         <Link className={styles.card} href={item.link} data-variant={item.variant} style={style}>
            <div className={styles.top}>
               <span className={styles.icon} aria-hidden="true">
                  {item.iconUrl ? (
                     <span
                        className={styles.customIcon}
                        style={{ backgroundImage: `url("${item.iconUrl}")` }}
                     />
                  ) : (
                     <SectionIcon slug={item.slug} />
                  )}
               </span>
               <span className={styles.title}>{item.title}</span>
            </div>

            {/* <p className={styles.description}>{item.description}</p> */}

            <div className={styles.bottom}>
               <span className={styles.count}>{item.count}</span>
               <svg className={styles.arrow} width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
               </svg>
            </div>
         </Link>
      </li>
   );
}

function SectionIcon({ slug }: { slug: string }) {
   switch (slug) {
      case "bystryj-start":
         return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path
                  d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
               />
            </svg>
         );
      case "balans-i-ref-programma":
         return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path
                  d="M12 1v22M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
               />
            </svg>
         );
      case "prozvon-kontaktov":
         return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path
                  d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.13.81.36 1.6.7 2.35a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.75.34 1.54.57 2.35.7A2 2 0 0122 16.92z"
                  stroke="#fff"
                  strokeWidth="2"
               />
            </svg>
         );
      case "integracii":
         return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path
                  d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
               />
               <path
                  d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"
                  stroke="#fff"
                  strokeWidth="2"
                  strokeLinecap="round"
               />
            </svg>
         );
      case "problemy-i-resheniya":
         return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <circle cx="12" cy="12" r="10" stroke="#fff" strokeWidth="2" />
               <path d="M12 8v4M12 16h.01" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
            </svg>
         );
      case "istochniki-i-optimizaciya":
      default:
         return (
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
               <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
            </svg>
         );
   }
}

export default KnowledgeMainItem;
