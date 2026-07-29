import type { ReactElement } from 'react';

const INKT = '#170e05';
const PERKAMENT = '#ecd9a8';
const GOUD = '#c9a227';
const GOUD_DIEP = '#8a6d2f';
const GOUD_LICHT = '#e8c766';
const SERIE_1 = '#14528c';
const SERIE_2 = '#9a1c1c';
const SERIE_3 = '#145c34';

function Badge({ achtergrond, children }: { achtergrond: string; children?: ReactElement | ReactElement[] }) {
  return (
    <>
      <circle cx="20" cy="20" r="19" fill={achtergrond} />
      {children}
    </>
  );
}

function JelteIcoon() {
  // Kenmerk: fiets
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <Badge achtergrond={GOUD_DIEP}>
        <g fill="none" stroke={PERKAMENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="13" cy="27" r="6" />
          <circle cx="27" cy="27" r="6" />
          <path d="M13 27 L20 15 L27 27 M20 15 L24 15 M20 21 L14 21" />
        </g>
      </Badge>
    </svg>
  );
}

function ChrisIcoon() {
  // Kenmerk: bril
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <Badge achtergrond={GOUD}>
        <g fill="none" stroke={INKT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="14" cy="20" r="5" />
          <circle cx="26" cy="20" r="5" />
          <line x1="19" y1="20" x2="21" y2="20" />
          <line x1="9" y1="19" x2="6" y2="17" />
          <line x1="31" y1="19" x2="34" y2="17" />
        </g>
      </Badge>
    </svg>
  );
}

function MinAeIcoon() {
  // Kenmerk: eetstokjes
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <Badge achtergrond={SERIE_2}>
        <g stroke={PERKAMENT} strokeWidth="2" strokeLinecap="round">
          <line x1="12" y1="30" x2="26" y2="10" />
          <line x1="16" y1="32" x2="30" y2="12" />
        </g>
      </Badge>
    </svg>
  );
}

function RubenIcoon() {
  // Kenmerk: video game (controller)
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <Badge achtergrond={SERIE_1}>
        <g stroke={PERKAMENT} fill="none" strokeLinecap="round">
          <rect x="8" y="17" width="24" height="12" rx="6" strokeWidth="2" />
          <path d="M15 20 L15 26 M12 23 L18 23" strokeWidth="1.8" />
          <circle cx="25" cy="21" r="1.6" fill={PERKAMENT} />
          <circle cx="28.5" cy="24.5" r="1.6" fill={PERKAMENT} />
        </g>
      </Badge>
    </svg>
  );
}

function EstherIcoon() {
  // Kenmerk: tent
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <Badge achtergrond={SERIE_3}>
        <g fill="none" stroke={PERKAMENT} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round">
          <path d="M20 10 L30 30 L10 30 Z" />
          <path d="M17 30 L20 22 L23 30" />
        </g>
      </Badge>
    </svg>
  );
}

function JetIcoon() {
  // Kenmerk: wol met breinaalden
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <Badge achtergrond={GOUD_LICHT}>
        <g fill="none" stroke={INKT} strokeLinecap="round">
          <circle cx="20" cy="23" r="8" strokeWidth="1.6" />
          <path d="M13.5 19 C18 25 22 17 27 23 M14.5 27 C19 21 23 29 27.5 19" strokeWidth="1.1" />
          <line x1="13" y1="11" x2="19.5" y2="17.5" strokeWidth="2" />
          <line x1="27" y1="11" x2="20.5" y2="17.5" strokeWidth="2" />
        </g>
      </Badge>
    </svg>
  );
}

function RobbieIcoon() {
  // Kenmerk: zaag
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <Badge achtergrond={INKT}>
        <g>
          <path d="M9 26 C9 21 13 19 17 21 L14 28 C11 29 9 28 9 26 Z" fill={GOUD_LICHT} />
          <path
            d="M16 22 L32 10 M18 21 L19 23 L21 20 L22 22 L24 19 L25 21 L27 18 L28 20 L30 17 L31 19"
            fill="none"
            stroke={GOUD_LICHT}
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      </Badge>
    </svg>
  );
}

function OnbekendIcoon() {
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <Badge achtergrond={GOUD_DIEP} />
    </svg>
  );
}

const ICONEN: Record<string, () => ReactElement> = {
  'Min Ae': MinAeIcoon,
  Ruben: RubenIcoon,
  Jelte: JelteIcoon,
  Chris: ChrisIcoon,
  Esther: EstherIcoon,
  Jet: JetIcoon,
  Robbie: RobbieIcoon,
};

export default function LidIcoon({ lid, size = 22 }: { lid: string; size?: number }) {
  const Icoon = ICONEN[lid] ?? OnbekendIcoon;
  return (
    <span
      className="lid-icoon"
      title={lid}
      style={{ width: size, height: size, minWidth: size }}
    >
      <Icoon />
    </span>
  );
}
