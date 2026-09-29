# Modulo Contatti — notifica email (SendGrid)

Replica la **notifica email** che Webflow inviava alla ricezione del modulo. L'invio è ora
responsabilità del **nostro server** (RunCloud, PHP-FPM → SendGrid), non più di Webflow.

## Stato — ✅ ATTIVO (go-live 29/09/2026)
- Modulo (`/contatti`, `/en/contatti`) con `endpoint: "/contact.php"` **collegato**; backend `public/contact.php` attivo.
- Destinatario: `hello@marchesidigresy.com`. Reply-To = email di chi compila.
- **Chiave SendGrid**: passata via `fastcgi_param SENDGRID_API_KEY` nell'handler nginx (letta da `$_SERVER`, con fallback `getenv`/file). **Non è in git.**
- **Handler PHP** (lo stack RunCloud "Custom" NON esegue i `.php` di default): aggiunto nella NGINX Config della web app `mdg`, file `mdg.location.main-before.www-to-non-www.conf`:
  `location = /contact.php { fastcgi_pass unix:/run/mdg.sock; include fastcgi_params; fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name; fastcgi_param SENDGRID_API_KEY "<key>"; }`
  (socket PHP-FPM dell'app: `/run/mdg.sock`).
- **Test 29/09/2026**: POST → `{"ok":true}`, mail consegnata **in inbox** a info@simoneattana.com (destinatario poi riportato a hello@). Smoke test senza consenso → `422` (non invia).

## Config Webflow originale (riferimento — screenshot cliente)
- **To**: `hello@marchesidigresy.com`
- **Sender Name**: `Contact form`
- **Reply To**: `no-reply@webflow.com`
- **Subject**: `New form submission on Webflow for {{siteName}}`
- **Body**: `You received a new form submission.` + `Form {{formName}}` / `Site {{siteName}}` / `Submitted content {{formData}}`

## Equivalenza con il nostro `public/contact.php`
| Webflow | `contact.php` (valori in cima al file) |
|---|---|
| To `hello@marchesidigresy.com` | `$TO = 'hello@marchesidigresy.com'` ✓ |
| Sender Name `Contact form` | `$SENDER = 'Contact form'` ✓ |
| Reply To `no-reply@webflow.com` | Reply-To = **email di chi compila** (così "Rispondi" scrive al cliente) 🔁 |
| Subject `…on Webflow for …` | `Nuova richiesta dal sito marchesidigresy.com` (senza "Webflow", in italiano) |
| Body Form / Site / Submitted content | stesso schema: Modulo / Sito / Contenuto inviato |
| From (gestito da Webflow) | `$FROM = 'no-reply@marchesidigresy.com'` (da verificare in SendGrid) |
> Oggetto/etichette in italiano; si possono riportare all'inglese esatto di Webflow se preferisci.

## Attivazione al GO-LIVE (la fa Claude con gli accessi Aruba del cliente)
1. **PHP handler su RunCloud** — lo stack "Custom config" NON esegue i `.php` (verificato: `GET /contact.php`
   scarica il sorgente). Prima cablare l'handler FastCGI (vedi `deploy/nginx-runcloud.conf`) o passare a uno
   stack Native NGINX gestito.
2. **SendGrid**: account + **API key** (solo *Mail Send*).
3. **Autenticazione mittente** `no-reply@marchesidigresy.com`:
   - *Domain Authentication* (consigliata) → SendGrid genera record **DNS (CNAME DKIM, SPF)** da inserire su
     **Aruba** (dove è gestito il DNS). Migliore deliverability, no spam.
   - in alternativa *Single Sender Verification* (rapida, senza DNS).
4. **Env** `SENDGRID_API_KEY` sul web app RunCloud (PHP-FPM la legge via `getenv`) → riavvio PHP-FPM.
5. **Collega il modulo**: in `content/contatti.md` e `content/en/contatti.md` → `endpoint: "/contact.php"` e ri-builda.
6. **Test**: invio di prova → arrivo su `hello@marchesidigresy.com` (controlla spam finché il dominio non è autenticato).

## Accessi Aruba — a cosa servono al go-live
- **Autenticazione SendGrid** (punto 3): inserimento record CNAME/SPF DKIM.
- **Switch DNS** del go-live (record A → `45.141.22.157`) — vedi `docs/GO-LIVE.md`.
> DNS/dominio sono operazioni gate: le eseguo con i tuoi accessi, confermando ogni passo. Meglio se
> l'accesso Aruba passa dal password manager (così non gestisco la password in chiaro).

## Note
- Il modulo POSTa i campi `name, email, phone, country, message, consent` (+ honeypot `_gotcha`).
- Protezione spam: honeypot lato server (bot → risposta `ok` senza invio) + consenso obbligatorio.
- La chiamata a SendGrid (`api.sendgrid.com/v3/mail/send`) è identica a prescindere dall'involucro: se un
  domani il backend non fosse PHP, cambia solo il wrapper, non la logica.
