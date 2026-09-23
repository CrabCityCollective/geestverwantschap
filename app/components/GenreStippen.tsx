'use client';

import { useState } from 'react';
import type { GenreWaardering, BoekWaardering } from '../../lib/types';

interface GenreStippenProps {
  titel: string;
  data: GenreWaardering[];
  clubGemiddelde: number | null;
}

interface Geselecteerd {
  genre: string;
  titel: string;
  gemiddelde: number;
}

const MIN_STERREN = 1;
const MAX_STERREN = 5;

function percentage(gemiddelde: number): number {
  const begrensd = Math.min(MAX_STERREN, Math.max(MIN_STERREN, gemiddelde));
  return ((begrensd - MIN_STERREN) / (MAX_STERREN - MIN_STERREN)) * 100;
}

function formatGetal(getal: number): string {
  return getal.toLocaleString('nl-NL', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function GenreStippen({ titel, data, clubGemiddelde }: GenreStippenProps) {
  const [geselecteerd, setGeselecteerd] = useState<Geselecteerd | null>(null);

  if (data.length === 0) {
    return (
      <figure className="grafiek">
        <figcaption className="grafiek-titel">{titel}</figcaption>
        <p className="grafiek-leeg">Geen data beschikbaar.</p>
      </figure>
    );
  }

  function isGeselecteerd(genre: string, boek: BoekWaardering): boolean {
    return geselecteerd !== null && geselecteerd.genre === genre && geselecteerd.titel === boek.titel;
  }

  function toggleSelectie(genre: string, boek: BoekWaardering) {
    setGeselecteerd((huidig) =>
      huidig && huidig.genre === genre && huidig.titel === boek.titel
        ? null
        : { genre, titel: boek.titel, gemiddelde: boek.gemiddelde }
    );
  }

  return (
    <figure className="grafiek">
      <figcaption className="grafiek-titel">{titel}</figcaption>
      <ul className="genrestippen-lijst">
        {data.map((genreItem) => (
          <li key={genreItem.genre} className="genrestippen-rij">
            <div className="genrestippen-kop">
              <span className="genrestippen-genre">
                {genreItem.genre}{' '}
                <span className="genrestippen-aantal">
                  ({genreItem.boeken.length} {genreItem.boeken.length === 1 ? 'boek' : 'boeken'})
                </span>
              </span>
              <span className="genrestippen-gemiddelde">{formatGetal(genreItem.gemiddelde)}</span>
            </div>
            <div className="genrestippen-baan">
              {clubGemiddelde !== null ? (
                <span
                  className="genrestippen-clublijn"
                  style={{ left: `${percentage(clubGemiddelde)}%` }}
                  aria-hidden="true"
                />
              ) : null}
              <span
                className="genrestippen-genregemiddelde"
                style={{ left: `${percentage(genreItem.gemiddelde)}%` }}
                aria-hidden="true"
              />
              {genreItem.boeken.map((boek) => (
                <button
                  key={boek.titel}
                  type="button"
                  className={`genrestippen-stip${
                    isGeselecteerd(genreItem.genre, boek) ? ' genrestippen-stip--actief' : ''
                  }`}
                  style={{ left: `${percentage(boek.gemiddelde)}%` }}
                  aria-label={`${boek.titel}: ${formatGetal(boek.gemiddelde)} sterren`}
                  aria-pressed={isGeselecteerd(genreItem.genre, boek)}
                  title={`${boek.titel}: ${formatGetal(boek.gemiddelde)} sterren`}
                  onClick={() => toggleSelectie(genreItem.genre, boek)}
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
      <div className="genrestippen-as" aria-hidden="true">
        {Array.from({ length: MAX_STERREN }, (_, index) => index + MIN_STERREN).map((getal) => (
          <span key={getal}>{getal}</span>
        ))}
      </div>
      <p className="genrestippen-selectie" aria-live="polite">
        {geselecteerd
          ? `${geselecteerd.titel} (${geselecteerd.genre}): ${formatGetal(geselecteerd.gemiddelde)} sterren`
          : 'Tik op een stip om het boek te zien.'}
      </p>
      <ul className="genrestippen-legenda">
        <li>
          <span className="genrestippen-legenda-stip" aria-hidden="true" />
          Boek
        </li>
        <li>
          <span className="genrestippen-legenda-genregemiddelde" aria-hidden="true" />
          Genregemiddelde
        </li>
        <li>
          <span className="genrestippen-legenda-club" aria-hidden="true" />
          Club{clubGemiddelde !== null ? ` (${formatGetal(clubGemiddelde)})` : ''}
        </li>
      </ul>
    </figure>
  );
}
