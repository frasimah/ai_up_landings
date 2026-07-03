"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";

const FOOTER_REACHED_CLASS = "is-carrotquest-footer-reached";
const FOOTER_VISIBILITY_ROOT_MARGIN = "0px 0px -72px 0px";

const carrotQuestScript = `
  !function(){function t(t,e){return function(){window.carrotquestasync.push(t,arguments)}}if("undefined"==typeof carrotquest){var e=document.createElement("script");e.type="text/javascript",e.async=!0,e.src="https://cdn.carrotquest.app/api.min.js",document.getElementsByTagName("head")[0].appendChild(e),window.carrotquest={},window.carrotquestasync=[],carrotquest.settings={};for(var n=["connect","track","identify","auth","onReady","addCallback","removeCallback","trackMessageInteraction"],a=0;a<n.length;a++)carrotquest[n[a]]=t(n[a])}}(),carrotquest.connect("69862-b0895f7eeee1746bbd1fc5eb65");
`;

export default function CarrotQuestScript() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof document === "undefined" || typeof IntersectionObserver === "undefined") {
      return;
    }

    const root = document.documentElement;
    const footer = document.querySelector("footer");

    if (!footer) {
      root.classList.remove(FOOTER_REACHED_CLASS);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        root.classList.toggle(FOOTER_REACHED_CLASS, entry.isIntersecting);
      },
      {
        rootMargin: FOOTER_VISIBILITY_ROOT_MARGIN,
        threshold: 0,
      }
    );

    observer.observe(footer);

    return () => {
      observer.disconnect();
      root.classList.remove(FOOTER_REACHED_CLASS);
    };
  }, [pathname]);

  return (
    <Script id="carrotquest-widget" strategy="afterInteractive">
      {carrotQuestScript}
    </Script>
  );
}
