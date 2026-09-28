---
# Scala di spaziatura canonica — l'UNICA fonte per margini, padding, gap.
# Nessun valore "a occhio" nei componenti: si usa sempre un gradino di questa scala.
space:
  2xs: "8px"
  xs: "12px"
  sm: "16px"
  md: "24px"
  lg: "40px"
  xl: "64px"
  2xl: "80px"
  3xl: "112px"
# Ritmo verticale: distanza minima che un contenuto deve avere dal bordo di una fascia/sezione.
edge:
  min: "40px"   # nessun elemento può stare più vicino di così a un bordo di sezione
---

# Spaziatura

Scala a gradini fissi (`--space-2xs` … `--space-3xl`). Regola d'oro:

> **Ogni margine, padding o gap usa un gradino della scala.** Mai numeri sciolti.

`--edge-min` (40px) è la distanza minima garantita tra un contenuto e il bordo
della sua sezione: serve a impedire il caso "testo attaccato al bordo".
Vedi le regole complete in [[layout]] e nel documento `design/LAYOUT.md`.
