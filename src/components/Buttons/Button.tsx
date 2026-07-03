"use client";

import React from "react";
import Link from "next/link";
import styles from "./Button.module.scss";
import classNames from "classnames";
import { APP_ROUTES, SITE_ROUTES } from "@/lib/routes";

type CommonProps = {
   children: React.ReactNode;
   variant?: "blue" | "black" | "white";
   size?: "small" | "medium" | "large";
   disabled?: boolean;
   icon?: boolean;
   noBorder?: boolean;
   className?: string;
};

type ButtonAsButtonProps = CommonProps &
   Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
      href?: undefined;
   };

type ButtonAsLinkProps = CommonProps &
   Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children" | "href"> & {
      href: string;
   };

type ButtonProps = ButtonAsButtonProps | ButtonAsLinkProps;

// Маркетинговые CTA на сайте ведут в приложение, если href явно не задан.
function resolveMarketingHref(children: React.ReactNode): string | undefined {
   const label = React.Children.toArray(children)
      .filter((child): child is string => typeof child === "string")
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

   switch (label) {
      case "Войти":
         return APP_ROUTES.signIn;
      case "Создать аккаунт":
      case "Зарегистрироваться":
      case "Попробовать":
      case "Пополнить баланс":
      case "Включить колл-центр":
      case "Создать источник":
      case "Включить Ai Flow":
      case "Включить Ai Flow":
      case "Запустить Ai Flow":
      case "Получить свою ссылку":
      case "Стать партнером":
         return APP_ROUTES.signUp;
      case "Что такое Ai Flow":
      case "Подробнее про Ai Flow":
      case "Подробнее про Ai Flow":
         return SITE_ROUTES.aiFlow;
      default:
         return undefined;
   }
}

function isExternalHref(href: string): boolean {
   return /^https?:\/\//i.test(href);
}

function mergeRelValue(rel: string | undefined, defaultRel: string): string {
   const relParts = new Set(
      `${rel ?? ""} ${defaultRel}`
         .split(/\s+/)
         .map((item) => item.trim())
         .filter(Boolean)
   );

   return Array.from(relParts).join(" ");
}

export default function Button({
   children,
   variant = "blue",
   size = "large",
   disabled = false,
   icon = false,
   noBorder = true,
   className = "",
   href,
   ...restProps
}: ButtonProps) {
   const resolvedHref = href ?? resolveMarketingHref(children);

   const btnClass = classNames(
      styles.button,
      styles[`button--${variant}`],
      styles[`button--${size}`],
      {
         [styles["button--noBorder"]]: noBorder,
      }
   );

   const content = (
      <>
         {children}
         {icon && (
            <div className={styles.icon}>
               <svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 13L13 1M13 1H2.2M13 1V11.8" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
               </svg>
            </div>
         )}
      </>
   );

   if (resolvedHref) {
      const anchorProps = restProps as Omit<
         React.AnchorHTMLAttributes<HTMLAnchorElement>,
         "className" | "children" | "href"
      >;
      const isExternal = isExternalHref(resolvedHref);

      return (
         <Link
            href={resolvedHref}
            className={`${btnClass} ${className ? className : ""}`}
            aria-disabled={disabled || undefined}
            target={anchorProps.target ?? (isExternal ? "_blank" : undefined)}
            rel={isExternal ? mergeRelValue(anchorProps.rel, "noopener noreferrer") : anchorProps.rel}
            onClick={(event) => {
               if (disabled) {
                  event.preventDefault();
                  return;
               }
               anchorProps.onClick?.(event);
            }}
            tabIndex={disabled ? -1 : anchorProps.tabIndex}
            {...anchorProps}
         >
            {content}
         </Link>
      );
   }

   const buttonProps = restProps as Omit<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      "className" | "children"
   >;

   return (
      <button
         className={`${btnClass} ${className ? className : ""}`}
         disabled={disabled}
         type={buttonProps.type ?? "button"}
         {...buttonProps}
      >
         {content}
      </button>
   );
}
