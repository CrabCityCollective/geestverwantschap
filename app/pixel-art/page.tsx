import * as boekenclub from '../../lib/boekenclub';
import type { BoekenclubData } from '../../lib/types';
import Nav from '../components/Nav';
import LidIcoon from '../components/LidIcoon';
import LidIcoonPixel from '../components/LidIcoonPixel';

const { readData } = boekenclub as unknown as { readData: (filePath?: string) => BoekenclubData };

export const dynamic = 'force-dynamic';

export default function PixelArtPagina() {
  const { leden } = readData();

  return (
    <>
      <Nav actief="pixel-art" />
      <main className="container">
        <h1>Pixel art</h1>
        <p>
          Een eerste proefopstelling van pixel art iconen naast de bestaande getekende iconen per lid. De
          getekende iconen (<code>LidIcoon.tsx</code>) blijven gewoon in gebruik; deze pagina is puur om de
          pixel art stijl (<code>LidIcoonPixel.tsx</code>) te bekijken.
        </p>
        <ul className="pixel-art-lijst">
          {leden.map((lid) => (
            <li key={lid} className="pixel-art-item">
              <span className="pixel-art-naam">{lid}</span>
              <span className="pixel-art-iconen">
                <LidIcoon lid={lid} size={64} />
                <LidIcoonPixel lid={lid} size={64} />
              </span>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
