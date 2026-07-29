import * as boekenclub from '../lib/boekenclub';
import * as analyse from '../lib/analyse';
import type { Boek } from '../lib/types';
import Nav from './components/Nav';
import Sterren from './components/Sterren';
import BoekTitelIconen from './components/BoekIconen';

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
      <h1>
        <span className="titel-boekenclub">Boekenclub</span>
        <br />
        <span className="titel-naam">De Geestverwantschap</span>
      </h1>
      <Nav actief="boekenlijst" />

      {boeken.length === 0 ? (
        <p>Er zijn nog geen boeken toegevoegd.</p>
      ) : (
        <ul className="boekenlijst">
          {boeken.map((boek, index) => {
            const score = gemiddeldeSterren(boek);
            const beoordelingen = Object.entries(boek.beoordelingen);
            return (
              <li key={`${boek.titel}-${index}`} className="boek">
                <h2>
                  <span className="boek-titel-tekst">{boek.titel}</span>
                  <BoekTitelIconen
                    geslachtAuteur={boek.geslachtAuteur}
                    landVanHerkomstAuteur={boek.landVanHerkomstAuteur}
                    uitgekozenDoor={boek.uitgekozenDoor}
                  />
                </h2>
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
                {score !== null ? (
                  <details className="boek-details">
                    <summary className="gemiddelde">
                      Gemiddelde score <Sterren score={score} />
                    </summary>
                    <ul className="beoordelingen-lijst">
                      {beoordelingen.map(([lid, beoordeling]) => (
                        <li key={lid}>
                          <strong>{lid}</strong> <Sterren score={beoordeling.sterren} />
                          <br />
                          <span className="quote">&bdquo;{beoordeling.quote}&rdquo;</span>
                        </li>
                      ))}
                    </ul>
                  </details>
                ) : (
                  <p className="gemiddelde gemiddelde-leeg">Nog geen beoordelingen</p>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </main>
  );
}
