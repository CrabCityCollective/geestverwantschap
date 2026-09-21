import * as boekenclub from '../../lib/boekenclub';
import * as quiz from '../../lib/quiz';
import type { Boek, BoekenclubData, QuizVraag } from '../../lib/types';
import Nav from '../components/Nav';
import Quiz from '../components/Quiz';

const { readData } = boekenclub as unknown as { readData: (filePath?: string) => BoekenclubData };
const { genereerQuizVragen } = quiz as unknown as {
  genereerQuizVragen: (boeken: Boek[], leden: string[], aantal?: number) => QuizVraag[];
};

const AANTAL_VRAGEN_IN_POOL = 20;
const MINIMAAL_AANTAL_VRAGEN = 5;

export const dynamic = 'force-dynamic';

export default function QuizPagina() {
  const data = readData();
  const vragenpool = genereerQuizVragen(data.boeken, data.leden, AANTAL_VRAGEN_IN_POOL);

  return (
    <>
      <Nav actief="quiz" breed />
      <main className="container">
        <h1>Quote quiz</h1>
        {vragenpool.length < MINIMAAL_AANTAL_VRAGEN ? (
          <p>Er zijn nog niet genoeg quotes om een quiz mee te maken.</p>
        ) : (
          <Quiz vragenpool={vragenpool} />
        )}
      </main>
    </>
  );
}
