import { notFound } from 'next/navigation';
import Link from 'next/link';
import * as boekenclub from '../../../lib/boekenclub';
import * as analyse from '../../../lib/analyse';
import type { Boek } from '../../../lib/types';
import Nav from '../../components/Nav';
import Sterren from '../../components/Sterren';
import BoekTitelIconen from '../../components/BoekIconen';

const { getBooks } = boekenclub as unknown as { getBooks: (filePath?: string) => Boek[] };
const { gemiddeldeSterren } = analyse as unknown as {
  gemiddeldeSterren: (boek: Boek) => number | null;
};

export const dynamic = 'force-dynamic';

export default function BoekPagina({ params }: { params: { index: string } }) {
  const boeken = getBooks();
  const index = Number(params.index);
  const boek = Number.isInteger(index) ? boeken[index] : undefined;

  if (!boek) {
    notFound();
  }

  const score = gemiddeldeSterren(boek);
  const beoordelingen = Object.entries(boek.beoordelingen);

  return (
    <>
      <Nav breed />
      <main className="container container-breed boek-detail">
        <p className="boek-detail-terug">
          <Link href="/">&larr; Terug naar boekenlijst</Link>
        </p>

        <h1>{boek.titel}</h1>

        <div className="boek-detail-iconen">
          <BoekTitelIconen
            geslachtAuteur={boek.geslachtAuteur}
            landVanHerkomstAuteur={boek.landVanHerkomstAuteur}
            uitgekozenDoor={boek.uitgekozenDoor}
          />
        </div>

        <p className="meta boek-detail-meta">
          {boek.auteur}
          {boek.genre ? <> &middot; {boek.genre}</> : null} &middot; {boek.jaartalEersteDruk}
        </p>
        {boek.datumGelezen ? (
          <p className="datumGelezen boek-detail-datum">Gelezen op {boek.datumGelezen}</p>
        ) : null}

        <dl className="boek-kenmerken boek-detail-kenmerken">
          <div>
            <dt>Land van herkomst auteur</dt>
            <dd>{boek.landVanHerkomstAuteur}</dd>
          </div>
          <div>
            <dt>Geslacht auteur</dt>
            <dd>{boek.geslachtAuteur}</dd>
          </div>
          <div>
            <dt>Uitgekozen door</dt>
            <dd>{boek.uitgekozenDoor}</dd>
          </div>
          {boek.landSetting ? (
            <div>
              <dt>Land setting</dt>
              <dd>{boek.landSetting}</dd>
            </div>
          ) : null}
          {boek.tijdSetting ? (
            <div>
              <dt>Tijd setting</dt>
              <dd>{boek.tijdSetting}</dd>
            </div>
          ) : null}
          {boek.locatieBespreking ? (
            <div>
              <dt>Locatie bespreking</dt>
              <dd>{boek.locatieBespreking}</dd>
            </div>
          ) : null}
        </dl>

        {score !== null ? (
          <p className="gemiddelde boek-detail-gemiddelde">
            Gemiddelde score <Sterren score={score} />
          </p>
        ) : (
          <p className="gemiddelde gemiddelde-leeg boek-detail-gemiddelde">Nog geen beoordelingen</p>
        )}

        {beoordelingen.length > 0 ? (
          <ul className="beoordelingen-lijst boek-detail-beoordelingen">
            {beoordelingen.map(([lid, beoordeling]) => (
              <li key={lid}>
                <strong>{lid}</strong>{' '}
                {typeof beoordeling.sterren === 'number' ? (
                  <Sterren score={beoordeling.sterren} />
                ) : (
                  <span className="sterren-nvt">{beoordeling.sterren}</span>
                )}
                <br />
                <span className="quote">&bdquo;{beoordeling.quote}&rdquo;</span>
              </li>
            ))}
          </ul>
        ) : null}
      </main>
    </>
  );
}
