#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# vault-setup.sh
# Run from your portfolio /src directory:
#   bash vault-setup.sh
# ─────────────────────────────────────────────────────────────────────────────

set -e

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

log()  { echo -e "${GREEN}[vault]${NC} $1"; }
warn() { echo -e "${YELLOW}[warn]${NC}  $1"; }
fail() { echo -e "${RED}[error]${NC} $1"; exit 1; }

# ── Sanity check — must be run from /src ─────────────────────────────────────
[[ -d "./components" && -d "./data" ]] \
  || fail "Run this from your portfolio /src directory. Could not find ./components or ./data"

# ── 1. Copy VaultSection.tsx ─────────────────────────────────────────────────
DEST="./components/VaultSection.tsx"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SRC_FILE="$SCRIPT_DIR/VaultSection.tsx"

[[ -f "$SRC_FILE" ]] || fail "VaultSection.tsx not found next to this script at: $SRC_FILE"

cp "$SRC_FILE" "$DEST"
log "Copied VaultSection.tsx → $DEST"

# ── 2. Patch HomeContent.tsx ──────────────────────────────────────────────────
HOME="./components/HomeContent.tsx"

[[ -f "$HOME" ]] || { warn "HomeContent.tsx not found — skipping auto-patch. Add manually (see below)."; SKIP_PATCH=1; }

if [[ -z "$SKIP_PATCH" ]]; then

  # Check if import already exists
  if grep -q "VaultSection" "$HOME"; then
    warn "VaultSection already imported in HomeContent.tsx — skipping patch"
  else
    # Add import after the last existing import line
    # Works on both macOS (BSD sed) and Linux (GNU sed)
    if [[ "$OSTYPE" == "darwin"* ]]; then
      sed -i '' "/^import/!b; /^import/{ h; d }; x; /^import/{ G; p; d }" "$HOME" 2>/dev/null || true
      # Simpler fallback for macOS
      LAST_IMPORT=$(grep -n "^import" "$HOME" | tail -1 | cut -d: -f1)
      sed -i '' "${LAST_IMPORT}a\\
import { VaultSection } from '@/components/VaultSection'
" "$HOME"
    else
      LAST_IMPORT=$(grep -n "^import" "$HOME" | tail -1 | cut -d: -f1)
      sed -i "${LAST_IMPORT}a import { VaultSection } from '@/components/VaultSection'" "$HOME"
    fi
    log "Added import to HomeContent.tsx"

    # Insert <VaultSection /> before <FooterCredits />
    if grep -q "FooterCredits" "$HOME"; then
      if [[ "$OSTYPE" == "darwin"* ]]; then
        sed -i '' 's|<FooterCredits|<VaultSection />\n      <FooterCredits|' "$HOME"
      else
        sed -i 's|<FooterCredits|<VaultSection />\n      <FooterCredits|' "$HOME"
      fi
      log "Inserted <VaultSection /> before <FooterCredits /> in HomeContent.tsx"
    else
      warn "Could not find <FooterCredits /> in HomeContent.tsx"
      warn "Add this manually before your footer:"
      warn "  <VaultSection />"
    fi
  fi
fi

# ── 3. Summary ────────────────────────────────────────────────────────────────
echo ""
echo -e "${GREEN}Done.${NC}"
echo ""
echo "  Files changed:"
echo "    + src/components/VaultSection.tsx  (new)"
[[ -z "$SKIP_PATCH" ]] && echo "    ~ src/components/HomeContent.tsx   (patched)"
echo ""
echo "  What you will see in portfolio:"
echo "    • A new 'Neural Vault' section above the footer"
echo "    • macOS-style window with your real folder tree from GitHub"
echo "    • Live note count + recent notes that open in neuralvaults.vercel.app"
echo "    • Auto-updates on every git push to your Quartz repo — no redeploy needed"
echo ""
echo "  If the section looks wrong, check:"
echo "    1. Your Quartz repo is public (github.com/obiwankenobi699/Quartz)"
echo "    2. Notes are inside /content folder (confirmed from your ls output)"
echo "    3. Run: npm run dev  and visit the page"
echo ""