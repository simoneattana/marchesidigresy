---
container:
  max: "1180px"     # larghezza massima del contenuto
  gutter: "6%"      # margine laterale
section:
  py: "var(--space-2xl)"   # padding verticale canonico delle sezioni (80px)
  gap: "var(--space-lg)"   # spazio tra elementi interni (40px)
  maxtext: "720px"         # larghezza massima dei paragrafi centrati
radius:
  button: "2px"
---

# Layout (token)

Griglia e ritmo verticale del sito. Questi token sono consumati da `global.css`.
La spiegazione completa delle **regole di layout** è in `docs/LAYOUT.md`.

- **`--container-max`** — larghezza massima del contenuto centrato.
- **`--section-py`** — respiro verticale canonico (deriva da `--space-2xl`).
- **`--section-maxtext`** — i paragrafi restano leggibili, centrati entro ~720px.
