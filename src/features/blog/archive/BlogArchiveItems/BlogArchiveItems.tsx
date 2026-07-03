import BlogArchiveBigArticle from '../BlogArchiveBigArticle/BlogArchiveBigArticle';
import BlogArchiveSmallArticle from '../BlogArchiveSmallArticle/BlogArchiveSmallArticle';
import styles from './BlogArchiveItems.module.scss'
import { BlogPost } from '@/lib/blog';

function BlogArchiveItems({ posts }: { posts: BlogPost[] }) {
   if (!posts.length) return null;

   const [mainPost, ...restPosts] = posts;

   return (
      <div className={`row ${styles.blog_archive_wrap_tags_list}`}>
         <div className="col-xl-4 col-md-6">
            <BlogArchiveSmallArticle post={mainPost} />
         </div>
         {restPosts.map((post) => (
            <div className="col-xl-4 col-md-6" key={post.slug}>
               <BlogArchiveSmallArticle post={post} />
            </div>
         ))}
      </div>
   );
}

export default BlogArchiveItems;
