---
# Breakpoint identici a quelli di Webflow dell'originale
bp:
  tablet: "991px"
  mobile: "767px"
  small: "479px"
# Override: ad ogni breakpoint ridefinisco alcuni token.
# Il build genera @media reali che riscrivono le CSS custom properties.
overrides:
  tablet:
    fs-h1: "48px"
    lh-h1: "56px"
    section-py: "64px"
  mobile:
    fs-h1: "40px"
    lh-h1: "46px"
    section-py: "48px"
  small:
    fs-h1: "32px"
    lh-h1: "38px"
    fs-hero: "20px"
    section-py: "40px"
---

# Responsive

I breakpoint sono quelli reali dell'originale Webflow: **991 / 767 / 479px**.

Non serve toccare i componenti: ad ogni breakpoint qui sopra ridefinisco i token
(dimensione titoli, respiro delle sezioni…) e il resto si adatta da solo.
Vuoi titoli più piccoli sul telefono? Cambia `small.fs-h1` e rilancia.
