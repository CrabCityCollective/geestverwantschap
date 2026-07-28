'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('fs');
const os = require('os');
const path = require('path');

const {
  DATA_PATH,
  readData,
  getBooks,
  addBook,
  validateBook,
} = require('../lib/boekenclub.ts');

function makeTempDataFile() {
  const data = readData(DATA_PATH);
  data.boeken = [];
  const filePath = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'boekenclub-')), 'books.json');
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return filePath;
}

function validBook(overrides = {}) {
  const data = readData(DATA_PATH);
  const beoordelingen = {};
  for (const lid of data.leden) {
    beoordelingen[lid] = { sterren: 4, quote: `${lid} vond het goed.` };
  }
  return {
    titel: 'Voorbeeldboek',
    auteur: 'Voorbeeld Auteur',
    landVanHerkomstAuteur: 'Nederland',
    geslachtAuteur: 'vrouw',
    genre: data.genres[0],
    landSetting: 'Nederland',
    tijdSetting: 'heden',
    jaartalEersteDruk: 2020,
    beoordelingen,
    ...overrides,
  };
}

test('data/books.json bevat het verwachte basisformaat', () => {
  const data = readData(DATA_PATH);
  assert.deepEqual(data.leden, ['Chris', 'Esther', 'Jelte', 'Ruben', 'Min Ae', 'Jet', 'Robbie']);
  assert.ok(Array.isArray(data.genres) && data.genres.includes('sciencefiction'));
  assert.ok(Array.isArray(data.boeken));
});

test('addBook voegt een geldig boek toe en slaat het op', () => {
  const filePath = makeTempDataFile();
  const boeken = addBook(validBook(), filePath);
  assert.equal(boeken.length, 1);
  assert.equal(getBooks(filePath).length, 1);
  assert.equal(getBooks(filePath)[0].titel, 'Voorbeeldboek');
});

test('validateBook wijst een ongeldig genre af', () => {
  const data = readData(DATA_PATH);
  const errors = validateBook(validBook({ genre: 'onbestaand-genre' }), data);
  assert.ok(errors.some((e) => e.includes('Genre')));
});

test('validateBook vereist een beoordeling van ieder lid', () => {
  const data = readData(DATA_PATH);
  const book = validBook();
  delete book.beoordelingen.Robbie;
  const errors = validateBook(book, data);
  assert.ok(errors.some((e) => e.includes('Robbie')));
});

test('validateBook vereist sterren tussen 0 en 5', () => {
  const data = readData(DATA_PATH);
  const book = validBook();
  book.beoordelingen.Chris.sterren = 6;
  const errors = validateBook(book, data);
  assert.ok(errors.some((e) => e.includes('sterren') && e.includes('Chris')));
});

test('addBook gooit een foutmelding bij een ongeldig boek', () => {
  const filePath = makeTempDataFile();
  assert.throws(() => addBook(validBook({ titel: '' }), filePath), /Ongeldig boek/);
});
