import ArticleContentHtml from "@/components/ArticleContentHtml/ArticleContentHtml";

function BlogArticleContent({
   html,
   excerpt,
}: {
   html: string;
   excerpt: string;
}) {
   return (
      <div className="article-content-shell article-content-shell--blog">
         <ArticleContentHtml html={html} fallback={<p>{excerpt}</p>} />
      </div>
   );
}

export default BlogArticleContent;
