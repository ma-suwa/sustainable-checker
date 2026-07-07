import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SustainableChecker — サステナビリティ・サイト自動診断",
  description:
    "コーポレートサイトのURLを入力すると、ESG/サステナビリティ開示ページの良い点・悪い点を自動診断します（Phase1: A/B/E）。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
