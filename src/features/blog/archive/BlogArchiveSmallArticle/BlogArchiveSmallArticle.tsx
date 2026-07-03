import Link from 'next/link';
import styles from './BlogArchiveSmallArticle.module.scss'
import { BlogPost } from '@/lib/blog';
import { formatDateRu } from "@/lib/date";
import Image from "next/image";

function BlogArchiveSmallArticle({ post }: { post: BlogPost }) {
   const date = formatDateRu(post.publishedAt) ?? post.publishedAt;

   return (
      <article className={styles.blog_archive_card}>
         <Link
            href={`/blog/${post.slug}`}
            className={styles.blog_archive_card_link}
            aria-labelledby={`post-title-${post.slug}`}
         />
         {/* Превью */}
         <div className={styles.blog_archive_card_thumb}>
            <Image
               src={post.coverImage}
               alt={post.title}
               fill
               sizes="(max-width: 768px) 100vw, 33vw"
               quality={75}
            />
         </div>

         {/* Контент */}
         <div className={styles.blog_archive_card_content}>
            <div className={styles.blog_archive_card_tags}>
               <div className={styles.blog_archive_card_tags_tag}>
                  {post.tags[0] ?? "Без тега"}
               </div>
            </div>
            <h3
               id={`post-title-${post.slug}`}
               className={styles.blog_archive_card_title}
            >
               {post.title}
            </h3>
            <time
               className={styles.blog_archive_card_date}
               dateTime={post.publishedAt}
            >
               {date}
            </time>
         </div>
      </article>
   );
}

export default BlogArchiveSmallArticle;
