import Link from 'next/link';
import * as boekenclub from '../lib/boekenclub';
import * as analyse from '../lib/analyse';
import type { Boek } from '../lib/types';

const { getBooks } = boekenclub as unknown as { getBooks: (filePath?: string) => Boek[] };
const { gemiddeldeSterren, sorteerOpGemiddeldeSterren } = analyse as unknown as {
  gemiddeldeSterren: (boek: Boek) => number | null;
  sorteerOpGemiddeldeSterren: (boeken: Boek[]) => Boek[];
};

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const boeken = sorteerOpGemiddeldeSterren(getBooks());

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
            const score = gemiddeldeSterren(boek);
            return (
              <li key={`${boek.titel}-${index}`} className="boek">
                <h2>{boek.titel}</h2>
                <p className="meta">
                  {boek.auteur}
                  {boek.genre ? <> &middot; {boek.genre}</> : null} &middot; {boek.jaartalEersteDruk}
                </p>
                {boek.datumGelezen ? <p className="datumGelezen">Gelezen op {boek.datumGelezen}</p> : null}
                <p className="gemiddelde">
                  {score !== null ? `Gemiddelde score: ${score.toFixed(1)} / 5` : 'Nog geen beoordelingen'}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
