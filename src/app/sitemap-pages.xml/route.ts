import { getSections } from "@/lib/knowledge";
import { getAllPageSeoEntries, getStaticSitemapPageConfigs } from "@/lib/pageSeo";
import { resolveCanonicalUrl } from "@/lib/seo";
import { buildSitemapXml } from "@/lib/sitemap";
import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  const [sections, pageSeoEntries] = await Promise.all([getSections(), getAllPageSeoEntries()]);
  const pageSeoByRoute = new Map(pageSeoEntries.map((entry) => [entry.route, entry]));
  const entriesByUrl = new Map<string, { url: string; lastModified?: string | null }>();

  for (const config of getStaticSitemapPageConfigs()) {
    const pageSeo = pageSeoByRoute.get(config.route);
    if (pageSeo?.seo?.excludeFromSitemap) continue;

    const url = resolveCanonicalUrl({
      seo: pageSeo?.seo,
      path: config.path,
    });

    if (!url) continue;

    entriesByUrl.set(url, {
      url,
      lastModified: pageSeo?.updatedAt ?? pageSeo?.publishedAt ?? undefined,
    });
  }

  for (const section of sections) {
    if (section.seo?.excludeFromSitemap) continue;

    const url = resolveCanonicalUrl({
      seo: section.seo,
      path: `/knowledge-base/${section.slug}`,
    });

    if (!url) continue;

    entriesByUrl.set(url, { url });
  }

  return new NextResponse(buildSitemapXml(Array.from(entriesByUrl.values())), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
