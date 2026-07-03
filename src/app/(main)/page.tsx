import type { Metadata } from "next";
import HeadStructuredData from "@/components/HeadStructuredData/HeadStructuredData";
import PageSeoBottomContent from "@/components/PageSeoBottomContent/PageSeoBottomContent";
import SeoStructuredData from "@/components/SeoStructuredData/SeoStructuredData";
import HomeCalculator from "@/features/home/blocks/HomeCalculator/HomeCalculator";
import HomeCallCenter from "@/features/home/blocks/HomeCallCenter/HomeCallCenter";
import HomeCrm from "@/features/home/blocks/HomeCrm/HomeCrm";
import HomeEffective from "@/features/home/blocks/HomeEffective/HomeEffective";
import HomeFirst from "@/features/home/blocks/HomeFirst/HomeFirst";
import HomeFlow from "@/features/home/blocks/HomeFlow/HomeFlow";
import HomeGetContact from "@/features/home/blocks/HomeGetContact/HomeGetContact";
import HomeHowItWork from "@/features/home/blocks/HomeHowItWork/HomeHowItWork";
import HomeNumbers from "@/features/home/blocks/HomeNumbers/HomeNumbers";
import HomePartners from "@/features/home/blocks/HomePartners/HomePartners";
import HomePercent from "@/features/home/blocks/HomePercent/HomePercent";
import HomeReferral from "@/features/home/blocks/HomeReferral/HomeReferral";
import HomeReg from "@/features/home/blocks/HomeReg/HomeReg";
import HomeSecurity from "@/features/home/blocks/HomeSecurity/HomeSecurity";
import { buildPageMetadata, getResolvedPageData } from "@/lib/pageSeo";
import { buildHomePageStructuredData } from "@/lib/siteStructuredData";
import HomeRec from "@/features/home/blocks/HomeRec/HomeRec";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ route: "/" });
}

export default async function Home() {
  const pageData = await getResolvedPageData({ route: "/" });
  const pageStructuredData = buildHomePageStructuredData({
    title: pageData.title,
    description: pageData.description,
  });

  return (
    <main>
      <SeoStructuredData structuredData={pageData.seo?.structuredData} />
      <HeadStructuredData items={[pageStructuredData]} idPrefix="home-page-structured-data" />
      <HomeFirst />
      <HomeHowItWork />
      <HomePercent />
      <HomeGetContact />
      <HomeCallCenter />
      <HomeFlow />
      <HomeReg />
      <HomeEffective />
      <HomeCalculator />
      <HomeCrm />
      <HomeSecurity />
      <HomeReferral />
      <HomeRec />
      <HomeNumbers />
      <PageSeoBottomContent html={pageData.bottomContentHtml} />
    </main>
  );
}
