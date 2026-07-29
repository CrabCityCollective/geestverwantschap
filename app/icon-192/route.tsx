import { ImageResponse } from 'next/og';

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#2a78d6',
          color: '#fff',
          fontSize: 116,
          fontWeight: 700,
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        G
      </div>
    ),
    { width: 192, height: 192 }
  );
}
