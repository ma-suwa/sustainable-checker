// 3領域（サステナビリティ／IR／ユーザビリティ）共通の出典マスタ。
// 各評価項目からは key で参照する。URLが変わったらここだけ直せばサイト全体に反映される。
// 全URLは 2026-07-15 時点で HTTP 200 を確認済み（confirmed の欄は出典の性質を示す）。

export interface SourceRef {
  key: string;
  label: string; // 出典名（表示名）
  org: string; // 発行主体
  url: string;
  note?: string; // どういう位置づけの資料か
  year?: string; // 参照した版
}

export const sourceRegistry: Record<string, SourceRef> = {
  // ── 日本のサイト評価機関 ──────────────────────────────
  "gomez-ir": {
    key: "gomez-ir",
    label: "Gomez IRサイトランキング",
    org: "ブロードバンドセキュリティ（ゴメス・コンサルティング本部）",
    url: "https://www.gomez.co.jp/ranking/ir/",
    note: "4カテゴリ249項目。3機関で唯一カテゴリ別の配点（使いやすさ30／財務・決算25／企業・経営25／積極性・先進性20）を公開している。",
    year: "2025（第19回・2025年12月発表）",
  },
  "gomez-ir-2025-press": {
    key: "gomez-ir-2025-press",
    label: "「Gomez IRサイトランキング2025」の発表について（プレスリリース）",
    org: "ブロードバンドセキュリティ",
    url: "https://www.gomez.co.jp/company/press/251210.html",
    note: "ノミネート389社・優秀企業292社（金賞24／銀賞107／銅賞161）。項目別の実施率もここに記載。",
    year: "2025-12-10",
  },
  "gomez-esg": {
    key: "gomez-esg",
    label: "Gomez ESGサイトランキング",
    org: "ブロードバンドセキュリティ（ゴメス・コンサルティング本部）",
    url: "https://www.gomez.co.jp/ranking/esg/",
    note: "5カテゴリ189項目（使いやすさ／ESG共通／E／S／G）。サステナビリティ開示サイトの評価。",
    year: "2025（2025年9月発表）",
  },
  "gomez-esg-2025-press": {
    key: "gomez-esg-2025-press",
    label: "「Gomez ESGサイトランキング2025」の発表について（プレスリリース）",
    org: "ブロードバンドセキュリティ",
    url: "https://www.gomez.co.jp/company/press/250905.html",
    note: "ノミネート185社・優秀企業169社。サイト内検索98.9%、ローカルメニュー一覧化55.7%などの実施率の出所。",
    year: "2025-09-05",
  },
  "nikko-ir": {
    key: "nikko-ir",
    label: "全上場企業ホームページ充実度ランキング",
    org: "日興アイ・アール",
    url: "https://www.nikkoir.co.jp/rank/rank.html",
    note: "2003年開始の悉皆調査。「分かりやすさ／使いやすさ／情報の多さ」の3視点、1次50項目・2次168項目。掲載の有無のみを見る客観評価で、レイアウト・文体などの主観要素は対象外。",
    year: "2025年度（第23回・2025年12月18日発表）",
  },
  "nikko-ir-2025-pdf": {
    key: "nikko-ir-2025-pdf",
    label: "2025年度 全上場企業ホームページ充実度ランキング 調査結果（PDF）",
    org: "日興アイ・アール",
    url: "https://www.nikkoir.co.jp/rank/pdf/nkir_result_2025.pdf",
    note: "全上場3,937社の掲載率データ。決算説明会資料80.8%、ガバナンス報告書75.4%、動画配信43.8%、統合報告書28.2%などの一次ソース。",
    year: "2025-12-18",
  },
  "daiwa-ir": {
    key: "daiwa-ir",
    label: "大和インターネットIR表彰",
    org: "大和インベスター・リレーションズ",
    url: "https://www.daiwair.co.jp/news/internet_IR2025.html",
    note: "上場4,000社超を一次審査 →「大和IRスコアボード」で定量評価 → 英語版評価 → 日英統合。英文開示の日英公平性を明示的に見る点が特徴。2025年は158社受賞（最優秀8社）。",
    year: "2025（2025年12月10日発表）",
  },
  "daiwa-ir-2025-pdf": {
    key: "daiwa-ir-2025-pdf",
    label: "「大和インターネットIR表彰2025」を発表（PDF）",
    org: "大和インベスター・リレーションズ",
    url: "https://www.daiwair.co.jp/pdf/pr20251210.pdf",
    note: "受賞158社の全リストと、サステナビリティ部門の6大項目（トップページ／全体方針／環境／社会／ガバナンス／サポート）・選定基準（90点以上＝最優秀）。",
    year: "2025-12-10",
  },
  tribeck: {
    key: "tribeck",
    label: "Webユーザビリティランキング",
    org: "トライベック・ブランド戦略研究所",
    url: "https://brand.tribeck.jp/usability/",
    note: "5評価軸（A.アクセス性／B.サイト全体の明快性／C.ナビゲーションの使いやすさ／D.コンテンツの適切性／E.ヘルプ・安全性）・115項目で企業サイトを診断。軸ごとのウェイトは非公開。",
    year: "2026＜企業サイト（PC）編＞（2025年12月9日発表）",
  },
  "tribeck-2026-press": {
    key: "tribeck-2026-press",
    label: "Webユーザビリティランキング2026＜企業サイト（PC）編＞発表",
    org: "トライベック",
    url: "https://www.tribeck.jp/newsrelease/2025/20251209.html",
    note: "15業界150サイトを診断。平均79.76点（前年比+1.61）。1位 J:COM（3年連続）、2位 大日本印刷、3位 中外製薬。",
    year: "2025-12-09",
  },
  jira: {
    key: "jira",
    label: "IR優良企業賞",
    org: "日本IR協議会",
    url: "https://www.jira.or.jp/",
    note: "サイト単体ではなくIR活動全体（説明会・開示姿勢・対話の質）を評価する表彰。サイト評価の「参考観点」として扱う。",
    year: "2025（第30回）",
  },

  // ── アクセシビリティ・ユーザビリティの標準 ─────────────────
  wcag22: {
    key: "wcag22",
    label: "Web Content Accessibility Guidelines (WCAG) 2.2",
    org: "W3C",
    url: "https://www.w3.org/TR/WCAG22/",
    note: "アクセシビリティの国際標準。適合レベルA／AA／AAA。企業サイトはAA準拠が事実上の目標水準。",
    year: "W3C勧告（2023年10月、2024年12月改訂）",
  },
  "wcag22-ja": {
    key: "wcag22-ja",
    label: "WCAG 2.2 日本語訳",
    org: "ウェブアクセシビリティ基盤委員会（WAIC）",
    url: "https://waic.jp/translations/WCAG22/",
    note: "WCAG 2.2 の公式日本語訳。JIS X 8341-3 との対応関係もWAICが公開している。",
  },
  "nng-heuristics": {
    key: "nng-heuristics",
    label: "10 Usability Heuristics for User Interface Design",
    org: "Nielsen Norman Group",
    url: "https://www.nngroup.com/articles/ten-usability-heuristics/",
    note: "ヤコブ・ニールセンの10のユーザビリティ原則（1994年、2020年改訂）。UI評価のデファクト標準。",
  },
  "core-web-vitals": {
    key: "core-web-vitals",
    label: "Core Web Vitals",
    org: "Google（web.dev）",
    url: "https://web.dev/articles/vitals",
    note: "LCP（2.5秒以内）／INP（200ms以内）／CLS（0.1以下）が「良好」の閾値。実ユーザー計測（フィールドデータ）で判定する。",
  },
  pagespeed: {
    key: "pagespeed",
    label: "PageSpeed Insights",
    org: "Google",
    url: "https://pagespeed.web.dev/",
    note: "URLを入れるだけでCore Web Vitalsの実測値（CrUX）とLighthouseスコアが得られる。表示速度の項目はこれで実測する。",
  },
  lighthouse: {
    key: "lighthouse",
    label: "Lighthouse",
    org: "Google（Chrome DevTools）",
    url: "https://developer.chrome.com/docs/lighthouse/overview",
    note: "パフォーマンス／アクセシビリティ／SEO の自動監査ツール。アクセシビリティ監査は機械判定できる範囲のみである点に注意。",
  },

  // ── サステナビリティ開示のフレームワーク ─────────────────
  ssbj: {
    key: "ssbj",
    label: "サステナビリティ開示基準（SSBJ基準）",
    org: "サステナビリティ基準委員会（SSBJ）",
    url: "https://www.ssb-j.jp/jp/",
    note: "日本版サステナビリティ開示基準。2025年3月に確定基準を公表。プライム市場の時価総額上位企業から段階的に適用され、有価証券報告書での開示が求められる。",
  },
  issb: {
    key: "issb",
    label: "IFRS S1・S2（ISSB基準）",
    org: "IFRS財団 / ISSB",
    url: "https://www.ifrs.org/issued-standards/ifrs-sustainability-standards-navigator/",
    note: "サステナビリティ開示の国際基準。S1が全般的要求事項、S2が気候関連。「ガバナンス／戦略／リスク管理／指標と目標」の4本柱はTCFDを引き継いでいる。",
  },
  tcfd: {
    key: "tcfd",
    label: "TCFD 最終提言（気候関連財務情報開示）",
    org: "金融安定理事会（FSB）TCFD",
    url: "https://www.fsb-tcfd.org/",
    note: "ガバナンス／戦略／リスク管理／指標と目標の4要素とシナリオ分析。TCFDは2023年にISSBへ移管され、開示の枠組み自体はIFRS S2に継承されている。",
  },
  "ghg-protocol": {
    key: "ghg-protocol",
    label: "GHG Protocol",
    org: "WRI / WBCSD",
    url: "https://ghgprotocol.org/",
    note: "温室効果ガス算定の国際標準。Scope1（直接排出）／Scope2（電力等の間接排出）／Scope3（バリューチェーン15カテゴリ）の定義元。",
  },
  gri: {
    key: "gri",
    label: "GRIスタンダード",
    org: "Global Reporting Initiative",
    url: "https://www.globalreporting.org/standards/",
    note: "サステナビリティ報告の国際基準。「どのGRI項目をどこに記載したか」を示すGRI内容索引（GRI Content Index）は開示の網羅性を示す定番手段。",
  },
  sbti: {
    key: "sbti",
    label: "Science Based Targets initiative（SBTi）",
    org: "SBTi",
    url: "https://sciencebasedtargets.org/",
    note: "パリ協定と整合する温室効果ガス削減目標の認定制度。削減目標の「科学的根拠」の有無を第三者が担保する。",
  },
  cdp: {
    key: "cdp",
    label: "CDP",
    org: "CDP",
    url: "https://www.cdp.net/en",
    note: "気候変動・水・森林に関する質問書と A〜D- のスコア。CDPスコアの掲載は環境開示の水準を示す簡便な指標になる。",
  },

  // ── 日本の制度・ガイダンス ──────────────────────────
  "meti-value-creation": {
    key: "meti-value-creation",
    label: "価値協創ガイダンス2.0",
    org: "経済産業省",
    url: "https://www.meti.go.jp/policy/economy/keiei_innovation/kigyoukaikei/ESGguidance.html",
    note: "企業と投資家の対話のための共通言語。価値観／長期戦略／ビジネスモデル／リスクと機会／実行戦略／成果とKPI／ガバナンス という価値創造ストーリーの型を示す。",
    year: "2022年8月改訂",
  },
  "cg-code": {
    key: "cg-code",
    label: "コーポレートガバナンス・コード",
    org: "東京証券取引所（JPX）",
    url: "https://www.jpx.co.jp/equities/listing/cg/index.html",
    note: "取締役会の実効性評価、スキル・マトリックス、独立社外取締役、政策保有株式、サステナビリティ課題への取組みなどの開示を求める。コンプライ・オア・エクスプレイン方式。",
  },
  "fsa-disclosure": {
    key: "fsa-disclosure",
    label: "金融審議会 ディスクロージャーワーキング・グループ",
    org: "金融庁",
    url: "https://www.fsa.go.jp/singi/follow-up/index.html",
    note: "有価証券報告書におけるサステナビリティ情報・人的資本の開示義務化を検討・答申してきた場。制度開示の最新動向はここで追う。",
  },
};

export function getSource(key: string): SourceRef | undefined {
  return sourceRegistry[key];
}

export function getSources(keys: string[] | undefined): SourceRef[] {
  if (!keys) return [];
  return keys
    .map((k) => sourceRegistry[k])
    .filter((s): s is SourceRef => Boolean(s));
}

// 領域ごとの出典一覧ページで使う並び順（登録順を保つ）。
export function allSources(): SourceRef[] {
  return Object.values(sourceRegistry);
}
