import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const alt = 'State of AI for broke students';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

const geistFont = readFile(
  join(process.cwd(), 'node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf')
);

export default async function Image() {
  const geist = await geistFont;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#0a0a0a',
          color: '#e5e5e5',
          padding: '56px 64px',
          fontFamily: 'Geist',
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: '1px solid #333333',
            paddingBottom: '18px',
            fontSize: 20,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#666666',
          }}
        >
          <span>Rankings</span>
          <span style={{ letterSpacing: '0.04em', textTransform: 'none' }}>
            Editorial snapshot
          </span>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            marginTop: 24,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              fontSize: 120,
              fontWeight: 700,
              lineHeight: 0.92,
              letterSpacing: '-0.04em',
              color: '#ffffff',
            }}
          >
            <span>State</span>
            <span>of AI</span>
          </div>
          <div
            style={{
              display: 'flex',
              fontSize: 38,
              lineHeight: 1.2,
              letterSpacing: '-0.02em',
              color: '#999999',
            }}
          >
            for broke students
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: 24,
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              maxWidth: 760,
            }}
          >
            <span style={{ fontSize: 20, color: '#aaaaaa', fontStyle: 'italic' }}>
              by Pranjal Mandavkar
            </span>
            <span
              style={{
                fontSize: 18,
                lineHeight: 1.6,
                color: '#777777',
              }}
            >
              Editorial ranking snapshot of the best AI models, coding harnesses, and subscriptions.
            </span>
          </div>
          <div
            style={{
              display: 'flex',
              width: 14,
              height: 14,
              borderRadius: 9999,
              background: '#34d399',
              boxShadow: '0 0 18px rgba(52, 211, 153, 0.38)',
              flexShrink: 0,
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Geist',
          data: geist,
          style: 'normal',
          weight: 400,
        },
      ],
    }
  );
}
