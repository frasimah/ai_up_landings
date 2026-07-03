"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "../Buttons/Button";
import styles from "./CookieBanner.module.scss";

const COOKIE_BANNER_STORAGE_KEY = "aiup-cookie-banner-accepted-at";
const COOKIE_BANNER_TTL_MS = 365 * 24 * 60 * 60 * 1000;

type CookieBannerDecisionStatus = "accepted" | "rejected";

type CookieBannerDecision = {
  status: CookieBannerDecisionStatus;
  timestamp: number;
};

function getCookieBannerDecisionTimestamp(value: string): number | null {
  const legacyTimestamp = Number(value);

  if (Number.isFinite(legacyTimestamp)) {
    return legacyTimestamp;
  }

  try {
    const parsedValue = JSON.parse(value) as Partial<CookieBannerDecision>;

    if (
      (parsedValue.status === "accepted" || parsedValue.status === "rejected") &&
      Number.isFinite(parsedValue.timestamp)
    ) {
      return Number(parsedValue.timestamp);
    }
  } catch {
    return null;
  }

  return null;
}

function hasValidCookieBannerDecision(): boolean {
  if (typeof window === "undefined") {
    return true;
  }

  try {
    const storedValue = window.localStorage.getItem(COOKIE_BANNER_STORAGE_KEY);

    if (!storedValue) {
      return false;
    }

    const decisionTimestamp = getCookieBannerDecisionTimestamp(storedValue);

    if (decisionTimestamp === null) {
      window.localStorage.removeItem(COOKIE_BANNER_STORAGE_KEY);
      return false;
    }

    const isDecisionActive = Date.now() - decisionTimestamp < COOKIE_BANNER_TTL_MS;

    if (!isDecisionActive) {
      window.localStorage.removeItem(COOKIE_BANNER_STORAGE_KEY);
    }

    return isDecisionActive;
  } catch {
    return false;
  }
}

function saveCookieBannerDecision(status: CookieBannerDecisionStatus) {
  const decision: CookieBannerDecision = {
    status,
    timestamp: Date.now(),
  };

  window.localStorage.setItem(
    COOKIE_BANNER_STORAGE_KEY,
    JSON.stringify(decision),
  );
}

export default function CookieBanner() {
  const [isVisible, setIsVisible] = useState<boolean | null>(null);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      setIsVisible(!hasValidCookieBannerDecision());
    });

    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, []);

  const handleDecision = (status: CookieBannerDecisionStatus) => {
    try {
      saveCookieBannerDecision(status);
    } catch {
      // Если localStorage недоступен, просто скрываем плашку до перезагрузки.
    }

    setIsVisible(false);
  };

  const handleReject = () => {
    handleDecision("rejected");
  };

  const handleAccept = () => {
    handleDecision("accepted");
  };

  if (isVisible !== true) {
    return null;
  }

  return (
    <div className={styles.banner} aria-live="polite">
      <section
        className={styles.banner__card}
        aria-label="Уведомление об использовании cookies"
      >
        <p className={styles.banner__text}>
          Мы используем файлы cookie для улучшения работы сайта. Продолжая
          использовать сайт, вы соглашаетесь с{" "}
          <Link className={styles.banner__accent} href="/privacy">
            политикой конфиденциальности
          </Link>
          .
        </p>
        <div className={styles.banner_btns}>
          <Button
            className={styles.banner__button}
            onClick={handleReject}
            variant="black"
          >
            Отклонить
          </Button>
          <Button className={styles.banner__button} onClick={handleAccept}>
            Принять
          </Button>
        </div>
      </section>
    </div>
  );
}
