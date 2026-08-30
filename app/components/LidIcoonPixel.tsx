import type { ReactElement } from 'react';

const INKT = '#170e05';
const PERKAMENT = '#ecd9a8';
const GOUD = '#c9a227';
const GOUD_DIEP = '#8a6d2f';
const GOUD_LICHT = '#e8c766';
const SERIE_1 = '#14528c';
const SERIE_2 = '#9a1c1c';
const SERIE_3 = '#145c34';

const RASTER = 12;

type Pixel = [number, number];

function PixelBadge({ achtergrond, kleur, pixels }: { achtergrond: string; kleur: string; pixels: Pixel[] }) {
  return (
    <svg viewBox={`0 0 ${RASTER} ${RASTER}`} width="100%" height="100%" shapeRendering="crispEdges">
      <rect x="0" y="0" width={RASTER} height={RASTER} fill={achtergrond} />
      {pixels.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={kleur} />
      ))}
    </svg>
  );
}

function JeltePixelIcoon() {
  // Kenmerk: fiets
  const pixels: Pixel[] = [
    [1, 6], [2, 6], [3, 6],
    [0, 7], [4, 7],
    [0, 8], [4, 8],
    [0, 9], [4, 9],
    [1, 10], [2, 10], [3, 10],
    [8, 6], [9, 6], [10, 6],
    [7, 7], [11, 7],
    [7, 8], [11, 8],
    [7, 9], [11, 9],
    [8, 10], [9, 10], [10, 10],
    [2, 7], [3, 5], [4, 4], [5, 3],
    [9, 7], [8, 5], [7, 4],
    [6, 3],
  ];
  return <PixelBadge achtergrond={GOUD_DIEP} kleur={PERKAMENT} pixels={pixels} />;
}

function ChrisPixelIcoon() {
  // Kenmerk: bril
  const pixels: Pixel[] = [
    [1, 5], [2, 5], [3, 5], [4, 5],
    [1, 8], [2, 8], [3, 8], [4, 8],
    [1, 6], [1, 7], [4, 6], [4, 7],
    [7, 5], [8, 5], [9, 5], [10, 5],
    [7, 8], [8, 8], [9, 8], [10, 8],
    [7, 6], [7, 7], [10, 6], [10, 7],
    [5, 6], [6, 6],
    [0, 4], [11, 4],
  ];
  return <PixelBadge achtergrond={GOUD} kleur={INKT} pixels={pixels} />;
}

function MinAePixelIcoon() {
  // Kenmerk: eetstokjes
  const pixels: Pixel[] = [
    [2, 10], [3, 9], [4, 8], [5, 7], [6, 6], [7, 5], [8, 4],
    [3, 10], [4, 9], [5, 8], [6, 7], [7, 6], [8, 5], [9, 4],
  ];
  return <PixelBadge achtergrond={SERIE_2} kleur={PERKAMENT} pixels={pixels} />;
}

function RubenPixelIcoon() {
  // Kenmerk: video game (controller)
  const pixels: Pixel[] = [
    [1, 4], [2, 4], [3, 4], [4, 4], [5, 4], [6, 4], [7, 4], [8, 4], [9, 4], [10, 4],
    [1, 9], [2, 9], [3, 9], [4, 9], [5, 9], [6, 9], [7, 9], [8, 9], [9, 9], [10, 9],
    [1, 5], [1, 6], [1, 7], [1, 8],
    [10, 5], [10, 6], [10, 7], [10, 8],
    [3, 6], [3, 7], [3, 8], [2, 7], [4, 7],
    [7, 6], [9, 7],
  ];
  return <PixelBadge achtergrond={SERIE_1} kleur={PERKAMENT} pixels={pixels} />;
}

function EstherPixelIcoon() {
  // Kenmerk: tent
  const pixels: Pixel[] = [
    [5, 2], [6, 2],
    [4, 3], [7, 3],
    [3, 4], [8, 4],
    [2, 5], [9, 5],
    [1, 6], [10, 6],
    [1, 7], [2, 7], [3, 7], [4, 7], [7, 7], [8, 7], [9, 7], [10, 7],
  ];
  return <PixelBadge achtergrond={SERIE_3} kleur={PERKAMENT} pixels={pixels} />;
}

function JetPixelIcoon() {
  // Kenmerk: wol met breinaalden
  const pixels: Pixel[] = [
    [2, 1], [3, 2], [4, 3],
    [8, 1], [7, 2], [6, 3],
    [4, 4], [5, 4], [6, 4],
    [3, 5], [4, 5], [5, 5], [6, 5], [7, 5],
    [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6], [8, 6],
    [2, 7], [3, 7], [4, 7], [5, 7], [6, 7], [7, 7], [8, 7],
    [2, 8], [3, 8], [4, 8], [5, 8], [6, 8], [7, 8], [8, 8],
    [3, 9], [4, 9], [5, 9], [6, 9], [7, 9],
    [4, 10], [5, 10], [6, 10],
  ];
  return <PixelBadge achtergrond={GOUD_LICHT} kleur={INKT} pixels={pixels} />;
}

function RobbiePixelIcoon() {
  // Kenmerk: zaag
  const pixels: Pixel[] = [
    [1, 7], [2, 7], [3, 7],
    [1, 8], [2, 8], [3, 8],
    [1, 9], [2, 9], [3, 9],
    [3, 7], [4, 6], [5, 5], [6, 4], [7, 3], [8, 2], [9, 1],
    [5, 6], [7, 4], [9, 2],
  ];
  return <PixelBadge achtergrond={INKT} kleur={GOUD_LICHT} pixels={pixels} />;
}

function OnbekendPixelIcoon() {
  return <PixelBadge achtergrond={GOUD_DIEP} kleur={GOUD_DIEP} pixels={[]} />;
}

const PIXEL_ICONEN: Record<string, () => ReactElement> = {
  'Min Ae': MinAePixelIcoon,
  Ruben: RubenPixelIcoon,
  Jelte: JeltePixelIcoon,
  Chris: ChrisPixelIcoon,
  Esther: EstherPixelIcoon,
  Jet: JetPixelIcoon,
  Robbie: RobbiePixelIcoon,
};

export default function LidIcoonPixel({ lid, size = 22 }: { lid: string; size?: number }) {
  const Icoon = PIXEL_ICONEN[lid] ?? OnbekendPixelIcoon;
  return (
    <span
      className="lid-icoon lid-icoon-pixel"
      title={lid}
      style={{ width: size, height: size, minWidth: size }}
    >
      <Icoon />
    </span>
  );
}
