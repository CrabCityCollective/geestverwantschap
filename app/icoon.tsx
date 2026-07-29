export function BoekIcoon({ size }: { size: number }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 50% 38%, #3a2510 0%, #140d06 70%)',
      }}
    >
      <svg width={size * 0.74} height={size * 0.74} viewBox="0 0 100 100">
        <path
          d="M50 20 L50 84 C 39 76 22 74 11 79 L11 24 C 22 18 39 20 50 20 Z"
          fill="#ecd9a8"
          stroke="#170e05"
          strokeWidth="4"
        />
        <path
          d="M50 20 L50 84 C 61 76 78 74 89 79 L89 24 C 78 18 61 20 50 20 Z"
          fill="#ecd9a8"
          stroke="#170e05"
          strokeWidth="4"
        />
        <rect x="47" y="18" width="6" height="66" rx="2" fill="#c9a227" />
        <path d="M15 28 C 25 24 36 25 46 29" stroke="#c9a227" strokeWidth="2.5" fill="none" />
        <path d="M15 40 C 25 36 36 37 46 41" stroke="#c9a227" strokeWidth="2.5" fill="none" />
        <path d="M85 28 C 75 24 64 25 54 29" stroke="#c9a227" strokeWidth="2.5" fill="none" />
        <path d="M85 40 C 75 36 64 37 54 41" stroke="#c9a227" strokeWidth="2.5" fill="none" />
      </svg>
    </div>
  );
}
