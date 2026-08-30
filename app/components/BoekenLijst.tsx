'use client';

import { useMemo, useState } from 'react';
import type { Boek } from '../../lib/types';
import Sterren from './Sterren';
import BoekTitelIconen from './BoekIconen';

interface BoekMetScore {
  boek: Boek;
  score: number | null;
}

function komtOvereenMetZoekterm(boek: Boek, zoekterm: string): boolean {
  const term = zoekterm.trim().toLowerCase();
  if (term === '') {
    return true;
  }
  return [boek.titel, boek.auteur, boek.genre]
    .filter((waarde): waarde is string => Boolean(waarde))
    .some((waarde) => waarde.toLowerCase().includes(term));
}

export default function BoekenLijst({ boeken }: { boeken: BoekMetScore[] }) {
  const [zoekterm, setZoekterm] = useState('');

  const gefilterdeBoeken = useMemo(
    () => boeken.filter(({ boek }) => komtOvereenMetZoekterm(boek, zoekterm)),
    [boeken, zoekterm]
  );

  return (
    <>
      <div className="zoekveld-wrap">
        <label htmlFor="boek-zoeken" className="sr-only">
          Zoek op titel, auteur of genre
        </label>
        <input
          id="boek-zoeken"
          type="search"
          className="zoekveld"
          placeholder="Zoek op titel, auteur of genre..."
          value={zoekterm}
          onChange={(event) => setZoekterm(event.target.value)}
        />
      </div>

      {gefilterdeBoeken.length === 0 ? (
        <p>Geen boeken gevonden voor &bdquo;{zoekterm}&rdquo;.</p>
      ) : (
        <ul className="boekenlijst">
          {gefilterdeBoeken.map(({ boek, score }, index) => {
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
                  {boek.locatieBespreking ? (
                    <div>
                      <dt>Locatie bespreking</dt>
                      <dd>{boek.locatieBespreking}</dd>
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
    </>
  );
}
