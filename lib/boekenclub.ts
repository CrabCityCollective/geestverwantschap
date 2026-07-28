'use strict';

import type { Boek, BoekenclubData } from './types';

const fs = require('fs');
const path = require('path');

const DATA_PATH: string = path.join(__dirname, '..', 'data', 'books.json');

function readData(filePath: string = DATA_PATH): BoekenclubData {
  const raw = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(raw);
}

function getBooks(filePath: string = DATA_PATH): Boek[] {
  return readData(filePath).boeken;
}

module.exports = {
  DATA_PATH,
  readData,
  getBooks,
};
