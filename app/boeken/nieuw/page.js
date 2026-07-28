import { redirect } from 'next/navigation';
import { readData, addBook } from '../../../lib/boekenclub';

export const dynamic = 'force-dynamic';

async function nieuwBoekToevoegen(formData) {
  'use server';

  const data = readData();
  const beoordelingen = {};
  for (const lid of data.leden) {
    beoordelingen[lid] = {
      sterren: Number(formData.get(`sterren-${lid}`)),
      quote: formData.get(`quote-${lid}`) || '',
    };
  }

  addBook({
    titel: formData.get('titel'),
    auteur: formData.get('auteur'),
    landVanHerkomstAuteur: formData.get('landVanHerkomstAuteur'),
    geslachtAuteur: formData.get('geslachtAuteur'),
    genre: formData.get('genre'),
    landSetting: formData.get('landSetting'),
    tijdSetting: formData.get('tijdSetting'),
    jaartalEersteDruk: Number(formData.get('jaartalEersteDruk')),
    beoordelingen,
  });

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
