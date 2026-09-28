# Modulo Contatti — notifica email (SendGrid)

Replica la **notifica email** che Webflow inviava alla ricezione del modulo. L'invio è ora
responsabilità del **nostro server** (Cloudflare Pages Function → SendGrid), non più di Webflow.

## Stato

- ✅ **Logica implementata**: modulo (`/contatti`, `/en/contatti`) + funzione server `functions/api/contact.js`.
- ⏸️ **Invio disattivato**: si attiva al deploy sul nuovo server, dopo lo stacco da Webflow.
  Finché manca `SENDGRID_API_KEY`, la funzione risponde `503` e **non invia**.

## Config notifica — equivalenza con Webflow

| Webflow | Nostra implementazione (`functions/api/contact.js`) |
|---|---|
| **To** `hello@marchesidigresy.com` | `TO = 'hello@marchesidigresy.com'` |
| **Sender Name** `Contact form` | `SENDER_NAME = 'Contact form'` |
| **Reply To** `no-reply@webflow.com` | Reply-To = **email del cliente** (così "Rispondi" scrive a lui) |
| **Subject** `New form submission … for {{siteName}}` | `Nuova richiesta dal sito marchesidigresy.com` |
| **Body** `Form / Site / Submitted content` con `{{formName}}`, `{{siteName}}`, `{{formData}}` | Stesso schema (Modulo / Sito / Contenuto inviato) |
| Mittente (`From`) — gestito da Webflow | `FROM = 'no-reply@marchesidigresy.com'` (da verificare in SendGrid) |

I valori sono in cima a `functions/api/contact.js` (modificabili chiedendo a Claude).
Oggetto/etichette sono in italiano: si possono riportare all'inglese esatto di Webflow se preferisci.

## Attivazione al deploy (checklist)

1. **SendGrid**: crea l'account e una **API key** con solo permesso *Mail Send*.
2. **Mittente**: verifica `no-reply@marchesidigresy.com` in SendGrid
   — *Single Sender Verification* (rapido) **oppure** *Domain Authentication* (consigliato: record DNS
   SPF/DKIM sul dominio → miglior deliverability). ⚠️ Operazione su DNS del cliente: da fare insieme.
3. **Cloudflare Pages** → Settings → Environment variables → aggiungi il **secret** `SENDGRID_API_KEY`.
4. **Attiva il modulo**: in `content/contatti.md` e `content/en/contatti.md` imposta
   `endpoint: "/api/contact"` (ora è `""` = invio non collegato).
5. **Test**: invia una prova dal modulo e verifica l'arrivo su `hello@marchesidigresy.com`
   (controlla anche lo spam finché il dominio non è autenticato).

## Note

- Il modulo POSTa i campi `name, email, phone, country, message, consent` (+ honeypot `_gotcha`).
- Protezione spam: honeypot lato server (bot → risposta `ok` senza invio) + consenso obbligatorio.
- Deploy su Cloudflare Pages: build `npm run build`, output `dist/`, la cartella `functions/` è servita
  automaticamente come Pages Functions.
- Se il "nostro server" non sarà Cloudflare Pages (es. Node/Express, Worker, PHP): la chiamata SendGrid
  resta identica, cambia solo l'involucro della funzione.
