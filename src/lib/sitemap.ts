import { env } from "@/lib/env";

type SitemapEntry = {
  url: string;
  lastModified?: string | null;
};

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function resolveSiteBaseUrl() {
  return env.siteUrl;
}

export function buildSitemapXml(entries: SitemapEntry[]) {
  const items = entries
    .filter((entry) => entry.url?.trim())
    .map((entry) => {
      const lastModified = entry.lastModified?.trim();

      return [
        "<url>",
        `<loc>${escapeXml(entry.url)}</loc>`,
        ...(lastModified ? [`<lastmod>${escapeXml(lastModified)}</lastmod>`] : []),
        "</url>",
      ].join("");
    })
    .join("");

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    items,
    "</urlset>",
  ].join("");
}
