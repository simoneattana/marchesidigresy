---
title: "Contatti"
hero:
  crest: "/assets/img/crest.png"
  name: "Tenute Cisa Asinari dei Marchesi di Grésy"
  title: "Contatti"
  poster: "/assets/img/contatti-hero.jpg"   # hero a immagine (nessun video)
# Due schede contatto affiancate (come in produzione)
cards:
  - heading: "Martinenga"
    image: "/assets/img/contatti-martinenga.jpg"
    org: "Tenute Cisa Asinari dei Marchesi di Grésy S.S.A. Azienda Agricola Martinenga"
    address: "Strada della Stazione, 21 12050 Barbaresco (Cn)"
    tel: "+ 39 0173 63 52 21"
    tel_href: "tel:+390173635221"
    email: "hello@marchesidigresy.com"
    email_href: "mailto:hello@marchesidigresy.com?subject=Info"
    buttons:
      - { label: "Prenota la tua degustazione", href: "https://marchesidigresy.winearound.com/it/5c06647bd283825c34a2d86c?lang=it", style: "filled" }
      - { label: "Guarda su Google Maps", href: "https://goo.gl/maps/5jJb6J7fQHPa9Hd89", style: "outline" }
  - heading: "Dai Gresy in Langa"
    image: "/assets/img/contatti-daigresy.jpg"
    org: "Tenute Cisa Asinari dei Marchesi di Grésy S.S.A. Azienda Agricola Martinenga"
    address: "Via Giacosa, 19 12050 Treiso (Cn)"
    tel: "+ 39 0173 32 81 00"
    tel_href: "tel:+390173328100"
    website: "www.daigresy.com"
    website_href: "https://www.daigresy.com/"
    email: "hello@daigresy.com"
    email_href: "mailto:hello@daigresy.com?subject=Info"
    buttons:
      - { label: "Prenota la tua camera", href: "https://be.bookingexpert.it/book/home/single?layout=14688&lang=it&currency=EUR&nsid=8ab94a45-7538-46bd-ae52-54ed1467caeb", style: "filled" }
      - { label: "Guarda su Google Maps", href: "https://www.google.com/maps/dir//Via+Giacosa+19+-12050+Treiso+-+Cuneo/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x12d2b5c30bf1e591:0xdce67af70b61b3d5?sa=X&ved=2ahUKEwjM3aeAv-v3AhV5if0HHRtWA9YQ9Rd6BAgyEAQ", style: "outline" }
# Modulo contatti. `endpoint` vuoto = invio non ancora collegato (gate: scelta backend).
form:
  # Layout su griglia: riga1 nome+email · riga2 telefono+stato · riga3 note · riga4 consenso
  fields:
    - { name: "name",    label: "Nome e Cognome", type: "text",     placeholder: "Nome e Cognome",   required: true }
    - { name: "email",   label: "Email",          type: "email",    placeholder: "Email",            required: true }
    - { name: "phone",   label: "Telefono",       type: "tel",      placeholder: "Numero di telefono" }
    - { name: "country", label: "Stato",          type: "select",   placeholder: "Stato" }
    - { name: "message", label: "Note",           type: "textarea", placeholder: "Note (giorno, orario e numero di persone)", required: true, full: true }
  consent_pre: "Acconsento alla raccolta e all'uso dei miei dati personali - "
  consent_link: "Informativa Privacy"
  consent_href: "/cookiepolicy"
  submit: "Invia"
  success: "Grazie! Il tuo messaggio è stato inviato."
  error: "Ops! Qualcosa è andato storto durante l'invio. Riprova."
  endpoint: ""   # Invio via SendGrid (public/contact.php su RunCloud). Al deploy → "/contact.php". Vedi docs/DEPLOY-RUNCLOUD.md
---

Pagina Contatti: due schede (Martinenga · Dai Gresy in Langa) + modulo di contatto.
Solo contenuti pubblicati: la lista "Scrivi ai nostri esperti" e il blocco
"Around the World" sono nascosti (display:none) sul sito live → esclusi.
