import Link from "next/link";
import { categories } from "@/lib/content/criteria";
import { irCategories } from "@/lib/ir/criteria";
import { uxCategories } from "@/lib/usability/criteria";

export default function Hub() {
  return (
    <>
      <div className="page-head">
        <span className="eyebrow">企業サイト評価ガイド</span>
        <h1>企業サイトは、何をもって「良い」とされるのか。</h1>
        <p className="lead">
          企業のコーポレートサイトを評価する3つの領域——「サステナビリティ／ESG開示」「IR（投資家向け情報）」「ユーザビリティ（使いやすさ）」——について、
          評価機関が用いる評価軸を、良い例・悪い例・出典とともに体系的に解説します。
        </p>
      </div>

      <div className="grid">
        <Link href="/sustainability/" className="link-card">
          <h3>🌱 サステナビリティ開示ガイド</h3>
          <p>
            使いやすさ・ESG戦略・環境・社会・ガバナンス・独自性の
            {categories.length}カテゴリで、サステナビリティ開示サイトの評価基準を解説。
          </p>
          <div className="card-meta">
            <span>三層ルーブリック（ゴメス／トライベック／JSBI）</span>
          </div>
        </Link>

        <Link href="/ir/" className="link-card">
          <h3>📈 IRサイト評価ガイド</h3>
          <p>
            使いやすさ・財務決算・企業経営・積極性の{irCategories.length}カテゴリで、
            IRサイトの評価軸を解説。主要評価機関の比較も。
          </p>
          <div className="card-meta">
            <span>ゴメス配点準拠（30/25/25/20）＋日興・大和</span>
          </div>
        </Link>

        <Link href="/usability/" className="link-card">
          <h3>🖱 ユーザビリティ評価ガイド</h3>
          <p>
            トップ明快性・ナビ・検索性・アクセシビリティ・パフォーマンスなど{uxCategories.length}カテゴリで、
            サイトの使いやすさの評価軸を解説。
          </p>
          <div className="card-meta">
            <span>トライベック5軸＋ニールセン10原則＋WCAG/CWV</span>
          </div>
        </Link>
      </div>

      <p className="lead" style={{ marginTop: "1.5rem", fontSize: "0.88rem" }}>
        いずれも「情報の網羅性」「探しやすさ・使いやすさ」を共通軸としつつ、
        対象読者と評価観点が異なります。関心のある領域から選んでください。
      </p>
    </>
  );
}
