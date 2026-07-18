// 良い例で引用している実在サイトのファーストビューを一括撮影する。
//
//   node scripts/capture-screenshots.mjs           # 未取得のものだけ撮る
//   node scripts/capture-screenshots.mjs --force   # 全部撮り直す
//   node scripts/capture-screenshots.mjs itochu-ir # スラッグ指定で個別に撮り直す
//
// 出力は public/screenshots/sites/<slug>.jpg（1366×768 のファーストビュー）。
// 複数の領域・項目から同じURLを引用するため、URL単位で1枚だけ持ちスラッグで共有する。
// サイトは改修されるので、撮り直したら criteria.ts の checkedOn も更新すること。

import { chromium } from "playwright";
import { mkdir, access } from "node:fs/promises";
import path from "node:path";

const OUT_DIR = path.resolve(import.meta.dirname, "../public/screenshots/sites");

// スラッグ → URL。criteria.ts の image.src と対応させる。
const SITES = {
  // ユーザビリティ
  "jcom-home": "https://www.jcom.co.jp/",
  "dnp-home": "https://www.dnp.co.jp/",
  // サステナビリティ
  "ajinomoto-activity": "https://www.ajinomoto.co.jp/company/jp/activity/",
  "ajinomoto-sustainability": "https://www.ajinomoto.co.jp/company/jp/sustainability/index/",
  "ajinomoto-materiality":
    "https://www.ajinomoto.co.jp/company/jp/sustainability/materiality.html",
  "ajinomoto-esg-evaluation":
    "https://www.ajinomoto.co.jp/company/jp/sustainability/esg/evaluation.html",
  "ajinomoto-environment":
    "https://www.ajinomoto.co.jp/company/jp/sustainability/initiative/environment.html",
  "ajinomoto-social":
    "https://www.ajinomoto.co.jp/company/jp/sustainability/initiative/social.html",
  "softbank-sustainability": "https://www.softbank.jp/corp/sustainability/",
  "softbank-materiality": "https://www.softbank.jp/corp/sustainability/materiality/",
  "konicaminolta-csr": "https://www.konicaminolta.jp/about/csr/index.html",
  // IR
  "itochu-ir": "https://www.itochu.co.jp/ja/ir/",
  "itochu-investor": "https://www.itochu.co.jp/ja/ir/investor/index.html",
  "itochu-annual-report": "https://www.itochu.co.jp/ja/ir/doc/annual_report/",
  "itochu-financial-statements": "https://www.itochu.co.jp/ja/ir/financial_statements/index.html",
  "konicaminolta-investors": "https://www.konicaminolta.com/jp-ja/investors/index.html",
  "nipponpaint-ir": "https://www.nipponpaint-holdings.com/ir/",
  "minebeamitsumi-investors": "https://www.minebeamitsumi.com/corp/investors/",
};

// Cookieバナー・地域判定モーダルはファーストビューを覆うので取り除く。
//
// リンク（role=link）は絶対にクリックしない。「Cookieポリシー」「個人情報保護方針」を
// 踏んでポリシーページへ遷移してしまい、撮れるのは別ページになる。
// ボタンだけを押し、それでも残るオーバーレイはDOMから外す。
const ACCEPT_BUTTONS = [
  "Continue browsing this site",
  "このサイトを続けて閲覧",
  "すべて受け入れる",
  "すべてのCookieを受け入れる",
  "すべて同意",
  "同意する",
  "同意して閉じる",
  "許可する",
  "Accept All Cookies",
  "Accept All",
  "Accept",
  "I Agree",
];

// 画面を覆っている固定要素を消す。ヘッダーなどサイト本来の要素は残したいので、
// 「ビューポートの3割以上を覆う」「下端に貼り付いた高さ80px超の帯」だけを対象にする。
function stripOverlays() {
  const vw = window.innerWidth;
  const vh = window.innerHeight;
  const removed = [];
  const selectors = [];

  // 同意バナーを別ドメインのiframeで出すCMPがある（DNPの datasign など）。
  // 中のDOMには触れないので、iframe要素ごと取り除く。
  const CMP_SRC =
    /cmp|consent|cookie|privacy|datasign|onetrust|cookielaw|trustarc|usercentrics|cookiebot/i;
  for (const f of Array.from(document.querySelectorAll("iframe"))) {
    if (!CMP_SRC.test(f.src || "")) continue;
    removed.push(`iframe:${new URL(f.src, location.href).host}`);
    f.remove();
  }

  // 「Cookie」と言わず「端末情報」「広告配信」とだけ書くバナーもあるので広めに拾う。
  const CONSENT =
    /cookie|クッキー|同意|consent|プライバシー設定|端末情報|広告配信|利便性向上|利用者情報/i;

  for (const el of Array.from(document.body.querySelectorAll("*"))) {
    const cs = getComputedStyle(el);
    if (cs.position !== "fixed" && cs.position !== "sticky") continue;
    if (cs.display === "none" || cs.visibility === "hidden") continue;

    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;

    const text = (el.textContent ?? "").trim();

    // (a) 画面の3割以上を覆う／下端に貼り付いた帯＝モーダルやバナー。
    const coversMost = (r.width * r.height) / (vw * vh) > 0.3;
    const bottomBar = r.bottom >= vh - 8 && r.height > 80 && r.width > vw * 0.6;

    // (b) 隅に小さく出る同意ボックスは面積では引っかからないので文言で拾う。
    //     リンクが多い／本文が長い要素はページ本体の可能性があるので触らない。
    const isConsentBox =
      CONSENT.test(text) &&
      text.length <= 1200 &&
      el.querySelectorAll("a").length <= 8 &&
      !el.querySelector("main, nav, header");

    if (!coversMost && !bottomBar && !isConsentBox) continue;

    removed.push(`${el.tagName}.${el.className}`.slice(0, 60));
    if (typeof el.className === "string" && el.className.trim()) {
      selectors.push("." + el.className.trim().split(/\s+/).join("."));
    }
    el.remove();
  }

  // 消しても JS が貼り直してくるバナーがある（DNPなど）。
  // クラス名が取れたものは CSS でも隠し、再描画されても写らないようにする。
  if (selectors.length > 0) {
    let style = document.getElementById("__shot_hide__");
    if (!style) {
      style = document.createElement("style");
      style.id = "__shot_hide__";
      document.head.appendChild(style);
    }
    style.textContent += `\n${selectors.join(",")}{display:none !important;}`;
  }

  // モーダルはスクロールをロックすることが多いので解除して先頭へ戻す。
  document.documentElement.style.overflow = "";
  document.body.style.overflow = "";
  document.body.style.position = "";
  window.scrollTo(0, 0);
  return removed;
}

// ボタンを押す→遷移していたら戻す→残ったオーバーレイをDOMから外す。
async function dismissOverlays(page, url) {
  for (const label of ACCEPT_BUTTONS) {
    const loc = page.getByRole("button", { name: label, exact: false });
    const n = await loc.count().catch(() => 0);
    for (let i = 0; i < Math.min(n, 2); i++) {
      try {
        const el = loc.nth(i);
        if (await el.isVisible({ timeout: 300 })) {
          await el.click({ timeout: 1500 });
          await page.waitForTimeout(600);
        }
      } catch {
        /* 無い・押せないだけなので次へ */
      }
    }
  }

  // 誤クリックで別ページへ飛んでいたら撮影対象へ戻す。
  if (stripUrl(page.url()) !== stripUrl(url)) {
    await page.goto(url, { waitUntil: "load", timeout: 45000 }).catch(() => {});
    await page.waitForTimeout(2000);
  }

  const removed = await page.evaluate(stripOverlays).catch(() => []);
  await page.waitForTimeout(500);
  return removed;
}

// 末尾スラッシュ・ハッシュの差で「遷移した」と誤判定しないよう正規化する。
function stripUrl(u) {
  try {
    const p = new URL(u);
    return (p.origin + p.pathname).replace(/\/$/, "");
  } catch {
    return u;
  }
}

const args = process.argv.slice(2);
const force = args.includes("--force");
const only = args.filter((a) => !a.startsWith("--"));
const targets = Object.entries(SITES).filter(([slug]) => only.length === 0 || only.includes(slug));

await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1366, height: 768 },
  deviceScaleFactor: 1.5,
  locale: "ja-JP",
  timezoneId: "Asia/Tokyo",
  userAgent:
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0 Safari/537.36",
});

// 同意管理プラットフォーム（CMP）は消してもJSが貼り直してくるので、
// そもそも読み込ませない。DOM操作より確実で、ページ本体の表示には影響しない。
const CMP_HOSTS =
  /(^|\.)(datasign\.co|onetrust\.com|cookielaw\.org|trustarc\.com|usercentrics\.eu|cookiebot\.com|privacy-center\.org)/i;
await context.route("**/*", (route) => {
  let host = "";
  try {
    host = new URL(route.request().url()).host;
  } catch {
    /* URLとして読めなければ素通し */
  }
  if (host && CMP_HOSTS.test(host)) return route.abort();
  return route.continue();
});

const results = { saved: [], skipped: [], failed: [] };

for (const [slug, url] of targets) {
  const out = path.join(OUT_DIR, `${slug}.jpg`);

  if (!force) {
    const exists = await access(out).then(
      () => true,
      () => false,
    );
    if (exists) {
      results.skipped.push(slug);
      console.log(`skip   ${slug}`);
      continue;
    }
  }

  const page = await context.newPage();
  try {
    await page.goto(url, { waitUntil: "load", timeout: 45000 });
    await page.waitForTimeout(2500);

    // 1回目で消えたバナーの裏から2枚目が出ることがあるので2周する。
    await dismissOverlays(page, url);
    const removed = await dismissOverlays(page, url);
    if (removed.length > 0) console.log(`       overlay removed: ${removed.join(", ")}`);

    // 遅延読み込みの画像が入るのを待ってから撮る。
    await page.waitForTimeout(2000);
    // 待っている間にバナーが貼り直されることがあるので、直前にもう一度払う。
    await page.evaluate(stripOverlays).catch(() => {});
    await page.screenshot({
      path: out,
      type: "jpeg",
      quality: 78,
      clip: { x: 0, y: 0, width: 1366, height: 768 },
    });
    results.saved.push(slug);
    console.log(`saved  ${slug}`);
  } catch (err) {
    results.failed.push({ slug, message: String(err).split("\n")[0] });
    console.log(`FAILED ${slug}: ${String(err).split("\n")[0]}`);
  } finally {
    await page.close();
  }
}

await browser.close();

console.log(
  `\ndone: ${results.saved.length} saved / ${results.skipped.length} skipped / ${results.failed.length} failed`,
);
if (results.failed.length > 0) {
  for (const f of results.failed) console.log(`  - ${f.slug}: ${f.message}`);
  process.exitCode = 1;
}
