import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { controleerInloggegevens, INLOG_COOKIE_NAAM } from '../../../lib/auth';

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const gebruikersnaam = body?.gebruikersnaam;
  const wachtwoord = body?.wachtwoord;

  if (
    typeof gebruikersnaam !== 'string' ||
    typeof wachtwoord !== 'string' ||
    !controleerInloggegevens(gebruikersnaam, wachtwoord)
  ) {
    return NextResponse.json({ succes: false }, { status: 401 });
  }

  cookies().set(INLOG_COOKIE_NAAM, '1', {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });

  return NextResponse.json({ succes: true });
}
