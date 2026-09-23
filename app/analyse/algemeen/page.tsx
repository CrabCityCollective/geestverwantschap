import Link from 'next/link';
import * as boekenclub from '../../../lib/boekenclub';
import type { BoekenclubData } from '../../../lib/types';
import Nav from '../../components/Nav';
import AnalyseSectie from '../../components/AnalyseSectie';

const { readData } = boekenclub as unknown as { readData: (filePath?: string) => BoekenclubData };

export const dynamic = 'force-dynamic';

export default function AlgemeneAnalysePagina() {
  const data = readData();
  const boeken = data.boeken;

  return (
    <>
      <Nav actief="analyse" breed />
      <main className="container container-breed">
        <p className="lid-detail-terug">
          <Link href="/analyse">&larr; Terug naar analyse</Link>
        </p>

        <h1>Algemeen</h1>

        <p className="totaal-gelezen-sectie">
          <span className="totaal-gelezen">
            <span className="totaal-gelezen-getal">{boeken.length}</span>
            <span className="totaal-gelezen-label">
              {boeken.length === 1 ? 'boek gelezen' : 'boeken gelezen'}
            </span>
          </span>
        </p>

        <AnalyseSectie boeken={boeken} />
      </main>
    </>
  );
}
