export const REF_COOKIE_NAME = "ai_up_ref_id";
export const ATTRIBUTION_COOKIE_NAME = "ai_up_attribution";
export const ATTRIBUTION_COOKIE_MAX_AGE = 60 * 60 * 24 * 30;
export const YANDEX_METRIKA_COUNTER_ID = 97068190;

const TRACKED_UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
] as const;

export type TrackedUtmKey = (typeof TRACKED_UTM_KEYS)[number];

export type AttributionPayload = Partial<Record<TrackedUtmKey, string>> & {
  ref_id?: string;
  landing_page?: string;
  metrika_client_id?: string;
};

type CookieOptions = {
  maxAge?: number;
  path?: string;
  sameSite?: "lax" | "strict" | "none";
  secure?: boolean;
};

export function readTrackedUtms(
  searchParams: URLSearchParams,
): Partial<Record<TrackedUtmKey, string>> {
  return TRACKED_UTM_KEYS.reduce<Partial<Record<TrackedUtmKey, string>>>(
    (accumulator, key) => {
      const value = searchParams.get(key)?.trim();

      if (value) {
        accumulator[key] = value;
      }

      return accumulator;
    },
    {},
  );
}

export function mergeAttributionPayload(
  currentPayload: AttributionPayload,
  nextPayload: AttributionPayload,
): AttributionPayload {
  const mergedPayload: AttributionPayload = { ...currentPayload };

  for (const [key, value] of Object.entries(nextPayload) as Array<
    [keyof AttributionPayload, AttributionPayload[keyof AttributionPayload]]
  >) {
    if (typeof value === "string") {
      const trimmedValue = value.trim();

      if (trimmedValue) {
        mergedPayload[key] = trimmedValue;
      }
    }
  }

  return mergedPayload;
}

export function parseAttributionCookie(
  value: string | undefined,
): AttributionPayload {
  if (!value) {
    return {};
  }

  try {
    const decodedValue = decodeBase64(value);
    const parsedValue = JSON.parse(decodedValue) as AttributionPayload;

    if (!parsedValue || typeof parsedValue !== "object") {
      return {};
    }

    return sanitizeAttributionPayload(parsedValue);
  } catch {
    return {};
  }
}

export function serializeAttributionCookie(
  payload: AttributionPayload,
): string {
  return encodeBase64(JSON.stringify(sanitizeAttributionPayload(payload)));
}

export function formatCookieValue(
  name: string,
  value: string,
  options: CookieOptions = {},
): string {
  const segments = [`${name}=${encodeURIComponent(value)}`];

  if (typeof options.maxAge === "number") {
    segments.push(`Max-Age=${options.maxAge}`);
  }

  segments.push(`Path=${options.path ?? "/"}`);
  segments.push(`SameSite=${options.sameSite ?? "Lax"}`);

  if (options.secure) {
    segments.push("Secure");
  }

  return segments.join("; ");
}

function sanitizeAttributionPayload(
  payload: AttributionPayload,
): AttributionPayload {
  const sanitizedPayload: AttributionPayload = {};

  for (const key of TRACKED_UTM_KEYS) {
    const value = payload[key];

    if (typeof value === "string" && value.trim()) {
      sanitizedPayload[key] = value.trim();
    }
  }

  if (typeof payload.ref_id === "string" && payload.ref_id.trim()) {
    sanitizedPayload.ref_id = payload.ref_id.trim();
  }

  if (
    typeof payload.landing_page === "string" &&
    payload.landing_page.trim()
  ) {
    sanitizedPayload.landing_page = payload.landing_page.trim();
  }

  if (
    typeof payload.metrika_client_id === "string" &&
    payload.metrika_client_id.trim()
  ) {
    sanitizedPayload.metrika_client_id = payload.metrika_client_id.trim();
  }

  return sanitizedPayload;
}

function encodeBase64(value: string): string {
  if (typeof btoa === "function") {
    return btoa(encodeUtf8ToBinary(value));
  }

  return Buffer.from(value, "utf8").toString("base64");
}

function decodeBase64(value: string): string {
  if (typeof atob === "function") {
    return decodeBinaryToUtf8(atob(value));
  }

  return Buffer.from(value, "base64").toString("utf8");
}

function encodeUtf8ToBinary(value: string): string {
  const bytes = new TextEncoder().encode(value);

  return Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");
}

function decodeBinaryToUtf8(value: string): string {
  const bytes = Uint8Array.from(value, (char) => char.charCodeAt(0));

  return new TextDecoder().decode(bytes);
}
