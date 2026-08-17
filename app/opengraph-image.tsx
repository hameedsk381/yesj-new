import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'YESJ - Youth Empowering Service Jesuits'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          padding: '80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              backgroundColor: '#dc2626',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '28px',
              fontWeight: '900',
            }}
          >
            Y
          </div>
          <span
            style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#f8fafc',
              letterSpacing: '-0.02em',
            }}
          >
            YESJ
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '900px' }}>
          <span
            style={{
              fontSize: '18px',
              fontWeight: '600',
              color: '#f87171',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
            }}
          >
            Youth Empowering Service - Jesuits
          </span>
          <h1
            style={{
              fontSize: '56px',
              fontWeight: '800',
              color: '#ffffff',
              lineHeight: 1.15,
              margin: 0,
              letterSpacing: '-0.03em',
            }}
          >
            Empowering Marginalized Youth Across Andhra Pradesh &amp; Telangana
          </h1>
          <p
            style={{
              fontSize: '22px',
              color: '#94a3b8',
              lineHeight: 1.4,
              margin: 0,
            }}
          >
            Skill development, English immersion, and leadership programs transforming 70,000+ lives since 2016.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            borderTop: '1px solid #334155',
            paddingTop: '24px',
          }}
        >
          <span style={{ fontSize: '18px', color: '#64748b', fontWeight: '500' }}>
            Official Web Portal • yesj.org
          </span>
          <span
            style={{
              fontSize: '16px',
              backgroundColor: '#1e293b',
              color: '#e2e8f0',
              padding: '8px 18px',
              borderRadius: '9999px',
              border: '1px solid #475569',
            }}
          >
            Andhra Jesuit Province
          </span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
