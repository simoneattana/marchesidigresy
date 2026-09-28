# Roadmap — porting marchesidigresy.com

## Stack & principi
- **Astro statico** + design system in Markdown (`design/`) + contenuti Markdown (`content/`).
- **Claude = CMS**: i contenuti si cambiano chiedendoli, non con un pannello.
- Regole di layout: vedi `docs/LAYOUT.md`. Deploy target: **RunCloud** (nginx + PHP-FPM) — vedi
  [docs/DEPLOY-RUNCLOUD.md](docs/DEPLOY-RUNCLOUD.md). Form via `contact.php`+SendGrid; redirect via nginx.
  (La variante Cloudflare Pages è archiviata in `deploy/cloudflare/`.) Deploy = gate separato.
- **Responsive è un requisito, non un extra**: ogni pagina verificata a 375 / 768 / 1024 / 1440px.

## Stato
- ✅ **Home** (hero solo-logo, menu overlay, footer 4 colonne + band loghi)
- ✅ Design system: token colori/tipografia/spaziatura/layout/motion/responsive
- ✅ Font originali (Adobe kit `iug5ckz`: lust-didone + proxima-nova; Libre Baskerville)
- ✅ Regole di layout canoniche (`docs/LAYOUT.md`)
- ✅ **Architettura condivisa**: `content/site.md` (menu+footer) + `src/layouts/Page.astro` (template pagina interna, ogni pagina = 3 righe)
- ✅ **Sostenibilità** · **Wine Resort** · **Le Tenute** · **Martinenga** (approvate)
- ✅ **Monte Aribaldo** · **La Serra** · **Monte Colombo** — tutte con **mappa interattiva** propria (in tua revisione)
- ✅ Componenti riutilizzabili: `VineyardMap`, `OtherEstates`, `EstateCard`, `WineCatalog`; template `EstateDetail`, `Page`
- ✅ **I Vini** — catalogo 7 categorie, 23 vini; **bottiglie cliccabili → schede vino**
- ✅ **Schede vino** `/vini/<slug>` (19 IT + 19 EN) — porting delle pagine di produzione: bottiglia,
  annate (PDF), scheda tecnica (PDF), immagine hi-res. Asset **self-hostati** in `public/assets/wines/`
  (~61 MB). Dati in `src/data/wines.js`, template `src/layouts/WineDetail.astro`.
- ✅ **Parità URL con produzione** — `trailingSlash: never` + `build.format: file` → URL identici agli
  indicizzati (`/contatti`, non `/contatti/`). Redirect 301 legacy in `public/_redirects`
  (`/agriturismo`→`/wine-resort`, `/diary`→`/`, `/news/*`→`/`, `/about`→`/`).
- ✅ **Contatti** — 2 schede contatto + modulo (in tua revisione). Escluse le sezioni
  nascoste in produzione (`display:none`): "Scrivi ai nostri esperti", "Around the World".
  ⚠️ Backend = **SendGrid** (Cloudflare Function `functions/api/contact.js`, replica notifica Webflow).
  Logica pronta; invio **attivato al deploy** (chiave SendGrid + mittente verificato). Vedi docs/FORM-EMAIL.md.
- ✅ **Cookie Policy** — pagina self-hosted + **banner accetta/rifiuta** site-wide; **Iubenda eliminata**.
- ❌ **Diary** — scartata: contenuto abbandonato del 2015, fuori menu, non collegata (non pubblicata di fatto).

## Struttura del sito
| Pagina | URL | Sezioni / ancore | Complessità |
|---|---|---|---|
| Home | `/` | hero · intro · Le Tenute · Filosofia · I Vini | ✅ fatta |
| Le Tenute (panoramica) | `/letenute` | 4 card tenute (illustrazione + Read More→dettaglio) | ✅ in revisione |
| — Martinenga (dettaglio) | `/martinenga` | **mappa interattiva** delle 9 particelle | ✅ in revisione |
| — Monte Aribaldo (dettaglio) | `/monte-aribaldo` | mappa interattiva (3 particelle) | ✅ in revisione |
| — La Serra (dettaglio) | `/la-serra` | mappa interattiva (3 particelle) | ✅ in revisione |
| — Monte Colombo (dettaglio) | `/monte-colombo` | mappa interattiva (2 particelle) | ✅ in revisione |
| I Vini | `/i-vini` | 7 categorie · 23 vini (titolo navy + bottiglie) | ✅ in revisione |
| About / Filosofia | `/about` | **redirect → home** (come produzione; niente contenuto proprio, niente timeline) | ✅ |
| Sostenibilità | `/sostenibilita` | contenuto editoriale | bassa |
| Wine Resort | `/wine-resort` | contenuto editoriale | bassa |
| Contatti | `/contatti` | 2 schede (Martinenga · Dai Gresy in Langa) + **form** | ✅ in revisione — *backend form da scegliere* |
| ~~Diary~~ | ~~`/diary`~~ | **eliminata** — contenuto morto 2015, fuori menu, non collegata | ❌ scartata |
| Cookie Policy | `/cookiepolicy` | testo legale self-hosted + **banner accetta/rifiuta** (Iubenda rimossa) | ✅ in revisione |

**Esterno — resta attivo, non si tocca:** WineAround (`marchesidigresy.winearound.com`) → prenotazioni/schede vini via link.

## Elementi trasversali (da pianificare quando toccano una pagina)
- **i18n IT/EN** — ✅ **fatto**. Architettura **prefisso `/en/`**. Base: loader lang-aware,
  `src/lib/i18n.js` (path/toggle/`localizeHref`/`EN_AVAILABLE`), `hreflang`+`canonical`, toggle ITA/ENG,
  chrome bilingue (menu, footer, banner cookie, mappa vigneti, form). **11 pagine EN** sotto `/en/`,
  **fedeli allo stato parziale** della produzione (IT dove online resta IT). Contenuti in `content/en/*.md`.
  - Note/semplificazioni da rifinire: mappe tenute EN → **nomi particella restano in italiano** (etichette
    card tradotte); select "Stato" del form EN usa la **lista paesi in italiano** (placeholder EN).
    Cookie Policy EN è traduzione nostra (far validare dal legale).
- **Form contatti** — UI + validazione + honeypot pronti. Backend = **SendGrid** via Cloudflare Pages
  Function `functions/api/contact.js` (replica la notifica Webflow: To `hello@marchesidigresy.com`,
  oggetto, corpo Form/Site/Submitted content). ⏸️ **Invio inattivo** finché non si configura SendGrid al
  deploy (secret `SENDGRID_API_KEY` + mittente verificato + `endpoint: "/api/contact"`). Vedi
  [docs/FORM-EMAIL.md](docs/FORM-EMAIL.md).
- ~~**Cookie/consent**~~ — ✅ fatto: pagina `/cookiepolicy` self-hosted + banner accetta/rifiuta (`CookieBanner.astro`, scelta in localStorage). **Iubenda eliminata del tutto.**
- **Mappa tenute** e **timeline storia** — componenti interattivi da rifare puliti.
- **SEO** — title/description/OG per pagina, sitemap, redirect legacy.

## Ordine di costruzione (consigliato)
0. ✅ Home + design system + regole di layout.
1. **Template pagina interna** — lo fisso con una pagina semplice. *Consiglio: `Sostenibilità` o `Wine Resort`* (validano struttura + responsive in fretta).
2. `Le Tenute` (+ mappa interattiva).
3. `I Vini` (catalogo per categorie).
4. `About / Filosofia` (+ timeline storica).
5. `Contatti` (+ form backend).
6. `Diary`, `Cookie Policy`.
7. **i18n EN** su tutte le pagine.
8. **QA responsive completo** + `/review` + `/qa`.
9. **Deploy** su RunCloud (nginx + PHP): staging → go-live DNS + SendGrid + stacco Webflow (gate: solo su tuo ok).

## Processo per pagina (loop concordato)
```
Recon originale → contenuto in content/<pagina>.md → composizione con componenti condivisi
→ self-review + verifica responsive (375/768/1024/1440) → TE LA MOSTRO
→ tue correzioni → ok → pagina successiva
```
Una pagina si dichiara "fatta" solo dopo il tuo ok.
