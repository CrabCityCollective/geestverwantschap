import type { Telling } from '../../lib/types';

interface BalkdiagramProps {
  titel: string;
  data: Telling[];
}

export default function Balkdiagram({ titel, data }: BalkdiagramProps) {
  if (data.length === 0) {
    return (
      <figure className="grafiek">
        <figcaption className="grafiek-titel">{titel}</figcaption>
        <p className="grafiek-leeg">Geen data beschikbaar.</p>
      </figure>
    );
  }

  const maxAantal = Math.max(...data.map((item) => item.aantal));

  return (
    <figure className="grafiek">
      <figcaption className="grafiek-titel">{titel}</figcaption>
      <ul className="balkdiagram-lijst">
        {data.map((item) => (
          <li key={item.label} className="balkdiagram-rij">
            <span className="balkdiagram-label">{item.label}</span>
            <span className="balkdiagram-balk-baan">
              <span
                className="balkdiagram-balk serie-1"
                style={{ width: `${maxAantal === 0 ? 0 : (item.aantal / maxAantal) * 100}%` }}
              />
            </span>
            <span className="balkdiagram-waarde">{item.aantal}</span>
          </li>
        ))}
      </ul>
    </figure>
  );
}
