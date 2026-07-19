import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { FindingArticle } from "@/components/FindingArticle";
import { findings, getFinding } from "@/lib/press/findings";

export function generateStaticParams() {
  return findings.map((f) => ({ id: f.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const f = getFinding(id);
  if (!f) return {};
  return { title: `${f.id}. ${f.title}`, description: f.lead };
}

// 通し読みページと同じ本文を表示するパーマリンク。共有リンクを壊さないために存続させる。
export default async function FindingPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const finding = getFinding(id);
  if (!finding) notFound();

  const index = findings.findIndex((f) => f.id === finding.id);
  const prev = findings[index - 1];
  const next = findings[index + 1];

  return (
    <>
      <Breadcrumb
        items={[
          { label: "ホーム", href: "/" },
          { label: "評価の傾向", href: "/press/" },
          { label: "特徴と対応策", href: "/press/findings/" },
          { label: finding.id },
        ]}
      />

      <div className="page-head">
        <span className="eyebrow">特徴 {finding.id}</span>
        <h1>{finding.title}</h1>
      </div>

      <FindingArticle finding={finding} standalone />

      <nav className="pager">
        {prev ? (
          <Link href={`/press/findings/${prev.id}/`}>← {prev.id} {prev.short}</Link>
        ) : (
          <span />
        )}
        {next ? (
          <Link href={`/press/findings/${next.id}/`}>{next.id} {next.short} →</Link>
        ) : (
          <span />
        )}
      </nav>

      <p className="criterion-permalink" style={{ marginTop: "1.5rem" }}>
        <Link href="/press/findings/">→ {findings.length}件をまとめて通し読みする</Link>
      </p>
    </>
  );
}
