import type { ReactElement, ReactNode } from 'react';

function Buste({
  skin,
  shirt,
  children,
}: {
  skin: string;
  shirt: string;
  children?: ReactNode;
}) {
  return (
    <>
      <path
        d="M4 38 C4 27 11 21 20 21 C29 21 36 27 36 38 Z"
        fill={shirt}
        stroke="#170e05"
        strokeWidth="1.5"
      />
      <circle cx="20" cy="15" r="9.5" fill={skin} stroke="#170e05" strokeWidth="1.5" />
      {children}
    </>
  );
}

function MinAeIcoon() {
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <Buste skin="#f0c49a" shirt="#d98aa0">
        <path
          d="M10.5 13 C10 6 15 4 20 4 C25 4 30 6 29.5 13 C29.5 17 28 20 28 20 L27 13.5 C27 13.5 24 16 20 16 C16 16 13 13.5 13 13.5 L12 20 C12 20 10.5 17 10.5 13 Z"
          fill="#1c140f"
        />
        <circle cx="16.5" cy="16.5" r="3.4" fill="#f6d3b3" opacity="0.6" />
        <circle cx="23.5" cy="16.5" r="3.4" fill="#f6d3b3" opacity="0.6" />
        <circle cx="16.5" cy="15" r="1" fill="#170e05" />
        <circle cx="23.5" cy="15" r="1" fill="#170e05" />
        <path d="M17 19.5 C18.5 21 21.5 21 23 19.5" stroke="#170e05" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      </Buste>
    </svg>
  );
}

function RubenIcoon() {
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <Buste skin="#f2c9a0" shirt="#5c7a4a">
        <circle cx="20" cy="13" r="12.5" fill="#6b4423" />
        <circle cx="20" cy="15.5" r="9.3" fill="#f2c9a0" stroke="#170e05" strokeWidth="1.5" />
        <path d="M11 19 C13 24 16 25.5 15 21 Z" fill="#6b4423" />
        <path d="M29 19 C27 24 24 25.5 25 21 Z" fill="#6b4423" />
        <path d="M13.5 21.5 C16 25.5 24 25.5 26.5 21.5 C26 26 23 27.5 20 27.5 C17 27.5 14 26 13.5 21.5 Z" fill="#6b4423" />
        <circle cx="16.5" cy="15" r="1" fill="#170e05" />
        <circle cx="23.5" cy="15" r="1" fill="#170e05" />
        <line x1="19" y1="21.5" x2="26" y2="24" stroke="#d8c9a3" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="26.6" cy="24.3" r="1.1" fill="#e2733a" />
      </Buste>
    </svg>
  );
}

function JelteIcoon() {
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <Buste skin="#e9b98d" shirt="#2f6fb0">
        <path d="M16 20 C13 17 27 17 24 20" fill="none" stroke="#170e05" strokeWidth="1.2" />
        <path d="M12.5 21 C15 25.5 25 25.5 27.5 21 C27 25.5 24 27.5 20 27.5 C16 27.5 13 25.5 12.5 21 Z" fill="#f2f2f2" />
        <path d="M12.5 12.5 C16 12.5 24 12.5 27.5 12.5 L27 15.5 C24 14 16 14 13 15.5 Z" fill="#1c140f" opacity="0.9" />
        <ellipse cx="20" cy="14.5" rx="8.6" ry="2.6" fill="#170e05" />
        <circle cx="27" cy="8.5" r="1.4" fill="#e8c766" />
      </Buste>
    </svg>
  );
}

function ChrisIcoon() {
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <Buste skin="#eec49c" shirt="#3a3a3a">
        <path d="M13 34 C13 29 15 27 20 27 C25 27 27 29 27 34" fill="#3a3a3a" stroke="#170e05" strokeWidth="1.2" />
        <path d="M10.8 12 C10.5 6.5 14.5 4.5 20 4.5 C25.5 4.5 29.5 6.5 29.2 12 C26 9 14 9 10.8 12 Z" fill="#3a2a1c" />
        <path d="M16.5 21 C18 22 22 22 23.5 21" stroke="#170e05" strokeWidth="1" fill="none" />
        <path d="M15.5 22.5 C17 25 23 25 24.5 22.5 L24 26 C22 27.2 18 27.2 16 26 Z" fill="#3a2a1c" />
        <circle cx="16" cy="15.5" r="2.6" fill="none" stroke="#170e05" strokeWidth="1.1" />
        <circle cx="24" cy="15.5" r="2.6" fill="none" stroke="#170e05" strokeWidth="1.1" />
        <line x1="18.6" y1="15.5" x2="21.4" y2="15.5" stroke="#170e05" strokeWidth="1.1" />
      </Buste>
    </svg>
  );
}

function EstherIcoon() {
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <Buste skin="#f1c9a3" shirt="#7a1f3d">
        <path d="M4 38 C4.6 33 8 32 8 32 L12 34 L10 38 Z" fill="#c9a227" opacity="0.85" />
        <path
          d="M10.5 12.5 C10 6 15 4 20 4 C25 4 30 6 29.5 12.5 L28.7 21 C28.7 21 27.5 15.5 27.5 13.5 C24 15.5 16 15.5 12.5 13.5 C12.5 15.5 11.3 21 11.3 21 Z"
          fill="#2b1a10"
        />
        <path d="M12.7 9 L27.3 9" stroke="#170e05" strokeWidth="2.6" strokeLinecap="round" />
        <circle cx="16.5" cy="16" r="1" fill="#170e05" />
        <circle cx="23.5" cy="16" r="1" fill="#170e05" />
        <path d="M17 19.5 C18.5 21 21.5 21 23 19.5" stroke="#170e05" strokeWidth="1.2" fill="none" strokeLinecap="round" />
      </Buste>
    </svg>
  );
}

function JetIcoon() {
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <Buste skin="#f1cba6" shirt="#8a6d2f">
        <path d="M14 33 L14 29 M17 34 L17 29 M20 34.5 L20 29" stroke="#ecd9a8" strokeWidth="1" opacity="0.6" />
        <path
          d="M10.8 13 C10.3 6 15 4 20 4 C25 4 29.7 6 29.2 13 L28.5 18.5 C28.5 15 27 13 27 13 C24 15 16 15 13 13 C13 13 11.5 15 11.5 18.5 Z"
          fill="#3a2a1c"
        />
        <path d="M13 9.5 L27 9.5" stroke="#170e05" strokeWidth="2.4" strokeLinecap="round" />
        <circle cx="16.5" cy="16" r="1" fill="#170e05" />
        <circle cx="23.5" cy="16" r="1" fill="#170e05" />
        <circle cx="32" cy="30" r="4.4" fill="none" stroke="#c9a227" strokeWidth="1.6" />
        <circle cx="32" cy="30" r="2.3" fill="none" stroke="#c9a227" strokeWidth="1.2" />
        <line x1="35.5" y1="26.5" x2="38.5" y2="23" stroke="#8a6d2f" strokeWidth="1.4" strokeLinecap="round" />
      </Buste>
    </svg>
  );
}

function RobbieIcoon() {
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <Buste skin="#eec49c" shirt="#e9e9e9">
        <path d="M14 32.5 C14 29.5 16.5 28.5 20 28.5 C23.5 28.5 26 29.5 26 32.5" fill="#e9e9e9" stroke="#170e05" strokeWidth="1.2" />
        <path d="M20 28.5 L20 34" stroke="#c9a227" strokeWidth="2" />
        <path
          d="M11 13 C9.5 9 12 5 16 4.3 C15 6 21 3.5 24 5 C27 6.3 24.5 7 26 8 C29 10 29.5 12.5 28.5 15.5 C28 13.5 26.5 11.5 24.5 11 C22 13 15 12.5 12.5 10.5 C11.8 12 11.5 13.5 11.8 15.5 Z"
          fill="#5a3a20"
        />
        <circle cx="16.5" cy="15.5" r="1" fill="#170e05" />
        <circle cx="23.5" cy="15.5" r="1" fill="#170e05" />
        <path d="M16 19.5 C18 22 22 22 24 19.5" stroke="#170e05" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        <path
          d="M30 24 C31.5 24 32.5 25 32.5 26.5 C32.5 27.8 31.7 28.6 30.6 28.9 C31 30.3 32.4 31 33.6 30.5"
          fill="none"
          stroke="#c9c9c9"
          strokeWidth="1.4"
        />
        <circle cx="34" cy="30.6" r="1.3" fill="#c9c9c9" />
      </Buste>
    </svg>
  );
}

function OnbekendIcoon() {
  return (
    <svg viewBox="0 0 40 40" width="100%" height="100%">
      <Buste skin="#c9b79a" shirt="#7a5b34" />
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
