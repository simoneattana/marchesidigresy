# Deploy su RunCloud

Sito statico **Astro** (output in `dist/`) servito da **nginx** su un server gestito da RunCloud,
con **PHP-FPM** per il modulo contatti (`contact.php` → SendGrid). Zero canone Webflow.

## Prerequisiti
- Un server (VPS: Hetzner / DigitalOcean / Vultr…) collegato a RunCloud.
- Un web app **PHP 8.x** su RunCloud (serve anche solo per eseguire `contact.php`).
- Node 18+ per fare la build (sul server, oppure build in locale e carico solo `dist/`).

## 1. Build
```bash
npm ci
npm run build     # genera dist/ (include anche contact.php, copiato da public/)
```

## 2. Pubblicazione dei file
Il **web root** del web app punta alla cartella che contiene i file di `dist/`.
Due modi:
- **Build in locale + upload**: `rsync -av --delete dist/ utente@server:/home/runcloud/webapps/<app>/` (o SFTP).
- **RunCloud Git deploy**: collega il repo; script di deploy `npm ci && npm run build` e web root = `dist/`
  (Atomic Deployment). Richiede Node sul server.

## 3. NGINX (URL puliti + redirect 301)
Incolla il contenuto di [`deploy/nginx-runcloud.conf`](../deploy/nginx-runcloud.conf) nella sezione
**NGINX Config** del web app (RunCloud → Web Application → Settings → NGINX Config), poi *Rebuild NGINX*.
Fa due cose: serve `/contatti` da `contatti.html` (niente `.html`/slash) e i 301 legacy
(`/agriturismo`→`/wine-resort`, `/diary`→`/`, `/news/*`→`/`, `/about`→`/`).

## 4. Modulo contatti (SendGrid) — attivazione
1. SendGrid: crea **API key** (solo *Mail Send*) e **verifica il mittente** `no-reply@marchesidigresy.com`
   (Single Sender o, meglio, Domain Authentication con record DNS SPF/DKIM).
2. Imposta la env **`SENDGRID_API_KEY`** sul web app (RunCloud → Web App → Settings → **Environment
   Variables**; PHP-FPM la legge via `getenv`). Poi riavvia PHP-FPM.
3. In `content/contatti.md` e `content/en/contatti.md` imposta `endpoint: "/contact.php"` e ri-builda.
4. Test dal modulo → arrivo su `hello@marchesidigresy.com` (controlla anche spam finché il dominio
   non è autenticato).
> Finché `SENDGRID_API_KEY` non c'è, `contact.php` risponde 503 e non invia: nessun invio accidentale.

## 5. Go-live (DNS) — passo finale, insieme
1. **Staging prima**: pubblica su un dominio/sottodominio di prova (o l'IP) e verifica tutto live.
2. Quando ok: punta il **DNS** di `marchesidigresy.com` (record A/AAAA) all'IP del server RunCloud,
   emetti l'**SSL** (Let's Encrypt da RunCloud), verifica `www` + redirect canonico.
3. In **Google Search Console**: invia la nuova `sitemap.xml`, verifica che i vecchi URL redirezionino.
4. Solo dopo che il nuovo sito è confermato online: **disdici Webflow**.

⚠️ Il DNS e la disdetta Webflow li fai tu: sono i passi irreversibili. Io preparo tutto e ti guido.

## Nota
La versione **Cloudflare Pages** (function JS + `_redirects`) è archiviata in `deploy/cloudflare/`
nel caso servisse in futuro. Su RunCloud si usa `contact.php` + `deploy/nginx-runcloud.conf`.
