import Link from 'next/link';

export default function Nav({
  actief,
  breed,
}: {
  actief: 'boekenlijst' | 'analytics' | 'on-tour' | 'pixel-art';
  breed?: boolean;
}) {
  return (
    <nav className={breed ? 'site-nav site-nav-breed' : 'site-nav'}>
      {actief === 'boekenlijst' ? (
        <span aria-current="page">Boekenlijst</span>
      ) : (
        <Link href="/">Boekenlijst</Link>
      )}
      <span className="site-nav-scheiding" aria-hidden="true">
        &middot;
      </span>
      {actief === 'analytics' ? (
        <span aria-current="page">Analytics</span>
      ) : (
        <Link href="/analyse">Analytics</Link>
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
      {actief === 'pixel-art' ? (
        <span aria-current="page">Pixel art</span>
      ) : (
        <Link href="/pixel-art">Pixel art</Link>
      )}
    </nav>
  );
}
