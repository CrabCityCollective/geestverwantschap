import * as boekenclub from '../../lib/boekenclub';
import * as analyse from '../../lib/analyse';
import type { Boek } from '../../lib/types';
import Nav from '../components/Nav';
import OnTourKaart from '../components/OnTourKaart';

const { getBooks } = boekenclub as unknown as { getBooks: (filePath?: string) => Boek[] };
const { groepeerPerLocatie } = analyse as unknown as {
  groepeerPerLocatie: (boeken: Boek[]) => { locatie: string; boeken: Boek[] }[];
};

export const dynamic = 'force-dynamic';

export default function OnTourPagina() {
  const locatieGroepen = groepeerPerLocatie(getBooks());

  return (
    <>
      <Nav actief="on-tour" breed />
      <main className="container container-breed">
        <h1>On tour</h1>
        {locatieGroepen.length === 0 ? (
          <p>Er zijn nog geen locaties van besprekingen vastgelegd.</p>
        ) : (
          <OnTourKaart locatieGroepen={locatieGroepen} />
        )}
      </main>
    </>
  );
}
