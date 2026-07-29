import { ImageResponse } from 'next/og';
import { BoekIcoon } from '../icoon';

export function GET() {
  return new ImageResponse(<BoekIcoon size={192} />, { width: 192, height: 192 });
}
