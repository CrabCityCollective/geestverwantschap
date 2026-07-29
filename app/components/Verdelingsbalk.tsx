import type { Telling } from '../../lib/types';

interface VerdelingsbalkProps {
  titel: string;
  data: Telling[];
}

const SERIE_KLASSEN = ['serie-1', 'serie-2', 'serie-3', 'serie-4'];

export default function Verdelingsbalk({ titel, data }: VerdelingsbalkProps) {
  const totaal = data.reduce((som, item) => som + item.aantal, 0);

  return (
    <figure className="grafiek">
      <figcaption className="grafiek-titel">{titel}</figcaption>
      {totaal === 0 ? (
        <p className="grafiek-leeg">Geen data beschikbaar.</p>
      ) : (
        <>
          <div className="verdelingsbalk-balk" role="img" aria-label={data
            .map((item) => `${item.label}: ${item.aantal} (${Math.round((item.aantal / totaal) * 100)}%)`)
            .join(', ')}
          >
            {data.map((item, index) => (
              <span
                key={item.label}
                className={SERIE_KLASSEN[index % SERIE_KLASSEN.length]}
                style={{ width: `${(item.aantal / totaal) * 100}%` }}
              />
            ))}
          </div>
          <ul className="verdelingsbalk-legenda">
            {data.map((item, index) => (
              <li key={item.label}>
                <span
                  className={`legenda-kleur ${SERIE_KLASSEN[index % SERIE_KLASSEN.length]}`}
                  aria-hidden="true"
                />
                {item.label}: {item.aantal} ({Math.round((item.aantal / totaal) * 100)}%)
              </li>
            ))}
          </ul>
        </>
      )}
    </figure>
  );
}
