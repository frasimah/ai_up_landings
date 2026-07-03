import type { Metadata } from "next";
import PageSeoBottomContent from "@/components/PageSeoBottomContent/PageSeoBottomContent";
import SeoStructuredData from "@/components/SeoStructuredData/SeoStructuredData";
import ReferralBonus from "@/features/blocks/ReferralBonus/ReferralBonus";
import ReferralEarn from "@/features/blocks/ReferralEarn/ReferralEarn";
import ReferralFirst from "@/features/blocks/ReferralFirst/ReferralFirst";
import ReferralMoney from "@/features/blocks/ReferralMoney/ReferralMoney";
import ReferralOffice from "@/features/blocks/ReferralOffice/ReferralOffice";
import ReferralPartners from "@/features/blocks/ReferralPartners/ReferralPartners";
import ReferralWork from "@/features/blocks/ReferralWork/ReferralWork";
import { buildPageMetadata, getResolvedPageData } from "@/lib/pageSeo";

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ route: "/referral-programm" });
}

export default async function ReferralProgram() {
  const pageData = await getResolvedPageData({ route: "/referral-programm" });

  return (
    <main>
      <SeoStructuredData structuredData={pageData.seo?.structuredData} />
      <ReferralFirst />
      <ReferralPartners />
      <ReferralWork />
      <ReferralEarn />
      <ReferralOffice />
      <ReferralMoney />
      <ReferralBonus />
      <PageSeoBottomContent html={pageData.bottomContentHtml} />
    </main>
  );
}
