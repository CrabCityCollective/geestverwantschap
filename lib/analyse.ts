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

module.exports = {
  telLandenVanAuteurs,
  telGeslachtVanAuteurs,
  telTijdvakken,
};
