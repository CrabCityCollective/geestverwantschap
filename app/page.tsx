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
      <h1>Boekenclub De Geestverwantschap</h1>
      <nav className="site-nav">
        <Link href="/analyse">Bekijk de analyse van alle boeken &rarr;</Link>
      </nav>

      {boeken.length === 0 ? (
        <p>Er zijn nog geen boeken toegevoegd.</p>
      ) : (
        <ul className="boekenlijst">
          {boeken.map((boek, index) => {
            const score = gemiddeldeSterren(boek);
            const beoordelingen = Object.entries(boek.beoordelingen);
            return (
              <li key={`${boek.titel}-${index}`} className="boek">
                <h2>{boek.titel}</h2>
                <p className="meta">
                  {boek.auteur}
                  {boek.genre ? <> &middot; {boek.genre}</> : null} &middot; {boek.jaartalEersteDruk}
                </p>
                {boek.datumGelezen ? <p className="datumGelezen">Gelezen op {boek.datumGelezen}</p> : null}
                <dl className="boek-kenmerken">
                  <div>
                    <dt>Land van herkomst auteur</dt>
                    <dd>{boek.landVanHerkomstAuteur}</dd>
                  </div>
                  <div>
                    <dt>Geslacht auteur</dt>
                    <dd>{boek.geslachtAuteur}</dd>
                  </div>
                  <div>
                    <dt>Uitgekozen door</dt>
                    <dd>{boek.uitgekozenDoor}</dd>
                  </div>
                  {boek.landSetting ? (
                    <div>
                      <dt>Land setting</dt>
                      <dd>{boek.landSetting}</dd>
                    </div>
                  ) : null}
                  {boek.tijdSetting ? (
                    <div>
                      <dt>Tijd setting</dt>
                      <dd>{boek.tijdSetting}</dd>
                    </div>
                  ) : null}
                </dl>
                <p className="gemiddelde">
                  {score !== null ? `Gemiddelde score: ${score.toFixed(1)} / 5` : 'Nog geen beoordelingen'}
                </p>
                {beoordelingen.length > 0 ? (
                  <details className="boek-details">
                    <summary>Sterren en quotes ({beoordelingen.length})</summary>
                    <ul className="beoordelingen-lijst">
                      {beoordelingen.map(([lid, beoordeling]) => (
                        <li key={lid}>
                          <strong>{lid}</strong> &middot; {beoordeling.sterren} / 5
                          <br />
                          <span className="quote">&bdquo;{beoordeling.quote}&rdquo;</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
