# Instructies voor Claude

Dit bestand legt afspraken en aanwijzingen vast voor toekomstig werk van Claude in deze
repository, zodat ze niet steeds opnieuw uitgelegd hoeven te worden.

## Wat is dit project?

Geestverwantschap is de administratie van een boekenclub: welke boeken zijn gelezen en wat
vond ieder lid ervan. Het is een Next.js-app (App Router) met TypeScript voor de `app/`-laag.

## Structuur

- `data/books.json` - de brondata: leden, toegestane genres en de lijst met boeken.
- `lib/boekenclub.js` - CommonJS-module met de logica om boeken te lezen/toe te voegen en te
  valideren (`readData`, `writeData`, `getBooks`, `addBook`, `validateBook`). Wordt zowel door
  de tests als door de Next.js-app gebruikt. Blijft bewust JavaScript (zie Conventies), maar
  heeft een `lib/boekenclub.d.ts` met typedeclaraties zodat TypeScript-code er getypeerd
  tegenaan kan praten.
- `lib/types.ts` - gedeelde TypeScript-types (`Boek`, `Beoordeling`, `BoekenclubData`) die door
  `lib/boekenclub.d.ts` en de `app/`-pagina's gebruikt worden.
- `test/` - tests voor `lib/boekenclub.js`, draaien met de ingebouwde Node.js testrunner
  (`npm test`, geen dependencies nodig).
- `app/` - de Next.js App Router pagina's, geschreven in TypeScript (`.tsx`).
  - `app/page.tsx` - overzicht van alle boeken.
  - `app/boeken/nieuw/page.tsx` - formulier om een nieuw boek toe te voegen (via een Server
    Action die `addBook` aanroept).
- `tsconfig.json` / `next-env.d.ts` - standaard Next.js TypeScript-configuratie.

## Conventies

- Domeintermen (velden, functienamen in `lib/boekenclub.js`, UI-teksten) zijn in het
  Nederlands, consistent met de rest van de codebase.
- `lib/boekenclub.js` blijft CommonJS (`require`/`module.exports`) - dit werkt prima binnen
  Next.js server components/Server Actions, dus hoeft niet naar ESM of TypeScript geconverteerd
  te worden. Typering voor TS-consumers loopt via het losse `lib/boekenclub.d.ts` bestand; pas
  die aan wanneer de functiesignaturen in `lib/boekenclub.js` wijzigen.
- Nieuwe/aangepaste bestanden in `app/` zijn `.tsx` (of `.ts` voor niet-component modules), niet
  `.js`/`.jsx`.
- Houd `npm test` (de Node.js-testrunner) werkend los van de Next.js-toolchain; de tests
  raken alleen `lib/` en `data/`, niet `app/`.
- Geen ongebruikte abstracties toevoegen (bijv. een aparte API-laag) zolang Server Components
  en Server Actions rechtstreeks met `lib/boekenclub.js` kunnen praten.

## Bekende beperking bij geautomatiseerde runs

In de omgeving waarin deze wijziging is gemaakt, waren `npm install`, `npm run build`,
`npm run typecheck` en losstaande `node`/`gh`/`git fetch`/`git mv`-commando's niet toegestaan
zonder handmatige goedkeuring, waardoor build-, typecheck- en testverificatie niet automatisch
kon worden uitgevoerd. Als je wilt dat Claude dit in het vervolg wel zelf kan controleren,
breid dan de `--allowedTools` uit met bijvoorbeeld `Bash(npm install:*)`,
`Bash(npm run build:*)`, `Bash(npm run typecheck:*)` en `Bash(node --test:*)`.
