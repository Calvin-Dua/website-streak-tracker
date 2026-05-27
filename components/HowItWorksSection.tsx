'use client'

import { useEffect } from 'react'

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      style={{ padding: '48px 20px', borderTop: '1px solid #ffffff33' }}
    >
      <p style={{
        fontSize: 11, fontWeight: 500, color: '#7a4a2e88',
        textTransform: 'uppercase', letterSpacing: '0.08em',
        textAlign: 'center', marginBottom: 28,
      }}>
        How it works
      </p>
      <div className="steps-grid">
        {[
          { step: '01', title: 'Add a website', desc: 'Paste any URL and choose your goal length — 30, 90, or 100 days.' },
          { step: '02', title: 'Log daily', desc: "One tap to mark today's visit done. Takes 3 seconds." },
          { step: '03', title: 'Watch it grow', desc: 'Your streak counter and heatmap fill up. Consistency becomes visible.' },
        ].map(s => (
          <div key={s.step} style={{ textAlign: 'center', padding: '16px 12px' }}>
            <div style={{
              width: 38, height: 38, borderRadius: '50%',
              background: '#ffffff44', border: '1px solid #ffffff66',
              color: '#c17344', fontSize: 13, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 14px',
              backdropFilter: 'blur(8px)',
            }}>
              {s.step}
            </div>
            <p style={{ fontSize: 15, fontWeight: 500, color: '#3d1f0a', marginBottom: 6 }}>{s.title}</p>
            <p style={{ fontSize: 14, color: '#7a4a2e', lineHeight: 1.7 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}