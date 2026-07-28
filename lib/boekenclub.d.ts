import type { Boek, BoekenclubData } from './types';

export const DATA_PATH: string;

export function readData(filePath?: string): BoekenclubData;

export function writeData(data: BoekenclubData, filePath?: string): void;

export function getBooks(filePath?: string): Boek[];

export function validateBook(book: Boek, data: BoekenclubData): string[];

export function addBook(book: Boek, filePath?: string): Boek[];
