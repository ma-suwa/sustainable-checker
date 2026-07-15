import type { IrCategory, IrCategoryId, IrCriteriaItem } from "./types";

// IRサイト評価ルーブリック（4カテゴリ・20項目・計100点）。
// カテゴリ配点はゴメス/BBSec準拠（使いやすさ30／財務・決算25／企業・経営25／積極性・先進性20）。
//
// 【実例の扱い】
//  - 良い例は、実際にそのページを開いて確認できた事実、または評価機関の講評に明記された事実のみを、
//    企業名・URL・確認日つきで載せる。
//  - 悪い例は「よくあるアンチパターン」として書き、企業名は出さない（サイトは随時改修されるため、
//    欠落の名指しは不正確になりやすい）。
//
// 【出典】sources / benchmark.source は lib/sources.ts のキー。

const CHECKED = "2026-07-15";

const C1: IrCategory = {
  id: "1",
  title: "使いやすさ・情報設計",
  short: "ナビ・検索・モバイル・アクセシビリティなど到達性の設計（配点30）",
  description:
    "どれだけ開示が充実していても、探せなければ読まれない。IRトップからの導線、ファーストビュー設計、サイト内検索、モバイル対応、アクセシビリティ、表示速度・技術品質まで、投資家が情報にたどり着ける体験を評価する。ゴメスが公開する4カテゴリのうち最も配点が重い（30%）領域であり、開示の中身より先に問われる土台にあたる。",
  points: 30,
  items: [
    {
      id: "1-1",
      title: "グローバルナビ／メニュー",
      points: 6,
      judgeMethod: "screen",
      criteria: "IRトップから主要ページへワンクリックで到達でき、論理的に分類されているか。",
      background:
        "IRサイトは決算・株式・ガバナンス・ESGなど情報が多岐にわたる。目的別に整理され、オンマウス展開などで下層まで見通せるナビは、回遊性と情報の網羅性の印象を左右する。オンマウスでのメニュー表示は上場企業の73.0%が採用しており、いまや標準装備に近い。",
      checkpoints: [
        "IRトップから決算・株式情報・ガバナンス・IRライブラリへ1クリックで行けるか",
        "オンマウス／クリックで下層メニューが一覧展開されるか",
        "分類が投資家の目的別（業績を見る／株を買う／会社を知る）になっているか",
        "IR配下のどのページでも同じIRメニューが維持されるか",
      ],
      goodExamples: [
        {
          company: "伊藤忠商事",
          url: "https://www.itochu.co.jp/ja/ir/",
          text: "IRトップから最新IR資料・IRニュース・統合レポート・個人投資家向けページへそれぞれ直接たどれる構成になっている。",
          checkedOn: CHECKED,
          note: "Gomez IRサイトランキング2025 総合1位（8.87点）",
        },
      ],
      badExamples: [
        { text: "「IR情報」の下に大分類しかなく、下層に何があるかメニューから見えない。" },
        { text: "会社案内の階層構造をそのまま流用しており、投資家の目的別になっていない。" },
      ],
      benchmark: {
        text: "オンマウスでのメニュー表示は上場企業の73.0%が採用（日興アイ・アール 2025年度調査）。",
        confirmed: true,
        source: "nikko-ir-2025-pdf",
      },
      sources: ["gomez-ir", "nikko-ir"],
      relatedTerms: ["ir-library"],
    },
    {
      id: "1-2",
      title: "ファーストビュー設計",
      points: 5,
      judgeMethod: "screen",
      criteria:
        "IRトップのファーストビューに株価・最新IR資料・IRニュースなど即時性の高い情報を配置しているか。",
      background:
        "上位サイトはIRトップの最上部に最新情報と主要資料を置き、下部にじっくり読むコンテンツを配置する。第一画面で「今」の情報が掴めるかが第一印象を決める。ゴメスの2025年講評でも、IRトップでの最新資料ダウンロード導線が上位企業の共通項として挙げられている。",
      checkpoints: [
        "株価情報が第一画面付近にあるか",
        "最新の決算資料をトップから直接ダウンロードできるか",
        "IRニュース（適時開示）の最新数件が見えるか",
        "第一画面が大きなイメージ画像だけで埋まっていないか",
      ],
      goodExamples: [
        {
          company: "伊藤忠商事",
          url: "https://www.itochu.co.jp/ja/ir/",
          text: "株価情報、「最新IR資料のダウンロード」、「IR最新情報（適時開示等）」が上部に並び、第一画面で「今」の情報が揃う。",
          checkedOn: CHECKED,
        },
      ],
      badExamples: [
        { text: "ファーストビューがPDFリンクの羅列で、株価も最新ニュースも下までスクロールしないと出ない。" },
        { text: "巨大なキービジュアルのスライダーが画面を占有し、投資家が求める情報が押し下げられている。" },
      ],
      benchmark: {
        text: "IRトップでの最新資料ダウンロード導線は389社中291社（74.8%）が実装。",
        confirmed: true,
        source: "gomez-ir-2025-press",
      },
      sources: ["gomez-ir-2025-press", "gomez-ir"],
      relatedTerms: [],
    },
    {
      id: "1-3",
      title: "サイト内検索・回遊",
      points: 5,
      judgeMethod: "url-screen",
      criteria: "サイト内検索機能・パンくず・関連リンクで情報を探し回遊できるか。",
      background:
        "目的の資料名が分かっている投資家には検索が最短路。パンくずや関連リンク、人気ページ導線があると、深い階層でも迷わず回遊できる。検索から直接下層に着地する読み手が多いため、現在地表示は「あれば良い」ではなく前提装備になる。",
      checkpoints: [
        "全ページに検索窓（またはアイコン）があるか",
        "「決算短信」「有価証券報告書」など資料名で検索して的確に返るか",
        "下層ページにパンくずがあり、各階層がリンクになっているか",
        "ページ末尾に関連ページへの導線があるか",
      ],
      goodExamples: [
        {
          company: "伊藤忠商事",
          url: "https://www.itochu.co.jp/ja/ir/",
          text: "ヘッダーに検索機能を常設し、IRトップから決算情報・IRニュース一覧などへ複数の回遊導線を用意している。",
          checkedOn: CHECKED,
        },
      ],
      badExamples: [
        { text: "検索機能がなく、深い階層で現在地も分からない。" },
        { text: "検索はあるが、PDF内の情報がヒットせず「該当なし」と返る。" },
      ],
      benchmark: {
        text: "サイト内検索の導入率はESGサイト調査で98.9%。IRサイトでも事実上の必須項目。",
        confirmed: true,
        source: "gomez-esg-2025-press",
      },
      sources: ["gomez-ir", "gomez-esg-2025-press"],
      relatedTerms: [],
    },
    {
      id: "1-4",
      title: "モバイル／レスポンシブ",
      points: 5,
      judgeMethod: "screen",
      criteria: "スマートフォンなど全デバイスで最適表示されるか。",
      background:
        "個人投資家を中心に閲覧の多くがモバイル。崩れる・固定幅のサイトは内容以前に読まれない。レスポンシブ対応は必須要件になりつつある一方、決算資料のPDFがモバイルで読めないという「中身は対応していない」状態が残りやすい。",
      checkpoints: [
        "スマートフォンで横スクロールが発生しないか",
        "決算ハイライトの表がモバイルで読めるか（横スクロール領域を持つか）",
        "タップ対象（リンク・ボタン）が十分な大きさで、間隔が空いているか",
        "PDFに頼らずHTMLで読める情報がどれだけあるか",
      ],
      goodExamples: [
        {
          company: "日本ペイントホールディングス",
          url: "https://www.nipponpaint-holdings.com/ir/",
          text: "個人投資家向けを含むIRコンテンツをHTMLで提供し、PDFに閉じない設計になっている。",
          checkedOn: CHECKED,
          note: "Gomez IRサイトランキング2025 総合2位（8.66点）",
        },
      ],
      badExamples: [
        { text: "PC専用の固定幅で、スマホでは横スクロールが必要になる。" },
        { text: "レスポンシブではあるが、業績数値の表が画面外にはみ出して読めない。" },
      ],
      sources: ["gomez-ir", "core-web-vitals"],
      furtherReading: ["pagespeed"],
      relatedTerms: ["responsive"],
    },
    {
      id: "1-5",
      title: "アクセシビリティ",
      points: 4,
      judgeMethod: "url-screen",
      criteria:
        "十分なコントラスト、代替テキスト、キーボード操作、アクセシビリティ方針の明記など配慮があるか。",
      background:
        "多様な投資家に情報を届ける責任。近年は人間だけでなくAI・SEOツールからの可読性まで含めて「アクセシブルであること」が国際的に重視されている（英IR Societyは審査基準に明文化）。WCAG 2.2 のレベルAAが実務上の到達目標になる。",
      checkpoints: [
        "アクセシビリティ方針を掲載し、準拠レベル（WCAG 2.2 AA等）を明示しているか",
        "文字と背景のコントラスト比が4.5:1以上か",
        "業績グラフが画像のみになっていないか（数値がテキストでも取れるか）",
        "キーボード操作だけでメニューを開けるか",
      ],
      goodExamples: [
        {
          text: "アクセシビリティ方針でWCAG 2.2 レベルAA準拠と対象範囲を明示し、業績グラフの数値をHTMLの表としても提供している。",
        },
      ],
      badExamples: [
        { text: "低コントラストの淡色テキストが多用され、方針の記載もない。" },
        { text: "IRカレンダーやチャートがマウス操作前提で、キーボードでは到達できない。" },
      ],
      benchmark: {
        text: "アクセシビリティポリシーの掲載はESGサイト調査で185社中86社（46.5%）。半数以上が未掲載。",
        confirmed: true,
        source: "gomez-esg-2025-press",
      },
      sources: ["wcag22", "wcag22-ja", "gomez-esg-2025-press"],
      furtherReading: ["lighthouse"],
      relatedTerms: ["accessibility"],
    },
    {
      id: "1-6",
      title: "表示速度・技術品質",
      points: 5,
      judgeMethod: "technical",
      criteria: "表示速度、XMLサイトマップ、テクニカルSEOなど技術基盤が整っているか。",
      background:
        "表示速度は離脱率とSEOに直結する。XMLサイトマップやテクニカルSEOの整備は、検索・AIからの発見可能性を高め、権威ある情報源としての位置づけを支える。ゴメスの2025年講評は、XMLサイトマップの設置率が52.4%にとどまり、エラー残存や重複ページの正規化不足が課題だと明示している。",
      checkpoints: [
        "PageSpeed Insights で LCP 2.5秒以内・INP 200ms以内・CLS 0.1以下か",
        "XMLサイトマップが設置され、実際のページ構成と整合しているか",
        "404・リダイレクトエラーが放置されていないか",
        "重複URL（www有無・index.html有無）が正規化されているか",
      ],
      goodExamples: [
        {
          company: "コニカミノルタ",
          url: "https://www.konicaminolta.com/jp-ja/investors/index.html",
          text: "XMLサイトマップの整合性を確保し正常URL率を高水準に維持、ページ表示速度も良好とゴメスの講評で評価された。",
          checkedOn: CHECKED,
          note: "Gomez IRサイトランキング2025 総合3位（8.60点）",
        },
      ],
      badExamples: [
        { text: "ページが極端に重く、XMLサイトマップも未整備。" },
        { text: "サイトマップは置いてあるが、削除済みページのURLが残ったまま更新されていない。" },
      ],
      benchmark: {
        text: "XMLサイトマップの設置は389社中204社（52.4%）。半数弱が未設置で、差がつきやすい。",
        confirmed: true,
        source: "gomez-ir-2025-press",
      },
      sources: ["gomez-ir-2025-press", "core-web-vitals"],
      furtherReading: ["pagespeed", "lighthouse"],
      relatedTerms: ["technical-seo"],
    },
  ],
};

const C2: IrCategory = {
  id: "2",
  title: "財務・決算情報の充実度",
  short: "決算資料・業績ハイライト・ヒストリカルデータ・説明会（配点25）",
  description:
    "投資判断の土台となる財務・決算情報の網羅性と使い勝手を評価する。決算短信・有報・説明会資料のアーカイブ、指標のグラフ化、経年・セグメントデータの加工可能な提供、説明会の動画・質疑応答、株式・株主還元情報まで。日興アイ・アールの悉皆調査が示すとおり、この領域は「載せているか／いないか」で全上場企業に大きな差が残っている。",
  points: 25,
  items: [
    {
      id: "2-1",
      title: "決算資料",
      points: 6,
      judgeMethod: "url",
      criteria:
        "決算短信・有価証券報告書・四半期・説明会資料が網羅され、アーカイブされているか。",
      background:
        "投資家は経年で資料を参照する。種別×年次で整理され過去分もアーカイブされていることが、分析の前提になる。決算説明会の資料掲載は全上場企業で80.8%まで進んだが、逆に言えば2割弱はまだ載せていない。",
      checkpoints: [
        "決算短信・有価証券報告書・説明会資料が種別×年次で整理されているか",
        "過去3〜5年分がアーカイブされているか",
        "各資料の掲載日・対象期が明記されているか",
        "ファイル名だけでなく、内容が分かるタイトルが付いているか",
      ],
      goodExamples: [
        {
          company: "伊藤忠商事",
          url: "https://www.itochu.co.jp/ja/ir/financial_statements/index.html",
          text: "決算情報を専用セクションにまとめ、IRトップからも最新の決算短信を直接ダウンロードできる。",
          checkedOn: CHECKED,
        },
      ],
      badExamples: [
        { text: "最新期のみで過去資料が欠落しており、経年比較ができない。" },
        { text: "資料一覧がPDFのリンク名だけで、どの期のものか開くまで分からない。" },
      ],
      benchmark: {
        text: "決算説明会の資料掲載は全上場企業で80.8%（前年比+1.4pt）、ガバナンス報告書は75.4%（日興2025）。",
        confirmed: true,
        source: "nikko-ir-2025-pdf",
      },
      sources: ["nikko-ir-2025-pdf", "gomez-ir"],
      relatedTerms: ["kessan-tanshin", "yukashoken-hokokusho", "ir-library"],
    },
    {
      id: "2-2",
      title: "業績ハイライト",
      points: 5,
      judgeMethod: "screen",
      criteria: "主要業績がグラフ化され、ROE/ROIC/PBR等の主要指標が示されているか。",
      background:
        "数表の羅列より、経年グラフやチャートジェネレータの方が直感的に理解できる。資本コストや株価を意識した経営の要請を受け、ROE/ROIC/PBRの掲載が増えている。ゴメスの講評でも、上位企業の共通項としてチャートジェネレータと資本コスト経営の専用セクションが挙げられている。",
      checkpoints: [
        "売上・利益・キャッシュフローが経年グラフで示されているか",
        "ROE・ROIC・PBRなど資本効率の指標を掲載しているか",
        "投資家が期間や指標を選べるチャート機能があるか",
        "セグメント別の業績が図示されているか",
      ],
      goodExamples: [
        {
          text: "チャートジェネレータで指標と期間を選んで経年グラフを描け、ROE・ROIC・PBRを資本コストの説明と同じセクションに置いている。",
        },
      ],
      badExamples: [
        { text: "テキストや表だけで、視覚化された業績ハイライトがない。" },
        { text: "グラフはあるが画像で、数値を取り出せずモバイルでは読めない。" },
      ],
      sources: ["gomez-ir", "gomez-ir-2025-press"],
      relatedTerms: ["chart-generator", "capital-cost"],
    },
    {
      id: "2-3",
      title: "ヒストリカルデータ",
      points: 5,
      judgeMethod: "url",
      criteria: "経年・セグメント別データがCSV/Excelで加工可能に提供されているか。",
      background:
        "機関投資家・アナリストは自らデータを加工する。過去10年分などのCSV/Excelダウンロードは、分析の手間を大きく減らし高く評価される。PDFしかない場合、アナリストは手入力するか、そもそも分析対象から外すことになる。",
      checkpoints: [
        "財務ハイライトをCSV/Excelでダウンロードできるか",
        "過去10年分など十分な期間があるか",
        "セグメント別・四半期別の粒度で提供されているか",
        "会計基準変更や組替の注記があるか",
      ],
      goodExamples: [
        {
          text: "過去10年分の財務データとセグメント別数値をExcelで提供し、会計基準変更時の組替済み数値も併記している。",
        },
      ],
      badExamples: [
        { text: "PDFのみで、数値をコピーすると桁がずれる。" },
        { text: "Excelはあるが最新期のみで、経年の一括取得ができない。" },
      ],
      sources: ["gomez-ir", "daiwa-ir"],
      relatedTerms: [],
    },
    {
      id: "2-4",
      title: "説明会コンテンツ",
      points: 5,
      judgeMethod: "url",
      criteria: "決算説明会の動画・書き起こし・質疑応答が掲載されているか。",
      background:
        "説明会に参加できない投資家との情報格差を埋める、公平性の観点で重要な項目。動画・書き起こし・質疑応答まで揃えると、経営陣の説明の温度感まで伝わる。質疑応答の掲載はゴメスのノミネート企業で73.8%に達する一方、全上場企業でみると動画配信は43.8%にとどまり、上位と全体の差が最も大きい項目のひとつ。",
      checkpoints: [
        "決算説明会の動画を掲載しているか（アーカイブが残るか）",
        "質疑応答（Q&A）を文字で掲載しているか",
        "書き起こし（トランスクリプト）があるか",
        "英語版の説明会コンテンツがあるか",
      ],
      goodExamples: [
        {
          text: "説明会動画に加えて、質疑応答をテキスト化して掲載し、投資家が検索・引用できる形にしている。",
        },
      ],
      badExamples: [
        { text: "説明会資料のPDFのみで、動画も質疑応答もない。" },
        { text: "動画はあるが配信期間が限定され、過去回が残っていない。" },
      ],
      benchmark: {
        text: "決算説明会の質疑応答掲載は389社中287社（73.8%）、動画掲載は269社（69.2%）。ただし全上場企業では動画配信は43.8%（日興2025）。",
        confirmed: true,
        source: "gomez-ir-2025-press",
      },
      sources: ["gomez-ir-2025-press", "nikko-ir-2025-pdf"],
      relatedTerms: [],
    },
    {
      id: "2-5",
      title: "株式・株主還元",
      points: 4,
      judgeMethod: "url",
      criteria: "株価情報、配当実績・方針、株主総会情報など株式関連情報があるか。",
      background:
        "配当方針・株主還元の基本方針は個人投資家の関心が高い。株価情報・株主総会情報とあわせ、株主目線の情報が揃っているかを見る。株主還元の数値目標（配当性向・総還元性向）まで踏み込めているかで差がつく。",
      checkpoints: [
        "配当実績を経年で掲載しているか",
        "株主還元方針に数値目標（配当性向・DOE・総還元性向）があるか",
        "株主総会の招集通知・議決権行使結果を掲載しているか",
        "株価情報・株式基本情報（発行済株式数・株主構成）があるか",
      ],
      goodExamples: [
        {
          company: "伊藤忠商事",
          url: "https://www.itochu.co.jp/ja/ir/",
          text: "IRトップに株価情報を配置し、株主還元・株式情報へ個別の導線を設けている。",
          checkedOn: CHECKED,
        },
      ],
      badExamples: [
        { text: "配当実績はあるが、還元方針が「安定配当を目指す」だけで数値目標がない。" },
        { text: "株主総会の情報が招集通知PDFのみで、議決権行使結果が載っていない。" },
      ],
      benchmark: {
        text: "株主還元の数値目標の記載は389社中266社（68.4%）。",
        confirmed: true,
        source: "gomez-ir-2025-press",
      },
      sources: ["gomez-ir-2025-press", "nikko-ir"],
      relatedTerms: [],
    },
  ],
};

const C3: IrCategory = {
  id: "3",
  title: "企業・経営情報の充実度",
  short: "経営戦略・事業説明・ガバナンス・ESG・ポリシー（配点25）",
  description:
    "「この会社に投資する意味」を伝える定性情報を評価する。トップメッセージと中期経営計画、事業モデルと強みの説明、役員・スキルマトリックス等のガバナンス、サステナビリティ/ESG、ディスクロージャーポリシー等の規約まで。経産省の価値協創ガイダンス2.0が示す価値創造ストーリーの型が、そのままチェックの骨格になる。",
  points: 25,
  items: [
    {
      id: "3-1",
      title: "経営方針・戦略",
      points: 6,
      judgeMethod: "url-screen",
      criteria: "トップメッセージ、中期経営計画、成長戦略が具体的に語られているか。",
      background:
        "エクイティストーリーの核。CEO/CFOメッセージのHTML化、中期経営計画・資本政策の説明は、経営の本気度と将来像を伝える。ゴメスの2025年講評は、1位企業について「豊富な情報量とマネジメントによる力強いメッセージ発信を高い水準で両立」と評しており、量と語りの両立が上位の条件になっている。",
      checkpoints: [
        "CEOメッセージがHTMLで読めるか（PDFの中だけになっていないか）",
        "中期経営計画の目標値と進捗が示されているか",
        "資本コスト・資本収益性を意識した経営の説明があるか",
        "CFOメッセージなど財務戦略の語り手がいるか",
      ],
      goodExamples: [
        {
          company: "伊藤忠商事",
          url: "https://www.itochu.co.jp/ja/ir/",
          text: "HTML形式の統合レポートを掲載し、その中でCFOメッセージまで読める形にしている（ゴメス講評で評価点として明記）。",
          checkedOn: CHECKED,
        },
      ],
      badExamples: [
        { text: "抽象的な方針が数年前のまま置かれ、現在の戦略が読み取れない。" },
        { text: "中期経営計画がPDF1本のみで、進捗の更新がない。" },
      ],
      benchmark: {
        text: "中期経営計画の説明会資料掲載は43.7%（日興2025）。過半数の企業が計画の説明を資料として置いていない。",
        confirmed: true,
        source: "nikko-ir-2025-pdf",
      },
      sources: ["gomez-ir-2025-press", "meti-value-creation"],
      relatedTerms: ["equity-story", "capital-cost"],
    },
    {
      id: "3-2",
      title: "事業内容の説明",
      points: 5,
      judgeMethod: "screen",
      criteria: "事業モデル・強み・業界環境が分かりやすく説明されているか。",
      background:
        "特に個人投資家には「何をして稼いでいる会社か」を平易に伝える自己紹介型コンテンツが有効。図解の巧拙が理解度を左右する。BtoB企業ほど、この説明の有無で個人投資家の理解度が大きく変わる。",
      checkpoints: [
        "ビジネスモデル（誰から何で収益を得るか）が図解されているか",
        "セグメント別の事業内容と収益構成が示されているか",
        "競争優位・強みが具体的に説明されているか",
        "業界環境・市場規模の説明があるか",
      ],
      goodExamples: [
        {
          company: "日本ペイントホールディングス",
          url: "https://www.nipponpaint-holdings.com/ir/",
          text: "個人投資家向けページで塗料市場・グループ概要・成長戦略を噛み砕いて説明し、BtoB事業の理解を助けている。",
          checkedOn: CHECKED,
        },
      ],
      badExamples: [
        { text: "会社概要の沿革と数値だけで、何をして稼いでいる会社なのか分からない。" },
        { text: "専門用語のまま説明され、業界の予備知識がないと読めない。" },
      ],
      sources: ["gomez-ir", "daiwa-ir"],
      relatedTerms: ["equity-story"],
    },
    {
      id: "3-3",
      title: "ガバナンス",
      points: 5,
      judgeMethod: "url",
      criteria: "役員経歴、スキルマトリックス、コーポレートガバナンス報告書があるか。",
      background:
        "取締役会の実効性を示すスキルマトリックスの開示が広がっている。コーポレートガバナンス・コードが開示を求める項目であり、CG報告書へのリンクだけでなく、役員の経歴・専門性まで分かることが望ましい。社外取締役自身の言葉が読めると、実効性の印象が大きく変わる。",
      checkpoints: [
        "役員一覧に経歴・専門性・在任年数があるか",
        "スキルマトリックスを図表で掲載しているか",
        "コーポレートガバナンス報告書へのリンクがあるか",
        "社外取締役の視点（インタビュー・対談）が読めるか",
        "取締役会の実効性評価の結果を開示しているか",
      ],
      goodExamples: [
        {
          company: "日本ペイントホールディングス",
          url: "https://www.nipponpaint-holdings.com/ir/",
          text: "「独立社外取締役への質問（一問一答）」を経営方針セクションから直接たどれる位置に置いている。",
          checkedOn: CHECKED,
          note: "ゴメスは同社の独立社外取締役インタビュー掲載を評価点として挙げている",
        },
      ],
      badExamples: [
        { text: "CG報告書へのリンクのみで、役員の専門性が分からない。" },
        { text: "スキルマトリックスがCG報告書PDFの中だけにあり、Webページ上で読めない。" },
      ],
      benchmark: {
        text: "ガバナンス報告書の掲載は全上場企業で75.4%（前年比+1.8pt、日興2025）。",
        confirmed: true,
        source: "nikko-ir-2025-pdf",
      },
      sources: ["cg-code", "nikko-ir-2025-pdf"],
      relatedTerms: ["skill-matrix", "cg-code"],
    },
    {
      id: "3-4",
      title: "サステナビリティ／ESG",
      points: 5,
      judgeMethod: "url",
      criteria: "ESG方針・重要課題・定量データがあり、企業価値と結びついているか。",
      background:
        "ESGと企業価値の結びつきは投資家の関心事。E/S/Gが体系的に整理され、定量データまで提供されているかを見る。大和インターネットIR表彰は「サステナビリティ部門」を設け、トップページ／全体方針／環境／社会／ガバナンス／サポートの6大項目で採点している。詳細な評価軸は本サイトのサステナビリティ編を参照。",
      checkpoints: [
        "IRサイトからサステナビリティ情報へ明確な導線があるか",
        "マテリアリティ（重要課題）が企業価値との関係で説明されているか",
        "ESGデータが定量的に提供されているか",
        "統合報告書がIR側からも到達できるか",
      ],
      goodExamples: [
        {
          company: "ソフトバンク",
          url: "https://www.softbank.jp/corp/sustainability/",
          text: "マテリアリティを軸にサステナビリティ情報を体系化し、IR側からも到達できる構造にしている。",
          checkedOn: CHECKED,
          note: "大和インターネットIR表彰2025 最優秀賞／Gomez ESGサイトランキング2025 総合2位",
        },
      ],
      badExamples: [
        { text: "ESG情報が断片的で、企業価値との関係が示されていない。" },
        { text: "サステナビリティサイトとIRサイトが分断し、相互リンクがない。" },
      ],
      benchmark: {
        text: "IRトップから統合報告書への導線確保は389社中334社（85.9%）。統合報告書そのものの掲載は全上場企業では28.2%（日興2025）。",
        confirmed: true,
        source: "gomez-ir-2025-press",
      },
      sources: ["daiwa-ir-2025-pdf", "gomez-ir-2025-press", "nikko-ir-2025-pdf"],
      relatedTerms: ["materiality-ir", "integrated-report-ir"],
    },
    {
      id: "3-5",
      title: "規約・ポリシー",
      points: 4,
      judgeMethod: "url",
      criteria: "ディスクロージャーポリシー、免責事項、IRポリシーが整備されているか。",
      background:
        "FDルール（フェア・ディスクロージャー・ルール）への対応方針など、開示姿勢を示すポリシーの整備はガバナンスの成熟度を示す。沈黙期間（クワイエット・ピリオド）の明記は、投資家が問い合わせのタイミングを判断する助けにもなる。",
      checkpoints: [
        "ディスクロージャーポリシーを掲載しているか",
        "FDルールへの対応方針が書かれているか",
        "沈黙期間（クワイエット・ピリオド）を明示しているか",
        "将来見通しに関する免責事項があるか",
      ],
      goodExamples: [
        {
          text: "ディスクロージャーポリシーでFDルール対応と沈黙期間を明示し、IR問い合わせ窓口の対応範囲まで示している。",
        },
      ],
      badExamples: [
        { text: "免責事項のみで、開示方針そのものが示されていない。" },
        { text: "沈黙期間の記載がなく、決算前の問い合わせ可否が分からない。" },
      ],
      sources: ["gomez-ir", "cg-code"],
      relatedTerms: ["fd-rule", "disclosure-policy"],
    },
  ],
};

const C4: IrCategory = {
  id: "4",
  title: "積極性・先進性",
  short: "英文開示・個人投資家向け・適時性・AIフレンドリー（配点20）",
  description:
    "一歩進んだ開示姿勢を評価する。英語による情報発信と日英公平性、個人投資家向けコンテンツ、適時性・更新の速さ、重要資料のHTML化などAI・検索への対応まで。プライム市場では決算・適時開示の日英同時開示が求められるようになり、英文開示の重要度が一段上がっている。",
  points: 20,
  items: [
    {
      id: "4-1",
      title: "英語による情報発信",
      points: 6,
      judgeMethod: "url",
      criteria: "英文IRサイトがあり、日英の情報量・タイミングが公平か。",
      background:
        "プライム市場では決算・適時開示情報の日英同時開示が求められ、海外投資家にとって英文開示の充実と日英公平性は必須要件になった。大和インターネットIR表彰は日本語版と英語版を5:5で統合評価しており、英語版が薄いと総合評価そのものが下がる設計になっている。",
      checkpoints: [
        "英文IRサイトが存在し、日本語版と同じ構造で辿れるか",
        "決算・適時開示が日英同時に掲載されているか",
        "英語版の統合報告書・説明会資料があるか",
        "英語ページのリンク先が日本語PDFになっていないか",
      ],
      goodExamples: [
        {
          company: "伊藤忠商事",
          url: "https://www.itochu.co.jp/ja/ir/",
          text: "ヘッダーに English 切替を常設し、英語版でも同等のIR情報を提供している。",
          checkedOn: CHECKED,
          note: "大和インターネットIR表彰2025 最優秀賞（日英5:5の統合評価）",
        },
        {
          company: "ミネベアミツミ",
          url: "https://www.minebeamitsumi.com/corp/investors/",
          text: "大和インターネットIR表彰で8年連続の最優秀賞を受賞。日英双方の評価を経た上位常連にあたる。",
          checkedOn: CHECKED,
        },
      ],
      badExamples: [
        { text: "英語版がない、または情報量・更新が日本語版から大幅に劣る。" },
        { text: "英語ページの資料リンクが日本語PDFに飛ぶ。" },
      ],
      benchmark: {
        text: "2次評価対象企業では英語版アニュアルレポートの掲載が68.6%（前年比+5.4pt、日興2025）。",
        confirmed: true,
        source: "nikko-ir-2025-pdf",
      },
      sources: ["daiwa-ir", "nikko-ir-2025-pdf"],
      relatedTerms: ["prime-english"],
    },
    {
      id: "4-2",
      title: "個人投資家向け",
      points: 5,
      judgeMethod: "url-screen",
      criteria: "自己紹介型コンテンツ、用語集、FAQ、動画など個人投資家向けの工夫があるか。",
      background:
        "個人投資家向けには「何をしている会社か」を平易に伝える入口と、用語集・FAQ・動画が有効。機関投資家向けの加工可能データとは別導線で用意する企業が増えている。ゴメスは2位の日本ペイントHDについて、個人投資家向け専用セクションの設置を評価点に挙げている。",
      checkpoints: [
        "個人投資家向けの入口（「個人投資家の皆様へ」等）があるか",
        "事業を平易に説明する自己紹介型コンテンツがあるか",
        "IR用語集・FAQがあるか",
        "動画・スライドなど読む以外の手段があるか",
      ],
      goodExamples: [
        {
          company: "伊藤忠商事",
          url: "https://www.itochu.co.jp/ja/ir/investor/index.html",
          text: "「個人投資家の皆様へ」と「インベスターズガイド」を用意し、知識量に応じた入口を分けている。",
          checkedOn: CHECKED,
        },
        {
          company: "日本ペイントホールディングス",
          url: "https://www.nipponpaint-holdings.com/ir/",
          text: "個人投資家向けセクションで塗料市場・グループ概要・成長戦略を解説している。",
          checkedOn: CHECKED,
        },
      ],
      badExamples: [
        { text: "個人投資家向けの平易なコンテンツがなく、決算短信を読める人だけが対象になっている。" },
        { text: "「個人投資家の皆様へ」はあるが、中身が決算資料へのリンク集にすぎない。" },
      ],
      sources: ["gomez-ir-2025-press", "gomez-ir"],
      relatedTerms: [],
    },
    {
      id: "4-3",
      title: "適時性・更新",
      points: 5,
      judgeMethod: "url",
      criteria: "決算の即時反映、IRカレンダー、メール配信登録など適時性の仕組みがあるか。",
      background:
        "適時開示制度・FDルールの下、発表と同時のサイト反映が求められる。IRカレンダーやメール配信は、投資家が情報を取り逃さない仕組みとして機能する。更新が滞っているサイトは、それ自体がIRへの姿勢のシグナルとして読まれる。",
      checkpoints: [
        "適時開示と同時にサイトへ反映されているか（掲載日で確認）",
        "IRカレンダー（決算発表・株主総会の予定）があるか",
        "IRメール配信の登録ができるか",
        "RSSやフィードなど機械可読な更新通知があるか",
      ],
      goodExamples: [
        {
          company: "日本ペイントホールディングス",
          url: "https://www.nipponpaint-holdings.com/ir/",
          text: "IRサポートのセクションにIRカレンダーへの直接導線を置いている。",
          checkedOn: CHECKED,
        },
      ],
      badExamples: [
        { text: "適時開示から数日遅れてサイトに反映される。" },
        { text: "IRカレンダーが前年度のまま更新されていない。" },
      ],
      sources: ["gomez-ir", "nikko-ir"],
      relatedTerms: ["timely-disclosure"],
    },
    {
      id: "4-4",
      title: "AIフレンドリー／先進機能",
      points: 4,
      judgeMethod: "url-screen",
      criteria: "重要資料のHTML化、SNS、双方向など先進的な情報発信があるか。",
      background:
        "統合報告書や中期経営計画をPDFだけでなくHTML化すると、AIや検索での読み取り可能性が高まる。ゴメスは2025年の講評で、上位企業の共通項として「AI可読性を意識したHTML化」を明示的に挙げている。図を画像として貼るだけの資料は、人にもAIにも読めない。",
      checkpoints: [
        "統合報告書・中期経営計画のHTML版があるか",
        "図表が画像だけでなくテキスト／表として提供されているか",
        "構造化データ（schema.org）が実装されているか",
        "SNSや双方向の窓口（IR問い合わせ・アンケート）があるか",
      ],
      goodExamples: [
        {
          company: "伊藤忠商事",
          url: "https://www.itochu.co.jp/ja/ir/doc/annual_report/",
          text: "統合レポートをHTML形式でも掲載しており、ゴメスの2025年講評でも評価点として挙げられている。",
          checkedOn: CHECKED,
        },
      ],
      badExamples: [
        { text: "重要資料がPDFのみで、図表も画像貼付のためAI・検索に読まれない。" },
        { text: "HTML版はあるが、中身がPDFを画像として貼っただけになっている。" },
      ],
      sources: ["gomez-ir-2025-press"],
      relatedTerms: ["ai-friendly"],
    },
  ],
};

export const irCategories: IrCategory[] = [C1, C2, C3, C4];

export function getIrCategory(id: string): IrCategory | undefined {
  return irCategories.find((c) => c.id === (id as IrCategoryId));
}

export function irAllItems(): (IrCriteriaItem & {
  categoryId: IrCategoryId;
  categoryTitle: string;
})[] {
  return irCategories.flatMap((c) =>
    c.items.map((item) => ({ ...item, categoryId: c.id, categoryTitle: c.title }))
  );
}

export function getIrItem(
  id: string
): (IrCriteriaItem & { categoryId: IrCategoryId; categoryTitle: string }) | undefined {
  return irAllItems().find((it) => it.id === id);
}

// 全カテゴリの配点合計（30+25+25+20 = 100）。
export function irTotalPoints(): number {
  return irCategories.reduce((sum, c) => sum + c.points, 0);
}
