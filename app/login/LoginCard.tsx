'use client'

import { signInWithGitHub, signInWithEmail, signUpWithEmail } from '@/app/login/actions'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'

export default function LoginCard() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [showPassword, setShowPassword] = useState(false)
  const searchParams = useSearchParams()
  const errorMsg = searchParams.get('error')

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
        position: 'fixed', inset: 0,
        backgroundImage: 'url(/calvin.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        zIndex: 0,
      }} />

      {/* Light overlay */}
      <div style={{
        position: 'fixed', inset: 0,
        background: 'rgba(255, 235, 220, 0.15)',
        zIndex: 1,
      }} />

      {/* Glass card */}
      <div style={{
        <div style={{
        position: 'relative', zIndex: 10,
        width: '100%',
        maxWidth: 400,
        margin: '0 16px',
        padding: '36px 24px',
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
          position: 'absolute', top: 0, left: '15%', right: '15%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #ffffff99, transparent)',
          borderRadius: 99,
        }} />

        {/* Logo */}
        <div style={{
          width: 56, height: 56,
          background: 'linear-gradient(135deg, #e8845a, #c17344aa)',
          borderRadius: 16,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
          fontSize: 26,
          boxShadow: '0 8px 24px #c1734433',
          border: '1px solid #ffffff55',
        }}>
          🔥
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: 26, fontWeight: 700,
          color: '#3d1f0a', marginBottom: 6,
        }}>
          {mode === 'signin' ? 'Welcome back 👋' : 'Create account ✨'}
        </h1>
        <p style={{
          fontSize: 15, color: '#7a4a2e',
          marginBottom: 28, lineHeight: 1.6,
        }}>
          {mode === 'signin'
            ? 'Sign in to continue building your streaks'
            : 'Start tracking your daily habits today'}
        </p>

        {/* Error message */}
        {errorMsg && (
          <div style={{
            background: '#ff534422', border: '1px solid #ff534455',
            borderRadius: 8, padding: '10px 14px',
            fontSize: 13, color: '#c0392b',
            marginBottom: 18, textAlign: 'left',
          }}>
            {decodeURIComponent(errorMsg)}
          </div>
        )}

        {/* Email form */}
        <form action={mode === 'signin' ? signInWithEmail : signUpWithEmail}>
          <div style={{ textAlign: 'left', marginBottom: 14 }}>
            <label style={{
              fontSize: 14, color: '#7a4a2e',
              display: 'block', marginBottom: 6,
            }}>
              Email address
            </label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              style={{
                width: '100%', padding: '11px 16px',
                background: '#ffffff44',
                border: '1px solid #ffffff66',
                borderRadius: 10, fontSize: 14,
                color: '#3d1f0a99',
                outline: 'none',
              }}
              onFocus={e => (e.target.style.borderColor = '#c1734488')}
              onBlur={e => (e.target.style.borderColor = '#ffffff66')}
            />
          </div>

          <div style={{ marginBottom: 24, textAlign: 'left' }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between', marginBottom: 6,
            }}>
              <label style={{ fontSize: 14, color: '#7a4a2e' }}>Password</label>
              {mode === 'signin' && (
                <span style={{ fontSize: 13, color: '#c17344', cursor: 'pointer' }}>
                  Forgot password?
                </span>
              )}
            </div>
            <div style={{ position: 'relative' }}>
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                required
                style={{
                  width: '100%', padding: '11px 48px 11px 16px',
                  background: '#ffffff44',
                  border: '1px solid #ffffff66',
                  borderRadius: 10, fontSize: 14,
                  color: '#3d1f0a99',
                  outline: 'none',
                }}
                onFocus={e => (e.target.style.borderColor = '#c1734488')}
                onBlur={e => (e.target.style.borderColor = '#ffffff66')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute', right: 14,
                  top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none',
                  cursor: 'pointer', padding: 0,
                  color: '#7a4a2e88',
                  fontSize: 18, lineHeight: 1,
                  display: 'flex', alignItems: 'center',
                }}
              >
                {showPassword ? (
                  // Eye off icon — password visible
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                ) : (
                  // Eye icon — password hidden
                  <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit button */}
          <button type="submit" style={{
            width: '100%', padding: '12px',
            background: 'linear-gradient(135deg, #e8845a, #c17344)',
            color: '#fff', fontWeight: 700,
            fontSize: 15, border: 'none',
            borderRadius: 10, cursor: 'pointer',
            marginBottom: 16,
            boxShadow: '0 4px 20px #c1734433',
          }}>
            {mode === 'signin' ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        {/* Divider */}
        <div style={{
          display: 'flex', alignItems: 'center',
          gap: 12, marginBottom: 16,
        }}>
          <div style={{ flex: 1, height: '0.5px', background: '#c1734433' }} />
          <span style={{ fontSize: 13, color: '#7a4a2e88' }}>or continue with</span>
          <div style={{ flex: 1, height: '0.5px', background: '#c1734433' }} />
        </div>

        {/* GitHub button */}
        <form action={signInWithGitHub} style={{ marginBottom: 24 }}>
          <button type="submit" style={{
            width: '100%', padding: '11px',
            background: '#ffffff55',
            border: '1px solid #ffffff66',
            borderRadius: 10, fontSize: 14,
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

        {/* Toggle sign in / sign up */}
        <p style={{ fontSize: 14, color: '#7a4a2e88' }}>
          {mode === 'signin' ? "Don't have an account? " : 'Already have an account? '}
          <span
            onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
            style={{ color: '#c17344', cursor: 'pointer', fontWeight: 500 }}
          >
            {mode === 'signin' ? 'Sign up' : 'Sign in'}
          </span>
        </p>

      </div>
    </main>
  )
}