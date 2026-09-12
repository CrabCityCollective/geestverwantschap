export const INLOG_GEBRUIKERSNAAM = 'login@geestverwantschap.nl';
export const INLOG_WACHTWOORD = 'Beklijven@123!';
export const INLOG_COOKIE_NAAM = 'geestverwantschap_ingelogd';

export function controleerInloggegevens(gebruikersnaam: string, wachtwoord: string): boolean {
  return gebruikersnaam === INLOG_GEBRUIKERSNAAM && wachtwoord === INLOG_WACHTWOORD;
}
