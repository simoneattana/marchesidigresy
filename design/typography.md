---
# Adobe Fonts (Typekit) — kit fornito dal cliente, contiene lust-didone + proxima-nova
typekit: "iug5ckz"
font:
  display: '"lust-didone", Georgia, serif'          # nome tenuta nell'hero, anni timeline
  heading: '"Libre Baskerville", Georgia, serif'    # titoli di sezione (Google, gratis)
  body: '"proxima-nova", system-ui, sans-serif'     # testo corrente
fs:
  hero: "26px"
  h1: "61px"
  h2: "40px"
  kicker: "13px"
  body: "18px"
  small: "14px"
lh:
  h1: "70px"
  body: "1.7"
ls:
  h1: "-1px"
  hero: "2px"
  kicker: "3px"
# Libre Baskerville è ora SELF-HOSTED (src/styles/fonts.css + public/assets/fonts/): nessun font da Google.
# I due Adobe (lust-didone, proxima-nova) arrivano dal kit Typekit qui sopra.
google: []
---

# Tipografia

Font **identici all'originale**:

- **Titoli di sezione** → `Libre Baskerville` (self-hosted, licenza OFL — nessuna richiesta a Google).
- **Testo corrente** → `proxima-nova` (Adobe Fonts, dal kit `iug5ckz`).
- **Display / hero** → `lust-didone` (Adobe Fonts, dal kit `iug5ckz`).

Il kit Adobe è caricato automaticamente in `<head>` a partire dal campo `typekit` qui sopra.
Per usare un altro kit basta cambiare quell'ID. `lust-didone` ha solo il peso 400.
