import * as boekenclub from '../../lib/boekenclub';
import * as analyse from '../../lib/analyse';
import type { Boek, BoekenclubData, Telling } from '../../lib/types';
import Balkdiagram from '../components/Balkdiagram';
import Verdelingsbalk from '../components/Verdelingsbalk';
import Nav from '../components/Nav';
import Sterren from '../components/Sterren';
import LidIcoon from '../components/LidIcoon';

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
    <div className="lid-statistieken">
      <p>
        {gemiddelde !== null ? (
          <>
            Gemiddeld aantal sterren gegeven: <Sterren score={gemiddelde} />
          </>
        ) : (
          <>Nog geen sterren gegeven</>
        )}
      </p>
      {besteBoek ? (
        <p>
          Best beoordeeld: {besteBoek.titel} (<Sterren score={besteBoek.beoordelingen[lid].sterren} />)
        </p>
      ) : null}
    </div>
  );
}

export default function AnalysePagina() {
  const data = readData();
  const boeken = data.boeken;

  return (
    <main className="container container-breed">
      <Nav actief="analytics" />
      <h1>Analyse van de boeken</h1>

      <AnalyseSectie titel="Alle boeken" boeken={boeken} />

      {data.leden.map((lid: string) => (
        <section key={lid} className="lid-sectie">
          <h2>
            <LidIcoon lid={lid} size={40} />
            {lid}
          </h2>
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
