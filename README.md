# La mia libreria

Sito statico per il tuo scaffale personale di recensioni. Nessun server, nessuna build: solo HTML, CSS e JavaScript che leggono `data/books.json`.

## Struttura

```
index.html        pagina principale
css/style.css      stile
js/app.js          logica (scaffale, ricerca, filtri, pagina di dettaglio)
data/books.json    i tuoi libri — sostituiscilo con la tua lista completa
```

## Come aggiungere i tuoi libri

Apri `data/books.json`: è un elenco di libri, ognuno con questi campi:

```json
{
  "titolo": "Titolo del libro",
  "autore": "Nome Autore",
  "voto": 4.5,
  "genere": "Narrativa italiana",
  "recensione": "La tua recensione",
  "data": "2026-08-09"
}
```

Solo `titolo` è obbligatorio — tutti gli altri campi puoi lasciarli vuoti o ometterli. Non serve un `id`: viene generato da solo a partire dal titolo. Non serve `owner`: è un sito personale, non ce n'è bisogno.

- `voto`: un numero da 0 a 5, anche con mezzi punti (es. `3.5`).
- `data`: formato `AAAA-MM-GG` (anno-mese-giorno) — usala per decidere quali libri compaiono in cima alla libreria (i più recenti prima). Se la ometti, il libro finisce in fondo.
- `genere`: il colore della copertina viene assegnato automaticamente in base al genere — generi diversi hanno sempre colori diversi, non devi gestirli tu.

Per aggiungere un libro, copia un blocco `{ ... }` esistente, incollalo (ricordando la virgola tra un libro e l'altro) e cambia i valori. Non serve nessun tool speciale: puoi editare il file direttamente su GitHub (matita in alto a destra sul file, poi *Commit changes*) oppure in locale e poi fare push.

## Pubblicare su GitHub Pages

Hai già un account GitHub ma non un repository — ecco i passaggi. Trovi la stessa procedura, più interattiva, nella mia risposta in chat.

1. Crea un nuovo repository su github.com (es. `la-mia-libreria`), pubblico, senza README iniziale.
2. Carica questi file mantenendo la struttura di cartelle (drag & drop nella pagina del repo, oppure `git push`).
3. Vai su **Settings → Pages**, in "Build and deployment" scegli **Deploy from a branch**, branch `main`, cartella `/ (root)`, poi Save.
4. Dopo 1–2 minuti il sito sarà live su `https://TUO-USERNAME.github.io/la-mia-libreria/`.
5. Ogni volta che modifichi `data/books.json` (anche direttamente su GitHub, con l'editor a matita) e fai commit, il sito si aggiorna da solo in circa un minuto.

## Personalizzare

- Colori, font e dimensioni delle copertine: `css/style.css`, variabili in cima al file (`:root`).
- I colori dei generi sono generati automaticamente e restano sempre distinti tra loro, qualunque sia il numero di generi (vedi `buildGenreColors` in `js/app.js`).
- Se vuoi cambiare il testo dell'intestazione, modifica direttamente `index.html`.
