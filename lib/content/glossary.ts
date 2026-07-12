import type { GlossaryTerm } from "./types";

// サステナビリティ開示でよく使われる用語集。各基準ページから相互参照される。
// slug は criteria.ts の relatedTerms と一致させること。

export const glossary: GlossaryTerm[] = [
  {
    slug: "materiality",
    term: "マテリアリティ",
    reading: "重要課題",
    definition:
      "企業の事業やステークホルダーにとって重要度の高いサステナビリティ課題。特定プロセス（課題の洗い出し→重要度評価→絞り込み）を経て決定し、戦略とKPIの起点になる。",
    relatedCriteria: ["A2", "B3"],
  },
  {
    slug: "integrated-report",
    term: "統合報告書",
    definition:
      "財務情報と非財務情報（ESG・戦略・ガバナンス）を統合し、企業の価値創造ストーリーを説明する報告書。IIRC（現IFRS財団）の国際統合報告フレームワークが代表的な枠組み。",
    relatedCriteria: ["A5", "B2"],
  },
  {
    slug: "esg-databook",
    term: "ESGデータブック",
    definition:
      "ESGに関する定量データ（排出量・従業員構成・ガバナンス指標等）を経年でまとめたデータ集。ExcelやPDFで提供され、投資家がデータを取得しやすくする。",
    relatedCriteria: ["A5"],
  },
  {
    slug: "value-creation",
    term: "価値創造プロセス",
    definition:
      "資本（財務・人的・自然・社会関係資本など）を事業活動を通じてアウトカム（価値）へ変換する流れを図示したモデル。統合報告の中核的な図表。",
    relatedCriteria: ["B2"],
  },
  {
    slug: "sdgs",
    term: "SDGs",
    reading: "持続可能な開発目標",
    definition:
      "2015年に国連が採択した2030年までの17の国際目標。企業は自社の取り組みをSDGsの各目標に紐づけて開示することが多い。",
    relatedCriteria: ["B3"],
  },
  {
    slug: "cdp",
    term: "CDP",
    definition:
      "気候変動・水・森林などの環境情報の開示を求め、企業をスコア評価する国際的な非営利組織。A〜Dのスコアが投資判断の参考にされる。",
    relatedCriteria: ["B5"],
  },
  {
    slug: "djsi",
    term: "DJSI",
    reading: "ダウ・ジョーンズ・サステナビリティ・インデックス",
    definition:
      "S&Pグローバルが運営するESG評価に基づく株価指数。組み入れは高いサステナビリティ評価の証とされる。",
    relatedCriteria: ["B5"],
  },
  {
    slug: "ftse",
    term: "FTSE（FTSE4Good等）",
    definition:
      "FTSE Russellが提供するESG指数シリーズ。FTSE4Good や FTSE Blossom Japan などがあり、ESG投資のベンチマークに使われる。",
    relatedCriteria: ["B5"],
  },
  {
    slug: "msci",
    term: "MSCI ESGレーティング",
    definition:
      "MSCIが企業のESGリスク管理をAAA〜CCCで格付けする評価。多くの機関投資家が参照する。",
    relatedCriteria: ["B5"],
  },
  {
    slug: "tcfd",
    term: "TCFD",
    reading: "気候関連財務情報開示タスクフォース",
    definition:
      "気候関連リスク・機会の財務影響を「ガバナンス・戦略・リスク管理・指標と目標」の4要素で開示することを推奨する枠組み。日本ではSSBJ基準として制度化が進む。",
    relatedCriteria: ["B6", "C2"],
  },
  {
    slug: "skill-matrix",
    term: "スキルマトリックス",
    definition:
      "取締役会に必要な専門性（経営・財務・ESG・国際性等）を各取締役が備えているかを一覧化した表。取締役会の実効性を示す代表的な開示。",
    relatedCriteria: ["B6", "E1"],
  },
  {
    slug: "ghg-protocol",
    term: "GHGプロトコル",
    definition:
      "温室効果ガス排出量の算定・報告に関する国際基準。排出をScope1（直接）・Scope2（購入エネルギー）・Scope3（その他サプライチェーン）に区分する。",
    relatedCriteria: ["C1"],
  },
  {
    slug: "scope3",
    term: "Scope3",
    definition:
      "自社の直接排出（Scope1）・購入電力等（Scope2）以外の、サプライチェーン全体で生じる間接排出。原材料調達・製品使用・廃棄など15カテゴリに分類される。",
    relatedCriteria: ["C1"],
  },
  {
    slug: "sbt",
    term: "SBT／SBTi",
    reading: "科学的根拠に基づく目標",
    definition:
      "パリ協定の目標（1.5℃等）と整合する温室効果ガス削減目標。SBTイニシアチブ（SBTi）が認定する。",
    relatedCriteria: ["C1", "C3"],
  },
  {
    slug: "carbon-neutral",
    term: "カーボンニュートラル／ネットゼロ",
    definition:
      "温室効果ガスの排出量と吸収・除去量を差し引きゼロにすること。多くの企業が2050年目標として掲げる。ネットゼロはより厳密に残余排出の除去まで含む概念。",
    relatedCriteria: ["C1", "C3"],
  },
  {
    slug: "ssbj",
    term: "SSBJ基準",
    reading: "サステナビリティ基準委員会",
    definition:
      "日本のサステナビリティ開示基準を策定する委員会およびその基準。ISSB（IFRS S1/S2）に基づき、気候関連開示の制度化を進めている。",
    relatedCriteria: ["C2"],
  },
  {
    slug: "scenario-analysis",
    term: "シナリオ分析",
    definition:
      "1.5℃・2℃・4℃など複数の気候シナリオを想定し、自社事業への財務影響を分析する手法。TCFDの「戦略」要素で推奨される。",
    relatedCriteria: ["C2"],
  },
  {
    slug: "tnfd",
    term: "TNFD",
    reading: "自然関連財務情報開示タスクフォース",
    definition:
      "自然・生物多様性に関するリスクと機会の開示枠組み。TCFDの自然版として、対応を始める企業が増えている。",
    relatedCriteria: ["C4"],
  },
  {
    slug: "circular-economy",
    term: "サーキュラーエコノミー",
    reading: "循環型経済",
    definition:
      "資源を使い捨てず循環させ、廃棄物と新規資源投入を最小化する経済モデル。リサイクル・リユース・製品長寿命化などで実現する。",
    relatedCriteria: ["C4"],
  },
  {
    slug: "human-rights-dd",
    term: "人権デューデリジェンス",
    definition:
      "事業活動に伴う人権への負の影響を特定・評価し、防止・是正する継続的な取り組み。国連「ビジネスと人権に関する指導原則」が基礎となる。",
    relatedCriteria: ["D1"],
  },
  {
    slug: "human-capital",
    term: "人的資本",
    definition:
      "従業員の知識・技能・経験などを企業価値の源泉となる「資本」として捉える考え方。育成投資やエンゲージメント等の指標で開示される。ISO 30414が指標の国際ガイドライン。",
    relatedCriteria: ["D2"],
  },
  {
    slug: "dei",
    term: "DE&I",
    reading: "ダイバーシティ・エクイティ&インクルージョン",
    definition:
      "多様性（Diversity）、公正性（Equity）、包摂（Inclusion）を指す。属性の多様化だけでなく、公正な機会と、誰もが力を発揮できる環境づくりまで含む。",
    relatedCriteria: ["D3"],
  },
  {
    slug: "health-management",
    term: "健康経営",
    definition:
      "従業員の健康を経営課題と捉え戦略的に取り組む考え方。日本では「健康経営優良法人」認定制度がある。",
    relatedCriteria: ["D4"],
  },
  {
    slug: "supply-chain",
    term: "サプライチェーンCSR",
    definition:
      "自社だけでなく調達先を含めたサプライチェーン全体で、人権・環境・労働などの責任を果たす取り組み。調達方針やサプライヤー監査で担保する。",
    relatedCriteria: ["D5"],
  },
  {
    slug: "erm",
    term: "ERM",
    reading: "全社的リスク管理",
    definition:
      "個別部門でなく企業全体で統合的にリスクを識別・評価・管理する枠組み（Enterprise Risk Management）。",
    relatedCriteria: ["E2"],
  },
  {
    slug: "cg-code",
    term: "コーポレートガバナンス・コード",
    definition:
      "上場企業が実効的なコーポレートガバナンスを実現するための原則。東京証券取引所が策定し、「コンプライ・オア・エクスプレイン」の枠組みで適用される。",
    relatedCriteria: ["E1"],
  },
  {
    slug: "wcag",
    term: "WCAG",
    reading: "ウェブコンテンツ・アクセシビリティ・ガイドライン",
    definition:
      "W3Cが策定するWebアクセシビリティの国際ガイドライン。適合レベルA・AA・AAAがあり、公共性の高いサイトではAA準拠が目安とされる。日本ではJIS X 8341-3が対応規格。",
    relatedCriteria: ["A6"],
  },
];

export function getTerm(slug: string): GlossaryTerm | undefined {
  return glossary.find((t) => t.slug === slug);
}
