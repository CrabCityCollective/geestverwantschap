import type { Boek } from '../../lib/types';

type LocatieGroep = { locatie: string; boeken: Boek[] };

export default function StadKaart({
  stad,
  groepen,
  vorm,
}: {
  stad: string;
  groepen: LocatieGroep[];
  vorm: 'gracht' | 'singel';
}) {
  return (
    <div className="stad-kaart-wrap">
      <h2 className="stad-kaart-titel">{stad}</h2>
      <div className="stad-kaart">
        <svg
          className="stad-kaart-afbeelding"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <rect className="stad-kaart-bodem" x="0" y="0" width="100" height="100" />
          {vorm === 'gracht' ? (
            // Stilering van de Utrechtse Oudegracht, die golvend door de binnenstad loopt.
            <path
              className="stad-kaart-water"
              fill="none"
              d="M2 62 Q 20 40 38 55 T 70 48 T 98 40"
            />
          ) : (
            // Stilering van de Zwolse vestingwerken: de karakteristieke stervormige singel
            // rond de historische binnenstad.
            <path
              className="stad-kaart-water"
              fill="none"
              d="M50 14 L64 24 L84 26 L76 44 L88 60 L70 68 L62 86 L46 76 L26 84 L28 64 L12 52 L30 40 L32 20 Z"
            />
          )}
        </svg>
        {groepen.length === 0 ? (
          <p className="stad-kaart-leeg">Hier is nog geen boek besproken.</p>
        ) : (
          groepen.map((groep, index) => {
            const links = ((index + 1) / (groepen.length + 1)) * 100;
            return (
              <details
                key={groep.locatie}
                name={`stad-locatie-${stad}`}
                className="kaart-pin"
                style={{ left: `${links}%`, top: '55%' }}
              >
                <summary className="kaart-pin-marker">
                  <span className="kaart-pin-stip" />
                  <span className="kaart-pin-label">{groep.locatie}</span>
                  {groep.boeken.length > 1 ? (
                    <span className="kaart-pin-badge">{groep.boeken.length}</span>
                  ) : null}
                </summary>
                <div className="kaart-pin-inhoud">
                  <ul>
                    {groep.boeken.map((boek) => (
                      <li key={boek.titel}>{boek.titel}</li>
                    ))}
                  </ul>
                </div>
              </details>
            );
          })
        )}
      </div>
    </div>
  );
}
