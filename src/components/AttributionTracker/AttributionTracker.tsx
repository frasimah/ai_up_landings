"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  ATTRIBUTION_COOKIE_MAX_AGE,
  ATTRIBUTION_COOKIE_NAME,
  type AttributionPayload,
  formatCookieValue,
  mergeAttributionPayload,
  parseAttributionCookie,
  readTrackedUtms,
  REF_COOKIE_NAME,
  serializeAttributionCookie,
  YANDEX_METRIKA_COUNTER_ID,
} from "@/lib/attribution";

declare global {
  interface Window {
    ym?: (
      counterId: number,
      method: "getClientID",
      callback: (clientId: string) => void,
    ) => void;
  }
}

const METRIKA_RETRY_DELAY_MS = 1500;
const METRIKA_MAX_RETRIES = 10;

function readCookie(cookieName: string): string | null {
  const cookiePrefix = `${cookieName}=`;

  for (const chunk of document.cookie.split(";")) {
    const normalizedChunk = chunk.trim();

    if (normalizedChunk.startsWith(cookiePrefix)) {
      return decodeURIComponent(normalizedChunk.slice(cookiePrefix.length));
    }
  }

  return null;
}

function persistAttributionPayload(nextPayload: AttributionPayload) {
  const currentPayload = parseAttributionCookie(
    readCookie(ATTRIBUTION_COOKIE_NAME) ?? undefined,
  );
  const mergedPayload = mergeAttributionPayload(currentPayload, nextPayload);
  const secure = window.location.protocol === "https:";

  document.cookie = formatCookieValue(
    ATTRIBUTION_COOKIE_NAME,
    serializeAttributionCookie(mergedPayload),
    {
      maxAge: ATTRIBUTION_COOKIE_MAX_AGE,
      path: "/",
      sameSite: "lax",
      secure,
    },
  );

  if (typeof mergedPayload.ref_id === "string" && mergedPayload.ref_id) {
    document.cookie = formatCookieValue(REF_COOKIE_NAME, mergedPayload.ref_id, {
      maxAge: ATTRIBUTION_COOKIE_MAX_AGE,
      path: "/",
      sameSite: "lax",
      secure,
    });
  }
}

export default function AttributionTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const search = searchParams.toString();

  useEffect(() => {
    const landingPage = search ? `${pathname}?${search}` : pathname;
    const trackedUtms = readTrackedUtms(new URLSearchParams(search));
    const refId = new URLSearchParams(search).get("ref")?.trim();

    persistAttributionPayload({
      ...trackedUtms,
      ...(refId ? { ref_id: refId } : {}),
      landing_page: landingPage,
    });
  }, [pathname, search]);

  useEffect(() => {
    let retries = 0;
    let timerId: number | null = null;

    const updateMetrikaClientId = () => {
      if (typeof window.ym !== "function") {
        if (retries >= METRIKA_MAX_RETRIES) {
          return;
        }

        retries += 1;
        timerId = window.setTimeout(updateMetrikaClientId, METRIKA_RETRY_DELAY_MS);
        return;
      }

      window.ym(
        YANDEX_METRIKA_COUNTER_ID,
        "getClientID",
        (clientId: string) => {
          if (!clientId?.trim()) {
            return;
          }

          persistAttributionPayload({
            metrika_client_id: clientId,
          });
        },
      );
    };

    updateMetrikaClientId();

    return () => {
      if (timerId !== null) {
        window.clearTimeout(timerId);
      }
    };
  }, []);

  return null;
}
