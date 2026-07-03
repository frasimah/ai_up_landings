"use client";

import { useMemo, useState } from "react";
import ArticleContentHtml from "@/components/ArticleContentHtml/ArticleContentHtml";

type PageSeoBottomContentProps = {
  html?: string | null;
  collapsible?: boolean;
};

function splitHtmlAfterFirstParagraph(html: string) {
  const firstParagraphMatch = html.match(/<\/p>/i);

  if (!firstParagraphMatch?.index && firstParagraphMatch?.index !== 0) {
    return { firstPart: html, restPart: "" };
  }

  const splitIndex = firstParagraphMatch.index + firstParagraphMatch[0].length;

  return {
    firstPart: html.slice(0, splitIndex),
    restPart: html.slice(splitIndex).trim(),
  };
}

export default function PageSeoBottomContent({
  html,
  collapsible = false,
}: PageSeoBottomContentProps) {
  const normalizedHtml = html?.trim() ?? "";
  const [isExpanded, setIsExpanded] = useState(false);

  const { firstPart, restPart } = useMemo(
    () => splitHtmlAfterFirstParagraph(normalizedHtml),
    [normalizedHtml],
  );

  if (!normalizedHtml) {
    return null;
  }

  const shouldCollapse = collapsible && Boolean(restPart);

  return (
    <section className="page-seo-bottom-content">
      <div className="container">
        <div className="article-content-shell">
          {shouldCollapse ? (
            <>
              <ArticleContentHtml html={firstPart} />
              {!isExpanded ? (
                <button
                  type="button"
                  className="page-seo-bottom-content__toggle"
                  aria-expanded={isExpanded}
                  onClick={() => setIsExpanded(true)}
                >
                  Читать дальше
                </button>
              ) : (
                <>
                  <ArticleContentHtml html={restPart} />
                  <button
                    type="button"
                    className="page-seo-bottom-content__toggle"
                    aria-expanded={isExpanded}
                    onClick={() => setIsExpanded(false)}
                  >
                    Скрыть
                  </button>
                </>
              )}
            </>
          ) : (
            <ArticleContentHtml html={normalizedHtml} />
          )}
        </div>
      </div>
    </section>
  );
}
