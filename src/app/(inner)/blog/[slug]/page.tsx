import BlogArticleViewTracker from "@/features/blog/BlogArticle/BlogArticleViewTracker";
import BlogArticlePage from "@/features/blog/article-page/BlogArticlePage";
import SeoStructuredData from "@/components/SeoStructuredData/SeoStructuredData";
import { getArchiveBlogArticleData, getArchiveBlogPostBySlug } from "@/lib/blogArchive";
import { buildFaqSchema, extractFaqFromArticleHtml } from "@/lib/faq";
import { buildArticleSchema } from "@/lib/schema";
import { buildMetadata, resolveCanonicalUrl } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = {
   params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
   const { slug } = await params;
   const article = await getArchiveBlogPostBySlug(slug);
   if (!article) {
      return buildMetadata({
         fallbackTitle: "Статья блога",
         fallbackDescription: "Материал из блога Ai-UP.",
         path: `/blog/${slug}`,
         fallbackType: "article",
      });
   }

   return buildMetadata({
      seo: article.seo,
      fallbackTitle: article.title,
      fallbackDescription: article.excerpt || "Материал из блога Ai-UP.",
      path: `/blog/${article.slug}`,
      fallbackType: "article",
   });
}

export default async function ArticlePage({ params }: Props) {
   const { slug } = await params;
   const articleData = await getArchiveBlogArticleData(slug);
   if (!articleData) notFound();

   const { post, related, authorArticles, popular } = articleData;
   const canonicalURL = resolveCanonicalUrl({
      seo: post.seo,
      path: `/blog/${post.slug}`,
   });
   const faqSchema = buildFaqSchema(extractFaqFromArticleHtml(post.contentHtml));
   const articleSchema = buildArticleSchema({
      title: post.title,
      description: post.seo?.metaDescription,
      image: post.coverImage,
      publishedAt: post.publishedAt,
      updatedAt: post.updatedAt,
      author: post.author,
      canonicalURL,
   });

   return (
      <main>
         <article className="single">
            <SeoStructuredData structuredData={post.seo?.structuredData} />
            {faqSchema ? (
               <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
               />
            ) : null}
            {articleSchema ? (
               <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
               />
            ) : null}
            <div className="container">
               <BlogArticleViewTracker slug={slug} />
               <BlogArticlePage
                  post={post}
                  related={related}
                  authorArticles={authorArticles}
                  popular={popular}
               />
            </div>
         </article>
      </main>
   );
}
