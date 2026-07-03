import ArticleContentHtml from "@/components/ArticleContentHtml/ArticleContentHtml";
import PageReadingProgress from "@/components/PageReadingProgress/PageReadingProgress";
import SeoStructuredData from "@/components/SeoStructuredData/SeoStructuredData";
import KnowledgeSingleArticleContent from "@/features/knowledge/KnowledgeSingleArticle/KnowledgeSingleArticleTItle/KnowledgeSingleArticleContent/KnowledgeSingleArticleContent";
import KnowledgeSingleArticleTItle from "@/features/knowledge/KnowledgeSingleArticle/KnowledgeSingleArticleTItle/KnowledgeSingleArticleTItle";
import { buildFaqSchema, extractFaqFromArticleHtml } from "@/lib/faq";
import { getArticle, getSectionBySlug } from "@/lib/knowledge";
import { buildArticleSchema, buildBreadcrumbListSchema } from "@/lib/schema";
import { buildMetadata, resolveCanonicalUrl } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export async function generateMetadata({
   params,
}: {
   params: Promise<{ sectionSlug: string; articleSlug: string }>;
}): Promise<Metadata> {
   const { sectionSlug, articleSlug } = await params;
   const article = await getArticle(sectionSlug, articleSlug);
   const section = await getSectionBySlug(sectionSlug);

   if (!article) {
      return buildMetadata({
         fallbackTitle: "Материал базы знаний",
         fallbackDescription: "Статья из базы знаний Ai-UP.",
         path: `/knowledge-base/${sectionSlug}/${articleSlug}`,
         fallbackType: "article",
      });
   }

   return buildMetadata({
      seo: article.seo,
      fallbackTitle: article.title,
      fallbackDescription: section?.title
         ? `${section.title}. Материал базы знаний Ai-UP.`
         : "Статья из базы знаний Ai-UP.",
      path: `/knowledge-base/${sectionSlug}/${article.slug}`,
      fallbackType: "article",
   });
}

export default async function ArticlePage({
   params,
}: {
   params: Promise<{ sectionSlug: string; articleSlug: string }>;
}) {
   const contentId = "knowledge-article-content";
   const { sectionSlug, articleSlug } = await params;

   const section = await getSectionBySlug(sectionSlug);
   const article = await getArticle(sectionSlug, articleSlug);

   if (!section || !article) notFound();

   const faqSchema = buildFaqSchema(extractFaqFromArticleHtml(article.contentHtml));
   const canonicalURL = resolveCanonicalUrl({
      seo: article.seo,
      path: `/knowledge-base/${sectionSlug}/${article.slug}`,
   });
   const articleSchema = buildArticleSchema({
      title: article.title,
      description: article.seo?.metaDescription,
      publishedAt: article.publishedAt,
      updatedAt: article.updatedAt,
      author: article.author,
      canonicalURL,
   });
   const breadcrumbSchema = buildBreadcrumbListSchema([
      {
         name: "База знаний",
         item: resolveCanonicalUrl({ path: "/knowledge-base" }) ?? "",
      },
      {
         name: section.title,
         item: resolveCanonicalUrl({ path: `/knowledge-base/${sectionSlug}` }) ?? "",
      },
      {
         name: article.title,
         item: canonicalURL ?? "",
      },
   ]);

   return (
      <main>
         <PageReadingProgress targetId={contentId} />
         <article className="knowledge_single_article">
            <SeoStructuredData structuredData={article.seo?.structuredData} />
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
            {breadcrumbSchema ? (
               <script
                  type="application/ld+json"
                  dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
               />
            ) : null}
            <KnowledgeSingleArticleTItle
               sectiontitle={article.title}
               breadcrumbs={[
                  {
                     label: "База знаний",
                     href: "/knowledge-base",
                  },
                  {
                     label: section.title,
                     href: `/knowledge-base/${sectionSlug}`,
                  },
               ]}
               author={article.author}
               publishedAt={article.publishedAt}
               updatedAt={article.updatedAt}
               readTime={article.readTime}
               reviewer={article.reviewer}
            />
            <KnowledgeSingleArticleContent id={contentId}>
               <ArticleContentHtml
                  html={article.contentHtml}
                  fallback={<p>Контент статьи пока не заполнен.</p>}
               />
            </KnowledgeSingleArticleContent>

         </article>
      </main>
   );
}
