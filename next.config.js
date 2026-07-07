/** @type {import('next').NextConfig} */
const isStatic = process.env.STATIC_EXPORT === "1";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig = {
  // Playwright / jsdom are heavy Node-only deps; keep them external to the server bundle.
  serverExternalPackages: ["playwright", "jsdom", "@mozilla/readability"],
  // Static export for the GitHub Pages demo (no backend). basePath = "/<repo>".
  ...(isStatic
    ? {
        output: "export",
        basePath,
        images: { unoptimized: true },
        trailingSlash: true,
      }
    : {}),
};

module.exports = nextConfig;
