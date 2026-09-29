# HANDOFF — Marchesi di Grésy

Aggiornato: 2026-09-29

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
- **A metà:** niente in codice.
- **Da fare a mano (utente):** vedi Prossimi passi.

## 5. Ultima sessione
- Fatto: aggiunti 4 record SendGrid su Aruba (DKIM `em5967`/`s1`/`s2` + DMARC `_dmarc`); **go-live DNS** (apex→`45.141.22.157`, `www`→CNAME apex); SSL ri-emesso sul dominio reale; **modulo contatti attivato** (handler nginx per `/contact.php` con socket `/run/mdg.sock`, key via `fastcgi_param`, destinatario `hello@marchesidigresy.com`, `endpoint` collegato). Doc `FORM-EMAIL.md` aggiornata.
- File toccati (repo): `public/contact.php`, `content/contatti.md`, `content/en/contatti.md`, `docs/FORM-EMAIL.md`. (Config nginx e DNS stanno sul server/Aruba, non nel repo.)

## 6. Decisioni
| Decisione | Motivo | Alternative scartate |
|---|---|---|
| Key SendGrid via nginx `fastcgi_param` | Stack RunCloud "Custom" non ha UI env; `$_SERVER` evita open_basedir | env pool FPM (no UI, si rigenera); file fuori webroot (rischio basedir) |
| `www` = CNAME → apex; solo apex è A record | Se cambia l'IP del server, si aggiorna un record solo | doppio A record apex+www |
| Deploy chirurgico (solo file cambiati) sul branch `deploy` | Non toccare il resto del sito live | rsync `--delete` completo |

## 7. Prossimi passi (a mano, utente)
1. **Disdire Webflow**: il DNS è tutto su RunCloud e il sito è verificato.
2. **Redirect HTTP→HTTPS** su RunCloud (SSL/TLS → "Server Side HTTPS Redirection"): ora è "No Redirection".
3. **SendGrid → Sender Authentication**: confermare che il dominio risulti "Verified" (già in inbox; garanzia a lungo termine).
4. **Push `main` su GitHub**: locale è ~13 commit avanti a origin/main (il sito gira dal branch `deploy`, aggiornato).

## 8. Trappole note
- Stack RunCloud "Native NGINX + Custom config" **non esegue i `.php`** di default: serve l'handler nginx (in `mdg.location.main-before.www-to-non-www.conf`, socket `/run/mdg.sock`).
- URL puliti: `location ~ ^/[^.]*$`, non `location /`. SSL: l'emissione Let's Encrypt si impunta col redirect forzato attivo (usare "No Redirection" fino a cert emesso).
- Immagini e mappe vigne: byte-identiche alla produzione, punti calibrati a 1180px. **Non rigenerare.**
- 2 video (Lavanda, 2° video la-serra) morti anche in produzione: non recuperabili, nessuna azione richiesta.

## 9. File da leggere per primi
- `AGENTS.md` — regole, comandi, deploy.
- `docs/FORM-EMAIL.md` — setup completo modulo contatti (nginx, socket, key, SendGrid).
- `docs/GO-LIVE.md` — runbook DNS/SSL.
- `deploy/` — config nginx e note deploy.
