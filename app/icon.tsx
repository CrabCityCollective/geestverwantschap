import { ImageResponse } from 'next/og';
import { BoekIcoon } from './icoon';

export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(<BoekIcoon size={32} />, { ...size });
}
