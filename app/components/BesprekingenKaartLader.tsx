'use client';

import dynamic from 'next/dynamic';
import type { Boek } from '../../lib/types';

type LocatieGroep = { locatie: string; boeken: Boek[] };

// Leaflet raakt `window` aan bij het importeren, dus laden we de kaart alleen in de browser -
// niet tijdens server-side rendering.
const BesprekingenKaart = dynamic(() => import('./BesprekingenKaart'), {
  ssr: false,
  loading: () => <p className="besprekingen-kaart-laden">Kaart wordt geladen…</p>,
});

export default function BesprekingenKaartLader({ locatieGroepen }: { locatieGroepen: LocatieGroep[] }) {
  return <BesprekingenKaart locatieGroepen={locatieGroepen} />;
}
