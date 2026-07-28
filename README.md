# geestverwantschap

Administratie van de boekenclub: welke boeken zijn gelezen en wat vond iedereen ervan. Dit is een
[Next.js](https://nextjs.org) app (App Router, TypeScript, Tailwind CSS) die de boekengegevens uitleest.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result. De homepage leest
[`data/books.json`](data/books.json) uit en toont de leden, genres en gelezen boeken.

## Project structure

- `src/app` — App Router pages, layouts, and global styles.
- `data/books.json` — de boekengegevens (leden, genres, gelezen boeken en beoordelingen).
- `lib/boekenclub.js` — helpers om `data/books.json` te lezen, valideren en schrijven.
- `test` — tests voor `lib/boekenclub.js`.
- `public` — static assets.

## Data

De boeken staan in [`data/books.json`](data/books.json). Dit bestand bevat:

- `leden`: de leden van de boekenclub.
- `genres`: de toegestane genres.
- `boeken`: de lijst met gelezen boeken. Elk boek heeft:
  - `titel`, `auteur`, `landVanHerkomstAuteur`, `geslachtAuteur`
  - `genre` (moet voorkomen in `genres`)
  - `landSetting`, `tijdSetting` (land en tijd waarin het boek zich afspeelt)
  - `jaartalEersteDruk`
  - `beoordelingen`: per lid van de boekenclub een object met `sterren` (0 t/m 5) en `quote`

Een nieuw boek toevoegen hoeft niet via de app: je kunt `data/books.json` gewoon rechtstreeks op
GitHub bewerken (of lokaal, met `lib/boekenclub.js` om het te valideren, zie hieronder).

### Data lezen en schrijven met `lib/boekenclub.js`

```js
const { getBooks, addBook } = require('./lib/boekenclub');

// Uitlezen
const boeken = getBooks();

// Opslaan (valideert genre, jaartal en beoordelingen van alle leden)
addBook({
  titel: 'Voorbeeldboek',
  auteur: 'Voorbeeld Auteur',
  landVanHerkomstAuteur: 'Nederland',
  geslachtAuteur: 'vrouw',
  genre: 'literaire fictie',
  landSetting: 'Nederland',
  tijdSetting: 'heden',
  jaartalEersteDruk: 2020,
  beoordelingen: {
    Chris: { sterren: 4, quote: 'Mooi boek.' },
    Esther: { sterren: 5, quote: 'Prachtig geschreven.' },
    Jelte: { sterren: 3, quote: 'Prima, niet meer dan dat.' },
    Ruben: { sterren: 4, quote: 'Verrassend goed.' },
    'Min Ae': { sterren: 5, quote: 'Een van mijn favorieten.' },
    Jet: { sterren: 4, quote: 'Sterk verhaal.' },
    Robbie: { sterren: 3, quote: 'Kon me niet altijd boeien.' },
  },
});
```

`addBook` gooit een foutmelding met uitleg als het genre ongeldig is, `jaartalEersteDruk` geen getal is,
of als er een beoordeling van een lid ontbreekt.

## Scripts

- `npm run dev` — start the development server.
- `npm run build` — build for production.
- `npm run start` — run the production build.
- `npm run lint` — run ESLint.
- `npm test` — run the `lib/boekenclub.js` tests (gebruikt de ingebouwde Node.js testrunner, geen
  dependencies nodig).

See [CLAUDE.md](./CLAUDE.md) for repo-specific instructions used by Claude when working on this project.
