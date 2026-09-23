import Link from 'next/link';

export default function Nav({
  actief,
  breed,
}: {
  actief?: 'boekenlijst' | 'analyse' | 'on-tour' | 'quiz';
  breed?: boolean;
}) {
  return (
    <nav className={breed ? 'site-nav site-nav-breed' : 'site-nav'}>
      {actief === 'boekenlijst' ? (
        <span aria-current="page">Boeken</span>
      ) : (
        <Link href="/">Boeken</Link>
      )}
      <span className="site-nav-scheiding" aria-hidden="true">
        &middot;
      </span>
      {actief === 'analyse' ? (
        <span aria-current="page">Analyse</span>
      ) : (
        <Link href="/analyse">Analyse</Link>
      )}
      <span className="site-nav-scheiding" aria-hidden="true">
        &middot;
      </span>
      {actief === 'on-tour' ? (
        <span aria-current="page">On tour</span>
      ) : (
        <Link href="/on-tour">On tour</Link>
      )}
      <span className="site-nav-scheiding" aria-hidden="true">
        &middot;
      </span>
      {actief === 'quiz' ? (
        <span aria-current="page">Quiz</span>
      ) : (
        <Link href="/quiz">Quiz</Link>
      )}
    </nav>
  );
}
