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

Apri `data/books.json` e sostituisci il contenuto con il tuo array completo (lo stesso formato che mi hai incollato). Ogni libro segue questo schema:

```json
{
  "id": 1752347795,
  "title": "Titolo del libro",
  "author": "Nome Autore",
  "rating": 4.5,
  "review": "La tua recensione",
  "owner": "12",
  "added_on": "2025-07-12T19:16:35.496968",
  "genere": "Narrativa italiana"
}
```

Campi obbligatori perché il sito funzioni: `id` (univoco), `title`. Tutti gli altri sono opzionali ma consigliati. Il colore della "costina" del libro sullo scaffale viene assegnato automaticamente in base al `genere`.

Non serve nessun tool speciale per modificare il file: puoi editarlo direttamente su GitHub (vedi sotto) oppure in locale e poi fare push.

## Pubblicare su GitHub Pages

Hai già un account GitHub ma non un repository — ecco i passaggi. Trovi la stessa procedura, più interattiva, nella mia risposta in chat.

1. Crea un nuovo repository su github.com (es. `la-mia-libreria`), pubblico, senza README iniziale.
2. Carica questi file mantenendo la struttura di cartelle (drag & drop nella pagina del repo, oppure `git push`).
3. Vai su **Settings → Pages**, in "Build and deployment" scegli **Deploy from a branch**, branch `main`, cartella `/ (root)`, poi Save.
4. Dopo 1–2 minuti il sito sarà live su `https://TUO-USERNAME.github.io/la-mia-libreria/`.
5. Ogni volta che modifichi `data/books.json` (anche direttamente su GitHub, con l'editor a matita) e fai commit, il sito si aggiorna da solo in circa un minuto.

## Personalizzare

- Colori, font e dimensioni dello scaffale: `css/style.css`, variabili in cima al file (`:root`).
- Il numero di generi determina i colori delle costine (si ripetono ciclicamente su 6 tonalità se hai più di 6 generi).
- Se vuoi cambiare il testo dell'intestazione, modifica direttamente `index.html`.
