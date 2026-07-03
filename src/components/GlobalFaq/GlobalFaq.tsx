"use client";

import { usePathname } from "next/navigation";
import ReferralFaq from "@/features/blocks/ReferralFaq/ReferralFaq";
import { aboutFaqItems, siteFaqItems } from "@/lib/siteFaq";

const EXCLUDED_PATH_PREFIXES = ["/blog", "/knowledge-base"];

export default function GlobalFaq() {
  const pathname = usePathname();

  const shouldHideFaq = EXCLUDED_PATH_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (shouldHideFaq) {
    return null;
  }

  // const faqItems = pathname === "/about" ? aboutFaqItems : siteFaqItems;
  const faqItems = siteFaqItems;

  return (
    <ReferralFaq
      title="Часто задаваемые вопросы"
      items={faqItems}
      marginTop={false}
    />
  );
}
