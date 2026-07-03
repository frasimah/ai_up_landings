import { parse } from "next/dist/compiled/node-html-parser";

type FaqItem = {
  question: string;
  answer: string;
};

type FaqHtmlNode = {
  tagName?: string;
  text: string;
  nextElementSibling: FaqHtmlNode | null;
};

type FaqSchema = {
  "@context": "https://schema.org";
  "@type": "FAQPage";
  mainEntity: Array<{
    "@type": "Question";
    name: string;
    acceptedAnswer: {
      "@type": "Answer";
      text: string;
    };
  }>;
};

function normalizeText(value: string | null | undefined) {
  const normalized = value?.replace(/\s+/g, " ").trim();
  return normalized ? normalized : null;
}

export function extractFaqFromArticleHtml(html: string): FaqItem[] {
  const content = html?.trim();
  if (!content) return [];

  const root = parse(content) as {
    querySelectorAll(selector: string): FaqHtmlNode[];
  };
  const faqHeading = root
    .querySelectorAll("h2")
    .find((heading) => normalizeText(heading.text) === "Частые вопросы");

  if (!faqHeading) return [];

  const items: FaqItem[] = [];
  let current = faqHeading.nextElementSibling as FaqHtmlNode | null;

  while (current && current.tagName !== "H2") {
    if (current.tagName === "H3") {
      const question = normalizeText(current.text);
      const answerNode = current.nextElementSibling;
      const answer = answerNode?.tagName === "P" ? normalizeText(answerNode.text) : null;

      if (question && answer) {
        items.push({ question, answer });
      }
    }

    current = current.nextElementSibling;
  }

  return items;
}

export function buildFaqSchema(items: FaqItem[]): FaqSchema | null {
  if (!items.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
