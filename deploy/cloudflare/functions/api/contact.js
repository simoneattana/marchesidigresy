// Cloudflare Pages Function — notifica email del modulo Contatti via SendGrid.
// Replica la LOGICA della vecchia notifica Webflow (destinatario, oggetto, corpo con
// Form / Site / Submitted content).
//
// STATO: pronta ma INATTIVA finché non si configura SendGrid al deploy.
//   Finché manca il secret SENDGRID_API_KEY la funzione risponde 503 e NON invia nulla.
//
// ATTIVAZIONE AL DEPLOY (vedi docs/FORM-EMAIL.md):
//   1. Account SendGrid + API key (solo permesso "Mail Send").
//   2. Verificare il mittente FROM in SendGrid (Single Sender o Domain Authentication con record DNS).
//   3. Impostare su Cloudflare Pages il secret `SENDGRID_API_KEY`.
//   4. In content/contatti.md e content/en/contatti.md impostare `endpoint: "/api/contact"`.

// --- Config notifica (equivalente alla config Webflow; modificabile qui) ---
const TO = 'hello@marchesidigresy.com';               // destinatario (come Webflow)
const FROM = 'no-reply@marchesidigresy.com';          // mittente: DEVE essere verificato in SendGrid
const SENDER_NAME = 'Contact form';                   // "Sender Name" (come Webflow)
const SITE_NAME = 'marchesidigresy.com';              // {{siteName}}
const FORM_NAME = 'Contatti';                         // {{formName}}
const SUBJECT = `Nuova richiesta dal sito ${SITE_NAME}`;

// Campi del modulo mostrati nell'email ({{formData}}): chiave POST → etichetta
const FIELDS = [
  ['name', 'Nome e Cognome'],
  ['email', 'Email'],
  ['phone', 'Telefono'],
  ['country', 'Paese'],
  ['message', 'Note'],
];

const json = (obj, status = 200) =>
  new Response(JSON.stringify(obj), { status, headers: { 'content-type': 'application/json' } });

const esc = (s) =>
  String(s ?? '').replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));

export async function onRequestPost({ request, env }) {
  let form;
  try { form = await request.formData(); }
  catch { return json({ ok: false, error: 'bad_request' }, 400); }

  // Honeypot anti-spam: se compilato è un bot → fingiamo successo, non inviamo.
  if (form.get('_gotcha')) return json({ ok: true });

  // Consenso privacy obbligatorio.
  if (!form.get('consent')) return json({ ok: false, error: 'consent_required' }, 422);

  // Corpo email ({{formData}}): solo i campi valorizzati.
  const rows = FIELDS
    .map(([key, label]) => [label, (form.get(key) || '').toString().trim()])
    .filter(([, v]) => v)
    .map(([label, v]) => `<strong>${label}:</strong> ${esc(v)}`)
    .join('<br>');

  const html =
    `Hai ricevuto una nuova richiesta dal modulo di contatto.<br><br>` +
    `<strong>Modulo</strong><br>${esc(FORM_NAME)}<br><br>` +
    `<strong>Sito</strong><br>${esc(SITE_NAME)}<br><br>` +
    `<strong>Contenuto inviato</strong><br>${rows}`;

  // Reply-To = email del mittente, così "Rispondi" scrive direttamente al cliente
  // (miglioria rispetto al no-reply@webflow.com dell'originale).
  const replyEmail = (form.get('email') || '').toString().trim();

  // Invio disattivato finché SendGrid non è configurato (attivazione al deploy).
  if (!env || !env.SENDGRID_API_KEY) return json({ ok: false, error: 'not_configured' }, 503);

  const payload = {
    personalizations: [{ to: [{ email: TO }] }],
    from: { email: FROM, name: SENDER_NAME },
    subject: SUBJECT,
    content: [{ type: 'text/html', value: html }],
  };
  if (replyEmail) payload.reply_to = { email: replyEmail };

  let res;
  try {
    res = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.SENDGRID_API_KEY}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(payload),
    });
  } catch {
    return json({ ok: false, error: 'network' }, 502);
  }

  if (res.status === 202) return json({ ok: true });
  return json({ ok: false, error: 'send_failed', status: res.status }, 502);
}
