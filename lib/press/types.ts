// プレスリリース編の型。
//
// このセクションは他の3領域（criteria ベース）と性格が違う。
// 評価軸を規範として示すのではなく、「評価機関が実際に何を発表したか」という
// 一次情報を集め、そこから読み取れる傾向と対応策を導く構成にしている。
//
// したがって finding（特徴）は必ず evidence（どのリリースの、どの記述か）を伴う。
// 出所を示せない一般論は書かない。

// リリースの発行主体。一覧のグルーピングに使う。
export type OrgKey =
  | "nikkoir" // 日興アイ・アール
  | "daiwair" // 大和インベスター・リレーションズ
  | "gomez" // ゴメス・コンサルティング（ブロードバンドセキュリティ）
  | "tribeck" // トライベック／トライベック・ブランド戦略研究所
  | "scaj" // サステナビリティコミュニケーション協会
  | "nikkeibp" // 日経BPコンサルティング
  | "company"; // 受賞企業側の発表

// リリースの性格。
// - survey: 調査そのものの発表（調査概要・評価軸・全体傾向がわかる）
// - award:  表彰・受賞企業の発表（誰がどの基準で選ばれたかがわかる）
// - method: 調査手法・評価項目の解説ページ
// - corporate: 受賞した企業側の発表（何を評価されたと受け止めたかがわかる）
export type ReleaseKind = "survey" | "award" | "method" | "corporate";

export interface PressRelease {
  id: string;
  title: string;
  org: string;
  orgKey: OrgKey;
  kind: ReleaseKind;
  url: string;
  // 発表日。URL や本文から確実に判明したものだけを入れる（不明なら未設定）。
  // 月までしか確定できない場合は "2025-02" のように部分指定してよい。
  date?: string;
  // このリリースから何がわかるか。
  summary?: string;
  // 一次情報から読み取れた事実。数値は原文の表現に合わせる。
  facts?: string[];
}

// 対応策の難易度。読者が着手順を判断できるようにする。
export type ActionLevel = "まず着手" | "標準" | "上位を狙う";

export interface Action {
  text: string;
  level: ActionLevel;
}

// 特徴の根拠。必ずどのリリースに紐づくかを示す。
export interface Evidence {
  text: string;
  releaseId: string;
}

export interface Finding {
  id: string;
  title: string;
  // 一覧・目次で使う短いラベル。
  short: string;
  // 導入。何が起きているのかを1〜2文で。
  lead: string;
  // 本文。なぜそう言えるのかを説明する段落（複数可）。
  body: string[];
  evidence: Evidence[];
  actions: Action[];
}
