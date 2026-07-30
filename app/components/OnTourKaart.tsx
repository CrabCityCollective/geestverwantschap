import type { Boek } from '../../lib/types';

type LocatieGroep = { locatie: string; boeken: Boek[] };

type BekendeStad = { naam: string; x: number; y: number };

// Positie (links/boven in %) is een grove benadering op basis van breedte-/lengtegraad,
// bedoeld als sfeervol kaartje, niet als nauwkeurige kaart. De omtrek hieronder volgt wel
// de belangrijkste, herkenbare vorm van Nederland (Zeeuwse delta, Limburgse punt).
const BEKENDE_STEDEN: BekendeStad[] = [
  { naam: 'Utrecht', x: 45.7, y: 52.1 },
  { naam: 'Zwolle', x: 70.8, y: 37.1 },
  { naam: 'Woerden', x: 39.5, y: 52.1 },
  { naam: 'Noordwijk', x: 28.2, y: 46.8 },
  { naam: 'Amsterdam', x: 40.1, y: 42.1 },
  { naam: 'Rotterdam', x: 29.2, y: 58.2 },
  { naam: 'Den Haag', x: 24.8, y: 52.5 },
  { naam: 'Groningen', x: 83.2, y: 11.8 },
  { naam: 'Maastricht', x: 60.5, y: 96.4 },
  { naam: 'Arnhem', x: 66.2, y: 56.1 },
  { naam: 'Nijmegen', x: 64.6, y: 61.1 },
  { naam: 'Eindhoven', x: 55.0, y: 75.4 },
  { naam: 'Tilburg', x: 45.0, y: 71.1 },
  { naam: 'Leeuwarden', x: 63.3, y: 12.5 },
  { naam: 'Breda', x: 37.0, y: 70.0 },
  { naam: 'Deventer', x: 72.6, y: 46.4 },
  { naam: 'Amersfoort', x: 52.7, y: 49.6 },
  { naam: 'Haarlem', x: 33.6, y: 41.8 },
  { naam: 'Leiden', x: 29.5, y: 49.6 },
  { naam: 'Middelburg', x: 6.7, y: 73.2 },
  { naam: 'Enschede', x: 91.7, y: 47.5 },
];

function vindStad(locatie: string): BekendeStad | null {
  const lower = locatie.toLowerCase();
  const treffers = BEKENDE_STEDEN.filter((stad) => lower.includes(stad.naam.toLowerCase()));
  if (treffers.length === 0) {
    return null;
  }
  // Bij meerdere treffers (zeldzaam) de langste stadsnaam gebruiken, bv. "Den Haag" boven "Haag".
  return treffers.sort((a, b) => b.naam.length - a.naam.length)[0];
}

function aantalBoeken(groepen: LocatieGroep[]): number {
  return groepen.reduce((som, groep) => som + groep.boeken.length, 0);
}

export default function OnTourKaart({ locatieGroepen }: { locatieGroepen: LocatieGroep[] }) {
  const perStad = new Map<string, { stad: BekendeStad; groepen: LocatieGroep[] }>();
  const overig: LocatieGroep[] = [];

  for (const groep of locatieGroepen) {
    const stad = vindStad(groep.locatie);
    if (!stad) {
      overig.push(groep);
      continue;
    }
    const bestaand = perStad.get(stad.naam);
    if (bestaand) {
      bestaand.groepen.push(groep);
    } else {
      perStad.set(stad.naam, { stad, groepen: [groep] });
    }
  }

  return (
    <div className="on-tour-kaart-wrap">
      <div className="on-tour-kaart">
        <svg
          className="on-tour-kaart-afbeelding"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            className="on-tour-kaart-land"
            d="M22 33 L26 18 L38 9 L52 6 L68 6 L82 9 L90 18 L94 35 L92 50 L88 62 L82 70 L76 75 L70 78 L66 76 L64 84 L61 99 L57 90 L54 79 L48 78 L40 79 L34 79 L22 80 L18 78 L9 79 L3 76 L10 70 L4 68 L8 66 L14 60 L16 51 L18 45 L20 38 Z"
          />
          <path
            className="on-tour-kaart-water"
            d="M46 32 L50 20 L58 17 L66 22 L68 30 L62 36 L53 38 Z"
          />
          <ellipse className="on-tour-kaart-eiland" cx="32" cy="5" rx="4" ry="1.8" />
          <ellipse className="on-tour-kaart-eiland" cx="46" cy="3" rx="5" ry="1.6" />
          <ellipse className="on-tour-kaart-eiland" cx="58" cy="2" rx="4" ry="1.5" />
          <ellipse className="on-tour-kaart-eiland" cx="70" cy="3" rx="3.5" ry="1.4" />
        </svg>
        <svg className="on-tour-kompas" viewBox="0 0 100 100" aria-hidden="true">
          <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" strokeWidth="2" />
          <path d="M50 22 L58 50 L50 78 L42 50 Z" fill="currentColor" />
          <text x="50" y="15" textAnchor="middle" fontSize="11">
            N
          </text>
        </svg>
        {Array.from(perStad.values()).map(({ stad, groepen }) => (
          <details
            key={stad.naam}
            name="on-tour-locatie"
            className="kaart-pin"
            style={{ left: `${stad.x}%`, top: `${stad.y}%` }}
          >
            <summary className="kaart-pin-marker">
              <span className="kaart-pin-stip" />
              <span className="kaart-pin-label">{stad.naam}</span>
              {groepen.length > 0 ? <span className="kaart-pin-badge">{aantalBoeken(groepen)}</span> : null}
            </summary>
            {groepen.length > 0 ? (
              <div className="kaart-pin-inhoud">
                {groepen.map((groep) => (
                  <div key={groep.locatie} className="kaart-pin-venue">
                    <p className="kaart-pin-venue-naam">
                      {groep.locatie}
                      {groep.boeken.length > 1 ? <span className="kaart-pin-aantal"> ({groep.boeken.length})</span> : null}
                    </p>
                    <ul>
                      {groep.boeken.map((boek) => (
                        <li key={boek.titel}>{boek.titel}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ) : (
              <p className="kaart-pin-leeg">Hier is nog geen boek besproken.</p>
            )}
          </details>
        ))}
      </div>
      {overig.length > 0 ? (
        <div className="on-tour-overig">
          <h2>Ook op vakantie besproken</h2>
          <ul className="on-tour-overig-lijst">
            {overig.map((groep) => (
              <li key={groep.locatie}>
                <strong>
                  {groep.locatie}
                  {groep.boeken.length > 1 ? ` (${groep.boeken.length})` : ''}
                </strong>
                <ul>
                  {groep.boeken.map((boek) => (
                    <li key={boek.titel}>{boek.titel}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
