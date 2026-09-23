import Link from 'next/link';
import * as boekenclub from '../../lib/boekenclub';
import type { BoekenclubData } from '../../lib/types';
import { weergaveNaam } from '../../lib/aliassen';
import Nav from '../components/Nav';
import LidIcoon from '../components/LidIcoon';

const { readData } = boekenclub as unknown as { readData: (filePath?: string) => BoekenclubData };

export const dynamic = 'force-dynamic';

function AlgemeenIcoon() {
  return (
    <span className="lid-icoon" style={{ width: 40, height: 40, minWidth: 40 }} aria-hidden="true">
      <svg viewBox="0 0 40 40" width="100%" height="100%">
        <circle cx="20" cy="20" r="19" fill="#8a6d2f" />
        <g fill="none" stroke="#ecd9a8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 12 L20 14 L29 12 L29 28 L20 26 L11 28 Z" />
          <line x1="20" y1="14" x2="20" y2="26" />
        </g>
      </svg>
    </span>
  );
}

export default function AnalysePagina() {
  const data = readData();

  return (
    <>
      <Nav actief="analyse" breed />
      <main className="container container-breed">
        <h1>Analyse</h1>

        <ul className="analyse-links">
          <li>
            <Link href="/analyse/algemeen" className="analyse-link-kaart">
              <AlgemeenIcoon />
              <span>Algemeen</span>
            </Link>
          </li>
          {data.leden.map((lid: string) => (
            <li key={lid}>
              <Link href={`/analyse/${encodeURIComponent(lid)}`} className="analyse-link-kaart">
                <LidIcoon lid={lid} size={40} />
                <span>{weergaveNaam(lid)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
