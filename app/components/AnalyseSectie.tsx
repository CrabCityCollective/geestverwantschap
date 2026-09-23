import * as analyse from '../../lib/analyse';
import type { Boek, Telling } from '../../lib/types';
import Balkdiagram from './Balkdiagram';
import Verdelingsbalk from './Verdelingsbalk';

const { telLandenVanAuteurs, telGeslachtVanAuteurs, telTijdvakken } = analyse as unknown as {
  telLandenVanAuteurs: (boeken: Boek[]) => Telling[];
  telGeslachtVanAuteurs: (boeken: Boek[]) => Telling[];
  telTijdvakken: (boeken: Boek[]) => Telling[];
};

export default function AnalyseSectie({ titel, boeken }: { titel?: string; boeken: Boek[] }) {
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
