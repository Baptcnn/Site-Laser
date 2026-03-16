#!/bin/bash
set -euo pipefail

# Only run in remote Claude Code on the web environment
if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

# Site Laser — pure static HTML/CSS/JS, no build tools required.
# Verify npx serve is available for local preview if needed.
if ! command -v npx &> /dev/null; then
  npm install -g serve 2>/dev/null || true
fi

echo "Session start hook completed — static site, no dependencies to install."
