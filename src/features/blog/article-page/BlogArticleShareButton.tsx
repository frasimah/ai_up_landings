'use client';

import Button from "@/components/Buttons/Button";
import { useEffect, useState } from "react";

type BlogArticleShareButtonProps = {
  className?: string;
  labelClassName?: string;
  buttonClassName?: string;
  buttonContentClassName?: string;
  textClassName?: string;
};

const DEFAULT_TEXT = "Скопировать ссылку";
const SUCCESS_TEXT = "Ссылка скопирована";

export default function BlogArticleShareButton({
  className,
  labelClassName,
  buttonClassName,
  buttonContentClassName,
  textClassName,
}: BlogArticleShareButtonProps) {
  const [buttonText, setButtonText] = useState(DEFAULT_TEXT);

  useEffect(() => {
    if (buttonText === DEFAULT_TEXT) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setButtonText(DEFAULT_TEXT);
    }, 2000);

    return () => window.clearTimeout(timeoutId);
  }, [buttonText]);

  const handleClick = async () => {
    const url = window.location.href;

    try {
      await navigator.clipboard.writeText(url);
      setButtonText(SUCCESS_TEXT);
    } catch {
      window.prompt("Скопируйте ссылку на статью", url);
    }
  };

  return (
    <div className={className}>
      <span className={labelClassName}>Понравилась статья?</span>
      <Button className={buttonClassName} onClick={handleClick}>
        <span className={buttonContentClassName}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M15 5l-1.4 1.4L17.2 10H4v2h13.2l-3.6 3.6L15 17l6-6-6-6z" fill="currentColor" />
          </svg>
          <span className={textClassName}>{buttonText}</span>
        </span>
      </Button>
    </div>
  );
}
