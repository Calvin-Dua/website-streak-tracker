'use client'

import { signInWithGitHub } from '@/app/login/actions'

export default function LoginCard() {
  return (
    <main style={{
      minHeight: '100vh',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
    }}>

      {/* Background image */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: 'url(/calvin.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 0,
      }} />

      {/* Very light overlay — just enough for card readability */}
      <div style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(255, 235, 220, 0.15)',
        zIndex: 1,
      }} />

      {/* Glass card */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: 400,
        padding: '44px 40px',
        borderRadius: 24,
        background: 'linear-gradient(135deg, #ffffff55 0%, #ffffff33 100%)',
        backdropFilter: 'blur(28px)',
        WebkitBackdropFilter: 'blur(28px)',
        border: '1px solid #ffffff66',
        boxShadow: '0 8px 48px #c1734422, 0 2px 0 #ffffff55 inset',
        textAlign: 'center',
      }}>

        {/* Top shimmer line */}
        <div style={{
          position: 'absolute',
          top: 0, left: '15%', right: '15%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #ffffff99, transparent)',
          borderRadius: 99,
        }} />

        {/* Logo */}
        <div style={{
          width: 56, height: 56,
          background: 'linear-gradient(135deg, #e8845a, #c1734488)',
          borderRadius: 16,
          display: 'flex', alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 20px',
          fontSize: 26,
          boxShadow: '0 8px 24px #c1734433',
          border: '1px solid #ffffff55',
        }}>
          🔥
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 24, fontWeight: 700,
          color: '#3d1f0a', marginBottom: 6,
          letterSpacing: '-0.3px',
        }}>
          Welcome back 👋
        </h1>
        <p style={{
          fontSize: 13, color: '#7a4a2e',
          marginBottom: 32, lineHeight: 1.6,
        }}>
          Sign in to continue building your streaks
        </p>

        {/* Email input */}
        <div style={{ marginBottom: 14, textAlign: 'left' }}>
          <label style={{
            fontSize: 12, color: '#7a4a2e',
            display: 'block', marginBottom: 6,
          }}>
            Email address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            style={{
              width: '100%', padding: '11px 16px',
              background: '#ffffff44',
              border: '1px solid #ffffff66',
              borderRadius: 10, fontSize: 13,
              color: '#3d1f0a', outline: 'none',
              backdropFilter: 'blur(8px)',
            }}
            onFocus={e => (e.target.style.borderColor = '#c1734488')}
            onBlur={e => (e.target.style.borderColor = '#ffffff66')}
          />
        </div>

        {/* Password input */}
        <div style={{ marginBottom: 24, textAlign: 'left' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', marginBottom: 6,
          }}>
            <label style={{ fontSize: 12, color: '#7a4a2e' }}>Password</label>
            <span style={{ fontSize: 12, color: '#c17344', cursor: 'pointer' }}>
              Forgot password?
            </span>
          </div>
          <input
            type="password"
            placeholder="••••••••"
            style={{
              width: '100%', padding: '11px 16px',
              background: '#ffffff44',
              border: '1px solid #ffffff66',
              borderRadius: 10, fontSize: 13,
              color: '#3d1f0a', outline: 'none',
              backdropFilter: 'blur(8px)',
            }}
            onFocus={e => (e.target.style.borderColor = '#c1734488')}
            onBlur={e => (e.target.style.borderColor = '#ffffff66')}
          />
        </div>

        {/* Sign in button */}
        <button style={{
          width: '100%', padding: '12px',
          background: 'linear-gradient(135deg, #e8845a, #c17344)',
          color: '#fff', fontWeight: 700,
          fontSize: 14, border: 'none',
          borderRadius: 10, cursor: 'pointer',
          marginBottom: 16,
          boxShadow: '0 4px 20px #c1734433',
        }}>
          Sign In
        </button>

        {/* Divider */}
        <div style={{
          display: 'flex', alignItems: 'center',
          gap: 12, marginBottom: 16,
        }}>
          <div style={{ flex: 1, height: '0.5px', background: '#c1734433' }} />
          <span style={{ fontSize: 12, color: '#7a4a2e88' }}>or continue with</span>
          <div style={{ flex: 1, height: '0.5px', background: '#c1734433' }} />
        </div>

        {/* GitHub button */}
        <form action={signInWithGitHub} style={{ marginBottom: 24 }}>
          <button type="submit" style={{
            width: '100%', padding: '11px',
            background: '#ffffff55',
            border: '1px solid #ffffff66',
            borderRadius: 10, fontSize: 13,
            color: '#3d1f0a', cursor: 'pointer',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: 10,
            fontWeight: 500,
            backdropFilter: 'blur(8px)',
          }}>
            <svg width="17" height="17" fill="#3d1f0a" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
            </svg>
            Continue with GitHub
          </button>
        </form>

        {/* Sign up link */}
        <p style={{ fontSize: 12, color: '#7a4a2e88' }}>
          Don&apos;t have an account?{' '}
          <span style={{ color: '#c17344', cursor: 'pointer', fontWeight: 500 }}>
            Sign up
          </span>
        </p>

      </div>
    </main>
  )
}