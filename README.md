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

## Data uitlezen en toevoegen

De app leest boeken alleen uit (via `getBooks`) en biedt geen manier om boeken toe te voegen.
Nieuwe boeken worden rechtstreeks toegevoegd aan [`data/books.json`](data/books.json) via git.

Tests draaien: `npm test` (gebruikt de ingebouwde Node.js testrunner, geen dependencies nodig).