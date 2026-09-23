import { notFound } from 'next/navigation';
import Link from 'next/link';
import * as boekenclub from '../../../lib/boekenclub';
import type { Boek, BoekenclubData } from '../../../lib/types';
import { weergaveNaam } from '../../../lib/aliassen';
import Nav from '../../components/Nav';
import LidIcoon from '../../components/LidIcoon';
import AnalyseSectie from '../../components/AnalyseSectie';
import LidStatistieken from '../../components/LidStatistieken';

const { readData } = boekenclub as unknown as { readData: (filePath?: string) => BoekenclubData };

export const dynamic = 'force-dynamic';

export default function LidAnalysePagina({ params }: { params: { lid: string } }) {
  const data = readData();
  const lid = data.leden.find((kandidaat) => kandidaat === params.lid);

  if (!lid) {
    notFound();
  }

  const boeken = data.boeken;
  const uitgekozenBoeken = boeken.filter((boek: Boek) => boek.uitgekozenDoor === lid);

  return (
    <>
      <Nav actief="analytics" breed />
      <main className="container container-breed">
        <p className="lid-detail-terug">
          <Link href="/analyse">&larr; Terug naar analyse</Link>
        </p>

        <h1 className="lid-detail-titel">
          <LidIcoon lid={lid} size={40} />
          {weergaveNaam(lid)}
        </h1>

        <LidStatistieken lid={lid} boeken={boeken} />
        <AnalyseSectie titel={`Uitgekozen door ${weergaveNaam(lid)}`} boeken={uitgekozenBoeken} />
      </main>
    </>
  );
}
