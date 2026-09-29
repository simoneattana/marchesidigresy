# Go-live — passaggio da Webflow al nuovo server (senza downtime)

> Obiettivo: pubblicare il sito nuovo su **marchesidigresy.com** e poter **disdire Webflow**
> senza perdere il sito nemmeno un minuto.

## Situazione attuale (verificata)
- **DNS gestito su Aruba** (nameserver `dns.technorail.com`, `dns2.technorail.com`, `dns3/dns4.arubadns`).
  → Il DNS **NON dipende da Webflow**: disdire Webflow non cancella il dominio né il DNS. ✅
- Record attuali:
  - `marchesidigresy.com` → A **198.202.211.1** (Webflow, dietro Cloudflare)
  - `www.marchesidigresy.com` → CNAME **cdn.webflow.com**
  - TTL **3600s** (1 ora)
- Nuovo server: **RunCloud / Contabo `45.141.22.157`**, web app `mdg` (già online e verificato su https://mdg.serversite.it).
- Canonico del sito: **www.marchesidigresy.com** (con www).

## ⚠️ Regola d'oro
**Prima il go-live sul nuovo server, POI la disdetta Webflow. Mai il contrario.**
Se Webflow scade mentre il DNS punta ancora a Webflow → sito offline. Con il DNS su Aruba, ci basta
spostare i record prima che Webflow smetta di servire.

---

## Passo 0 — Pre-volo (senza toccare il DNS, si può fare ora)
1. **Staging ok** — pagine, immagini (tutte identiche a produzione), redirect, SSL: verificato. ✅
2. **Aggiungere i domini reali al web app RunCloud**: `marchesidigresy.com` e `www.marchesidigresy.com`
   (RunCloud → Web App `mdg` → **Domain Name** → Add Domain). Nessun effetto finché il DNS non punta qui.
3. **(Consigliato) Abbassare il TTL su Aruba** dei record A/CNAME a **300s**, almeno 1-2 ore prima dello
   switch: così il cambio propaga in minuti invece che in un'ora.
4. **Redirect www**: predisporre su RunCloud il redirect **non-www → www** (il canonico è con www).
   Config nginx pronta in [`deploy/nginx-runcloud.conf`](../deploy/nginx-runcloud.conf) (sezione redirect).

## Passo 1 — Switch DNS (su Aruba) — lo fa l'utente
Nel pannello Aruba, zona DNS di `marchesidigresy.com`:
1. Record **A `@`** (radice): `198.202.211.1` → **`45.141.22.157`**
2. Record **`www`**: da CNAME `cdn.webflow.com` → **A `45.141.22.157`** (oppure CNAME alla radice)
3. Rimuovere eventuali record specifici Webflow (es. TXT di verifica non più necessari).
> ⚠️ Passo irreversibile-ish e visibile: da qui il traffico inizia ad arrivare al nuovo server.

## Passo 2 — Subito dopo lo switch (appena il DNS risolve al nuovo IP)
1. **Emettere SSL Let's Encrypt** su RunCloud per `marchesidigresy.com` + `www` (SSL/TLS Basic, http-01,
   come già fatto per mdg.serversite.it). Richiede che il DNS punti già al server.
2. Verificare: `https://www.marchesidigresy.com` carica il sito nuovo; `marchesidigresy.com` (senza www)
   redirige a www; nessun avviso certificato.
> Finestra di rischio: tra lo switch DNS e l'emissione SSL, l'https può dare errore certificato per
> pochi minuti. Fare lo switch in un momento di basso traffico ed emettere subito l'SSL.

## Passo 3 — Post go-live
1. **Google Search Console**: inviare la nuova `sitemap.xml`; verificare che i vecchi URL redirezionino
   (i 301 legacy sono già configurati: `/agriturismo`→`/wine-resort`, `/diary`→`/`, `/news/*`→`/`, `/about`→`/`).
2. **Form contatti**: cablare PHP-FPM + SendGrid e testare l'invio a `hello@marchesidigresy.com`
   (vedi §4 di [`docs/DEPLOY-RUNCLOUD.md`](DEPLOY-RUNCLOUD.md)). Fino ad allora il form non invia (endpoint vuoto).
3. **Monitorare 24-48h** (pagine, form, redirect).

## Passo 4 — Solo ora: disdire Webflow
Quando il nuovo sito è confermato online e stabile su marchesidigresy.com, **disdici Webflow**.
Il DNS resta su Aruba, quindi nessun impatto sul dominio.

---

## Chi fa cosa
- **Utente**: cambio record DNS su Aruba (Passo 1), disdetta Webflow (Passo 4), chiave SendGrid + mittente verificato.
- **Io (Claude)**: aggiunta domini al web app, redirect www, emissione SSL, verifica live, Search Console, cablaggio form.
