import HeadStructuredData from "@/components/HeadStructuredData/HeadStructuredData";
import { resolveStructuredDataItems } from "@/lib/seo";

type Props = {
  structuredData?: unknown;
};

export default function SeoStructuredData({ structuredData }: Props) {
  const items = resolveStructuredDataItems(structuredData);
  if (!items.length) return null;

  return <HeadStructuredData items={items} idPrefix="seo-structured-data" />;
}
