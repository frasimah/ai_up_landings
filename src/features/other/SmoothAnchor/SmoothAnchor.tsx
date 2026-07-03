"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollToPlugin);

function getHeaderOffset() {
  const header = document.querySelector("header");
  return header instanceof HTMLElement ? header.offsetHeight + 16 : 0;
}

function scrollToHash(hash: string, immediate = false) {
  const id = hash.replace("#", "").trim();
  if (!id) return;

  const target = document.getElementById(id);
  if (!target) return;

  const smoother = ScrollSmoother.get();
  if (smoother) {
    smoother.scrollTo(target, !immediate);
    return;
  }

  gsap.to(window, {
    duration: immediate ? 0 : 0.9,
    ease: "power2.out",
    scrollTo: {
      y: target,
      offsetY: getHeaderOffset(),
      autoKill: true,
    },
  });
}

export default function SmoothAnchor() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (event.button !== 0) return;

      const target = event.target as Element | null;
      const anchor = target?.closest("a[href*='#']");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const url = new URL(anchor.href, window.location.origin);
      if (!url.hash) return;
      if (url.origin !== window.location.origin) return;
      if (url.pathname !== window.location.pathname) return;

      event.preventDefault();
      scrollToHash(url.hash);
      window.history.replaceState(null, "", `${url.pathname}${url.hash}`);
    };

    document.addEventListener("click", handleClick, { capture: true });

    if (window.location.hash) {
      const smoother = ScrollSmoother.get();
      if (smoother) {
        smoother.scrollTo(0, false);
      } else {
        window.scrollTo({ top: 0, behavior: "auto" });
      }

      window.setTimeout(() => {
        scrollToHash(window.location.hash, false);
      }, 40);
    }

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, []);

  return null;
}
