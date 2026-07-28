# Instructies voor Claude

Dit bestand legt afspraken en aanwijzingen vast voor toekomstig werk van Claude in deze
repository, zodat ze niet steeds opnieuw uitgelegd hoeven te worden.

## Wat is dit project?

Geestverwantschap is de administratie van een boekenclub: welke boeken zijn gelezen en wat
vond ieder lid ervan. Het is een Next.js-app (App Router, JavaScript, geen TypeScript).

## Structuur

- `data/books.json` - de brondata: leden, toegestane genres en de lijst met boeken.
- `lib/boekenclub.js` - CommonJS-module met de logica om boeken te lezen/toe te voegen en te
  valideren (`readData`, `writeData`, `getBooks`, `addBook`, `validateBook`). Wordt zowel door
  de tests als door de Next.js-app gebruikt.
- `test/` - tests voor `lib/boekenclub.js`, draaien met de ingebouwde Node.js testrunner
  (`npm test`, geen dependencies nodig).
- `app/` - de Next.js App Router pagina's.
  - `app/page.js` - overzicht van alle boeken.
  - `app/boeken/nieuw/page.js` - formulier om een nieuw boek toe te voegen (via een Server
    Action die `addBook` aanroept).

## Conventies

- Domeintermen (velden, functienamen in `lib/boekenclub.js`, UI-teksten) zijn in het
  Nederlands, consistent met de rest van de codebase.
- `lib/boekenclub.js` blijft CommonJS (`require`/`module.exports`) - dit werkt prima binnen
  Next.js server components/Server Actions, dus hoeft niet naar ESM geconverteerd te worden.
- Houd `npm test` (de Node.js-testrunner) werkend los van de Next.js-toolchain; de tests
  raken alleen `lib/` en `data/`, niet `app/`.
- Geen ongebruikte abstracties toevoegen (bijv. een aparte API-laag) zolang Server Components
  en Server Actions rechtstreeks met `lib/boekenclub.js` kunnen praten.

## Bekende beperking bij geautomatiseerde runs

In de omgeving waarin deze wijziging is gemaakt, waren `npm install`, `npm run build` en
losstaande `node`/`gh`/`git fetch`-commando's niet toegestaan zonder handmatige goedkeuring,
waardoor build- en testverificatie niet automatisch kon worden uitgevoerd. Als je wilt dat
Claude dit in het vervolg wel zelf kan controleren, breid dan de `--allowedTools` uit met
bijvoorbeeld `Bash(npm install:*)`, `Bash(npm run build:*)` en `Bash(node --test:*)`.
