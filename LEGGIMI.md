# LEGGIMI — Marchesi di Grésy

## Cos'è questa cartella
Questo è il **SITO NUOVO** (tecnologia Astro): quello che stiamo costruendo e che va
online su **https://mdg.serversite.it** (in futuro sostituirà il sito Webflow).
Tutte le modifiche al sito nuovo si fanno **qui dentro**.

## Le due cartelle da non confondere
| Cartella | Cos'è | Come vederla |
|---|---|---|
| `MARCHESIDIGRESY/` (questa) | il **sito NUOVO** → mdg.serversite.it | doppio clic su **`Guarda-sito-NUOVO.command`** |
| `../marchesidigresy-webflow-snapshot/` (cartella sorella) | **copia del sito attuale in PRODUZIONE** (Webflow live) | doppio clic su `Guarda-sito-PRODUZIONE.command` |

Sono separate apposta: qui NON c'è nessun file del sito Webflow.

## Cosa si modifica (i contenuti)
- **`content/`** → i testi delle pagine (file `.md`, uno per pagina; `content/en/` = versione inglese).
- **`public/assets/`** → immagini, video, PDF, font.
- **`design/`** → colori, tipografia, spaziature (lo stile del sito).
- **`src/`** → struttura e componenti delle pagine (parte tecnica).

## Cosa NON toccare (si generano da soli)
- **`dist/`** → il sito "compilato". Si rigenera a ogni build: non modificare i file qui, verrebbero sovrascritti.
- **`node_modules/`**, **`.astro/`** → librerie e cache tecniche.

## Come vedere il sito nuovo
Doppio clic su **`Guarda-sito-NUOVO.command`**: rigenera il sito con le ultime modifiche
e lo apre nel browser. Per chiudere, chiudi la finestra del Terminale.

## Come va online (in sintesi)
Build in locale → si aggiorna il branch `deploy` su GitHub → RunCloud pubblica su mdg.serversite.it.
Dettagli in [`docs/DEPLOY-RUNCLOUD.md`](docs/DEPLOY-RUNCLOUD.md). Piano generale in [`ROADMAP.md`](ROADMAP.md).
