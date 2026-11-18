# HANDOFF — Marchesi di Grésy

Aggiornato: 2026-11-18

## 1. Obiettivo
Sito della tenuta Marchesi di Grésy portato da Webflow a **Astro statico** self-hosted su RunCloud, per eliminare il canone Webflow. Bilingue IT/EN, Claude come CMS via Markdown. **Live in produzione dal 29/09/2026.**

## 2. Stack e architettura
- Stack: Astro ^5 (statico), contenuti Markdown (`content/`, `content/en/`), token via `scripts/build-tokens.mjs`, font Adobe Typekit `iug5ckz`.
- Servizi: RunCloud (VPS `45.141.22.157`, web app `mdg`, PHP 8.3), DNS su Aruba, posta Google Workspace, form via SendGrid. Il sito live gira dal branch `deploy`.
- Struttura: `content/` (CMS Markdown), `src/` (pagine/componenti/stili), `public/` (asset + `contact.php`), `deploy/` + `docs/` (config e runbook).

## 3. Avvio
```
npm install
npm run dev
npm run build
```
Nessun test. Variabili d'ambiente per il build: **nessuna**. La API key SendGrid sta solo sul server (nginx `fastcgi_param SENDGRID_API_KEY`), non nel repo.

## 4. Stato attuale
- **Funziona (verificato 29/09):** `https://www.marchesidigresy.com` live su RunCloud, cert Let's Encrypt valido (→ 28/12), apex → 301 → www. DNS propagato su tutti i resolver. **Modulo contatti attivo**: POST → `{"ok":true}`, mail consegnata in inbox (test a info@simoneattana.com).
- **Live (verificato 18/11):** GA4 consent-gated sulla **proprietà propria `G-YYBYJVM4J1`**, sitemap (`/sitemap-index.xml`, 60 URL) e `robots.txt` **in produzione** su `www.marchesidigresy.com` (HTTP 200).
- **Da fare a mano (utente):** vedi Prossimi passi.

## 5. Ultima sessione (2026-11-18)
- **Verifica connessioni Analytics/Search Console.** Scoperto che il GA4 del sito Webflow (`G-XYWY12QBCB`, su tutte le pagine) era stato **perso nel porting**: assente in sorgente e sul live. GSC risulta ancora verificato via TXT DNS (`google-site-verification=UoeIKdKUCv8…`, su apex+www), ma il sito non aveva sitemap né robots (404).
- **Fatto:** riagganciato GA4 **dietro consenso** del banner (nuovo `src/components/Analytics.astro`; `CookieBanner.astro` emette `mdg:consent`, GA parte senza reload); aggiunta **sitemap** (`@astrojs/sitemap` → `/sitemap-index.xml`, URL puliti) e **`public/robots.txt`**. Build verde (60 pagine); comportamento consent-gating verificato nel browser (niente GA prima del consenso, GA attivo dopo "Accetta" e su visita di ritorno).
- File toccati (repo): `src/components/Analytics.astro` (nuovo), `src/layouts/Base.astro`, `src/components/CookieBanner.astro`, `astro.config.mjs`, `public/robots.txt`, `package.json` + `package-lock.json`. Commit `e5c438b` su `main`; build **deployata** sul branch `deploy` (`782877a`) e **verificata live** (GA su 60/60 pagine, sitemap/robots 200).
- **Analytics — proprietà corretta.** Leggendo GA (browser) si è scoperto che `G-XYWY12QBCB` **non è in un account GA dell'utente** (l'unica proprietà "Gresy" accessibile è *Dai Gresy in Langa* → `daigresy.com` / `G-2NV38G7TPD`, un altro sito). Creata una **nuova proprietà dell'utente** (nuovo account GA "Marchesidigresy.com" → stream `www.marchesidigresy.com` → **`G-YYBYJVM4J1`**) e **sostituito l'ID** in `Analytics.astro`: commit `main` 227a1bc, deploy `bc3ca9d`, live (nuovo ID su 60/60 pagine, vecchio sparito). ToS del nuovo account accettati dall'utente.
- Precedente (29/09): go-live DNS, SSL, modulo contatti SendGrid attivo (vedi `docs/FORM-EMAIL.md`).

## 6. Decisioni
| Decisione | Motivo | Alternative scartate |
|---|---|---|
| Key SendGrid via nginx `fastcgi_param` | Stack RunCloud "Custom" non ha UI env; `$_SERVER` evita open_basedir | env pool FPM (no UI, si rigenera); file fuori webroot (rischio basedir) |
| `www` = CNAME → apex; solo apex è A record | Se cambia l'IP del server, si aggiorna un record solo | doppio A record apex+www |
| Deploy chirurgico (solo file cambiati) sul branch `deploy` | Non toccare il resto del sito live | rsync `--delete` completo |
| GA4 su **nuovo account** proprio (`G-YYBYJVM4J1`) | L'utente non è admin sull'account "Marchesi di Gresy" (non può creare proprietà lì); `G-XYWY12QBCB` del Webflow è su una proprietà altrui | proprietà sotto l'account esistente (UI bloccata); tenere `G-XYWY12QBCB` (dati non accessibili) |

## 7. Prossimi passi (a mano, utente)
1. **Disdire Webflow**: il DNS è tutto su RunCloud e il sito è verificato.
2. **Redirect HTTP→HTTPS** su RunCloud (SSL/TLS → "Server Side HTTPS Redirection"): ora è "No Redirection".
3. **SendGrid → Sender Authentication**: confermare che il dominio risulti "Verified" (già in inbox; garanzia a lungo termine).
4. **Push `main` su GitHub**: locale è avanti a origin/main (il sito gira dal branch `deploy`, aggiornato).
5. ✅ **Fatto (18/11):** GA4 + sitemap + robots deployati in produzione e verificati live.
6. ✅ **Search Console (18/11):** creata proprietà propria **URL-prefix `https://www.marchesidigresy.com/`**, verificata (File HTML → `public/googleae919649c59bc061.html`); **sitemap `sitemap-index.xml` inviata** (stato iniziale "Impossibile recuperare" = normale appena dopo l'invio, si risolve quando Google la scarica). Nota: la vecchia GSC verificata via DNS è di qualcun altro (storico ricerca non accessibile).
7. ✅ **Analytics di proprietà (18/11):** creata proprietà GA4 propria `G-YYBYJVM4J1`, attiva sul sito. Lo **storico vecchio** (`G-XYWY12QBCB`) è su una proprietà altrui, **non accessibile/perso**; la nuova parte da zero. Se serve lo storico, farsi dare l'accesso a `G-XYWY12QBCB` dal cliente/vecchia agenzia.
8. **Cleanup Webflow**: alla disdetta, rimuovere da Aruba il TXT residuo `proxy-ssl.webflow.com` (apex+www).

## 8. Trappole note
- Stack RunCloud "Native NGINX + Custom config" **non esegue i `.php`** di default: serve l'handler nginx (in `mdg.location.main-before.www-to-non-www.conf`, socket `/run/mdg.sock`).
- URL puliti: `location ~ ^/[^.]*$`, non `location /`. SSL: l'emissione Let's Encrypt si impunta col redirect forzato attivo (usare "No Redirection" fino a cert emesso).
- Immagini e mappe vigne: byte-identiche alla produzione, punti calibrati a 1180px. **Non rigenerare.**
- 2 video (Lavanda, 2° video la-serra) morti anche in produzione: non recuperabili, nessuna azione richiesta.
- `public/googleae919649c59bc061.html` è il file di verifica di Google Search Console: **non rimuoverlo** (si perderebbe la verifica della proprietà `https://www.marchesidigresy.com/`).

## 9. File da leggere per primi
- `AGENTS.md` — regole, comandi, deploy.
- `docs/FORM-EMAIL.md` — setup completo modulo contatti (nginx, socket, key, SendGrid).
- `docs/GO-LIVE.md` — runbook DNS/SSL.
- `deploy/` — config nginx e note deploy.
