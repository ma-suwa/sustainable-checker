import type { IrGlossaryTerm } from "./types";

// IRサイトでよく使われる用語集。slug は criteria.ts の relatedTerms と一致させる。

export const irGlossary: IrGlossaryTerm[] = [
  {
    slug: "timely-disclosure",
    term: "適時開示（TDnet）",
    definition:
      "上場企業が重要な会社情報を「直ちに」開示する制度。東証の適時開示情報伝達システム（TDnet）を通じて公表する。IRサイトは適時開示情報へのリンク・掲載が基本となる。",
    relatedCriteria: ["4-3"],
  },
  {
    slug: "fd-rule",
    term: "FDルール（フェア・ディスクロージャー・ルール）",
    definition:
      "重要情報を一部の者に伝達した場合、意図的なら同時に、非意図的なら速やかに全投資家へ公表することを求めるルール（2018年施行）。IRサイトは情報アクセスの公平性（エクイタブル・アクセス）を確保する中心的手段。",
    relatedCriteria: ["3-5"],
  },
  {
    slug: "disclosure-policy",
    term: "ディスクロージャーポリシー",
    definition:
      "情報開示の基本方針・体制・沈黙期間・FD対応などを定めた社内方針。開示姿勢の透明性を示す。",
    relatedCriteria: ["3-5"],
  },
  {
    slug: "kessan-tanshin",
    term: "決算短信",
    definition:
      "決算発表時に取引所ルールに基づき作成・開示される決算速報。有価証券報告書より早く公表され、投資家が最初に参照する決算資料。",
    relatedCriteria: ["2-1"],
  },
  {
    slug: "yukashoken-hokokusho",
    term: "有価証券報告書",
    definition:
      "金融商品取引法に基づき事業年度ごとにEDINETへ提出する法定開示書類。財務諸表に加え、近年は人的資本・サステナビリティ情報の記載も求められる。",
    relatedCriteria: ["2-1"],
  },
  {
    slug: "ir-library",
    term: "IRライブラリー",
    definition:
      "決算短信・説明会資料・統合報告書などのIR資料を種別×年次で整理・アーカイブするコーナー。フィルタや一括ダウンロードの使い勝手が評価される。",
    relatedCriteria: ["1-1", "2-1"],
  },
  {
    slug: "chart-generator",
    term: "チャートジェネレータ",
    definition:
      "業績・財務指標をユーザーが選んでグラフ化・比較できる機能。過去データやCSVダウンロード、ROE/ROIC/PBR等の指標表示に対応するものが高評価。",
    relatedCriteria: ["2-2"],
  },
  {
    slug: "capital-cost",
    term: "資本コストや株価を意識した経営（PBR/ROE/ROIC）",
    definition:
      "2023年の東証要請以降広がった、資本コスト・ROE・ROIC・PBRを意識した経営の説明。IRサイトでも成長戦略・資本政策とあわせて開示する動きが顕著。",
    relatedCriteria: ["2-2", "3-1"],
  },
  {
    slug: "skill-matrix",
    term: "スキルマトリックス",
    definition:
      "取締役会に必要な専門性（経営・財務・ESG・国際性等）を各取締役が備えているかを一覧化した表。取締役会の実効性を示す代表的な開示。",
    relatedCriteria: ["3-3"],
  },
  {
    slug: "cg-code",
    term: "コーポレートガバナンス・コード",
    definition:
      "上場企業が実効的なガバナンスを実現するための原則（東証策定）。CG報告書は東証のCG情報サービスに常時掲載される。",
    relatedCriteria: ["3-3"],
  },
  {
    slug: "equity-story",
    term: "エクイティストーリー",
    definition:
      "「なぜ自社に投資すべきか」を、事業モデル・強み・戦略・KPIで一貫して語る物語。IRサイト全体が投資家に伝えるべき中核メッセージ。",
    relatedCriteria: ["3-1", "3-2"],
  },
  {
    slug: "materiality-ir",
    term: "マテリアリティ（重要課題）",
    definition:
      "企業とステークホルダーにとって重要度の高いESG課題。特定プロセスとKPIを示し、企業価値と結びつけて開示する。",
    relatedCriteria: ["3-4"],
  },
  {
    slug: "integrated-report-ir",
    term: "統合報告書",
    definition:
      "財務情報と非財務情報（ESG・戦略・ガバナンス）を統合し価値創造ストーリーを説明する報告書。IRサイトからの明確な導線が評価される。",
    relatedCriteria: ["3-4"],
  },
  {
    slug: "prime-english",
    term: "プライム市場の英文開示義務化",
    definition:
      "2025年4月から、プライム上場企業は決算情報・適時開示情報の日英同時開示が義務化。英文は日本語の参考訳の位置づけ。IRサイトの英文充実・日英公平性の重要度が増した。",
    relatedCriteria: ["4-1"],
  },
  {
    slug: "responsive",
    term: "レスポンシブデザイン",
    definition:
      "画面幅に応じてレイアウトが自動調整され、スマホ・タブレット・PCで最適表示される設計手法。",
    relatedCriteria: ["1-4"],
  },
  {
    slug: "accessibility",
    term: "アクセシビリティ",
    definition:
      "多様な利用者が情報にアクセスできる度合い。コントラストや代替テキスト等の配慮に加え、近年はAI・SEOツールからの可読性も重視される。",
    relatedCriteria: ["1-5"],
  },
  {
    slug: "technical-seo",
    term: "テクニカルSEO／XMLサイトマップ",
    definition:
      "検索エンジンやAIがサイト構造を正しく把握できるようにする技術的な最適化。XMLサイトマップの整備、適切なマークアップ、表示速度などが含まれる。",
    relatedCriteria: ["1-6"],
  },
  {
    slug: "ai-friendly",
    term: "AIフレンドリー設計",
    definition:
      "統合報告書や中期経営計画などの重要コンテンツをPDFだけでなくHTML/LP化し、AIや検索での読み取り可能性を確保する設計。図を画像貼付のみにするとAI・検索非対応になる。",
    relatedCriteria: ["4-4"],
  },
];

export function getIrTerm(slug: string): IrGlossaryTerm | undefined {
  return irGlossary.find((t) => t.slug === slug);
}
