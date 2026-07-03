'use client';

import { useEffect } from "react";

type BlogArticleProgressProps = {
  targetId: string;
};

export default function BlogArticleProgress({ targetId }: BlogArticleProgressProps) {
  useEffect(() => {
    const progressElement = document.getElementById("blog-progress");
    const barElement = document.getElementById("blog-progress-bar");
    const articleElement = document.getElementById(targetId);

    if (!progressElement || !barElement || !articleElement) {
      return undefined;
    }

    const updateProgress = () => {
      const articleTop = articleElement.offsetTop;
      const articleHeight = articleElement.offsetHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;

      if (scrollTop > 100) {
        progressElement.dataset.visible = "true";
      } else {
        progressElement.dataset.visible = "false";
      }

      const start = articleTop;
      const end = articleTop + articleHeight - windowHeight;
      const current = scrollTop - start;
      const denominator = end - start;
      const percent = denominator <= 0 ? 100 : Math.min(Math.max((current / denominator) * 100, 0), 100);

      barElement.style.width = `${Math.round(percent)}%`;
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [targetId]);

  return (
    <div id="blog-progress" aria-hidden="true">
      <div id="blog-progress-bar" />
    </div>
  );
}
