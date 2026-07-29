import LidIcoon from './LidIcoon';
import VlagIcoon from './VlagIcoon';

function GeslachtIcoon({ geslacht }: { geslacht: string }) {
  const isVrouw = geslacht.toLowerCase() === 'vrouw';
  return (
    <span className="kenmerk-icoon" title={`Geslacht auteur: ${geslacht}`}>
      <svg viewBox="0 0 24 24" width="100%" height="100%">
        {isVrouw ? (
          <g fill="none" stroke="#e8c766" strokeWidth="2">
            <circle cx="12" cy="9" r="6" />
            <line x1="12" y1="15" x2="12" y2="22" />
            <line x1="8.5" y1="18.5" x2="15.5" y2="18.5" />
          </g>
        ) : (
          <g fill="none" stroke="#e8c766" strokeWidth="2">
            <circle cx="10" cy="14" r="6" />
            <line x1="14.5" y1="9.5" x2="21" y2="3" />
            <polyline points="14.5 3 21 3 21 9.5" />
          </g>
        )}
      </svg>
    </span>
  );
}

export default function BoekTitelIconen({
  geslachtAuteur,
  landVanHerkomstAuteur,
  uitgekozenDoor,
}: {
  geslachtAuteur: string;
  landVanHerkomstAuteur: string;
  uitgekozenDoor: string;
}) {
  return (
    <span className="boek-titel-iconen">
      <GeslachtIcoon geslacht={geslachtAuteur} />
      <VlagIcoon land={landVanHerkomstAuteur} />
      <LidIcoon lid={uitgekozenDoor} />
    </span>
  );
}
