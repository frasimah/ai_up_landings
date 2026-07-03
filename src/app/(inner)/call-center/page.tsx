import type { Metadata } from "next";
import HeadStructuredData from "@/components/HeadStructuredData/HeadStructuredData";
import PageSeoBottomContent from "@/components/PageSeoBottomContent/PageSeoBottomContent";
import SeoStructuredData from "@/components/SeoStructuredData/SeoStructuredData";
import CallCenterCases from "@/features/call-center/blocks/CallCenterCases/CallCenterCases";
import CallCenterChain from "@/features/call-center/blocks/CallCenterChain/CallCenterChain";
import CallCenterCost from "@/features/call-center/blocks/CallCenterCost/CallCenterCost";
import CallCenterCta from "@/features/call-center/blocks/CallCenterCta/CallCenterCta";
import CallCenterCtaBanner from "@/features/call-center/blocks/CallCenterCtaBanner/CallCenterCtaBanner";
import CallCenterEnabled from "@/features/call-center/blocks/CallCenterEnabled/CallCenterEnabled";
import CallCenterFirst from "@/features/call-center/blocks/CallCenterFirst/CallCenterFirst";
import CallCenterIncluded from "@/features/call-center/blocks/CallCenterIncluded/CallCenterIncluded";
import CallCenterLegal from "@/features/call-center/blocks/CallCenterLegal/CallCenterLegal";
import CallCenterPlatform from "@/features/call-center/blocks/CallCenterPlatform/CallCenterPlatform";
import CallCenterPositioning from "@/features/call-center/blocks/CallCenterPositioning/CallCenterPositioning";
import CallCenterRoi from "@/features/call-center/blocks/CallCenterRoi/CallCenterRoi";
import CallCenterSenior from "@/features/call-center/blocks/CallCenterSenior/CallCenterSenior";
import CallCenterSources from "@/features/call-center/blocks/CallCenterSources/CallCenterSources";
import CallCenterTimeline from "@/features/call-center/blocks/CallCenterTimeline/CallCenterTimeline";
import CallCenterTransparency from "@/features/call-center/blocks/CallCenterTransparency/CallCenterTransparency";
import { buildPageMetadata, getResolvedPageData } from "@/lib/pageSeo";
import { buildCallCenterPageStructuredData } from "@/lib/siteStructuredData";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ route: "/call-center" });
}

export default async function CallCenter() {
  const pageData = await getResolvedPageData({ route: "/call-center" });
  const pageStructuredData = buildCallCenterPageStructuredData({
    title: pageData.title,
    description: pageData.description,
  });

  return (
    <main className="cc-page">
      <SeoStructuredData structuredData={pageData.seo?.structuredData} />
      <HeadStructuredData items={[pageStructuredData]} idPrefix="call-center-page-structured-data" />
      <CallCenterFirst />
      <CallCenterPositioning />
      <CallCenterTimeline />
      <CallCenterSources />
      <CallCenterCta />
      <CallCenterPlatform />
      <CallCenterTransparency />
      <CallCenterSenior />
      <CallCenterIncluded />
      <CallCenterCases />
      <CallCenterCtaBanner
        label="11 CTA источники"
        title="Не уверены, какие источники подойдут вашей нише?"
        lead="Маркетолог AI-UP подберёт микс на бесплатном аудите"
        button="Подобрать источники под нишу"
        variant="centered"
      />
      <CallCenterChain />
      <CallCenterEnabled />
      <CallCenterCost />
      <CallCenterRoi />
      <CallCenterLegal />
      <PageSeoBottomContent html={pageData.bottomContentHtml} collapsible />
    </main>
  );
}
