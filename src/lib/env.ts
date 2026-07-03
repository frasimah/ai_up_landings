const PRODUCTION_SITE_URL = "https://aiup.kata.agency";
const LOCAL_SITE_URL = "http://localhost:3000";

function normalizeUrl(value?: string | null) {
  const normalized = value?.trim();
  if (!normalized) return undefined;

  return normalized.replace(/\/+$/, "");
}

function resolveSiteUrl() {
  return normalizeUrl(process.env.NEXT_PUBLIC_SITE_URL)
    ?? (process.env.NODE_ENV === "production" ? PRODUCTION_SITE_URL : LOCAL_SITE_URL);
}

export const env = {
  siteUrl: resolveSiteUrl(),
  strapiUrl: normalizeUrl(process.env.STRAPI_URL),
  strapiPublicUrl: normalizeUrl(process.env.STRAPI_PUBLIC_URL),
  strapiToken: process.env.STRAPI_TOKEN,
  revalidateSecret: process.env.REVALIDATE_SECRET,
};
