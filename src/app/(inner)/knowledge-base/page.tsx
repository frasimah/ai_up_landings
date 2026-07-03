import type { Metadata } from "next";
import HeadStructuredData from "@/components/HeadStructuredData/HeadStructuredData";
import PageSeoBottomContent from "@/components/PageSeoBottomContent/PageSeoBottomContent";
import SeoStructuredData from "@/components/SeoStructuredData/SeoStructuredData";
import KnowledgeMain from "@/features/knowledge/KnowledgeMain/KnowledgeMain";
import { getAllArticles, getRootSections, getSections, type Section } from "@/lib/knowledge";
import { buildPageMetadata, getResolvedPageData } from "@/lib/pageSeo";
import { buildKnowledgeBaseStructuredData } from "@/lib/siteStructuredData";

function getArticlesNoun(count: number): string {
   const abs = Math.abs(count);
   const lastTwo = abs % 100;
   const last = abs % 10;

   if (lastTwo >= 11 && lastTwo <= 14) return "\u0441\u0442\u0430\u0442\u0435\u0439";
   if (last === 1) return "\u0441\u0442\u0430\u0442\u044c\u044f";
   if (last >= 2 && last <= 4) return "\u0441\u0442\u0430\u0442\u044c\u0438";
   return "\u0441\u0442\u0430\u0442\u0435\u0439";
}

function stripHtml(html: string): string {
   return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

type KnowledgeBasePageProps = {
   searchParams: Promise<{ search?: string | string[] }>;
};

function resolveSearchValue(value?: string | string[]) {
   if (typeof value === "string") {
      return value;
   }

   if (Array.isArray(value)) {
      return value.find((item) => typeof item === "string") ?? "";
   }

   return "";
}

async function KnowledgeBase({ searchParams }: KnowledgeBasePageProps) {
   const pageData = await getResolvedPageData({ route: "/knowledge-base" });
   const pageStructuredData = buildKnowledgeBaseStructuredData({
      title: pageData.title,
      description: pageData.description,
   });
   const resolvedSearchParams = await searchParams;
   const initialSearchValue = resolveSearchValue(resolvedSearchParams.search);
   const [sections, rootSections, articles] = await Promise.all([getSections(), getRootSections(), getAllArticles()]);

   const countArticlesInTree = (section: Section): number => {
      const ownCount = articles.filter((article) => article.sectionSlug === section.slug).length;
      const children = sections.filter((candidate) => candidate.parentSlug === section.slug);
      const childrenCount = children.reduce((acc, child) => acc + countArticlesInTree(child), 0);
      return ownCount + childrenCount;
   };

   const items = rootSections.map((section) => {
      const articlesCount = countArticlesInTree(section);

      return {
         slug: section.slug,
         title: section.title,
         description: section.description?.trim() || stripHtml(section.descriptionHtml),
         count: `${articlesCount} ${getArticlesNoun(articlesCount)}`,
         link: `/knowledge-base/${section.slug}`,
         variant: section.variant ?? "default",
         iconBg: section.iconBg ?? "#0f172a",
         iconUrl: section.iconUrl ?? null,
      };
   });

   return (
      <main>
         <SeoStructuredData structuredData={pageData.seo?.structuredData} />
         <HeadStructuredData items={[pageStructuredData]} idPrefix="knowledge-base-page-structured-data" />
         <section className="knowledge_base">
            <div className="container">
               <KnowledgeMain items={items} initialSearchValue={initialSearchValue} />
            </div>
         </section>
         <PageSeoBottomContent html={pageData.bottomContentHtml} />
      </main>
   );
}

export async function generateMetadata(): Promise<Metadata> {
   return buildPageMetadata({ route: "/knowledge-base" });
}

export default KnowledgeBase;
