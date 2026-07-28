# CLAUDE.md

Instructions and notes for Claude when working in this repository.

## Project

- This is a **Next.js** app (App Router, TypeScript, Tailwind CSS).
- Entry point: `src/app/layout.tsx` and `src/app/page.tsx`.
- Path alias `@/*` maps to `src/*` (see `tsconfig.json`).

## Setup & verification

- Install dependencies with `npm install`, then verify changes with `npm run build` and `npm run lint`.
- The initial Next.js scaffold in this repo was created by hand (files written directly) because the
  automated environment that first set up this project did not have `npm`/`npx` in its allowed tools,
  so `npm install`/`npm run build` could not be run to verify the scaffold. **The first time you touch
  this project, run `npm install && npm run build && npm run lint` and fix anything that doesn't pass
  before trusting the app builds.**
- If `npm`/`npx` commands are blocked ("this command requires approval") in an automated run, say so
  explicitly in the report back to the user instead of silently skipping verification, and suggest they
  add `Bash(npm:*)` / `Bash(npx:*)` to `--allowedTools`.

## Conventions

- Keep new pages/components under `src/app` (or `src/components` once it exists), following App Router
  conventions (`page.tsx`, `layout.tsx`, `route.ts`, etc.).
- Prefer Tailwind utility classes for styling over new CSS files.
- Keep dependencies minimal; don't add a state management/UI library unless the task actually needs it.

## Communication

- The issue/PR author (CrabCityCollective) writes in Dutch; it's fine to respond in Dutch or English,
  but keep code, comments, and identifiers in English as usual.
