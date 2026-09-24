'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const {
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

test('telGeslachtVanAuteurs telt boeken per geslacht en zet Man altijd eerst', () => {
  assert.deepEqual(telGeslachtVanAuteurs(boeken), [
    { label: 'Man', aantal: 2 },
    { label: 'Vrouw', aantal: 1 },
  ]);
});

test('telGeslachtVanAuteurs zet Man eerst, ook als Vrouw vaker voorkomt', () => {
  const boekenMeerVrouwen = [
    { ...boeken[0], geslachtAuteur: 'Vrouw' },
    { ...boeken[1], geslachtAuteur: 'Vrouw' },
    { ...boeken[2], geslachtAuteur: 'Man' },
  ];
  assert.deepEqual(telGeslachtVanAuteurs(boekenMeerVrouwen), [
    { label: 'Man', aantal: 1 },
    { label: 'Vrouw', aantal: 2 },
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

const boekenMetGenresEnThemas = [
  {
    titel: 'A',
    auteur: 'X',
    landVanHerkomstAuteur: 'Nederland',
    geslachtAuteur: 'Vrouw',
    uitgekozenDoor: 'Chris',
    genre: 'Historisch',
    themas: ['oorlog', 'familie'],
    jaartalEersteDruk: 2001,
    beoordelingen: {},
  },
  {
    titel: 'B',
    auteur: 'Y',
    landVanHerkomstAuteur: 'Nederland',
    geslachtAuteur: 'Man',
    uitgekozenDoor: 'Chris',
    genre: 'Historisch',
    themas: ['familie'],
    jaartalEersteDruk: 2005,
    beoordelingen: {},
  },
  {
    titel: 'C, geen genre of themas',
    auteur: 'Z',
    landVanHerkomstAuteur: 'Frankrijk',
    geslachtAuteur: 'Man',
    uitgekozenDoor: 'Chris',
    jaartalEersteDruk: 1994,
    beoordelingen: {},
  },
];

test('telGenres telt boeken per genre, sorteert aflopend en slaat boeken zonder genre over', () => {
  assert.deepEqual(telGenres(boekenMetGenresEnThemas), [{ label: 'Historisch', aantal: 2 }]);
});

test('telGenres geeft lege lijst als geen enkel boek een genre heeft', () => {
  assert.deepEqual(telGenres([boekenMetGenresEnThemas[2]]), []);
});

test("telThemas telt boeken per thema, telt een boek mee voor elk van zijn thema's en sorteert aflopend", () => {
  assert.deepEqual(telThemas(boekenMetGenresEnThemas), [
    { label: 'familie', aantal: 2 },
    { label: 'oorlog', aantal: 1 },
  ]);
});

test("telThemas geeft lege lijst als geen enkel boek thema's heeft", () => {
  assert.deepEqual(telThemas([boekenMetGenresEnThemas[2]]), []);
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

test('datumSorteerSleutel geeft datumGelezen terug als die er is', () => {
  assert.equal(datumSorteerSleutel(boekenMetSterren[0]), '2026-01-01');
});

test('datumSorteerSleutel valt terug op jaartalEersteDruk zonder datumGelezen', () => {
  assert.equal(datumSorteerSleutel(boekenMetSterren[3]), '1990');
});

test('sorteerOpDatumGelezen sorteert standaard van nieuwste naar oudste, met fallback op jaartalEersteDruk', () => {
  assert.deepEqual(
    sorteerOpDatumGelezen(boekenMetSterren).map((boek) => boek.titel),
    [
      'Hoog beoordeeld, meest recent gelezen',
      'Ook hoog beoordeeld, maar minder recent gelezen',
      'Laag beoordeeld, langst geleden gelezen',
      'Niet beoordeeld',
    ]
  );
});

test('sorteerOpDatumGelezen kan omgedraaid worden naar oudste eerst', () => {
  assert.deepEqual(
    sorteerOpDatumGelezen(boekenMetSterren, 'oudste-eerst').map((boek) => boek.titel),
    [
      'Niet beoordeeld',
      'Laag beoordeeld, langst geleden gelezen',
      'Ook hoog beoordeeld, maar minder recent gelezen',
      'Hoog beoordeeld, meest recent gelezen',
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

test('topBoekenVoorLid geeft de best beoordeelde boeken van een lid, bij gelijke stand het nieuwste boek eerst', () => {
  assert.deepEqual(
    topBoekenVoorLid(boekenMetSterren, 'Chris').map((boek) => boek.titel),
    [
      'Hoog beoordeeld, meest recent gelezen',
      'Ook hoog beoordeeld, maar minder recent gelezen',
      'Laag beoordeeld, langst geleden gelezen',
    ]
  );
});

test('topBoekenVoorLid respecteert het opgegeven aantal', () => {
  assert.deepEqual(
    topBoekenVoorLid(boekenMetSterren, 'Chris', 2).map((boek) => boek.titel),
    ['Hoog beoordeeld, meest recent gelezen', 'Ook hoog beoordeeld, maar minder recent gelezen']
  );
});

test('topBoekenVoorLid geeft lege lijst als een lid nog niets beoordeeld heeft', () => {
  assert.deepEqual(topBoekenVoorLid(boekenMetSterren, 'Jelte'), []);
});

test('sterrenVerdelingVoorLid telt hoe vaak een lid elk aantal sterren gaf, inclusief nullen', () => {
  assert.deepEqual(sterrenVerdelingVoorLid(boekenMetSterren, 'Chris'), [
    { label: '0 sterren', aantal: 0 },
    { label: '1 ster', aantal: 0 },
    { label: '2 sterren', aantal: 1 },
    { label: '3 sterren', aantal: 0 },
    { label: '4 sterren', aantal: 0 },
    { label: '5 sterren', aantal: 2 },
  ]);
});

test('sterrenVerdelingVoorLid geeft enkel nullen als een lid nog niets beoordeeld heeft', () => {
  assert.deepEqual(sterrenVerdelingVoorLid(boekenMetSterren, 'Jelte'), [
    { label: '0 sterren', aantal: 0 },
    { label: '1 ster', aantal: 0 },
    { label: '2 sterren', aantal: 0 },
    { label: '3 sterren', aantal: 0 },
    { label: '4 sterren', aantal: 0 },
    { label: '5 sterren', aantal: 0 },
  ]);
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

const boekenMetGenre = [
  {
    titel: 'A',
    auteur: 'X',
    landVanHerkomstAuteur: 'Nederland',
    geslachtAuteur: 'Vrouw',
    uitgekozenDoor: 'Chris',
    genre: 'Fictie',
    jaartalEersteDruk: 2001,
    beoordelingen: { Chris: { sterren: 5, quote: '' }, Esther: { sterren: 3, quote: '' } },
  },
  {
    titel: 'B',
    auteur: 'Y',
    landVanHerkomstAuteur: 'Nederland',
    geslachtAuteur: 'Man',
    uitgekozenDoor: 'Esther',
    genre: 'Fictie',
    jaartalEersteDruk: 2005,
    beoordelingen: { Chris: { sterren: 2, quote: '' } },
  },
  {
    titel: 'C',
    auteur: 'Z',
    landVanHerkomstAuteur: 'Frankrijk',
    geslachtAuteur: 'Man',
    uitgekozenDoor: 'Chris',
    genre: 'Poëzie',
    jaartalEersteDruk: 1994,
    beoordelingen: { Chris: { sterren: 5, quote: '' } },
  },
  {
    titel: 'D, alleen n.v.t.',
    auteur: 'W',
    landVanHerkomstAuteur: 'Frankrijk',
    geslachtAuteur: 'Man',
    uitgekozenDoor: 'Chris',
    genre: 'Poëzie',
    jaartalEersteDruk: 1990,
    beoordelingen: { Chris: { sterren: 'n.v.t.', quote: '' } },
  },
  {
    titel: 'E, geen genre',
    auteur: 'V',
    landVanHerkomstAuteur: 'Frankrijk',
    geslachtAuteur: 'Vrouw',
    uitgekozenDoor: 'Chris',
    jaartalEersteDruk: 1985,
    beoordelingen: { Chris: { sterren: 4, quote: '' } },
  },
];

test('genreWaardering groepeert boeken per genre, sorteert genres en boeken aflopend op gemiddelde en slaat boeken zonder genre of zonder cijfers over', () => {
  assert.deepEqual(genreWaardering(boekenMetGenre), [
    {
      genre: 'Poëzie',
      gemiddelde: 5,
      boeken: [{ titel: 'C', gemiddelde: 5 }],
    },
    {
      genre: 'Fictie',
      gemiddelde: 3,
      boeken: [
        { titel: 'A', gemiddelde: 4 },
        { titel: 'B', gemiddelde: 2 },
      ],
    },
  ]);
});

test('clubGemiddelde berekent het gemiddelde van de boekgemiddelden, alleen boeken met cijfers (ook zonder genre)', () => {
  assert.equal(clubGemiddelde(boekenMetGenre), (4 + 2 + 5 + 4) / 4);
});

test('clubGemiddelde geeft null terug als er geen enkel boek met cijfers is', () => {
  assert.equal(clubGemiddelde([]), null);
});
