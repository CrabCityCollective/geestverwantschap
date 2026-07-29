'use strict';

import type { Boek, BoekenclubData } from './types';

const fs = require('fs');
const path = require('path');

// Gebaseerd op process.cwd() in plaats van __dirname: Next.js bundelt dit bestand bij een
// production build in .next/server/..., waar __dirname niet meer naar de map van dit
// bronbestand wijst. process.cwd() blijft wel de project-root, zowel in `next dev`/`next
// start` als in `npm test`.
const DATA_PATH: string = path.join(process.cwd(), 'data', 'books.json');

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
