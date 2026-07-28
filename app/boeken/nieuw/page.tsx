import { redirect } from 'next/navigation';
import { readData, addBook } from '../../../lib/boekenclub';
import type { Beoordeling, Boek } from '../../../lib/types';

export const dynamic = 'force-dynamic';

async function nieuwBoekToevoegen(formData: FormData) {
  'use server';

  const data = readData();
  const beoordelingen: Record<string, Beoordeling> = {};
  for (const lid of data.leden) {
    beoordelingen[lid] = {
      sterren: Number(formData.get(`sterren-${lid}`)),
      quote: String(formData.get(`quote-${lid}`) || ''),
    };
  }

  const boek: Boek = {
    titel: String(formData.get('titel')),
    auteur: String(formData.get('auteur')),
    landVanHerkomstAuteur: String(formData.get('landVanHerkomstAuteur')),
    geslachtAuteur: String(formData.get('geslachtAuteur')),
    genre: String(formData.get('genre')),
    landSetting: String(formData.get('landSetting')),
    tijdSetting: String(formData.get('tijdSetting')),
    jaartalEersteDruk: Number(formData.get('jaartalEersteDruk')),
    beoordelingen,
  };

  addBook(boek);

  redirect('/');
}

export default function NieuwBoekPage() {
  const data = readData();

  return (
    <main className="container">
      <h1>Nieuw boek toevoegen</h1>
      <form action={nieuwBoekToevoegen} className="formulier">
        <label>
          Titel
          <input name="titel" required />
        </label>
        <label>
          Auteur
          <input name="auteur" required />
        </label>
        <label>
          Land van herkomst auteur
          <input name="landVanHerkomstAuteur" required />
        </label>
        <label>
          Geslacht auteur
          <input name="geslachtAuteur" required />
        </label>
        <label>
          Genre
          <select name="genre" required>
            {data.genres.map((genre) => (
              <option key={genre} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </label>
        <label>
          Land setting
          <input name="landSetting" required />
        </label>
        <label>
          Tijd setting
          <input name="tijdSetting" required />
        </label>
        <label>
          Jaartal eerste druk
          <input name="jaartalEersteDruk" type="number" required />
        </label>

        <h2>Beoordelingen</h2>
        {data.leden.map((lid) => (
          <fieldset key={lid}>
            <legend>{lid}</legend>
            <label>
              Sterren (0-5)
              <input name={`sterren-${lid}`} type="number" min="0" max="5" required />
            </label>
            <label>
              Quote
              <input name={`quote-${lid}`} />
            </label>
          </fieldset>
        ))}

        <button type="submit">Opslaan</button>
      </form>
    </main>
  );
}
