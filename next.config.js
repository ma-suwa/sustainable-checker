/** @type {import('next').NextConfig} */
// 完全静的な情報サイト。バックエンドを持たないため常に static export。
// GitHub Pages のプロジェクトページ配信時は NEXT_PUBLIC_BASE_PATH="/<repo>" を指定する。
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
};

module.exports = nextConfig;
