#!/usr/bin/env bash
# Build a fully static export for GitHub Pages.
# The whole site is static (output: "export"), so this is just a plain build.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

# NEXT_PUBLIC_BASE_PATH should be "/<repo>" for GitHub project pages.
npx next build

# Disable Jekyll so the _next/ directory is served on GitHub Pages.
touch out/.nojekyll

echo "Static export written to ./out (basePath='${NEXT_PUBLIC_BASE_PATH:-}')"
