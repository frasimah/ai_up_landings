import Link from 'next/link';
import styles from './BlogArchiveBigArticle.module.scss'
import { BlogPost } from '@/lib/blog';
import Image from "next/image";

function BlogArchiveBigArticle({ post }: { post: BlogPost }) {
   return (
      <article className={styles.blog_archive_card_big}>
         <Link
            href={`/blog/${post.slug}`}
            className={styles.blog_archive_card_big_link}
            aria-labelledby={`post-title-${post.slug}`}
         />
         {/* Превью */}
         <div className={styles.blog_archive_card_big_thumb}>
            <Image
               src={post.coverImage}
               alt={post.title}
               fill
               sizes="(max-width: 768px) 100vw, 92vw"
               quality={75}
            />
         </div>
         {/* Контент */}
         <div className={styles.blog_archive_card_big_content}>
            <div className={styles.blog_archive_card_big_tags}>
               <div className={styles.blog_archive_card_big_tags_tag}>
                  {post.tags[0] ?? "Без тега"}
               </div>
            </div>
            <h3
               id={`post-title-${post.slug}`}
               className={styles.blog_archive_card_big_title}
            >
               {post.title}
            </h3>
         </div>
      </article>
   );
}

export default BlogArchiveBigArticle;
