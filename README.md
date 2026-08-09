# La mia libreria

Sito statico, HTML, CSS e JavaScript che leggono `data/books.json`.

## Struttura

```
index.html        pagina principale
css/style.css      stile
js/app.js          logica (scaffale, ricerca, filtri, pagina di dettaglio)
data/books.json    i tuoi libri — sostituiscilo con la tua lista completa
```

## Come aggiungere i tuoi libri

Aprire `data/books.json` e sostituisci il contenuto. Ogni libro segue questo schema:

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




## Personalizzare

- Colori, font e dimensioni dello scaffale: `css/style.css`, variabili in cima al file (`:root`).
- Il numero di generi determina i colori delle costine (si ripetono ciclicamente su 6 tonalità se hai più di 6 generi).
- Si può cambiare il testo dell'intestazione, modificare direttamente `index.html`.
