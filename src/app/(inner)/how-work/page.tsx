import type { Metadata } from "next";
import HeadStructuredData from "@/components/HeadStructuredData/HeadStructuredData";
import PageSeoBottomContent from "@/components/PageSeoBottomContent/PageSeoBottomContent";
import SeoStructuredData from "@/components/SeoStructuredData/SeoStructuredData";
import AiFlowDo from "@/features/aiflow/blocks/AiFlowDo/AiFlowDo";
import HowWorkBlack from "@/features/how-work/blocks/HowWorkBlack/HowWorkBlack";
import HowWorkChannel from "@/features/how-work/blocks/HowWorkChannel/HowWorkChannel";
import HowWorkFirst from "@/features/how-work/blocks/HowWorkFirst/HowWorkFirst";
import HowWorkLimits from "@/features/how-work/blocks/HowWorkLimits/HowWorkLimits";
import HowWorkSource from "@/features/how-work/blocks/HowWorkSource/HowWorkSource";
import HowWorkTypes from "@/features/how-work/blocks/HowWorkTypes/HowWorkTypes";
import HowWorkWhy from "@/features/how-work/blocks/HowWorkWhy/HowWorkWhy";
import RegBlock from "@/features/other/RegBlock/RegBlock";
import { buildPageMetadata, getResolvedPageData } from "@/lib/pageSeo";
import { buildHowWorkPageStructuredData } from "@/lib/siteStructuredData";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ route: "/how-work" });
}

export default async function HowWork() {
  const pageData = await getResolvedPageData({ route: "/how-work" });
  const pageStructuredData = buildHowWorkPageStructuredData({
    title: pageData.title,
    description: pageData.description,
  });

  return (
    <main>
      <SeoStructuredData structuredData={pageData.seo?.structuredData} />
      <HeadStructuredData items={[pageStructuredData]} idPrefix="how-work-page-structured-data" />
      <HowWorkFirst />
      <HowWorkSource />
      <HowWorkTypes />
      <HowWorkChannel />
      <AiFlowDo
        title="Что делает Ai Flow"
        description="Если вы не хотите сами разбираться, какие источники работают лучше, а какие хуже — включаете Ai Flow"
        message="Вы просто следите за результатом — система сама принимает решения"
      />
      <HowWorkLimits />
      <HowWorkBlack />
      <HowWorkWhy />
      <RegBlock
        title="Создайте первый источник и уже завтра получите контакты людей и компаний, проявивших интерес вчера"
        btnText="Зарегистрироваться"
      />
      <PageSeoBottomContent html={pageData.bottomContentHtml} collapsible />
    </main>
  );
}
