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

function uniekeWaarden(boeken: BoekMetScore[], veld: 'uitgekozenDoor' | 'landVanHerkomstAuteur'): string[] {
  const waarden = new Set(boeken.map(({ boek }) => boek[veld]));
  return [...waarden].sort((a, b) => a.localeCompare(b, 'nl'));
}

export default function BoekenLijst({ boeken }: { boeken: BoekMetScore[] }) {
  const [zoekterm, setZoekterm] = useState('');
  const [geselecteerdLid, setGeselecteerdLid] = useState<string | null>(null);
  const [geselecteerdLand, setGeselecteerdLand] = useState<string | null>(null);

  const leden = useMemo(() => uniekeWaarden(boeken, 'uitgekozenDoor'), [boeken]);
  const landen = useMemo(() => uniekeWaarden(boeken, 'landVanHerkomstAuteur'), [boeken]);

  const gefilterdeBoeken = useMemo(
    () =>
      boeken.filter(
        ({ boek }) =>
          komtOvereenMetZoekterm(boek, zoekterm) &&
          (geselecteerdLid === null || boek.uitgekozenDoor === geselecteerdLid) &&
          (geselecteerdLand === null || boek.landVanHerkomstAuteur === geselecteerdLand)
      ),
    [boeken, zoekterm, geselecteerdLid, geselecteerdLand]
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

      <div className="filters-wrap">
        <details className="filter-dropdown">
          <summary>Filter op lid{geselecteerdLid ? `: ${geselecteerdLid}` : ''}</summary>
          <div className="filter-knoppen">
            {leden.map((lid) => (
              <button
                key={lid}
                type="button"
                className={`filter-knop${geselecteerdLid === lid ? ' filter-knop-actief' : ''}`}
                aria-pressed={geselecteerdLid === lid}
                onClick={() => setGeselecteerdLid((huidig) => (huidig === lid ? null : lid))}
              >
                {lid}
              </button>
            ))}
          </div>
        </details>

        <details className="filter-dropdown">
          <summary>Filter op land auteur{geselecteerdLand ? `: ${geselecteerdLand}` : ''}</summary>
          <div className="filter-knoppen">
            {landen.map((land) => (
              <button
                key={land}
                type="button"
                className={`filter-knop${geselecteerdLand === land ? ' filter-knop-actief' : ''}`}
                aria-pressed={geselecteerdLand === land}
                onClick={() => setGeselecteerdLand((huidig) => (huidig === land ? null : land))}
              >
                {land}
              </button>
            ))}
          </div>
        </details>
      </div>

      {gefilterdeBoeken.length === 0 ? (
        <p>Geen boeken gevonden{zoekterm ? <> voor &bdquo;{zoekterm}&rdquo;</> : null}.</p>
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
                          <strong>{lid}</strong>{' '}
                          {typeof beoordeling.sterren === 'number' ? (
                            <Sterren score={beoordeling.sterren} />
                          ) : (
                            <span className="sterren-nvt">{beoordeling.sterren}</span>
                          )}
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
