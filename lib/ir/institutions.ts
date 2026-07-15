import type { Institution } from "./types";

// 日本の主要IRサイト評価機関＋海外ベンチマークの横断比較。

export const institutions: Institution[] = [
  {
    slug: "nikko-ir",
    name: "全上場企業ホームページ充実度ランキング",
    org: "日興アイ・アール",
    type: "悉皆ランキング（底上げ型）",
    target: "全上場企業 約3,937社（2025年度）",
    audience: "全投資家・情報開示の底上げ",
    axis: "分かりやすさ／使いやすさ／情報の多さ（1次50項目・2次168項目）",
    scoring: "非公開（3視点の偏差値平均）",
    english: "一部項目で評価",
    latest: "2025年度（第23回、2025年12月発表）",
    detail:
      "2003年開始の悉皆調査。全上場企業のコーポレートサイト全体（IRに限らない）を対象に、客観的な掲載有無を1次50項目・2次168項目で調査し、3視点ごとの偏差値の平均を総合ポイントとする。レイアウトや文体などの主観的内容は評価対象外。2025年度は一部項目でAIによる調査結果を参考に使用。掲載率の例：決算説明会の資料80.8%、ガバナンス報告書75.4%、決算説明会の動画配信43.8%、統合報告書28.2%。",
    note: "本サイトのルーブリックでは「掲載有無チェックリスト」の網羅ソースとして活用。",
    url: "https://www.nikkoir.co.jp/rank/rank.html",
    source: "nikko-ir",
  },
  {
    slug: "gomez",
    name: "Gomez IRサイトランキング",
    org: "ブロードバンドセキュリティ（BBSec）ゴメス・コンサルティング本部",
    type: "専門家ランキング（アナリスト評価）",
    target: "東証上場3,778社 → 予備選考通過389社を精査（2025年）",
    audience: "株主・投資家（機関投資家目線）",
    axis: "4カテゴリ249項目、重み付き10点満点",
    scoring: "公開：使いやすさ30／財務・決算25／企業・経営25／積極性・先進性20",
    english: "「積極性・先進性」カテゴリ内で評価",
    latest: "2025年（第19回、2025年12月発表）",
    detail:
      "アナリストが実際に操作して4カテゴリ249項目を評価し、カテゴリ重みを加味して10点満点でスコア化。3機関で唯一カテゴリ別の数値配点を公開している。総合6.0以上を優秀企業（金賞8.0／銀賞7.0／銅賞6.0）。2025年総合1位は伊藤忠商事（8.87）、2位 日本ペイントHD（8.66）、3位 コニカミノルタ（8.60）。上位はファーストビューへの主要資料配置、統合報告書への明確導線、説明会の動画・質疑応答、チャートジェネレータ、資本コスト経営の専用セクション、AI可読性を意識したHTML化が共通。",
    note: "本サイトのルーブリックの配点はこの30/25/25/20に準拠している。",
    url: "https://www.gomez.co.jp/ranking/ir/",
    source: "gomez-ir",
  },
  {
    slug: "daiwa-ir",
    name: "大和インターネットIR表彰",
    org: "大和インベスター・リレーションズ（大和証券グループ）",
    type: "表彰（多段階審査）",
    target: "全上場企業 約4,122社を一次審査（2025年）",
    audience: "個人＋機関の双方",
    axis: "5T&C理念・大和IRスコアボード12大項目",
    scoring: "非公開（12項目の点数配分は非公開）",
    english: "日本語版：英語版＝5:5で統合評価",
    latest: "2025年（2025年12月発表）",
    detail:
      "5T&C（Timely／Transparent／Traceable／Trustworthy／Total＋Communication）を理念に、一次審査（基本10項目）→二次審査（スコアボード12大項目で定量評価）→三次審査（70点以上の英語版評価）→最終審査（日英5:5統合）という多段階審査。英文開示の日英公平性を明示的に評価する点が特徴。2025年最優秀8社（伊藤忠商事、ソフトバンク、TIS、日本ペイントHD、ミネベアミツミ、東急不動産HD、双日、アルトナー）。",
    note: "スコアボード12項目は「品質・導線の評価観点」として本ルーブリックに統合。",
    url: "https://www.daiwair.co.jp/news/internet_IR2025.html",
    source: "daiwa-ir",
  },
  {
    slug: "jira",
    name: "IR優良企業賞（参考）",
    org: "日本IR協議会",
    type: "表彰（IR活動全体の評価）",
    target: "会員のうち株式公開企業（2025年応募371社）",
    audience: "機関投資家・アナリスト",
    axis: "開示内容と対話の質（サイト設計そのものより開示・対話重視）",
    scoring: "非公開",
    english: "対話全般で評価",
    latest: "2025年（第30回）",
    detail:
      "サイト単体でなくIR活動全体（説明会・開示姿勢・対話の質）を評価する表彰。決算説明会資料の充実、KPI/セグメント別ROIC等の開示、CEO/CFOの積極的関与、資本コスト・PBRを意識した経営の説明、社外取締役との対話などを重視。2025年大賞はアシックス、荏原製作所。",
    note: "サイト診断の「参考観点」としてのみ反映（サイト評価ではない点に注意）。",
    url: "https://www.jira.or.jp/",
    source: "jira",
  },
  {
    slug: "ir-society",
    name: "Best Corporate Website（海外ベンチマーク）",
    org: "英国 IR Society",
    type: "自己エントリー表彰",
    target: "英国・国際上場企業",
    audience: "全ステークホルダー",
    axis: "design／usability／functionality／accessibility／content",
    scoring: "非公開（審査員の定性評価）",
    english: "明示的に評価",
    latest: "2025年（Large Cap: BASF ほか）",
    detail:
      "IR Society の年次Best Practice Awardsの一部門（2023年独立）。自己エントリー（最大800語）＋審査員の定性評価で、明確なエクイティストーリー、戦略とKPI、パーパス・ビジョン、ESG、デジタル媒体向けに再編集したコンテンツ（動画・データビジュアライゼーション・セルフサーブ機能）を評価。人間だけでなくAI・SEOツール向けアクセシビリティを明文化している点が先進的。",
    note: "「デジタルで物語（equity story）をどう伝えるか」を重視する国際ベンチマーク。",
    url: "https://irsociety.org.uk/",
  },
];

export function getInstitution(slug: string): Institution | undefined {
  return institutions.find((i) => i.slug === slug);
}
