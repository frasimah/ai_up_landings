import SeoStructuredData from "@/components/SeoStructuredData/SeoStructuredData";
import ArticleContentHtml from "@/components/ArticleContentHtml/ArticleContentHtml";
import Link from "next/link";
import KnowledgeSingleArticleContent from "@/features/knowledge/KnowledgeSingleArticle/KnowledgeSingleArticleTItle/KnowledgeSingleArticleContent/KnowledgeSingleArticleContent";
import KnowledgeSingleArticleTItle from "@/features/knowledge/KnowledgeSingleArticle/KnowledgeSingleArticleTItle/KnowledgeSingleArticleTItle";
import { getArticlesBySection, getChildSections, getSectionBySlug } from "@/lib/knowledge";
import { buildMetadata } from "@/lib/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

function stripHtml(html: string) {
   return html
      .replace(/<[^>]*>/g, " ")
      .replace(/\s+/g, " ")
      .trim();
}

export async function generateMetadata({
   params,
}: {
   params: Promise<{ sectionSlug: string }>;
}): Promise<Metadata> {
   const { sectionSlug } = await params;
   const section = await getSectionBySlug(sectionSlug);

   if (!section) {
      return buildMetadata({
         fallbackTitle: "Раздел базы знаний",
         fallbackDescription: "Раздел базы знаний Ai-UP.",
         path: `/knowledge-base/${sectionSlug}`,
      });
   }

   const rawDescription = stripHtml(section.descriptionHtml || "");
   const fallbackDescription = rawDescription || `${section.title}. Раздел базы знаний Ai-UP.`;

   return buildMetadata({
      seo: section.seo,
      fallbackTitle: section.title,
      fallbackDescription,
      path: `/knowledge-base/${section.slug}`,
   });
}

export default async function SectionHome({
   params,
}: {
   params: Promise<{ sectionSlug: string }>;
}) {
   const { sectionSlug } = await params;

   const section = await getSectionBySlug(sectionSlug);
   if (!section) notFound();

   const childSections = await getChildSections(sectionSlug);
   const articles = await getArticlesBySection(sectionSlug);
   const sectionLinks =
      childSections.length > 0
         ? childSections.map((child) => ({
              href: `/knowledge-base/${child.slug}`,
              title: child.title,
            }))
         : articles.map((article) => ({
              href: `/knowledge-base/${sectionSlug}/${article.slug}`,
              title: article.title,
            }));

   if (sectionLinks.length === 0) notFound();

   return (
      <article className="knowledge_single_article">
         <SeoStructuredData structuredData={section.seo?.structuredData} />
         <KnowledgeSingleArticleTItle sectiontitle={section.title} />
         <KnowledgeSingleArticleContent>
            {section.descriptionHtml ? <ArticleContentHtml html={section.descriptionHtml} /> : null}
            <div className="article-content">
               <ul>
                  {sectionLinks.map((item) => (
                     <li key={item.href}>
                        <Link href={item.href}>{item.title}</Link>
                     </li>
                  ))}
               </ul>
            </div>
         </KnowledgeSingleArticleContent>
      </article>
   );
}
