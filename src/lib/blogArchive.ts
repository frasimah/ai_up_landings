import { getBlogPosts as getLegacyBlogPosts, tagToSlug, type BlogPost as LegacyBlogPost } from "@/lib/blog";

export type BlogArchiveCategory = {
  name: string;
  slug: string;
  bgColor: string;
  textColor: string;
};

export type BlogArchivePost = LegacyBlogPost & {
  readTime: number;
  category: BlogArchiveCategory | null;
};

export type BlogArchiveSeoCopy = {
  h1: string;
  title: string;
  description: string;
};

const DEFAULT_CATEGORIES: BlogArchiveCategory[] = [
  { name: "Кейсы", slug: "kejsy", bgColor: "#f0fdf4", textColor: "#166534" },
  { name: "Гайды", slug: "gajdy", bgColor: "#faf5ff", textColor: "#6b21a8" },
  { name: "Сравнения", slug: "sravneniya", bgColor: "#eff6ff", textColor: "#1e40af" },
  { name: "Продажи", slug: "prodazhi", bgColor: "#fefce8", textColor: "#854d0e" },
  { name: "Словарь", slug: "slovar", bgColor: "#f1f5f9", textColor: "#475569" },
  { name: "Обновления", slug: "obnovleniya", bgColor: "#0f172a", textColor: "#ffffff" },
];

const DEFAULT_CATEGORY_MAP = new Map(DEFAULT_CATEGORIES.map((category) => [category.slug, category]));

const BLOG_ARCHIVE_DEFAULT_COPY: BlogArchiveSeoCopy = {
  h1: "Блог",
  title: "Блог Ai-UP",
  description: "Кейсы, гайды и обновления Ai-UP о лидогенерации, маркетинге и продажах.",
};

const BLOG_ARCHIVE_TAG_COPY: Record<string, BlogArchiveSeoCopy> = {
  kejsy: {
    h1: "Кейсы AI-UP",
    title: "Кейсы AI-UP: примеры лидогенерации и продаж",
    description:
      "Кейсы AI-UP: реальные примеры лидогенерации, снижения стоимости лида, работы с контактами и повышения эффективности продаж.",
  },
  sravneniya: {
    h1: "Сравнения AI-UP",
    title: "Сравнения AI-UP: сервисы, CRM и лидогенерация",
    description:
      "Сравнения AI-UP: разбираем сервисы, инструменты маркетинга, CRM, источники лидов и подходы к привлечению клиентов.",
  },
  gajdy: {
    h1: "Гайды AI-UP",
    title: "Гайды AI-UP: лидогенерация, маркетинг и продажи",
    description:
      "Гайды AI-UP: практические инструкции по лидогенерации, маркетингу, продажам, работе с лидами, CRM и рекламными каналами.",
  },
  obnovleniya: {
    h1: "Обновления AI-UP",
    title: "Обновления AI-UP: новые функции и улучшения",
    description:
      "Обновления AI-UP: новости продукта, новые функции, улучшения кабинета, интеграций, источников, прозвона и работы с лидами.",
  },
  prodazhi: {
    h1: "Продажи AI-UP",
    title: "Продажи AI-UP: лиды, заявки и конверсия",
    description:
      "Продажи AI-UP: статьи о воронке продаж, обработке лидов, квалификации заявок, прозвоне контактов и росте конверсии.",
  },
};

function stripHtml(html: string) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function estimateReadTime(post: LegacyBlogPost) {
  const source = stripHtml(post.contentHtml || post.excerpt);
  if (!source) return 3;
  const wordsCount = source.split(" ").filter(Boolean).length;
  return Math.max(3, Math.ceil(wordsCount / 180));
}

function inferCategoryFromTexts(texts: string[]) {
  const source = texts.join(" ").toLowerCase();

  if (source.includes("кейс") || source.includes("разбор")) {
    return DEFAULT_CATEGORY_MAP.get("kejsy") ?? null;
  }

  if (source.includes("сравн") || source.includes("vs")) {
    return DEFAULT_CATEGORY_MAP.get("sravneniya") ?? null;
  }

  if (source.includes("словар") || source.includes("термин")) {
    return DEFAULT_CATEGORY_MAP.get("slovar") ?? null;
  }

  if (source.includes("обнов") || source.includes("новост") || source.includes("релиз")) {
    return DEFAULT_CATEGORY_MAP.get("obnovleniya") ?? null;
  }

  if (
    source.includes("гайд") ||
    source.includes("инструкц") ||
    source.includes("как ") ||
    source.startsWith("как")
  ) {
    return DEFAULT_CATEGORY_MAP.get("gajdy") ?? null;
  }

  if (
    source.includes("лид") ||
    source.includes("продаж") ||
    source.includes("crm") ||
    source.includes("маркет") ||
    source.includes("реклам")
  ) {
    return DEFAULT_CATEGORY_MAP.get("prodazhi") ?? null;
  }

  return null;
}

function normalizeCategory(post: LegacyBlogPost) {
  return inferCategoryFromTexts([...post.tags, post.title, post.excerpt]);
}

function normalizeArchivePost(post: LegacyBlogPost): BlogArchivePost {
  return {
    ...post,
    readTime: estimateReadTime(post),
    category: normalizeCategory(post),
  };
}

function sortCategories(categories: BlogArchiveCategory[]) {
  return [...categories].sort((left, right) => {
    const leftIndex = DEFAULT_CATEGORIES.findIndex((category) => category.slug === left.slug);
    const rightIndex = DEFAULT_CATEGORIES.findIndex((category) => category.slug === right.slug);

    if (leftIndex === -1 && rightIndex === -1) {
      return left.name.localeCompare(right.name, "ru");
    }

    if (leftIndex === -1) return 1;
    if (rightIndex === -1) return -1;
    return leftIndex - rightIndex;
  });
}

function matchesCategory(post: BlogArchivePost, category: string) {
  const normalizedCategory = category.trim().toLowerCase();
  const normalizedSlug = tagToSlug(category);

  if (post.category) {
    if (post.category.slug === normalizedCategory || post.category.slug === normalizedSlug) {
      return true;
    }

    if (post.category.name.toLowerCase() === normalizedCategory) {
      return true;
    }
  }

  return post.tags.some((tag) => {
    const normalizedTag = tag.toLowerCase();
    return normalizedTag === normalizedCategory || tagToSlug(tag) === normalizedSlug;
  });
}

export async function getArchiveBlogPosts(category?: string) {
  const posts = (await getLegacyBlogPosts()).map(normalizeArchivePost);

  if (!category || category === "all") {
    return posts;
  }

  return posts.filter((post) => matchesCategory(post, category));
}

export async function getArchiveBlogPostBySlug(slug: string) {
  const posts = await getArchiveBlogPosts();
  return posts.find((post) => post.slug === slug) ?? null;
}

export async function getArchiveBlogCategories() {
  const posts = await getArchiveBlogPosts();
  const categoriesMap = new Map<string, BlogArchiveCategory>();

  for (const post of posts) {
    if (post.category) {
      categoriesMap.set(post.category.slug, post.category);
    }
  }

  return sortCategories(Array.from(categoriesMap.values()));
}

export async function getArchiveBlogArticleData(slug: string) {
  const posts = await getArchiveBlogPosts();
  const post = posts.find((item) => item.slug === slug) ?? null;

  if (!post) {
    return null;
  }

  const sameCategory = posts
    .filter((item) => item.slug !== post.slug && item.category?.slug === post.category?.slug)
    .slice(0, 2);

  const otherCategory = posts
    .filter((item) => item.slug !== post.slug && item.category?.slug !== post.category?.slug)
    .slice(0, 1);

  const related = [...sameCategory, ...otherCategory];

  if (related.length < 3) {
    const extra = posts
      .filter((item) => item.slug !== post.slug && !related.some((relatedItem) => relatedItem.slug === item.slug))
      .slice(0, 3 - related.length);

    related.push(...extra);
  }

  const authorName = post.author?.name?.trim().toLowerCase();
  const authorArticles = authorName
    ? posts
        .filter((item) => item.slug !== post.slug && item.author?.name?.trim().toLowerCase() === authorName)
        .slice(0, 3)
    : [];

  const popular = [...posts]
    .filter((item) => item.slug !== post.slug)
    .sort((left, right) => (right.views || 0) - (left.views || 0))
    .slice(0, 3);

  return {
    post,
    related,
    authorArticles,
    popular,
  };
}

export function resolveArchiveCategorySlug(slug: string, categories: BlogArchiveCategory[]) {
  if (!slug || slug === "all") return "all";

  const bySlug = categories.find((category) => category.slug === slug);
  if (bySlug) return bySlug.slug;

  let decoded = slug;
  try {
    decoded = decodeURIComponent(slug);
  } catch {
    decoded = slug;
  }

  const byName = categories.find((category) => category.name.toLowerCase() === decoded.toLowerCase());
  if (byName) return byName.slug;

  return null;
}

export function getBlogArchiveSeoCopy(slug?: string | null): BlogArchiveSeoCopy {
  if (!slug || slug === "all") {
    return BLOG_ARCHIVE_DEFAULT_COPY;
  }

  return BLOG_ARCHIVE_TAG_COPY[slug] ?? {
    h1: "Блог",
    title: `${slug} — материалы блога Ai-UP`,
    description: "Подборка материалов Ai-UP по выбранной теме.",
  };
}
