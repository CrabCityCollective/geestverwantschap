import Link from 'next/link';
import * as boekenclub from '../../lib/boekenclub';
import * as analyse from '../../lib/analyse';
import type { Boek, BoekenclubData, Telling } from '../../lib/types';
import Balkdiagram from '../components/Balkdiagram';
import Verdelingsbalk from '../components/Verdelingsbalk';

const { readData } = boekenclub as unknown as { readData: (filePath?: string) => BoekenclubData };
const { telLandenVanAuteurs, telGeslachtVanAuteurs, telTijdvakken, gemiddeldeSterrenGegeven, besteBoekVoorLid } =
  analyse as unknown as {
    telLandenVanAuteurs: (boeken: Boek[]) => Telling[];
    telGeslachtVanAuteurs: (boeken: Boek[]) => Telling[];
    telTijdvakken: (boeken: Boek[]) => Telling[];
    gemiddeldeSterrenGegeven: (boeken: Boek[], lid: string) => number | null;
    besteBoekVoorLid: (boeken: Boek[], lid: string) => Boek | null;
  };

export const dynamic = 'force-dynamic';

function AnalyseSectie({ titel, boeken }: { titel: string; boeken: Boek[] }) {
  return (
    <section className="analyse-sectie">
      <h2>{titel}</h2>
      {boeken.length === 0 ? (
        <p className="grafiek-leeg">Nog geen boeken om te analyseren.</p>
      ) : (
        <div className="grafieken-grid">
          <Balkdiagram titel="Land van herkomst auteur" data={telLandenVanAuteurs(boeken)} />
          <Balkdiagram titel="Tijdvak (jaartal eerste druk)" data={telTijdvakken(boeken)} />
          <Verdelingsbalk titel="Geslacht auteur" data={telGeslachtVanAuteurs(boeken)} />
        </div>
      )}
    </section>
  );
}

function LidStatistieken({ lid, boeken }: { lid: string; boeken: Boek[] }) {
  const gemiddelde = gemiddeldeSterrenGegeven(boeken, lid);
  const besteBoek = besteBoekVoorLid(boeken, lid);

  return (
    <p className="lid-statistieken">
      {gemiddelde !== null ? (
        <>Gemiddeld aantal sterren gegeven: {gemiddelde.toFixed(1)} / 5</>
      ) : (
        <>Nog geen sterren gegeven</>
      )}
      {besteBoek ? (
        <>
          {' '}
          &middot; Best beoordeeld: {besteBoek.titel} ({besteBoek.beoordelingen[lid].sterren} / 5)
        </>
      ) : null}
    </p>
  );
}

export default function AnalysePagina() {
  const data = readData();
  const boeken = data.boeken;

  return (
    <main className="container container-breed">
      <nav className="site-nav">
        <Link href="/">&larr; Terug naar boekenlijst</Link>
      </nav>
      <h1>Analyse van de boeken</h1>
      <p>
        Een overzicht van alle {boeken.length} gelezen boeken, en per boekenclublid van de boeken die diegene heeft
        uitgekozen.
      </p>

      <AnalyseSectie titel="Alle boeken" boeken={boeken} />

      {data.leden.map((lid: string) => (
        <section key={lid} className="lid-sectie">
          <h2>{lid}</h2>
          <LidStatistieken lid={lid} boeken={boeken} />
          <AnalyseSectie
            titel={`Uitgekozen door ${lid}`}
            boeken={boeken.filter((boek: Boek) => boek.uitgekozenDoor === lid)}
          />
        </section>
      ))}
    </main>
  );
}
