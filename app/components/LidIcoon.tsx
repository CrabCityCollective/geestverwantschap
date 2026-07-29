import type { ReactElement, ReactNode } from 'react';

const HUIDSKLEUR = '#e8c39b';
const LICHAAMSKLEUR = '#5c4a33';
const HAARKLEUR = '#2b1a10';

function Poppetje({ children }: { children?: ReactNode }) {
  return (
    <>
      <path d="M6 37 C6 27 12 22 20 22 C28 22 34 27 34 37 Z" fill={LICHAAMSKLEUR} />
      <circle cx="20" cy="16" r="10" fill={HUIDSKLEUR} />
      {children}
    </>
  );
}

function ChrisIcoon() {
  // Kenmerk: bril
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <Poppetje>
        <g fill="none" stroke="#170e05" strokeWidth="1.6">
          <circle cx="15.5" cy="16" r="4" />
          <circle cx="24.5" cy="16" r="4" />
          <line x1="19.5" y1="16" x2="20.5" y2="16" />
          <line x1="11.5" y1="15" x2="9.5" y2="14" />
          <line x1="28.5" y1="15" x2="30.5" y2="14" />
        </g>
      </Poppetje>
    </svg>
  );
}

function EstherIcoon() {
  // Kenmerk: pony
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <Poppetje>
        <path
          d="M9.5 14 C9.5 7 14 6 20 6 C26 6 30.5 7 30.5 14 C30.5 14 26 12 20 12 C14 12 9.5 14 9.5 14 Z"
          fill={HAARKLEUR}
        />
      </Poppetje>
    </svg>
  );
}

function JetIcoon() {
  // Kenmerk: grote knot op haar hoofd
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <Poppetje>
        <circle cx="20" cy="5.5" r="5.5" fill={HAARKLEUR} />
      </Poppetje>
    </svg>
  );
}

function MinAeIcoon() {
  // Kenmerk: Koreaans - strak, steil haar
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <Poppetje>
        <path
          d="M9 16 C8 7 13 5 20 5 C27 5 32 7 31 16 L29.5 22 L29.5 15 C29.5 15 25 13 20 13 C15 13 10.5 15 10.5 15 L10.5 22 Z"
          fill={HAARKLEUR}
        />
      </Poppetje>
    </svg>
  );
}

function RubenIcoon() {
  // Kenmerk: afro en baard
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <Poppetje>
        <circle cx="20" cy="14.5" r="12.5" fill={HAARKLEUR} />
        <circle cx="20" cy="16" r="10" fill={HUIDSKLEUR} />
        <path
          d="M12 23 C12.5 28 16 30 20 30 C24 30 27.5 28 28 23 C27 26.5 24 28 20 28 C16 28 13 26.5 12 23 Z"
          fill={HAARKLEUR}
        />
      </Poppetje>
    </svg>
  );
}

function JelteIcoon() {
  // Kenmerk: kaal en baard
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <Poppetje>
        <path
          d="M11 23 C11.5 28.5 15.5 31 20 31 C24.5 31 28.5 28.5 29 23 C28 27 24 29 20 29 C16 29 12 27 11 23 Z"
          fill={HAARKLEUR}
        />
      </Poppetje>
    </svg>
  );
}

function RobbieIcoon() {
  // Kenmerk: woelig haar
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <Poppetje>
        <path
          d="M9 15 C8 10 10 5 13 7 C14 3 18 3 19 6 C20 2 24 3 24 6 C27 4 30 6 29 10 C32 9 32 14 29 15 C28 11 26 9 24 10 C22 8 18 8 16 10 C13 8 10 11 9 15 Z"
          fill={HAARKLEUR}
        />
      </Poppetje>
    </svg>
  );
}

function OnbekendIcoon() {
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <Poppetje />
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
