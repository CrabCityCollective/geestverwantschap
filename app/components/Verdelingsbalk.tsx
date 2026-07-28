import type { Telling } from '../../lib/types';

interface VerdelingsbalkProps {
  titel: string;
  data: Telling[];
}

const SERIE_KLASSEN = ['serie-1', 'serie-2', 'serie-3', 'serie-4'];
const BREEDTE = 400;
const HOOGTE = 28;
const SEGMENT_GAP = 2;

export default function Verdelingsbalk({ titel, data }: VerdelingsbalkProps) {
  const totaal = data.reduce((som, item) => som + item.aantal, 0);

  return (
    <figure className="grafiek">
      <figcaption className="grafiek-titel">{titel}</figcaption>
      {totaal === 0 ? (
        <p className="grafiek-leeg">Geen data beschikbaar.</p>
      ) : (
        <>
          <table className="sr-only">
            <caption>{titel}</caption>
            <thead>
              <tr>
                <th scope="col">Label</th>
                <th scope="col">Aantal</th>
                <th scope="col">Aandeel</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item.label}>
                  <td>{item.label}</td>
                  <td>{item.aantal}</td>
                  <td>{Math.round((item.aantal / totaal) * 100)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
          <svg viewBox={`0 0 ${BREEDTE} ${HOOGTE}`} aria-hidden="true" className="grafiek-svg verdelingsbalk-svg">
            {(() => {
              let x = 0;
              return data.map((item, index) => {
                const segmentBreedte = (item.aantal / totaal) * BREEDTE;
                const gap = index > 0 ? SEGMENT_GAP : 0;
                const segX = x + gap;
                const segBreedte = Math.max(segmentBreedte - gap, 0);
                x += segmentBreedte;
                return (
                  <rect
                    key={item.label}
                    x={segX}
                    y={0}
                    width={segBreedte}
                    height={HOOGTE}
                    rx={4}
                    className={SERIE_KLASSEN[index % SERIE_KLASSEN.length]}
                  />
                );
              });
            })()}
          </svg>
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
