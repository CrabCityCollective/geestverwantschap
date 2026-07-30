import * as boekenclub from '../../lib/boekenclub';
import * as analyse from '../../lib/analyse';
import type { Boek } from '../../lib/types';
import Nav from '../components/Nav';
import OnTourKaart from '../components/OnTourKaart';
import StadKaart from '../components/StadKaart';

const { getBooks } = boekenclub as unknown as { getBooks: (filePath?: string) => Boek[] };
const { groepeerPerLocatie } = analyse as unknown as {
  groepeerPerLocatie: (boeken: Boek[]) => { locatie: string; boeken: Boek[] }[];
};

export const dynamic = 'force-dynamic';

export default function OnTourPagina() {
  const locatieGroepen = groepeerPerLocatie(getBooks());
  const utrechtGroepen = locatieGroepen.filter((groep) => groep.locatie.toLowerCase().includes('utrecht'));
  const zwolleGroepen = locatieGroepen.filter((groep) => groep.locatie.toLowerCase().includes('zwolle'));
  const uitstapjes = locatieGroepen.filter(
    (groep) => !utrechtGroepen.includes(groep) && !zwolleGroepen.includes(groep)
  );

  return (
    <>
      <Nav actief="on-tour" breed />
      <main className="container container-breed">
        <h1>On tour</h1>
        {locatieGroepen.length === 0 ? (
          <p>Er zijn nog geen locaties van besprekingen vastgelegd.</p>
        ) : (
          <>
            <StadKaart stad="Utrecht" groepen={utrechtGroepen} vorm="gracht" />
            <StadKaart stad="Zwolle" groepen={zwolleGroepen} vorm="singel" />
            <h2 className="on-tour-uitstapjes-titel">Uitstapjes</h2>
            {uitstapjes.length === 0 ? (
              <p>Er zijn nog geen uitstapjes buiten Utrecht en Zwolle vastgelegd.</p>
            ) : (
              <OnTourKaart locatieGroepen={uitstapjes} />
            )}
          </>
        )}
      </main>
    </>
  );
}
