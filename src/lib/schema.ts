import type { AuthorSummary } from "@/lib/strapi";

type ArticleSchemaInput = {
  title: string;
  description?: string;
  image?: string;
  publishedAt?: string | null;
  updatedAt?: string | null;
  author?: AuthorSummary | null;
  canonicalURL?: string;
};

type BreadcrumbItem = {
  name: string;
  item: string;
};

type OrganizationSchemaInput = {
  name: string;
  url?: string;
  alternateName?: string;
};

export function buildArticleSchema(input: ArticleSchemaInput) {
  const headline = input.title?.trim();
  if (!headline) return null;

  const authorName = input.author?.name?.trim();
  const author =
    authorName
      ? {
          "@type": "Person" as const,
          name: authorName,
          ...(input.author?.jobTitle ? { jobTitle: input.author.jobTitle } : {}),
          ...(input.author?.url ? { url: input.author.url } : {}),
        }
      : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    ...(input.description ? { description: input.description } : {}),
    ...(input.image ? { image: input.image } : {}),
    ...(input.publishedAt ? { datePublished: input.publishedAt } : {}),
    ...(input.updatedAt ? { dateModified: input.updatedAt } : {}),
    ...(author ? { author } : {}),
    ...(input.canonicalURL
      ? {
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": input.canonicalURL,
          },
        }
      : {}),
  };
}

export function buildBreadcrumbListSchema(items: BreadcrumbItem[]) {
  const validItems = items.filter((item) => item.name?.trim() && item.item?.trim());
  if (!validItems.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: validItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item,
    })),
  };
}

export function buildOrganizationSchema(input: OrganizationSchemaInput) {
  const name = input.name?.trim();
  if (!name) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    ...(input.alternateName?.trim() ? { alternateName: input.alternateName.trim() } : {}),
    ...(input.url?.trim() ? { url: input.url.trim() } : {}),
  };
}
