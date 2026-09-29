# AGENTS.md — Marchesi di Grésy (marchesidigresy.com)

Regole stabili del progetto. Lo stato del lavoro è in `HANDOFF.md`: leggilo subito dopo questo file.

## Progetto
Sito della tenuta vinicola **Tenute Cisa Asinari dei Marchesi di Grésy**, portato da Webflow a un sito **statico Astro** self-hosted su RunCloud (per eliminare il canone Webflow). Bilingue IT/EN. Claude fa da CMS via Markdown. **In produzione dal 29/09/2026.**

## Stack
- **Astro ^5** — sito statico, `trailingSlash: 'never'`, `build.format: 'file'`, canonical `https://www.marchesidigresy.com`.
- Contenuti in **Markdown** (`content/`), letti con `gray-matter`. Design token generati da `scripts/build-tokens.mjs` (gira in `predev`/`prebuild`).
- Font: **Adobe Typekit** (kit `iug5ckz`) esterno. Tutto il resto (≈950 immagini/video/font) self-hosted in `public/assets/`.
- Hosting: **RunCloud** (VPS Contabo `45.141.22.157`, web app `mdg`, stack "Native NGINX + Custom config", PHP 8.3). Modulo contatti: `public/contact.php` → SendGrid.
- DNS/dominio su **Aruba**. Posta del dominio su **Google Workspace**.

## Comandi
- Installazione: `npm install`
- Sviluppo: `npm run dev`
- Build: `npm run build` (output in `dist/`)
- Preview build: `npm run preview`
- Test: nessuna suite.

## Struttura
- `content/` — contenuti Markdown IT; `content/en/` — versioni EN. **Qui si edita il sito** (Claude come CMS).
- `src/pages/` — route Astro; `src/components/` — Nav, WineCatalog, VineyardMap, ecc.; `src/layouts/`; `src/styles/global.css`; `src/lib/i18n.js`.
- `public/` — asset statici + `contact.php` (backend form). `public/assets/` — immagini/video/font.
- `scripts/build-tokens.mjs` — genera i design token prima di dev/build.
- `deploy/` — config e note deploy (nginx, runbook). `docs/` — `FORM-EMAIL.md`, `GO-LIVE.md`.

## Deploy
- Il sito live gira dal branch **`deploy`** (build `dist/` committata a root; niente Node sul server).
- Pipeline: build locale → sync in `/tmp/mdg-deploy` (repo standalone branch `deploy`, remote = GitHub) → `git push origin deploy` → RunCloud pulla via webhook + Deployment Script (`git fetch` + `git reset --hard origin/deploy`).
- Webhook deploy: POST (Content-Type `application/json`) all'URL in RunCloud → mdg → Git → Webhook URL.
- **URL puliti** via config nginx standalone (Type `location.main-before`): `location ~ ^/[^.]*$ { try_files $uri $uri.html $uri/ =404; }`. Non usare `location /` (duplicherebbe).

## Convenzioni
- Commit: Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, `chore:`, `wip:`).
- Versioni: SemVer con tag `vX.Y.Z`. Modifiche in `CHANGELOG.md`.
- Branch: `main` sempre funzionante (sorgente); `deploy` = output buildato che serve il sito. **Non fare push senza ok dell'utente.**
- Segreti: mai nel repo. La API key SendGrid sta solo sul server (nginx `fastcgi_param SENDGRID_API_KEY`), letta da `contact.php` via `$_SERVER`.
- Fedeltà: il sito deve avere le **stesse identiche immagini** della produzione Webflow (il cliente può contestarlo). Snapshot di confronto in `../marchesidigresy-webflow-snapshot/`.

## Da non toccare
- `public/assets/` — asset byte-identici alla produzione; non rigenerare/ricomprimere.
- Mappe vigne (`public/assets/img/*-map.png`) e posizioni punti (`content/*.md`): calibrate sulla produzione a **1180px**.
- Config nginx di produzione e DNS Aruba: operazioni **gate**, si toccano solo con ok esplicito dell'utente.

## Flusso di lavoro
- All'inizio: leggi `AGENTS.md` e `HANDOFF.md`, verifica con `git log`/`git status`.
- Alla fine: aggiorna `HANDOFF.md` e `CHANGELOG.md`, poi commit.
- **Gate (stop e chiedi):** cambio stack/architettura, deploy, DNS, email reali, chiavi live, push su branch condivisi, cancellazioni, e prima di dichiarare finito qualcosa che il cliente vede.
