import type { Category, CategoryId, CriteriaItem } from "./types";

// A〜F 全カテゴリの評価基準。
// A/B/E はゴメス調査の配点・達成率に基づく（既存データを解説向けに拡張）。
// C/D/F は SSBJ・TCFD・GHGプロトコル等の一般的枠組みに基づくドラフト（draft: true）。
// draft/benchmarkConfirmed=false の数値は「要確認」として断定を避ける。

const A: Category = {
  id: "A",
  title: "サイトの使いやすさ・情報設計",
  short: "到達性・ナビ・検索・アクセシビリティなど、情報にたどり着ける設計",
  description:
    "どれほど充実した開示でも、探し出せなければ読まれない。トップからの到達性、ナビゲーションの構造化、サイト内検索、現在地表示、報告書への導線、アクセシビリティ、モバイル対応まで、ステークホルダーが情報に到達できる体験設計を評価する。",
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
        "サステナビリティ情報の入口が深い階層に埋没していると、投資家・求職者・取引先が到達する前に離脱する。トップ階層に置くこと自体が「経営が重視している」というメッセージにもなる。",
      checkpoints: [
        "ヘッダーの第一階層に「サステナビリティ」等の項目があるか",
        "フッターからも到達できるか（複数経路）",
        "トップからのクリック数（1クリックが理想）",
      ],
      goodExamples: ["ヘッダー第一階層に「サステナビリティ」があり1クリックで到達。"],
      badExamples: ["IR下層に埋没し、トップから3クリック以上かかる。"],
      benchmark: "1クリック=満点、2クリック=50%、3クリック以上/未検出=0を目安。",
      benchmarkConfirmed: true,
      sources: ["ゴメス サステナビリティサイト調査"],
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
        "サステナビリティ領域は環境・社会・ガバナンスと幅広く、階層も深い。全体像を一覧できるナビがあると、読み手は目的の情報へ迷わず到達でき、開示の網羅性も伝わる。",
      checkpoints: [
        "E/S/G またはマテリアリティ軸で整理されているか",
        "マウスオーバー等で下層まで一覧表示されるか",
        "大分類だけでなく詳細ページへ直接飛べるか",
      ],
      goodExamples: ["マウスオーバーで下層の詳細メニューが一覧表示される。"],
      badExamples: ["大分類のみで、下層に何があるか見えない。"],
      benchmark: "詳細情報のローカルメニュー一覧化は上位55.7%が採用。",
      benchmarkConfirmed: true,
      sources: ["ゴメス サステナビリティサイト調査"],
      relatedTerms: ["materiality"],
    },
    {
      id: "A3",
      title: "サイト内検索",
      points: 3,
      judgeType: "mechanical",
      criteria: "全ページ（英語・下層含む）で検索機能が常時表示されているか。",
      background:
        "目的の情報名（例：Scope3、人権方針）が分かっている読み手にとって、検索は最短の到達手段。下層で検索窓が消えると回遊性が大きく落ちる。",
      checkpoints: [
        "全階層に検索窓があるか",
        "英語ページでも検索できるか",
        "サイト内の該当ページを的確に返すか",
      ],
      goodExamples: ["全階層のヘッダーに検索窓が常設されている。"],
      badExamples: ["下層ページで検索窓が消える／そもそも検索機能がない。"],
      benchmark: "上位98.9%がサイト内検索を導入。",
      benchmarkConfirmed: true,
      sources: ["ゴメス サステナビリティサイト調査"],
      relatedTerms: [],
    },
    {
      id: "A4",
      title: "パンくず・現在地表示",
      points: 3,
      judgeType: "mechanical",
      criteria: "階層が深くても現在地（パンくず等）が分かるか。",
      background:
        "検索や外部リンクから深い階層に直接着地する読み手が多い。現在地とサイト構造が分かる導線がないと、関連情報へ回遊できず離脱する。",
      checkpoints: [
        "各下層ページにパンくずリストがあるか",
        "パンくずの各階層がリンクになっているか",
        "現在のカテゴリが視覚的に分かるか",
      ],
      goodExamples: ["各下層ページにパンくずリストがあり、上位階層へ戻れる。"],
      badExamples: ["現在地表示がなく、どこにいるか分からず迷子になる。"],
      sources: ["ゴメス サステナビリティサイト調査"],
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
        "Web開示は概要、詳細な定量データや戦略の全体像は統合報告書・ESGデータブックにあることが多い。両者を行き来できる導線が、開示の深さを担保する。",
      checkpoints: [
        "統合報告書への明確な導線があるか",
        "ESGデータ集（Excel/PDF）への導線があるか",
        "複数の経路（トップ／各テーマページ）から到達できるか",
      ],
      goodExamples: ["サステナトップから統合報告書とESGデータ集の両方へ複数導線がある。"],
      badExamples: ["統合報告書やデータ集がどこにあるか分からない。"],
      benchmark: "ESGトップから統合報告書への明確導線は上位65.9%。",
      benchmarkConfirmed: true,
      sources: ["ゴメス サステナビリティサイト調査"],
      relatedTerms: ["integrated-report", "esg-databook"],
    },
    {
      id: "A6",
      title: "アクセシビリティ",
      points: 5,
      judgeType: "llm",
      criteria:
        "WCAG2.x／JIS X 8341-3 AA配慮（コントラスト、代替テキスト、文字サイズ、キーボード操作、方針の明記）。",
      background:
        "アクセシビリティは、多様なステークホルダーに情報を届ける社会的責任そのもの。サステナビリティを掲げる企業サイトが利用者を選ぶ設計であること自体が矛盾となる。",
      checkpoints: [
        "アクセシビリティ方針が明記されているか",
        "画像に代替テキスト（alt）があるか",
        "文字サイズ変更・十分なコントラスト・キーボード操作に対応するか",
      ],
      goodExamples: ["アクセシビリティ方針を明記し、代替テキスト・文字サイズ変更に対応。"],
      badExamples: ["配慮の記載がなく、画像にaltもない。"],
      sources: ["WCAG 2.x", "JIS X 8341-3"],
      relatedTerms: ["wcag"],
    },
    {
      id: "A7",
      title: "モバイル・表示速度",
      points: 4,
      judgeType: "llm",
      criteria: "レスポンシブ対応、PDFの使いやすさ、表示速度。",
      background:
        "閲覧の多くがモバイル。崩れる・重い・PDFが読みにくいサイトは、内容以前に読まれない。表示速度はSEOと離脱率にも直結する。",
      checkpoints: [
        "スマートフォンで崩れずに表示されるか",
        "PDFがモバイルでも読みやすいか（またはHTML版があるか）",
        "初回表示が軽快か",
      ],
      goodExamples: ["スマホで崩れず、PDFも軽快に閲覧できる。"],
      badExamples: ["モバイル非対応で、ページが重い。"],
      sources: ["Core Web Vitals"],
      relatedTerms: [],
    },
  ],
};

const B: Category = {
  id: "B",
  title: "ESG共通・戦略性",
  short: "トップメッセージ・理念・マテリアリティ・目標実績など戦略の核",
  description:
    "サステナビリティが経営戦略に統合されているかを問う領域。トップの言葉、価値創造ストーリー、マテリアリティ特定プロセス、定量目標と実績、外部評価、日英開示の同等性まで、「本気度」と「戦略性」を評価する。",
  points: 25,
  items: [
    {
      id: "B1",
      title: "トップメッセージ",
      points: 4,
      judgeType: "llm",
      criteria: "経営トップがサステナビリティを自分の言葉で語っているか。",
      background:
        "トップメッセージは、サステナビリティが経営の優先課題かどうかを最も端的に示す。定型文か、自らの言葉で語っているかで本気度が伝わる。",
      checkpoints: [
        "社長／CEOのメッセージがあるか",
        "自社固有の課題・戦略に触れた自分の言葉か",
        "担当役員のメッセージも併載されているか",
      ],
      goodExamples: ["社長メッセージに加え、サステナビリティ担当役員のメッセージも掲載。"],
      badExamples: ["どの企業にも当てはまる定型文のみ／メッセージ自体が無い。"],
      sources: ["ゴメス サステナビリティサイト調査"],
      relatedTerms: [],
    },
    {
      id: "B2",
      title: "理念・ビジョン／価値創造ストーリー",
      points: 4,
      judgeType: "llm",
      criteria: "経営理念とサステナビリティの結びつき、価値創造モデルの図示。",
      background:
        "サステナビリティが理念・事業と接続され、どう価値を生むかが図示されていると、取り組みが「コスト」ではなく「戦略」として理解される。",
      checkpoints: [
        "経営理念とサステナビリティが結びついて語られているか",
        "価値創造プロセス（インプット→アウトカム）が図示されているか",
        "長期ビジョンと結びついているか",
      ],
      goodExamples: ["価値創造プロセスを図示し、経営理念と接続して説明している。"],
      badExamples: ["理念とサステナビリティが別々に語られ、分断している。"],
      sources: ["IIRC 国際統合報告フレームワーク"],
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
        "マテリアリティ（重要課題）は戦略の起点。特定プロセスの透明性、KPI、リスクと機会の整理があると、なぜその課題に取り組むのかが説得力を持つ。B領域で最も配点が高い。",
      checkpoints: [
        "重要課題の特定プロセスが説明されているか",
        "課題ごとにKPI・目標が設定されているか",
        "リスクと機会が整理され、事業・SDGsと紐づいているか",
      ],
      goodExamples: ["マテリアリティごとに目標・実績・SDGsとの紐づけを一覧化。"],
      badExamples: ["重要課題を列挙するだけで、特定プロセスもKPIもない。"],
      sources: ["GRIスタンダード", "SASB"],
      relatedTerms: ["materiality", "sdgs"],
    },
    {
      id: "B4",
      title: "目標・実績・進捗",
      points: 5,
      judgeType: "llm",
      criteria: "定量目標と経年実績、達成度が確認できるか。",
      background:
        "目標だけで実績がない開示は、進捗の検証ができず信頼されにくい。経年実績と達成率まで示すことで、PDCAが回っていることが伝わる。",
      checkpoints: [
        "定量的な目標値が設定されているか",
        "経年の実績データがあるか",
        "達成率・進捗が確認できるか",
      ],
      goodExamples: ["KPIごとに目標値と複数年の実績・達成率を掲載。"],
      badExamples: ["目標を掲げるだけで、実績データが載っていない。"],
      sources: ["ゴメス サステナビリティサイト調査"],
      relatedTerms: [],
    },
    {
      id: "B5",
      title: "外部評価・イニシアチブ",
      points: 3,
      judgeType: "hybrid",
      criteria: "CDP/DJSI/FTSE等の評価、加盟イニシアチブの掲載。",
      background:
        "第三者による外部評価や国際イニシアチブへの加盟は、取り組みの客観的な裏付けになる。投資家がスクリーニングの手がかりにする情報でもある。",
      checkpoints: [
        "主要な外部評価（CDP・DJSI・FTSE・MSCI等）を掲載しているか",
        "加盟イニシアチブ（国連グローバル・コンパクト等）を明示しているか",
        "評価の推移が分かるか",
      ],
      goodExamples: ["主要外部評価のスコアと加盟イニシアチブを一覧掲載。"],
      badExamples: ["外部評価・イニシアチブの記載が一切ない。"],
      sources: ["CDP", "DJSI", "FTSE", "MSCI"],
      relatedTerms: ["cdp", "djsi", "ftse", "msci"],
    },
    {
      id: "B6",
      title: "英語開示の同等性",
      points: 3,
      judgeType: "hybrid",
      criteria: "主要情報が日英同等か。",
      background:
        "海外投資家・グローバル人材にとって英語開示は必須。言語切替の有無だけでなく、日本語との「同等性」が問われる。英語ページが極端に薄いと機会損失になる。",
      checkpoints: [
        "言語切替（日英）が用意されているか",
        "主要情報が英語でも同等に開示されているか",
        "TCFD・スキルマトリックス等の重要開示が英語でも読めるか",
      ],
      goodExamples: ["日英で同等の開示（TCFD英語86.5%、スキルマトリックス英語70.3%が目安）。"],
      badExamples: ["英語ページが存在しない／極端に情報が薄い。"],
      benchmark: "言語切替の有無は機械判定、中身の同等性は目視で補助判定。",
      benchmarkConfirmed: true,
      sources: ["ゴメス サステナビリティサイト調査"],
      relatedTerms: ["tcfd", "skill-matrix"],
    },
  ],
};

const C: Category = {
  id: "C",
  title: "環境 E",
  short: "気候変動・GHG排出・TCFD・資源循環など環境開示",
  description:
    "気候変動を中心とした環境開示を評価する。GHG排出量（Scope1-3）の算定と開示、TCFD／SSBJに沿った気候関連情報、カーボンニュートラル目標と実績、水・生物多様性・資源循環まで、環境負荷への向き合い方を問う。",
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
        "気候変動は環境開示の中核。特にScope3（サプライチェーン排出）まで把握・開示しているかは、企業の climate リテラシーを測る指標になりつつある。",
      checkpoints: [
        "Scope1・2の排出量を開示しているか",
        "Scope3（カテゴリ別が理想）まで算定・開示しているか",
        "削減目標（SBT認定等）と経年実績があるか",
      ],
      goodExamples: [
        "Scope1-3を経年で開示し、SBT認定目標と削減実績を並べて示している。",
      ],
      badExamples: ["Scope1・2のみ、あるいは総量のみで内訳・目標がない。"],
      benchmark: "要確認（Scope3開示の普及率は業種差が大きい）。",
      sources: ["GHGプロトコル", "SBTi", "TCFD", "SSBJ基準"],
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
        "TCFDの4本柱に沿った開示は、気候リスクを経営課題として扱えているかを示す。日本ではSSBJ基準として制度化が進み、対応の巧拙が差になる。",
      checkpoints: [
        "ガバナンス・戦略・リスク管理・指標と目標の4要素を網羅するか",
        "シナリオ分析（1.5℃/2℃等）を実施・開示しているか",
        "SSBJ／ISSB基準への対応状況に触れているか",
      ],
      goodExamples: [
        "TCFD4要素をそろえ、複数シナリオでの財務影響分析まで開示。",
      ],
      badExamples: ["「TCFDに賛同」とあるが、具体的な4要素の開示がない。"],
      benchmark: "要確認（プライム市場では実質義務化が進行）。",
      sources: ["TCFD提言", "SSBJ基準", "ISSB（IFRS S2）"],
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
        "「2050年カーボンニュートラル」といった長期目標は宣言だけでは意味が薄い。中間目標と実績で進捗を検証できることが信頼につながる。",
      checkpoints: [
        "長期目標（年限・水準）が明確か",
        "中間目標（2030年等）があるか",
        "再エネ比率など具体施策と実績があるか",
      ],
      goodExamples: [
        "2050年ネットゼロと2030年中間目標を掲げ、再エネ比率の実績を経年掲載。",
      ],
      badExamples: ["「カーボンニュートラルを目指す」だけで年限も実績もない。"],
      benchmark: "要確認。",
      sources: ["GHGプロトコル", "SBTi"],
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
        "環境課題は気候だけではない。水リスク・生物多様性（TNFD）・サーキュラーエコノミーへの対応は、業種によっては気候以上に重要なマテリアリティになる。",
      checkpoints: [
        "廃棄物・リサイクル（資源循環）の目標と実績があるか",
        "水使用量・水リスクへの対応があるか",
        "生物多様性／TNFDへの言及があるか",
      ],
      goodExamples: [
        "水・廃棄物・生物多様性それぞれに目標を設定し、TNFD対応にも着手。",
      ],
      badExamples: ["気候変動以外の環境テーマにほとんど触れていない。"],
      benchmark: "要確認（TNFDは対応が始まったばかり）。",
      sources: ["TNFD", "サーキュラーエコノミー関連指針"],
      relatedTerms: ["tnfd", "circular-economy"],
    },
  ],
};

const D: Category = {
  id: "D",
  title: "社会 S",
  short: "人権・人的資本・DE&I・労働安全・サプライチェーン",
  description:
    "人と社会に関わる開示を評価する。人権デューデリジェンス、人的資本への投資、ダイバーシティ&インクルージョン、労働安全衛生・健康経営、サプライチェーンと地域社会まで、社会的責任への取り組みを問う。",
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
        "ビジネスと人権への要請は世界的に強まっている。方針の有無だけでなく、指導原則に沿ったデューデリジェンスの実施と是正の仕組みが問われる。",
      checkpoints: [
        "人権方針を策定・公開しているか（国連指導原則に準拠）",
        "人権デューデリジェンスの実施状況を開示しているか",
        "苦情処理・救済メカニズムがあるか",
      ],
      goodExamples: [
        "人権方針に基づき、負の影響の特定・評価・是正のプロセスを開示。",
      ],
      badExamples: ["人権方針の掲載のみで、デューデリジェンスの実施状況がない。"],
      benchmark: "要確認。",
      sources: ["国連ビジネスと人権に関する指導原則", "OECD多国籍企業行動指針"],
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
        "人的資本開示は制度化が進む領域。人材を「コスト」でなく「資本」と捉え、育成投資・エンゲージメント・定着の指標で語れるかが差になる。",
      checkpoints: [
        "人材育成の方針・投資額／時間を開示しているか",
        "従業員エンゲージメント指標があるか",
        "人的資本ROIなど独自指標に踏み込んでいるか",
      ],
      goodExamples: [
        "育成投資額・研修時間・エンゲージメントスコアを経年で開示。",
      ],
      badExamples: ["研修制度の紹介のみで、定量指標がない。"],
      benchmark: "要確認（有価証券報告書での開示義務化が進行）。",
      sources: ["ISO 30414", "人的資本可視化指針（内閣官房）"],
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
        "取締役会・管理職の多様性は投資家の関心事。数値目標と実績、そして「登用しやすい環境づくり」まで示せるかが評価を分ける。",
      checkpoints: [
        "女性管理職比率などの目標と実績があるか",
        "男女賃金格差を開示しているか",
        "包摂に向けた具体施策（両立支援等）があるか",
      ],
      goodExamples: [
        "女性管理職比率の目標・実績と男女賃金格差を開示し、両立支援策も紹介。",
      ],
      badExamples: ["「ダイバーシティを推進」の記述のみで数値がない。"],
      benchmark: "要確認。",
      sources: ["女性活躍推進法", "有価証券報告書 開示要請"],
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
        "安全と健康は事業継続の土台。労働災害の実績や健康経営銘柄等の外部認定は、従業員を大切にする姿勢の客観的な裏付けになる。",
      checkpoints: [
        "労働災害度数率など安全指標があるか",
        "健康経営の方針・施策があるか",
        "健康経営優良法人等の認定に触れているか",
      ],
      goodExamples: [
        "労災度数率を経年開示し、健康経営優良法人の認定も掲載。",
      ],
      badExamples: ["安全衛生・健康の取り組みへの言及がほとんどない。"],
      benchmark: "要確認。",
      sources: ["健康経営優良法人認定制度"],
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
        "社会的責任は自社だけでなくサプライチェーン全体に及ぶ。調達方針・サプライヤー監査、そして地域社会との関わりが、責任の広がりを示す。",
      checkpoints: [
        "CSR調達方針・サプライヤー行動規範があるか",
        "サプライヤー監査・エンゲージメントの実績があるか",
        "地域社会への貢献活動を開示しているか",
      ],
      goodExamples: [
        "CSR調達方針に基づくサプライヤー監査の実績と、地域貢献活動を掲載。",
      ],
      badExamples: ["調達方針の掲載のみで、監査や実績がない。"],
      benchmark: "要確認。",
      sources: ["OECD多国籍企業行動指針"],
      relatedTerms: ["supply-chain"],
    },
  ],
};

const E: Category = {
  id: "E",
  title: "ガバナンス G",
  short: "取締役会・スキルマトリックス・リスク管理・株主対話",
  description:
    "サステナビリティを支えるガバナンスを評価する。取締役会の構成とスキルマトリックス、リスク管理・コンプライアンス、各種ポリシー、株主・投資家との対話開示まで、実効性ある統治の可視化を問う。",
  points: 15,
  items: [
    {
      id: "E1",
      title: "コーポレート・ガバナンス体制",
      points: 5,
      judgeType: "hybrid",
      criteria: "取締役会構成、スキルマトリックスが開示されているか。",
      background:
        "取締役会に必要なスキルが揃っているかを一覧するスキルマトリックスは、ガバナンスの実効性を示す代表的な開示。英語での発信まで行っているかも投資家の関心事。",
      checkpoints: [
        "取締役会の構成（社外比率・多様性）が分かるか",
        "スキルマトリックスを図表で開示しているか",
        "英語でもスキルマトリックスを開示しているか",
      ],
      goodExamples: ["取締役会構成とスキルマトリックスを図表で開示し、英語版もある。"],
      badExamples: ["体制図のみで、スキルマトリックスがない。"],
      benchmark: "全取締役・監査役スキルマトリックスの英語発信は上位70.3%。",
      benchmarkConfirmed: true,
      sources: ["コーポレートガバナンス・コード", "ゴメス サステナビリティサイト調査"],
      relatedTerms: ["skill-matrix", "cg-code"],
    },
    {
      id: "E2",
      title: "リスク管理・コンプライアンス",
      points: 4,
      judgeType: "llm",
      criteria: "リスク管理体制とコンプライアンスの取り組み。",
      background:
        "リスクを識別・管理する体制と、コンプライアンスの仕組みは、持続可能性の前提。不祥事の未然防止に取り組む姿勢が、長期の信頼を支える。",
      checkpoints: [
        "全社的リスク管理（ERM）の体制があるか",
        "コンプライアンス方針・通報制度があるか",
        "重要リスクを特定・開示しているか",
      ],
      goodExamples: ["リスクマネジメント体制図と重要リスク、内部通報制度を明示。"],
      badExamples: ["リスク・コンプライアンスに関する記載が乏しい。"],
      sources: ["コーポレートガバナンス・コード"],
      relatedTerms: ["erm"],
    },
    {
      id: "E3",
      title: "各種ポリシー",
      points: 3,
      judgeType: "llm",
      criteria: "税務・情報セキュリティ等の各種ポリシー。",
      background:
        "税の透明性や情報セキュリティ等の個別ポリシーの整備は、ガバナンスの成熟度を示す。網羅性が投資家のチェックポイントになる。",
      checkpoints: [
        "税務方針を開示しているか",
        "情報セキュリティ／個人情報保護方針があるか",
        "反腐敗・贈収賄防止など主要ポリシーが揃っているか",
      ],
      goodExamples: ["税務方針・情報セキュリティ方針・反腐敗方針等を網羅的に掲載。"],
      badExamples: ["主要なポリシーが欠落している。"],
      sources: ["コーポレートガバナンス・コード"],
      relatedTerms: [],
    },
    {
      id: "E4",
      title: "株主・投資家との対話開示",
      points: 3,
      judgeType: "llm",
      criteria: "対話テーマ・関心事項・反映事項が具体的に掲載されているか。",
      background:
        "投資家との対話（エンゲージメント）の中身と、それを経営に反映した事実まで示すことで、建設的な対話が実際に機能していることが伝わる。",
      checkpoints: [
        "対話のテーマ・関心事項が具体的か",
        "対話を経営に反映した事例があるか",
        "対話の実施状況（回数・相手）が分かるか",
      ],
      goodExamples: ["対話テーマと、それを経営に反映した事項を具体的に掲載。"],
      badExamples: ["対話を実施したという有無の記述のみ。"],
      benchmark: "株主との対話状況の具体的掲載は上位50.8%（前年21.9%から倍増）。",
      benchmarkConfirmed: true,
      sources: ["スチュワードシップ・コード", "ゴメス サステナビリティサイト調査"],
      relatedTerms: [],
    },
  ],
};

const F: Category = {
  id: "F",
  title: "加点：独自性・伝達力",
  short: "ストーリーテリング・データ視覚化・双方向性など+α",
  description:
    "基礎的な開示を満たしたうえで、さらに読み手を惹きつける工夫を加点として評価する。自社ならではのストーリーテリング、データの視覚化、ステークホルダー別の導線や双方向性など、「伝える力」を問う。",
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
        "数字と方針だけの開示は記憶に残りにくい。現場の人・具体的な事例・自社固有の文脈で語ると、取り組みが「自分ごと」として伝わる。",
      checkpoints: [
        "現場事例・従業員の声など具体的なストーリーがあるか",
        "自社固有の文脈・らしさが出ているか",
        "テンプレート的でなく独自の切り口があるか",
      ],
      goodExamples: [
        "重要課題ごとに現場の取り組み事例を人の物語として掘り下げている。",
      ],
      badExamples: ["定型的な方針・数値の羅列にとどまる。"],
      benchmark: "要確認（加点項目・定性評価）。",
      sources: ["トライベック 体験フロー評価", "JSBI 独自性評価"],
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
        "同じデータでも、表の羅列か、経年グラフ・インフォグラフィックかで理解度は大きく変わる。視覚化は「伝える力」の中核。",
      checkpoints: [
        "主要KPIが経年グラフで示されているか",
        "価値創造プロセス等が図解されているか",
        "図表が読みやすく、モバイルでも崩れないか",
      ],
      goodExamples: [
        "主要指標を経年グラフ化し、価値創造やマテリアリティを図解している。",
      ],
      badExamples: ["数値がテキストや表で羅列されるだけで視覚化がない。"],
      benchmark: "要確認（加点項目・定性評価）。",
      sources: ["トライベック 体験フロー評価"],
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
        "サステナビリティ情報の読み手は多様。目的別の導線や、意見を受け付ける双方向の仕組みは、ステークホルダーを意識した設計であることを示す。",
      checkpoints: [
        "投資家向け／求職者向けなど目的別の入口があるか",
        "問い合わせ・フィードバック窓口があるか",
        "関連情報（IR・採用）へのクロス導線があるか",
      ],
      goodExamples: [
        "投資家・求職者向けの導線を分け、意見受付や関連ページへの回遊も用意。",
      ],
      badExamples: ["読み手を問わず一律の構成で、双方向の仕組みがない。"],
      benchmark: "要確認（加点項目・定性評価）。",
      sources: ["トライベック 体験フロー評価", "JSBI 独自性評価"],
      relatedTerms: [],
    },
  ],
};

export const categories: Category[] = [A, B, C, D, E, F];

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === (id as CategoryId));
}

export function allItems(): (CriteriaItem & { categoryId: CategoryId; categoryTitle: string })[] {
  return categories.flatMap((c) =>
    c.items.map((item) => ({ ...item, categoryId: c.id, categoryTitle: c.title }))
  );
}

export function getItem(
  id: string
): (CriteriaItem & { categoryId: CategoryId; categoryTitle: string }) | undefined {
  return allItems().find((it) => it.id === id.toUpperCase());
}

// 全カテゴリの配点合計（A30+B25+C15+D15+E15+F10 = 100）。
export function totalPoints(): number {
  return categories.reduce((sum, c) => sum + c.points, 0);
}
