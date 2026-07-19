import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand">
          <span className="leaf">🌐</span> 開示サイト評価ガイド
        </Link>
        <nav className="nav">
          <Link href="/">ホーム</Link>
          <Link href="/sustainability/">サステナビリティ</Link>
          <Link href="/ir/">IRサイト</Link>
          <Link href="/usability/">ユーザビリティ</Link>
          <Link href="/press/">評価の傾向</Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
