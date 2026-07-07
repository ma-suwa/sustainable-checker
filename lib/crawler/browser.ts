import { chromium, type Browser, type Page } from "playwright";
import { htmlToText } from "./extract";
import {
  pickEntry,
  pickIntermediates,
  rankSubPages,
  type Anchor,
} from "./findSustainability";
import { detectSignals, type PageProbe } from "../signals/mechanical";
import type { CrawlResult, CrawledPage } from "../types";

const MAX_PAGES = Number(process.env.CRAWL_MAX_PAGES ?? 10);
const TIMEOUT_MS = Number(process.env.CRAWL_TIMEOUT_MS ?? 20000);
const UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 " +
  "(KHTML, like Gecko) Chrome/124.0 Safari/537.36 SustainableChecker/0.1 (prototype)";

// Raw per-page capture: DOM probe + HTML for later text extraction.
interface RawPage extends PageProbe {
  html: string;
  title: string;
}

async function probe(page: Page): Promise<Omit<RawPage, "url">> {
  const html = await page.content();
  const data = await page.evaluate(() => {
    const anchors = Array.from(document.querySelectorAll("a[href]"))
      .map((el) => {
        const a = el as HTMLAnchorElement;
        return { href: a.href, text: (a.textContent || "").trim().slice(0, 80) };
      })
      .filter((a) => a.href && !a.href.startsWith("javascript:") && !a.href.includes("#") )
      .slice(0, 500);

    const hasSearchInput = !!document.querySelector(
      'input[type="search"], [role="search"] input, form[role="search"] input, ' +
        'input[name*="search" i], input[id*="search" i], input[placeholder*="検索"], ' +
        'input[aria-label*="検索"], input[placeholder*="Search" i]'
    );
    const hasBreadcrumb = !!document.querySelector(
      '[class*="breadcrumb" i], [class*="pankuz" i], [id*="breadcrumb" i], ' +
        'nav[aria-label*="breadcrumb" i], ol[class*="crumb" i], [itemtype*="BreadcrumbList"]'
    );
    const title = document.title || "";
    return { anchors, hasSearchInput, hasBreadcrumb, title };
  });
  return {
    html,
    title: data.title,
    hasSearchInput: data.hasSearchInput,
    hasBreadcrumb: data.hasBreadcrumb,
    hasLangSwitch: false, // computed in Node from anchors
    anchors: data.anchors as Anchor[],
  };
}

async function goto(page: Page, url: string): Promise<boolean> {
  try {
    await page.goto(url, { waitUntil: "domcontentloaded", timeout: TIMEOUT_MS });
    // Give SPA nav / lazy menus a moment to render.
    await page.waitForTimeout(1200);
    return true;
  } catch {
    return false;
  }
}

function detectEnglish(anchors: Anchor[]): { has: boolean; url?: string } {
  for (const a of anchors) {
    const label = a.text.trim().toLowerCase();
    let path = "";
    try {
      path = new URL(a.href).pathname.toLowerCase();
    } catch {
      /* ignore */
    }
    if (
      path === "/en" ||
      path.startsWith("/en/") ||
      path.startsWith("/english") ||
      path.includes("/en/") ||
      label === "en" ||
      label === "english"
    ) {
      return { has: true, url: a.href };
    }
  }
  return { has: false };
}

export async function crawl(inputUrl: string): Promise<CrawlResult> {
  const notes: string[] = [];
  let browser: Browser | null = null;
  const rawPages: RawPage[] = [];

  const normalizedInput = inputUrl.startsWith("http") ? inputUrl : `https://${inputUrl}`;
  let origin = "";
  try {
    origin = new URL(normalizedInput).origin;
  } catch {
    throw new Error("URLの形式が不正です。");
  }

  let sustainabilityUrl: string | null = null;
  let clickDepth: number | null = null;
  let screenshotDataUrl: string | null = null;

  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      userAgent: UA,
      viewport: { width: 1280, height: 900 },
      locale: "ja-JP",
    });
    const page = await context.newPage();

    // 1) Corporate top.
    if (!(await goto(page, normalizedInput))) {
      notes.push("トップページの読み込みに失敗しました（タイムアウト/到達不可）。");
      return emptyResult(normalizedInput, origin, notes);
    }
    const top = { url: normalizedInput, ...(await probe(page)) };
    rawPages.push(top);
    const english = detectEnglish(top.anchors);

    // 2) Find sustainability entry on top page (click depth = 1).
    let entry = pickEntry(top.anchors);
    if (entry) clickDepth = 1;

    // 3) Otherwise look one level deeper via intermediate pages (click depth = 2).
    if (!entry) {
      const intermediates = pickIntermediates(top.anchors, 3);
      for (const inter of intermediates) {
        if (!(await goto(page, inter.href))) continue;
        const p = { url: inter.href, ...(await probe(page)) };
        rawPages.push(p);
        const found = pickEntry(p.anchors);
        if (found) {
          entry = found;
          clickDepth = 2;
          break;
        }
      }
    }

    if (!entry) {
      notes.push(
        "サステナビリティ入口を自動検出できませんでした（存在しても未検出の可能性あり）。到達性はスコア0ではなく『未検出』として扱います。"
      );
      const signals = detectSignals(toProbes(rawPages), {
        sustainabilityUrl: null,
        clickDepth: null,
        hasEnglish: english.has,
        englishUrl: english.url,
      });
      return {
        inputUrl: normalizedInput,
        corporateTopUrl: normalizedInput,
        sustainabilityUrl: null,
        entryFound: false,
        clickDepth: null,
        pages: rawPages.map(toCrawledPage),
        signals,
        screenshotDataUrl: null,
        notes,
      };
    }

    sustainabilityUrl = entry.href;

    // 4) Visit the sustainability top: probe + first-view screenshot.
    if (await goto(page, entry.href)) {
      const entryPage = { url: entry.href, ...(await probe(page)) };
      rawPages.push(entryPage);
      try {
        const buf = await page.screenshot({ type: "jpeg", quality: 60 });
        screenshotDataUrl = `data:image/jpeg;base64,${buf.toString("base64")}`;
      } catch {
        notes.push("スクリーンショット取得に失敗しました。");
      }

      // 5) Crawl prioritized sub-pages up to the page budget.
      const budget = Math.max(0, MAX_PAGES - rawPages.length);
      const subs = rankSubPages(entryPage.anchors, origin, entry.href, budget);
      for (const s of subs) {
        if (!(await goto(page, s.href))) continue;
        rawPages.push({ url: s.href, ...(await probe(page)) });
      }
    } else {
      notes.push("サステナビリティトップの読み込みに失敗しました。");
    }

    const signals = detectSignals(toProbes(rawPages), {
      sustainabilityUrl,
      clickDepth,
      hasEnglish: english.has,
      englishUrl: english.url,
    });

    return {
      inputUrl: normalizedInput,
      corporateTopUrl: normalizedInput,
      sustainabilityUrl,
      entryFound: true,
      clickDepth,
      pages: rawPages.map(toCrawledPage),
      signals,
      screenshotDataUrl,
      notes,
    };
  } finally {
    if (browser) await browser.close();
  }
}

function toProbes(raw: RawPage[]): PageProbe[] {
  return raw.map((r) => ({
    url: r.url,
    hasSearchInput: r.hasSearchInput,
    hasBreadcrumb: r.hasBreadcrumb,
    hasLangSwitch: r.hasLangSwitch,
    anchors: r.anchors,
  }));
}

function toCrawledPage(r: RawPage): CrawledPage {
  const { title, text } = htmlToText(r.html, r.url);
  return { url: r.url, title: title || r.title, text };
}

function emptyResult(inputUrl: string, _origin: string, notes: string[]): CrawlResult {
  return {
    inputUrl,
    corporateTopUrl: inputUrl,
    sustainabilityUrl: null,
    entryFound: false,
    clickDepth: null,
    pages: [],
    signals: {
      hasSiteSearch: false,
      hasBreadcrumb: false,
      hasReportLink: false,
      hasDataBook: false,
      hasEnglish: false,
      hasExternalEval: false,
      hasSkillMatrix: false,
      clickDepth: null,
      evidence: {},
    },
    screenshotDataUrl: null,
    notes,
  };
}
