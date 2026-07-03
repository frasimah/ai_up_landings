import type { Metadata } from "next";
import HeadStructuredData from "@/components/HeadStructuredData/HeadStructuredData";
import PageSeoBottomContent from "@/components/PageSeoBottomContent/PageSeoBottomContent";
import SeoStructuredData from "@/components/SeoStructuredData/SeoStructuredData";
import AboutDo from "@/features/about/blocks/AboutDo/AboutDo";
import AboutHeader from "@/features/about/blocks/AboutHeader/AboutHeader";
import AboutWho from "@/features/about/blocks/AboutWho/AboutWho";
import { buildPageMetadata, getResolvedPageData } from "@/lib/pageSeo";
import { buildAboutPageStructuredData } from "@/lib/siteStructuredData";

export async function generateMetadata(): Promise<Metadata> {
   return buildPageMetadata({ route: "/about" });
}

async function About() {
   const pageData = await getResolvedPageData({ route: "/about" });
   const pageStructuredData = buildAboutPageStructuredData({
      title: pageData.title,
      description: pageData.description,
   });

   return (
      <main>
         <SeoStructuredData structuredData={pageData.seo?.structuredData} />
         <HeadStructuredData items={[pageStructuredData]} idPrefix="about-page-structured-data" />
         <AboutHeader />
         <AboutWho />
         <AboutDo />
         <PageSeoBottomContent html={pageData.bottomContentHtml} />
      </main>
   );
}

export default About;
