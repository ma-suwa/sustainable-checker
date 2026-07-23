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

// スラッグ → URL、または { url, scrollY }。criteria.ts の image.src と対応させる。
//
// 既定はファーストビュー（ページ最上部）。ただし「見出し構造」のように
// 折り返しより下にしか写らない論点は、scrollY でその位置まで送ってから撮る。
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
  // 事例が一部の企業に偏らないよう、他社の同種ページも撮る。
  // （オムロンはbot遮断、資生堂・花王は第一画面がブランド映像で良い例にならないため外した）
  "ntt-ir": "https://group.ntt/jp/ir/",
  "kddi-sustainability": "https://www.kddi.com/corporate/sustainability/",
  "marui-ir": "https://www.0101maruigroup.co.jp/ir.html",
  "ricoh-sustainability": "https://jp.ricoh.com/sustainability/",
  "hitachi-ir": "https://www.hitachi.co.jp/IR/",
  // 4-1（見出し階層）用。見出し群はヒーロー画像の下にあるので送ってから撮る。
  "hitachi-environment": {
    url: "https://www.hitachi.co.jp/sustainability/environment/",
    // 見出し「日立の取り組み」が固定ヘッダーに隠れない位置。
    scrollY: 720,
  },
  "tokiomarine-ir": "https://www.tokiomarinehd.com/ir/",
  "sekisuihouse-sustainability": "https://www.sekisuihouse.co.jp/company/sustainable/",

  // ── v0.7：サステナビリティ編の各項目を3〜8例に拡充するための追加撮影 ──
  // ゴメスESGサイトランキング2025上位企業を中心に、E/S/G各テーマの専用ページを撮る。
  // 双日（3位）は気候・環境・人権・人的資本・多様性・ガバナンス・外部評価まで
  // 専用ページが揃うため、事例の偏り解消の軸にする。

  // 双日（ゴメスESG2025 3位）
  "sojitz-sustainability": "https://www.sojitz.com/jp/sustainability/",
  "sojitz-materiality": "https://www.sojitz.com/jp/sustainability/materiality/",
  // 双日のESG BOOK下層は、大きなタイトル帯＋アンカーメニューの下に本文が来る。
  // 第一画面のままだと上部の余白が大きいので、本文が写る位置まで送ってから撮る。
  "sojitz-climate": { url: "https://www.sojitz.com/jp/sustainability/esg-climate/", scrollY: 520 },
  "sojitz-human-rights": {
    url: "https://www.sojitz.com/jp/sustainability/esg-human_rights/",
    scrollY: 520,
  },
  "sojitz-human-resources": {
    url: "https://www.sojitz.com/jp/sustainability/esg-human_resources/",
    scrollY: 520,
  },
  "sojitz-diversity": {
    url: "https://www.sojitz.com/jp/sustainability/esg-diversity/",
    scrollY: 520,
  },
  "sojitz-governance": {
    url: "https://www.sojitz.com/jp/sustainability/esg-governance/",
    scrollY: 520,
  },
  "sojitz-evaluation": "https://www.sojitz.com/jp/corporate/evaluation/",

  // 三菱瓦斯化学（ゴメスESG2025 4位）
  "mgc-sustainability": "https://www.mgc.co.jp/sustainability/",
  "mgc-materiality": "https://www.mgc.co.jp/sustainability/materiality.html",
  "mgc-tcfd": "https://www.mgc.co.jp/sustainability/environment/tcfd.html",
  "mgc-governance": "https://www.mgc.co.jp/sustainability/governance/",
  "mgc-esg-data": "https://www.mgc.co.jp/sustainability/esg-performance-data.html",
  "mgc-evaluation": "https://www.mgc.co.jp/sustainability/evalutation.html",

  // セブン＆アイ・ホールディングス（ゴメスESG2025 5位）
  "seveni-sustainability": "https://www.7andi.com/sustainability/",
  "seveni-theme": "https://www.7andi.com/sustainability/theme/",
  "seveni-environment": "https://www.7andi.com/sustainability/environment.html",
  "seveni-human-resources": "https://www.7andi.com/sustainability/human_resources.html",
  "seveni-awards": "https://www.7andi.com/sustainability/awards.html",

  // 積水化学工業（ゴメスESG2025 19位）
  "sekisui-chem-sustainability": "https://www.sekisui.co.jp/sustainability_report/",
  "sekisui-chem-materiality": "https://www.sekisui.co.jp/sustainability_report/sustainability/",
  "sekisui-chem-eco": "https://www.sekisui.co.jp/sustainability_report/eco/",
  "sekisui-chem-social": "https://www.sekisui.co.jp/sustainability_report/social/",
  "sekisui-chem-governance": "https://www.sekisui.co.jp/sustainability_report/governance/",

  // 村田製作所（ゴメスESG2025 6位）
  "murata-csr": "https://corporate.murata.com/ja-jp/csr",
  "murata-materiality": "https://corporate.murata.com/ja-jp/csr/materiality/specific",
  "murata-environment": "https://corporate.murata.com/ja-jp/csr/environment_murata",

  // ── v0.8：ユーザビリティ編の各項目を3〜8例に拡充するための追加撮影 ──
  // トライベック Webユーザビリティランキング2026＜企業サイト(PC)編＞の上位企業の
  // コーポレートトップを撮る。1枚のトップが 明快性(1)・ナビ(2)・検索(3)・モバイル(6)・
  // 問い合わせ(7) の複数項目の良い例になる。業種が偏らないよう上位から幅広く採る。
  "chugai-home": "https://www.chugai-pharm.co.jp/", // 3位 中外製薬
  "daido-life-home": "https://www.daido-life.co.jp/", // 4位 大同生命
  "matsui-home": "https://www.matsui.co.jp/", // 5位 松井証券
  "shimizu-home": "https://www.shimz.co.jp/", // 6位 清水建設
  "chuden-home": "https://www.chuden.co.jp/", // 8位 中部電力
  "nipponsteel-home": "https://www.nipponsteel.com/", // 10位 日本製鉄
  // 2-4（パンくず・現在地）用に、上位企業の下層ページ（会社情報）を撮る。
  "shimizu-company": "https://www.shimz.co.jp/company/",
  "daido-company": "https://www.daido-life.co.jp/company/",
  "matsui-company": "https://www.matsui.co.jp/company/",

  // 6-1（レスポンシブ・タップターゲット）用に、スマホ幅(390px)でトップを撮る。
  "jcom-mobile": { url: "https://www.jcom.co.jp/", mobile: true },
  "daido-mobile": { url: "https://www.daido-life.co.jp/", mobile: true },
  "shimizu-mobile": { url: "https://www.shimz.co.jp/", mobile: true },

  // ── v0.9：IR編の各項目を3〜8例に拡充するための追加撮影 ──
  // ゴメスIRサイトランキング2025の上位企業のIR配下ページを撮る。1つのIRサイトが
  // ナビ(1)・決算(2)・経営情報(3)・積極性(4)の複数項目の良い例になる。業種を分散させる。

  // 双日（ゴメスIR2025 15位）
  "sojitz-ir": "https://www.sojitz.com/jp/ir/",
  "sojitz-ir-financial": "https://www.sojitz.com/jp/ir/meetings/financial/",
  "sojitz-ir-highlights": "https://www.sojitz.com/jp/ir/highlights/",
  "sojitz-ir-individual": "https://www.sojitz.com/jp/ir/individual/",
  "sojitz-ir-calendar": "https://www.sojitz.com/jp/ir/meetings/calendar/",
  "sojitz-ir-annual": "https://www.sojitz.com/jp/ir/reports/annual/",

  // 中外製薬（ゴメスIR2025 5位）
  "chugai-ir": "https://www.chugai-pharm.co.jp/ir/",
  "chugai-ir-finance": "https://www.chugai-pharm.co.jp/ir/finance/latest.html",
  "chugai-ir-individual": "https://www.chugai-pharm.co.jp/ir/individual/",
  "chugai-ir-return": "https://www.chugai-pharm.co.jp/ir/share/shareholder_return.html",
  "chugai-ir-calendar": "https://www.chugai-pharm.co.jp/ir/reports_downloads/event/",

  // 東急不動産ホールディングス（ゴメスIR2025 7位）
  "tokyu-ir": "https://www.tokyu-fudosan-hd.co.jp/ir/",
  "tokyu-ir-highlights": "https://www.tokyu-fudosan-hd.co.jp/ir/financialinfo/highlights/",
  "tokyu-ir-individual": "https://www.tokyu-fudosan-hd.co.jp/ir/individual/",
  "tokyu-ir-return": "https://www.tokyu-fudosan-hd.co.jp/ir/stockandbond/return/",
  "tokyu-ir-midterm": "https://www.tokyu-fudosan-hd.co.jp/ir/mgtpolicy/mid-term-plan/",
  "tokyu-ir-calendar": "https://www.tokyu-fudosan-hd.co.jp/ir/library/calendar/",
  // 1-4（モバイル／レスポンシブ）用に、IRトップをスマホ幅(390px)で撮る。
  "chugai-ir-mobile": { url: "https://www.chugai-pharm.co.jp/ir/", mobile: true },
  "tokyu-ir-mobile": { url: "https://www.tokyu-fudosan-hd.co.jp/ir/", mobile: true },

  // ── 出典ページ（評価機関・基準）。lib/sources.ts の image から参照する ──
  "src-gomez-ir": "https://www.gomez.co.jp/ranking/ir/",
  "src-gomez-esg": "https://www.gomez.co.jp/ranking/esg/",
  "src-nikko-ir": "https://www.nikkoir.co.jp/rank/rank.html",
  "src-daiwa-ir": "https://www.daiwair.co.jp/news/internet_IR2025.html",
  "src-tribeck": "https://brand.tribeck.jp/usability/",
  "src-wcag22": "https://waic.jp/translations/WCAG22/",
  "src-nng-heuristics": "https://www.nngroup.com/articles/ten-usability-heuristics/",
  "src-core-web-vitals": "https://web.dev/articles/vitals",
  "src-ghg-protocol": "https://ghgprotocol.org/",
  "src-gri": "https://www.globalreporting.org/standards/",
  "src-issb": "https://www.ifrs.org/issued-standards/ifrs-sustainability-standards-navigator/",
  "src-cg-code": "https://www.jpx.co.jp/equities/listing/cg/index.html",
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
    /cookie|クッキー|同意|consent|プライバシー設定|端末情報|広告配信|利便性向上|利用者情報|your privacy|personal data|personal information/i;

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

for (const [slug, spec] of targets) {
  const url = typeof spec === "string" ? spec : spec.url;
  const scrollY = typeof spec === "string" ? 0 : (spec.scrollY ?? 0);
  // mobile: true のときは 390×844（スマホ相当）で撮る。6-1（レスポンシブ・タップ）用。
  const mobile = typeof spec === "string" ? false : (spec.mobile ?? false);
  const vw = mobile ? 390 : 1366;
  const vh = mobile ? 844 : 768;
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
    // モバイル指定のときはビューポートをスマホ相当に切り替える。
    if (mobile) await page.setViewportSize({ width: vw, height: vh });
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

    // stripOverlays が先頭に戻すので、送るのはその後。遅延読み込みの発火も待つ。
    if (scrollY > 0) {
      await page.evaluate((y) => window.scrollTo(0, y), scrollY);
      await page.waitForTimeout(1500);
    }

    await page.screenshot({
      path: out,
      type: "jpeg",
      quality: 78,
      clip: { x: 0, y: 0, width: vw, height: vh },
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
