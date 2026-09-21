'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');

const { genereerQuizVragen } = require('../lib/quiz.ts');

const LEDEN = ['Chris', 'Esther', 'Jelte', 'Ruben'];

function maakBoek(titel, beoordelingen) {
  return {
    titel,
    auteur: 'Auteur van ' + titel,
    landVanHerkomstAuteur: 'Nederland',
    geslachtAuteur: 'Vrouw',
    uitgekozenDoor: 'Chris',
    jaartalEersteDruk: 2000,
    beoordelingen,
  };
}

const boeken = [
  maakBoek('Boek A', {
    Chris: { sterren: 3, quote: 'Een quote over boek A van Chris.' },
    Esther: { sterren: 5, quote: 'Een quote over boek A van Esther.' },
  }),
  maakBoek('Boek B', {
    Jelte: { sterren: 2, quote: 'Een quote over boek B van Jelte.' },
  }),
  maakBoek('Boek C', {
    Ruben: { sterren: 4, quote: 'Een quote over boek C van Ruben.' },
  }),
  maakBoek('Boek D', {
    Chris: { sterren: 1, quote: 'Een quote over boek D van Chris.' },
  }),
  maakBoek('Boek E', {
    Esther: { sterren: 'n.v.t.', quote: 'Een quote over boek E van Esther, niet beoordeeld met sterren.' },
    Jelte: { sterren: 3, quote: '' },
  }),
];

test('genereerQuizVragen geeft voor elke vraag het juiste antwoord terug binnen de opties, zonder duplicaten', () => {
  const vragen = genereerQuizVragen(boeken, LEDEN, 20);
  assert.ok(vragen.length > 0);
  for (const vraag of vragen) {
    assert.ok(vraag.opties.includes(vraag.antwoord), `antwoord "${vraag.antwoord}" zit niet in de opties`);
    assert.equal(new Set(vraag.opties).size, vraag.opties.length, 'opties bevatten duplicaten');
    assert.ok(['boek', 'lid', 'sterren'].includes(vraag.type));
  }
});

test('genereerQuizVragen negeert beoordelingen met een lege quote', () => {
  const vragen = genereerQuizVragen(boeken, LEDEN, 100);
  assert.ok(vragen.every((vraag) => vraag.quote !== ''));
});

test('genereerQuizVragen maakt geen "sterren"-vraag voor een beoordeling met "n.v.t." als sterren', () => {
  const vragen = genereerQuizVragen(boeken, LEDEN, 100);
  const sterrenVragenOverBoekE = vragen.filter(
    (vraag) => vraag.type === 'sterren' && vraag.quote.includes('boek E')
  );
  assert.deepEqual(sterrenVragenOverBoekE, []);

  const nietSterrenVragenOverBoekE = vragen.filter(
    (vraag) => vraag.type !== 'sterren' && vraag.quote.includes('boek E')
  );
  assert.ok(nietSterrenVragenOverBoekE.length > 0);
});

test('genereerQuizVragen respecteert het gevraagde aantal, maar geeft niet meer dan er kandidaten zijn', () => {
  const vragen = genereerQuizVragen(boeken, LEDEN, 3);
  assert.equal(vragen.length, 3);

  const alleVragen = genereerQuizVragen(boeken, LEDEN, 1000);
  assert.ok(alleVragen.length < 1000);
});

test('genereerQuizVragen maakt geen "boek"-vraag als er minder dan vier boeken zijn', () => {
  const weinigBoeken = boeken.slice(0, 2);
  const vragen = genereerQuizVragen(weinigBoeken, LEDEN, 100);
  assert.ok(vragen.every((vraag) => vraag.type !== 'boek'));
  assert.ok(vragen.some((vraag) => vraag.type === 'lid'));
});

test('genereerQuizVragen maakt geen "lid"-vraag als er minder dan vier leden zijn', () => {
  const vragen = genereerQuizVragen(boeken, LEDEN.slice(0, 2), 100);
  assert.ok(vragen.every((vraag) => vraag.type !== 'lid'));
  assert.ok(vragen.some((vraag) => vraag.type === 'boek'));
});

test('genereerQuizVragen geeft een lege lijst als er geen boeken zijn', () => {
  assert.deepEqual(genereerQuizVragen([], LEDEN, 20), []);
});
