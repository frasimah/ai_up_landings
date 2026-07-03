import { parse, type HTMLElement } from "next/dist/compiled/node-html-parser";
import { type ReactNode } from "react";
import { env } from "@/lib/env";

type ArticleContentHtmlProps = {
   html?: string;
   fallback?: ReactNode;
};

type HtmlParserElement = HTMLElement & {
   previousElementSibling?: HTMLElement | null;
   getAttribute?: (name: string) => string | undefined;
   setAttribute?: (name: string, value: string) => void;
   parentNode?: {
      tagName?: string;
      removeChild?: (node: HTMLElement) => void;
   } | null;
   remove?: () => void;
};

const STRAPI_UPLOADS_PATH = "/uploads/";
const STRAPI_PUBLIC_URL = env.strapiPublicUrl ?? "https://strapi.ai-up.ru";

function escapeHtmlAttribute(value: string) {
   return value
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
}

function buildWebpUploadUrl(rawUrl: string) {
   try {
      const parsedUrl = new URL(rawUrl);

      if (!parsedUrl.href.startsWith(STRAPI_PUBLIC_URL + STRAPI_UPLOADS_PATH)) {
         return null;
      }

      const segments = parsedUrl.pathname.split("/");
      const fileName = segments.at(-1);

      if (!fileName) return null;

      const matched = fileName.match(/^(?:(thumbnail|small|medium|large)_)?(.+)\.(png|jpe?g)$/i);

      if (!matched) return null;

      const [, variant, baseName] = matched;
      const webpFileName = variant
         ? `${variant}_webp_${variant}_${baseName}.webp`
         : `webp_${baseName}.webp`;

      segments[segments.length - 1] = webpFileName;
      parsedUrl.pathname = segments.join("/");

      return parsedUrl.toString();
   } catch {
      return null;
   }
}

function buildWebpSrcSet(srcset: string) {
   const entries = srcset
      .split(",")
      .map((entry) => entry.trim())
      .filter(Boolean);

   const webpEntries = entries
      .map((entry) => {
         const [urlPart, ...descriptorParts] = entry.split(/\s+/);
         const webpUrl = buildWebpUploadUrl(urlPart);

         if (!webpUrl) return null;

         const descriptor = descriptorParts.join(" ");
         return descriptor ? `${webpUrl} ${descriptor}` : webpUrl;
      })
      .filter((entry): entry is string => Boolean(entry));

   return webpEntries.length > 0 ? webpEntries.join(", ") : null;
}

function normalizeArticleImage(imgNode: HTMLElement) {
   const imgElement = imgNode as HtmlParserElement;

   if (imgElement.parentNode?.tagName === "PICTURE") {
      return;
   }

   const src = imgElement.getAttribute?.("src")?.trim();
   const currentAlt = imgElement.getAttribute?.("alt")?.trim();

   if (!src) {
      return;
   }

   if (!currentAlt) {
      imgElement.setAttribute?.("alt", "Иллюстрация к статье Ai-UP");
   }

   const webpSrc = buildWebpUploadUrl(src);
   const srcset = imgElement.getAttribute?.("srcset")?.trim() ?? "";
   const webpSrcSet = srcset ? buildWebpSrcSet(srcset) : null;

   if (!webpSrc && !webpSrcSet) {
      return;
   }

   const sizes = imgElement.getAttribute?.("sizes")?.trim();
   const sourceAttributes = [
      'type="image/webp"',
      webpSrcSet
         ? `srcset="${escapeHtmlAttribute(webpSrcSet)}"`
         : webpSrc
           ? `srcset="${escapeHtmlAttribute(webpSrc)}"`
           : "",
      sizes ? `sizes="${escapeHtmlAttribute(sizes)}"` : "",
   ]
      .filter(Boolean)
      .join(" ");

   imgNode.replaceWith(`<picture><source ${sourceAttributes}>${imgNode.toString()}</picture>`);
}

function normalizeQuoteBlockquoteContent(blockquoteNode: HTMLElement) {
   const blockquoteHtml = blockquoteNode.toString();
   const paragraphs = blockquoteNode.querySelectorAll("p") as HTMLElement[];

   if (paragraphs.length > 0) {
      const firstParagraphHtml = paragraphs[0].toString();
      const normalizedFirstParagraphHtml = firstParagraphHtml.replace(
         /(<p\b[^>]*>\s*)Цитата:\s*/u,
         "$1",
      );

      return blockquoteHtml.replace(firstParagraphHtml, normalizedFirstParagraphHtml);
   }

   return blockquoteHtml.replace(/(<blockquote\b[^>]*>\s*)Цитата:\s*/u, "$1");
}

function normalizeQuoteBlockquote(blockquoteNode: HTMLElement) {
   const blockquoteHtml = normalizeQuoteBlockquoteContent(blockquoteNode);
   const previousElementSibling =
      (blockquoteNode as HtmlParserElement).previousElementSibling ?? null;

   if (
      previousElementSibling?.tagName !== "P" ||
      previousElementSibling.querySelectorAll("em, i").length === 0
   ) {
      return blockquoteHtml;
   }

   const questionNode = previousElementSibling as HtmlParserElement;

   questionNode.classList.add("bq-quote-card__question");
   const questionHtml = questionNode.toString();

   if (typeof questionNode.remove === "function") {
      questionNode.remove();
   } else {
      questionNode.parentNode?.removeChild?.(questionNode);
   }

   return `<div class="bq-quote-card">${questionHtml}${blockquoteHtml}</div>`;
}

const blockquoteVariants = [
   { prefix: "Обратите внимание", className: "bq-warning" },
   { prefix: "Совет", className: "bq-tip" },
   { prefix: "Хотите узнать больше", className: "bq-link" },
   {
      prefix: "Цитата:",
      className: "bq-quote",
      transform: normalizeQuoteBlockquote,
   },
] as const;

const blockquoteVariantClassNames = blockquoteVariants.map(({ className }) => className);

export function normalizeArticleHtml(html: string) {
   if (
      !html.includes("<blockquote")
      && !html.includes("<table")
      && !html.includes("<img")
   ) {
      return html;
   }

   const root = parse(html);
   const blockquotes = root.querySelectorAll("blockquote") as HTMLElement[];
   const tables = root.querySelectorAll("table") as HTMLElement[];
   const images = root.querySelectorAll("img") as HTMLElement[];

   blockquotes.forEach((blockquoteNode) => {
      blockquoteNode.classList.remove(...blockquoteVariantClassNames);

      const text = blockquoteNode.rawText.trim();
      const variant = blockquoteVariants.find(({ prefix }) => text.startsWith(prefix));

      if (variant) {
         blockquoteNode.classList.add(variant.className);

         if ("transform" in variant && variant.transform) {
            blockquoteNode.replaceWith(variant.transform(blockquoteNode));
         }
      }
   });

   tables.forEach((tableNode) => {
      tableNode.replaceWith(
         `<div class="article-content-table-wrap">${tableNode.toString()}</div>`,
      );
   });

   images.forEach((imgNode) => {
      normalizeArticleImage(imgNode);
   });

   return root.toString();
}

export default function ArticleContentHtml({
   html,
   fallback,
}: ArticleContentHtmlProps) {
   const normalizedHtml = html?.trim() ? normalizeArticleHtml(html) : null;

   if (!normalizedHtml) {
      return <div className="article-content">{fallback}</div>;
   }

   return (
      <div
         className="article-content"
         dangerouslySetInnerHTML={{ __html: normalizedHtml }}
      />
   );
}
