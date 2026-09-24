'use strict';

import type { Boek, Telling, GenreWaardering } from './types';

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

const GESLACHT_VOLGORDE: Record<string, number> = { Man: 0, Vrouw: 1 };

function telGeslachtVanAuteurs(boeken: Boek[]): Telling[] {
  return tellenPerWaarde(boeken, (boek) => boek.geslachtAuteur).sort((a, b) => {
    const volgordeA = GESLACHT_VOLGORDE[a.label] ?? 2;
    const volgordeB = GESLACHT_VOLGORDE[b.label] ?? 2;
    if (volgordeA !== volgordeB) {
      return volgordeA - volgordeB;
    }
    return b.aantal - a.aantal;
  });
}

function telGenres(boeken: Boek[]): Telling[] {
  return tellenPerWaarde(
    boeken.filter((boek) => Boolean(boek.genre)),
    (boek) => boek.genre as string
  ).sort((a, b) => b.aantal - a.aantal);
}

function telThemas(boeken: Boek[]): Telling[] {
  const tellingen = new Map<string, number>();
  for (const boek of boeken) {
    for (const thema of boek.themas ?? []) {
      tellingen.set(thema, (tellingen.get(thema) ?? 0) + 1);
    }
  }
  return Array.from(tellingen, ([label, aantal]) => ({ label, aantal })).sort((a, b) => b.aantal - a.aantal);
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
  const sterren = Object.values(boek.beoordelingen)
    .map((beoordeling) => beoordeling.sterren)
    .filter((sterren): sterren is number => typeof sterren === 'number');
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

function datumSorteerSleutel(boek: Boek): string {
  return boek.datumGelezen ?? `${boek.jaartalEersteDruk}`;
}

type SorteerRichting = 'nieuwste-eerst' | 'oudste-eerst';

function sorteerOpDatumGelezen(boeken: Boek[], richting: SorteerRichting = 'nieuwste-eerst'): Boek[] {
  const factor = richting === 'oudste-eerst' ? 1 : -1;
  return [...boeken].sort(
    (a, b) => factor * datumSorteerSleutel(a).localeCompare(datumSorteerSleutel(b))
  );
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

const MAX_STERREN = 5;

function sterrenVerdelingVoorLid(boeken: Boek[], lid: string): Telling[] {
  const tellingen = new Map<number, number>();
  for (const boek of boeken) {
    const sterren = boek.beoordelingen[lid]?.sterren;
    if (typeof sterren !== 'number') {
      continue;
    }
    tellingen.set(sterren, (tellingen.get(sterren) ?? 0) + 1);
  }
  return Array.from({ length: MAX_STERREN + 1 }, (_, sterren) => ({
    label: sterren === 1 ? '1 ster' : `${sterren} sterren`,
    aantal: tellingen.get(sterren) ?? 0,
  }));
}

function groepeerPerLocatie(boeken: Boek[]): { locatie: string; boeken: Boek[] }[] {
  const groepen = new Map<string, Boek[]>();
  for (const boek of boeken) {
    if (!boek.locatieBespreking) {
      continue;
    }
    const lijst = groepen.get(boek.locatieBespreking) ?? [];
    lijst.push(boek);
    groepen.set(boek.locatieBespreking, lijst);
  }
  return Array.from(groepen, ([locatie, boeken]) => ({ locatie, boeken }));
}

function topBoekenVoorLid(boeken: Boek[], lid: string, aantal = 3): Boek[] {
  return boeken
    .filter((boek) => typeof boek.beoordelingen[lid]?.sterren === 'number')
    .sort((a, b) => {
      const sterrenA = a.beoordelingen[lid].sterren as number;
      const sterrenB = b.beoordelingen[lid].sterren as number;
      if (sterrenA !== sterrenB) {
        return sterrenB - sterrenA;
      }
      return b.jaartalEersteDruk - a.jaartalEersteDruk;
    })
    .slice(0, aantal);
}

function besteBoekVoorLid(boeken: Boek[], lid: string): Boek | null {
  let beste: Boek | null = null;
  let besteSterren = -Infinity;
  for (const boek of boeken) {
    const sterren = boek.beoordelingen[lid]?.sterren;
    if (typeof sterren !== 'number') {
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

function genreWaardering(boeken: Boek[]): GenreWaardering[] {
  const groepen = new Map<string, { titel: string; gemiddelde: number }[]>();
  for (const boek of boeken) {
    if (!boek.genre) {
      continue;
    }
    const gemiddelde = gemiddeldeSterren(boek);
    if (gemiddelde === null) {
      continue;
    }
    const lijst = groepen.get(boek.genre) ?? [];
    lijst.push({ titel: boek.titel, gemiddelde });
    groepen.set(boek.genre, lijst);
  }
  return Array.from(groepen, ([genre, boekenVanGenre]) => {
    const gesorteerdeBoeken = [...boekenVanGenre].sort((a, b) => b.gemiddelde - a.gemiddelde);
    const gemiddelde =
      gesorteerdeBoeken.reduce((som, boek) => som + boek.gemiddelde, 0) / gesorteerdeBoeken.length;
    return { genre, gemiddelde, boeken: gesorteerdeBoeken };
  }).sort((a, b) => b.gemiddelde - a.gemiddelde);
}

function clubGemiddelde(boeken: Boek[]): number | null {
  const gemiddelden = boeken
    .map((boek) => gemiddeldeSterren(boek))
    .filter((gemiddelde): gemiddelde is number => gemiddelde !== null);
  if (gemiddelden.length === 0) {
    return null;
  }
  return gemiddelden.reduce((a, b) => a + b, 0) / gemiddelden.length;
}

module.exports = {
  telLandenVanAuteurs,
  telGeslachtVanAuteurs,
  telTijdvakken,
  telGenres,
  telThemas,
  gemiddeldeSterren,
  sorteerOpGemiddeldeSterren,
  datumSorteerSleutel,
  sorteerOpDatumGelezen,
  gemiddeldeSterrenGegeven,
  sterrenVerdelingVoorLid,
  besteBoekVoorLid,
  topBoekenVoorLid,
  groepeerPerLocatie,
  genreWaardering,
  clubGemiddelde,
};
