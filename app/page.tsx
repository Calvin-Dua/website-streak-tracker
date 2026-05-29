import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import ScrollButton from '@/components/ScrollButton'
import Link from 'next/link'

export default async function Home() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user) redirect('/dashboard')

  return (
    <main
      className="landing-page"
      style={{
        position: 'relative',
        overflowX: 'hidden',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >

      {/* Responsive styles */}
      <style>{`
        .landing-page {
          min-height: 100vh;
          background-color: #d4936a;
          background-image:
            radial-gradient(ellipse at 0% 50%, #c1734488 0%, transparent 55%),
            radial-gradient(ellipse at 100% 0%, #c8845aaa 0%, transparent 50%),
            radial-gradient(ellipse at 40% 30%, #e8d5c4dd 0%, transparent 45%),
            radial-gradient(ellipse at 70% 80%, #dfc4aacc 0%, transparent 40%),
            radial-gradient(ellipse at 20% 80%, #b5d0d8bb 0%, transparent 35%);
        }
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          max-width: 660px;
          margin: 0 auto;
        }
        .steps-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          max-width: 560px;
          margin: 0 auto;
        }
        .testimonial-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 14px;
          max-width: 620px;
          margin: 0 auto 48px;
        }
        .hero-buttons {
          display: flex;
          justify-content: center;
          gap: 12px;
          margin-bottom: 56px;
          flex-wrap: wrap;
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .hero-title {
          font-size: 42px;
          font-weight: 500;
          color: #3d1f0a;
          line-height: 1.2;
          max-width: 520px;
          margin: 0 auto 18px;
        }
        @media (max-width: 640px) {
          .feature-grid {
            grid-template-columns: 1fr;
            max-width: 100%;
          }
          .steps-grid {
            grid-template-columns: 1fr;
            max-width: 100%;
          }
          .testimonial-grid {
            grid-template-columns: 1fr;
            max-width: 100%;
          }
          .hero-buttons {
            flex-direction: column;
            align-items: center;
            padding: 0 16px;
          }
          .hero-buttons a, .hero-buttons button {
            width: 100%;
            text-align: center;
            justify-content: center;
          }
          .nav-links {
            display: none;
          }
          .hero-title {
            font-size: 28px;
            padding: 0 16px;
          }
        }
      `}</style>

      {/* Decorative shapes only — gradients live on .landing-page and end with the page */}
      <div aria-hidden style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', top: '5%', left: '30%', width: 130, height: 130, background: '#c1734455', borderRadius: '50% 40% 60% 45%', transform: 'rotate(-20deg)' }} />
        <div style={{ position: 'absolute', bottom: '-5%', right: '-3%', width: 280, height: 280, background: '#c8845a44', borderRadius: '50% 60% 40% 55%' }} />
        <div style={{ position: 'absolute', top: '-5%', left: '-5%', width: 200, height: 200, background: '#c1734433', borderRadius: '40% 60% 55% 45%' }} />
      </div>

      <div style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        minHeight: '100vh'
      }}>

        {/* Navbar */}
        <nav style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px',
          background: '#ffffff22',
          borderBottom: '1px solid #ffffff44',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 32, height: 32,
              background: 'linear-gradient(135deg,#e8845a,#c17344)',
              borderRadius: 9, display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: 16,
              boxShadow: '0 4px 12px #c1734433',
            }}>🔥</div>
            <span style={{ fontSize: 16, fontWeight: 500, color: '#3d1f0a' }}>Streakly</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div className="nav-links">
              <span style={{ fontSize: 13, color: '#7a4a2e', cursor: 'pointer' }}>Features</span>
              <span style={{ fontSize: 13, color: '#7a4a2e', cursor: 'pointer', marginLeft: 14 }}>Pricing</span>
            </div>
            <Link href="/login" style={{
              fontSize: 13, padding: '7px 16px',
              background: '#ffffff44', border: '1px solid #ffffff66',
              borderRadius: 8, color: '#3d1f0a',
              textDecoration: 'none', backdropFilter: 'blur(8px)',
            }}>
              Sign in
            </Link>
            <Link href="/login" style={{
              fontSize: 13, fontWeight: 500, padding: '7px 16px',
              background: 'linear-gradient(135deg,#e8845a,#c17344)',
              borderRadius: 8, color: '#fff',
              textDecoration: 'none',
              boxShadow: '0 4px 14px #c1734433',
            }}>
              Get started
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <section style={{ textAlign: 'center', padding: '56px 20px 40px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: '#ffffff44', border: '1px solid #ffffff66',
            borderRadius: 99, padding: '4px 16px',
            fontSize: 12, color: '#7a4a2e', marginBottom: 20,
            backdropFilter: 'blur(8px)',
          }}>
            ✦ Build habits that compound
          </div>

          <h1 className="hero-title">
            Track your daily visits.{' '}
            <span style={{
              background: 'linear-gradient(135deg,#e8845a,#c17344)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>
              Never break the chain.
            </span>
          </h1>

          <p style={{
            fontSize: 15, color: '#7a4a2e',
            maxWidth: 400, margin: '0 auto 32px',
            lineHeight: 1.8, padding: '0 16px',
          }}>
            Set 30, 90, or 100-day goals. Log daily visits. Watch your consistency become identity.
          </p>

          <div className="hero-buttons">
            <Link href="/login" style={{
              display: 'flex', alignItems: 'center', gap: 10,
              fontSize: 14, fontWeight: 500, padding: '12px 28px',
              background: 'linear-gradient(135deg,#e8845a,#c17344)',
              borderRadius: 10, color: '#fff', textDecoration: 'none',
              boxShadow: '0 4px 20px #c1734433',
            }}>
              🐙 Start with GitHub — it&apos;s free
            </Link>

            
            <ScrollButton />
          </div>

          {/* Mini heatmap */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 4,
            justifyContent: 'center', maxWidth: 460,
            margin: '0 auto', padding: '0 16px',
          }}>
            {Array.from({ length: 70 }).map((_, i) => {
              const r = Math.random()
              const bg = r < 0.25 ? '#ffffff33'
                : r < 0.5 ? '#e8845a66'
                : r < 0.75 ? '#c1734488'
                : '#c17344'
              return (
                <div key={i} style={{
                  width: 12, height: 12,
                  borderRadius: 3, background: bg,
                }} />
              )
            })}
          </div>
          <p style={{ fontSize: 11, color: '#7a4a2e88', marginTop: 10 }}>
            Your consistency, visualized
          </p>
        </section>

        {/* Features */}
        <section style={{ padding: '48px 20px', borderTop: '1px solid #ffffff33' }}>
          <p style={{
            fontSize: 11, fontWeight: 500, color: '#7a4a2e88',
            textTransform: 'uppercase', letterSpacing: '0.08em',
            textAlign: 'center', marginBottom: 28,
          }}>
            Why Streakly works
          </p>
          <div className="feature-grid">
            {[
              { icon: '🔥', title: 'Streak pressure', desc: 'Nothing motivates like not wanting to break a streak you built over weeks.' },
              { icon: '📊', title: 'Visual progress', desc: 'Heatmaps, progress bars, and badges make growth satisfying to see.' },
              { icon: '🎯', title: 'Goal clarity', desc: 'Pick a 30, 90, or 100-day target. Commit daily. Reach it or restart stronger.' },
            ].map(f => (
              <div key={f.title} style={{
                background: '#ffffff44',
                border: '1px solid #ffffff66',
                borderRadius: 14, padding: '22px',
                textAlign: 'center',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{f.icon}</div>
                <p style={{ fontSize: 16, fontWeight: 500, color: '#3d1f0a', marginBottom: 6 }}>{f.title}</p>
                <p style={{ fontSize: 14, color: '#7a4a2e', lineHeight: 1.7 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section id="how-it-works" style={{ padding: '48px 20px', borderTop: '1px solid #ffffff33' }}>
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
              { step: '02', title: 'Log daily', desc: 'One tap to mark today\'s visit done. Takes 3 seconds.' },
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

        {/* Testimonials */}
        <section style={{ padding: '48px 20px', borderTop: '1px solid #ffffff33' }}>
          <p style={{
            fontSize: 11, fontWeight: 500, color: '#7a4a2e88',
            textTransform: 'uppercase', letterSpacing: '0.08em',
            textAlign: 'center', marginBottom: 28,
          }}>
            Trusted by builders
          </p>
          <div className="testimonial-grid">
            {[
              { initials: 'AK', bg: '#c17344', handle: '@akofi_dev', quote: 'Hit 60 days on LeetCode. This app genuinely changed my habits.' },
              { initials: 'SM', bg: '#e8845a', handle: '@sara_builds', quote: 'Simple, beautiful, and actually motivating. No fluff.' },
              { initials: 'TN', bg: '#b5d0d8', handle: '@t_nkosi', quote: 'I finally visit GitHub every single day. 90 day streak and counting.' },
            ].map(t => (
              <div key={t.handle} style={{
                background: '#ffffff44',
                border: '1px solid #ffffff66',
                borderRadius: 14, padding: '18px 20px',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: t.bg, display: 'flex',
                    alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 600, color: '#fff', flexShrink: 0,
                  }}>
                    {t.initials}
                  </div>
                  <span style={{ fontSize: 12, color: '#7a4a2e' }}>{t.handle}</span>
                </div>
                <p style={{ fontSize: 14, color: '#3d1f0a', lineHeight: 1.7 }}>&ldquo;{t.quote}&rdquo;</p>
              </div>
            ))}
          </div>

          {/* Final CTA */}
          <div style={{
            textAlign: 'center',
            background: '#ffffff44',
            border: '1px solid #ffffff66',
            borderRadius: 18, padding: '40px 24px',
            maxWidth: 480, margin: '0 auto',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              background: 'radial-gradient(ellipse at 50% 0%,#e8845a22,transparent 70%)',
              pointerEvents: 'none',
            }} />
            <h2 style={{ fontSize: 26, fontWeight: 500, color: '#3d1f0a', marginBottom: 10 }}>
              Ready to build your streak?
            </h2>
            <p style={{ fontSize: 15, color: '#7a4a2e', marginBottom: 24, lineHeight: 1.7 }}>
              Join builders who track daily and stay consistent.
            </p>
            <Link href="/login" style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              fontSize: 14, fontWeight: 500, padding: '12px 30px',
              background: 'linear-gradient(135deg,#e8845a,#c17344)',
              borderRadius: 10, color: '#fff', textDecoration: 'none',
              boxShadow: '0 4px 20px #c1734433',
            }}>
              🐙 Start with GitHub — it&apos;s free
            </Link>
            <p style={{ fontSize: 13, color: '#7a4a2e88', marginTop: 14 }}>
              No credit card required
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          marginTop: 'auto',
          padding: '18px 20px',
          borderTop: '1px solid #ffffff33',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: '#ffffff22',
          backdropFilter: 'blur(12px)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 24, height: 24, borderRadius: 7,
              background: 'linear-gradient(135deg,#e8845a,#c17344)',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 12,
            }}>🔥</div>
            <span style={{ fontSize: 13, color: '#7a4a2e' }}>Streakly</span>
          </div>
          <p style={{ fontSize: 11, color: '#7a4a2e88' }}>Built with Next.js + Supabase</p>
        </footer>

      </div>
    </main>
  )
}