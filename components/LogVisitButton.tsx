'use client'

import { useState } from 'react'
import { logVisit } from '@/app/dashboard/actions'

type Props = { goalId: string; visitedToday: boolean }

export default function LogVisitButton({ goalId, visitedToday }: Props) {
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(visitedToday)
  const [error, setError] = useState<string | null>(null)

  async function handleClick() {
    if (done) return
    setLoading(true)
    setError(null)
    const result = await logVisit(goalId)
    if (result?.error) {
      setError(result.error)
    } else {
      setDone(true)
    }
    setLoading(false)
  }

  if (done) {
    return (
      <div style={{
        padding: '5px 14px',
        background: '#ffffff55',
        border: '1px solid #ffffff77',
        borderRadius: 99, fontSize: 11,
        fontWeight: 600, color: '#2d1a3a',
        backdropFilter: 'blur(8px)',
      }}>
        ✓ Visited
      </div>
    )
  }

  return (
    <div>
      <button onClick={handleClick} disabled={loading} style={{
        padding: '5px 14px',
        background: '#ffffff55',
        border: '1px solid #ffffff77',
        borderRadius: 110, fontSize: 11,
        fontWeight: 600, color: '#2d1a3a',
        cursor: loading ? 'not-allowed' : 'pointer',
        opacity: loading ? 0.7 : 1,
        backdropFilter: 'blur(8px)',
      }}>
        {loading ? 'Logging...' : 'Log Visit'}
      </button>
      {error && <p style={{ fontSize: 11, color: '#c17344', marginTop: 4 }}>{error}</p>}
    </div>
  )
}