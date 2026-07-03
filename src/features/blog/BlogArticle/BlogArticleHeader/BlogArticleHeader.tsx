import styles from './BlogArticleHeader.module.scss'
import { BlogPost } from '@/lib/blog';
import { formatDateRu } from "@/lib/date";
import Image from "next/image";

function formatDate(value: string | null | undefined) {
   return formatDateRu(value);
}

function normalizeText(value: string | null | undefined) {
   if (typeof value !== "string") return null;

   const normalized = value.trim();
   return normalized || null;
}

function BlogArticleHeader({ post }: { post: BlogPost }) {
   const metadataItems = [
      normalizeText(post.author?.name),
      formatDate(post.publishedAt),
      formatDate(post.updatedAt) ? `Обновлено: ${formatDate(post.updatedAt)}` : null,
   ].filter((item): item is string => Boolean(item));

   return (
      <div className={styles.single_header}>
         <div className={styles.single_header_thumb}>
            <Image
               src={post.coverImage}
               alt={post.title}
               width={1280}
               height={720}
               sizes="(max-width: 768px) 100vw, 1200px"
               quality={75}
            />
         </div>
         <div className={styles.single_header_tags}>
            <div className={styles.single_header_tags_tag}>
               {post.tags[0] ?? "Без тега"}
            </div>
         </div>
         <h1 className={styles.single_header_title}>
            {post.title}
         </h1>
         {metadataItems.length ? (
            <div className={styles.single_header_metadata}>
               {metadataItems.map((item) => (
                  <span key={item} className={styles.single_header_metadata_item}>
                     {item}
                  </span>
               ))}
            </div>
         ) : null}
         <div className={styles.single_header_meta}>
            <div className={styles.single_header_meta_watch}>
               <div className={styles.single_header_meta_watch_icon}>
                  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={14} viewBox="0 0 16 14" fill="none">
                     <path d="M7.99998 3.9375C7.70558 3.94203 7.41335 3.98807 7.13221 4.07422C7.26225 4.29934 7.33149 4.55353 7.33332 4.8125C7.33332 5.01359 7.29308 5.2127 7.21491 5.39848C7.13673 5.58426 7.02215 5.75307 6.87771 5.89526C6.73326 6.03745 6.56178 6.15024 6.37305 6.22719C6.18432 6.30414 5.98204 6.34375 5.77776 6.34375C5.51468 6.34195 5.25646 6.27379 5.02776 6.14578C4.84733 6.76178 4.86836 7.41805 5.08787 8.02163C5.30739 8.62521 5.71426 9.1455 6.25086 9.5088C6.78746 9.87211 7.42659 10.06 8.0777 10.0459C8.72881 10.0318 9.3589 9.81634 9.87873 9.43012C10.3986 9.04391 10.7818 8.50648 10.9741 7.89397C11.1664 7.28146 11.158 6.62492 10.9502 6.01734C10.7424 5.40976 10.3456 4.88195 9.81612 4.50867C9.28663 4.13539 8.65125 3.93557 7.99998 3.9375ZM15.9033 6.60078C14.3969 3.70754 11.4147 1.75 7.99998 1.75C4.58526 1.75 1.60221 3.70891 0.0966515 6.60105C0.0331076 6.72479 0 6.86149 0 7.00014C0 7.13878 0.0331076 7.27549 0.0966515 7.39922C1.60304 10.2925 4.58526 12.25 7.99998 12.25C11.4147 12.25 14.3978 10.2911 15.9033 7.39895C15.9669 7.27521 16 7.13851 16 6.99986C16 6.86122 15.9669 6.72451 15.9033 6.60078ZM7.99998 10.9375C5.25971 10.9375 2.74748 9.43359 1.39082 7C2.74748 4.56641 5.25943 3.0625 7.99998 3.0625C10.7405 3.0625 13.2525 4.56641 14.6092 7C13.2528 9.43359 10.7405 10.9375 7.99998 10.9375Z" fill="#9C9C9C" />
                  </svg>
               </div>
               {post.views}
            </div>
         </div>
      </div>
   );
}

export default BlogArticleHeader;
