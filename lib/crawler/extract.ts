import { JSDOM } from "jsdom";
import { Readability } from "@mozilla/readability";

const MAX_CHARS_PER_PAGE = 3500; // token budget guard per page

// Extract readable main text from a page's HTML. Falls back to body text when
// Readability can't parse the article. Output is trimmed to a char budget.
export function htmlToText(html: string, url: string): { title: string; text: string } {
  let title = "";
  let text = "";
  try {
    const dom = new JSDOM(html, { url });
    const doc = dom.window.document;
    title = doc.title || "";
    const reader = new Readability(doc);
    const article = reader.parse();
    if (article?.textContent && article.textContent.trim().length > 200) {
      text = article.textContent;
    } else {
      text = doc.body?.textContent ?? "";
    }
  } catch {
    // Readability/jsdom can throw on malformed markup; degrade gracefully.
    text = "";
  }

  text = text.replace(/\s+\n/g, "\n").replace(/[ \t]{2,}/g, " ").replace(/\n{3,}/g, "\n\n").trim();
  if (text.length > MAX_CHARS_PER_PAGE) {
    text = text.slice(0, MAX_CHARS_PER_PAGE) + " …(以下省略)";
  }
  return { title, text };
}
