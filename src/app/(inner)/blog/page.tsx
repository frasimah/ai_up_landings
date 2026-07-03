import type { Metadata } from "next";
import PageSeoBottomContent from "@/components/PageSeoBottomContent/PageSeoBottomContent";
import SeoStructuredData from "@/components/SeoStructuredData/SeoStructuredData";
import BlogArchivePage from "@/features/blog/archive/BlogArchivePage/BlogArchivePage";
import { getArchiveBlogCategories, getArchiveBlogPosts } from "@/lib/blogArchive";
import { buildPageMetadata, getResolvedPageData } from "@/lib/pageSeo";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
   return buildPageMetadata({ route: "/blog" });
}

export default async function Blog() {
   const pageData = await getResolvedPageData({ route: "/blog" });
   const [posts, categories] = await Promise.all([getArchiveBlogPosts(), getArchiveBlogCategories()]);

   return (
      <main>
         <SeoStructuredData structuredData={pageData.seo?.structuredData} />
         <section className="blog_archive">
            <div className="container">
               <div className="blog_archive_wrap">
                  <BlogArchivePage
                     posts={posts}
                     categories={categories}
                     allDescription={pageData.description}
                     allTitle={pageData.title}
                     initialDescription={pageData.description}
                     initialTitle={pageData.title}
                  />
               </div>
            </div>
         </section>
         <PageSeoBottomContent html={pageData.bottomContentHtml} />
      </main>
   );
}
