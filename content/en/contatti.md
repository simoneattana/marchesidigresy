---
title: "Contacts"
hero:
  crest: "/assets/img/crest.png"
  name: "Tenute Cisa Asinari dei Marchesi di Grésy"
  title: "Contacts"
  poster: "/assets/img/contatti-hero.jpg"
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
      - { label: "Book your tasting", href: "https://marchesidigresy.winearound.com/en/5c06647bd283825c34a2d86c?lang=en", style: "filled" }
      - { label: "View on Google Maps", href: "https://goo.gl/maps/5jJb6J7fQHPa9Hd89", style: "outline" }
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
      - { label: "Book your stay", href: "https://be.bookingexpert.it/book/home/single?layout=14688&lang=en&currency=EUR&nsid=8ab94a45-7538-46bd-ae52-54ed1467caeb", style: "filled" }
      - { label: "View on Google Maps", href: "https://www.google.com/maps/dir//Via+Giacosa+19+-12050+Treiso+-+Cuneo/data=!4m6!4m5!1m1!4e2!1m2!1m1!1s0x12d2b5c30bf1e591:0xdce67af70b61b3d5?sa=X&ved=2ahUKEwjM3aeAv-v3AhV5if0HHRtWA9YQ9Rd6BAgyEAQ", style: "outline" }
form:
  fields:
    - { name: "name",    label: "Name and Surname", type: "text",     placeholder: "Name and Surname", required: true }
    - { name: "email",   label: "Email",            type: "email",    placeholder: "Email",            required: true }
    - { name: "phone",   label: "Phone",            type: "tel",      placeholder: "Phone number" }
    - { name: "country", label: "Country",          type: "select",   placeholder: "Country" }
    - { name: "message", label: "Notes",            type: "textarea", placeholder: "Notes (day, time and number of guests)", required: true, full: true }
  consent_pre: "I consent to the collection and use of my personal data - "
  consent_link: "Privacy Policy"
  consent_href: "/cookiepolicy"
  submit: "Send"
  success: "Thank you! Your message has been sent."
  error: "Oops! Something went wrong while sending. Please try again."
  endpoint: ""   # Invio via SendGrid (public/contact.php su RunCloud). Al deploy → "/contact.php". Vedi docs/DEPLOY-RUNCLOUD.md
---

Pagina Contatti EN. Form nostro (redesign) tradotto in inglese. Endpoint da impostare al deploy.
