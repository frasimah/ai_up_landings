import BlogArchiveTags from '../BlogArchiveTags/BlogArchiveTags';
import styles from './BlogArchiveHeader.module.scss'

function BlogArchiveHeader({
   tags,
   activeTag,
}: {
   tags: string[];
   activeTag: string;
}) {
   return (
      <div className={styles.blog_archive_header}>
         <h1 className={styles.blog_archive_header_title}>
            Блог
         </h1>
         <BlogArchiveTags tags={tags} activeTag={activeTag} />
      </div>
   );
}

export default BlogArchiveHeader;
