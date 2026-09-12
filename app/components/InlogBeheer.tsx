'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';

export default function InlogBeheer({ ingelogd: ingelogdBijLaden }: { ingelogd: boolean }) {
  const [ingelogd, setIngelogd] = useState(ingelogdBijLaden);
  const [gebruikersnaam, setGebruikersnaam] = useState('');
  const [wachtwoord, setWachtwoord] = useState('');
  const [foutmelding, setFoutmelding] = useState('');
  const [bezig, setBezig] = useState(false);

  if (ingelogd) {
    return (
      <div className="inlog-slotje" role="status" aria-label="Ingelogd">
        🔒
      </div>
    );
  }

  async function inloggen(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBezig(true);
    setFoutmelding('');

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ gebruikersnaam, wachtwoord }),
      });

      if (response.ok) {
        setIngelogd(true);
      } else {
        setFoutmelding('Onjuiste gebruikersnaam of wachtwoord.');
      }
    } catch {
      setFoutmelding('Inloggen is mislukt. Probeer het opnieuw.');
    } finally {
      setBezig(false);
    }
  }

  return (
    <div className="inlog-overlay">
      <form className="inlog-popup" onSubmit={inloggen}>
        <h2>Inloggen</h2>
        <label className="inlog-label" htmlFor="inlog-gebruikersnaam">
          Gebruikersnaam
        </label>
        <input
          id="inlog-gebruikersnaam"
          className="inlog-veld"
          type="email"
          autoComplete="username"
          value={gebruikersnaam}
          onChange={(event) => setGebruikersnaam(event.target.value)}
          required
        />
        <label className="inlog-label" htmlFor="inlog-wachtwoord">
          Wachtwoord
        </label>
        <input
          id="inlog-wachtwoord"
          className="inlog-veld"
          type="password"
          autoComplete="current-password"
          value={wachtwoord}
          onChange={(event) => setWachtwoord(event.target.value)}
          required
        />
        {foutmelding && <p className="inlog-foutmelding">{foutmelding}</p>}
        <button className="inlog-knop" type="submit" disabled={bezig}>
          {bezig ? 'Bezig…' : 'Inloggen'}
        </button>
      </form>
    </div>
  );
}
