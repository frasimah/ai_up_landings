import { mapSeo, type SeoData } from "@/lib/seo";
import { mapAuthorSummary, pickMediaUrl, strapiFetch, unwrapStrapiItem, unwrapStrapiRelation, type AuthorSummary } from "@/lib/strapi";

export type SectionVariant = "default" | "primary" | "danger";

export type Section = {
  slug: string;
  title: string;
  description: string;
  descriptionHtml: string;
  parentSlug: string | null;
  sortOrder: number | null;
  iconBg: string;
  iconUrl: string | null;
  variant: SectionVariant;
  seo?: SeoData | null;
};

export type ArticleSection = {
  slug: string;
  title: string;
};

export type Article = {
  sectionSlug: string;
  section: ArticleSection | null;
  slug: string;
  title: string;
  contentHtml: string;
  publishedAt: string | null;
  updatedAt: string | null;
  reviewer: string | null;
  readTime: number | null;
  author: AuthorSummary | null;
  seo?: SeoData | null;
};

type StrapiListResponse = {
  data?: unknown;
};
type StrapiItemResponse = {
  data?: unknown;
};

type KnowledgeSectionModel = {
  slug?: string;
  title?: string;
  descriptionHtml?: string;
  description?: string;
  order?: number;
  sortOrder?: number;
  iconBg?: string;
  icon?: unknown;
  variant?: string;
  parent?: unknown;
  seo?: unknown;
};

type KnowledgeArticleModel = {
  slug?: string;
  title?: string;
  contentHtml?: string;
  content?: string;
  publishedAt?: string;
  updatedAt?: string;
  reviewer?: string;
  readTime?: number;
  author?: unknown;
  sectionSlug?: string;
  section?: unknown;
  seo?: unknown;
};

const fallbackSections: Section[] = [
  {
    slug: "nachalo-raboty-dlya-samostoyatel'nyh-reklamodatelej",
    title: "\u041d\u0430\u0447\u0430\u043b\u043e \u0440\u0430\u0431\u043e\u0442\u044b \u0434\u043b\u044f \u0441\u0430\u043c\u043e\u0441\u0442\u043e\u044f\u0442\u0435\u043b\u044c\u043d\u044b\u0445 \u0440\u0435\u043a\u043b\u0430\u043c\u043e\u0434\u0430\u0442\u0435\u043b\u0435\u0439",
    description: "\u041f\u0440\u043e \u0444\u0440\u043e\u043d\u0442.",
    descriptionHtml: "<p>\u041f\u0440\u043e \u0444\u0440\u043e\u043d\u0442.</p>",
    parentSlug: null,
    sortOrder: 1,
    iconBg: "#2563EB",
    iconUrl: null,
    variant: "primary",
  },
  {
    slug: "backend",
    title: "Backend",
    description: "\u041f\u0440\u043e \u0431\u044d\u043a.",
    descriptionHtml: "<p>\u041f\u0440\u043e \u0431\u044d\u043a.</p>",
    parentSlug: null,
    sortOrder: 2,
    iconBg: "#0f172a",
    iconUrl: null,
    variant: "default",
  },
];

const fallbackArticles: Article[] = [
  {
    sectionSlug: "nachalo-raboty-dlya-samostoyatel'nyh-reklamodatelej",
    section: {
      slug: "nachalo-raboty-dlya-samostoyatel'nyh-reklamodatelej",
      title: "\u041d\u0430\u0447\u0430\u043b\u043e \u0440\u0430\u0431\u043e\u0442\u044b \u0434\u043b\u044f \u0441\u0430\u043c\u043e\u0441\u0442\u043e\u044f\u0442\u0435\u043b\u044c\u043d\u044b\u0445 \u0440\u0435\u043a\u043b\u0430\u043c\u043e\u0434\u0430\u0442\u0435\u043b\u0435\u0439",
    },
    slug: "shag-1",
    title: "\u0428\u0430\u0433 1. \u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u0443\u0439\u0442\u0435\u0441\u044c",
    contentHtml: "<p>...</p>",
    publishedAt: null,
    updatedAt: null,
    reviewer: null,
    readTime: null,
    author: null,
  },
  {
    sectionSlug: "nachalo-raboty-dlya-samostoyatel'nyh-reklamodatelej",
    section: {
      slug: "nachalo-raboty-dlya-samostoyatel'nyh-reklamodatelej",
      title: "\u041d\u0430\u0447\u0430\u043b\u043e \u0440\u0430\u0431\u043e\u0442\u044b \u0434\u043b\u044f \u0441\u0430\u043c\u043e\u0441\u0442\u043e\u044f\u0442\u0435\u043b\u044c\u043d\u044b\u0445 \u0440\u0435\u043a\u043b\u0430\u043c\u043e\u0434\u0430\u0442\u0435\u043b\u0435\u0439",
    },
    slug: "shag-2",
    title: "\u0428\u0430\u0433 2. \u0414\u043e\u0431\u0430\u0432\u044c\u0442\u0435 \u0440\u0435\u043a\u043b\u0430\u043c\u043d\u044b\u0435 \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u044b",
    contentHtml: "<p>...</p>",
    publishedAt: null,
    updatedAt: null,
    reviewer: null,
    readTime: null,
    author: null,
  },
];

function readList(data: unknown): unknown[] {
  if (!Array.isArray(data)) return [];
  return data;
}

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function normalizeVariant(variant: string | undefined, slug: string): SectionVariant {
  if (variant === "default" || variant === "primary" || variant === "danger") {
    return variant;
  }

  if (slug === "bystryj-start") return "primary";
  if (slug === "problemy-i-resheniya") return "danger";
  return "default";
}

function getDefaultIconBg(slug: string, variant: SectionVariant): string {
  if (slug === "bystryj-start") return "#2563EB";
  if (slug === "problemy-i-resheniya") return "#dc2626";
  if (variant === "primary") return "#2563EB";
  if (variant === "danger") return "#dc2626";
  return "#0f172a";
}

function sortSections(sections: Section[]): Section[] {
  return [...sections].sort((left, right) => {
    const leftOrder = left.sortOrder ?? Number.MAX_SAFE_INTEGER;
    const rightOrder = right.sortOrder ?? Number.MAX_SAFE_INTEGER;

    if (leftOrder !== rightOrder) return leftOrder - rightOrder;
    return left.title.localeCompare(right.title, "ru");
  });
}

function readSectionSlugFromRelation(section: unknown): string | null {
  const unwrapped = unwrapStrapiRelation<Record<string, unknown>>(section);
  if (!unwrapped) return null;

  if (typeof unwrapped.slug === "string") return unwrapped.slug;
  return null;
}

function readSectionFromRelation(section: unknown): ArticleSection | null {
  const unwrapped = unwrapStrapiRelation<Record<string, unknown>>(section);
  if (!unwrapped) return null;

  if (typeof unwrapped.slug !== "string" || typeof unwrapped.title !== "string") {
    return null;
  }

  return {
    slug: unwrapped.slug,
    title: unwrapped.title,
  };
}

function mapSection(item: unknown): Section | null {
  const source = unwrapStrapiItem<KnowledgeSectionModel>(item);
  if (!source?.slug || !source?.title) return null;

  const descriptionHtml = source.descriptionHtml ?? source.description ?? "";
  const variant = normalizeVariant(source.variant, source.slug);
  const sortOrderValue = Number.isFinite(source.sortOrder)
    ? Number(source.sortOrder)
    : Number.isFinite(source.order)
      ? Number(source.order)
      : null;

  return {
    slug: source.slug,
    title: source.title,
    description: typeof source.description === "string" ? source.description : stripHtml(descriptionHtml),
    descriptionHtml,
    parentSlug: readSectionSlugFromRelation(source.parent),
    sortOrder: sortOrderValue,
    iconBg: typeof source.iconBg === "string" ? source.iconBg : getDefaultIconBg(source.slug, variant),
    iconUrl: pickMediaUrl(source.icon),
    variant,
    seo: mapSeo(source.seo),
  };
}

function mapArticle(item: unknown): Article | null {
  const source = unwrapStrapiItem<KnowledgeArticleModel>(item);
  if (!source?.slug || !source?.title) return null;

  const sectionSlug = source.sectionSlug ?? readSectionSlugFromRelation(source.section);
  if (!sectionSlug) return null;

  return {
    sectionSlug,
    section: readSectionFromRelation(source.section),
    slug: source.slug,
    title: source.title,
    contentHtml: source.contentHtml ?? source.content ?? "",
    publishedAt: typeof source.publishedAt === "string" ? source.publishedAt : null,
    updatedAt: typeof source.updatedAt === "string" ? source.updatedAt : null,
    reviewer: typeof source.reviewer === "string" ? source.reviewer : null,
    readTime: Number.isFinite(source.readTime) ? Number(source.readTime) : null,
    author: mapAuthorSummary(source.author),
    seo: mapSeo(source.seo),
  };
}

async function fetchSectionsFromStrapi(): Promise<Section[] | null> {
  try {
    const response = await strapiFetch<StrapiListResponse>(
      "/api/public/knowledge-sections",
      undefined,
      { tags: ["knowledge:sections"] },
    );

    if (!response?.data) return null;

    const sections = readList(response.data).map(mapSection).filter((item): item is Section => item !== null);
    return sections.length ? sortSections(sections) : null;
  } catch {
    return null;
  }
}

async function fetchArticlesFromStrapi(): Promise<Article[] | null> {
  try {
    const response = await strapiFetch<StrapiListResponse>(
      "/api/public/knowledge-articles",
      undefined,
      { tags: ["knowledge:articles"] },
    );

    if (!response?.data) return null;

    const articles = readList(response.data).map(mapArticle).filter((item): item is Article => item !== null);
    return articles.length ? articles : null;
  } catch {
    return null;
  }
}

async function fetchArticleFromStrapi(articleSlug: string): Promise<Article | null> {
  try {
    const response = await strapiFetch<StrapiItemResponse>(
      `/api/public/knowledge-articles/${encodeURIComponent(articleSlug)}`,
      undefined,
      { tags: ["knowledge:articles"] },
    );

    if (!response?.data) return null;
    return mapArticle(response.data);
  } catch {
    return null;
  }
}

export async function getSections() {
  return (await fetchSectionsFromStrapi()) ?? sortSections(fallbackSections);
}

export async function getRootSections() {
  const sections = await getSections();
  return sections.filter((section) => !section.parentSlug);
}

export async function getSectionBySlug(sectionSlug: string) {
  const sections = await getSections();
  return sections.find((section) => section.slug === sectionSlug) ?? null;
}

export async function getChildSections(parentSlug: string) {
  const sections = await getSections();
  return sections.filter((section) => section.parentSlug === parentSlug);
}

export async function getAllArticles() {
  return (await fetchArticlesFromStrapi()) ?? fallbackArticles;
}

export async function getArticlesBySection(sectionSlug: string) {
  const articles = await getAllArticles();
  return articles.filter((article) => article.sectionSlug === sectionSlug);
}

export async function getArticle(sectionSlug: string, articleSlug: string) {
  const article = await fetchArticleFromStrapi(articleSlug);
  if (article && article.sectionSlug === sectionSlug) return article;

  const articles = await getAllArticles();
  return articles.find((item) => item.sectionSlug === sectionSlug && item.slug === articleSlug) ?? null;
}
