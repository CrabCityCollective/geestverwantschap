import * as boekenclub from '../lib/boekenclub';
import * as analyse from '../lib/analyse';
import type { Boek } from '../lib/types';
import Nav from './components/Nav';
import BoekenLijst from './components/BoekenLijst';

const { getBooks } = boekenclub as unknown as { getBooks: (filePath?: string) => Boek[] };
const { gemiddeldeSterren, sorteerOpDatumGelezen } = analyse as unknown as {
  gemiddeldeSterren: (boek: Boek) => number | null;
  sorteerOpDatumGelezen: (boeken: Boek[], richting?: 'nieuwste-eerst' | 'oudste-eerst') => Boek[];
};

export const dynamic = 'force-dynamic';

export default function HomePage() {
  const alleBoeken = getBooks();
  const boeken = sorteerOpDatumGelezen(alleBoeken).map((boek) => ({
    boek,
    index: alleBoeken.indexOf(boek),
    score: gemiddeldeSterren(boek),
  }));

  return (
    <>
      <Nav actief="boekenlijst" breed />
      <main className="container container-breed">
        <h1>
          <span className="titel-boekenclub">Boekenclub</span>
          <br />
          <span className="titel-naam">De Geestverwantschap</span>
        </h1>

        {boeken.length === 0 ? <p>Er zijn nog geen boeken toegevoegd.</p> : <BoekenLijst boeken={boeken} />}
      </main>
    </>
  );
}
