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

## 2. Pubblicazione dei file — Git deploy da GitHub (fatto)

Repo: **`https://github.com/simoneattana/marchesidigresy`** — **PUBBLICO**.
- Branch `main` = sorgenti Astro.
- Branch **`deploy`** = build già pronta (contenuto di `dist/` committato) → nessun Node sul server.

> Perché pubblico: la deploy key SSH condivisa dell'utente `runcloud` era già usata su un altro
> repo (GitHub impone 1 deploy key per repo a livello globale). Rendere il repo pubblico evita del
> tutto la chiave e semplifica il clone. Il repo non contiene segreti (la chiave SendGrid vive in
> una env sul server, non nel codice).

Nel web app RunCloud **mdg** (mdg.serversite.it) — fatto:
1. **Git** → collega `simoneattana/marchesidigresy`, branch **`deploy`** (repo pubblico → niente
   deploy key: togliere la spunta "Register deploy key"). → *Deploy* → il clone popola la web root.
2. **Web root**: la root del web app (il branch `deploy` ha i file già in radice, non in `dist/`).
3. Aggiornamenti futuri: `npm run build` in locale → committa `dist/` sul branch `deploy` → *Deploy*
   su RunCloud (o auto-deploy on push). In alternativa passare a build-on-server (serve Node sul
   server + deployment script `npm ci && npm run build` + Public Path = `/dist`).

## 3. NGINX (URL puliti + redirect 301) — fatto
Config standalone in RunCloud → Web Application → **NGINX Config** → *Create Standalone Config*,
**Type = `location.main-before`**, contenuto = [`deploy/nginx-runcloud.conf`](../deploy/nginx-runcloud.conf).
Poi *Run and Debug* (nginx -t) → *Update config*.
Fa due cose: serve `/contatti` da `contatti.html` (niente `.html`/slash) e i 301 legacy
(`/agriturismo`→`/wine-resort`, `/diary`→`/`, `/news/*`→`/`, `/about`→`/`).
Verificato live: tutte le pagine IT/EN e le schede vino → 200; redirect → 301; asset e font → 200.

## 4. Modulo contatti (PHP + SendGrid) — DA FARE AL GO-LIVE
⚠️ **Prima serve il PHP handler.** Lo stack "Native NGINX + Custom config" **non** esegue i `.php`
(verificato: `GET /contact.php` scarica il sorgente). Cablare l'handler FastCGI (vedi nota in
[`deploy/nginx-runcloud.conf`](../deploy/nginx-runcloud.conf)) oppure ricreare il web app con stack
**Native NGINX** gestito. Poi:
1. SendGrid: crea **API key** (solo *Mail Send*) e **verifica il mittente** `no-reply@marchesidigresy.com`
   (Single Sender o, meglio, Domain Authentication con record DNS SPF/DKIM).
2. Imposta la env **`SENDGRID_API_KEY`** sul web app (RunCloud → Web App → Settings → **Environment
   Variables**; PHP-FPM la legge via `getenv`). Poi riavvia PHP-FPM.
3. In `content/contatti.md` e `content/en/contatti.md` imposta `endpoint: "/contact.php"` e ri-builda.
4. Test dal modulo → arrivo su `hello@marchesidigresy.com` (controlla anche spam finché il dominio
   non è autenticato).
> Finché l'endpoint del form è `""`, il modulo non chiama `contact.php` (nessun invio). E finché
> `SENDGRID_API_KEY` non c'è, `contact.php` risponde 503: doppia sicurezza contro invii accidentali.

## 5. Go-live (DNS) — passo finale, insieme
> **Stato staging (fatto):** sito live su **https://mdg.serversite.it** — SSL/TLS Basic (Let's Encrypt,
> http-01, cert valido). Redirezione impostata su **No Redirection (HTTP access enabled)**: http e https
> entrambi accessibili (per il go-live sul dominio reale si può passare a *Server Side HTTPS Redirection*).
> Nota: l'emissione LE si è impuntata al 1° tentativo con redirect forzato; ri-emessa con *No Redirection*
> ha funzionato (~8 min). Pagine, redirect legacy, asset, font e URL puliti verificati su https (200/301,
> zero errori console). Restano: PHP handler + SendGrid (§4), mirror Webflow su sottodominio nascosto.

1. **Staging prima**: pubblica su un dominio/sottodominio di prova (o l'IP) e verifica tutto live.
2. Quando ok: punta il **DNS** di `marchesidigresy.com` (record A/AAAA) all'IP del server RunCloud,
   emetti l'**SSL** (Let's Encrypt da RunCloud), verifica `www` + redirect canonico.
3. In **Google Search Console**: invia la nuova `sitemap.xml`, verifica che i vecchi URL redirezionino.
4. Solo dopo che il nuovo sito è confermato online: **disdici Webflow**.

⚠️ Il DNS e la disdetta Webflow li fai tu: sono i passi irreversibili. Io preparo tutto e ti guido.

## Nota
La versione **Cloudflare Pages** (function JS + `_redirects`) è archiviata in `deploy/cloudflare/`
nel caso servisse in futuro. Su RunCloud si usa `contact.php` + `deploy/nginx-runcloud.conf`.
