'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { Boek } from '../../lib/types';
import { weergaveNaam } from '../../lib/aliassen';
import * as analyse from '../../lib/analyse';
import Sterren from './Sterren';
import BoekTitelIconen from './BoekIconen';

const { datumSorteerSleutel } = analyse as unknown as { datumSorteerSleutel: (boek: Boek) => string };

type SorteerRichting = 'nieuwste-eerst' | 'oudste-eerst';

interface BoekMetScore {
  boek: Boek;
  index: number;
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

function uniekeWaarden(
  boeken: BoekMetScore[],
  veld: 'uitgekozenDoor' | 'landVanHerkomstAuteur' | 'genre'
): string[] {
  const waarden = new Set(
    boeken.map(({ boek }) => boek[veld]).filter((waarde): waarde is string => Boolean(waarde))
  );
  return [...waarden].sort((a, b) => a.localeCompare(b, 'nl'));
}

function uniekeThemas(boeken: BoekMetScore[]): string[] {
  const waarden = new Set(boeken.flatMap(({ boek }) => boek.themas ?? []));
  return [...waarden].sort((a, b) => a.localeCompare(b, 'nl'));
}

export default function BoekenLijst({ boeken }: { boeken: BoekMetScore[] }) {
  const [zoekterm, setZoekterm] = useState('');
  const [geselecteerdLid, setGeselecteerdLid] = useState<string | null>(null);
  const [geselecteerdLand, setGeselecteerdLand] = useState<string | null>(null);
  const [geselecteerdGenre, setGeselecteerdGenre] = useState<string | null>(null);
  const [geselecteerdThema, setGeselecteerdThema] = useState<string | null>(null);
  const [richting, setRichting] = useState<SorteerRichting>('nieuwste-eerst');

  const leden = useMemo(() => uniekeWaarden(boeken, 'uitgekozenDoor'), [boeken]);
  const landen = useMemo(() => uniekeWaarden(boeken, 'landVanHerkomstAuteur'), [boeken]);
  const genres = useMemo(() => uniekeWaarden(boeken, 'genre'), [boeken]);
  const themas = useMemo(() => uniekeThemas(boeken), [boeken]);

  const gefilterdeBoeken = useMemo(() => {
    const factor = richting === 'oudste-eerst' ? 1 : -1;
    return boeken
      .filter(
        ({ boek }) =>
          komtOvereenMetZoekterm(boek, zoekterm) &&
          (geselecteerdLid === null || boek.uitgekozenDoor === geselecteerdLid) &&
          (geselecteerdLand === null || boek.landVanHerkomstAuteur === geselecteerdLand) &&
          (geselecteerdGenre === null || boek.genre === geselecteerdGenre) &&
          (geselecteerdThema === null || (boek.themas ?? []).includes(geselecteerdThema))
      )
      .sort((a, b) => factor * datumSorteerSleutel(a.boek).localeCompare(datumSorteerSleutel(b.boek)));
  }, [boeken, zoekterm, geselecteerdLid, geselecteerdLand, geselecteerdGenre, geselecteerdThema, richting]);

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
          <summary>Lid{geselecteerdLid ? `: ${weergaveNaam(geselecteerdLid)}` : ''}</summary>
          <div className="filter-knoppen">
            {leden.map((lid) => (
              <button
                key={lid}
                type="button"
                className={`filter-knop${geselecteerdLid === lid ? ' filter-knop-actief' : ''}`}
                aria-pressed={geselecteerdLid === lid}
                onClick={() => setGeselecteerdLid((huidig) => (huidig === lid ? null : lid))}
              >
                {weergaveNaam(lid)}
              </button>
            ))}
          </div>
        </details>

        <details className="filter-dropdown">
          <summary>Land{geselecteerdLand ? `: ${geselecteerdLand}` : ''}</summary>
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

        <details className="filter-dropdown">
          <summary>Genre{geselecteerdGenre ? `: ${geselecteerdGenre}` : ''}</summary>
          <div className="filter-knoppen">
            {genres.map((genre) => (
              <button
                key={genre}
                type="button"
                className={`filter-knop${geselecteerdGenre === genre ? ' filter-knop-actief' : ''}`}
                aria-pressed={geselecteerdGenre === genre}
                onClick={() => setGeselecteerdGenre((huidig) => (huidig === genre ? null : genre))}
              >
                {genre}
              </button>
            ))}
          </div>
        </details>

        <details className="filter-dropdown">
          <summary>Thema{geselecteerdThema ? `: ${geselecteerdThema}` : ''}</summary>
          <div className="filter-knoppen">
            {themas.map((thema) => (
              <button
                key={thema}
                type="button"
                className={`filter-knop${geselecteerdThema === thema ? ' filter-knop-actief' : ''}`}
                aria-pressed={geselecteerdThema === thema}
                onClick={() => setGeselecteerdThema((huidig) => (huidig === thema ? null : thema))}
              >
                {thema}
              </button>
            ))}
          </div>
        </details>

        <button
          type="button"
          className="filter-knop sorteer-knop"
          aria-label={`Sorteren, huidige richting: ${richting === 'nieuwste-eerst' ? 'nieuwste eerst' : 'oudste eerst'}`}
          onClick={() => setRichting((huidig) => (huidig === 'nieuwste-eerst' ? 'oudste-eerst' : 'nieuwste-eerst'))}
        >
          Sorteren
        </button>
      </div>

      {gefilterdeBoeken.length === 0 ? (
        <p>Geen boeken gevonden{zoekterm ? <> voor &bdquo;{zoekterm}&rdquo;</> : null}.</p>
      ) : (
        <ul className="boekenlijst">
          {gefilterdeBoeken.map(({ boek, index, score }) => {
            const beoordelingen = Object.entries(boek.beoordelingen);
            return (
              <li key={`${boek.titel}-${index}`} className="boek">
                <h2>
                  <Link href={`/boek/${index}`} className="boek-titel-link">
                    <span className="boek-titel-tekst">{boek.titel}</span>
                  </Link>
                  <BoekTitelIconen
                    geslachtAuteur={boek.geslachtAuteur}
                    landVanHerkomstAuteur={boek.landVanHerkomstAuteur}
                    uitgekozenDoor={boek.uitgekozenDoor}
                  />
                </h2>
                <p className="boek-auteur">{boek.auteur}</p>
                <p className="boek-metarij">
                  <span className="boek-genre-themas">
                    {boek.debuut ? <span className="boek-debuut-label">Debuut</span> : null}
                    {boek.genre ? <span className="boek-genre-label">{boek.genre}</span> : null}
                    {boek.themas && boek.themas.length > 0 ? (
                      <span className="boek-themas">
                        {boek.themas.map((thema) => (
                          <span key={thema} className="boek-thema-label">
                            {thema}
                          </span>
                        ))}
                      </span>
                    ) : null}
                  </span>
                  <span className="boek-jaartal-label">{boek.jaartalEersteDruk}</span>
                </p>
                <dl className="boek-kenmerken boek-lijst-kenmerken">
                  <div>
                    <dt>Land auteur</dt>
                    <dd>{boek.landVanHerkomstAuteur}</dd>
                  </div>
                  <div>
                    <dt>Geslacht auteur</dt>
                    <dd>{boek.geslachtAuteur}</dd>
                  </div>
                  <div>
                    <dt>Uitgekozen door</dt>
                    <dd>{weergaveNaam(boek.uitgekozenDoor)}</dd>
                  </div>
                  {boek.locatieBespreking ? (
                    <div>
                      <dt>Locatie bespreking</dt>
                      <dd>{boek.locatieBespreking}</dd>
                    </div>
                  ) : null}
                  {boek.datumGelezen ? (
                    <div>
                      <dt>Datum bespreking</dt>
                      <dd>{boek.datumGelezen}</dd>
                    </div>
                  ) : null}
                  {boek.aantalPaginas ? (
                    <div>
                      <dt>Aantal pagina&apos;s</dt>
                      <dd>{boek.aantalPaginas}</dd>
                    </div>
                  ) : null}
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
                          <strong>{weergaveNaam(lid)}</strong>{' '}
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
