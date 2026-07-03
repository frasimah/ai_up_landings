import { cache } from "react";
import type { Metadata } from "next";
import { mapSeo, buildMetadata, applySeoVariables, interpolateSeoValue, type SeoData, type SeoOpenGraphType, type SeoTemplateValues } from "@/lib/seo";
import { strapiFetch, unwrapStrapiItem } from "@/lib/strapi";

type StrapiListResponse = {
  data?: unknown;
};

type StrapiItemResponse = {
  data?: unknown;
};

type StrapiPageSeoModel = {
  title?: string;
  route?: string;
  seo?: unknown;
  bottomContentHtml?: string;
  updatedAt?: string;
  publishedAt?: string;
};

type PageSeoConfig = {
  label: string;
  route: string;
  path: string;
  fallbackTitle: string;
  fallbackDescription: string;
  fallbackType?: SeoOpenGraphType;
  includeInSitemap?: boolean;
};

export type PageSeoEntry = {
  title: string;
  route: string;
  seo: SeoData | null;
  bottomContentHtml: string | null;
  updatedAt: string | null;
  publishedAt: string | null;
};

export type ResolvedPageData = {
  title: string;
  description: string;
  path: string;
  seo: SeoData | null;
  bottomContentHtml: string | null;
};

export const PAGE_SEO_CONFIGS: Record<string, PageSeoConfig> = {
  "/": {
    label: "Главная",
    route: "/",
    path: "/",
    fallbackTitle: "Ai-UP — лиды и AI-маркетинг для роста продаж",
    fallbackDescription:
      "Ai-UP помогает находить контакты компаний и людей, оценивать качество лидов и выстраивать воронку продаж.",
  },
  "/about": {
    label: "О компании",
    route: "/about",
    path: "/about",
    fallbackTitle: "О компании Ai-UP",
    fallbackDescription: "Команда Ai-UP, подход к продукту и принципы работы с данными, маркетингом и продажами.",
  },
  "/ai-flow": {
    label: "Ai Flow",
    route: "/ai-flow",
    path: "/ai-flow",
    fallbackTitle: "Ai Flow — автоматизация и оптимизация источников лидов | Ai-UP",
    fallbackDescription:
      "Ai Flow помогает автоматически оценивать качество источников и перераспределять маркетинговые усилия в пользу лучших каналов.",
  },
  "/blog": {
    label: "Блог",
    route: "/blog",
    path: "/blog",
    fallbackTitle: "Блог Ai-UP",
    fallbackDescription: "Статьи, кейсы, обновления и практические материалы команды Ai-UP о лидах, продажах и автоматизации.",
  },
  "/blog/tag/[tag]": {
    label: "Тег блога",
    route: "/blog/tag/[tag]",
    path: "/blog/tag/[tag]",
    fallbackTitle: "{{tag}} — материалы блога Ai-UP",
    fallbackDescription: "Подборка материалов Ai-UP по теме «{{tag}}».",
    includeInSitemap: false,
  },
  "/call-center": {
    label: "Колл-центр",
    route: "/call-center",
    path: "/call-center",
    fallbackTitle: "Колл-центр Ai-UP",
    fallbackDescription:
      "Ai-UP помогает выстроить колл-центр, контролировать качество диалогов и повышать конверсию из обращений в сделки.",
  },
  "/cost": {
    label: "Стоимость",
    route: "/cost",
    path: "/cost",
    fallbackTitle: "Стоимость идентификации лидов | Ai-UP",
    fallbackDescription:
      "Узнайте стоимость идентификации лидов и оцените, как Ai-UP помогает контролировать окупаемость маркетинга.",
  },
  "/how-work": {
    label: "Как работает",
    route: "/how-work",
    path: "/how-work",
    fallbackTitle: "Как работает Ai-UP",
    fallbackDescription:
      "Разбираем, как Ai-UP собирает, обогащает и помогает оценивать контакты компаний и людей по источникам трафика.",
  },
  "/knowledge-base": {
    label: "База знаний",
    route: "/knowledge-base",
    path: "/knowledge-base",
    fallbackTitle: "База знаний Ai-UP",
    fallbackDescription: "База знаний Ai-UP с инструкциями, статьями и ответами по работе с продуктом.",
  },
  "/privacy": {
    label: "Политика конфиденциальности",
    route: "/privacy",
    path: "/privacy",
    fallbackTitle: "Политика обработки персональных данных | Ai-UP",
    fallbackDescription: "Политика обработки персональных данных для пользователей сайта Ai-UP.",
  },
  "/terms-conditions": {
    label: "Пользовательское соглашение",
    route: "/terms-conditions",
    path: "/terms-conditions",
    fallbackTitle: "Пользовательское соглашение сервиса Ai-UP | Ai-UP",
    fallbackDescription:
      "Пользовательское соглашение сервиса Ai-UP: регистрация, доступ к сервису, колл-центр, токены и правила использования.",
  },
  "/top-up-terms-conditions": {
    label: "Оферта пополнения",
    route: "/top-up-terms-conditions",
    path: "/top-up-terms-conditions",
    fallbackTitle: "Оферта использования сервиса Ai-UP | Ai-UP",
    fallbackDescription:
      "Оферта использования сервиса Ai-UP: акцепт, лицензионное вознаграждение, токены, ответственность и иные условия.",
  },
  "/referral-programm": {
    label: "Реферальная программа",
    route: "/referral-programm",
    path: "/referral-programm",
    fallbackTitle: "Реферальная программа Ai-UP",
    fallbackDescription: "Подробности реферальной программы Ai-UP и условия для партнёров.",
  },
};

const fetchPageSeoByRoute = cache(async (route: string): Promise<PageSeoEntry | null> => {
  try {
    const response = await strapiFetch<StrapiItemResponse>(
      "/api/public/page-seos/by-route",
      { route },
      { tags: [`page-seo:route:${route}`] },
    );

    if (!response?.data) return null;
    return mapPageSeoEntry(response.data);
  } catch {
    return null;
  }
});

export const getPageSeoByRoute = fetchPageSeoByRoute;

export const getAllPageSeoEntries = cache(async (): Promise<PageSeoEntry[]> => {
  try {
    const response = await strapiFetch<StrapiListResponse>(
      "/api/public/page-seos",
      undefined,
      { tags: ["page-seo:list"] },
    );

    if (!response?.data || !Array.isArray(response.data)) return [];

    return response.data
      .map(mapPageSeoEntry)
      .filter((item): item is PageSeoEntry => item !== null);
  } catch {
    return [];
  }
});

export async function buildPageMetadata(input: {
  route: string;
  path?: string;
  fallbackTitle?: string;
  fallbackDescription?: string;
  fallbackType?: SeoOpenGraphType;
  variables?: SeoTemplateValues;
}): Promise<Metadata> {
  const resolved = await getResolvedPageData(input);

  return buildMetadata({
    seo: resolved.seo,
    fallbackTitle: resolved.title,
    fallbackDescription: resolved.description,
    path: resolved.path,
    fallbackType: input.fallbackType ?? PAGE_SEO_CONFIGS[input.route]?.fallbackType,
  });
}

export async function getResolvedPageSeo(
  route: string,
  variables?: SeoTemplateValues,
): Promise<SeoData | null> {
  const resolved = await getResolvedPageData({ route, variables });
  return resolved.seo;
}

export async function getResolvedPageData(input: {
  route: string;
  path?: string;
  fallbackTitle?: string;
  fallbackDescription?: string;
  variables?: SeoTemplateValues;
}): Promise<ResolvedPageData> {
  const config = PAGE_SEO_CONFIGS[input.route];
  const entry = await getPageSeoByRoute(input.route);
  const seo = applySeoVariables(entry?.seo, input.variables);

  return {
    title: seo?.metaTitle?.trim() || interpolateSeoValue(
      input.fallbackTitle ?? config?.fallbackTitle ?? "Ai-UP",
      input.variables,
    ),
    description: seo?.metaDescription?.trim() || interpolateSeoValue(
      input.fallbackDescription ?? config?.fallbackDescription ?? "Ai-UP",
      input.variables,
    ),
    path: interpolateSeoValue(input.path ?? config?.path ?? input.route, input.variables),
    seo,
    bottomContentHtml:
      typeof entry?.bottomContentHtml === "string"
        ? interpolateSeoValue(entry.bottomContentHtml, input.variables)
        : null,
  };
}

export function getStaticSitemapPageConfigs() {
  return Object.values(PAGE_SEO_CONFIGS).filter((config) => config.includeInSitemap !== false);
}

function mapPageSeoEntry(value: unknown): PageSeoEntry | null {
  const source = unwrapStrapiItem<StrapiPageSeoModel>(value);
  if (!source?.route || typeof source.route !== "string") return null;

  return {
    title: typeof source.title === "string" ? source.title : source.route,
    route: source.route,
    seo: mapSeo(source.seo),
    bottomContentHtml: typeof source.bottomContentHtml === "string" ? source.bottomContentHtml : null,
    updatedAt: typeof source.updatedAt === "string" ? source.updatedAt : null,
    publishedAt: typeof source.publishedAt === "string" ? source.publishedAt : null,
  };
}
