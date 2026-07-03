import type { Metadata } from "next";
import PageSeoBottomContent from "@/components/PageSeoBottomContent/PageSeoBottomContent";
import SeoStructuredData from "@/components/SeoStructuredData/SeoStructuredData";
import AiFlowDo from "@/features/aiflow/blocks/AiFlowDo/AiFlowDo";
import AiFlowExample from "@/features/aiflow/blocks/AiFlowExample/AiFlowExample";
import AiFlowFirst from "@/features/aiflow/blocks/AiFlowFirst/AiFlowFirst";
import AiFlowGood from "@/features/aiflow/blocks/AiFlowGood/AiFlowGood";
import AiFlowLayers from "@/features/aiflow/blocks/AiFlowLayers/AiFlowLayers";
import AiFlowOpti from "@/features/aiflow/blocks/AiFlowOpti/AiFlowOpti";
import AiFlowSee from "@/features/aiflow/blocks/AiFlowSee/AiFlowSee";
import AiFlowWork from "@/features/aiflow/blocks/AiFlowWork/AiFlowWork";
import HomeReg from "@/features/home/blocks/HomeReg/HomeReg";
import RegBlock from "@/features/other/RegBlock/RegBlock";
import { buildPageMetadata, getResolvedPageData } from "@/lib/pageSeo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ route: "/ai-flow" });
}

export default async function AiFlow() {
  const pageData = await getResolvedPageData({ route: "/ai-flow" });

  return (
    <main>
      <SeoStructuredData structuredData={pageData.seo?.structuredData} />
      <AiFlowFirst />
      {/* <AiFlowWork /> */}
      <AiFlowLayers />
      <AiFlowOpti />
      <AiFlowGood />
      <AiFlowDo />
      <AiFlowSee />
      <AiFlowExample />
      <RegBlock
        title="Если хотите улучшать качество источников каждый день — включите Ai Flow и позвольте системе сделать работу за вас"
        btnText="Включить Ai Flow"
      />
      <PageSeoBottomContent html={pageData.bottomContentHtml} />
    </main>
  );
}
