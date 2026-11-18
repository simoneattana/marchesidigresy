# Changelog

Tutte le modifiche rilevanti a questo progetto sono documentate qui.
Formato: [Keep a Changelog](https://keepachangelog.com/it/1.1.0/); versioni [SemVer](https://semver.org/lang/it/).

## [Unreleased]

### Added
- **Google Analytics 4** caricato **solo dopo consenso** del banner (nuovo `src/components/Analytics.astro`; `CookieBanner.astro` emette l'evento `mdg:consent`; niente tracciamento prima del consenso né su "Rifiuta"). Proprietà **`G-YYBYJVM4J1`** — account/proprietà GA **di proprietà dell'utente** (la `G-XYWY12QBCB` del Webflow non era accessibile all'utente).
- **Sitemap XML + robots.txt** per Google Search Console: integrazione `@astrojs/sitemap` (`/sitemap-index.xml` + `/sitemap-0.xml`, URL senza slash finale) e `public/robots.txt` che indica la sitemap.
- **Modulo contatti attivo in produzione** via SendGrid: handler nginx per `/contact.php` (socket PHP-FPM `/run/mdg.sock`), API key passata via `fastcgi_param`, `endpoint` del form collegato.
- Record DNS SendGrid su Aruba: CNAME DKIM `em5967`/`s1._domainkey`/`s2._domainkey` + TXT `_dmarc`.
- Runbook go-live (`docs/GO-LIVE.md`) e documentazione modulo email (`docs/FORM-EMAIL.md`).
- Documenti di continuità: `AGENTS.md`, `CLAUDE.md`, `HANDOFF.md`, `CHANGELOG.md`.

### Changed
- **GO-LIVE (29/09/2026):** dominio `marchesidigresy.com` spostato da Webflow a RunCloud (`45.141.22.157`); `www` = CNAME → apex; apex → 301 → www; SSL Let's Encrypt ri-emesso sul dominio reale.
- `contact.php`: destinatario `hello@marchesidigresy.com`, lettura key da `$_SERVER`/env/file.
- Pagina `/i-vini`: colori titoli categoria e a capo dei nomi vino allineati alla produzione.
- Menu: icona burger a 3 righe + header verde che compare su scroll verso l'alto.
- Mappe vigne: punti allineati alla produzione a 1180px; mappa Martinenga corretta (era la variante mobile).

### Fixed
- Sovrapposizioni del testo dei nomi vino in `/i-vini`.

### Removed
- Link dei vini alle pagine interne in `/i-vini`.
