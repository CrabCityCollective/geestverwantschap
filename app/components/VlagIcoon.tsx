import type { ReactElement } from 'react';

// Vlagvlak binnen de 24x24 viewBox.
const X = 2;
const Y = 4;
const BREEDTE = 20;
const HOOGTE = 16;

function Rand() {
  return <rect x={X} y={Y} width={BREEDTE} height={HOOGTE} fill="none" stroke="#170e05" strokeWidth="0.6" />;
}

function HorizontaleBanden({ kleuren }: { kleuren: string[] }) {
  const bandhoogte = HOOGTE / kleuren.length;
  return (
    <>
      {kleuren.map((kleur, i) => (
        <rect key={i} x={X} y={Y + i * bandhoogte} width={BREEDTE} height={bandhoogte} fill={kleur} />
      ))}
    </>
  );
}

function VerticaleBanden({ kleuren }: { kleuren: string[] }) {
  const bandbreedte = BREEDTE / kleuren.length;
  return (
    <>
      {kleuren.map((kleur, i) => (
        <rect key={i} x={X + i * bandbreedte} y={Y} width={bandbreedte} height={HOOGTE} fill={kleur} />
      ))}
    </>
  );
}

function NederlandVlag() {
  return <HorizontaleBanden kleuren={['#AE1C28', '#FFFFFF', '#21468B']} />;
}

function DuitslandVlag() {
  return <HorizontaleBanden kleuren={['#000000', '#DD0000', '#FFCE00']} />;
}

function BelgieVlag() {
  return <VerticaleBanden kleuren={['#000000', '#FAE042', '#ED2939']} />;
}

function FrankrijkVlag() {
  return <VerticaleBanden kleuren={['#0055A4', '#FFFFFF', '#EF4135']} />;
}

function ItalieVlag() {
  return <VerticaleBanden kleuren={['#008C45', '#FFFFFF', '#CD212A']} />;
}

function IerlandVlag() {
  return <VerticaleBanden kleuren={['#169B62', '#FFFFFF', '#FF883E']} />;
}

function NigeriaVlag() {
  return <VerticaleBanden kleuren={['#008751', '#FFFFFF', '#008751']} />;
}

function MexicoVlag() {
  return (
    <>
      <VerticaleBanden kleuren={['#006847', '#FFFFFF', '#CE1126']} />
      <circle cx={12} cy={12} r="1.6" fill="#8a6d2f" />
    </>
  );
}

function HongarijeVlag() {
  return <HorizontaleBanden kleuren={['#CD2A3E', '#FFFFFF', '#436F4D']} />;
}

function RuslandVlag() {
  return <HorizontaleBanden kleuren={['#FFFFFF', '#0039A6', '#D52B1E']} />;
}

function EstlandVlag() {
  return <HorizontaleBanden kleuren={['#0072CE', '#000000', '#FFFFFF']} />;
}

function ZwedenVlag() {
  return (
    <>
      <rect x={X} y={Y} width={BREEDTE} height={HOOGTE} fill="#006AA7" />
      <rect x={X + 6} y={Y} width={3} height={HOOGTE} fill="#FECC00" />
      <rect x={X} y={Y + 6.5} width={BREEDTE} height={3} fill="#FECC00" />
    </>
  );
}

function SpanjeVlag() {
  return (
    <>
      <rect x={X} y={Y} width={BREEDTE} height={4} fill="#AA151B" />
      <rect x={X} y={Y + 4} width={BREEDTE} height={8} fill="#F1BF00" />
      <rect x={X} y={Y + 12} width={BREEDTE} height={4} fill="#AA151B" />
    </>
  );
}

function JapanVlag() {
  return (
    <>
      <rect x={X} y={Y} width={BREEDTE} height={HOOGTE} fill="#FFFFFF" />
      <circle cx={12} cy={12} r="4.3" fill="#BC002D" />
    </>
  );
}

function ZuidKoreaVlag() {
  return (
    <>
      <rect x={X} y={Y} width={BREEDTE} height={HOOGTE} fill="#FFFFFF" />
      <path d="M12 8 A2 2 0 0 1 12 12 A2 2 0 0 0 12 16 A4 4 0 0 0 12 8 Z" fill="#CD2E3A" />
      <path d="M12 8 A4 4 0 0 0 12 16 A2 2 0 0 0 12 12 A2 2 0 0 1 12 8 Z" fill="#0047A0" />
      <g stroke="#170e05" strokeWidth="0.5">
        <path d="M4.5 6.5 L7 6.5 M4.5 7.6 L7 7.6 M4.5 8.7 L7 8.7" />
        <path d="M17 6.5 L19.5 6.5 M17.5 7.6 L19.5 7.6 M17 8.7 L19.5 8.7" />
        <path d="M4.5 15.3 L7 15.3 M4.5 16.4 L7 16.4 M4.5 17.5 L7 17.5" />
        <path d="M17 15.3 L19.5 15.3 M17.5 16.4 L19.5 16.4 M17 17.5 L19.5 17.5" />
      </g>
    </>
  );
}

function IsraelVlag() {
  return (
    <>
      <rect x={X} y={Y} width={BREEDTE} height={HOOGTE} fill="#FFFFFF" />
      <rect x={X} y={Y + 1.5} width={BREEDTE} height={1.6} fill="#0038B8" />
      <rect x={X} y={Y + 12.9} width={BREEDTE} height={1.6} fill="#0038B8" />
      <g fill="none" stroke="#0038B8" strokeWidth="0.9">
        <path d="M12 8.3 L15 13.7 L9 13.7 Z" />
        <path d="M12 15.7 L9 10.3 L15 10.3 Z" />
      </g>
    </>
  );
}

function ZuidAfrikaVlag() {
  return (
    <>
      <rect x={X} y={Y} width={BREEDTE} height={HOOGTE / 2} fill="#DE3831" />
      <rect x={X} y={Y + HOOGTE / 2} width={BREEDTE} height={HOOGTE / 2} fill="#002395" />
      <path d={`M${X} ${Y} L${X} ${Y + HOOGTE} L${X + 11} ${Y + HOOGTE / 2} Z`} fill="#FFFFFF" />
      <path d={`M${X} ${Y} L${X} ${Y + HOOGTE} L${X + 9.5} ${Y + HOOGTE / 2} Z`} fill="#007A4D" />
      <path d={`M${X} ${Y} L${X} ${Y + HOOGTE} L${X + 8} ${Y + HOOGTE / 2} Z`} fill="#FFB612" />
      <path d={`M${X} ${Y} L${X} ${Y + HOOGTE} L${X + 6.5} ${Y + HOOGTE / 2} Z`} fill="#000000" />
    </>
  );
}

function CanadaVlag() {
  return (
    <>
      <VerticaleBanden kleuren={['#FF0000', '#FFFFFF', '#FF0000']} />
      <path
        d="M12 8.5 L12.9 10.6 L15 10 L13.9 12 L16 12.6 L14 13.6 L14.6 15.8 L12 14.4 L9.4 15.8 L10 13.6 L8 12.6 L10.1 12 L9 10 L11.1 10.6 Z"
        fill="#FF0000"
      />
    </>
  );
}

function VerenigdKoninkrijkVlag() {
  return (
    <g transform={`translate(${X} ${Y}) scale(${BREEDTE / 60} ${HOOGTE / 36})`}>
      <rect width="60" height="36" fill="#00247d" />
      <path stroke="#fff" strokeWidth="6" d="M0,0 L60,36 M60,0 L0,36" />
      <path stroke="#cf142b" strokeWidth="2.4" d="M0,0 L25,15 M60,0 L35,15 M0,36 L25,21 M60,36 L35,21" />
      <path stroke="#fff" strokeWidth="10" d="M30,0 V36 M0,18 H60" />
      <path stroke="#cf142b" strokeWidth="6" d="M30,0 V36 M0,18 H60" />
    </g>
  );
}

function VerenigdeStatenVlag() {
  const stripeHoogte = 36 / 13;
  const witteStrepen = [1, 3, 5, 7, 9, 11];
  return (
    <g transform={`translate(${X} ${Y}) scale(${BREEDTE / 60} ${HOOGTE / 36})`}>
      <rect width="60" height="36" fill="#B22234" />
      {witteStrepen.map((i) => (
        <rect key={i} x="0" y={i * stripeHoogte} width="60" height={stripeHoogte} fill="#FFFFFF" />
      ))}
      <rect x="0" y="0" width="24" height={7 * stripeHoogte} fill="#3C3B6E" />
      {Array.from({ length: 4 }).flatMap((_, rij) =>
        Array.from({ length: 5 }).map((_, kolom) => (
          <circle
            key={`${rij}-${kolom}`}
            cx={2.5 + kolom * 5}
            cy={2.5 + rij * 4.5}
            r="0.8"
            fill="#FFFFFF"
          />
        ))
      )}
    </g>
  );
}

function OnbekendVlag() {
  return <HorizontaleBanden kleuren={['#8a6d2f', '#ecd9a8', '#8a6d2f']} />;
}

const VLAGGEN: Record<string, () => ReactElement> = {
  Nederland: NederlandVlag,
  Duitsland: DuitslandVlag,
  België: BelgieVlag,
  'Verenigd Koninkrijk': VerenigdKoninkrijkVlag,
  'Verenigde Staten': VerenigdeStatenVlag,
  Frankrijk: FrankrijkVlag,
  Italië: ItalieVlag,
  Ierland: IerlandVlag,
  Nigeria: NigeriaVlag,
  Mexico: MexicoVlag,
  Hongarije: HongarijeVlag,
  Rusland: RuslandVlag,
  Estland: EstlandVlag,
  Zweden: ZwedenVlag,
  Spanje: SpanjeVlag,
  Japan: JapanVlag,
  'Zuid-Korea': ZuidKoreaVlag,
  Israël: IsraelVlag,
  'Zuid-Afrika': ZuidAfrikaVlag,
  Canada: CanadaVlag,
};

export default function VlagIcoon({ land }: { land: string }) {
  const Vlag = VLAGGEN[land] ?? OnbekendVlag;
  return (
    <span className="kenmerk-icoon" title={`Land van herkomst auteur: ${land}`}>
      <svg viewBox="0 0 24 24" width="100%" height="100%">
        <Vlag />
        <Rand />
      </svg>
    </span>
  );
}
