'use client';

import { useEffect } from 'react';

export default function BlogArticleViewTracker({ slug }: { slug: string }) {
  useEffect(() => {
    let aborted = false;

    const run = async () => {
      try {
        const base =
          (process.env.NEXT_PUBLIC_STRAPI_PUBLIC_URL || 'https://dockeraiup.kata.agency').replace(/\/+$/, '');
        const endpoint = `${base}/api/public/blog-posts/${encodeURIComponent(slug)}/view`;

        await fetch(endpoint, {
          method: 'POST',
          cache: 'no-store',
        });
      } catch {
        if (!aborted) {
          // no-op
        }
      }
    };

    run();

    return () => {
      aborted = true;
    };
  }, [slug]);

  return null;
}
