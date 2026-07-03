"use client";

import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

type Props = {
  children: React.ReactNode;
  header?: React.ReactNode;
  footer?: React.ReactNode;
};

export default function SmoothProvider({ children, header, footer }: Props) {
  const refWrapper = useRef<HTMLDivElement | null>(null);
  const refContent = useRef<HTMLDivElement | null>(null);
  const smootherRef = useRef<ScrollSmoother | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });
  }, []);

  useEffect(() => {
    const mm = gsap.matchMedia();
    let rafId: number | null = null;
    let timer: number | null = null;

    const scheduleRefresh = () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }

      if (timer !== null) {
        window.clearTimeout(timer);
      }

      rafId = window.requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        rafId = null;
      });

      timer = window.setTimeout(() => {
        ScrollTrigger.refresh();
        timer = null;
      }, 250);
    };

    mm.add(
      {
        isDesktop: "(min-width: 1201px) and (hover: hover)",
        isMobile: "(max-width: 1200px), (hover: none)",
      },
      (context) => {
        const { isDesktop } = context.conditions as { isDesktop: boolean };
        let smoother: ScrollSmoother | undefined;
        const isHomePage = pathname === "/";
        const isHowWorkPage = pathname === "/how-work";
        const shouldUseGentleSmoothing = isHomePage || isHowWorkPage;
        const shouldEnableSmoother = isDesktop;

        if (shouldEnableSmoother && refWrapper.current && refContent.current) {
          smoother = ScrollSmoother.create({
            wrapper: refWrapper.current,
            content: refContent.current,
            smooth: shouldUseGentleSmoothing ? 0.6 : 0.6,
            smoothTouch: 0,
            effects: false,
          });
          smootherRef.current = smoother;
        } else {
          smootherRef.current = null;
        }

        // dev-only: expose the smoother so headless verification can pause it
        // (ScrollSmoother transforms content, which breaks CDP scroll screenshots).
        if (process.env.NODE_ENV !== "production") {
          (window as unknown as { __smoother?: ScrollSmoother | null }).__smoother =
            smoother ?? null;
        }

        scheduleRefresh();

        return () => {
          smoother?.kill();
          smootherRef.current = null;
          if (rafId !== null) window.cancelAnimationFrame(rafId);
          if (timer !== null) window.clearTimeout(timer);
        };
      }
    );

    return () => {
      if (rafId !== null) window.cancelAnimationFrame(rafId);
      if (timer !== null) window.clearTimeout(timer);
      mm.revert();
    };
  }, [pathname]);

  useEffect(() => {
    smootherRef.current?.scrollTo(0, false);
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });

    const rafId = window.requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      window.cancelAnimationFrame(rafId);
    };
  }, [pathname]);

  return (
    <div id="smooth-wrapper" ref={refWrapper}>
      {header}
      <div id="smooth-content" ref={refContent} key={pathname}>
        {children}
        {footer}
      </div>
    </div>
  );
}
