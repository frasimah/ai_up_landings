'use client';

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./PageReadingProgress.module.scss";

type PageReadingProgressProps = {
  targetId: string;
  visibleAfter?: number;
};

export default function PageReadingProgress({
  targetId,
  visibleAfter = 100,
}: PageReadingProgressProps) {
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const barRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setPortalTarget(document.getElementById("smooth-wrapper"));
  }, []);

  useEffect(() => {
    const progressElement = progressRef.current;
    const barElement = barRef.current;
    const targetElement = document.getElementById(targetId);

    if (!progressElement || !barElement || !targetElement) {
      return undefined;
    }

    const updateProgress = () => {
      const elementTop = targetElement.offsetTop;
      const elementHeight = targetElement.offsetHeight;
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;

      progressElement.dataset.visible = scrollTop > visibleAfter ? "true" : "false";

      const start = elementTop;
      const end = elementTop + elementHeight - windowHeight;
      const current = scrollTop - start;
      const denominator = end - start;
      const progress = denominator <= 0 ? 1 : Math.min(Math.max(current / denominator, 0), 1);

      barElement.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    updateProgress();

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [targetId, visibleAfter, portalTarget]);

  const progressNode = (
    <div ref={progressRef} className={styles.progress} aria-hidden="true">
      <div ref={barRef} className={styles.bar} />
    </div>
  );

  if (!portalTarget) {
    return null;
  }

  return createPortal(progressNode, portalTarget);
}
