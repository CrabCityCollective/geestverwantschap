'use strict';

const fs = require('fs');
const path = require('path');

const DATA_PATH = path.join(__dirname, '..', 'data', 'books.json');

const REQUIRED_STRING_FIELDS = [
  'titel',
  'auteur',
  'landVanHerkomstAuteur',
  'geslachtAuteur',
  'genre',
  'landSetting',
  'tijdSetting',
];

function readData(filePath = DATA_PATH) {
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw);
}

function writeData(data, filePath = DATA_PATH) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf8');
}

function getBooks(filePath = DATA_PATH) {
  return readData(filePath).boeken;
}

function validateBook(book, data) {
  const errors = [];

  for (const field of REQUIRED_STRING_FIELDS) {
    if (typeof book[field] !== 'string' || book[field].trim() === '') {
      errors.push(`Veld "${field}" is verplicht en moet een niet-lege string zijn.`);
    }
  }

  if (typeof book.genre === 'string' && !data.genres.includes(book.genre)) {
    errors.push(`Genre "${book.genre}" is ongeldig. Kies uit: ${data.genres.join(', ')}.`);
  }

  if (!Number.isInteger(book.jaartalEersteDruk)) {
    errors.push('Veld "jaartalEersteDruk" is verplicht en moet een geheel getal zijn.');
  }

  if (typeof book.beoordelingen !== 'object' || book.beoordelingen === null) {
    errors.push('Veld "beoordelingen" is verplicht en moet een object zijn per lid.');
  } else {
    for (const lid of data.leden) {
      const beoordeling = book.beoordelingen[lid];
      if (!beoordeling || typeof beoordeling !== 'object') {
        errors.push(`Beoordeling van "${lid}" ontbreekt.`);
        continue;
      }
      if (
        !Number.isInteger(beoordeling.sterren) ||
        beoordeling.sterren < 0 ||
        beoordeling.sterren > 5
      ) {
        errors.push(`Beoordeling "sterren" van "${lid}" moet een geheel getal tussen 0 en 5 zijn.`);
      }
      if (typeof beoordeling.quote !== 'string') {
        errors.push(`Beoordeling "quote" van "${lid}" moet een string zijn.`);
      }
    }
  }

  return errors;
}

function addBook(book, filePath = DATA_PATH) {
  const data = readData(filePath);
  const errors = validateBook(book, data);
  if (errors.length > 0) {
    throw new Error(`Ongeldig boek:\n- ${errors.join('\n- ')}`);
  }
  data.boeken.push(book);
  writeData(data, filePath);
  return data.boeken;
}

module.exports = {
  DATA_PATH,
  readData,
  writeData,
  getBooks,
  addBook,
  validateBook,
};
