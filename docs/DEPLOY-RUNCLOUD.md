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

## 2. Pubblicazione dei file — Git deploy da GitHub (scelto)

Repo: **`https://github.com/simoneattana/marchesidigresy`** (privato, branch `main`).

Nel web app RunCloud **mdg.serversite.it**:
1. **Git** → *Create Git Web Application* / collega repository:
   - Provider **GitHub** → autorizza (OAuth) → seleziona `simoneattana/marchesidigresy`, branch `main`.
   - (Repo privato: se non usi l'OAuth, RunCloud genera una **Deploy Key** → aggiungila in
     GitHub → repo → Settings → Deploy keys.)
2. **Node.js** sul server: installalo (RunCloud → server → *Native*/*Tools*, o `nvm` nello script di deploy).
   Serve per la build.
3. **Deployment script** (RunCloud → Web App → Git → *Deployment Script*):
   ```bash
   cd $RUNCLOUD_WEBAPP_ROOT
   npm ci
   npm run build
   ```
4. **Web root / Public Path**: imposta la cartella pubblica del web app su **`dist`**
   (RunCloud → Web App → Settings → *Public Path* = `/dist`). nginx servirà `dist/`.
5. **Deploy** (pulsante *Deploy* / push su `main` se l'auto-deploy è attivo).

> **Alternativa senza Node sul server**: builda in locale (`npm run build`) e pubblica il branch
> `deploy` con dentro il contenuto di `dist/` (web root = root, nessuno script). Dimmelo e te lo preparo.

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
