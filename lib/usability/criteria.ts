import type { UxCategory, UxCategoryId, UxCriteriaItem } from "./types";

// ユーザビリティ評価ルーブリック（7カテゴリ・19項目・計100点）。
// トライベック5軸（A明快性/Cナビ/Dコンテンツ/Eヘルプ）とGomez「使いやすさ30%」、
// ニールセン10原則・WCAG 2.2・Core Web Vitals を統合。ナビゲーション（カテゴリ2）を最重要とする。

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
      criteria: "キャッチコピー・メインビジュアルで、何をする会社かがひと目で伝わるか。",
      background:
        "訪問者はトップページを数秒で判断する。事業を端的に表すコピーと主要導線が一覧できると、離脱を防ぎ回遊につながる。",
      goodExample: "事業を端的に表すコピーと、主要導線が一覧できる。",
      badExample: "抽象的なビジュアルのみで、何をする会社か分からない。",
      relatedTerms: ["above-the-fold"],
    },
    {
      id: "1-2",
      title: "主要導線の優先度・一覧性",
      points: 5,
      judgeMethod: "screen",
      criteria: "主要コンテンツへの導線が優先度付けされ、一覧性高く配置されているか。",
      background:
        "上位企業はトップページで主要コンテンツへの導線を優先度付けし一覧性を高める。巨大なスライダーだけでは導線が埋もれる。",
      goodExample: "スクロール上部に事業・IR・採用など主要な入口が並ぶ。",
      badExample: "巨大な画像スライダーだけで、導線が埋没している。",
      relatedTerms: ["above-the-fold", "ia"],
    },
    {
      id: "1-3",
      title: "更新情報の鮮度",
      points: 5,
      judgeMethod: "url-screen",
      criteria: "ニュース・プレスリリースが新しい日付で掲載され、運用されているか。",
      background:
        "更新が止まっているサイトは放置感を与え、信頼を損なう。最新情報が新しい日付で並ぶことが運用されている証になる。",
      goodExample: "直近の日付のニュース・プレスリリースが掲載されている。",
      badExample: "最新情報が1年以上前で、放置されている印象を与える。",
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
      criteria: "グローバルナビが全ページ共通・固定位置で、5〜7項目に整理されているか。",
      background:
        "人間の短期記憶（7±2）を考慮し、主要メニューは5〜7項目に絞るのが定石。全ページで位置・デザインを固定すると学習コストが下がる。",
      goodExample: "全ページ共通の固定ナビが5〜7項目に整理されている。",
      badExample: "ページごとにメニュー構成が変わる、10項目以上で選択に迷う。",
      relatedTerms: ["global-nav", "millers-law"],
    },
    {
      id: "2-2",
      title: "ラベルの明快性",
      points: 6,
      judgeMethod: "screen",
      criteria: "ラベルが明快で、専門用語・抽象語・自社造語を避け内容が一目で分かるか。",
      background:
        "ニールセン第2原則『実世界との一致』。利用者の言葉でラベル付けすることで、クリック前に行き先が分かる。",
      goodExample: "『会社情報』『製品』『採用』など内容が一目で分かるラベル。",
      badExample: "『ソリューション』等の曖昧な自社造語だけで中身が読めない。",
      relatedTerms: ["nielsen-heuristics"],
    },
    {
      id: "2-3",
      title: "階層の一貫性・リンクの統一",
      points: 6,
      judgeMethod: "screen",
      criteria: "メガメニュー／ローカルナビ／フッターナビの階層が一貫し、リンク・ホバー効果が統一されているか。",
      background:
        "ニールセン第4原則『一貫性と標準』。ナビやリンクの見た目・挙動が揃っていると、操作の予測がつき迷いが減る。",
      goodExample: "メガメニューとフッターの分類が一致し、ホバー効果も統一。",
      badExample: "ページごとにリンクの見た目が異なり、挙動も不統一。",
      relatedTerms: ["mega-menu", "nielsen-heuristics"],
    },
    {
      id: "2-4",
      title: "パンくず・到達クリック数",
      points: 5,
      judgeMethod: "url-screen",
      criteria: "パンくずリストで現在地を明示し、目的情報に3クリック以内で到達できるか。",
      background:
        "パンくずはニールセン第1原則『システム状態の可視性』の代表例。階層が2階層程度で3クリック以内に収まると迷子を防げる。",
      goodExample: "各下層ページにパンくずがあり、目的情報へ3クリック以内。",
      badExample: "現在地が分からず、目的情報まで何度もクリックが必要。",
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
      criteria: "サイト内検索窓が全ページのヘッダーに配置され、虫眼鏡アイコンで発見しやすいか。",
      background:
        "目的の情報名が分かっている利用者には検索が最短路。全ページのヘッダーに常設し、虫眼鏡アイコンで示すのが定石。",
      goodExample: "全ページのヘッダーに検索窓があり、虫眼鏡アイコンで分かる。",
      badExample: "検索窓が無い、または下層ページにしか存在しない。",
      relatedTerms: ["findability", "site-search"],
    },
    {
      id: "3-2",
      title: "検索機能の質",
      points: 5,
      judgeMethod: "screen",
      criteria: "サジェスト・絞り込み（ファセット）・件数表示・0件時のフォローがあるか。",
      background:
        "サジェストやファセット絞り込み、0件時の代替提案は、検索の成功率を高める。件数表示は結果の見通しを与える。",
      goodExample: "入力サジェスト、ファセット絞り込み、件数表示、0件時の提案がある。",
      badExample: "単純な全文検索のみで、0件時に手がかりがない。",
      relatedTerms: ["faceted-search", "site-search"],
    },
    {
      id: "3-3",
      title: "サイトマップ・検索エンジン対応",
      points: 4,
      judgeMethod: "url",
      criteria: "HTMLサイトマップの提供、title・見出し構造など外部検索エンジンへの対応があるか。",
      background:
        "HTMLサイトマップは全体像の把握を助ける。適切なtitle・見出し構造は、検索エンジンやAIからの発見可能性を高める。",
      goodExample: "HTMLサイトマップがあり、各ページのtitle・見出しも適切。",
      badExample: "サイトマップが無く、titleも全ページ同一で区別できない。",
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
      criteria: "見出し階層が論理的で、1文が簡潔、専門用語に説明が付いているか。",
      background:
        "Webは斜め読みされる。論理的な見出しと簡潔な文、用語説明があると、必要な情報に素早くたどり着ける。",
      goodExample: "論理的な見出しで区切られ、文が簡潔で用語説明もある。",
      badExample: "長文が改行なく続き、専門用語の説明もない。",
      relatedTerms: ["scannability"],
    },
    {
      id: "4-2",
      title: "斜め読み配慮・FAQ",
      points: 5,
      judgeMethod: "url-screen",
      criteria: "箇条書き・表・図で要点が掴め、FAQが整備されているか。",
      background:
        "箇条書き・表・図は斜め読みを助ける。よくある疑問に答えるFAQは、問い合わせ前の自己解決を促す。",
      goodExample: "要点が箇条書き・図表で整理され、FAQも用意されている。",
      badExample: "紙媒体の丸写しで、図表もFAQもない。",
      relatedTerms: ["scannability"],
    },
  ],
};

const C5: UxCategory = {
  id: "5",
  title: "アクセシビリティ",
  short: "代替テキスト・コントラスト・キーボード操作・方針明記（配点15）",
  description:
    "WCAG 2.2／JIS X 8341-3 の AA 準拠を目安に、多様な利用者が情報にアクセスできるかを評価する。代替テキスト、コントラスト比、テキスト拡大、キーボード操作、フォーカス可視化、アクセシビリティ方針の明記まで。",
  points: 15,
  items: [
    {
      id: "5-1",
      title: "知覚可能性（alt・コントラスト・拡大）",
      points: 8,
      judgeMethod: "external",
      criteria: "画像の代替テキスト、AA基準のコントラスト比（4.5:1）、フォントサイズ・テキスト拡大対応があるか。",
      background:
        "代替テキスト（1.1.1）、コントラスト比（1.4.3 AA）、テキスト拡大（1.4.4 AA）は、視覚に制約のある利用者に情報を届ける基本。スクショで一部確認できるが、正確にはツール併用が必要。",
      goodExample: "画像にalt、コントラスト比4.5:1以上、テキスト拡大に対応。",
      badExample: "画像altが無く、文字と背景のコントラストが不足。",
      relatedTerms: ["wcag", "jis-8341"],
    },
    {
      id: "5-2",
      title: "操作可能性（キーボード・フォーカス）",
      points: 4,
      judgeMethod: "external",
      criteria: "キーボード操作・フォーカス可視化、自動再生カルーセルの一時停止、音声自動再生の制御があるか。",
      background:
        "キーボード操作（2.1.1）とフォーカス可視化（2.4.7）は、マウスを使えない利用者に不可欠。自動再生の停止手段も操作の自由（ニールセン第3原則）に関わる。",
      goodExample: "キーボードで全操作でき、フォーカスが見え、カルーセルを停止できる。",
      badExample: "キーボードで操作できず、カルーセルが自動再生で止められない。",
      relatedTerms: ["wcag", "nielsen-heuristics"],
    },
    {
      id: "5-3",
      title: "アクセシビリティ方針の明記",
      points: 3,
      judgeMethod: "url",
      criteria: "アクセシビリティ方針とJIS/WCAG準拠状況が明記されているか。",
      background:
        "方針と準拠レベル（AA等）の明記は、アクセシビリティへの取り組み姿勢と到達度を示す。",
      goodExample: "アクセシビリティ方針でWCAG 2.2 AA準拠を明記。",
      badExample: "アクセシビリティに関する記載が一切ない。",
      relatedTerms: ["jis-8341", "wcag"],
    },
  ],
};

const C6: UxCategory = {
  id: "6",
  title: "モバイル対応・パフォーマンス",
  short: "レスポンシブ・タップターゲット・Core Web Vitals（配点10）",
  description:
    "モバイル体験と表示性能を評価する。レスポンシブデザイン、十分なタップターゲット、そして Core Web Vitals（LCP・INP・CLS）という定量的なユーザビリティ指標で、速く快適に使えるかを見る。",
  points: 10,
  items: [
    {
      id: "6-1",
      title: "レスポンシブ・タップターゲット",
      points: 5,
      judgeMethod: "screen",
      criteria: "レスポンシブ対応、タップターゲットの十分な大きさ・間隔、ハンバーガーメニュー等の配慮があるか。",
      background:
        "モバイル閲覧が主流。指で押しやすいタップターゲットと崩れないレイアウトは、モバイルでの基本的な使いやすさを左右する。",
      goodExample: "全デバイスで崩れず、ボタンが押しやすい大きさ・間隔。",
      badExample: "PC固定幅でスマホでは横スクロールが必要、ボタンが小さすぎる。",
      relatedTerms: ["responsive", "tap-target"],
    },
    {
      id: "6-2",
      title: "Core Web Vitals",
      points: 5,
      judgeMethod: "external",
      criteria: "LCP≤2.5秒／INP≤200ms／CLS≤0.1 を満たすか（外部計測が必要）。",
      background:
        "表示速度・応答性・レイアウト安定性は直帰率・回遊・CVに直結する定量指標。実ユーザーデータ（CrUX）で判定され、3指標すべてが良好でないと総合パスにならない。",
      goodExample: "LCP・INP・CLSの3指標すべてが良好圏内。",
      badExample: "LCPが4秒超、CLSが大きくレイアウトがガタつく。",
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
      criteria: "問い合わせ導線が明快で、フォームにエラー予防・分かりやすいエラーメッセージ・入力補助があるか。",
      background:
        "ニールセン第5原則『エラー予防』と第9原則『エラーからの回復支援』。入力補助や具体的なエラーメッセージが、フォーム離脱を防ぐ。",
      goodExample: "問い合わせ導線が明快で、入力補助とエラー箇所の具体的な指摘がある。",
      badExample: "問い合わせ先が探しにくく、送信後にまとめてエラーが出る。",
      relatedTerms: ["nielsen-heuristics", "error-prevention"],
    },
    {
      id: "7-2",
      title: "安全性・プライバシー・多言語",
      points: 5,
      judgeMethod: "url",
      criteria: "プライバシーポリシー・SSL暗号化・クッキー同意があり、必要に応じ多言語対応しているか。",
      background:
        "SSL暗号化とプライバシーポリシー、クッキー同意は信頼と法令対応の基本。グローバル企業では多言語対応も使いやすさに直結する。",
      goodExample: "全ページSSL、プライバシーポリシーとクッキー同意、多言語対応がある。",
      badExample: "SSL未対応、プライバシーポリシーやクッキー同意が見当たらない。",
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
    c.items.map((item) => ({ ...item, categoryId: c.id, categoryTitle: c.title }))
  );
}

export function getUxItem(
  id: string
): (UxCriteriaItem & { categoryId: UxCategoryId; categoryTitle: string }) | undefined {
  return uxAllItems().find((it) => it.id === id);
}

export function uxTotalPoints(): number {
  return uxCategories.reduce((sum, c) => sum + c.points, 0);
}
