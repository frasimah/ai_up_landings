"use client";

import { type MouseEvent, type ReactNode, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./KnowledgeSticky.module.scss";

gsap.registerPlugin(ScrollTrigger);

type KnowledgeStickyProps = {
   children: ReactNode;
   offsetTop?: number;
};

const MOBILE_MEDIA_QUERY = "(max-width: 1199px)";
const FOOTER_VISIBILITY_ROOT_MARGIN = "0px 0px -72px 0px";
const CLOSE_ON_NAVIGATION_STORAGE_KEY = "knowledge-sticky-close-after-navigation";
const CLOSE_AFTER_NAVIGATION_DELAY = 80;

function shouldCloseAfterNavigation(): boolean {
   if (typeof window === "undefined") return false;

   return window.sessionStorage.getItem(CLOSE_ON_NAVIGATION_STORAGE_KEY) === "1";
}

export default function KnowledgeSticky({ children, offsetTop = 120 }: KnowledgeStickyProps) {
   const stickyRef = useRef<HTMLDivElement | null>(null);
   const pathname = usePathname();
   const dialogTitleId = useId();
   const [isMobileViewport, setIsMobileViewport] = useState(false);
   const [isMobileOpen, setIsMobileOpen] = useState(shouldCloseAfterNavigation);
   const [isFooterReached, setIsFooterReached] = useState(false);
   const closeAfterNavigationTimeoutRef = useRef<number | null>(null);
   const closeAfterNavigationFrameRef = useRef<number | null>(null);

   useLayoutEffect(() => {
      const element = stickyRef.current;
      if (!element) return;

      const media = gsap.matchMedia();

      media.add("(min-width: 1201px) and (hover: hover)", () => {
         const boundary = element.closest("[data-knowledge-sticky-boundary]");
         if (!boundary) return;

         const trigger = ScrollTrigger.create({
            trigger: element,
            start: () => `top top+=${offsetTop}`,
            endTrigger: boundary,
            end: "bottom bottom-=24",
            pin: true,
            pinSpacing: true,
            invalidateOnRefresh: true,
         });

         ScrollTrigger.refresh();

         return () => trigger.kill();
      });

      return () => {
         media.revert();
      };
   }, [offsetTop]);

   useEffect(() => {
      if (typeof window === "undefined") return;

      const mediaQuery = window.matchMedia(MOBILE_MEDIA_QUERY);
      const syncViewport = (matches: boolean) => {
         setIsMobileViewport(matches);

         if (!matches) {
            setIsMobileOpen(false);
         }
      };

      syncViewport(mediaQuery.matches);

      const handleChange = (event: MediaQueryListEvent) => {
         syncViewport(event.matches);
      };

      mediaQuery.addEventListener("change", handleChange);

      return () => {
         mediaQuery.removeEventListener("change", handleChange);
      };
   }, []);

   useEffect(() => {
      return () => {
         if (closeAfterNavigationTimeoutRef.current) {
            clearTimeout(closeAfterNavigationTimeoutRef.current);
            closeAfterNavigationTimeoutRef.current = null;
         }

         if (closeAfterNavigationFrameRef.current !== null && typeof window !== "undefined") {
            window.cancelAnimationFrame(closeAfterNavigationFrameRef.current);
            closeAfterNavigationFrameRef.current = null;
         }
      };
   }, []);

   useEffect(() => {
      if (typeof document === "undefined") return;

      const { body } = document;
      const previousOverflow = body.style.overflow;

      if (isMobileViewport && isMobileOpen) {
         body.style.overflow = "hidden";
      }

      return () => {
         body.style.overflow = previousOverflow;
      };
   }, [isMobileOpen, isMobileViewport]);

   useEffect(() => {
      if (!isMobileViewport || !isMobileOpen || typeof window === "undefined") return;

      const handleKeyDown = (event: KeyboardEvent) => {
         if (event.key === "Escape") {
            setIsMobileOpen(false);
         }
      };

      window.addEventListener("keydown", handleKeyDown);

      return () => {
         window.removeEventListener("keydown", handleKeyDown);
      };
   }, [isMobileOpen, isMobileViewport]);

   useEffect(() => {
      if (!isMobileViewport || typeof window === "undefined") return;
      if (window.sessionStorage.getItem(CLOSE_ON_NAVIGATION_STORAGE_KEY) !== "1") return;

      window.sessionStorage.removeItem(CLOSE_ON_NAVIGATION_STORAGE_KEY);
      closeAfterNavigationTimeoutRef.current = window.setTimeout(() => {
         closeAfterNavigationFrameRef.current = window.requestAnimationFrame(() => {
            closeAfterNavigationTimeoutRef.current = window.setTimeout(() => {
               setIsMobileOpen(false);
               closeAfterNavigationTimeoutRef.current = null;
            }, CLOSE_AFTER_NAVIGATION_DELAY);
         });
      }, 0);

      return () => {
         if (closeAfterNavigationTimeoutRef.current) {
            clearTimeout(closeAfterNavigationTimeoutRef.current);
            closeAfterNavigationTimeoutRef.current = null;
         }

         if (closeAfterNavigationFrameRef.current !== null) {
            window.cancelAnimationFrame(closeAfterNavigationFrameRef.current);
            closeAfterNavigationFrameRef.current = null;
         }
      };
   }, [isMobileViewport, pathname]);

   useEffect(() => {
      if (
         !isMobileViewport ||
         typeof document === "undefined" ||
         typeof IntersectionObserver === "undefined"
      ) return;

      const footer = document.querySelector("footer");
      if (!footer) return;

      const observer = new IntersectionObserver(
         ([entry]) => {
            setIsFooterReached(entry.isIntersecting);
         },
         {
            rootMargin: FOOTER_VISIBILITY_ROOT_MARGIN,
            threshold: 0,
         }
      );

      observer.observe(footer);

      return () => {
         observer.disconnect();
      };
   }, [isMobileViewport, pathname]);

   const handleDialogClickCapture = (event: MouseEvent<HTMLDivElement>) => {
      if (!isMobileViewport || !isMobileOpen || typeof window === "undefined") return;

      const target = event.target;
      if (!(target instanceof Element)) return;

      const anchor = target.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      if (anchor.target === "_blank" || anchor.hasAttribute("download")) return;

      const nextUrl = new URL(anchor.href, window.location.href);
      if (nextUrl.origin !== window.location.origin) return;

      window.sessionStorage.setItem(CLOSE_ON_NAVIGATION_STORAGE_KEY, "1");
   };

   const isMobileToggleHidden = isMobileOpen || isFooterReached;

   return (
      <>
         <button
            type="button"
            className={`${styles.mobileToggle} ${isMobileToggleHidden ? styles.mobileToggleHidden : ""}`}
            onClick={() => setIsMobileOpen(true)}
            aria-haspopup="dialog"
            aria-expanded={isMobileOpen}
            aria-controls={dialogTitleId}
            aria-hidden={isMobileToggleHidden}
            disabled={isMobileToggleHidden}
         >
            Навигация по базе знаний
         </button>

         <div
            ref={stickyRef}
            className={`${styles.stickyRoot} ${isMobileOpen ? styles.stickyRootOpen : ""}`}
            data-mobile-open={isMobileOpen ? "true" : "false"}
         >
            <button
               type="button"
               className={styles.mobileBackdrop}
               aria-label="Закрыть навигацию по базе знаний"
               onClick={() => setIsMobileOpen(false)}
            />

            <div
               id={dialogTitleId}
               className={styles.mobileDialog}
               role={isMobileViewport ? "dialog" : undefined}
               aria-modal={isMobileViewport ? true : undefined}
               onClickCapture={handleDialogClickCapture}
               aria-label={isMobileViewport ? "Навигация по базе знаний" : undefined}
            >
               <div className={styles.mobileDialogHeader}>
                  <p className={styles.mobileDialogTitle}>Навигация по базе знаний</p>
                  <button
                     type="button"
                     className={styles.mobileClose}
                     onClick={() => setIsMobileOpen(false)}
                     aria-label="Закрыть навигацию"
                  >
                     <svg
                        aria-hidden="true"
                        focusable="false"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           d="M5 5L15 15M15 5L5 15"
                           stroke="currentColor"
                           strokeWidth="2"
                           strokeLinecap="round"
                        />
                     </svg>
                  </button>
               </div>

               <div className={styles.mobileDialogBody}>{children}</div>
            </div>
         </div>
      </>
   );
}
