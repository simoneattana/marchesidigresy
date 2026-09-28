# Sistema di layout — riferimento canonico

Derivato dal layout della **home page**. Vale per **tutte** le pagine del sito.
Obiettivo: spaziature e ritmo verticale sempre coerenti, mai "a occhio".

## 1. Dove vivono le regole
- **Token del design system** → `design/*.md` → generano `src/styles/tokens.generated.css` con `npm run tokens`.
- **Stili base + componenti** → `src/styles/global.css` (usano **solo** i token).
- **Contenuti** → `content/*.md`.

> Regola: nei componenti niente numeri sciolti. Solo `var(--...)`.

## 2. Scala di spaziatura (unica fonte — `design/spacing.md`)
`--space-2xs 8` · `--space-xs 12` · `--space-sm 16` · `--space-md 24` · `--space-lg 40` · `--space-xl 64` · `--space-2xl 80` · `--space-3xl 112`

> **Regola d'oro:** ogni `margin`, `padding` e `gap` usa **un gradino** della scala.
> `--edge-min` (40px) = distanza minima garantita tra un contenuto e il bordo della sua fascia. Vieta il caso "testo attaccato al bordo".

## 3. Ritmo verticale — anatomia canonica di una sezione
Ogni sezione segue **sempre** quest'ordine:
```
┌ padding-top: --section-py (80px desktop)
│   titolo         → margin-bottom: --space-lg
│   media          → margin-bottom: --space-lg
│   testo (.prose, max --section-maxtext 720px, centrato)
│   CTA            → margin-top: --space-lg
└ padding-bottom: --section-py
```
Nessuna sezione senza padding verticale. Tra due sezioni il respiro è la somma dei due `--section-py`.

## 4. Contenitore e margini laterali
`--container-max 1180px`, centrato · `--container-gutter 6%` (min 20 / max 80px).
Nessun contenuto a filo orizzontale: il gutter è invalicabile.

## 5. Fasce a fondo pieno (hero, footer, band loghi)
- Padding verticale interno **≥ `--space-2xl`** (80px).
- L'ultimo elemento della fascia ha **sempre ≥ `--space-2xl`** dal bordo inferiore (regola anti-"attaccato al bordo", vedi footer).

## 6. Responsive — FONDAMENTALE
Breakpoint identici all'originale: **991 / 767 / 479px** (`design/responsive.md`).
- Tipografia e `--section-py` scalano ai breakpoint (override MD → `@media` reali).
- Griglie multi-colonna collassano: **4→2** (≤991) **→1** (≤767).
- **Verifica obbligatoria a 375 / 768 / 1024 / 1440px** su ogni pagina prima di mostrarla.
- Immagini sempre `width:100%; height:auto`. Target tattili ≥ 44px. `prefers-reduced-motion` rispettato.

## 7. Componenti condivisi (inventario — si riusano su tutte le pagine)
| Componente | File | Ruolo |
|---|---|---|
| Hero | `src/components/Hero.astro` | fascia video/immagine + logo · **home = 100vh**, **pagine interne (`.hero--page`) = 600px desktop / 350px ≤991px**, titolo in basso |
| Nav overlay | `src/components/Nav.astro` | menu popup (ITA/ENG, voci, chiudi) |
| FeatureSection | `src/components/FeatureSection.astro` | titolo + media + testo + CTA |
| Footer | `src/components/Footer.astro` | 4 colonne + dati + social + band loghi |

Le varianti si fanno con **props + token**, non con CSS nuovo sciolto.

## 8. Ordine di lavoro di una pagina (loop)
1. **Recon** dell'originale (crawl: struttura, testi, asset, stili, breakpoint).
2. **Contenuto** in `content/<pagina>.md`.
3. **Composizione** con i componenti condivisi (nuovi solo se serve, sempre token-driven).
4. **Self-review** (`/design-review`) + verifica responsive ai 4 breakpoint.
5. **Te la mostro** → tue correzioni → ok → pagina successiva.
