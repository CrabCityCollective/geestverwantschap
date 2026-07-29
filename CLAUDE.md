# Instructies voor Claude

Dit bestand legt afspraken en aanwijzingen vast voor toekomstig werk van Claude in deze
repository, zodat ze niet steeds opnieuw uitgelegd hoeven te worden.

## Wat is dit project?

Geestverwantschap is de administratie van een boekenclub: welke boeken zijn gelezen en wat
vond ieder lid ervan. Het is een Next.js-app (App Router) met TypeScript voor de `app/`-laag.

## Structuur

- `data/books.json` - de brondata: leden, toegestane genres en de lijst met boeken. Nieuwe
  boeken worden rechtstreeks in dit bestand toegevoegd via git, niet via de app of `lib/`.
- `lib/boekenclub.ts` - module met de logica om boeken te lezen (`readData`, `getBooks`).
  Bevat bewust geen functies meer om boeken op te slaan of toe te voegen (`writeData`,
  `addBook`, `validateBook` zijn verwijderd) - boeken worden samen via git aan
  `data/books.json` toegevoegd. Wordt zowel door de tests als door de Next.js-app gebruikt.
  Gebruikt intern nog `require`/`module.exports` (CommonJS), maar is getypeerd TypeScript.
  Let op: TypeScript kan de vorm van `module.exports = {...}` in een `.ts`-bestand niet
  afleiden voor andere bestanden (dit geeft `TS2459` bij een gewone
  `import { getBooks } from './lib/boekenclub'` in `app/`) - zie de importafspraak hieronder
  bij "Conventies". Hetzelfde geldt voor `lib/analyse.ts`.
- `lib/types.ts` - gedeelde TypeScript-types (`Boek`, `Beoordeling`, `BoekenclubData`) die door
  `lib/boekenclub.ts` en de `app/`-pagina's gebruikt worden.
- `test/` - tests voor `lib/boekenclub.ts`, draaien met de ingebouwde Node.js testrunner
  (`npm test`, geen dependencies nodig).
- `app/` - de Next.js App Router pagina's, geschreven in TypeScript (`.tsx`). De app is
  alleen-lezen: ze toont het overzicht van boeken (`app/page.tsx`) via `getBooks`, maar heeft
  geen pagina, formulier of Server Action om boeken toe te voegen of te wijzigen.
- `tsconfig.json` / `next-env.d.ts` - standaard Next.js TypeScript-configuratie.

## Conventies

- Domeintermen (velden, functienamen in `lib/boekenclub.ts`, UI-teksten) zijn in het
  Nederlands, consistent met de rest van de codebase.
- `lib/boekenclub.ts` en `lib/analyse.ts` gebruiken bewust nog `require`/`module.exports` in
  plaats van `import`/`export` voor de runtime-logica (alleen `import type` voor types, die
  volledig wordt weggehaald) - dit blijft zo compatibel met de Node.js-testrunner zonder
  buildstap of extra dependencies, en met Next.js server components/Server Actions.
- Omdat TypeScript de vorm van `module.exports = {...}` in een `.ts`-bestand niet kan afleiden
  (zie hierboven bij "Structuur"), importeren `app/page.tsx` en `app/analyse/page.tsx` deze
  modules met een namespace-import en een expliciete cast naar het echte functiesignatuur, in
  plaats van een gewone named import:
  ```ts
  import * as boekenclub from '../lib/boekenclub';
  const { getBooks } = boekenclub as unknown as { getBooks: (filePath?: string) => Boek[] };
  ```
  Gebruik dit patroon (namespace-import + `as unknown as { ... }`-cast met het echte
  functiesignatuur) voor elke nieuwe `app/`-pagina die `lib/boekenclub.ts` of `lib/analyse.ts`
  gebruikt - een gewone `import { getBooks } from '../lib/boekenclub'` geeft `TS2459` bij
  `npm run typecheck`/`npm run build`. Dit is geen `.d.ts`-bestand (blijft dus onnodig, zoals
  hierboven vermeld), en verandert niets aan `lib/boekenclub.ts`/`lib/analyse.ts` zelf of aan
  `tsconfig.json`.
- Nieuwe/aangepaste bestanden in `app/` zijn `.tsx` (of `.ts` voor niet-component modules), niet
  `.js`/`.jsx`.
- Houd `npm test` (de Node.js-testrunner) werkend los van de Next.js-toolchain; de tests
  raken alleen `lib/` en `data/`, niet `app/`.
- Geen ongebruikte abstracties toevoegen (bijv. een aparte API-laag) zolang Server Components
  en Server Actions rechtstreeks met `lib/boekenclub.ts` kunnen praten.
- De `app/`-laag mag geen manier bieden om boeken toe te voegen of te wijzigen (alleen
  uitlezen via `getBooks`/`readData`). Voeg geen nieuwe route, formulier of Server Action toe
  om boeken toe te voegen of te wijzigen, en voeg ook geen `writeData`/`addBook`/`validateBook`
  meer toe aan `lib/boekenclub.ts` - nieuwe boeken worden samen via git aan
  `data/books.json` toegevoegd.

## Bekende beperking bij geautomatiseerde runs

De workflow (`.github/workflows/claude.yml`) staat inmiddels `Bash(npm install)`,
`Bash(npm run build)`, `Bash(npm run typecheck:*)`, `Bash(npm test)`/`Bash(node --test:*)` en
`Bash(npm run lint:*)` toe zonder handmatige goedkeuring - dit is geverifieerd door de
commando's daadwerkelijk uit te voeren (Node 22.23.1): `npm install`, `npm test` (6/6 tests
slagen), `npm run typecheck` en `npm run build` draaien allemaal succesvol. Losstaande
`node -e`/`gh`/`git fetch`/`git mv`/`git checkout -- <bestand>`-commando's (en andere
commando's buiten deze lijst) vereisen nog wel handmatige goedkeuring; breid de
`--allowedTools` verder uit als je wilt dat Claude die voortaan ook zelf mag draaien.

Concreet voor `lib/boekenclub.ts`/`lib/analyse.ts`: `npm test` (`node --test`) draait deze
bestanden rechtstreeks via Node's ingebouwde TypeScript type-stripping (geen `ts-node`/build
nodig) - dit vereist een recente Node.js-versie met type-stripping standaard aan (o.a. Node
22.18+/23.6+) en alleen "erasable" TS-syntax (zoals hier gebruikt: type-annotaties en
`import type`, geen enums/decorators/namespaces). Controleer dit na wijzigingen aan deze
bestanden met `npm test`.

`npm run build`/`npm run typecheck` (dus `tsc` via Next.js) hebben wel het importpatroon uit
"Conventies" nodig voor `app/`-bestanden die `lib/boekenclub.ts`/`lib/analyse.ts` gebruiken -
zie de uitleg daar over `TS2459` en de namespace-import-met-cast.
