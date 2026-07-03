import type { Metadata } from "next";
import { env } from "@/lib/env";
import { pickMediaUrl } from "@/lib/strapi";

export type SeoOpenGraphType = "website" | "article";
export type SeoSocialNetwork = "Facebook" | "Twitter";
export type SeoTemplateValues = Record<string, string | number | boolean | null | undefined>;
export type SeoStructuredData = Record<string, unknown> | Array<Record<string, unknown>>;

export type SeoSocialEntry = {
  socialNetwork?: SeoSocialNetwork;
  title?: string;
  description?: string;
  image?: string;
};

export type SeoData = {
  metaTitle?: string;
  metaDescription?: string;
  canonicalURL?: string;
  keywords?: string;
  metaRobots?: string;
  shareImage?: string;
  metaViewport?: string;
  metaSocial?: SeoSocialEntry[];
  structuredData?: SeoStructuredData | string | null;
  openGraphType?: SeoOpenGraphType;
  excludeFromSitemap?: boolean;
};

const SITE_URL = env.siteUrl;

export function resolveCanonicalUrl(input: {
  seo?: SeoData | null;
  path?: string;
}) {
  const canonical = input.seo?.canonicalURL?.trim();
  if (canonical) return canonical;
  return input.path ? `${SITE_URL}${input.path}` : undefined;
}

export function buildMetadata(input: {
  seo?: SeoData | null;
  fallbackTitle: string;
  fallbackDescription: string;
  path?: string;
  fallbackType?: SeoOpenGraphType;
}): Metadata {
  const seo = input.seo ?? undefined;
  const title = seo?.metaTitle?.trim() || input.fallbackTitle;
  const description = seo?.metaDescription?.trim() || input.fallbackDescription;
  const canonical = resolveCanonicalUrl({ seo, path: input.path });
  const keywords = seo?.keywords
    ? seo.keywords
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean)
    : undefined;
  const robots = seo?.metaRobots || undefined;
  const image = seo?.shareImage || undefined;
  const facebook = pickMetaSocial(seo?.metaSocial, "Facebook");
  const twitter = pickMetaSocial(seo?.metaSocial, "Twitter");
  const openGraphType = seo?.openGraphType ?? input.fallbackType ?? "website";
  const openGraphTitle = facebook?.title?.trim() || title;
  const openGraphDescription = facebook?.description?.trim() || description;
  const openGraphImage = facebook?.image || image;
  const twitterTitle = twitter?.title?.trim() || title;
  const twitterDescription = twitter?.description?.trim() || description;
  const twitterImage = twitter?.image || image;

  return {
    title,
    description,
    alternates: canonical ? { canonical } : undefined,
    keywords,
    robots,
    openGraph: {
      title: openGraphTitle,
      description: openGraphDescription,
      url: canonical,
      type: openGraphType,
      images: openGraphImage ? [{ url: openGraphImage }] : undefined,
    },
    twitter: {
      card: twitterImage ? "summary_large_image" : "summary",
      title: twitterTitle,
      description: twitterDescription,
      images: twitterImage ? [twitterImage] : undefined,
    },
  };
}

export function mapSeo(value: unknown): SeoData | null {
  if (!value || typeof value !== "object") return null;
  const item = value as Record<string, unknown>;
  const shareImage = pickMediaUrl(item.shareImage) ?? pickSeoImage(item.shareImage);

  return {
    metaTitle: typeof item.metaTitle === "string" ? item.metaTitle : undefined,
    metaDescription: typeof item.metaDescription === "string" ? item.metaDescription : undefined,
    canonicalURL: typeof item.canonicalURL === "string" ? item.canonicalURL : undefined,
    keywords: typeof item.keywords === "string" ? item.keywords : undefined,
    metaRobots: typeof item.metaRobots === "string" ? item.metaRobots : undefined,
    metaViewport: typeof item.metaViewport === "string" ? item.metaViewport : undefined,
    shareImage,
    metaSocial: readSeoSocial(item.metaSocial),
    structuredData: readStructuredData(item.structuredData),
    openGraphType: item.openGraphType === "article" || item.openGraphType === "website"
      ? item.openGraphType
      : undefined,
    excludeFromSitemap: item.excludeFromSitemap === true,
  };
}

export function interpolateSeoValue(value: string, variables?: SeoTemplateValues) {
  if (!variables) return value;

  return value.replace(/\{\{\s*([a-zA-Z0-9_.-]+)\s*\}\}/g, (_, rawKey: string) => {
    const replacement = variables[rawKey];
    return replacement === undefined || replacement === null ? "" : String(replacement);
  });
}

export function applySeoVariables(seo: SeoData | null | undefined, variables?: SeoTemplateValues): SeoData | null {
  if (!seo) return null;
  if (!variables) return seo;
  return replaceTemplateValues(seo, variables) as SeoData;
}

export function resolveStructuredDataItems(value: unknown): Record<string, unknown>[] {
  if (!value) return [];

  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      return resolveStructuredDataItems(parsed);
    } catch {
      return [];
    }
  }

  if (Array.isArray(value)) {
    return value.filter(isStructuredDataRecord);
  }

  return isStructuredDataRecord(value) ? [value] : [];
}

function pickSeoImage(value: unknown): string | undefined {
  if (!value || typeof value !== "object") return undefined;
  const item = value as Record<string, unknown>;

  if (typeof item.url === "string") return item.url;
  if (item.data && typeof item.data === "object") {
    const nested = item.data as Record<string, unknown>;
    if (typeof nested.url === "string") return nested.url;
    if (nested.attributes && typeof nested.attributes === "object") {
      const attrs = nested.attributes as Record<string, unknown>;
      if (typeof attrs.url === "string") return attrs.url;
    }
  }
  return undefined;
}

function readSeoSocial(value: unknown): SeoSocialEntry[] | undefined {
  const items: unknown[] = Array.isArray(value)
    ? value
    : value && typeof value === "object" && Array.isArray((value as { data?: unknown[] }).data)
      ? ((value as { data?: unknown[] }).data ?? [])
      : [];

  const normalized = items.map(mapSeoSocialEntry).filter((item): item is SeoSocialEntry => item !== null);
  return normalized.length ? normalized : undefined;
}

function mapSeoSocialEntry(value: unknown): SeoSocialEntry | null {
  if (!value || typeof value !== "object") return null;

  const item = value as Record<string, unknown>;
  const socialNetwork =
    item.socialNetwork === "Facebook" || item.socialNetwork === "Twitter"
      ? item.socialNetwork
      : undefined;

  if (!socialNetwork) return null;

  return {
    socialNetwork,
    title: typeof item.title === "string" ? item.title : undefined,
    description: typeof item.description === "string" ? item.description : undefined,
    image: pickMediaUrl(item.image) ?? pickSeoImage(item.image),
  };
}

function pickMetaSocial(
  items: SeoSocialEntry[] | undefined,
  socialNetwork: SeoSocialNetwork,
) {
  return items?.find((item) => item.socialNetwork === socialNetwork);
}

function readStructuredData(value: unknown): SeoStructuredData | string | null {
  if (!value) return null;
  if (typeof value === "string") return value;
  if (Array.isArray(value)) return value.filter(isStructuredDataRecord);
  return isStructuredDataRecord(value) ? value : null;
}

function replaceTemplateValues(value: unknown, variables: SeoTemplateValues): unknown {
  if (typeof value === "string") {
    return interpolateSeoValue(value, variables);
  }

  if (Array.isArray(value)) {
    return value.map((item) => replaceTemplateValues(item, variables));
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, entryValue]) => [key, replaceTemplateValues(entryValue, variables)]),
  );
}

function isStructuredDataRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
