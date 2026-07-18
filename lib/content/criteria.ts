import type { Category, CategoryId, CriteriaItem } from "./types";

// A〜F 全カテゴリの評価基準（サステナビリティ／ESG開示編）。
//
// 【実例の扱い】
//  - 良い例は、実際にそのページを開いて確認できた事実のみを、企業名・URL・確認日つきで載せる。
//    評価機関の講評が根拠のものは note に受賞歴を添える。
//  - 悪い例は「よくあるアンチパターン」として書き、企業名は出さない。
//    サイトは随時改修されるうえ、欠落の断定には手作業での確認が要るため、
//    名指しの否定的評価は載せない方針（良い例＝実名、悪い例＝匿名）。
//
// 【出典】sources / benchmark.source は lib/sources.ts のキー。
// 【配点】A30 + B25 + C15 + D15 + E15 + F10 = 100。
//  A/B/E はゴメスESGサイトランキングの実施率に基づく。C/D/F は SSBJ・TCFD・GHGプロトコル等の
//  一般的枠組みに基づくドラフト（draft: true）で、実施率は確認中（confirmed: false）。

const CHECKED = "2026-07-15";
// 事例の偏りを減らすために後から追加した分の確認日。
const CHECKED2 = "2026-07-18";

const A: Category = {
  id: "A",
  title: "サイトの使いやすさ・情報設計",
  short: "到達性・ナビ・検索・アクセシビリティなど、情報にたどり着ける設計",
  description:
    "どれほど充実した開示でも、探し出せなければ読まれない。トップからの到達性、ナビゲーションの構造化、サイト内検索、現在地表示、報告書への導線、アクセシビリティ、モバイル対応まで、ステークホルダーが情報に到達できる体験設計を評価する。ゴメスESGサイトランキングでも「ウェブサイトの使いやすさ」は独立した評価カテゴリとして置かれており、開示の中身と同じ土俵で問われる。",
  points: 30,
  items: [
    {
      id: "A1",
      title: "到達性",
      points: 5,
      judgeType: "hybrid",
      criteria:
        "コーポレートトップのグローバルナビ／フッターからサステナビリティに1クリックで到達できるか。",
      background:
        "サステナビリティ情報の入口が深い階層に埋没していると、投資家・求職者・取引先が到達する前に離脱する。トップ階層に置くこと自体が「経営が重視している」というメッセージにもなる。逆にIR配下やCSR配下の奥に押し込まれていると、サステナビリティを広報の一部としてしか扱っていない印象を与える。",
      checkpoints: [
        "ヘッダーの第一階層に「サステナビリティ」等の項目があるか",
        "フッターからも到達できるか（複数経路が用意されているか）",
        "コーポレートトップからのクリック数（1クリックが理想、3クリック以上は要改善）",
        "「サステナビリティ」「ESG」「CSR」など呼称が揺れていないか（社内用語で迷わせない）",
      ],
      goodExamples: [
        {
          company: "味の素",
          url: "https://www.ajinomoto.co.jp/company/jp/activity/",
          text: "コーポレートサイトの第一階層に独立した入口があり、そこからマテリアリティ・環境・社会・ESGデータ索引へ分岐する。",
          checkedOn: CHECKED,
          image: {
            src: "/screenshots/sites/ajinomoto-activity.jpg",
            caption:
              "味の素 サステナビリティのトップ。ESG情報インデックスへの導線が目立つ位置に置かれている。",
          },
        },
        {
          company: "ソフトバンク",
          url: "https://www.softbank.jp/corp/sustainability/",
          text: "企業情報の第一階層にサステナビリティを置き、マテリアリティ配下の各テーマへ直接たどれる。",
          checkedOn: CHECKED,
          note: "Gomez ESGサイトランキング2025 総合2位",
          image: {
            src: "/screenshots/sites/softbank-sustainability.jpg",
            caption:
              "ソフトバンク サステナビリティのトップ。外部評価や主要な取り組みをスライダーで見せている。",
          },
        },
        {
          company: "リコー",
          url: "https://jp.ricoh.com/sustainability/",
          text: "グローバルナビの第一階層に「サステナビリティ」と「株主・投資家情報」を並べ、トップページから1クリックで到達できる。パンくずも「ホーム > サステナビリティ」と表示される。",
          checkedOn: CHECKED2,
          image: {
            src: "/screenshots/sites/ricoh-sustainability.jpg",
            caption:
              "リコー サステナビリティのトップ。第一階層のナビに「サステナビリティ」があり、直下にパンくずが出る。",
          },
        },
      ],
      badExamples: [
        {
          text: "IR配下や「CSR活動」配下に埋没しており、コーポレートトップから3クリック以上かかる。",
        },
        {
          text: "トップのグローバルナビには無く、フッターの細字リンクからしか行けない。",
        },
      ],
      benchmark: {
        text: "1クリック＝満点、2クリック＝50%、3クリック以上／未検出＝0を目安とする。",
        confirmed: true,
        source: "gomez-esg",
      },
      sources: ["gomez-esg", "gomez-esg-2025-press"],
      relatedTerms: [],
    },
    {
      id: "A2",
      title: "グローバルナビ／ローカルメニュー",
      points: 5,
      judgeType: "llm",
      criteria:
        "ESG別またはマテリアリティ別に整理され、下層詳細までドロップダウン等で一覧化されているか。",
      background:
        "サステナビリティ領域は環境・社会・ガバナンスと幅広く、階層も深い。全体像を一覧できるナビがあると、読み手は目的の情報へ迷わず到達でき、開示の網羅性そのものも伝わる。大分類だけを見せるナビは「何が書いてあるか分からない」状態を生み、結局サイト内検索に頼らせることになる。",
      checkpoints: [
        "E/S/G またはマテリアリティ軸で整理されているか（自社の戦略の切り口と一致しているか）",
        "マウスオーバー等で下層まで一覧表示されるか",
        "大分類だけでなく詳細ページへ直接飛べるか",
        "サステナビリティ配下のどのページにいても同じローカルメニューが出るか",
      ],
      goodExamples: [
        {
          company: "味の素",
          url: "https://www.ajinomoto.co.jp/company/jp/sustainability/materiality.html",
          text: "マテリアリティを軸に、環境・社会の各テーマページとESG情報索引・GRI対照表へ分岐する構造になっている。",
          checkedOn: CHECKED,
          image: {
            src: "/screenshots/sites/ajinomoto-materiality.jpg",
            caption:
              "味の素 マテリアリティのページ。特定プロセス・リスクと機会・目標／KPIへのページ内リンクが冒頭に並ぶ。",
          },
        },
      ],
      badExamples: [
        {
          text: "「環境」「社会」「ガバナンス」の大分類のみで、下層に何があるかナビから見えない。",
        },
        {
          text: "下層に潜るとローカルメニューが消え、ブラウザの戻るでしか移動できない。",
        },
      ],
      benchmark: {
        text: "詳細情報までのローカルメニュー一覧化は、ノミネート185社中103社（55.7%）が採用。",
        confirmed: true,
        source: "gomez-esg-2025-press",
      },
      sources: ["gomez-esg", "gomez-esg-2025-press"],
      relatedTerms: ["materiality"],
    },
    {
      id: "A3",
      title: "サイト内検索",
      points: 3,
      judgeType: "mechanical",
      criteria: "全ページ（英語・下層含む）で検索機能が常時表示されているか。",
      background:
        "目的の情報名（例：Scope3、人権方針）が分かっている読み手にとって、検索は最短の到達手段。下層で検索窓が消えると回遊性が大きく落ちる。ほぼ全社が導入済みの項目なので、無い場合は明確な減点要因になる。",
      checkpoints: [
        "全階層のヘッダーに検索窓（またはアイコン）があるか",
        "英語ページでも検索できるか",
        "「Scope3」「人権方針」など具体的な語で該当ページが返るか",
        "PDF内の記載しかない情報が、検索でヒットしないままになっていないか",
      ],
      goodExamples: [
        {
          company: "伊藤忠商事",
          url: "https://www.itochu.co.jp/ja/ir/",
          text: "ヘッダーに検索機能と English 切替が常設され、下層ページでも同じヘッダーが維持される。",
          checkedOn: CHECKED,
          note: "Gomez IRサイトランキング2025 総合1位",
          image: {
            src: "/screenshots/sites/itochu-ir.jpg",
            caption:
              "伊藤忠商事 IRトップ。経営方針・決算情報・統合レポートなどの主要導線と株価情報が第一画面に収まっている。",
          },
        },
      ],
      badExamples: [
        { text: "トップにはあるが、下層ページのヘッダーで検索窓が消える。" },
        {
          text: "英語ページに検索機能がなく、海外読者が目的の開示にたどり着けない。",
        },
      ],
      benchmark: {
        text: "サイト内検索の導入は、ノミネート185社中183社（98.9%）。事実上の必須項目。",
        confirmed: true,
        source: "gomez-esg-2025-press",
      },
      sources: ["gomez-esg", "gomez-esg-2025-press"],
      relatedTerms: [],
    },
    {
      id: "A4",
      title: "パンくず・現在地表示",
      points: 3,
      judgeType: "mechanical",
      criteria: "階層が深くても現在地（パンくず等）が分かるか。",
      background:
        "検索や外部リンクから深い階層に直接着地する読み手が多い。現在地とサイト構造が分かる導線がないと、関連情報へ回遊できず離脱する。パンくずは構造化データ（BreadcrumbList）として検索結果にも反映されるため、SEO上の効果もある。",
      checkpoints: [
        "各下層ページにパンくずリストがあるか",
        "パンくずの各階層がリンクになっているか（テキストの飾りで終わっていないか）",
        "現在のカテゴリがローカルメニュー上でも強調されるか",
        "パンくずが構造化データとしてマークアップされているか",
      ],
      goodExamples: [
        {
          company: "KDDI",
          url: "https://www.kddi.com/corporate/sustainability/",
          text: "ページ上部に「KDDIホーム > 企業情報 > サステナビリティ」のパンくずを置き、上位2階層をリンクにしている。グローバルナビ側でも現在のカテゴリが強調される。",
          checkedOn: CHECKED2,
          image: {
            src: "/screenshots/sites/kddi-sustainability.jpg",
            caption:
              "KDDI サステナビリティ。パンくずで現在地を示し、グローバルナビの「サステナビリティ」に下線がついている。",
          },
        },
        {
          text: "「ホーム > サステナビリティ > 環境 > 気候変動」のように全階層がリンクになっており、外部から直接着地しても上位階層へ戻れる。",
        },
      ],
      badExamples: [
        {
          text: "現在地表示がなく、検索から着地した読み手が構造を把握できない。",
        },
        {
          text: "パンくずはあるが最終要素以外もリンクになっておらず、戻れない。",
        },
      ],
      sources: ["gomez-esg"],
      relatedTerms: [],
    },
    {
      id: "A5",
      title: "統合報告書・データ集への導線",
      points: 5,
      judgeType: "hybrid",
      criteria:
        "ESGトップから統合報告書／ESGデータ集へ明確な導線があるか（複数経路が理想）。",
      background:
        "Web開示は概要、詳細な定量データや戦略の全体像は統合報告書・ESGデータブックにあることが多い。両者を行き来できる導線が、開示の深さを担保する。Web側だけを見て「データがない」と判断されるのは、開示している側にとっても損失になる。",
      checkpoints: [
        "サステナビリティトップから統合報告書への明確な導線があるか",
        "ESGデータ集（Excel/PDF）への導線があるか",
        "複数の経路（トップ／各テーマページ／IRライブラリ）から到達できるか",
        "各テーマページから、対応する報告書の該当ページへ誘導しているか",
      ],
      goodExamples: [
        {
          company: "味の素",
          url: "https://www.ajinomoto.co.jp/company/jp/sustainability/index/",
          text: "ESG情報インデックスを設け、サステナビリティ各ページと統合報告書・サステナビリティレポート・データブックを相互に行き来できる。",
          checkedOn: CHECKED,
          image: {
            src: "/screenshots/sites/ajinomoto-sustainability.jpg",
            caption:
              "味の素 ESG情報インデックス。開示項目が表形式で一覧でき、各テーマの資料に直接飛べる。",
          },
        },
        {
          company: "伊藤忠商事",
          url: "https://www.itochu.co.jp/ja/ir/doc/annual_report/",
          text: "統合レポートを専用ボックスとしてIRトップに置き、最新版のダウンロード導線を第一画面付近に配置している。",
          checkedOn: CHECKED,
          note: "ゴメスは同社のHTML形式の統合レポート掲載を評価している",
          image: {
            src: "/screenshots/sites/itochu-annual-report.jpg",
            caption:
              "伊藤忠商事 統合レポート。最新号のCEO／COOメッセージがPDFの容量表示つきで置かれている。",
          },
        },
        {
          company: "積水ハウス",
          url: "https://www.sekisuihouse.co.jp/company/sustainable/",
          text: "「CEOメッセージ」「Value Report」「ESG Fact Book / Data Book」を横並びの3つの入口として示し、更新情報欄では公開日とPDFの容量（「ESG FACT BOOK 2026」9.3MB）まで併記している。",
          checkedOn: CHECKED2,
          image: {
            src: "/screenshots/sites/sekisuihouse-sustainability.jpg",
            caption:
              "積水ハウス ESG経営。報告書・データ集への3つの入口が並び、その下の更新情報に公開日とファイル容量が出る。",
          },
        },
      ],
      badExamples: [
        {
          text: "統合報告書がIRライブラリの奥にしかなく、サステナビリティ側から辿れない。",
        },
        {
          text: "ESGデータ集が過年度分しかなく、最新年度がどこにあるか分からない。",
        },
      ],
      benchmark: {
        text: "IRトップから統合報告書への導線確保は389社中334社（85.9%）。サステナ側からの導線も同水準が期待される。",
        confirmed: true,
        source: "gomez-ir-2025-press",
      },
      sources: ["gomez-esg", "gomez-ir-2025-press"],
      furtherReading: ["daiwa-ir-2025-pdf"],
      relatedTerms: ["integrated-report", "esg-databook"],
    },
    {
      id: "A6",
      title: "アクセシビリティ",
      points: 5,
      judgeType: "llm",
      criteria:
        "WCAG 2.2／JIS X 8341-3 のAA相当に配慮しているか（コントラスト、代替テキスト、キーボード操作、方針の明記）。",
      background:
        "アクセシビリティは、多様なステークホルダーに情報を届ける社会的責任そのもの。サステナビリティを掲げる企業のサイトが利用者を選ぶ設計であること自体が矛盾になる。方針を掲げている企業は半数以下にとどまり、差がつきやすい項目でもある。",
      checkpoints: [
        "アクセシビリティ方針（対応レベル・対象範囲）が明記されているか",
        "画像に意味のある代替テキスト（alt）があるか（装飾画像は空altか）",
        "文字と背景のコントラスト比が4.5:1以上か",
        "キーボードだけで主要な操作ができ、フォーカスが見えるか",
        "図表・グラフの内容がテキストでも読めるか（画像だけで完結していないか）",
      ],
      goodExamples: [
        {
          text: "アクセシビリティ方針でWCAG 2.2 レベルAA準拠と対象範囲を明示し、達成状況の試験結果まで公開している。",
        },
      ],
      badExamples: [
        {
          text: "方針の記載がなく、実績データのグラフが画像のみで代替テキストもない。",
        },
        {
          text: "コントラストの低い淡色テキストが多用され、拡大表示でレイアウトが崩れる。",
        },
      ],
      benchmark: {
        text: "アクセシビリティポリシーの掲載は185社中86社（46.5%）。半数以上が未掲載で、差別化しやすい。",
        confirmed: true,
        source: "gomez-esg-2025-press",
      },
      sources: ["wcag22", "wcag22-ja", "gomez-esg-2025-press"],
      furtherReading: ["lighthouse"],
      relatedTerms: ["wcag"],
    },
    {
      id: "A7",
      title: "モバイル・表示速度",
      points: 4,
      judgeType: "llm",
      criteria:
        "レスポンシブ対応、PDFの使いやすさ、表示速度（Core Web Vitals）。",
      background:
        "閲覧の多くがモバイル。崩れる・重い・PDFが読みにくいサイトは、内容以前に読まれない。表示速度はSEOと離脱率にも直結する。ゴメスIRランキングの2025年講評でも、上位企業の評価点としてページ表示速度とテクニカルSEOの品質が挙げられている。",
      checkpoints: [
        "スマートフォンで横スクロールが発生せず、崩れずに表示されるか",
        "PDFがモバイルでも読めるか（またはHTML版が用意されているか）",
        "PageSpeed Insights で LCP 2.5秒以内・INP 200ms以内・CLS 0.1以下か",
        "XMLサイトマップが整備され、エラーページ・重複URLが放置されていないか",
      ],
      goodExamples: [
        {
          company: "コニカミノルタ",
          url: "https://www.konicaminolta.com/jp-ja/investors/index.html",
          text: "XMLサイトマップの整合性と正常URL率を高水準に保ち、ページ表示速度も良好とゴメスの講評で評価された。",
          checkedOn: CHECKED,
          note: "Gomez IRサイトランキング2025 総合3位（8.60点）",
          image: {
            src: "/screenshots/sites/konicaminolta-investors.jpg",
            caption:
              "コニカミノルタ 株主・投資家情報。最新の決算短信・説明会資料が公表日つきで先頭に置かれている。",
          },
        },
      ],
      badExamples: [
        {
          text: "スマートフォンで表が画面幅を超え、横スクロールしないと読めない。",
        },
        { text: "主要な開示が重いPDFのみで、モバイルでは実質的に読めない。" },
      ],
      benchmark: {
        text: "XMLサイトマップの設置はIRサイトで389社中204社（52.4%）にとどまり、テクニカル面は伸びしろが大きい。",
        confirmed: true,
        source: "gomez-ir-2025-press",
      },
      sources: ["core-web-vitals", "gomez-ir-2025-press"],
      furtherReading: ["pagespeed", "lighthouse"],
      relatedTerms: [],
    },
  ],
};

const B: Category = {
  id: "B",
  title: "ESG共通・戦略性",
  short: "トップメッセージ・理念・マテリアリティ・目標実績など戦略の核",
  description:
    "サステナビリティが経営戦略に統合されているかを問う領域。トップの言葉、価値創造ストーリー、マテリアリティ特定プロセス、定量目標と実績、外部評価、日英開示の同等性まで、「本気度」と「戦略性」を評価する。経産省の価値協創ガイダンス2.0が示す価値創造ストーリー（価値観→長期戦略→ビジネスモデル→リスクと機会→実行戦略→成果とKPI→ガバナンス）の型が、そのままチェックの骨格になる。",
  points: 25,
  items: [
    {
      id: "B1",
      title: "トップメッセージ",
      points: 4,
      judgeType: "llm",
      criteria: "経営トップがサステナビリティを自分の言葉で語っているか。",
      background:
        "トップメッセージは、サステナビリティが経営の優先課題かどうかを最も端的に示す。定型文か、自社固有の課題に踏み込んだ自分の言葉かで本気度が伝わる。ゴメスIRランキングの2025年講評でも、1位の伊藤忠商事について「マネジメントによる力強いメッセージ発信」が評価点として明記されている。",
      checkpoints: [
        "社長／CEOのメッセージがあるか（署名・顔写真つきか）",
        "自社固有の課題・戦略に触れた言葉か、どの企業にも通じる一般論か",
        "サステナビリティ担当役員やCFOのメッセージも併載されているか",
        "メッセージが毎年更新されているか（日付・年度が入っているか）",
      ],
      goodExamples: [
        {
          company: "伊藤忠商事",
          url: "https://www.itochu.co.jp/ja/ir/",
          text: "IRトップから経営メッセージ・ステークホルダー対話専用セクションへ導線があり、CFOメッセージも含めて発信している。",
          checkedOn: CHECKED,
          note: "ゴメスは「豊富な情報量とマネジメントによる力強いメッセージ発信の両立」と講評",
          image: {
            src: "/screenshots/sites/itochu-ir.jpg",
            caption:
              "伊藤忠商事 IRトップ。経営方針・決算情報・統合レポートなどの主要導線と株価情報が第一画面に収まっている。",
          },
        },
      ],
      badExamples: [
        {
          text: "「持続可能な社会の実現に貢献してまいります」など、社名を差し替えても通る定型文のみ。",
        },
        { text: "数年前のメッセージが更新されないまま掲載されている。" },
      ],
      sources: ["gomez-esg", "gomez-ir-2025-press"],
      furtherReading: ["meti-value-creation"],
      relatedTerms: [],
    },
    {
      id: "B2",
      title: "理念・ビジョン／価値創造ストーリー",
      points: 4,
      judgeType: "llm",
      criteria: "経営理念とサステナビリティの結びつき、価値創造モデルの図示。",
      background:
        "サステナビリティが理念・事業と接続され、どう価値を生むかが図示されていると、取り組みが「コスト」ではなく「戦略」として理解される。経産省の価値協創ガイダンス2.0は、投資家との対話のためにこのストーリーを一貫して語ることを求めている。",
      checkpoints: [
        "経営理念・パーパスとサステナビリティが同じ文脈で語られているか",
        "価値創造プロセス（インプット→事業活動→アウトプット→アウトカム）が図示されているか",
        "長期ビジョン・中期経営計画と結びついているか",
        "図だけでなく、各要素の説明文が伴っているか",
      ],
      goodExamples: [
        {
          company: "味の素",
          url: "https://www.ajinomoto.co.jp/company/jp/sustainability/materiality.html",
          text: "ASV（Ajinomoto Group Creating Shared Value）という自社固有の枠組みで、理念・マテリアリティ・事業を一続きに説明している。",
          checkedOn: CHECKED,
          image: {
            src: "/screenshots/sites/ajinomoto-materiality.jpg",
            caption:
              "味の素 マテリアリティのページ。特定プロセス・リスクと機会・目標／KPIへのページ内リンクが冒頭に並ぶ。",
          },
        },
      ],
      badExamples: [
        {
          text: "理念ページとサステナビリティページが別々に存在し、相互に言及がない。",
        },
        {
          text: "価値創造プロセス図はあるが統合報告書のPDF内だけで、Web上では読めない。",
        },
      ],
      sources: ["meti-value-creation"],
      furtherReading: ["gomez-esg"],
      relatedTerms: ["value-creation", "integrated-report"],
    },
    {
      id: "B3",
      title: "マテリアリティ",
      points: 6,
      judgeType: "llm",
      criteria:
        "重要課題の特定プロセス・KPI・リスク／機会が明示され、事業と紐づいているか。",
      background:
        "マテリアリティ（重要課題）は戦略の起点。特定プロセスの透明性、KPI、リスクと機会の整理があると、なぜその課題に取り組むのかが説得力を持つ。B領域で最も配点が高い。大和IR表彰のサステナビリティ部門でも「全体方針」として重要課題の説明が独立した大項目に置かれている。",
      checkpoints: [
        "重要課題の特定プロセス（候補抽出→評価→経営承認）が説明されているか",
        "課題ごとにKPI・目標年限が設定されているか",
        "リスクと機会の両面が整理され、事業・SDGsと紐づいているか",
        "マテリアリティの見直し時期・頻度が示されているか",
        "ダブルマテリアリティ（財務影響／環境社会影響）の観点に触れているか",
      ],
      goodExamples: [
        {
          company: "味の素",
          url: "https://www.ajinomoto.co.jp/company/jp/sustainability/materiality.html",
          text: "マテリアリティを専用ページで説明し、そこから環境・社会の各取り組みページとESGデータへ展開している。",
          checkedOn: CHECKED,
          image: {
            src: "/screenshots/sites/ajinomoto-materiality.jpg",
            caption:
              "味の素 マテリアリティのページ。特定プロセス・リスクと機会・目標／KPIへのページ内リンクが冒頭に並ぶ。",
          },
        },
        {
          company: "ソフトバンク",
          url: "https://www.softbank.jp/corp/sustainability/materiality/",
          text: "マテリアリティを独立したセクションとして立て、各重要課題の下に個別の取り組みページをぶら下げる構造にしている。",
          checkedOn: CHECKED,
          image: {
            src: "/screenshots/sites/softbank-materiality.jpg",
            caption:
              "ソフトバンク マテリアリティ（重要課題）。トップメッセージからESG関連資料までの導線が一覧で並ぶ。",
          },
        },
      ],
      badExamples: [
        {
          text: "重要課題を6つ並べるだけで、なぜそれが重要かの特定プロセスもKPIもない。",
        },
        {
          text: "マテリアリティ・マトリクスの図はあるが、軸の定義も評価方法も書かれていない。",
        },
      ],
      sources: ["gri", "meti-value-creation"],
      furtherReading: ["daiwa-ir-2025-pdf", "issb"],
      relatedTerms: ["materiality", "sdgs"],
    },
    {
      id: "B4",
      title: "目標・実績・進捗",
      points: 5,
      judgeType: "llm",
      criteria: "定量目標と経年実績、達成度が確認できるか。",
      background:
        "目標だけで実績がない開示は、進捗の検証ができず信頼されにくい。経年実績と達成率まで示すことで、PDCAが回っていることが伝わる。未達の項目を隠さず理由とともに示す姿勢は、むしろ開示の信頼性を高める。",
      checkpoints: [
        "定量的な目標値と目標年限が設定されているか",
        "3〜5年程度の経年実績データがあるか",
        "達成率・進捗ステータス（達成／未達／進行中）が確認できるか",
        "未達の項目について理由と対応が述べられているか",
        "第三者保証（アシュアランス）の対象範囲が明示されているか",
      ],
      goodExamples: [
        {
          company: "味の素",
          url: "https://www.ajinomoto.co.jp/company/jp/sustainability/index/",
          text: "ESG情報の索引ページから各指標の実績データに到達でき、報告書側のデータブックと対応づけられている。",
          checkedOn: CHECKED,
          image: {
            src: "/screenshots/sites/ajinomoto-sustainability.jpg",
            caption:
              "味の素 ESG情報インデックス。開示項目が表形式で一覧でき、各テーマの資料に直接飛べる。",
          },
        },
      ],
      badExamples: [
        {
          text: "「2030年までに50%削減」と掲げるだけで、現在値も基準年も書かれていない。",
        },
        { text: "実績データが最新年度のみで、経年の推移が追えない。" },
      ],
      sources: ["gomez-esg", "gri"],
      relatedTerms: [],
    },
    {
      id: "B5",
      title: "外部評価・イニシアチブ",
      points: 3,
      judgeType: "hybrid",
      criteria: "CDP／DJSI／FTSE／MSCI等の評価、加盟イニシアチブの掲載。",
      background:
        "第三者による外部評価や国際イニシアチブへの加盟は、取り組みの客観的な裏付けになる。投資家がスクリーニングの手がかりにする情報でもあり、掲載していないと「評価が低いから隠しているのでは」と受け取られかねない。",
      checkpoints: [
        "主要な外部評価（CDP・DJSI・FTSE・MSCI等）のスコアを掲載しているか",
        "加盟イニシアチブ（国連グローバル・コンパクト、SBTi、TCFD等）を明示しているか",
        "評価の推移（経年）が分かるか",
        "評価を受けていない領域について、今後の方針に触れているか",
      ],
      goodExamples: [
        {
          company: "味の素",
          url: "https://www.ajinomoto.co.jp/company/jp/sustainability/esg/evaluation.html",
          text: "外部からの評価を専用ページにまとめ、国連グローバル・コンパクトや外部イニシアチブへの参加も別ページで開示している。",
          checkedOn: CHECKED,
          image: {
            src: "/screenshots/sites/ajinomoto-esg-evaluation.jpg",
            caption:
              "味の素 外部からの評価。SRIインデックスへの組み入れ状況が、基準日つきで並ぶ。",
          },
        },
      ],
      badExamples: [
        { text: "外部評価・イニシアチブへの言及が一切ない。" },
        { text: "ロゴだけを並べ、スコアや加盟の内容・年次が分からない。" },
      ],
      sources: ["cdp", "sbti"],
      furtherReading: ["gomez-esg"],
      relatedTerms: ["cdp", "djsi", "ftse", "msci"],
    },
    {
      id: "B6",
      title: "英語開示の同等性",
      points: 3,
      judgeType: "hybrid",
      criteria: "主要情報が日英で同等に開示されているか。",
      background:
        "海外投資家・グローバル人材にとって英語開示は必須。言語切替の有無だけでなく、日本語との「同等性」が問われる。大和インターネットIR表彰は、日本語版と英語版を5:5で統合評価するという方法自体で、日英の公平性を明示的に採点している。英語ページが極端に薄いと、海外からの評価機会そのものを失う。",
      checkpoints: [
        "言語切替（日英）がグローバルナビにあるか",
        "主要情報（マテリアリティ・TCFD・データ集）が英語でも同等に開示されているか",
        "英語ページが「会社概要だけ」になっていないか",
        "英語版の更新が日本語版から大きく遅れていないか",
      ],
      goodExamples: [
        {
          company: "伊藤忠商事",
          url: "https://www.itochu.co.jp/ja/ir/",
          text: "ヘッダーに English 切替を常設し、英語版でも同等のIR・サステナビリティ情報を提供している。",
          checkedOn: CHECKED,
          note: "大和インターネットIR表彰2025 最優秀賞（日英5:5の統合評価）",
          image: {
            src: "/screenshots/sites/itochu-ir.jpg",
            caption:
              "伊藤忠商事 IRトップ。経営方針・決算情報・統合レポートなどの主要導線と株価情報が第一画面に収まっている。",
          },
        },
      ],
      badExamples: [
        {
          text: "英語ページが存在しない、または会社概要のみで開示情報が読めない。",
        },
        { text: "英語版のリンク先が日本語PDFに飛ぶ。" },
      ],
      benchmark: {
        text: "TCFD情報の英語掲載は185社中160社（86.5%）。英語開示は「ある／ない」ではなく同等性で差がつく段階にある。",
        confirmed: true,
        source: "gomez-esg-2025-press",
      },
      sources: ["gomez-esg-2025-press", "daiwa-ir"],
      relatedTerms: ["tcfd", "skill-matrix"],
    },
  ],
};

const C: Category = {
  id: "C",
  title: "環境 E",
  short: "気候変動・GHG排出・TCFD・資源循環など環境開示",
  description:
    "気候変動を中心とした環境開示を評価する。GHG排出量（Scope1-3）の算定と開示、TCFD／SSBJに沿った気候関連情報、カーボンニュートラル目標と実績、水・生物多様性・資源循環まで、環境負荷への向き合い方を問う。SSBJ基準の適用が始まり、この領域は「任意開示」から「制度開示」へ移行しつつある。",
  points: 15,
  items: [
    {
      id: "C1",
      title: "気候変動・GHG排出（Scope1-3）",
      points: 5,
      judgeType: "llm",
      draft: true,
      criteria:
        "Scope1・2・3の温室効果ガス排出量が算定・開示され、削減目標と実績が示されているか。",
      background:
        "気候変動は環境開示の中核。特にScope3（サプライチェーン排出）まで把握・開示しているかは、企業の気候リテラシーを測る指標になりつつある。多くの業種でScope3が排出量全体の大半を占めるため、Scope1・2だけの開示では実像を示したことにならない。",
      checkpoints: [
        "Scope1・2の排出量を開示しているか（基準年と算定範囲つきで）",
        "Scope3までカテゴリ別に算定・開示しているか（15カテゴリのどれを算定したか）",
        "削減目標（SBT認定等）と経年実績を並べて示しているか",
        "第三者保証を受けている範囲が明示されているか",
        "算定方法・排出係数の出所が書かれているか",
      ],
      goodExamples: [
        {
          company: "味の素",
          url: "https://www.ajinomoto.co.jp/company/jp/sustainability/initiative/environment.html",
          text: "気候変動をTCFD提言に基づく開示として整理し、バリューチェーンにおける温室効果ガス排出削減を独立した項目として扱っている。",
          checkedOn: CHECKED,
          image: {
            src: "/screenshots/sites/ajinomoto-environment.jpg",
            caption:
              "味の素 環境の取り組みページ。テーマごとの見出しで構成されている。",
          },
        },
      ],
      badExamples: [
        {
          text: "Scope1・2のみを掲載し、Scope3は「算定中」のまま年度が更新されていない。",
        },
        {
          text: "総排出量だけを載せ、基準年・算定範囲・算定方法が書かれていない。",
        },
      ],
      benchmark: {
        text: "Scope3開示の普及率は業種差が大きい（確認中）。SSBJ基準の適用対象企業では開示が前提になる。",
        confirmed: false,
      },
      sources: ["ghg-protocol", "sbti", "issb", "ssbj"],
      furtherReading: ["cdp"],
      relatedTerms: ["ghg-protocol", "scope3", "sbt", "carbon-neutral"],
    },
    {
      id: "C2",
      title: "TCFD／気候関連情報開示",
      points: 4,
      judgeType: "llm",
      draft: true,
      criteria:
        "TCFD（ガバナンス・戦略・リスク管理・指標と目標）／SSBJ基準に沿った気候開示があるか。",
      background:
        "TCFDの4本柱に沿った開示は、気候リスクを経営課題として扱えているかを示す。TCFD自体は2023年にISSBへ移管されたが、4要素の枠組みはIFRS S2、そして日本のSSBJ基準へ引き継がれている。「賛同表明」だけで中身がない開示は、この段階では通用しない。",
      checkpoints: [
        "ガバナンス・戦略・リスク管理・指標と目標の4要素を網羅しているか",
        "シナリオ分析（1.5℃／4℃等）を実施し、財務影響まで示しているか",
        "移行リスクと物理リスクの双方に触れているか",
        "SSBJ／ISSB基準への対応状況・適用時期に触れているか",
        "気候関連の監督responsibility（どの会議体が見ているか）が明記されているか",
      ],
      goodExamples: [
        {
          company: "味の素",
          url: "https://www.ajinomoto.co.jp/company/jp/sustainability/initiative/environment.html",
          text: "「気候変動（TCFD提言に基づく情報開示）」として、4要素の枠組みに沿った独立セクションを設けている。",
          checkedOn: CHECKED,
          image: {
            src: "/screenshots/sites/ajinomoto-environment.jpg",
            caption:
              "味の素 環境の取り組みページ。テーマごとの見出しで構成されている。",
          },
        },
      ],
      badExamples: [
        {
          text: "「TCFDに賛同」のロゴと一文だけで、4要素の具体的な開示がない。",
        },
        {
          text: "シナリオ分析を実施したとあるが、前提シナリオも影響額も示されていない。",
        },
      ],
      benchmark: {
        text: "TCFD情報の英語掲載は185社中160社（86.5%）。日本語での開示はプライム市場でほぼ前提となっている。",
        confirmed: true,
        source: "gomez-esg-2025-press",
      },
      sources: ["tcfd", "ssbj", "issb"],
      furtherReading: ["fsa-disclosure"],
      relatedTerms: ["tcfd", "ssbj", "scenario-analysis"],
    },
    {
      id: "C3",
      title: "環境目標・実績（カーボンニュートラル等）",
      points: 3,
      judgeType: "llm",
      draft: true,
      criteria:
        "カーボンニュートラル／ネットゼロ等の長期目標と、中間目標・実績が示されているか。",
      background:
        "「2050年カーボンニュートラル」といった長期目標は宣言だけでは意味が薄い。中間目標と実績で進捗を検証できることが信頼につながる。SBTi認定は、その目標が科学的根拠に基づくかを第三者が担保する仕組みとして機能する。",
      checkpoints: [
        "長期目標（年限・水準・対象スコープ）が明確か",
        "2030年等の中間目標があるか",
        "SBTi認定を受けているか（認定水準：1.5℃/WB2℃）",
        "再エネ比率など具体施策の実績が経年で追えるか",
        "オフセット（クレジット）に依存する部分を明示しているか",
      ],
      goodExamples: [
        {
          company: "コニカミノルタ",
          url: "https://www.konicaminolta.jp/about/csr/index.html",
          text: "製品ライフサイクル全体のCO2排出をネットゼロにする「カーボンマイナス」という自社固有の概念を掲げ、達成年限とともに説明している。",
          checkedOn: CHECKED,
          image: {
            src: "/screenshots/sites/konicaminolta-csr.jpg",
            caption:
              "コニカミノルタ サステナビリティのトップ。方針・目標と実績・ESGデータへの導線が右側に置かれている。",
          },
        },
      ],
      badExamples: [
        {
          text: "「カーボンニュートラルを目指す」だけで、年限も対象スコープも実績もない。",
        },
        { text: "長期目標のみで中間目標がなく、現時点の進捗が検証できない。" },
      ],
      benchmark: {
        text: "確認中（業種により目標水準・達成度の分布が大きく異なる）。",
        confirmed: false,
      },
      sources: ["sbti", "ghg-protocol"],
      relatedTerms: ["carbon-neutral", "sbt"],
    },
    {
      id: "C4",
      title: "資源循環・水・生物多様性",
      points: 3,
      judgeType: "llm",
      draft: true,
      criteria:
        "気候以外の環境テーマ（廃棄物・水資源・生物多様性・TNFD等）に取り組み・開示があるか。",
      background:
        "環境課題は気候だけではない。水リスク・生物多様性（TNFD）・サーキュラーエコノミーへの対応は、業種によっては気候以上に重要なマテリアリティになる。食品・飲料・繊維など水と土地に依存する事業では、ここが薄いと開示全体の説得力が落ちる。",
      checkpoints: [
        "廃棄物・リサイクル（資源循環）の目標と実績があるか",
        "水使用量・取水地の水リスク（渇水地域での操業）への対応があるか",
        "生物多様性／TNFDへの言及と、依存・影響の分析があるか",
        "自社の事業特性に照らして重要なテーマが選ばれているか",
      ],
      goodExamples: [
        {
          text: "水・廃棄物・生物多様性それぞれに目標を設定し、TNFDのLEAPアプローチに沿った依存と影響の分析に着手していることを開示している。",
        },
      ],
      badExamples: [
        {
          text: "気候変動以外の環境テーマにほとんど触れず、環境＝CO2になっている。",
        },
        {
          text: "水使用量の総量だけを載せ、渇水リスク地域での操業有無に触れていない。",
        },
      ],
      benchmark: {
        text: "確認中（TNFDに沿った開示は始まったばかりで、普及率の一次データが乏しい）。",
        confirmed: false,
      },
      sources: ["gri", "issb"],
      relatedTerms: ["tnfd", "circular-economy"],
    },
  ],
};

const D: Category = {
  id: "D",
  title: "社会 S",
  short: "人権・人的資本・DE&I・労働安全・サプライチェーン",
  description:
    "人と社会に関わる開示を評価する。人権デューデリジェンス、人的資本への投資、ダイバーシティ&インクルージョン、労働安全衛生・健康経営、サプライチェーンと地域社会まで、社会的責任への取り組みを問う。人的資本については有価証券報告書での開示が求められるようになり、Webサイトと制度開示の整合も見られる。",
  points: 15,
  items: [
    {
      id: "D1",
      title: "人権尊重・デューデリジェンス",
      points: 4,
      judgeType: "llm",
      draft: true,
      criteria:
        "人権方針を定め、人権デューデリジェンス（特定・評価・是正）を実施・開示しているか。",
      background:
        "ビジネスと人権への要請は世界的に強まっている。方針の有無だけでなく、国連指導原則に沿ったデューデリジェンスの実施と、救済メカニズムの有無が問われる。方針を掲げるだけの開示は「掲げただけ」と評価される段階に入っている。",
      checkpoints: [
        "人権方針を策定・公開しているか（国連指導原則に準拠と明記しているか）",
        "人権デューデリジェンスの実施状況（対象範囲・頻度・特定されたリスク）を開示しているか",
        "苦情処理・救済メカニズム（通報窓口）があり、対象がサプライヤーにも及ぶか",
        "特定した人権リスクへの是正措置の実績があるか",
      ],
      goodExamples: [
        {
          company: "味の素",
          url: "https://www.ajinomoto.co.jp/company/jp/sustainability/initiative/social.html",
          text: "社会の取り組みページで「人権」を独立項目として立て、人財マネジメント・労働安全衛生と並べて開示している。",
          checkedOn: CHECKED,
          image: {
            src: "/screenshots/sites/ajinomoto-social.jpg",
            caption:
              "味の素 社会の取り組みページ。人権・人財・労働安全衛生などの項目がページ内リンクで一覧できる。",
          },
        },
      ],
      badExamples: [
        {
          text: "人権方針のPDFを1本置いただけで、デューデリジェンスの実施状況がない。",
        },
        {
          text: "通報窓口が従業員限定で、サプライチェーン上の労働者が使えない。",
        },
      ],
      benchmark: {
        text: "確認中（人権DDの実施率は一次データが乏しく、開示の粒度も企業差が大きい）。",
        confirmed: false,
      },
      sources: ["gri"],
      furtherReading: ["issb"],
      relatedTerms: ["human-rights-dd"],
    },
    {
      id: "D2",
      title: "人的資本・人材育成",
      points: 4,
      judgeType: "llm",
      draft: true,
      criteria:
        "人的資本への投資（育成・エンゲージメント）が方針・指標とともに開示されているか。",
      background:
        "人的資本開示は制度化が進む領域で、有価証券報告書でも記載が求められる。人材を「コスト」でなく「資本」と捉え、育成投資・エンゲージメント・定着の指標で語れるかが差になる。制度開示（有報）とWebサイトの数値が食い違っていないかも見られる。",
      checkpoints: [
        "人材育成の方針と、投資額／一人当たり研修時間を開示しているか",
        "従業員エンゲージメント指標（スコア・回答率）があるか",
        "離職率・定着率を開示しているか",
        "有価証券報告書の人的資本開示とWebサイトの数値が整合しているか",
      ],
      goodExamples: [
        {
          company: "味の素",
          url: "https://www.ajinomoto.co.jp/company/jp/sustainability/initiative/social.html",
          text: "「人財マネジメント」を社会テーマの柱に位置づけ、ESG情報索引から関連する実績データへたどれるようにしている。",
          checkedOn: CHECKED,
          image: {
            src: "/screenshots/sites/ajinomoto-social.jpg",
            caption:
              "味の素 社会の取り組みページ。人権・人財・労働安全衛生などの項目がページ内リンクで一覧できる。",
          },
        },
      ],
      badExamples: [
        {
          text: "研修制度の紹介文だけで、投資額・時間・エンゲージメントの定量指標がない。",
        },
        {
          text: "Webの数値と有価証券報告書の数値が異なり、どちらが最新か分からない。",
        },
      ],
      benchmark: {
        text: "確認中（有価証券報告書での開示義務化により、開示水準が急速に変化している）。",
        confirmed: false,
      },
      sources: ["fsa-disclosure"],
      furtherReading: ["gri"],
      relatedTerms: ["human-capital"],
    },
    {
      id: "D3",
      title: "ダイバーシティ&インクルージョン",
      points: 3,
      judgeType: "llm",
      draft: true,
      criteria:
        "多様性（女性・外国籍・障がい者等）の目標・実績と、包摂に向けた施策があるか。",
      background:
        "取締役会・管理職の多様性は投資家の関心事。女性管理職比率・男女賃金格差・男性育休取得率は法令で公表が求められる項目でもあり、数値と、それを可能にする環境づくりまで示せるかが評価を分ける。",
      checkpoints: [
        "女性管理職比率の目標と実績があるか（目標年限つきか）",
        "男女賃金格差を開示しているか（全労働者／正規／非正規の区分つきか）",
        "男性育休取得率を開示しているか",
        "数値だけでなく、登用・両立を可能にする施策が説明されているか",
      ],
      goodExamples: [
        {
          text: "女性管理職比率の目標・実績を経年で示し、男女賃金格差を区分別に開示したうえで、格差の要因分析と是正策まで書いている。",
        },
      ],
      badExamples: [
        { text: "「ダイバーシティを推進しています」の記述のみで数値がない。" },
        { text: "女性比率は載せるが、男女賃金格差には触れていない。" },
      ],
      benchmark: {
        text: "確認中（法定公表項目のため掲載率は高いが、Webサイト上での可視性には差がある）。",
        confirmed: false,
      },
      sources: ["fsa-disclosure"],
      relatedTerms: ["dei"],
    },
    {
      id: "D4",
      title: "労働安全衛生・健康経営",
      points: 2,
      judgeType: "llm",
      draft: true,
      criteria:
        "労働安全衛生の体制・実績、健康経営への取り組みが開示されているか。",
      background:
        "安全と健康は事業継続の土台。労働災害の実績や健康経営優良法人などの外部認定は、従業員を大切にする姿勢の客観的な裏付けになる。製造業・建設業では、この項目の薄さがそのまま事業リスクの印象につながる。",
      checkpoints: [
        "労働災害度数率・強度率など安全指標を経年で開示しているか",
        "対象範囲に協力会社・派遣社員が含まれるか",
        "健康経営の方針・施策があるか",
        "健康経営優良法人（ホワイト500等）の認定に触れているか",
      ],
      goodExamples: [
        {
          company: "味の素",
          url: "https://www.ajinomoto.co.jp/company/jp/sustainability/initiative/social.html",
          text: "労働安全衛生を社会テーマの独立項目として扱い、人権・人財マネジメントと並列に置いている。",
          checkedOn: CHECKED,
          image: {
            src: "/screenshots/sites/ajinomoto-social.jpg",
            caption:
              "味の素 社会の取り組みページ。人権・人財・労働安全衛生などの項目がページ内リンクで一覧できる。",
          },
        },
      ],
      badExamples: [
        {
          text: "安全衛生への言及がスローガンだけで、災害件数・度数率の実績がない。",
        },
        {
          text: "自社従業員の数値のみで、構内で働く協力会社の災害が範囲外になっている。",
        },
      ],
      benchmark: { text: "確認中。", confirmed: false },
      sources: ["gri"],
      relatedTerms: ["health-management"],
    },
    {
      id: "D5",
      title: "サプライチェーン・地域社会",
      points: 2,
      judgeType: "llm",
      draft: true,
      criteria:
        "サプライチェーンのCSR（調達方針・監査）と地域社会への貢献が開示されているか。",
      background:
        "社会的責任は自社だけでなくサプライチェーン全体に及ぶ。調達方針・サプライヤー行動規範を定めるところまでは多くの企業が到達しており、監査・エンゲージメントの実績まで示せるかで差がつく。",
      checkpoints: [
        "CSR調達方針・サプライヤー行動規範を公開しているか",
        "サプライヤー監査・自己評価アンケートの実施件数と結果があるか",
        "是正が必要だったケースへの対応実績があるか",
        "地域社会への貢献活動が、寄付額だけでなく成果とともに語られているか",
      ],
      goodExamples: [
        {
          text: "CSR調達方針に基づくサプライヤー監査の実施社数・指摘事項・是正完了率を開示し、一次サプライヤーを超えた範囲にも段階的に広げている。",
        },
      ],
      badExamples: [
        { text: "調達方針を掲載しているだけで、監査の実施状況や結果がない。" },
        {
          text: "地域貢献がイベント写真の紹介にとどまり、社会的成果が示されていない。",
        },
      ],
      benchmark: { text: "確認中。", confirmed: false },
      sources: ["gri"],
      relatedTerms: ["supply-chain"],
    },
  ],
};

const E: Category = {
  id: "E",
  title: "ガバナンス G",
  short: "取締役会・スキルマトリックス・リスク管理・株主対話",
  description:
    "サステナビリティを支えるガバナンスを評価する。取締役会の構成とスキルマトリックス、リスク管理・コンプライアンス、各種ポリシー、株主・投資家との対話開示まで、実効性ある統治の可視化を問う。コーポレートガバナンス・コードが求める開示項目と重なるため、コンプライ・オア・エクスプレインの説明の質もここに現れる。",
  points: 15,
  items: [
    {
      id: "E1",
      title: "コーポレート・ガバナンス体制",
      points: 5,
      judgeType: "hybrid",
      criteria: "取締役会構成、スキルマトリックスが開示されているか。",
      background:
        "取締役会に必要なスキルが揃っているかを一覧するスキルマトリックスは、ガバナンスの実効性を示す代表的な開示。コーポレートガバナンス・コードが開示を求めており、日本語だけでなく英語での発信まで行っているかが海外投資家の関心事になる。",
      checkpoints: [
        "取締役会の構成（人数・社外比率・女性比率・在任年数）が分かるか",
        "スキルマトリックスを図表で開示しているか",
        "各スキルを「なぜその人が持つと言えるか」の根拠（経歴）と結びつけているか",
        "英語でもスキルマトリックスを開示しているか",
        "取締役会の実効性評価の結果を開示しているか",
      ],
      goodExamples: [
        {
          company: "日本ペイントホールディングス",
          url: "https://www.nipponpaint-holdings.com/ir/",
          text: "「独立社外取締役への質問（一問一答）」を掲載し、社外取締役の視点を読める形にしている。体制図の掲載にとどまらない。",
          checkedOn: CHECKED,
          note: "Gomez IRサイトランキング2025 総合2位（8.66点）",
          image: {
            src: "/screenshots/sites/nipponpaint-ir.jpg",
            caption:
              "日本ペイントホールディングス IRトップ。IRイベントの予定と株価情報が第一画面に並ぶ。",
          },
        },
      ],
      badExamples: [
        { text: "組織体制図のみで、スキルマトリックスがない。" },
        {
          text: "スキルマトリックスが日本語のコーポレートガバナンス報告書PDFの中だけにあり、英語でも読めない。",
        },
      ],
      benchmark: {
        text: "全取締役・監査役のスキルマトリックスの英語発信は上位70.3%（ゴメスESG調査）。",
        confirmed: true,
        source: "gomez-esg",
      },
      sources: ["cg-code", "gomez-esg"],
      relatedTerms: ["skill-matrix", "cg-code"],
    },
    {
      id: "E2",
      title: "リスク管理・コンプライアンス",
      points: 4,
      judgeType: "llm",
      criteria:
        "リスク管理体制とコンプライアンスの取り組みが具体的に示されているか。",
      background:
        "リスクを識別・管理する体制と、コンプライアンスの仕組みは、持続可能性の前提。重要リスクを特定して開示することは、リスクを認識できている証拠であり、隠すよりも信頼を得る。サイバーセキュリティは近年とくに重視される。",
      checkpoints: [
        "全社的リスク管理（ERM）の体制・プロセスがあるか",
        "重要リスクを特定・列挙し、対応策と結びつけているか",
        "コンプライアンス方針・内部通報制度があり、通報件数を開示しているか",
        "サイバーセキュリティポリシーを掲載しているか",
      ],
      goodExamples: [
        {
          text: "リスクマネジメント体制図に加え、重要リスクを一覧化して各リスクの影響度・対応部門・対応策まで示し、内部通報の件数も開示している。",
        },
      ],
      badExamples: [
        {
          text: "「リスク管理を徹底しています」の一文のみで、体制も重要リスクも書かれていない。",
        },
        { text: "内部通報制度の存在は書くが、件数も是正実績も示していない。" },
      ],
      benchmark: {
        text: "サイバーセキュリティポリシーの掲載は185社中143社（77.3%）、Cookie同意の導入は109社（58.9%）。",
        confirmed: true,
        source: "gomez-esg-2025-press",
      },
      sources: ["cg-code", "gomez-esg-2025-press"],
      relatedTerms: ["erm"],
    },
    {
      id: "E3",
      title: "各種ポリシー",
      points: 3,
      judgeType: "llm",
      criteria:
        "税務・情報セキュリティ・反腐敗等の各種ポリシーが網羅されているか。",
      background:
        "税の透明性や情報セキュリティ等の個別ポリシーの整備は、ガバナンスの成熟度を示す。投資家・ESG評価機関は、ポリシーの有無をチェックリスト的に確認するため、網羅性そのものがスコアに効く。",
      checkpoints: [
        "税務方針（タックスポリシー）を開示しているか",
        "情報セキュリティ／個人情報保護方針があるか",
        "反腐敗・贈収賄防止方針があるか",
        "各ポリシーが最新の日付・改定履歴とともに示されているか",
        "ポリシーが日本語だけでなく英語でも読めるか",
      ],
      goodExamples: [
        {
          text: "税務・情報セキュリティ・反腐敗・政治献金など主要ポリシーを一覧ページにまとめ、それぞれ改定日と適用範囲（グループ会社を含むか）を明示している。",
        },
      ],
      badExamples: [
        { text: "税務方針や反腐敗方針など、主要ポリシーが欠落している。" },
        { text: "ポリシーはあるが改定日がなく、いつ時点のものか分からない。" },
      ],
      sources: ["cg-code"],
      relatedTerms: [],
    },
    {
      id: "E4",
      title: "株主・投資家との対話開示",
      points: 3,
      judgeType: "llm",
      criteria:
        "対話テーマ・関心事項・経営への反映事項が具体的に掲載されているか。",
      background:
        "投資家との対話（エンゲージメント）の中身と、それを経営に反映した事実まで示すことで、建設的な対話が実際に機能していることが伝わる。この項目は近年もっとも改善が進んだ領域のひとつで、掲載率が1年で倍増している。",
      checkpoints: [
        "対話のテーマ・投資家の関心事項が具体的に書かれているか",
        "対話を経営に反映した事例（何を変えたか）があるか",
        "対話の実施状況（回数・相手の属性・経営陣の関与）が分かるか",
        "ステークホルダー別（機関投資家／個人投資家）に整理されているか",
      ],
      goodExamples: [
        {
          company: "伊藤忠商事",
          url: "https://www.itochu.co.jp/ja/ir/",
          text: "ステークホルダーとの対話専用セクションを設けて運用している（ゴメスの2025年講評でも評価点として挙げられている）。",
          checkedOn: CHECKED,
          image: {
            src: "/screenshots/sites/itochu-ir.jpg",
            caption:
              "伊藤忠商事 IRトップ。経営方針・決算情報・統合レポートなどの主要導線と株価情報が第一画面に収まっている。",
          },
        },
      ],
      badExamples: [
        {
          text: "「株主・投資家との対話を実施しました」という有無の記述のみ。",
        },
        { text: "対話回数は載せるが、テーマも経営への反映も書かれていない。" },
      ],
      benchmark: {
        text: "株主との対話状況の具体的掲載は上位50.8%（前年21.9%から倍増）。",
        confirmed: true,
        source: "gomez-esg",
      },
      sources: ["cg-code", "gomez-esg"],
      furtherReading: ["gomez-ir-2025-press"],
      relatedTerms: [],
    },
  ],
};

const F: Category = {
  id: "F",
  title: "加点：独自性・伝達力",
  short: "ストーリーテリング・データ視覚化・双方向性など+α",
  description:
    "基礎的な開示を満たしたうえで、さらに読み手を惹きつける工夫を加点として評価する。自社ならではのストーリーテリング、データの視覚化、ステークホルダー別の導線や双方向性など、「伝える力」を問う。ゴメスの講評が上位企業について繰り返し指摘する「一般的なユーザビリティと自社らしさの組み合わせ」が、この領域の核心にあたる。",
  points: 10,
  items: [
    {
      id: "F1",
      title: "ストーリーテリング・独自コンテンツ",
      points: 4,
      judgeType: "llm",
      draft: true,
      criteria:
        "自社らしい物語や現場の事例で、取り組みを具体的・魅力的に伝えているか。",
      background:
        "数字と方針だけの開示は記憶に残りにくい。現場の人・具体的な事例・自社固有の文脈で語ると、取り組みが「自分ごと」として伝わる。ゴメスは2位の日本ペイントHDについて「一般的に求められるユーザビリティと自社らしさの適切な組み合わせ」を評価しており、独自性は基礎の上に積む加点として位置づけられている。",
      checkpoints: [
        "現場事例・従業員の声など具体的なストーリーがあるか",
        "自社固有の事業文脈（何をつくり、どこで社会と接するか）が出ているか",
        "テンプレート的でなく独自の切り口があるか",
        "ストーリーが定量データと結びついているか（感動話だけで終わっていないか）",
      ],
      goodExamples: [
        {
          company: "日本ペイントホールディングス",
          url: "https://www.nipponpaint-holdings.com/ir/",
          text: "個人投資家向けに塗料市場・成長戦略を噛み砕いた専用コンテンツを用意し、一般的なIR情報と自社らしい説明を組み合わせている。",
          checkedOn: CHECKED,
          image: {
            src: "/screenshots/sites/nipponpaint-ir.jpg",
            caption:
              "日本ペイントホールディングス IRトップ。IRイベントの予定と株価情報が第一画面に並ぶ。",
          },
        },
      ],
      badExamples: [
        {
          text: "方針と数値の羅列にとどまり、自社が何をしている会社なのか伝わらない。",
        },
        { text: "美談だけが並び、定量データや目標と結びついていない。" },
      ],
      benchmark: { text: "確認中（加点項目・定性評価）。", confirmed: false },
      sources: ["gomez-ir-2025-press", "tribeck"],
      relatedTerms: [],
    },
    {
      id: "F2",
      title: "データ視覚化・インフォグラフィック",
      points: 3,
      judgeType: "llm",
      draft: true,
      criteria:
        "実績データやプロセスが、図表・インフォグラフィックで直感的に理解できるか。",
      background:
        "同じデータでも、表の羅列か、経年グラフ・インフォグラフィックかで理解度は大きく変わる。視覚化は「伝える力」の中核である一方、画像だけで完結させるとアクセシビリティ（A6）を損なうため、テキストとの両立が要る。",
      checkpoints: [
        "主要KPIが経年グラフで示されているか",
        "価値創造プロセス・マテリアリティが図解されているか",
        "図表がモバイルでも読めるか（画像の拡大に頼っていないか）",
        "グラフの数値がテキストや表でも取得できるか（CSV/Excelの提供を含む）",
      ],
      goodExamples: [
        {
          text: "主要指標を経年グラフで示しつつ、同じ数値をESGデータブック（Excel）でも提供し、読む人と分析する人の双方に対応している。",
        },
      ],
      badExamples: [
        { text: "数値がテキストの羅列だけで、推移が直感的に掴めない。" },
        { text: "グラフが画像のみで、数値を書き起こせず代替テキストもない。" },
      ],
      benchmark: { text: "確認中（加点項目・定性評価）。", confirmed: false },
      sources: ["tribeck"],
      furtherReading: ["wcag22"],
      relatedTerms: [],
    },
    {
      id: "F3",
      title: "ステークホルダー別導線・双方向性",
      points: 3,
      judgeType: "llm",
      draft: true,
      criteria:
        "投資家・求職者・取引先など読み手別の導線や、問い合わせ・フィードバックの双方向性があるか。",
      background:
        "サステナビリティ情報の読み手は多様。目的別の導線や、意見を受け付ける双方向の仕組みは、ステークホルダーを意識した設計であることを示す。IR・採用・調達といった隣接領域へのクロス導線があるかも、サイト全体の設計思想を映す。",
      checkpoints: [
        "投資家向け／求職者向けなど目的別の入口があるか",
        "問い合わせ・フィードバック窓口があるか",
        "IR・採用・調達など関連ページへのクロス導線があるか",
        "ステークホルダー・エンゲージメントの実施状況を開示しているか",
      ],
      goodExamples: [
        {
          company: "伊藤忠商事",
          url: "https://www.itochu.co.jp/ja/ir/investor/index.html",
          text: "「個人投資家の皆様へ」とインベスターズガイドを分けて用意し、読み手の知識量に応じた入口を設けている。",
          checkedOn: CHECKED,
          image: {
            src: "/screenshots/sites/itochu-investor.jpg",
            caption:
              "伊藤忠商事 個人投資家向けページ。決算資料・統合レポート・経営計画・企業紹介映像が図版つきで並ぶ。",
          },
        },
      ],
      badExamples: [
        {
          text: "読み手を問わず一律の構成で、投資家も求職者も同じ長文を読まされる。",
        },
        {
          text: "問い合わせ先が総務部の代表フォームのみで、サステナビリティに関する窓口がない。",
        },
      ],
      benchmark: { text: "確認中（加点項目・定性評価）。", confirmed: false },
      sources: ["tribeck", "gomez-esg"],
      relatedTerms: [],
    },
  ],
};

export const categories: Category[] = [A, B, C, D, E, F];

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === (id as CategoryId));
}

export function allItems(): (CriteriaItem & {
  categoryId: CategoryId;
  categoryTitle: string;
})[] {
  return categories.flatMap((c) =>
    c.items.map((item) => ({
      ...item,
      categoryId: c.id,
      categoryTitle: c.title,
    })),
  );
}

export function getItem(
  id: string,
):
  | (CriteriaItem & { categoryId: CategoryId; categoryTitle: string })
  | undefined {
  return allItems().find((it) => it.id === id.toUpperCase());
}

// 全カテゴリの配点合計（A30+B25+C15+D15+E15+F10 = 100）。
export function totalPoints(): number {
  return categories.reduce((sum, c) => sum + c.points, 0);
}
