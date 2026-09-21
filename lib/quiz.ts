'use strict';

import type { Boek, QuizVraag, QuizVraagType } from './types';

const MAX_STERREN = 5;
const OPTIES_PER_VRAAG = 4;

interface QuizKandidaat {
  type: QuizVraagType;
  quote: string;
  boekTitel: string;
  lid: string;
  sterren: number | 'n.v.t.';
}

function schud<T>(lijst: T[]): T[] {
  const resultaat = [...lijst];
  for (let i = resultaat.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [resultaat[i], resultaat[j]] = [resultaat[j], resultaat[i]];
  }
  return resultaat;
}

function kiesOpties(correct: string, andere: string[]): string[] {
  const afleiders = schud(andere.filter((waarde) => waarde !== correct)).slice(0, OPTIES_PER_VRAAG - 1);
  return schud([correct, ...afleiders]);
}

function verzamelKandidaten(boeken: Boek[]): QuizKandidaat[] {
  const kandidaten: QuizKandidaat[] = [];
  for (const boek of boeken) {
    for (const [lid, beoordeling] of Object.entries(boek.beoordelingen)) {
      if (!beoordeling.quote || !beoordeling.quote.trim()) {
        continue;
      }
      kandidaten.push({ type: 'boek', quote: beoordeling.quote, boekTitel: boek.titel, lid, sterren: beoordeling.sterren });
      kandidaten.push({ type: 'lid', quote: beoordeling.quote, boekTitel: boek.titel, lid, sterren: beoordeling.sterren });
      if (typeof beoordeling.sterren === 'number') {
        kandidaten.push({
          type: 'sterren',
          quote: beoordeling.quote,
          boekTitel: boek.titel,
          lid,
          sterren: beoordeling.sterren,
        });
      }
    }
  }
  return kandidaten;
}

function bouwVraag(kandidaat: QuizKandidaat, titels: string[], leden: string[]): QuizVraag | null {
  if (kandidaat.type === 'boek') {
    const andereTitels = titels.filter((titel) => titel !== kandidaat.boekTitel);
    if (andereTitels.length < OPTIES_PER_VRAAG - 1) {
      return null;
    }
    return {
      type: 'boek',
      quote: kandidaat.quote,
      vraag: 'Bij welk boek hoort deze quote?',
      antwoord: kandidaat.boekTitel,
      opties: kiesOpties(kandidaat.boekTitel, andereTitels),
    };
  }

  if (kandidaat.type === 'lid') {
    const andereLeden = leden.filter((lid) => lid !== kandidaat.lid);
    if (andereLeden.length < OPTIES_PER_VRAAG - 1) {
      return null;
    }
    return {
      type: 'lid',
      quote: kandidaat.quote,
      vraag: 'Van wie is deze quote?',
      antwoord: kandidaat.lid,
      opties: kiesOpties(kandidaat.lid, andereLeden),
    };
  }

  if (typeof kandidaat.sterren !== 'number') {
    return null;
  }
  const alleSterren = Array.from({ length: MAX_STERREN + 1 }, (_, sterren) => String(sterren));
  if (alleSterren.length - 1 < OPTIES_PER_VRAAG - 1) {
    return null;
  }
  return {
    type: 'sterren',
    quote: kandidaat.quote,
    vraag: 'Hoeveel sterren hoorden bij deze quote?',
    antwoord: String(kandidaat.sterren),
    opties: kiesOpties(String(kandidaat.sterren), alleSterren),
  };
}

function genereerQuizVragen(boeken: Boek[], leden: string[], aantal: number = 20): QuizVraag[] {
  const titels = Array.from(new Set(boeken.map((boek) => boek.titel)));
  const kandidaten = schud(verzamelKandidaten(boeken));
  const vragen: QuizVraag[] = [];
  for (const kandidaat of kandidaten) {
    if (vragen.length >= aantal) {
      break;
    }
    const vraag = bouwVraag(kandidaat, titels, leden);
    if (vraag) {
      vragen.push(vraag);
    }
  }
  return vragen;
}

module.exports = {
  genereerQuizVragen,
};
