#!/bin/bash
# ─────────────────────────────────────────────────────────────
#  Marchesi di Grésy — SITO NUOVO (Astro) → online su mdg.serversite.it
#  Doppio clic per vedere nel browser la versione ATTUALE del sito nuovo,
#  con le ultime modifiche (lo rigenera e lo apre in locale).
# ─────────────────────────────────────────────────────────────
cd "$(dirname "$0")" || exit 1
clear
echo "════════════════════════════════════════════════"
echo "   Marchesi di Grésy — SITO NUOVO (mdg.serversite.it)"
echo "════════════════════════════════════════════════"
echo ""

# Prima configurazione: installa le dipendenze se mancano (una volta sola)
if [ ! -d node_modules ]; then
  echo "▸ Prima configurazione: installo le dipendenze (solo la prima volta)…"
  npm install || { echo ""; echo "⚠️  Errore nell'installazione. Premi Invio per chiudere."; read -r; exit 1; }
  echo ""
fi

echo "▸ Genero la versione attuale del sito…"
npm run build || { echo ""; echo "⚠️  Errore nella build. Premi Invio per chiudere."; read -r; exit 1; }
echo ""
echo "✅ Sito pronto. Apro il browser tra un istante…"
echo ""
echo "   ┌────────────────────────────────────────────┐"
echo "   │  Per CHIUDERE il sito: chiudi questa         │"
echo "   │  finestra del Terminale (⌘Q o la X rossa).   │"
echo "   └────────────────────────────────────────────┘"
echo ""

npm run preview -- --port 4331 --open
