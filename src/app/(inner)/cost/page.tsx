import type { Metadata } from "next";
import HeadStructuredData from "@/components/HeadStructuredData/HeadStructuredData";
import PageSeoBottomContent from "@/components/PageSeoBottomContent/PageSeoBottomContent";
import SeoStructuredData from "@/components/SeoStructuredData/SeoStructuredData";
import CostBlack from "@/features/cost/blocks/CostBlack/CostBlack";
import CostCheaper from "@/features/cost/blocks/CostCheaper/CostCheaper";
import CostFirst from "@/features/cost/blocks/CostFirst/CostFirst";
import CostIncluded from "@/features/cost/blocks/CostIncluded/CostIncluded";
import CostPurchase from "@/features/cost/blocks/CostPurchase/CostPurchaseVipSection";
import CostSavings from "@/features/cost/blocks/CostSavings/CostSavings";
import CostWork from "@/features/cost/blocks/CostWork/CostWork";
import HomeCalculator from "@/features/home/blocks/HomeCalculator/HomeCalculator";
import RegBlock from "@/features/other/RegBlock/RegBlock";
import { buildPageMetadata, getResolvedPageData } from "@/lib/pageSeo";
import { buildCostPageStructuredData } from "@/lib/siteStructuredData";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ route: "/cost" });
}

export default async function ReferralProgram() {
  const pageData = await getResolvedPageData({ route: "/cost" });
  const pageStructuredData = buildCostPageStructuredData({
    title: pageData.title,
    description: pageData.description,
  });

  return (
    <main>
      <SeoStructuredData structuredData={pageData.seo?.structuredData} />
      <HeadStructuredData items={[pageStructuredData]} idPrefix="cost-page-structured-data" />
      <CostFirst />
      <CostIncluded titleSection="Что входит в стоимость идентификации" />
      <HomeCalculator />
      <CostPurchase />
      <CostWork />
      <CostBlack />
      <CostCheaper />
      <CostSavings />
      <RegBlock
        title="Начните с любого объёма - и уже завтра увидите, сколько стоит настоящий, «вчерашний» спрос в вашей нише"
        btnText="Пополнить баланс"
        bg="black"
        isPaddingTop={true}
      />
      <PageSeoBottomContent html={pageData.bottomContentHtml} />
    </main>
  );
}
