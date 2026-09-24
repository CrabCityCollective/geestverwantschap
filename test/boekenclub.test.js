'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { DATA_PATH, readData, getBooks } = require('../lib/boekenclub.ts');

test('data/books.json bevat het verwachte basisformaat', () => {
  const data = readData(DATA_PATH);
  assert.deepEqual(data.leden, ['Chris', 'Esther', 'Jelte', 'Ruben', 'Min Ae', 'Jet', 'Robbie']);
  assert.ok(Array.isArray(data.genres) && data.genres.includes('Historisch'));
  assert.ok(Array.isArray(data.boeken));
});

test('elk boek heeft een toegestaan genre en minstens één thema', () => {
  const data = readData(DATA_PATH);
  for (const boek of data.boeken) {
    assert.ok(data.genres.includes(boek.genre), `${boek.titel} heeft geen toegestaan genre`);
    assert.ok(
      Array.isArray(boek.themas) && boek.themas.length > 0,
      `${boek.titel} heeft geen thema's`
    );
  }
});

test('getBooks geeft de boeken uit data/books.json terug', () => {
  const data = readData(DATA_PATH);
  assert.deepEqual(getBooks(DATA_PATH), data.boeken);
});

test('elk boek heeft een landSetting en tijdSetting', () => {
  const data = readData(DATA_PATH);
  for (const boek of data.boeken) {
    assert.ok(
      typeof boek.landSetting === 'string' && boek.landSetting.length > 0,
      `${boek.titel} heeft geen landSetting`
    );
    assert.ok(
      typeof boek.tijdSetting === 'string' && boek.tijdSetting.length > 0,
      `${boek.titel} heeft geen tijdSetting`
    );
  }
});

test('elk boek heeft een debuut-veld van het type boolean', () => {
  const data = readData(DATA_PATH);
  for (const boek of data.boeken) {
    assert.ok(typeof boek.debuut === 'boolean', `${boek.titel} heeft geen debuut-veld`);
  }
});
