import KnowledgeNav from "@/features/knowledge/KnowledgeNav/KnowledgeNav";
import KnowledgeSticky from "@/features/knowledge/KnowledgeSticky/KnowledgeSticky";
import { getAllArticles, getSectionBySlug, getSections } from "@/lib/knowledge";
import { notFound } from "next/navigation";
import styles from "./layout.module.scss";

export default async function SectionLayout({
   children,
   params,
}: {
   children: React.ReactNode;
   params: Promise<{ sectionSlug: string }>;
}) {
   const { sectionSlug } = await params;

   const [section, sections, articles] = await Promise.all([
      getSectionBySlug(sectionSlug),
      getSections(),
      getAllArticles(),
   ]);

   if (!section) notFound();

   const navigationModules = sections.map((item) => {
      const childSectionLinks = sections
         .filter((candidate) => candidate.parentSlug === item.slug)
         .map((child) => ({
            href: `/knowledge-base/${child.slug}`,
            title: child.title,
         }));

      const articleLinks = articles
         .filter((article) => article.sectionSlug === item.slug)
         .map((article) => ({
            href: `/knowledge-base/${item.slug}/${article.slug}`,
            title: article.title,
         }));

      return {
         slug: item.slug,
         title: item.title,
         links: [...childSectionLinks, ...articleLinks],
      };
   });

   return (
      <div className="knowledge_single">
         <div className="container">
            <div className="knowledge_single_wrap row" data-knowledge-sticky-boundary>
               <div className={`col-xl-4 ${styles.sidebarCol}`}>
                  <KnowledgeSticky offsetTop={120}>
                     <aside className={styles.sidebarSticky}>
                        <KnowledgeNav modules={navigationModules} />
                     </aside>
                  </KnowledgeSticky>
               </div>
               <div className="offset-xl-1 col-xl-7">
                  <main>{children}</main>
               </div>
            </div>
         </div>
      </div>
   );
}
