'use strict';

import type { Boek, Telling } from './types';

function tellenPerWaarde(boeken: Boek[], waarde: (boek: Boek) => string): Telling[] {
  const tellingen = new Map<string, number>();
  for (const boek of boeken) {
    const key = waarde(boek);
    tellingen.set(key, (tellingen.get(key) ?? 0) + 1);
  }
  return Array.from(tellingen, ([label, aantal]) => ({ label, aantal }));
}

function telLandenVanAuteurs(boeken: Boek[]): Telling[] {
  return tellenPerWaarde(boeken, (boek) => boek.landVanHerkomstAuteur).sort((a, b) => b.aantal - a.aantal);
}

function telGeslachtVanAuteurs(boeken: Boek[]): Telling[] {
  return tellenPerWaarde(boeken, (boek) => boek.geslachtAuteur).sort((a, b) => b.aantal - a.aantal);
}

function bepaalDecennium(jaartal: number): string {
  const start = Math.floor(jaartal / 10) * 10;
  return `${start}-${start + 9}`;
}

function telTijdvakken(boeken: Boek[]): Telling[] {
  return tellenPerWaarde(boeken, (boek) => bepaalDecennium(boek.jaartalEersteDruk)).sort((a, b) =>
    a.label.localeCompare(b.label)
  );
}

function gemiddeldeSterren(boek: Boek): number | null {
  const sterren = Object.values(boek.beoordelingen).map((beoordeling) => beoordeling.sterren);
  if (sterren.length === 0) {
    return null;
  }
  return sterren.reduce((a, b) => a + b, 0) / sterren.length;
}

function sorteerOpGemiddeldeSterren(boeken: Boek[]): Boek[] {
  return [...boeken].sort((a, b) => {
    const gemiddeldeA = gemiddeldeSterren(a);
    const gemiddeldeB = gemiddeldeSterren(b);
    if (gemiddeldeA === null && gemiddeldeB === null) {
      return 0;
    }
    if (gemiddeldeA === null) {
      return 1;
    }
    if (gemiddeldeB === null) {
      return -1;
    }
    return gemiddeldeB - gemiddeldeA;
  });
}

function gemiddeldeSterrenGegeven(boeken: Boek[], lid: string): number | null {
  const sterren = boeken
    .map((boek) => boek.beoordelingen[lid]?.sterren)
    .filter((sterren): sterren is number => typeof sterren === 'number');
  if (sterren.length === 0) {
    return null;
  }
  return sterren.reduce((a, b) => a + b, 0) / sterren.length;
}

function besteBoekVoorLid(boeken: Boek[], lid: string): Boek | null {
  let beste: Boek | null = null;
  let besteSterren = -Infinity;
  for (const boek of boeken) {
    const sterren = boek.beoordelingen[lid]?.sterren;
    if (sterren === undefined) {
      continue;
    }
    const isBeter =
      sterren > besteSterren ||
      (sterren === besteSterren && (boek.datumGelezen ?? '') > (beste?.datumGelezen ?? ''));
    if (isBeter) {
      beste = boek;
      besteSterren = sterren;
    }
  }
  return beste;
}

module.exports = {
  telLandenVanAuteurs,
  telGeslachtVanAuteurs,
  telTijdvakken,
  gemiddeldeSterren,
  sorteerOpGemiddeldeSterren,
  gemiddeldeSterrenGegeven,
  besteBoekVoorLid,
};
