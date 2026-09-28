// Dati schede vino (/vini/<slug>) — porting delle pagine di produzione.
// Asset self-hostati in public/assets/wines/. La bottiglia riusa il catalogo esistente.
export const wines = {
  "barbera-dasti-docg": {
    "name": "Barbera d'Asti Docg",
    "category": "quotidiani",
    "bottle": "/assets/img/wines/barbera-d-asti.png",
    "tech": "/assets/wines/barbera-dasti-docg/scheda-tecnica.pdf",
    "hires": "/assets/wines/barbera-dasti-docg/hires.jpg",
    "vintages": []
  },
  "camp-gros-martinenga-barbaresco-docg": {
    "name": "Camp Gros Martinenga Barbaresco Docg",
    "category": "barbaresco",
    "bottle": "/assets/img/wines/camp-gros-riserva.png",
    "tech": "/assets/wines/camp-gros-martinenga-barbaresco-docg/scheda-tecnica.pdf",
    "hires": "/assets/wines/camp-gros-martinenga-barbaresco-docg/hires.jpg",
    "vintages": [
      {
        "label": "2011",
        "pdf": "/assets/wines/camp-gros-martinenga-barbaresco-docg/2011.pdf"
      },
      {
        "label": "2010",
        "pdf": "/assets/wines/camp-gros-martinenga-barbaresco-docg/2010.pdf"
      },
      {
        "label": "2009",
        "pdf": "/assets/wines/camp-gros-martinenga-barbaresco-docg/2009.pdf"
      },
      {
        "label": "2008",
        "pdf": "/assets/wines/camp-gros-martinenga-barbaresco-docg/2008.pdf"
      },
      {
        "label": "2007",
        "pdf": "/assets/wines/camp-gros-martinenga-barbaresco-docg/2007.pdf"
      },
      {
        "label": "2006",
        "pdf": "/assets/wines/camp-gros-martinenga-barbaresco-docg/2006.pdf"
      },
      {
        "label": "2005",
        "pdf": "/assets/wines/camp-gros-martinenga-barbaresco-docg/2005.pdf"
      },
      {
        "label": "2004",
        "pdf": "/assets/wines/camp-gros-martinenga-barbaresco-docg/2004.pdf"
      }
    ]
  },
  "chablis-daniel-etienne-defaix": {
    "name": "Chablis Daniel-Etienne Defaix",
    "category": "importati",
    "bottle": "/assets/img/wines/chablis-premiere-cru-copy.png",
    "vintages": []
  },
  "champagne-jm-gobillard-et-fils": {
    "name": "Champagne JM Gobillard et Fils",
    "category": "importati",
    "bottle": "/assets/img/wines/j-m-gobillard-fils-01-copy.png",
    "vintages": []
  },
  "chardonnay-langhe-doc": {
    "name": "Chardonnay Langhe Doc",
    "category": "bianchi",
    "bottle": "/assets/img/wines/langhe-chardonnay.png",
    "tech": "/assets/wines/chardonnay-langhe-doc/scheda-tecnica.pdf",
    "hires": "/assets/wines/chardonnay-langhe-doc/hires.jpg",
    "vintages": [
      {
        "label": "2015",
        "pdf": "/assets/wines/chardonnay-langhe-doc/2015.pdf"
      }
    ]
  },
  "gaiun-martinenga-barbaresco-docg": {
    "name": "Gaiun Martinenga Barbaresco Docg",
    "category": "barbaresco",
    "bottle": "/assets/img/wines/gaiun.png",
    "tech": "/assets/wines/gaiun-martinenga-barbaresco-docg/scheda-tecnica.pdf",
    "hires": "/assets/wines/gaiun-martinenga-barbaresco-docg/hires.jpg",
    "vintages": [
      {
        "label": "2012",
        "pdf": "/assets/wines/gaiun-martinenga-barbaresco-docg/2012.pdf"
      },
      {
        "label": "2011",
        "pdf": "/assets/wines/gaiun-martinenga-barbaresco-docg/2011.pdf"
      },
      {
        "label": "2010",
        "pdf": "/assets/wines/gaiun-martinenga-barbaresco-docg/2010.pdf"
      },
      {
        "label": "2009",
        "pdf": "/assets/wines/gaiun-martinenga-barbaresco-docg/2009.pdf"
      },
      {
        "label": "2008",
        "pdf": "/assets/wines/gaiun-martinenga-barbaresco-docg/2008.pdf"
      },
      {
        "label": "2006",
        "pdf": "/assets/wines/gaiun-martinenga-barbaresco-docg/2006.pdf"
      },
      {
        "label": "2005",
        "pdf": "/assets/wines/gaiun-martinenga-barbaresco-docg/2005.pdf"
      },
      {
        "label": "2004",
        "pdf": "/assets/wines/gaiun-martinenga-barbaresco-docg/2004.pdf"
      }
    ]
  },
  "grappe": {
    "name": "Grappe",
    "category": "grappe",
    "bottle": "/assets/img/wines/grappa-di-barbaresco-camp-gros.png",
    "vintages": []
  },
  "gresy-chardonnay-langhe-doc": {
    "name": "Grésy Chardonnay Langhe Doc",
    "category": "bianchi",
    "bottle": "/assets/img/wines/gre-sy-chardonnay.png",
    "tech": "/assets/wines/gresy-chardonnay-langhe-doc/scheda-tecnica.pdf",
    "hires": "/assets/wines/gresy-chardonnay-langhe-doc/hires.jpg",
    "vintages": [
      {
        "label": "2014",
        "pdf": "/assets/wines/gresy-chardonnay-langhe-doc/2014.pdf"
      }
    ]
  },
  "la-serra-moscato-dasti-docg": {
    "name": "La Serra Moscato d'Asti Docg",
    "category": "dessert",
    "bottle": "/assets/img/wines/moscato-la-serra.png",
    "tech": "/assets/wines/la-serra-moscato-dasti-docg/scheda-tecnica.pdf",
    "hires": "/assets/wines/la-serra-moscato-dasti-docg/hires.jpg",
    "vintages": []
  },
  "laltro-moscato-piemonte-doc-moscato-passito": {
    "name": "L'Altro Moscato Piemonte Doc Moscato Passito",
    "category": "dessert",
    "bottle": "/assets/img/wines/l-altro-moscato.png",
    "tech": "/assets/wines/laltro-moscato-piemonte-doc-moscato-passito/scheda-tecnica.pdf",
    "hires": "/assets/wines/laltro-moscato-piemonte-doc-moscato-passito/hires.jpg",
    "vintages": []
  },
  "martinenga-barbaresco-docg": {
    "name": "Martinenga Barbaresco Docg",
    "category": "barbaresco",
    "bottle": "/assets/img/wines/martinenga.png",
    "tech": "/assets/wines/martinenga-barbaresco-docg/scheda-tecnica.pdf",
    "hires": "/assets/wines/martinenga-barbaresco-docg/hires.jpg",
    "vintages": [
      {
        "label": "2013",
        "pdf": "/assets/wines/martinenga-barbaresco-docg/2013.pdf"
      },
      {
        "label": "2012",
        "pdf": "/assets/wines/martinenga-barbaresco-docg/2012.pdf"
      },
      {
        "label": "2011",
        "pdf": "/assets/wines/martinenga-barbaresco-docg/2011.pdf"
      },
      {
        "label": "2010",
        "pdf": "/assets/wines/martinenga-barbaresco-docg/2010.pdf"
      },
      {
        "label": "2009",
        "pdf": "/assets/wines/martinenga-barbaresco-docg/2009.pdf"
      },
      {
        "label": "2008",
        "pdf": "/assets/wines/martinenga-barbaresco-docg/2008.pdf"
      },
      {
        "label": "2007",
        "pdf": "/assets/wines/martinenga-barbaresco-docg/2007.pdf"
      },
      {
        "label": "2006",
        "pdf": "/assets/wines/martinenga-barbaresco-docg/2006.pdf"
      },
      {
        "label": "2005",
        "pdf": "/assets/wines/martinenga-barbaresco-docg/2005.pdf"
      }
    ]
  },
  "martinenga-langhe-doc-nebbiolo": {
    "name": "Martinenga Langhe Doc Nebbiolo",
    "category": "quotidiani",
    "bottle": "/assets/img/wines/langhe-nebbiolo.png",
    "tech": "/assets/wines/martinenga-langhe-doc-nebbiolo/scheda-tecnica.pdf",
    "hires": "/assets/wines/martinenga-langhe-doc-nebbiolo/hires.jpg",
    "vintages": [
      {
        "label": "2015",
        "pdf": "/assets/wines/martinenga-langhe-doc-nebbiolo/2015.pdf"
      },
      {
        "label": "2013",
        "pdf": "/assets/wines/martinenga-langhe-doc-nebbiolo/2013.pdf"
      }
    ]
  },
  "merlot-dasolo-monferrato-doc-rosso": {
    "name": "Merlot daSolo Monferrato Doc Rosso",
    "category": "strutturati",
    "bottle": "/assets/img/wines/merlot-da-solo.png",
    "tech": "/assets/wines/merlot-dasolo-monferrato-doc-rosso/scheda-tecnica.pdf",
    "hires": "/assets/wines/merlot-dasolo-monferrato-doc-rosso/hires.jpg",
    "vintages": [
      {
        "label": "2008",
        "pdf": "/assets/wines/merlot-dasolo-monferrato-doc-rosso/2008.pdf"
      }
    ]
  },
  "monte-aribaldo-dolcetto-dalba-doc": {
    "name": "Monte Aribaldo Dolcetto d'Alba Doc",
    "category": "quotidiani",
    "bottle": "/assets/img/wines/monte-aribaldo-dolcetto-d-alba.png",
    "tech": "/assets/wines/monte-aribaldo-dolcetto-dalba-doc/scheda-tecnica.pdf",
    "hires": "/assets/wines/monte-aribaldo-dolcetto-dalba-doc/hires.jpg",
    "vintages": [
      {
        "label": "2015",
        "pdf": "/assets/wines/monte-aribaldo-dolcetto-dalba-doc/2015.pdf"
      },
      {
        "label": "2014",
        "pdf": "/assets/wines/monte-aribaldo-dolcetto-dalba-doc/2014.pdf"
      },
      {
        "label": "2013",
        "pdf": "/assets/wines/monte-aribaldo-dolcetto-dalba-doc/2013.pdf"
      }
    ]
  },
  "monte-colombo-barbera-dasti-doc": {
    "name": "Monte Colombo Barbera d'Asti Doc",
    "category": "strutturati",
    "bottle": "/assets/img/wines/monte-colombo-barbera-d-asti.png",
    "tech": "/assets/wines/monte-colombo-barbera-dasti-doc/scheda-tecnica.pdf",
    "hires": "/assets/wines/monte-colombo-barbera-dasti-doc/hires.jpg",
    "vintages": [
      {
        "label": "2012",
        "pdf": "/assets/wines/monte-colombo-barbera-dasti-doc/2012.pdf"
      },
      {
        "label": "2011",
        "pdf": "/assets/wines/monte-colombo-barbera-dasti-doc/2011.pdf"
      },
      {
        "label": "2010",
        "pdf": "/assets/wines/monte-colombo-barbera-dasti-doc/2010.pdf"
      }
    ]
  },
  "sauvignon-langhe-doc": {
    "name": "Sauvignon Langhe Doc",
    "category": "bianchi",
    "bottle": "/assets/img/wines/langhe-sauvignon.png",
    "tech": "/assets/wines/sauvignon-langhe-doc/scheda-tecnica.pdf",
    "hires": "/assets/wines/sauvignon-langhe-doc/hires.jpg",
    "vintages": [
      {
        "label": "2015",
        "pdf": "/assets/wines/sauvignon-langhe-doc/2015.pdf"
      },
      {
        "label": "2014",
        "pdf": "/assets/wines/sauvignon-langhe-doc/2014.pdf"
      }
    ]
  },
  "villa-giulia-langhe-doc-bianco": {
    "name": "Villa Giulia Langhe Doc Bianco",
    "category": "bianchi",
    "bottle": "/assets/img/wines/langhe-villa-giulia.png",
    "tech": "/assets/wines/villa-giulia-langhe-doc-bianco/scheda-tecnica.pdf",
    "hires": "/assets/wines/villa-giulia-langhe-doc-bianco/hires.jpg",
    "vintages": []
  },
  "villa-martis-langhe-doc-rosso": {
    "name": "Villa Martis Langhe Doc Rosso",
    "category": "strutturati",
    "bottle": "/assets/img/wines/villa-martis.png",
    "tech": "/assets/wines/villa-martis-langhe-doc-rosso/scheda-tecnica.pdf",
    "hires": "/assets/wines/villa-martis-langhe-doc-rosso/hires.jpg",
    "vintages": []
  },
  "virtus-langhe-doc-rosso": {
    "name": "Virtus Langhe Doc Rosso",
    "category": "strutturati",
    "bottle": "/assets/img/wines/virtus.png",
    "tech": "/assets/wines/virtus-langhe-doc-rosso/scheda-tecnica.pdf",
    "hires": "/assets/wines/virtus-langhe-doc-rosso/hires.jpg",
    "vintages": [
      {
        "label": "2007",
        "pdf": "/assets/wines/virtus-langhe-doc-rosso/2007.pdf"
      },
      {
        "label": "2006",
        "pdf": "/assets/wines/virtus-langhe-doc-rosso/2006.pdf"
      }
    ]
  }
};
