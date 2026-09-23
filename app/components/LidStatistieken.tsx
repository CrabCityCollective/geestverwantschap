import * as analyse from '../../lib/analyse';
import type { Boek, Telling } from '../../lib/types';
import Balkdiagram from './Balkdiagram';
import Sterren from './Sterren';

const { gemiddeldeSterrenGegeven, sterrenVerdelingVoorLid, topBoekenVoorLid } = analyse as unknown as {
  gemiddeldeSterrenGegeven: (boeken: Boek[], lid: string) => number | null;
  sterrenVerdelingVoorLid: (boeken: Boek[], lid: string) => Telling[];
  topBoekenVoorLid: (boeken: Boek[], lid: string, aantal?: number) => Boek[];
};

export default function LidStatistieken({ lid, boeken }: { lid: string; boeken: Boek[] }) {
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
