import { getBlogPosts } from "@/lib/blog";
import { resolveCanonicalUrl } from "@/lib/seo";
import { buildSitemapXml } from "@/lib/sitemap";
import { NextResponse } from "next/server";

export const revalidate = 3600;

export async function GET() {
  const posts = await getBlogPosts();
  const entriesByUrl = new Map<string, { url: string; lastModified?: string | null }>();

  for (const post of posts) {
    if (post.seo?.excludeFromSitemap) continue;

    const url = resolveCanonicalUrl({
      seo: post.seo,
      path: `/blog/${post.slug}`,
    });

    if (!url) continue;

    entriesByUrl.set(url, {
      url,
      lastModified: post.updatedAt ?? post.publishedAt ?? undefined,
    });
  }

  return new NextResponse(buildSitemapXml(Array.from(entriesByUrl.values())), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
