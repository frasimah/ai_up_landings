import type { Metadata } from "next";
import PageSeoBottomContent from "@/components/PageSeoBottomContent/PageSeoBottomContent";
import SeoStructuredData from "@/components/SeoStructuredData/SeoStructuredData";
import BlogArchivePage from "@/features/blog/archive/BlogArchivePage/BlogArchivePage";
import {
   getArchiveBlogCategories,
   getArchiveBlogPosts,
   getBlogArchiveSeoCopy,
   resolveArchiveCategorySlug,
} from "@/lib/blogArchive";
import { buildPageMetadata, getResolvedPageData } from "@/lib/pageSeo";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

export async function generateMetadata({
   params,
}: {
   params: Promise<{ tag: string }>;
}): Promise<Metadata> {
   const { tag } = await params;
   const categories = await getArchiveBlogCategories();
   const resolvedCategorySlug = resolveArchiveCategorySlug(tag, categories);
   const categoryCopy = getBlogArchiveSeoCopy(resolvedCategorySlug);

   return buildPageMetadata({
      route: "/blog/tag/[tag]",
      path: `/blog/tag/${resolvedCategorySlug ?? tag}`,
      fallbackTitle: categoryCopy.title,
      fallbackDescription: categoryCopy.description,
   });
}

export default async function Tag({
   params,
}: {
   params: Promise<{ tag: string }>;
}) {
   const { tag } = await params;
   const [posts, categories] = await Promise.all([getArchiveBlogPosts(), getArchiveBlogCategories()]);
   const resolvedCategorySlug = resolveArchiveCategorySlug(tag, categories);
   if (!resolvedCategorySlug) notFound();
   const categoryCopy = getBlogArchiveSeoCopy(resolvedCategorySlug);
   const [pageData, blogRootPageData] = await Promise.all([
      getResolvedPageData({
         route: "/blog/tag/[tag]",
         path: `/blog/tag/${resolvedCategorySlug}`,
         fallbackTitle: categoryCopy.title,
         fallbackDescription: categoryCopy.description,
      }),
      getResolvedPageData({ route: "/blog" }),
   ]);

   return (
      <main>
         <SeoStructuredData structuredData={pageData.seo?.structuredData} />
         <section className="blog_archive">
            <div className="container">
               <div className="blog_archive_wrap">
                  <BlogArchivePage
                     posts={posts}
                     categories={categories}
                     allDescription={blogRootPageData.description}
                     allTitle={blogRootPageData.title}
                     initialCategorySlug={resolvedCategorySlug}
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
