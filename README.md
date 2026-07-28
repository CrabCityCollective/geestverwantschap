# geestverwantschap

Administratie van de boekenclub: welke boeken zijn gelezen en wat vond iedereen ervan.
Gebouwd als Next.js-app (App Router) met TypeScript.

## App draaien

```bash
npm install
npm run dev
```

De app is dan te bereiken op `http://localhost:3000`. De homepage toont het overzicht van
gelezen boeken en beoordelingen. De app is alleen-lezen: er is geen pagina of formulier om
boeken toe te voegen of te wijzigen.

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

## Data opslaan en uitlezen

De app zelf leest boeken alleen uit (via `getBooks`) en biedt geen manier om boeken toe te
voegen. Voor scripts of eenmalig databeheer buiten de app om kan de module
`lib/boekenclub.ts` nog rechtstreeks gebruikt worden om boeken te lezen en toe te voegen:

```js
const { getBooks, addBook } = require('./lib/boekenclub.ts');

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

`addBook` gooit een foutmelding met uitleg als het genre ongeldig is, `jaartalEersteDruk` geen getal is, of als er een beoordeling van een lid ontbreekt.

Tests draaien: `npm test` (gebruikt de ingebouwde Node.js testrunner, geen dependencies nodig).