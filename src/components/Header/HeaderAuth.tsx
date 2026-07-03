"use client";

import { useEffect, useState } from "react";
import { APP_ROUTES } from "@/lib/routes";
import Button from "../Buttons/Button";
import styles from "./HeaderAuth.module.scss";
import {
   DEFAULT_ACCOUNT_STATE,
   getCachedHeaderAuthSnapshot,
   loadHeaderAuthSnapshot,
   resetHeaderAuthSnapshotCache,
   shouldForceHeaderAuthRefresh,
   type AccountState,
   type AuthStatus,
} from "./headerAuthStore";

type HeaderAuthProps = {
   loginButtonsNoBorder?: boolean;
};

function formatNumber(value: number): string {
   return value.toLocaleString("ru-RU");
}

function HeaderAuth({ loginButtonsNoBorder = false }: HeaderAuthProps) {
   const [authStatus, setAuthStatus] = useState<AuthStatus>("loading");
   const [accountState, setAccountState] = useState<AccountState>(DEFAULT_ACCOUNT_STATE);
   const [isProfileListActive, setIsProfileListActive] = useState(false);
   const [isInitialLoading, setIsInitialLoading] = useState(true);
   const [isLoggingOut, setIsLoggingOut] = useState(false);
   const isLoading = isInitialLoading && authStatus === "loading";
   const isUserLogin = authStatus === "authenticated";

   useEffect(() => {
      let isCancelled = false;
      const cachedSnapshot = getCachedHeaderAuthSnapshot();

      if (cachedSnapshot) {
         setAuthStatus(cachedSnapshot.authStatus);
         setAccountState(cachedSnapshot.accountState);
         setIsInitialLoading(false);
      }

      const syncHeaderState = async () => {
         try {
            const snapshot = await loadHeaderAuthSnapshot({
               force: shouldForceHeaderAuthRefresh(),
            });

            if (isCancelled) {
               return;
            }

            setAuthStatus(snapshot.authStatus);
            setAccountState(snapshot.accountState);
         } catch (error) {
            if (isCancelled) {
               return;
            }

            console.error("Не удалось загрузить состояние шапки", error);

            if (!cachedSnapshot) {
               setAuthStatus("guest");
            }
         } finally {
            if (!isCancelled) {
               setIsInitialLoading(false);
            }
         }
      };

      void syncHeaderState();

      return () => {
         isCancelled = true;
      };
   }, []);

   const handleProfileList = () => {
      setIsProfileListActive((value) => !value);
   };

   const closeProfileList = () => {
      setIsProfileListActive(false);
   };

   const clearCookie = (cookieName: string) => {
      if (typeof document === "undefined" || typeof window === "undefined") {
         return;
      }

      const expires = "Thu, 01 Jan 1970 00:00:00 GMT";
      const host = window.location.hostname.toLowerCase();
      const secure = window.location.protocol === "https:" ? "; Secure" : "";
      const domains = new Set<string>([host]);

      if (host === "ai-up.ru" || host.endsWith(".ai-up.ru")) {
         domains.add(".ai-up.ru");
      }

      const paths = ["/", "/app"];
      const sameSites = ["Lax", "Strict", "None"] as const;

      for (const path of paths) {
         for (const sameSite of sameSites) {
            document.cookie = `${cookieName}=; Expires=${expires}; Max-Age=0; Path=${path}; SameSite=${sameSite}${secure}`;
         }

         for (const domain of domains) {
            for (const sameSite of sameSites) {
               document.cookie = `${cookieName}=; Expires=${expires}; Max-Age=0; Path=${path}; Domain=${domain}; SameSite=${sameSite}${secure}`;
            }
         }
      }
   };

   const clearClientAuthCookies = () => {
      clearCookie("jwt");
      clearCookie("aiup-user-id");
   };

   const handleLogout = async () => {
      if (isLoggingOut) {
         return;
      }

      setIsLoggingOut(true);

      try {
         await fetch("/auth/logout", {
            method: "POST",
            credentials: "include",
            cache: "no-store",
         });
      } catch (error) {
         console.error("Не удалось завершить logout через endpoint", error);
      }

      clearClientAuthCookies();
      resetHeaderAuthSnapshotCache();
      setAuthStatus("guest");
      setAccountState(DEFAULT_ACCOUNT_STATE);
      setIsProfileListActive(false);

      if (typeof window !== "undefined") {
         window.location.reload();
      }
   };

   return (
      <>
         {isLoading && (
            <>
               <Button
                  variant="black"
                  noBorder={loginButtonsNoBorder}
                  className={styles.skeletonButton}
                  disabled
                  aria-hidden="true"
                  tabIndex={-1}
               >
                  <span className={styles.skeletonButtonText}>Войти</span>
               </Button>
               <Button
                  variant="blue"
                  noBorder={loginButtonsNoBorder}
                  className={styles.skeletonButton}
                  disabled
                  aria-hidden="true"
                  tabIndex={-1}
               >
                  <span className={styles.skeletonButtonText}>Создать аккаунт</span>
               </Button>
            </>
         )}
         {!isLoading && !isUserLogin && (
            <>
               <Button variant="black" noBorder={loginButtonsNoBorder} href={APP_ROUTES.signIn}>
                  Войти
               </Button>
               <Button variant="blue" noBorder={loginButtonsNoBorder} href={APP_ROUTES.signUp}>
                  Создать аккаунт
               </Button>
            </>
         )}
         {isUserLogin && (
            <div className={`profile ${isProfileListActive ? "active" : ""}`}>
               <button type="button" className="profile_btn profile_btn--blue" onClick={handleProfileList}>
                  Профиль
                  <div className="profile_btn_icon">
                     <svg width={13} height={8} viewBox="0 0 13 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.552734 0.506836L6.05273 6.50684L11.5527 0.506838" stroke="white" strokeWidth="1.5" />
                     </svg>
                  </div>
               </button>

               <div className="profile_list">
                  <div className="profile_list_head">
                     <div className="profile_list_head_it">
                        <div className="profile_list_head_it_icon">
                           <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 15 15" fill="none">
                              <g clipPath="url(#clip0_2740_11840)">
                                 <path d="M5 7.5C7.06813 7.5 8.75 5.81812 8.75 3.75C8.75 1.68187 7.06813 0 5 0C2.93188 0 1.25 1.68187 1.25 3.75C1.25 5.81812 2.93188 7.5 5 7.5ZM5 1.25C6.37875 1.25 7.5 2.37125 7.5 3.75C7.5 5.12875 6.37875 6.25 5 6.25C3.62125 6.25 2.5 5.12875 2.5 3.75C2.5 2.37125 3.62125 1.25 5 1.25ZM10 13.75V14.375C10 14.72 9.72 15 9.375 15C9.03 15 8.75 14.72 8.75 14.375V13.75C8.75 11.6819 7.06813 10 5 10C2.93188 10 1.25 11.6819 1.25 13.75V14.375C1.25 14.72 0.97 15 0.625 15C0.28 15 0 14.72 0 14.375V13.75C0 10.9931 2.24313 8.75 5 8.75C7.75688 8.75 10 10.9931 10 13.75ZM14.8106 6.38562L12.3156 8.8075C11.9525 9.17125 11.4606 9.37437 10.9375 9.37437C10.4144 9.37437 9.9225 9.17062 9.55313 8.80125L8.32125 7.6425C8.07 7.40625 8.05813 7.01062 8.295 6.75875C8.53188 6.5075 8.92688 6.49563 9.17875 6.7325L10.4238 7.90438C10.7181 8.19812 11.1706 8.185 11.4381 7.9175L13.9394 5.48875C14.1869 5.24812 14.5825 5.25438 14.8231 5.50188C15.0638 5.74938 15.0575 6.14563 14.81 6.38562H14.8106Z" fill="#0169F9" />
                              </g>
                              <defs>
                                 <clipPath id="clip0_2740_11840">
                                    <rect width={15} height={15} fill="white" />
                                 </clipPath>
                              </defs>
                           </svg>
                        </div>
                        <span>{formatNumber(accountState.lead)}</span>
                     </div>
                     <div className="profile_list_head_it">
                        <div className="profile_list_head_it_icon">
                           <svg xmlns="http://www.w3.org/2000/svg" width={15} height={15} viewBox="0 0 15 15" fill="none">
                              <path d="M13.125 3.75H3.125C2.58812 3.75 2.08 3.5175 1.72813 3.12563C2.07188 2.74188 2.57125 2.5 3.125 2.5H14.375C14.7206 2.5 15 2.22 15 1.875C15 1.53 14.7206 1.25 14.375 1.25H3.125C1.39938 1.25 0 2.64938 0 4.375V10.625C0 12.3506 1.39938 13.75 3.125 13.75H13.125C14.1606 13.75 15 12.9106 15 11.875V5.625C15 4.58938 14.1606 3.75 13.125 3.75ZM13.75 11.875C13.75 12.2194 13.47 12.5 13.125 12.5H3.125C2.09125 12.5 1.25 11.6588 1.25 10.625V4.37375C1.78375 4.77313 2.44 5 3.125 5H13.125C13.47 5 13.75 5.28063 13.75 5.625V11.875ZM12.5 8.75C12.5 9.095 12.22 9.375 11.875 9.375C11.53 9.375 11.25 9.095 11.25 8.75C11.25 8.405 11.53 8.125 11.875 8.125C12.22 8.125 12.5 8.405 12.5 8.75Z" fill="#0169F9" />
                           </svg>
                        </div>
                        <span>{formatNumber(accountState.rub)}</span>
                     </div>
                  </div>
                  <div className="profile_list_links">
                     <a href={APP_ROUTES.projects} className="profile_list_links_it" onClick={closeProfileList}>
                        Мои проекты
                     </a>
                     <a href={APP_ROUTES.wallet} className="profile_list_links_it" onClick={closeProfileList}>
                        Кошелек
                     </a>
                     <a href={APP_ROUTES.settings} className="profile_list_links_it" onClick={closeProfileList}>
                        Настройки
                     </a>
                     <button type="button" className="profile_list_links_it" onClick={handleLogout} disabled={isLoggingOut}>
                        {isLoggingOut ? "Выход..." : "Выйти"}
                     </button>
                  </div>
               </div>
            </div>
         )}
      </>
   );
}

export default HeaderAuth;
