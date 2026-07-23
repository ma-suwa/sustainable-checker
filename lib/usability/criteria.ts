import type { UxCategory, UxCategoryId, UxCriteriaItem } from "./types";

// ユーザビリティ評価ルーブリック（7カテゴリ・19項目・計100点）。
// トライベック5軸（A.アクセス性／B.明快性／C.ナビゲーション／D.コンテンツ／E.ヘルプ・安全性）と
// ゴメス「使いやすさ30%」、ニールセン10原則・WCAG 2.2・Core Web Vitals を統合。
// ナビゲーション（カテゴリ2）を最重要とする。
//
// 【実例の扱い】
//  - 良い例は、実際にそのページを開いて確認できた事実、またはトライベックの公表順位のみを、
//    企業名・URL・確認日つきで載せる。
//  - 悪い例は「よくあるアンチパターン」として書き、企業名は出さない。
//
// 【出典】sources / benchmark.source は lib/sources.ts のキー。

const CHECKED = "2026-07-15";
// 事例の偏りを減らすために後から追加した分の確認日。
const CHECKED2 = "2026-07-18";
// v0.8：各項目の良い例を拡充した際に確認した分
//（トライベック Webユーザビリティランキング2026 上位企業のコーポレートトップを追加）。
const CHECKED3 = "2026-07-23";

const C1: UxCategory = {
  id: "1",
  title: "トップページの明快性・ファーストビュー",
  short: "何の会社か3秒で伝わるか、主要導線の一覧性、更新の鮮度（配点15）",
  description:
    "トップページはサイトの顔。訪問者が数秒で「何をする会社か」「目的の情報はどこか」を掴めるかを評価する。トライベックのB軸（サイト全体の明快性）に相当し、第一印象と離脱率を大きく左右する。",
  points: 15,
  items: [
    {
      id: "1-1",
      title: "事業内容が3秒で伝わるか",
      points: 5,
      judgeMethod: "screen",
      criteria:
        "キャッチコピー・メインビジュアルで、何をする会社かがひと目で伝わるか。",
      background:
        "訪問者はトップページを数秒で判断する。事業を端的に表すコピーと主要導線が一覧できると、離脱を防ぎ回遊につながる。抽象的なブランドメッセージだけを置くと、既に会社を知っている人にしか伝わらない。",
      checkpoints: [
        "ファーストビューのコピーで事業領域が推測できるか",
        "抽象的なブランドスローガンだけで終わっていないか",
        "主力サービス・製品の名前が第一画面に出ているか",
        "ロゴ以外に業種を示す手がかりがあるか",
      ],
      goodExamples: [
        {
          company: "J:COM",
          url: "https://www.jcom.co.jp/",
          text: "ブランドメッセージと並べて、ケーブルテレビ・インターネット・電話・格安スマホ・電気という提供サービスが第一画面に示されている。",
          checkedOn: CHECKED,
          note: "Webユーザビリティランキング2026 1位（3年連続）",
          image: {
            src: "/screenshots/sites/jcom-home.jpg",
            caption:
              "J:COM トップのファーストビュー。ブランドコピーの直下に主要サービスと「新規／利用中」の目的別導線が並ぶ（確認日 2026-07-15）。",
          },
        },
        {
          company: "大日本印刷",
          url: "https://www.dnp.co.jp/",
          text: "「未来のあたりまえをつくる。」のコピーの下に、事業紹介・技術／研究開発への導線を第一階層で見せている。",
          checkedOn: CHECKED,
          note: "Webユーザビリティランキング2026 2位",
          image: {
            src: "/screenshots/sites/dnp-home.jpg",
            caption:
              "大日本印刷 トップのファーストビュー。コピーの下にグローバルナビと目的別セクションが見える（確認日 2026-07-15）。",
          },
        },
      ],
      badExamples: [
        {
          text: "抽象的なイメージ映像とコーポレートスローガンだけで、何をする会社か分からない。",
        },
        {
          text: "業界内でしか通じない自社造語（◯◯ソリューション）だけが並んでいる。",
        },
      ],
      sources: ["tribeck", "tribeck-2026-press"],
      relatedTerms: ["above-the-fold"],
    },
    {
      id: "1-2",
      title: "主要導線の優先度・一覧性",
      points: 5,
      judgeMethod: "screen",
      criteria:
        "主要コンテンツへの導線が優先度付けされ、一覧性高く配置されているか。",
      background:
        "上位企業はトップページで主要コンテンツへの導線を優先度付けし一覧性を高める。巨大なスライダーだけでは導線が埋もれ、訪問者は「探す」作業から始めることになる。",
      checkpoints: [
        "事業・IR・採用・サステナビリティなど主要な入口が第一画面付近にあるか",
        "導線に優先順位がついているか（すべて同じ大きさで並べていないか）",
        "スライダーが主要導線を押し下げていないか",
        "訪問者の目的別（個人／法人／投資家／求職者）の入口があるか",
      ],
      goodExamples: [
        {
          company: "大日本印刷",
          url: "https://www.dnp.co.jp/",
          text: "グローバルナビに「DNPがめざす姿／会社案内／事業紹介／技術・研究開発／投資家情報／サステナビリティ／採用／ニュース」を並べ、主要な読み手の入口を第一階層で示している。",
          checkedOn: CHECKED,
          image: {
            src: "/screenshots/sites/dnp-home.jpg",
            caption:
              "大日本印刷 トップのファーストビュー。コピーの上にグローバルナビが置かれ、主要な読み手の入口が第一階層に見えている。",
          },
        },
        {
          company: "中外製薬",
          url: "https://www.chugai-pharm.co.jp/",
          text: "ヘッダー最上部に「患者さん・一般の皆さま」「医療関係者の皆さま」という読み手別の入口を分けて置き、グローバルナビ（中外製薬について／イノベーション／サステナビリティ／ストーリー／IR情報／ニュースルーム／採用情報）と役割を分担させている。",
          checkedOn: CHECKED3,
          note: "Webユーザビリティランキング2026 3位",
          image: {
            src: "/screenshots/sites/chugai-home.jpg",
            caption:
              "中外製薬 トップ。最上部に「患者さん・一般／医療関係者」の読み手別導線、その下にグローバルナビが並ぶ。",
          },
        },
        {
          company: "大同生命",
          url: "https://www.daido-life.co.jp/",
          text: "「ご契約者の方へ」「保険加入をお考えの方へ」「代理店・税理士の方へ」と、利用者の立場別に入口を分けたうえで、企業情報・採用などのナビを並べている。",
          checkedOn: CHECKED3,
          note: "Webユーザビリティランキング2026 4位",
          image: {
            src: "/screenshots/sites/daido-life-home.jpg",
            caption:
              "大同生命 トップ。ナビ先頭を「ご契約者／加入検討／代理店・税理士」の立場別導線にしている。",
          },
        },
        {
          company: "中部電力",
          url: "https://www.chuden.co.jp/",
          text: "ファーストビュー右側に「停電情報」「でんき予報」という利用者が今すぐ使いたい実用導線を目立たせ、最上部では送配電・電気ガス契約のグループ会社サイトへの入口も分けている。",
          checkedOn: CHECKED3,
          note: "Webユーザビリティランキング2026 8位",
          image: {
            src: "/screenshots/sites/chuden-home.jpg",
            caption:
              "中部電力 トップ。右側に「停電情報」「でんき予報」の実用導線、最上部にグループ会社別の入口が並ぶ。",
          },
        },
        {
          company: "松井証券",
          url: "https://www.matsui.co.jp/",
          text: "ナビ先頭に「はじめての方へ」を置いて初心者の入口を明確にし、その下に商品一覧・日本株・米国株・投資信託・NISA・iDeCoといった目的別のクイックリンクを一列で並べている。",
          checkedOn: CHECKED3,
          note: "Webユーザビリティランキング2026 5位",
          image: {
            src: "/screenshots/sites/matsui-home.jpg",
            caption:
              "松井証券 トップ。「はじめての方へ」と、商品別のクイックリンクで目的別に導線を整理している。",
          },
        },
      ],
      badExamples: [
        {
          text: "巨大な画像スライダーだけが第一画面を占め、導線が下に埋没している。",
        },
        {
          text: "同じ大きさのバナーが20個並び、どこから見ればよいか分からない。",
        },
      ],
      sources: ["tribeck", "nng-heuristics"],
      relatedTerms: ["above-the-fold", "ia"],
    },
    {
      id: "1-3",
      title: "更新情報の鮮度",
      points: 5,
      judgeMethod: "url-screen",
      criteria:
        "ニュース・プレスリリースが新しい日付で掲載され、運用されているか。",
      background:
        "更新が止まっているサイトは放置感を与え、信頼を損なう。最新情報が新しい日付で並ぶことが、サイトが運用されている証になる。日付のないお知らせは、新しいのか古いのか読み手に判断させられない。",
      checkpoints: [
        "トップのニュースが直近1〜2週間以内の日付か",
        "各ニュースに日付が表示されているか",
        "「新着情報」が数年前で止まっていないか",
        "更新のないコンテンツ（キャンペーン等）が残っていないか",
      ],
      goodExamples: [
        {
          company: "J:COM",
          url: "https://www.jcom.co.jp/",
          text: "確認時点で当日〜前日付（2026年7月14日）のお知らせが掲載されており、日常的に更新されている。",
          checkedOn: CHECKED,
          image: {
            src: "/screenshots/sites/jcom-home.jpg",
            caption:
              "J:COM トップのファーストビュー。ブランドコピーの下に「新規ご加入の方／ご利用中の方」の目的別導線が並ぶ。",
          },
        },
        {
          company: "大日本印刷",
          url: "https://www.dnp.co.jp/",
          text: "確認時点で前々日付（2026年7月13日）のニュースが最新として並んでいる。",
          checkedOn: CHECKED,
          image: {
            src: "/screenshots/sites/dnp-home.jpg",
            caption:
              "大日本印刷 トップのファーストビュー。コピーの上にグローバルナビが置かれ、主要な読み手の入口が第一階層に見えている。",
          },
        },
        {
          company: "大同生命",
          url: "https://www.daido-life.co.jp/",
          text: "ファーストビュー下部に「重要なお知らせ」帯を固定し、確認時点で当日〜数日内（2026年7月13日「災害救助法適用地域の特別お取扱い」）のお知らせを日付つきで掲出している。",
          checkedOn: CHECKED3,
          note: "Webユーザビリティランキング2026 4位",
          image: {
            src: "/screenshots/sites/daido-life-home.jpg",
            caption:
              "大同生命 トップ。最下部の「重要なお知らせ」に日付つきの最新情報が並ぶ。",
          },
        },
        {
          company: "清水建設",
          url: "https://www.shimz.co.jp/",
          text: "トップ下部の新着情報を「新着情報／ニュースリリース／IRニュース／サステナビリティニュース」のタブで種別分けし、読み手が関心の高い更新だけを追えるようにしている。",
          checkedOn: CHECKED3,
          note: "Webユーザビリティランキング2026 6位",
          image: {
            src: "/screenshots/sites/shimizu-home.jpg",
            caption:
              "清水建設 トップ。新着情報を種別タブで分け、更新を追いやすくしている。",
          },
        },
      ],
      badExamples: [
        { text: "最新情報が1年以上前で、サイトが放置されている印象を与える。" },
        { text: "お知らせに日付がなく、いつの情報か分からない。" },
      ],
      sources: ["tribeck"],
      relatedTerms: [],
    },
  ],
};

const C2: UxCategory = {
  id: "2",
  title: "ナビゲーション設計",
  short: "グローバルナビ・ラベル明快性・階層一貫・パンくず（配点25・最重要）",
  description:
    "5軸の中でユーザビリティへの影響が最も大きい領域（トライベックC軸）。全ページ共通のグローバルナビ、明快なラベル、階層の一貫性、パンくずによる現在地明示で、迷わず目的情報に到達できるかを評価する。本ルーブリックで最も配点が重い。",
  points: 25,
  items: [
    {
      id: "2-1",
      title: "グローバルナビの共通性・項目数",
      points: 8,
      judgeMethod: "url-screen",
      criteria:
        "グローバルナビが全ページ共通・固定位置で、5〜7項目に整理されているか。",
      background:
        "人間の短期記憶の限界（7±2）を踏まえ、主要メニューは5〜7項目に絞るのが定石。全ページで位置・デザインを固定すると学習コストが下がり、どのページからでも同じ操作で移動できる。項目が10を超えると、選ぶ前に読む負担が発生する。",
      checkpoints: [
        "グローバルナビの項目数が5〜7に収まっているか（多くても9まで）",
        "全ページで同じ位置・同じ構成か",
        "下層ページでもグローバルナビが維持されるか",
        "現在いるセクションがナビ上で強調されるか",
      ],
      goodExamples: [
        {
          company: "J:COM",
          url: "https://www.jcom.co.jp/",
          text: "グローバルナビが「サービス／料金一覧／キャンペーン・特典／お申し込み・各種変更／サポート／企業サイト」の6項目に整理され、5〜7項目の定石に収まっている。",
          checkedOn: CHECKED,
          note: "Webユーザビリティランキング2026 1位",
          image: {
            src: "/screenshots/sites/jcom-home.jpg",
            caption:
              "J:COM のグローバルナビは6項目。左からアイコン付きで並び、項目数が短期記憶の範囲に収まっている（確認日 2026-07-15）。",
          },
        },
        {
          company: "清水建設",
          url: "https://www.shimz.co.jp/",
          text: "グローバルナビが「企業情報／株主・投資家情報／サステナビリティ／施工実績／技術・ソリューション／採用情報」の6項目に整理され、5〜7の定石に収まっている。",
          checkedOn: CHECKED3,
          note: "Webユーザビリティランキング2026 6位",
          image: {
            src: "/screenshots/sites/shimizu-home.jpg",
            caption:
              "清水建設 のグローバルナビは6項目。主要な読み手の入口が過不足なく並ぶ（確認日 2026-07-23）。",
          },
        },
        {
          company: "中部電力",
          url: "https://www.chuden.co.jp/",
          text: "持株会社サイトのグローバルナビを「エネルギー・原子力／CSR・サステナビリティ／新成長分野・技術研究開発／キッズ・展示館／企業情報／IR・投資家向け情報」の6項目に整理している。",
          checkedOn: CHECKED3,
          note: "Webユーザビリティランキング2026 8位",
          image: {
            src: "/screenshots/sites/chuden-home.jpg",
            caption:
              "中部電力 のグローバルナビは6項目。持株会社サイトの主要導線が横一列に並ぶ（確認日 2026-07-23）。",
          },
        },
        {
          company: "中外製薬",
          url: "https://www.chugai-pharm.co.jp/",
          text: "グローバルナビを「中外製薬について／イノベーション／サステナビリティ／ストーリー／IR情報／ニュースルーム／採用情報」の7項目に収め、全ページ共通の固定位置で維持している。",
          checkedOn: CHECKED3,
          note: "Webユーザビリティランキング2026 3位",
          image: {
            src: "/screenshots/sites/chugai-home.jpg",
            caption:
              "中外製薬 のグローバルナビは7項目。ロゴ直下の固定位置に並ぶ（確認日 2026-07-23）。",
          },
        },
        {
          company: "日本製鉄",
          url: "https://www.nipponsteel.com/",
          text: "グローバルナビを「企業／製品／技術開発／カーボンニュートラル／サステナビリティ／株主・投資家（IR）／採用」の7項目にまとめ、短く読み取れる語で並べている。",
          checkedOn: CHECKED3,
          note: "Webユーザビリティランキング2026 10位",
          image: {
            src: "/screenshots/sites/nipponsteel-home.jpg",
            caption:
              "日本製鉄 のグローバルナビは7項目。短い語で横一列に並ぶ（確認日 2026-07-23）。",
          },
        },
      ],
      badExamples: [
        { text: "グローバルナビが10項目以上あり、選択に迷う。" },
        {
          text: "ページごとにメニュー構成が変わり、どこから来たか分からなくなる。",
        },
      ],
      sources: ["tribeck", "nng-heuristics"],
      relatedTerms: ["global-nav", "millers-law"],
    },
    {
      id: "2-2",
      title: "ラベルの明快性",
      points: 6,
      judgeMethod: "screen",
      criteria:
        "ラベルが明快で、専門用語・抽象語・自社造語を避け内容が一目で分かるか。",
      background:
        "ニールセンの第2原則「システムと実世界の一致」。利用者の言葉でラベル付けすることで、クリック前に行き先が分かる。社内の組織名や造語をそのままラベルにすると、訪問者は中身を推測できずクリックを試行錯誤することになる。",
      checkpoints: [
        "ラベルが利用者の言葉（会社情報・製品・採用）になっているか",
        "自社造語・社内組織名がラベルになっていないか",
        "「ソリューション」「サービス」など中身の推測できない抽象語に頼っていないか",
        "同じ意味のものが複数のラベルで呼ばれていないか",
      ],
      goodExamples: [
        {
          company: "大日本印刷",
          url: "https://www.dnp.co.jp/",
          text: "「会社案内」「事業紹介」「投資家情報」「採用」など、行き先が推測できるラベルで統一されている。",
          checkedOn: CHECKED,
          image: {
            src: "/screenshots/sites/dnp-home.jpg",
            caption:
              "大日本印刷 のグローバルナビ。「会社案内」「事業紹介」「投資家情報」「採用」など、クリック前に行き先が分かる言葉でラベル付けされている（確認日 2026-07-15）。",
          },
        },
        {
          company: "清水建設",
          url: "https://www.shimz.co.jp/",
          text: "「企業情報」「株主・投資家情報」「施工実績」「技術・ソリューション」「採用情報」と、業種（建設）を知らなくても行き先が推測できる言葉で統一している。",
          checkedOn: CHECKED3,
          note: "Webユーザビリティランキング2026 6位",
          image: {
            src: "/screenshots/sites/shimizu-home.jpg",
            caption:
              "清水建設 のグローバルナビ。「施工実績」など事業内容が伝わる素直なラベルで並ぶ（確認日 2026-07-23）。",
          },
        },
        {
          company: "日本製鉄",
          url: "https://www.nipponsteel.com/",
          text: "「企業」「製品」「技術開発」「株主・投資家（IR）」「採用」と、抽象的な自社造語を避け、利用者の言葉でラベル付けしている。",
          checkedOn: CHECKED3,
          note: "Webユーザビリティランキング2026 10位",
          image: {
            src: "/screenshots/sites/nipponsteel-home.jpg",
            caption:
              "日本製鉄 のグローバルナビ。「企業」「製品」「技術開発」など短く明快なラベル（確認日 2026-07-23）。",
          },
        },
        {
          company: "中外製薬",
          url: "https://www.chugai-pharm.co.jp/",
          text: "「中外製薬について」「IR情報」「ニュースルーム」「採用情報」と、社内組織名でなく読み手の言葉でラベルを付けている。",
          checkedOn: CHECKED3,
          note: "Webユーザビリティランキング2026 3位",
          image: {
            src: "/screenshots/sites/chugai-home.jpg",
            caption:
              "中外製薬 のグローバルナビ。行き先が推測できる素直なラベルで統一されている（確認日 2026-07-23）。",
          },
        },
      ],
      badExamples: [
        {
          text: "「ソリューション」「バリュー」など抽象的な自社造語だけで中身が読めない。",
        },
        {
          text: "同じ情報が「企業情報」と「コーポレート」の両方にあり、どちらが何か分からない。",
        },
      ],
      sources: ["nng-heuristics", "tribeck"],
      relatedTerms: ["nielsen-heuristics"],
    },
    {
      id: "2-3",
      title: "階層の一貫性・リンクの統一",
      points: 6,
      judgeMethod: "screen",
      criteria:
        "メガメニュー／ローカルナビ／フッターナビの階層が一貫し、リンク・ホバー効果が統一されているか。",
      background:
        "ニールセンの第4原則「一貫性と標準」。ナビやリンクの見た目・挙動が揃っていると、操作の予測がつき迷いが減る。逆に、部署ごとに作られたページが混在するサイトでは、同じ見た目の要素が違う挙動をして利用者を混乱させる。",
      checkpoints: [
        "メガメニューとフッターの分類が一致しているか",
        "リンクの見た目（色・下線・ホバー効果）が全ページで統一されているか",
        "同じ階層のページが同じテンプレートで作られているか",
        "外部リンク・PDFリンクがアイコン等で区別されているか",
      ],
      goodExamples: [
        {
          text: "メガメニューの分類とフッターナビの分類が一致し、リンクの色・下線・ホバー時の挙動がサイト全体で統一されている。",
        },
      ],
      badExamples: [
        {
          text: "ページごとにリンクの見た目が異なり、クリックできる要素かどうか判別できない。",
        },
        {
          text: "PDFリンクと通常リンクが同じ見た目で、クリックして初めてPDFだと気づく。",
        },
      ],
      sources: ["nng-heuristics", "tribeck"],
      relatedTerms: ["mega-menu", "nielsen-heuristics"],
    },
    {
      id: "2-4",
      title: "パンくず・到達クリック数",
      points: 5,
      judgeMethod: "url-screen",
      criteria:
        "パンくずリストで現在地を明示し、目的情報に3クリック以内で到達できるか。",
      background:
        "パンくずはニールセンの第1原則「システム状態の可視性」の代表例。検索エンジンから深い階層に直接着地する利用者が多いため、現在地とサイト構造を示す導線がないと、そのページだけ読んで離脱する。",
      checkpoints: [
        "下層ページにパンくずリストがあるか",
        "パンくずの各階層がリンクになっているか",
        "主要情報へトップから3クリック以内で到達できるか",
        "パンくずが構造化データ（BreadcrumbList）としてマークアップされているか",
      ],
      goodExamples: [
        {
          company: "清水建設",
          url: "https://www.shimz.co.jp/company/",
          text: "下層の企業情報ページで「ホーム > 企業情報」のパンくずを表示し、同時にグローバルナビの「企業情報」を強調して、二重に現在地を示している。",
          checkedOn: CHECKED3,
          note: "Webユーザビリティランキング2026 6位",
          image: {
            src: "/screenshots/sites/shimizu-company.jpg",
            caption:
              "清水建設 企業情報。パンくず「ホーム > 企業情報」とナビのハイライトで現在地が分かる（確認日 2026-07-23）。",
          },
        },
        {
          company: "大同生命",
          url: "https://www.daido-life.co.jp/company/",
          text: "企業情報ページの上部にホームアイコンつきのパンくず「ホーム > 企業情報」を置き、各階層をリンクにしている。加えて「このページを音声で聞く」導線も備える。",
          checkedOn: CHECKED3,
          note: "Webユーザビリティランキング2026 4位",
          image: {
            src: "/screenshots/sites/daido-company.jpg",
            caption:
              "大同生命 企業情報。ホームアイコンつきのパンくずと、ナビの「企業情報」ハイライトが出る（確認日 2026-07-23）。",
          },
        },
        {
          company: "松井証券",
          url: "https://www.matsui.co.jp/company/",
          text: "会社案内・IR情報のセクションで「松井証券ホーム > 会社案内・IR情報」のパンくずを表示し、上位階層へ戻れるようにしている。",
          checkedOn: CHECKED3,
          note: "Webユーザビリティランキング2026 5位",
          image: {
            src: "/screenshots/sites/matsui-company.jpg",
            caption:
              "松井証券 会社案内・IR情報。パンくずで現在地を示し、松井証券ホームへ戻れる（確認日 2026-07-23）。",
          },
        },
        {
          text: "「ホーム > 事業紹介 > ◯◯事業 > 製品一覧」のように全階層がリンクになっており、検索から着地しても上位階層へ戻れる。",
        },
      ],
      badExamples: [
        {
          text: "現在地表示がなく、検索から着地した利用者が構造を把握できない。",
        },
        {
          text: "トップページのグローバルナビにパンくずがなく、下層でも一切表示されない。",
        },
      ],
      sources: ["nng-heuristics", "tribeck"],
      relatedTerms: ["breadcrumb", "three-click"],
    },
  ],
};

const C3: UxCategory = {
  id: "3",
  title: "ファインダビリティ・検索性",
  short: "サイト内検索・サジェスト・サイトマップ・SEO（配点15）",
  description:
    "情報の見つけやすさ（ファインダビリティ）を評価する。サイト内検索の配置と機能、HTMLサイトマップ、外部検索エンジンへの対応まで、ナビゲーション以外の探し方が用意されているかを見る。",
  points: 15,
  items: [
    {
      id: "3-1",
      title: "サイト内検索の配置",
      points: 6,
      judgeMethod: "url-screen",
      criteria:
        "サイト内検索窓が全ページのヘッダーに配置され、虫眼鏡アイコンで発見しやすいか。",
      background:
        "目的の情報名が分かっている利用者には検索が最短路。全ページのヘッダーに常設し、虫眼鏡アイコンで示すのが定石。企業サイトでは検索機能の導入率が9割を超えており、無いこと自体が減点になる。",
      checkpoints: [
        "全ページのヘッダーに検索窓（または虫眼鏡アイコン）があるか",
        "下層ページでも検索窓が消えないか",
        "モバイルでも検索に到達できるか",
        "検索窓が「サイト内検索」であることが分かるか（商品検索と混同しないか）",
      ],
      goodExamples: [
        {
          company: "J:COM",
          url: "https://www.jcom.co.jp/",
          text: "ページ上部に検索機能を配置し、複数箇所から検索に入れるようにしている。",
          checkedOn: CHECKED,
          image: {
            src: "/screenshots/sites/jcom-home.jpg",
            caption:
              "J:COM トップのファーストビュー。ブランドコピーの下に「新規ご加入の方／ご利用中の方」の目的別導線が並ぶ。",
          },
        },
        {
          company: "大日本印刷",
          url: "https://www.dnp.co.jp/",
          text: "ヘッダーに「サイト内検索」と明示した検索窓を置き、何を検索するのかが分かるようにしている。",
          checkedOn: CHECKED,
          image: {
            src: "/screenshots/sites/dnp-home.jpg",
            caption:
              "大日本印刷 のヘッダー右側に「サイト内検索」と明示された検索導線がある（商品検索と紛れない）。（確認日 2026-07-15）",
          },
        },
        {
          company: "松井証券",
          url: "https://www.matsui.co.jp/",
          text: "ヘッダー右上に「サイト内検索」の入力窓を置き、その隣に「銘柄検索」を別に用意。サイト内検索と商品（銘柄）検索を明確に分け、混同を防いでいる。",
          checkedOn: CHECKED3,
          note: "Webユーザビリティランキング2026 5位",
          image: {
            src: "/screenshots/sites/matsui-home.jpg",
            caption:
              "松井証券 のヘッダー。「サイト内検索」と「銘柄検索」が別々に置かれ、役割が区別されている（確認日 2026-07-23）。",
          },
        },
        {
          company: "大同生命",
          url: "https://www.daido-life.co.jp/",
          text: "ヘッダーに「サイト内検索」と明示した入力窓を常設し、虫眼鏡アイコンだけに頼らず、何を検索する窓かが分かるようにしている。",
          checkedOn: CHECKED3,
          note: "Webユーザビリティランキング2026 4位",
          image: {
            src: "/screenshots/sites/daido-life-home.jpg",
            caption:
              "大同生命 のヘッダーに「サイト内検索」と明示した入力窓がある（確認日 2026-07-23）。",
          },
        },
        {
          company: "清水建設",
          url: "https://www.shimz.co.jp/",
          text: "ヘッダー右側に虫眼鏡アイコンつきで「サイト内検索」を配置し、問い合わせ・FAQと並べて発見しやすくしている。",
          checkedOn: CHECKED3,
          note: "Webユーザビリティランキング2026 6位",
          image: {
            src: "/screenshots/sites/shimizu-home.jpg",
            caption:
              "清水建設 のヘッダーに虫眼鏡つきの「サイト内検索」がある（確認日 2026-07-23）。",
          },
        },
      ],
      badExamples: [
        { text: "検索窓が無い、または下層ページにしか存在しない。" },
        {
          text: "モバイル表示で検索がメニューの奥に隠れ、到達に3タップ以上かかる。",
        },
      ],
      benchmark: {
        text: "サイト内検索の導入はESGサイト調査で185社中183社（98.9%）。事実上の必須項目。",
        confirmed: true,
        source: "gomez-esg-2025-press",
      },
      sources: ["tribeck", "gomez-esg-2025-press"],
      relatedTerms: ["findability", "site-search"],
    },
    {
      id: "3-2",
      title: "検索機能の質",
      points: 5,
      judgeMethod: "screen",
      criteria:
        "サジェスト・絞り込み（ファセット）・件数表示・0件時のフォローがあるか。",
      background:
        "検索窓があっても、結果が役に立たなければ意味がない。サジェストやファセット絞り込み、0件時の代替提案は、検索の成功率を高める。0件で行き止まりになる検索は、離脱を生む典型的な設計になる。",
      checkpoints: [
        "入力中にサジェスト（候補表示）が出るか",
        "結果をカテゴリ・種別で絞り込めるか（ファセット）",
        "ヒット件数が表示されるか",
        "0件のとき、代替候補や関連ページの提案があるか",
        "PDF内の文言も検索対象になっているか",
      ],
      goodExamples: [
        {
          text: "入力サジェストとカテゴリ絞り込みを備え、0件時には表記ゆれの候補と主要ページへの導線を提示する。",
        },
      ],
      badExamples: [
        {
          text: "単純な全文検索のみで、0件時に「該当する情報はありません」だけが表示される。",
        },
        {
          text: "検索結果がPDFのファイル名だけ並び、どのページの情報か分からない。",
        },
      ],
      sources: ["nng-heuristics", "tribeck"],
      relatedTerms: ["faceted-search", "site-search"],
    },
    {
      id: "3-3",
      title: "サイトマップ・検索エンジン対応",
      points: 4,
      judgeMethod: "url",
      criteria:
        "HTMLサイトマップの提供、title・見出し構造など外部検索エンジンへの対応があるか。",
      background:
        "HTMLサイトマップは全体像の把握を助ける。適切なtitle・見出し構造は、検索エンジンやAIからの発見可能性を高める。ゴメスの調査でも、XMLサイトマップの設置率は52.4%にとどまり、テクニカルな基盤は差がつきやすい。",
      checkpoints: [
        "HTMLサイトマップ（全体像の一覧ページ）があるか",
        "XMLサイトマップが設置され、実構成と整合しているか",
        "各ページのtitleが固有で、内容を表しているか",
        "見出し（h1〜h3）が階層構造として正しく使われているか",
      ],
      goodExamples: [
        {
          text: "HTMLサイトマップで全体像を示しつつ、XMLサイトマップも整備し、各ページのtitleを固有にしている。",
        },
      ],
      badExamples: [
        {
          text: "サイトマップが無く、titleも全ページ同一で検索結果から区別できない。",
        },
        { text: "見出しがすべて画像で、テキストとしての構造がない。" },
      ],
      benchmark: {
        text: "XMLサイトマップの設置はIRサイト調査で389社中204社（52.4%）にとどまる。",
        confirmed: true,
        source: "gomez-ir-2025-press",
      },
      sources: ["gomez-ir-2025-press", "lighthouse"],
      relatedTerms: ["findability"],
    },
  ],
};

const C4: UxCategory = {
  id: "4",
  title: "コンテンツのわかりやすさ",
  short: "見出し階層・簡潔さ・斜め読み配慮・FAQ（配点10）",
  description:
    "本文コンテンツの読みやすさを評価する（トライベックD軸）。論理的な見出し階層、簡潔な文、斜め読みに配慮した箇条書き・図表、FAQの整備で、読み飛ばす利用者にも情報が伝わるかを見る。",
  points: 10,
  items: [
    {
      id: "4-1",
      title: "見出し階層・文章の簡潔さ",
      points: 5,
      judgeMethod: "screen",
      criteria:
        "見出し階層が論理的で、1文が簡潔、専門用語に説明が付いているか。",
      background:
        "Webは読まれるより「斜め読み」される。論理的な見出しと簡潔な文、用語説明があると、必要な情報に素早くたどり着ける。紙の資料をそのままWebに載せると、見出しのない長文の塊になりやすい。",
      checkpoints: [
        "見出し（h2/h3）で内容が区切られ、見出しだけ拾って概要が掴めるか",
        "1文が長すぎないか（1文1義になっているか）",
        "専門用語に初出時の説明があるか",
        "1段落が5〜6行以内に収まっているか",
      ],
      goodExamples: [
        {
          company: "日立製作所",
          url: "https://www.hitachi.co.jp/sustainability/environment/",
          text: "「日立の取り組み」「環境ビジョン」と内容を示す見出しが並び、各見出しの直下に1〜2文のリード文を置いているため、見出しを拾うだけでページの構成が掴める。専門用語も「グリーントランスフォーメーション(GX)」のように略語を併記している。",
          checkedOn: CHECKED2,
          image: {
            src: "/screenshots/sites/hitachi-environment.jpg",
            caption:
              "日立製作所 サステナビリティ「環境」。見出しの直下に短いリード文、その下に「脱炭素／サーキュラーエコノミー／ネイチャーポジティブ」の3つの柱がタブで並ぶ。",
          },
        },
        {
          company: "双日",
          url: "https://www.sojitz.com/jp/sustainability/esg-human_rights/",
          text: "「1. 方針・基本的な考え方」「1-1. 人権方針」のように番号つきの見出しで階層を明示し、各見出しの直下を短い段落に分けている。見出しだけ拾えば「方針→体制→取り組み→パフォーマンス」の流れが掴める。",
          checkedOn: CHECKED3,
          image: {
            src: "/screenshots/sites/sojitz-human-rights.jpg",
            caption:
              "双日 人権。番号つきの見出しと簡潔な段落で、拾い読みでも構成が分かる（確認日 2026-07-23）。",
          },
        },
        {
          company: "三菱瓦斯化学",
          url: "https://www.mgc.co.jp/sustainability/environment/tcfd.html",
          text: "「気候変動への対応（TCFD提言に基づく開示）」と内容を表す見出しを置き、1文を短く区切った段落で説明。「Scope1/2」「Scope3」など専門用語には注記番号を添えている。",
          checkedOn: CHECKED3,
          image: {
            src: "/screenshots/sites/mgc-tcfd.jpg",
            caption:
              "三菱瓦斯化学 気候変動への対応。内容を表す見出しと簡潔な段落で構成されている（確認日 2026-07-23）。",
          },
        },
        {
          text: "見出しだけを拾い読みしてもページの要点が分かる構成で、専門用語には初出時に注釈を添えている。",
        },
      ],
      badExamples: [
        { text: "長文が改行なく続き、専門用語の説明もない。" },
        {
          text: "見出しが「はじめに」「概要」など内容を表さない定型語になっている。",
        },
      ],
      sources: ["nng-heuristics", "tribeck"],
      relatedTerms: ["scannability"],
    },
    {
      id: "4-2",
      title: "斜め読み配慮・FAQ",
      points: 5,
      judgeMethod: "url-screen",
      criteria: "箇条書き・表・図で要点が掴め、FAQが整備されているか。",
      background:
        "箇条書き・表・図は斜め読みを助ける。よくある疑問に答えるFAQは、問い合わせ前の自己解決を促し、サポートコストも下げる。紙媒体をPDFで貼るだけの構成は、この観点で最も評価が低くなる。",
      checkpoints: [
        "要点が箇条書き・表・図で整理されているか",
        "FAQがあり、実際によくある質問に答えているか",
        "FAQが検索・カテゴリで探せるか",
        "紙資料のPDFをそのまま貼っただけになっていないか",
      ],
      goodExamples: [
        {
          company: "J:COM",
          url: "https://www.jcom.co.jp/",
          text: "サポートへの導線を複数箇所に置き、料金・申し込み・変更手続きなど利用者の目的別に情報を整理している。",
          checkedOn: CHECKED,
          image: {
            src: "/screenshots/sites/jcom-home.jpg",
            caption:
              "J:COM トップのファーストビュー。ブランドコピーの下に「新規ご加入の方／ご利用中の方」の目的別導線が並ぶ。",
          },
        },
        {
          company: "松井証券",
          url: "https://www.matsui.co.jp/",
          text: "ヘッダーに「よくあるご質問」を常設し、さらに「AIチャットに質問」の窓口を用意して、問い合わせ前の自己解決を促している。",
          checkedOn: CHECKED3,
          note: "Webユーザビリティランキング2026 5位",
          image: {
            src: "/screenshots/sites/matsui-home.jpg",
            caption:
              "松井証券 トップ。「よくあるご質問」と「AIチャットに質問」で自己解決を後押ししている（確認日 2026-07-23）。",
          },
        },
        {
          company: "大同生命",
          url: "https://www.daido-life.co.jp/",
          text: "ヘッダーの目立つ位置に「よくあるご質問・お問い合わせ」をまとめて置き、疑問の解決と問い合わせを同じ入口から辿れるようにしている。",
          checkedOn: CHECKED3,
          note: "Webユーザビリティランキング2026 4位",
          image: {
            src: "/screenshots/sites/daido-life-home.jpg",
            caption:
              "大同生命 トップ。「よくあるご質問・お問い合わせ」がヘッダーの目立つ位置にある（確認日 2026-07-23）。",
          },
        },
        {
          company: "清水建設",
          url: "https://www.shimz.co.jp/",
          text: "ヘッダーに「FAQ」を独立して置き、問い合わせ・お知らせと並べて、よくある疑問への自己解決導線を分かりやすくしている。",
          checkedOn: CHECKED3,
          note: "Webユーザビリティランキング2026 6位",
          image: {
            src: "/screenshots/sites/shimizu-home.jpg",
            caption:
              "清水建設 トップ。ヘッダーに「FAQ」が独立して置かれている（確認日 2026-07-23）。",
          },
        },
      ],
      badExamples: [
        { text: "紙媒体の丸写しで、図表もFAQもない。" },
        {
          text: "FAQはあるが、実際の問い合わせと関係のない当たり障りのない質問だけが並ぶ。",
        },
      ],
      sources: ["tribeck", "nng-heuristics"],
      relatedTerms: ["scannability"],
    },
  ],
};

const C5: UxCategory = {
  id: "5",
  title: "アクセシビリティ",
  short: "代替テキスト・コントラスト・キーボード操作・方針明記（配点15）",
  description:
    "WCAG 2.2／JIS X 8341-3 の AA 準拠を目安に、多様な利用者が情報にアクセスできるかを評価する。代替テキスト、コントラスト比、テキスト拡大、キーボード操作、フォーカス可視化、アクセシビリティ方針の明記まで。自動ツールで検出できるのは一部にとどまるため、目視・実機確認との併用が要る。",
  points: 15,
  items: [
    {
      id: "5-1",
      title: "知覚可能性（alt・コントラスト・拡大）",
      points: 8,
      judgeMethod: "external",
      criteria:
        "画像の代替テキスト、AA基準のコントラスト比（4.5:1）、フォントサイズ・テキスト拡大対応があるか。",
      background:
        "代替テキスト（WCAG 1.1.1）、コントラスト比（1.4.3 レベルAA）、テキストの拡大（1.4.4 レベルAA）は、視覚に制約のある利用者に情報を届ける基本。装飾画像に無意味なaltを付けるのも、意味のある画像にaltが無いのと同じくらい読み上げの妨げになる。",
      checkpoints: [
        "意味のある画像に、内容を伝えるaltがあるか",
        '装飾画像のaltが空（alt=""）になっているか',
        "文字と背景のコントラスト比が4.5:1以上か（大きな文字は3:1）",
        "ブラウザで200%まで拡大してもレイアウトが破綻しないか",
        "図表の内容がテキストでも取得できるか",
      ],
      goodExamples: [
        {
          company: "大同生命",
          url: "https://www.daido-life.co.jp/",
          text: "ヘッダーに「文字サイズ 中／大」の切り替えを常設し、ブラウザ操作に不慣れな利用者でも本文の文字を大きくできるようにしている。テキスト拡大への配慮がサイト上の機能として実装されている。",
          checkedOn: CHECKED3,
          note: "Webユーザビリティランキング2026 4位",
          image: {
            src: "/screenshots/sites/daido-life-home.jpg",
            caption:
              "大同生命 のヘッダーに「文字サイズ 中／大」の切り替えがある（確認日 2026-07-23）。",
          },
        },
        {
          company: "大同生命",
          url: "https://www.daido-life.co.jp/company/",
          text: "下層ページに「このページを音声で聞く」導線を用意し、本文を音声でも取得できるようにしている。視覚以外の手段での情報取得に配慮している。",
          checkedOn: CHECKED3,
          note: "Webユーザビリティランキング2026 4位",
          image: {
            src: "/screenshots/sites/daido-company.jpg",
            caption:
              "大同生命 企業情報。「このページを音声で聞く」導線がヘッダー下に用意されている（確認日 2026-07-23）。",
          },
        },
        {
          text: "図版に内容を説明するaltを付け、グラフの数値はHTMLの表としても提供している。ブラウザで200%拡大しても横スクロールが発生しない。",
        },
      ],
      badExamples: [
        { text: "実績データのグラフが画像のみで、altもテキストの代替もない。" },
        {
          text: "淡いグレーの文字が白背景に置かれ、コントラスト比がAA基準を下回る。",
        },
      ],
      benchmark: {
        text: "自動ツール（Lighthouse等）で検出できるのはアクセシビリティ問題の一部にとどまる。目視・キーボード操作・スクリーンリーダーでの確認が要る。",
        confirmed: false,
      },
      sources: ["wcag22", "wcag22-ja"],
      furtherReading: ["lighthouse"],
      relatedTerms: ["wcag", "jis-8341"],
    },
    {
      id: "5-2",
      title: "操作可能性（キーボード・フォーカス）",
      points: 4,
      judgeMethod: "external",
      criteria:
        "キーボード操作・フォーカス可視化、自動再生カルーセルの一時停止、音声自動再生の制御があるか。",
      background:
        "キーボード操作（WCAG 2.1.1）とフォーカスの可視化（2.4.7）は、マウスを使えない利用者に不可欠。自動再生の停止手段は、ニールセンの第3原則「利用者による制御と自由」にも関わる。マウスホバーでしか開かないメガメニューは、この観点で行き止まりになる。",
      checkpoints: [
        "Tabキーだけで主要な導線をたどれるか",
        "フォーカスされている要素が視覚的に分かるか",
        "メガメニューがキーボードでも開けるか",
        "自動再生のカルーセル・動画を停止できるか",
        "Tabの移動順序が見た目の並びと一致しているか",
      ],
      goodExamples: [
        {
          text: "Tabキーだけでグローバルナビからフッターまでたどれ、フォーカス位置が明確に縁取りで示される。カルーセルには一時停止ボタンがある。",
        },
      ],
      badExamples: [
        {
          text: "メガメニューがマウスホバー専用で、キーボードでは下層に到達できない。",
        },
        {
          text: "カルーセルが自動再生で止められず、読んでいる途中で切り替わる。",
        },
      ],
      sources: ["wcag22", "nng-heuristics"],
      relatedTerms: ["wcag", "nielsen-heuristics"],
    },
    {
      id: "5-3",
      title: "アクセシビリティ方針の明記",
      points: 3,
      judgeMethod: "url",
      criteria: "アクセシビリティ方針とJIS/WCAG準拠状況が明記されているか。",
      background:
        "方針と準拠レベル（AA等）の明記は、アクセシビリティへの取り組み姿勢と到達度を示す。方針の掲載率は半数以下にとどまるため、掲載しているだけで差別化になる項目でもある。",
      checkpoints: [
        "アクセシビリティ方針のページがあるか",
        "準拠レベル（WCAG 2.2 レベルAA、JIS X 8341-3 等）が明記されているか",
        "対象範囲（どのページまで）が示されているか",
        "試験結果（達成状況）を公開しているか",
      ],
      goodExamples: [
        {
          text: "アクセシビリティ方針でWCAG 2.2 レベルAA準拠と対象範囲を明示し、試験結果と未達成項目の改善予定まで公開している。",
        },
      ],
      badExamples: [
        { text: "アクセシビリティに関する記載が一切ない。" },
        {
          text: "「配慮しています」とだけ書き、準拠レベルも対象範囲も示していない。",
        },
      ],
      benchmark: {
        text: "アクセシビリティポリシーの掲載はESGサイト調査で185社中86社（46.5%）。半数以上が未掲載。",
        confirmed: true,
        source: "gomez-esg-2025-press",
      },
      sources: ["wcag22-ja", "gomez-esg-2025-press"],
      relatedTerms: ["jis-8341", "wcag"],
    },
  ],
};

const C6: UxCategory = {
  id: "6",
  title: "モバイル対応・パフォーマンス",
  short: "レスポンシブ・タップターゲット・Core Web Vitals（配点10）",
  description:
    "モバイル体験と表示性能を評価する。レスポンシブデザイン、十分なタップターゲット、そして Core Web Vitals（LCP・INP・CLS）という定量的な指標で、速く快適に使えるかを見る。この領域は目視ではなく実測が要る。",
  points: 10,
  items: [
    {
      id: "6-1",
      title: "レスポンシブ・タップターゲット",
      points: 5,
      judgeMethod: "screen",
      criteria:
        "レスポンシブ対応、タップターゲットの十分な大きさ・間隔、ハンバーガーメニュー等の配慮があるか。",
      background:
        "モバイル閲覧が主流。指で押しやすいタップターゲットと崩れないレイアウトは、モバイルでの基本的な使いやすさを左右する。WCAG 2.2 ではターゲットサイズ（最小 24×24 CSSピクセル）が新たに追加され、押しやすさが規格の要件になった。",
      checkpoints: [
        "スマートフォンで横スクロールが発生しないか",
        "タップ対象が十分な大きさ（24×24px以上、推奨44×44px）か",
        "隣接するリンクの間隔が十分か",
        "表が画面幅を超える場合、スクロール領域を持つか",
      ],
      goodExamples: [
        {
          company: "J:COM",
          url: "https://www.jcom.co.jp/",
          text: "スマートフォン幅（390px）で横スクロールが発生せず、「はじめての方へ／ご利用中の方／オンラインショップ」をアイコン付きの大きなタップ対象で並べ、チャット導線も指で押しやすい位置に置いている。",
          checkedOn: CHECKED3,
          note: "Webユーザビリティランキング2026 1位（スマホ幅390pxで確認）",
          image: {
            src: "/screenshots/sites/jcom-mobile.jpg",
            caption:
              "J:COM トップのスマホ表示（390px）。アイコン付きの大きなタップ導線と、下部の「新規ご加入／ご利用中」の大型ボタン（確認日 2026-07-23）。",
          },
        },
        {
          company: "清水建設",
          url: "https://www.shimz.co.jp/",
          text: "スマホ幅ではグローバルナビをハンバーガーメニューに集約し、新着情報を横スクロールなしで縦一列に。各ニュースを全幅のタップ行（右端にシェブロン）として押しやすくしている。",
          checkedOn: CHECKED3,
          note: "Webユーザビリティランキング2026 6位（スマホ幅390pxで確認）",
          image: {
            src: "/screenshots/sites/shimizu-mobile.jpg",
            caption:
              "清水建設 トップのスマホ表示（390px）。右上にハンバーガーメニュー、ニュースが全幅のタップ行で縦に並ぶ（確認日 2026-07-23）。",
          },
        },
        {
          company: "大同生命",
          url: "https://www.daido-life.co.jp/",
          text: "スマホ幅でハンバーガーメニュー＋検索アイコンをヘッダーに集約し、「重要なお知らせ／お知らせ／ニュースリリース」を崩れずに縦積み。各PDFに「読み上げる」ボタンも添えている。",
          checkedOn: CHECKED3,
          note: "Webユーザビリティランキング2026 4位（スマホ幅390pxで確認）",
          image: {
            src: "/screenshots/sites/daido-mobile.jpg",
            caption:
              "大同生命 トップのスマホ表示（390px）。ハンバーガー＋検索をヘッダーに集約し、お知らせが縦積みで並ぶ（確認日 2026-07-23）。",
          },
        },
      ],
      badExamples: [
        {
          text: "PC固定幅でスマホでは横スクロールが必要、ボタンが小さすぎて押し間違える。",
        },
        { text: "リンクが密集し、意図しないリンクを押してしまう。" },
      ],
      sources: ["wcag22", "tribeck"],
      relatedTerms: ["responsive", "tap-target"],
    },
    {
      id: "6-2",
      title: "Core Web Vitals",
      points: 5,
      judgeMethod: "external",
      criteria: "LCP≤2.5秒／INP≤200ms／CLS≤0.1 を満たすか（外部計測が必要）。",
      background:
        "表示速度・応答性・レイアウト安定性は直帰率・回遊に直結する定量指標。実ユーザーデータ（CrUX）で判定され、3指標すべてが良好でないと総合パスにならない。ラボ計測（Lighthouse）だけで判断すると、実際の利用環境での遅さを見落とす。",
      checkpoints: [
        "PageSpeed Insights のフィールドデータで LCP 2.5秒以内か",
        "INP が 200ms 以内か",
        "CLS が 0.1 以下か（広告・画像でガタつかないか）",
        "モバイルとPCの両方を計測しているか",
      ],
      goodExamples: [
        {
          text: "PageSpeed Insights のフィールドデータで LCP・INP・CLS の3指標すべてが良好圏内に入っている。",
        },
      ],
      badExamples: [
        { text: "LCPが4秒を超え、ファーストビューの表示に待たされる。" },
        {
          text: "画像のサイズ指定がなく、読み込み中にレイアウトがガタつく（CLSが大きい）。",
        },
      ],
      benchmark: {
        text: "良好の閾値は LCP 2.5秒以内／INP 200ms以内／CLS 0.1以下（Google）。実ユーザー計測での75パーセンタイルで判定する。",
        confirmed: true,
        source: "core-web-vitals",
      },
      sources: ["core-web-vitals", "pagespeed"],
      furtherReading: ["lighthouse"],
      relatedTerms: ["core-web-vitals", "lcp", "inp", "cls"],
    },
  ],
};

const C7: UxCategory = {
  id: "7",
  title: "ヘルプ・安全性・フォーム",
  short: "問い合わせ導線・フォームのエラー予防・プライバシー・SSL（配点10）",
  description:
    "困ったときの助けと安心を評価する（トライベックE軸）。問い合わせ導線の明快さ、フォームのエラー予防と分かりやすいエラーメッセージ、プライバシーポリシー・SSL・クッキー同意・多言語対応まで。",
  points: 10,
  items: [
    {
      id: "7-1",
      title: "問い合わせ導線・フォーム",
      points: 5,
      judgeMethod: "url-screen",
      criteria:
        "問い合わせ導線が明快で、フォームにエラー予防・分かりやすいエラーメッセージ・入力補助があるか。",
      background:
        "ニールセンの第5原則「エラーの予防」と第9原則「エラーからの回復支援」。入力補助や、どこが何故エラーなのかを具体的に示すメッセージが、フォーム離脱を防ぐ。送信後にまとめてエラーを出す設計は、入力内容が消えると致命的になる。",
      checkpoints: [
        "問い合わせへの導線が全ページから見つかるか",
        "入力形式（郵便番号・電話番号）の例示や自動補完があるか",
        "エラーが該当項目の近くに、理由つきで表示されるか",
        "送信前に入力内容を確認でき、戻っても入力が消えないか",
        "必須項目が明示されているか",
      ],
      goodExamples: [
        {
          company: "J:COM",
          url: "https://www.jcom.co.jp/",
          text: "「お申し込み・お問い合わせ」「お客さまサポート」への導線を複数箇所に配置し、目的から問い合わせに到達できるようにしている。",
          checkedOn: CHECKED,
          image: {
            src: "/screenshots/sites/jcom-home.jpg",
            caption:
              "J:COM トップのファーストビュー。ブランドコピーの下に「新規ご加入の方／ご利用中の方」の目的別導線が並ぶ。",
          },
        },
        {
          company: "松井証券",
          url: "https://www.matsui.co.jp/",
          text: "ヘッダーに「お問い合わせ」を常設したうえで、AIチャット窓口と、手続き別の専用ダイヤル（例：パスキー設定専用ダイヤル）まで案内し、目的に応じた問い合わせ先へ迷わず到達できるようにしている。",
          checkedOn: CHECKED3,
          note: "Webユーザビリティランキング2026 5位",
          image: {
            src: "/screenshots/sites/matsui-home.jpg",
            caption:
              "松井証券 トップ。お問い合わせ・AIチャット・手続き別の専用ダイヤルへ導線を分けている（確認日 2026-07-23）。",
          },
        },
        {
          company: "中外製薬",
          url: "https://www.chugai-pharm.co.jp/",
          text: "ヘッダー右側に「FAQ・お問合せ」をまとめて常設し、全ページから問い合わせと自己解決の入口に到達できるようにしている。",
          checkedOn: CHECKED3,
          note: "Webユーザビリティランキング2026 3位",
          image: {
            src: "/screenshots/sites/chugai-home.jpg",
            caption:
              "中外製薬 トップ。ヘッダーに「FAQ・お問合せ」が常設されている（確認日 2026-07-23）。",
          },
        },
        {
          company: "清水建設",
          url: "https://www.shimz.co.jp/",
          text: "ヘッダーに「お問い合わせ」を独立して置き、FAQ・お知らせと並べて、困ったときの入口を全ページから見つけやすくしている。",
          checkedOn: CHECKED3,
          note: "Webユーザビリティランキング2026 6位",
          image: {
            src: "/screenshots/sites/shimizu-home.jpg",
            caption:
              "清水建設 トップ。ヘッダーに「お問い合わせ」が独立して置かれている（確認日 2026-07-23）。",
          },
        },
      ],
      badExamples: [
        {
          text: "問い合わせ先が探しにくく、送信後にまとめてエラーが出て入力内容が消える。",
        },
        {
          text: "エラーメッセージが「入力内容に誤りがあります」だけで、どこが誤りか分からない。",
        },
      ],
      sources: ["nng-heuristics", "tribeck"],
      relatedTerms: ["nielsen-heuristics", "error-prevention"],
    },
    {
      id: "7-2",
      title: "安全性・プライバシー・多言語",
      points: 5,
      judgeMethod: "url",
      criteria:
        "プライバシーポリシー・SSL暗号化・クッキー同意があり、必要に応じ多言語対応しているか。",
      background:
        "SSL暗号化とプライバシーポリシー、クッキー同意は信頼と法令対応の基本。グローバル企業や在留外国人を顧客に持つ企業では、多言語対応も使いやすさに直結する。Cookie同意の導入は6割弱にとどまり、対応の差が残っている。",
      checkpoints: [
        "全ページがHTTPSで配信されているか",
        "プライバシーポリシーが分かる場所にあるか",
        "クッキー同意バナーがあり、拒否も選べるか",
        "必要な言語（英語・中国語等）に対応しているか",
      ],
      goodExamples: [
        {
          company: "J:COM",
          url: "https://www.jcom.co.jp/",
          text: "日本語・English・簡体中文・한국어・Tiếng Việt・नेपाली の6言語に対応し、在留外国人の利用者にも配慮している。",
          checkedOn: CHECKED,
          image: {
            src: "/screenshots/sites/jcom-home.jpg",
            caption:
              "J:COM トップのファーストビュー。ブランドコピーの下に「新規ご加入の方／ご利用中の方」の目的別導線が並ぶ。",
          },
        },
        {
          company: "清水建設",
          url: "https://www.shimz.co.jp/",
          text: "ファーストビュー上部に「弊社を装った不審な訪問や電話にご注意ください」の注意喚起帯を常設し、利用者を詐称行為から守る情報を目立たせている。JP／EN の言語切替も併設している。",
          checkedOn: CHECKED3,
          note: "Webユーザビリティランキング2026 6位",
          image: {
            src: "/screenshots/sites/shimizu-home.jpg",
            caption:
              "清水建設 トップ。上部の黄色帯で「弊社を装った不審な訪問・電話」への注意を促す（確認日 2026-07-23）。",
          },
        },
        {
          company: "中部電力",
          url: "https://www.chuden.co.jp/",
          text: "重要なお知らせとして「自動音声案内を使用した不審電話にご注意ください」を掲出し、English 切替も用意して安全性と多言語配慮の両面に対応している。",
          checkedOn: CHECKED3,
          note: "Webユーザビリティランキング2026 8位",
          image: {
            src: "/screenshots/sites/chuden-home.jpg",
            caption:
              "中部電力 トップ。不審電話への注意喚起と English 切替がある（確認日 2026-07-23）。",
          },
        },
      ],
      badExamples: [
        {
          text: "SSL未対応のページが混在し、プライバシーポリシーやクッキー同意が見当たらない。",
        },
        {
          text: "クッキー同意バナーに「同意する」しかなく、拒否の選択肢がない。",
        },
      ],
      benchmark: {
        text: "Cookie同意の導入はESGサイト調査で185社中109社（58.9%）、サイバーセキュリティポリシーの掲載は143社（77.3%）。",
        confirmed: true,
        source: "gomez-esg-2025-press",
      },
      sources: ["gomez-esg-2025-press", "tribeck"],
      relatedTerms: [],
    },
  ],
};

export const uxCategories: UxCategory[] = [C1, C2, C3, C4, C5, C6, C7];

export function getUxCategory(id: string): UxCategory | undefined {
  return uxCategories.find((c) => c.id === (id as UxCategoryId));
}

export function uxAllItems(): (UxCriteriaItem & {
  categoryId: UxCategoryId;
  categoryTitle: string;
})[] {
  return uxCategories.flatMap((c) =>
    c.items.map((item) => ({
      ...item,
      categoryId: c.id,
      categoryTitle: c.title,
    })),
  );
}

export function getUxItem(
  id: string,
):
  | (UxCriteriaItem & { categoryId: UxCategoryId; categoryTitle: string })
  | undefined {
  return uxAllItems().find((it) => it.id === id);
}

// 全カテゴリの配点合計（15+25+15+10+15+10+10 = 100）。
export function uxTotalPoints(): number {
  return uxCategories.reduce((sum, c) => sum + c.points, 0);
}
