import Link from 'next/link';
import { getBooks } from '../lib/boekenclub';
import type { Beoordeling } from '../lib/types';

export const dynamic = 'force-dynamic';

function gemiddelde(beoordelingen: Record<string, Beoordeling>) {
  const sterren = Object.values(beoordelingen).map((beoordeling) => beoordeling.sterren);
  const totaal = sterren.reduce((a, b) => a + b, 0);
  return (totaal / sterren.length).toFixed(1);
}

export default function HomePage() {
  const boeken = getBooks();

  return (
    <main className="container">
      <h1>Geestverwantschap</h1>
      <p>Administratie van de boekenclub: welke boeken zijn gelezen en wat vond iedereen ervan.</p>
      <Link href="/boeken/nieuw" className="button">
        Nieuw boek toevoegen
      </Link>

      {boeken.length === 0 ? (
        <p>Er zijn nog geen boeken toegevoegd.</p>
      ) : (
        <ul className="boekenlijst">
          {boeken.map((boek, index) => (
            <li key={`${boek.titel}-${index}`} className="boek">
              <h2>{boek.titel}</h2>
              <p className="meta">
                {boek.auteur} &middot; {boek.genre} &middot; {boek.jaartalEersteDruk}
              </p>
              <p className="gemiddelde">Gemiddelde score: {gemiddelde(boek.beoordelingen)} / 5</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
