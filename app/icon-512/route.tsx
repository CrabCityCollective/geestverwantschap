import { ImageResponse } from 'next/og';
import { BoekIcoon } from '../icoon';

export function GET() {
  return new ImageResponse(<BoekIcoon size={512} />, { width: 512, height: 512 });
}
