import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import {
  ATTRIBUTION_COOKIE_MAX_AGE,
  ATTRIBUTION_COOKIE_NAME,
  mergeAttributionPayload,
  parseAttributionCookie,
  readTrackedUtms,
  REF_COOKIE_NAME,
  serializeAttributionCookie,
} from "@/lib/attribution";

export function middleware(request: NextRequest) {
  const refId = request.nextUrl.searchParams.get("ref")?.trim();
  const trackedUtms = readTrackedUtms(request.nextUrl.searchParams);
  const hasTrackedUtms = Object.keys(trackedUtms).length > 0;
  const landingPage = `${request.nextUrl.pathname}${request.nextUrl.search}`;
  const response = NextResponse.next();

  if (refId) {
    response.cookies.set({
      name: REF_COOKIE_NAME,
      value: refId,
      httpOnly: false,
      maxAge: ATTRIBUTION_COOKIE_MAX_AGE,
      path: "/",
      sameSite: "lax",
      secure: request.nextUrl.protocol === "https:",
    });
  }

  if (refId || hasTrackedUtms) {
    const currentAttribution = parseAttributionCookie(
      request.cookies.get(ATTRIBUTION_COOKIE_NAME)?.value,
    );

    const nextAttribution = mergeAttributionPayload(currentAttribution, {
      ...trackedUtms,
      ...(refId ? { ref_id: refId } : {}),
      landing_page: landingPage,
    });

    response.cookies.set({
      name: ATTRIBUTION_COOKIE_NAME,
      value: serializeAttributionCookie(nextAttribution),
      httpOnly: false,
      maxAge: ATTRIBUTION_COOKIE_MAX_AGE,
      path: "/",
      sameSite: "lax",
      secure: request.nextUrl.protocol === "https:",
    });
  }

  return response;
}

export const config = {
  matcher: "/:path*",
};
