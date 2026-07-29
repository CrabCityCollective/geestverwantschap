import Link from 'next/link';

export default function Nav({ actief }: { actief: 'boekenlijst' | 'analytics' }) {
  return (
    <nav className="site-nav">
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
    </nav>
  );
}
