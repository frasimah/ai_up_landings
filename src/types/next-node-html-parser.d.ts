declare module "next/dist/compiled/node-html-parser" {
  type ParsedClassList = {
    add(...classNames: string[]): void;
    remove(...classNames: string[]): void;
  };

  type ParsedNode = {
    tagName?: string;
    text: string;
    rawText: string;
    nextElementSibling: ParsedNode | null;
    querySelectorAll(selector: string): ParsedNode[];
    toString(): string;
  };

  export type HTMLElement = ParsedNode & {
    classList: ParsedClassList;
    replaceWith(content: string): void;
  };

  export function parse(html: string): ParsedNode;
}
