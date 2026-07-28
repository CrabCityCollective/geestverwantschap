'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { DATA_PATH, readData, getBooks } = require('../lib/boekenclub.ts');

test('data/books.json bevat het verwachte basisformaat', () => {
  const data = readData(DATA_PATH);
  assert.deepEqual(data.leden, ['Chris', 'Esther', 'Jelte', 'Ruben', 'Min Ae', 'Jet', 'Robbie']);
  assert.ok(Array.isArray(data.genres) && data.genres.includes('sciencefiction'));
  assert.ok(Array.isArray(data.boeken));
});

test('getBooks geeft de boeken uit data/books.json terug', () => {
  const data = readData(DATA_PATH);
  assert.deepEqual(getBooks(DATA_PATH), data.boeken);
});
