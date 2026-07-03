import { getAllArticles } from "@/lib/knowledge";
import { resolveCanonicalUrl } from "@/lib/seo";
import { buildSitemapXml } from "@/lib/sitemap";
import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  const articles = await getAllArticles();
  const entriesByUrl = new Map<string, { url: string; lastModified?: string | null }>();

  for (const article of articles) {
    if (article.seo?.excludeFromSitemap) continue;

    const url = resolveCanonicalUrl({
      seo: article.seo,
      path: `/knowledge-base/${article.sectionSlug}/${article.slug}`,
    });

    if (!url) continue;

    entriesByUrl.set(url, {
      url,
      lastModified: article.updatedAt ?? article.publishedAt ?? undefined,
    });
  }

  return new NextResponse(buildSitemapXml(Array.from(entriesByUrl.values())), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
