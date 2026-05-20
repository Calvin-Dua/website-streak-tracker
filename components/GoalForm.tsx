'use client'

import { useState } from 'react'
import { createGoal } from '@/app/dashboard/actions'

export default function GoalForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(formData: FormData) {
    setLoading(true)
    setError(null)
    const result = await createGoal(formData)
    if (result?.error) {
      setError(result.error)
    } else {
      setIsOpen(false)
    }
    setLoading(false)
  }

  if (!isOpen) {
    return (
      <button onClick={() => setIsOpen(true)} style={{
        display: 'flex', alignItems: 'center', gap: 8,
        fontSize: 13, fontWeight: 500, padding: '9px 20px',
        borderRadius: 9,
        background: 'linear-gradient(135deg, #ffffff38 0%, #ffffff22 100%)',
        color: '#2d1a3a',
        border: '1px solid #ffffff66',
        cursor: 'pointer',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        boxShadow: '0 8px 32px #00000018, 0 1px 0 #ffffff55 inset',
      }}>
        + New Goal
      </button>
    )
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: '#00000044',
      backdropFilter: 'blur(4px)',
      WebkitBackdropFilter: 'blur(4px)',
    }}>
      <div
        style={{
          background: 'linear-gradient(135deg, #ffffff38 0%, #ffffff22 100%)',
          border: '1px solid #ffffff66',
          borderRadius: 16,
          padding: '24px 20px',
          width: '100%',
          maxWidth: 440,
          position: 'relative',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          boxShadow: '0 8px 32px #00000022, 0 1px 0 #ffffff55 inset',
          margin: '0 16px',
        }}
      >

        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 22 }}>
          <div>
            <h2 style={{ fontSize: 19, fontWeight: 500, color: '#2d1a3a' }}>Create new goal</h2>
            <p style={{ fontSize: 15, color: '#6a4a7a', marginTop: 3 }}>Add a website to track daily</p>
          </div>
          <button onClick={() => setIsOpen(false)} style={{
            background: 'none', border: 'none', color: '#2d1a3a',
            cursor: 'pointer', fontSize: 20, lineHeight: 1,
          }}>×</button>
        </div>

        <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

          {/* Website name */}
          <div>
            <label style={{ fontSize: 13, color: '#6a4a7a', fontWeight: 500, display: 'block', marginBottom: 6 }}>
              Website name
            </label>
            <input
              name="website_name" type="text"
              placeholder="e.g. GitHub" required
              style={{
                width: '100%', padding: '10px 14px',
                background: '#ffffff28',
                border: '1px solid #ffffff55',
                borderRadius: 9, fontSize: 13,
                color: '#2d1a3a', outline: 'none',
              }}
            />
          </div>

          {/* Website URL */}
          <div>
            <label style={{ fontSize: 13, color: '#6a4a7a', fontWeight: 500, display: 'block', marginBottom: 6 }}>
              Website URL
            </label>
            <input
              name="website_url" type="url"
              placeholder="https://github.com" required
              style={{
                width: '100%', padding: '10px 14px',
                background: '#ffffff28',
                border: '1px solid #ffffff55',
                borderRadius: 9, fontSize: 13,
                color: '#2d1a3a', outline: 'none',
              }}
            />
          </div>

          {/* Goal duration */}
          <div>
            <label style={{ fontSize: 13, color: '#6a4a7a', fontWeight: 500, display: 'block', marginBottom: 8 }}>
              Goal duration
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
              {[
                { val: '7', label: '7 days', sub: 'Starter' },
                { val: '30', label: '30 days', sub: 'Habit' },
                { val: '90', label: '90 days', sub: 'Discipline' },
                { val: '100', label: '100 days', sub: 'Mastery' },
                { val: '14', label: '14 days', sub: 'Boost' },
                { val: '60', label: '60 days', sub: 'Growth' },
              ].map(opt => (
                <label key={opt.val} style={{ cursor: 'pointer' }}>
                  <input
                    type="radio" name="target_days"
                    value={opt.val}
                    defaultChecked={opt.val === '30'}
                    style={{ display: 'none' }}
                  />
                  <div style={{
                    background: '#ffffff22',
                    border: '1px solid #ffffff44',
                    borderRadius: 10, padding: '10px',
                    textAlign: 'center', cursor: 'pointer',
                  }}>
                    <p style={{ fontSize: 16, fontWeight: 500, color: '#2d1a3a' }}>{opt.label}</p>
                    <p style={{ fontSize: 12, fontWeight: 500, color: '#6a4a7a', marginTop: 2 }}>{opt.sub}</p>
                  </div>
                </label>
              ))}
            </div>
            <select name="target_days" defaultValue="30" style={{ display: 'none' }}>
              <option value="7">7</option>
              <option value="14">14</option>
              <option value="30">30</option>
              <option value="60">60</option>
              <option value="90">90</option>
              <option value="100">100</option>
            </select>
          </div>
{/* Reminder time */}
<div>
            <label style={{ fontSize: 14, color: '#6a4a7a', display: 'block', marginBottom: 6 }}>
              Daily reminder
            </label>
            <select
              name="reminder_time"
              style={{
                width: '100%', padding: '10px 14px',
                background: '#ffffff28',
                border: '1px solid #ffffff55',
                borderRadius: 9, fontSize: 14,
                color: '#2d1a3a', outline: 'none',
              }}
            >
              <option value="">No reminder</option>
              <option value="07:00">7:00 AM</option>
              <option value="08:00">8:00 AM</option>
              <option value="09:00">9:00 AM</option>
              <option value="10:00">10:00 AM</option>
              <option value="12:00">12:00 PM</option>
              <option value="15:00">3:00 PM</option>
              <option value="17:00">5:00 PM</option>
              <option value="18:00">6:00 PM</option>
              <option value="19:00">7:00 PM</option>
              <option value="20:00">8:00 PM</option>
              <option value="21:00">9:00 PM</option>
              <option value="22:00">10:00 PM</option>
            </select>
          </div>
          {error && (
            <p style={{ fontSize: 12, color: '#c17344' }}>{error}</p>
          )}

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 4 }}>
            <button type="button" onClick={() => setIsOpen(false)} style={{
              fontSize: 13, padding: '9px 20px', borderRadius: 8,
              background: '#ffffff28', color: '#2d1a3a',
              border: '1px solid #ffffff44', cursor: 'pointer',
            }}>
              Cancel
            </button>
            <button type="submit" disabled={loading} style={{
              fontSize: 13, fontWeight: 500, padding: '9px 20px', borderRadius: 8,
              background: 'linear-gradient(135deg,#c9a0dc,#9b6ec4)',
              color: '#fff', border: 'none', cursor: 'pointer',
              opacity: loading ? 0.7 : 1,
            }}>
              {loading ? 'Creating...' : 'Create goal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}