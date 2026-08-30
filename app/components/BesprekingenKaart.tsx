'use client';

import { useMemo } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Boek } from '../../lib/types';

type LocatieGroep = { locatie: string; boeken: Boek[] };

type BekendeStad = { naam: string; lat: number; lng: number };

// Coördinaten zijn de gangbare stadscentrum-coördinaten (WGS84). Dat plaatst een bespreking
// op stadsniveau op de kaart - niet op het exacte adres van de vermelde horecagelegenheid of
// het vermelde landgoed, want die geocoderen we hier niet.
const BEKENDE_STEDEN: BekendeStad[] = [
  { naam: 'Utrecht', lat: 52.0907, lng: 5.1214 },
  { naam: 'Zwolle', lat: 52.5168, lng: 6.083 },
  { naam: 'Woerden', lat: 52.0851, lng: 4.8834 },
  { naam: 'Noordwijk', lat: 52.2397, lng: 4.442 },
  { naam: 'Amsterdam', lat: 52.3676, lng: 4.9041 },
  { naam: 'Rotterdam', lat: 51.9244, lng: 4.4777 },
  { naam: 'Den Haag', lat: 52.0705, lng: 4.3007 },
  { naam: 'Groningen', lat: 53.2194, lng: 6.5665 },
  { naam: 'Maastricht', lat: 50.8514, lng: 5.691 },
  { naam: 'Arnhem', lat: 51.9851, lng: 5.8987 },
  { naam: 'Nijmegen', lat: 51.8126, lng: 5.8372 },
  { naam: 'Eindhoven', lat: 51.4416, lng: 5.4697 },
  { naam: 'Tilburg', lat: 51.5555, lng: 5.0913 },
  { naam: 'Leeuwarden', lat: 53.2012, lng: 5.7999 },
  { naam: 'Breda', lat: 51.5719, lng: 4.7683 },
  { naam: 'Deventer', lat: 52.2551, lng: 6.1639 },
  { naam: 'Amersfoort', lat: 52.1561, lng: 5.3878 },
  { naam: 'Haarlem', lat: 52.3874, lng: 4.6462 },
  { naam: 'Leiden', lat: 52.1601, lng: 4.497 },
  { naam: 'Middelburg', lat: 51.4988, lng: 3.6136 },
  { naam: 'Enschede', lat: 52.2215, lng: 6.8937 },
];

function vindStad(locatie: string): BekendeStad | null {
  const lower = locatie.toLowerCase();
  const treffers = BEKENDE_STEDEN.filter((stad) => lower.includes(stad.naam.toLowerCase()));
  if (treffers.length === 0) {
    return null;
  }
  // Bij meerdere treffers (zeldzaam) de langste stadsnaam gebruiken, bv. "Den Haag" boven "Haag".
  return treffers.sort((a, b) => b.naam.length - a.naam.length)[0];
}

function aantalBoeken(groepen: LocatieGroep[]): number {
  return groepen.reduce((som, groep) => som + groep.boeken.length, 0);
}

function maakPinIcon(aantal: number): L.DivIcon {
  return L.divIcon({
    className: 'besprekingen-kaart-pin',
    html: `<span class="besprekingen-kaart-stip"></span><span class="besprekingen-kaart-badge">${aantal}</span>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
}

export default function BesprekingenKaart({ locatieGroepen }: { locatieGroepen: LocatieGroep[] }) {
  const { perStad, overig } = useMemo(() => {
    const perStad = new Map<string, { stad: BekendeStad; groepen: LocatieGroep[] }>();
    const overig: LocatieGroep[] = [];
    for (const groep of locatieGroepen) {
      const stad = vindStad(groep.locatie);
      if (!stad) {
        overig.push(groep);
        continue;
      }
      const bestaand = perStad.get(stad.naam);
      if (bestaand) {
        bestaand.groepen.push(groep);
      } else {
        perStad.set(stad.naam, { stad, groepen: [groep] });
      }
    }
    return { perStad, overig };
  }, [locatieGroepen]);

  return (
    <div className="besprekingen-kaart-wrap">
      <MapContainer center={[52.15, 5.3]} zoom={8} scrollWheelZoom className="besprekingen-kaart">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-auteurs'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {Array.from(perStad.values()).map(({ stad, groepen }) => (
          <Marker key={stad.naam} position={[stad.lat, stad.lng]} icon={maakPinIcon(aantalBoeken(groepen))}>
            <Popup>
              <p className="besprekingen-kaart-popup-titel">{stad.naam}</p>
              {groepen.map((groep) => (
                <div key={groep.locatie} className="besprekingen-kaart-popup-venue">
                  <p className="besprekingen-kaart-popup-venue-naam">
                    {groep.locatie}
                    {groep.boeken.length > 1 ? ` (${groep.boeken.length})` : ''}
                  </p>
                  <ul>
                    {groep.boeken.map((boek) => (
                      <li key={boek.titel}>{boek.titel}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {overig.length > 0 ? (
        <div className="on-tour-overig">
          <h2>Ook besproken, maar niet op de kaart te plaatsen</h2>
          <ul className="on-tour-overig-lijst">
            {overig.map((groep) => (
              <li key={groep.locatie}>
                <strong>
                  {groep.locatie}
                  {groep.boeken.length > 1 ? ` (${groep.boeken.length})` : ''}
                </strong>
                <ul>
                  {groep.boeken.map((boek) => (
                    <li key={boek.titel}>{boek.titel}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
