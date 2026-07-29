const STER = '★';

export default function Sterren({ score, max = 5 }: { score: number; max?: number }) {
  const percentage = Math.max(0, Math.min(100, (score / max) * 100));

  return (
    <span className="sterren" role="img" aria-label={`${score.toFixed(1)} van de ${max} sterren`}>
      <span className="sterren-leeg" aria-hidden="true">
        {STER.repeat(max)}
      </span>
      <span className="sterren-vol" aria-hidden="true" style={{ width: `${percentage}%` }}>
        {STER.repeat(max)}
      </span>
    </span>
  );
}
