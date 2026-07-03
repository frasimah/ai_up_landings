import { env } from "@/lib/env";

type QueryValue = string | number | boolean | null | undefined;
type StrapiMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
type StrapiRequestOptions = {
  method?: StrapiMethod;
  body?: unknown;
  noStore?: boolean;
  tags?: string[];
};
export type AuthorSummary = {
  name: string;
  jobTitle: string | null;
  avatar: string | null;
  bio: string | null;
  url: string | null;
};

const STRAPI_URL = env.strapiUrl;
const STRAPI_PUBLIC_URL = env.strapiPublicUrl;
const STRAPI_TOKEN = env.strapiToken;

function toPublicMediaUrl(url: string): string {
  if (url.startsWith("http")) {
    if (STRAPI_PUBLIC_URL && STRAPI_URL && url.startsWith(STRAPI_URL)) {
      return `${STRAPI_PUBLIC_URL}${url.slice(STRAPI_URL.length)}`;
    }
    return url;
  }

  const base = STRAPI_PUBLIC_URL ?? STRAPI_URL;
  if (!base) return url;
  return `${base}${url}`;
}

function buildSearchParams(query?: Record<string, QueryValue>) {
  const params = new URLSearchParams();
  if (!query) return params;

  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null) continue;
    params.set(key, String(value));
  }

  return params;
}

export function isStrapiConfigured() {
  return Boolean(STRAPI_URL);
}

export async function strapiFetch<T>(
  path: string,
  query?: Record<string, QueryValue>,
  options?: StrapiRequestOptions,
): Promise<T | null> {
  if (!STRAPI_URL) return null;

  const url = new URL(`${STRAPI_URL}${path.startsWith("/") ? path : `/${path}`}`);
  const searchParams = buildSearchParams(query);
  const search = searchParams.toString();
  if (search) {
    url.search = search;
  }

  const headers: HeadersInit = {};
  if (STRAPI_TOKEN) {
    headers.Authorization = `Bearer ${STRAPI_TOKEN}`;
  }
  if (options?.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(url.toString(), {
    method: options?.method ?? "GET",
    headers,
    body: options?.body !== undefined ? JSON.stringify(options.body) : undefined,
    ...(options?.noStore
      ? { cache: "no-store" as const }
      : { next: { revalidate: 60, tags: options?.tags ?? [] } }),
  });

  if (!response.ok) {
    throw new Error(`Strapi request failed: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}

type StrapiMaybeAttributes = {
  attributes?: unknown;
};

export function unwrapStrapiItem<T>(item: unknown): T | null {
  if (!item || typeof item !== "object") return null;

  const maybeWithAttributes = item as StrapiMaybeAttributes;
  if (maybeWithAttributes.attributes && typeof maybeWithAttributes.attributes === "object") {
    return maybeWithAttributes.attributes as T;
  }

  return item as T;
}

export function unwrapStrapiRelation<T>(item: unknown): T | null {
  if (!item || typeof item !== "object") return null;

  const relation = item as Record<string, unknown>;
  if ("data" in relation) {
    return unwrapStrapiItem<T>(relation.data);
  }

  return unwrapStrapiItem<T>(item);
}

function readMedia(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object") return null;

  const obj = value as Record<string, unknown>;
  if (typeof obj.url === "string") {
    return obj;
  }

  const data = obj.data;
  if (!data || typeof data !== "object") return null;

  return unwrapStrapiItem<Record<string, unknown>>(data);
}

function pickMediaFormat(media: Record<string, unknown>, preferredFormats: string[]) {
  if (!preferredFormats.length || !media.formats || typeof media.formats !== "object") {
    return null;
  }

  const formats = media.formats as Record<string, unknown>;
  for (const formatName of preferredFormats) {
    const format = formats[formatName];
    if (!format || typeof format !== "object") continue;

    const url = (format as Record<string, unknown>).url;
    if (typeof url === "string") return url;
  }

  return null;
}

export function pickMediaUrl(value: unknown, preferredFormats: string[] = []): string | null {
  const media = readMedia(value);
  if (!media) return null;

  const formattedUrl = pickMediaFormat(media, preferredFormats);
  if (formattedUrl) return toPublicMediaUrl(formattedUrl);

  if (typeof media.url === "string") {
    return toPublicMediaUrl(media.url);
  }

  return null;
}

type StrapiAuthorModel = {
  name?: string;
  jobTitle?: string;
  avatar?: unknown;
  bio?: string;
  url?: string;
};

export function mapAuthorSummary(value: unknown): AuthorSummary | null {
  const author = unwrapStrapiRelation<StrapiAuthorModel>(value);
  if (!author?.name || typeof author.name !== "string") return null;

  return {
    name: author.name,
    jobTitle: typeof author.jobTitle === "string" ? author.jobTitle : null,
    avatar: pickMediaUrl(author.avatar, ["thumbnail_webp", "thumbnail", "small_webp", "small", "webp"]),
    bio: typeof author.bio === "string" ? author.bio : null,
    url: typeof author.url === "string" ? author.url : null,
  };
}
