type StructuredDataItem = Record<string, unknown>;

type HeadStructuredDataProps = {
  items: StructuredDataItem[];
  idPrefix?: string;
};

function serializeStructuredData(item: StructuredDataItem) {
  return JSON.stringify(item).replace(/</g, "\\u003c");
}

export default function HeadStructuredData({
  items,
  idPrefix = "structured-data",
}: HeadStructuredDataProps) {
  const validItems = items.filter((item) => Object.keys(item).length > 0);
  if (!validItems.length) return null;

  return (
    <>
      {validItems.map((item, index) => (
        <script
          key={`${idPrefix}-${index}`}
          id={`${idPrefix}-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeStructuredData(item) }}
        />
      ))}
    </>
  );
}
