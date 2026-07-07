"use client";

import { useState } from "react";
import type { DiagnosisResult } from "@/lib/types";
import { ScoreCard } from "@/components/ScoreCard";
import { sampleResult } from "@/lib/sampleResult";

// Static GitHub Pages build has no backend; run in demo mode with a bundled sample.
const DEMO = process.env.NEXT_PUBLIC_DEMO === "1";

export default function Home() {
  const [url, setUrl] = useState(DEMO ? "https://www.kewpie.com/" : "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<DiagnosisResult | null>(null);

  async function runDiagnosis(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    if (DEMO) {
      // No backend on GitHub Pages: show the bundled sample result.
      setError(null);
      setResult(sampleResult);
      return;
    }
    if (!url.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "診断に失敗しました。");
      } else {
        setResult(data as DiagnosisResult);
      }
    } catch {
      setError("ネットワークエラーが発生しました。");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container">
      <div className="header">
        <h1>🌱 SustainableChecker</h1>
        <p>
          コーポレートサイトのURLを入力すると、サステナビリティ／ESG開示ページの良い点・悪い点を自動診断します。
          （Phase1: A. 使いやすさ / B. ESG共通・戦略 / E. ガバナンス = 70点満点）
        </p>
      </div>

      {DEMO && (
        <div className="error" style={{ background: "var(--accent-weak)", color: "var(--text)", borderColor: "var(--accent)" }}>
          🔎 これは静的デモ版です（GitHub Pages）。バックエンドが無いため任意URLのライブ診断はできません。
          「サンプルを表示」を押すと実測クロール由来のサンプル結果を表示します。
          任意URLで診断するにはローカルで <code>npm run dev</code> を実行してください。
        </div>
      )}

      <form className="form" onSubmit={runDiagnosis}>
        <input
          type="text"
          placeholder="https://www.example.co.jp"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading || DEMO}
        />
        <button type="submit" disabled={loading}>
          {loading && <span className="spinner" />}
          {DEMO ? "サンプルを表示" : loading ? "診断中…" : "診断する"}
        </button>
      </form>

      {loading && (
        <p className="loading-note">
          サイトをクロールしてClaudeで採点しています。ページ数により30秒〜1分ほどかかります。
        </p>
      )}
      {error && <div className="error">{error}</div>}
      {result && <ScoreCard result={result} />}
    </main>
  );
}
