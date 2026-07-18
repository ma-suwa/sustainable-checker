import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";
import { SiteHeader } from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: {
    default: "開示サイト評価ガイド — サステナビリティ／IRサイトの評価基準",
    template: "%s | 開示サイト評価ガイド",
  },
  description:
    "企業のサステナビリティ開示サイトとIRサイトを評価する基準・評価軸を、カテゴリ別に網羅的に解説する情報サイト。良い例・悪い例・出典、主要評価機関の比較をまとめています。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        {/*
          描画前に保存済みテーマを適用する。CSSより先に属性を付けないと、
          OSがダークでライト指定の人に一瞬ダークが見える（フラッシュ）。
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;}}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <SiteHeader />
        <main className="container">{children}</main>
        <footer className="site-footer">
          <p>
            開示サイト評価ガイド — サステナビリティ／IRサイト評価基準の情報サイト。
            <br />
            出典・免責は各領域の「評価の枠組み」ページ（
            <Link href="/sustainability/about/">サステナ</Link> ／{" "}
            <Link href="/ir/about/">IR</Link> ／{" "}
            <Link href="/usability/about/">ユーザビリティ</Link>）を参照。
          </p>
        </footer>
      </body>
    </html>
  );
}
