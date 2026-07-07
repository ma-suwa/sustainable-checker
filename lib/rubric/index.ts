import type { Rubric, RubricCategory } from "./types";

// Phase1 enabled categories: A (usability, 30) / B (ESG common & strategy, 25) / E (governance, 15).
// C (environment, 15) / D (social, 15) / F (bonus, +10) are stubbed and disabled for now.
//
// Item-level point splits within a category are partly estimated: Gomez publishes category
// weights (30/25/15/15/15) but not the individual weights of its 189 items (see plan Caveats).

const A: RubricCategory = {
  id: "A",
  title: "サイトの使いやすさ・情報設計",
  points: 30,
  enabled: true,
  items: [
    {
      id: "A1",
      title: "到達性",
      points: 5,
      judgeType: "hybrid",
      signals: ["clickDepth"],
      criteria:
        "コーポレートトップのグローバルナビ／フッターからサステナビリティに1クリックで到達できるか。",
      goodExample: "ヘッダー第一階層に「サステナビリティ」があり1クリックで到達。",
      badExample: "IR下層に埋没し、トップから3クリック以上。",
      benchmark: "1クリック=満点、2クリック=50%、3クリック以上/未検出=0を目安。",
    },
    {
      id: "A2",
      title: "グローバルナビ／ローカルメニュー",
      points: 5,
      judgeType: "llm",
      criteria:
        "ESG別またはマテリアリティ別に整理され、下層詳細までドロップダウン等で一覧化されているか。",
      goodExample: "マウスオーバーで詳細メニューが一覧表示される。",
      badExample: "大分類のみで下層が見えない。",
      benchmark: "詳細情報のローカルメニュー一覧化は上位55.7%が採用。",
    },
    {
      id: "A3",
      title: "サイト内検索",
      points: 3,
      judgeType: "mechanical",
      signals: ["hasSiteSearch"],
      criteria: "全ページ（英語・下層含む）で検索機能が常時表示されているか。",
      goodExample: "全階層に検索窓。",
      badExample: "下層で検索が消える／存在しない。",
      benchmark: "上位98.9%がサイト内検索を導入。",
    },
    {
      id: "A4",
      title: "パンくず・現在地表示",
      points: 3,
      judgeType: "mechanical",
      signals: ["hasBreadcrumb"],
      criteria: "階層が深くても現在地（パンくず等）が分かるか。",
      goodExample: "各下層ページにパンくずリスト。",
      badExample: "現在地表示がなく迷子になる。",
    },
    {
      id: "A5",
      title: "統合報告書・データ集への導線",
      points: 5,
      judgeType: "hybrid",
      signals: ["hasReportLink", "hasDataBook"],
      criteria:
        "ESGトップから統合報告書／ESGデータ集へ明確な導線があるか（複数経路が理想）。",
      goodExample: "サステナトップから統合報告書とESGデータ集の両方へ複数導線。",
      badExample: "どこにあるか不明。",
      benchmark: "ESGトップから統合報告書への明確導線は上位65.9%。",
    },
    {
      id: "A6",
      title: "アクセシビリティ",
      points: 5,
      judgeType: "llm",
      criteria:
        "WCAG2.x/JIS X 8341-3 AA配慮（コントラスト、代替テキスト、文字サイズ、キーボード操作、アクセシビリティ方針の明記）。",
      goodExample: "アクセシビリティ方針を明記し代替テキスト・文字サイズ変更に対応。",
      badExample: "配慮の記載なし、画像altなし。",
    },
    {
      id: "A7",
      title: "モバイル・表示速度",
      points: 4,
      judgeType: "llm",
      criteria: "レスポンシブ、PDFの使いやすさ、表示速度。",
      goodExample: "スマホで崩れずPDFも軽快。",
      badExample: "モバイル非対応・重い。",
    },
  ],
};

const B: RubricCategory = {
  id: "B",
  title: "ESG共通・戦略性",
  points: 25,
  enabled: true,
  items: [
    {
      id: "B1",
      title: "トップメッセージ",
      points: 4,
      judgeType: "llm",
      criteria: "経営トップがサステナビリティを自分の言葉で語っているか。",
      goodExample: "社長メッセージ＋担当役員メッセージ。",
      badExample: "定型文のみ／不在。",
    },
    {
      id: "B2",
      title: "理念・ビジョン／価値創造ストーリー",
      points: 4,
      judgeType: "llm",
      criteria: "経営理念とサステナビリティの結びつき、価値創造モデルの図示。",
      goodExample: "価値創造プロセスを図示し理念と接続。",
      badExample: "理念とサステナが分断。",
    },
    {
      id: "B3",
      title: "マテリアリティ",
      points: 6,
      judgeType: "llm",
      criteria:
        "重要課題の特定プロセス・KPI・リスク／機会が明示され、事業と紐づいているか。",
      goodExample: "マテリアリティごとに目標・実績・SDGs紐づけ。",
      badExample: "項目列挙のみでプロセス・KPI無し。",
    },
    {
      id: "B4",
      title: "目標・実績・進捗",
      points: 5,
      judgeType: "llm",
      criteria: "定量目標と経年実績、達成度が確認できるか。",
      goodExample: "KPIごとに目標値と経年実績・達成率。",
      badExample: "目標のみで実績が無い。",
    },
    {
      id: "B5",
      title: "外部評価・イニシアチブ",
      points: 3,
      judgeType: "hybrid",
      signals: ["hasExternalEval"],
      criteria: "CDP/DJSI/FTSE等の評価、加盟イニシアチブの掲載。",
      goodExample: "主要外部評価と加盟イニシアチブを掲載。",
      badExample: "記載なし。",
    },
    {
      id: "B6",
      title: "英語開示の同等性",
      points: 3,
      judgeType: "hybrid",
      signals: ["hasEnglish"],
      criteria: "主要情報が日英同等か。",
      goodExample: "日英で同等の開示（TCFD英語86.5%、スキルマトリックス英語70.3%が目安）。",
      badExample: "英語ページが無い／極端に薄い。",
      benchmark: "言語切替の存在は機械判定、中身の同等性はLLMが補助判定（軽量）。",
    },
  ],
};

const E: RubricCategory = {
  id: "E",
  title: "ガバナンス G",
  points: 15,
  enabled: true,
  items: [
    {
      id: "E1",
      title: "コーポレート・ガバナンス体制",
      points: 5,
      judgeType: "hybrid",
      signals: ["hasSkillMatrix"],
      criteria: "取締役会構成、スキルマトリックスが開示されているか。",
      goodExample: "取締役会構成とスキルマトリックスを図表で開示。",
      badExample: "体制図のみでスキルマトリックス無し。",
      benchmark: "全取締役・監査役スキルマトリックスの英語発信は上位70.3%。",
    },
    {
      id: "E2",
      title: "リスク管理・コンプライアンス",
      points: 4,
      judgeType: "llm",
      criteria: "リスク管理体制とコンプライアンスの取り組み。",
      goodExample: "リスクマネジメント体制とコンプライアンス方針を明示。",
      badExample: "記載が乏しい。",
    },
    {
      id: "E3",
      title: "各種ポリシー",
      points: 3,
      judgeType: "llm",
      criteria: "税務・情報セキュリティ等の各種ポリシー。",
      goodExample: "税務方針・情報セキュリティ方針等を網羅。",
      badExample: "主要ポリシーが欠落。",
    },
    {
      id: "E4",
      title: "株主・投資家との対話開示",
      points: 3,
      judgeType: "llm",
      criteria: "対話テーマ・関心事項・反映事項が具体的に掲載されているか。",
      goodExample: "対話テーマと経営への反映事項を具体掲載。",
      badExample: "対話実施の有無のみ。",
      benchmark: "株主との対話状況の具体的掲載は上位50.8%（前年21.9%から倍増）。",
    },
  ],
};

// --- Disabled Phase2/3 stubs (kept for structure; not scored) ---
const C: RubricCategory = {
  id: "C",
  title: "環境 E",
  points: 15,
  enabled: false,
  items: [],
};
const D: RubricCategory = {
  id: "D",
  title: "社会 S",
  points: 15,
  enabled: false,
  items: [],
};
const F: RubricCategory = {
  id: "F",
  title: "加点：独自性・伝達力",
  points: 10,
  enabled: false,
  items: [],
};

export const rubric: Rubric = {
  version: "2025-phase1",
  categories: [A, B, C, D, E, F],
};

export function enabledCategories(): RubricCategory[] {
  return rubric.categories.filter((c) => c.enabled);
}

// Total available points across enabled categories (Phase1: 30+25+15 = 70).
export function enabledMaxPoints(): number {
  return enabledCategories().reduce((sum, c) => sum + c.points, 0);
}

export function allEnabledItems() {
  return enabledCategories().flatMap((c) =>
    c.items.map((item) => ({ ...item, categoryId: c.id }))
  );
}
