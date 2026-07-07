#!/usr/bin/env bash
# Build a static export for GitHub Pages (demo mode, no backend).
# The POST API route is incompatible with `output: export`, so we temporarily
# move it aside during the build and restore it afterwards.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

API_DIR="app/api"
API_BAK=".api-bak"

restore() {
  if [ -d "$API_BAK" ]; then
    rm -rf "$API_DIR"
    mv "$API_BAK" "$API_DIR"
  fi
}
trap restore EXIT

if [ -d "$API_DIR" ]; then
  rm -rf "$API_BAK"
  mv "$API_DIR" "$API_BAK"
fi

# NEXT_PUBLIC_BASE_PATH should be "/<repo>" for GitHub project pages.
STATIC_EXPORT=1 NEXT_PUBLIC_DEMO=1 npx next build

# Disable Jekyll so the _next/ directory is served on GitHub Pages.
touch out/.nojekyll

echo "Static export written to ./out (basePath='${NEXT_PUBLIC_BASE_PATH:-}')"
