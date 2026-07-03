import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const EXPIRES_UTC = "Thu, 01 Jan 1970 00:00:00 GMT";
const COOKIE_NAMES = ["jwt", "aiup-user-id"] as const;

function appendClearCookie(
   response: NextResponse,
   cookieName: string,
   options: { path: string; domain?: string },
) {
   const base = [
      `${cookieName}=`,
      `Expires=${EXPIRES_UTC}`,
      "Max-Age=0",
      `Path=${options.path}`,
      "SameSite=Lax",
   ];

   if (options.domain) {
      base.push(`Domain=${options.domain}`);
   }

   const baseCookie = base.join("; ");

   response.headers.append("Set-Cookie", baseCookie);
   response.headers.append("Set-Cookie", `${baseCookie}; Secure`);
   response.headers.append("Set-Cookie", `${baseCookie}; HttpOnly`);
   response.headers.append("Set-Cookie", `${baseCookie}; Secure; HttpOnly`);
}

function resolveCookieDomains(request: NextRequest): string[] {
   const host = request.headers.get("host")?.split(":")[0]?.trim().toLowerCase();
   if (!host) return [];

   if (host === "localhost" || /^\d+\.\d+\.\d+\.\d+$/.test(host)) {
      return [];
   }

   const domains = new Set<string>([host]);
   if (host === "ai-up.ru" || host.endsWith(".ai-up.ru")) {
      domains.add(".ai-up.ru");
   }

   return Array.from(domains);
}

export async function POST(request: NextRequest) {
   const response = NextResponse.json({ ok: true });
   const domains = resolveCookieDomains(request);
   const paths = ["/", "/app"];

   for (const cookieName of COOKIE_NAMES) {
      for (const path of paths) {
         appendClearCookie(response, cookieName, { path });

         for (const domain of domains) {
            appendClearCookie(response, cookieName, { path, domain });
         }
      }
   }

   return response;
}
