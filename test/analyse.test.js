'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const {
  telLandenVanAuteurs,
  telGeslachtVanAuteurs,
  telTijdvakken,
  gemiddeldeSterren,
  sorteerOpGemiddeldeSterren,
  gemiddeldeSterrenGegeven,
  besteBoekVoorLid,
  groepeerPerLocatie,
} = require('../lib/analyse.ts');

const boeken = [
  {
    titel: 'A',
    auteur: 'X',
    landVanHerkomstAuteur: 'Nederland',
    geslachtAuteur: 'Vrouw',
    uitgekozenDoor: 'Chris',
    jaartalEersteDruk: 2001,
    beoordelingen: {},
  },
  {
    titel: 'B',
    auteur: 'Y',
    landVanHerkomstAuteur: 'Nederland',
    geslachtAuteur: 'Man',
    uitgekozenDoor: 'Esther',
    jaartalEersteDruk: 2005,
    beoordelingen: {},
  },
  {
    titel: 'C',
    auteur: 'Z',
    landVanHerkomstAuteur: 'Frankrijk',
    geslachtAuteur: 'Man',
    uitgekozenDoor: 'Chris',
    jaartalEersteDruk: 1994,
    beoordelingen: {},
  },
];

test('telLandenVanAuteurs telt boeken per land en sorteert aflopend', () => {
  assert.deepEqual(telLandenVanAuteurs(boeken), [
    { label: 'Nederland', aantal: 2 },
    { label: 'Frankrijk', aantal: 1 },
  ]);
});

test('telGeslachtVanAuteurs telt boeken per geslacht en sorteert aflopend', () => {
  assert.deepEqual(telGeslachtVanAuteurs(boeken), [
    { label: 'Man', aantal: 2 },
    { label: 'Vrouw', aantal: 1 },
  ]);
});

test('telTijdvakken groepeert op decennium en sorteert chronologisch', () => {
  assert.deepEqual(telTijdvakken(boeken), [
    { label: '1990-1999', aantal: 1 },
    { label: '2000-2009', aantal: 2 },
  ]);
});

test('lege lijst geeft lege tellingen', () => {
  assert.deepEqual(telLandenVanAuteurs([]), []);
});

const boekenMetSterren = [
  {
    titel: 'Laag beoordeeld, langst geleden gelezen',
    auteur: 'X',
    landVanHerkomstAuteur: 'Nederland',
    geslachtAuteur: 'Vrouw',
    uitgekozenDoor: 'Chris',
    jaartalEersteDruk: 2001,
    datumGelezen: '2026-01-01',
    beoordelingen: { Chris: { sterren: 2, quote: '' }, Esther: { sterren: 4, quote: '' } },
  },
  {
    titel: 'Hoog beoordeeld, meest recent gelezen',
    auteur: 'Y',
    landVanHerkomstAuteur: 'Nederland',
    geslachtAuteur: 'Man',
    uitgekozenDoor: 'Esther',
    jaartalEersteDruk: 2005,
    datumGelezen: '2026-06-01',
    beoordelingen: { Chris: { sterren: 5, quote: '' } },
  },
  {
    titel: 'Ook hoog beoordeeld, maar minder recent gelezen',
    auteur: 'Z',
    landVanHerkomstAuteur: 'Frankrijk',
    geslachtAuteur: 'Man',
    uitgekozenDoor: 'Chris',
    jaartalEersteDruk: 1994,
    datumGelezen: '2026-03-01',
    beoordelingen: { Chris: { sterren: 5, quote: '' } },
  },
  {
    titel: 'Niet beoordeeld',
    auteur: 'W',
    landVanHerkomstAuteur: 'Frankrijk',
    geslachtAuteur: 'Man',
    uitgekozenDoor: 'Chris',
    jaartalEersteDruk: 1990,
    beoordelingen: {},
  },
];

test('gemiddeldeSterren berekent het gemiddelde van alle beoordelingen van een boek', () => {
  assert.equal(gemiddeldeSterren(boekenMetSterren[0]), 3);
});

test('gemiddeldeSterren geeft null voor een boek zonder beoordelingen', () => {
  assert.equal(gemiddeldeSterren(boekenMetSterren[3]), null);
});

test('sorteerOpGemiddeldeSterren sorteert aflopend op gemiddelde en zet onbeoordeelde boeken achteraan', () => {
  assert.deepEqual(
    sorteerOpGemiddeldeSterren(boekenMetSterren).map((boek) => boek.titel),
    [
      'Hoog beoordeeld, meest recent gelezen',
      'Ook hoog beoordeeld, maar minder recent gelezen',
      'Laag beoordeeld, langst geleden gelezen',
      'Niet beoordeeld',
    ]
  );
});

test('gemiddeldeSterrenGegeven berekent het gemiddelde van de sterren die een lid gaf', () => {
  assert.equal(gemiddeldeSterrenGegeven(boekenMetSterren, 'Chris'), (2 + 5 + 5) / 3);
});

test('gemiddeldeSterrenGegeven geeft null als een lid nog niets beoordeeld heeft', () => {
  assert.equal(gemiddeldeSterrenGegeven(boekenMetSterren, 'Jelte'), null);
});

test('besteBoekVoorLid geeft het boek met de hoogste sterren van dat lid, bij gelijke stand het meest recent gelezen boek', () => {
  assert.equal(besteBoekVoorLid(boekenMetSterren, 'Chris').titel, 'Hoog beoordeeld, meest recent gelezen');
});

test('besteBoekVoorLid geeft null als een lid nog niets beoordeeld heeft', () => {
  assert.equal(besteBoekVoorLid(boekenMetSterren, 'Jelte'), null);
});

const boekenMetLocatie = [
  {
    titel: 'A',
    auteur: 'X',
    landVanHerkomstAuteur: 'Nederland',
    geslachtAuteur: 'Vrouw',
    uitgekozenDoor: 'Chris',
    jaartalEersteDruk: 2001,
    locatieBespreking: 'Café De Kroon te Utrecht',
    beoordelingen: {},
  },
  {
    titel: 'B',
    auteur: 'Y',
    landVanHerkomstAuteur: 'Nederland',
    geslachtAuteur: 'Man',
    uitgekozenDoor: 'Esther',
    jaartalEersteDruk: 2005,
    locatieBespreking: 'Café De Kroon te Utrecht',
    beoordelingen: {},
  },
  {
    titel: 'C',
    auteur: 'Z',
    landVanHerkomstAuteur: 'Frankrijk',
    geslachtAuteur: 'Man',
    uitgekozenDoor: 'Chris',
    jaartalEersteDruk: 1994,
    beoordelingen: {},
  },
];

test('groepeerPerLocatie groepeert boeken met dezelfde locatie en negeert boeken zonder locatie', () => {
  assert.deepEqual(groepeerPerLocatie(boekenMetLocatie), [
    {
      locatie: 'Café De Kroon te Utrecht',
      boeken: [boekenMetLocatie[0], boekenMetLocatie[1]],
    },
  ]);
});

test('groepeerPerLocatie geeft lege lijst als geen enkel boek een locatie heeft', () => {
  assert.deepEqual(groepeerPerLocatie(boekenMetSterren), []);
});
