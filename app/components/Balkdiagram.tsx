import type { Telling } from '../../lib/types';

interface BalkdiagramProps {
  titel: string;
  data: Telling[];
}

const BALK_HOOGTE = 26;
const BALK_GAP = 14;
const LABEL_BREEDTE = 210;
const GRAFIEK_BREEDTE = 560;
const RAND = 50;

function balkPad(x: number, y: number, breedte: number, hoogte: number, radius: number): string {
  const r = Math.max(Math.min(radius, breedte, hoogte / 2), 0);
  if (r === 0) {
    return `M ${x} ${y} H ${x + breedte} V ${y + hoogte} H ${x} Z`;
  }
  return [
    `M ${x} ${y}`,
    `H ${x + breedte - r}`,
    `A ${r} ${r} 0 0 1 ${x + breedte} ${y + r}`,
    `V ${y + hoogte - r}`,
    `A ${r} ${r} 0 0 1 ${x + breedte - r} ${y + hoogte}`,
    `H ${x}`,
    'Z',
  ].join(' ');
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
  const hoogte = data.length * (BALK_HOOGTE + BALK_GAP) + BALK_GAP;
  const breedte = LABEL_BREEDTE + GRAFIEK_BREEDTE + RAND;

  return (
    <figure className="grafiek">
      <figcaption className="grafiek-titel">{titel}</figcaption>
      <table className="sr-only">
        <caption>{titel}</caption>
        <thead>
          <tr>
            <th scope="col">Label</th>
            <th scope="col">Aantal</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.label}>
              <td>{item.label}</td>
              <td>{item.aantal}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <svg viewBox={`0 0 ${breedte} ${hoogte}`} aria-hidden="true" className="grafiek-svg">
        <line x1={LABEL_BREEDTE} y1={0} x2={LABEL_BREEDTE} y2={hoogte} className="grafiek-basislijn" />
        {data.map((item, index) => {
          const y = BALK_GAP + index * (BALK_HOOGTE + BALK_GAP);
          const balkBreedte = maxAantal === 0 ? 0 : (item.aantal / maxAantal) * (GRAFIEK_BREEDTE - 10);
          return (
            <g key={item.label}>
              <text
                x={LABEL_BREEDTE - 8}
                y={y + BALK_HOOGTE / 2}
                textAnchor="end"
                dominantBaseline="middle"
                className="grafiek-aslabel"
              >
                {item.label}
              </text>
              <path d={balkPad(LABEL_BREEDTE, y, balkBreedte, BALK_HOOGTE, 4)} className="serie-1" />
              <text
                x={LABEL_BREEDTE + balkBreedte + 8}
                y={y + BALK_HOOGTE / 2}
                dominantBaseline="middle"
                className="grafiek-waarde"
              >
                {item.aantal}
              </text>
            </g>
          );
        })}
      </svg>
    </figure>
  );
}
