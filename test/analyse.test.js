'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { telLandenVanAuteurs, telGeslachtVanAuteurs, telTijdvakken } = require('../lib/analyse.ts');

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
