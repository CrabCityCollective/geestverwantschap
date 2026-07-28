# Instructies voor Claude

Dit bestand legt afspraken en aanwijzingen vast voor toekomstig werk van Claude in deze
repository, zodat ze niet steeds opnieuw uitgelegd hoeven te worden.

## Wat is dit project?

Geestverwantschap is de administratie van een boekenclub: welke boeken zijn gelezen en wat
vond ieder lid ervan. Het is een Next.js-app (App Router) met TypeScript voor de `app/`-laag.

## Structuur

- `data/books.json` - de brondata: leden, toegestane genres en de lijst met boeken.
- `lib/boekenclub.ts` - module met de logica om boeken te lezen/toe te voegen en te valideren
  (`readData`, `writeData`, `getBooks`, `addBook`, `validateBook`). Wordt zowel door de tests
  als door de Next.js-app gebruikt. Gebruikt intern nog `require`/`module.exports` (CommonJS),
  maar is getypeerd TypeScript; consumers importeren rechtstreeks vanuit dit bestand, er is
  geen los `.d.ts`-bestand meer nodig.
- `lib/types.ts` - gedeelde TypeScript-types (`Boek`, `Beoordeling`, `BoekenclubData`) die door
  `lib/boekenclub.ts` en de `app/`-pagina's gebruikt worden.
- `test/` - tests voor `lib/boekenclub.ts`, draaien met de ingebouwde Node.js testrunner
  (`npm test`, geen dependencies nodig).
- `app/` - de Next.js App Router pagina's, geschreven in TypeScript (`.tsx`). De app is
  alleen-lezen: ze toont het overzicht van boeken (`app/page.tsx`) via `getBooks`, maar heeft
  geen pagina, formulier of Server Action meer om boeken toe te voegen of te wijzigen.
  `addBook` blijft wel beschikbaar in `lib/boekenclub.ts` (en wordt getest), maar wordt bewust
  niet meer vanuit de `app/`-laag aangeroepen.
- `tsconfig.json` / `next-env.d.ts` - standaard Next.js TypeScript-configuratie.

## Conventies

- Domeintermen (velden, functienamen in `lib/boekenclub.ts`, UI-teksten) zijn in het
  Nederlands, consistent met de rest van de codebase.
- `lib/boekenclub.ts` gebruikt bewust nog `require`/`module.exports` in plaats van
  `import`/`export` voor de runtime-logica (alleen `import type` voor types, die volledig
  wordt weggehaald) - dit blijft zo compatibel met de Node.js-testrunner zonder buildstap of
  extra dependencies, en met Next.js server components/Server Actions.
- Nieuwe/aangepaste bestanden in `app/` zijn `.tsx` (of `.ts` voor niet-component modules), niet
  `.js`/`.jsx`.
- Houd `npm test` (de Node.js-testrunner) werkend los van de Next.js-toolchain; de tests
  raken alleen `lib/` en `data/`, niet `app/`.
- Geen ongebruikte abstracties toevoegen (bijv. een aparte API-laag) zolang Server Components
  en Server Actions rechtstreeks met `lib/boekenclub.ts` kunnen praten.
- De `app/`-laag mag geen manier bieden om boeken toe te voegen of te wijzigen (alleen
  uitlezen via `getBooks`/`readData`). Voeg geen nieuwe route, formulier of Server Action toe
  die `addBook`/`writeData` vanuit `app/` aanroept.

## Bekende beperking bij geautomatiseerde runs

In de omgeving waarin deze wijziging is gemaakt, waren `npm install`, `npm run build`,
`npm run typecheck` en losstaande `node`/`gh`/`git fetch`/`git mv`-commando's niet toegestaan
zonder handmatige goedkeuring, waardoor build-, typecheck- en testverificatie niet automatisch
kon worden uitgevoerd. Als je wilt dat Claude dit in het vervolg wel zelf kan controleren,
breid dan de `--allowedTools` uit met bijvoorbeeld `Bash(npm install:*)`,
`Bash(npm run build:*)`, `Bash(npm run typecheck:*)` en `Bash(node --test:*)`.

Concreet voor `lib/boekenclub.ts`: `npm test` (`node --test`) moet dit bestand rechtstreeks
kunnen draaien via Node's ingebouwde TypeScript type-stripping (geen `ts-node`/build nodig) -
dit vereist een recente Node.js-versie met type-stripping standaard aan (o.a. Node 22.18+/23.6+)
en alleen "erasable" TS-syntax (zoals hier gebruikt: type-annotaties en `import type`, geen
enums/decorators/namespaces). In deze omgeving kon `npm test` niet daadwerkelijk worden
uitgevoerd (zie hierboven) - controleer dit dus na wijzigingen aan dit bestand met `npm test`
zodra dat commando wel is toegestaan.
