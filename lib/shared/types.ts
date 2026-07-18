// 3領域（サステナビリティ／IR／ユーザビリティ）で共通のコンテンツ型。
// 実例は「実在サイトを見て観測できた事実」を書く。company/url を伴う記述は、
// checkedOn の時点で実際に確認したものだけを載せる（サイトは改修されるため日付が必須）。

// 良い例に添えるサイトのスクリーンショット（public/ 配下の相対パス）。
export interface ExampleImage {
  // 例: "/screenshots/sites/jcom-home.jpg"（basePath は ExampleBox 側で前置きする）。
  src: string;
  // 図のキャプション（省略時は company から自動生成）。
  caption?: string;
}

export interface Example {
  // 何が良い／悪いのか。観測できた事実ベースで書く。
  text: string;
  // 実企業名（例: "伊藤忠商事"）。一般論のアンチパターンとして書く場合は省略する。
  company?: string;
  // 該当ページのURL。
  url?: string;
  // 確認日（"2026-07-15"）。企業名・URLを伴う場合は必須扱い。
  checkedOn?: string;
  // 補足（受賞歴、順位など）。
  note?: string;
  // サイトのスクリーンショット（良い例で、実際に撮影したもののみ）。
  image?: ExampleImage;
}

export interface Benchmark {
  // 「上位◯%が採用」などの目安。
  text: string;
  // 一次資料で確認できた数値か。false なら「要確認」バッジを出す。
  confirmed: boolean;
  // lib/sources.ts のキー。
  source?: string;
}
