import Link from 'next/link';
import { getBooks } from '../lib/boekenclub';
import type { Beoordeling } from '../lib/types';

export const dynamic = 'force-dynamic';

function gemiddelde(beoordelingen: Record<string, Beoordeling>) {
  const sterren = Object.values(beoordelingen).map((beoordeling) => beoordeling.sterren);
  if (sterren.length === 0) {
    return null;
  }
  const totaal = sterren.reduce((a, b) => a + b, 0);
  return (totaal / sterren.length).toFixed(1);
}

export default function HomePage() {
  const boeken = getBooks();

  return (
    <main className="container">
      <h1>Geestverwantschap</h1>
      <p>Administratie van de boekenclub: welke boeken zijn gelezen en wat vond iedereen ervan.</p>
      <p>
        <Link href="/analyse">Bekijk de analyse van alle boeken &rarr;</Link>
      </p>

      {boeken.length === 0 ? (
        <p>Er zijn nog geen boeken toegevoegd.</p>
      ) : (
        <ul className="boekenlijst">
          {boeken.map((boek, index) => {
            const score = gemiddelde(boek.beoordelingen);
            return (
              <li key={`${boek.titel}-${index}`} className="boek">
                <h2>{boek.titel}</h2>
                <p className="meta">
                  {boek.auteur}
                  {boek.genre ? <> &middot; {boek.genre}</> : null} &middot; {boek.jaartalEersteDruk}
                </p>
                {boek.datumGelezen ? <p className="datumGelezen">Gelezen op {boek.datumGelezen}</p> : null}
                <p className="gemiddelde">
                  {score !== null ? `Gemiddelde score: ${score} / 5` : 'Nog geen beoordelingen'}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
