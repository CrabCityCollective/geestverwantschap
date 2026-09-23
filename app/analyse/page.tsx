import Link from 'next/link';
import * as boekenclub from '../../lib/boekenclub';
import type { Boek, BoekenclubData } from '../../lib/types';
import { weergaveNaam } from '../../lib/aliassen';
import Nav from '../components/Nav';
import LidIcoon from '../components/LidIcoon';
import AnalyseSectie from '../components/AnalyseSectie';
import LidStatistieken from '../components/LidStatistieken';

const { readData } = boekenclub as unknown as { readData: (filePath?: string) => BoekenclubData };

export const dynamic = 'force-dynamic';

export default function AnalysePagina() {
  const data = readData();
  const boeken = data.boeken;

  return (
    <>
      <Nav actief="analytics" breed />
      <main className="container container-breed">
        <h1>Analyse van de boeken</h1>

        <p className="totaal-gelezen-sectie">
          <span className="totaal-gelezen">
            <span className="totaal-gelezen-getal">{boeken.length}</span>
            <span className="totaal-gelezen-label">
              {boeken.length === 1 ? 'boek gelezen' : 'boeken gelezen'}
            </span>
          </span>
        </p>

        <AnalyseSectie boeken={boeken} />

        {data.leden.map((lid: string) => (
          <section key={lid} className="lid-sectie">
            <h2>
              <Link href={`/analyse/${encodeURIComponent(lid)}`} className="lid-titel-link">
                <LidIcoon lid={lid} size={40} />
                {weergaveNaam(lid)}
              </Link>
            </h2>
            <LidStatistieken lid={lid} boeken={boeken} />
            <AnalyseSectie
              titel={`Uitgekozen door ${weergaveNaam(lid)}`}
              boeken={boeken.filter((boek: Boek) => boek.uitgekozenDoor === lid)}
            />
          </section>
        ))}
      </main>
    </>
  );
}
