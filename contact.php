<?php
// contact.php — backend del modulo Contatti via SendGrid (RunCloud / nginx + PHP-FPM).
// Replica la LOGICA della notifica Webflow (To, oggetto, corpo Form/Site/Submitted content).
//
// STATO: pronto ma INATTIVO finché non si imposta la variabile d'ambiente SENDGRID_API_KEY.
//   Senza chiave risponde 503 e NON invia nulla (attivazione al deploy).
// ATTIVAZIONE (vedi docs/DEPLOY-RUNCLOUD.md):
//   1) API key SendGrid (permesso Mail Send) + mittente FROM verificato in SendGrid.
//   2) Impostare la env SENDGRID_API_KEY sul web app RunCloud (PHP-FPM).
//   3) In content/contatti.md e content/en/contatti.md → endpoint: "/contact.php".

header('Content-Type: application/json; charset=utf-8');

if (($_SERVER['REQUEST_METHOD'] ?? 'GET') !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method']);
    exit;
}

// --- Config notifica (equivalente Webflow; modificabile qui) ---
$TO       = 'info@simoneattana.com';   // TEST temporaneo — rimettere hello@marchesidigresy.com dopo la verifica
$FROM     = 'no-reply@marchesidigresy.com';   // deve essere verificato in SendGrid
$SENDER   = 'Contact form';
$SITE     = 'marchesidigresy.com';
$FORMNAME = 'Contatti';
$SUBJECT  = "Nuova richiesta dal sito $SITE";
$FIELDS   = [['name','Nome e Cognome'],['email','Email'],['phone','Telefono'],['country','Paese'],['message','Note']];

$post = fn($k) => isset($_POST[$k]) ? trim((string)$_POST[$k]) : '';
$done = function ($obj, $code = 200) { http_response_code($code); echo json_encode($obj); exit; };

// Honeypot: se compilato è un bot → fingiamo successo, non inviamo.
if ($post('_gotcha') !== '') $done(['ok' => true]);
// Consenso privacy obbligatorio.
if ($post('consent') === '') $done(['ok' => false, 'error' => 'consent_required'], 422);

// Corpo email ({{formData}}): solo i campi valorizzati.
$rows = [];
foreach ($FIELDS as [$k, $label]) {
    $v = $post($k);
    if ($v !== '') $rows[] = '<strong>' . htmlspecialchars($label) . ':</strong> ' . htmlspecialchars($v);
}
$html = "Hai ricevuto una nuova richiesta dal modulo di contatto.<br><br>"
      . "<strong>Modulo</strong><br>" . htmlspecialchars($FORMNAME) . "<br><br>"
      . "<strong>Sito</strong><br>" . htmlspecialchars($SITE) . "<br><br>"
      . "<strong>Contenuto inviato</strong><br>" . implode('<br>', $rows);

// Chiave SendGrid — RunCloud stack "Custom" (niente UI env). Letta in ordine da:
//   1) fastcgi_param nginx ($_SERVER)  2) env (getenv)  3) file fuori dalla web root.
$key = $_SERVER['SENDGRID_API_KEY'] ?? '';
if (!$key) $key = getenv('SENDGRID_API_KEY') ?: '';
if (!$key) {
    $keyFile = '/home/runcloud/webapps/mdg-secret/sendgrid.key';
    if (is_readable($keyFile)) $key = trim((string) file_get_contents($keyFile));
}
if (!$key) $done(['ok' => false, 'error' => 'not_configured'], 503);

$payload = [
    'personalizations' => [['to' => [['email' => $TO]]]],
    'from'    => ['email' => $FROM, 'name' => $SENDER],
    'subject' => $SUBJECT,
    'content' => [['type' => 'text/html', 'value' => $html]],
];
$reply = $post('email');                       // Reply-To = email del cliente
if ($reply !== '') $payload['reply_to'] = ['email' => $reply];

$ch = curl_init('https://api.sendgrid.com/v3/mail/send');
curl_setopt_array($ch, [
    CURLOPT_POST => true,
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_HTTPHEADER => ['Authorization: Bearer ' . $key, 'Content-Type: application/json'],
    CURLOPT_POSTFIELDS => json_encode($payload),
    CURLOPT_TIMEOUT => 20,
]);
$resp = curl_exec($ch);
$code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($code === 202) $done(['ok' => true]);
$done(['ok' => false, 'error' => 'send_failed', 'status' => $code], 502);
