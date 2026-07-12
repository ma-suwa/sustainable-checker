import type { IrCategory, IrCategoryId, IrCriteriaItem } from "./types";

// IRサイト評価ルーブリック（4カテゴリ・20項目・計100点）。
// カテゴリ配点はゴメス/BBSec準拠（使いやすさ30／財務・決算25／企業・経営25／積極性・先進性20）。
// 各項目の点・良い例・悪い例・判定手段は提供ルーブリックに基づく。

const C1: IrCategory = {
  id: "1",
  title: "使いやすさ・情報設計",
  short: "ナビ・検索・モバイル・アクセシビリティなど到達性の設計（配点30）",
  description:
    "どれだけ開示が充実していても、探せなければ読まれない。IRトップからの導線、ファーストビュー設計、サイト内検索、モバイル対応、アクセシビリティ、表示速度・技術品質まで、投資家が情報にたどり着ける体験を評価する。ゴメスで最も配点が重い（30%）領域。",
  points: 30,
  items: [
    {
      id: "1-1",
      title: "グローバルナビ／メニュー",
      points: 6,
      judgeMethod: "screen",
      criteria: "IRトップから主要ページへワンクリックで到達でき、論理的に分類されているか。",
      background:
        "IRサイトは決算・株式・ガバナンス・ESGなど情報が多岐にわたる。目的別に整理され、オンマウス展開などで下層まで見通せるナビは、回遊性と情報の網羅性の印象を左右する。オンマウスでのメニュー表示は上場企業の73.0%が採用（日興2025）。",
      goodExample: "目的別に整理され、オンマウスで下層メニューが一覧展開される。",
      badExample: "階層が深く、分類も不明瞭で目的の情報に届かない。",
      relatedTerms: ["ir-library"],
    },
    {
      id: "1-2",
      title: "ファーストビュー設計",
      points: 5,
      judgeMethod: "screen",
      criteria: "IRトップのファーストビューに株価・最新IR資料・IRニュースなど即時性の高い情報を配置しているか。",
      background:
        "上位サイトはIRトップの最上部に最新情報と主要資料を置き、下部にじっくり読むコンテンツを配置する。第一画面で「今」の情報が掴めるかが第一印象を決める。",
      goodExample: "株価・最新決算資料・IRニュースがファーストビューで一目で分かる。",
      badExample: "ファーストビューがPDFリンクの羅列で、即時性情報が埋もれている。",
      relatedTerms: [],
    },
    {
      id: "1-3",
      title: "サイト内検索・回遊",
      points: 5,
      judgeMethod: "url-screen",
      criteria: "サイト内検索機能・パンくず・関連リンクで情報を探し回遊できるか。",
      background:
        "目的の資料名が分かっている投資家には検索が最短路。パンくずや関連リンク、人気ページ導線があると、深い階層でも迷わず回遊できる。",
      goodExample: "全ページに検索窓、パンくず、関連・人気ページへの導線がある。",
      badExample: "検索機能がなく、深い階層で現在地も分からない。",
      relatedTerms: [],
    },
    {
      id: "1-4",
      title: "モバイル／レスポンシブ",
      points: 5,
      judgeMethod: "screen",
      criteria: "スマートフォンなど全デバイスで最適表示されるか。",
      background:
        "個人投資家を中心に閲覧の多くがモバイル。崩れる・固定幅のサイトは内容以前に読まれない。レスポンシブ対応は必須要件になりつつある。",
      goodExample: "スマホ・タブレット・PCで崩れず最適に表示される。",
      badExample: "PC専用の固定幅で、スマホでは横スクロールが必要。",
      relatedTerms: ["responsive"],
    },
    {
      id: "1-5",
      title: "アクセシビリティ",
      points: 4,
      judgeMethod: "url-screen",
      criteria: "十分なコントラスト、アクセシビリティ方針の明記など配慮があるか。",
      background:
        "多様な投資家に情報を届ける責任。近年は人間だけでなくAI・SEOツールからの可読性（アクセシビリティ）も国際的に重視される（英IR Societyが明文化）。",
      goodExample: "アクセシビリティ方針を掲載し、十分なコントラストを確保。",
      badExample: "低コントラストで読みづらく、方針の記載もない。",
      relatedTerms: ["accessibility"],
    },
    {
      id: "1-6",
      title: "表示速度・技術品質",
      points: 5,
      judgeMethod: "technical",
      criteria: "表示速度、XMLサイトマップ、テクニカルSEOなど技術基盤が整っているか。",
      background:
        "表示速度は離脱率とSEOに直結する。XMLサイトマップやテクニカルSEOの整備は、検索・AIからの発見可能性を高め、権威ある情報源としての位置づけを支える。",
      goodExample: "高速に表示され、XMLサイトマップ・テクニカルSEOが整備されている。",
      badExample: "ページが極端に重く、サイトマップも未整備。",
      relatedTerms: ["technical-seo"],
    },
  ],
};

const C2: IrCategory = {
  id: "2",
  title: "財務・決算情報の充実度",
  short: "決算資料・業績ハイライト・ヒストリカルデータ・説明会（配点25）",
  description:
    "投資判断の土台となる財務・決算情報の網羅性と使い勝手を評価する。決算短信・有報・説明会資料のアーカイブ、指標のグラフ化、経年・セグメントデータの加工可能な提供、説明会の動画・質疑応答、株式・株主還元情報まで。",
  points: 25,
  items: [
    {
      id: "2-1",
      title: "決算資料",
      points: 6,
      judgeMethod: "url",
      criteria: "決算短信・有価証券報告書・四半期・説明会資料が網羅され、アーカイブされているか。",
      background:
        "投資家は経年で資料を参照する。種別×年次で整理され過去分もアーカイブされていることが、分析の前提になる。四半期ごとの決算説明会資料の掲載は46.2%（日興2025）。",
      goodExample: "決算短信・有報・説明会資料を種別×年次で整理し過去分も揃う。",
      badExample: "最新期のみで過去資料が欠落している。",
      relatedTerms: ["kessan-tanshin", "yukashoken-hokokusho", "ir-library"],
    },
    {
      id: "2-2",
      title: "業績ハイライト",
      points: 5,
      judgeMethod: "screen",
      criteria: "主要業績がグラフ化され、ROE/ROIC/PBR等の主要指標が示されているか。",
      background:
        "数表の羅列より、経年グラフやチャートジェネレータの方が直感的に理解できる。資本コストや株価を意識した経営の要請を受け、ROE/ROIC/PBRの掲載が増えている。",
      goodExample: "チャートジェネレータで主要指標を経年グラフ化し、ROE/ROIC/PBRも掲載。",
      badExample: "テキストや表だけで、視覚化された業績ハイライトがない。",
      relatedTerms: ["chart-generator", "capital-cost"],
    },
    {
      id: "2-3",
      title: "ヒストリカルデータ",
      points: 5,
      judgeMethod: "url",
      criteria: "経年・セグメント別データがCSV/Excelで加工可能に提供されているか。",
      background:
        "機関投資家・アナリストは自らデータを加工する。過去10年分などのCSV/Excelダウンロードは、分析の手間を大きく減らし評価が高い。",
      goodExample: "過去10年・セグメント別データをCSV/Excelでダウンロードできる。",
      badExample: "PDFのみでダウンロード・加工ができない。",
      relatedTerms: [],
    },
    {
      id: "2-4",
      title: "説明会コンテンツ",
      points: 5,
      judgeMethod: "url",
      criteria: "決算説明会の動画・書き起こし・質疑応答が掲載されているか。",
      background:
        "説明会に参加できない投資家との公平性を担保する。動画・書き起こし・質疑応答まで揃えると理解が深まる。質疑応答の掲載はゴメスノミネート企業で73.8%（2025）。決算説明会の動画配信は43.8%（日興2025）。",
      goodExample: "説明会動画に加え、書き起こしと質疑応答まで掲載。",
      badExample: "説明会資料のPDFのみで、動画も質疑応答もない。",
      relatedTerms: [],
    },
    {
      id: "2-5",
      title: "株式・株主還元",
      points: 4,
      judgeMethod: "url",
      criteria: "株価情報、配当実績・方針、株主総会情報など株式関連情報があるか。",
      background:
        "配当方針・株主還元の基本方針は個人投資家の関心が高い。株価情報・株主総会情報とあわせ、株主目線の情報が揃っているかを見る。",
      goodExample: "配当実績・方針、株主優待、株主総会情報を明示。",
      badExample: "株式関連情報が乏しく、還元方針も分からない。",
      relatedTerms: [],
    },
  ],
};

const C3: IrCategory = {
  id: "3",
  title: "企業・経営情報の充実度",
  short: "経営戦略・事業説明・ガバナンス・ESG・ポリシー（配点25）",
  description:
    "「この会社に投資する意味」を伝える定性情報を評価する。トップメッセージと中期経営計画、事業モデルと強みの説明、役員・スキルマトリックス等のガバナンス、サステナビリティ/ESG、ディスクロージャーポリシー等の規約まで。",
  points: 25,
  items: [
    {
      id: "3-1",
      title: "経営方針・戦略",
      points: 6,
      judgeMethod: "url-screen",
      criteria: "トップメッセージ、中期経営計画、成長戦略が具体的に語られているか。",
      background:
        "エクイティストーリーの核。CEO/CFOメッセージのHTML化、中期経営計画・資本政策の説明は、経営の本気度と将来像を伝える。中期経営計画の説明会資料掲載は43.7%（日興2025）。",
      goodExample: "CEO/CFOメッセージをHTML化し、中期経営計画と成長戦略を明示。",
      badExample: "抽象的な方針が古いまま置かれ、戦略が読み取れない。",
      relatedTerms: ["equity-story", "capital-cost"],
    },
    {
      id: "3-2",
      title: "事業内容の説明",
      points: 5,
      judgeMethod: "screen",
      criteria: "事業モデル・強み・業界環境が分かりやすく説明されているか。",
      background:
        "特に個人投資家には「何をして稼いでいる会社か」を平易に伝える自己紹介型コンテンツが有効（例：数字で分かる◯◯）。図解の巧拙が理解度を左右する。",
      goodExample: "ビジネスモデルと強みを図解し、業界環境も併せて説明。",
      badExample: "事業の説明がなく、何をしている会社か分からない。",
      relatedTerms: ["equity-story"],
    },
    {
      id: "3-3",
      title: "ガバナンス",
      points: 5,
      judgeMethod: "url",
      criteria: "役員経歴、スキルマトリックス、コーポレートガバナンス報告書があるか。",
      background:
        "取締役会の実効性を示すスキルマトリックスの開示が広がっている。CG報告書へのリンクだけでなく、役員の経歴・専門性まで分かることが望ましい。",
      goodExample: "役員経歴とスキルマトリックスを掲載し、CG報告書も参照できる。",
      badExample: "CG報告書へのリンクのみで、役員の専門性が分からない。",
      relatedTerms: ["skill-matrix", "cg-code"],
    },
    {
      id: "3-4",
      title: "サステナビリティ／ESG",
      points: 5,
      judgeMethod: "url",
      criteria: "ESG方針・重要課題・定量データがあり、企業価値と結びついているか。",
      background:
        "ESGと企業価値の結びつきは投資家の関心事。E/S/Gが体系的に整理され、定量データまで提供されているかを見る（詳細な評価軸は本サイトのサステナビリティ編を参照）。",
      goodExample: "E/S/Gを体系整理し、重要課題・定量データを企業価値と接続。",
      badExample: "ESG情報が断片的で、企業価値との関係が示されない。",
      relatedTerms: ["materiality-ir", "integrated-report-ir"],
    },
    {
      id: "3-5",
      title: "規約・ポリシー",
      points: 4,
      judgeMethod: "url",
      criteria: "ディスクロージャーポリシー、免責事項、IRポリシーが整備されているか。",
      background:
        "FDルール（フェア・ディスクロージャー・ルール）への対応方針など、開示姿勢を示すポリシーの整備はガバナンスの成熟度を示す。",
      goodExample: "ディスクロージャーポリシーでFD対応方針まで明示している。",
      badExample: "免責事項のみで、開示方針が示されていない。",
      relatedTerms: ["fd-rule", "disclosure-policy"],
    },
  ],
};

const C4: IrCategory = {
  id: "4",
  title: "積極性・先進性",
  short: "英文開示・個人投資家向け・適時性・AIフレンドリー（配点20）",
  description:
    "一歩進んだ開示姿勢を評価する。英語による情報発信と日英公平性、個人投資家向けコンテンツ、適時性・更新の速さ、重要資料のHTML化などAI・検索への対応まで。プライム市場では英文開示が2025年4月に義務化され重要度を増している。",
  points: 20,
  items: [
    {
      id: "4-1",
      title: "英語による情報発信",
      points: 6,
      judgeMethod: "url",
      criteria: "英文IRサイトがあり、日英の情報量・タイミングが公平か。",
      background:
        "プライム市場は2025年4月から決算・適時開示情報の日英同時開示が義務化。海外投資家にとって英文開示の充実と日英公平性は必須要件になった。大和IRは日英5:5で統合評価する。",
      goodExample: "日英が同期し、決算・適時開示を同時に英語でも開示。",
      badExample: "英語版がない、または情報量・更新が大幅に劣る。",
      relatedTerms: ["prime-english"],
    },
    {
      id: "4-2",
      title: "個人投資家向け",
      points: 5,
      judgeMethod: "url-screen",
      criteria: "自己紹介型コンテンツ、用語集、FAQ、動画など個人投資家向けの工夫があるか。",
      background:
        "個人投資家向けには「何をしている会社か」を平易に伝える入口と、用語集・FAQ・動画が有効。機関投資家向けの加工可能データとは別導線で用意する企業が増えている。",
      goodExample: "『数字でわかる◯◯』等の入口に用語集・FAQ・動画を用意。",
      badExample: "個人投資家向けの平易なコンテンツがない。",
      relatedTerms: [],
    },
    {
      id: "4-3",
      title: "適時性・更新",
      points: 5,
      judgeMethod: "url",
      criteria: "決算の即時反映、IRカレンダー、メール配信登録など適時性の仕組みがあるか。",
      background:
        "適時開示制度・FDルールの下、発表と同時のサイト反映が求められる。IRカレンダーやメール配信は、投資家が情報を取り逃さない仕組みとして機能する。",
      goodExample: "発表と同時にサイト反映し、IRカレンダーとメール配信を提供。",
      badExample: "更新が遅れ、開示とサイトのタイムラグが大きい。",
      relatedTerms: ["timely-disclosure"],
    },
    {
      id: "4-4",
      title: "AIフレンドリー／先進機能",
      points: 4,
      judgeMethod: "url-screen",
      criteria: "重要資料のHTML化、SNS、双方向など先進的な情報発信があるか。",
      background:
        "統合報告書や中期経営計画をPDFだけでなくHTML/LP化すると、AIや検索での読み取り可能性が高まる。図を画像貼付だけにするとAI・検索非対応になる点をゴメスが2025年に明示的に指摘している。",
      goodExample: "統合報告書・中計をHTML化し、SNSや双方向の仕組みも備える。",
      badExample: "重要資料がPDFのみ、図表も画像貼付でAI・検索非対応。",
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

export function irTotalPoints(): number {
  return irCategories.reduce((sum, c) => sum + c.points, 0);
}
