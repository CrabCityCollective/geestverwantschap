import * as boekenclub from '../../lib/boekenclub';
import * as analyse from '../../lib/analyse';
import type { Boek, BoekenclubData, Telling } from '../../lib/types';
import { weergaveNaam } from '../../lib/aliassen';
import Balkdiagram from '../components/Balkdiagram';
import Verdelingsbalk from '../components/Verdelingsbalk';
import Nav from '../components/Nav';
import Sterren from '../components/Sterren';
import LidIcoon from '../components/LidIcoon';

const { readData } = boekenclub as unknown as { readData: (filePath?: string) => BoekenclubData };
const {
  telLandenVanAuteurs,
  telGeslachtVanAuteurs,
  telTijdvakken,
  gemiddeldeSterrenGegeven,
  sterrenVerdelingVoorLid,
  topBoekenVoorLid,
} = analyse as unknown as {
  telLandenVanAuteurs: (boeken: Boek[]) => Telling[];
  telGeslachtVanAuteurs: (boeken: Boek[]) => Telling[];
  telTijdvakken: (boeken: Boek[]) => Telling[];
  gemiddeldeSterrenGegeven: (boeken: Boek[], lid: string) => number | null;
  sterrenVerdelingVoorLid: (boeken: Boek[], lid: string) => Telling[];
  topBoekenVoorLid: (boeken: Boek[], lid: string, aantal?: number) => Boek[];
};

export const dynamic = 'force-dynamic';

function AnalyseSectie({ titel, boeken }: { titel?: string; boeken: Boek[] }) {
  return (
    <section className="analyse-sectie">
      {titel ? <h2>{titel}</h2> : null}
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
  const topBoeken = topBoekenVoorLid(boeken, lid);

  return (
    <div className="lid-statistieken">
      {topBoeken.length > 0 ? (
        <ol className="top-boeken-lijst">
          {topBoeken.map((boek) => (
            <li key={boek.titel}>
              {boek.titel} (<Sterren score={boek.beoordelingen[lid].sterren as number} />)
            </li>
          ))}
        </ol>
      ) : null}
      <p>
        {gemiddelde !== null ? (
          <>
            Gemiddeld aantal sterren gegeven: <Sterren score={gemiddelde} />
          </>
        ) : (
          <>Nog geen sterren gegeven</>
        )}
      </p>
      {gemiddelde !== null ? (
        <div className="grafieken-grid">
          <Balkdiagram titel="Verdeling van gegeven sterren" data={sterrenVerdelingVoorLid(boeken, lid)} />
        </div>
      ) : null}
    </div>
  );
}

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
              <LidIcoon lid={lid} size={40} />
              {weergaveNaam(lid)}
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
