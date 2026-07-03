import type { MetadataRoute } from "next";
import { resolveSiteBaseUrl } from "@/lib/sitemap";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = resolveSiteBaseUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: [
      `${siteUrl}/sitemap-pages.xml`,
      `${siteUrl}/sitemap-knowledge-base.xml`,
      `${siteUrl}/sitemap-blog.xml`,
    ],
  };
}
