import Link from "next/link";
import styles from './KnowledgeSingleArticleTItle.module.scss'
import type { AuthorSummary } from "@/lib/strapi";

type BreadcrumbItem = {
   label: string;
   href?: string;
};

type props = {
   sectiontitle?: string;
   articleTitle?: string;
   breadcrumbs?: BreadcrumbItem[];
   author?: AuthorSummary | null;
   publishedAt?: string | null;
   updatedAt?: string | null;
   readTime?: number | null;
   reviewer?: string | null;
   className?: string;
}

function formatDate(value?: string | null) {
   if (!value) return null;

   const date = new Date(value);
   if (Number.isNaN(date.getTime())) return null;

   return new Intl.DateTimeFormat("ru-RU", {
      day: "numeric",
      month: "long",
      year: "numeric",
   }).format(date);
}

function normalizeText(value?: string | null) {
   const trimmed = value?.trim();
   return trimmed ? trimmed : null;
}

function KnowledgeSingleArticleTItle({
   sectiontitle,
   articleTitle,
   breadcrumbs,
   author,
   publishedAt,
   updatedAt,
   readTime,
   reviewer,
   className,
}: props) {
   const publishedLabel = formatDate(publishedAt);
   const updatedLabel = formatDate(updatedAt);
   const authorName = normalizeText(author?.name);
   const reviewerLabel = normalizeText(reviewer);
   const metadataItems = [
      authorName,
      publishedLabel,
      updatedLabel ? `Обновлено: ${updatedLabel}` : null,
      Number.isFinite(readTime) && readTime && readTime > 0 ? `${readTime} мин чтения` : null,
   ].filter((item): item is string => Boolean(item));

   return (
      <div className={[styles.knowledge_single_article_head, className].filter(Boolean).join(" ")}>
         {breadcrumbs?.length ? (
            <nav className={styles.knowledge_single_article_breadcrumbs} aria-label="Хлебные крошки">
               {breadcrumbs.map((item, index) => (
                  <span key={`${item.label}-${index}`} className={styles.knowledge_single_article_breadcrumb_item}>
                     {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
                  </span>
               ))}
            </nav>
         ) : null}

         {sectiontitle ? (
            <h1 className={styles.knowledge_single_article_title}>
               {sectiontitle}
            </h1>
         ) : null}

         {articleTitle ? (
            <h2 className={styles.knowledge_single_article_subtitle}>
               {articleTitle}
            </h2>
         ) : null}

         {metadataItems.length > 0 ? (
            <div className={styles.knowledge_single_article_meta} aria-label="Метаданные статьи">
               {metadataItems.map((item, index) => (
                  <span key={`${item}-${index}`} className={styles.knowledge_single_article_meta_item}>
                     {item}
                  </span>
               ))}
            </div>
         ) : null}

         {reviewerLabel ? (
            <p className={styles.knowledge_single_article_reviewer}>
               Проверил: {reviewerLabel}
            </p>
         ) : null}
      </div>
   );
}

export default KnowledgeSingleArticleTItle;
