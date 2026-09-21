'use client';

import { useState } from 'react';
import type { QuizVraag } from '../../lib/types';
import { weergaveNaam } from '../../lib/aliassen';

const VRAGEN_PER_RONDE = 5;

function schud<T>(lijst: T[]): T[] {
  const resultaat = [...lijst];
  for (let i = resultaat.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [resultaat[i], resultaat[j]] = [resultaat[j], resultaat[i]];
  }
  return resultaat;
}

function kiesRonde(vragenpool: QuizVraag[]): QuizVraag[] {
  return schud(vragenpool).slice(0, VRAGEN_PER_RONDE);
}

function optieLabel(vraag: QuizVraag, optie: string): string {
  if (vraag.type === 'lid') {
    return weergaveNaam(optie);
  }
  if (vraag.type === 'sterren') {
    return optie === '1' ? '1 ster' : `${optie} sterren`;
  }
  return optie;
}

function scoreTekst(score: number, totaal: number): string {
  if (score === totaal) {
    return 'Perfecte score! Jullie kennen elkaars quotes door en door.';
  }
  if (score >= totaal / 2) {
    return 'Goed gedaan!';
  }
  return 'Volgende keer beter.';
}

export default function Quiz({ vragenpool }: { vragenpool: QuizVraag[] }) {
  const [ronde, setRonde] = useState<QuizVraag[]>(() => kiesRonde(vragenpool));
  const [huidigeIndex, setHuidigeIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [gekozenAntwoord, setGekozenAntwoord] = useState<string | null>(null);
  const [afgerond, setAfgerond] = useState(false);

  function beantwoord(optie: string) {
    if (gekozenAntwoord !== null) {
      return;
    }
    setGekozenAntwoord(optie);
    if (optie === ronde[huidigeIndex].antwoord) {
      setScore((huidigeScore) => huidigeScore + 1);
    }
  }

  function volgende() {
    if (huidigeIndex + 1 >= ronde.length) {
      setAfgerond(true);
      return;
    }
    setHuidigeIndex((index) => index + 1);
    setGekozenAntwoord(null);
  }

  function opnieuw() {
    setRonde(kiesRonde(vragenpool));
    setHuidigeIndex(0);
    setScore(0);
    setGekozenAntwoord(null);
    setAfgerond(false);
  }

  if (afgerond) {
    return (
      <div className="quiz quiz-score">
        <p className="quiz-score-getal">
          {score} / {ronde.length}
        </p>
        <p>{scoreTekst(score, ronde.length)}</p>
        <button type="button" className="quiz-knop" onClick={opnieuw}>
          Opnieuw spelen
        </button>
      </div>
    );
  }

  const huidigeVraag = ronde[huidigeIndex];

  return (
    <div className="quiz">
      <p className="quiz-voortgang">
        Vraag {huidigeIndex + 1} van {ronde.length}
      </p>
      <blockquote className="quiz-quote">&bdquo;{huidigeVraag.quote}&rdquo;</blockquote>
      <p className="quiz-vraag">{huidigeVraag.vraag}</p>
      <div className="quiz-opties">
        {huidigeVraag.opties.map((optie) => {
          const isGekozen = gekozenAntwoord === optie;
          const isJuisteAntwoord = optie === huidigeVraag.antwoord;
          let klasse = 'quiz-optie';
          if (gekozenAntwoord !== null && isJuisteAntwoord) {
            klasse += ' quiz-optie-correct';
          } else if (isGekozen) {
            klasse += ' quiz-optie-fout';
          }
          return (
            <button
              key={optie}
              type="button"
              className={klasse}
              onClick={() => beantwoord(optie)}
              disabled={gekozenAntwoord !== null}
            >
              {optieLabel(huidigeVraag, optie)}
            </button>
          );
        })}
      </div>
      {gekozenAntwoord !== null ? (
        <button type="button" className="quiz-knop quiz-volgende" onClick={volgende}>
          {huidigeIndex + 1 >= ronde.length ? 'Bekijk score' : 'Volgende vraag'}
        </button>
      ) : null}
    </div>
  );
}
