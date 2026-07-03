"use client";

const READY_API_URL = "https://ai-up.ru/api/ready";
const ACCOUNT_API_URL = "https://ai-up.ru/api/my/account";
const STORAGE_KEY = "aiup-header-auth-cache-v1";

export type AuthStatus = "loading" | "authenticated" | "guest";

export type AccountState = {
   rub: number;
   lead: number;
   gift: number;
};

type AccountResponse = {
   result?: Partial<AccountState>;
};

export type HeaderAuthSnapshot = {
   authStatus: Exclude<AuthStatus, "loading">;
   accountState: AccountState;
   updatedAt: number;
};

export const DEFAULT_ACCOUNT_STATE: AccountState = {
   rub: 0,
   lead: 0,
   gift: 0,
};

let memorySnapshot: HeaderAuthSnapshot | null = null;
let inflightPromise: Promise<HeaderAuthSnapshot> | null = null;
let blockCacheWrites = false;

function isBrowser() {
   return typeof window !== "undefined";
}

function canUseRemoteAuthApi() {
   if (!isBrowser()) {
      return false;
   }

   const host = window.location.hostname.toLowerCase();
   return host === "ai-up.ru" || host === "www.ai-up.ru";
}

function toSafeNumber(value: unknown): number {
   return typeof value === "number" && Number.isFinite(value) ? value : 0;
}

function sanitizeSnapshot(value: unknown): HeaderAuthSnapshot | null {
   if (!value || typeof value !== "object") {
      return null;
   }

   const snapshot = value as Partial<HeaderAuthSnapshot>;

   if (snapshot.authStatus !== "authenticated" && snapshot.authStatus !== "guest") {
      return null;
   }

   if (!snapshot.accountState || typeof snapshot.accountState !== "object") {
      return null;
   }

   return {
      authStatus: snapshot.authStatus,
      accountState: {
         rub: toSafeNumber(snapshot.accountState.rub),
         lead: toSafeNumber(snapshot.accountState.lead),
         gift: toSafeNumber(snapshot.accountState.gift),
      },
      updatedAt: typeof snapshot.updatedAt === "number" ? snapshot.updatedAt : 0,
   };
}

function readSnapshotFromStorage(): HeaderAuthSnapshot | null {
   if (!isBrowser()) {
      return null;
   }

   try {
      const rawValue = window.sessionStorage.getItem(STORAGE_KEY);
      if (!rawValue) {
         return null;
      }

      return sanitizeSnapshot(JSON.parse(rawValue));
   } catch {
      return null;
   }
}

function writeSnapshotToStorage(snapshot: HeaderAuthSnapshot) {
   if (!isBrowser() || blockCacheWrites) {
      return;
   }

   try {
      window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
   } catch {
      // ignore storage errors
   }
}

function clearSnapshotStorage() {
   if (!isBrowser()) {
      return;
   }

   try {
      window.sessionStorage.removeItem(STORAGE_KEY);
   } catch {
      // ignore storage errors
   }
}

async function fetchAuthStatus(): Promise<Exclude<AuthStatus, "loading">> {
   const response = await fetch(READY_API_URL, {
      method: "GET",
      credentials: "include",
      headers: {
         Accept: "application/json",
      },
   });

   if (response.ok) {
      return "authenticated";
   }

   if (response.status === 401 || response.status === 403) {
      return "guest";
   }

   throw new Error(`Ready request failed: ${response.status}`);
}

async function fetchAccountState(): Promise<AccountState> {
   const response = await fetch(ACCOUNT_API_URL, {
      method: "GET",
      credentials: "include",
      headers: {
         Accept: "application/json",
      },
   });

   if (!response.ok) {
      throw new Error(`Account request failed: ${response.status}`);
   }

   const data = (await response.json()) as AccountResponse;

   return {
      rub: toSafeNumber(data.result?.rub),
      lead: toSafeNumber(data.result?.lead),
      gift: toSafeNumber(data.result?.gift),
   };
}

async function createSnapshot(): Promise<HeaderAuthSnapshot> {
   if (!canUseRemoteAuthApi()) {
      return {
         authStatus: "guest",
         accountState: DEFAULT_ACCOUNT_STATE,
         updatedAt: Date.now(),
      };
   }

   const authStatus = await fetchAuthStatus();

   if (authStatus === "guest") {
      return {
         authStatus,
         accountState: DEFAULT_ACCOUNT_STATE,
         updatedAt: Date.now(),
      };
   }

   try {
      const accountState = await fetchAccountState();

      return {
         authStatus,
         accountState,
         updatedAt: Date.now(),
      };
   } catch (error) {
      console.error("Не удалось загрузить данные аккаунта", error);

      return {
         authStatus,
         accountState: DEFAULT_ACCOUNT_STATE,
         updatedAt: Date.now(),
      };
   }
}

export function getCachedHeaderAuthSnapshot(): HeaderAuthSnapshot | null {
   if (memorySnapshot) {
      return memorySnapshot;
   }

   const storageSnapshot = readSnapshotFromStorage();
   if (!storageSnapshot) {
      return null;
   }

   memorySnapshot = storageSnapshot;
   return storageSnapshot;
}

export function shouldForceHeaderAuthRefresh(): boolean {
   if (!isBrowser()) {
      return false;
   }

   return document.referrer.startsWith("https://ai-up.ru/app/");
}

export async function loadHeaderAuthSnapshot(options?: { force?: boolean }): Promise<HeaderAuthSnapshot> {
   const cachedSnapshot = getCachedHeaderAuthSnapshot();
   const shouldUseCache = !options?.force && cachedSnapshot && !canUseRemoteAuthApi();

   if (shouldUseCache) {
      return cachedSnapshot;
   }

   if (!inflightPromise) {
      inflightPromise = createSnapshot()
         .then((snapshot) => {
            if (!blockCacheWrites) {
               if (snapshot.authStatus === "guest") {
                  memorySnapshot = null;
                  clearSnapshotStorage();
               } else {
                  memorySnapshot = snapshot;
                  writeSnapshotToStorage(snapshot);
               }
            }
            return snapshot;
         })
         .finally(() => {
            inflightPromise = null;
         });
   }

   return inflightPromise;
}

export function resetHeaderAuthSnapshotCache() {
   blockCacheWrites = true;
   memorySnapshot = null;
   inflightPromise = null;
   clearSnapshotStorage();
}
