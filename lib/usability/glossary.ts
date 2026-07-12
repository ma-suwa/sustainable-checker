import type { UxGlossaryTerm } from "./types";

// ユーザビリティでよく使われる用語集。slug は criteria.ts の relatedTerms と一致させる。

export const uxGlossary: UxGlossaryTerm[] = [
  {
    slug: "findability",
    term: "ファインダビリティ",
    reading: "見つけやすさ",
    definition:
      "利用者が求める情報にたどり着ける度合い。ナビゲーション・サイト内検索・サイトマップ・パンくずなど、複数の探し方が用意されているほど高い。",
    relatedCriteria: ["3-1", "3-3"],
  },
  {
    slug: "nielsen-heuristics",
    term: "ニールセンのユーザビリティ10原則",
    definition:
      "ヤコブ・ニールセンが提唱したUI設計の10のヒューリスティクス（システム状態の可視性、実世界との一致、ユーザーの制御と自由、一貫性、エラー予防など）。ヒューリスティック評価法の基盤。",
    relatedCriteria: ["2-2", "2-3", "5-2", "7-1"],
  },
  {
    slug: "above-the-fold",
    term: "ファーストビュー（Above the Fold）",
    definition:
      "ページを開いた直後、スクロールせずに見える領域。事業内容や主要導線がここで伝わるかが第一印象を左右する。",
    relatedCriteria: ["1-1", "1-2"],
  },
  {
    slug: "ia",
    term: "情報アーキテクチャ（IA）",
    definition:
      "サイトの情報を分類・構造化し、見つけやすく整理する設計。ナビゲーション・ラベリング・階層設計の土台となる。",
    relatedCriteria: ["1-2"],
  },
  {
    slug: "global-nav",
    term: "グローバルナビゲーション",
    definition:
      "全ページ共通で表示される主要メニュー。企業情報・事業・IR・サステナビリティ・採用・ニュース・問い合わせなどで構成し、5〜7項目・固定位置が定石。",
    relatedCriteria: ["2-1"],
  },
  {
    slug: "millers-law",
    term: "マジカルナンバー7±2（ミラーの法則）",
    definition:
      "人間が一度に記憶・処理できる情報のまとまりは7±2程度という経験則。主要メニューを5〜7項目に絞る根拠になる。",
    relatedCriteria: ["2-1"],
  },
  {
    slug: "mega-menu",
    term: "メガメニュー",
    definition:
      "マウスオーバー等で下層項目を一覧展開する大型ドロップダウン。深い階層を一望でき回遊性を高めるが、分類の一貫性が前提。",
    relatedCriteria: ["2-3"],
  },
  {
    slug: "breadcrumb",
    term: "パンくずリスト",
    definition:
      "『ホーム > 会社情報 > 沿革』のように現在地と上位階層を示すナビ。ニールセン第1原則『システム状態の可視性』の代表例。",
    relatedCriteria: ["2-4"],
  },
  {
    slug: "three-click",
    term: "3クリックルール",
    definition:
      "目的の情報に3クリック以内で到達できるべきという設計の目安。階層を浅く保つ指針として使われる。",
    relatedCriteria: ["2-4"],
  },
  {
    slug: "site-search",
    term: "サイト内検索",
    definition:
      "サイト内のコンテンツを対象にした検索機能。全ページのヘッダーに常設し、虫眼鏡アイコン・サジェスト・件数表示・0件時フォローを備えると成功率が上がる。",
    relatedCriteria: ["3-1", "3-2"],
  },
  {
    slug: "faceted-search",
    term: "ファセット検索（絞り込み）",
    definition:
      "カテゴリ・年次・種別などの属性で検索結果を段階的に絞り込む方式。件数表示（ファセットカウント）とあわせ、大量情報の中から目的に近づける。",
    relatedCriteria: ["3-2"],
  },
  {
    slug: "scannability",
    term: "スキャナビリティ（斜め読みのしやすさ）",
    definition:
      "利用者が斜め読み・読み飛ばししても要点を掴める度合い。見出し・箇条書き・表・図・簡潔な文が高める。",
    relatedCriteria: ["4-1", "4-2"],
  },
  {
    slug: "wcag",
    term: "WCAG 2.2",
    reading: "ウェブコンテンツ・アクセシビリティ・ガイドライン",
    definition:
      "W3Cのアクセシビリティ国際ガイドライン。4原則（知覚可能・操作可能・理解可能・堅牢）、適合レベルA/AA/AAA。2023年10月にWCAG 2.2が勧告（A＋AAの達成基準は計55）。実務ではAA準拠が標準目標。",
    relatedCriteria: ["5-1", "5-2", "5-3"],
  },
  {
    slug: "jis-8341",
    term: "JIS X 8341-3",
    definition:
      "『高齢者・障害者等配慮設計指針』のウェブコンテンツ規格。JIS X 8341-3:2016はISO/IEC 40500（＝WCAG 2.0）と一致規格。総務省ガイドラインは新規構築時にできる限りWCAG 2.2を推奨。",
    relatedCriteria: ["5-1", "5-3"],
  },
  {
    slug: "core-web-vitals",
    term: "Core Web Vitals",
    definition:
      "Googleが定める体験の定量指標。LCP（読み込み）・INP（応答性）・CLS（視覚的安定性）の3指標で、実ユーザーデータ（CrUX）の75パーセンタイルで判定する。ページエクスペリエンスのランキング要因。",
    relatedCriteria: ["6-2"],
  },
  {
    slug: "lcp",
    term: "LCP（Largest Contentful Paint）",
    definition:
      "最大コンテンツが表示されるまでの時間。読み込みの速さの指標で、2.5秒以下が良好。",
    relatedCriteria: ["6-2"],
  },
  {
    slug: "inp",
    term: "INP（Interaction to Next Paint）",
    definition:
      "操作に対する応答性の指標（2024年3月にFIDから置換）。200ミリ秒以下が良好。",
    relatedCriteria: ["6-2"],
  },
  {
    slug: "cls",
    term: "CLS（Cumulative Layout Shift）",
    definition:
      "レイアウトの予期せぬ移動量。視覚的安定性の指標で、0.1以下が良好。",
    relatedCriteria: ["6-2"],
  },
  {
    slug: "responsive",
    term: "レスポンシブデザイン",
    definition:
      "画面幅に応じてレイアウトが自動調整され、スマホ・タブレット・PCで最適表示される設計手法。",
    relatedCriteria: ["6-1"],
  },
  {
    slug: "tap-target",
    term: "タップターゲット",
    definition:
      "モバイルで指でタップする対象（ボタン・リンク）。十分な大きさと間隔がないと誤タップを招く。",
    relatedCriteria: ["6-1"],
  },
  {
    slug: "error-prevention",
    term: "エラー予防（フォーム）",
    definition:
      "入力ミスを未然に防ぐ設計。入力補助・リアルタイム検証・具体的なエラーメッセージが、フォーム離脱を防ぐ。ニールセン第5・第9原則に対応。",
    relatedCriteria: ["7-1"],
  },
];

export function getUxTerm(slug: string): UxGlossaryTerm | undefined {
  return uxGlossary.find((t) => t.slug === slug);
}
